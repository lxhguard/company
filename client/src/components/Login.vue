<template>
  <div id="login">
    <br/><br/>
    <h3 style="width:500px;margin:0 auto;font-size:3em;color:white;">企业自动化办公系统</h3>
  <br/><br/><br/>
  <div style="position:absolute;top:300px;right:200px;width:400px;padding:10px;background-color:#F2F6FC;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户登录" name="first">
        账号：<el-input
              placeholder="请输入账号"
              v-model="user_name"
              clearable>
            </el-input>
        密码：<el-input placeholder="请输入密码" v-model="user_password" show-password></el-input>
        <br/><br/>
        <el-button type="success" @click="LoginIn">登录</el-button>
      </el-tab-pane>
      <el-tab-pane label="用户注册" name="second">
        账号：<el-input
              placeholder="请输入账号"
              v-model="registerUser.rname"
              clearable>
            </el-input>
        姓名：<el-input
              placeholder="请输入姓名"
              v-model="registerUser.rnickname"
              clearable>
            </el-input>
        密码：<el-input placeholder="请输入密码" v-model="registerUser.rpassword" show-password></el-input>
        <br/><br/>
        <el-button type="success" @click="RegisterNew">注册</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
    
  </div>
</template>

<script>
import {isMail} from '../../static/common/common.js'
import {isLegal} from '../../static/common/common.js'
import {isRange} from '../../static/common/common.js'

export default {
  name: 'Login',
  data() {
      return {
        activeName: 'first',
        user_name: '',
        user_password: '',
        registerUser:{
          rname:'',
          rnickname:'',
          rpassword:'',
        },
      };
    },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 用户登录
        LoginIn(){
            var Send_params = {};
            Send_params = {
              "user_name":this.user_name,
              "user_password":this.user_password
            };
            if (Send_params.user_name == '') {
              this.$message('用户名不能为空');
            }else{
              if (Send_params.user_password == '') {
                this.$message('密码不能为空!');
              }else{
                //登录接口
                this.$axios({
                  url:"http://localhost:4444/users/login",
                  method:"get",
                  params:Send_params
                })
                .then(res=>{


                    //登录成功 跳转index
                    if(res.data.status == 200){
                      //本地存储 token 和 user_name
                      localStorage.setItem('user_name', res.data.user_name);
                      if(res.data.user_name == 'admin'){
                        this.$message('管理员登录成功');
                        this.$router.push('/companyadmin');
                      }else{
                        this.$message('员工登录成功');
                        this.$router.push({path:'/companyuser',query:{userInfo:res.data.userInfo}});
                      }
                      
                    }else{
                      this.$message(res.data.msg);
                      this.$router.push('/login');
                    }
                    
                })
                .catch(err=>{
                    console.log(err)
                })
              }//end 密码是否为空
            }//end 用户名是否为空
        },
      // 注册新用户
        RegisterNew(){
          
          if(this.registerUser.rname.length) {
            if(isRange(this.registerUser.rname,0,12)){
					    if(isRange(this.registerUser.rpassword,0,16)){
                  this.$axios({
                      url:"http://localhost:4444/users/register",
                      method:"post",
                      data:this.registerUser
                  })
                  .then(res=>{
                      if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.registerUser = {
                                              rname:'',
                                              rpassword:'',
                                            };
                      }else{
                        this.$message(res.data.msg);
                      }
                  })
                  .catch(err=>{
                      console.log(err)
                  })
              }else{
                this.$message('您的密码长度应该在1-16位！');
              }
            }else{
              this.$message('用户名长度最大为12个字母');
            }
          }else{
            this.$message('用户名不能为空!');
          }

        },
  },//methods -- end
  mounted(){
      var orderHeight=document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementById("login").style.height=orderHeight+'px';
  },
    
}
</script>

<style scoped>
#login{
  background-image: url('http://a2.qpic.cn/psb?/V12TaSuL3pJHkl/dTVRn9lRbohoH4KGa45sH1CSbwvrXOI8KRTwA0Yn2sA!/m/dNEAAAAAAAAAnull&bo=gAJfAQAAAAARB.w!&rf=photolist&t=5');
  background-size: 100% 100%;
  color:black;
}
</style>
