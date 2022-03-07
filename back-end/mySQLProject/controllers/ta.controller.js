const { password } = require("../configs/db.config.js");
const TA = require("../model/ta.model.js");

exports.startofficehour = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let taid = req.body.USER_ID
    let classid = req.body.CLASS_ID
    let meetinglink = req.body.MEETING_LINK
    let description = req.body.DESCRIPTION

    TA.Startofficehour(classid,taid,meetinglink,description,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}

exports.popstudent = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let taid = req.body.USER_ID
    let classid = req.body.CLASS_ID
    //judge if taid match with classid
    TA.Popstudent(classid,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}

exports.getqueuelength = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let taid = req.body.USER_ID
    let classid = req.body.CLASS_ID
    //judge if taid match with classid
    TA.Getqueuelength(classid,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}

exports.endofficehour = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let taid = req.body.USER_ID
    let classid = req.body.CLASS_ID
    //judge if taid match with classid
    TA.Endofficehour(classid,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}


exports.getClass = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let id = req.body.user_ID
    TA.getClassesinfo(id,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}

exports.getsingleClassinfo = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let id = req.body.classid
    TA.getClassinfo(id,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}

exports.editClass = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let id = req.body.classid
    let name = req.body.classname
    let number = req.body.classnumber
    let info = req.body.classinfo
    let term = req.body.classterm
    let instructor = req.body.classinstructor
    TA.editClassinfo(id,name,number,info,term,instructor,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}