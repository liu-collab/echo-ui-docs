---
map:
  path: /components/button
  realPath: src\button\index.zh-CN.md
---

### 使用方法

```ts
import { EButton } from 'echo-echonpm-ui';
```

# Button

这是一个简单的按钮。

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue">
</demo>

### 禁用状态

<demo src="./demo/disable.vue"
language="vue">
</demo>

### 尺寸

<demo src="./demo/size.vue"
language="vue">
</demo>

### 加载按钮

<demo src="./demo/loading.vue"
language="vue">
</demo>

## API

| 参数       |           说明 |   类型 | 默认值 |                  可选值 |
| ---------- | -------------: | -----: | -----: | ----------------------: |
| size       |           大小 | string | medium | large/medium/small/mini |
| color      |           颜色 | string | string |                    \_\_ |
| disable    |           禁用 | Boolon |  false |                    \_\_ |
| plain      |       朴素按钮 | Boolon |  false |                    \_\_ |
| loading    |       加载按钮 | Boolon |  false |                    \_\_ |
| circle     |       圆形按钮 | Boolon |  false |                    \_\_ |
| autofocus  |       自动聚焦 | Boolon |  false |                    \_\_ |
| nativeType | 原生 type 属性 | Boolon |  False |                    \_\_ |
