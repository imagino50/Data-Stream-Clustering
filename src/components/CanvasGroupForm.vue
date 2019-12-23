<template>
  <div id="canvasGroup-form">
    <b-row>
      <b-col md="4" class="p-1">
        <canvas
          id="canvas1"
          width="canvasWidth"
          height="canvasHeight"
          @click="onClickCanvas1($event)"
        ></canvas>
        <p>
          Energy diffusion of events.<br />
          Click on the square to add events !
        </p>
      </b-col>
      <b-col md="4" class="p-1">
        <canvas id="canvas2" width="canvasWidth" height="canvasHeight"></canvas>
        <p>
          Events filtered by 'Intensity threshold filter':
          {{ getFilterThreshold }}
        </p>
      </b-col>
      <b-col md="4" class="p-1">
        <canvas id="canvas3" width="canvasWidth" height="canvasHeight"></canvas>
        <p>
          ConvexHullGrahamScan of clusters.
        </p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { particleGetters } from "@/store/particleSettingsStore.js";
import { inputGetters, inputMutations } from "@/store/inputDataStore.js";
import CanvasParticles from "@/canvasParticles.js";
import Canvas from "@/canvas.js";
import CanvasConvexHGS from "@/canvasConvexHGS.js";
import Cluster from "@/cluster.js";

export default {
  name: "canvasGroup-form",
  components: {},
  data() {
    return {
      canPart: null,
      canvasWidth: 300,
      canvasHeight: 300
    };
  },
  computed: {
    getFilterThreshold() {
      return particleGetters.filterThreshold();
    }
  },
  /*watch: {
    particlesGenMode: function() {
      console.log("watch:particlesGenMode");
      particleMutations.setParticleID(0);
      this.canPart.removeAllParticles();
    }
  },*/
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
      this.canPart.createParticleFromEvent(
        e,
        particleGetters.centerIntensity()
      );
    },
    /*=============================================================================*/
    /* Draw particles
    /*=============================================================================*/
    initDrawing(canvas1, canvas2, canvas3) {
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
        if (inputGetters.generationMode() == "Random") {
          this.canPart.createRandomParticle(particleGetters.centerIntensity());
        } else if (
          inputGetters.generationMode() == "Cluster" &&
          inputGetters.particleID() < inputGetters.particlesGenerated().length
        ) {
          this.canPart.createParticleFromDataset(
            inputGetters.particlesGenerated()[inputGetters.particleID()]
          );
          inputMutations.incParticleID();
        }

        // Canvas 1
        this.canPart.refreshCanvas1(
          ctx1,
          canvas1,
          particleGetters.intensityMin(),
          particleGetters.incRadius(),
          particleGetters.incIntensity()
        );

        // Canvas 2
        Canvas.clearCanvas(ctx2, canvas2);
        Canvas.filterCanvas(
          ctx1,
          ctx2,
          canvas2,
          particleGetters.filterThreshold()
        );
        var particlesFiltered = this.canPart.filterParticles(
          particleGetters.filterThreshold()
        );

        var dataset = Cluster.createDataset(particlesFiltered);
        var clusters = dbscan.run(
          dataset,
          particleGetters.neighborhoodRadius(),
          particleGetters.nbMinPoints()
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
</style>
