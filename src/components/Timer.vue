<template>
  <div>
    <div class="mb-5 text-center">
      <p class="block text-sm font-medium text-gray-700">Time left</p>
      <p class="text-4xl text-black" v-if="currentTime">
        {{ currentTime }}
      </p>
      <p v-if="!currentTime">
        Time's Up!
      </p>
    </div>
    <div>
      <label for="time" class="block text-sm font-medium text-gray-700"
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
          />
        </div>

        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="start()"
        >
          <span>Start</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    speed: {
      type: Number,
      default: 1000,
    },
  },
  data: () => ({
    interval: null,
    currentTime: '30:00',
    time: 30,
  }),
  methods: {
    start() {
      this.countdown();
    },
    countdown() {
      if (this.interval) {
        clearInterval(this.interval);
      }

      const self = this;
      const time = this.time;
      let timer = 60 * time;
      let minutes = 0;
      let seconds = 0;

      this.interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes === 0 && seconds === 0) {
          document.title = 'mobt';
          clearInterval(self.interval);
          self.next();
          return;
        }

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        self.currentTime = minutes + ':' + seconds;
        document.title = self.currentTime;

        if (--timer < 0) {
          timer = 60 * time;
        }
      }, 1000);
    },
    next() {
      this.$store.commit('next', true);
    },
  },
};
</script>