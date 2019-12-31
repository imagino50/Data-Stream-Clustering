/*=============================================================================*/
/* Class InputGenerator 
/*=============================================================================*/
import Event from "@/event.js";
import Utils from "@/utils.js";

export default class InputGenerator {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(initialNbClusters, canvasWidth, canvasHeight, marginX, marginY) {
    this.width = canvasWidth - marginX;
    this.height = canvasHeight - marginY;
    this.initClusterCenterList(initialNbClusters);
  }

  /*=============================================================================*/
  /* Init List of center cluster
  /*=============================================================================*/
  initClusterCenterList(initialNbClusters) {
    this.clusterCenterList = [];
    for (let i = 0; i < initialNbClusters; i++) {
      this.addClusterCenter();
    }
  }

  /*=============================================================================*/
  /* Update a center of a cluster choosed randomly
  /*=============================================================================*/
  updateRandomClusterCenter(max_centerX_stdev, max_centerY_stdev) {
    if (this.clusterCenterList.length != 0) {
      var clusterId = Utils.getRandomInt(0, this.clusterCenterList.length);

      var newPosX = Utils.rnd(
        this.clusterCenterList[clusterId].x,
        max_centerX_stdev
      );
      if (newPosX > 0 && newPosX < this.width) {
        this.clusterCenterList[clusterId].x = newPosX;
      }

      var newPosY = Utils.rnd(
        this.clusterCenterList[clusterId].y,
        max_centerY_stdev
      );
      if (newPosY > 0 && newPosY < this.height) {
        this.clusterCenterList[clusterId].y = newPosY;
      }
    }
  }

  /*=============================================================================*/
  /* Update the numbers of clusters
  /*=============================================================================*/
  updateNumberClusters(nb_clusters) {
    var current_nb_clusters = this.clusterCenterList.length;
    if (current_nb_clusters < nb_clusters) {
      for (let i = 0; i < nb_clusters - current_nb_clusters; i++) {
        this.addClusterCenter();
      }
    } else if (current_nb_clusters > nb_clusters) {
      for (let i = 0; i < current_nb_clusters - nb_clusters; i++) {
        this.clusterCenterList.shift();
      }
    }
  }

  /*=============================================================================*/
  /* Generate an event either randomly or clustered
  /*=============================================================================*/
  generateEvent(noiseRate, centerIntensity, max_x_stdev, max_y_stdev) {
    var rand = Utils.getRandomInt(0, 101);
    if (rand < noiseRate) {
      return this.createRandomEvent(centerIntensity);
    } else if (this.clusterCenterList.length > 0) {
      var clusterId = Utils.getRandomInt(0, this.clusterCenterList.length);
      return this.createClusteredEvent(
        this.clusterCenterList[clusterId],
        centerIntensity,
        max_x_stdev,
        max_y_stdev
      );
    }
  }

  /*=============================================================================*/
  /* Create Event at ramdom position
  /*=============================================================================*/
  createRandomEvent(centerIntensity) {
    return new Event(
      Utils.getRandomInt(0, this.width),
      Utils.getRandomInt(0, this.height),
      centerIntensity
    );
  }

  /*=============================================================================*/
  /* Create an Event clustered
  /*=============================================================================*/
  createClusteredEvent(cluster, centerIntensity, max_x_stdev, max_y_stdev) {
    return new Event(
      Utils.rnd(cluster.y, max_y_stdev),
      Utils.rnd(cluster.x, max_x_stdev),
      centerIntensity
    );
  }

  /*=============================================================================*/
  /* Add randomly a cluster center
  /*=============================================================================*/
  addClusterCenter() {
    this.clusterCenterList.push({
      x: Math.random() * this.width,
      y: Math.random() * this.height
    });
  }
}
