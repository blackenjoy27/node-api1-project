// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");
const server = express();

server.use(express.json());

server.get("/api/users",(req,res)=>{
    Users.find()
    .then(users=>{
        res.status(201).json(users);
    })
    .catch(error=>{
        res.status(500).json({ 
            message: "The users information could not be retrieved" 
        })
    })
    
})

server.post("/api/users", (req,res)=>{


    Users.insert(req.body)
    .then(newUser=>{
        if(!req.body.name||!req.body.bio){
            res.status(400).json({ 
                message: "Please provide name and bio for the user" 
            })
        }else{
            res.status(201).json(newUser);
        }
    })
    .catch(error=>{
        res.status(500).json({
            message: "There was an error while saving the user to the database",
        })
    })
})

server.get("/api/users/:id", (req,res)=>{

    Users.findById(req.params.id)
    .then(user=>{
        if(user){
            res.json(user);
        }else{
            res.status(404).json({ 
                message: "The user with the specified ID does not exist" 
            })
        }
    })
    .catch(error=>{
        res.status(500).json({
            message: "The user information could not be retrieved",
            error:error.message
        })
    })
})
server.delete("/api/users/:id", (req,res)=>{
    
    Users.remove(req.params.id)
    .then(removedUser=>{
        if(removedUser){
            res.status(201).json(removedUser)
        }else{
            res.status(404).json({ 
                message: "The user with the specified ID does not exist" 
            })
        }
    }).catch(error=>{
        res.status(500).json({ 
            message: "The user could not be removed" 
        })
    })
})
server.put("/api/users/:id", (req,res)=>{
    const {id} = req.params;
    Users.update(id, req.body)
    .then(updatedUser=>{
        
        if(!req.body.name||!req.body.bio){
            res.status(400).json({ 
                message: "Please provide name and bio for the user" 
            })
        }
        else if(!updatedUser){
            res.status(404).json({ 
                message: "The user with the specified ID does not exist" 
            })
        }
        else{
            res.status(200).json(updatedUser);
        }
    })
    .catch(error=>{
        res.status(500).json({ 
            message: "The user information could not be modified",
            error:error.message
        })
    })
    
} )



module.exports = server; // EXPORT YOUR SERVER instead of {}
