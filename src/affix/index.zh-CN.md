---
map:
  # 映射到docs的路径
  path: /components/affix
---

## Affix

## 使用方法

```ts
import { EAffix } from 'echo-echonpm-ui';
```

## 基本用法

<demo src="./demo/demo.vue"
language="vue">
</demo>

## 指定容器

#### target 属性可以使用 css 选择器，指定容器

<demo src="./demo/target.vue"
language="vue">
</demo>

## 固定位置

#### 默认是 top，还可以是 bottom

<demo src="./demo/position.vue"
language="vue">
</demo>

## API

### 属性

| 参数     |       说明 |   类型 |      可选值 | 默认值 |
| -------- | ---------: | -----: | ----------: | -----: |
| offset   |   偏移距离 | number |        \_\_ |      0 |
| position |       位置 | string | top/bomttom |    top |
| target   | CSS 选择器 | string |        \_\_ |   \_\_ |
| z-index  |    z-index | number |        \_\_ |    100 |

### Event

| 参数   |                       说明 |     类型 |
| ------ | -------------------------: | -------: |
| change | fixed 状态改变时触发的事件 | function |
| scroll |           滚动时触发的事件 | function |
| update |                   更新方法 |     ()=> |
