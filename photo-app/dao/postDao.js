
var mysql = require('mysql');
var $conf = require('../conf/conf');
var $sql = require('./postSqlMapping');

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

function post(req, res, next) {
  const data = req.body;
  pool.getConnection(function (err, connection) {
    connection.query($sql.postNew, [data.title, data.description, data.url, req.session.user], function (err, result) {
      if (err) {
        console.log(err);
        return jsonWrite(res, result);
      }      
      connection.release();
      return jsonWrite(res, {
        code: '0',
        msg: 'Post successfully'
      });
    });
  });
}

function search(query) {
  query = query || '';
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.query($sql.postSearch, ['%' + query + '%'], function (err, result) {
        connection.release();
        if (err) {
          console.log(err);
          return resolve([]);
        } 
        resolve(result);
      });
    });
  });  
}

function get(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.query($sql.queryById, [id], function (err, result) {
        connection.release();
        if (err) {
          console.log(err);
          return reject(err);
        } 
        resolve(result[0]);
      });
    });
  });  
}

function getComments(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.query($sql.queryCommentsByImageId, [id], function (err, result) {
        connection.release();
        if (err) {
          console.log(err);
          return reject(err);
        } 
        resolve(result);
      });
    });
  });  
}


function postNewComment(req, res, options) {
  pool.getConnection(function (err, connection) {
    connection.query($sql.postNewComment, [options.user, options.image, options.content], function (err, result) {
      if (err) {
        console.log(err);
        return jsonWrite(res, result);
      }      
      connection.release();
      return jsonWrite(res, {
        code: '0',
        msg: 'Post successfully'
      });
    });
  });
}

module.exports = {
  post: post,
  search: search,
  get: get,
  getComments: getComments,
  postNewComment: postNewComment,
};