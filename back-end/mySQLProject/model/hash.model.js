const redis = require('redis');
const { reject } = require("async");  
RDS_PORT = 6379,                //端口号  
RDS_HOST = '127.0.0.1',    //服务器IP  要连接的A服务器redis  
RDS_PWD = '123456',     //密码  
RDS_OPTS = {}                 //设置项  
const client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);  

client.auth(RDS_PWD,function(){  
            console.log('通过认证');  
});  

class OfficehourHash{
    constructor(key){
        this.key = key;
    }

    addQuestion = function (username, user_question){
        client.hset([this.key, username, user_question], function(err, data){
            if(!err){
                console.log(`${username}'s question has been added'`)
            }
        });
    }

    getQuestion = async (username, result) =>{
        client.hget([this.key, username] , function(err, data){
            if(!err){
                let response = data
                result(null,response)
                return
                
            }
            else{
                console.log("error in queuelength!")
            }
        })
    }

}

module.exports = OfficehourHash;