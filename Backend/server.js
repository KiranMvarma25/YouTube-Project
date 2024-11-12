const express = require('express');

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

app.use(express.json());
app.use('/base', router);

app.use('/base', loginrouter);

const dbConnect = require('./config/db');

dbConnect();