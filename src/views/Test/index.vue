<template>
  <div class="test-view-container">
    <div>测试用例</div>
    <div>
      <el-select v-model="$i18n.locale" placeholder="请选择语言">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div>{{ $t("lang.home") }}</div>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
      </el-dialog>
    </div>
    <div>
      <div>echarts 基础图形</div>
      <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
    </div>
    <div>
      <div>echarts 3D柱状图</div>
      <div
        id="myChart3D"
        :style="{ width: '80%', height: '500px', margin: '0 auto' }"
      ></div>
    </div>
    <div>
      <div>图片涂鸦</div>
      <MarkImageCanvas
        :url="canvasImageUrl"
        width="1024"
        height="768"
        :info="infoArr"
      ></MarkImageCanvas>
    </div>
    <div>
      <div>svg 示例</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="600"
          height="400"
        >
          <ellipse cx="240" cy="100" rx="220" ry="30" style="fill: purple" />
          <ellipse cx="220" cy="70" rx="190" ry="20" style="fill: lime" />
          <ellipse cx="210" cy="45" rx="170" ry="15" style="fill: yellow" />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="600"
          height="400"
        >
          <rect x="0" y="0" width="100" height="100" fill="#feac5e">
            <animate
              attributeName="x"
              from="0"
              to="500"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              to="500"
              dur="2s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              begin="0s"
              dur="10s"
              from="0 200 200"
              to="360 400 400"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import MarkImageCanvas from "@/components/MarkImageCanvas";
