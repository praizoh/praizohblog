module.exports = app =>{
    const customers = require("../controllers/customer.controller.js");
    // Create a new customer
    app.post("/signup", customers.create);


    // Customer signin
    app.post("/login", customers.signIn);

    // Retrieve a single customer
    app.get("/customers/:customerId", customers.findOne);
}