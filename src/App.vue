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
          <b-list-group-item v-for="item in settings" v-bind:key="item.id">
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
                @change="onChange($event)"
              />
            </div>
          </b-list-group-item>
          <input
            class="btn btn-primary"
            type="reset"
            value="Reset"
            v-on:click="onReset"
          />
        </b-list-group>
      </b-col>
      <b-col md="3" class="p-1">
        <canvas id="canvas1" width="300" height="300"></canvas>
        <p>
          Energy diffusion of events.<br />
          Click on the square to add events !
        </p>
      </b-col>
      <b-col md="3" class="p-1">
        <canvas id="canvas2" width="300" height="300"></canvas>
        <p>
          Events filtered by 'Intensity threshold filter' =
          {{ this.settings[4].value }}
        </p>
      </b-col>
      <b-col md="3" class="p-1">
        <canvas id="canvas3" width="300" height="300"></canvas>
        <p>
          ConvexHullGrahamScan of clusters.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CanvasParticles from "./canvasParticles.js";
import Canvas from "./canvas.js";
import CanvasConvexHGS from "./canvasConvexHGS.js";
import Cluster from "./cluster.js";
import json from "./json/settings.json";

var centerIntensity;
var intensityMin;
var incRadius;
var incIntensity;
var filterThreshold;
var nbMinPoints;
var neighborhoodRadius;

export default {
  name: "app",
  components: {},
  data() {
    return {
      settings: json
    };
  },
  mounted() {
    console.log("mounted");
    // init global variables
    this.readSettings();

    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var canvas3 = document.getElementById("canvas3");
    var canPart = this.initDrawing(canvas1, canvas2, canvas3);

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
    onChange() {
      this.readSettings();
    },
    onReset() {
      for (let i = 0; i < this.settings.length; i++) {
        this.settings[i].value = this.settings[i].defaultValue;
      }
      this.readSettings();
    },
    readSettings() {
      centerIntensity = this.settings[0].value;
      intensityMin = this.settings[1].value;
      incRadius = parseFloat(this.settings[2].value);
      incIntensity = this.settings[3].value;
      filterThreshold = this.settings[4].value;
      nbMinPoints = this.settings[5].value;
      neighborhoodRadius = this.settings[6].value;
    },
    initDrawing(canvas1, canvas2, canvas3) {
      Canvas.initCanvas(canvas1);
      Canvas.initCanvas(canvas2);
      Canvas.initCanvas(canvas3);
      var canPart = new CanvasParticles(canvas1, canvas2, canvas3);
      canvas1.addEventListener(
        "click",
        function(e) {
          canPart.createParticleFromEvent(e, centerIntensity);
        },
        false
      );

      //Utils.setupRAF();
      //console.log("initDrawing", canPart);
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
        // Canvas 1
        canPart.refreshCanvas1(
          ctx1,
          canvas1,
          intensityMin,
          centerIntensity,
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
