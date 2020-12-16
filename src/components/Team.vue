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
    <div class="mt-5" v-if="names.length">
      <p class="block text-sm font-medium text-gray-700">People</p>
      <ul class="list-decimal ml-5 mt-2">
        <li
          v-for="(name, index) in names"
          v-bind:key="index"
          v-bind:class="{ 'font-bold': index === 0 }"
        >
          <div class="mt-1 flex">
            <div class="flex items-stretch flex-grow">
              {{ name }}
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
          class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          @click="skip"
        >
          <span>Skip</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
export default {
  name: 'Team',
  data: () => ({
    name: '',
  }),
  computed: {
    names() {
      return store.state.names;
    },
  },
  methods: {
    addName() {
      this.$store.commit('setNames', this.names.concat(this.name));
      this.name = '';
    },
    removeName(index) {
      this.names.splice(index, 1);
      this.$store.commit('setNames', this.names);
    },
    skip() {
      this.$store.commit('next');
    },
  },
};
</script>
