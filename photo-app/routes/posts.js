var express = require('express');
var router = express.Router();
var postDao = require('../dao/postDao');


router.post('/new', function (req, res, next) {
	if (!req.session.user) {
		return res.redirect('/signin');
	}
	postDao.post(req, res, next);
});

router.get('/view/:id', async function (req, res, next) {
	var image = await postDao.get(req.params.id);
	var comments = await postDao.getComments(req.params.id);
	console.log(image);
	console.log(comments);
	res.render('comment', {
		title: 'Imgur: The magic of the Internet',
		image: image,
		user: req.session.user,
		comments: comments,
	});
});

router.post('/comment/new', async function (req, res, next) {
	if (!req.session.user) {
		return res.redirect('/signin');
	}
	postDao.postNewComment(req, res, {
		user: req.session.user,
		image: req.body.id,
		content: req.body.content,
	});
});

module.exports = router;
