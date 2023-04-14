<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2> Записаться к врачу </h2>
      <form id="create-form" @submit.prevent="createAppoitment">
        <div class="form-group col-md-12">
          <label for="name"> Имя </label>
          <input type="text" id="name" v-model="name" name="name" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <label for="surname"> Фамилия </label>
          <input type="text" id="surname" v-model="surname" name="surname" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <label for="lastname"> Отчество </label>
          <input type="text" id="lastname" v-model="lastname" name="lastname" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <label for="date"> Дата </label>
          <input type="date" id="date" v-model="date" name="date" class="form-control">
        </div>
        <div class="form-group col-md-12">
          <label for="time"> Время </label>
          <input type="time" id="time" v-model="time" name="time" class="form-control">
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit"> Записаться к врачу </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  data() {
    return {
      name: "",
      surname: "",
      lastname: "",
      date: "",
      time: ""
    };
  },
  methods: {
    createAppoitment() {
      let appoitmentData = {
        name: this.name,
        surname: this.surname,
        lastname: this.lastname,
        dateTime: this.date + ' ' + this.time
      };
      this.__submitToServer(appoitmentData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/appoitment/add`, data).then(data => {
        console.log(data);
        router.push({ name: "home" });
      });
    }
  }
};
</script>

