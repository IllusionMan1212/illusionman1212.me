var express = require('express');
var router = express.Router();
const indexCtrl = require('../controllers/index');

router.post('/contact', indexCtrl.sendMessage);
router.post('/admin/addproject', indexCtrl.addProject);

router.get('/getportfolio', indexCtrl.getProjects);

module.exports = router;
