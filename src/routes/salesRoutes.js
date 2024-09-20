const express = require('express');
const router = express.Router();
const { getSalesOverviewForAdmin } = require('../controllers/salesController');
const { verifyAdminOrEmployee } = require('../middlewares/authMiddleware');

router.get('/sales-overview', verifyAdminOrEmployee, getSalesOverviewForAdmin);


module.exports = router;
