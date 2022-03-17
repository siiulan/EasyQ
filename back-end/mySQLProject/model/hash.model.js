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

class OfficehourHash{
    constructor(key){
        this.key = key;
    }

    addQuestion = function (username, user_question){
        client.hset([this.key, username, user_question], function(err, data){
            if(!err){
                console.log(`redis:${username}'s question has been added'`)
            }
        });
    }

    getQuestion = async (username, result) =>{
        client.hget([this.key, username] , function(err, data){
            if(!err){
                let response = data
                result(null,response)
                console.log('redis: got a question!')
                return
                
            }
            else{
                console.log("error in queuelength!")
            }
        })
    }

    deleteHash = function(){
        client.del(this.key, function(err, res){
            if (!err){
                console.log(`redis:the hash ${this.key} has been deleted`);
            }
        })
    }

}

module.exports = OfficehourHash;