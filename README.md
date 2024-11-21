# Project Overview

The Library Management System is a full-stack web application designed for managing book records. It features secure user authentication and CRUD operations, with the backend built in ASP.NET Core and the frontend in React with TypeScript. The database is managed using SQLite and integrated via Entity Framework Core.

# Prerequisites

To set up and run the project, ensure you have the following tools installed:

Tools:

- A code editor (e.g., Visual Studio Code or Visual Studio)
- A browser for testing the application (e.g., Chrome)
- Postman (optional, for testing API endpoints)

# Setup Instructions

Software Requirements:

- Node.js (v16 or higher)
- npm (included with Node.js)
- .NET SDK (v9 or higher)
- SQLite (installed and configured)

# Clone the Repository

1. Clone the project repository to your local machine using:
   `git clone <https://github.com/Supun-office/LibraryManagementSystem.git>`

2. Navigate to the project folder:
   `cd LibraryManagementSystem`

# Backend Setup

1. Navigate to the backend folder:
   `cd LibraryManagementSystem`

2. Install Dependencies:
   Ensure all required NuGet packages are restored automatically when opening the solution file or run:
   `dotnet restore`

3. Database Configuration:
   The database is pre-configured to use SQLite. The connection string is located in appsettings.json:

"ConnectionStrings": {
"DefaultConnection": "Data Source=Library.db"
}

4. Apply Migrations:
   Run the following command to apply database migrations and set up the database schema:
   `dotnet ef database update`

5. Start the Backend Server:
   Run the backend server using:
   `dotnet run`

# The backend will start at http://localhost:5223

# Frontend Setup

1. Navigate to the frontend folder:
   `cd library-management-frontend`

2. Install Dependencies:
   Install all necessary npm packages using:
   `npm install`

3. Start the Frontend Server:
   Start the React development server with:
   `npm start`

# The frontend will be accessible at http://localhost:3000

# Testing the Application

1. Backend Testing
   Use Postman or Swagger to test backend endpoints:

- Swagger: Visit http://localhost:5223/swagger for API testing.
- Postman: Import requests manually or automate them with collections.

2. Frontend Testing

- Verify user registration and login functionality.
- Test CRUD operations:
  Add, edit, view, and delete books via the interface.
- Check validation:
  Test input validation by leaving fields blank or entering invalid data.

# Folder Structure

1. Backend

- Controllers: Contains API controllers for books and authentication.
- Models: Defines the structure for database entities.
- Data: Includes the database context and migration files.
- appsettings.json: Configuration file for the database and JWT settings.

2. Frontend

- src/components: Contains React components like BookList, AddBook, and EditBook.
- src/services: Contains service files (authService.ts and bookService.ts) for API communication.
- src/contexts: Includes AuthContext for managing authentication globally.
- src/index.tsx: The entry point for the React application.
