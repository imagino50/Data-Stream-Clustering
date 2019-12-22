<template>
  <div id="particlesSettings-form">
    <b-list-group>
      <b-list-group-item v-for="item in particlesParams" v-bind:key="item.id">
        <div class="form-group p-0">
          <label for="formControlRange"
            >{{ item.label }} : {{ item.value }} ({{
              item.defaultValue
            }})</label
          >
          <input
            v-bind:name="item.id"
            type="range"
            class="form-control-range"
            v-model="item.value"
            min="0"
            v-bind:max="item.range"
            v-bind:step="item.step"
            @change="onParticleParamsChange($event)"
          />
        </div>
      </b-list-group-item>
      <input
        class="btn btn-primary"
        type="reset"
        value="Reset"
        @click="onResetParticleParams()"
      />
    </b-list-group>
  </div>
</template>
<script>
export default {
  name: "particlesSettings-form",
  components: {},
  props: {
    particlesParams: Array
  },
  data() {
    return {};
  },
  methods: {
    /*=============================================================================*/
    /* Particles Parameters settings
    /*=============================================================================*/
    onParticleParamsChange() {
      console.log("onParticleParamsChange");
      this.$emit("change:particlesParams", this.particlesParams);
    },
    onResetParticleParams() {
      console.log("onResetParticleParams");
      this.$emit("reset:particlesParams");
    }
  }
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 200px;
}
</style>
