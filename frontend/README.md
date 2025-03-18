# Whispernet Heritage Frontend

This is the frontend application for the Whispernet Heritage platform, built with React and Tailwind CSS.

## Features

### 1. Business Management System
- Business registration and profile management
- Subscription plans (free & premium)
- AI-powered chatbot
- Live location tracking
- Review system

### 2. Festival Ticketing System
- Interactive venue map
- Ticket level selection
- M-Pesa payment integration
- Booking management

### 3. News & Events
- News categories and filtering
- Event calendar
- Subscription preferences
- Breaking news alerts

### 4. Cultural Feed & Dictionary
- Dictionary search with multiple languages
- Community contributions
- Voting system
- Cultural content curation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
./start.sh
```

The application will be available at http://localhost:8000

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/     # React components
│   │   ├── Admin/     # Admin panel features
│   │   ├── Auth/      # Authentication components
│   │   ├── Business/  # Business management features
│   │   ├── Cultural/  # Cultural feed & dictionary
│   │   ├── Festival/  # Festival ticketing system
│   │   ├── News/      # News & events features
│   │   └── Navigation/ # Navigation components
│   ├── services/      # API service integrations
│   └── App.js         # Main application component
└── package.json       # Project dependencies
```

## Development Guidelines

### Components
- Use functional components with hooks
- Follow the container/presentational pattern
- Keep components focused and reusable
- Implement proper error handling
- Add loading states for async operations

### Styling
- Use Tailwind CSS for consistent styling
- Follow responsive design principles
- Maintain accessibility standards
- Use Font Awesome icons consistently

### State Management
- Use React hooks for local state
- Implement proper form validation
- Handle API responses appropriately
- Show user feedback for actions

### Navigation
- Use React Router for routing
- Implement protected routes
- Handle 404 pages gracefully
- Maintain navigation history

### API Integration
The frontend communicates with the backend through service modules:
- businessService.js: Business management operations
- festivalService.js: Festival ticketing operations
- newsService.js: News and events operations
- culturalService.js: Cultural feed and dictionary operations

Each service module:
- Handles API requests/responses
- Implements error handling
- Manages authentication headers
- Provides consistent error messages

### Testing
- Write unit tests for components
- Test API integrations
- Verify responsive layouts
- Check cross-browser compatibility

### Performance
- Optimize image loading
- Implement lazy loading
- Minimize bundle size
- Cache API responses appropriately

### Security
- Validate user input
- Sanitize data display
- Secure API communications
- Handle sessions properly

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Notes

- The application runs on port 8000 by default
- Make sure to have the backend API running
- Check the backend documentation for API endpoints
- Keep dependencies updated
- Follow the established coding style