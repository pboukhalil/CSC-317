var user = {
	insert:'INSERT INTO users(email, password, fullname) VALUES(? , ?, ?)',
	queryLogin: 'SELECT * FROM users WHERE email=? and password=?',
};

module.exports = user;