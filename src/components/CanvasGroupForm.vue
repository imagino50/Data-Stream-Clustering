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
          Click on the canvas to add events !
        </p>
        <div v-bind:style="{ width: canvasWidth + 'px' }">
          <eventSettings />
        </div>
      </b-col>
      <b-col md="4" class="p-1">
        <canvas id="canvas2" width="canvasWidth" height="canvasHeight"></canvas>
        <p>
          1 color per cluster. (White circles are noises)
        </p>
        <div v-bind:style="{ width: canvasWidth + 'px' }">
          <clusterSettings />
        </div>
      </b-col>
      <b-col md="4" class="p-1">
        <canvas id="canvas3" width="canvasWidth" height="canvasHeight"></canvas>
        <p>
          Convex Hull (GrahamScan) of clusters.
        </p>
        <div v-bind:style="{ width: canvasWidth + 'px' }">
          <convexHgsSettings />
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import EventSettings from "@/components/EventSettingsForm.vue";
import ClusterSettings from "@/components/ClusterSettingsForm.vue";
import ConvexHgsSettings from "@/components/ConvexHgsSettingsForm.vue";

import CanvasInput from "@/canvasInput.js";
import CanvasClustering from "@/canvasClustering.js";
import CanvasConvexHGS from "@/canvasConvexHGS.js";

import { inputGetters } from "@/store/inputSettingsStore.js";
import { eventGetters } from "@/store/eventSettingsStore.js";
import { clusterGetters } from "@/store/clusterSettingsStore.js";

export default {
  name: "canvasGroup-form",
  components: { EventSettings, ClusterSettings, ConvexHgsSettings },
  data() {
    return {
      canvasInput: null,
      canvasCluster: null,
      canvasConvexHGS: null,
      canvasWidth: 300,
      canvasHeight: 300,
      marginX: 30,
      marginY: 30
    };
  },
  mounted() {
    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var canvas3 = document.getElementById("canvas3");
    this.setUpCanvas(canvas1, canvas2, canvas3, inputGetters.nb_clusters());

    var eventsFiltered_sav = [];
    var clusterColors_sav = [];
    // https://www.npmjs.com/package/density-clustering
    var clustering = require("density-clustering");
    var dbscan = new clustering.DBSCAN();
    this.startDrawing(
      canvas1,
      canvas2,
      canvas3,
      dbscan,
      eventsFiltered_sav,
      clusterColors_sav
    );
  },
  methods: {
    onClickCanvas1(e) {
      this.canvasInput.createEventFromClick(e, eventGetters.centerIntensity());
    },
    setUpCanvas(canvas1, canvas2, canvas3, nb_clusters) {
      this.canvasInput = new CanvasInput(
        canvas1,
        this.canvasWidth,
        this.canvasHeight,
        nb_clusters
      );
      this.canvasCluster = new CanvasClustering(
        canvas2,
        this.canvasWidth,
        this.canvasHeight
      );
      this.canvasConvexHGS = new CanvasConvexHGS(
        canvas3,
        this.canvasWidth,
        this.canvasHeight
      );
    },
    /*=============================================================================*/
    /* Refresh all Canvas
    /*=============================================================================*/
    startDrawing(
      canvas1,
      canvas2,
      canvas3,
      dbscan,
      eventsFiltered_sav,
      clusterColors_sav
    ) {
      var draw = () => {
        // Canvas 1 : canvasInput
        this.canvasInput.addEventFromSelection(
          inputGetters.generationMode(),
          inputGetters.nb_clusters(),
          inputGetters.noiseRate(),
          inputGetters.max_x_stdev(),
          inputGetters.max_y_stdev(),
          inputGetters.max_centerX_stdev(),
          inputGetters.max_centerY_stdev(),
          eventGetters.centerIntensity()
        );

        this.canvasInput.refreshCanvas(
          eventGetters.intensityMin(),
          eventGetters.incRadius(),
          eventGetters.incIntensity()
        );

        // Canvas 2 : canvasCluster
        var imgData = this.canvasInput.getImageData();
        var events = this.canvasInput.getEventList();
        this.canvasCluster.refreshCanvas(
          imgData,
          events,
          clusterGetters.isImgDataShown(),
          clusterGetters.filterThreshold(),
          dbscan,
          clusterGetters.neighborhoodRadius(),
          clusterGetters.nbMinPoints(),
          eventsFiltered_sav,
          clusterColors_sav
        );

        // Canvas 3 : canvasConvexHGS
        var eventsFiltered = this.canvasCluster.getEventFilteredList();
        var clustersColors = this.canvasCluster.getClusterColorList();
        var clusterLength = this.canvasCluster.getClusterLength();
        this.canvasConvexHGS.drawConvexHullClusters(
          eventsFiltered,
          clustersColors,
          clusterLength
        );

        // Save the n-1 data events
        eventsFiltered_sav = [...eventsFiltered];
        clusterColors_sav = [...clustersColors];

        // this function will run endlessly with requestAnimationFrame
        requestAnimationFrame(draw);
      };
      draw();
    }
  }
};
</script>

<style></style>
