var Category = require('../models/category.js')


exports.new = function(req,res){
    res.render('category_admin',{
        title:'Node Movie Category',
        category: ''
    })
}


// admin post movie
exports.save = function(req,res){
    // console.log(req.body)
    var _category = req.body.category

    var category = new Category(_category)

     category.save(function(err,category){
            if(err){
                console.log(err)
            }
            res.redirect('/admin/category/list')
        })
    
}

exports.list = function(req,res){
     Category.fetch(function(err,categories){
        if(err){
            console.log(err)
        }

        res.render('categorylist',{
            title:'Node Category List',
            categories: categories
        })
    })

}

// list delete movie
// exports.del = function(req,res){
//     var id = req.query.id
//     if(id){
//         Movie.remove({_id:id}, function(err,movie){
//             if(err){
//                 console.log(err)
//             }else{
//                 res.json({success:1})
//             }
//         })
//     }
// }