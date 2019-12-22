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
import particlesJson from "@/json/particleSettings.json";
import { particleMutations, particleActions } from "@/particleSettingsStore.js";

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
      particleMutations.setCenterIntensity(this.particlesParams[0].value);
      particleMutations.setIntensityMin(this.particlesParams[1].value);
      particleMutations.setIncRadius(parseFloat(this.particlesParams[2].value));
      particleMutations.setIncIntensity(this.particlesParams[3].value);
      particleMutations.setFilterThreshold(this.particlesParams[4].value);
      particleMutations.setNbMinPoints(this.particlesParams[5].value);
      particleMutations.setNeighborhoodRadius(this.particlesParams[6].value);
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
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 200px;
}
</style>
