const User = require('../models/User');
const jwt =  require ("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.getListUser = async (req, res, next) =>{
    try{
        const listUser = await User.find({}, 'name email'); //lay ds nguoi dung
        res.status(200).json(listUser);
    } catch (error) {
        res.status(500).json({message: "Error userlist"})
    }
}

module.exports.register = async (req,res,next)=>{
        try {
            const test = await User.findOne({email: req.body.email});
    
            if(test){
                const err = new Error('Email đã tồn tại');
                err.statusCode = 400;
                return next(err)
            }
            const user = await User.create(req.body);
            const token = jwt.sign({userId: user._id});
            res.status(200).json({
                status: 'success',
                data: { token, userName: user.name }
            });
        } catch (error) { 
           res.json(error);
        }
}

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: 'Email không chính xác' });
        }
        if (user.locked) { // Kiểm tra trạng thái khoá của tài khoản
            return res.status(401).json({ message: 'Tài khoản của bạn đã bị khoá.' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).json({ name: user.name, role: user.role });
        } else {
            const err = new Error('Password không chính xác');
            err.statusCode = 400;
            return next(err);
        }

    } catch (error) {
        res.json(error);
    }
}


// Cập nhật trạng thái khoá
exports.lock = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }
        user.locked = true; // Đặt trạng thái khoá
        await user.save(); // Lưu lại trạng thái mới
        res.status(200).json({ message: `Tài khoản đã được khoá` });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi khoá ', error });
    }
};

//trạng thái mở khoá
exports.unlock = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        user.locked = false; // Đặt trạng thái mở khoá
        await user.save(); // Lưu lại trạng thái mới
        res.status(200).json({ message: `Tài khoản đã được mở khoá` });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi mở khóa n', error });
    }
};

