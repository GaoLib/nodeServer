var Movie = require('../models/movie.js')

exports.index = function(req,res){
    // console.log(req.session.user)
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        if(req.session.user === undefined){
            res.render('index',{
                title:'Node Home',
                movies: movies,
                user: ''
            })
        }else{
             res.render('index',{
                title:'Node Home',
                movies: movies,
                user: req.session.user   // html直接获取不到，需要用render传递一下
            })
        }
       
    })
    // res.render('index',{
    //  title:'Node Home',
    //  movies: [{
    //      title: "机械战警",
    //      _id: 1,
    //      poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
    //  },{
    //      title: "机械战警",
    //      _id: 2,
    //      poster: "http://img.omnijoi.cn/Upload/FilmPic/201402/jixiezhanjing/170-240(1).jpg"
    //  }
    // })
}