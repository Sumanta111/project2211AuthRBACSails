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
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/avatar')
        });
      }catch(err){
        return res.serverError(err);
      }
      if(uploadedFiles){
          console.log(uploadedFiles._files[0].stream.fd);
          try{
            var savetodb = await UploadFiles.create({
                name : 'x',
                path : uploadedFiles._files[0].stream.fd
              }).fetch().intercept(err=>{
                if(err) return res.serverError(err);
              });
          }catch(err){
            return res.serverError(err);
          }
          if(savetodb){
              res.json({
                  file : savetodb
              })
          }
      }
    // sails.log(uploadedFiles._files.length);
    // res.json({
    //     file : 'uploaded successfully'
    // })
  }

};

