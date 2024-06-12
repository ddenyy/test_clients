import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
      count: 0,
      users: []
    },
    mutations: {
      increment (state: any) {
        state.count++
      }
    }
})
export default store;


