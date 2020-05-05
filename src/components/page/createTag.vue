<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 标签库
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建立issue标签</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div v-html="test">
            </div> -->
            <div class="form-box ThisPosChange">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标签名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>  
                    <el-form-item>
                    </el-form-item>
                    <el-form-item label="创建日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.date2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="等级选择" class="middlePos">
                        <el-radio-group v-model="form.radioColor">
                            <el-radio-button v-for="(item, index) in levelOption" :key="index" :label="item.level" 
                             ></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                    <el-form-item style="float:right;margin-top:5px">
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button style="margin-left:50px;">取消</el-button>
                    </el-form-item>
                    <div style="height:20px"></div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                name: '',
                date1: '',
                date2: '',//文本中时间信息应该是将2个字
                radioColor:0,//这里需要将标号转换
                content: '',// 这里是富文本编辑器找中存储内容 可以使用
            },
            
            editorOption: {
                    placeholder: '请在这里输入标签描述 或是 推荐解决手段'
            },
            levelOption:{
                1:{
                    color:'red',
                    level:'致命缺陷',
                    value:1
                },
                2:{
                    color:'orange',
                    level:'严重缺陷',
                    value:2
                },
                3:{
                    color:'yellow',
                    level:'一般缺陷',
                    value:3
                },
                4:{
                    color:'blue',
                    level:'值得关注的缺陷',
                    value:4
                },
                5:{
                    color:'green',
                    level:'可以忽略的缺陷',
                    value:5
                } 
            }  
        };
    },
    methods: {
        onSubmit() {
            if(this.form.name===''||this.form.date1===''||this.form.date2===''||this.form.radioColor===0||this.form.content===''){
                this.$message.error('有参数没有填写,请查询后再提交')
                //首先检测其中是否是空白没有填写
            }else{
                //这里做一次转换检测
                this.transdata()//变换数字
                console.log(this.form)
                this.$http.post('http://localhost:8090/api/savedata/saveTag',this.form)
                .then(res => {
                    this.$message.success('提交成功！');
                    this.form.name='';
                    this.form.date1='';
                    this.form.date2='';
                    this.form.radioColor='';
                    this.form.content='';
                    重置
                })
            } 
        },
        transdata(){
            //等级重置
            switch(this.form.radioColor){
                //这里是
                case '致命缺陷':
                    this.form.radioColor=1;
                    break;
                case '严重缺陷':
                    this.form.radioColor=2;
                    break;
                case '一般缺陷':
                    this.form.radioColor=3;
                    break;
                case '值得关注的缺陷':
                    this.form.radioColor=4;
                    break;
                case '可以忽略的缺陷':
                    this.form.radioColor=5;
                    break;   
            }
        },
        onEditorChange({ editor, html, text }) {
                this.content = html;
            },
    },
    components: {
            quillEditor
    }
};
</script>
<style scoped>
.ThisPosChange{

}
.middlePos{
  
}
.test{
    color: rgb(179, 8, 8);
}
</style>