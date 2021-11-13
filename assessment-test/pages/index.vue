<template>
  <div>
    <h1>Assesment by Carlos Hernandez :)</h1>

    <div class="search-container">
      <div class="search-bar">
        <input v-model="search" type="text" />
        <button @click="searchItem()">Buscar</button>
      </div>
    </div>

    <div v-if="showSearch == true">
      <div class="item-list">
        <div
          @click="goToDetail(item.id)"
          v-for="item in items.results"
          :key="item.name"
          class="card"
        >
          <img :src="item.image" alt="" />
          <h4>{{ item.name }}</h4>
        </div>
      </div>
    </div>

    <div v-if="showSearch == false">
      <div class="item-list">
        <div
          @click="goToDetail(item.id)"
          v-for="item in characters.results"
          :key="item.name"
          class="card"
        >
          <img :src="item.image" alt="" />
          <h4>{{ item.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      showSearch: false,
      items: []
    };
  },
  computed: {
    ...mapGetters({
      characters: "data/getItems"
    })
  },
  methods: {
    ...mapActions({
      itemsRq: "data/itemsRq",
      itemSearch: "data/itemSearchRq"
    }),
    goToDetail(item) {
      this.$router.push({
        path: "/itemDetail",
        query: {
          id: item
        }
      });
    },
    searchItem() {
      fetch("https://rickandmortyapi.com/api/character/?name=" + this.search)
        .then(res => res.json())
        .then(res => {
          this.items = res;
          this.search = "";
          this.showSearch = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.itemsRq();
  }
};
</script>
