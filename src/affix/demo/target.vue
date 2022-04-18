<template>
  <div class="affix">
    <e-affix :offset="180" target=".affix">
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

<style scope>
.affix {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: gray;
}
</style>
