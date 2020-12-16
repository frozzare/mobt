import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export const store = createStore({
  plugins: [vuexLocal.plugin],
  state: () => ({
    active: 0,
    people: [],
  }),
  getters: {
    currentUser: (state) => {
      return state.people[state.active];
    },
  },
  mutations: {
    setPeople(state, people) {
      state.people = Array.from(people);
    },
    next(state) {
      state.active++;
      state.active = state.active >= state.people.length ? 0 : state.active;
    },
  },
});
