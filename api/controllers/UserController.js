/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jwt-simple');

module.exports = {
    //open permission
    register : async function(req,res){
        let data = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        };
        const createdUser = await User.create(data).fetch().intercept((err)=>{
            if(err) return res.serverError(err);
        })
        return res.status(201).send({
            msg : 'User Successfully created',
            user : createdUser
        })
    },
    //open permission
    login : async function(req,res){
        const user = await User.findOne({
            email : req.body.email
        }).intercept((err)=>{
            if(err) return res.serverError(err);
        });

        if(!user){
            res.status(404).send({msg : 'Authentication failed . User not found'});
        }else{
            User.comparePassword(req.body.password,user,function(err,isMatch){
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, 'MySecretForEncode');
                    // return the information including token as JSON
                    res.ok({
                        ...user,
                        token: 'JWT ' + token
                    });
                  } else {
                    res.status(401).send({msg: 'Authentication failed. Wrong password.'});
                  }
            })
        }
    },
    //only permission for admin
    findAllUser : async function(req,res){
        let users = await User.find().intercept((err)=>{
            if(err) return res.serverError(err);
        });
        return res.ok({
            users : users
        })
    },
    //can view only his profile not other profiles ...Admin can view every profiles
    findSingleUser : async function(req,res){
        let user = await User.findOne({id : req.param('id')}).intercept(err=>{
            if(err) return res.serverError(err);
        })

        return res.ok({
            user : user
        })
    }
};

