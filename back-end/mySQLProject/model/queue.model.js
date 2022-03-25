const redis = require('redis');
const { reject } = require("async");
const devSetting = require("../configs/devMode.config");  

RDS_PORT = 6379;                //端口号 
RDS_HOST = '127.0.0.1';    //服务器IP  要连接的A服务器redis  
var RDS_PWD = '123456';     //密码
if(devSetting.devMode == 1){
    RDS_PWD = 'Z6VOjC2DKlq6SsYZPONts7Db4RTcfjANWZ2Qe5xW+Msy6+XQp/aaSNMT5KjVNbOlH58B0l7N41XYjg9J';
}
// RDS_OPTS = {}                 //设置项  
// const client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);  
const client = redis.createClient({
    host : '127.0.0.1',  
    no_ready_check: true,
    auth_pass: RDS_PWD,                                                                                                                                                           
});  

client.auth(RDS_PWD,function(){  
            console.log('通过认证');  
});  

client.on('connect', () => {   
    global.console.log("connected");
});                               
                            
client.on('error', err => {       
    global.console.log(err.message)

});


//redis class and functions
class OfficehourQueue{
    constructor(key){
        this.key = key;
    }
    addUser = function (username){
        client.rpush([this.key, username], function(err, data){
            if(!err){
                console.log(`${username} has been added`)
            }
        });
    }

    removeUser = async (username,result) =>{
        //console.log('here')
        client.lrem([this.key, 1, username], function(err, data){
            if(!err){
                if (data==1){
                    console.log(`${username} has been removed`);
                } else {
                    console.log('did not removed')
                }
                let response = data;
                    result(null, response)
                    return
            } else {
                console.log('something wrong with quit part')
            }
        })
    }
 
    rankUser = async (username,result) =>{
        client.lpos([this.key, username], function(err, data){
            console.log('rank',data+1)
            if(!err){
                if (data!=null){
                    let response = data+1
                result(null,response)
                return
                } else {
                    let response = data
                    result(null,response)
                    return
                }
                
            }
            else{
                console.log(err);
                console.log("error in queuelength!")
            }
        })
    }    
    inlineUser = async (officehourid,result) =>{
        client.llen(this.key, function(err, res){
            if(!err){
                console.log(`redis:there are ${res} people in line from redis`);
                let response = res
                result(null,response)
                return
            }
            else{
                console.log("redis:error in queuelength!")
            }
        })
    }    
    
    popUser = async (officehourid,result) =>{
        client.lpop(this.key, function(err, res){
            if(!err){
                console.log(`redis:${res} has been popped`);
                let response = res
                result(null,response)
                return
            }
            else{
                console.log("redis:error in popuser!")
            }
        })
    }


    deleteSet = function(){
        client.del(this.key, function(err, res){
            if (!err){
                console.log(`redis:the ${this.key} has been deleted`);
            }
        })
    }
};


module.exports = OfficehourQueue;