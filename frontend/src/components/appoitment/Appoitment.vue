<template>
    <div class="text-center">
        <div class="col-sm-12">
      <h4 style="margin-top: 30px;"><small><button class="btn btn-success" v-on:click="navigate()"> Все записи </button></small></h4>
      <hr>
      <h2>{{ appoitment.dateTime }}</h2>
    </div>
    </div>
</template>

<script>
import { server } from "../../utils/helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      appoitment: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getAppoitment();
  },
  methods: {
    getAppoitment() {
      axios
        .get(`${server.baseURL}/appoitment/${this.id}`)
        .then(data => (this.appoitment = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

