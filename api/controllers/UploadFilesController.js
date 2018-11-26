/**
 * UploadFilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  imageUpload : async function(req,res){
      if(!req.param('id')){
        return res.status(sails.HttpStatus.UNPROCESSABLE_ENTITY).send('Please provide all the required parameter');
      }
      // try{
      //   var len = req.file('avatar')._files.length
      // }catch(err){
      //   return res.serverError(err);
      // }
      //  if(len === 0){
      //   req.file('avatar').upload({noop: true});
      //   return res.status(sails.HttpStatus.BAD_REQUEST).send('Please provide the file');
      // } 
      const mediaFile = req.file('avatar')
      if (!mediaFile._files[0]) {
          sails.log.warn('No file uploaded')
          clearTimeout(mediaFile.timeouts.untilMaxBufferTimer)
          clearTimeout(mediaFile.timeouts.untilFirstFileTimer)
          return res.status(sails.HttpStatus.BAD_REQUEST).send('No files are given');
        }
    
      if(req._fileparser.form.bytesExpected > sails.config.myconf.max_file_size){
        return res.status(sails.HttpStatus.BAD_REQUEST).send('File exceeds maxSize. Aborting.');
      }
  
      try{
        var user = await User.findOne(req.param('id'));
        if (!user) return res.notFound();

        var uploadedFiles = await sails.uploadOne(req.file('avatar'),{
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/avatar')
        });
      }catch(err){
        return res.serverError(err);
      }

      if(uploadedFiles){
        var img_name = uploadedFiles.fd.split('/').splice(-1)[0];
        try{
                  var savetodb = await UploadFiles.create({
                      name : img_name,
                      path : `${req.protocol}://${req.headers.host}/images/avatar/${img_name}`,
                      type : uploadedFiles.type,
                      size : uploadedFiles.size,
                      user_id : user.id
                    }).fetch().intercept(err=>{
                      if(err) return res.serverError(err);
                    });
                }catch(err){
                  return res.serverError(err);
                }
                if(savetodb){
                  res.ok({
                    msg : 'file uploaded successfully',
                    file : {
                      ...savetodb
                    }
                  })
                }
      }else{
          return res.badRequest('No file was uploaded');
      }
  }

};

