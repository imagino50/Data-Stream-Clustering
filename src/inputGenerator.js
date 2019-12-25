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
    this.clusterCenterList = this.initClusterCenterList(initialNbClusters);
  }

  /*=============================================================================*/
  /* Init List of center cluster
  /*=============================================================================*/
  initClusterCenterList(initialNbClusters) {
    var clusterCenterList = [];
    for (let i = 0; i < initialNbClusters; i++) {
      clusterCenterList.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height
      });
    }
    return clusterCenterList;
  }

  /*=============================================================================*/
  /* Generate an event either randomly or clustered
  /*=============================================================================*/
  generateEvent(noiseRate, centerIntensity) {
    var rand = Utils.getRandomInt(0, 101);
    if (rand < noiseRate) {
      return this.createRandomEvent(centerIntensity);
    } else {
      var clusterId = Utils.getRandomInt(0, this.clusterCenterList.length);
      return this.createClusteredEvent(
        this.clusterCenterList[clusterId],
        centerIntensity
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
      Utils.rnd(cluster.x, max_x_stdev),
      Utils.rnd(cluster.y, max_y_stdev),
      centerIntensity
    );
  }

  /*=============================================================================*/
  /* Update a center of a cluster choosed randomly
  /*=============================================================================*/
  updateRandomClusterCenter(max_centerX_stdev, max_centerY_stdev) {
    var clusterId = Utils.getRandomInt(0, this.clusterCenterList.length);

    var deltaX = Utils.rnd(
      this.clusterCenterList[clusterId].x,
      max_centerX_stdev
    );
    var deltaY = Utils.rnd(
      this.clusterCenterList[clusterId].y,
      max_centerY_stdev
    );

    var random_boolean = Math.random() >= 0.5;
    if (random_boolean) {
      deltaX *= -1;
    }

    random_boolean = Math.random() >= 0.5;
    if (random_boolean) {
      deltaY *= -1;
    }

    var newPosX = this.clusterCenterList[clusterId].x + deltaX;
    if (newPosX > 0 && newPosX < this.width) {
      this.clusterCenterList[clusterId].x = newPosX;
    }

    var newPosY = this.clusterCenterList[clusterId].y + deltaY;
    if (newPosY > 0 && newPosY < this.height) {
      this.clusterCenterList[clusterId].y = newPosY;
    }
  }
}
