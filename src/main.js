import '@/assets/css/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import { notification } from './lib/notification';

const app = createApp(App);

app.mount('#app');
app.use(store);

notification.askForPermission((res) => {
  console.log(res);
});
