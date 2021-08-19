const express = require(`express`); // Import Node package Express
const router = express.Router();

router.use(require(`./departmentRoutes`));
router.use(require(`./roleRoutes`));

module.exports = router;