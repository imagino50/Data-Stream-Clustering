<template>
  <div id="inputSettings-form">
    <b-col md="10">
      <b-form-group label="Type of input data :">
        <b-form-radio-group
          id="radio-group-2"
          v-model="generationMode"
          @change.native="onGenerateModeChange()"
          name="radio-sub-component"
        >
          <b-form-radio
            v-model="generationMode"
            name="GenerateMode"
            value="Random"
            >Random</b-form-radio
          >
          <b-form-radio
            v-model="generationMode"
            name="GenerateMode"
            value="Cluster"
            >Cluster</b-form-radio
          >
<!--           <b-form-radio
            v-model="generationMode"
            name="GenerateMode"
            value="ClusterMoving"
            >Cluster moving</b-form-radio
          > -->
        </b-form-radio-group>
      </b-form-group>
      <b-list-group>
        <input
          class="btn btn-primary"
          type="restart"
          value="generate Cluster(s)"
          @click="onReGenerateDataset()"
        />
        <b-list-group-item
          style="padding: 0rem 0.2rem;"
          v-for="item in eventsGenParams"
          v-bind:key="item.id"
        >
          <div class="form-group p-0">
            <label for="formControlRange"
              >{{ item.label }} : {{ item.value }} ({{
                item.defaultValue
              }})</label
            >
            <input
              v-bind:name="item.id"
              type="range"
              class="form-control-range"
              v-model="item.value"
              min="0"
              v-bind:max="item.range"
              v-bind:step="item.step"
              @change="onClusterGenParamsChange()"
            />
          </div>
        </b-list-group-item>
        <input
          class="btn btn-primary"
          type="reset"
          value="Reset"
          @click="onResetClusterGenParams()"
        />
      </b-list-group>
    </b-col>
  </div>
</template>
<script>
import clusterGenJson from "@/json/inputSettings.json";
import Utils from "@/utils";
import { inputGetters, inputMutations } from "@/store/inputSettingsStore.js";
import { eventGetters } from "@/store/eventSettingsStore.js";

export default {
  name: "inputSettings-form",
  components: {},
  data() {
    return { eventsGenParams: clusterGenJson, generationMode: "Random" };
  },
  methods: {
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      for (let i = 0; i < this.eventsGenParams.length; i++) {
        this.eventsGenParams[i].value = this.eventsGenParams[i].defaultValue;
      }
      this.createClusteredEvents();
    },
    onReGenerateDataset() {
      console.log("onReGenerateDataset");
      this.createClusteredEvents();
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      this.createClusteredEvents();
    },
    onGenerateModeChange() {
      console.log("onGenerateModeChange");
      inputMutations.setGenerationMode(this.generationMode);
      if (inputGetters.generationMode() == "Cluster") {
        this.createClusteredEvents();
      }
    },
    createClusteredEvents() {
      inputMutations.setEventID(0);
      var canvas1 = document.getElementById("canvas1");
      inputMutations.seteventsGenerated(
        Utils.generateClusteredEvents(
          this.eventsGenParams[0].value,
          canvas1.width,
          canvas1.height,
          this.eventsGenParams[1].value,
          this.eventsGenParams[2].value,
          this.eventsGenParams[3].value,
          eventGetters.centerIntensity()
        )
      );
    }
  }
};
</script>

<style></style>
