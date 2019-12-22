<template>
  <b-container fluid id="app" class="bv-example-row">
    <b-row class="text-center">
      <b-col class="bg-dark">
        <h1 class="text-white navbar-brand">
          Clustering signal events with intensity diffusion and accumulation.
        </h1>
      </b-col>
    </b-row>
    <b-row class="text-left mt-3">
      <b-col md="3">
        <particlesSettings
          :particlesParams="particlesParamsProps"
          @change:particlesParams="particleParamsChange"
          @reset:particlesParams="resetParticleParams"
        />
      </b-col>
      <b-col md="9">
        <CanvasGroup
          :particlesParams="particlesParamsProps"
          :particlesGenMode="particlesGenModeProps"
          :particlesGenerated="particlesGeneratedProps"
        />
        <b-row class="text-left">
          <dataGenSettings
            :particlesGenParams="particlesGenParamsProps"
            :particlesGenMode="particlesGenModeProps"
            @reGenerate:dataset="reGenerateDataset"
            @change:genParams="genParamsChange"
            @reset:genParams="resetGenParams"
            @changeMode:genParams="generateModeChange"
          />
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ParticlesSettings from "@/components/ParticlesSettingsForm.vue";
import DataGenSettings from "@/components/DataGenSettingsForm.vue";
import CanvasGroup from "@/components/CanvasGroupForm.vue";
import Utils from "@/utils";

import particlesJson from "../json/particlesSettings.json";
import clusterGenJson from "../json/clusterGenSettings.json";

export default {
  name: "app",
  components: { ParticlesSettings, DataGenSettings, CanvasGroup },
  data() {
    return {
      particlesParamsProps: particlesJson,
      particlesGenParamsProps: clusterGenJson,
      particlesGenModeProps: {
        type: String
      },
      particlesGeneratedProps: {
        type: Array
      },
      centerIntensity: {
        type: Number
      },
      num_clusters: {
        type: Number
      },
      max_x_stdev: {
        type: Number
      },
      max_y_stdev: {
        type: Number
      },
      cluster_size: {
        type: Number
      }
    };
  },
  beforeMount() {
    this.particlesGenModeProps = "Random";
    this.particlesGeneratedProps = [];
    this.readParticleParams();
    this.readClusterGenParams();
  },
  methods: {
    /*=============================================================================*/
    /* Particles Parameters settings
    /*=============================================================================*/
    particleParamsChange(updatedParams) {
      console.log("particleParamsChange");
      this.particlesParamsProps = Object.assign(
        [],
        this.particlesParamsProps,
        updatedParams
      );
      this.readParticleParams();
    },
    resetParticleParams() {
      console.log("resetParticleParams");
      for (let i = 0; i < this.particlesParamsProps.length; i++) {
        this.particlesParamsProps[i].value = this.particlesParamsProps[
          i
        ].defaultValue;
      }
      this.readParticleParams();
    },
    readParticleParams() {
      this.centerIntensity = this.particlesParamsProps[0].value;
    },

    /*=============================================================================*/
    /* Parameters for generating the dataset of clustered particles
    /*=============================================================================*/
    reGenerateDataset() {
      console.log("reGenerateDataset");
      this.readClusterGenParams();
      if (this.particlesGenModeProps == "Cluster") {
        this.createParticlesClustered();
      }
    },
    genParamsChange(updatedParams) {
      console.log("genParamsChange");
      //this.particlesGenParamsProps = updatedParams;
      this.particlesGenParamsProps = Object.assign(
        [],
        this.particlesGenParamsProps,
        updatedParams
      );
      this.readClusterGenParams();

      if (this.particlesGenModeProps == "Cluster") {
        this.createParticlesClustered();
      }
    },
    readClusterGenParams() {
      this.num_clusters = this.particlesGenParamsProps[0].value;
      this.max_x_stdev = this.particlesGenParamsProps[1].value;
      this.max_y_stdev = this.particlesGenParamsProps[2].value;
      this.cluster_size = this.particlesGenParamsProps[3].value;
    },
    resetGenParams() {
      console.log("resetGenParams");
      for (let i = 0; i < this.particlesGenParamsProps.length; i++) {
        this.particlesGenParamsProps[i].value = this.particlesGenParamsProps[
          i
        ].defaultValue;
      }
      this.readClusterGenParams();
      if (this.particlesGenModeProps == "Cluster") {
        this.createParticlesClustered();
      }
    },
    generateModeChange(updatedParams) {
      console.log("generateModeChange");
      this.particlesGenModeProps = updatedParams;

      if (this.particlesGenModeProps == "Cluster") {
        this.createParticlesClustered();
      }
    },
    createParticlesClustered() {
      //var canvas1 = document.getElementById("canvas1");
      var width = 300;
      var height = 300;
      this.particlesGeneratedProps = Utils.generateParticlesClustered(
        this.num_clusters,
        width,
        height,
        this.max_x_stdev,
        this.max_y_stdev,
        this.cluster_size,
        this.centerIntensity
      );
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
