import { a as e, b as n } from './alert.aa81e210.js';
import {
  _ as t,
  j as l,
  r as a,
  o as u,
  c as i,
  b as r,
  m as c,
  d,
  w as o,
  e as p,
} from './app.7a847cd1.js';
const s = {
    components: { EButton: e, EIcon: n },
    setup() {
      const e = l(0);
      return {
        count: e,
        onClick: function () {
          e.value++;
        },
      };
    },
  },
  f = r(
    'span',
    { style: { padding: '0 16px 0 4px', 'font-size': '14px', color: '#777' } },
    '点击次数:',
    -1,
  ),
  y = p('default button'),
  _ = p(' primary button'),
  m = p('info'),
  k = p('success'),
  g = p('danger'),
  b = p('warning'),
  C = p('link'),
  w = r('br', null, null, -1),
  x = p('default button'),
  v = p(' primary button'),
  E = p('info'),
  j = p('success'),
  h = p('danger'),
  B = p('warning'),
  I = p('link'),
  z = r('br', null, null, -1),
  q = p('default button'),
  A = p(' primary button'),
  D = p('info'),
  F = p('success'),
  G = p('danger'),
  H = p('warning'),
  J = p('link'),
  K = r('br', null, null, -1);
var L = t(s, [
  [
    'render',
    function (e, n, t, l, p, s) {
      const L = a('EButton'),
        M = a('e-button'),
        N = a('EIcon'),
        O = a('e-icon');
      return (
        u(),
        i('div', null, [
          r('p', null, [f, r('span', null, c(l.count), 1)]),
          r('div', null, [
            d(L, { onClick: l.onClick }, { default: o(() => [y]), _: 1 }, 8, [
              'onClick',
            ]),
            d(M, { type: 'primary' }, { default: o(() => [_]), _: 1 }),
            d(M, { type: 'info' }, { default: o(() => [m]), _: 1 }),
            d(M, { type: 'success' }, { default: o(() => [k]), _: 1 }),
            d(M, { type: 'danger' }, { default: o(() => [g]), _: 1 }),
            d(M, { type: 'warning' }, { default: o(() => [b]), _: 1 }),
            d(M, { type: 'text' }, { default: o(() => [C]), _: 1 }),
          ]),
          w,
          r('div', null, [
            d(
              L,
              { onClick: l.onClick, plain: '' },
              { default: o(() => [x]), _: 1 },
              8,
              ['onClick'],
            ),
            d(
              M,
              { type: 'primary', plain: '' },
              { default: o(() => [v]), _: 1 },
            ),
            d(M, { type: 'info', plain: '' }, { default: o(() => [E]), _: 1 }),
            d(
              M,
              { type: 'success', plain: '' },
              { default: o(() => [j]), _: 1 },
            ),
            d(
              M,
              { type: 'danger', plain: '' },
              { default: o(() => [h]), _: 1 },
            ),
            d(
              M,
              { type: 'warning', plain: '' },
              { default: o(() => [B]), _: 1 },
            ),
            d(M, { type: 'text', plain: '' }, { default: o(() => [I]), _: 1 }),
          ]),
          z,
          r('div', null, [
            d(
              L,
              { onClick: l.onClick, round: '' },
              { default: o(() => [q]), _: 1 },
              8,
              ['onClick'],
            ),
            d(
              M,
              { type: 'primary', round: '' },
              { default: o(() => [A]), _: 1 },
            ),
            d(M, { type: 'info', round: '' }, { default: o(() => [D]), _: 1 }),
            d(
              M,
              { type: 'success', round: '' },
              { default: o(() => [F]), _: 1 },
            ),
            d(
              M,
              { type: 'danger', round: '' },
              { default: o(() => [G]), _: 1 },
            ),
            d(
              M,
              { type: 'warning', round: '' },
              { default: o(() => [H]), _: 1 },
            ),
            d(M, { type: 'text', round: '' }, { default: o(() => [J]), _: 1 }),
          ]),
          K,
          r('div', null, [
            d(
              L,
              { onClick: l.onClick, circle: '' },
              { default: o(() => [d(N, { name: 'search' })]), _: 1 },
              8,
              ['onClick'],
            ),
            d(
              M,
              { type: 'primary', circle: '' },
              { default: o(() => [d(N, { name: 'edit' })]), _: 1 },
            ),
            d(
              M,
              { type: 'info', circle: '' },
              { default: o(() => [d(N, { name: 'check' })]), _: 1 },
            ),
            d(
              M,
              { type: 'success', circle: '' },
              { default: o(() => [d(N, { name: 'message' })]), _: 1 },
            ),
            d(
              M,
              { type: 'danger', circle: '' },
              { default: o(() => [d(N, { name: 'basketball' })]), _: 1 },
            ),
            d(
              M,
              { type: 'warning', circle: '' },
              { default: o(() => [d(N, { name: 'delete' })]), _: 1 },
            ),
            d(
              M,
              { type: 'text', circle: '' },
              { default: o(() => [d(O, { name: 'bicycle' })]), _: 1 },
            ),
          ]),
        ])
      );
    },
  ],
]);
export { L as d };
