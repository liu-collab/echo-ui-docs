<template>
  <div>
    <p>设置name属性进行使用</p>
    <EIcon name="delete"></EIcon>
    &nbsp;
    <EIcon name="edit"></EIcon>
    &nbsp;
    <EIcon name="share"></EIcon>
    <p>可以直接使用class类名进行使用</p>
    <i class="e-icon-delete"></i>
    &nbsp;
    <i class="e-icon-edit"></i>
    &nbsp;
    <i class="e-icon-share"></i>
    &nbsp;
    <p>设置icon属性使用</p>
    <EButton icon="delete" type="primary">button</EButton>
    <EButton icon="edit" type="primary">button</EButton>
    <EButton icon="share" type="primary">button</EButton>
    <p>
      图标合集见<EButton type="text" @click="handleClick"
        ><EIcon name="link"></EIcon
      ></EButton>
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
  setup() {
    const handleClick = () => {
      window.open(
        'https://doc-archive.element-plus.org/#/zh-CN/component/icon',
      );
    };
    return {
      handleClick,
    };
  },
};
</script>

<style>
i[class^='e-icon'] {
  font-size: 20px;
}
</style>
