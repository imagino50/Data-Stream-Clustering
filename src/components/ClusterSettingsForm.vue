<template>
  <div id="clusterSettings-form">
    <b-list-group>
      <b-form-checkbox
        v-model="isImgDataShown"
        name="check-button"
        @change.native="onIsImgDataShownChange()"
        switch
      >
        Display filtered image: {{ isImgDataShown }}
      </b-form-checkbox>
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
            v-bind:min="item.min"
            v-bind:max="item.max"
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
import {
  clusterMutations,
  clusterActions
} from "@/store/clusterSettingsStore.js";

export default {
  name: "clusterSettings-form",
  components: {},
  data() {
    return { isImgDataShown: false, clusterParams: clusterJson };
  },
  methods: {
    /*=============================================================================*/
    /* Cluster Parameters settings
    /*=============================================================================*/
    onClusterParamsChange() {
      clusterActions.setValuesFromParams(this.clusterParams);
    },
    onIsImgDataShownChange() {
      clusterMutations.setIsImgDataShown(this.isImgDataShown);
    },
    onResetClusterParams() {
      for (let i = 0; i < this.clusterParams.length; i++) {
        this.clusterParams[i].value = this.clusterParams[i].defaultValue;
      }
      clusterActions.setDefaultValues();
    }
  }
};
</script>
<style></style>
