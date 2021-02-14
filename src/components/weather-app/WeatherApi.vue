<template>
  <span class="bg" :class="!loading && currentWeather"></span>
  <div class="main" v-if="!loading">
    <div class="top-header">
      <strong class="day-week">{{ curentDay }}</strong>
      <span class="location">{{ `${data.name} - ${data.weather[0].description }` }}</span>
    </div>
    <div class="content">
      <div class="temperature-range">
        <strong class="current">{{ `${data.main.temp - 273.15}&#176;` }}</strong>
        <span class="range">{{ `${data.main.temp_min - 273.15}&#176; ~ ${data.main.temp_max - 273.15}&#176;` }}</span>
      </div>
    </div>
    <div class="detail-elementalist">
      <dl>
        <dt>Độ ẩm:</dt>
        <dd>{{ `${data.main.humidity}%` }}</dd>
        <dt>Gió:</dt>
        <dd>{{ `${data.wind.speed}km/h` }}</dd>
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

    const curentDay = ref(null);

    const currentWeather = ref(null);

    //API openweather: https://openweathermap.org/current
    const URL_API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
    const APIT_KEY = '5deaa884e445893d84d87594f46d2198';
    const CITY_LOCATION = 'hanoi'


    function fetchData() {
      //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      console.log('run before fetch...');

      loading.value = true;

      return fetch(`${URL_API_BASE}?q=${CITY_LOCATION}&appid=${APIT_KEY}`)
        .then(res => {
          // a non-200 response code
          if (!res.ok) {
            // create error instance with HTTP status text
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          // console.log(res.json());
          return res.json();
        })
        .then(json => {
          // set the response data
          data.value = json;
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
          curentDay.value = dayName(new Date());
          bgClass(data.value.weather[0].main);
        });

    }

    const dayName = (date, locale) =>
      date.toLocaleDateString(locale, { weekday: 'long' });

    const bgClass = (currentWether) => {
      switch (currentWether) {
        case 'Thunderstorm':
          currentWeather.value = 'thunder';
          break;
        case 'Rain':
          currentWeather.value = 'rain';
          break;
        case 'Clear':
          currentWeather.value = 'sunny';
          break;
        case 'Clouds':
          currentWeather.value = 'cloudy';
          break;
        default:
          currentWeather.value = 'cloudy';
          break;
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error,
      curentDay,
      currentWeather
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
    line-height: 1.2;
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
