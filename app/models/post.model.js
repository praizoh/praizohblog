const sql=require("./db.js");

// constructor for post
const Post = function(post){
    this.subject= post.subject
    this.body = post.body
    this.posted_by=post.postedBy
}

Post.create = async function(post){
    try{
        const result = await sql.query("INSERT into blog_post SET ?", [post])
        console.log('----------------------------------------printing result for the post details just inserted------------------')
        console.log(result[0].insertId)
        const data= result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

// Get post by Id
Post.findById= async function(postId){
    try{
        console.log(postId)
        const result = await sql.query('SELECT * FROM blog_post WHERE post_id = ?', [postId])
        // const result = await sql.query('SELECT * FROM comment WHERE post_id = ?', [postId])
        console.log('-------------------------------------------------------Printing details for get post by id---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}



// Get all posts
Post.findAll= async function(){
    try{
        const result = await sql.query('SELECT * FROM blog_post')
        console.log('-------------------------------------------------------Printing details for get posts---------------')
        console.log(result[0])
        const data= result[0]
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}


// update posts
Post.update = async function(post){
    try{
        const result = await sql.query("update blog_post SET subject=?, body=? where post_id=?", [post.subject, post.body, post.id])
        console.log(result[0].affectedRows)
        const data=result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

// delete posts
Post.delete = async function(id){
    try{
        const result = await sql.query("delete from blog_post where post_id=?", [id])
        await sql.query("delete from comment where post_id=?", [id])
        console.log(result[0].affectedRows)
        data= result[0]
        return data
    }catch (err){
        console.log(err)
        return err
    }
}

module.exports  = Post;