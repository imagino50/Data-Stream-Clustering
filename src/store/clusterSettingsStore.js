import Vue from "vue";
import clusterJson from "@/json/clusterSettings.json";

const clusterSettings = Vue.observable({
  filterThreshold: clusterJson[0].value,
  nbMinPoints: clusterJson[1].value,
  neighborhoodRadius: clusterJson[2].value,
  isImgDataShown: false
});

export const clusterGetters = {
  filterThreshold() {
    return clusterSettings.filterThreshold;
  },
  nbMinPoints() {
    return clusterSettings.nbMinPoints;
  },
  neighborhoodRadius() {
    return clusterSettings.neighborhoodRadius;
  },
  isImgDataShown() {
    return clusterSettings.isImgDataShown;
  }
};

export const clusterMutations = {
  setFilterThreshold(val) {
    clusterSettings.filterThreshold = val;
  },
  setNbMinPoints(val) {
    clusterSettings.nbMinPoints = val;
  },
  setNeighborhoodRadius(val) {
    clusterSettings.neighborhoodRadius = val;
  },
  setIsImgDataShown(val) {
    clusterSettings.isImgDataShown = val;
  }
};

export const clusterActions = {
  setDefaultValues() {
    clusterMutations.setFilterThreshold(clusterJson[0].defaultValue);
    clusterMutations.setNbMinPoints(clusterJson[1].defaultValue);
    clusterMutations.setNeighborhoodRadius(clusterJson[2].defaultValue);
  },
  setValuesFromParams(clusterParams) {
    clusterMutations.setFilterThreshold(clusterParams[0].value);
    clusterMutations.setNbMinPoints(clusterParams[1].value);
    clusterMutations.setNeighborhoodRadius(clusterParams[2].value);
  }
};
