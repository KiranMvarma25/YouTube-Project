const express = require('express');
const cloudinary = require('./config/cloud');
const fileUpload = require('express-fileupload');

const app = express();

require('dotenv').config();
let PORT = process.env.PORT;

const cors = require('cors');
app.use(cors({
    origin : "*",
}));

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});


const cookieParser = require('cookie-parser');
app.use(cookieParser());

const router = require('./routes/signupRoute');
const loginrouter = require('./routes/loginRoute');
const uploadvideorouter = require('./routes/channelVideoRoute');
const commentrouter = require('./routes/commentRoute');

app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));

app.use('/base', router);

app.use('/base', loginrouter);

app.use('/base', uploadvideorouter);

app.use('/base', commentrouter);

const dbConnect = require('./config/db');

dbConnect();


cloudinary.cloudinaryConnect();