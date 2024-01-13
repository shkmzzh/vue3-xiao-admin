<template>
  <el-card shadow="never">
    <template #header>
      <div class="title">
        每日一件代发出库
        <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
          <i-ep-download class="download" @click="downloadEchart" />
        </el-tooltip>
      </div>
    </template>

    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "FoldChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});

const options = {
  xAxis: [
    {
      type: "category",
      data: ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06", "01/07", "01/08", "01/09", "01/10", "01/11"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 500,
      interval: 100,
      axisLabel: {
        formatter: "{value} ",
      },
    },
    {
      type: "value", // 右侧 y 轴的类型为数值型
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: "{value}%",
      },
      position: "right", // 将右侧 y 轴放置在图表的右侧
    },
  ],
  series: [
    {
      name: "收入",
      type: "line",
      data: [120, 250, 170, 200, 500, 150, 230, 224, 218, 135, 75],
     
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83bff6" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#188df0" },
        ]),
      },
      markLine: {
        // 中间标记线
        data: [{ type: "average", name: "Avg" }],
        label: {
          show: false,
        },
        lineStyle: {
          color: "red",
        },
      },
    },
  ],
  tooltip: {
    trigger: "axis", // 设置触发类型为坐标轴轴线触发
    formatter: function (params:any) {
      const dataIndex = params[0].dataIndex; // 获取当前数据点的索引
      const value = params[0].value; // 获取当前数据点的值
      return `日期：${options.xAxis[0].data[dataIndex]}<br />出库：${value}`;
    },
  },
};
const chart = ref<any>("");
onMounted(() => {
  // 图表初始化
  chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));

  chart.value.setOption(options);

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});
const downloadEchart = () => {
  // 获取画布图表地址信息
  const img = new Image();
  img.src = chart.value.getDataURL({
    type: "png",
    pixelRatio: 1,
    backgroundColor: "#fff",
  });
  // 当图片加载完成后，生成 URL 并下载
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const link = document.createElement("a");
      link.download = `业绩柱状图.png`;
      link.href = canvas.toDataURL("image/png", 0.9);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;

  .download {
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
