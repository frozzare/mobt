<template>
  <div>
    <div class="mb-5 text-center">
      <p class="block text-sm font-bold text-gray-700">Time left</p>
      <p class="text-4xl text-black" v-if="currentTime">
        {{ currentTime }}
      </p>
    </div>
    <div>
      <label for="time" class="block text-sm font-bold text-gray-700"
        >Minutes</label
      >
      <div class="mt-1 flex rounded-md shadow-sm">
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="number"
            name="time"
            id="time"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            v-model="time"
            @change="updateTime"
          />
        </div>

        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="run"
        >
          <span>{{ running && !paused ? 'Pause' : 'Start' }}</span>
        </button>

        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="reset"
        >
          <span>Reset</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';
import { notification } from '../lib/notification';

const playSound = () => {
  new Howl({
    src: ['/assets/sound.mp3'],
    loop: false,
  }).play();
};

export default {
  name: 'Timer',
  props: {
    speed: {
      type: Number,
      default: 1000,
    },
  },
  data: () => ({
    paused: false,
    interval: null,
    currentTime: '30:00',
    time: 30,
    timer: 0,
    minutes: 0,
    seconds: 0,
  }),
  methods: {
    reset() {
      this.running = false;
      this.paused = false;
      this.timer = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.currentTime = `${this.time}:00`;
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    run() {
      if (this.running) {
        this.pause();
      } else {
        this.start();
      }
    },
    start() {
      this.running = true;
      this.paused = false;
      this.countdown();
    },
    pause() {
      this.running = false;
      this.paused = true;
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    updateTime() {
      if (!this.interval) {
        this.currentTime = this.format(this.time);
      }
    },
    format(minutes, seconds = 0) {
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return minutes + ':' + seconds;
    },
    countdown() {
      const self = this;

      if (this.interval) {
        clearInterval(this.interval);
      }

      if (!this.timer) {
        this.timer = 60 * this.time;
        this.minutes = 0;
        this.seconds = 0;
      }

      this.interval = setInterval(() => {
        self.minutes = parseInt(self.timer / 60, 10);
        self.seconds = parseInt(self.timer % 60, 10);

        if (self.minutes === 0 && self.seconds === 0) {
          self.next();
          return;
        }

        self.currentTime = self.format(self.minutes, self.seconds);
        document.title = self.currentTime;

        if (--self.timer < 0) {
          self.timer = 60 * self.time;
        }
      }, 1000);
    },
    next() {
      this.reset();
      this.$store.commit('next', true);

      playSound();

      const user = this.$store.getters.currentUser;
      if (user) {
        console.log(user);
        notification.show('Mobt', {
          body: `It's ${user.name}'s turn!`,
          icon: '/assets/alarm-clock.png',
        });
      }
    },
  },
};
</script>
