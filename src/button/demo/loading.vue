<template>
  <div>
    <EButton loading>loading...</EButton>
    <EButton loading type="primary">loading...</EButton>
    <EButton loading type="waring" size="large">loading...</EButton>
    <EButton loading type="danger" size="mini">loading...</EButton>
  </div>
</template>

<script>
import { EButton } from 'echo-ui-docs';
export default {
  components: {
    EButton,
  },
};
</script>

<style></style>
