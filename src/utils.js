/*=============================================================================*/
/* Class utils 
/*=============================================================================*/
export default class utils {
  // get a random number within a range
  static random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  /*=============================================================================*/
  /* Setup requestAnimationFrame
  /*=============================================================================*/
  setupRAF() {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }

  /**
   * clusterColors
   * @desc Generate a random colors for clusters.
   * @return random colors
   */
  /*static clusterColors(nbClusters) {
    var colors = [];

    // Generate point color for each cluster.
    for (var i = 0; i < nbClusters; i++) {
      colors.push("#" + ((Math.random() * (1 << 24)) | 0).toString(16));
    }

    return colors;
  }*/

  static generate_cluster_data(width, height) {
    var num_clusters = 3;
    var max_x_stdev = 10;
    var max_y_stdev = 15;
    var cluster_size = 30;
    var raw_point_data = [];
    var cluster_centers = [];
    for (let i = 0; i < num_clusters; i++) {
      cluster_centers.push({
        x: Math.random() * (width - 30),
        y: Math.random() * (height - 30)
      });
    }
    cluster_centers.forEach(function(d) {
      for (let i = 0; i < cluster_size; i++) {
        raw_point_data.push({
          x: this.rnd(d.x, max_x_stdev),
          y: this.rnd(d.y, max_y_stdev)
        });
      }
    });
    return raw_point_data;
  }

  /*=============================================================================*/
  /* generate random number
  /*=============================================================================*/
  static rnd(mean, stdev) {
    return Math.round(this.rnd_snd() * stdev + mean);
  }

  /*=============================================================================*/
  /* generate random number
  /*=============================================================================*/
  static rnd_snd() {
    return (
      Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)
    );
  }
}
