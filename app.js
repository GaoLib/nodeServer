var express = require('express')
var app = express()
var port = process.env.port || 3000
var path = require('path')
var mongoose = require('mongoose')
var ejs = require('ejs')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)     // 一定要放在session引入后面
var dbUrl = 'mongodb://localhost/node'

mongoose.connect(dbUrl)

// app.use(bodyParser.json())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views','./app/views')
app.engine('html',ejs.__express)
app.set('view engine','html')
app.use(cookieParser())
app.use(session({
    secret: 'node',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

if('development' === app.get('env')){
    app.set('showStackError',true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug',true)
}

app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname,'public')))
require('./config/routes.js')(app)

app.listen(port)

console.log('node started on port '+port)

