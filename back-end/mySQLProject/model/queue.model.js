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

    removeUser = function (username) {
        //console.log('here')
        client.lrem(this.key, 1, username, function(err, res){
            if(!err){
                console.log(`${username} has been removed`);
            }
        })
    }
 
    rankUser = async (username,result) =>{
        client.lpos(this.key, username, function(err, data){
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
                console.log("error in queuelength!")
            }
        })
    }


};


module.exports = OfficehourQueue;