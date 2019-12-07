<template>
  <b-container id="app" class="bv-example-row">
    <b-row class="text-center">
      <b-col>
        <h1 class="mb-5 text-info">
          Signals diffusion and intensity accumulation.
        </h1>
      </b-col>
    </b-row>
    <b-row class="text-left">
      <b-col>
        <div v-for="item in settings" v-bind:key="item.id">
          <div class="form-group border border-info p-2 rounded bg-light">
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
        </div>
        <input
          class="btn btn-primary"
          type="reset"
          value="Reset"
          v-on:click="onReset"
        />
      </b-col>
      <b-col>
        <canvas id="canvas1" width="300" height="300"></canvas>
        <p>
          Energy diffusion of events.<br />
          Click on the square to add events !
        </p>
      </b-col>
      <b-col>
        <canvas id="canvas2" width="300" height="300"></canvas>
        <p>
          Events filtered by 'Intensity threshold filter' =
          {{ this.settings[4].value }}
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CanvasParticles from "./canvasParticles.js";
import Canvas from "./canvas.js";
//import Utils from "./utils.js";
import Cluster from "./cluster.js";
import PixelLocation from "./pixelLocation.js";

var centerIntensity;
var intensityMin;
var incRadius;
var incIntensity;
var filterThreshold;

export default {
  name: "app",
  components: {
    //SettingsTable
  },
  data() {
    return {
      settings: [
        {
          id: 1,
          label: "Event initial intensity",
          value: 150,
          defaultValue: 150,
          range: 250,
          step: 1
        },
        {
          id: 2,
          label: "Intensity threshold for the display",
          value: 5,
          defaultValue: 5,
          range: 250,
          step: 1
        },
        {
          id: 3,
          label: "Radius increasing speed",
          value: 0.2,
          defaultValue: 0.2,
          range: 1,
          step: 0.05
        },
        {
          id: 4,
          label: "Intensity decreasing speed",
          value: 1,
          defaultValue: 1,
          range: 10,
          step: 0.1
        },
        {
          id: 5,
          label: "Intensity threshold filter",
          value: 200,
          defaultValue: 200,
          range: 250,
          step: 1
        }
      ]
    };
  },
  mounted() {
    console.log("mounted");
    // init global variables
    this.readSettings();
    var canPart = this.initDrawing();
    var canvas1 = document.getElementById("canvas1");
    var ctx1 = canvas1.getContext("2d");
    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");
    var particlesFiltered_sav = [];
    var clusterColors_sav = [];
    this.startDrawing(
      canPart,
      ctx1,
      canvas1,
      ctx2,
      canvas2,
      particlesFiltered_sav,
      clusterColors_sav
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
      this.settings[0].value = this.settings[0].defaultValue;
      this.settings[1].value = this.settings[1].defaultValue;
      this.settings[2].value = this.settings[2].defaultValue;
      this.settings[3].value = this.settings[3].defaultValue;
      this.settings[4].value = this.settings[4].defaultValue;
      this.readSettings();
    },
    readSettings() {
      centerIntensity = this.settings[0].value;
      intensityMin = this.settings[1].value;
      incRadius = parseFloat(this.settings[2].value);
      incIntensity = this.settings[3].value;
      filterThreshold = this.settings[4].value;
    },
    initDrawing() {
      var canvas1 = document.getElementById("canvas1");
      Canvas.initCanvas1(canvas1);

      var canvas2 = document.getElementById("canvas2");
      Canvas.initCanvas2(canvas2);

      var canPart = new CanvasParticles(canvas1, canvas2);
      //canPart.addEventCanvas(canvas1, centerIntensity);

      canvas1.addEventListener(
        "click",
        function(e) {
          var eventLocation = PixelLocation.getPosition(e);
          canPart.createParticle(
            eventLocation.x,
            eventLocation.y,
            centerIntensity
          );
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
      particlesFiltered_sav,
      clusterColors_sav
    ) {
      var draw = () => {
        //if (Date.now() < (this.timestamp + 900)) return requestAnimationFrame(draw);
        //if (Canvas.isCanvasSupported) {
        Canvas.clearCanvas(ctx1, canvas1);
        canPart.removeParticles(intensityMin);
        canPart.createRandomParticle(centerIntensity);
        canPart.updateParticlesShape(incRadius, incIntensity);
        canPart.renderParticles();

        Canvas.clearCanvas(ctx2, canvas2);
        Canvas.filterCanvas(ctx1, ctx2, canvas2, filterThreshold);
        var particlesFiltered = canPart.filterParticles(filterThreshold);

        var dataset = Cluster.createDataset(particlesFiltered);

        var clustering = require("density-clustering");
        var dbscan = new clustering.DBSCAN();
        var nbMinPoints = 2; // number of points in neighborhood to form a cluster
        var neighborhoodRadius = 5; // neighborhood radius
        var clusters = dbscan.run(dataset, neighborhoodRadius, nbMinPoints);

        particlesFiltered = canPart.updateParticlesCluster(clusters);

        var clusterColors = Cluster.buildClusterColors(
          clusters.length,
          particlesFiltered,
          particlesFiltered_sav,
          clusterColors_sav
        );

        /*if (clusters.length > 2) {
          console.log("log", clusters, clusterColors, particlesFiltered);
        }*/

        canPart.renderFilteredParticles(clusterColors);

        particlesFiltered_sav = [...particlesFiltered];
        clusterColors_sav = [...clusterColors];

        // this function will run endlessly with requestAnimationFrame
        requestAnimationFrame(draw);
        //}
        //this.timestamp = Date.now();
        //requestAnimationFrame(draw);
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
