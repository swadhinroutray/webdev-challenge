const path = require('path');

require('dotenv').config({ path: path.join('.env')});
const express = require('express');
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage})
const router = express.Router();
const user = require('./user')
const auth = require('./auth')

router.post('/upload',upload.array('files'), user.upload);
router.post('/register',auth.register)
router.post('/login',auth.login)
router.get('/logout',auth.logout)
router.post('/addbio',user.addbio);
router.post('/like/:title',user.likeDesign);
router.post('/addcomment/:title',user.addComment);
router.post('/save/:title',user.saveDesign);
router.post('/follow/:authorname',user.follow)

module.exports =router;