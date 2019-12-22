<template>
  <div id="dataGenSettings-form">
    <b-col md="3">
      <b-form-group label="Particles generation :">
        <b-form-radio-group
          id="radio-group-2"
          v-model="particlesGenerationMode"
          @change.native="onGenerateModeChange($event)"
          name="radio-sub-component"
          stacked
        >
          <b-form-radio
            v-model="particlesGenerationMode"
            name="some-radios"
            value="Random"
            >Random</b-form-radio
          >
          <b-form-radio
            v-model="particlesGenerationMode"
            name="some-radios"
            value="Cluster"
            >Cluster</b-form-radio
          >
          <input
            class="btn btn-primary"
            type="restart"
            value="re-generate dataset"
            @click="onReGenerateDataset()"
          />
        </b-form-radio-group>
      </b-form-group>
      <b-list-group>
        <b-list-group-item
          v-for="item in particlesGenParams"
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
              @change="onClusterGenParamsChange($event)"
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
export default {
  name: "dataGenSettings-form",
  components: {},
  props: {
    particlesGenParams: Array,
    particlesGenMode: String
  },
  data() {
    return {
      particlesGenerationMode: this.particlesGenMode
    };
  },
  methods: {
    /*=============================================================================*/
    /* Parameters for generating the dataset of clustered particles
    /*=============================================================================*/
    onReGenerateDataset() {
      console.log("onReGenerateDataset");
      this.$emit("reGenerate:dataset");
    },
    onClusterGenParamsChange() {
      console.log("onClusterGenParamsChange");
      this.$emit("change:genParams", this.particlesGenParams);
    },
    onResetClusterGenParams() {
      console.log("onResetClusterGenParams");
      this.$emit("reset:genParams");
    },
    onGenerateModeChange(event) {
      console.log("onGenerateModeChange");
      console.log(
        "onGenerateModeChange::event.target.value",
        event.target.value
      );
      this.$emit("changeMode:genParams", this.particlesGenerationMode);
    }
  }
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 200px;
}
</style>
