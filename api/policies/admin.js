module.exports = function (req,res,next){
    const foundUser = jwtToken.fetchDataFromToken(req.headers);
    if(foundUser.role == sails.config.myconf.isAdmin){
        return next();
    }else{
        return res.forbidden({msg : 'You are not permitted to perform this action'});
    }
}