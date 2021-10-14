<template>
  <div id="card" class="mb-10" style="position: relative;">
    <div class="back-card"></div>
    <div class="front-card w-full m-auto  p-10 text-center ">
      <div class="mb-2">
        <div class="flex flex-row justify-center items-center	 text-xl mb-1 ">
          <img class="mr-2 node_img" :src="node" />
          <span class=" data_title font-bold">Node ID </span>
        </div>
        <span class="text-xl font-bold text-gray-600"> {{ nodeData.id }}</span>
      </div>

      <div class="mb-2">
        <div class="flex flex-row justify-center items-center	 text-xl mb-1 ">
          <img class="mr-2 node_img" :src="ram" />
          <span class=" data_title font-bold">Ram Usage </span>
        </div>
        <span class="text-xl font-bold text-gray-600"
          >{{
            ((nodeData.allocated_ram - nodeData.free_ram) / 1000).toFixed(1) +
              '/' +
              (nodeData.allocated_ram / 1000).toFixed(1)
          }}
          GB</span
        >
      </div>
      <div class="mb-2">
        <div
          class="flex flex-row justify-center items-center	 text-xl mb-1 mt-1 "
        >
          <img class="mr-2 node_img" :src="disk" />
          <span class="data_title font-bold">Disk Usage</span>
        </div>
        <span class="text-xl font-bold text-gray-600"
          >{{
            ((nodeData.allocated_disk - nodeData.free_disk) / 1000).toFixed(1) +
              '/' +
              (nodeData.allocated_disk / 1000).toFixed(1)
          }}
          GB</span
        >
      </div>
      <div class="mb-2">
        <div
          class="flex flex-row justify-center items-center	 text-xl mb-1 mt-1  "
        >
          <img class="mr-2 node_img" :src="time" />
          <span class="data_title font-bold">Up Time</span>
        </div>
        <span class="text-xl font-bold text-gray-600">{{ upTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  name: 'NodeCard',
  props: ['nodeData'],
  data() {
    return {
      ram: require('../assets/ram.png'),
      node: require('../assets/node.png'),
      disk: require('../assets/disk.png'),
      time: require('../assets/time.png'),
    };
  },
  computed: {
    upTime() {
      const end = DateTime.now();
      const start = DateTime.fromISO(this.nodeData.up_since);
      const diff = end.diff(start, ['months', 'days']);
      diff.toObject();

      return `${Math.floor(diff.months)} Months, ${Math.floor(diff.days)} Days`;
    },
  },
};
</script>
<style>
.data_img {
  width: 24px;
  height: 24px;
}

.data_title {
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#38ffdc),
    to(#785dfc)
  );
  background-image: linear-gradient(90deg, #38ffdc, #785dfc);
  color: #3619ca;
  text-align: center;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.back-card {
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
  background-image: linear-gradient(135deg, #3720b1, #a981ff);
  -webkit-transform: skew(5deg, 353deg);
  -ms-transform: skew(5deg, 353deg);
  transform: skew(5deg, 353deg);
}
.front-card {
  position: relative;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0 0 25px 0 rgb(0 0 0 / 25%);
  -webkit-transform: rotateX(0.001deg) rotateY(0deg) rotateZ(0deg);
  transform: rotateX(0.001deg) rotateY(0deg) rotateZ(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
#card > .back-card {
  animation: reverseMove 0.5s ease forwards;
}
#card:hover > .back-card {
  background-color: red;
  animation: move 0.5s ease forwards;
}

@keyframes move {
  from {
    transform: skew(5deg, 353deg);
  }
  to {
    transform: skew(8deg, 353deg);
  }
}
@keyframes reverseMove {
  from {
    transform: skew(8deg, 353deg);
  }
  to {
    transform: skew(5deg, 353deg);
  }
}
</style>
