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
}

exports.search = function(req,res){
    var catId = req.query.cat
    var page = parseInt(req.query.p,10) 
    var count = 2
    var index = page * count

    Category
    .find({_id:catId})
    .populate({path:'movies'})
    .exec(function(err,categories){
            if(err){
                console.log(err)
            }

            var category = categories[0] || {}
            var movies = category.movies || []
            var results = movies.slice(index,index + count)
            var page = {
                curPage: page + 1,
                totalPage: Math.ceil(movies.length / count)
            }
            var category ={
                name:  category.name,
                id: category._id
            }

            res.render('results',{
                title:'Node Result',
                keyword: category,
                page: page,
                results: results
            })
           
           
        })
}