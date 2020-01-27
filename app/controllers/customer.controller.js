const Customer = require('../models/customer.model.js');
// const passwordUtils = require("../Helpers/passwordUtils")


// create and save a new customer
exports.create =async (req,res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content Cannot be empty"
        });
    }

    // create a customer
    const customer= new Customer({
        email: req.body.email,
        name: req.body.name,
        password:req.body.password
    });

    // Save customer in the database
    try{
        // customer.password=passwordUtils.hashPassword(customer.password)
        const isUserExist = await Customer.findByEmail(customer.email)
        if (isUserExist.length>0){
            res.status(400).send({message:"User already exists"})
        }else{
            const savedCustomer = await Customer.create(customer)
            if (savedCustomer.length>0){
                res.status(200).send({message:"User created successfully"})
            }else{
                res.status(400).send({message:"Could  not register customer"})
            }
        }
        
    }catch(err){
        res.json(err)
    }
    
    
    
}


// customer signin
exports.signIn =async (req,res)=>{
    if (!req.body){
        res.status(400).send({
            message:"Content Cannot be empty"
        });
    }

    const { email, password } = req.body
    // Authenticate user
    try{
        // check if customer exists
        const isUserExist = await Customer.findByEmail(email)
        if (isUserExist.length<0){
            res.status(400).send({message:"User doesn't exists"})
        }else{
            const getCustomer = await Customer.getCred(email)
            if (getCustomer.length>0){
                console.log(getCustomer[0].password,password)
                // compare the customer password;
                if (getCustomer[0].password===password){
                    res.status(200).send({message:"User logged in successfully"})
                }else{
                    res.status(400).send({message:"Incorrect login details"})
                }
                
            }else{
                res.status(400).send({message:"Customer not found"})
            }
        }
        
    }catch(err){
        res.json(err)
    }    
}


exports.findOne = async (req, res) =>{
    
    try{
        const customerById = await Customer.findById(req.params.customerId)
        if (customerById.length>0){
            res.status(200).send({message:"Customer found", customerById})
        }else{
            res.status(500).send({message:"Error while fetching customer"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while retrieving customer"})
        
    }
  
    
}