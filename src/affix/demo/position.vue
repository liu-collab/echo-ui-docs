<template>
  <div>
    <e-affix :offset="180" position="bottom">
      <e-button type="primary">Offset top 180px</e-button>
    </e-affix>
  </div>
</template>

<script lang="ts">
import { EAffix, EButton } from 'echo-ui-docs';
export default {
  components: {
    EAffix,
    EButton,
  },
};
</script>

<style></style>
