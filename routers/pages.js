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

route.get('/product/:product', function(req, res) {
  var products;
  db.query("SELECT * FROM products left join categories on categories.id=products.category where pid='"+req.params.product+"'", function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      //console.log(result);
      res.render('product', {title: 'Product', products: result});
    }
  });
});

route.get('/add-to-cart/:product', function(req, res) {
  //Cart through session
  /*if (!Array.isArray(req.session.product)) {
    req.session.product = [];
  }
  req.session.cookie.expires = false;

  req.session.product.push({
    id: req.params.product,
    qnt: 1
  });*/
  //res.send('<h1>'+JSON.stringify(req.session.product)+'</h1>');

  //Cart through cookie
  var products = [];
  if(req.cookies.node_express_ecommerce) {
    products = req.cookies.node_express_ecommerce;
  }
  /*products.push({
    id: req.params.product,
    qnt: 1
  });*/
  db.query("SELECT * FROM products left join categories on categories.id=products.category where pid='"+req.params.product+"'", function (err, result, fields) {
    if (err) {
      console.log(err)
    } else {
      //console.log(result);
      products.push({
        pid: result[0].pid,
        title: result[0].title,
        name: result[0].name,
        price: result[0].price,
        picture: result[0].picture,
        qnt: 1
      });

      //res.send(products);
      res.cookie('node_express_ecommerce', products);
      res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/cart' });
      return res.end();
    }
  });
  //console.log(products);
  //res.cookie('node_express_ecommerce', products);
  //res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/cart' });
  //return res.end();
});

route.get('/clear-cart', function(req, res) {
  //res.cookie('node_express_ecommerce', '');
  res.clearCookie('node_express_ecommerce');
  res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/cart' });
  return res.end();
});

route.get('/cart', function(req, res) {
  var products = [];
  //var session_products = [];

  //Using cookies
  //console.log(req.cookies.node_express_ecommerce);
  if(req.cookies.node_express_ecommerce) {
    res.render('cart', {title: 'Cart', products: req.cookies.node_express_ecommerce});
  } else {
    res.render('cart', {title: 'Cart', products: products});
  }
  
  //Using session
  /*if(req.session.product) {
    req.session.product.forEach(function(product) {
      session_products.push(product.id);
    });
    session_products = session_products.join("\', \'");
    db.query("SELECT * FROM products left join categories on categories.id=products.category where pid in('"+session_products+"')", function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        //console.log(result);
        res.render('cart', {title: 'Cart', products: result});
      }
    });
  } else {
    res.render('cart', {title: 'Cart', products: products});
  }*/
});

route.get('/about', function(req, res) {
  //res.send('<h1>About page</h1>');
  res.render('page', {title: 'About'});
});

route.get('/contact', function(req, res) {
  res.render('page', {title: 'Contact'});
});

module.exports = route;