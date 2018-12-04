/**
 * PushController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var nodemailer = require('nodemailer');
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
        let transport = nodemailer.createTransport({
            service:'gmail',
            secure : false,
            port : 25,
            auth : {
                user : 'sumantabanerjee111@gmail.com',
                pass : process.env.PASS
            },
            tls : {
                rejectUnauthorized : false
            }
        });
        let HelperOptions = {
            from : '"Sumanta Banerjee" <sumantabanerjee111@gmail.com',
            to : 'sumantabanerjee084@gmail.com',
            subject : 'hello world',
            text : 'WoW ! Sent!'
        };

        transport.sendMail(HelperOptions,(err,info)=>{
            if(err){
                console.log(err);
            }
            res.ok({
                msg : 'Successully sent Message',
                response : response,
                info : info
            })  
        })
    }).catch((err)=>{
        res.serverError({
            msg : 'Error sending message',
            response : err
        })
    })
  }

};

