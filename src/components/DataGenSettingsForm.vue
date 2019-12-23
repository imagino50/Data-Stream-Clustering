<template>
  <div id="dataGenSettings-form">
    <b-col md="13">
      <b-form-group label="Particles generation :">
        <b-form-radio-group
          id="radio-group-2"
          v-model="generationMode"
          @change.native="onGenerateModeChange()"
          name="radio-sub-component"
        >
          <b-form-radio
            v-model="generationMode"
            name="some-radios"
            value="Random"
            >Random</b-form-radio
          >
          <b-form-radio
            v-model="generationMode"
            name="some-radios"
            value="Cluster"
            >Cluster</b-form-radio
          >
          <input
            class="btn btn-primary"
            type="restart"
            value="re-generate dataset"
            @click="onReGenerateDataset()"
          />
        </b-form-radio-group>
      </b-form-group>
      <b-list-group>
        <b-list-group-item
          style="padding: 0rem 0rem;"
          v-for="item in particlesGenParams"
          v-bind:key="item.id"
        >
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
              @change="onClusterGenParamsChange()"
            />
          </div>
        </b-list-group-item>
        <input
          class="btn btn-primary"
          type="reset"
          value="Reset"
          @click="onResetClusterGenParams()"
        />
      </b-list-group>
    </b-col>
  </div>
</template>
<script>
import clusterGenJson from "@/json/inputSettings.json";
import Utils from "@/utils";
import { inputGetters, inputMutations } from "@/store/inputDataStore.js";
import { particleGetters } from "@/store/particleSettingsStore.js";

export default {
  name: "dataGenSettings-form",
  components: {},
  data() {
    return { particlesGenParams: clusterGenJson, generationMode: "Random" };
  },
  methods: {
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      for (let i = 0; i < this.particlesGenParams.length; i++) {
        this.particlesGenParams[i].value = this.particlesGenParams[
          i
        ].defaultValue;
      }
      this.createParticlesClustered();
    },
    onReGenerateDataset() {
      console.log("onReGenerateDataset");
      this.createParticlesClustered();
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      this.createParticlesClustered();
    },
    onGenerateModeChange() {
      console.log("onGenerateModeChange");
      inputMutations.setGenerationMode(this.generationMode);
      if (inputGetters.generationMode() == "Cluster") {
        this.createParticlesClustered();
      }
    },
    createParticlesClustered() {
      inputMutations.setParticleID(0);
      var canvas1 = document.getElementById("canvas1");
      inputMutations.setParticlesGenerated(
        Utils.generateParticlesClustered(
          this.particlesGenParams[0].value,
          canvas1.width,
          canvas1.height,
          this.particlesGenParams[1].value,
          this.particlesGenParams[2].value,
          this.particlesGenParams[3].value,
          particleGetters.centerIntensity()
        )
      );
    }
  }
};
</script>

<style></style>
