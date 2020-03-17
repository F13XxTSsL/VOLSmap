import Vue from "vue";
import Vuex from "vuex";
import contracts from "./modules/contracts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    contracts
  }
});