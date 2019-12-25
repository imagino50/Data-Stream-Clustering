import ConvexHGS from "@/convexHGS.js";
import Clustering from "@/clustering.js";

/*=============================================================================*/
/* Class Canvas ConvexHGS
/*=============================================================================*/
export default class CanvasConvexHGS {
  /*=============================================================================*/
  /* Constructor
  /*=============================================================================*/
  constructor(canvas, width, height) {
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
    //this.ctx.globalCompositeOperation = "lighter";
  }

  /*=============================================================================*/
  /* Main function : Compute and draw convex hull areas
  /*=============================================================================*/
  drawConvexHullClusters(eventList, clusterColorList, nbClusters) {
    for (let i = 0; i < nbClusters; i++) {
      var hullPoints = this.computeConvexHullPoints(
        eventList.filter(event => event.clusterId == i)
      );
      var colorKey = clusterColorList[i];
      var colorValueCluster = Clustering.ColorsPalette[colorKey];

      //console.log("hullPoints", hullPoints);
      this.drawConvexHullPoints(hullPoints, colorValueCluster);
    }
  }

  /*=============================================================================*/
  /*  Compute convex hull point array 
  /*=============================================================================*/
  computeConvexHullPoints(eventList) {
    // Create a new instance of ConvexHullGrahamScan.
    var convexHGS = new ConvexHGS();

    // Add points using for loop on your coordinates
    for (var i = 0; i < eventList.length; i++) {
      convexHGS.addPoint(eventList[i].x, eventList[i].y);
    }

    // Get point array from convex hull
    var hullPoints = convexHGS.getHull();

    return hullPoints;
  }

  /*=============================================================================*/
  /* Draw a convex hull area
  /*=============================================================================*/
  drawConvexHullPoints(hullPoints, colorValueCluster) {
    if (hullPoints && hullPoints.length > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(hullPoints[0].x, hullPoints[0].y);
      for (let i = 1; i < hullPoints.length; i++) {
        this.ctx.lineTo(hullPoints[i].x, hullPoints[i].y);
      }
      this.ctx.closePath();
      //  this.ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
      // this.ctx.fill();
      this.ctx.strokeStyle = colorValueCluster; //"rgba(200, 0, 0, 0.5)"; //
      this.ctx.stroke();
      /*for (let i = 0; i < hullPoints.length; i++) {
        this.dot(ctx, hullPoints[i], "rgba(200, 0, 0, 0.8)");
      }*/
    }
  }

  /*=============================================================================*/
  /* Draw dot used for the border
  /*=============================================================================*/
  dot(point, style) {
    this.ctx.save();
    this.ctx.fillStyle = style;
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}
