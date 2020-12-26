const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index');
const ratelimiter = require('./middleware/ratelimiter');

router.post('/contact', ratelimiter.postLimit, indexCtrl.sendMessage);
router.post('/admin/addproject', ratelimiter.postLimit, indexCtrl.addProject);

router.get('/getportfolio', ratelimiter.getLimit, indexCtrl.getProjects);

module.exports = router;
