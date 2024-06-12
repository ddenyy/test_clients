<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <p class="text-h6">Create new user</p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="fd.name"
            label="First name"
            name="name"
            required
          ></v-text-field>
          <v-text-field
            v-model="fd.patronymic"
            label="patronymic"
            name="patronymic"
            required
          ></v-text-field>
          <v-text-field
            v-model="fd.surname"
            label="surname"
            name="surname"
            required
          ></v-text-field>
          <v-text-field
            v-model="fd.email"
            label="email"
            name="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="fd.password"
            label="password"
            name="password"
            required
          ></v-text-field>
        </v-col>
        <v-btn @click="submit">Create User</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      fd: {
        name: "test",
        surname: "testtest",
        email: "testtest@test.ru",
        patronymic: "testtest",
        password: "testtest"
      }
    }),
    methods: {
        submit() {
            this.$emit("submit", this.fd);
        }
    }
  };
  </script>