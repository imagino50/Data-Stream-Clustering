<template>
  <div id="app">
    <h1>{{ title }} </h1>
  </div>
</template>

<script>
module.exports = {
  data: function() {
       return {
          title: 'Titre de mon application'
        }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>