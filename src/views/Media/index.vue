<template>
  <div class="media-view-container">
    <div class="media-view-box">
      <div class="page-left-container">
        <div class="page-left-header">
          <div class="import-media-image">
            <img src="../../assets/images/media/file.png" />
            <div>导入影像</div>
          </div>
          <div class="form-container">
            <el-form :inline="true" :model="searchForm">
              <el-form-item label="导入时间">
                <el-date-picker
                  v-model="searchForm.importTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="检查部位">
                <el-select
                  v-model="searchForm.checkPart"
                  placeholder="检查部位"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="甲状腺" value="1"></el-option>
                  <el-option label="其他部位" value="9"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分析">
                <el-select v-model="searchForm.analysis" placeholder="分析">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="searchForm.user"
                  placeholder="受检者姓名/编号/文件名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="page-left-content">
          <div class="meida-ul-box">
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
            <div class="meida-ul-box-li"></div>
          </div>
        </div>
      </div>
      <div class="page-right-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "media-view",
  data() {
    return {
      searchForm: {
        importTime: [],
        checkPart: "",
        analysis: "",
        user: "",
      },
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  components: {},
  methods: {
    onSubmit() {},
    load() {},
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
