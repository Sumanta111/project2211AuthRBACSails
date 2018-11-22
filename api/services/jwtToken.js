const jwt = require('jwt-simple');

module.exports = {

    getTokens: function(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
              return parted[1];
            } else {
              return null;
            }
          } else {
            return null;
          }
    },
    fetchDataFromToken : function(headers){
        let token = this.getTokens(headers);
        var decoded = jwt.decode(token, sails.config.myconf.jwtSecret);
        return decoded;
    }
};