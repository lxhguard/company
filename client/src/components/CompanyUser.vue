<template>
  <div id="companyuser">
      <!-- 标题栏 -->
      <el-alert
        title="企业自动化办公系统"
        type="success"
        effect="dark"
        center
        :closable="false">
      </el-alert>
      <br/>
      <!-- 个人中心 浮动 fixed -->
      <div style="position:fixed;top:10px;right:10px;width:100px;">
        <img @click="infocenter" :src="info.avatarurl" style="width:100px;height:100px;border-radius:125px;"/>
        <p  @click="infocenter"><el-tag type="success">{{this.info.nickname}}</el-tag></p>
        <el-tag type="danger" @click="lgout">退出登录</el-tag>
      </div>
      <!-- 内容主体 -->
      <div style="width:80%;margin:0 auto;">
        <!-- 轮播图 -->
        <div style="width:90%;margin:0 auto;">
          <el-carousel height="300px">
            <el-carousel-item :key="1">
              <img style="width:100%;height:100%;" src="http://m.qpic.cn/psb?/V12TaSuL3pJHkl/7qlX54NmzxLMLnk1aMBnHsAVCEGcdX62r6CoK23mcgc!/b/dBkBAAAAAAAA&bo=9AEtAQAAAAARF*k!&rf=viewer_4">
            </el-carousel-item>
            <el-carousel-item :key="2">
              <img style="width:100%;height:100%;" src="http://m.qpic.cn/psb?/V12TaSuL3pJHkl/ai5*4tTHOYpRkM2rlCnBA4BFA4SSAg4BOCImtxityzA!/b/dNgAAAAAAAAA&bo=9AEVAQAAAAARF8E!&rf=viewer_4">
            </el-carousel-item>
            <el-carousel-item :key="3">
              <img style="width:100%;height:100%;" src="http://m.qpic.cn/psb?/V12TaSuL3pJHkl/yf5rzqeBGVBUkt9iEFsKpbNBN*7zIMLpAZc4Ti3AIXA!/b/dA4BAAAAAAAA&bo=LQJrAQAAAAARF2U!&rf=viewer_4">
            </el-carousel-item>
            <el-carousel-item :key="4">
              <img style="width:100%;height:100%;" src="http://m.qpic.cn/psb?/V12TaSuL3pJHkl/s9vRVF7MivtwG5GYdF79gQq7o0I9CMm*hcx3Y49PZhs!/b/dJ8AAAAAAAAA&bo=gAKqAQAAAAARBxk!&rf=viewer_4">
            </el-carousel-item>
          </el-carousel>
        </div>
        <br/>
        <div style="position:relative;">
          <!-- 公告  + 日历 -->
          <el-row>
            <el-col :span="16">
              <el-tag type="danger">最新公告</el-tag>
              <div class="grid-content bg-purple" v-for="(onenotice,index) in allnotices" :key="onenotice._id" style="margin-bottom:5px;">
                  <el-alert
                    type="success"
                    :closable="false"
                    >
                    <el-tag  style="width:50px;" @click="handleClickLook(onenotice)">查看</el-tag>
                    <el-tag type="info" style="width:10px;">{{index+1}}</el-tag>
                    <el-tag type="info" style="width:100px;">{{onenotice.title}}</el-tag>
                    <el-tag type="info" style="width:80px;">{{onenotice.nickname}}</el-tag>
                    <el-tag type="info" style="width:130px;">{{onenotice.time|formatDate}} {{onenotice.time|formatDateTwo}}</el-tag>
                    <el-tag type="info" style="width:200px;">{{onenotice.content}}</el-tag>
                  </el-alert>
              </div>
            </el-col>
            <!-- 查看公告 -->
                  <el-dialog
                      :title="dialog_notice.title"
                      :visible.sync="centerDialogVisible"
                      width="30%"
                      center>
                      <p>发布人：{{dialog_notice.nickname}}</p>
                      <p>时间：{{dialog_notice.time|formatDate}} {{dialog_notice.time|formatDateTwo}}</p>
                      <p>内容：{{dialog_notice.content}}</p>
                      <span slot="footer" class="dialog-footer">
                          <el-button @click="centerDialogVisible = false">取 消</el-button>
                          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                      </span>
                  </el-dialog>
            <el-col :span="8">
              <div class="grid-content bg-purple-light" >
                <el-button @click="show = !show">日历</el-button>
                <transition name="el-fade-in-linear">
                  <div v-show="show" class="transition-box">
                    <el-calendar v-model="value" style="width:400px;">
                    </el-calendar>
                  </div>
                </transition>
              </div>
            </el-col>
          </el-row>
          <br/><br/>
          <!-- 留言板 -->
          <div>
            <el-tag type="danger">留言板</el-tag>
            <br/>
            <el-input
              placeholder="留言"
              suffix-icon="el-icon-date"
              style="width:400px;"
              v-model="liuyan">
            </el-input>
            留言条颜色：<el-color-picker v-model="color" show-alpha></el-color-picker>
            <el-button type="primary" plain @click="submitit">留言</el-button>
            <br/>
            <!-- 留言 循环 -->
            <div v-for="(oneliuyan,index) in allliuyans" :key="oneliuyan._id" :style="{backgroundColor:oneliuyan.color}" style="margin-top:5px;margin-bottom:5px;padding:5px;">
                <div style="position:relative;">
                  <img :src="oneliuyan.info.avatarurl" style="width:50px;height:50px;border-radius:125px;dispaly:inline;">
                  <div style="dispaly:inline;">
                      <el-tag>第{{index+1}}楼</el-tag>
                      <el-tag>{{oneliuyan.info.nickname}}</el-tag>
                      <el-tag>{{oneliuyan.addTime|formatDate}} {{oneliuyan.addTime|formatDateTwo}}</el-tag>
                  </div>
                  <div style="color: white;">
                    {{oneliuyan.saycontent}}
                  </div>
                </div>
            </div>
          </div>

        </div>
      </div>

  </div>
