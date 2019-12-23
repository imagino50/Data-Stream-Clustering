<template>
  <b-container fluid id="app" class="bv-example-row">
    <b-row class="text-center">
      <b-col class="bg-dark">
        <h1 class="text-white navbar-brand">
          Data stream clustering which intensity spreads and decreases over
          time.
        </h1>
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col md="3">
        <eventSettings />
      </b-col>
      <b-col md="9">
        <CanvasGroup />
        <b-row class="text-left">
          <inputSettings />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import EventSettings from "@/components/EventSettingsForm.vue";
import InputSettings from "@/components/InputSettingsForm.vue";
import CanvasGroup from "@/components/CanvasGroupForm.vue";

export default {
  name: "app",
  components: { EventSettings, InputSettings, CanvasGroup },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
