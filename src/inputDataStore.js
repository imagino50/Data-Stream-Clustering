import Vue from "vue";

const inputData = Vue.observable({
  generationMode: "Random",
  particlesGenerated: [],
  particleID: 0
});

export const inputGetters = {
  generationMode() {
    return inputData.generationMode;
  },
  particlesGenerated() {
    return inputData.particlesGenerated;
  },
  particleID() {
    return inputData.particleID;
  }
};

export const inputMutations = {
  setGenerationMode(val) {
    inputData.generationMode = val;
  },
  setParticlesGenerated(val) {
    inputData.particlesGenerated = val;
  },
  setParticleID(val) {
    inputData.particleID = val;
  },
  incParticleID() {
    inputData.particleID = inputData.particleID + 1;
  }
};

