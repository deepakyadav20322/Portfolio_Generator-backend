const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router  = express.Router()




router.get('/dashboard',ensureAuthenticated,(req,res)=>{

    const user = req.user;
    res.send(`
        <html>
        <head>
            <title>Dashboard</title>
        </head>
        <body>
            <h1>Welcome to the Dashboard, ${user.displayName}!</h1>
            <img src="${user.profilePhoto}" alt="User Photo" width="100">

            <p>Email: ${user.email}</p>
            <p>Email: ${user.profilePhoto}</p>
            <a href="/auth/logout">Logout</a>
        </body>
        </html>
    `); 

})

module.exports = router
