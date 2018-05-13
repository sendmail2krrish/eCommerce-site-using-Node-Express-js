/**
 * Create express object.
 */
var express = require('express');
/**
 * Session object declear
 */
var session = require('express-session');
/**
 * Create app object & assign express object.
 */
var app = express();
/**
 * Create reload object.
 */
var reload = require('reload');
/**
 * For set port or default 7000 posr.
 */
app.set('port', process.env.POST || 7000);
/**
 * Set view engine & point a view folder.
 */
app.set('view engine', 'ejs');
app.set('views', 'views');
/**
 * Register session with secret key
 */
app.use(session({secret: 'kak'}));
/**
 * Set site title.
 */
app.locals.siteTitle = 'Ecommerce';
/**
 * set public folder is static to use any where.
 * Public folder contents js, css, images
 */
app.use(express.static('public'));
/**
 * Add routes.
 */
app.use(require('./routers/pages'));
/**
 * Create server.
 */
var server = app.listen(7000, function() {
  console.log('Running server');
})
/**
 * Auto reload server.
 */
reload(server, app);