<template>
  <div class="p-8 flex items-center justify-center bg-white">
    <div class="w-full max-w-sm mx-auto">
      <header class="mb-5">
        <h1 class="text-lg font-bold text-center text-gray-700">
          mobt ⏰
        </h1>
        <p class="text-sm font-bold text-center text-gray-700">
          the mob timer
        </p>
      </header>
      <Timer />
      <Team />
    </div>
  </div>
</template>

<script>
import Timer from './components/Timer.vue';
import Team from './components/Team.vue';

export default {
  name: 'App',
  components: {
    Timer,
    Team,
  },
};
</script>
