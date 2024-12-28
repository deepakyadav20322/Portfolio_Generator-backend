const Route = require("../models/Route");

exports.getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(200).json({ user:'' });
    }
  const route =await  Route.findOne({userId:req.user._id}).select('route');

    const user = { ...req.user.toObject(), userId: req.user._id,route:route?.route };
    console.log(user.route)
    // Convert Mongoose document to plain JavaScript object
    // const user = { ...req.user.toObject(), userId: req.user._id };

    res.status(200).json({ user });
};


exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.status(200).json({MES:"LOGOUT SUCCESSFULLY"});
    });
};



