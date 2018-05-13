var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '8889',
  user     : 'root',
  password : 'root',
  //socket   : '/Applications/MAMP/tmp/mysql/mysql.sock',
  database : 'jsp_eCommerce'
});

connection.connect(function(err) {
    if (err){
      console.log(err);
      //throw err;
    } else {
      console.log('DB connected :)');
    }
});

module.exports = connection;