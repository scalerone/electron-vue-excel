<template>
    <div  class="content">


        <el-header>
              <el-alert
                      title="操作说明"
                      description="1.上传文件格式为.xlsx, .xls；2.请不要上传大于1M的文件！ "
                      type="info"
                      show-icon
                      :closable="false">
                      :closable="false">
              </el-alert>
        </el-header>
        <div class="app-container">
            <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
            <el-table  :data="tableData" border stripe highlight-current-row  style="width: 100%;margin-top:20px;">
                <el-table-column v-for="(item,index) in tableHeader" :key="index" :prop="item" :label="item" />
            </el-table>

        </div>

    </div>
</template>

<script>
    import UploadExcel from './ExcelPage/UploadExcel'

    export default {
        name: 'ExcelPage',
        components: { UploadExcel },
        data() {
            return {
                tableData: [],


                tableHeader: []
            }
        },
        methods: {
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 2

                if (isLt1M) {
                    return true
                }

                this.$message({
                    message: '请不要上传大于2M的文件.',
                    type: 'warning'
                })
                return false
            },
            handleSuccess({ results, header }) {

                this.tableData = results
                this.tableHeader = header
                console.log('header:')
                console.log(header)
                console.log('results:')
                console.log(results)
            }
        },
        mounted() {


        }
    }
</script>

<style scoped>
    .app-container {
        padding: 20px;
    }
</style>
