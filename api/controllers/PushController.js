/**
 * PushController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test : function (req,res){
    var registrationToken = 'f1kvV4owPtw:APA91bGQnHEElxEJmrsFRkp8kF5xV2jqniuOmgwrJftMdf0gAH_wRmjXKzjqLGgGtS8WiDLGaXiAKEMc1dnWfeecGD9FrfjnC28c00Z_doffjoEmYdAaB-c5ifSxxLoSGEUy71qTbWGL';

    var payload = {
        data : {
            Mykey1 : "hello"
        }
    };
    var options = {
        priority : 'high',
        timeTolive : 60*60*24
    }

    sails.admin.messaging().sendToDevice(registrationToken,payload,options).then((response)=>{
        res.ok({
            msg : 'Successully sent Message',
            response : response
        })
    }).catch((err)=>{
        res.serverError({
            msg : 'Error sending message',
            response : err
        })
    })
  }

};

