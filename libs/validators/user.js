var Joi = require('joi');
 
var schema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

module.exports.validateUserDetails = function validateUserDetails(userDetails){
    return Joi.validate(userDetails, schema);
}