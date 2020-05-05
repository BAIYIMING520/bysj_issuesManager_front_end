<template>
    <div class="login-wrap">
            <div class='pic_box'>
               <img src="../../assets/img/logo.png" alt="">
           </div>
        <div class="ms-login">
            
            <div class="ms-title">基于log的issues在线管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'root',
                password: 'root',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
            },
        };
    },
    methods: {
        submitForm() {
            // const stateStander = object({ Success: 'Success', NoUser: 'data base don\'t have this username or sth', PasswordError: 'PasswordError' })
            // 之后使用了标准 SInt=1 NInt=2 PInt=3
            const stateStander = { Success: 1, NoUser: 2, PasswordError: 3 }
            this.$refs.login.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.post('http://localhost:8090/api/logincheck',this.param)
                    console.log(res)
                    if (res.state === stateStander.Success) {
                        console.log(res)
                        window.sessionStorage.setItem('userId',res.userId)
                        window.sessionStorage.setItem('token', res.token)
                        window.sessionStorage.setItem('username', res.username)
                        window.sessionStorage.setItem('authority', res.authority)
                        window.sessionStorage.setItem('tableId',res.tablesId)//这里给出权限到底是可以修改打标那一张表格
                        this.$router.push('/'); //这里就是直接跳转到当前主页
                        return this.$message.success({message:"欢迎回来",duration:1000})
                    } else if (res.state === stateStander.NoUser) {
                        return this.$message.error({message:'登陆失败,没有此用户',duration:1000})
                        // alert('没有此用户')
                    } else {
                        // alert('密码错误')
                        return this.$message.error({message:'登陆失败,密码错误',duration:1000})
                    }
                    //localStorage.setItem('username', this.param.username);
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>

.pic_box{
    height: 150px;
    width: 150px;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-150%);
    border: 1px solid #eee;
    border-radius: 50%;
   
}
.pic_box img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee ddd;
}


.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(7, 70, 64);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>