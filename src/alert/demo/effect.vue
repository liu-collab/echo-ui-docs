<template>
  <div>
    <EAlert type="success" title="success" effect="dark"> </EAlert>
    <br />
    <e-alert type="warning" title="waring" effect="dark"> </e-alert>
    <br />
    <e-alert type="info" title="info" effect="dark"></e-alert>
    <br />
    <e-alert type="error" title="error" effect="dark"></e-alert>
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
