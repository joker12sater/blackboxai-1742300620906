const Business = require('../models/Business');

// Create a new business
exports.createBusiness = async (req, res) => {
  try {
    // Add owner to req.body
    req.body.owner = req.user.id;

    const business = await Business.create(req.body);

    // Update user role to business
    await User.findByIdAndUpdate(req.user.id, { role: 'business' });

    res.status(201).json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all businesses with filtering, sorting, and pagination
exports.getBusinesses = async (req, res) => {
  try {
    let query = Business.find();

    // Filter by category
    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }

    // Filter by status
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    // Search by name or description
    if (req.query.search) {
      query = query.or([
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ]);
    }

    // Filter by location (within radius)
    if (req.query.lat && req.query.lng && req.query.radius) {
      query = query.where('location.coordinates').near({
        center: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: parseFloat(req.query.radius) * 1000, // Convert km to meters
        spherical: true
      });
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Business.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    // Populate owner and reviews.user
    query = query.populate({
      path: 'owner',
      select: 'username email profile'
    }).populate({
      path: 'reviews.user',
      select: 'username profile.firstName profile.lastName'
    });

    const businesses = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.json({
      success: true,
      count: businesses.length,
      pagination,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single business
exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate({
        path: 'owner',
        select: 'username email profile'
      })
      .populate({
        path: 'reviews.user',
        select: 'username profile.firstName profile.lastName'
      });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update business
exports.updateBusiness = async (req, res) => {
  try {
    let business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this business'
      });
    }

    business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete business
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this business'
      });
    }

    await business.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add business review
exports.addReview = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user has already reviewed
    const hasReviewed = business.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (hasReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Already reviewed this business'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    business.reviews.push(review);
    await business.save();

    res.status(201).json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};