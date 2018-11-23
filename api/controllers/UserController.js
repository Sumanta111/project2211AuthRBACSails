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
        if(!req.body.name || !req.body.password || !req.body.email){
            return res.status(422).send({msg : 'Please provide all the required parameters'});
        }
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
        if(!req.body.password || !req.body.email){
            return res.status(422).send({msg : 'Please provide all the required parameters'});
        }
        const user = await User.findOne({
            email : req.body.email
        }).intercept((err)=>{
            if(err) return res.serverError(err);
        });
        //sails.log(user);
        if(!user){
            res.status(404).send({msg : 'Authentication failed . User not found'});
        }else{
            User.comparePassword(req.body.password,user,function(err,isMatch){
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, 'MySecretForEncode');
                    sails.log.info('information realated logs');
                    sails.log.debug('debugging related logs');
                    sails.log.error('Error related logs');
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
        if(!req.param('id')){
            return res.status(422).send({msg : 'Please provide all the required parameters'});
        }
        let user = await User.findOne({id : req.param('id')}).intercept(err=>{
            if(err) return res.serverError(err);
        })

        return res.ok({
            user : user
        })
    }
};

