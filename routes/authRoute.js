const express = require("express");
const passport = require("passport");
const { getCurrentUser, logoutUser } = require("../controller/authControler");

const { ensureAuthenticated } = require("../middleware/authMiddleware");


const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/create-portfolio");
  }
);


router.get("/current-user", ensureAuthenticated, getCurrentUser);
router.get("/logout", logoutUser);

module.exports = router;
