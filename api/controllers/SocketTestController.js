/**
 * SocketTestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    testCall : function(req,res){
        var post = {
            post_id : 2,
            post_data : 'Posts'
        } 
        // if(!req.isSocket){
        //     return res.serverError();
        // }
        sails.log.info(req.isSocket);
   
        sails.log.debug('socket func');
        sails.sockets.blast('post', {
            msg: '1 post just created',
            post: {
              id: 1,
              post: post
            }
          }, req);
          var socketId = sails.sockets.getId(req);
          sails.log('My socket ID is: ' + socketId);
        
          return res.ok();
    }
};

