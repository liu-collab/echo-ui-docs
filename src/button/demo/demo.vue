<template>
  <div>
    <p>
      <span style="padding: 0 16px 0 4px; font-size: 14px; color: #777"
        >点击次数:</span
      >
      <span>{{ count }}</span>
    </p>
    <div>
      <EButton @click="onClick">default button</EButton>
      <e-button type="primary"> primary button</e-button>
      <e-button type="info">info</e-button>
      <e-button type="success">success</e-button>
      <e-button type="danger">danger</e-button>
      <e-button type="warning">warning</e-button>
      <e-button type="text">link</e-button>
    </div>
    <br />
    <div>
      <EButton @click="onClick" plain>default button</EButton>
      <e-button type="primary" plain> primary button</e-button>
      <e-button type="info" plain>info</e-button>
      <e-button type="success" plain>success</e-button>
      <e-button type="danger" plain>danger</e-button>
      <e-button type="warning" plain>warning</e-button>
      <e-button type="text" plain>link</e-button>
    </div>
    <br />
    <div>
      <EButton @click="onClick" round>default button</EButton>
      <e-button type="primary" round> primary button</e-button>
      <e-button type="info" round>info</e-button>
      <e-button type="success" round>success</e-button>
      <e-button type="danger" round>danger</e-button>
      <e-button type="warning" round>warning</e-button>
      <e-button type="text" round>link</e-button>
    </div>
    <br />
    <div>
      <EButton @click="onClick" circle><EIcon name="search"></EIcon></EButton>
      <e-button type="primary" circle><EIcon name="edit"></EIcon></e-button>
      <e-button type="info" circle><EIcon name="check"></EIcon></e-button>
      <e-button type="success" circle><EIcon name="message"></EIcon></e-button>
      <e-button type="danger" circle>
        <EIcon name="basketball"> </EIcon
      ></e-button>
      <e-button type="warning" circle><EIcon name="delete"></EIcon></e-button>
      <e-button type="text" circle>
        <e-icon name="bicycle"></e-icon>
      </e-button>
    </div>
  </div>
</template>

<script lang="ts">
import { EButton, EIcon } from 'echo-ui-docs';
import { ref } from 'vue';

export default {
  components: {
    EButton,
    EIcon,
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
