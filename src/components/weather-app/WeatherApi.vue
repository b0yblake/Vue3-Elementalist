<template>
  <span class="bg thunder"></span>
  <div class="main" v-if="!loading">
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
  <div class="main" v-else>
    <div class="content">
      <div class="temperature-range">
        <strong class="current">-</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: 'WeatherApi',
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const URL_API_BASE = 'api.openweathermap.org/data/2.5/weather';
    const APIT_KEY = '72df89b983a305010253ebdb86ff4df8';

    const CITY_LOCATION = 'hanoi'


    function fetchData() {
      console.log('run before fetch...');

      loading.value = true;

      return fetch(`${URL_API_BASE}?q=${CITY_LOCATION}&appid=${APIT_KEY}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          // a non-200 response code
          if (!res.ok) {
            // create error instance with HTTP status text
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }

          console.log(res.json());

          return res.json();
        })
        .then(json => {
          // set the response data
          data.value = json.data;

          console.log('show data: ');
          console.log(data);
        })
        .catch(err => {
          error.value = err;
          // In case a custom JSON error response was provided
          if (err.json) {
            return err.json.then(json => {
              // set the JSON response message
              error.value.message = json.message;
            });
          }
        })
        .then(() => {
          loading.value = false;
        });

    }

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error
    };
  }
}
</script>

<style lang="scss" scoped>
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
    font-size: 100px;
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
