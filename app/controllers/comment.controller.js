const Comment = require('../models/comment.model')


exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"content cannot be empty"})
    }
    // create new comment
    const { comment, postId, commentedBy} = req.body
    const newcomment= new Comment({
        comment:comment,
        postId:postId,
        commentedBy:commentedBy
    })
    
    try{
        const savecomment = await Comment.create(newcomment)
        console.log(savecomment.insertId)
        if (savecomment.insertId>0){
            res.status(201).send({message:"Comment created"})
        }else{
            res.status(400).send("Comment not created")
        }
    }catch(err){
        res.json(err)
    }
}

exports.findOne = async (req, res) =>{
    
    try{
        const commentById= await Comment.findById(req.params.commentId)
        
        if (commentById.length>0){
            res.status(200).send({message:"Comment found", commentById})
        }else{
            res.status(500).send({message:"Error while fetching comment"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while retrieving comment"})
        
    }
  
    
}

exports.findAll = async (req, res) =>{
    
    try{
        const comments = await Comment.findAll()
        if (comments.length>0){
            res.status(200).send({comments})
        }else{
            res.status(500).send({message:"Error while fetching comments"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while retrieving comments"})
        
    }
  
    
}

exports.update = async (req, res) =>{
    const { comment, id } = req.body
    let updateComment={
        comment:comment,
        id:id
    }
    try{
        const comments = await Comment.update(updateComment)
        if (comments.affectedRows>0){
            res.status(200).send({messge:"Comment updated"})
        }else{
            res.status(500).send({message:"Error while updating comment"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while updating comment"})
        
    }
  
    
}

exports.delete = async (req, res) =>{
    const { id} = req.body
    try{
        const comments = await Comment.delete(id)
        if (comments.affectedRows>0){
            res.status(200).send({messge:"comment deleted"})
        }else{
            res.status(500).send({message:"Error while deleting comment"})
        }
    }catch(err){
    
        res.status(500).send({message:"Error while deleting comments"})
        
    }
  
    
}
