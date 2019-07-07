var mongoose = require('mongoose');

//公告信息的表结构
module.exports = new mongoose.Schema({
  //标题
  title: String,
  //发布人
  nickname: {
    type: String,
    default: '未知'
  },
  //内容
  content:{
      type:String,
      default:"暂无"
  },
  //发布时间
  time:{
      type: Date,
      default: new Date()
  }
});