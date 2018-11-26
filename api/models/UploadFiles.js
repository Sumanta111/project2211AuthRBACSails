/**
 * UploadFiles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name : {
      type : 'string',
      required : true
    },
    path : {
      type : 'string',
      required : true
    },
    type : {
      type : 'string',
      required : true
    },
    size : {
      type : 'number',
      required : true
    },

    user_id: {
      model: 'user'
    }
  },

};

