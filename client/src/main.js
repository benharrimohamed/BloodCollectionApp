import Vue from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import vuetify from '@/plugins/vuetify';
import VueGeolocation from 'vue-browser-geolocation';
import store from './store';



delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('@/assets/markerIcon.png'),
  iconUrl: require('@/assets/markerIcon.png'),
  iconSize : [26,28]
});


Vue.config.productionTip = false
Vue.use(VueGeolocation);
new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
