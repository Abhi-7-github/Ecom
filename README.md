# Milestone1

This project refers to the implementation of an e-commerce application containing a structured front-end and a back-end;
the front end is responsible for the user's interface and experiences, while back-end is engaged in business logics, operations with databases and APIs.

# Milestone 2

# Login Page - React & CSS

## Overview

This project is a simple, modern login page made using *React.js* and *CSS*. Features include:
Email and Password input fields
"Remember Me" checkbox
"Forgot Password?" link
Submit button
Sign-up option
Icons for email input and password visibility toggle

## Features

Responsive UI Designed for smooth customer experience with varying screen sizes.

- *Password Visibility Toggle:* Users can toggle the password visibility.
- *Validation (Optional):* Can be extended with form validation.

## ???? Technologies Used

- *React.js* - Component-based UI development
- *CSS* - Styling for the form and layout
- *React Icons* - Icons for email and password fields

# Milestone 3: Backend Setup

## Overview

With Milestone 2 complete, we built the frontend foundation of our e-commerce application. In Milestone 3, we focused on setting up the backend by:
Structuring backend folders
Setting up a Node.js & Express server
Connecting the project to MongoDB
Implementing basic error handling

This ensures that our application has a strong backend to support future development.

## Key Achievements

1. Organized Backend Folder Structure
   We created a well-structured backend setup:

graphql
Copy
Edit
backend/
│── controllers/ # Handles API logic  
│── models/ # Defines database schemas  
│── routes/ # Manages API endpoints  
│── middleware/ # Custom middlewares (error handling, authentication, etc.)  
│── config/ # Database connection setup  
│── server.js # Main server file  
 2. Server Setup with Express.js
Installed Express.js and configured the backend server.
Used dotenv to manage environment variables.
Server runs on PORT 5000 (or from .env file). 3. Database Connection (MongoDB Atlas)
Connected the backend to MongoDB Atlas for data storage.
Used Mongoose to define models for products, users, and orders.
Verified the database connection with logs. 4. Implemented Basic Error Handling
Added middleware to catch errors and return clear error messages.
Improved debugging and user-friendly API responses.

## Technologies Used

Node.js & Express.js – Backend framework
MongoDB Atlas & Mongoose – Database management
dotenv – Manage environment variables
Cors & Body-Parser – Middleware for API requests

# Milestone 4: User Model, Controller & File Uploads

# Overview

In this milestone, we focused on setting up key backend features for user management and file uploads. With guidance from our mentor, we completed:
User Model – Defines how user data is structured in MongoDB.
User Controller – Handles API logic for user-related operations.
Multer Setup – Enables image/file uploads for user profiles and products.

# Key Achievements

1. Created the User Model (User.js)
   Defined a Mongoose schema for user data, including:
   name, email, password (with encryption using bcrypt).
   role (Admin/User distinction).
   profileImage field to store uploaded images.

# Milestone 5: Building the Sign-Up Page & Implementing Form Validation

# Overview

In this milestone, we focused on creating a Sign-Up Page where users can register an account. We also implemented form validation to ensure users enter correct and valid data before submitting the form. This helps improve the user experience and ensures the backend receives clean and structured information.

# Key Achievements

1. Built the Sign-Up Page (HTML, CSS, React.js)
   Designed a clean and user-friendly registration form.
   Used React.js for interactivity and CSS for styling.
2. Implemented Form Validation
   Name Field: Ensures the name is entered.
   Email Validation: Checks if the email is in the correct format.
   Password Validation: Requires at least 8 characters, one uppercase letter, and one number.
   Error Messages: Displays real-time feedback when input is invalid.

# Technologies Used

React.js – Frontend Framework
HTML & CSS – Form Structure & Styling
JavaScript (ES6) – Form Validation Logic



# Milestone 6 - Secure User Signup & Password Encryption

 Milestone 6: Backend Signup Endpoint & Secure Password Storage

 Overview
In Milestone 5, we built the Signup Page in the frontend.
Now, in Milestone 6, we are implementing a backend endpoint for signup that:
 Accepts user registration requests
 Encrypts passwords before storing them
 Saves user data securely in the MongoDB database

This ensures that user credentials are protected from attacks like data breaches & password leaks.

 Key Achievements
 1. Created a Secure Signup API Endpoint (/api/auth/signup)
Users can now register securely with:
Name
Email
Encrypted Password
User Role (Default: User)
API validates user input before saving.
 2. Used bcryptjs for Password Encryption
Before storing passwords, we encrypt them using bcrypt hashing.
This prevents plain-text passwords from being saved in the database.
 3. Stored User Data in MongoDB (Mongoose Schema)
Created a User Model to store user details in MongoDB Atlas.
 4. Tested Signup API Using Postman
Successfully registered users via Postman API testing.
 Technologies Used
Node.js & Express.js – Backend Framework
MongoDB Atlas & Mongoose – Database Management
bcryptjs – Password Encryption
dotenv – Securely manage environment variables
Postman – API Testing


