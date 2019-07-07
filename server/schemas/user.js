var mongoose = require('mongoose');

//用户信息的表结构
module.exports = new mongoose.Schema({
  //账号名
  username: String,
  //员工名
  nickname: {
    type: String,
    default: '未说明'
  },
  //密码
  password: String,
  //头像路径
  avatarurl: {
    type: String,
    default: "http://localhost:4444/images/uploads/default.png"
  },
  //性别,
  sex:{
    type: String,
    default: '暂无'
  },
  //年龄
  age:{
    type:Number,
    default:18
  },
  //居住地址
  address:{
    type: String,
    default: '中国'
  },
  //手机号
  phone:{
    type:String,
    default:'暂时未填写'
  },
  //e-mail
  email:{
    type:String,
    default:'暂时未填写'
  },
  //部门
  department:{
      type:String,
      default:"实习"
  },
  //职位
  position:{
      type:String,
      default:"实习生"
  }
});