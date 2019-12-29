<template>
  <div id="eventSettings-form">
    <b-list-group>
      <b-list-group-item
        style="padding: 0rem 0.2rem;"
        v-for="item in eventParams"
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
            @change="onEventParamsChange()"
          />
        </div>
      </b-list-group-item>
      <input
        class="btn btn-primary"
        type="reset"
        value="Reset"
        @click="onResetEventParams()"
      />
    </b-list-group>
  </div>
</template>
<script>
import eventJson from "@/json/eventSettings.json";
import { eventActions } from "@/store/eventSettingsStore.js";

export default {
  name: "eventSettings-form",
  components: {},
  data() {
    return { eventParams: eventJson };
  },
  methods: {
    /*=============================================================================*/
    /* Event Parameters settings
    /*=============================================================================*/
    onEventParamsChange() {
      //console.log("onEventParamsChange");
      eventActions.setValuesFromParams(this.eventParams);
    },
    onResetEventParams() {
      //console.log("onResetEventParams");
      for (let i = 0; i < this.eventParams.length; i++) {
        this.eventParams[i].value = this.eventParams[i].defaultValue;
      }
      eventActions.setDefaultValues();
    }
  }
};
</script>
<style></style>
