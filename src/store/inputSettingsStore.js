import Vue from "vue";
import inputJson from "@/json/inputSettings.json";

const inputSettings = Vue.observable({
  generationMode: "Random",
  nb_clusters: inputJson[0].value,
  noiseRate: inputJson[1].value,
  max_centerX_stdev: inputJson[2].value,
  max_centerY_stdev: inputJson[3].value,
  max_x_stdev: inputJson[4].value,
  max_y_stdev: inputJson[5].value
});

export const inputGetters = {
  generationMode() {
    return inputSettings.generationMode;
  },
  nb_clusters() {
    return inputSettings.nb_clusters;
  },
  noiseRate() {
    return inputSettings.noiseRate;
  },
  max_centerX_stdev() {
    return inputSettings.max_centerX_stdev;
  },
  max_centerY_stdev() {
    return inputSettings.max_centerY_stdev;
  },
  max_x_stdev() {
    return inputSettings.max_x_stdev;
  },
  max_y_stdev() {
    return inputSettings.max_y_stdev;
  }
};

export const inputMutations = {
  setGenerationMode(val) {
    inputSettings.generationMode = val;
  },
  setNb_clusters(val) {
    inputSettings.nb_clusters = val;
  },
  setNoiseRate(val) {
    inputSettings.noiseRate = val;
  },
  setMax_centerX_stdev(val) {
    inputSettings.max_centerX_stdev = val;
  },
  setMax_centerY_stdev(val) {
    inputSettings.max_centerY_stdev = val;
  },
  setMax_x_stdev(val) {
    inputSettings.max_x_stdev = val;
  },
  setMax_y_stdev(val) {
    inputSettings.max_y_stdev = val;
  }
};

export const inputActions = {
  setDefaultValues() {
    //inputMutations.setGenerationMode("Random");
    inputMutations.setNb_clusters(inputJson[0].defaultValue);
    inputMutations.setNoiseRate(inputJson[1].defaultValue);
    inputMutations.setMax_centerX_stdev(inputJson[2].defaultValue);
    inputMutations.setMax_centerY_stdev(inputJson[3].defaultValue);
    inputMutations.setMax_x_stdev(inputJson[4].defaultValue);
    inputMutations.setMax_y_stdev(inputJson[5].defaultValue);
  },
  setValuesFromParams(inputParams) {
    inputMutations.setNb_clusters(inputParams[0].value);
    inputMutations.setNoiseRate(inputParams[1].value);
    inputMutations.setMax_centerX_stdev(inputParams[2].value);
    inputMutations.setMax_centerY_stdev(inputParams[3].value);
    inputMutations.setMax_x_stdev(inputParams[4].value);
    inputMutations.setMax_y_stdev(inputParams[5].value);
  }
};
