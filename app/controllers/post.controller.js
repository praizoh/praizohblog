const Post = require('../models/post.model')


exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"content cannot be empty"})
    }
    // create new post
    const { subject, body,  postedBy } = req.body;
    const newpost = new Post({
        subject:subject,
        body:body,
        postedBy:postedBy
    })
    
    try{
        const savepost = await Post.create(newpost)
        console.log(savepost.insertId)
        if (savepost.insertId>0){
            res.status(201).send({message:"Post created"})
        }else{
            res.status(400).send("Post not created")
        }
    }catch(err){
        res.json(err)
    }
}

exports.findOne = async (req, res) =>{
    
    try{
        const postById = await Post.findById(req.params.postId)
        console.log(postById)
        if (postById.length>0){
            res.status(200).send({message:"Post found", postById})
        }else{
            res.status(500).send({message:"Error while fetching post"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while retrieving post"})
        
    }
  
    
}

exports.findAll = async (req, res) =>{
    
    try{
        const posts = await Post.findAll()
        if (posts.length>0){
            res.status(200).send({posts})
        }else{
            res.status(500).send({message:"Error while fetching posts"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while retrieving posts"})
        
    }
  
    
}

exports.update = async (req, res) =>{
    const { subject, body, id} = req.body
    let post ={
        id:id,
        subject:subject,
        body:body
    }
    try{
        const posts = await Post.update(post)
        if (posts.affectedRows>0){
            res.status(200).send({messge:"Post updated"})
        }else{
            res.status(500).send({message:"Error while updating post"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while updating post"})
        
    }
  
    
}

exports.delete = async (req, res) =>{
    const { id} = req.body
    try{
        const posts = await Post.delete(id)
        if (posts.affectedRows>0){
            res.status(200).send({messge:"Post deleted"})
        }else{
            res.status(500).send({message:"Error while deleting post"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while deleting post"})
        
    }
  
    
}
