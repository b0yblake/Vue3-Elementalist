<template>
  <div class="weather-app">
    <WeatherApi />
  </div>
</template>

<script>
import WeatherApi from '../../../components/weather-app/WeatherApi.vue';

export default {
  name: 'WeatherApp',
  components: {
    WeatherApi
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
</style>
