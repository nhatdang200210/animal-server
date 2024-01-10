const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const {Schema} = mongoose;
const userSchema = new Schema({
    name:{
        type: String,
        unique: true,
        trim: true,
        required: [true, 'yc Nhập tên']
 }, 
    email:{
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Yêu cầu nhập email']
    }, 
    password:{
        type: String,
        trim: true,
        required: [true, 'Yêu cầu nhập mật khẩu'],
        
    }, 
    role: {
        type: String,
        default: 'user'
    }
},
{timestamps: true}
)

userSchema.pre('save',function(next) {
    let user = this ;
    bcrypt.hash(user.password,10,function(error,hash){
        if(error){
            return next(error);
        }else{
            user.password = hash;
            next()
        }
    })
})

module.exports = mongoose.model('User', userSchema)
