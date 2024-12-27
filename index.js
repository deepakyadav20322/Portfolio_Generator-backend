const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./configs/db');
const cors = require('cors')
require('dotenv').config();
require('./configs/passport');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const portfolioRoute  = require('./routes/portfolioRoute')
const app = express();

const PORT = process.env.PORT || 3001;

   // Configure CORS
   const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json('health ok');
});

// app.use('/api/auth', authRoute);
app.use('/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api', portfolioRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
