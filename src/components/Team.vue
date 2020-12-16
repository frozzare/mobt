<template>
  <div class="mt-5">
    <div>
      <label for="people" class="block text-sm font-medium text-gray-700"
        >Team</label
      >
      <div class="mt-1 flex rounded-md shadow-sm">
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Your name"
            v-model="name"
          />
        </div>
        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="addName"
        >
          <span>Add</span>
        </button>
      </div>
    </div>
    <div class="mt-5" v-if="people.length">
      <p class="block text-sm font-medium text-gray-700">People</p>
      <ul class="ml-1 mt-2">
        <li
          v-for="(item, index) in people"
          v-bind:key="index"
          v-bind:class="{ 'font-bold': index === active }"
        >
          <div class="mt-1 flex">
            <div class="flex items-stretch flex-grow">
              <div class="w-6">{{ item.emoji }}</div>
              <div>{{ item.name }}</div>
            </div>
            <a
              role="button"
              class="text-red-600 text-sm"
              title="Remove team member"
              @click="removeName(index)"
            >
              x
            </a>
          </div>
        </li>
      </ul>
      <div class="mt-5">
        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 mr-3"
          @click="skip"
        >
          <span>Skip</span>
        </button>
        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 mr-3"
          @click="shuffle"
        >
          <span>Shuffle</span>
        </button>
        <button
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="clear"
        >
          <span>Clear</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
import emojisList from 'emoji.json/emoji-compact.json';

const emojis = emojisList.filter((p) => p.length < 5);

export default {
  name: 'Team',
  data: () => ({
    name: '',
  }),
  computed: {
    active() {
      return store.state.active;
    },
    people() {
      return store.state.people;
    },
  },
  methods: {
    addName() {
      this.$store.commit(
        'setPeople',
        this.people.concat({
          name: this.name,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        })
      );
      this.name = '';
    },
    removeName(index) {
      this.people.splice(index, 1);
      this.$store.commit('setPeople', this.people);
    },
    clear() {
      this.$store.commit('setPeople', []);
    },
    skip() {
      this.$store.commit('next');
    },
    shuffle() {
      this.$store.commit(
        'setPeople',
        this.shuffleArray(Array.from(this.people))
      );
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
  },
};
</script>
