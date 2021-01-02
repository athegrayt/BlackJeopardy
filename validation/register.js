const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput({name, email, password, password2}) {
    let errors = {}
    
    name = !isEmpty(name) ? name : ''
    email = !isEmpty(email) ? email : ''
    password = !isEmpty(password) ? password : ''
    password2 = !isEmpty(password2) ? password2 : ''

    if(Validator.isEmpty(name)){
        errors.name = "Name field is required"
    }
    if(Validator.isEmpty(email)){
        errors.name = "Email field is required"
    }else if(!Validator.isEmail(email)){
        errors.email = "Email is invalid"
    }
    if(Validator.isEmpty(password)){
        errors.password = "Password field is required"
    }
    if(Validator.isEmpty(password2)){
        errors.password2 = "Confirm password field is required"
    }
    
    if(!Validator.isLength(password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters"
    }
    if(!Validator.equals(password, password2)){
        errors.password2 = "Passwords must match"
    }

    return{
        errors, isValid: isEmpty(errors)
    }

}