export default {
  name: "test-view",
  data() {
    return {
      canvasImageUrl: require("@/assets/images/test/test.bmp"),
      // canvasImageUrl: "",
      infoArr: [
        {
          type: "",
          regionColor: "red",
          region: [
            { x: 0, y: 0 },
            { x: 0.5, y: 0.5 },
            { x: 1, y: 0 },
          ],
          areaName: "测试",
        },
      ],
      options: [
        {
          value: "en",
          label: "英文",
        },
        {
          value: "zh-CN",
          label: "简体中文",
        },
        {
          value: "zh-TW",
          label: "繁体中文",
        },
      ],
      dialogVisible: false,
      value1: "",
    };
  },
  created() {},
  mounted() {
    this.drawLine();
    this.draw3DBar();
  },
  beforeDestroy() {},
  components: { MarkImageCanvas },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    drawLine() {
      let _this = this;
      const chartDom = document.getElementById("myChart");
      console.log(chartDom, "chartDom");
      console.log(_this.echarts, "this.$echarts");
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(chartDom);
      // 绘制图表
      myChart.setOption({
        title: { text: "echarts基础示例" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    draw3DBar() {
      var chartDom = document.getElementById("myChart3D");
      var myChart = this.$echarts.init(chartDom);
      var option;

      var hours = [
        "12a",
        "1a",
        "2a",
        "3a",
        "4a",
        "5a",
        "6a",
        "7a",
        "8a",
        "9a",
        "10a",
        "11a",
        "12p",
        "1p",
        "2p",
        "3p",
        "4p",
        "5p",
        "6p",
        "7p",
        "8p",
        "9p",
        "10p",
        "11p",
      ];
      var days = [
        "Saturday",
        "Friday",
        "Thursday",
        "Wednesday",
        "Tuesday",
        "Monday",
        "Sunday",
      ];

      var data = [
        [0, 0, 5],
        [0, 1, 1],
        [0, 2, 0],
        [0, 3, 0],
        [0, 4, 0],
        [0, 5, 0],
        [0, 6, 0],
        [0, 7, 0],
        [0, 8, 0],
        [0, 9, 0],
        [0, 10, 0],
        [0, 11, 2],
        [0, 12, 4],
        [0, 13, 1],
        [0, 14, 1],
        [0, 15, 3],
        [0, 16, 4],
        [0, 17, 6],
        [0, 18, 4],
        [0, 19, 4],
        [0, 20, 3],
        [0, 21, 3],
        [0, 22, 2],
        [0, 23, 5],
        [1, 0, 7],
        [1, 1, 0],
        [1, 2, 0],
        [1, 3, 0],
        [1, 4, 0],
        [1, 5, 0],
        [1, 6, 0],
        [1, 7, 0],
        [1, 8, 0],
        [1, 9, 0],
        [1, 10, 5],
        [1, 11, 2],
        [1, 12, 2],
        [1, 13, 6],
        [1, 14, 9],
        [1, 15, 11],
        [1, 16, 6],
        [1, 17, 7],
        [1, 18, 8],
        [1, 19, 12],
        [1, 20, 5],
        [1, 21, 5],
        [1, 22, 7],
        [1, 23, 2],
        [2, 0, 1],
        [2, 1, 1],
        [2, 2, 0],
        [2, 3, 0],
        [2, 4, 0],
        [2, 5, 0],
        [2, 6, 0],
        [2, 7, 0],
        [2, 8, 0],
        [2, 9, 0],
        [2, 10, 3],
        [2, 11, 2],
        [2, 12, 1],
        [2, 13, 9],
        [2, 14, 8],
        [2, 15, 10],
        [2, 16, 6],
        [2, 17, 5],
        [2, 18, 5],
        [2, 19, 5],
        [2, 20, 7],
        [2, 21, 4],
        [2, 22, 2],
        [2, 23, 4],
        [3, 0, 7],
        [3, 1, 3],
        [3, 2, 0],
        [3, 3, 0],
        [3, 4, 0],
        [3, 5, 0],
        [3, 6, 0],
        [3, 7, 0],
        [3, 8, 1],
        [3, 9, 0],
        [3, 10, 5],
        [3, 11, 4],
        [3, 12, 7],
        [3, 13, 14],
        [3, 14, 13],
        [3, 15, 12],
        [3, 16, 9],
        [3, 17, 5],
        [3, 18, 5],
        [3, 19, 10],
        [3, 20, 6],
        [3, 21, 4],
        [3, 22, 4],
        [3, 23, 1],
        [4, 0, 1],
        [4, 1, 3],
        [4, 2, 0],
        [4, 3, 0],
        [4, 4, 0],
        [4, 5, 1],
        [4, 6, 0],
        [4, 7, 0],
        [4, 8, 0],
        [4, 9, 2],
        [4, 10, 4],
        [4, 11, 4],
        [4, 12, 2],
        [4, 13, 4],
        [4, 14, 4],
        [4, 15, 14],
        [4, 16, 12],
        [4, 17, 1],
        [4, 18, 8],
        [4, 19, 5],
        [4, 20, 3],
        [4, 21, 7],
        [4, 22, 3],
        [4, 23, 0],
        [5, 0, 2],
        [5, 1, 1],
        [5, 2, 0],
        [5, 3, 3],
        [5, 4, 0],
        [5, 5, 0],
        [5, 6, 0],
        [5, 7, 0],
        [5, 8, 2],
        [5, 9, 0],
        [5, 10, 4],
        [5, 11, 1],
        [5, 12, 5],
        [5, 13, 10],
        [5, 14, 5],
        [5, 15, 7],
        [5, 16, 11],
        [5, 17, 6],
        [5, 18, 0],
        [5, 19, 5],
        [5, 20, 3],
        [5, 21, 4],
        [5, 22, 2],
        [5, 23, 0],
        [6, 0, 1],
        [6, 1, 0],
        [6, 2, 0],
        [6, 3, 0],
        [6, 4, 0],
        [6, 5, 0],
        [6, 6, 0],
        [6, 7, 0],
        [6, 8, 0],
        [6, 9, 0],
        [6, 10, 1],
        [6, 11, 0],
        [6, 12, 2],
        [6, 13, 1],
        [6, 14, 3],
        [6, 15, 4],
        [6, 16, 0],
        [6, 17, 0],
        [6, 18, 0],
        [6, 19, 0],
        [6, 20, 1],
        [6, 21, 2],
        [6, 22, 2],
        [6, 23, 6],
      ];
      option = {
        tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        xAxis3D: {
          type: "category",
          data: hours,
        },
        yAxis3D: {
          type: "category",
          data: days,
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          environment: "auto",
          viewControl: {
            // projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true,
            },
            ambient: {
              intensity: 0.3,
            },
          },
        },
        series: [
          {
            type: "bar3D",
            data: data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]],
              };
            }),
            shading: "lambert",

            label: {
              fontSize: 16,
              borderWidth: 1,
            },

            emphasis: {
              label: {
                fontSize: 20,
                color: "#900",
              },
              itemStyle: {
                color: "#900",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
