const base = process.env.NODE_ENV === 'production' ? '/' : '';
const { resolve } = require('path');

module.exports = {
  title: 'echo-ui-docs',
  description: '',
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['src'],
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'echo-ui-docs'
    [`echo-ui-docs`]: resolve('./src'),
  },
  base,
  themeConfig: {
    // logo: '../logo.svg',
    nav: [{ text: 'demo', link: '/math' }],
    lang: 'zh-CN',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'echo-ui-docs',
        description: '',
        label: '中文',
        selectText: '语言',
        nav: [{ text: '指南', link: '/' }],
        sidebar: [
          { text: '介绍', link: '/' },
          { text: 'Button', link: '/components/button/' },
          { text: 'Icon', link: '/components/icon/' },
          { text: 'ButtonGroup', link: '/components/buttongroup/' },
          { text: 'Alert', link: '/components/alert/' },
          { text: 'Affix', link: '/components/affix/' },
        ],
      },
      '/en/': {
        lang: 'en-US',
        title: 'echo-ui-docs',
        description: '',
        label: 'English',
        selectText: 'Languages',
        nav: [{ text: 'Guide', link: '/' }],
        sidebar: [
          { text: 'Getting Started', link: '/en/' },
          { text: 'Button', link: '/en/components/button/' },
          { text: 'Icon', link: '/components/icon/' },
        ],
      },
    },
    search: {
      searchMaxSuggestions: 10,
    },
    repo: 'liu-collab/echo-ui',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
};
