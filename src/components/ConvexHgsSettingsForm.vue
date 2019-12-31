<template>
  <div id="convexHgsSettings-form">
    <b-list-group>
      <input
        class="btn btn-primary"
        type="reset"
        value="Clear Canvas"
        @click="onResetCanvas()"
      />
    </b-list-group>
  </div>
</template>
<script>
export default {
  name: "convexHgsSettings-form",
  components: {},
  data() {
    return {};
  },
  methods: {
    onResetCanvas() {
      var canvas3 = document.getElementById("canvas3");
      var ctx = canvas3.getContext("2d");
      ctx.clearRect(0, 0, canvas3.width, canvas3.height);
    }
  }
};
</script>
<style></style>
