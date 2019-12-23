import Vue from "vue";

import eventJson from "@/json/eventSettings.json";

const eventSettings = Vue.observable({
  centerIntensity: eventJson[0].value,
  intensityMin: eventJson[1].value,
  incRadius: eventJson[2].value,
  incIntensity: eventJson[3].value,
  filterThreshold: eventJson[4].value,
  nbMinPoints: eventJson[5].value,
  neighborhoodRadius: eventJson[6].value
});

export const eventGetters = {
  centerIntensity() {
    return eventSettings.centerIntensity;
  },
  intensityMin() {
    return eventSettings.intensityMin;
  },
  incRadius() {
    return eventSettings.incRadius;
  },
  incIntensity() {
    return eventSettings.incIntensity;
  },
  filterThreshold() {
    return eventSettings.filterThreshold;
  },
  nbMinPoints() {
    return eventSettings.nbMinPoints;
  },
  neighborhoodRadius() {
    return eventSettings.neighborhoodRadius;
  }
};

export const eventMutations = {
  setCenterIntensity(val) {
    eventSettings.centerIntensity = val;
  },
  setIntensityMin(val) {
    eventSettings.intensityMin = val;
  },
  setIncRadius(val) {
    eventSettings.incRadius = val;
  },
  setIncIntensity(val) {
    eventSettings.incIntensity = val;
  },
  setFilterThreshold(val) {
    eventSettings.filterThreshold = val;
  },
  setNbMinPoints(val) {
    eventSettings.nbMinPoints = val;
  },
  setNeighborhoodRadius(val) {
    eventSettings.neighborhoodRadius = val;
  }
};

export const eventActions = {
  setDefaultValues() {
    eventMutations.setCenterIntensity(eventJson[0].defaultValue);
    eventMutations.setIntensityMin(eventJson[1].defaultValue);
    eventMutations.setIncRadius(parseFloat(eventJson[2].defaultValue));
    eventMutations.setIncIntensity(eventJson[3].defaultValue);
    eventMutations.setFilterThreshold(eventJson[4].defaultValue);
    eventMutations.setNbMinPoints(eventJson[5].defaultValue);
    eventMutations.setNeighborhoodRadius(eventJson[6].defaultValue);
  },
  setValuesFromParams(eventsParams) {
    eventMutations.setCenterIntensity(eventsParams[0].value);
    eventMutations.setIntensityMin(eventsParams[1].value);
    eventMutations.setIncRadius(parseFloat(eventsParams[2].value));
    eventMutations.setIncIntensity(eventsParams[3].value);
    eventMutations.setFilterThreshold(eventsParams[4].value);
    eventMutations.setNbMinPoints(eventsParams[5].value);
    eventMutations.setNeighborhoodRadius(eventsParams[6].value);
  }
};
