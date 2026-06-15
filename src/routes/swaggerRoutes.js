const express = require('express');
const SwaggerController = require('../controllers/SwaggerController');

const router = express.Router();

router.get('/', SwaggerController.render);
router.get('/spec', SwaggerController.getSpec);

module.exports = router;
