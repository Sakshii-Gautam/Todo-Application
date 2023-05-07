# Todo-Application

Deployed Application Link: [React Todo Application](https://app-todos-lists.netlify.app/)  

This is a React application that features a login page and a dashboard page. The dashboard displays the user's profile information and a list of their todos. The application implements user authentication using a secure token-based authentication (JWT) and utilizes React Context API to store login user information. It also includes logout functionality, the ability to add new todos, and a feature for nested todos (sub tasks).   

## Features
* User authentication using JWT
* React Context API for storing login user information
* Logout functionality
* Adding new todos and nested todos
* Input sanitization and validation
* Route guard for authentication
* Proper error handling
* Deployable on platforms like Netlify or Vercel

## Installation and Setup

1. Clone the repository from GitHub  
   `git clone https://github.com/Sakshii-Gautam/Todo-Application.git`

2. Install dependencies  
   `npm install`
   
3. Change to the project directory   
   `cd frontend`   

4. Start the application  
   `npm run dev`

5. Access the application on `http://localhost:5173`   

## Deployment

The project can be deployed to a cloud service, by running the following command:

`npm run build`
