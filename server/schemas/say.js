var mongoose = require('mongoose');

//留言信息的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 用户id
    info: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: "User"
    },
    //文字内容
    saycontent: {
        type: String,
        default: "该用户没写内容"
    },
    //添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //留言条颜色
    color:{
        type:String,
        default:"rgba(19, 206, 102, 0.8)"
    }
});