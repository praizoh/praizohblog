const sql=require("./db.js");

// constructor for comment
const Comment = function(comment){
    this.comment=comment.comment,
    this.post_id=comment.postId,
    this.commented_by=comment.commentedBy
}

Comment.create = async function(comment){
    try{
        const result = await sql.query("INSERT into comment SET ?", [comment])
        console.log('----------------------------------------printing result for the comment details just inserted------------------')
        console.log(result[0].insertId)
        const data= result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

// Get comment by Id
Comment.findById= async function(commentId){
    try{
        console.log(commentId)
        const result = await sql.query('SELECT * FROM comment WHERE comment_id = ?', [commentId])
        console.log('-------------------------------------------------------Printing details for get comment by id---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}



// Get all comments
Comment.findAll= async function(){
    try{
        const result = await sql.query('SELECT * FROM comment')
        console.log('-------------------------------------------------------Printing details for get comments---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}


// update comments
Comment.update = async function(comment){
    try{
        const result = await sql.query("update comment SET comment=? where comment_id=?", [comment.comment,comment.id])
        console.log(result[0].affectedRows)
        const data=result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

// delete comments
Comment.delete = async function(id){
    try{
        const result = await sql.query("delete from comment where comment_id=?", [id])
        console.log(result[0].affectedRows)
        data= result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

module.exports  = Comment;