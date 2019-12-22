import Vue from "vue";

import inputSettingsJson from "../json/inputSettings.json";

const inputSettings = Vue.Observable({
  generationMode: "Random",
  num_clusters: inputSettingsJson[0].value,
  max_x_stdev: inputSettingsJson[1].value,
  max_y_stdev: inputSettingsJson[2].value,
  cluster_size: inputSettingsJson[3].value
});

export const getters = {
  generationMode() {
    return inputSettings.generationMode;
  },
  num_clusters() {
    return inputSettings.num_clusters;
  },
  max_x_stdev() {
    return inputSettings.max_x_stdev;
  },
  max_y_stdev() {
    return inputSettings.max_y_stdev;
  },
  cluster_size() {
    return inputSettings.cluster_size;
  }
};

export const mutations = {
  setGenerationMode(val) {
    inputSettings.generationMode = val;
  },
  setNum_clusters(val) {
    inputSettings.num_clusters = val;
  },
  setMax_x_stdev(val) {
    inputSettings.max_x_stdev = val;
  },
  setMax_y_stdev(val) {
    inputSettings.max_y_stdev = val;
  },
  setCluster_size(val) {
    inputSettings.cluster_size = val;
  }
};

export const actions = {
  setdefaultValues() {
    setNum_clusters(inputSettingsJson[0].defaultValue);
    setMax_x_stdev(inputSettingsJson[1].defaultValue);
    setMax_y_stdev(parseFloat(inputSettingsJson[2].defaultValue));
    setCluster_size(inputSettingsJson[3].defaultValue);
  }
};
