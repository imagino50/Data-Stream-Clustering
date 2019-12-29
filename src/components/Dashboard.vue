<template>
  <b-container fluid id="app" class="bv-example-row">
    <b-row class="text-center">
      <b-col class="bg-dark">
        <h1 class="text-white navbar-brand">
          Data stream 'Density-based Clustering' in real time.
        </h1>
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col md="3">
        <inputSettings />
      </b-col>
      <b-col md="9">
        <CanvasGroup />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import InputSettings from "@/components/InputSettingsForm.vue";
import CanvasGroup from "@/components/CanvasGroupForm.vue";

export default {
  name: "app",
  components: { InputSettings, CanvasGroup },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
