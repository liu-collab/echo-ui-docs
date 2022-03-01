import {
  _ as e,
  f as a,
  u as t,
  p as s,
  g as l,
  q as o,
  o as i,
  c as r,
  b as n,
  h as c,
  m as u,
  k as v,
  N as d,
  F as f,
  s as m,
  r as p,
  d as h,
  i as k,
} from './app.66e4ec4d.js';
const y = { key: 0, class: 'home-hero' },
  g = { key: 0, class: 'figure' },
  x = ['src', 'alt'],
  $ = { key: 1, id: 'main-title', class: 'title' },
  _ = { key: 2, class: 'description' };
var I = e(
  a({
    setup(e) {
      const a = t(),
        f = s(),
        m = l(() => f.value.heroImage || p.value || k.value || T.value),
        p = l(() => null !== f.value.heroText),
        h = l(() => f.value.heroText || a.value.title),
        k = l(() => null !== f.value.tagline),
        I = l(() => f.value.tagline || a.value.description),
        T = l(() => f.value.actionLink && f.value.actionText),
        A = l(() => f.value.altActionLink && f.value.altActionText);
      return (e, a) =>
        o(m)
          ? (i(),
            r('header', y, [
              e.$frontmatter.heroImage
                ? (i(),
                  r('figure', g, [
                    n(
                      'img',
                      {
                        class: 'image',
                        src: e.$withBase(e.$frontmatter.heroImage),
                        alt: e.$frontmatter.heroAlt,
                      },
                      null,
                      8,
                      x,
                    ),
                  ]))
                : c('', !0),
              o(p) ? (i(), r('h1', $, u(o(h)), 1)) : c('', !0),
              o(k) ? (i(), r('p', _, u(o(I)), 1)) : c('', !0),
              o(T)
                ? (i(),
                  v(
                    d,
                    {
                      key: 3,
                      item: { link: o(f).actionLink, text: o(f).actionText },
                      class: 'action',
                    },
                    null,
                    8,
                    ['item'],
                  ))
                : c('', !0),
              o(A)
                ? (i(),
                  v(
                    d,
                    {
                      key: 4,
                      item: {
                        link: o(f).altActionLink,
                        text: o(f).altActionText,
                      },
                      class: 'action alt',
                    },
                    null,
                    8,
                    ['item'],
                  ))
                : c('', !0),
            ]))
          : c('', !0);
    },
  }),
  [['__scopeId', 'data-v-4aeb51c6']],
);
const T = { key: 0, class: 'home-features' },
  A = { class: 'wrapper' },
  b = { class: 'container' },
  L = { class: 'features' },
  w = { key: 0, class: 'title' },
  j = { key: 1, class: 'details' };
var q = e(
  a({
    setup(e) {
      const a = s(),
        t = l(() => a.value.features && a.value.features.length > 0),
        v = l(() => (a.value.features ? a.value.features : []));
      return (e, a) =>
        o(t)
          ? (i(),
            r('div', T, [
              n('div', A, [
                n('div', b, [
                  n('div', L, [
                    (i(!0),
                    r(
                      f,
                      null,
                      m(
                        o(v),
                        (e, a) => (
                          i(),
                          r('section', { key: a, class: 'feature' }, [
                            e.title
                              ? (i(), r('h2', w, u(e.title), 1))
                              : c('', !0),
                            e.details
                              ? (i(), r('p', j, u(e.details), 1))
                              : c('', !0),
                          ])
                        ),
                      ),
                      128,
                    )),
                  ]),
                ]),
              ]),
            ]))
          : c('', !0);
    },
  }),
  [['__scopeId', 'data-v-793c2722']],
);
const B = { key: 0, class: 'footer' },
  C = { class: 'container' },
  F = { class: 'text' };
var N = e({}, [
  [
    'render',
    function (e, a) {
      return e.$frontmatter.footer
        ? (i(),
          r('footer', B, [
            n('div', C, [n('p', F, u(e.$frontmatter.footer), 1)]),
          ]))
        : c('', !0);
    },
  ],
  ['__scopeId', 'data-v-41020908'],
]);
const z = { class: 'home', 'aria-labelledby': 'main-title' },
  D = { class: 'home-content' };
var E = e(
  a({
    setup: (e) => (e, a) => {
      const t = p('Content');
      return (
        i(),
        r('main', z, [
          h(I),
          k(e.$slots, 'hero', {}, void 0, !0),
          h(q),
          n('div', D, [h(t)]),
          k(e.$slots, 'features', {}, void 0, !0),
          h(N),
          k(e.$slots, 'footer', {}, void 0, !0),
        ])
      );
    },
  }),
  [['__scopeId', 'data-v-cc1f894c']],
);
export { E as default };
