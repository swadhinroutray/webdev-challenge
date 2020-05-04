const path = require('path');
require('dotenv').config({path: path.resolve('../.env')});
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('./config/redis')(session);
const AWS = require('aws-sdk');
const app = express();
const db = require('./config/mongo');
const port = 1337;
const routes = require('./routes/index')

// console.log(process.env.AWS_KEY)
AWS.config.update({
	Bucket:'webdevchallenge',
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
	region: process.env.AWS_REGION
});

s3 = new AWS.S3({apiVersion:"2006-03-01"})
db.connectMongo();
const sec_sess = session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET_KEY,
	store: redisStore,
	cookie: { maxAge: 6048000000 }
  });

app.use(sec_sess)
app.use(cookieParser('session'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(port ,()=>{
    console.log(`Listening on ${port}`)
})
