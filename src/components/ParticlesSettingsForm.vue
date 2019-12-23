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
            @change="onParticleParamsChange()"
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
import particlesJson from "@/json/particleSettings.json";
import { particleActions } from "@/store/particleSettingsStore.js";

export default {
  name: "particlesSettings-form",
  components: {},
  data() {
    return { particlesParams: particlesJson };
  },
  methods: {
    /*=============================================================================*/
    /* Particles Parameters settings
    /*=============================================================================*/
    onParticleParamsChange() {
      console.log("onParticleParamsChange");
      particleActions.setValuesFromParams(this.particlesParams);
    },
    onResetParticleParams() {
      console.log("onResetParticleParams");
      for (let i = 0; i < this.particlesParams.length; i++) {
        this.particlesParams[i].value = this.particlesParams[i].defaultValue;
      }
      particleActions.setDefaultValues();
    }
  }
};
</script>

<style>
</style>
