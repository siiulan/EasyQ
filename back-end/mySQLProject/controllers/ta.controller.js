const { password } = require("../configs/db.config.js");
const TA = require("../model/ta.model.js");

// exports.test = (req,res)=>{
//     if(!req.body){
//         res.status(400).send(
//             {message:"Content cannot be empty！"}
//         )
//     }else res.json(00008);
// }


exports.startofficehour = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let taid = req.body.user_id
    let classid = req.body.class_id
    let meetinglink = req.body.meeting_link
    let description = req.body.description

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
    let taid = req.body.user_id
    let officehourid = req.body.office_hour_id
    //judge if taid match with classid
    TA.Popstudent(officehourid,(err,data) =>{
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
    let taid = req.body.user_id
    let officehourid = req.body.office_hour_id
    //judge if taid match with classid
    TA.Getqueuelength(officehourid,(err,data) =>{
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
    let taid = req.body.user_id
    let officehourid = req.body.office_hour_id
    //judge if taid match with classid
    TA.Endofficehour(officehourid,(err,data) =>{
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
    let id = req.body.TA_user_id
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
    console.log("in controller");
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let id = req.body.course_id
    console.log("classid",id)
    TA.getClassinfo(id,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
        console.log("get data in controller:",data);
    })
}

exports.editClass = (req,res)=>{
    if(!req.body){
        res.status(400).send(
            {message:"Content cannot be empty！"}
        )
    }
    let id = req.body.course_id
    let name = req.body.coursename
    let number = req.body.coursenumber
    let info = req.body.schedule
    let term = req.body.term
    let instructor = req.body.instructor
    TA.editClassinfo(id,name,number,info,term,instructor,(err,data) =>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured"
            });
        else res.json(data)
    })
}