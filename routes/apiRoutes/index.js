const express = require(`express`); // Import Node package Express
const router = express.Router();

router.use(require(`./departmentRoutes`));
router.use(require(`./roleRoutes`));
router.use(require(`./employeeRoutes`));

module.exports = router;