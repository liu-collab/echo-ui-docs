<template>
  <div>
    <EButtonGroup>
      <EButton icon="share" type="primary"></EButton>
      <EButton icon="edit" type="primary"></EButton>
      <EButton icon="delete" type="primary"></EButton>
    </EButtonGroup>
  </div>
</template>

<script>
import { EButtonGroup, EButton } from 'echo-ui-docs';
export default {
  components: {
    EButtonGroup,
    EButton,
  },
};
</script>

<style></style>
