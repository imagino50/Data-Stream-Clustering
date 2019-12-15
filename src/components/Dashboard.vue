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
        <b-list-group>
          <b-list-group-item
            v-for="item in particlesParams"
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
                @change="onParticleParamsChange($event)"
              />
            </div>
          </b-list-group-item>
          <input
            class="btn btn-primary"
            type="reset"
            value="Reset"
            v-on:click="onResetParticleParams()"
          />
        </b-list-group>
      </b-col>
      <b-col md="9">
        <b-row>
          <b-col md="4" class="p-1">
            <canvas
              id="canvas1"
              width="300"
              height="300"
              v-on:click="onClickCanvas1($event)"
            ></canvas>
            <p>
              Energy diffusion of events.<br />
              Click on the square to add events !
            </p>
          </b-col>
          <b-col md="4" class="p-1">
            <canvas id="canvas2" width="300" height="300"></canvas>
            <p>
              Events filtered by 'Intensity threshold filter' =
              {{ this.particlesParams[4].value }}
            </p>
          </b-col>
          <b-col md="4" class="p-1">
            <canvas id="canvas3" width="300" height="300"></canvas>
            <p>
              ConvexHullGrahamScan of clusters.
            </p>
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col md="3">
            <b-form-group label="Particles generation :">
              <b-form-radio-group
                id="radio-group-2"
                v-model="generationMode"
                @change.native="onGenerateModeChange($event)"
                name="radio-sub-component"
                stacked
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
                  v-on:click="onReGenerateDataset()"
                />
              </b-form-radio-group>
            </b-form-group>
            <b-list-group>
              <b-list-group-item
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
                    @change="onClusterGenParamsChange($event)"
                  />
                </div>
              </b-list-group-item>
              <input
                class="btn btn-primary"
                type="reset"
                value="Reset"
                v-on:click="onResetClusterGenParams()"
              />
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import CanvasParticles from "@/canvasParticles.js";
import Canvas from "@/canvas.js";
import CanvasConvexHGS from "@/canvasConvexHGS.js";
import Cluster from "@/cluster.js";
import Utils from "@/utils";

import particlesJson from "../json/particlesSettings.json";
import clusterGenJson from "../json/clusterGenSettings.json";

