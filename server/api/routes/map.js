const express = require('express');
const route = express.Router();
const Donor = require ('../models/Donor');
const mongoose = require('mongoose');
const  {check , validationResult } = require('express-validator');
const validationSchema = require ('./validation/formValidation');



route.post ('/api/donor',validationSchema.form,function (req, res)  {

    let errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(412).send({
            success: false,
            errors: errors.errors
        })
    }

        console.log(req.body);
        const donor = new Donor ({
        name : req.body.name,
        phone : req.body.phone,
        bloodGroup : req.body.bloodGroup,
        city : req.body.city,
        message : req.body.message,
        lat : req.body.lat,
        lng : req.body.lng,
        date : new Date()
        })
    
        console.log(donor);
        donor.save().then (() => {
           res.json(donor);
        })
    
})

route.get ('/api/donors' ,  (req, res) => {
    
  
     Donor.find()
    .then(response => {
        res.json(response);
    })
    .catch(err => console.log(err));
    
})

module.exports = route;

