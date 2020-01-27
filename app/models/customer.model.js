const sql=require("./db.js");

// constructor for customer
const Customer = function(customer){
    this.email= customer.email;
    this.name = customer.name;
    this.password = customer.password 
}

Customer.create = async function(newCustomer){
    try{
        const result = await sql.query("INSERT into customer SET email=?, name=?", [newCustomer.email, newCustomer.name])
        const id =result[0].insertId
        await sql.query("INSERT into user_auth SET id=?, email=?, password=?", [id, newCustomer.email, newCustomer.password])
        console.log('----------------------------------------printing result for the customer details just inserted------------------')
        console.log(result[0].insertId)
        return result
    }catch (err){
        console.log(err)
        return err
    }
}

// Get customer by Id
Customer.findById= async function(customerId){
    try{
        console.log(customerId)
        const result = await sql.query('SELECT * FROM customer WHERE id = ?', [customerId])
        console.log('-------------------------------------------------------Printing details for get customer by id---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

// Get customer by Id
Customer.findByEmail= async function(email){
    try{
        console.log(email)
        const result = await sql.query('SELECT * FROM customer WHERE email = ?', [email])
        console.log('-------------------------------------------------------Printing details for get customer by email---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

// get users credentials
Customer.getCred= async function(email){
    try{
        console.log(email)
        const result = await sql.query('SELECT * FROM user_auth WHERE email = ?', [email])
        console.log('-------------------------------------------------------Printing details for get customer by email---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}


module.exports  = Customer;