const user = require("./../models/user");
const jwt = require("jsonwebtoken");

class UserServices{
 
    static async registerUser(name,email,password,telephone){
        try{
                console.log("-----Email --- Password-----",name,email,password,telephone);
                
                const createUser = new user({name,email,password,telephone});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async getUserByEmail(email){
        try{
            return await user.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    static async checkUser(email){
        try {
            return await user.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = UserServices;