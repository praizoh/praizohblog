module.exports = app =>{
    const comment = require("../controllers/comment.controller.js");
    // Create a new comment
    app.post("/comments", comment.create);


    // Get all comments
    app.get("/comments", comment.findAll);

    // Retrieve a single comment
    app.get("/comments/:commentId", comment.findOne);

    // Update a  comment
    app.put("/comments", comment.update);

    // Delete a comment
    app.delete("/comments", comment.delete)
}