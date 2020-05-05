<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>issue上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"> 
            <div style="padding-bottom:20px">
                <p>请上传格式如如下的issue文件的excel文件 支持xls和xlsx格式 同时填写如下表单完成数据过滤</p>
                <p>dataId | type | title | body | assignee | reporter | priority | status | resolution | created | updated</p>
            </div>
            <div>样例图片</div>
            <img src="../../assets/img/chartExample.png" style="width:500px" alt>
            <el-divider></el-divider>
                <div style="width:500px">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="表名称">
                            <el-input v-model="form.tablesName"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="开发商">
                            <el-input v-model="form.builder"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            <el-divider></el-divider>
            <!-- action 上传的地址位置-->
            <!--
                先将步骤划分成3个 
                    1.上传文件
                    2.完成文件处理
                    3.存入数据库中
                参数设定：
                    1.data是上传时附带的参数
                    2.limit是上传时最大的文件个数 每次只能单个上传文件 需要表名和文件名字相同
                    3.
            -->
            <el-upload
                class="upload-demo"
                ref="upload"
                drag
                action="Path"
                multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :data="form"
                :show-file-list="true"
                :limit=1
                :accept="FileType"
                :http-request="httpRequest"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传xlsx文件</div>
            </el-upload>
            <el-button style="margin-left: 10px;display:inline-block " size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data: function(){
            return {
                Path:'https://localhost:8090/api/savedata/saveTable',
                FileType:"xlsx",
                form:{},
                //fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
                //{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                fileList:[]
            }
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
                console.log(this.fileList)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        },
    }
</script>

<style scoped>
    
</style>