<template>
    <div>
        <el-form style="width:400px;margin:0 auto;margin-top:10px;padding:10px;background-color:#ebeef5;" ref="form" :model="form" label-width="80px">
                    <el-alert
                        title="新员工信息"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="账号名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
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
                        <el-button type="primary" @click="tianjiabingli">添加</el-button>
                        <el-button type="warning" @click="quxiao">取消</el-button>
                    </el-form-item>
                </el-form>
    </div>
</template>

<script>
export default {
    name:"UserAdd",
    data(){
        return{
            form:{}, 
        }
    },
    methods:{
        tianjiabingli(){
            this.$axios({
                  url:"http://localhost:4444/users/tianjiabingli",
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
        quxiao(){
            this.form = {};
            this.$message("取消添加员工！");
        },
    }

}
</script>

<style scoped>

</style>

