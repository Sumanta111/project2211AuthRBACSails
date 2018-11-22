/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name : {
      type : 'string',
      required : true
    },
    email : {
      type : 'string',
      required : true
    },
    password : {
      type : 'string',
      required : true
    },
    role : {
      type : 'number',
      defaultsTo : sails.config.myconf.isUser
    }
  },
  customToJSON: function(){
    return _.omit(this, ['password'])
  },
  beforeCreate : function(user,callback){
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
          return callback(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
              return callback(err);
          }
          user.password = hash;
          callback();
        });
    });
  },
  comparePassword : function(password,user,cb){
    bcrypt.compare(password,user.password,function(err,isMatched){
        if (err) {
          return cb(err);
      }
      cb(null, isMatched);
    });
  }
};

