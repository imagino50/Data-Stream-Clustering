<template>
  <div id="clusterSettings-form">
    <b-list-group>
      <b-list-group-item
        style="padding: 0rem 0.2rem;"
        v-for="item in clusterParams"
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
            class="form-control-range form-control-sm"
            v-model="item.value"
            min="0"
            v-bind:max="item.range"
            v-bind:step="item.step"
            @change="onClusterParamsChange()"
          />
        </div>
      </b-list-group-item>
      <input
        class="btn btn-primary"
        type="reset"
        value="Reset"
        @click="onResetClusterParams()"
      />
    </b-list-group>
  </div>
</template>
<script>
import clusterJson from "@/json/clusterSettings.json";
import { clusterActions } from "@/store/clusterSettingsStore.js";

export default {
  name: "clusterSettings-form",
  components: {},
  data() {
    return { clusterParams: clusterJson };
  },
  methods: {
    /*=============================================================================*/
    /* Events Parameters settings
    /*=============================================================================*/
    onClusterParamsChange() {
      console.log("onClusterParamsChange");
      clusterActions.setValuesFromParams(this.clusterParams);
    },
    onResetClusterParams() {
      console.log("onResetClusterParams");
      for (let i = 0; i < this.clusterParams.length; i++) {
        this.clusterParams[i].value = this.clusterParams[i].defaultValue;
      }
      clusterActions.setDefaultValues();
    }
  }
};
</script>
<style></style>
