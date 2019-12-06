export default class Filter {
  static redFilter(imgData, redThreshold) {
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

  /*static filterParticlesByIntensity(particles, imgData, redThreshold) {
    var particlesFiltered = particles.filter(
      item =>
        imgData.data[item.y * (imgData.width * 4) + item.x * 4] >= redThreshold
    );
    return particlesFiltered;
  }*/

  /*static peaksfilter(fireworks, imgData , redThreshold) {
      var res = [];
      // loop over each firework
      var i = fireworks.length;
      while( i-- ) {
        var row = fireworks[ i ].x
        var col = fireworks[ i ].y
        var composanteRed = imgData.data[((col * (imgData.width * 4)) + (row * 4))];
        if(composanteRed > redThreshold){
          res.push(fireworks[ i ]);
        }
      }
      return res;
    }*/
}

/*You can find an implementation of the Graham Scan Convex Hull algorithm for JavaScript on github (MIT License). 
As describes the usage is simple:

//Create a new instance of ConvexHullGrahamScan.
var convexHull = new ConvexHullGrahamScan();

//add points using for loop on your coordinates
for (var i = 0; i < polyCoords.length ; i++) {
    // add your coordinates
    convexHull.addPoint(polyCoords[i][0], polyCoords[i][1]); 
}

// get point array from convex hull
var hullPoints = convexHull.getHull();

// create ol.geom.Polygon from hullPoints...
*/
