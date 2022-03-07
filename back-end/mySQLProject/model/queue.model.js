const res = require('express/lib/response');

const redis = require('redis'),  
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
        client.lrem(this.key, username, function(err, res){
            if(!err){
                console.log(`${username} has been removed`);
            }
        })
    }
    
    inlineUser = function () {
        client.llen(this.key, function(err, res){
            if(!err){
                console.log(`there are ${res} people in line`);
                return res;
            }
        })
        return 0;
    }

    rankUser = function (username) {
        client.lpos(this.key, username, function(err, data){
            //console.log(data);
            if(!err){
                console.log(`${username}'s rank is`, data+1);
        
            }
        })   
    }
    
    popUser = function(){
        client.lpop(this.key, function(err, res){
            if(!err){
                console.log(`${res} has been popped`);
                return res;
            }
        })
    }

    deleteSet = function(){
        client.del(this.key, function(err, res){
            if (!err){
                console.log(`the ${this.key} has been deleted`);
            }
        })
    }
};


module.exports = OfficehourQueue;