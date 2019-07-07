<template>
    <div>
        <el-tag type="info" @click="returnshouye">返回首页</el-tag>
        <br/>
        <el-tabs type="border-card" style="width:80%;margin:0 auto;">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 我的信息</span>
                <el-form style="width:400px;margin:0 auto;padding:10px;background-color:#f2f6fc;" ref="form" :model="oldinfo" v-show="oldinfoshow" label-width="80px">
                    <el-alert
                        title="员工信息"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="员工照">
                        <img :src="oldinfo.avatarurl" style="width:100px;height:100px;"/>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-tag>{{oldinfo.nickname}}</el-tag>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-tag>{{oldinfo.department}}</el-tag>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-tag>{{oldinfo.position}}</el-tag>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-tag type="success">{{oldinfo.sex}}</el-tag>
                    </el-form-item>
                    <el-form-item label="现居住地">
                        <el-tag type="info">{{oldinfo.address}}</el-tag>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-tag type="warning">{{oldinfo.phone}}</el-tag>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-tag type="danger">{{oldinfo.email}}</el-tag>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="bianjiinfo">编辑信息</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-show="newinfoshow" style="width:400px;margin:0 auto;padding:10px;background-color:#f2f6fc;" ref="form" :model="newinfo" label-width="80px">
                    <el-alert
                        title="员工信息"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="员工照">
                      <img @click.stop="uploadHeadImg" :src="newinfo.avatarurl" width="100" height="100"/>
                      <input type="file" accept="image/*" @change="handleFile" id="hiddenInput" style="display:none;" />
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="newinfo.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="newinfo.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="现居住地">
                        <el-input v-model="newinfo.address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="newinfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="newinfo.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sureInfo">确认</el-button>
                        <el-button @click="cancelInfo">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="公司划分">
                <img src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=f38a7a2eca95d143ce7bec711299e967/2934349b033b5bb578c7b6d334d3d539b600bc8f.jpg"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:"InfoCenter",
    data(){
        return{
            oldinfo:{},
            newinfo:{},
            oldinfoshow:true,
            newinfoshow:false,

            //待上传的图片文件
            pic_file:{},
            //上传头像相关
            content: '',//分享动态的文字内容
            maxSize: 10240000 / 2,//图片的最大大小
            maxCount: 1,//最大数量
            filesArr: [],//保存要上传图片的数组
            images: []//转成base64后的图片的数组
        }
    },
    methods: {
        // 返回首页
        returnshouye(){
            this.$router.push({path:'/companyuser',query:{userInfo:this.newinfo}});
        },
        // 编辑信息
        bianjiinfo(){
            this.oldinfoshow = false;
            this.newinfoshow = true;
        },
        sureInfo(){//确定修改用户信息，并提交给后台
          // 用户信息框展示，修改信息框消息
          this.oldinfoshow = true;
          this.newinfoshow = false;
          //添加接口所需的数据file--头像,username--用户名,disc--简介,_id--唯一标识
          //nickname--昵称,sex--性别,age--年龄,address--住址
          var formData=new FormData();// 创建form对象:接口所需的所有数据formData,即后台的req.body
          formData.append('file',this.pic_file);
          formData.append('avatarurl', this.newinfo.avatarurl);
          formData.append('nickname', this.newinfo.nickname);
          formData.append('sex', this.newinfo.sex);
          formData.append('age', this.newinfo.age);
          formData.append('address', this.newinfo.address);
          formData.append('phone', this.newinfo.phone);
          formData.append('email', this.newinfo.email);
          formData.append('_id', this.newinfo._id);
          console.log('打印formData')
          console.log(formData)
          this.$axios({
            url:'http://localhost:4444/uploadFile', 
            method:'post',
            data:formData, 
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then((res) => {//res.data为后台返回的信息
            this.$message('修改个人信息成功');
            this.oldinfo = res.data.info;
            //this.newinfo = res.data.info;
            //this.newinfo.avatarurl = res.data.avatarurl;
            // 更新备份数据，否则cancelInfo()时还是发送请求之前的数据作为备份数据
            this.newinfo = Object.assign({}, this.oldinfo);            
          })
          .catch(err=>{
              this.$message('修改个人信息失败！');
              //将缓存用户信息赋值给用户修改的原信息，防止导致视觉效果已经修改信息
              this.newinfo = Object.assign({}, this.oldinfo);
              console.log('打印 提交修改的错误原因：');
              console.log(err);
          })

        },
        cancelInfo(){ //取消 修改用户信息
          // 用户信息框展示，修改信息框消息
          this.oldinfoshow = true;
          this.newinfoshow = false;
          //缓存用户信息，防止取消修改信息后原信息丢失
          this.newinfo = Object.assign({}, this.oldinfo);
        },
        //头像上传
        // 打开图片上传
        uploadHeadImg: function () {
          this.$el.querySelector('#hiddenInput').click();
        },
        //点击图片触发  将头像显示(不涉及上传图片)
        handleFile: function (e) {
          let $target = e.target || e.srcElement;//找到input节点
          let file = $target.files[0];//找到上传的图片 只取第一张
          this.pic_file = $target.files[0];//存入data中
          // 单纯将头像显示
          var reader = new FileReader();//将文件内容读入内存,访问本地文件
          reader.onload = (data) => {//当读取操作成功完成时调用
            let res = data.target || data.srcElement;//捕获当前事件作用的对象
            this.newinfo.avatarurl = res.result;//图片被转换成了二进制流(字符串类型),存储在info的avatarurl中
          };
          reader.readAsDataURL(file);//将图片内嵌在网页之中--Base64
        },
        
        
    },//methods -- end
    beforeCreate() {
        this.$axios({
                  url:"http://localhost:4444/users/searchuser",
                  method:"get",
                  params:{user_name:localStorage.getItem('user_name')}
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.oldinfo = res.data.userInfo;
                        this.newinfo = JSON.parse(JSON.stringify(this.oldinfo));
                        //this.newinfo = {...this.oldinfo};
                        //this.newinfo = Object.assign({}, this.oldinfo);

                    }else{
                        this.$message('查询个人信息错误!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
  },
}
</script>

<style scoped>

</style>
