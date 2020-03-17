import axios from "axios";

export default {
  state: {
    contracts: []
  },
  actions: {
    async getContracts({ commit }) {
      const res = await axios.get('http://localhost:3000/contracts')
        .then(response => {
          return response.data
        })
      commit("getContracts", res);
    }
  },
  mutations: {
    getContracts(state, contracts) {
      state.contracts.push(contracts);
    }
  },
  getters: {
    allContracts(state) {
      return state.contracts;
    }
  }
};