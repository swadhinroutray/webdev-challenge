const path = require('path');

require('dotenv').config({ path: path.join('.env')});
const express = require('express');
const multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage})
const router = express.Router();
const user = require('./user')
const auth = require('./auth')

const isLoggedIn = (req, res, next) => {
    if(req.session.logged_in==true) return next()
    else return res.send({status:400, data:"Login First"})
}
router.post('/upload/:title',isLoggedIn,upload.array('files'), user.upload);
router.post('/register',auth.register)
router.post('/login',auth.login)
router.get('/logout',auth.logout)
router.post('/addbio',isLoggedIn,user.addbio);
router.post('/like/:title',isLoggedIn,user.likeDesign);
router.post('/addcomment/:title',isLoggedIn,user.addComment);
router.post('/save/:title',isLoggedIn,user.saveDesign);
router.post('/follow/:authorname',isLoggedIn,user.follow)
router.get('/getprofile',isLoggedIn,user.getProfile)
router.get('/getdesigns',isLoggedIn,user.getDesigns)
router.get('/getfeed',isLoggedIn,user.getFeed)
router.get('/getliked',isLoggedIn,user.getLiked)
router.get('/getsaved',isLoggedIn,user.getSaved)
router.get('/getfollowing',isLoggedIn,user.getFollowing)



module.exports =router;