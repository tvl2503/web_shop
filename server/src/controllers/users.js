

const User = require('../models/User')
const {hashPassword, matchPassword} = require('../../utils/password')
const {sign,decode} = require('../../utils/jwt')


module.exports.createUser = async (req, res) => {
    try{
        if(!req.body.fullName) return res.status(200).json({code: 400, message: "Yêu cầu nhập họ và tên!"})
        if(!req.body.email) return res.status(200).json({code: 400, message: "Yêu cầu nhập email!"}) 
        if(!req.body.password) return res.status(200).json({code: 400, message: "Yêu cầu nhập mật khẩu!"})
        if(!req.body.phone) return res.status(200).json({code: 400, message: "Yêu cầu nhập số điện thoại!"})

        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser) {
            return res.status(200).json({code: 400,message: "Email này đã tồn tại!"})
        }
        const checkPhone = await User.findOne({phone: req.body.phone});
        if(checkPhone) {
            return res.status(200).json({code : 400 ,message: "Số điện thoại này đã được đăng ký!"})
        }
        const img = `https://ui-avatars.com/api/?background=ff324d&color=fff&name=+${req.body.fullName}`
        const passwords = await hashPassword(req.body.password);
        const newUser =  new User({
            fullname: req.body.fullName,
            email: req.body.email,
            img: img,
            phone: req.body.phone,
            password: passwords,
        })
        
        const savedUser = await newUser.save();
        const token =  sign(savedUser)
        const { password, ...others } = savedUser._doc;  

        res.status(200).json({code : 200, message: "Đăng ký thành công" ,result: {...others, token}});
    }catch(err){
        res.status(200).json({code : 500, message: "Thất bại"})
    }
}
module.exports.loginUser = async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user)
            return  res.status(200).json({code : 400 , error : {}, message: 'Tài khoản không tồn tại!'});

        const passwordMatch = await matchPassword(user.password, req.body.password)
        if(!passwordMatch)
            return res.status(200).json({code : 400, error : {} ,message: 'Mật khẩu không chính xác!!'})

        const token =  sign(user)

        const { password, ...others } = user._doc;  
        res.status(200).json({code : 200, message : "Đăng nhập thành công!" ,result: {...others, token}});
    }catch(err){
        const status = res.statusCode ? res.statusCode : 500
        res.status(200).json({code : 500, message: 'Đã có lỗi xảy ra!'});

    }
}

module.exports.getMe = async (req, res) => {
    const user = req.user;
    const { password, ...others } = user._doc;
    return res.status(200).json({code : 200, message : "Ok", result: others});
}

// module.exports.updateUser = a