# Milestone 7: Backend Endpoint for User Login
Welcome to Milestone 7! In this milestone, you’ll create a backend endpoint for user login, focusing on validating user credentials and verifying encrypted passwords stored in the database. Let’s break it down step by step.

Learning Goals 
By the end of this milestone, you will:

Understand how to validate user credentials during login.

Learn how to compare the encrypted password with the user’s input.

Why Encrypt Passwords?
Protect User Data: Keeps passwords safe even if the database is compromised.

Privacy: Ensures passwords aren’t stored in plain text.

Compliance: Meets security standards like GDPR and PCI-DSS.

Prevents Password Theft: Hashed passwords are difficult to decipher, increasing security.

How Login Authentication Works 
User Enters Credentials:

The user provides their email/username and password on the login page.

Fetch User Data from Database:

The backend retrieves the user record based on the provided email/username.

If the user is not found, return an error: "User does not exist."

Compare Encrypted Passwords:

Process the user's input password using the same hashing algorithm (e.g., bcrypt).

Compare the resulting hash to the stored hashed password.

If they match, the user is authenticated; if not, send an error.

# Milestone 8: Creating and Displaying Card Components
Welcome to Milestone 8!  In this milestone, you’ll learn how to create a card component and display multiple cards on the products page. This will help you showcase products effectively and improve the user experience of your e-commerce app.

Learning Goals 
By the end of this milestone, you will:

Learn how to create a card component.

Learn how to display those cards on the products page.

Why Create Card Components?
Showcase Products Effectively: Presents product details in a clear and visually appealing way.

Reusable Design: Can be used across multiple pages or sections of the app.

Improved User Experience: Makes it easy for users to browse and interact with products.

Organized Layout: Keeps the homepage clean and structured.

How to Display a Single Card for Multiple Products?
Create a Dynamic Component: Design a single card component that accepts product details as props.

Use Mapping: Use array mapping to iterate over the product list and render a card for each product.

Pass Data Dynamically: Pass unique product information (e.g., name, price, image) to each card.

Maintain Consistency: Ensure the layout remains uniform for all products.



# milestone-9

###  Overview
In this milestone, we created a product input form that allows users to enter product details and upload multiple images. The form ensures data validation and previews images before submission.

###  Features
 User-friendly product input form  
 Multiple image uploads with previews 
  Real-time validation for form fields  

###  Screenshots
![Product Form Screenshot](URL_TO_YOUR_IMAGE)

