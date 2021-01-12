<template lang="pug">
.hello Hello, World !
p Ugly David
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Test'
})
</script>
<style lang="scss" scoped>
.hello {
  font-size: 24px;
  font-weight: bolder;
  height: 100vh;
}

p {
  display: inline;
  font-size: 48px;
  font-weight: bolder;
  background: linear-gradient(to right, #971451, #456781);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
