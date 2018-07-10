var express = require('express')
var port = process.env.port || 3000
var path = require('path')
var ejs = require('ejs')
var app = express()

app.set('views','./views')
app.engine('html',ejs.__express)
app.set('view engine','html')
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('node started on port '+port)

app.get('/',function(req,res){
	res.render('index',{
		title:'Node Home',
		movies: [{
			title: "机械战警",
			_id: 1,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		},{
			title: "机械战警",
			_id: 2,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		},{
			title: "机械战警",
			_id: 3,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		},{
			title: "机械战警",
			_id: 4,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		},{
			title: "机械战警",
			_id: 5,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		},{
			title: "机械战警",
			_id: 6,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
		}

		]
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'Node Detail',
		movie:{
			director: "何塞·帕迪里亚",
			country: "美国",
			title: "机械战警",
			year: 2014,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
			language: "英语",
			flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
		}
	})
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

app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'Node List',
		movies:[{
            _id: 1,
			director: "何塞·帕迪里亚",
			country: "美国",
			title: "机械战警",
			year: 2014,
			poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
			language: "英语",
			flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
		},{
            _id: 2,
            director: "何塞·帕迪里亚",
            country: "美国",
            title: "机械战警",
            year: 2014,
            poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
            language: "英语",
            flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
            summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
        }
        ]
	})
})