###  Installation & Usage
1. Clone the repository:  
   ```bash
   git clone YOUR_REPOSITORY_LINK
   cd ecommerce-follow-along


# milestone 10 :product schema & API end point

In this part of Milestone 9, we will define the product schema using Mongoose and create a POST API endpoint to validate and save product details in MongoDB.

 Learning Goals
By the end of this milestone, you will:
 Learn how to write a Mongoose schema for products
Implement data validation to ensure only valid data is saved
 Create a POST API endpoint to receive and store product data in MongoDB
 Understand the importance of data integrity and validation



# Milestone 11: Dynamic Product Homepage
### Overview
In this milestone, we created a dynamic homepage that displays all products stored in MongoDB. The backend API fetches all product data, which is then displayed on the frontend using React components.

### Learning Goals 🎯
By the end of this milestone, I was able to:

Write an endpoint in the backend that fetches all product data from MongoDB.
Send the product data from the backend to the frontend.
Display the product data dynamically in the frontend using React components (Product Card).
Project Structure
bash
Copy
├── backend/
│   ├── models/
│   │   └── Product.js        # Mongoose model for products
│   ├── routes/
│   │   └── productRoutes.js  # API routes for handling products
│   ├── server.js             # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.js # Component for displaying individual product
│   │   │   └── ProductList.js # Component for fetching and displaying all products
│   │   ├── App.js            # Main app file
│   │   └── index.js          # React app entry point
└── README.md                 # Project overview and setup instructions
How It Works
#### Backend (Express & MongoDB)
Endpoint: /products

A GET request to this endpoint fetches all the products stored in MongoDB and returns them in JSON format.
MongoDB Model:

The product data is stored using a Mongoose model called Product, with fields like name, price, description, and image.
#### Frontend (React)
ProductList Component:

The ProductList component makes an API call to the /products endpoint to fetch the product data.
It then maps over the product data and passes each product to the ProductCard component to display the details.
ProductCard Component:

The ProductCard component takes in a single product as a prop and displays the product's details, such as name, description, price, and image.




## Milestone 12 - My Products Page

Overview

Welcome to Milestone 12! 
 In this milestone, we will create the My Products page, which will display all the products added by the logged-in user based on their email. We will create an endpoint that retrieves product data filtered by the user’s email and displays it dynamically using the product card component.

Learning Goals 

By the end of this milestone, you will:

Understand how to write an endpoint that filters data by email and retrieves products from MongoDB.

Learn how to receive filtered data on the frontend.

Dynamically display product data using the existing product card component.

Steps to Complete Milestone 12 

1. Backend - Create an Endpoint to Fetch User-Specific Products

Write an endpoint that retrieves all products associated with the logged-in user’s email and sends the data to the frontend.

2. Frontend - Fetch and Display User-Specific Products

Create a function to fetch product data based on the user’s email and pass it dynamically to the product card component.

Testing the Implementation 

Start your backend server.

Start your frontend application.

Visit the My Products page and ensure that only products associated with the logged-in user's email are displayed dynamically.

Summary 

In this milestone, we:

Created a backend API to fetch user-specific products from MongoDB.

Filtered product data based on the user’s email.

Displayed filtered products dynamically using the product card component.

Now, your My Products page displays personalized product data dynamically! 🚀



## Milestone 13 - Edit Uploaded Products

Overview

Welcome to Milestone 13!  In this milestone, we will add functionality to edit uploaded products. We will implement an edit button and create a backend endpoint to update product details inside the MongoDB database.

Learning Goals 

By the end of this milestone, you will:

Understand how to write an endpoint that updates existing data in MongoDB.

Learn how to auto-fill a form with previous product data and provide an option to edit.

Steps for Milestone 13 

1. Backend - Create an Update Endpoint

Write an endpoint that receives updated product data and modifies the existing data inside MongoDB.

2. Frontend - Implement Edit Button & Auto-fill Form

Add an edit button to the product card.

When the edit button is clicked, send the selected product’s data to a form.

Auto-fill the form with previous product details.

Provide an option to edit and save the changes.

Testing the Implementation 

Start your backend server.

Start your frontend application.

Navigate to a product and click the edit button.

Modify the product details and save the changes.

Verify that the product data is updated in MongoDB.

Summary 

In this milestone, we:

Created an API endpoint to update product details in MongoDB.

Added an edit button to the product card.



## Milestone 14 - Delete Product Functionality

Overview

Welcome to Milestone 14!  In this milestone, we will implement the functionality to delete a product. We will add a delete button to the product card and create a backend endpoint to remove a product from MongoDB using its ID.

Learning Goals 🎯

By the end of this milestone, you will:

Understand how to write an endpoint that deletes a product by its ID from MongoDB.

Steps for Milestone 14 

1. Backend - Create a Delete Endpoint

Write an endpoint that receives a product ID and deletes the corresponding product from MongoDB.

2. Frontend - Implement Delete Button

Add a delete button to the product card.

When the delete button is clicked, send the product ID to the backend endpoint.

Testing the Implementation 

Start your backend server.

Start your frontend application.

Click the delete button on a product.

Verify that the product is removed from MongoDB.

Summary 

In this milestone, we:

Created an API endpoint to delete a product from MongoDB by ID.

Added a delete button to the product card.

# Milestone 15 - Navbar Component

## Overview 
In this milestone, we created a reusable Navbar component and integrated it into all the pages of our application. The navbar allows smooth navigation between different sections of our app, making it user-friendly and accessible on all screen sizes.

## Learning Goals 
By completing this milestone, we have learned:
- How to create a Nav component.
- How to reuse the same component across multiple pages.
- How to make the Navbar responsive for different screen sizes.

## Implementation Steps 
1. **Created a new `Nav` component** with links to:
   - Home
   - My Products
   - Add Product
   - Cart
2. **Ensured reusability** by adding the `Nav` component to all pages.
3. **Implemented responsive design** to make the navbar adaptable to different screen sizes.
4. **Tested navigation** to ensure smooth transitions between pages.

## Milestone 16 - Product Info Page

Overview 

In this milestone, we created a Product Info Page that displays detailed product data, allows users to select a quantity, and includes an Add to Cart button.

Learning Goals 

By completing this milestone, we have learned:

How to create a new page to display detailed product information.

How to allow users to select a quantity before adding a product to the cart.

How to implement an Add to Cart button for user interaction.

Implementation Steps 

Created a new Product Info Page that:

Fetches and displays product details dynamically.

Shows product name, image, price, and description.

Allows users to select a quantity using increment and decrement buttons.

Includes an Add to Cart button.

Ensured smooth user experience by handling errors and responsiveness.

Tested functionality to verify product data retrieval and cart integration.

## Milestone 17: Add Products to Cart

 Overview

In this milestone, we will create a backend endpoint to add products to a user's cart and store them in the database.

 Learning Goals

By the end of this milestone, you will:

Modify the user schema to store cart products.

Write an endpoint to receive product details and store them in the cart.

Steps to Implement

1️ Update the User Schema

Modify the existing user schema to include a cart field, which will store an array of cart items.

2️ Create the Cart Schema (Optional)

If needed, create a separate cart schema to manage cart items more effectively.

3️ Write the Endpoint to Add Products to Cart

Implement an API endpoint that allows users to add products to their cart.

Ensure that the product details, including quantity, are stored properly.

4️ Connect the Route to the Server

Integrate the cart route into the main server file to enable functionality.

Testing the Endpoint

To test the API, use a tool like Postman or an API testing tool to send a request to add products to the cart.

Endpoint: POST /cart/add

Request Body: Contains user ID, product ID, and quantity.

Expected Response: Confirms that the product has been successfully added to the cart.