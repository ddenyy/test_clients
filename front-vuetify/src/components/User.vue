<template>
  <div v-if="loaded">
    <v-card :title="getFullName(user)" :subtitle="user.email" border="opacity-50 sm" class="mx-10 mb-10 pt-10 pb-10"
      height="100%">
      <v-list title="ArrayFriends" lines="one">
        <v-list-subheader>Friends:</v-list-subheader>
        <v-list-item v-for="friend in user.arrayFriends" :key="friend._id" :title="'Item ' + getFullName(friend)"
          :prepend-avatar=getAvatarLink()>
          <v-btn @click="deleteFriend(friend._id)" class="mx-0 mt-2 ml-0 white--text" elevation="0" x-small rounded
            color="red darken-1">
            delete friend
          </v-btn>
        </v-list-item>
      </v-list>
      <router-link to="/userlist">
        <v-btn class="mx-4 white--text" elevation="2" x-small rounded color="white darken-1">
          back to userList
        </v-btn>
      </router-link>
    </v-card>
    <v-list lines="one" class="mx-10">
      <v-list-subheader>All users:</v-list-subheader>
      <v-list-item v-for="user in usersWithoutCurrent" :key="user._id" :title="'Item ' + user.name" :subtitle="user.email"
        class="d-flex flex-row">
        <v-btn @click="addFriend(user._id)" class="mx-0 mt-2 ml-0 white--text" elevation="2" x-small rounded
          color="green darken-1">
          add friend
        </v-btn>
      </v-list-item>
    </v-list>
    <v-btn @click="getCycles" class="mx-10 mt-10 ml-10 white--text" elevation="2" x-small rounded
          color="orange darken-1">
          get cycles
    </v-btn>
    <v-list>
        <v-list-subheader>Cycles:</v-list-subheader>
        <v-list-item v-for="cycleUser in this.resultCycles" :title="cycleUser.name">
          
        </v-list-item>
    </v-list>
    <FormEditUser @submit="update" :_id="this.$props._id"></FormEditUser>

  </div>
  <div v-else>Загрузка...</div>
</template>

<script lang="js">
import Api from '@/plugins/Api';
import { AVATAR_LINK } from "@/utils/constants"

export default {
  name: "User",
  props: ['_id'],
  data() {
    return {
      user: null,
      loaded: false,
      resultCycles: []
    };
  },
  async mounted() {
    console.log(this.$props._id);
    this.users = await Api.getAllUsers();
    this.user = this.users.find((item) => item._id === this.$props._id);
    this.usersWithoutCurrent = this.users.filter((item) => item._id !== this.$props._id);
    this.loaded = true;
  },
  methods: {
    getFullName(user) {
      return user.name + " " + user.surname + " " + user.patronymic
    },
    getAvatarLink() {
      return AVATAR_LINK;
    },
    async update(args) {
      this.user = await Api.updateUser(this.$props._id, args.name, args.surname, args.email, args.patronymic);
    },
    async addFriend(id_friend) {
      const responce = await Api.addFriend(this.$props._id, id_friend);
      if (!!responce) {
        this.user = responce;
      }
    },
    async deleteFriend(id_friend) {
      const responce = await Api.deleteFriend(this.$props._id, id_friend);
      if (!!responce) {
        this.user = responce;
      }
    },

    getCycles() {
        this.cycleUser = [];
        let used = [];
        const dfs = (v, prev) => {
            if (used[v?._id] == 1) {
                return v;
            };
            used[v?._id] = 1;
            for (let i = 0; i < v?.arrayFriends?.length; i++) {
                let u = this.users.filter((item) => item._id === v?.arrayFriends[i]._id)[0];
                if (u?._id !== prev?._id) {
                    let k = dfs(u, v);
                    if (k !== undefined) {
                        this.resultCycles.push(v);
                        if (k._id === v._id) {
                            return;
                        }
                        return k;
                    }
                }
            }
            return undefined;
        }
        dfs(this.user, undefined);
    }

  }
};


</script>