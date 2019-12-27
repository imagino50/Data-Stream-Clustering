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
        </b-form-radio-group>
      </b-form-group>
      <b-list-group>
        <b-list-group-item
          style="padding: 0rem 0.2rem;"
          v-for="item in inputParams"
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
import inputJson from "@/json/inputSettings.json";
import { inputMutations, inputActions } from "@/store/inputSettingsStore.js";

export default {
  name: "inputSettings-form",
  components: {},
  data() {
    return { inputParams: inputJson, generationMode: "Random" };
  },
  methods: {
    onGenerateModeChange() {
      console.log("onGenerateModeChange");
      inputMutations.setGenerationMode(this.generationMode);
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      inputActions.setValuesFromParams(this.inputParams);
    },
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      for (let i = 0; i < this.inputParams.length; i++) {
        this.inputParams[i].value = this.inputParams[i].defaultValue;
      }
      inputActions.setDefaultValues();
    }
  }
};
</script>

<style></style>
