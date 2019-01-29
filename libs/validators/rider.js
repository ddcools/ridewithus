var Joi = require('joi');
 
var schema =  {
    name: Joi.string().min(3).max(30).required(),
    age:  Joi.number().integer().min(18).max(75),
    profession: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    bike: {
        name: Joi.string().min(3).max(30).required(),
        brand: Joi.string().min(3).max(30).required(),
        yom: Joi.number().integer().min(2000).max(2019).required()
    }
}

module.exports.validateRiderDetails = function validateRiderDetails(riderDetails){
    return Joi.validate(riderDetails, schema);
}