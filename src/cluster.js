/*=============================================================================*/
/* Class Cluster
/*=============================================================================*/
export default class Cluster {
  /*=============================================================================*/
  /* create dataset from particles to detect Clusters
  /*=============================================================================*/
  static createDataset(particles) {
    var dataset = [];
    for (let i = 0; i < particles.length; i++) {
      dataset.push([particles[i].x, particles[i].y]);
    }
    return dataset;
  }

  /*=============================================================================*/
  /* Count the total number of particles in clusters 
  /*=============================================================================*/
  static getNbItemsClustered(clusters) {
    var count = 0;
    for (let i = 0; i < clusters.length; i++) {
      let cluster = clusters[i];
      for (let j = 0; j < cluster.length; j++) {
        count = count + 1;
      }
    }
    return count;
  }

  /*=============================================================================*/
  /* Reuse the colors already set to clustered particles 
  /*=============================================================================*/
  static reusePreviousClusterColors(
    nbClusters,
    particlesFiltered,
    particlesFiltered_sav,
    clusterColors_sav
  ) {
    var clusterColors = new Array(nbClusters).fill("null");

    for (let idx = 0; idx < particlesFiltered.length; idx++) {
      let clusterId = particlesFiltered[idx].clusterId;
      if (clusterId != -1) {
        for (
          let idx_sav = 0;
          idx_sav < particlesFiltered_sav.length;
          idx_sav++
        ) {
          if (
            particlesFiltered[idx].x == particlesFiltered_sav[idx_sav].x &&
            particlesFiltered[idx].y == particlesFiltered_sav[idx_sav].y &&
            particlesFiltered_sav[idx_sav].clusterId != -1
          ) {
            var colorUsedKey =
              clusterColors_sav[particlesFiltered_sav[idx_sav].clusterId];

            /*console.log(
                "particlesFiltered_sav[idx_sav].clusterId",
                particlesFiltered_sav[idx_sav].clusterId
              );
              console.log(
                "colorUsedKey",
                colorUsedKey
              );*/

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

  /*=============================================================================*/
  /* set available colors to particles newly clustered
  /*=============================================================================*/
  static setColorsNewCluster(clusterColors) {
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

  /*=============================================================================*/
  /* set colors to clustered particles 
  /*=============================================================================*/
  static buildClusterColors(
    nbClusters,
    fireworksFiltered,
    fireworksFiltered_sav,
    clusterColors_sav
  ) {
    var clusterColors = this.reusePreviousClusterColors(
      nbClusters,
      fireworksFiltered,
      fireworksFiltered_sav,
      clusterColors_sav
    );
    /*if (nbClusters > 0) {
      console.log("recoverClusterColors", clusterColors);
    }*/

    clusterColors = this.setColorsNewCluster(clusterColors);
    /*if (nbClusters > 0) {
      console.log("setClusterColors", clusterColors);
    }*/
    return clusterColors;
  }

  /*=============================================================================*/
  /* colors of clustered particles 
  /*=============================================================================*/
  static ColorsPalette = Object.freeze({
    //Red: "rgb(255,0,0)",
    Green: "rgb(0,255,0)",
    Blue: "rgb(0,0,255)",
    Emerald: "rgb(0,155,119)",
    TangerineTango: "rgb(221,65,36)",
    Honeysucle: "rgb(214,80,118)",
    RadiandOrchid: "rgb(181,101,167)",
    Turquoise: "rgb(68,184,172)",
    Mimosa: "rgb(239,192,80)",
    BlueIzis: "rgb(91,94,166)"
  });
}

/*static runDbscan(dbscan, dataset, neighborhoodRadius, nbMinPoints) {
    // parameters: 5 - neighborhood radius - number of points in neighborhood to form a cluster
    var clusters = dbscan.run(dataset, neighborhoodRadius, nbMinPoints);
    return clusters;
  }*/

/*static setClusterToRemainedParticles(particles, clusters) {
    var particlesRemained = this.getUnClusteredParticles(particles, clusters);

    var groupbyClusterId = particlesRemained.reduce((r, a) => {
      //console.log("a", a);
      //console.log('r', r);
      r[a.clusterId] = [...(r[a.clusterId] || []), a];
      return r;
    }, {});

    var colorUsedKey =
      clusterColors[particles[idx_sav].clusterId];
    clusterColors[clusterId] = colorUsedKey;
  }*/

/*const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});*/

/*static getUnClusteredParticles(particles, clusters) {
    var particlesRemained = [];
    var particlesClustered = particles.filter(
      particle => particle.clusterId != -1
    );
    if (
      particlesClustered.length >
      this.getNbItemsClustered(clusters)
    ) {
      for (let index = 0; index < particlesClustered.length; index++) {
        if (
          !this.isParticleInDetectedClusters(
            particlesClustered[index],
            clusters
          )
        ) {
          this.particlesRemained.push(particlesClustered[index].clone());
        }
      }
    }
    return particlesRemained;
  }*/
