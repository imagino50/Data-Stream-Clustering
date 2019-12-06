/*=============================================================================*/
/* Class Cluster
/*=============================================================================*/
export default class Cluster {
  static createDataset(particlesFiltered) {
    var dataset = [];
    for (let i = 0; i < particlesFiltered.length; i++) {
      dataset.push([particlesFiltered[i].x, particlesFiltered[i].y]);
      //fireworksFiltered[i].cluster = -1;
    }
    //console.log("dataset", dataset);
    return dataset;
  }

  /*static runDbscan(dbscan, dataset, neighborhoodRadius, nbMinPoints) {
    // parameters: 5 - neighborhood radius - number of points in neighborhood to form a cluster
    var clusters = dbscan.run(dataset, neighborhoodRadius, nbMinPoints);
    return clusters;
  }*/

  static recoverClusterColors(
    nbClusters,
    fireworksFiltered,
    fireworksFiltered_sav,
    clusterColors_sav
  ) {
    var clusterColors = new Array(nbClusters).fill("null");

    for (let idx = 0; idx < fireworksFiltered.length; idx++) {
      let clusterId = fireworksFiltered[idx].cluster;
      if (clusterId != -1) {
        for (
          let idx_sav = 0;
          idx_sav < fireworksFiltered_sav.length;
          idx_sav++
        ) {
          if (
            fireworksFiltered[idx].x == fireworksFiltered_sav[idx_sav].x &&
            fireworksFiltered[idx].y == fireworksFiltered_sav[idx_sav].y &&
            fireworksFiltered_sav[idx_sav].cluster != -1
          ) {
            var colorUsedKey =
              clusterColors_sav[fireworksFiltered_sav[idx_sav].cluster];

            /*if(fireworksFiltered_sav[idx_sav].cluster >= clusterColors_sav.length)
              {
              console.log(
                "fireworksFiltered_sav[idx_sav].cluster",
                fireworksFiltered_sav[idx_sav].cluster
              );
              console.log(
                "clusterColors_sav",
                clusterColors_sav
              );
              }*/
            /*console.log(
                "colorUsedKey",
                colorUsedKey
              );*/
            clusterColors[clusterId] = colorUsedKey;

            break;
          }
        }
      }
    }
    return clusterColors;
  }

  static buildClusterColors(
    nbClusters,
    fireworksFiltered,
    fireworksFiltered_sav,
    clusterColors_sav
  ) {
    /*if (nbClusters > 2) {
      console.log("fireworksFiltered2", fireworksFiltered);
    }*/
    var clusterColors = this.recoverClusterColors(
      nbClusters,
      fireworksFiltered,
      fireworksFiltered_sav,
      clusterColors_sav
    );
    //////////////////////
    //clusterColors = new Array(nbClusters).fill("null");
    //////////////////////

    var clusterColorsUsed = [...new Set(clusterColors)];
    clusterColorsUsed = clusterColorsUsed.filter(function(el) {
      return el != "null";
    });

    for (let i = 0; i < clusterColors.length; i++) {
      if (clusterColors[i] == "null") {
        for (const key of Object.keys(this.ColorsPalette)) {
          if (clusterColorsUsed.includes(key) == false) {
            clusterColors[i] = key;
            clusterColorsUsed.push(key);
            break;
          }
        }
      }
    }
    return clusterColors;
  }

  static ColorsPalette = Object.freeze({
    //Red: "rgb(255,0,0)",
    Green: "rgb(0,255,0)",
    Blue: "rgb(0,0,255)",
    RadiandOrchid: "rgb(181,101,167)",
    Emerald: "rgb(0,155,119)",
    TangerineTango: "rgb(221,65,36)",
    Honeysucle: "rgb(214,80,118)",
    Turquoise: "rgb(68,184,172)",
    Mimosa: "rgb(239,192,80)",
    BlueIzis: "rgb(91,94,166)"
  });
}
