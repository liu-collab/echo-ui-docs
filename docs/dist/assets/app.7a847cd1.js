var e = Object.defineProperty,
  t = Object.defineProperties,
  n = Object.getOwnPropertyDescriptors,
  o = Object.getOwnPropertySymbols,
  r = Object.prototype.hasOwnProperty,
  s = Object.prototype.propertyIsEnumerable,
  l = (t, n, o) =>
    n in t
      ? e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (t[n] = o),
  i = (e, t) => {
    for (var n in t || (t = {})) r.call(t, n) && l(e, n, t[n]);
    if (o) for (var n of o(t)) s.call(t, n) && l(e, n, t[n]);
    return e;
  },
  c = (e, o) => t(e, n(o));
function a(e, t) {
  const n = Object.create(null),
    o = e.split(',');
  for (let r = 0; r < o.length; r++) n[o[r]] = !0;
  return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e];
}
const u = a(
  'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
);
function d(e) {
  return !!e || '' === e;
}
function p(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        r = P(o) ? v(o) : p(o);
      if (r) for (const e in r) t[e] = r[e];
    }
    return t;
  }
  return P(e) || I(e) ? e : void 0;
}
const f = /;(?![^(]*\))/g,
  h = /:(.+)/;
function v(e) {
  const t = {};
  return (
    e.split(f).forEach((e) => {
      if (e) {
        const n = e.split(h);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function m(e) {
  let t = '';
  if (P(e)) t = e;
  else if (A(e))
    for (let n = 0; n < e.length; n++) {
      const o = m(e[n]);
      o && (t += o + ' ');
    }
  else if (I(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const g = (e) =>
    null == e
      ? ''
      : A(e) || (I(e) && (e.toString === B || !F(e.toString)))
      ? JSON.stringify(e, y, 2)
      : String(e),
  y = (e, t) =>
    t && t.__v_isRef
      ? y(e, t.value)
      : M(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (e, [t, n]) => ((e[`${t} =>`] = n), e),
            {},
          ),
        }
      : O(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : !I(t) || A(t) || N(t)
      ? t
      : String(t),
  b = {},
  _ = [],
  w = () => {},
  x = () => !1,
  C = /^on[^a-z]/,
  k = (e) => C.test(e),
  S = (e) => e.startsWith('onUpdate:'),
  $ = Object.assign,
  L = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  E = Object.prototype.hasOwnProperty,
  T = (e, t) => E.call(e, t),
  A = Array.isArray,
  M = (e) => '[object Map]' === U(e),
  O = (e) => '[object Set]' === U(e),
  F = (e) => 'function' == typeof e,
  P = (e) => 'string' == typeof e,
  R = (e) => 'symbol' == typeof e,
  I = (e) => null !== e && 'object' == typeof e,
  j = (e) => I(e) && F(e.then) && F(e.catch),
  B = Object.prototype.toString,
  U = (e) => B.call(e),
  N = (e) => '[object Object]' === U(e),
  V = (e) => P(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
  z = a(
    ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  H = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  D = /-(\w)/g,
  W = H((e) => e.replace(D, (e, t) => (t ? t.toUpperCase() : ''))),
  q = /\B([A-Z])/g,
  G = H((e) => e.replace(q, '-$1').toLowerCase()),
  K = H((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  J = H((e) => (e ? `on${K(e)}` : '')),
  Y = (e, t) => !Object.is(e, t),
  X = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Z = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Q = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ee;
let te;
const ne = [];
class oe {
  constructor(e = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !e &&
        te &&
        ((this.parent = te),
        (this.index = (te.scopes || (te.scopes = [])).push(this) - 1));
  }
  run(e) {
    if (this.active)
      try {
        return this.on(), e();
      } finally {
        this.off();
      }
  }
  on() {
    this.active && (ne.push(this), (te = this));
  }
  off() {
    this.active && (ne.pop(), (te = ne[ne.length - 1]));
  }
  stop(e) {
    if (this.active) {
      if (
        (this.effects.forEach((e) => e.stop()),
        this.cleanups.forEach((e) => e()),
        this.scopes && this.scopes.forEach((e) => e.stop(!0)),
        this.parent && !e)
      ) {
        const e = this.parent.scopes.pop();
        e &&
          e !== this &&
          ((this.parent.scopes[this.index] = e), (e.index = this.index));
      }
      this.active = !1;
    }
  }
}
const re = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  se = (e) => (e.w & ae) > 0,
  le = (e) => (e.n & ae) > 0,
  ie = new WeakMap();
let ce = 0,
  ae = 1;
const ue = [];
let de;
const pe = Symbol(''),
  fe = Symbol('');
class he {
  constructor(e, t = null, n) {
    (this.fn = e),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      (function (e, t) {
        (t = t || te) && t.active && t.effects.push(e);
      })(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    if (!ue.includes(this))
      try {
        return (
          ue.push((de = this)),
          ge.push(me),
          (me = !0),
          (ae = 1 << ++ce),
          ce <= 30
            ? (({ deps: e }) => {
                if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ae;
              })(this)
            : ve(this),
          this.fn()
        );
      } finally {
        ce <= 30 &&
          ((e) => {
            const { deps: t } = e;
            if (t.length) {
              let n = 0;
              for (let o = 0; o < t.length; o++) {
                const r = t[o];
                se(r) && !le(r) ? r.delete(e) : (t[n++] = r),
                  (r.w &= ~ae),
                  (r.n &= ~ae);
              }
              t.length = n;
            }
          })(this),
          (ae = 1 << --ce),
          be(),
          ue.pop();
        const e = ue.length;
        de = e > 0 ? ue[e - 1] : void 0;
      }
  }
  stop() {
    this.active && (ve(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ve(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let me = !0;
const ge = [];
function ye() {
  ge.push(me), (me = !1);
}
function be() {
  const e = ge.pop();
  me = void 0 === e || e;
}
function _e(e, t, n) {
  if (!we()) return;
  let o = ie.get(e);
  o || ie.set(e, (o = new Map()));
  let r = o.get(n);
  r || o.set(n, (r = re())), xe(r);
}
function we() {
  return me && void 0 !== de;
}
function xe(e, t) {
  let n = !1;
  ce <= 30 ? le(e) || ((e.n |= ae), (n = !se(e))) : (n = !e.has(de)),
    n && (e.add(de), de.deps.push(e));
}
function Ce(e, t, n, o, r, s) {
  const l = ie.get(e);
  if (!l) return;
  let i = [];
  if ('clear' === t) i = [...l.values()];
  else if ('length' === n && A(e))
    l.forEach((e, t) => {
      ('length' === t || t >= o) && i.push(e);
    });
  else
    switch ((void 0 !== n && i.push(l.get(n)), t)) {
      case 'add':
        A(e)
          ? V(n) && i.push(l.get('length'))
          : (i.push(l.get(pe)), M(e) && i.push(l.get(fe)));
        break;
      case 'delete':
        A(e) || (i.push(l.get(pe)), M(e) && i.push(l.get(fe)));
        break;
      case 'set':
        M(e) && i.push(l.get(pe));
    }
  if (1 === i.length) i[0] && ke(i[0]);
  else {
    const e = [];
    for (const t of i) t && e.push(...t);
    ke(re(e));
  }
}
function ke(e, t) {
  for (const n of A(e) ? e : [...e])
    (n !== de || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Se = a('__proto__,__v_isRef,__isVue'),
  $e = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(R),
  ),
  Le = Oe(),
  Ee = Oe(!1, !0),
  Te = Oe(!0),
  Ae = Me();
function Me() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...e) {
        const n = vt(this);
        for (let t = 0, r = this.length; t < r; t++) _e(n, 0, t + '');
        const o = n[t](...e);
        return -1 === o || !1 === o ? n[t](...e.map(vt)) : o;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...e) {
        ye();
        const n = vt(this)[t].apply(this, e);
        return be(), n;
      };
    }),
    e
  );
}
function Oe(e = !1, t = !1) {
  return function (n, o, r) {
    if ('__v_isReactive' === o) return !e;
    if ('__v_isReadonly' === o) return e;
    if ('__v_raw' === o && r === (e ? (t ? it : lt) : t ? st : rt).get(n))
      return n;
    const s = A(n);
    if (!e && s && T(Ae, o)) return Reflect.get(Ae, o, r);
    const l = Reflect.get(n, o, r);
    if (R(o) ? $e.has(o) : Se(o)) return l;
    if ((e || _e(n, 0, o), t)) return l;
    if (wt(l)) {
      return !s || !V(o) ? l.value : l;
    }
    return I(l) ? (e ? ut(l) : at(l)) : l;
  };
}
function Fe(e = !1) {
  return function (t, n, o, r) {
    let s = t[n];
    if (!e && ((o = vt(o)), (s = vt(s)), !A(t) && wt(s) && !wt(o)))
      return (s.value = o), !0;
    const l = A(t) && V(n) ? Number(n) < t.length : T(t, n),
      i = Reflect.set(t, n, o, r);
    return (
      t === vt(r) && (l ? Y(o, s) && Ce(t, 'set', n, o) : Ce(t, 'add', n, o)), i
    );
  };
}
const Pe = {
    get: Le,
    set: Fe(),
    deleteProperty: function (e, t) {
      const n = T(e, t);
      e[t];
      const o = Reflect.deleteProperty(e, t);
      return o && n && Ce(e, 'delete', t, void 0), o;
    },
    has: function (e, t) {
      const n = Reflect.has(e, t);
      return (R(t) && $e.has(t)) || _e(e, 0, t), n;
    },
    ownKeys: function (e) {
      return _e(e, 0, A(e) ? 'length' : pe), Reflect.ownKeys(e);
    },
  },
  Re = { get: Te, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
  Ie = $({}, Pe, { get: Ee, set: Fe(!0) }),
  je = (e) => e,
  Be = (e) => Reflect.getPrototypeOf(e);
function Ue(e, t, n = !1, o = !1) {
  const r = vt((e = e.__v_raw)),
    s = vt(t);
  t !== s && !n && _e(r, 0, t), !n && _e(r, 0, s);
  const { has: l } = Be(r),
    i = o ? je : n ? yt : gt;
  return l.call(r, t)
    ? i(e.get(t))
    : l.call(r, s)
    ? i(e.get(s))
    : void (e !== r && e.get(t));
}
function Ne(e, t = !1) {
  const n = this.__v_raw,
    o = vt(n),
    r = vt(e);
  return (
    e !== r && !t && _e(o, 0, e),
    !t && _e(o, 0, r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Ve(e, t = !1) {
  return (e = e.__v_raw), !t && _e(vt(e), 0, pe), Reflect.get(e, 'size', e);
}
function ze(e) {
  e = vt(e);
  const t = vt(this);
  return Be(t).has.call(t, e) || (t.add(e), Ce(t, 'add', e, e)), this;
}
function He(e, t) {
  t = vt(t);
  const n = vt(this),
    { has: o, get: r } = Be(n);
  let s = o.call(n, e);
  s || ((e = vt(e)), (s = o.call(n, e)));
  const l = r.call(n, e);
  return (
    n.set(e, t), s ? Y(t, l) && Ce(n, 'set', e, t) : Ce(n, 'add', e, t), this
  );
}
function De(e) {
  const t = vt(this),
    { has: n, get: o } = Be(t);
  let r = n.call(t, e);
  r || ((e = vt(e)), (r = n.call(t, e))), o && o.call(t, e);
  const s = t.delete(e);
  return r && Ce(t, 'delete', e, void 0), s;
}
function We() {
  const e = vt(this),
    t = 0 !== e.size,
    n = e.clear();
  return t && Ce(e, 'clear', void 0, void 0), n;
}
function qe(e, t) {
  return function (n, o) {
    const r = this,
      s = r.__v_raw,
      l = vt(s),
      i = t ? je : e ? yt : gt;
    return !e && _e(l, 0, pe), s.forEach((e, t) => n.call(o, i(e), i(t), r));
  };
}
function Ge(e, t, n) {
  return function (...o) {
    const r = this.__v_raw,
      s = vt(r),
      l = M(s),
      i = 'entries' === e || (e === Symbol.iterator && l),
      c = 'keys' === e && l,
      a = r[e](...o),
      u = n ? je : t ? yt : gt;
    return (
      !t && _e(s, 0, c ? fe : pe),
      {
        next() {
          const { value: e, done: t } = a.next();
          return t
            ? { value: e, done: t }
            : { value: i ? [u(e[0]), u(e[1])] : u(e), done: t };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ke(e) {
  return function (...t) {
    return 'delete' !== e && this;
  };
}
function Je() {
  const e = {
      get(e) {
        return Ue(this, e);
      },
      get size() {
        return Ve(this);
      },
      has: Ne,
      add: ze,
      set: He,
      delete: De,
      clear: We,
      forEach: qe(!1, !1),
    },
    t = {
      get(e) {
        return Ue(this, e, !1, !0);
      },
      get size() {
        return Ve(this);
      },
      has: Ne,
      add: ze,
      set: He,
      delete: De,
      clear: We,
      forEach: qe(!1, !0),
    },
    n = {
      get(e) {
        return Ue(this, e, !0);
      },
      get size() {
        return Ve(this, !0);
      },
      has(e) {
        return Ne.call(this, e, !0);
      },
      add: Ke('add'),
      set: Ke('set'),
      delete: Ke('delete'),
      clear: Ke('clear'),
      forEach: qe(!0, !1),
    },
    o = {
      get(e) {
        return Ue(this, e, !0, !0);
      },
      get size() {
        return Ve(this, !0);
      },
      has(e) {
        return Ne.call(this, e, !0);
      },
      add: Ke('add'),
      set: Ke('set'),
      delete: Ke('delete'),
      clear: Ke('clear'),
      forEach: qe(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      (e[r] = Ge(r, !1, !1)),
        (n[r] = Ge(r, !0, !1)),
        (t[r] = Ge(r, !1, !0)),
        (o[r] = Ge(r, !0, !0));
    }),
    [e, n, t, o]
  );
}
const [Ye, Xe, Ze, Qe] = Je();
function et(e, t) {
  const n = t ? (e ? Qe : Ze) : e ? Xe : Ye;
  return (t, o, r) =>
    '__v_isReactive' === o
      ? !e
      : '__v_isReadonly' === o
      ? e
      : '__v_raw' === o
      ? t
      : Reflect.get(T(n, o) && o in t ? n : t, o, r);
}
const tt = { get: et(!1, !1) },
  nt = { get: et(!1, !0) },
  ot = { get: et(!0, !1) },
  rt = new WeakMap(),
  st = new WeakMap(),
  lt = new WeakMap(),
  it = new WeakMap();
function ct(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : (function (e) {
        switch (e) {
          case 'Object':
          case 'Array':
            return 1;
          case 'Map':
          case 'Set':
          case 'WeakMap':
          case 'WeakSet':
            return 2;
          default:
            return 0;
        }
      })(((e) => U(e).slice(8, -1))(e));
}
function at(e) {
  return e && e.__v_isReadonly ? e : dt(e, !1, Pe, tt, rt);
}
function ut(e) {
  return dt(e, !0, Re, ot, lt);
}
function dt(e, t, n, o, r) {
  if (!I(e)) return e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  const s = r.get(e);
  if (s) return s;
  const l = ct(e);
  if (0 === l) return e;
  const i = new Proxy(e, 2 === l ? o : n);
  return r.set(e, i), i;
}
function pt(e) {
  return ft(e) ? pt(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function ft(e) {
  return !(!e || !e.__v_isReadonly);
}
function ht(e) {
  return pt(e) || ft(e);
}
function vt(e) {
  const t = e && e.__v_raw;
  return t ? vt(t) : e;
}
function mt(e) {
  return Z(e, '__v_skip', !0), e;
}
const gt = (e) => (I(e) ? at(e) : e),
  yt = (e) => (I(e) ? ut(e) : e);
function bt(e) {
  we() && ((e = vt(e)).dep || (e.dep = re()), xe(e.dep));
}
function _t(e, t) {
  (e = vt(e)).dep && ke(e.dep);
}
function wt(e) {
  return Boolean(e && !0 === e.__v_isRef);
}
function xt(e) {
  return (function (e, t) {
    if (wt(e)) return e;
    return new Ct(e, t);
  })(e, !1);
}
class Ct {
  constructor(e, t) {
    (this._shallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? e : vt(e)),
      (this._value = t ? e : gt(e));
  }
  get value() {
    return bt(this), this._value;
  }
  set value(e) {
    (e = this._shallow ? e : vt(e)),
      Y(e, this._rawValue) &&
        ((this._rawValue = e),
        (this._value = this._shallow ? e : gt(e)),
        _t(this));
  }
}
function kt(e) {
  return wt(e) ? e.value : e;
}
const St = {
  get: (e, t, n) => kt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return wt(r) && !wt(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o);
  },
};
function $t(e) {
  return pt(e) ? e : new Proxy(e, St);
}
function Lt(e) {
  const t = A(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Tt(e, n);
  return t;
}
class Et {
  constructor(e, t) {
    (this._object = e), (this._key = t), (this.__v_isRef = !0);
  }
  get value() {
    return this._object[this._key];
  }
  set value(e) {
    this._object[this._key] = e;
  }
}
function Tt(e, t) {
  const n = e[t];
  return wt(n) ? n : new Et(e, t);
}
class At {
  constructor(e, t, n) {
    (this._setter = t),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new he(e, () => {
        this._dirty || ((this._dirty = !0), _t(this));
      })),
      (this.__v_isReadonly = n);
  }
  get value() {
    const e = vt(this);
    return (
      bt(e),
      e._dirty && ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
}
function Mt(e, t) {
  let n, o;
  const r = F(e);
  r ? ((n = e), (o = w)) : ((n = e.get), (o = e.set));
  return new At(n, o, r || !o);
}
function Ot(e, t, ...n) {
  const o = e.vnode.props || b;
  let r = n;
  const s = t.startsWith('update:'),
    l = s && t.slice(7);
  if (l && l in o) {
    const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
      { number: t, trim: s } = o[e] || b;
    s ? (r = n.map((e) => e.trim())) : t && (r = n.map(Q));
  }
  let i,
    c = o[(i = J(t))] || o[(i = J(W(t)))];
  !c && s && (c = o[(i = J(G(t)))]), c && nr(c, e, 6, r);
  const a = o[i + 'Once'];
  if (a) {
    if (e.emitted) {
      if (e.emitted[i]) return;
    } else e.emitted = {};
    (e.emitted[i] = !0), nr(a, e, 6, r);
  }
}
function Ft(e, t, n = !1) {
  const o = t.emitsCache,
    r = o.get(e);
  if (void 0 !== r) return r;
  const s = e.emits;
  let l = {},
    i = !1;
  if (!F(e)) {
    const o = (e) => {
      const n = Ft(e, t, !0);
      n && ((i = !0), $(l, n));
    };
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o);
  }
  return s || i
    ? (A(s) ? s.forEach((e) => (l[e] = null)) : $(l, s), o.set(e, l), l)
    : (o.set(e, null), null);
}
function Pt(e, t) {
  return (
    !(!e || !k(t)) &&
    ((t = t.slice(2).replace(/Once$/, '')),
    T(e, t[0].toLowerCase() + t.slice(1)) || T(e, G(t)) || T(e, t))
  );
}
Promise.resolve();
let Rt = null,
  It = null;
function jt(e) {
  const t = Rt;
  return (Rt = e), (It = (e && e.type.__scopeId) || null), t;
}
function Bt(e) {
  It = e;
}
function Ut() {
  It = null;
}
function Nt(e, t = Rt, n) {
  if (!t) return e;
  if (e._n) return e;
  const o = (...n) => {
    o._d && bo(-1);
    const r = jt(t),
      s = e(...n);
    return jt(r), o._d && bo(1), s;
  };
  return (o._n = !0), (o._c = !0), (o._d = !0), o;
}
function Vt(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    props: s,
    propsOptions: [l],
    slots: i,
    attrs: c,
    emit: a,
    render: u,
    renderCache: d,
    data: p,
    setupState: f,
    ctx: h,
    inheritAttrs: v,
  } = e;
  let m, g;
  const y = jt(e);
  try {
    if (4 & n.shapeFlag) {
      const e = r || o;
      (m = Po(u.call(e, e, d, s, f, p, h))), (g = c);
    } else {
      const e = t;
      0,
        (m = Po(
          e.length > 1 ? e(s, { attrs: c, slots: i, emit: a }) : e(s, null),
        )),
        (g = t.props ? c : zt(c));
    }
  } catch (_) {
    (vo.length = 0), or(_, e, 1), (m = To(fo));
  }
  let b = m;
  if (g && !1 !== v) {
    const e = Object.keys(g),
      { shapeFlag: t } = b;
    e.length && 7 & t && (l && e.some(S) && (g = Ht(g, l)), (b = Ao(b, g)));
  }
  return (
    n.dirs && (b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs),
    n.transition && (b.transition = n.transition),
    (m = b),
    jt(y),
    m
  );
}
const zt = (e) => {
    let t;
    for (const n in e)
      ('class' === n || 'style' === n || k(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ht = (e, t) => {
    const n = {};
    for (const o in e) (S(o) && o.slice(9) in t) || (n[o] = e[o]);
    return n;
  };
function Dt(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t[s] !== e[s] && !Pt(n, s)) return !0;
  }
  return !1;
}
function Wt(e, t) {
  t && t.pendingBranch
    ? A(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : _r(e, pr, dr, fr);
}
function qt(e, t, n = !1) {
  const o = qo || Rt;
  if (o) {
    const r =
      null == o.parent
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && F(t) ? t.call(o.proxy) : t;
  }
}
const Gt = [Function, Array],
  Kt = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Gt,
      onEnter: Gt,
      onAfterEnter: Gt,
      onEnterCancelled: Gt,
      onBeforeLeave: Gt,
      onLeave: Gt,
      onAfterLeave: Gt,
      onLeaveCancelled: Gt,
      onBeforeAppear: Gt,
      onAppear: Gt,
      onAfterAppear: Gt,
      onAppearCancelled: Gt,
    },
    setup(e, { slots: t }) {
      const n = Go(),
        o = (function () {
          const e = {
            isMounted: !1,
            isLeaving: !1,
            isUnmounting: !1,
            leavingVNodes: new Map(),
          };
          return (
            hn(() => {
              e.isMounted = !0;
            }),
            gn(() => {
              e.isUnmounting = !0;
            }),
            e
          );
        })();
      let r;
      return () => {
        const s = t.default && en(t.default(), !0);
        if (!s || !s.length) return;
        const l = vt(e),
          { mode: i } = l,
          c = s[0];
        if (o.isLeaving) return Xt(c);
        const a = Zt(c);
        if (!a) return Xt(c);
        const u = Yt(a, l, o, n);
        Qt(a, u);
        const d = n.subTree,
          p = d && Zt(d);
        let f = !1;
        const { getTransitionKey: h } = a.type;
        if (h) {
          const e = h();
          void 0 === r ? (r = e) : e !== r && ((r = e), (f = !0));
        }
        if (p && p.type !== fo && (!ko(a, p) || f)) {
          const e = Yt(p, l, o, n);
          if ((Qt(p, e), 'out-in' === i))
            return (
              (o.isLeaving = !0),
              (e.afterLeave = () => {
                (o.isLeaving = !1), n.update();
              }),
              Xt(c)
            );
          'in-out' === i &&
            a.type !== fo &&
            (e.delayLeave = (e, t, n) => {
              (Jt(o, p)[String(p.key)] = p),
                (e._leaveCb = () => {
                  t(), (e._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = n);
            });
        }
        return c;
      };
    },
  };
function Jt(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || ((o = Object.create(null)), n.set(t.type, o)), o;
}
function Yt(e, t, n, o) {
  const {
      appear: r,
      mode: s,
      persisted: l = !1,
      onBeforeEnter: i,
      onEnter: c,
      onAfterEnter: a,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: p,
      onAfterLeave: f,
      onLeaveCancelled: h,
      onBeforeAppear: v,
      onAppear: m,
      onAfterAppear: g,
      onAppearCancelled: y,
    } = t,
    b = String(e.key),
    _ = Jt(n, e),
    w = (e, t) => {
      e && nr(e, o, 9, t);
    },
    x = {
      mode: s,
      persisted: l,
      beforeEnter(t) {
        let o = i;
        if (!n.isMounted) {
          if (!r) return;
          o = v || i;
        }
        t._leaveCb && t._leaveCb(!0);
        const s = _[b];
        s && ko(e, s) && s.el._leaveCb && s.el._leaveCb(), w(o, [t]);
      },
      enter(e) {
        let t = c,
          o = a,
          s = u;
        if (!n.isMounted) {
          if (!r) return;
          (t = m || c), (o = g || a), (s = y || u);
        }
        let l = !1;
        const i = (e._enterCb = (t) => {
          l ||
            ((l = !0),
            w(t ? s : o, [e]),
            x.delayedLeave && x.delayedLeave(),
            (e._enterCb = void 0));
        });
        t ? (t(e, i), t.length <= 1 && i()) : i();
      },
      leave(t, o) {
        const r = String(e.key);
        if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return o();
        w(d, [t]);
        let s = !1;
        const l = (t._leaveCb = (n) => {
          s ||
            ((s = !0),
            o(),
            w(n ? h : f, [t]),
            (t._leaveCb = void 0),
            _[r] === e && delete _[r]);
        });
        (_[r] = e), p ? (p(t, l), p.length <= 1 && l()) : l();
      },
      clone: (e) => Yt(e, t, n, o),
    };
  return x;
}
function Xt(e) {
  if (sn(e)) return ((e = Ao(e)).children = null), e;
}
function Zt(e) {
  return sn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Qt(e, t) {
  6 & e.shapeFlag && e.component
    ? Qt(e.component.subTree, t)
    : 128 & e.shapeFlag
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function en(e, t = !1) {
  let n = [],
    o = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    s.type === uo
      ? (128 & s.patchFlag && o++, (n = n.concat(en(s.children, t))))
      : (t || s.type !== fo) && n.push(s);
  }
  if (o > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2;
  return n;
}
function tn(e) {
  return F(e) ? { setup: e, name: e.name } : e;
}
const nn = (e) => !!e.type.__asyncLoader;
function on(e) {
  F(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: o,
    delay: r = 200,
    timeout: s,
    suspensible: l = !0,
    onError: i,
  } = e;
  let c,
    a = null,
    u = 0;
  const d = () => {
    let e;
    return (
      a ||
      (e = a =
        t()
          .catch((e) => {
            if (((e = e instanceof Error ? e : new Error(String(e))), i))
              return new Promise((t, n) => {
                i(
                  e,
                  () => t((u++, (a = null), d())),
                  () => n(e),
                  u + 1,
                );
              });
            throw e;
          })
          .then((t) =>
            e !== a && a
              ? a
              : (t &&
                  (t.__esModule || 'Module' === t[Symbol.toStringTag]) &&
                  (t = t.default),
                (c = t),
                t),
          ))
    );
  };
  return tn({
    name: 'AsyncComponentWrapper',
    __asyncLoader: d,
    get __asyncResolved() {
      return c;
    },
    setup() {
      const e = qo;
      if (c) return () => rn(c, e);
      const t = (t) => {
        (a = null), or(t, e, 13, !o);
      };
      if ((l && e.suspense) || Xo)
        return d()
          .then((t) => () => rn(t, e))
          .catch((e) => (t(e), () => (o ? To(o, { error: e }) : null)));
      const i = xt(!1),
        u = xt(),
        p = xt(!!r);
      return (
        r &&
          setTimeout(() => {
            p.value = !1;
          }, r),
        null != s &&
          setTimeout(() => {
            if (!i.value && !u.value) {
              const e = new Error(`Async component timed out after ${s}ms.`);
              t(e), (u.value = e);
            }
          }, s),
        d()
          .then(() => {
            (i.value = !0),
              e.parent && sn(e.parent.vnode) && yr(e.parent.update);
          })
          .catch((e) => {
            t(e), (u.value = e);
          }),
        () =>
          i.value && c
            ? rn(c, e)
            : u.value && o
            ? To(o, { error: u.value })
            : n && !p.value
            ? To(n)
            : void 0
      );
    },
  });
}
function rn(e, { vnode: { ref: t, props: n, children: o } }) {
  const r = To(e, n, o);
  return (r.ref = t), r;
}
const sn = (e) => e.type.__isKeepAlive;
function ln(e, t) {
  an(e, 'a', t);
}
function cn(e, t) {
  an(e, 'da', t);
}
function an(e, t, n = qo) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let t = n;
      for (; t; ) {
        if (t.isDeactivated) return;
        t = t.parent;
      }
      e();
    });
  if ((dn(t, o, n), n)) {
    let e = n.parent;
    for (; e && e.parent; )
      sn(e.parent.vnode) && un(o, t, n, e), (e = e.parent);
  }
}
function un(e, t, n, o) {
  const r = dn(t, e, o, !0);
  yn(() => {
    L(o[t], r);
  }, n);
}
function dn(e, t, n = qo, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          ye(), Ko(n);
          const r = nr(t, n, e, o);
          return Jo(), be(), r;
        });
    return o ? r.unshift(s) : r.push(s), s;
  }
}
const pn =
    (e) =>
    (t, n = qo) =>
      (!Xo || 'sp' === e) && dn(e, t, n),
  fn = pn('bm'),
  hn = pn('m'),
  vn = pn('bu'),
  mn = pn('u'),
  gn = pn('bum'),
  yn = pn('um'),
  bn = pn('sp'),
  _n = pn('rtg'),
  wn = pn('rtc');
function xn(e, t = qo) {
  dn('ec', e, t);
}
let Cn = !0;
function kn(e) {
  const t = Ln(e),
    n = e.proxy,
    o = e.ctx;
  (Cn = !1), t.beforeCreate && Sn(t.beforeCreate, e, 'bc');
  const {
    data: r,
    computed: s,
    methods: l,
    watch: i,
    provide: c,
    inject: a,
    created: u,
    beforeMount: d,
    mounted: p,
    beforeUpdate: f,
    updated: h,
    activated: v,
    deactivated: m,
    beforeDestroy: g,
    beforeUnmount: y,
    destroyed: b,
    unmounted: _,
    render: x,
    renderTracked: C,
    renderTriggered: k,
    errorCaptured: S,
    serverPrefetch: $,
    expose: L,
    inheritAttrs: E,
    components: T,
    directives: M,
    filters: O,
  } = t;
  if (
    (a &&
      (function (e, t, n = w, o = !1) {
        A(e) && (e = Mn(e));
        for (const r in e) {
          const n = e[r];
          let s;
          (s = I(n)
            ? 'default' in n
              ? qt(n.from || r, n.default, !0)
              : qt(n.from || r)
            : qt(n)),
            wt(s) && o
              ? Object.defineProperty(t, r, {
                  enumerable: !0,
                  configurable: !0,
                  get: () => s.value,
                  set: (e) => (s.value = e),
                })
              : (t[r] = s);
        }
      })(a, o, null, e.appContext.config.unwrapInjectedRef),
    l)
  )
    for (const w in l) {
      const e = l[w];
      F(e) && (o[w] = e.bind(n));
    }
  if (r) {
    const t = r.call(n, n);
    I(t) && (e.data = at(t));
  }
  if (((Cn = !0), s))
    for (const A in s) {
      const e = s[A],
        t = Mt({
          get: F(e) ? e.bind(n, n) : F(e.get) ? e.get.bind(n, n) : w,
          set: !F(e) && F(e.set) ? e.set.bind(n) : w,
        });
      Object.defineProperty(o, A, {
        enumerable: !0,
        configurable: !0,
        get: () => t.value,
        set: (e) => (t.value = e),
      });
    }
  if (i) for (const w in i) $n(i[w], o, n, w);
  if (c) {
    const e = F(c) ? c.call(n) : c;
    Reflect.ownKeys(e).forEach((t) => {
      !(function (e, t) {
        if (qo) {
          let n = qo.provides;
          const o = qo.parent && qo.parent.provides;
          o === n && (n = qo.provides = Object.create(o)), (n[e] = t);
        }
      })(t, e[t]);
    });
  }
  function P(e, t) {
    A(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
  }
  if (
    (u && Sn(u, e, 'c'),
    P(fn, d),
    P(hn, p),
    P(vn, f),
    P(mn, h),
    P(ln, v),
    P(cn, m),
    P(xn, S),
    P(wn, C),
    P(_n, k),
    P(gn, y),
    P(yn, _),
    P(bn, $),
    A(L))
  )
    if (L.length) {
      const t = e.exposed || (e.exposed = {});
      L.forEach((e) => {
        Object.defineProperty(t, e, {
          get: () => n[e],
          set: (t) => (n[e] = t),
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === w && (e.render = x),
    null != E && (e.inheritAttrs = E),
    T && (e.components = T),
    M && (e.directives = M);
}
function Sn(e, t, n) {
  nr(A(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function $n(e, t, n, o) {
  const r = o.includes('.') ? Tr(n, o) : () => n[o];
  if (P(e)) {
    const n = t[e];
    F(n) && $r(r, n);
  } else if (F(e)) $r(r, e.bind(n));
  else if (I(e))
    if (A(e)) e.forEach((e) => $n(e, t, n, o));
    else {
      const o = F(e.handler) ? e.handler.bind(n) : t[e.handler];
      F(o) && $r(r, o, e);
    }
}
function Ln(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: r,
      optionsCache: s,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    i = s.get(t);
  let c;
  return (
    i
      ? (c = i)
      : r.length || n || o
      ? ((c = {}), r.length && r.forEach((e) => En(c, e, l, !0)), En(c, t, l))
      : (c = t),
    s.set(t, c),
    c
  );
}
function En(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && En(e, s, n, !0), r && r.forEach((t) => En(e, t, n, !0));
  for (const l in t)
    if (o && 'expose' === l);
    else {
      const o = Tn[l] || (n && n[l]);
      e[l] = o ? o(e[l], t[l]) : t[l];
    }
  return e;
}
const Tn = {
  data: An,
  props: Fn,
  emits: Fn,
  methods: Fn,
  computed: Fn,
  beforeCreate: On,
  created: On,
  beforeMount: On,
  mounted: On,
  beforeUpdate: On,
  updated: On,
  beforeDestroy: On,
  beforeUnmount: On,
  destroyed: On,
  unmounted: On,
  activated: On,
  deactivated: On,
  errorCaptured: On,
  serverPrefetch: On,
  components: Fn,
  directives: Fn,
  watch: function (e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = $(Object.create(null), e);
    for (const o in t) n[o] = On(e[o], t[o]);
    return n;
  },
  provide: An,
  inject: function (e, t) {
    return Fn(Mn(e), Mn(t));
  },
};
function An(e, t) {
  return t
    ? e
      ? function () {
          return $(
            F(e) ? e.call(this, this) : e,
            F(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Mn(e) {
  if (A(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function On(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Fn(e, t) {
  return e ? $($(Object.create(null), e), t) : t;
}
function Pn(e, t, n, o = !1) {
  const r = {},
    s = {};
  Z(s, So, 1), (e.propsDefaults = Object.create(null)), Rn(e, t, r, s);
  for (const l in e.propsOptions[0]) l in r || (r[l] = void 0);
  n
    ? (e.props = o ? r : dt(r, !1, Ie, nt, st))
    : e.type.props
    ? (e.props = r)
    : (e.props = s),
    (e.attrs = s);
}
function Rn(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let l,
    i = !1;
  if (t)
    for (let c in t) {
      if (z(c)) continue;
      const a = t[c];
      let u;
      r && T(r, (u = W(c)))
        ? s && s.includes(u)
          ? ((l || (l = {}))[u] = a)
          : (n[u] = a)
        : Pt(e.emitsOptions, c) || (a !== o[c] && ((o[c] = a), (i = !0)));
    }
  if (s) {
    const t = vt(n),
      o = l || b;
    for (let l = 0; l < s.length; l++) {
      const i = s[l];
      n[i] = In(r, t, i, o[i], e, !T(o, i));
    }
  }
  return i;
}
function In(e, t, n, o, r, s) {
  const l = e[n];
  if (null != l) {
    const e = T(l, 'default');
    if (e && void 0 === o) {
      const e = l.default;
      if (l.type !== Function && F(e)) {
        const { propsDefaults: s } = r;
        n in s ? (o = s[n]) : (Ko(r), (o = s[n] = e.call(null, t)), Jo());
      } else o = e;
    }
    l[0] &&
      (s && !e ? (o = !1) : !l[1] || ('' !== o && o !== G(n)) || (o = !0));
  }
  return o;
}
function jn(e, t, n = !1) {
  const o = t.propsCache,
    r = o.get(e);
  if (r) return r;
  const s = e.props,
    l = {},
    i = [];
  let c = !1;
  if (!F(e)) {
    const o = (e) => {
      c = !0;
      const [n, o] = jn(e, t, !0);
      $(l, n), o && i.push(...o);
    };
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o);
  }
  if (!s && !c) return o.set(e, _), _;
  if (A(s))
    for (let u = 0; u < s.length; u++) {
      const e = W(s[u]);
      Bn(e) && (l[e] = b);
    }
  else if (s)
    for (const u in s) {
      const e = W(u);
      if (Bn(e)) {
        const t = s[u],
          n = (l[e] = A(t) || F(t) ? { type: t } : t);
        if (n) {
          const t = Vn(Boolean, n.type),
            o = Vn(String, n.type);
          (n[0] = t > -1),
            (n[1] = o < 0 || t < o),
            (t > -1 || T(n, 'default')) && i.push(e);
        }
      }
    }
  const a = [l, i];
  return o.set(e, a), a;
}
function Bn(e) {
  return '$' !== e[0];
}
function Un(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : null === e ? 'null' : '';
}
function Nn(e, t) {
  return Un(e) === Un(t);
}
function Vn(e, t) {
  return A(t) ? t.findIndex((t) => Nn(t, e)) : F(t) && Nn(t, e) ? 0 : -1;
}
const zn = (e) => '_' === e[0] || '$stable' === e,
  Hn = (e) => (A(e) ? e.map(Po) : [Po(e)]),
  Dn = (e, t, n) => {
    const o = Nt((...e) => Hn(t(...e)), n);
    return (o._c = !1), o;
  },
  Wn = (e, t, n) => {
    const o = e._ctx;
    for (const r in e) {
      if (zn(r)) continue;
      const n = e[r];
      if (F(n)) t[r] = Dn(0, n, o);
      else if (null != n) {
        const e = Hn(n);
        t[r] = () => e;
      }
    }
  },
  qn = (e, t) => {
    const n = Hn(t);
    e.slots.default = () => n;
  };
function Gn(e, t) {
  if (null === Rt) return e;
  const n = Rt.proxy,
    o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [e, s, l, i = b] = t[r];
    F(e) && (e = { mounted: e, updated: e }),
      e.deep && Ar(s),
      o.push({
        dir: e,
        instance: n,
        value: s,
        oldValue: void 0,
        arg: l,
        modifiers: i,
      });
  }
  return e;
}
function Kn(e, t, n, o) {
  const r = e.dirs,
    s = t && t.dirs;
  for (let l = 0; l < r.length; l++) {
    const i = r[l];
    s && (i.oldValue = s[l].value);
    let c = i.dir[o];
    c && (ye(), nr(c, n, 8, [e.el, i, e, t]), be());
  }
}
function Jn() {
  return {
    app: null,
    config: {
      isNativeTag: x,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Yn = 0;
function Xn(e, t) {
  return function (n, o = null) {
    null == o || I(o) || (o = null);
    const r = Jn(),
      s = new Set();
    let l = !1;
    const i = (r.app = {
      _uid: Yn++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Or,
      get config() {
        return r.config;
      },
      set config(e) {},
      use: (e, ...t) => (
        s.has(e) ||
          (e && F(e.install)
            ? (s.add(e), e.install(i, ...t))
            : F(e) && (s.add(e), e(i, ...t))),
        i
      ),
      mixin: (e) => (r.mixins.includes(e) || r.mixins.push(e), i),
      component: (e, t) => (t ? ((r.components[e] = t), i) : r.components[e]),
      directive: (e, t) => (t ? ((r.directives[e] = t), i) : r.directives[e]),
      mount(s, c, a) {
        if (!l) {
          const u = To(n, o);
          return (
            (u.appContext = r),
            c && t ? t(u, s) : e(u, s, a),
            (l = !0),
            (i._container = s),
            (s.__vue_app__ = i),
            er(u.component) || u.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, i._container), delete i._container.__vue_app__);
      },
      provide: (e, t) => ((r.provides[e] = t), i),
    });
    return i;
  };
}
let Zn = !1;
const Qn = (e) => /svg/.test(e.namespaceURI) && 'foreignObject' !== e.tagName,
  eo = (e) => 8 === e.nodeType;
function to(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: o,
        nextSibling: r,
        parentNode: s,
        remove: l,
        insert: i,
        createComment: c,
      },
    } = e,
    a = (n, o, l, i, c, v = !1) => {
      const m = eo(n) && '[' === n.data,
        g = () => f(n, o, l, i, c, m),
        { type: y, ref: b, shapeFlag: _ } = o,
        w = n.nodeType;
      o.el = n;
      let x = null;
      switch (y) {
        case po:
          3 !== w
            ? (x = g())
            : (n.data !== o.children && ((Zn = !0), (n.data = o.children)),
              (x = r(n)));
          break;
        case fo:
          x = 8 !== w || m ? g() : r(n);
          break;
        case ho:
          if (1 === w) {
            x = n;
            const e = !o.children.length;
            for (let t = 0; t < o.staticCount; t++)
              e && (o.children += x.outerHTML),
                t === o.staticCount - 1 && (o.anchor = x),
                (x = r(x));
            return x;
          }
          x = g();
          break;
        case uo:
          x = m ? p(n, o, l, i, c, v) : g();
          break;
        default:
          if (1 & _)
            x =
              1 !== w || o.type.toLowerCase() !== n.tagName.toLowerCase()
                ? g()
                : u(n, o, l, i, c, v);
          else if (6 & _) {
            o.slotScopeIds = c;
            const e = s(n);
            if ((t(o, e, null, l, i, Qn(e), v), (x = m ? h(n) : r(n)), nn(o))) {
              let t;
              m
                ? ((t = To(uo)),
                  (t.anchor = x ? x.previousSibling : e.lastChild))
                : (t = 3 === n.nodeType ? Mo('') : To('div')),
                (t.el = n),
                (o.component.subTree = t);
            }
          } else
            64 & _
              ? (x = 8 !== w ? g() : o.type.hydrate(n, o, l, i, c, v, e, d))
              : 128 & _ &&
                (x = o.type.hydrate(n, o, l, i, Qn(s(n)), c, v, e, a));
      }
      return null != b && ro(b, null, i, o), x;
    },
    u = (e, t, n, r, s, i) => {
      i = i || !!t.dynamicChildren;
      const { type: c, props: a, patchFlag: u, shapeFlag: p, dirs: f } = t,
        h = ('input' === c && f) || 'option' === c;
      if (h || -1 !== u) {
        if ((f && Kn(t, null, n, 'created'), a))
          if (h || !i || 48 & u)
            for (const t in a)
              ((h && t.endsWith('value')) || (k(t) && !z(t))) &&
                o(e, t, null, a[t], !1, void 0, n);
          else a.onClick && o(e, 'onClick', null, a.onClick, !1, void 0, n);
        let c;
        if (
          ((c = a && a.onVnodeBeforeMount) && so(c, n, t),
          f && Kn(t, null, n, 'beforeMount'),
          ((c = a && a.onVnodeMounted) || f) &&
            Wt(() => {
              c && so(c, n, t), f && Kn(t, null, n, 'mounted');
            }, r),
          16 & p && (!a || (!a.innerHTML && !a.textContent)))
        ) {
          let o = d(e.firstChild, t, e, n, r, s, i);
          for (; o; ) {
            Zn = !0;
            const e = o;
            (o = o.nextSibling), l(e);
          }
        } else
          8 & p &&
            e.textContent !== t.children &&
            ((Zn = !0), (e.textContent = t.children));
      }
      return e.nextSibling;
    },
    d = (e, t, o, r, s, l, i) => {
      i = i || !!t.dynamicChildren;
      const c = t.children,
        u = c.length;
      for (let d = 0; d < u; d++) {
        const t = i ? c[d] : (c[d] = Po(c[d]));
        if (e) e = a(e, t, r, s, l, i);
        else {
          if (t.type === po && !t.children) continue;
          (Zn = !0), n(null, t, o, null, r, s, Qn(o), l);
        }
      }
      return e;
    },
    p = (e, t, n, o, l, a) => {
      const { slotScopeIds: u } = t;
      u && (l = l ? l.concat(u) : u);
      const p = s(e),
        f = d(r(e), t, p, n, o, l, a);
      return f && eo(f) && ']' === f.data
        ? r((t.anchor = f))
        : ((Zn = !0), i((t.anchor = c(']')), p, f), f);
    },
    f = (e, t, o, i, c, a) => {
      if (((Zn = !0), (t.el = null), a)) {
        const t = h(e);
        for (;;) {
          const n = r(e);
          if (!n || n === t) break;
          l(n);
        }
      }
      const u = r(e),
        d = s(e);
      return l(e), n(null, t, d, u, o, i, Qn(d), c), u;
    },
    h = (e) => {
      let t = 0;
      for (; e; )
        if ((e = r(e)) && eo(e) && ('[' === e.data && t++, ']' === e.data)) {
          if (0 === t) return r(e);
          t--;
        }
      return e;
    };
  return [
    (e, t) => {
      if (!t.hasChildNodes()) return n(null, e, t), void xr();
      (Zn = !1),
        a(t.firstChild, e, null, null, null),
        xr(),
        Zn && console.error('Hydration completed but contains mismatches.');
    },
    a,
  ];
}
const no = Wt;
function oo(e) {
  return (function (e, t) {
    (
      ee ||
      (ee =
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
          ? global
          : {})
    ).__VUE__ = !0;
    const {
        insert: n,
        remove: o,
        patchProp: r,
        createElement: s,
        createText: l,
        createComment: i,
        setText: c,
        setElementText: a,
        parentNode: u,
        nextSibling: d,
        setScopeId: p = w,
        cloneNode: f,
        insertStaticContent: h,
      } = e,
      v = (
        e,
        t,
        n,
        o = null,
        r = null,
        s = null,
        l = !1,
        i = null,
        c = !!t.dynamicChildren,
      ) => {
        if (e === t) return;
        e && !ko(e, t) && ((o = te(e)), q(e, r, s, !0), (e = null)),
          -2 === t.patchFlag && ((c = !1), (t.dynamicChildren = null));
        const { type: a, ref: u, shapeFlag: d } = t;
        switch (a) {
          case po:
            m(e, t, n, o);
            break;
          case fo:
            g(e, t, n, o);
            break;
          case ho:
            null == e && y(t, n, o, l);
            break;
          case uo:
            F(e, t, n, o, r, s, l, i, c);
            break;
          default:
            1 & d
              ? k(e, t, n, o, r, s, l, i, c)
              : 6 & d
              ? P(e, t, n, o, r, s, l, i, c)
              : (64 & d || 128 & d) && a.process(e, t, n, o, r, s, l, i, c, re);
        }
        null != u && r && ro(u, e && e.ref, s, t || e, !t);
      },
      m = (e, t, o, r) => {
        if (null == e) n((t.el = l(t.children)), o, r);
        else {
          const n = (t.el = e.el);
          t.children !== e.children && c(n, t.children);
        }
      },
      g = (e, t, o, r) => {
        null == e ? n((t.el = i(t.children || '')), o, r) : (t.el = e.el);
      },
      y = (e, t, n, o) => {
        [e.el, e.anchor] = h(e.children, t, n, o);
      },
      x = ({ el: e, anchor: t }, o, r) => {
        let s;
        for (; e && e !== t; ) (s = d(e)), n(e, o, r), (e = s);
        n(t, o, r);
      },
      C = ({ el: e, anchor: t }) => {
        let n;
        for (; e && e !== t; ) (n = d(e)), o(e), (e = n);
        o(t);
      },
      k = (e, t, n, o, r, s, l, i, c) => {
        (l = l || 'svg' === t.type),
          null == e ? S(t, n, o, r, s, l, i, c) : A(e, t, r, s, l, i, c);
      },
      S = (e, t, o, l, i, c, u, d) => {
        let p, h;
        const {
          type: v,
          props: m,
          shapeFlag: g,
          transition: y,
          patchFlag: b,
          dirs: _,
        } = e;
        if (e.el && void 0 !== f && -1 === b) p = e.el = f(e.el);
        else {
          if (
            ((p = e.el = s(e.type, c, m && m.is, m)),
            8 & g
              ? a(p, e.children)
              : 16 & g &&
                E(e.children, p, null, l, i, c && 'foreignObject' !== v, u, d),
            _ && Kn(e, null, l, 'created'),
            m)
          ) {
            for (const t in m)
              'value' === t ||
                z(t) ||
                r(p, t, null, m[t], c, e.children, l, i, Q);
            'value' in m && r(p, 'value', null, m.value),
              (h = m.onVnodeBeforeMount) && so(h, l, e);
          }
          L(p, e, e.scopeId, u, l);
        }
        _ && Kn(e, null, l, 'beforeMount');
        const w = (!i || (i && !i.pendingBranch)) && y && !y.persisted;
        w && y.beforeEnter(p),
          n(p, t, o),
          ((h = m && m.onVnodeMounted) || w || _) &&
            no(() => {
              h && so(h, l, e), w && y.enter(p), _ && Kn(e, null, l, 'mounted');
            }, i);
      },
      L = (e, t, n, o, r) => {
        if ((n && p(e, n), o)) for (let s = 0; s < o.length; s++) p(e, o[s]);
        if (r) {
          if (t === r.subTree) {
            const t = r.vnode;
            L(e, t, t.scopeId, t.slotScopeIds, r.parent);
          }
        }
      },
      E = (e, t, n, o, r, s, l, i, c = 0) => {
        for (let a = c; a < e.length; a++) {
          const c = (e[a] = i ? Ro(e[a]) : Po(e[a]));
          v(null, c, t, n, o, r, s, l, i);
        }
      },
      A = (e, t, n, o, s, l, i) => {
        const c = (t.el = e.el);
        let { patchFlag: u, dynamicChildren: d, dirs: p } = t;
        u |= 16 & e.patchFlag;
        const f = e.props || b,
          h = t.props || b;
        let v;
        (v = h.onVnodeBeforeUpdate) && so(v, n, t, e),
          p && Kn(t, e, n, 'beforeUpdate');
        const m = s && 'foreignObject' !== t.type;
        if (
          (d
            ? M(e.dynamicChildren, d, c, n, o, m, l)
            : i || N(e, t, c, null, n, o, m, l, !1),
          u > 0)
        ) {
          if (16 & u) O(c, t, f, h, n, o, s);
          else if (
            (2 & u && f.class !== h.class && r(c, 'class', null, h.class, s),
            4 & u && r(c, 'style', f.style, h.style, s),
            8 & u)
          ) {
            const l = t.dynamicProps;
            for (let t = 0; t < l.length; t++) {
              const i = l[t],
                a = f[i],
                u = h[i];
              (u === a && 'value' !== i) ||
                r(c, i, a, u, s, e.children, n, o, Q);
            }
          }
          1 & u && e.children !== t.children && a(c, t.children);
        } else i || null != d || O(c, t, f, h, n, o, s);
        ((v = h.onVnodeUpdated) || p) &&
          no(() => {
            v && so(v, n, t, e), p && Kn(t, e, n, 'updated');
          }, o);
      },
      M = (e, t, n, o, r, s, l) => {
        for (let i = 0; i < t.length; i++) {
          const c = e[i],
            a = t[i],
            d =
              c.el && (c.type === uo || !ko(c, a) || 70 & c.shapeFlag)
                ? u(c.el)
                : n;
          v(c, a, d, null, o, r, s, l, !0);
        }
      },
      O = (e, t, n, o, s, l, i) => {
        if (n !== o) {
          for (const c in o) {
            if (z(c)) continue;
            const a = o[c],
              u = n[c];
            a !== u && 'value' !== c && r(e, c, u, a, i, t.children, s, l, Q);
          }
          if (n !== b)
            for (const c in n)
              z(c) || c in o || r(e, c, n[c], null, i, t.children, s, l, Q);
          'value' in o && r(e, 'value', n.value, o.value);
        }
      },
      F = (e, t, o, r, s, i, c, a, u) => {
        const d = (t.el = e ? e.el : l('')),
          p = (t.anchor = e ? e.anchor : l(''));
        let { patchFlag: f, dynamicChildren: h, slotScopeIds: v } = t;
        v && (a = a ? a.concat(v) : v),
          null == e
            ? (n(d, o, r), n(p, o, r), E(t.children, o, p, s, i, c, a, u))
            : f > 0 && 64 & f && h && e.dynamicChildren
            ? (M(e.dynamicChildren, h, o, s, i, c, a),
              (null != t.key || (s && t === s.subTree)) && lo(e, t, !0))
            : N(e, t, o, p, s, i, c, a, u);
      },
      P = (e, t, n, o, r, s, l, i, c) => {
        (t.slotScopeIds = i),
          null == e
            ? 512 & t.shapeFlag
              ? r.ctx.activate(t, n, o, l, c)
              : R(t, n, o, r, s, l, c)
            : I(e, t, c);
      },
      R = (e, t, n, o, r, s, l) => {
        const i = (e.component = (function (e, t, n) {
          const o = e.type,
            r = (t ? t.appContext : e.appContext) || Do,
            s = {
              uid: Wo++,
              vnode: e,
              type: o,
              parent: t,
              appContext: r,
              root: null,
              next: null,
              subTree: null,
              update: null,
              scope: new oe(!0),
              render: null,
              proxy: null,
              exposed: null,
              exposeProxy: null,
              withProxy: null,
              provides: t ? t.provides : Object.create(r.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: jn(o, r),
              emitsOptions: Ft(o, r),
              emit: null,
              emitted: null,
              propsDefaults: b,
              inheritAttrs: o.inheritAttrs,
              ctx: b,
              data: b,
              props: b,
              attrs: b,
              slots: b,
              refs: b,
              setupState: b,
              setupContext: null,
              suspense: n,
              suspenseId: n ? n.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
              sp: null,
            };
          (s.ctx = { _: s }),
            (s.root = t ? t.root : s),
            (s.emit = Ot.bind(null, s)),
            e.ce && e.ce(s);
          return s;
        })(e, o, r));
        if (
          (sn(e) && (i.ctx.renderer = re),
          (function (e, t = !1) {
            Xo = t;
            const { props: n, children: o } = e.vnode,
              r = Yo(e);
            Pn(e, n, r, t),
              ((e, t) => {
                if (32 & e.vnode.shapeFlag) {
                  const n = t._;
                  n ? ((e.slots = vt(t)), Z(t, '_', n)) : Wn(t, (e.slots = {}));
                } else (e.slots = {}), t && qn(e, t);
                Z(e.slots, So, 1);
              })(e, o);
            const s = r
              ? (function (e, t) {
                  const n = e.type;
                  (e.accessCache = Object.create(null)),
                    (e.proxy = mt(new Proxy(e.ctx, Ho)));
                  const { setup: o } = n;
                  if (o) {
                    const n = (e.setupContext =
                      o.length > 1
                        ? (function (e) {
                            const t = (t) => {
                              e.exposed = t || {};
                            };
                            let n;
                            return {
                              get attrs() {
                                return (
                                  n ||
                                  (n = (function (e) {
                                    return new Proxy(e.attrs, {
                                      get: (t, n) => (_e(e, 0, '$attrs'), t[n]),
                                    });
                                  })(e))
                                );
                              },
                              slots: e.slots,
                              emit: e.emit,
                              expose: t,
                            };
                          })(e)
                        : null);
                    Ko(e), ye();
                    const r = tr(o, e, 0, [e.props, n]);
                    if ((be(), Jo(), j(r))) {
                      if ((r.then(Jo, Jo), t))
                        return r
                          .then((n) => {
                            Zo(e, n, t);
                          })
                          .catch((t) => {
                            or(t, e, 0);
                          });
                      e.asyncDep = r;
                    } else Zo(e, r, t);
                  } else Qo(e, t);
                })(e, t)
              : void 0;
            Xo = !1;
          })(i),
          i.asyncDep)
        ) {
          if ((r && r.registerDep(i, B), !e.el)) {
            const e = (i.subTree = To(fo));
            g(null, e, t, n);
          }
        } else B(i, e, t, n, r, s, l);
      },
      I = (e, t, n) => {
        const o = (t.component = e.component);
        if (
          (function (e, t, n) {
            const { props: o, children: r, component: s } = e,
              { props: l, children: i, patchFlag: c } = t,
              a = s.emitsOptions;
            if (t.dirs || t.transition) return !0;
            if (!(n && c >= 0))
              return (
                !((!r && !i) || (i && i.$stable)) ||
                (o !== l && (o ? !l || Dt(o, l, a) : !!l))
              );
            if (1024 & c) return !0;
            if (16 & c) return o ? Dt(o, l, a) : !!l;
            if (8 & c) {
              const e = t.dynamicProps;
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                if (l[n] !== o[n] && !Pt(a, n)) return !0;
              }
            }
            return !1;
          })(e, t, n)
        ) {
          if (o.asyncDep && !o.asyncResolved) return void U(o, t, n);
          (o.next = t),
            (function (e) {
              const t = lr.indexOf(e);
              t > ir && lr.splice(t, 1);
            })(o.update),
            o.update();
        } else (t.component = e.component), (t.el = e.el), (o.vnode = t);
      },
      B = (e, t, n, o, r, s, l) => {
        const i = new he(
            () => {
              if (e.isMounted) {
                let t,
                  { next: n, bu: o, u: c, parent: a, vnode: d } = e,
                  p = n;
                (i.allowRecurse = !1),
                  n ? ((n.el = d.el), U(e, n, l)) : (n = d),
                  o && X(o),
                  (t = n.props && n.props.onVnodeBeforeUpdate) &&
                    so(t, a, n, d),
                  (i.allowRecurse = !0);
                const f = Vt(e),
                  h = e.subTree;
                (e.subTree = f),
                  v(h, f, u(h.el), te(h), e, r, s),
                  (n.el = f.el),
                  null === p &&
                    (function ({ vnode: e, parent: t }, n) {
                      for (; t && t.subTree === e; )
                        ((e = t.vnode).el = n), (t = t.parent);
                    })(e, f.el),
                  c && no(c, r),
                  (t = n.props && n.props.onVnodeUpdated) &&
                    no(() => so(t, a, n, d), r);
              } else {
                let l;
                const { el: c, props: a } = t,
                  { bm: u, m: d, parent: p } = e,
                  f = nn(t);
                if (
                  ((i.allowRecurse = !1),
                  u && X(u),
                  !f && (l = a && a.onVnodeBeforeMount) && so(l, p, t),
                  (i.allowRecurse = !0),
                  c && le)
                ) {
                  const n = () => {
                    (e.subTree = Vt(e)), le(c, e.subTree, e, r, null);
                  };
                  f
                    ? t.type.__asyncLoader().then(() => !e.isUnmounted && n())
                    : n();
                } else {
                  const l = (e.subTree = Vt(e));
                  v(null, l, n, o, e, r, s), (t.el = l.el);
                }
                if ((d && no(d, r), !f && (l = a && a.onVnodeMounted))) {
                  const e = t;
                  no(() => so(l, p, e), r);
                }
                256 & t.shapeFlag && e.a && no(e.a, r),
                  (e.isMounted = !0),
                  (t = n = o = null);
              }
            },
            () => yr(e.update),
            e.scope,
          ),
          c = (e.update = i.run.bind(i));
        (c.id = e.uid), (i.allowRecurse = c.allowRecurse = !0), c();
      },
      U = (e, t, n) => {
        t.component = e;
        const o = e.vnode.props;
        (e.vnode = t),
          (e.next = null),
          (function (e, t, n, o) {
            const {
                props: r,
                attrs: s,
                vnode: { patchFlag: l },
              } = e,
              i = vt(r),
              [c] = e.propsOptions;
            let a = !1;
            if (!(o || l > 0) || 16 & l) {
              let o;
              Rn(e, t, r, s) && (a = !0);
              for (const s in i)
                (t && (T(t, s) || ((o = G(s)) !== s && T(t, o)))) ||
                  (c
                    ? !n ||
                      (void 0 === n[s] && void 0 === n[o]) ||
                      (r[s] = In(c, i, s, void 0, e, !0))
                    : delete r[s]);
              if (s !== i)
                for (const e in s) (t && T(t, e)) || (delete s[e], (a = !0));
            } else if (8 & l) {
              const n = e.vnode.dynamicProps;
              for (let o = 0; o < n.length; o++) {
                let l = n[o];
                const u = t[l];
                if (c)
                  if (T(s, l)) u !== s[l] && ((s[l] = u), (a = !0));
                  else {
                    const t = W(l);
                    r[t] = In(c, i, t, u, e, !1);
                  }
                else u !== s[l] && ((s[l] = u), (a = !0));
              }
            }
            a && Ce(e, 'set', '$attrs');
          })(e, t.props, o, n),
          ((e, t, n) => {
            const { vnode: o, slots: r } = e;
            let s = !0,
              l = b;
            if (32 & o.shapeFlag) {
              const e = t._;
              e
                ? n && 1 === e
                  ? (s = !1)
                  : ($(r, t), n || 1 !== e || delete r._)
                : ((s = !t.$stable), Wn(t, r)),
                (l = t);
            } else t && (qn(e, t), (l = { default: 1 }));
            if (s) for (const i in r) zn(i) || i in l || delete r[i];
          })(e, t.children, n),
          ye(),
          wr(void 0, e.update),
          be();
      },
      N = (e, t, n, o, r, s, l, i, c = !1) => {
        const u = e && e.children,
          d = e ? e.shapeFlag : 0,
          p = t.children,
          { patchFlag: f, shapeFlag: h } = t;
        if (f > 0) {
          if (128 & f) return void H(u, p, n, o, r, s, l, i, c);
          if (256 & f) return void V(u, p, n, o, r, s, l, i, c);
        }
        8 & h
          ? (16 & d && Q(u, r, s), p !== u && a(n, p))
          : 16 & d
          ? 16 & h
            ? H(u, p, n, o, r, s, l, i, c)
            : Q(u, r, s, !0)
          : (8 & d && a(n, ''), 16 & h && E(p, n, o, r, s, l, i, c));
      },
      V = (e, t, n, o, r, s, l, i, c) => {
        t = t || _;
        const a = (e = e || _).length,
          u = t.length,
          d = Math.min(a, u);
        let p;
        for (p = 0; p < d; p++) {
          const o = (t[p] = c ? Ro(t[p]) : Po(t[p]));
          v(e[p], o, n, null, r, s, l, i, c);
        }
        a > u ? Q(e, r, s, !0, !1, d) : E(t, n, o, r, s, l, i, c, d);
      },
      H = (e, t, n, o, r, s, l, i, c) => {
        let a = 0;
        const u = t.length;
        let d = e.length - 1,
          p = u - 1;
        for (; a <= d && a <= p; ) {
          const o = e[a],
            u = (t[a] = c ? Ro(t[a]) : Po(t[a]));
          if (!ko(o, u)) break;
          v(o, u, n, null, r, s, l, i, c), a++;
        }
        for (; a <= d && a <= p; ) {
          const o = e[d],
            a = (t[p] = c ? Ro(t[p]) : Po(t[p]));
          if (!ko(o, a)) break;
          v(o, a, n, null, r, s, l, i, c), d--, p--;
        }
        if (a > d) {
          if (a <= p) {
            const e = p + 1,
              d = e < u ? t[e].el : o;
            for (; a <= p; )
              v(null, (t[a] = c ? Ro(t[a]) : Po(t[a])), n, d, r, s, l, i, c),
                a++;
          }
        } else if (a > p) for (; a <= d; ) q(e[a], r, s, !0), a++;
        else {
          const f = a,
            h = a,
            m = new Map();
          for (a = h; a <= p; a++) {
            const e = (t[a] = c ? Ro(t[a]) : Po(t[a]));
            null != e.key && m.set(e.key, a);
          }
          let g,
            y = 0;
          const b = p - h + 1;
          let w = !1,
            x = 0;
          const C = new Array(b);
          for (a = 0; a < b; a++) C[a] = 0;
          for (a = f; a <= d; a++) {
            const o = e[a];
            if (y >= b) {
              q(o, r, s, !0);
              continue;
            }
            let u;
            if (null != o.key) u = m.get(o.key);
            else
              for (g = h; g <= p; g++)
                if (0 === C[g - h] && ko(o, t[g])) {
                  u = g;
                  break;
                }
            void 0 === u
              ? q(o, r, s, !0)
              : ((C[u - h] = a + 1),
                u >= x ? (x = u) : (w = !0),
                v(o, t[u], n, null, r, s, l, i, c),
                y++);
          }
          const k = w
            ? (function (e) {
                const t = e.slice(),
                  n = [0];
                let o, r, s, l, i;
                const c = e.length;
                for (o = 0; o < c; o++) {
                  const c = e[o];
                  if (0 !== c) {
                    if (((r = n[n.length - 1]), e[r] < c)) {
                      (t[o] = r), n.push(o);
                      continue;
                    }
                    for (s = 0, l = n.length - 1; s < l; )
                      (i = (s + l) >> 1), e[n[i]] < c ? (s = i + 1) : (l = i);
                    c < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), (n[s] = o));
                  }
                }
                (s = n.length), (l = n[s - 1]);
                for (; s-- > 0; ) (n[s] = l), (l = t[l]);
                return n;
              })(C)
            : _;
          for (g = k.length - 1, a = b - 1; a >= 0; a--) {
            const e = h + a,
              d = t[e],
              p = e + 1 < u ? t[e + 1].el : o;
            0 === C[a]
              ? v(null, d, n, p, r, s, l, i, c)
              : w && (g < 0 || a !== k[g] ? D(d, n, p, 2) : g--);
          }
        }
      },
      D = (e, t, o, r, s = null) => {
        const { el: l, type: i, transition: c, children: a, shapeFlag: u } = e;
        if (6 & u) return void D(e.component.subTree, t, o, r);
        if (128 & u) return void e.suspense.move(t, o, r);
        if (64 & u) return void i.move(e, t, o, re);
        if (i === uo) {
          n(l, t, o);
          for (let e = 0; e < a.length; e++) D(a[e], t, o, r);
          return void n(e.anchor, t, o);
        }
        if (i === ho) return void x(e, t, o);
        if (2 !== r && 1 & u && c)
          if (0 === r) c.beforeEnter(l), n(l, t, o), no(() => c.enter(l), s);
          else {
            const { leave: e, delayLeave: r, afterLeave: s } = c,
              i = () => n(l, t, o),
              a = () => {
                e(l, () => {
                  i(), s && s();
                });
              };
            r ? r(l, i, a) : a();
          }
        else n(l, t, o);
      },
      q = (e, t, n, o = !1, r = !1) => {
        const {
          type: s,
          props: l,
          ref: i,
          children: c,
          dynamicChildren: a,
          shapeFlag: u,
          patchFlag: d,
          dirs: p,
        } = e;
        if ((null != i && ro(i, null, n, e, !0), 256 & u))
          return void t.ctx.deactivate(e);
        const f = 1 & u && p,
          h = !nn(e);
        let v;
        if ((h && (v = l && l.onVnodeBeforeUnmount) && so(v, t, e), 6 & u))
          Y(e.component, n, o);
        else {
          if (128 & u) return void e.suspense.unmount(n, o);
          f && Kn(e, null, t, 'beforeUnmount'),
            64 & u
              ? e.type.remove(e, t, n, r, re, o)
              : a && (s !== uo || (d > 0 && 64 & d))
              ? Q(a, t, n, !1, !0)
              : ((s === uo && 384 & d) || (!r && 16 & u)) && Q(c, t, n),
            o && K(e);
        }
        ((h && (v = l && l.onVnodeUnmounted)) || f) &&
          no(() => {
            v && so(v, t, e), f && Kn(e, null, t, 'unmounted');
          }, n);
      },
      K = (e) => {
        const { type: t, el: n, anchor: r, transition: s } = e;
        if (t === uo) return void J(n, r);
        if (t === ho) return void C(e);
        const l = () => {
          o(n), s && !s.persisted && s.afterLeave && s.afterLeave();
        };
        if (1 & e.shapeFlag && s && !s.persisted) {
          const { leave: t, delayLeave: o } = s,
            r = () => t(n, l);
          o ? o(e.el, l, r) : r();
        } else l();
      },
      J = (e, t) => {
        let n;
        for (; e !== t; ) (n = d(e)), o(e), (e = n);
        o(t);
      },
      Y = (e, t, n) => {
        const { bum: o, scope: r, update: s, subTree: l, um: i } = e;
        o && X(o),
          r.stop(),
          s && ((s.active = !1), q(l, e, t, n)),
          i && no(i, t),
          no(() => {
            e.isUnmounted = !0;
          }, t),
          t &&
            t.pendingBranch &&
            !t.isUnmounted &&
            e.asyncDep &&
            !e.asyncResolved &&
            e.suspenseId === t.pendingId &&
            (t.deps--, 0 === t.deps && t.resolve());
      },
      Q = (e, t, n, o = !1, r = !1, s = 0) => {
        for (let l = s; l < e.length; l++) q(e[l], t, n, o, r);
      },
      te = (e) =>
        6 & e.shapeFlag
          ? te(e.component.subTree)
          : 128 & e.shapeFlag
          ? e.suspense.next()
          : d(e.anchor || e.el),
      ne = (e, t, n) => {
        null == e
          ? t._vnode && q(t._vnode, null, null, !0)
          : v(t._vnode || null, e, t, null, null, null, n),
          xr(),
          (t._vnode = e);
      },
      re = {
        p: v,
        um: q,
        m: D,
        r: K,
        mt: R,
        mc: E,
        pc: N,
        pbc: M,
        n: te,
        o: e,
      };
    let se, le;
    t && ([se, le] = t(re));
    return { render: ne, hydrate: se, createApp: Xn(ne, se) };
  })(e, to);
}
function ro(e, t, n, o, r = !1) {
  if (A(e))
    return void e.forEach((e, s) => ro(e, t && (A(t) ? t[s] : t), n, o, r));
  if (nn(o) && !r) return;
  const s = 4 & o.shapeFlag ? er(o.component) || o.component.proxy : o.el,
    l = r ? null : s,
    { i: i, r: c } = e,
    a = t && t.r,
    u = i.refs === b ? (i.refs = {}) : i.refs,
    d = i.setupState;
  if (
    (null != a &&
      a !== c &&
      (P(a)
        ? ((u[a] = null), T(d, a) && (d[a] = null))
        : wt(a) && (a.value = null)),
    P(c))
  ) {
    const e = () => {
      (u[c] = l), T(d, c) && (d[c] = l);
    };
    l ? ((e.id = -1), no(e, n)) : e();
  } else if (wt(c)) {
    const e = () => {
      c.value = l;
    };
    l ? ((e.id = -1), no(e, n)) : e();
  } else F(c) && tr(c, i, 12, [l, u]);
}
function so(e, t, n, o = null) {
  nr(e, t, 7, [n, o]);
}
function lo(e, t, n = !1) {
  const o = e.children,
    r = t.children;
  if (A(o) && A(r))
    for (let s = 0; s < o.length; s++) {
      const e = o[s];
      let t = r[s];
      1 & t.shapeFlag &&
        !t.dynamicChildren &&
        ((t.patchFlag <= 0 || 32 === t.patchFlag) &&
          ((t = r[s] = Ro(r[s])), (t.el = e.el)),
        n || lo(e, t));
    }
}
function io(e, t) {
  return (
    (function (e, t, n = !0, o = !1) {
      const r = Rt || qo;
      if (r) {
        const n = r.type;
        if ('components' === e) {
          const e = (function (e) {
            return (F(e) && e.displayName) || e.name;
          })(n);
          if (e && (e === t || e === W(t) || e === K(W(t)))) return n;
        }
        const s = ao(r[e] || n[e], t) || ao(r.appContext[e], t);
        return !s && o ? n : s;
      }
    })('components', e, !0, t) || e
  );
}
const co = Symbol();
function ao(e, t) {
  return e && (e[t] || e[W(t)] || e[K(W(t))]);
}
const uo = Symbol(void 0),
  po = Symbol(void 0),
  fo = Symbol(void 0),
  ho = Symbol(void 0),
  vo = [];
let mo = null;
function go(e = !1) {
  vo.push((mo = e ? null : []));
}
let yo = 1;
function bo(e) {
  yo += e;
}
function _o(e) {
  return (
    (e.dynamicChildren = yo > 0 ? mo || _ : null),
    vo.pop(),
    (mo = vo[vo.length - 1] || null),
    yo > 0 && mo && mo.push(e),
    e
  );
}
function wo(e, t, n, o, r, s) {
  return _o(Eo(e, t, n, o, r, s, !0));
}
function xo(e, t, n, o, r) {
  return _o(To(e, t, n, o, r, !0));
}
function Co(e) {
  return !!e && !0 === e.__v_isVNode;
}
function ko(e, t) {
  return e.type === t.type && e.key === t.key;
}
const So = '__vInternal',
  $o = ({ key: e }) => (null != e ? e : null),
  Lo = ({ ref: e }) =>
    null != e ? (P(e) || wt(e) || F(e) ? { i: Rt, r: e } : e) : null;
function Eo(
  e,
  t = null,
  n = null,
  o = 0,
  r = null,
  s = e === uo ? 0 : 1,
  l = !1,
  i = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && $o(t),
    ref: t && Lo(t),
    scopeId: It,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    i
      ? (Io(c, n), 128 & s && e.normalize(c))
      : n && (c.shapeFlag |= P(n) ? 8 : 16),
    yo > 0 &&
      !l &&
      mo &&
      (c.patchFlag > 0 || 6 & s) &&
      32 !== c.patchFlag &&
      mo.push(c),
    c
  );
}
const To = function (e, t = null, n = null, o = 0, r = null, s = !1) {
  (e && e !== co) || (e = fo);
  if (Co(e)) {
    const o = Ao(e, t, !0);
    return n && Io(o, n), o;
  }
  (l = e), F(l) && '__vccOpts' in l && (e = e.__vccOpts);
  var l;
  if (t) {
    t = (function (e) {
      return e ? (ht(e) || So in e ? $({}, e) : e) : null;
    })(t);
    let { class: e, style: n } = t;
    e && !P(e) && (t.class = m(e)),
      I(n) && (ht(n) && !A(n) && (n = $({}, n)), (t.style = p(n)));
  }
  const i = P(e)
    ? 1
    : ((e) => e.__isSuspense)(e)
    ? 128
    : ((e) => e.__isTeleport)(e)
    ? 64
    : I(e)
    ? 4
    : F(e)
    ? 2
    : 0;
  return Eo(e, t, n, o, r, i, s, !0);
};
function Ao(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: l } = e,
    i = t ? jo(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && $o(i),
    ref:
      t && t.ref ? (n && r ? (A(r) ? r.concat(Lo(t)) : [r, Lo(t)]) : Lo(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== uo ? (-1 === s ? 16 : 16 | s) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ao(e.ssContent),
    ssFallback: e.ssFallback && Ao(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Mo(e = ' ', t = 0) {
  return To(po, null, e, t);
}
function Oo(e, t) {
  const n = To(ho, null, e);
  return (n.staticCount = t), n;
}
function Fo(e = '', t = !1) {
  return t ? (go(), xo(fo, null, e)) : To(fo, null, e);
}
function Po(e) {
  return null == e || 'boolean' == typeof e
    ? To(fo)
    : A(e)
    ? To(uo, null, e.slice())
    : 'object' == typeof e
    ? Ro(e)
    : To(po, null, String(e));
}
function Ro(e) {
  return null === e.el || e.memo ? e : Ao(e);
}
function Io(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (null == t) t = null;
  else if (A(t)) n = 16;
  else if ('object' == typeof t) {
    if (65 & o) {
      const n = t.default;
      return void (n && (n._c && (n._d = !1), Io(e, n()), n._c && (n._d = !0)));
    }
    {
      n = 32;
      const o = t._;
      o || So in t
        ? 3 === o &&
          Rt &&
          (1 === Rt.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
        : (t._ctx = Rt);
    }
  } else
    F(t)
      ? ((t = { default: t, _ctx: Rt }), (n = 32))
      : ((t = String(t)), 64 & o ? ((n = 16), (t = [Mo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function jo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const e in o)
      if ('class' === e)
        t.class !== o.class && (t.class = m([t.class, o.class]));
      else if ('style' === e) t.style = p([t.style, o.style]);
      else if (k(e)) {
        const n = t[e],
          r = o[e];
        n !== r && (t[e] = n ? [].concat(n, r) : r);
      } else '' !== e && (t[e] = o[e]);
  }
  return t;
}
function Bo(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (A(e) || P(e)) {
    r = new Array(e.length);
    for (let n = 0, o = e.length; n < o; n++)
      r[n] = t(e[n], n, void 0, s && s[n]);
  } else if ('number' == typeof e) {
    r = new Array(e);
    for (let n = 0; n < e; n++) r[n] = t(n + 1, n, void 0, s && s[n]);
  } else if (I(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (e, n) => t(e, n, void 0, s && s[n]));
    else {
      const n = Object.keys(e);
      r = new Array(n.length);
      for (let o = 0, l = n.length; o < l; o++) {
        const l = n[o];
        r[o] = t(e[l], l, o, s && s[o]);
      }
    }
  else r = [];
  return n && (n[o] = r), r;
}
function Uo(e, t, n = {}, o, r) {
  if (Rt.isCE)
    return To('slot', 'default' === t ? null : { name: t }, o && o());
  let s = e[t];
  s && s._c && (s._d = !1), go();
  const l = s && No(s(n)),
    i = xo(
      uo,
      { key: n.key || `_${t}` },
      l || (o ? o() : []),
      l && 1 === e._ ? 64 : -2,
    );
  return (
    !r && i.scopeId && (i.slotScopeIds = [i.scopeId + '-s']),
    s && s._c && (s._d = !0),
    i
  );
}
function No(e) {
  return e.some(
    (e) => !Co(e) || (e.type !== fo && !(e.type === uo && !No(e.children))),
  )
    ? e
    : null;
}
const Vo = (e) => (e ? (Yo(e) ? er(e) || e.proxy : Vo(e.parent)) : null),
  zo = $(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Vo(e.parent),
    $root: (e) => Vo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ln(e),
    $forceUpdate: (e) => () => yr(e.update),
    $nextTick: (e) => gr.bind(e.proxy),
    $watch: (e) => Er.bind(e),
  }),
  Ho = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: r,
        props: s,
        accessCache: l,
        type: i,
        appContext: c,
      } = e;
      let a;
      if ('$' !== t[0]) {
        const i = l[t];
        if (void 0 !== i)
          switch (i) {
            case 0:
              return o[t];
            case 1:
              return r[t];
            case 3:
              return n[t];
            case 2:
              return s[t];
          }
        else {
          if (o !== b && T(o, t)) return (l[t] = 0), o[t];
          if (r !== b && T(r, t)) return (l[t] = 1), r[t];
          if ((a = e.propsOptions[0]) && T(a, t)) return (l[t] = 2), s[t];
          if (n !== b && T(n, t)) return (l[t] = 3), n[t];
          Cn && (l[t] = 4);
        }
      }
      const u = zo[t];
      let d, p;
      return u
        ? ('$attrs' === t && _e(e, 0, t), u(e))
        : (d = i.__cssModules) && (d = d[t])
        ? d
        : n !== b && T(n, t)
        ? ((l[t] = 3), n[t])
        : ((p = c.config.globalProperties), T(p, t) ? p[t] : void 0);
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: r, ctx: s } = e;
      if (r !== b && T(r, t)) r[t] = n;
      else if (o !== b && T(o, t)) o[t] = n;
      else if (T(e.props, t)) return !1;
      return ('$' !== t[0] || !(t.slice(1) in e)) && ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: r,
          propsOptions: s,
        },
      },
      l,
    ) {
      let i;
      return (
        void 0 !== n[l] ||
        (e !== b && T(e, l)) ||
        (t !== b && T(t, l)) ||
        ((i = s[0]) && T(i, l)) ||
        T(o, l) ||
        T(zo, l) ||
        T(r.config.globalProperties, l)
      );
    },
  },
  Do = Jn();
let Wo = 0;
let qo = null;
const Go = () => qo || Rt,
  Ko = (e) => {
    (qo = e), e.scope.on();
  },
  Jo = () => {
    qo && qo.scope.off(), (qo = null);
  };
function Yo(e) {
  return 4 & e.vnode.shapeFlag;
}
let Xo = !1;
function Zo(e, t, n) {
  F(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : I(t) && (e.setupState = $t(t)),
    Qo(e, n);
}
function Qo(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || w), Ko(e), ye(), kn(e), be(), Jo();
}
function er(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy($t(mt(e.exposed)), {
        get: (t, n) => (n in t ? t[n] : n in zo ? zo[n](e) : void 0),
      }))
    );
}
function tr(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    or(s, t, n);
  }
  return r;
}
function nr(e, t, n, o) {
  if (F(e)) {
    const r = tr(e, t, n, o);
    return (
      r &&
        j(r) &&
        r.catch((e) => {
          or(e, t, n);
        }),
      r
    );
  }
  const r = [];
  for (let s = 0; s < e.length; s++) r.push(nr(e[s], t, n, o));
  return r;
}
function or(e, t, n, o = !0) {
  t && t.vnode;
  if (t) {
    let o = t.parent;
    const r = t.proxy,
      s = n;
    for (; o; ) {
      const t = o.ec;
      if (t)
        for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, s)) return;
      o = o.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) return void tr(l, null, 10, [e, r, s]);
  }
  !(function (e, t, n, o = !0) {
    console.error(e);
  })(e, 0, 0, o);
}
let rr = !1,
  sr = !1;
const lr = [];
let ir = 0;
const cr = [];
let ar = null,
  ur = 0;
const dr = [];
let pr = null,
  fr = 0;
const hr = Promise.resolve();
let vr = null,
  mr = null;
function gr(e) {
  const t = vr || hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yr(e) {
  (lr.length && lr.includes(e, rr && e.allowRecurse ? ir + 1 : ir)) ||
    e === mr ||
    (null == e.id
      ? lr.push(e)
      : lr.splice(
          (function (e) {
            let t = ir + 1,
              n = lr.length;
            for (; t < n; ) {
              const o = (t + n) >>> 1;
              Cr(lr[o]) < e ? (t = o + 1) : (n = o);
            }
            return t;
          })(e.id),
          0,
          e,
        ),
    br());
}
function br() {
  rr || sr || ((sr = !0), (vr = hr.then(kr)));
}
function _r(e, t, n, o) {
  A(e)
    ? n.push(...e)
    : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e),
    br();
}
function wr(e, t = null) {
  if (cr.length) {
    for (
      mr = t, ar = [...new Set(cr)], cr.length = 0, ur = 0;
      ur < ar.length;
      ur++
    )
      ar[ur]();
    (ar = null), (ur = 0), (mr = null), wr(e, t);
  }
}
function xr(e) {
  if (dr.length) {
    const e = [...new Set(dr)];
    if (((dr.length = 0), pr)) return void pr.push(...e);
    for (pr = e, pr.sort((e, t) => Cr(e) - Cr(t)), fr = 0; fr < pr.length; fr++)
      pr[fr]();
    (pr = null), (fr = 0);
  }
}
const Cr = (e) => (null == e.id ? 1 / 0 : e.id);
function kr(e) {
  (sr = !1), (rr = !0), wr(e), lr.sort((e, t) => Cr(e) - Cr(t));
  try {
    for (ir = 0; ir < lr.length; ir++) {
      const e = lr[ir];
      e && !1 !== e.active && tr(e, null, 14);
    }
  } finally {
    (ir = 0),
      (lr.length = 0),
      xr(),
      (rr = !1),
      (vr = null),
      (lr.length || cr.length || dr.length) && kr(e);
  }
}
const Sr = {};
function $r(e, t, n) {
  return Lr(e, t, n);
}
function Lr(
  e,
  t,
  { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: l } = b,
) {
  const i = qo;
  let c,
    a,
    u = !1,
    d = !1;
  if (
    (wt(e)
      ? ((c = () => e.value), (u = !!e._shallow))
      : pt(e)
      ? ((c = () => e), (o = !0))
      : A(e)
      ? ((d = !0),
        (u = e.some(pt)),
        (c = () =>
          e.map((e) =>
            wt(e) ? e.value : pt(e) ? Ar(e) : F(e) ? tr(e, i, 2) : void 0,
          )))
      : (c = F(e)
          ? t
            ? () => tr(e, i, 2)
            : () => {
                if (!i || !i.isUnmounted) return a && a(), nr(e, i, 3, [p]);
              }
          : w),
    t && o)
  ) {
    const e = c;
    c = () => Ar(e());
  }
  let p = (e) => {
    a = m.onStop = () => {
      tr(e, i, 4);
    };
  };
  if (Xo)
    return (p = w), t ? n && nr(t, i, 3, [c(), d ? [] : void 0, p]) : c(), w;
  let f = d ? [] : Sr;
  const h = () => {
    if (m.active)
      if (t) {
        const e = m.run();
        (o || u || (d ? e.some((e, t) => Y(e, f[t])) : Y(e, f))) &&
          (a && a(), nr(t, i, 3, [e, f === Sr ? void 0 : f, p]), (f = e));
      } else m.run();
  };
  let v;
  (h.allowRecurse = !!t),
    (v =
      'sync' === r
        ? h
        : 'post' === r
        ? () => no(h, i && i.suspense)
        : () => {
            !i || i.isMounted
              ? (function (e) {
                  _r(e, ar, cr, ur);
                })(h)
              : h();
          });
  const m = new he(c, v);
  return (
    t
      ? n
        ? h()
        : (f = m.run())
      : 'post' === r
      ? no(m.run.bind(m), i && i.suspense)
      : m.run(),
    () => {
      m.stop(), i && i.scope && L(i.scope.effects, m);
    }
  );
}
function Er(e, t, n) {
  const o = this.proxy,
    r = P(e) ? (e.includes('.') ? Tr(o, e) : () => o[e]) : e.bind(o, o);
  let s;
  F(t) ? (s = t) : ((s = t.handler), (n = t));
  const l = qo;
  Ko(this);
  const i = Lr(r, s.bind(o), n);
  return l ? Ko(l) : Jo(), i;
}
function Tr(e, t) {
  const n = t.split('.');
  return () => {
    let t = e;
    for (let e = 0; e < n.length && t; e++) t = t[n[e]];
    return t;
  };
}
function Ar(e, t) {
  if (!I(e) || e.__v_skip) return e;
  if ((t = t || new Set()).has(e)) return e;
  if ((t.add(e), wt(e))) Ar(e.value, t);
  else if (A(e)) for (let n = 0; n < e.length; n++) Ar(e[n], t);
  else if (O(e) || M(e))
    e.forEach((e) => {
      Ar(e, t);
    });
  else if (N(e)) for (const n in e) Ar(e[n], t);
  return e;
}
function Mr(e, t, n) {
  const o = arguments.length;
  return 2 === o
    ? I(t) && !A(t)
      ? Co(t)
        ? To(e, null, [t])
        : To(e, t)
      : To(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : 3 === o && Co(n) && (n = [n]),
      To(e, t, n));
}
const Or = '3.2.21',
  Fr = 'undefined' != typeof document ? document : null,
  Pr = new Map(),
  Rr = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, o) => {
      const r = t
        ? Fr.createElementNS('http://www.w3.org/2000/svg', e)
        : Fr.createElement(e, n ? { is: n } : void 0);
      return (
        'select' === e &&
          o &&
          null != o.multiple &&
          r.setAttribute('multiple', o.multiple),
        r
      );
    },
    createText: (e) => Fr.createTextNode(e),
    createComment: (e) => Fr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Fr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return '_value' in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, o) {
      const r = n ? n.previousSibling : t.lastChild;
      let s = Pr.get(e);
      if (!s) {
        const t = Fr.createElement('template');
        if (((t.innerHTML = o ? `<svg>${e}</svg>` : e), (s = t.content), o)) {
          const e = s.firstChild;
          for (; e.firstChild; ) s.appendChild(e.firstChild);
          s.removeChild(e);
        }
        Pr.set(e, s);
      }
      return (
        t.insertBefore(s.cloneNode(!0), n),
        [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      );
    },
  };
const Ir = /\s*!important$/;
function jr(e, t, n) {
  if (A(n)) n.forEach((n) => jr(e, t, n));
  else if (t.startsWith('--')) e.setProperty(t, n);
  else {
    const o = (function (e, t) {
      const n = Ur[t];
      if (n) return n;
      let o = W(t);
      if ('filter' !== o && o in e) return (Ur[t] = o);
      o = K(o);
      for (let r = 0; r < Br.length; r++) {
        const n = Br[r] + o;
        if (n in e) return (Ur[t] = n);
      }
      return t;
    })(e, t);
    Ir.test(n)
      ? e.setProperty(G(o), n.replace(Ir, ''), 'important')
      : (e[o] = n);
  }
}
const Br = ['Webkit', 'Moz', 'ms'],
  Ur = {};
const Nr = 'http://www.w3.org/1999/xlink';
let Vr = Date.now,
  zr = !1;
if ('undefined' != typeof window) {
  Vr() > document.createEvent('Event').timeStamp &&
    (Vr = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  zr = !!(e && Number(e[1]) <= 53);
}
let Hr = 0;
const Dr = Promise.resolve(),
  Wr = () => {
    Hr = 0;
  };
function qr(e, t, n, o, r = null) {
  const s = e._vei || (e._vei = {}),
    l = s[t];
  if (o && l) l.value = o;
  else {
    const [n, i] = (function (e) {
      let t;
      if (Gr.test(e)) {
        let n;
        for (t = {}; (n = e.match(Gr)); )
          (e = e.slice(0, e.length - n[0].length)),
            (t[n[0].toLowerCase()] = !0);
      }
      return [G(e.slice(2)), t];
    })(t);
    if (o) {
      !(function (e, t, n, o) {
        e.addEventListener(t, n, o);
      })(
        e,
        n,
        (s[t] = (function (e, t) {
          const n = (e) => {
            const o = e.timeStamp || Vr();
            (zr || o >= n.attached - 1) &&
              nr(
                (function (e, t) {
                  if (A(t)) {
                    const n = e.stopImmediatePropagation;
                    return (
                      (e.stopImmediatePropagation = () => {
                        n.call(e), (e._stopped = !0);
                      }),
                      t.map((e) => (t) => !t._stopped && e(t))
                    );
                  }
                  return t;
                })(e, n.value),
                t,
                5,
                [e],
              );
          };
          return (
            (n.value = e),
            (n.attached = (() => Hr || (Dr.then(Wr), (Hr = Vr())))()),
            n
          );
        })(o, r)),
        i,
      );
    } else
      l &&
        (!(function (e, t, n, o) {
          e.removeEventListener(t, n, o);
        })(e, n, l, i),
        (s[t] = void 0));
  }
}
const Gr = /(?:Once|Passive|Capture)$/;
const Kr = /^on[a-z]/;
const Jr = 'transition',
  Yr = (e, { slots: t }) =>
    Mr(
      Kt,
      (function (e) {
        const t = {};
        for (const $ in e) $ in Xr || (t[$] = e[$]);
        if (!1 === e.css) return t;
        const {
            name: n = 'v',
            type: o,
            duration: r,
            enterFromClass: s = `${n}-enter-from`,
            enterActiveClass: l = `${n}-enter-active`,
            enterToClass: i = `${n}-enter-to`,
            appearFromClass: c = s,
            appearActiveClass: a = l,
            appearToClass: u = i,
            leaveFromClass: d = `${n}-leave-from`,
            leaveActiveClass: p = `${n}-leave-active`,
            leaveToClass: f = `${n}-leave-to`,
          } = e,
          h = (function (e) {
            if (null == e) return null;
            if (I(e)) return [es(e.enter), es(e.leave)];
            {
              const t = es(e);
              return [t, t];
            }
          })(r),
          v = h && h[0],
          m = h && h[1],
          {
            onBeforeEnter: g,
            onEnter: y,
            onEnterCancelled: b,
            onLeave: _,
            onLeaveCancelled: w,
            onBeforeAppear: x = g,
            onAppear: C = y,
            onAppearCancelled: k = b,
          } = t,
          S = (e, t, n) => {
            ns(e, t ? u : i), ns(e, t ? a : l), n && n();
          },
          L = (e, t) => {
            ns(e, f), ns(e, p), t && t();
          },
          E = (e) => (t, n) => {
            const r = e ? C : y,
              l = () => S(t, e, n);
            Zr(r, [t, l]),
              os(() => {
                ns(t, e ? c : s), ts(t, e ? u : i), Qr(r) || ss(t, o, v, l);
              });
          };
        return $(t, {
          onBeforeEnter(e) {
            Zr(g, [e]), ts(e, s), ts(e, l);
          },
          onBeforeAppear(e) {
            Zr(x, [e]), ts(e, c), ts(e, a);
          },
          onEnter: E(!1),
          onAppear: E(!0),
          onLeave(e, t) {
            const n = () => L(e, t);
            ts(e, d),
              document.body.offsetHeight,
              ts(e, p),
              os(() => {
                ns(e, d), ts(e, f), Qr(_) || ss(e, o, m, n);
              }),
              Zr(_, [e, n]);
          },
          onEnterCancelled(e) {
            S(e, !1), Zr(b, [e]);
          },
          onAppearCancelled(e) {
            S(e, !0), Zr(k, [e]);
          },
          onLeaveCancelled(e) {
            L(e), Zr(w, [e]);
          },
        });
      })(e),
      t,
    );
Yr.displayName = 'Transition';
const Xr = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Yr.props = $({}, Kt.props, Xr);
const Zr = (e, t = []) => {
    A(e) ? e.forEach((e) => e(...t)) : e && e(...t);
  },
  Qr = (e) => !!e && (A(e) ? e.some((e) => e.length > 1) : e.length > 1);
function es(e) {
  return Q(e);
}
function ts(e, t) {
  t.split(/\s+/).forEach((t) => t && e.classList.add(t)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function ns(e, t) {
  t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function os(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let rs = 0;
function ss(e, t, n, o) {
  const r = (e._endId = ++rs),
    s = () => {
      r === e._endId && o();
    };
  if (n) return setTimeout(s, n);
  const {
    type: l,
    timeout: i,
    propCount: c,
  } = (function (e, t) {
    const n = window.getComputedStyle(e),
      o = (e) => (n[e] || '').split(', '),
      r = o('transitionDelay'),
      s = o('transitionDuration'),
      l = ls(r, s),
      i = o('animationDelay'),
      c = o('animationDuration'),
      a = ls(i, c);
    let u = null,
      d = 0,
      p = 0;
    t === Jr
      ? l > 0 && ((u = Jr), (d = l), (p = s.length))
      : 'animation' === t
      ? a > 0 && ((u = 'animation'), (d = a), (p = c.length))
      : ((d = Math.max(l, a)),
        (u = d > 0 ? (l > a ? Jr : 'animation') : null),
        (p = u ? (u === Jr ? s.length : c.length) : 0));
    const f = u === Jr && /\b(transform|all)(,|$)/.test(n.transitionProperty);
    return { type: u, timeout: d, propCount: p, hasTransform: f };
  })(e, t);
  if (!l) return o();
  const a = l + 'end';
  let u = 0;
  const d = () => {
      e.removeEventListener(a, p), s();
    },
    p = (t) => {
      t.target === e && ++u >= c && d();
    };
  setTimeout(() => {
    u < c && d();
  }, i + 1),
    e.addEventListener(a, p);
}
function ls(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((t, n) => is(t) + is(e[n])));
}
function is(e) {
  return 1e3 * Number(e.slice(0, -1).replace(',', '.'));
}
const cs = {
  beforeMount(e, { value: t }, { transition: n }) {
    (e._vod = 'none' === e.style.display ? '' : e.style.display),
      n && t ? n.beforeEnter(e) : as(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n &&
      (o
        ? t
          ? (o.beforeEnter(e), as(e, !0), o.enter(e))
          : o.leave(e, () => {
              as(e, !1);
            })
        : as(e, t));
  },
  beforeUnmount(e, { value: t }) {
    as(e, t);
  },
};
function as(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const us = $(
  {
    patchProp: (e, t, n, o, r = !1, s, l, i, c) => {
      'class' === t
        ? (function (e, t, n) {
            const o = e._vtc;
            o && (t = (t ? [t, ...o] : [...o]).join(' ')),
              null == t
                ? e.removeAttribute('class')
                : n
                ? e.setAttribute('class', t)
                : (e.className = t);
          })(e, o, r)
        : 'style' === t
        ? (function (e, t, n) {
            const o = e.style,
              r = P(n);
            if (n && !r) {
              for (const e in n) jr(o, e, n[e]);
              if (t && !P(t)) for (const e in t) null == n[e] && jr(o, e, '');
            } else {
              const s = o.display;
              r ? t !== n && (o.cssText = n) : t && e.removeAttribute('style'),
                '_vod' in e && (o.display = s);
            }
          })(e, n, o)
        : k(t)
        ? S(t) || qr(e, t, 0, o, l)
        : (
            '.' === t[0]
              ? ((t = t.slice(1)), 1)
              : '^' === t[0]
              ? ((t = t.slice(1)), 0)
              : (function (e, t, n, o) {
                  if (o)
                    return (
                      'innerHTML' === t ||
                      'textContent' === t ||
                      !!(t in e && Kr.test(t) && F(n))
                    );
                  if ('spellcheck' === t || 'draggable' === t) return !1;
                  if ('form' === t) return !1;
                  if ('list' === t && 'INPUT' === e.tagName) return !1;
                  if ('type' === t && 'TEXTAREA' === e.tagName) return !1;
                  if (Kr.test(t) && P(n)) return !1;
                  return t in e;
                })(e, t, o, r)
          )
        ? (function (e, t, n, o, r, s, l) {
            if ('innerHTML' === t || 'textContent' === t)
              return o && l(o, r, s), void (e[t] = null == n ? '' : n);
            if ('value' === t && 'PROGRESS' !== e.tagName) {
              e._value = n;
              const o = null == n ? '' : n;
              return (
                e.value !== o && (e.value = o),
                void (null == n && e.removeAttribute(t))
              );
            }
            if ('' === n || null == n) {
              const o = typeof e[t];
              if ('boolean' === o) return void (e[t] = d(n));
              if (null == n && 'string' === o)
                return (e[t] = ''), void e.removeAttribute(t);
              if ('number' === o) {
                try {
                  e[t] = 0;
                } catch (i) {}
                return void e.removeAttribute(t);
              }
            }
            try {
              e[t] = n;
            } catch (c) {}
          })(e, t, o, s, l, i, c)
        : ('true-value' === t
            ? (e._trueValue = o)
            : 'false-value' === t && (e._falseValue = o),
          (function (e, t, n, o, r) {
            if (o && t.startsWith('xlink:'))
              null == n
                ? e.removeAttributeNS(Nr, t.slice(6, t.length))
                : e.setAttributeNS(Nr, t, n);
            else {
              const o = u(t);
              null == n || (o && !d(n))
                ? e.removeAttribute(t)
                : e.setAttribute(t, o ? '' : n);
            }
          })(e, t, o, r));
    },
  },
  Rr,
);
let ds,
  ps = !1;
const fs = (...e) => {
  const t = ((ds = ps ? ds : oo(us)), (ps = !0), ds).createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (e) => {
      const t = (function (e) {
        if (P(e)) {
          return document.querySelector(e);
        }
        return e;
      })(e);
      if (t) return n(t, !0, t instanceof SVGElement);
    }),
    t
  );
};
const hs = 'undefined' != typeof window;
function vs(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/');
}
function ms(e) {
  let t = e.replace(/\.html$/, '');
  if ((t.endsWith('/') && (t += 'index'), hs)) {
    const e = '/';
    t = t.slice(e.length).replace(/\//g, '_') + '.md';
    const n = __VP_HASH_MAP__[t.toLowerCase()];
    t = `${e}assets/${t}.${n}.js`;
  } else t = `./${t.slice(1).replace(/\//g, '_')}.md.js`;
  return t;
}
const gs = Symbol();
function ys() {
  return (function () {
    const e = qt(gs);
    if (!e) throw new Error('useRouter() is called without provider.');
    return e;
  })().route;
}
function bs(e, t, n = !1) {
  const o = document.querySelector('.nav-bar').offsetHeight,
    r = e.classList.contains('.header-anchor')
      ? e
      : document.querySelector(decodeURIComponent(t));
  if (r) {
    const e = r.offsetTop - o - 15;
    !n || Math.abs(e - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, e)
      : window.scrollTo({ left: 0, top: e, behavior: 'smooth' });
  }
}
const _s = tn({
  name: 'VitePressContent',
  setup() {
    const e = ys();
    return () => (e.component ? Mr(e.component) : null);
  },
});
var ws = (e, t) => {
  for (const [n, o] of t) e[n] = o;
  return e;
};
const xs = { setup: () => ({}) },
  Cs = {
    t: '1596458734865',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '4898',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    width: '16',
    height: '16',
  },
  ks = [
    Eo(
      'path',
      {
        d: 'M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144',
        'p-id': '4899',
        fill: '#666',
      },
      null,
      -1,
    ),
    Eo(
      'path',
      {
        d: 'M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z',
        'p-id': '4900',
        fill: '#666',
      },
      null,
      -1,
    ),
  ];
var Ss = ws(xs, [
  [
    'render',
    function (e, t, n, o, r, s) {
      return go(), wo('svg', Cs, ks);
    },
  ],
]);
const $s = { setup: () => ({}) },
  Ls = {
    t: '1596458647160',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '2840',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    width: '22',
    height: '22',
  },
  Es = [
    Eo(
      'path',
      {
        d: 'M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z',
        fill: '#666',
        'p-id': '2841',
      },
      null,
      -1,
    ),
  ];
var Ts = ws($s, [
  [
    'render',
    function (e, t, n, o, r, s) {
      return go(), wo('svg', Ls, Es);
    },
  ],
]);
const As = ['href'],
  Ms = [
    Eo(
      'div',
      { style: { width: '16px', 'margin-left': '6px' } },
      [
        Eo(
          'svg',
          {
            version: '1.1',
            id: 'Layer_1',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            x: '0px',
            y: '0px',
            viewBox: '0 0 1024 1024',
            'xml:space': 'preserve',
          },
          [
            Eo('g', null, [
              Eo('path', {
                d: 'M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z',
                'p-id': '2793',
                fill: '#555',
              }),
            ]),
          ],
        ),
      ],
      -1,
    ),
  ];
const Os = /<script.*>([\s\S]+)<\/script>/,
  Fs = /<style>([\s\S]+)<\/style>/,
  Ps = /<template>([\s\S]+)<\/template>/,
  Rs = (e) => (t) => {
    const n = t.match(e);
    return n && n[1].trim();
  },
  Is = (e) => JSON.parse(decodeURIComponent(e));
const js = { class: 'demo-slot' },
  Bs = { class: 'demo-title-desc' },
  Us = { class: 'demo-title' },
  Ns = { class: 'demo-desc' },
  Vs = { class: 'demo-actions' },
  zs = { class: 'demo-platforms' },
  Hs = { class: 'demo-buttons' },
  Ds = { class: 'demo-actions-copy' },
  Ws = { class: 'demo-actions-tip' },
  qs = ['innerHTML'];
var Gs = ws(
  {
    props: {
      componentName: String,
      htmlStr: String,
      codeStr: String,
      importMap: String,
      language: { default: 'vue', type: String },
      platforms: { default: () => ['codepen'], type: Array },
      jsLibsStr: { type: String, default: '[]' },
      cssLibsStr: { type: String, default: '[]' },
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
    },
    components: {
      copySvg: Ss,
      codeSvg: Ts,
      OnlineEdit: tn({
        props: { content: null, importMap: null },
        setup(e) {
          const t = e,
            n = Mt(() => {
              const e = { 'App.vue': t.content };
              if (t.importMap)
                try {
                  e['import-map.json'] = JSON.stringify({
                    imports: JSON.parse(decodeURIComponent(t.importMap)),
                  });
                } catch {}
              return `https://sfc.vuejs.org/#${btoa(
                unescape(encodeURIComponent(JSON.stringify(e))),
              )}`;
            });
          return (e, t) => (
            go(),
            wo(
              'a',
              {
                href: kt(n),
                style: { display: 'flex', 'align-items': 'center' },
                target: '_blank',
              },
              Ms,
              8,
              As,
            )
          );
        },
      }),
    },
    setup(e) {
      const t = Mt(() => {
          var t;
          return decodeURIComponent(null != (t = e.htmlStr) ? t : '');
        }),
        n = Mt(() => {
          var t;
          return decodeURIComponent(null != (t = e.codeStr) ? t : '');
        }),
        { showTip: o, copyCode: r } = (function (e) {
          const t = at({ showTip: !1 });
          return c(i({}, Lt(t)), {
            copyCode: function () {
              navigator.clipboard.writeText(e),
                (t.showTip = !0),
                setTimeout(() => {
                  t.showTip = !1;
                }, 5e3);
            },
          });
        })(n.value),
        {
          expand: s,
          toggleExpand: l,
          parsedCode: a,
        } = (function (e, t, n) {
          const o = at({ expand: !1 }),
            r = Mt(() => ({
              js: Rs(Os)(e) || '',
              css: Rs(Fs)(e) || '',
              html:
                Rs(Ps)(e) ||
                e.replace(Os, '').replace(Fs, '').replace(Ps, '').trim(),
              jsLibs: Is(t),
              cssLibs: Is(n),
            }));
          return c(i({}, Lt(o)), {
            toggleExpand: () => (o.expand = !o.expand),
            parsedCode: r,
          });
        })(n.value, e.jsLibsStr, e.cssLibsStr);
      return {
        expand: s,
        toggleExpand: l,
        decodedHtmlStr: t,
        parsedCode: a,
        showTip: o,
        copyCode: r,
        decodedCodeStr: n,
      };
    },
  },
  [
    [
      'render',
      function (e, t, n, o, r, s) {
        const l = io('OnlineEdit'),
          i = io('copySvg'),
          c = io('codeSvg'),
          a = io('ClientOnly');
        return (
          go(),
          xo(a, null, {
            default: Nt(() => [
              Eo(
                'article',
                jo(e.$attrs, { class: 'demo' }),
                [
                  Eo('div', js, [Uo(e.$slots, 'default')]),
                  Gn(
                    Eo(
                      'div',
                      Bs,
                      [
                        Eo('span', Us, g(n.title), 1),
                        Eo('span', Ns, g(n.desc), 1),
                      ],
                      512,
                    ),
                    [[cs, n.title || n.desc]],
                  ),
                  Eo('div', Vs, [
                    Eo('div', zs, [
                      To(
                        l,
                        { content: o.decodedCodeStr, importMap: n.importMap },
                        null,
                        8,
                        ['content', 'importMap'],
                      ),
                    ]),
                    Eo('div', Hs, [
                      Eo('div', Ds, [
                        Gn(Eo('span', Ws, '复制成功!', 512), [[cs, o.showTip]]),
                        Gn(
                          To(
                            i,
                            { onClick: o.copyCode, title: '复制' },
                            null,
                            8,
                            ['onClick'],
                          ),
                          [[cs, !o.showTip]],
                        ),
                      ]),
                      To(c, {
                        class: 'demo-actions-expand',
                        onClick: t[0] || (t[0] = (e) => o.toggleExpand()),
                        title: '展开',
                      }),
                    ]),
                  ]),
                  Gn(
                    Eo(
                      'div',
                      {
                        innerHTML: o.decodedHtmlStr,
                        class: m(`language-${n.language} extra-class`),
                      },
                      null,
                      10,
                      qs,
                    ),
                    [[cs, o.expand]],
                  ),
                ],
                16,
              ),
            ]),
            _: 3,
          })
        );
      },
    ],
  ],
);
const Ks = tn({
  setup(e, { slots: t }) {
    const n = xt(!1);
    return (
      hn(() => {
        n.value = !0;
      }),
      () => (n.value && t.default ? t.default() : null)
    );
  },
});
const Js = xt(
  ((Ys =
    '{"lang":"en-US","title":"echo-ui-docs","description":"A VitePress site","base":"/","head":[],"themeConfig":{"nav":[{"text":"demo","link":"/math"}],"lang":"zh-CN","locales":{"/":{"lang":"zh-CN","title":"echo-ui-docs","description":"","label":"中文","selectText":"语言","nav":[{"text":"指南","link":"/"}],"sidebar":[{"text":"介绍","link":"/"},{"text":"Button","link":"/components/button/"},{"text":"Icon","link":"/components/icon/"},{"text":"ButtonGroup","link":"/components/buttongroup/"},{"text":"Alert","link":"/components/alert/"}]},"/en/":{"lang":"en-US","title":"echo-ui-docs","description":"","label":"English","selectText":"Languages","nav":[{"text":"Guide","link":"/"}],"sidebar":[{"text":"Getting Started","link":"/en/"},{"text":"Button","link":"/en/components/button/"},{"text":"Icon","link":"/components/icon/"}]}},"search":{"searchMaxSuggestions":10},"repo":"echo/echo-ui-docs","repoLabel":"Github","lastUpdated":true,"prevLink":true,"nextLink":true},"locales":{},"customData":{}}'),
  ut(JSON.parse(Ys))),
);
var Ys;
function Xs() {
  return Js;
}
const Zs = 'undefined' != typeof window;
function Qs(e, t) {
  const n = (function (e, t) {
    t.sort((e, t) => {
      const n = t.split('/').length - e.split('/').length;
      return 0 !== n ? n : t.length - e.length;
    });
    for (const n of t) if (e.startsWith(n)) return n;
  })(t, Object.keys(e));
  return n ? e[n] : void 0;
}
function el(e, t) {
  t = (function (e, t) {
    if (!Zs) return t;
    const n = e.base,
      o = n.endsWith('/') ? n.slice(0, -1) : n;
    return t.slice(o.length);
  })(e, t);
  const n = Qs(e.locales || {}, t) || {},
    o = Qs((e.themeConfig && e.themeConfig.locales) || {}, t) || {};
  return c(i(i({}, e), n), {
    themeConfig: c(i(i({}, e.themeConfig), o), { locales: {} }),
    locales: {},
  });
}
function tl(e) {
  const t = e || ys();
  return Mt(() => el(Js.value, t.path));
}
function nl(e) {
  const t = e || ys();
  return Mt(() => t.data);
}
function ol(e, t) {
  const n = Array.from(document.querySelectorAll('meta'));
  let o = !0;
  const r = (e) => {
    o
      ? (o = !1)
      : (n.forEach((e) => document.head.removeChild(e)),
        (n.length = 0),
        e &&
          e.length &&
          e.forEach((e) => {
            const t = (function ([e, t, n]) {
              const o = document.createElement(e);
              for (const r in t) o.setAttribute(r, t[r]);
              n && (o.innerHTML = n);
              return o;
            })(e);
            document.head.appendChild(t), n.push(t);
          }));
  };
  var s;
  Lr(
    () => {
      const n = e.data,
        o = t.value,
        s = n && n.title,
        l = n && n.description,
        i = n && n.frontmatter.head;
      var c;
      (document.title = (s ? s + ' | ' : '') + o.title),
        r([
          ['meta', { charset: 'utf-8' }],
          [
            'meta',
            { name: 'viewport', content: 'width=device-width,initial-scale=1' },
          ],
          ['meta', { name: 'description', content: l || o.description }],
          ...o.head,
          ...((i &&
            ((c = i),
            c.filter((e) => {
              return !(
                'meta' === (t = e)[0] &&
                t[1] &&
                'description' === t[1].name
              );
              var t;
            }))) ||
            []),
        ]);
    },
    null,
    s,
  );
}
function rl() {
  const e = nl();
  return Mt(() => e.value.frontmatter);
}
const sl = /#.*$/,
  ll = /(index)?\.(md|html)$/,
  il = /\/$/,
  cl = /^[a-z]+:/i;
function al(e) {
  return Array.isArray(e);
}
function ul(e) {
  return cl.test(e);
}
function dl(e) {
  return decodeURI(e).replace(sl, '').replace(ll, '');
}
function pl(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function fl(e) {
  return e.replace(/(index)?(\.(md|html))?$/, '') || '/';
}
function hl(e, t) {
  if (
    (function (e) {
      return !1 === e || 'auto' === e || al(e);
    })(e)
  )
    return e;
  t = pl(t);
  for (const n in e) if (t.startsWith(pl(n))) return e[n];
  return 'auto';
}
function vl(e) {
  return e.reduce(
    (e, t) => (
      t.link && e.push({ text: t.text, link: fl(t.link) }),
      (function (e) {
        return void 0 !== e.children;
      })(t) && (e = [...e, ...vl(t.children)]),
      e
    ),
    [],
  );
}
const ml = ['href', 'aria-label'],
  gl = ['src'];
var yl = ws({}, [
  [
    'render',
    function (e, t) {
      return (
        go(),
        wo(
          'a',
          {
            class: 'nav-bar-title',
            href: e.$withBase(e.$localePath),
            'aria-label': `${e.$siteByRoute.title}, back to home`,
          },
          [
            e.$themeConfig.logo
              ? (go(),
                wo(
                  'img',
                  {
                    key: 0,
                    class: 'logo',
                    src: e.$withBase(e.$themeConfig.logo),
                    alt: 'Logo',
                  },
                  null,
                  8,
                  gl,
                ))
              : Fo('', !0),
            Mo(' ' + g(e.$site.title), 1),
          ],
          8,
          ml,
        )
      );
    },
  ],
  ['__scopeId', 'data-v-74be2d57'],
]);
const bl = ['GitHub', 'GitLab', 'Bitbucket'].map((e) => [
  e,
  new RegExp(e, 'i'),
]);
function _l() {
  const e = tl();
  return Mt(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo;
    if (!n) return null;
    const o = /^https?:/.test((r = n)) ? r : `https://github.com/${r}`;
    var r;
    return {
      text: (function (e, t) {
        if (t) return t;
        const n = e.match(/^https?:\/\/[^/]+/);
        if (!n) return 'Source';
        const o = bl.find(([e, t]) => t.test(n[0]));
        if (o && o[0]) return o[0];
        return 'Source';
      })(o, t.repoLabel),
      link: o,
    };
  });
}
function wl(e) {
  const t = ys(),
    { withBase: n } = (function () {
      const e = Xs();
      return {
        withBase: function (t) {
          return vs(e.value.base, t);
        },
      };
    })(),
    o = ul(e.value.link);
  return {
    props: Mt(() => {
      const r = xl(`/${t.data.relativePath}`);
      let s = !1;
      if (e.value.activeMatch) s = new RegExp(e.value.activeMatch).test(r);
      else {
        const t = xl(n(e.value.link));
        s = '/' === t ? t === r : r.startsWith(t);
      }
      return {
        class: { active: s, isExternal: o },
        href: o ? e.value.link : n(e.value.link),
        target: e.value.target || o ? '_blank' : null,
        rel: e.value.rel || o ? 'noopener noreferrer' : null,
        'aria-label': e.value.ariaLabel,
      };
    }),
    isExternal: o,
  };
}
function xl(e) {
  return e
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/\.(html|md)$/, '')
    .replace(/\/index$/, '/');
}
const Cl = {},
  kl = {
    class: 'icon outbound',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    x: '0px',
    y: '0px',
    viewBox: '0 0 100 100',
    width: '15',
    height: '15',
  },
  Sl = [
    Eo(
      'path',
      {
        fill: 'currentColor',
        d: 'M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z',
      },
      null,
      -1,
    ),
    Eo(
      'polygon',
      {
        fill: 'currentColor',
        points:
          '45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9',
      },
      null,
      -1,
    ),
  ];
var $l = ws(Cl, [
  [
    'render',
    function (e, t) {
      return go(), wo('svg', kl, Sl);
    },
  ],
]);
const Ll = { class: 'nav-link' };
var El = ws(
  tn({
    props: { item: null },
    setup(e) {
      const t = Lt(e),
        { props: n, isExternal: o } = wl(t.item);
      return (t, r) => (
        go(),
        wo('div', Ll, [
          Eo(
            'a',
            jo({ class: 'item' }, kt(n)),
            [
              Mo(g(e.item.text) + ' ', 1),
              kt(o) ? (go(), xo($l, { key: 0 })) : Fo('', !0),
            ],
            16,
          ),
        ])
      );
    },
  }),
  [['__scopeId', 'data-v-24a44064']],
);
const Tl = { class: 'nav-dropdown-link-item' },
  Al = ((e) => (Bt('data-v-370a060e'), (e = e()), Ut(), e))(() =>
    Eo('span', { class: 'arrow' }, null, -1),
  ),
  Ml = { class: 'text' },
  Ol = { class: 'icon' };
var Fl = ws(
  tn({
    props: { item: null },
    setup(e) {
      const t = Lt(e),
        { props: n, isExternal: o } = wl(t.item);
      return (t, r) => (
        go(),
        wo('div', Tl, [
          Eo(
            'a',
            jo({ class: 'item' }, kt(n)),
            [
              Al,
              Eo('span', Ml, g(e.item.text), 1),
              Eo('span', Ol, [kt(o) ? (go(), xo($l, { key: 0 })) : Fo('', !0)]),
            ],
            16,
          ),
        ])
      );
    },
  }),
  [['__scopeId', 'data-v-370a060e']],
);
const Pl = ['aria-label'],
  Rl = { class: 'button-text' },
  Il = { class: 'dialog' };
var jl = ws(
  tn({
    props: { item: null },
    setup(e) {
      const t = ys(),
        n = xt(!1);
      function o() {
        n.value = !n.value;
      }
      return (
        $r(
          () => t.path,
          () => {
            n.value = !1;
          },
        ),
        (t, r) => (
          go(),
          wo(
            'div',
            { class: m(['nav-dropdown-link', { open: n.value }]) },
            [
              Eo(
                'button',
                { class: 'button', 'aria-label': e.item.ariaLabel, onClick: o },
                [
                  Eo('span', Rl, g(e.item.text), 1),
                  Eo(
                    'span',
                    { class: m(['button-arrow', n.value ? 'down' : 'right']) },
                    null,
                    2,
                  ),
                ],
                8,
                Pl,
              ),
              Eo('ul', Il, [
                (go(!0),
                wo(
                  uo,
                  null,
                  Bo(
                    e.item.items,
                    (e) => (
                      go(),
                      wo('li', { key: e.text, class: 'dialog-item' }, [
                        To(Fl, { item: e }, null, 8, ['item']),
                      ])
                    ),
                  ),
                  128,
                )),
              ]),
            ],
            2,
          )
        )
      );
    },
  }),
  [['__scopeId', 'data-v-7fd33982']],
);
const Bl = { key: 0, class: 'nav-links' },
  Ul = { key: 1, class: 'item' },
  Nl = { key: 2, class: 'item' };
var Vl = ws(
  tn({
    setup(e) {
      const t = tl(),
        n = (function () {
          const e = ys(),
            t = Xs();
          return Mt(() => {
            const n = t.value.themeConfig.locales;
            if (!n) return null;
            const o = Object.keys(n);
            if (o.length <= 1) return null;
            const r = hs ? t.value.base : '/',
              s = r.endsWith('/') ? r.slice(0, -1) : r,
              l = e.path.slice(s.length),
              i = o.find((e) => '/' !== e && l.startsWith(e)),
              c = i ? l.substring(i.length - 1) : l,
              a = o.map((e) => {
                const t = e.endsWith('/') ? e.slice(0, -1) : e;
                return { text: n[e].label, link: `${t}${c}` };
              }),
              u = i || '/';
            return {
              text: n[u].selectText ? n[u].selectText : 'Languages',
              items: a,
            };
          });
        })(),
        o = _l(),
        r = Mt(() => s.value || o.value),
        s = Mt(() => t.value.themeConfig.nav);
      return (e, t) =>
        kt(r)
          ? (go(),
            wo('nav', Bl, [
              kt(s)
                ? (go(!0),
                  wo(
                    uo,
                    { key: 0 },
                    Bo(
                      kt(s),
                      (e) => (
                        go(),
                        wo('div', { key: e.text, class: 'item' }, [
                          e.items
                            ? (go(),
                              xo(jl, { key: 0, item: e }, null, 8, ['item']))
                            : (go(),
                              xo(El, { key: 1, item: e }, null, 8, ['item'])),
                        ])
                      ),
                    ),
                    128,
                  ))
                : Fo('', !0),
              kt(n)
                ? (go(),
                  wo('div', Ul, [To(jl, { item: kt(n) }, null, 8, ['item'])]))
                : Fo('', !0),
              kt(o)
                ? (go(),
                  wo('div', Nl, [To(El, { item: kt(o) }, null, 8, ['item'])]))
                : Fo('', !0),
            ]))
          : Fo('', !0);
    },
  }),
  [['__scopeId', 'data-v-46905c02']],
);
const zl = { emits: ['toggle'] },
  Hl = [
    Eo(
      'svg',
      {
        class: 'icon',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': 'true',
        role: 'img',
        viewBox: '0 0 448 512',
      },
      [
        Eo('path', {
          fill: 'currentColor',
          d: 'M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z',
          class: '',
        }),
      ],
      -1,
    ),
  ];
var Dl = ws(zl, [
  [
    'render',
    function (e, t, n, o, r, s) {
      return (
        go(),
        wo(
          'div',
          {
            class: 'sidebar-button',
            onClick: t[0] || (t[0] = (t) => e.$emit('toggle')),
          },
          Hl,
        )
      );
    },
  ],
]);
const Wl = { class: 'nav-bar' },
  ql = ((e) => (Bt('data-v-33b2da5a'), (e = e()), Ut(), e))(() =>
    Eo('div', { class: 'flex-grow' }, null, -1),
  ),
  Gl = { class: 'nav' };
var Kl = ws(
  tn({
    emits: ['toggle'],
    setup: (e) => (e, t) =>
      go(),
      wo('header', Wl, [
        To(Dl, { onToggle: t[0] || (t[0] = (t) => e.$emit('toggle')) }),
        To(yl),
        ql,
        Eo('div', Gl, [To(Vl)]),
        Uo(e.$slots, 'search', {}, void 0, !0),
      ]),
  }),
  [['__scopeId', 'data-v-33b2da5a']],
);
function Jl() {
  let e = null,
    t = null;
  const n = (function (e, t) {
    let n,
      o = !1;
    return () => {
      n && clearTimeout(n),
        o
          ? (n = setTimeout(e, t))
          : (e(),
            (o = !0),
            setTimeout(() => {
              o = !1;
            }, t));
    };
  })(o, 300);
  function o() {
    const e = (function (e) {
      return [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter((t) => e.some((e) => e.hash === t.hash));
    })(
      [].slice.call(document.querySelectorAll('.sidebar a.sidebar-link-item')),
    );
    for (let t = 0; t < e.length; t++) {
      const n = e[t],
        o = e[t + 1],
        [s, l] = Xl(t, n, o);
      if (s)
        return history.replaceState(null, document.title, l || ' '), void r(l);
    }
  }
  function r(n) {
    if (
      (s(t), s(e), (t = document.querySelector(`.sidebar a[href="${n}"]`)), !t)
    )
      return;
    t.classList.add('active');
    const o = t.closest('.sidebar-links > ul > li');
    o && o !== t.parentElement
      ? ((e = o.querySelector('a')), e && e.classList.add('active'))
      : (e = null);
  }
  function s(e) {
    e && e.classList.remove('active');
  }
  hn(() => {
    o(), window.addEventListener('scroll', n);
  }),
    mn(() => {
      r(decodeURIComponent(location.hash));
    }),
    yn(() => {
      window.removeEventListener('scroll', n);
    });
}
function Yl(e) {
  const t = document.querySelector('.nav-bar').offsetHeight;
  return e.parentElement.offsetTop - t - 15;
}
function Xl(e, t, n) {
  const o = window.scrollY;
  return 0 === e && 0 === o
    ? [!0, null]
    : o < Yl(t)
    ? [!1, null]
    : !n || o < Yl(n)
    ? [!0, decodeURIComponent(t.hash)]
    : [!1, null];
}
function Zl(e, t) {
  const n = [];
  if (void 0 === e) return [];
  let o;
  return (
    e.forEach(({ level: e, title: r, slug: s }) => {
      if (e - 1 > t) return;
      const l = { text: r, link: `#${s}` };
      2 === e
        ? ((o = l), n.push(l))
        : o && (o.children || (o.children = [])).push(l);
    }),
    n
  );
}
const Ql = (e) => {
  const t = ys(),
    n = Xs();
  t.data.headers;
  const o = e.item.text,
    r = (function (e, t) {
      if (void 0 === t) return t;
      if (t.startsWith('#')) return t;
      return (function (e, t) {
        const n = e.endsWith('/'),
          o = t.startsWith('/');
        return n && o ? e.slice(0, -1) + t : n || o ? e + t : `${e}/${t}`;
      })(e, t);
    })(n.value.base, e.item.link),
    s = e.item.children,
    l = (function (e, t) {
      return void 0 !== t && dl(`/${e.data.relativePath}`) === dl(t);
    })(t, e.item.link),
    i = (function (e, t, n) {
      if (t && t.length > 0)
        return Mr(
          'ul',
          { class: 'sidebar-links' },
          t.map((e) => Mr(Ql, { item: e })),
        );
      return null;
    })(0, s);
  return Mr('li', { class: 'sidebar-link' }, [
    Mr(
      r ? 'a' : 'p',
      { class: { 'sidebar-link-item': !0, active: l }, href: r },
      o,
    ),
    i,
  ]);
};
const ei = { key: 0, class: 'sidebar-links' },
  ti = tn({
    setup(e) {
      const t = (function () {
        const e = ys(),
          t = tl();
        return (
          Jl(),
          Mt(() => {
            const n = e.data.headers,
              o = e.data.frontmatter.sidebar,
              r = e.data.frontmatter.sidebarDepth;
            if (!1 === o) return [];
            if ('auto' === o) return Zl(n, r);
            const s = hl(t.value.themeConfig.sidebar, e.data.relativePath);
            return !1 === s ? [] : 'auto' === s ? Zl(n, r) : s;
          })
        );
      })();
      return (e, n) =>
        kt(t).length > 0
          ? (go(),
            wo('ul', ei, [
              (go(!0),
              wo(
                uo,
                null,
                Bo(
                  kt(t),
                  (e) => (
                    go(),
                    xo(kt(Ql), { key: e.text, item: e }, null, 8, ['item'])
                  ),
                ),
                128,
              )),
            ]))
          : Fo('', !0);
    },
  });
const ni = { class: 'right-slug' },
  oi = ['href'];
var ri = ws(
  {
    setup() {
      const e = ys();
      return {
        slugs: Mt(() => {
          var t;
          const n = (null != (t = e.data.headers) ? t : []).filter(
            (e) => e.level > 1,
          );
          let o = 10;
          for (const { level: e } of n) o > e && (o = e);
          return n
            .filter((e) => e.level < o + 2)
            .map((e) =>
              c(i({}, e), { link: `#${e.slug}`, level: e.level === o ? 1 : 2 }),
            );
        }),
      };
    },
  },
  [
    [
      'render',
      function (e, t, n, o, r, s) {
        return (
          go(),
          wo('ul', ni, [
            (go(!0),
            wo(
              uo,
              null,
              Bo(
                o.slugs,
                ({ level: e, link: t, title: n }) => (
                  go(),
                  wo(
                    'li',
                    { class: m(`slug-item level-${e}`), key: t },
                    [Eo('a', { href: t, class: 'link' }, g(n), 9, oi)],
                    2,
                  )
                ),
              ),
              128,
            )),
          ])
        );
      },
    ],
    ['__scopeId', 'data-v-1336cdc6'],
  ],
);
var si = ws(
  tn({
    props: { open: { type: Boolean, required: !0 } },
    setup: (e) => (t, n) =>
      go(),
      wo(
        uo,
        null,
        [
          Eo(
            'aside',
            { class: m(['sidebar hover-scrollbar', { open: e.open }]) },
            [
              To(Vl, { class: 'nav' }),
              Uo(t.$slots, 'sidebar-top', {}, void 0, !0),
              To(ti),
              Uo(t.$slots, 'sidebar-bottom', {}, void 0, !0),
            ],
            2,
          ),
          To(ri),
        ],
        64,
      ),
  }),
  [['__scopeId', 'data-v-0381b7ca']],
);
const li = /bitbucket.org/;
function ii() {
  const e = tl(),
    t = nl();
  return {
    url: Mt(() => {
      const n =
        null == t.value.frontmatter.editLink
          ? e.value.themeConfig.editLinks
          : t.value.frontmatter.editLink;
      const {
          repo: o,
          docsDir: r = '',
          docsBranch: s = 'master',
          docsRepo: l = o,
        } = e.value.themeConfig,
        { relativePath: i } = t.value;
      return n && i && o
        ? (function (e, t, n, o, r) {
            return li.test(e)
              ? (function (e, t, n, o, r) {
                  return (
                    (ul(t) ? t : e).replace(il, '') +
                    `/src/${o}/` +
                    (n ? n.replace(il, '') + '/' : '') +
                    r +
                    `?mode=edit&spa=0&at=${o}&fileviewer=file-view-default`
                  );
                })(e, t, n, o, r)
              : (function (e, t, n, o, r) {
                  return (
                    (ul(t) ? t : `https://github.com/${t}`).replace(il, '') +
                    `/edit/${o}/` +
                    (n ? n.replace(il, '') + '/' : '') +
                    r
                  );
                })(0, t, n, o, r);
          })(o, l, r, s, i)
        : null;
    }),
    text: Mt(() => e.value.themeConfig.editLinkText || 'Edit this page'),
  };
}
const ci = { class: 'edit-link' },
  ai = ['href'];
var ui = ws(
  tn({
    setup(e) {
      const { url: t, text: n } = ii();
      return (e, o) => (
        go(),
        wo('div', ci, [
          kt(t)
            ? (go(),
              wo(
                'a',
                {
                  key: 0,
                  class: 'link',
                  href: kt(t),
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
                [Mo(g(kt(n)) + ' ', 1), To($l, { class: 'icon' })],
                8,
                ai,
              ))
            : Fo('', !0),
        ])
      );
    },
  }),
  [['__scopeId', 'data-v-4e0cf990']],
);
const di = { key: 0, class: 'last-updated' },
  pi = { class: 'prefix' },
  fi = { class: 'datetime' };
var hi = ws(
  tn({
    setup(e) {
      const t = tl(),
        n = nl(),
        o = Mt(() => {
          const e = t.value.themeConfig.lastUpdated;
          return void 0 !== e && !1 !== e;
        }),
        r = Mt(() => {
          const e = t.value.themeConfig.lastUpdated;
          return !0 === e ? 'Last Updated' : e;
        }),
        s = xt('');
      return (
        hn(() => {
          s.value = new Date(n.value.lastUpdated).toLocaleString('en-US');
        }),
        (e, t) =>
          kt(o)
            ? (go(),
              wo('p', di, [
                Eo('span', pi, g(kt(r)) + ':', 1),
                Eo('span', fi, g(s.value), 1),
              ]))
            : Fo('', !0)
      );
    },
  }),
  [['__scopeId', 'data-v-62bdcaad']],
);
const vi = { class: 'page-footer' },
  mi = { class: 'edit' },
  gi = { class: 'updated' };
var yi = ws(
  tn({
    setup: (e) => (e, t) =>
      go(),
      wo('footer', vi, [Eo('div', mi, [To(ui)]), Eo('div', gi, [To(hi)])]),
  }),
  [['__scopeId', 'data-v-79d80dc0']],
);
function bi() {
  const e = tl(),
    t = nl(),
    n = Mt(() => fl(pl(t.value.relativePath))),
    o = Mt(() => {
      const t = hl(e.value.themeConfig.sidebar, n.value);
      return al(t) ? vl(t) : [];
    }),
    r = Mt(() => o.value.findIndex((e) => e.link === n.value)),
    s = Mt(() => {
      if (
        !1 !== e.value.themeConfig.nextLinks &&
        r.value > -1 &&
        r.value < o.value.length - 1
      )
        return o.value[r.value + 1];
    }),
    l = Mt(() => {
      if (!1 !== e.value.themeConfig.prevLinks && r.value > 0)
        return o.value[r.value - 1];
    }),
    i = Mt(() => !!s.value || !!l.value);
  return { next: s, prev: l, hasLinks: i };
}
const _i = {},
  wi = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  xi = [
    Eo(
      'path',
      {
        d: 'M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z',
      },
      null,
      -1,
    ),
  ];
var Ci = ws(_i, [
  [
    'render',
    function (e, t) {
      return go(), wo('svg', wi, xi);
    },
  ],
]);
const ki = {},
  Si = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' },
  $i = [
    Eo(
      'path',
      {
        d: 'M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z',
      },
      null,
      -1,
    ),
  ];
var Li = ws(ki, [
  [
    'render',
    function (e, t) {
      return go(), wo('svg', Si, $i);
    },
  ],
]);
const Ei = { key: 0, class: 'next-and-prev-link' },
  Ti = { class: 'container' },
  Ai = { class: 'prev' },
  Mi = ['href'],
  Oi = { class: 'text' },
  Fi = { class: 'next' },
  Pi = ['href'],
  Ri = { class: 'text' };
var Ii = ws(
  tn({
    setup(e) {
      const { hasLinks: t, prev: n, next: o } = bi();
      return (e, r) =>
        kt(t)
          ? (go(),
            wo('div', Ei, [
              Eo('div', Ti, [
                Eo('div', Ai, [
                  kt(n)
                    ? (go(),
                      wo(
                        'a',
                        {
                          key: 0,
                          class: 'link',
                          href: e.$withBase(kt(n).link),
                        },
                        [
                          To(Ci, { class: 'icon icon-prev' }),
                          Eo('span', Oi, g(kt(n).text), 1),
                        ],
                        8,
                        Mi,
                      ))
                    : Fo('', !0),
                ]),
                Eo('div', Fi, [
                  kt(o)
                    ? (go(),
                      wo(
                        'a',
                        {
                          key: 0,
                          class: 'link',
                          href: e.$withBase(kt(o).link),
                        },
                        [
                          Eo('span', Ri, g(kt(o).text), 1),
                          To(Li, { class: 'icon icon-next' }),
                        ],
                        8,
                        Pi,
                      ))
                    : Fo('', !0),
                ]),
              ]),
            ]))
          : Fo('', !0);
    },
  }),
  [['__scopeId', 'data-v-6ea49ff3']],
);
const ji = { class: 'page' },
  Bi = { class: 'container hover-scrollbar' },
  Ui = { class: 'content' };
var Ni = ws(
  tn({
    setup: (e) => (e, t) => {
      const n = io('Content');
      return (
        go(),
        wo('main', ji, [
          Eo('div', Bi, [
            Uo(e.$slots, 'top', {}, void 0, !0),
            Eo('div', Ui, [To(n)]),
            To(yi),
            To(Ii),
            Uo(e.$slots, 'bottom', {}, void 0, !0),
          ]),
        ])
      );
    },
  }),
  [['__scopeId', 'data-v-a901e69a']],
);
const Vi = { key: 0, id: 'ads-container' },
  zi = tn({
    setup(e) {
      const t = on(() => import('./Home.dd313db0.js')),
        n = () => null,
        o = n,
        r = n,
        s = n,
        l = ys(),
        i = Xs(),
        c = tl(),
        a = Mt(() => i.value.themeConfig),
        u = nl(),
        d = Mt(() => !!l.data.frontmatter.customLayout),
        p = Mt(() => !!l.data.frontmatter.home),
        f = Mt(() => {
          const { themeConfig: e } = c.value,
            { frontmatter: t } = l.data;
          return (
            !1 !== t.navbar &&
            !1 !== e.navbar &&
            (i.value.title || e.logo || e.repo || e.nav)
          );
        }),
        h = xt(!1),
        v = Mt(() => {
          const { frontmatter: e } = l.data;
          if (e.home || !1 === e.sidebar) return !1;
          const { themeConfig: t } = c.value;
          return !(al((n = hl(t.sidebar, l.data.relativePath)))
            ? 0 === n.length
            : !n);
          var n;
        }),
        g = (e) => {
          h.value = 'boolean' == typeof e ? e : !h.value;
        },
        y = g.bind(null, !1);
      $r(l, y);
      const b = Mt(() => [
        {
          'no-navbar': !f.value,
          'sidebar-open': h.value,
          'no-sidebar': !v.value,
        },
      ]);
      return (e, n) => {
        const l = io('Content'),
          i = io('Debug');
        return (
          go(),
          wo(
            uo,
            null,
            [
              Eo(
                'div',
                { class: m(['theme', kt(b)]) },
                [
                  kt(f)
                    ? (go(),
                      xo(
                        Kl,
                        { key: 0, onToggle: g },
                        {
                          search: Nt(() => [
                            Uo(e.$slots, 'navbar-search', {}, () => [
                              kt(a).algolia
                                ? (go(),
                                  xo(
                                    kt(s),
                                    { key: 0, options: kt(a).algolia },
                                    null,
                                    8,
                                    ['options'],
                                  ))
                                : Fo('', !0),
                            ]),
                          ]),
                          _: 3,
                        },
                      ))
                    : Fo('', !0),
                  To(
                    si,
                    { open: h.value },
                    {
                      'sidebar-top': Nt(() => [Uo(e.$slots, 'sidebar-top')]),
                      'sidebar-bottom': Nt(() => [
                        Uo(e.$slots, 'sidebar-bottom'),
                      ]),
                      _: 3,
                    },
                    8,
                    ['open'],
                  ),
                  Eo('div', {
                    class: 'sidebar-mask',
                    onClick: n[0] || (n[0] = (e) => g(!1)),
                  }),
                  kt(d)
                    ? (go(), xo(l, { key: 1 }))
                    : kt(p)
                    ? (go(),
                      xo(
                        kt(t),
                        { key: 2 },
                        {
                          hero: Nt(() => [Uo(e.$slots, 'home-hero')]),
                          features: Nt(() => [Uo(e.$slots, 'home-features')]),
                          footer: Nt(() => [Uo(e.$slots, 'home-footer')]),
                          _: 3,
                        },
                      ))
                    : (go(),
                      xo(
                        Ni,
                        { key: 3 },
                        {
                          top: Nt(() => [
                            Uo(e.$slots, 'page-top-ads', {}, () => [
                              kt(a).carbonAds && kt(a).carbonAds.carbon
                                ? (go(),
                                  wo('div', Vi, [
                                    To(
                                      kt(o),
                                      {
                                        key: 'carbon' + kt(u).relativePath,
                                        code: kt(a).carbonAds.carbon,
                                        placement: kt(a).carbonAds.placement,
                                      },
                                      null,
                                      8,
                                      ['code', 'placement'],
                                    ),
                                  ]))
                                : Fo('', !0),
                            ]),
                            Uo(e.$slots, 'page-top'),
                          ]),
                          bottom: Nt(() => [
                            Uo(e.$slots, 'page-bottom'),
                            Uo(e.$slots, 'page-bottom-ads', {}, () => [
                              kt(a).carbonAds && kt(a).carbonAds.custom
                                ? (go(),
                                  xo(
                                    kt(r),
                                    {
                                      key: 'custom' + kt(u).relativePath,
                                      code: kt(a).carbonAds.custom,
                                      placement: kt(a).carbonAds.placement,
                                    },
                                    null,
                                    8,
                                    ['code', 'placement'],
                                  ))
                                : Fo('', !0),
                            ]),
                          ]),
                          _: 3,
                        },
                      )),
                ],
                2,
              ),
              To(i),
            ],
            64,
          )
        );
      };
    },
  }),
  Hi = { class: 'theme' },
  Di = Eo('h1', null, '404', -1),
  Wi = ['href'],
  qi = {
    Layout: zi,
    NotFound: tn({
      setup(e) {
        const t = [
          "There's nothing here.",
          'How did we get here?',
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links.",
        ];
        return (e, n) => (
          go(),
          wo('div', Hi, [
            Di,
            Eo(
              'blockquote',
              null,
              g(t[Math.floor(Math.random() * t.length)]),
              1,
            ),
            Eo(
              'a',
              { href: e.$site.base, 'aria-label': 'go to home' },
              'Take me home.',
              8,
              Wi,
            ),
          ])
        );
      },
    }),
  },
  Gi = new Set(),
  Ki = () => document.createElement('link');
let Ji;
const Yi =
  hs &&
  (Ji = Ki()) &&
  Ji.relList &&
  Ji.relList.supports &&
  Ji.relList.supports('prefetch')
    ? (e) => {
        const t = Ki();
        (t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t);
      }
    : (e) => {
        const t = new XMLHttpRequest();
        t.open('GET', e, (t.withCredentials = !0)), t.send();
      };
const Xi = qi.NotFound || (() => '404 Not Found'),
  Zi = {
    name: 'VitePressApp',
    setup: () => (
      (function () {
        if (!hs) return;
        if (!window.IntersectionObserver) return;
        let e;
        if (
          (e = navigator.connection) &&
          (e.saveData || /2g/.test(e.effectiveType))
        )
          return;
        const t = window.requestIdleCallback || setTimeout;
        let n = null;
        const o = () => {
          n && n.disconnect(),
            (n = new IntersectionObserver((e) => {
              e.forEach((e) => {
                if (e.isIntersecting) {
                  const t = e.target;
                  n.unobserve(t);
                  const { pathname: o } = t;
                  if (!Gi.has(o)) {
                    Gi.add(o);
                    const e = ms(o);
                    Yi(e);
                  }
                }
              });
            })),
            t(() => {
              document.querySelectorAll('#app a').forEach((e) => {
                const { target: t, hostname: o, pathname: r } = e,
                  s = r.match(/\.\w+$/);
                (s && '.html' !== s[0]) ||
                  ('_blank' !== t &&
                    o === location.hostname &&
                    (r !== location.pathname ? n.observe(e) : Gi.add(r)));
              });
            });
        };
        hn(o);
        const r = ys();
        $r(() => r.path, o),
          yn(() => {
            n && n.disconnect();
          });
      })(),
      () => Mr(qi.Layout)
    ),
  };
function Qi() {
  const e = (function () {
      let e,
        t = hs;
      return (function (e, t) {
        const n = at({ path: '/', component: null, data: null }),
          o = 'undefined' != typeof window;
        function r(e = o ? location.href : '/') {
          const t = new URL(e, 'http://a.com');
          return (
            t.pathname.endsWith('/') ||
              t.pathname.endsWith('.html') ||
              ((t.pathname += '.html'), (e = t.pathname + t.search + t.hash)),
            o &&
              (history.replaceState(
                { scrollPosition: window.scrollY },
                document.title,
              ),
              history.pushState(null, '', e)),
            l(e)
          );
        }
        let s = null;
        async function l(r, l = 0) {
          const i = new URL(r, 'http://a.com'),
            c = (s = i.pathname);
          try {
            let t = e(c);
            if (
              ('then' in t && 'function' == typeof t.then && (t = await t),
              s === c)
            ) {
              s = null;
              const { default: e, __pageData: r } = t;
              if (!e) throw new Error(`Invalid route component: ${e}`);
              (n.path = c),
                (n.component = mt(e)),
                (n.data = ut(JSON.parse(r))),
                o &&
                  gr(() => {
                    if (i.hash && !l) {
                      const e = document.querySelector(
                        decodeURIComponent(i.hash),
                      );
                      if (e) return void bs(e, i.hash);
                    }
                    window.scrollTo(0, l);
                  });
            }
          } catch (a) {
            a.message.match(/fetch/) || console.error(a),
              s === c &&
                ((s = null), (n.path = c), (n.component = t ? mt(t) : null));
          }
        }
        return (
          o &&
            (window.addEventListener(
              'click',
              (e) => {
                const t = e.target.closest('a');
                if (t) {
                  const {
                      href: n,
                      protocol: o,
                      hostname: s,
                      pathname: l,
                      hash: i,
                      target: c,
                    } = t,
                    a = window.location,
                    u = l.match(/\.\w+$/);
                  e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey ||
                    e.metaKey ||
                    '_blank' === c ||
                    o !== a.protocol ||
                    s !== a.hostname ||
                    (u && '.html' !== u[0]) ||
                    (e.preventDefault(),
                    l === a.pathname
                      ? i &&
                        i !== a.hash &&
                        (history.pushState(null, '', i),
                        bs(t, i, t.classList.contains('header-anchor')))
                      : r(n));
                }
              },
              { capture: !0 },
            ),
            window.addEventListener('popstate', (e) => {
              l(location.href, (e.state && e.state.scrollPosition) || 0);
            }),
            window.addEventListener('hashchange', (e) => {
              e.preventDefault();
            })),
          { route: n, go: r }
        );
      })((n) => {
        let o = ms(n);
        return (
          t && (e = o),
          (t || e === o) && (o = o.replace(/\.js$/, '.lean.js')),
          hs ? ((t = !1), import(o)) : require(o)
        );
      }, Xi);
    })(),
    t = fs(Zi);
  t.provide(gs, e);
  const n = tl(e.route),
    o = nl(e.route);
  return (
    hs && ol(e.route, n),
    (function (e, t, n, o) {
      Object.defineProperties(e.config.globalProperties, {
        $site: { get: () => t.value },
        $siteByRoute: { get: () => n.value },
        $themeConfig: { get: () => n.value.themeConfig },
        $page: { get: () => o.value },
        $frontmatter: { get: () => o.value.frontmatter },
        $lang: { get: () => n.value.lang },
        $localePath: {
          get() {
            const { locales: e } = t.value,
              { lang: o } = n.value,
              r = Object.keys(e).find((t) => e[t].lang === o);
            return (e && r) || '/';
          },
        },
        $title: {
          get: () =>
            o.value.title
              ? o.value.title + ' | ' + n.value.title
              : n.value.title,
        },
        $description: { get: () => o.value.description || n.value.description },
        $withBase: { value: (e) => vs(t.value.base, e) },
      });
    })(t, Js, n, o),
    (function (e) {
      e.component('Content', _s),
        e.component('ClientOnly', Ks),
        e.component('Demo', Gs),
        e.component('Debug', () => null);
    })(t),
    { app: t, router: e }
  );
}
if (hs) {
  const { app: e, router: t } = Qi();
  t.go().then(() => {
    e.mount('#app');
  });
}
export {
  uo as F,
  El as N,
  Yr as T,
  ws as _,
  Oo as a,
  Eo as b,
  wo as c,
  Qi as createApp,
  To as d,
  Mo as e,
  tn as f,
  Mt as g,
  Fo as h,
  Uo as i,
  xt as j,
  xo as k,
  Gn as l,
  g as m,
  m as n,
  go as o,
  rl as p,
  kt as q,
  io as r,
  Bo as s,
  Lt as t,
  tl as u,
  cs as v,
  Nt as w,
};
