import ConvexHGS from "./convexHGS.js";

/*=============================================================================*/
/* Class ConvexHullGrahamScan from http://psychedelicdevelopment.com/grahamscan/
/*=============================================================================*/
export default class ConvexHullGrahamScan {
  static drawConvexHullClusters(ctx, particles, nbClusters) {
    for (let i = 0; i < nbClusters; i++) {
      var hullPoints = this.getConvexHullPoints(
        particles.filter(particle => particle.clusterId == i)
      );

      //console.log("hullPoints", hullPoints);
      this.drawConvexHullPoints(ctx, hullPoints);
    }
  }

  /*if (clusters.length > 0) {
      let groupbyClusterId = particles.reduce((r, a) => {
        //console.log("a", a);
        //console.log('r', r);
        r[a.clusterId] = [...(r[a.clusterId] || []), a];
        return r;
      }, {});*/

  /*const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});*/

  /*=============================================================================*/
  /* Get point array from convex hull
  /*=============================================================================*/
  static getConvexHullPoints(particles) {
    // Create a new instance of ConvexHullGrahamScan.
    var convexHGS = new ConvexHGS();

    // Add points using for loop on your coordinates
    for (var i = 0; i < particles.length; i++) {
      convexHGS.addPoint(particles[i].x, particles[i].y);
    }

    // Get point array from convex hull
    var hullPoints = convexHGS.getHull();

    return hullPoints;
  }

  /*=============================================================================*/
  /* Draw point array from convex hull
  /*=============================================================================*/
  static drawConvexHullPoints(ctx, hullPoints) {
    if (hullPoints && hullPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(hullPoints[0].x, hullPoints[0].y);
      for (let i = 1; i < hullPoints.length; i++) {
        ctx.lineTo(hullPoints[i].x, hullPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
      ctx.stroke();
      /*for (let i = 0; i < hullPoints.length; i++) {
        this.dot(ctx, hullPoints[i], "rgba(200, 0, 0, 0.8)");
      }*/
    }
  }

  /*=============================================================================*/
  /* Draw 
  /*=============================================================================*/
  static dot(ctx, point, style) {
    ctx.save();
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
