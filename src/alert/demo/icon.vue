<template>
  <div>
    <EAlert type="success" title="success" show-icon> </EAlert>
    <br />
    <e-alert type="warning" title="waring" show-icon> </e-alert>
    <br />
    <e-alert type="info" title="info" show-icon></e-alert>
    <br />
    <e-alert type="error" title="error" show-icon></e-alert>
    <br />
  </div>
</template>

<script>
import { EAlert } from 'echo-ui-docs';
export default {
  components: {
    EAlert,
  },
};
</script>

<style></style>
