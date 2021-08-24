import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  FormInputPlugin,
  NavbarPlugin,
  LayoutPlugin,
  IconsPlugin,
  BCard,
  BInputGroup,
  BButton,
} from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import moment from 'moment'

Vue.config.productionTip = false;

Vue.use(FormInputPlugin);
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(VueAxios, axios)
Vue.component("b-card", BCard);
Vue.component("b-input-group", BInputGroup);
Vue.component("b-button", BButton);
Vue.prototype.moment = moment
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
