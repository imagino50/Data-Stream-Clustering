import Cluster from "@/cluster.js";

/*=============================================================================*/
/* Class Canvas Filtering & Clustering Events
/*=============================================================================*/
export default class CanvasClustering {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(canvas, width, height) {
    this.eventFilteredList = [];
    this.clusterList = [];
    this.clusterColorList = [];
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.initCanvas(canvas);
  }

  /*=============================================================================*/
  /* Initialize Canvas
  /*=============================================================================*/
  initCanvas(canvas) {
    canvas.style.border = "solid 1px black";
    canvas.style.background = "black";
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    // lighter creates bright highlight points as the events overlap each other
    this.ctx.globalCompositeOperation = "lighter";
  }

  /*=============================================================================*/
  /* Main function : Render filtered & Clustered events on canvas
  /*=============================================================================*/
  refreshCanvas(
    imgData,
    eventList,
    filterThreshold,
    dbscan,
    neighborhoodRadius,
    nbMinPoints,
    eventsFiltered_sav,
    clusterColors_sav
  ) {
    this.clearCanvas();

    this.renderImageDataFiltered(imgData, filterThreshold);

    this.filterEvents(imgData, eventList, filterThreshold);

    this.computeCluster(dbscan, neighborhoodRadius, nbMinPoints);

    this.renderClusters(eventsFiltered_sav, clusterColors_sav);
  }

  /*=============================================================================*/
  /* Clear Canvas
  /*=============================================================================*/
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  /*=============================================================================*/
  /* Render filetred and clustered events on canvas2
  /*=============================================================================*/
  renderClusters(eventsFiltered_sav, clusterColors_sav) {
    this.setClustersEvents();
    this.clusterColorList = Cluster.buildClusterColors(
      this.clusterList.length,
      this.eventFilteredList,
      eventsFiltered_sav,
      clusterColors_sav
    );
    this.renderFilteredEvents();
  }

  /*=============================================================================*/
  /* Render Image Data Filtered
  /*=============================================================================*/
  renderImageDataFiltered(imgData, filterThreshold) {
    var imgDataFiltered = this.redFilter(imgData, filterThreshold);
    this.ctx.putImageData(imgDataFiltered, 0, 0);
  }

  /*=============================================================================*/
  /* Filter Events using a threshold intensity
  /*=============================================================================*/
  filterEvents(imgData, eventList, redThreshold) {
    this.eventFilteredList = [];
    for (let i = 0; i < eventList.length; i++) {
      if (
        imgData.data[
          eventList[i].y * (imgData.width * 4) + eventList[i].x * 4
        ] >= redThreshold
      ) {
        this.eventFilteredList.push(eventList[i].clone());
      }
    }
    return this.eventFilteredList;
  }

  /*=============================================================================*/
  /* Compute clusters from eventFilteredList
  /*=============================================================================*/
  computeCluster(dbscan, neighborhoodRadius, nbMinPoints) {
    var dataset = Cluster.createDataset(this.eventFilteredList);
    this.clusterList = dbscan.run(dataset, neighborhoodRadius, nbMinPoints);
  }

  /*=============================================================================*/
  /* Render Filtered Events
  /*=============================================================================*/
  renderFilteredEvents() {
    var i = this.eventFilteredList.length;
    while (i--) {
      var colorValue = "rgb(255,255,255)";
      if (this.eventFilteredList[i].clusterId != -1) {
        var colorKey = this.clusterColorList[
          this.eventFilteredList[i].clusterId
        ];
        colorValue = Cluster.ColorsPalette[colorKey];
      }
      //console.log("colorValue", colorValue);
      this.eventFilteredList[i].drawColoredCircle(
        colorValue,
        this.ctx,
        this.canvasWidth,
        this.canvasHeight
      );
    }
  }

  /*=============================================================================*/
  /* filter image pixels by a thresholh (red color only)
  /*=============================================================================*/
  redFilter(imgData, redThreshold) {
    var data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      //var r = d[i];
      //var g = d[i+1];
      //var b = d[i+2];
      if (data[i] < redThreshold) {
        data[i] = 0;
      }
    }
    return imgData;
  }

  /*=============================================================================*/
  /* Set clusters of Filtered Events 
  /*=============================================================================*/
  setClustersEvents() {
    // reset clusterId of all events
    this.eventFilteredList.map(event => (event.clusterId = -1));

    for (let i = 0; i < this.clusterList.length; i++) {
      let cluster = this.clusterList[i];
      for (let j = 0; j < cluster.length; j++) {
        let index = cluster[j];
        this.eventFilteredList[index].setCluster(i);
      }
    }

    /*if (clusters.length > 2) {
      console.log("this.eventFilteredList", this.eventFilteredList, clusters);
    }*/

    return this.eventFilteredList;
  }

  /*=============================================================================*/
  /* Return clusterColorList
  /*=============================================================================*/
  getClusterColorList() {
    return this.clusterColorList;
  }

  /*=============================================================================*/
  /* Return eventFilteredList
  /*=============================================================================*/
  getEventFilteredList() {
    return this.eventFilteredList;
  }

  /*=============================================================================*/
  /* Return clusterList.length
  /*=============================================================================*/
  getClusterLength() {
    return this.clusterList.length;
  }
}
