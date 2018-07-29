var User = require('../models/user.js')

// show signup
exports.showSignup = function(req,res){
    res.render('signup',{
        title:'Node SingUp'
    })
}

// show signin
exports.showSignin = function(req,res){
    res.render('signin',{
        title:'Node SingIn'
    })
}

// user signup
exports.signup = function(req,res){
    var _user = req.body.user    // req.param('user')
   
    User.findOne({name:_user.name}, function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            res.redirect('/signin')
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
            return res.redirect('/signup')
        }
        user.comparePassword(password,function(err,isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user
                return res.redirect('/')
            }else{
                // console.log('Password is not matched')
                return res.redirect('/signup')
            }
        })
    })
}

// logout
exports.logout = function(req,res){
    delete req.session.user
    res.redirect('/')
}

// midware for user
exports.signinRequired = function(req,res,next){
    var user = req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

exports.adminRequired = function(req,res,next){
    var user = req.session.user
     // if(user.role <= 10){
     //    return res.redirect('/signin')
     // }
    next()
}