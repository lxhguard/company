<template>
    <div style="color:red;">
        <el-tabs>
            <!-- 公告管理:查看 编辑 删除 -->
            <el-tab-pane label="公告管理" name="first" >
                <!-- 所有公告 -->
                <el-button type="primary" @click="showall">显示所有公告</el-button>
                <el-table
                    :data="allnotices"
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="公告标题"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        label="发布人"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="内容"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="doctorzhenduan"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleClickLook(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="handleClickWrite(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button  @click="handleClickdel(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                <!-- 编辑公告 -->
                <el-form style="position:fixed;top:100px;left:40%;width:400px;margin:0 auto;padding:10px;background-color:#f2f6fc;" ref="form" :model="notice_edit" label-width="80px" v-show="appear">
                    <el-alert
                        title="编辑公告"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="标题">
                        <el-input v-model="notice_edit.title"></el-input>
                    </el-form-item>
                    <el-form-item label="发布人">
                        <el-input v-model="notice_edit.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="notice_edit.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="makesure">确认</el-button>
                        <el-button @click="quxiao">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <!-- 公告添加 -->
            <el-tab-pane label="公告添加" name="second" >
                <el-form style="width:600px;margin:0 auto;margin-top:10px;padding:10px;background-color:#ebeef5;" ref="form" :model="newnotice" label-width="80px">
                    <el-alert
                        title="新公告"
                        type="info"
                        effect="dark"
                        :closable="false"
                        center>
                    </el-alert>
                    <br/>
                    <el-form-item label="标题">
                        <el-input v-model="newnotice.title"></el-input>
                    </el-form-item>
                    <el-form-item label="发布人">
                        <el-input v-model="newnotice.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input type="textarea" v-model="newnotice.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="publish">发布</el-button>
                        <el-button type="warning" @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {formatDate} from '../../static/common/date'
export default {
    name:"NoticeManage",
    data(){
        return{
            allnotices:[],
            newnotice:{},
            dialog_notice:{},
            notice_edit:{},
            centerDialogVisible: false,
            appear:false,

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
        // 所有公告
        showall(){
            this.$axios({
                  url:"http://localhost:4444/users/getallnotice",
                  method:"get",
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.allnotices = res.data.allnotices;
                    }else{
                        this.$message('显示 公告 失败！！！');
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
        // 编辑公告
        handleClickWrite(row){
            this.notice_edit = row;
            this.appear = true;
        },
        //确定编辑
        makesure(){
            this.$axios({
                  url:"http://localhost:4444/users/editnotice",
                  method:"post",
                  data:this.notice_edit
                })
                .then(res=>{
                    this.appear = false;
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.notice_edit = {};

                    }else{
                        his.notice_edit = {};
                        this.$message('编辑公告失败!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        //取消编辑
        quxiao(){
            this.appear = false;
            this.notice_edit = {};
        },
        // 删除公告
        handleClickdel(row){
            this.$axios({
                  url:"http://localhost:4444/users/delnotice",
                  method:"get",
                  params:{id:row._id}
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.showall();
                    }else{
                        this.$message('删除错误!');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        // 取消-公告
        cancel(){
            this.newnotice = {};
            this.$message('取消发布新的公告');
        },
        // 发布-公告
        publish(){
            this.$axios({
                  url:"http://localhost:4444/users/noticepublish",
                  method:"post",
                  data:this.newnotice
                })
                .then(res=>{
                    if(res.data.status == 200){
                        this.$message(res.data.msg);
                        this.newnotice = {};
                    }else{
                        this.newnotice = {};
                        this.$message('发布新的公告 失败！！！');
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        },
    },
   
}
</script>
<style scoped>

</style>
