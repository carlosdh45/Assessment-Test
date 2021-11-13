import axios from "axios";

export const state = () => ({
  items: {},
  itemStatus: "",
  itemDetail: {},
  itemDetailStatus: "",
  itemSearch: {},
  itemSearchStatus: ""
});

export const getters = {
  getItems: state => state.items,
  getItemStatus: state => state.itemStatus,
  getItemDetail: state => state.itemDetail,
  getItemDetailStatus: state => state.itemDetailStatus,
  getItemSearch: state => state.itemSearch,
  getItemSearchStatus: state => state.itemSearchStatus
};

export const mutations = {
  ITEMS_REQUEST: function(state) {
    state.itemStatus = "loading";
  },
  ITEMS_SUCCESS: function(state, data) {
    state.itemStatus = "success";
    state.items = data;
  },
  ITEMS_ERROR: function(state) {
    state.itemStatus = "error";
  },
  ITEM_DETAIL_REQUEST: function(state) {
    state.itemDetailStatus = "loading";
  },
  ITEM_DETAIL_SUCCESS: function(state, data) {
    state.itemDetailStatus = "success";
    state.itemDetail = data;
  },
  ITEM_DETAIL_ERROR: function(state) {
    state.itemDetailStatus = "error";
  },
  ITEM_SEARCH_REQUEST: function(state) {
    state.itemSearchStatus = "loading";
  },
  ITEM_SEARCH_SUCCESS: function(state, data) {
    state.itemSearchStatus = "success";
    state.itemSearch = data;
  },
  ITEM_SEARCH_ERROR: function(state) {
    state.itemSearchStatus = "error";
  }
};

export const actions = {
  //Action that request all items

  itemsRq({ commit }) {
    return new Promise((resolve, reject) => {
      commit("ITEMS_REQUEST");
      axios
        .get("https://rickandmortyapi.com/api/character/")
        .then(res => {
          commit("ITEMS_SUCCESS", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("ITEMS_ERROR");
          reject(err);
        });
    });
  },

  itemDetailRq({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("ITEM_DETAIL_REQUEST");
      axios
        .get("https://rickandmortyapi.com/api/character/" + id)
        .then(res => {
          commit("ITEM_DETAIL_SUCCESS", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("ITEM_DETAIL_ERROR");
          reject(err);
        });
    });
  },

  itemSearchRq({ commit }, name) {
    return new Promise((resolve, reject) => {
      commit("ITEM_SEARCH_REQUEST");
      axios
        .get("https://rickandmortyapi.com/api/character/?name=" + name)
        .then(res => {
          commit("ITEM_SEARCH_SUCCESS", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("ITEM_SEARCH_ERROR");
          reject(err);
        });
    });
  }
};
