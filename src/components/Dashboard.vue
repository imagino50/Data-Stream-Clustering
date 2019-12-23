<template>
  <b-container fluid id="app" class="bv-example-row">
    <b-row class="text-center">
      <b-col class="bg-dark">
        <h1 class="text-white navbar-brand">
          Clustering signal events (intensity diffusion and overlapping).
        </h1>
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col md="3">
        <particlesSettings />
      </b-col>
      <b-col md="9">
        <CanvasGroup />
        <b-row class="text-left">
          <dataGenSettings />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ParticlesSettings from "@/components/ParticlesSettingsForm.vue";
import DataGenSettings from "@/components/DataGenSettingsForm.vue";
import CanvasGroup from "@/components/CanvasGroupForm.vue";

export default {
  name: "app",
  components: { ParticlesSettings, DataGenSettings, CanvasGroup },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
