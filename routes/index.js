require('dotenv').config();
const router = require('express').Router();
var multer = require('multer'); 
var multers3 = require('multer-s3');
const authMiddleware = require('../middlewares/auth');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

const signUp = require('./signup');
const signIn = require('./signin');
const candidateRegistration = require('./candidateRegistration');
const castVote = require('./castVote');
const getVoteCount = require('./getVoteCount');
const getCandidates = require('./getCandidates');

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/candidate/signup',authMiddleware,candidateRegistration);
router.post('/vote',authMiddleware,castVote);
router.get('/vote/count',authMiddleware,getVoteCount);
router.get('/candidates',authMiddleware,getCandidates);

module.exports = router