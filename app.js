var express = require('express')
var app = express()
var port = process.env.port || 3000
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie.js')
var _ = require('underscore')
var ejs = require('ejs')

mongoose.connect('mongodb://localhost/node')

// app.use(bodyParser.json())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views','./views')
app.engine('html',ejs.__express)
app.set('view engine','html')
app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('node started on port '+port)

app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }

        res.render('index',{
            title:'Node Home',
            movies: movies
        })
    })
	// res.render('index',{
	// 	title:'Node Home',
	// 	movies: [{
	// 		title: "机械战警",
	// 		_id: 1,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	},{
	// 		title: "机械战警",
	// 		_id: 2,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	},{
	// 		title: "机械战警",
	// 		_id: 3,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	},{
	// 		title: "机械战警",
	// 		_id: 4,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	},{
	// 		title: "机械战警",
	// 		_id: 5,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	},{
	// 		title: "机械战警",
	// 		_id: 6,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
	// 	}]
	// })
})

app.get('/movie/:id',function(req,res){
    var id = req.params.id
    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:'Node Detail' + movie.title,
            movie: movie
        })
    })
	// res.render('detail',{
	// 	title:'Node Detail',
	// 	movie:{
	// 		director: "何塞·帕迪里亚",
	// 		country: "美国",
	// 		title: "机械战警",
	// 		year: 2014,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
	// 		language: "英语",
	// 		flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
	// 		summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
	// 	}
	// })
})

app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'Node Admin',
		movie:{
			title: '',
			director: '',
			country: '',
			year: '',
			language: '',
			poster: '',
			flash: '',
			summary: ''
		}
	})
})

// admin update movie
app.get('/admin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title: 'Admin Update',
                movie: movie
            })
        })
    }
})

// admin post movie
app.post('/admin/movie/new',function(req,res){
    // console.log(req.body)
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie = null
    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }

            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)
            })
        })
    }else{
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
         _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)
            })
    }
})

app.get('/admin/list',function(req,res){
     Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }

        res.render('list',{
            title:'Node List',
            movies: movies
        })
    })

	// res.render('list',{
	// 	title:'Node List',
	// 	movies:[{
 //            _id: 1,
	// 		director: "何塞·帕迪里亚",
	// 		country: "美国",
	// 		title: "机械战警",
	// 		year: 2014,
	// 		poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
	// 		language: "英语",
	// 		flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
	// 		summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
	// 	},{
 //            _id: 2,
 //            director: "何塞·帕迪里亚",
 //            country: "美国",
 //            title: "机械战警",
 //            year: 2014,
 //            poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
 //            language: "英语",
 //            flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
 //            summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
 //        }
 //        ]
	// })
})