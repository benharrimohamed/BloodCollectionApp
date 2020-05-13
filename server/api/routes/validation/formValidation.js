const  {check,checkSchema} = require('express-validator');
const  Donor = require('../../models/Donor');



module.exports = { form : new checkSchema({
    name : {
        notEmpty : {
            errorMessage : 'Name is required !', 
            options: {
                ignore_whitespace : false
            }   
        },
        custom : {

            options : (value)=>{
                if(value.match(/^[A-Za-z\s]+$/)){
                    return true;
                }else{
                    throw new Error('Invalid name')
                }
                }
            
        },
        isLength : {
            errorMessage : 'Maximum lenght is 30 !',
            options : {
               max : 30, 
            }
        }
    },
    phone : {
        notEmpty : {
            errorMessage : 'Phone is required !'
        },
        isNumeric: {
            errorMessage : 'Only number',
        },
        isLength : {
            errorMessage : 'Maximum lenght is 10 !',
            options : {
                max : 10
            }
        },
        custom : {
            options : [/*(value)=>{
                if(value.match(/^[06|07][1-9]\d{8}$/)){
                    return true;
                }else{
                    throw new Error('Invalid phone number format')
                }
                },*/
                (value) => {
                 value = value.substr(1);  
                return Donor.find({phone : value}).then(donor => {
                          if (donor.length > 0) {
                            throw new Error('Phone already in use')
                          }
                    });
    
                }]
        }
    },
    bloodGroup : {
        notEmpty : {
            errorMessage : 'Blood type is required !'
        }
    },
    city : {
        notEmpty : {
            errorMessage : 'City is required !'
        }
    },
    message : {
        notEmpty : {
            errorMessage : 'Message is required !'
        },
        isLength : {
            errorMessage : 'Maximum lenght is 100 !',
            options : {
                max : 100,
                min : 5
            }
        }
    },
    lng : {

        notEmpty : {
            errorMessage : 'We cant get your loaction !'
        },
        isNumeric : {
            errorMessage : 'is not a number'
        }
    },
    lat : {

        notEmpty : {
            errorMessage : 'We cant get your loaction !'
        },
        isNumeric : {
            errorMessage : 'is not a number'
        }
    }

})
};