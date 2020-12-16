<template>
  <div class="mt-5">
    <div>
      <label for="people" class="block text-sm font-bold text-gray-700"
        >Team member</label
      >
      <div class="mt-1 flex rounded-md shadow-sm">
        <div class="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Name"
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
      <div class="mt-1 flex justify-between">
        <div class="flex">
          <p class="block text-sm font-bold text-gray-700">Driver</p>
        </div>
        <div class="flex">
          <p class="block text-sm font-bold text-gray-700">Next</p>
        </div>
        <div class="flex">
          <p class="block text-sm font-bold text-gray-700">Actions</p>
        </div>
      </div>
      <div class="mt-1 flex justify-between">
        <div class="flex">
          <div class="w-6">{{ people[active].emoji }}</div>
          <div>{{ people[active].name }}</div>
        </div>
        <div class="flex">
          <div class="w-6">{{ people[nextIndex].emoji }}</div>
          <div>{{ people[nextIndex].name }}</div>
        </div>
        <div class="flex">
          <button
            class="-ml-px relative inline-flex items-center space-x-2 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            @click="skip"
          >
            <span>Skip</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5" v-if="people.length">
      <p class="block text-sm font-bold text-gray-700">Team</p>
      <ul class="ml-1 mt-2">
        <li v-for="(item, index) in people" v-bind:key="index">
          <div class="mt-1 flex">
            <div class="flex items-stretch flex-grow">
              <div class="w-6">{{ item.emoji }}</div>
              <div>{{ item.name }}</div>
            </div>
            <a
              role="button"
              class="-ml-px relative inline-flex items-center space-x-2 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              title="Remove team member"
              @click="removeName(index)"
            >
              remove
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
import emojisList from 'emoji.json/emoji-compact.json';

const emojis = emojisList.filter((p) => p.length === 4);

export default {
  name: 'Team',
  data: () => ({
    name: '',
  }),
  computed: {
    active() {
      return store.state.active;
    },
    nextIndex() {
      return store.state.active + 1 < store.state.people.length
        ? store.state.active + 1
        : 0;
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
    skip() {
      this.$store.commit('next');
    },
  },
};
</script>
