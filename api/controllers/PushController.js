/**
 * PushController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test : function (req,res){
    var registrationToken = 'f-FNVhdG9Yo:APA91bG4_xI6Hf1FCuBuQy_nTnoVusqzTsVzwasSWcIN-25FfGuOpraTgHviSH3Uxsuo3XZzULmHeoAH78H8KfEV4Er44j0bh78p-sc8-HW0pNhNsCCg6AHT3zipZs__moELm5FusZz6';

    var payload = {
        notification: {
            title: "Firebase",
            body: "Firebase is awesome",
            click_action: "http://localhost:3000/",
            icon: "http://redmine.craterzone.co.in/themes/coffee/images/logo.png"
        },
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

