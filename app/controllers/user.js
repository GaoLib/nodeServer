var User = require('../models/user.js')

// user signup
exports.signup = function(req,res){
    var _user = req.body.user    // req.param('user')
   
    User.find({name:_user.name}, function(err,user){
        if(err){
            console.log(err)
        }
        if(user.name){
            res.redirect('/')
        }else{
            var user = new User(_user)
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }
                res.redirect('/admin/userlist')
            })
        }
    })
}

// userlist
exports.list = function(req,res){
     User.fetch(function(err,users){
        if(err){
            console.log(err)
        }

        res.render('userlist',{
            title:'Node User List',
            users: users
        })
    })
}

// signin
exports.signin = function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/')
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user
                return res.redirect('/')
            }else{
                console.log('Password is not matched')
            }
        })
    })
}

// logout
exports.logout = function(req,res){
    delete req.session.user
    res.redirect('/')
}