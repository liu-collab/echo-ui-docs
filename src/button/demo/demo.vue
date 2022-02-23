<template>
  <div>
    <p>
      <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
        >点击次数:</span
      >
      <span>{{ count }}</span>
    </p>
    <EButton @click="onClick" type="primary">按钮</EButton>
  </div>
</template>

<script lang="ts">
import { EButton } from 'echo-ui-docs';
import { ref } from 'vue';

export default {
  components: {
    EButton,
  },
  setup() {
    const count = ref(0);
    function onClick() {
      count.value++;
    }

    return {
      count,
      onClick,
    };
  },
};
</script>
