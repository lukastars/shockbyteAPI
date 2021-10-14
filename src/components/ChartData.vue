<template>
  <div id="card" class="mb-10" style="position: relative;">
    <div class="back-card-chart"></div>
    <div
      class="bg-white front-card w-full m-auto mt-10  p-3"
      :id="chartType + 'chart-container'"
    >
      <div
        class="flex flex-row justify-center items-center	 text-xl mb-1 mt-1  "
      >
        <img v-if="chartType == 'Ram'" class="mr-2 node_img" :src="ram" />
        <img v-if="chartType == 'Disk'" class="mr-2 node_img" :src="disk" />
        <span class="text-xl font-bold text-gray-600 data_title "
          >{{ chartType }} Usage</span
        >
      </div>
      <canvas :id="chartType"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import store from '@/store/index.js';

export default {
  name: 'ChartData',
  props: ['chartType'],

  data() {
    return {
      ram: require('@/assets/ram.png'),
      disk: require('@/assets/disk.png'),
      time: require('@/assets/time.png'),
      a: 'l',
    };
  },
  computed: {
    nodeData() {
      return store.state.currentNodeData;
    },
  },
  watch: {
    nodeData: {
      handler: function() {
        this.chartIt();
      },
      deep: true,
    },
  },
  methods: {
    chartIt() {
      const totalRam = this.nodeData.allocated_ram;
      const freeRam = this.nodeData.free_ram;
      const usedRam = totalRam - freeRam;

      const totalDisk = this.nodeData.allocated_disk;
      const freeDisk = this.nodeData.free_disk;
      const usedDisk = totalDisk - freeDisk;

      const chartContainer = document.getElementById(
        this.chartType + 'chart-container'
      );
      const ctx = document.getElementById(this.chartType);
      ctx.remove();
      const chartCanvas = document.createElement('canvas');
      chartCanvas.setAttribute('id', this.chartType);
      chartContainer.appendChild(chartCanvas);
      const canvas = document.getElementById(this.chartType);
      const config = {
        type: 'doughnut',
        data: {
          labels:
            this.chartType == 'Disk'
              ? ['Used Disk', 'Free Disk']
              : ['Used Ram', 'Free Ram'],
          datasets: [
            {
              label: 'Dataset',
              data:
                this.chartType == 'Ram'
                  ? [usedRam, freeRam]
                  : [usedDisk, freeDisk],
              backgroundColor: ['rgb(29, 30, 33)', 'rgb(40, 177, 255)'],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'test',
            },
          },
        },
      };
      new Chart(canvas, config);
    },
  },
  mounted() {
    this.chartIt();
  },
};
</script>
<style>
.back-card-chart {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  display: block;
  overflow: visible;
  border-radius: 30px;
  background-color: #000;
  background-image: linear-gradient(135deg, rgb(40, 177, 255), #a981ff);
  -webkit-transform: skew(2.5deg, -2.5deg);
  -ms-transform: skew(2.5deg, -2.5deg);
  transform: skew(2.5deg, -2.5deg);
  height: 90%;
  margin-top: 7%;
}
</style>
