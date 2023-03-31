<template>
<div class="handler-section">
  <header class="header">
    <h1>IP Address Tracker</h1>
  </header>
  <main class="main-content">
    <form class="form" @submit.prevent="submitHandler">
      <div class="user-input-row">
        <input placeholder="Search for any IP address" pattern="^((([01]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))\.){3}(([01]?[0-9]?[0-9])|(2[0-4][0-9])|(25[0-5]))$" required class="input-bar" type="search" v-model="address">
        <button class="input-button" type="submit">
          <img src="../assets/images/icon-arrow.svg" alt="icon-arrow">
        </button>
      </div>
    </form>
    <div class="detail">
      <div v-if="loading"><i class='bx bx-loader bx-spin bx-md' ></i></div>
      <ul v-if="data">
        <li class="detail-item">
          <h2>ip address</h2>
          <p>{{ data.ip }}</p>
        </li>
        <li class="detail-item">
          <h2>location</h2>
          <p>{{ data.location.region }},{{ data.location.country }}</p>
        </li>
        <li class="detail-item">
          <h2>timezone</h2>
          <p>{{ data.location.timezone }}</p>
        </li>
        <li class="detail-item">
          <h2>isp</h2>
          <p>{{ data.isp }}</p>
        </li>
      </ul>
      <div v-else>No Address~!</div>
    </div>
  </main>
</div>
<section id="map"></section>
</template>

<script setup>
import { ref, watch } from 'vue'
import useMap from '../composable/useMap'
import useIPApi from '../composable/useIPApi'


const address = ref('')

const {
  panTo,
  endLoad
} = useMap()

const {
  searchIP,
  loading,
  data
} = useIPApi()

const submitHandler = async () => {
  await searchIP(address.value)
  if (data.value) {
    panTo({
      lat: data.value.location.lat,
      lng: data.value.location.lng
    })
  }
}

watch(endLoad, async value => {
  if (value) {
    await submitHandler()
  }
});

</script>

<style lang="scss" scoped>
.handler-section {
  background-image: url('../assets/images/pattern-bg-mobile.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.header{
  h1 {
    color: #fff;
    line-height: 3;
  }
}

.main-content {
  position: relative;
  padding-bottom: 6rem;
}
.form {
  max-width: 400px;
  width: 80%;
  margin: auto;
}
.user-input-row {
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;

  .input-bar {
    width: 100%;
    min-width: 0;
    padding: 1rem;
    font-size: 18px;
    outline: none;
  }
  .input-button {
    flex-shrink: 0;
    width: 3rem;
    border: none;
    background-color: var(--deep-gray);
    cursor: pointer;
    transition: opacity .3s ease;
    &:hover {
      opacity: .8;
    }
  }
}
.detail {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 350px;
  z-index: 1000;
  .detail-item {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 400;
      color: var(--light-gray);
    }
    p {
      line-height: 2;
      font-weight: 700;
    }
  }
}
#map {
  min-height: calc(100svh - 277px);
}

@media screen and (min-width: 1440px) {
  .detail {
    width: 1200px;
    ul {
      display: flex;
      align-items: center;
      .detail-item {
        width: 25%;
      }
    }
  }
}
</style>