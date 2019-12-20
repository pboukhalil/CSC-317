
var mysql = require('mysql');
var $conf = require('../conf/conf');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool($conf.mysql);

var jsonWrite = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: 'Error'
		});
	} else {
		res.json(ret);
	}
};

function signup(req, res, next) {
	const data = req.body;
	pool.getConnection(function (err, connection) {
		connection.query($sql.insert, [data.email, data.password, data.fullname], function (err, result) {
			if (err) {
				console.log(err);
			}
			jsonWrite(res, result);
			connection.release();
		});
	});
}


function signin(req, res, next) {
	const data = req.body;
	pool.getConnection(function (err, connection) {
		connection.query($sql.queryLogin, [data.email, data.password], function (err, result) {
			if (err) {
        console.log(err);
        return jsonWrite(res, result);
      }
      if (result.length <= 0) {
        return jsonWrite(res, {
          code: '1',
          msg: 'Invalid user/password'
        });
      }
      sess=req.session;
      sess.user = result[0].id;
      connection.release();
      return jsonWrite(res, {
        code: '0',
        msg: 'Login successfully'
      });
		});
	});
}

module.exports = {
	add: signup,
	login: signin,
};