</template>

<script>
import {formatDate} from '../../static/common/date'

export default {
  name:"CompanyUser",
  data(){
    return{
      info:{},
      allnotices:[],
      centerDialogVisible: false,
      dialog_notice:{},
      value: new Date(),
      show: false,
      liuyan:"",
      color: 'rgba(19, 206, 102, 0.8)',
      allliuyans:[],


    }
  },
  //过滤器--时间
    filters: {
       formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy.MM.dd');   //年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
       },
       formatDateTwo(time) {
            var date = new Date(time);
            return formatDate(date, 'hh:mm:ss');   //时间点 例 21点12分12秒的格式
        }
    },
  methods: {
    //留言
    submitit(){
      this.$axios({
                  url:"http://localhost:4444/users/postliuyan",
                  method:"post",
                  data:{liuyan:this.liuyan,info:this.info,color:this.color}
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.$message('发表留言成功');
                        this.liuyan = "";
                        this.color='rgba(19, 206, 102, 0.8)';
                        this.dedaoliuyan();
                    }else{
                        this.$message('留言失败！!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
    },
     // 查看公告
    handleClickLook(row){
        this.dialog_notice = row;
        this.centerDialogVisible = true;
    },
    // 退出
    lgout(){
      localStorage.setItem('user_name',null);
      this.$router.push('/login');
    },
    // 跳转个人中心
    infocenter(){
      this.$router.push('/infocenter');
    },
    dedaoliuyan(){
      this.$axios({
                  url:"http://localhost:4444/users/getallliuyan",
                  method:"get",
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.allliuyans = res.data.allliuyans;
                    }else{
                        this.$message('查询留言信息错误!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
    },
    
  },//methods--end
  beforeCreate() {
      this.$axios({
                  url:"http://localhost:4444/users/getallnotice",
                  method:"get",
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.allnotices = res.data.allnotices;
                    }else{
                        this.$message('显示 公告 失败！！！');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
      this.$axios({
                  url:"http://localhost:4444/users/searchuser",
                  method:"get",
                  params:{user_name:localStorage.getItem('user_name')}
                })
                .then(res=>{
                    if(res.data.status == 200){
                      this.info = res.data.userInfo;
                        
                    }else{
                        this.$message('获得所有留言失败!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
      this.dedaoliuyan();
  },
  created() {
    this.dedaoliuyan();
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}
#companyuser{
  background-image: url('http://m.qpic.cn/psb?/V12TaSuL3pJHkl/Ncp*rGNTeyhOnm4KM4ox.KTQ.*6WfTesrsLyuQsVenA!/b/dCYAAAAAAAAA&bo=WAKQAQAAAAARB*s!&rf=viewer_4');
}
</style>
