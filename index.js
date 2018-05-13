var express = require('express');
var app = express();

var devConfig = require('./build/webpack.config.dev');
var prodWebpack = require('./build/webpack.config.prod');
var CONFIG = require('./conf/config');
var route = require('./node/routes');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var connectMongo = require('connect-mongo');


var MongoStore = connectMongo(session);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    name: CONFIG.session.name,
    secret: CONFIG.session.secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: CONFIG.session.url
    })
}))

var isDev = process.env.NODE_ENV === 'development' || false;
app.set('view engine', 'ejs');
app.set('views', __dirname + '/node/views');

if (isDev) {
    var webpack = require('webpack');
    var compiler = webpack(devConfig);
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: devConfig.output.publicPath,
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use('/api', route.getRouter());

app.all('*', (req, res) => {
    res.render('index', {
        title: '58爬虫设计',
    })
});


app.listen(3000, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('请打开localhost:3000');
    }
})
