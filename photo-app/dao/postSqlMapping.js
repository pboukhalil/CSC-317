var posts = {
	queryAll: 'SELECT i.id, i.title, i.description, i.url,  i.created_at, u.fullname FROM images i INNER JOIN users u ON i.user_id = u.id ORDER BY i.created_at DESC',
	postNew: 'INSERT INTO images(title, description, url, user_id) VALUES(? , ?, ?, ?)',
	postSearch: 'SELECT * FROM images WHERE title LIKE ? ORDER BY ID DESC',
	queryById: 'SELECT i.id, i.title, i.description, i.url,  i.created_at, u.fullname FROM images i INNER JOIN users u ON i.user_id = u.id WHERE i.id = ? ORDER BY i.created_at DESC',
	queryCommentsByImageId: 'SELECT i.content, i.created_at, u.fullname FROM comments i INNER JOIN users u ON i.user_id = u.id WHERE i.image_id = ? ORDER BY i.created_at DESC',
	postNewComment: 'INSERT INTO comments(user_id, image_id, content) VALUES(? , ?, ?)',
};

module.exports = posts;