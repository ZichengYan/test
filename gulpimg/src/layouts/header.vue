<template>
    <div class="headers clearfix">
        <p class="left breadcrumb">
            <span class="nowPosition">当前位置：</span>
            <breadcrumb></breadcrumb>
        </p>
        <ul class="layui-nav top_menu right" style="padding: 0 10px 0 0">
            <li class="layui-nav-item layui-nav-item-last">
                <a href="javascript:;"><i class="iconfont icon-lock1"></i><span>预约提醒</span><span class="layui-nav-more"></span></a>
                <dl class="layui-nav-child layui-anim layui-anim-upbit">
                    <dd>
                        <router-link to="/remind/hairdresser">流动发型师预约</router-link>
                    </dd>
                    <dd>
                        <router-link to="/remind/customer">客户预约</router-link>
                    </dd>
                </dl>
            </li>
            <li class="layui-nav-item layui-nav-item-last lockcms" pc="">
                <a href="javascript:;"><i class="iconfont icon-lock1"></i><span>访问店铺</span><span class="layui-nav-more"></span></a>
                <dl class="layui-nav-child layui-anim layui-anim-upbit" style="width: 150px;left: -20px;">
                    <dd>
                        <img src="../assets/images/imgFace.jpg" alt=""/>
                    </dd>
                    <dd style="text-align: center;">
                        扫描二维码访问
                    </dd>
                </dl>
            </li>
            <li class="layui-nav-item layui-nav-item-last" pc="">
                <a href="javascript:;">
                    <i class="usrIcon">
                        <img src="../assets/images/imgFace.jpg" class="layui-circle">
                    </i>
                    <span>admin</span>
                    <span class="layui-nav-more"></span>
                </a>
                <dl class="layui-nav-child layui-anim layui-anim-upbit">
                    <dd @click="popDialog.personal.dialogFormVisible = true"><a href="javascript:;" data-url="page/user/userInfo.html"><i class="iconfont icon-zhanghu" data-icon="icon-zhanghu"></i><span>个人资料</span></a></dd>
                    <dd @click="popDialog.password.dialogFormVisible = true"><a href="javascript:;" data-url="page/user/changePwd.html"><i class="iconfont icon-shezhi1" data-icon="icon-shezhi1"></i><span>修改密码</span></a></dd>
                    <dd @click="logout"><a href="javascript:;"><i class="iconfont icon-loginout"></i><span>退出</span></a></dd>
                </dl>
            </li>
        </ul>

        <!--弹窗修改个人信息-->
        <el-dialog :show-close="false" title="修改个人信息" :visible.sync="popDialog.personal.dialogFormVisible" width=500px>
            <el-form size="small" :model="popDialog.personal.form" :rules="popDialog.personal.rules" ref="personalInfo" label-width="100px">
                <el-form-item label="真实姓名" prop="uname">
                    <el-input v-model="popDialog.personal.form.uname"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="popDialog.personal.form.sex">
                        <el-radio label="男" :key="1" value="男"></el-radio>
                        <el-radio label="女" :key="2" value="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="popDialog.personal.form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="popDialog.personal.form.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('personalInfo')">取 消</el-button>
                <el-button type="primary" @click="modPersonalInfo('personalInfo')">确 定</el-button>
            </div>
        </el-dialog>

        <!--弹窗修改密码-->
        <el-dialog :show-close="false" title="修改密码" :visible.sync="popDialog.password.dialogFormVisible" width="500px">
            <el-form size="small" :model="popDialog.password.form" :rules="popDialog.password.rules" ref="password" label-width="100px">
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="popDialog.password.form.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="popDialog.password.form.confirmPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('password')">取 消</el-button>
                <el-button type="primary" @click="modPassword('password')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import breadcrumb from 'layouts/breadcrumb.vue';


    export default {
        name: "header",
        components: {breadcrumb},
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value != this.popDialog.password.form.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                popDialog: {
                    personal: {
                        formLabelWidth: '80px',
                        dialogFormVisible: false,
                        form: {
                            uname: '',
                            sex: '男',
                            mobile: '',
                            email: '',
                            act: "editinfo" //editpass
                        },
                        rules: {
                            uname: [
                                {required: true, message: '请输入名字', trigger: 'blur'},
                                {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                            ],
                            sex: [
                                {required: true, message: '请选择性别', trigger: 'change'}
                            ],
                            mobile: [
                                {required: true, message: '请输入电话', trigger: 'blur'},
                            ]
                        }
                    },
                    password: {
                        formLabelWidth: '80px',
                        dialogFormVisible: false,
                        form: {
                            newPassword: '',
                            confirmPassword: '',
                        },
                        rules: {
                            newPassword: [
                                {required: true, message: '请输入新密码', trigger: 'blur'},
                                {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                            ],
                            confirmPassword: [
                                {required: true, message: '请再次输入密码', trigger: 'blur'},
                                {validator: validatePass2, trigger: 'blur'},
                            ]
                        }
                    }
                }
            }
        },
        methods: {

            // 修改个人信息
            modPersonalInfo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.popDialog.personal.form.act = 'editpass'
                        this.$http.post(
                            this.api.edit,
                            this.popDialog.personal.form
                        )
                            .then((response) => {
                                this.popDialog.addMember.dialogFormVisible = false;
                                this.utils.successMsg(this, response.msg);
                            })
                    } else {
                        return false;
                    }
                });
            },

            // 修改密码
            modPassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.popDialog.personal.form.act = 'editpass';
                        let psotData = {
                            act: "editpass",
                            password: this.popDialog.password.form.newPassword
                        }
                        this.$http.post(this.api.edit,
                            psotData)
                            .then((response) => {
                                this.popDialog.addMember.dialogFormVisible = false;
                                this.utils.successMsg(this, response.msg);
                            })
                    } else {
                        return false;
                    }
                });
            },

            // 登出
            logout() {
                this.$confirm('确定退出吗？')
                    .then(() => {
                        this.$http.get(this.api.logout, {})
                            .then((response) => {
                                this.utils.successMsg(this, response.msg);
                            })
                    })
            },

            // 重置表单
            resetForm(formName) {
                this.popDialog.personal.dialogFormVisible = false;
                this.popDialog.password.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style lang="scss" scoped>
    .headers {
        color: $color-secondary;
        width: 100%;
        height: 100%;
        a {
            color: inherit;
            line-height: 3.5;
        }
        p, ul {
            height: 100%;
            li {
                height: 100%;
            }
            a {
                height: 100%;
            }
        }
    }

    .nowPosition {
        display: inline-block;
        vertical-align: middle;
    }

    .usrIcon {
        display: inline-block;
        width: 35px;
        height: 35px;
    }

    .rightWrap {
        margin-left: 205px;
        height: 100%;
        overflow: auto;
    }

    .user-photo {
        width: 200px;
        height: 120px;
        padding-top: 15px;
        padding-bottom: 5px;
    }

    .user-photo a.img {
        display: block;
        width: 76px;
        height: 76px;
        margin: 0 auto;
        margin-bottom: 15px;
        border-radius: 50%;
        border-radius: 50%;
        border-radius: 50%;
        border: 4px solid #44576b;
    }

    .user-photo p {
        text-align: center;
        font-size: 16px;
    }

    .user-photo a.img img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    img {
        display: block;
    }

    .layui-nav, .layui-nav .layui-nav-item a {
        transition: all 0.3s ease-in-out;
    }

    .wrapTop {
        background-color: #23262E;
    }

    .layui-nav {
        position: relative;
        font-size: 14px;
        padding-top: 30px;
    }

    .layui-nav-tree .layui-nav-item {
        display: block;
        width: 100%;
        line-height: 45px;
    }

    .layui-nav-tree .layui-nav-item a {
        height: 45px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        border-left: 4px solid #393D49;
    }

    .layui-nav .layui-nav-item a {
        display: block;
        padding: 0 20px;
        text-decoration: none !important;
    }

    .layui-nav .layui-nav-item a:hover, .layui-nav .layui-nav-item a.cur {
        background: #4E5465;
        border-color: #009688;
    }

    .layui-nav-item a span {
        padding: 0 5px;
    }

    .layui-nav .layui-nav-item {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }

    .layui-anim-upbit {
        animation-name: layui-upbit;
        animation-name: layui-upbit;
    }

    .layui-anim, .layui-nav-child {
        animation-duration: .3s;
        animation-fill-mode: both;
    }

    .layui-nav-child {
        display: none;
        position: absolute;
        left: 0;
        top: 53px;
        min-width: 100%;
        line-height: 36px;
        padding: 5px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        border-top: 1px solid #d2d2d2;
        background-color: $header-background-color;
        z-index: 100;
        border-radius: 2px;
        white-space: nowrap;
    }

    .layui-nav-child dd {
        position: relative;
    }

    .layui-nav .layui-nav-child a {
    }

    .layui-nav .layui-nav-child a:hover {
    }

    .layui-nav .layui-nav-item a {
        display: block;
        padding: 0 20px;
        transition: all .3s;
        transition: all .3s;
    }

    .top_menu .iconfont {
        font-size: 14px !important;
    }

    .layui-circle {
        border-radius: 50%;
        border-radius: 50%;
        border-radius: 50%;
        display: inline-block;
    }

    .rightWrap .layui-nav-item, .rightWrap .layui-nav-item a {
        height: 53px;
        line-height: 52px;
    }

    .layui-nav .layui-nav-more {
        content: '';
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: #c2c2c2 transparent transparent;
        overflow: hidden;
        cursor: pointer;
        transition: all .2s;
        transition: all .2s;
        position: absolute;
        top: 23px;
        right: 3px;
        border-width: 6px;
        padding: 0;
    }

    .layui-nav-item-last:hover .layui-nav-more {
        top: 16px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #c2c2c2;
    }

    .layui-nav-item-last:hover .layui-nav-child {
        display: block;
    }

    .breadcrumb {
        max-width: 356px;
        line-height: 52px;
        font-size: 14px;
    }

    .container {
        overflow: auto;
    }

    /*首页*/
    .indexCont {
        width: 100%;
    }

    .index_tap {
        padding: 15px 0px;
    }

    .index_tap a {
        width: 120px;
        background: #333;
        margin-right: 14px;
    }

    .index_grand_total {
        padding: 10px 0;
    }

    .index_grand_total li {
        width: 19%;
        margin-right: 1%;
        height: 108px;
        background: #009688;
        font-size: 14px;
        font-weight: 600;
    }

    .index_grand_total li .p1 {
        padding: 20px 0 0 20px;
    }

    .index_grand_total li .p3 {
        padding: 10px 0 0 0;
        font-size: 16px;
    }

    .index_grand_today li {
        width: 24%;
        margin-right: 1%;
    }
</style>
