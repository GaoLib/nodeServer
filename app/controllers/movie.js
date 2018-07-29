var Movie = require('../models/movie.js')
var Comment = require('../models/comment.js')
var Category = require('../models/category.js')
var _ = require('underscore')

exports.detail = function(req,res){
    var id = req.params.id
    Movie.findById(id,function(err,movie){
        Comment.find({movie:id})
        .populate('from','name')
        .populate('reply.from reply.to','name')
        .exec(function(err,comments){
            if(req.session.user === undefined){
                res.render('detail',{
                    title:'Node Detail' + movie.title,
                    movie: movie,
                    user: '',
                    comments: comments
                })
            }else{
                res.render('detail',{
                    title:'Node Detail' + movie.title,
                    movie: movie,
                    user: req.session.user,
                    comments: comments
                })
            }
            
        })
    })
    // res.render('detail',{
    //  title:'Node Detail',
    //  movie:{
    //      director: "何塞·帕迪里亚",
    //      country: "美国",
    //      title: "机械战警",
    //      year: 2014,
    //      poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
    //      language: "英语",
    //      flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
    //      summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
    //  }
    // })
}

exports.new = function(req,res){
    Category.find({},function(err,categories){
        res.render('admin',{
            title:'Node Admin',
            categories: categories,
            movie:{}
        })
    })
}

// admin update movie
exports.update = function(req,res){
    var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            Category.find({},function(err,categories){
                 res.render('admin',{
                    title: 'Admin Update',
                    movie: movie,
                    categories: categories
                })
            })
           
        })
    }
}

// admin post movie
exports.save = function(req,res){
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
        var categoryId = movieObj.category

        _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                console.log(movie+'fowehfoe')
    
                Category.findById(categoryId,function(err,category){
                    category.movies.push(movie._id)
                    category.save(function(err,category){
                        res.redirect('/movie/'+movie._id)
                    })
                })
                
            })
    }
}

exports.list = function(req,res){
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
    //  title:'Node List',
    //  movies:[{
 //            _id: 1,
    //      director: "何塞·帕迪里亚",
    //      country: "美国",
    //      title: "机械战警",
    //      year: 2014,
    //      poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg",
    //      language: "英语",
    //      flash: "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
    //      summary: "翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪里亚执导的新版《机械战警》发布首款预告片。大热美剧《谋杀》男星"
    //  }
 //        ]
    // })
}

// list delete movie
exports.del = function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id:id}, function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
}