var express = require('express');
var router = express.Router();
var Info = require("../models/User");
var Notice = require("../models/Notice");
var Say = require("../models/Say");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**登录 */
router.get('/login', function (req, res, next) {
  //获得前端传来的数据
  var user = req.query;
  var userName = user.user_name;
  var userPass = user.user_password;
  //console.log(user);

  //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
  Info.findOne({
    username: userName,
    password: userPass
  }).then(function(userInfo) {
    //userInfo是这条记录的所有信息
    // console.log(userInfo);
    if (!userInfo) {
      //用户信息不存在,即空记录
      console.log("[SELECT ERROR] -  这条（用户名密码）记录不存在");
      res.send({ status: 400, msg: "用户名或者密码错误" });
      return;
    }
    res.send({
      status: 200,
      msg: "登陆成功",
      user_name: userInfo.username,
      userInfo:userInfo
    });
  });
});

/* 注册 */
router.post("/register", function(req, res, next) {
  let register = req.body;
  //console.log(register)
    Info.findOne({
      username: register.rname
    }).then(function (info) {
      //如果用户名存在，则返回信息告诉注册者已经存在
      //console.log(info);
      if (info) {
        res.send({ status: 201, msg: '用户名已经存在，请重新命名' });
      } else {
        //如果用户名不存在，则保存到数据库
        var newUser = new Info({
          username: register.rname,
          nickname:register.rnickname,
          password: register.rpassword,
        }).save().then(function (newUser) {
          console.log('保存新用户成功，新用户信息如下：');
          console.log(newUser);
          res.send({ status: 200, msg: '恭喜你注册用户成功' });
        });
      }
    });
  
});

/**查询一个 员工 */
router.get('/askforonebl',function(req,res,next){
  //console.log(req.query.nickname)
  Info.findOne({
    nickname:req.query.nickname
  }).then(function(oneinfo){
    console.log(oneinfo);
    res.send({status:200, oneinfo:oneinfo})
  })
});

/**查询所有 员工 */
router.get('/askallyuangong',function(req,res,next){
  //console.log(req.query.nickname)
  Info.find().then(function(infos){
    console.log(infos);
    res.send({status:200, infos:infos})
  })
});

/**    删除员工   */
router.get('/delbingli',function(req,res,next){
  Info.remove({
    _id:req.query.id
  }).then(function(){
    res.send({status:200, msg:"删除员工成功！"})
  })
});

/** 编辑   员工信息 */
router.post('/bianjixinxi',function(req,res,next){
  var form = req.body;
  console.log(form);
  //res.send({status:200, msg:"编辑病例成功！"})
  Info.updateOne({
    _id:form._id
  },{
    nickname:form.nickname,
    sex:form.sex,
    age:form.age,
    address:form.address,
    phone:form.phone,
    email:form.email,
    department:form.department,
    position:form.position,
  }).then(function(){
    res.send({status:200, msg:"编辑员工成功！"})
  });
})

/** 添加   新员工 */
router.post('/tianjiabingli',function(req,res,next){
  let register = req.body;
  //console.log(register)
    Info.findOne({
      username: register.username
    }).then(function (info) {
      //如果用户名存在，则返回信息告诉注册者已经存在
      //console.log(info);
      if (info) {
        res.send({ status: 201, msg: '账号名已经存在，请更换！' });
      } else {
        //如果用户名不存在，则保存到数据库
        var newUser = new Info({
          username: register.username,
          nickname:register.nickname,
          password: register.password,
          sex: register.sex,
          age: register.age,
          address: register.address,
          phone:register.phone,
          email:register.email,
          department:register.department,
          position:register.position,

        }).save().then(function (newUser) {
          console.log('保存新用户成功，新用户信息如下：');
          console.log(newUser);
          res.send({ status: 200, msg: '成功添加新员工' });
        });
      }
    });
})

/**所有公告 */
router.get('/getallnotice',function(req,res,next){
  Notice.find().sort({time:-1}).then(function(allnotices){
    res.send({status:200, allnotices:allnotices, msg:'成功显示所有公告'})
  })
});

/**添加公告 */
router.post('/noticepublish',function(req,res,next){
  let newnotice = req.body;
  var newNotice = new Notice({
    title:newnotice.title,
    nickname:newnotice.nickname,
    content:newnotice.content,
    time:new Date()
  }).save().then(function (newUser) {
          console.log('发布新公告成功！');
          console.log(newUser);
          res.send({ status: 200, msg: '发布新公告成功' });
        });
})

/** 编辑   公告 */
router.post('/editnotice',function(req,res,next){
  var form = req.body;
  console.log(form);
  //res.send({status:200, msg:"编辑病例成功！"})
  Notice.updateOne({
    _id:form._id
  },{
    title:form.title,
    nickname:form.nickname,
    content:form.content,
    time:new Date(),
  }).then(function(){
    res.send({status:200, msg:"编辑公告成功！"})
  });
})

/**    删除  公告  */
router.get('/delnotice',function(req,res,next){
  Notice.remove({
    _id:req.query.id
  }).then(function(){
    res.send({status:200, msg:"删除公告成功！"})
  })
});

/**查询 用户信息 */
router.get('/searchuser', function (req, res, next) {
  //获得前端传来的数据
  var user = req.query;
  var userName = user.user_name;
  //console.log(user);

  //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
  Info.findOne({
    username: userName,
  }).then(function(userInfo) {
    //userInfo是这条记录的所有信息
    // console.log(userInfo);
    if (!userInfo) {
      //用户信息不存在,即空记录
      console.log("[SELECT ERROR] -  这条（用户名密码）记录不存在");
      res.send({ status: 400, msg: "用户不存在" });
      return;
    }
    res.send({
      status: 200,
      msg: "查询用户信息成功",
      user_name: userInfo.username,
      userInfo:userInfo
    });
  });
});

/**用户留言 */
router.post('/postliuyan',function(req,res,next){
  let liuyan = req.body.liuyan;
  let info = req.body.info;
  let color = req.body.color;
  var newsay = new Say({
    info:info._id,
    saycontent:liuyan,
    addTime:new Date(),
    color:color
  }).save().then(function(news){
    console.log(news);
    res.send({status:200,msg:'留言成功'})
  })
})

/**获得用户所有留言 */
router.get('/getallliuyan',function(req,res,next){
  Say.find().populate("info").sort({addTime:-1}).then(function(allliuyans){
    res.send({status:200, allliuyans:allliuyans, msg:'成功显示所有公告'})
  })
})



module.exports = router;
