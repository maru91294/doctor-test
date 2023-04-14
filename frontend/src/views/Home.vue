<template>
  <div>

    <div class="text-center">
      <div v-if="appoitments.length === 0">
        <h2> Записи не найдены </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="appoitment in appoitments" :key="appoitment._id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <h4 class="card-text">{{ appoitment.dateTime }}</h4>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteAppoitment(appoitment._id)">Удалить
                  запись</button>
              </div>
            </div>

            <div class="card-footer">
              <small class="text-muted">Вы записаны к врачу: {{ appoitment.surname + ' ' + appoitment.name + ' ' +
                appoitment.lastname }}</small><br />
              <small class="text-muted">Дата приема: {{ appoitment.dateTime }}</small><br />
              <small class="text-muted">Адрес: Ул. Большая Якиманка, 10</small>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { server } from "@/utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      appoitments: []
    };
  },
  created() {
    this.fetchAppoitments();
  },
  methods: {
    fetchAppoitments() {
      axios
        .get(`${server.baseURL}/appoitment/all`)
        .then(data => (this.appoitments = data.data));
    },
    deleteAppoitment(id) {
      axios.delete(`${server.baseURL}/appoitment/delete?id=${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
};
</script>

