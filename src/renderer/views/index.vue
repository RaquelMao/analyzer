<template>
    <div class="main">
        <div class="head" style="-webkit-app-region: drag;">
            <div class="title">
                <div class="title-icon">
                    <img src="../icons/u5.svg"/>
                </div>
                <div class="title-font">SmartRocket Analyzer</div>
            </div>
            <div class="date">Expire Date: {{ date }}</div>
        </div>
        <div class="content" style="-webkit-app-region: no-drag;">
            <div class="content-head">
                <div class="search-title">源码目录/文件：</div>
                <input v-model="filePath"/>
                <button class="scan" @click="openDialog">浏览</button>
                <button class="analyse" @click="analyse">开始分析</button>
            </div>
            <div class="description">
                <div class="description-head">
                    <button class="command-description" @click="openFile">命令说明</button>
                </div>
                <textarea class="command-show" v-model="command">
                </textarea>
            </div>
            <div class="terminal">
                <div class="terminal-head">
                    <button class="open-report" @click="openReport">打开报告</button>
                </div>
                <textarea class="log" v-model="stderr"></textarea>
            </div>
        </div>
        <div v-if="showDetails" class="command-description-details">
            <textarea v-model="content"></textarea>
            <button class="close" @click="closeFile">关闭</button>
        </div>
    </div>
</template>

<script>
  import { generateToken, isFile, readFile } from '../utils/utility';
  import { scanBuild, scanView } from '../utils/shell';

  export default {
    name: 'index',
    data() {
      return {
        filePath: '',
        date: '',
        content: '',
        showDetails: false,
        shellObject: '',
        stderr: '',
        d: '', // 用来标注需要分析的对象是否为文件夹，如果是文件夹，在 scan-build 时需要特殊处理
      };
    },
    created() {
      this.$store.dispatch('InitDate')
        .then(() => {
          this.date = this.$store.getters.expireDate;
        }).catch((e) => {
          console.log(e);
        });
    },
    computed: {
      command: {
        get() {
          let command = '';
          if (this.filePath) {
            if (this.filePath.length > 1) {
              let files = '';
              this.filePath.forEach((file) => {
                files = `${files} ${file}`;
              });
              command = `smartrocket-analyze clang -c ${files}`;
            } else if (isFile(this.filePath[0])) {
              command = `smartrocket-analyze clang -c ${this.filePath[0]}`;
            } else {
              [this.d] = this.filePath;
              command = 'smartrocket-analyze make';
            }
          }
          this.shellObject = command;
          return command;
        },
        set(val) {
          this.shellObject = val;
        },
      },
    },
    methods: {
      analyse() {
        scanBuild(this.shellObject, this.d)
          .then((stderr) => {
            this.stderr = stderr;
          })
          .catch((err) => {
            this.stderr = err;
          });
      },
      openReport() {
        scanView();
      },
      openFile() {
        if (process.platform === 'darwin') {
          this.content = readFile('../files/description');
        } else {
          this.content = readFile('..\\files\\description');
        }
        this.showDetails = true;
      },
      closeFile() {
        this.showDetails = false;
      },
      openDialog() {
        const tokenSend = generateToken();
        this.$electron.ipcRenderer.send('open-dialog', tokenSend);
        this.$electron.ipcRenderer.on('path', (event, filePath, token) => {
          if (token === tokenSend && filePath && filePath.length > 0) {
            this.filePath = filePath;
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss">
    .main {
        position: absolute;
        height: 100%;
        width: 100%;
        line-height: normal;
        font-feature-settings: "kern";
    }
    button {
        outline:none;
    }
    textarea {
        resize: none;
        padding: 5px;
    }
    .head {
        position: absolute;
        height: 40px;
        width: 100%;
        padding-top: 4px;
        border-bottom: 1px solid rgb(215, 215, 215);
        .title {
            font-size: 18px;
            font-weight: 700;
            color: #017296;
            width: 300px;
            float: left;
            font-family: "Lucida Grande",serif;
            .title-font {
                padding-top: 6px;
            }
            .title-icon {
                width: 32px;
                height: 32px;
                float: left;
                margin-left: 13px;
                margin-right: 10px;
            }
        }
        .date {
            padding-top: 10px;
            float: right;
            width: 154px;
            font-size: 12px;
            font-weight: 400;
            color: #333333;
            font-family: Arial,serif;
        }
    }
    .content {
        position: absolute;
        top: 40px;
        padding: 8px;
        width: 100%;
        height: calc(100% - 40px);
        background-color: rgb(242, 242, 242);
    }
    .content-head {
        height: 40px;
        width: 100%;
        font-family: "PingFang SC",serif;
        .search-title {
            padding-top: 10px;
            margin-left: 20px;
            font-size: 14px;
            width: 110px;
            float: left;
        }
        input {
            margin-top: 7px;
            width: 300px;
            height: 25px;
            border-radius: 0px;
            background-color: #FFFFFF;
            padding: 1px 0px 1px 0px;
        }
        .scan {
            margin-left: 6px;
            width: 57px;
            height: 23px;
            font-weight: 400;
            border: 1px solid rgb(121, 121, 121);
            border-radius: 5px;
            background-color: rgb(250, 250, 250);
            font-size: 13px;
        }
        .analyse {
            float: right;
            margin-right: 18px;
            height: 40px;
            width: 140px;
            border-radius: 7px;
            background-color: #169BD5;
            border: none;
            color: rgb(250, 250, 250);
            font-size: 13px;
        }
    }
    .description {
        height: 135px;
        width: 100%;
        border-bottom: 1px solid rgb(215, 215, 215);
        padding-left: 18px;
        padding-right: 18px;
        .command-show {
            border: none;
            width: 100%;
            height: 100px;
        }
    }
    .terminal {
        padding-left: 20px;
        padding-right: 20px;
        width: 100%;
        height: 350px;
        .log {
            width: 100%;
            height: 100%;
            background-color: #333333;
            color: rgb(250, 250, 250);
        }
    }
    .terminal-head, .description-head{
        width: 100%;
        height: 12px;
        .open-report, .command-description{
            padding-right: 20px;
            float: right;
            border: none;
            background-color: rgb(242, 242, 242);
            font-size: 13px;
            text-decoration: underline;
            font-family: "PingFang SC",serif;
            font-weight: 400;
            color: #169BD5;
        }
    }
    .command-description-details {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:-244px;
        margin-top:-194px;
        width: 500px;
        height: 400px;
        padding: 5px;
        z-index: 9999;
        background-color: rgb(242, 242, 242);
        border-radius: 5px;
        box-shadow:1px 1px 1px 1px #333333;
        textarea {
            border: none;
            border-radius: 5px;
            width: 100%;
            height: 90%;
        }
        .close {
            float: left;
            margin-left: 200px;
            margin-top: 5px;
            height: 25px;
            width: 80px;
            border-radius: 7px;
            background-color: #169BD5;
            border: none;
            color: rgb(250, 250, 250);
            font-size: 13px;
        }
    }
</style>
