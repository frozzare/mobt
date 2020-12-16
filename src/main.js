import '@/assets/css/tailwind.css';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import { Howl } from 'howler';
import App from './App.vue';

const playSound = () => {
  new Howl({
    src: ['/assets/sound.mp3'],
    loop: false,
  }).play();
};

const store = createStore({
  state: {
    active: 0,
    names: [],
  },
  mutations: {
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

const app = createApp(App);

app.mount('#app');
app.use(store);
