var express = require('express');
var session = require('express-session');
var route = express.Router();
var db = require('../database/config');

route.get('/', function(req, res) {
  res.render('home', {title: 'Home', product: 'ID: '+req.session.product});
});

route.get('/shop', function(req, res) {
  var products;
  db.query("SELECT * FROM products left join categories on categories.id=products.category", function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      //console.log(result);
      res.render('products', {title: 'Shop', products: result});
    }
  });
});

route.get('/add-to-cart/:product', function(req, res) {
  if (!Array.isArray(req.session.product)) {
    req.session.product = [];
  }
  req.session.product.push({
    id: req.params.product,
    qnt: 1
  });
  //console.log(req.headers['host']);
  //res.send('<h1>'+JSON.stringify(req.session.product)+'</h1>');
  res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/cart' });
  return res.end();
});

route.get('/cart', function(req, res) {
  res.send('<h1>'+JSON.stringify(req.session.product)+'</h1>');
});

route.get('/about', function(req, res) {
  //res.send('<h1>About page</h1>');
  res.render('page', {title: 'About'});
});

route.get('/contact', function(req, res) {
  res.render('page', {title: 'Contact'});
});

module.exports = route;