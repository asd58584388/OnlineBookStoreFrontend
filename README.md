# Online Book Store Frontend

## Project Overview

This project is a modern, responsive web application for an online bookstore. It allows users to browse books, search by various criteria, view detailed book information, manage shopping carts, create wishlists, and complete purchases. The application integrates with Google Books API to provide a comprehensive catalog of books.

The backend for this project can be found at: [Online Book Store Backend](https://github.com/asd58584388/OnlineBookStoreBackend)

## Key Features

- **User Authentication**: Secure signup and login functionality
- **Book Browsing**: Explore new and featured books on the homepage
- **Search Capability**: Find books by title, author, genre, or keywords
- **Book Details**: View comprehensive information about each book
- **Shopping Cart**: Add, remove, and manage books in cart
- **Wishlists**: Create and manage personal book lists
- **Checkout Process**: Seamless purchase experience
- **User Profile**: Manage account information and view order history

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces
- **Redux**: State management for React applications
- **React Router**: Navigation and routing within the application
- **Bootstrap & Sass**: Responsive styling and enhanced CSS

### API Integration
- **Axios**: Promise-based HTTP client for API requests
- **Google Books API**: External book data source for book information
- **Custom Backend API**: Integration with our backend service (hosted on Render)

### Development Tools
- **Vite**: Modern frontend build tool for faster development
- **ESLint**: Code quality and consistency enforcement
- **Git**: Version control system

## Project Structure

The application follows a component-based architecture with Redux for state management:
- **components/**: UI components organized by feature
- **redux/**: Redux store, actions, and reducers
- **assets/**: Static resources like images and icons
- **css/**: Global styling and theme definitions

## Environment Configuration

The application supports multiple environments:
- Development
- Testing
- Production

Environment-specific variables are managed through `.env` files and not committed to version control.

## Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Build for Production
```
npm run build
```

## Project Status

This project is actively maintained and regularly updated with new features and improvements.

## Contact

For questions about this project, please contact the development team.
