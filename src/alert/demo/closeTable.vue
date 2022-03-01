<template>
  <div>
    <EAlert type="success" title="不可关闭的alert" :closable="false"> </EAlert>
    <br />
    <e-alert type="warning" title="waring" closeText="了解"> </e-alert>
    <br />
    <e-alert type="info" title="info" @close="close"></e-alert>
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
  setup() {
    const close = () => {
      window.alert('关闭事件');
    };
    return {
      close,
    };
  },
};
</script>

<style></style>
