<template>
  
  <div class="weather-app">
    <span class="bg thunder"></span>
    <div class="main">
      <div class="top-header">
        <strong class="day-week">MONDAY</strong>
        <span class="location">LONDON</span>
      </div>
      <div class="content">
        <div class="temperature-range">
          <strong class="current">27&#176;</strong>
          <span class="range">14&#176; ~ 30&#176;</span>
        </div>
      </div>
      <div class="detail-elementalist">
        <dl>
          <dt>Precipitation:</dt>
          <dd>100%</dd>
          <dt>Humidity:</dt>
          <dd>70%</dd>
          <dt>Wind:</dt>
          <dd>8km/h</dd>
        </dl>
      </div>
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

    .main {
      @include flexbox;
      @include flex-direction(column);
      @include justify-content(space-between);
      position: absolute;
      bottom: 0;
      margin-bottom: 53px;
      height: 400px;
      padding: 30px 84px;
      width: 100%;
      color: #292c66;
      @include box-sizing(border-box);
    }

    .top-header {
      text-align: left;
      font-family: CeraPro;
      line-height: 1;
      .day-week {
        display: block;
        font-size: 35px;
      }
      .location {
        font-size: 24px;
      }
    }

    .content {
      line-height: 1;
      .current {
        display: block;
        font-size: 90px;
      }
      .range {
        font-size: 25px;
      }
    }

    .detail-elementalist {
      @include flexbox;
      @include justify-content(flex-end);
      font-family: CeraPro;
      font-size: 16px;
      dl {
        @include inline-flex;
        @include flex-wrap(wrap);
        width: 180px;
        dt {
          width: 65%;
          text-align: left;
        }
        dd {
          margin-left: auto;
          width: 35%;
        }
      }
    }
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
