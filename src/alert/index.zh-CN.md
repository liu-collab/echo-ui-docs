---
map:
  # 映射到docs的路径
  path: /components/alert
---

### Alert

### 使用方法

```ts
import { EAlert } from 'echo-echonpm-ui';
```

### 基本用法

<demo src="./demo/demo.vue"
language="vue">
</demo>

### 主题

<demo src="./demo/effect.vue" language="vue" > </demo>

### 自定义关闭按钮

##### 通过设置 closeable 自定义关闭按钮 ，closeText 自定义关闭文本 ， close 监听关闭事件

<demo src="./demo/closeTable.vue" langusge="vue"></demo>

### 带有图标的消息提示

<demo src="./demo/icon.vue" language="vue"></demo>

### 文字居中

<demo src="./demo/center.vue" language="vue"></demo>

### 文字描述

<demo src="./demo/desrciption.vue" language="vue"></demo>

### API

| 参数        |       说明 |   类型 |                      可选值 | 默认值 |
| ----------- | ---------: | -----: | --------------------------: | -----: |
| title       |       标题 | string |                        \_\_ |   \_\_ |
| type        |       类型 | string | success/error/info/warning/ |   info |
| description |       描述 | string |                        \_\_ |   \_\_ |
| closeText   | 关闭的文本 | string |                        \_\_ |   \_\_ |
| closeable   |   是否关闭 | Boolon |                        \_\_ |   \_\_ |
| center      |   文字居中 | Boolon |                        \_\_ |   \_\_ |
| show-icon   |       图标 | boolon |                        \_\_ |   \_\_ |
| effect      |       主题 | string |                  light/dark |  light |

### Event

| 参数  |     说明 | 回调参数 |
| ----- | -------: | -------: |
| close | 关闭事件 |     \_\_ |
