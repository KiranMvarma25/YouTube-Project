# YouTube-Project

Contents - 

1. Introduction
2. Features
3. Technologies Used
4. Prerequisites
5. Project Setup
    -> Frontend Setup
    -> Backend Setup
6. Usage
7. Folder Structure






1. Introduction -

This project is a YouTube clone built using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to view, upload, search, and interact with videos while managing their channels. It includes features like authentication, responsive design, and CRUD operations for videos and comments.


2. Features - 

-> Frontend (React)
    
    Home Page :

        YouTube-style header.
        Static sidebar with toggle functionality.
        Filter buttons and a grid of video thumbnails.
        Video cards displaying thumbanail, Title, Channel Name, Views.


    User Authentication :

        Registration and Login using username, email, and password. 
        JWT-based authentication.
        Sign-in page and Log In page.
    

    Search bar for videos by title.


    Video Player Page :

        Title, description, channel name.
        Like and dislike buttons.
        Comment section.


    Channel Page :

        Create a channel after signing in.
        Display user’s channel videos.
        CRUD operations for user videos.


-> Backend (Node.js, Express)

    User Authentication : 

        JWT-based secure authentication.


    Channel Management:

        APIs to create, fetch, update, and delete channels.


    Video Management:

        APIs for video CRUD operations.

    Comment Management:

        APIs for adding, fetching and deleting comments.



-> Database (MongoDB) :
   
    Collections for users, channels, videos, and comments.
    File metadata storage for video URLs and thumbnails.




-> Cloudinary :

    Used Cloudinary for Storing Thumbnails and Videos.






3. Technologies Used - 

Frontend : React, React Router, Redux

Backend : Node.js, Express.js

Database : MongoDB (MongoDB Compass)

Authentication : JWT (JSON Web Tokens)

Version Control : Git




4. Prerequisites -

-> Node.js installed on your machine.

-> MongoDB Compass or MongoDB Atlas.

-> Git for version control.

-> Visual Studio Code.

-> Cloudinary or any other Cloud Platforms




5. Project Setup -

-> Frontend Setup :

    cd frontend
    cd viteproject
    npm i
    npm run dev

-> Backend Setup :

    cd backend
    npm i

-> Set Up Environment Varaibles with your Personal Keys and Values

    create a .env file in the backend directory
    
    add these values :
    
    PORT = 
    Url = ""
    SECRET_KEY = ""
    CLOUDINARY_CLOUD_NAME = ""
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECRET = ""

    npm start





6. Usage -

    Start the frontend development server : npm run dev
    Start the backend server : npm start



7. Folder Structure -

    frontend -
        viteproject -
            src -
                body/,
                channel/,
                components/,
                store/,
                App.jsx,
                errorPage.jsx,
                index.css,
                main.jsx,

    backend -
        config/,
        controllers/,
        middleware/,
        model/,
        routes/,
        .env,
        server.js,
