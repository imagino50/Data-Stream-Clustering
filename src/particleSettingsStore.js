import Vue from "vue";

import particleJson from "@/json/particleSettings.json";

const particleSettings = Vue.observable({
  centerIntensity: particleJson[0].value,
  intensityMin: particleJson[1].value,
  incRadius: particleJson[2].value,
  incIntensity: particleJson[3].value,
  filterThreshold: particleJson[4].value,
  nbMinPoints: particleJson[5].value,
  neighborhoodRadius: particleJson[6].value
});

export const particleGetters = {
  centerIntensity() {
    return particleSettings.centerIntensity;
  },
  intensityMin() {
    return particleSettings.intensityMin;
  },
  incRadius() {
    return particleSettings.incRadius;
  },
  incIntensity() {
    return particleSettings.incIntensity;
  },
  filterThreshold() {
    return particleSettings.filterThreshold;
  },
  nbMinPoints() {
    return particleSettings.nbMinPoints;
  },
  neighborhoodRadius() {
    return particleSettings.neighborhoodRadius;
  }
};

export const particleMutations = {
  setCenterIntensity(val) {
    particleSettings.centerIntensity = val;
  },
  setIntensityMin(val) {
    particleSettings.intensityMin = val;
  },
  setIncRadius(val) {
    particleSettings.incRadius = val;
  },
  setIncIntensity(val) {
    particleSettings.incIntensity = val;
  },
  setFilterThreshold(val) {
    particleSettings.filterThreshold = val;
  },
  setNbMinPoints(val) {
    particleSettings.nbMinPoints = val;
  },
  setNeighborhoodRadius(val) {
    particleSettings.neighborhoodRadius = val;
  }
};

export const particleActions = {
  setDefaultValues() {
    particleMutations.setCenterIntensity(particleJson[0].defaultValue);
    particleMutations.setIntensityMin(particleJson[1].defaultValue);
    particleMutations.setIncRadius(parseFloat(particleJson[2].defaultValue));
    particleMutations.setIncIntensity(particleJson[3].defaultValue);
    particleMutations.setFilterThreshold(particleJson[4].defaultValue);
    particleMutations.setNbMinPoints(particleJson[5].defaultValue);
    particleMutations.setNeighborhoodRadius(particleJson[6].defaultValue);
  }
};
