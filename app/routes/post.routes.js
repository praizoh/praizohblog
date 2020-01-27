module.exports = app =>{
    const post = require("../controllers/post.controller.js");
    // Create a new post
    app.post("/posts", post.create);


    // Get all posts
    app.get("/posts", post.findAll);

    // Retrieve a single post
    app.get("/posts/:postId", post.findOne);

    // Update a  post
    app.put("/posts", post.update);

    // Delete a post
    app.delete("/posts", post.delete)
}