export default {
  name: "app",
  components: {},
  data() {
    return {
      particlesParams: particlesJson,
      particlesGenParams: clusterGenJson,
      particlesProps: {
        centerIntensity: {
          type: Number
        },
        intensityMin: {
          type: Number
        },
        incRadius: {
          type: Number
        },
        incIntensity: {
          type: Number
        },
        filterThreshold: {
          type: Number
        },
        nbMinPoints: {
          type: Number
        },
        neighborhoodRadius: {
          type: Number
        }
      },
      particlesGenProps: {
        generationMode: {
          type: String
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
      },
      canPart: null,
      particlesGenerated: [],
      particleID: 0
    };
  },
  beforeMount() {
    console.log("beforeMount");
    this.readParticleParams();
    this.readClusterGenParams();
    this.generationMode = "Random";
  },
  mounted() {
    console.log("mounted");
    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var canvas3 = document.getElementById("canvas3");
    this.initDrawing(canvas1, canvas2, canvas3);

    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var ctx3 = canvas3.getContext("2d");
    var particlesFiltered_sav = [];
    var clusterColors_sav = [];
    var clustering = require("density-clustering");
    var dbscan = new clustering.DBSCAN();
    this.startDrawing(
      ctx1,
      canvas1,
      ctx2,
      canvas2,
      ctx3,
      canvas3,
      particlesFiltered_sav,
      clusterColors_sav,
      dbscan
    );
  },
  methods: {
    onClickCanvas1(e) {
      this.canPart.createParticleFromEvent(e, this.centerIntensity);
    },

    /*=============================================================================*/
    /* Particles Parameters sttings
    /*=============================================================================*/
    onParticleParamsChange() {
      console.log("onParticleParamsChange");
      this.readParticleParams();
    },
    readParticleParams() {
      console.log("readParticleParams");
      this.centerIntensity = this.particlesParams[0].value;
      this.intensityMin = this.particlesParams[1].value;
      this.incRadius = parseFloat(this.particlesParams[2].value);
      this.incIntensity = this.particlesParams[3].value;
      this.filterThreshold = this.particlesParams[4].value;
      this.nbMinPoints = this.particlesParams[5].value;
      this.neighborhoodRadius = this.particlesParams[6].value;
    },
    onResetParticleParams() {
      console.log("onResetParticleParams");
      for (let i = 0; i < this.particlesParams.length; i++) {
        this.particlesParams[i].value = this.particlesParams[i].defaultValue;
      }
      this.readParticleParams();
    },

    /*=============================================================================*/
    /* Parameters for generating the dataset of clustered particles
    /*=============================================================================*/
    onReGenerateDataset() {
      console.log("onReGenerateDataset");
      if (this.generationMode == "Cluster") {
        this.particleID = 0;
        this.createParticlesClustered();
      }
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      this.readClusterGenParams();

      if (this.generationMode == "Cluster") {
        this.particleID = 0;
        this.createParticlesClustered();
      }
    },
    readClusterGenParams() {
      console.log("readClusterGenParams");
      this.num_clusters = this.particlesGenParams[0].value;
      this.max_x_stdev = this.particlesGenParams[1].value;
      this.max_y_stdev = this.particlesGenParams[2].value;
      this.cluster_size = this.particlesGenParams[3].value;
    },
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      for (let i = 0; i < this.particlesGenParams.length; i++) {
        this.particlesGenParams[i].value = this.particlesGenParams[
          i
        ].defaultValue;
      }
      this.readClusterGenParams();
    },
    createParticlesClustered() {
      var canvas1 = document.getElementById("canvas1");
      this.particlesGenerated = Utils.generateParticlesClustered(
        this.num_clusters,
        canvas1.width,
        canvas1.height,
        this.max_x_stdev,
        this.max_y_stdev,
        this.cluster_size,
        this.centerIntensity
      );
    },
    onGenerateModeChange() {
      this.canPart.removeAllParticles();
      console.log("onGenerateChange::this.generationMode", this.generationMode);
      //console.log("onGenerateChange::event.target.value", event.target.value);
      if (this.generationMode == "Cluster") {
        this.particleID = 0;
        this.createParticlesClustered();
      }
    },

    /*=============================================================================*/
    /* Draw particles
    /*=============================================================================*/
    initDrawing(canvas1, canvas2, canvas3) {
      console.log("initDrawing");
      Canvas.initCanvas(canvas1);
      Canvas.initCanvas(canvas2);
      Canvas.initCanvas(canvas3);
      this.canPart = new CanvasParticles(canvas1, canvas2, canvas3);
    },
    startDrawing(
      ctx1,
      canvas1,
      ctx2,
      canvas2,
      ctx3,
      canvas3,
      particlesFiltered_sav,
      clusterColors_sav,
      dbscan
    ) {
      var draw = () => {
        if (this.generationMode == "Random") {
          this.canPart.createRandomParticle(this.centerIntensity);
        } else if (
          this.generationMode == "Cluster" &&
          this.particleID < this.particlesGenerated.length
        ) {
          this.canPart.createParticleFromDataset(
            this.particlesGenerated[this.particleID]
          );
          this.particleID = this.particleID + 1;
        }

        // Canvas 1
        this.canPart.refreshCanvas1(
          ctx1,
          canvas1,
          this.intensityMin,
          this.incRadius,
          this.incIntensity
        );

        // Canvas 2
        Canvas.clearCanvas(ctx2, canvas2);
        Canvas.filterCanvas(ctx1, ctx2, canvas2, this.filterThreshold);
        var particlesFiltered = this.canPart.filterParticles(
          this.filterThreshold
        );

        var dataset = Cluster.createDataset(particlesFiltered);
        var clusters = dbscan.run(
          dataset,
          this.neighborhoodRadius,
          this.nbMinPoints
        );
        particlesFiltered = this.canPart.updateParticlesCluster(clusters);
        var clusterColors = Cluster.buildClusterColors(
          clusters.length,
          particlesFiltered,
          particlesFiltered_sav,
          clusterColors_sav
        );
        this.canPart.renderFilteredParticles(clusterColors);

        // Canvas 3
        CanvasConvexHGS.drawConvexHullClusters(
          ctx3,
          particlesFiltered,
          clusters.length
        );

        // Save the n-1 data particles
        particlesFiltered_sav = [...particlesFiltered];
        clusterColors_sav = [...clusterColors];

        // this function will run endlessly with requestAnimationFrame
        requestAnimationFrame(draw);
      };
      draw();
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
