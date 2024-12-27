const express = require('express');
const router = express.Router();
const {createPortfolio,checkAvailability,hasPortfolio,portfolioIntroData} = require('../controller/portfolioControler')
const { ensureAuthenticated } = require('../middleware/authMiddleware');





router.get('/check-availability', checkAvailability);
router.post('/create-portfolio', createPortfolio);
router.get('/hero-data', portfolioIntroData);
router.get('/has-portfolio', hasPortfolio);

module.exports = router