var express = require('express');
var router = express.Router();

var postDao = require('../dao/postDao');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var posts = await postDao.search(req.query.query);
  console.log(posts)
  res.render('index', {
    title: 'Imgur: The magic of the Internet',
    user: req.session.user,
    posts: posts
  });
});

router.get('/signup', async function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('signup', {
    title: 'Imgur: The magic of the Internet'
  });
});

router.get('/signin', async function (req, res, next) {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('signin', {
    title: 'Imgur: The magic of the Internet'
  });
});

router.get('/signout', async function (req, res, next) {
  delete req.session.user;
  return res.redirect('/');
});

router.get('/post', async function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/signin');
  }
  res.render('post', {
    title: 'Imgur: The magic of the Internet'
  });
});

module.exports = router;
