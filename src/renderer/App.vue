<template>
  <div id="app">
    <el-container :style="{'height':winHeight+'px'}">
      <el-aside :style="{'height':winHeight+'px'}">
        <el-menu :default-openeds="['2', '3']">

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>文件助手</template>
            <el-menu-item index="2-4-1">
              <router-link to='home'>欢迎页面</router-link>
            </el-menu-item>
            <el-menu-item index="2-4-2">
              <router-link to='excel'>excel解析</router-link>
            </el-menu-item>
            <el-menu-item index="2-4-3">
              <router-link to='msg'>socket发送消息</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <router-link to='setting'><i class="el-icon-setting"></i>系统设置</router-link>
          </el-menu-item>
<!--          <el-submenu index="3">-->
<!--            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>-->

<!--            <el-menu-item index="3-1">-->
<!--              <router-link to='sql'>数据库设置</router-link>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="3-1">-->
<!--              <router-link to='msg'>socket发送消息</router-link>-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container :style="{'height':winHeight+'px'}" class="main-content">
        <router-view></router-view>
      </el-container>

      <el-dialog
              title="正在更新,请稍候..."
              :visible.sync="dialogVisible"
              width="60%"
              :close-on-click-modal="closeOnClickModal"
              :close-on-press-escape="closeOnPressEscape"
              :show-close="showClose"
              center
      >
        <div style="width:100%;height:20vh;line-height:20vh;text-align:center">
          <el-progress
                  status="success"
                  :text-inside="true"
                  :stroke-width="20"
                  :percentage="percentage"
                  :width="strokeWidth"
                  :show-text="true"
          ></el-progress>
        </div>
      </el-dialog>

    </el-container>
  </div>
</template>

<script>

  // //间隔1小时检测一次
  // let interval = window.setInterval(() => {
  //   ipcRenderer.send("checkForUpdate");
  // }, 3600000);

  export default {
    name: 'electron-excel',
    data(){
      return{
        winHeight:document.documentElement.clientHeight,
        dialogVisible: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        percentage: 0,
        strokeWidth:200
      }
    },
    created () {
      //接收主进程版本更新消息
      this.$electron.ipcRenderer.on('message', (event, arg) => {
       // this.dialogVisible = true;
        console.log(arg);
        if ("update-available" == arg.cmd) {
          //显示升级对话框
          this.dialogVisible = true;
        } else if ("download-progress" == arg.cmd) {
          //更新升级进度
          /**
           *
           * message{bytesPerSecond: 47673
                    delta: 48960
                    percent: 0.11438799862426002
                    total: 42801693
                    transferred: 48960
              }
           */
          console.log(arg.message.percent);
          let percent = Math.round(parseFloat(arg.message.percent));
          this.percentage = percent;
        }  else if("update-downloaded"== arg.cmd){
          this.dialogVisible = false;
          this.$confirm('更新完成，马上升级', '提示', {
            showClose:false,
            showCancelButton:false,
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.$electron.ipcRenderer.send("updateNow");
          });
        }

      })
      window.setTimeout(() => {
        this.$electron.ipcRenderer.send("checkForUpdate");
      }, 3000);


    },
    sockets:{
      connect: function(){  //vue客户端和socket.io服务器端建立连接以后触发的方法
        console.log('socket connected')
      },
      login: function(val){  //接收服务器广播的数据
        console.log(val);

      }
    },
    mounted() {

      //监听网络变化
      window.addEventListener('online', function(){
        console.log('有网络了')
      });
      window.addEventListener('offline', function(){
        const option = {
          title: '提示!',
          body: '网络已经断开，请检查您的网络设置!',
          //  icon: path.join('main-process/favicon2.ico')
        }
        const myNotification = new window.Notification(option.title,option);
        myNotification.onclick = () =>{
          console.log('点击了');
        }

      });
      //监听右键菜单
      window.addEventListener('contextmenu',(e)=>{
        e.preventDefault();
        //给主进程广播事件   注意this指向
        this.$electron.ipcRenderer.send('contextmenu');
      })

      window.onresize=()=>{
        this.winHeight=document.documentElement.clientHeight;
      }

      //数据更新时，向服务器端发送事件
      // $socket is socket.io-client instance
      this.$socket.emit("compile")


    }
    // destroyed() {
    //   window.clearInterval(interval);
    //   window.clearInterval(timeOut);
    // }


  }
</script>

<style lang="scss">
  *{
    margin:0px;
    padding:0px;
  }
  .el-aside {
    width: 200px!important;
    background: #eee;
    a{
      color: #333;
      display: block;
      text-decoration: none;
    }
    .el-menu{
      background: #eee;
    }
  }
  .el-container{
    // padding:10px;
    width: 100%;
  }
  .main-content {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
  }
  .content {
    width: 100%;
  }


  /*全局布局*/
  .main_top{
    background: none repeat scroll 0 0 #FFFCED;
    border: 1px solid #FFFCED;
    line-height: 20px;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .page{
    text-align: center;
    margin-top:20px;
  }
  .v-modal{
    opacity: 0.8!important;
  }
  .router-link-active {
    color: rgba(237, 94, 84, 0.98) !important;
    i {
      color: rgba(237, 94, 84, 0.98) !important;
    }
  }
</style>
