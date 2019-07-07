<template>
    <div>
        <br/>
        <el-input v-model="inputnickname" placeholder="请输入员工姓名" style="width:200px;"></el-input>
        <el-button type="primary" @click="searchname">搜索</el-button>
        <el-button type="primary" @click="searchall">显示所有</el-button>
        <br/><br/>
        <el-table
            :data="oneinfo"
            style="width: 100%">
            <el-table-column
                        prop="username"
                        label="员工账号"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        label="姓名"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="department"
                        label="部门"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="position"
                        label="职位"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="sex"
                        label="性别"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="现居住地址"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="email"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="doctorzhenduan"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button  @click="handleClickdel(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                

                <el-form style="width:400px;margin:0 auto;padding:10px;background-color:#f2f6fc;" ref="form" :model="form" label-width="80px" v-show="appear">
                    <el-alert
                        title="员工信息"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="姓名">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-select v-model="form.department" placeholder="请选择部门">
                        <el-option label="企划部" value="企划部"></el-option>
                        <el-option label="办公室" value="办公室"></el-option>
                        <el-option label="财务部" value="财务部"></el-option>
                        <el-option label="服务部" value="服务部"></el-option>
                        <el-option label="产品部" value="产品部"></el-option>
                        <el-option label="技术部" value="技术部"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="form.position" placeholder="请选择职位">
                            <el-option label="总裁" value="总裁"></el-option>
                            <el-option label="副总裁" value="副总裁"></el-option>
                            <el-option label="秘书" value="秘书"></el-option>
                            <el-option label="经理" value="经理"></el-option>
                            <el-option label="普通职工" value="普通职工"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="现居住地">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="makesure">确认</el-button>
                        <el-button @click="quxiao">取消</el-button>
                    </el-form-item>
                </el-form>

    </div>
</template>

<script>
import Qs from 'qs'

export default {
    name:"UserManage",
    data(){
        return{
            inputnickname:'',
            oneinfo:[],
            appear:false,
            form:{}, 
            
        }
    },
    methods:{
        searchname(){
            this.$axios({
                  url:"http://localhost:4444/users/askforonebl",
                  method:"get",
                  params:{nickname:this.inputnickname}
                })
                .then(res=>{
                    this.oneinfo = [];
                    if(res.data.oneinfo != null){
                        this.oneinfo.push(res.data.oneinfo);
                        this.inputnickname = "";
                    }else{
                        this.$message('该职工不存在!');
                        this.inputnickname = "";
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        handleClick(row) {
            this.appear = true;
            this.form = row;
        },
        quxiao(){
            this.appear = false;
            this.form = {};
        },
        searchall(){
            this.$axios({
                  url:"http://localhost:4444/users/askallyuangong",
                  method:"get",
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.oneinfo = res.data.infos;
                    }else{
                        this.$message('查询失败!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        handleClickdel(row) {
            this.$axios({
                  url:"http://localhost:4444/users/delbingli",
                  method:"get",
                  params:{id:row._id}
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.inputnickname = "";
                        this.oneinfo = [];
                    }else{
                        this.$message('删除错误!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        makesure(){
            this.$axios({
                  url:"http://localhost:4444/users/bianjixinxi",
                  method:"post",
                  data:this.form
                })
                .then(res=>{
                    this.appear = false;
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.inputnickname = "";
                        this.form = {};

                    }else{
                        this.$message('后台错误!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        
    },//methods -- end
    created(){
            this.searchall();
    },

}
</script>

<style scoped>

</style>
