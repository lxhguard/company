<template>
    <div id="companyadmin">
        
        <el-alert
            title="公司管理员界面"
            type="info"
            description=""
            center
            :closable="false"
            show-icon>
        </el-alert>
        <el-row id="companyadmin_tac" class="tac" style="width:20%;height:90%;float:left;background-color: rgb(84, 92, 100);">
            <el-col>
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" @click="bingli">
                    <i class="el-icon-document"></i>
                    <span slot="title" >员工管理</span>
                </el-menu-item>
                <el-menu-item index="2"  @click="bianji">
                    <i class="el-icon-menu"></i>
                    <span slot="title">员工添加</span>
                </el-menu-item>
                <el-menu-item index="3" @click="tianjia">
                    <i class="el-icon-document"></i>
                    <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="4" @click="about">
                    <i class="el-icon-setting" ></i>
                    <span slot="title">退出登录</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div style="width:78%;float:right;">
            <router-view name="right"/>
        </div>
    </div>
</template>

<script>
export default {
    name:"Hospitaladmin",
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      bingli(){
          this.$router.push('/usermanage');
      },
      bianji(){
          this.$router.push('/useradd');
      },
      tianjia(){
          this.$router.push('/noticemanage');
      },
      about(){
          localStorage.setItem('user_name',null);
          this.$router.push('/login');
      },

 
    },//methods -- end
    mounted(){
      var orderHeight=document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementById("companyadmin").style.height=orderHeight+'px';
    },
    
}
</script>

<style scoped>
#companyadmin{
    background-image: url('http://m.qpic.cn/psb?/V12TaSuL3pJHkl/HHcflFU*gLR8MSojO1Lo3K9k.Q9TJkoZmNDlv46nZV4!/b/dMoAAAAAAAAA&bo=LQIsAQAAAAARBzI!&rf=viewer_4');
    background-size: 100% 100%;
}
</style>
