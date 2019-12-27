import Vue from "vue";
import eventJson from "@/json/eventSettings.json";

const eventSettings = Vue.observable({
  centerIntensity: eventJson[0].value,
  intensityMin: eventJson[1].value,
  incRadius: eventJson[2].value,
  incIntensity: eventJson[3].value,
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
  }
};

export const eventActions = {
  setDefaultValues() {
    eventMutations.setCenterIntensity(eventJson[0].defaultValue);
    eventMutations.setIntensityMin(eventJson[1].defaultValue);
    eventMutations.setIncRadius(parseFloat(eventJson[2].defaultValue));
    eventMutations.setIncIntensity(eventJson[3].defaultValue);
  },
  setValuesFromParams(eventParams) {
    eventMutations.setCenterIntensity(eventParams[0].value);
    eventMutations.setIntensityMin(eventParams[1].value);
    eventMutations.setIncRadius(parseFloat(eventParams[2].value));
    eventMutations.setIncIntensity(eventParams[3].value);
  }
};
