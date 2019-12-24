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
import { eventGetters } from "@/store/eventSettingsStore.js";
import { inputGetters, inputMutations } from "@/store/inputSettingsStore.js";
import CanvasEvents from "@/canvasEvents.js";
import Canvas from "@/canvas.js";
import CanvasConvexHGS from "@/canvasConvexHGS.js";
import Cluster from "@/cluster.js";
//import InputGenerator from "@/inputGenerator.js";

export default {
  name: "canvasGroup-form",
  components: {},
  data() {
    return {
      canPart: null,
      canvasWidth: 300,
      canvasHeight: 300,
      marginX: 30,
      marginY: 30
    };
  },
  computed: {
    getFilterThreshold() {
      return eventGetters.filterThreshold();
    }
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
    var eventsFiltered_sav = [];
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
      eventsFiltered_sav,
      clusterColors_sav,
      dbscan
    );
  },
  methods: {
    onClickCanvas1(e) {
      this.canPart.createEventFromClick(e, eventGetters.centerIntensity());
    },
    /*=============================================================================*/
    /* Draw Events
    /*=============================================================================*/
    initDrawing(canvas1, canvas2, canvas3) {
      this.canPart = new CanvasEvents(
        canvas1,
        canvas2,
        canvas3,
        this.canvasWidth,
        this.canvasHeight
      );
      /*this.InputGenerator(
        initialNbClusters,
        canvasWidth,
        canvasHeight,
        marginX,
        marginY
      );*/
    },
    startDrawing(
      ctx1,
      canvas1,
      ctx2,
      canvas2,
      ctx3,
      canvas3,
      eventsFiltered_sav,
      clusterColors_sav,
      dbscan
    ) {
      var draw = () => {
        if (inputGetters.generationMode() == "Random") {
          this.canPart.createRandomEvent(eventGetters.centerIntensity());
        } else if (
          inputGetters.generationMode() == "Cluster" &&
          inputGetters.eventID() < inputGetters.eventsGenerated().length
        ) {
          this.canPart.addEvent(
            inputGetters.eventsGenerated()[inputGetters.eventID()]
          );
          inputMutations.incEventID();
        } /*else if (inputGetters.generationMode() == "ClusterMoving") {
        }*/

        // Canvas 1
        this.canPart.refreshCanvas1(
          ctx1,
          eventGetters.intensityMin(),
          eventGetters.incRadius(),
          eventGetters.incIntensity()
        );

        // Canvas 2
        Canvas.clearCanvas(ctx2, canvas2);
        Canvas.filterCanvas(
          ctx1,
          ctx2,
          canvas2,
          eventGetters.filterThreshold()
        );
        var eventsFiltered = this.canPart.filterEvents(
          eventGetters.filterThreshold()
        );

        var dataset = Cluster.createDataset(eventsFiltered);
        var clusters = dbscan.run(
          dataset,
          eventGetters.neighborhoodRadius(),
          eventGetters.nbMinPoints()
        );
        eventsFiltered = this.canPart.setClustersEvents(clusters);
        var clusterColors = Cluster.buildClusterColors(
          clusters.length,
          eventsFiltered,
          eventsFiltered_sav,
          clusterColors_sav
        );
        this.canPart.renderFilteredEvents(clusterColors);

        // Canvas 3
        CanvasConvexHGS.drawConvexHullClusters(
          ctx3,
          eventsFiltered,
          clusters.length
        );

        // Save the n-1 data events
        eventsFiltered_sav = [...eventsFiltered];
        clusterColors_sav = [...clusterColors];

        // this function will run endlessly with requestAnimationFrame
        requestAnimationFrame(draw);
      };
      draw();
    }
  }
};
</script>

<style></style>
