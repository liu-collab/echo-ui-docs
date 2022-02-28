<template>
  <div>
    <div>
      <EButton disabled>default button</EButton>
      <e-button disabled type="primary"> primary</e-button>
      <e-button disabled type="info">info</e-button>
      <e-button disabled type="success">success</e-button>
      <e-button disabled type="danger">danger</e-button>
      <e-button disabled type="warning">warning</e-button>
      <e-button disabled type="text">link</e-button>
    </div>
    <br />
    <div>
      <e-button disabled plain type="primary"> primary</e-button>
      <e-button disabled plain type="info">info</e-button>
      <e-button disabled plain type="success">success</e-button>
      <e-button disabled plain type="danger">danger</e-button>
      <e-button disabled plain type="warning">warning</e-button>
      <e-button disabled plain type="text">link</e-button>
    </div>
  </div>
</template>

<script lang="ts">
import { EButton } from 'echo-ui-docs';

export default {
  components: {
    EButton,
  },
  setup() {
    return 0;
  },
};
</script>
