const express = require('express');                     // Importing Express Package
const cloudinary = require('./config/cloud');           // Importing Cloudinary Package
const fileUpload = require('express-fileupload');       // Import Express-Fileupload

const app = express();                                  // Initializing Express

require('dotenv').config();
let PORT = process.env.PORT;                            // Importing Environment Variable from env file

const cors = require('cors');                           // Importing CORS for setting connection with Front End
app.use(cors({
    origin : "*",
}));

app.listen(PORT, () => {                                // Intializing Server
    console.log(`Server is Running on Port ${PORT}`);
});


const cookieParser = require('cookie-parser');          // Importing Cookie-Parser 
app.use(cookieParser());


// Importing all the API ROUTES 

const router = require('./routes/signupRoute');         
const loginrouter = require('./routes/loginRoute');
const uploadvideorouter = require('./routes/channelVideoRoute');
const commentrouter = require('./routes/commentRoute');

app.use(express.json());                                

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));


// Initializing API with endpoint of base

app.use('/base', router);

app.use('/base', loginrouter);

app.use('/base', uploadvideorouter);

app.use('/base', commentrouter);

const dbConnect = require('./config/db');

dbConnect();


cloudinary.cloudinaryConnect();