<template>
    <div class="home">
        <ul>
            <li v-for="(item,index) in users" :key="item._id">
                {{ index + 1}}.{{ item.username }}
            </li>
        </ul>
        <el-button type="primary" @click="logout()">注销</el-button>
    </div>
</template>

<script>
  import axios from '../axios.js';
  export default {
    name: "home",
    data() {
      return {
        users: ''
      }
    },
    created() {
      axios.getUser().then()
    }
  }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .home {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 400px;
        margin: 60px auto 0 auto;
    }
</style>