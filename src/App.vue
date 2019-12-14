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
            v-for="item in particleParams"
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
            v-on:click="onResetParticleParams"
          />
        </b-list-group>
      </b-col>
      <b-col md="9">
        <b-row>
          <b-col md="4" class="p-1">
            <canvas id="canvas1" width="300" height="300"></canvas>
            <p>
              Energy diffusion of events.<br />
              Click on the square to add events !
            </p>
          </b-col>
          <b-col md="4" class="p-1">
            <canvas id="canvas2" width="300" height="300"></canvas>
            <p>
              Events filtered by 'Intensity threshold filter' =
              {{ this.particleParams[4].value }}
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
                  value="R"
                  >Random</b-form-radio
                >
                <b-form-radio
                  v-model="generationMode"
                  name="some-radios"
                  value="C"
                  >Cluster</b-form-radio
                >
                <input
                  class="btn btn-primary"
                  type="restart"
                  value="re-generate dataset"
                  v-on:click="onReGenerateDataset"
                />
              </b-form-radio-group>
            </b-form-group>
            <b-list-group>
              <b-list-group-item
                v-for="item in clusterGenParams"
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
                v-on:click="onResetClusterGenParams"
              />
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import CanvasParticles from "./canvasParticles.js";
import Canvas from "./canvas.js";
import CanvasConvexHGS from "./canvasConvexHGS.js";
import Cluster from "./cluster.js";
import Utils from "./utils";

import particlesSettings from "./json/particlesSettings.json";
import clusterGenSettings from "./json/clusterGenSettings.json";

var centerIntensity;
var intensityMin;
var incRadius;
var incIntensity;
var filterThreshold;
var nbMinPoints;
var neighborhoodRadius;

var num_clusters;
var max_x_stdev;
var max_y_stdev;
var cluster_size;

var canPart;
var particlesGenerated = [];
var particleID = 0;

export default {
  name: "app",
  components: {},
  data() {
    return {
      particleParams: particlesSettings,
      clusterGenParams: clusterGenSettings,
      generationMode: "R",
      nbClusterInput: 1
    };
  },
  mounted() {
    console.log("mounted");
    // init global variables
    this.readParticleParams();
    this.readClusterGenParams();

    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var canvas3 = document.getElementById("canvas3");
    canPart = this.initDrawing(canvas1, canvas2, canvas3);

    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var ctx3 = canvas3.getContext("2d");
    var particlesFiltered_sav = [];
    var clusterColors_sav = [];
    var clustering = require("density-clustering");
    var dbscan = new clustering.DBSCAN();
    this.startDrawing(
      canPart,
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
  beforeDestroy() {
    console.log("beforeDestroy");
    var canvas1 = document.getElementById("canvas1");
    canvas1.removeEventListener("click");
  },
  methods: {
    /*=============================================================================*/
    /* Particles Parameters
    /*=============================================================================*/
    onParticleParamsChange() {
      console.log("onParticleParamsChange");
      this.readParticleParams();
    },
    readParticleParams() {
      console.log("readParticleParams");
      centerIntensity = this.particleParams[0].value;
      intensityMin = this.particleParams[1].value;
      incRadius = parseFloat(this.particleParams[2].value);
      incIntensity = this.particleParams[3].value;
      filterThreshold = this.particleParams[4].value;
      nbMinPoints = this.particleParams[5].value;
      neighborhoodRadius = this.particleParams[6].value;
    },
    onResetParticleParams() {
      console.log("onResetParticleParams");
      for (let i = 0; i < this.particleParams.length; i++) {
        this.particleParams[i].value = this.particleParams[i].defaultValue;
      }
      this.readParticleParams();
    },

    /*=============================================================================*/
    /* Parameters for generating the dataset of clustered particles
    /*=============================================================================*/
    onReGenerateDataset() {
      console.log("onReGenerateDataset");
      if (this.generationMode == "C") {
        particleID = 0;
        this.createParticlesClustered();
      }
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      this.readClusterGenParams();

      if (this.generationMode == "C") {
        particleID = 0;
        this.createParticlesClustered();
      }
    },
    readClusterGenParams() {
      console.log("readClusterGenParams");
      num_clusters = this.clusterGenParams[0].value;
      max_x_stdev = this.clusterGenParams[1].value;
      max_y_stdev = this.clusterGenParams[2].value;
      cluster_size = this.clusterGenParams[3].value;
    },
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      for (let i = 0; i < this.clusterGenParams.length; i++) {
        this.clusterGenParams[i].value = this.clusterGenParams[i].defaultValue;
      }
      this.readClusterGenParams();
    },
    createParticlesClustered() {
      var canvas1 = document.getElementById("canvas1");
      var width = canvas1.width;
      var height = canvas1.height;

      particlesGenerated = Utils.generateParticlesClustered(
        num_clusters,
        width,
        height,
        max_x_stdev,
        max_y_stdev,
        cluster_size,
        centerIntensity
      );
    },
    onGenerateModeChange(event) {
      canPart.removeAllParticles();
      console.log("onGenerateChange::this.generationMode", this.generationMode);
      console.log("onGenerateChange::event.target.value", event.target.value);

      if (this.generationMode == "C") {
        particleID = 0;
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
      canPart = new CanvasParticles(canvas1, canvas2, canvas3);
      canvas1.addEventListener(
        "click",
        function(e) {
          canPart.createParticleFromEvent(e, centerIntensity);
        },
        false
      );
      return canPart;
    },
    startDrawing(
      canPart,
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
        //console.log("draw::this.generationMode", this.generationMode);
        if (this.generationMode == "R") {
          canPart.createRandomParticle(centerIntensity);
        } else if (
          this.generationMode == "C" &&
          particleID < particlesGenerated.length
        ) {
          canPart.createParticleFromDataset(particlesGenerated[particleID]);
          particleID = particleID + 1;
        }

        // Canvas 1
        canPart.refreshCanvas1(
          ctx1,
          canvas1,
          intensityMin,
          incRadius,
          incIntensity
        );

        // Canvas 2
        Canvas.clearCanvas(ctx2, canvas2);
        Canvas.filterCanvas(ctx1, ctx2, canvas2, filterThreshold);
        var particlesFiltered = canPart.filterParticles(filterThreshold);

        var dataset = Cluster.createDataset(particlesFiltered);
        var clusters = dbscan.run(dataset, neighborhoodRadius, nbMinPoints);
        particlesFiltered = canPart.updateParticlesCluster(clusters);
        var clusterColors = Cluster.buildClusterColors(
          clusters.length,
          particlesFiltered,
          particlesFiltered_sav,
          clusterColors_sav
        );
        canPart.renderFilteredParticles(clusterColors);

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
