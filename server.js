// import packages into the app. Express, body-parser, 
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());


require("./app/routes/customer.routes.js")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/comment.routes")(app);
app.get('/', (req,res)=>{
    res.send('hey, you are welcome')
})

// Connect to port
const port = process.env.PORT || 3000     

app.listen(port, ()=> console.log(`listening on port ${port}...`));    