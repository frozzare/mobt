import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { Howl } from 'howler';

const playSound = () => {
  new Howl({
    src: ['/assets/sound.mp3'],
    loop: false,
  }).play();
};

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export const store = createStore({
  plugins: [vuexLocal.plugin],
  state: () => ({
    active: 0,
    names: [],
  }),
  mutations: {
    setNames(state, names) {
      state.names = Array.from(names);
    },
    next(state, sound = false) {
      if (sound) {
        playSound();
      }
      if (state.names.length === state.active + 1) {
        state.active = 0;
      } else {
        state.active++;
      }
    },
  },
});
