import Vue from "vue";

const inputSettings = Vue.observable({
  generationMode: "Random",
  eventsGenerated: [],
  eventID: 0
});

export const inputGetters = {
  generationMode() {
    return inputSettings.generationMode;
  },
  eventsGenerated() {
    return inputSettings.eventsGenerated;
  },
  eventID() {
    return inputSettings.eventID;
  }
};

export const inputMutations = {
  setGenerationMode(val) {
    inputSettings.generationMode = val;
  },
  seteventsGenerated(val) {
    inputSettings.eventsGenerated = val;
  },
  setEventID(val) {
    inputSettings.eventID = val;
  },
  incEventID() {
    inputSettings.eventID = inputSettings.eventID + 1;
  }
};

