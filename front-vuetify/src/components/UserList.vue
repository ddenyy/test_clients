<template>
  <div v-if="loaded">
    <v-list lines="one">
    <v-list-subheader>All users:</v-list-subheader>
    <v-list-item 
      v-for="user in users" :key="user._id" :title="'Item ' + user.name"
      :subtitle="user.email"
      class="d-flex flex-row"
      >
      <router-link :to="{name: 'User', params: {_id: user._id}}">
          <v-btn class="mx-0 mt-3 white--text" x-small  color="white darken-1">
            more info
          </v-btn>
      </router-link>
      <v-btn @click="deleteUser(user._id)" class="mx-0 mt-3 ml-5 white--text" elevation="2" x-small rounded color="red darken-1">
       delete user
      </v-btn>
    </v-list-item>
    <FormAddUser @submit="createUser"></FormAddUser>
  </v-list>
  </div>
  <div v-else>
    Загрузка...
  </div>
</template>

<script lang="js">
  import Api from '@/plugins/Api'
  export default {
    data() {
      return {
        loaded: false,
        users: null
      }
    },
    async mounted() {
      try {
        this.users = await Api.getAllUsers();
        this.loaded = true;
      } catch(err) {
        console.error("Couldn't access data:", err);
      }
    },
    methods: {
      async createUser(args) {
        const user = await Api.createUser(args.name, args.surname, args.email, args.patronymic, args.password);
        this.users.push(user);
      },
      async deleteUser(id) {
        try {
          const deletedUser = await Api.deleteUser(id);
          this.users = this.users.filter((item) => item._id !== id);
        } catch(err) {
          console.error(err);
        }
      }
    }

  }
</script>