<template>
  <div>
    <div class="detail-container">
      <h1>Character Detail</h1>
      <div class="detail-card">
        <div class="image-container">
          <img :src="detail.image" alt="" />
        </div>
        <div class="detail-content">
          <div class="detail-row">
            <h4>Nombre:</h4>
            <h4>{{ detail.name }}</h4>
          </div>
          <div class="detail-row">
            <h4>Estado:</h4>
            <h4>{{ detail.status }}</h4>
          </div>
          <div class="detail-row">
            <h4>Especie:</h4>
            <h4>{{ detail.species }}</h4>
          </div>
          <div class="detail-row">
            <h4>Genero:</h4>
            <h4>{{ detail.gender }}</h4>
          </div>
          <div class="detail-row">
            <h4>Fecha de Creacion:</h4>
            <h4>{{ detail.created }}</h4>
          </div>
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
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapGetters({
      detail: "data/getItemDetail"
    })
  },
  methods: {
    ...mapActions({
      itemDetailRq: "data/itemDetailRq"
    }),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  },
  mounted() {
    this.itemDetailRq(this.$route.query.id);
  }
};
</script>
