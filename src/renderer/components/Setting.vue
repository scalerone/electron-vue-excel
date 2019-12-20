<template>
    <div class="setting">

        <div  class="setting-list" >


                <el-form
                        label-width="120px"
                        label-position="right"
                        size="small"
                >
                    <el-form-item
                            label="设置数据连接"
                    >
                        <el-button type="danger" round size="mini" @click="dbVisible = true">点击设置</el-button>
                    </el-form-item>

                </el-form>

            <el-dialog
                    title="数据库配置"
                    :visible.sync="dbVisible"
                    :modal-append-to-body="false"
                    width="50%"
                    center
            >


                <el-form
                        label-position="right"
                        label-width="80px"
                >
                    <el-form-item
                            label="地址"
                    >
                        <el-input
                                v-model="dbform.host"
                                :autofocus="true"
                                placeholder="例如：127.0.0.1"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="端口"
                    >
                        <el-input
                                v-model="dbform.port"
                                placeholder="例如：3306"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="用户名"
                    >
                        <el-input
                                v-model="dbform.user"
                                placeholder="请输入用户名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码"
                    >
                        <el-input
                                v-model="dbform.password"
                                type="password"
                                show-password
                                placeholder="请输入密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                            label="数据库"
                    >
                        <el-input
                                v-model="dbform.database"
                                placeholder="请输入数据库名"
                        ></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer">
        <el-button @click="cancelDb" round>取消</el-button>
        <el-button type="primary" @click="confirmDb" round>确定</el-button>
      </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import db from '../../datastore'
    export default {
        name: "Setting",
        data(){

            return{
                dbform:{
                    host: db.get('dbconf.host') || '',
                    user: db.get('dbconf.user') || '',
                    password: db.get('dbconf.password') || '',
                    port: db.get('dbconf.port') || '',
                    database: db.get('dbconf.database') || ''
                },
                dbVisible: false,

            }
        },
        methods:{
            cancelDb () {
                this.dbVisible = false
                //this.proxy = this.$db.get('picBed.proxy') || undefined
            },
            confirmDb () {
                this.dbVisible = false
                console.log(this.dbform);
                db.set('dbconf', this.dbform)
                const successNotification = new window.Notification('数据库配置', {
                    body: '设置成功'
                })
                successNotification.onclick = () => {
                    return true
                }
            },
        }
    }
</script>

<style scoped lang="scss">
     .setting{
         width: 100%;
         .setting-list{
             margin: 0 auto;
             width: 26%;
         }

     }

</style>
