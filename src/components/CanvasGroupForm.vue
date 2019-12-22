<template>
  <div id="canvasGroup-form">
    <b-row>
      <b-col md="4" class="p-1">
        <canvas
          id="canvas1"
          width="300"
          height="300"
          @click="onClickCanvas1($event)"
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
          {{ filterThreshold }}
        </p> 
      </b-col>
      <b-col md="4" class="p-1">
        <canvas id="canvas3" width="300" height="300"></canvas>
        <p>
          ConvexHullGrahamScan of clusters.
        </p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import CanvasParticles from "@/canvasParticles.js";
import Canvas from "@/canvas.js";
import CanvasConvexHGS from "@/canvasConvexHGS.js";
import Cluster from "@/cluster.js";

export default {
  name: "canvasGroup-form",
  components: {},
  props: {
    particlesParams: Array,
    particlesGenMode: String,
    particlesGenerated: Array
  },
  data() {
    return {
      canPart: null,
      particleID: 0,
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
    };
  },
  watch: {
    particlesGenMode: function() {
      console.log("watch:particlesGenMode");
      this.particleID = 0;
      this.canPart.removeAllParticles();
    },
    particlesGenerated: function() {
      console.log("watch:particlesGenerated");
      this.particleID = 0;
    },
    particlesParams:function() {
      console.log("watch:canvasGroup-form:particlesParams");
      this.readParticleParams();
    }
  },
  mounted() {
    console.log("mounted");
    this.readParticleParams();

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
    readParticleParams() {
      this.centerIntensity = this.particlesParams[0].value;
      this.intensityMin = this.particlesParams[1].value;
      this.incRadius = parseFloat(this.particlesParams[2].value);
      this.incIntensity = this.particlesParams[3].value;
      this.filterThreshold = this.particlesParams[4].value;
      this.nbMinPoints = this.particlesParams[5].value;
      this.neighborhoodRadius = this.particlesParams[6].value;
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
        if (this.particlesGenMode == "Random") {
          this.canPart.createRandomParticle(this.centerIntensity);
        } else if (
          this.particlesGenMode == "Cluster" &&
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
