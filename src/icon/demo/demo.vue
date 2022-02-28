<template>
  <div>
    <p>设置name属性进行使用</p>
    <EIcon name="share"></EIcon>
    <p>可以直接使用class类名进行使用</p>
    <i class="e-icon-delete"></i>
    <p>设置icon属性使用</p>
    <EButton icon="edit" type="primary">button</EButton>
    <p>
      图标合集见<EButton type="text"
        >https://doc-archive.element-plus.org/#/zh-CN/component/icon</EButton
      >
    </p>
  </div>
</template>

<script>
import { EIcon, EButton } from 'echo-ui-docs';
export default {
  components: {
    EIcon,
    EButton,
  },
};
</script>

<style></style>
