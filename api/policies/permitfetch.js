module.exports = function (req,res,next){
    const foundUser = jwtToken.fetchDataFromToken(req.headers);
    if(foundUser.role == sails.config.myconf.isAdmin){
        return next();
    }else{
        if(req.param('id') == foundUser.id){
            return next();
        }
        return res.forbidden({msg : 'You are not permitted to perform this action'});
    }
}