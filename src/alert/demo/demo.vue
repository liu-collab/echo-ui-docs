<template>
  <div>
    <EAlert type="success" title="success"> </EAlert>
    <br />
    <e-alert type="warning" title="waring"> </e-alert>
    <br />
    <e-alert type="info" title="info"></e-alert>
    <br />
    <e-alert type="error" title="error"></e-alert>
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
