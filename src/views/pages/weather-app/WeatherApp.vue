<template>
  
  <div class="weather-app">
    <span class="bg rain"></span>
    <div class="main">

    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherApp',
  props: {
  }
}
</script>

<style lang="scss" scoped>
  .weather-app {
    position: relative;
    margin: 0 auto;
    width: 500px;
    height: 889px;
    text-align: center;
  }
  .bg {
    display: block;
    background-size: 100% auto;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    &.rain {
      background-image: url('~@/assets/images/weather-app/bg_rain.jpg');
    }
    &.cloudy {
      background-image: url('~@/assets/images/weather-app/bg_cloudy.jpg');
    }
    &.sunny {
      background-image: url('~@/assets/images/weather-app/bg_sunny.jpg');
    }
    &.thunder {
      background-image: url('~@/assets/images/weather-app/bg_thunder.jpg');
    }
  }
</style>
