/**
 * UploadFilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  imageUpload : async function(req,res){
      try{
        var uploadedFiles = await req.file('avatar').upload({
            maxBytes: 10000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/avatar')
        });
      }catch(err){
        return res.serverError(err);
      }
      if(uploadedFiles._files.length > 0){
          var img_name = uploadedFiles._files[0].stream.fd.split('/').splice(-1)[0];
          try{
            var savetodb = await UploadFiles.create({
                name : img_name,
                path : `${req.protocol}://${req.headers.host}/images/avatar/${img_name}`
              }).fetch().intercept(err=>{
                if(err) return res.serverError(err);
              });
          }catch(err){
            return res.serverError(err);
          }
          if(savetodb){
              res.json({
                  msg : 'Uploaded file successfully',
                  file : savetodb
              })
          }
      }else{
        return res.badRequest('No file was uploaded');
      }
  }

};

