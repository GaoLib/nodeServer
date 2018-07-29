var Movie = require('../models/movie.js')
var Category = require('../models/category.js')

exports.index = function(req,res){
    // console.log(req.session.user)
    Category
    .find({})
    .populate({path:'movies',options:{limit:5}})
    .exec(function(err,categories){
            if(err){
                console.log(err)
            }
            console.log(categories)
            if(req.session.user === undefined){
                res.render('index',{
                    title:'Node Home',
                    categories: categories,
                    user: ''
                })
            }else{
                 res.render('index',{
                    title:'Node Home',
                    categories: categories,
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