let db= require('../config/connection');
let collection= require('../config/collections')
const bcrypt = require('bcrypt');
module.exports ={
    registerUser:(userData)=>{
        // console.log(userData);
        return new Promise(async(res,rej)=>{
            userData.password = await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                res(userData);

            })
        })

    },
    loginUser:(userData)=>{
        return new Promise(async (res,rej)=>{
            let loginStatus=false;
            let response= {};
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user)
            {
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status)
                    {
                        console.log("login success")
                        response.user= user;
                        response.status=true;
                        res(response);
                    }
                    else{
                        console.log("login failed")
                        res({status:false})
                    }
                })
            }
            else
            {
                console.log("login failed");
                res({status:false});
            }
        })
    },
    checkEmail:(email)=>{
        return new Promise(async(resolve,reject)=>{
            let checkedEmail= await db.get().collection(collection.USER_COLLECTION).findOne({email:email}).then((data)=>{
                // console.log("Email checking started....")
                // console.log(data);
                resolve(data);
             })
             console.log('emial cheks')
             console.log(checkedEmail);
        })


    }

}