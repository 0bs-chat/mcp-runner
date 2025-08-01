var content = (function () {
  "use strict";
  var i1 = Object.defineProperty;
  var r1 = (Dn, Fe, nn) =>
    Fe in Dn
      ? i1(Dn, Fe, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: nn,
        })
      : (Dn[Fe] = nn);
  var Ml = (Dn, Fe, nn) => r1(Dn, typeof Fe != "symbol" ? Fe + "" : Fe, nn);
  var pf, Sf, Ef, Tf;
  function Dn(a) {
    return a &&
      a.__esModule &&
      Object.prototype.hasOwnProperty.call(a, "default")
      ? a.default
      : a;
  }
  var Fe = { exports: {} },
    nn = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var js;
  function ag() {
    if (js) return nn;
    js = 1;
    var a = Symbol.for("react.transitional.element"),
      r = Symbol.for("react.fragment");
    function s(c, f, m) {
      var g = null;
      if (
        (m !== void 0 && (g = "" + m),
        f.key !== void 0 && (g = "" + f.key),
        "key" in f)
      ) {
        m = {};
        for (var E in f) E !== "key" && (m[E] = f[E]);
      } else m = f;
      return (
        (f = m.ref),
        { $$typeof: a, type: c, key: g, ref: f !== void 0 ? f : null, props: m }
      );
    }
    return (nn.Fragment = r), (nn.jsx = s), (nn.jsxs = s), nn;
  }
  var Xs;
  function ug() {
    return Xs || ((Xs = 1), (Fe.exports = ag())), Fe.exports;
  }
  var xl = ug();
  function ig(a) {
    throw new Error(`Unreachable assertion failure: ${a}`);
  }
  async function rg(a) {
    return new Promise((r) => {
      setTimeout(() => r(), a);
    });
  }
  async function cg(a, r) {
    const { timeoutMs: s } = r,
      c = r.errorMessage ?? `Timeout of ${s} ms exceeded`;
    if (s <= 0 || s === Number.POSITIVE_INFINITY) return a();
    const f = async () => {
      await rg(s);
      const m = typeof c == "function" ? c() : c;
      throw new sg(m);
    };
    return Promise.race([a(), f()]);
  }
  class sg extends Error {
    constructor(r) {
      super(r), (this.name = "TimeoutError");
    }
  }
  var Ii = { exports: {} };
  /*!
   * Sizzle CSS Selector Engine v2.3.10
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2023-02-14
   */ var Qs;
  function og() {
    return (
      Qs ||
        ((Qs = 1),
        (function (a) {
          (function (r) {
            var s,
              c,
              f,
              m,
              g,
              E,
              b,
              p,
              O,
              k,
              L,
              Q,
              $,
              z,
              C,
              U,
              X,
              F,
              nt,
              J = "sizzle" + 1 * new Date(),
              K = r.document,
              gt = 0,
              Ot = 0,
              Rt = de(),
              Tt = de(),
              qt = de(),
              Ct = de(),
              Bt = function (h, y) {
                return h === y && (L = !0), 0;
              },
              $t = {}.hasOwnProperty,
              yt = [],
              _ = yt.pop,
              W = yt.push,
              tt = yt.push,
              bt = yt.slice,
              S = function (h, y) {
                for (var A = 0, H = h.length; A < H; A++)
                  if (h[A] === y) return A;
                return -1;
              },
              V =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              Z = "[\\x20\\t\\r\\n\\f]",
              I =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                Z +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              lt =
                "\\[" +
                Z +
                "*(" +
                I +
                ")(?:" +
                Z +
                "*([*^$|!~]?=)" +
                Z +
                `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` +
                I +
                "))|)" +
                Z +
                "*\\]",
              pt =
                ":(" +
                I +
                `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` +
                lt +
                ")*)|.*)\\)|)",
              ht = new RegExp(Z + "+", "g"),
              Wt = new RegExp(
                "^" + Z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Z + "+$",
                "g",
              ),
              Kt = new RegExp("^" + Z + "*," + Z + "*"),
              We = new RegExp("^" + Z + "*([>+~]|" + Z + ")" + Z + "*"),
              Aa = new RegExp(Z + "|>"),
              Cl = new RegExp(pt),
              wa = new RegExp("^" + I + "$"),
              Nn = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + lt),
                PSEUDO: new RegExp("^" + pt),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    Z +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    Z +
                    "*(?:([+-]|)" +
                    Z +
                    "*(\\d+)|))" +
                    Z +
                    "*\\)|)",
                  "i",
                ),
                bool: new RegExp("^(?:" + V + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    Z +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    Z +
                    "*((?:-\\d)?\\d*)" +
                    Z +
                    "*\\)|)(?=[^-]|$)",
                  "i",
                ),
              },
              Ma = /HTML$/i,
              zr = /^(?:input|select|textarea|button)$/i,
              Nr = /^h\d$/i,
              Ee = /^[^{]+\{\s*\[native \w/,
              Cr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              Ul = /[+~]/,
              Ye = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + Z + "?|\\\\([^\\r\\n\\f])",
                "g",
              ),
              _e = function (h, y) {
                var A = "0x" + h.slice(1) - 65536;
                return (
                  y ||
                  (A < 0
                    ? String.fromCharCode(A + 65536)
                    : String.fromCharCode(
                        (A >> 10) | 55296,
                        (A & 1023) | 56320,
                      ))
                );
              },
              qu = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              xa = function (h, y) {
                return y
                  ? h === "\0"
                    ? "�"
                    : h.slice(0, -1) +
                      "\\" +
                      h.charCodeAt(h.length - 1).toString(16) +
                      " "
                  : "\\" + h;
              },
              Bu = function () {
                Q();
              },
              Ur = cl(
                function (h) {
                  return (
                    h.disabled === !0 && h.nodeName.toLowerCase() === "fieldset"
                  );
                },
                { dir: "parentNode", next: "legend" },
              );
            try {
              tt.apply((yt = bt.call(K.childNodes)), K.childNodes),
                yt[K.childNodes.length].nodeType;
            } catch {
              tt = {
                apply: yt.length
                  ? function (y, A) {
                      W.apply(y, bt.call(A));
                    }
                  : function (y, A) {
                      for (var H = y.length, w = 0; (y[H++] = A[w++]); );
                      y.length = H - 1;
                    },
              };
            }
            function Mt(h, y, A, H) {
              var w,
                q,
                j,
                P,
                et,
                ft,
                st,
                ot = y && y.ownerDocument,
                St = y ? y.nodeType : 9;
              if (
                ((A = A || []),
                typeof h != "string" ||
                  !h ||
                  (St !== 1 && St !== 9 && St !== 11))
              )
                return A;
              if (!H && (Q(y), (y = y || $), C)) {
                if (St !== 11 && (et = Cr.exec(h)))
                  if ((w = et[1])) {
                    if (St === 9)
                      if ((j = y.getElementById(w))) {
                        if (j.id === w) return A.push(j), A;
                      } else return A;
                    else if (
                      ot &&
                      (j = ot.getElementById(w)) &&
                      nt(y, j) &&
                      j.id === w
                    )
                      return A.push(j), A;
                  } else {
                    if (et[2]) return tt.apply(A, y.getElementsByTagName(h)), A;
                    if (
                      (w = et[3]) &&
                      c.getElementsByClassName &&
                      y.getElementsByClassName
                    )
                      return tt.apply(A, y.getElementsByClassName(w)), A;
                  }
                if (
                  c.qsa &&
                  !Ct[h + " "] &&
                  (!U || !U.test(h)) &&
                  (St !== 1 || y.nodeName.toLowerCase() !== "object")
                ) {
                  if (
                    ((st = h), (ot = y), St === 1 && (Aa.test(h) || We.test(h)))
                  ) {
                    for (
                      ot = (Ul.test(h) && Cn(y.parentNode)) || y,
                        (ot !== y || !c.scope) &&
                          ((P = y.getAttribute("id"))
                            ? (P = P.replace(qu, xa))
                            : y.setAttribute("id", (P = J))),
                        ft = E(h),
                        q = ft.length;
                      q--;

                    )
                      ft[q] = (P ? "#" + P : ":scope") + " " + Ll(ft[q]);
                    st = ft.join(",");
                  }
                  try {
                    return tt.apply(A, ot.querySelectorAll(st)), A;
                  } catch {
                    Ct(h, !0);
                  } finally {
                    P === J && y.removeAttribute("id");
                  }
                }
              }
              return p(h.replace(Wt, "$1"), y, A, H);
            }
            function de() {
              var h = [];
              function y(A, H) {
                return (
                  h.push(A + " ") > f.cacheLength && delete y[h.shift()],
                  (y[A + " "] = H)
                );
              }
              return y;
            }
            function ue(h) {
              return (h[J] = !0), h;
            }
            function Jt(h) {
              var y = $.createElement("fieldset");
              try {
                return !!h(y);
              } catch {
                return !1;
              } finally {
                y.parentNode && y.parentNode.removeChild(y), (y = null);
              }
            }
            function _a(h, y) {
              for (var A = h.split("|"), H = A.length; H--; )
                f.attrHandle[A[H]] = y;
            }
            function Gu(h, y) {
              var A = y && h,
                H =
                  A &&
                  h.nodeType === 1 &&
                  y.nodeType === 1 &&
                  h.sourceIndex - y.sourceIndex;
              if (H) return H;
              if (A) {
                for (; (A = A.nextSibling); ) if (A === y) return -1;
              }
              return h ? 1 : -1;
            }
            function Hr(h) {
              return function (y) {
                var A = y.nodeName.toLowerCase();
                return A === "input" && y.type === h;
              };
            }
            function Hl(h) {
              return function (y) {
                var A = y.nodeName.toLowerCase();
                return (A === "input" || A === "button") && y.type === h;
              };
            }
            function rl(h) {
              return function (y) {
                return "form" in y
                  ? y.parentNode && y.disabled === !1
                    ? "label" in y
                      ? "label" in y.parentNode
                        ? y.parentNode.disabled === h
                        : y.disabled === h
                      : y.isDisabled === h ||
                        (y.isDisabled !== !h && Ur(y) === h)
                    : y.disabled === h
                  : "label" in y
                    ? y.disabled === h
                    : !1;
              };
            }
            function Me(h) {
              return ue(function (y) {
                return (
                  (y = +y),
                  ue(function (A, H) {
                    for (var w, q = h([], A.length, y), j = q.length; j--; )
                      A[(w = q[j])] && (A[w] = !(H[w] = A[w]));
                  })
                );
              });
            }
            function Cn(h) {
              return h && typeof h.getElementsByTagName < "u" && h;
            }
            (c = Mt.support = {}),
              (g = Mt.isXML =
                function (h) {
                  var y = h && h.namespaceURI,
                    A = h && (h.ownerDocument || h).documentElement;
                  return !Ma.test(y || (A && A.nodeName) || "HTML");
                }),
              (Q = Mt.setDocument =
                function (h) {
                  var y,
                    A,
                    H = h ? h.ownerDocument || h : K;
                  return (
                    H == $ ||
                      H.nodeType !== 9 ||
                      !H.documentElement ||
                      (($ = H),
                      (z = $.documentElement),
                      (C = !g($)),
                      K != $ &&
                        (A = $.defaultView) &&
                        A.top !== A &&
                        (A.addEventListener
                          ? A.addEventListener("unload", Bu, !1)
                          : A.attachEvent && A.attachEvent("onunload", Bu)),
                      (c.scope = Jt(function (w) {
                        return (
                          z.appendChild(w).appendChild($.createElement("div")),
                          typeof w.querySelectorAll < "u" &&
                            !w.querySelectorAll(":scope fieldset div").length
                        );
                      })),
                      (c.cssHas = Jt(function () {
                        try {
                          return $.querySelector(":has(*,:jqfake)"), !1;
                        } catch {
                          return !0;
                        }
                      })),
                      (c.attributes = Jt(function (w) {
                        return (
                          (w.className = "i"), !w.getAttribute("className")
                        );
                      })),
                      (c.getElementsByTagName = Jt(function (w) {
                        return (
                          w.appendChild($.createComment("")),
                          !w.getElementsByTagName("*").length
                        );
                      })),
                      (c.getElementsByClassName = Ee.test(
                        $.getElementsByClassName,
                      )),
                      (c.getById = Jt(function (w) {
                        return (
                          (z.appendChild(w).id = J),
                          !$.getElementsByName || !$.getElementsByName(J).length
                        );
                      })),
                      c.getById
                        ? ((f.filter.ID = function (w) {
                            var q = w.replace(Ye, _e);
                            return function (j) {
                              return j.getAttribute("id") === q;
                            };
                          }),
                          (f.find.ID = function (w, q) {
                            if (typeof q.getElementById < "u" && C) {
                              var j = q.getElementById(w);
                              return j ? [j] : [];
                            }
                          }))
                        : ((f.filter.ID = function (w) {
                            var q = w.replace(Ye, _e);
                            return function (j) {
                              var P =
                                typeof j.getAttributeNode < "u" &&
                                j.getAttributeNode("id");
                              return P && P.value === q;
                            };
                          }),
                          (f.find.ID = function (w, q) {
                            if (typeof q.getElementById < "u" && C) {
                              var j,
                                P,
                                et,
                                ft = q.getElementById(w);
                              if (ft) {
                                if (
                                  ((j = ft.getAttributeNode("id")),
                                  j && j.value === w)
                                )
                                  return [ft];
                                for (
                                  et = q.getElementsByName(w), P = 0;
                                  (ft = et[P++]);

                                )
                                  if (
                                    ((j = ft.getAttributeNode("id")),
                                    j && j.value === w)
                                  )
                                    return [ft];
                              }
                              return [];
                            }
                          })),
                      (f.find.TAG = c.getElementsByTagName
                        ? function (w, q) {
                            if (typeof q.getElementsByTagName < "u")
                              return q.getElementsByTagName(w);
                            if (c.qsa) return q.querySelectorAll(w);
                          }
                        : function (w, q) {
                            var j,
                              P = [],
                              et = 0,
                              ft = q.getElementsByTagName(w);
                            if (w === "*") {
                              for (; (j = ft[et++]); )
                                j.nodeType === 1 && P.push(j);
                              return P;
                            }
                            return ft;
                          }),
                      (f.find.CLASS =
                        c.getElementsByClassName &&
                        function (w, q) {
                          if (typeof q.getElementsByClassName < "u" && C)
                            return q.getElementsByClassName(w);
                        }),
                      (X = []),
                      (U = []),
                      (c.qsa = Ee.test($.querySelectorAll)) &&
                        (Jt(function (w) {
                          var q;
                          (z.appendChild(w).innerHTML =
                            "<a id='" +
                            J +
                            "'></a><select id='" +
                            J +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            w.querySelectorAll("[msallowcapture^='']").length &&
                              U.push("[*^$]=" + Z + `*(?:''|"")`),
                            w.querySelectorAll("[selected]").length ||
                              U.push("\\[" + Z + "*(?:value|" + V + ")"),
                            w.querySelectorAll("[id~=" + J + "-]").length ||
                              U.push("~="),
                            (q = $.createElement("input")),
                            q.setAttribute("name", ""),
                            w.appendChild(q),
                            w.querySelectorAll("[name='']").length ||
                              U.push(
                                "\\[" +
                                  Z +
                                  "*name" +
                                  Z +
                                  "*=" +
                                  Z +
                                  `*(?:''|"")`,
                              ),
                            w.querySelectorAll(":checked").length ||
                              U.push(":checked"),
                            w.querySelectorAll("a#" + J + "+*").length ||
                              U.push(".#.+[+~]"),
                            w.querySelectorAll("\\\f"),
                            U.push("[\\r\\n\\f]");
                        }),
                        Jt(function (w) {
                          w.innerHTML =
                            "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                          var q = $.createElement("input");
                          q.setAttribute("type", "hidden"),
                            w.appendChild(q).setAttribute("name", "D"),
                            w.querySelectorAll("[name=d]").length &&
                              U.push("name" + Z + "*[*^$|!~]?="),
                            w.querySelectorAll(":enabled").length !== 2 &&
                              U.push(":enabled", ":disabled"),
                            (z.appendChild(w).disabled = !0),
                            w.querySelectorAll(":disabled").length !== 2 &&
                              U.push(":enabled", ":disabled"),
                            w.querySelectorAll("*,:x"),
                            U.push(",.*:");
                        })),
                      (c.matchesSelector = Ee.test(
                        (F =
                          z.matches ||
                          z.webkitMatchesSelector ||
                          z.mozMatchesSelector ||
                          z.oMatchesSelector ||
                          z.msMatchesSelector),
                      )) &&
                        Jt(function (w) {
                          (c.disconnectedMatch = F.call(w, "*")),
                            F.call(w, "[s!='']:x"),
                            X.push("!=", pt);
                        }),
                      c.cssHas || U.push(":has"),
                      (U = U.length && new RegExp(U.join("|"))),
                      (X = X.length && new RegExp(X.join("|"))),
                      (y = Ee.test(z.compareDocumentPosition)),
                      (nt =
                        y || Ee.test(z.contains)
                          ? function (w, q) {
                              var j =
                                  (w.nodeType === 9 && w.documentElement) || w,
                                P = q && q.parentNode;
                              return (
                                w === P ||
                                !!(
                                  P &&
                                  P.nodeType === 1 &&
                                  (j.contains
                                    ? j.contains(P)
                                    : w.compareDocumentPosition &&
                                      w.compareDocumentPosition(P) & 16)
                                )
                              );
                            }
                          : function (w, q) {
                              if (q) {
                                for (; (q = q.parentNode); )
                                  if (q === w) return !0;
                              }
                              return !1;
                            }),
                      (Bt = y
                        ? function (w, q) {
                            if (w === q) return (L = !0), 0;
                            var j =
                              !w.compareDocumentPosition -
                              !q.compareDocumentPosition;
                            return (
                              j ||
                              ((j =
                                (w.ownerDocument || w) == (q.ownerDocument || q)
                                  ? w.compareDocumentPosition(q)
                                  : 1),
                              j & 1 ||
                              (!c.sortDetached &&
                                q.compareDocumentPosition(w) === j)
                                ? w == $ || (w.ownerDocument == K && nt(K, w))
                                  ? -1
                                  : q == $ || (q.ownerDocument == K && nt(K, q))
                                    ? 1
                                    : k
                                      ? S(k, w) - S(k, q)
                                      : 0
                                : j & 4
                                  ? -1
                                  : 1)
                            );
                          }
                        : function (w, q) {
                            if (w === q) return (L = !0), 0;
                            var j,
                              P = 0,
                              et = w.parentNode,
                              ft = q.parentNode,
                              st = [w],
                              ot = [q];
                            if (!et || !ft)
                              return w == $
                                ? -1
                                : q == $
                                  ? 1
                                  : et
                                    ? -1
                                    : ft
                                      ? 1
                                      : k
                                        ? S(k, w) - S(k, q)
                                        : 0;
                            if (et === ft) return Gu(w, q);
                            for (j = w; (j = j.parentNode); ) st.unshift(j);
                            for (j = q; (j = j.parentNode); ) ot.unshift(j);
                            for (; st[P] === ot[P]; ) P++;
                            return P
                              ? Gu(st[P], ot[P])
                              : st[P] == K
                                ? -1
                                : ot[P] == K
                                  ? 1
                                  : 0;
                          })),
                    $
                  );
                }),
              (Mt.matches = function (h, y) {
                return Mt(h, null, null, y);
              }),
              (Mt.matchesSelector = function (h, y) {
                if (
                  (Q(h),
                  c.matchesSelector &&
                    C &&
                    !Ct[y + " "] &&
                    (!X || !X.test(y)) &&
                    (!U || !U.test(y)))
                )
                  try {
                    var A = F.call(h, y);
                    if (
                      A ||
                      c.disconnectedMatch ||
                      (h.document && h.document.nodeType !== 11)
                    )
                      return A;
                  } catch {
                    Ct(y, !0);
                  }
                return Mt(y, $, null, [h]).length > 0;
              }),
              (Mt.contains = function (h, y) {
                return (h.ownerDocument || h) != $ && Q(h), nt(h, y);
              }),
              (Mt.attr = function (h, y) {
                (h.ownerDocument || h) != $ && Q(h);
                var A = f.attrHandle[y.toLowerCase()],
                  H =
                    A && $t.call(f.attrHandle, y.toLowerCase())
                      ? A(h, y, !C)
                      : void 0;
                return H !== void 0
                  ? H
                  : c.attributes || !C
                    ? h.getAttribute(y)
                    : (H = h.getAttributeNode(y)) && H.specified
                      ? H.value
                      : null;
              }),
              (Mt.escape = function (h) {
                return (h + "").replace(qu, xa);
              }),
              (Mt.error = function (h) {
                throw new Error("Syntax error, unrecognized expression: " + h);
              }),
              (Mt.uniqueSort = function (h) {
                var y,
                  A = [],
                  H = 0,
                  w = 0;
                if (
                  ((L = !c.detectDuplicates),
                  (k = !c.sortStable && h.slice(0)),
                  h.sort(Bt),
                  L)
                ) {
                  for (; (y = h[w++]); ) y === h[w] && (H = A.push(w));
                  for (; H--; ) h.splice(A[H], 1);
                }
                return (k = null), h;
              }),
              (m = Mt.getText =
                function (h) {
                  var y,
                    A = "",
                    H = 0,
                    w = h.nodeType;
                  if (w) {
                    if (w === 1 || w === 9 || w === 11) {
                      if (typeof h.textContent == "string")
                        return h.textContent;
                      for (h = h.firstChild; h; h = h.nextSibling) A += m(h);
                    } else if (w === 3 || w === 4) return h.nodeValue;
                  } else for (; (y = h[H++]); ) A += m(y);
                  return A;
                }),
              (f = Mt.selectors =
                {
                  cacheLength: 50,
                  createPseudo: ue,
                  match: Nn,
                  attrHandle: {},
                  find: {},
                  relative: {
                    ">": { dir: "parentNode", first: !0 },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: !0 },
                    "~": { dir: "previousSibling" },
                  },
                  preFilter: {
                    ATTR: function (h) {
                      return (
                        (h[1] = h[1].replace(Ye, _e)),
                        (h[3] = (h[3] || h[4] || h[5] || "").replace(Ye, _e)),
                        h[2] === "~=" && (h[3] = " " + h[3] + " "),
                        h.slice(0, 4)
                      );
                    },
                    CHILD: function (h) {
                      return (
                        (h[1] = h[1].toLowerCase()),
                        h[1].slice(0, 3) === "nth"
                          ? (h[3] || Mt.error(h[0]),
                            (h[4] = +(h[4]
                              ? h[5] + (h[6] || 1)
                              : 2 * (h[3] === "even" || h[3] === "odd"))),
                            (h[5] = +(h[7] + h[8] || h[3] === "odd")))
                          : h[3] && Mt.error(h[0]),
                        h
                      );
                    },
                    PSEUDO: function (h) {
                      var y,
                        A = !h[6] && h[2];
                      return Nn.CHILD.test(h[0])
                        ? null
                        : (h[3]
                            ? (h[2] = h[4] || h[5] || "")
                            : A &&
                              Cl.test(A) &&
                              (y = E(A, !0)) &&
                              (y = A.indexOf(")", A.length - y) - A.length) &&
                              ((h[0] = h[0].slice(0, y)),
                              (h[2] = A.slice(0, y))),
                          h.slice(0, 3));
                    },
                  },
                  filter: {
                    TAG: function (h) {
                      var y = h.replace(Ye, _e).toLowerCase();
                      return h === "*"
                        ? function () {
                            return !0;
                          }
                        : function (A) {
                            return A.nodeName && A.nodeName.toLowerCase() === y;
                          };
                    },
                    CLASS: function (h) {
                      var y = Rt[h + " "];
                      return (
                        y ||
                        ((y = new RegExp(
                          "(^|" + Z + ")" + h + "(" + Z + "|$)",
                        )) &&
                          Rt(h, function (A) {
                            return y.test(
                              (typeof A.className == "string" && A.className) ||
                                (typeof A.getAttribute < "u" &&
                                  A.getAttribute("class")) ||
                                "",
                            );
                          }))
                      );
                    },
                    ATTR: function (h, y, A) {
                      return function (H) {
                        var w = Mt.attr(H, h);
                        return w == null
                          ? y === "!="
                          : y
                            ? ((w += ""),
                              y === "="
                                ? w === A
                                : y === "!="
                                  ? w !== A
                                  : y === "^="
                                    ? A && w.indexOf(A) === 0
                                    : y === "*="
                                      ? A && w.indexOf(A) > -1
                                      : y === "$="
                                        ? A && w.slice(-A.length) === A
                                        : y === "~="
                                          ? (
                                              " " +
                                              w.replace(ht, " ") +
                                              " "
                                            ).indexOf(A) > -1
                                          : y === "|="
                                            ? w === A ||
                                              w.slice(0, A.length + 1) ===
                                                A + "-"
                                            : !1)
                            : !0;
                      };
                    },
                    CHILD: function (h, y, A, H, w) {
                      var q = h.slice(0, 3) !== "nth",
                        j = h.slice(-4) !== "last",
                        P = y === "of-type";
                      return H === 1 && w === 0
                        ? function (et) {
                            return !!et.parentNode;
                          }
                        : function (et, ft, st) {
                            var ot,
                              St,
                              zt,
                              rt,
                              Ft,
                              Pt,
                              Ut = q !== j ? "nextSibling" : "previousSibling",
                              Qt = et.parentNode,
                              Hn = P && et.nodeName.toLowerCase(),
                              Ne = !st && !P,
                              ie = !1;
                            if (Qt) {
                              if (q) {
                                for (; Ut; ) {
                                  for (rt = et; (rt = rt[Ut]); )
                                    if (
                                      P
                                        ? rt.nodeName.toLowerCase() === Hn
                                        : rt.nodeType === 1
                                    )
                                      return !1;
                                  Pt = Ut =
                                    h === "only" && !Pt && "nextSibling";
                                }
                                return !0;
                              }
                              if (
                                ((Pt = [j ? Qt.firstChild : Qt.lastChild]),
                                j && Ne)
                              ) {
                                for (
                                  rt = Qt,
                                    zt = rt[J] || (rt[J] = {}),
                                    St =
                                      zt[rt.uniqueID] || (zt[rt.uniqueID] = {}),
                                    ot = St[h] || [],
                                    Ft = ot[0] === gt && ot[1],
                                    ie = Ft && ot[2],
                                    rt = Ft && Qt.childNodes[Ft];
                                  (rt =
                                    (++Ft && rt && rt[Ut]) ||
                                    (ie = Ft = 0) ||
                                    Pt.pop());

                                )
                                  if (rt.nodeType === 1 && ++ie && rt === et) {
                                    St[h] = [gt, Ft, ie];
                                    break;
                                  }
                              } else if (
                                (Ne &&
                                  ((rt = et),
                                  (zt = rt[J] || (rt[J] = {})),
                                  (St =
                                    zt[rt.uniqueID] || (zt[rt.uniqueID] = {})),
                                  (ot = St[h] || []),
                                  (Ft = ot[0] === gt && ot[1]),
                                  (ie = Ft)),
                                ie === !1)
                              )
                                for (
                                  ;
                                  (rt =
                                    (++Ft && rt && rt[Ut]) ||
                                    (ie = Ft = 0) ||
                                    Pt.pop()) &&
                                  !(
                                    (P
                                      ? rt.nodeName.toLowerCase() === Hn
                                      : rt.nodeType === 1) &&
                                    ++ie &&
                                    (Ne &&
                                      ((zt = rt[J] || (rt[J] = {})),
                                      (St =
                                        zt[rt.uniqueID] ||
                                        (zt[rt.uniqueID] = {})),
                                      (St[h] = [gt, ie])),
                                    rt === et)
                                  );

                                );
                              return (
                                (ie -= w),
                                ie === H || (ie % H === 0 && ie / H >= 0)
                              );
                            }
                          };
                    },
                    PSEUDO: function (h, y) {
                      var A,
                        H =
                          f.pseudos[h] ||
                          f.setFilters[h.toLowerCase()] ||
                          Mt.error("unsupported pseudo: " + h);
                      return H[J]
                        ? H(y)
                        : H.length > 1
                          ? ((A = [h, h, "", y]),
                            f.setFilters.hasOwnProperty(h.toLowerCase())
                              ? ue(function (w, q) {
                                  for (
                                    var j, P = H(w, y), et = P.length;
                                    et--;

                                  )
                                    (j = S(w, P[et])), (w[j] = !(q[j] = P[et]));
                                })
                              : function (w) {
                                  return H(w, 0, A);
                                })
                          : H;
                    },
                  },
                  pseudos: {
                    not: ue(function (h) {
                      var y = [],
                        A = [],
                        H = b(h.replace(Wt, "$1"));
                      return H[J]
                        ? ue(function (w, q, j, P) {
                            for (
                              var et, ft = H(w, null, P, []), st = w.length;
                              st--;

                            )
                              (et = ft[st]) && (w[st] = !(q[st] = et));
                          })
                        : function (w, q, j) {
                            return (
                              (y[0] = w),
                              H(y, null, j, A),
                              (y[0] = null),
                              !A.pop()
                            );
                          };
                    }),
                    has: ue(function (h) {
                      return function (y) {
                        return Mt(h, y).length > 0;
                      };
                    }),
                    contains: ue(function (h) {
                      return (
                        (h = h.replace(Ye, _e)),
                        function (y) {
                          return (y.textContent || m(y)).indexOf(h) > -1;
                        }
                      );
                    }),
                    lang: ue(function (h) {
                      return (
                        wa.test(h || "") || Mt.error("unsupported lang: " + h),
                        (h = h.replace(Ye, _e).toLowerCase()),
                        function (y) {
                          var A;
                          do
                            if (
                              (A = C
                                ? y.lang
                                : y.getAttribute("xml:lang") ||
                                  y.getAttribute("lang"))
                            )
                              return (
                                (A = A.toLowerCase()),
                                A === h || A.indexOf(h + "-") === 0
                              );
                          while ((y = y.parentNode) && y.nodeType === 1);
                          return !1;
                        }
                      );
                    }),
                    target: function (h) {
                      var y = r.location && r.location.hash;
                      return y && y.slice(1) === h.id;
                    },
                    root: function (h) {
                      return h === z;
                    },
                    focus: function (h) {
                      return (
                        h === $.activeElement &&
                        (!$.hasFocus || $.hasFocus()) &&
                        !!(h.type || h.href || ~h.tabIndex)
                      );
                    },
                    enabled: rl(!1),
                    disabled: rl(!0),
                    checked: function (h) {
                      var y = h.nodeName.toLowerCase();
                      return (
                        (y === "input" && !!h.checked) ||
                        (y === "option" && !!h.selected)
                      );
                    },
                    selected: function (h) {
                      return (
                        h.parentNode && h.parentNode.selectedIndex,
                        h.selected === !0
                      );
                    },
                    empty: function (h) {
                      for (h = h.firstChild; h; h = h.nextSibling)
                        if (h.nodeType < 6) return !1;
                      return !0;
                    },
                    parent: function (h) {
                      return !f.pseudos.empty(h);
                    },
                    header: function (h) {
                      return Nr.test(h.nodeName);
                    },
                    input: function (h) {
                      return zr.test(h.nodeName);
                    },
                    button: function (h) {
                      var y = h.nodeName.toLowerCase();
                      return (
                        (y === "input" && h.type === "button") || y === "button"
                      );
                    },
                    text: function (h) {
                      var y;
                      return (
                        h.nodeName.toLowerCase() === "input" &&
                        h.type === "text" &&
                        ((y = h.getAttribute("type")) == null ||
                          y.toLowerCase() === "text")
                      );
                    },
                    first: Me(function () {
                      return [0];
                    }),
                    last: Me(function (h, y) {
                      return [y - 1];
                    }),
                    eq: Me(function (h, y, A) {
                      return [A < 0 ? A + y : A];
                    }),
                    even: Me(function (h, y) {
                      for (var A = 0; A < y; A += 2) h.push(A);
                      return h;
                    }),
                    odd: Me(function (h, y) {
                      for (var A = 1; A < y; A += 2) h.push(A);
                      return h;
                    }),
                    lt: Me(function (h, y, A) {
                      for (var H = A < 0 ? A + y : A > y ? y : A; --H >= 0; )
                        h.push(H);
                      return h;
                    }),
                    gt: Me(function (h, y, A) {
                      for (var H = A < 0 ? A + y : A; ++H < y; ) h.push(H);
                      return h;
                    }),
                  },
                }),
              (f.pseudos.nth = f.pseudos.eq);
            for (s in {
              radio: !0,
              checkbox: !0,
              file: !0,
              password: !0,
              image: !0,
            })
              f.pseudos[s] = Hr(s);
            for (s in { submit: !0, reset: !0 }) f.pseudos[s] = Hl(s);
            function Un() {}
            (Un.prototype = f.filters = f.pseudos),
              (f.setFilters = new Un()),
              (E = Mt.tokenize =
                function (h, y) {
                  var A,
                    H,
                    w,
                    q,
                    j,
                    P,
                    et,
                    ft = Tt[h + " "];
                  if (ft) return y ? 0 : ft.slice(0);
                  for (j = h, P = [], et = f.preFilter; j; ) {
                    (!A || (H = Kt.exec(j))) &&
                      (H && (j = j.slice(H[0].length) || j), P.push((w = []))),
                      (A = !1),
                      (H = We.exec(j)) &&
                        ((A = H.shift()),
                        w.push({ value: A, type: H[0].replace(Wt, " ") }),
                        (j = j.slice(A.length)));
                    for (q in f.filter)
                      (H = Nn[q].exec(j)) &&
                        (!et[q] || (H = et[q](H))) &&
                        ((A = H.shift()),
                        w.push({ value: A, type: q, matches: H }),
                        (j = j.slice(A.length)));
                    if (!A) break;
                  }
                  return y ? j.length : j ? Mt.error(h) : Tt(h, P).slice(0);
                });
            function Ll(h) {
              for (var y = 0, A = h.length, H = ""; y < A; y++) H += h[y].value;
              return H;
            }
            function cl(h, y, A) {
              var H = y.dir,
                w = y.next,
                q = w || H,
                j = A && q === "parentNode",
                P = Ot++;
              return y.first
                ? function (et, ft, st) {
                    for (; (et = et[H]); )
                      if (et.nodeType === 1 || j) return h(et, ft, st);
                    return !1;
                  }
                : function (et, ft, st) {
                    var ot,
                      St,
                      zt,
                      rt = [gt, P];
                    if (st) {
                      for (; (et = et[H]); )
                        if ((et.nodeType === 1 || j) && h(et, ft, st))
                          return !0;
                    } else
                      for (; (et = et[H]); )
                        if (et.nodeType === 1 || j)
                          if (
                            ((zt = et[J] || (et[J] = {})),
                            (St = zt[et.uniqueID] || (zt[et.uniqueID] = {})),
                            w && w === et.nodeName.toLowerCase())
                          )
                            et = et[H] || et;
                          else {
                            if ((ot = St[q]) && ot[0] === gt && ot[1] === P)
                              return (rt[2] = ot[2]);
                            if (((St[q] = rt), (rt[2] = h(et, ft, st))))
                              return !0;
                          }
                    return !1;
                  };
            }
            function ql(h) {
              return h.length > 1
                ? function (y, A, H) {
                    for (var w = h.length; w--; ) if (!h[w](y, A, H)) return !1;
                    return !0;
                  }
                : h[0];
            }
            function Da(h, y, A) {
              for (var H = 0, w = y.length; H < w; H++) Mt(h, y[H], A);
              return A;
            }
            function ln(h, y, A, H, w) {
              for (
                var q, j = [], P = 0, et = h.length, ft = y != null;
                P < et;
                P++
              )
                (q = h[P]) &&
                  (!A || A(q, H, w)) &&
                  (j.push(q), ft && y.push(P));
              return j;
            }
            function Oa(h, y, A, H, w, q) {
              return (
                H && !H[J] && (H = Oa(H)),
                w && !w[J] && (w = Oa(w, q)),
                ue(function (j, P, et, ft) {
                  var st,
                    ot,
                    St,
                    zt = [],
                    rt = [],
                    Ft = P.length,
                    Pt = j || Da(y || "*", et.nodeType ? [et] : et, []),
                    Ut = h && (j || !y) ? ln(Pt, zt, h, et, ft) : Pt,
                    Qt = A ? (w || (j ? h : Ft || H) ? [] : P) : Ut;
                  if ((A && A(Ut, Qt, et, ft), H))
                    for (
                      st = ln(Qt, rt), H(st, [], et, ft), ot = st.length;
                      ot--;

                    )
                      (St = st[ot]) && (Qt[rt[ot]] = !(Ut[rt[ot]] = St));
                  if (j) {
                    if (w || h) {
                      if (w) {
                        for (st = [], ot = Qt.length; ot--; )
                          (St = Qt[ot]) && st.push((Ut[ot] = St));
                        w(null, (Qt = []), st, ft);
                      }
                      for (ot = Qt.length; ot--; )
                        (St = Qt[ot]) &&
                          (st = w ? S(j, St) : zt[ot]) > -1 &&
                          (j[st] = !(P[st] = St));
                    }
                  } else
                    (Qt = ln(Qt === P ? Qt.splice(Ft, Qt.length) : Qt)),
                      w ? w(null, P, Qt, ft) : tt.apply(P, Qt);
                })
              );
            }
            function Bl(h) {
              for (
                var y,
                  A,
                  H,
                  w = h.length,
                  q = f.relative[h[0].type],
                  j = q || f.relative[" "],
                  P = q ? 1 : 0,
                  et = cl(
                    function (ot) {
                      return ot === y;
                    },
                    j,
                    !0,
                  ),
                  ft = cl(
                    function (ot) {
                      return S(y, ot) > -1;
                    },
                    j,
                    !0,
                  ),
                  st = [
                    function (ot, St, zt) {
                      var rt =
                        (!q && (zt || St !== O)) ||
                        ((y = St).nodeType ? et(ot, St, zt) : ft(ot, St, zt));
                      return (y = null), rt;
                    },
                  ];
                P < w;
                P++
              )
                if ((A = f.relative[h[P].type])) st = [cl(ql(st), A)];
                else {
                  if (
                    ((A = f.filter[h[P].type].apply(null, h[P].matches)), A[J])
                  ) {
                    for (H = ++P; H < w && !f.relative[h[H].type]; H++);
                    return Oa(
                      P > 1 && ql(st),
                      P > 1 &&
                        Ll(
                          h
                            .slice(0, P - 1)
                            .concat({
                              value: h[P - 2].type === " " ? "*" : "",
                            }),
                        ).replace(Wt, "$1"),
                      A,
                      P < H && Bl(h.slice(P, H)),
                      H < w && Bl((h = h.slice(H))),
                      H < w && Ll(h),
                    );
                  }
                  st.push(A);
                }
              return ql(st);
            }
            function Yu(h, y) {
              var A = y.length > 0,
                H = h.length > 0,
                w = function (q, j, P, et, ft) {
                  var st,
                    ot,
                    St,
                    zt = 0,
                    rt = "0",
                    Ft = q && [],
                    Pt = [],
                    Ut = O,
                    Qt = q || (H && f.find.TAG("*", ft)),
                    Hn = (gt += Ut == null ? 1 : Math.random() || 0.1),
                    Ne = Qt.length;
                  for (
                    ft && (O = j == $ || j || ft);
                    rt !== Ne && (st = Qt[rt]) != null;
                    rt++
                  ) {
                    if (H && st) {
                      for (
                        ot = 0,
                          !j && st.ownerDocument != $ && (Q(st), (P = !C));
                        (St = h[ot++]);

                      )
                        if (St(st, j || $, P)) {
                          et.push(st);
                          break;
                        }
                      ft && (gt = Hn);
                    }
                    A && ((st = !St && st) && zt--, q && Ft.push(st));
                  }
                  if (((zt += rt), A && rt !== zt)) {
                    for (ot = 0; (St = y[ot++]); ) St(Ft, Pt, j, P);
                    if (q) {
                      if (zt > 0)
                        for (; rt--; )
                          Ft[rt] || Pt[rt] || (Pt[rt] = _.call(et));
                      Pt = ln(Pt);
                    }
                    tt.apply(et, Pt),
                      ft &&
                        !q &&
                        Pt.length > 0 &&
                        zt + y.length > 1 &&
                        Mt.uniqueSort(et);
                  }
                  return ft && ((gt = Hn), (O = Ut)), Ft;
                };
              return A ? ue(w) : w;
            }
            (b = Mt.compile =
              function (h, y) {
                var A,
                  H = [],
                  w = [],
                  q = qt[h + " "];
                if (!q) {
                  for (y || (y = E(h)), A = y.length; A--; )
                    (q = Bl(y[A])), q[J] ? H.push(q) : w.push(q);
                  (q = qt(h, Yu(w, H))), (q.selector = h);
                }
                return q;
              }),
              (p = Mt.select =
                function (h, y, A, H) {
                  var w,
                    q,
                    j,
                    P,
                    et,
                    ft = typeof h == "function" && h,
                    st = !H && E((h = ft.selector || h));
                  if (((A = A || []), st.length === 1)) {
                    if (
                      ((q = st[0] = st[0].slice(0)),
                      q.length > 2 &&
                        (j = q[0]).type === "ID" &&
                        y.nodeType === 9 &&
                        C &&
                        f.relative[q[1].type])
                    ) {
                      if (
                        ((y = (f.find.ID(j.matches[0].replace(Ye, _e), y) ||
                          [])[0]),
                        y)
                      )
                        ft && (y = y.parentNode);
                      else return A;
                      h = h.slice(q.shift().value.length);
                    }
                    for (
                      w = Nn.needsContext.test(h) ? 0 : q.length;
                      w-- && ((j = q[w]), !f.relative[(P = j.type)]);

                    )
                      if (
                        (et = f.find[P]) &&
                        (H = et(
                          j.matches[0].replace(Ye, _e),
                          (Ul.test(q[0].type) && Cn(y.parentNode)) || y,
                        ))
                      ) {
                        if ((q.splice(w, 1), (h = H.length && Ll(q)), !h))
                          return tt.apply(A, H), A;
                        break;
                      }
                  }
                  return (
                    (ft || b(h, st))(
                      H,
                      y,
                      !C,
                      A,
                      !y || (Ul.test(h) && Cn(y.parentNode)) || y,
                    ),
                    A
                  );
                }),
              (c.sortStable = J.split("").sort(Bt).join("") === J),
              (c.detectDuplicates = !!L),
              Q(),
              (c.sortDetached = Jt(function (h) {
                return (
                  h.compareDocumentPosition($.createElement("fieldset")) & 1
                );
              })),
              Jt(function (h) {
                return (
                  (h.innerHTML = "<a href='#'></a>"),
                  h.firstChild.getAttribute("href") === "#"
                );
              }) ||
                _a("type|href|height|width", function (h, y, A) {
                  if (!A)
                    return h.getAttribute(
                      y,
                      y.toLowerCase() === "type" ? 1 : 2,
                    );
                }),
              (!c.attributes ||
                !Jt(function (h) {
                  return (
                    (h.innerHTML = "<input/>"),
                    h.firstChild.setAttribute("value", ""),
                    h.firstChild.getAttribute("value") === ""
                  );
                })) &&
                _a("value", function (h, y, A) {
                  if (!A && h.nodeName.toLowerCase() === "input")
                    return h.defaultValue;
                }),
              Jt(function (h) {
                return h.getAttribute("disabled") == null;
              }) ||
                _a(V, function (h, y, A) {
                  var H;
                  if (!A)
                    return h[y] === !0
                      ? y.toLowerCase()
                      : (H = h.getAttributeNode(y)) && H.specified
                        ? H.value
                        : null;
                });
            var Ra = r.Sizzle;
            (Mt.noConflict = function () {
              return r.Sizzle === Mt && (r.Sizzle = Ra), Mt;
            }),
              a.exports ? (a.exports = Mt) : (r.Sizzle = Mt);
          })(window);
        })(Ii)),
      Ii.exports
    );
  }
  var fg = og();
  const Zs = Dn(fg),
    dg = { name: "Browser MCP" };
  function Ks(a) {
    return a.includes(":contains");
  }
  function Js(a) {
    if (a.includes(":contains") && a.includes("html:nth-of-type(1)"))
      return a.replace("html:nth-of-type(1)", "html");
    if (a.includes(":scope")) {
      const r = /^:scope\s*[>+~]?\s*/;
      return a.replace(r, "");
    }
    return a;
  }
  function al(a, r = document) {
    if (!a) return [];
    const s = a.split(">>>");
    if (s.length === 1)
      return Ks(a) ? Zs(Js(a), r) : Array.from(r.querySelectorAll(a));
    const [c, ...f] = s,
      m = f.join(">>>").trim();
    return al(c, r).reduce(
      (E, b) => (b.shadowRoot ? [...E, ...al(m, b.shadowRoot)] : E),
      [],
    );
  }
  function ks(a, r = document) {
    const s = al(a, r);
    return s.length > 0 ? s[0] : null;
  }
  async function hg(a, r, s) {
    return new Promise((c, f) => {
      async function m() {
        let E;
        try {
          E = await s();
        } catch (b) {
          f(b), g.disconnect();
          return;
        }
        E && (c(E), g.disconnect());
      }
      const g = new MutationObserver(() => m());
      g.observe(a, r), m();
    });
  }
  async function $s(a) {
    return new Promise((r, s) => {
      async function c() {
        let f;
        try {
          f = await a();
        } catch (m) {
          s(m);
          return;
        }
        if (!f) {
          window.requestAnimationFrame(c);
          return;
        }
        r(f);
      }
      window.requestAnimationFrame(c);
    });
  }
  const mg = 30;
  async function _l(a, r = {}) {
    const {
        timeoutMs: s = mg * 1e3,
        scope: c = document,
        stable: f,
        visible: m,
        attached: g = !0,
        clickable: E,
      } = r,
      b = { childList: !0, subtree: !0, attributes: !0 };
    let p = "exist";
    const O = [];
    return cg(
      async () =>
        hg(c, b, async () => {
          const L = ks(a, c);
          if (!(!L || O.includes(L))) {
            if (
              (O.push(L),
              f && ((p = "stable"), await Wi(L)),
              m && ((p = "visible"), await $s(() => Pi(L))),
              E && ((p = "clickable"), await $s(() => vg(L))),
              g && !L.isConnected)
            ) {
              p = "attached";
              return;
            }
            return L;
          }
        }),
      {
        timeoutMs: s,
        errorMessage: () =>
          `Timeout exceeded waiting for element to ${p === "exist" ? p : `become ${p}`}: ${a}`,
      },
    );
  }
  function Fs(a) {
    const r = a.getClientRects();
    if (r.length === 0) return null;
    const s = r[0];
    return { x: s.x + s.width / 2, y: s.y + s.height / 2 };
  }
  function gg(a) {
    const r = Fs(a);
    if (!r) return [];
    const { x: s, y: c } = r;
    return to(s, c);
  }
  function yg(a) {
    return gg(a)[0] ?? null;
  }
  function vg(a) {
    const r = yg(a);
    return r ? [r, ...pa(r)].includes(a) : !1;
  }
  function bg(a) {
    if ((a.focus(), Sg(a))) {
      const r = document.getSelection();
      if (!r) throw new Error("Unable to get selection.");
      r.removeAllRanges(), r.selectAllChildren(a);
    } else if (pg(a)) a.select();
    else
      throw new Error(
        `Unable to select text in element: ${a.tagName.toLowerCase()}`,
      );
  }
  function pg(a) {
    if (a instanceof HTMLTextAreaElement) return !0;
    if (!(a instanceof HTMLInputElement)) return !1;
    const r = [
        "email",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "url",
        "datetime",
      ],
      s = a.getAttribute("type");
    return !s || r.includes(s);
  }
  function Sg(a) {
    return a instanceof HTMLElement && a.isContentEditable;
  }
  async function Wi(a) {
    let r = a.getBoundingClientRect();
    return (
      await Eg(),
      new Promise((s) => {
        function c() {
          const f = a.getBoundingClientRect();
          if (Dg(r, f)) {
            s();
            return;
          }
          (r = f), window.requestAnimationFrame(c);
        }
        c();
      })
    );
  }
  function Eg() {
    return new Promise((a) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          a();
        });
      });
    });
  }
  function Is(a, r = {}) {
    const { force: s } = r;
    if (wg(a) && !s) return;
    const c = (f) => {
      a.scrollIntoView({ block: f, inline: "center", behavior: "instant" });
    };
    if (a instanceof HTMLElement) {
      const f = document.documentElement.clientHeight;
      if (a.offsetHeight > f) {
        const g = a.style.scrollMarginTop;
        (a.style.scrollMarginTop = "100px"),
          c("start"),
          (a.style.scrollMarginTop = g);
        return;
      }
    }
    c("center");
  }
  function Pi(a) {
    const { width: r, height: s } = a.getBoundingClientRect(),
      c = window.getComputedStyle(a);
    return (r > 0 &&
      s > 0 &&
      c.visibility !== "hidden" &&
      c.display !== "none") ||
      Ws(a, "::before") ||
      Ws(a, "::after")
      ? !0
      : c.display === "contents"
        ? lo(a).some((m) => Pi(m))
        : !1;
  }
  function Ws(a, r) {
    const s = window.getComputedStyle(a, r);
    if (!(s.content !== "normal" && s.content !== "none")) return !1;
    const f = ({ value: E, dimension: b }) => {
        if (E.endsWith("%")) {
          const p = Number.parseInt(E);
          return (a.getBoundingClientRect()[b] * p) / 100;
        } else return Number.parseInt(E);
      },
      m = f({ value: s.width, dimension: "width" }),
      g = f({ value: s.height, dimension: "height" });
    return (
      m > 0 &&
      g > 0 &&
      s.visibility !== "hidden" &&
      s.display !== "none" &&
      !Tg(a)
    );
  }
  function Tg(a) {
    let r = a;
    for (; r; ) {
      const s = window.getComputedStyle(r);
      if (s.display === "none" || s.visibility === "hidden") return !0;
      r = r.parentElement;
    }
    return !1;
  }
  function Ag(a) {
    const { top: r, left: s, bottom: c, right: f } = a.getBoundingClientRect(),
      m =
        c < 0 ||
        f < 0 ||
        s > document.documentElement.clientWidth ||
        r > document.documentElement.clientHeight;
    return Pi(a) && !m;
  }
  function wg(a) {
    var m, g;
    const { top: r, left: s, bottom: c, right: f } = a.getBoundingClientRect();
    return (
      r >= 0 &&
      s >= 0 &&
      c <=
        (((m = window.visualViewport) == null ? void 0 : m.height) ??
          document.documentElement.clientHeight) &&
      f <=
        (((g = window.visualViewport) == null ? void 0 : g.width) ??
          document.documentElement.clientWidth)
    );
  }
  function Mg(a, r) {
    return r.map((c) => c.toLowerCase()).includes(a.tagName.toLowerCase());
  }
  function Ps(a, r) {
    if (Mg(a, r)) return a;
    const s = no(a);
    return s ? Ps(s, r) : null;
  }
  function to(a, r, s = document, c = []) {
    return s
      .elementsFromPoint(a, r)
      .reduce((g, E) => {
        const b = E.shadowRoot;
        if (b && !c.includes(b)) {
          c.push(b);
          const k = to(a, r, b, c).filter((L) => !g.includes(L));
          return [...g, ...k];
        }
        if (g.includes(E)) return g;
        const p = E.parentElement,
          O = p && _g(p) ? [E, p] : [E];
        return [...g, ...O];
      }, [])
      .filter((g) => !xg(g));
  }
  function xg(a) {
    const r = eo();
    return !!Ps(a, [r]);
  }
  function eo() {
    return `${dg.name.toLowerCase().replace(/\s+/g, "-")}-container`;
  }
  function _g(a) {
    if (["tr", "tbody", "thead", "tfoot"].includes(a.tagName.toLowerCase()))
      return !0;
    const s = [
        "table-row",
        "table-row-group",
        "table-header-group",
        "table-footer-group",
      ],
      { display: c } = window.getComputedStyle(a);
    return s.includes(c);
  }
  function Dg(a, r) {
    return (
      a.x === r.x && a.y === r.y && a.width === r.width && a.height === r.height
    );
  }
  function pa(a, r = !0) {
    const s = no(a, r);
    return s ? [s, ...pa(s, r)] : [];
  }
  function no(a, r = !0) {
    return r && a.parentNode instanceof ShadowRoot
      ? a.parentNode.host
      : a.parentElement;
  }
  function lo(a) {
    if (a.children instanceof HTMLCollection) return Array.from(a.children);
    if (a.childNodes instanceof NodeList)
      return Array.from(a.childNodes).filter((r) => r instanceof Element);
    throw new Error(`Unable to get children: ${a}`);
  }
  function tr(a, r, s = document) {
    const c = r.split(">>>");
    if (c.length === 1)
      return Ks(r) ? Zs.matchesSelector(a, Js(r)) : a.matches(r);
    const [f, ...m] = c,
      g = m.join(">>>").trim(),
      E = ks(f, s);
    return !E || !E.shadowRoot ? !1 : tr(a, g, E.shadowRoot);
  }
  const Og = 1e3,
    Rg = 0;
  async function zg(a = {}) {
    const { minStableMs: r = Og, maxMutations: s = Rg, maxWaitMs: c } = a;
    return new Promise((f) => {
      const m = c
        ? window.setTimeout(() => {
            p.disconnect(), f(), window.clearTimeout(b);
          }, c)
        : void 0;
      function g() {
        return window.setTimeout(() => {
          p.disconnect(), f(), window.clearTimeout(m);
        }, r);
      }
      let E = 0,
        b = g();
      const p = new MutationObserver(() => {
        E++, E > s && (window.clearTimeout(b), (b = g()), (E = 0));
      });
      p.observe(document, { childList: !0, subtree: !0 });
    });
  }
  function Ng(a) {
    return [document, ...ao()].reduce(
      (s, c) => [...s, ...Array.from(c.querySelectorAll(a))],
      [],
    );
  }
  function ao(a = document) {
    return Array.from(a.querySelectorAll("*")).reduce((s, c) => {
      const { shadowRoot: f } = c;
      return f ? [...s, f, ...ao(f)] : s;
    }, []);
  }
  var er = { exports: {} },
    Sa = {},
    nr = { exports: {} },
    lr = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var uo;
  function Cg() {
    return (
      uo ||
        ((uo = 1),
        (function (a) {
          function r(_, W) {
            var tt = _.length;
            _.push(W);
            t: for (; 0 < tt; ) {
              var bt = (tt - 1) >>> 1,
                S = _[bt];
              if (0 < f(S, W)) (_[bt] = W), (_[tt] = S), (tt = bt);
              else break t;
            }
          }
          function s(_) {
            return _.length === 0 ? null : _[0];
          }
          function c(_) {
            if (_.length === 0) return null;
            var W = _[0],
              tt = _.pop();
            if (tt !== W) {
              _[0] = tt;
              t: for (var bt = 0, S = _.length, V = S >>> 1; bt < V; ) {
                var Z = 2 * (bt + 1) - 1,
                  I = _[Z],
                  lt = Z + 1,
                  pt = _[lt];
                if (0 > f(I, tt))
                  lt < S && 0 > f(pt, I)
                    ? ((_[bt] = pt), (_[lt] = tt), (bt = lt))
                    : ((_[bt] = I), (_[Z] = tt), (bt = Z));
                else if (lt < S && 0 > f(pt, tt))
                  (_[bt] = pt), (_[lt] = tt), (bt = lt);
                else break t;
              }
            }
            return W;
          }
          function f(_, W) {
            var tt = _.sortIndex - W.sortIndex;
            return tt !== 0 ? tt : _.id - W.id;
          }
          if (
            ((a.unstable_now = void 0),
            typeof performance == "object" &&
              typeof performance.now == "function")
          ) {
            var m = performance;
            a.unstable_now = function () {
              return m.now();
            };
          } else {
            var g = Date,
              E = g.now();
            a.unstable_now = function () {
              return g.now() - E;
            };
          }
          var b = [],
            p = [],
            O = 1,
            k = null,
            L = 3,
            Q = !1,
            $ = !1,
            z = !1,
            C = !1,
            U = typeof setTimeout == "function" ? setTimeout : null,
            X = typeof clearTimeout == "function" ? clearTimeout : null,
            F = typeof setImmediate < "u" ? setImmediate : null;
          function nt(_) {
            for (var W = s(p); W !== null; ) {
              if (W.callback === null) c(p);
              else if (W.startTime <= _)
                c(p), (W.sortIndex = W.expirationTime), r(b, W);
              else break;
              W = s(p);
            }
          }
          function J(_) {
            if (((z = !1), nt(_), !$))
              if (s(b) !== null) ($ = !0), K || ((K = !0), Ct());
              else {
                var W = s(p);
                W !== null && yt(J, W.startTime - _);
              }
          }
          var K = !1,
            gt = -1,
            Ot = 5,
            Rt = -1;
          function Tt() {
            return C ? !0 : !(a.unstable_now() - Rt < Ot);
          }
          function qt() {
            if (((C = !1), K)) {
              var _ = a.unstable_now();
              Rt = _;
              var W = !0;
              try {
                t: {
                  ($ = !1), z && ((z = !1), X(gt), (gt = -1)), (Q = !0);
                  var tt = L;
                  try {
                    e: {
                      for (
                        nt(_), k = s(b);
                        k !== null && !(k.expirationTime > _ && Tt());

                      ) {
                        var bt = k.callback;
                        if (typeof bt == "function") {
                          (k.callback = null), (L = k.priorityLevel);
                          var S = bt(k.expirationTime <= _);
                          if (
                            ((_ = a.unstable_now()), typeof S == "function")
                          ) {
                            (k.callback = S), nt(_), (W = !0);
                            break e;
                          }
                          k === s(b) && c(b), nt(_);
                        } else c(b);
                        k = s(b);
                      }
                      if (k !== null) W = !0;
                      else {
                        var V = s(p);
                        V !== null && yt(J, V.startTime - _), (W = !1);
                      }
                    }
                    break t;
                  } finally {
                    (k = null), (L = tt), (Q = !1);
                  }
                  W = void 0;
                }
              } finally {
                W ? Ct() : (K = !1);
              }
            }
          }
          var Ct;
          if (typeof F == "function")
            Ct = function () {
              F(qt);
            };
          else if (typeof MessageChannel < "u") {
            var Bt = new MessageChannel(),
              $t = Bt.port2;
            (Bt.port1.onmessage = qt),
              (Ct = function () {
                $t.postMessage(null);
              });
          } else
            Ct = function () {
              U(qt, 0);
            };
          function yt(_, W) {
            gt = U(function () {
              _(a.unstable_now());
            }, W);
          }
          (a.unstable_IdlePriority = 5),
            (a.unstable_ImmediatePriority = 1),
            (a.unstable_LowPriority = 4),
            (a.unstable_NormalPriority = 3),
            (a.unstable_Profiling = null),
            (a.unstable_UserBlockingPriority = 2),
            (a.unstable_cancelCallback = function (_) {
              _.callback = null;
            }),
            (a.unstable_forceFrameRate = function (_) {
              0 > _ || 125 < _
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                  )
                : (Ot = 0 < _ ? Math.floor(1e3 / _) : 5);
            }),
            (a.unstable_getCurrentPriorityLevel = function () {
              return L;
            }),
            (a.unstable_next = function (_) {
              switch (L) {
                case 1:
                case 2:
                case 3:
                  var W = 3;
                  break;
                default:
                  W = L;
              }
              var tt = L;
              L = W;
              try {
                return _();
              } finally {
                L = tt;
              }
            }),
            (a.unstable_requestPaint = function () {
              C = !0;
            }),
            (a.unstable_runWithPriority = function (_, W) {
              switch (_) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  _ = 3;
              }
              var tt = L;
              L = _;
              try {
                return W();
              } finally {
                L = tt;
              }
            }),
            (a.unstable_scheduleCallback = function (_, W, tt) {
              var bt = a.unstable_now();
              switch (
                (typeof tt == "object" && tt !== null
                  ? ((tt = tt.delay),
                    (tt = typeof tt == "number" && 0 < tt ? bt + tt : bt))
                  : (tt = bt),
                _)
              ) {
                case 1:
                  var S = -1;
                  break;
                case 2:
                  S = 250;
                  break;
                case 5:
                  S = 1073741823;
                  break;
                case 4:
                  S = 1e4;
                  break;
                default:
                  S = 5e3;
              }
              return (
                (S = tt + S),
                (_ = {
                  id: O++,
                  callback: W,
                  priorityLevel: _,
                  startTime: tt,
                  expirationTime: S,
                  sortIndex: -1,
                }),
                tt > bt
                  ? ((_.sortIndex = tt),
                    r(p, _),
                    s(b) === null &&
                      _ === s(p) &&
                      (z ? (X(gt), (gt = -1)) : (z = !0), yt(J, tt - bt)))
                  : ((_.sortIndex = S),
                    r(b, _),
                    $ || Q || (($ = !0), K || ((K = !0), Ct()))),
                _
              );
            }),
            (a.unstable_shouldYield = Tt),
            (a.unstable_wrapCallback = function (_) {
              var W = L;
              return function () {
                var tt = L;
                L = W;
                try {
                  return _.apply(this, arguments);
                } finally {
                  L = tt;
                }
              };
            });
        })(lr)),
      lr
    );
  }
  var io;
  function Ug() {
    return io || ((io = 1), (nr.exports = Cg())), nr.exports;
  }
  var ar = { exports: {} },
    Et = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var ro;
  function Hg() {
    if (ro) return Et;
    ro = 1;
    var a = Symbol.for("react.transitional.element"),
      r = Symbol.for("react.portal"),
      s = Symbol.for("react.fragment"),
      c = Symbol.for("react.strict_mode"),
      f = Symbol.for("react.profiler"),
      m = Symbol.for("react.consumer"),
      g = Symbol.for("react.context"),
      E = Symbol.for("react.forward_ref"),
      b = Symbol.for("react.suspense"),
      p = Symbol.for("react.memo"),
      O = Symbol.for("react.lazy"),
      k = Symbol.iterator;
    function L(S) {
      return S === null || typeof S != "object"
        ? null
        : ((S = (k && S[k]) || S["@@iterator"]),
          typeof S == "function" ? S : null);
    }
    var Q = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      $ = Object.assign,
      z = {};
    function C(S, V, Z) {
      (this.props = S),
        (this.context = V),
        (this.refs = z),
        (this.updater = Z || Q);
    }
    (C.prototype.isReactComponent = {}),
      (C.prototype.setState = function (S, V) {
        if (typeof S != "object" && typeof S != "function" && S != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables.",
          );
        this.updater.enqueueSetState(this, S, V, "setState");
      }),
      (C.prototype.forceUpdate = function (S) {
        this.updater.enqueueForceUpdate(this, S, "forceUpdate");
      });
    function U() {}
    U.prototype = C.prototype;
    function X(S, V, Z) {
      (this.props = S),
        (this.context = V),
        (this.refs = z),
        (this.updater = Z || Q);
    }
    var F = (X.prototype = new U());
    (F.constructor = X), $(F, C.prototype), (F.isPureReactComponent = !0);
    var nt = Array.isArray,
      J = { H: null, A: null, T: null, S: null, V: null },
      K = Object.prototype.hasOwnProperty;
    function gt(S, V, Z, I, lt, pt) {
      return (
        (Z = pt.ref),
        {
          $$typeof: a,
          type: S,
          key: V,
          ref: Z !== void 0 ? Z : null,
          props: pt,
        }
      );
    }
    function Ot(S, V) {
      return gt(S.type, V, void 0, void 0, void 0, S.props);
    }
    function Rt(S) {
      return typeof S == "object" && S !== null && S.$$typeof === a;
    }
    function Tt(S) {
      var V = { "=": "=0", ":": "=2" };
      return (
        "$" +
        S.replace(/[=:]/g, function (Z) {
          return V[Z];
        })
      );
    }
    var qt = /\/+/g;
    function Ct(S, V) {
      return typeof S == "object" && S !== null && S.key != null
        ? Tt("" + S.key)
        : V.toString(36);
    }
    function Bt() {}
    function $t(S) {
      switch (S.status) {
        case "fulfilled":
          return S.value;
        case "rejected":
          throw S.reason;
        default:
          switch (
            (typeof S.status == "string"
              ? S.then(Bt, Bt)
              : ((S.status = "pending"),
                S.then(
                  function (V) {
                    S.status === "pending" &&
                      ((S.status = "fulfilled"), (S.value = V));
                  },
                  function (V) {
                    S.status === "pending" &&
                      ((S.status = "rejected"), (S.reason = V));
                  },
                )),
            S.status)
          ) {
            case "fulfilled":
              return S.value;
            case "rejected":
              throw S.reason;
          }
      }
      throw S;
    }
    function yt(S, V, Z, I, lt) {
      var pt = typeof S;
      (pt === "undefined" || pt === "boolean") && (S = null);
      var ht = !1;
      if (S === null) ht = !0;
      else
        switch (pt) {
          case "bigint":
          case "string":
          case "number":
            ht = !0;
            break;
          case "object":
            switch (S.$$typeof) {
              case a:
              case r:
                ht = !0;
                break;
              case O:
                return (ht = S._init), yt(ht(S._payload), V, Z, I, lt);
            }
        }
      if (ht)
        return (
          (lt = lt(S)),
          (ht = I === "" ? "." + Ct(S, 0) : I),
          nt(lt)
            ? ((Z = ""),
              ht != null && (Z = ht.replace(qt, "$&/") + "/"),
              yt(lt, V, Z, "", function (We) {
                return We;
              }))
            : lt != null &&
              (Rt(lt) &&
                (lt = Ot(
                  lt,
                  Z +
                    (lt.key == null || (S && S.key === lt.key)
                      ? ""
                      : ("" + lt.key).replace(qt, "$&/") + "/") +
                    ht,
                )),
              V.push(lt)),
          1
        );
      ht = 0;
      var Wt = I === "" ? "." : I + ":";
      if (nt(S))
        for (var Kt = 0; Kt < S.length; Kt++)
          (I = S[Kt]), (pt = Wt + Ct(I, Kt)), (ht += yt(I, V, Z, pt, lt));
      else if (((Kt = L(S)), typeof Kt == "function"))
        for (S = Kt.call(S), Kt = 0; !(I = S.next()).done; )
          (I = I.value), (pt = Wt + Ct(I, Kt++)), (ht += yt(I, V, Z, pt, lt));
      else if (pt === "object") {
        if (typeof S.then == "function") return yt($t(S), V, Z, I, lt);
        throw (
          ((V = String(S)),
          Error(
            "Objects are not valid as a React child (found: " +
              (V === "[object Object]"
                ? "object with keys {" + Object.keys(S).join(", ") + "}"
                : V) +
              "). If you meant to render a collection of children, use an array instead.",
          ))
        );
      }
      return ht;
    }
    function _(S, V, Z) {
      if (S == null) return S;
      var I = [],
        lt = 0;
      return (
        yt(S, I, "", "", function (pt) {
          return V.call(Z, pt, lt++);
        }),
        I
      );
    }
    function W(S) {
      if (S._status === -1) {
        var V = S._result;
        (V = V()),
          V.then(
            function (Z) {
              (S._status === 0 || S._status === -1) &&
                ((S._status = 1), (S._result = Z));
            },
            function (Z) {
              (S._status === 0 || S._status === -1) &&
                ((S._status = 2), (S._result = Z));
            },
          ),
          S._status === -1 && ((S._status = 0), (S._result = V));
      }
      if (S._status === 1) return S._result.default;
      throw S._result;
    }
    var tt =
      typeof reportError == "function"
        ? reportError
        : function (S) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var V = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof S == "object" &&
                  S !== null &&
                  typeof S.message == "string"
                    ? String(S.message)
                    : String(S),
                error: S,
              });
              if (!window.dispatchEvent(V)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", S);
              return;
            }
            console.error(S);
          };
    function bt() {}
    return (
      (Et.Children = {
        map: _,
        forEach: function (S, V, Z) {
          _(
            S,
            function () {
              V.apply(this, arguments);
            },
            Z,
          );
        },
        count: function (S) {
          var V = 0;
          return (
            _(S, function () {
              V++;
            }),
            V
          );
        },
        toArray: function (S) {
          return (
            _(S, function (V) {
              return V;
            }) || []
          );
        },
        only: function (S) {
          if (!Rt(S))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return S;
        },
      }),
      (Et.Component = C),
      (Et.Fragment = s),
      (Et.Profiler = f),
      (Et.PureComponent = X),
      (Et.StrictMode = c),
      (Et.Suspense = b),
      (Et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
      (Et.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (S) {
          return J.H.useMemoCache(S);
        },
      }),
      (Et.cache = function (S) {
        return function () {
          return S.apply(null, arguments);
        };
      }),
      (Et.cloneElement = function (S, V, Z) {
        if (S == null)
          throw Error(
            "The argument must be a React element, but you passed " + S + ".",
          );
        var I = $({}, S.props),
          lt = S.key,
          pt = void 0;
        if (V != null)
          for (ht in (V.ref !== void 0 && (pt = void 0),
          V.key !== void 0 && (lt = "" + V.key),
          V))
            !K.call(V, ht) ||
              ht === "key" ||
              ht === "__self" ||
              ht === "__source" ||
              (ht === "ref" && V.ref === void 0) ||
              (I[ht] = V[ht]);
        var ht = arguments.length - 2;
        if (ht === 1) I.children = Z;
        else if (1 < ht) {
          for (var Wt = Array(ht), Kt = 0; Kt < ht; Kt++)
            Wt[Kt] = arguments[Kt + 2];
          I.children = Wt;
        }
        return gt(S.type, lt, void 0, void 0, pt, I);
      }),
      (Et.createContext = function (S) {
        return (
          (S = {
            $$typeof: g,
            _currentValue: S,
            _currentValue2: S,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (S.Provider = S),
          (S.Consumer = { $$typeof: m, _context: S }),
          S
        );
      }),
      (Et.createElement = function (S, V, Z) {
        var I,
          lt = {},
          pt = null;
        if (V != null)
          for (I in (V.key !== void 0 && (pt = "" + V.key), V))
            K.call(V, I) &&
              I !== "key" &&
              I !== "__self" &&
              I !== "__source" &&
              (lt[I] = V[I]);
        var ht = arguments.length - 2;
        if (ht === 1) lt.children = Z;
        else if (1 < ht) {
          for (var Wt = Array(ht), Kt = 0; Kt < ht; Kt++)
            Wt[Kt] = arguments[Kt + 2];
          lt.children = Wt;
        }
        if (S && S.defaultProps)
          for (I in ((ht = S.defaultProps), ht))
            lt[I] === void 0 && (lt[I] = ht[I]);
        return gt(S, pt, void 0, void 0, null, lt);
      }),
      (Et.createRef = function () {
        return { current: null };
      }),
      (Et.forwardRef = function (S) {
        return { $$typeof: E, render: S };
      }),
      (Et.isValidElement = Rt),
      (Et.lazy = function (S) {
        return { $$typeof: O, _payload: { _status: -1, _result: S }, _init: W };
      }),
      (Et.memo = function (S, V) {
        return { $$typeof: p, type: S, compare: V === void 0 ? null : V };
      }),
      (Et.startTransition = function (S) {
        var V = J.T,
          Z = {};
        J.T = Z;
        try {
          var I = S(),
            lt = J.S;
          lt !== null && lt(Z, I),
            typeof I == "object" &&
              I !== null &&
              typeof I.then == "function" &&
              I.then(bt, tt);
        } catch (pt) {
          tt(pt);
        } finally {
          J.T = V;
        }
      }),
      (Et.unstable_useCacheRefresh = function () {
        return J.H.useCacheRefresh();
      }),
      (Et.use = function (S) {
        return J.H.use(S);
      }),
      (Et.useActionState = function (S, V, Z) {
        return J.H.useActionState(S, V, Z);
      }),
      (Et.useCallback = function (S, V) {
        return J.H.useCallback(S, V);
      }),
      (Et.useContext = function (S) {
        return J.H.useContext(S);
      }),
      (Et.useDebugValue = function () {}),
      (Et.useDeferredValue = function (S, V) {
        return J.H.useDeferredValue(S, V);
      }),
      (Et.useEffect = function (S, V, Z) {
        var I = J.H;
        if (typeof Z == "function")
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React.",
          );
        return I.useEffect(S, V);
      }),
      (Et.useId = function () {
        return J.H.useId();
      }),
      (Et.useImperativeHandle = function (S, V, Z) {
        return J.H.useImperativeHandle(S, V, Z);
      }),
      (Et.useInsertionEffect = function (S, V) {
        return J.H.useInsertionEffect(S, V);
      }),
      (Et.useLayoutEffect = function (S, V) {
        return J.H.useLayoutEffect(S, V);
      }),
      (Et.useMemo = function (S, V) {
        return J.H.useMemo(S, V);
      }),
      (Et.useOptimistic = function (S, V) {
        return J.H.useOptimistic(S, V);
      }),
      (Et.useReducer = function (S, V, Z) {
        return J.H.useReducer(S, V, Z);
      }),
      (Et.useRef = function (S) {
        return J.H.useRef(S);
      }),
      (Et.useState = function (S) {
        return J.H.useState(S);
      }),
      (Et.useSyncExternalStore = function (S, V, Z) {
        return J.H.useSyncExternalStore(S, V, Z);
      }),
      (Et.useTransition = function () {
        return J.H.useTransition();
      }),
      (Et.version = "19.1.0"),
      Et
    );
  }
  var co;
  function ur() {
    return co || ((co = 1), (ar.exports = Hg())), ar.exports;
  }
  var ir = { exports: {} },
    pe = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var so;
  function Lg() {
    if (so) return pe;
    so = 1;
    var a = ur();
    function r(b) {
      var p = "https://react.dev/errors/" + b;
      if (1 < arguments.length) {
        p += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var O = 2; O < arguments.length; O++)
          p += "&args[]=" + encodeURIComponent(arguments[O]);
      }
      return (
        "Minified React error #" +
        b +
        "; visit " +
        p +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function s() {}
    var c = {
        d: {
          f: s,
          r: function () {
            throw Error(r(522));
          },
          D: s,
          C: s,
          L: s,
          m: s,
          X: s,
          S: s,
          M: s,
        },
        p: 0,
        findDOMNode: null,
      },
      f = Symbol.for("react.portal");
    function m(b, p, O) {
      var k =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: f,
        key: k == null ? null : "" + k,
        children: b,
        containerInfo: p,
        implementation: O,
      };
    }
    var g = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function E(b, p) {
      if (b === "font") return "";
      if (typeof p == "string") return p === "use-credentials" ? p : "";
    }
    return (
      (pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
      (pe.createPortal = function (b, p) {
        var O =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
          throw Error(r(299));
        return m(b, p, null, O);
      }),
      (pe.flushSync = function (b) {
        var p = g.T,
          O = c.p;
        try {
          if (((g.T = null), (c.p = 2), b)) return b();
        } finally {
          (g.T = p), (c.p = O), c.d.f();
        }
      }),
      (pe.preconnect = function (b, p) {
        typeof b == "string" &&
          (p
            ? ((p = p.crossOrigin),
              (p =
                typeof p == "string"
                  ? p === "use-credentials"
                    ? p
                    : ""
                  : void 0))
            : (p = null),
          c.d.C(b, p));
      }),
      (pe.prefetchDNS = function (b) {
        typeof b == "string" && c.d.D(b);
      }),
      (pe.preinit = function (b, p) {
        if (typeof b == "string" && p && typeof p.as == "string") {
          var O = p.as,
            k = E(O, p.crossOrigin),
            L = typeof p.integrity == "string" ? p.integrity : void 0,
            Q = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
          O === "style"
            ? c.d.S(
                b,
                typeof p.precedence == "string" ? p.precedence : void 0,
                { crossOrigin: k, integrity: L, fetchPriority: Q },
              )
            : O === "script" &&
              c.d.X(b, {
                crossOrigin: k,
                integrity: L,
                fetchPriority: Q,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0,
              });
        }
      }),
      (pe.preinitModule = function (b, p) {
        if (typeof b == "string")
          if (typeof p == "object" && p !== null) {
            if (p.as == null || p.as === "script") {
              var O = E(p.as, p.crossOrigin);
              c.d.M(b, {
                crossOrigin: O,
                integrity:
                  typeof p.integrity == "string" ? p.integrity : void 0,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0,
              });
            }
          } else p == null && c.d.M(b);
      }),
      (pe.preload = function (b, p) {
        if (
          typeof b == "string" &&
          typeof p == "object" &&
          p !== null &&
          typeof p.as == "string"
        ) {
          var O = p.as,
            k = E(O, p.crossOrigin);
          c.d.L(b, O, {
            crossOrigin: k,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            type: typeof p.type == "string" ? p.type : void 0,
            fetchPriority:
              typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
            referrerPolicy:
              typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
            imageSrcSet:
              typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
            imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
            media: typeof p.media == "string" ? p.media : void 0,
          });
        }
      }),
      (pe.preloadModule = function (b, p) {
        if (typeof b == "string")
          if (p) {
            var O = E(p.as, p.crossOrigin);
            c.d.m(b, {
              as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
              crossOrigin: O,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            });
          } else c.d.m(b);
      }),
      (pe.requestFormReset = function (b) {
        c.d.r(b);
      }),
      (pe.unstable_batchedUpdates = function (b, p) {
        return b(p);
      }),
      (pe.useFormState = function (b, p, O) {
        return g.H.useFormState(b, p, O);
      }),
      (pe.useFormStatus = function () {
        return g.H.useHostTransitionStatus();
      }),
      (pe.version = "19.1.0"),
      pe
    );
  }
  var oo;
  function qg() {
    if (oo) return ir.exports;
    oo = 1;
    function a() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
        } catch (r) {
          console.error(r);
        }
    }
    return a(), (ir.exports = Lg()), ir.exports;
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var fo;
  function Bg() {
    if (fo) return Sa;
    fo = 1;
    var a = Ug(),
      r = ur(),
      s = qg();
    function c(t) {
      var e = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          e += "&args[]=" + encodeURIComponent(arguments[n]);
      }
      return (
        "Minified React error #" +
        t +
        "; visit " +
        e +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function f(t) {
      return !(
        !t ||
        (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
      );
    }
    function m(t) {
      var e = t,
        n = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do (e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return);
        while (t);
      }
      return e.tag === 3 ? n : null;
    }
    function g(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (
          (e === null &&
            ((t = t.alternate), t !== null && (e = t.memoizedState)),
          e !== null)
        )
          return e.dehydrated;
      }
      return null;
    }
    function E(t) {
      if (m(t) !== t) throw Error(c(188));
    }
    function b(t) {
      var e = t.alternate;
      if (!e) {
        if (((e = m(t)), e === null)) throw Error(c(188));
        return e !== t ? null : t;
      }
      for (var n = t, l = e; ; ) {
        var u = n.return;
        if (u === null) break;
        var i = u.alternate;
        if (i === null) {
          if (((l = u.return), l !== null)) {
            n = l;
            continue;
          }
          break;
        }
        if (u.child === i.child) {
          for (i = u.child; i; ) {
            if (i === n) return E(u), t;
            if (i === l) return E(u), e;
            i = i.sibling;
          }
          throw Error(c(188));
        }
        if (n.return !== l.return) (n = u), (l = i);
        else {
          for (var o = !1, d = u.child; d; ) {
            if (d === n) {
              (o = !0), (n = u), (l = i);
              break;
            }
            if (d === l) {
              (o = !0), (l = u), (n = i);
              break;
            }
            d = d.sibling;
          }
          if (!o) {
            for (d = i.child; d; ) {
              if (d === n) {
                (o = !0), (n = i), (l = u);
                break;
              }
              if (d === l) {
                (o = !0), (l = i), (n = u);
                break;
              }
              d = d.sibling;
            }
            if (!o) throw Error(c(189));
          }
        }
        if (n.alternate !== l) throw Error(c(190));
      }
      if (n.tag !== 3) throw Error(c(188));
      return n.stateNode.current === n ? t : e;
    }
    function p(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (((e = p(t)), e !== null)) return e;
        t = t.sibling;
      }
      return null;
    }
    var O = Object.assign,
      k = Symbol.for("react.element"),
      L = Symbol.for("react.transitional.element"),
      Q = Symbol.for("react.portal"),
      $ = Symbol.for("react.fragment"),
      z = Symbol.for("react.strict_mode"),
      C = Symbol.for("react.profiler"),
      U = Symbol.for("react.provider"),
      X = Symbol.for("react.consumer"),
      F = Symbol.for("react.context"),
      nt = Symbol.for("react.forward_ref"),
      J = Symbol.for("react.suspense"),
      K = Symbol.for("react.suspense_list"),
      gt = Symbol.for("react.memo"),
      Ot = Symbol.for("react.lazy"),
      Rt = Symbol.for("react.activity"),
      Tt = Symbol.for("react.memo_cache_sentinel"),
      qt = Symbol.iterator;
    function Ct(t) {
      return t === null || typeof t != "object"
        ? null
        : ((t = (qt && t[qt]) || t["@@iterator"]),
          typeof t == "function" ? t : null);
    }
    var Bt = Symbol.for("react.client.reference");
    function $t(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === Bt ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case $:
          return "Fragment";
        case C:
          return "Profiler";
        case z:
          return "StrictMode";
        case J:
          return "Suspense";
        case K:
          return "SuspenseList";
        case Rt:
          return "Activity";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case Q:
            return "Portal";
          case F:
            return (t.displayName || "Context") + ".Provider";
          case X:
            return (t._context.displayName || "Context") + ".Consumer";
          case nt:
            var e = t.render;
            return (
              (t = t.displayName),
              t ||
                ((t = e.displayName || e.name || ""),
                (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
              t
            );
          case gt:
            return (
              (e = t.displayName || null), e !== null ? e : $t(t.type) || "Memo"
            );
          case Ot:
            (e = t._payload), (t = t._init);
            try {
              return $t(t(e));
            } catch {}
        }
      return null;
    }
    var yt = Array.isArray,
      _ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      W = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      tt = { pending: !1, data: null, method: null, action: null },
      bt = [],
      S = -1;
    function V(t) {
      return { current: t };
    }
    function Z(t) {
      0 > S || ((t.current = bt[S]), (bt[S] = null), S--);
    }
    function I(t, e) {
      S++, (bt[S] = t.current), (t.current = e);
    }
    var lt = V(null),
      pt = V(null),
      ht = V(null),
      Wt = V(null);
    function Kt(t, e) {
      switch ((I(ht, e), I(pt, t), I(lt, null), e.nodeType)) {
        case 9:
        case 11:
          t = (t = e.documentElement) && (t = t.namespaceURI) ? Nm(t) : 0;
          break;
        default:
          if (((t = e.tagName), (e = e.namespaceURI)))
            (e = Nm(e)), (t = Cm(e, t));
          else
            switch (t) {
              case "svg":
                t = 1;
                break;
              case "math":
                t = 2;
                break;
              default:
                t = 0;
            }
      }
      Z(lt), I(lt, t);
    }
    function We() {
      Z(lt), Z(pt), Z(ht);
    }
    function Aa(t) {
      t.memoizedState !== null && I(Wt, t);
      var e = lt.current,
        n = Cm(e, t.type);
      e !== n && (I(pt, t), I(lt, n));
    }
    function Cl(t) {
      pt.current === t && (Z(lt), Z(pt)),
        Wt.current === t && (Z(Wt), (bu._currentValue = tt));
    }
    var wa = Object.prototype.hasOwnProperty,
      Nn = a.unstable_scheduleCallback,
      Ma = a.unstable_cancelCallback,
      zr = a.unstable_shouldYield,
      Nr = a.unstable_requestPaint,
      Ee = a.unstable_now,
      Cr = a.unstable_getCurrentPriorityLevel,
      Ul = a.unstable_ImmediatePriority,
      Ye = a.unstable_UserBlockingPriority,
      _e = a.unstable_NormalPriority,
      qu = a.unstable_LowPriority,
      xa = a.unstable_IdlePriority,
      Bu = a.log,
      Ur = a.unstable_setDisableYieldValue,
      Mt = null,
      de = null;
    function ue(t) {
      if (
        (typeof Bu == "function" && Ur(t),
        de && typeof de.setStrictMode == "function")
      )
        try {
          de.setStrictMode(Mt, t);
        } catch {}
    }
    var Jt = Math.clz32 ? Math.clz32 : Hr,
      _a = Math.log,
      Gu = Math.LN2;
    function Hr(t) {
      return (t >>>= 0), t === 0 ? 32 : (31 - ((_a(t) / Gu) | 0)) | 0;
    }
    var Hl = 256,
      rl = 4194304;
    function Me(t) {
      var e = t & 42;
      if (e !== 0) return e;
      switch (t & -t) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return t;
      }
    }
    function Cn(t, e, n) {
      var l = t.pendingLanes;
      if (l === 0) return 0;
      var u = 0,
        i = t.suspendedLanes,
        o = t.pingedLanes;
      t = t.warmLanes;
      var d = l & 134217727;
      return (
        d !== 0
          ? ((l = d & ~i),
            l !== 0
              ? (u = Me(l))
              : ((o &= d),
                o !== 0
                  ? (u = Me(o))
                  : n || ((n = d & ~t), n !== 0 && (u = Me(n)))))
          : ((d = l & ~i),
            d !== 0
              ? (u = Me(d))
              : o !== 0
                ? (u = Me(o))
                : n || ((n = l & ~t), n !== 0 && (u = Me(n)))),
        u === 0
          ? 0
          : e !== 0 &&
              e !== u &&
              (e & i) === 0 &&
              ((i = u & -u),
              (n = e & -e),
              i >= n || (i === 32 && (n & 4194048) !== 0))
            ? e
            : u
      );
    }
    function Un(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function Ll(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function cl() {
      var t = Hl;
      return (Hl <<= 1), (Hl & 4194048) === 0 && (Hl = 256), t;
    }
    function ql() {
      var t = rl;
      return (rl <<= 1), (rl & 62914560) === 0 && (rl = 4194304), t;
    }
    function Da(t) {
      for (var e = [], n = 0; 31 > n; n++) e.push(t);
      return e;
    }
    function ln(t, e) {
      (t.pendingLanes |= e),
        e !== 268435456 &&
          ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
    }
    function Oa(t, e, n, l, u, i) {
      var o = t.pendingLanes;
      (t.pendingLanes = n),
        (t.suspendedLanes = 0),
        (t.pingedLanes = 0),
        (t.warmLanes = 0),
        (t.expiredLanes &= n),
        (t.entangledLanes &= n),
        (t.errorRecoveryDisabledLanes &= n),
        (t.shellSuspendCounter = 0);
      var d = t.entanglements,
        v = t.expirationTimes,
        D = t.hiddenUpdates;
      for (n = o & ~n; 0 < n; ) {
        var B = 31 - Jt(n),
          Y = 1 << B;
        (d[B] = 0), (v[B] = -1);
        var R = D[B];
        if (R !== null)
          for (D[B] = null, B = 0; B < R.length; B++) {
            var N = R[B];
            N !== null && (N.lane &= -536870913);
          }
        n &= ~Y;
      }
      l !== 0 && Bl(t, l, 0),
        i !== 0 &&
          u === 0 &&
          t.tag !== 0 &&
          (t.suspendedLanes |= i & ~(o & ~e));
    }
    function Bl(t, e, n) {
      (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
      var l = 31 - Jt(e);
      (t.entangledLanes |= e),
        (t.entanglements[l] = t.entanglements[l] | 1073741824 | (n & 4194090));
    }
    function Yu(t, e) {
      var n = (t.entangledLanes |= e);
      for (t = t.entanglements; n; ) {
        var l = 31 - Jt(n),
          u = 1 << l;
        (u & e) | (t[l] & e) && (t[l] |= e), (n &= ~u);
      }
    }
    function Ra(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function h(t) {
      return (
        (t &= -t),
        2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function y() {
      var t = W.p;
      return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Wm(t.type));
    }
    function A(t, e) {
      var n = W.p;
      try {
        return (W.p = t), e();
      } finally {
        W.p = n;
      }
    }
    var H = Math.random().toString(36).slice(2),
      w = "__reactFiber$" + H,
      q = "__reactProps$" + H,
      j = "__reactContainer$" + H,
      P = "__reactEvents$" + H,
      et = "__reactListeners$" + H,
      ft = "__reactHandles$" + H,
      st = "__reactResources$" + H,
      ot = "__reactMarker$" + H;
    function St(t) {
      delete t[w], delete t[q], delete t[P], delete t[et], delete t[ft];
    }
    function zt(t) {
      var e = t[w];
      if (e) return e;
      for (var n = t.parentNode; n; ) {
        if ((e = n[j] || n[w])) {
          if (
            ((n = e.alternate),
            e.child !== null || (n !== null && n.child !== null))
          )
            for (t = qm(t); t !== null; ) {
              if ((n = t[w])) return n;
              t = qm(t);
            }
          return e;
        }
        (t = n), (n = t.parentNode);
      }
      return null;
    }
    function rt(t) {
      if ((t = t[w] || t[j])) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
          return t;
      }
      return null;
    }
    function Ft(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
      throw Error(c(33));
    }
    function Pt(t) {
      var e = t[st];
      return (
        e ||
          (e = t[st] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        e
      );
    }
    function Ut(t) {
      t[ot] = !0;
    }
    var Qt = new Set(),
      Hn = {};
    function Ne(t, e) {
      ie(t, e), ie(t + "Capture", e);
    }
    function ie(t, e) {
      for (Hn[t] = e, t = 0; t < e.length; t++) Qt.add(e[t]);
    }
    var Wb = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
      ),
      Af = {},
      wf = {};
    function Pb(t) {
      return wa.call(wf, t)
        ? !0
        : wa.call(Af, t)
          ? !1
          : Wb.test(t)
            ? (wf[t] = !0)
            : ((Af[t] = !0), !1);
    }
    function Vu(t, e, n) {
      if (Pb(e))
        if (n === null) t.removeAttribute(e);
        else {
          switch (typeof n) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(e);
              return;
            case "boolean":
              var l = e.toLowerCase().slice(0, 5);
              if (l !== "data-" && l !== "aria-") {
                t.removeAttribute(e);
                return;
              }
          }
          t.setAttribute(e, "" + n);
        }
    }
    function ju(t, e, n) {
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        t.setAttribute(e, "" + n);
      }
    }
    function hn(t, e, n, l) {
      if (l === null) t.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(n);
            return;
        }
        t.setAttributeNS(e, n, "" + l);
      }
    }
    var Lr, Mf;
    function Gl(t) {
      if (Lr === void 0)
        try {
          throw Error();
        } catch (n) {
          var e = n.stack.trim().match(/\n( *(at )?)/);
          (Lr = (e && e[1]) || ""),
            (Mf =
              -1 <
              n.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < n.stack.indexOf("@")
                  ? "@unknown:0:0"
                  : "");
        }
      return (
        `
` +
        Lr +
        t +
        Mf
      );
    }
    var qr = !1;
    function Br(t, e) {
      if (!t || qr) return "";
      qr = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var l = {
          DetermineComponentFrameRoot: function () {
            try {
              if (e) {
                var Y = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(Y.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(Y, []);
                  } catch (N) {
                    var R = N;
                  }
                  Reflect.construct(t, [], Y);
                } else {
                  try {
                    Y.call();
                  } catch (N) {
                    R = N;
                  }
                  t.call(Y.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (N) {
                  R = N;
                }
                (Y = t()) &&
                  typeof Y.catch == "function" &&
                  Y.catch(function () {});
              }
            } catch (N) {
              if (N && R && typeof N.stack == "string")
                return [N.stack, R.stack];
            }
            return [null, null];
          },
        };
        l.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var u = Object.getOwnPropertyDescriptor(
          l.DetermineComponentFrameRoot,
          "name",
        );
        u &&
          u.configurable &&
          Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var i = l.DetermineComponentFrameRoot(),
          o = i[0],
          d = i[1];
        if (o && d) {
          var v = o.split(`
`),
            D = d.split(`
`);
          for (
            u = l = 0;
            l < v.length && !v[l].includes("DetermineComponentFrameRoot");

          )
            l++;
          for (
            ;
            u < D.length && !D[u].includes("DetermineComponentFrameRoot");

          )
            u++;
          if (l === v.length || u === D.length)
            for (
              l = v.length - 1, u = D.length - 1;
              1 <= l && 0 <= u && v[l] !== D[u];

            )
              u--;
          for (; 1 <= l && 0 <= u; l--, u--)
            if (v[l] !== D[u]) {
              if (l !== 1 || u !== 1)
                do
                  if ((l--, u--, 0 > u || v[l] !== D[u])) {
                    var B =
                      `
` + v[l].replace(" at new ", " at ");
                    return (
                      t.displayName &&
                        B.includes("<anonymous>") &&
                        (B = B.replace("<anonymous>", t.displayName)),
                      B
                    );
                  }
                while (1 <= l && 0 <= u);
              break;
            }
        }
      } finally {
        (qr = !1), (Error.prepareStackTrace = n);
      }
      return (n = t ? t.displayName || t.name : "") ? Gl(n) : "";
    }
    function tp(t) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return Gl(t.type);
        case 16:
          return Gl("Lazy");
        case 13:
          return Gl("Suspense");
        case 19:
          return Gl("SuspenseList");
        case 0:
        case 15:
          return Br(t.type, !1);
        case 11:
          return Br(t.type.render, !1);
        case 1:
          return Br(t.type, !0);
        case 31:
          return Gl("Activity");
        default:
          return "";
      }
    }
    function xf(t) {
      try {
        var e = "";
        do (e += tp(t)), (t = t.return);
        while (t);
        return e;
      } catch (n) {
        return (
          `
Error generating stack: ` +
          n.message +
          `
` +
          n.stack
        );
      }
    }
    function Ve(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return t;
        default:
          return "";
      }
    }
    function _f(t) {
      var e = t.type;
      return (
        (t = t.nodeName) &&
        t.toLowerCase() === "input" &&
        (e === "checkbox" || e === "radio")
      );
    }
    function ep(t) {
      var e = _f(t) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
        l = "" + t[e];
      if (
        !t.hasOwnProperty(e) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
      ) {
        var u = n.get,
          i = n.set;
        return (
          Object.defineProperty(t, e, {
            configurable: !0,
            get: function () {
              return u.call(this);
            },
            set: function (o) {
              (l = "" + o), i.call(this, o);
            },
          }),
          Object.defineProperty(t, e, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return l;
            },
            setValue: function (o) {
              l = "" + o;
            },
            stopTracking: function () {
              (t._valueTracker = null), delete t[e];
            },
          }
        );
      }
    }
    function Xu(t) {
      t._valueTracker || (t._valueTracker = ep(t));
    }
    function Df(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var n = e.getValue(),
        l = "";
      return (
        t && (l = _f(t) ? (t.checked ? "true" : "false") : t.value),
        (t = l),
        t !== n ? (e.setValue(t), !0) : !1
      );
    }
    function Qu(t) {
      if (
        ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
      )
        return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var np = /[\n"\\]/g;
    function je(t) {
      return t.replace(np, function (e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      });
    }
    function Gr(t, e, n, l, u, i, o, d) {
      (t.name = ""),
        o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean"
          ? (t.type = o)
          : t.removeAttribute("type"),
        e != null
          ? o === "number"
            ? ((e === 0 && t.value === "") || t.value != e) &&
              (t.value = "" + Ve(e))
            : t.value !== "" + Ve(e) && (t.value = "" + Ve(e))
          : (o !== "submit" && o !== "reset") || t.removeAttribute("value"),
        e != null
          ? Yr(t, o, Ve(e))
          : n != null
            ? Yr(t, o, Ve(n))
            : l != null && t.removeAttribute("value"),
        u == null && i != null && (t.defaultChecked = !!i),
        u != null &&
          (t.checked = u && typeof u != "function" && typeof u != "symbol"),
        d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean"
          ? (t.name = "" + Ve(d))
          : t.removeAttribute("name");
    }
    function Of(t, e, n, l, u, i, o, d) {
      if (
        (i != null &&
          typeof i != "function" &&
          typeof i != "symbol" &&
          typeof i != "boolean" &&
          (t.type = i),
        e != null || n != null)
      ) {
        if (!((i !== "submit" && i !== "reset") || e != null)) return;
        (n = n != null ? "" + Ve(n) : ""),
          (e = e != null ? "" + Ve(e) : n),
          d || e === t.value || (t.value = e),
          (t.defaultValue = e);
      }
      (l = l ?? u),
        (l = typeof l != "function" && typeof l != "symbol" && !!l),
        (t.checked = d ? t.checked : !!l),
        (t.defaultChecked = !!l),
        o != null &&
          typeof o != "function" &&
          typeof o != "symbol" &&
          typeof o != "boolean" &&
          (t.name = o);
    }
    function Yr(t, e, n) {
      (e === "number" && Qu(t.ownerDocument) === t) ||
        t.defaultValue === "" + n ||
        (t.defaultValue = "" + n);
    }
    function Yl(t, e, n, l) {
      if (((t = t.options), e)) {
        e = {};
        for (var u = 0; u < n.length; u++) e["$" + n[u]] = !0;
        for (n = 0; n < t.length; n++)
          (u = e.hasOwnProperty("$" + t[n].value)),
            t[n].selected !== u && (t[n].selected = u),
            u && l && (t[n].defaultSelected = !0);
      } else {
        for (n = "" + Ve(n), e = null, u = 0; u < t.length; u++) {
          if (t[u].value === n) {
            (t[u].selected = !0), l && (t[u].defaultSelected = !0);
            return;
          }
          e !== null || t[u].disabled || (e = t[u]);
        }
        e !== null && (e.selected = !0);
      }
    }
    function Rf(t, e, n) {
      if (
        e != null &&
        ((e = "" + Ve(e)), e !== t.value && (t.value = e), n == null)
      ) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = n != null ? "" + Ve(n) : "";
    }
    function zf(t, e, n, l) {
      if (e == null) {
        if (l != null) {
          if (n != null) throw Error(c(92));
          if (yt(l)) {
            if (1 < l.length) throw Error(c(93));
            l = l[0];
          }
          n = l;
        }
        n == null && (n = ""), (e = n);
      }
      (n = Ve(e)),
        (t.defaultValue = n),
        (l = t.textContent),
        l === n && l !== "" && l !== null && (t.value = l);
    }
    function Vl(t, e) {
      if (e) {
        var n = t.firstChild;
        if (n && n === t.lastChild && n.nodeType === 3) {
          n.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    var lp = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " ",
      ),
    );
    function Nf(t, e, n) {
      var l = e.indexOf("--") === 0;
      n == null || typeof n == "boolean" || n === ""
        ? l
          ? t.setProperty(e, "")
          : e === "float"
            ? (t.cssFloat = "")
            : (t[e] = "")
        : l
          ? t.setProperty(e, n)
          : typeof n != "number" || n === 0 || lp.has(e)
            ? e === "float"
              ? (t.cssFloat = n)
              : (t[e] = ("" + n).trim())
            : (t[e] = n + "px");
    }
    function Cf(t, e, n) {
      if (e != null && typeof e != "object") throw Error(c(62));
      if (((t = t.style), n != null)) {
        for (var l in n)
          !n.hasOwnProperty(l) ||
            (e != null && e.hasOwnProperty(l)) ||
            (l.indexOf("--") === 0
              ? t.setProperty(l, "")
              : l === "float"
                ? (t.cssFloat = "")
                : (t[l] = ""));
        for (var u in e)
          (l = e[u]), e.hasOwnProperty(u) && n[u] !== l && Nf(t, u, l);
      } else for (var i in e) e.hasOwnProperty(i) && Nf(t, i, e[i]);
    }
    function Vr(t) {
      if (t.indexOf("-") === -1) return !1;
      switch (t) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ap = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"],
      ]),
      up =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Zu(t) {
      return up.test("" + t)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : t;
    }
    var jr = null;
    function Xr(t) {
      return (
        (t = t.target || t.srcElement || window),
        t.correspondingUseElement && (t = t.correspondingUseElement),
        t.nodeType === 3 ? t.parentNode : t
      );
    }
    var jl = null,
      Xl = null;
    function Uf(t) {
      var e = rt(t);
      if (e && (t = e.stateNode)) {
        var n = t[q] || null;
        t: switch (((t = e.stateNode), e.type)) {
          case "input":
            if (
              (Gr(
                t,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              ),
              (e = n.name),
              n.type === "radio" && e != null)
            ) {
              for (n = t; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  'input[name="' + je("" + e) + '"][type="radio"]',
                ),
                  e = 0;
                e < n.length;
                e++
              ) {
                var l = n[e];
                if (l !== t && l.form === t.form) {
                  var u = l[q] || null;
                  if (!u) throw Error(c(90));
                  Gr(
                    l,
                    u.value,
                    u.defaultValue,
                    u.defaultValue,
                    u.checked,
                    u.defaultChecked,
                    u.type,
                    u.name,
                  );
                }
              }
              for (e = 0; e < n.length; e++)
                (l = n[e]), l.form === t.form && Df(l);
            }
            break t;
          case "textarea":
            Rf(t, n.value, n.defaultValue);
            break t;
          case "select":
            (e = n.value), e != null && Yl(t, !!n.multiple, e, !1);
        }
      }
    }
    var Qr = !1;
    function Hf(t, e, n) {
      if (Qr) return t(e, n);
      Qr = !0;
      try {
        var l = t(e);
        return l;
      } finally {
        if (
          ((Qr = !1),
          (jl !== null || Xl !== null) &&
            (Ri(), jl && ((e = jl), (t = Xl), (Xl = jl = null), Uf(e), t)))
        )
          for (e = 0; e < t.length; e++) Uf(t[e]);
      }
    }
    function za(t, e) {
      var n = t.stateNode;
      if (n === null) return null;
      var l = n[q] || null;
      if (l === null) return null;
      n = l[e];
      t: switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (l = !l.disabled) ||
            ((t = t.type),
            (l = !(
              t === "button" ||
              t === "input" ||
              t === "select" ||
              t === "textarea"
            ))),
            (t = !l);
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (n && typeof n != "function") throw Error(c(231, e, typeof n));
      return n;
    }
    var mn = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Zr = !1;
    if (mn)
      try {
        var Na = {};
        Object.defineProperty(Na, "passive", {
          get: function () {
            Zr = !0;
          },
        }),
          window.addEventListener("test", Na, Na),
          window.removeEventListener("test", Na, Na);
      } catch {
        Zr = !1;
      }
    var Ln = null,
      Kr = null,
      Ku = null;
    function Lf() {
      if (Ku) return Ku;
      var t,
        e = Kr,
        n = e.length,
        l,
        u = "value" in Ln ? Ln.value : Ln.textContent,
        i = u.length;
      for (t = 0; t < n && e[t] === u[t]; t++);
      var o = n - t;
      for (l = 1; l <= o && e[n - l] === u[i - l]; l++);
      return (Ku = u.slice(t, 1 < l ? 1 - l : void 0));
    }
    function Ju(t) {
      var e = t.keyCode;
      return (
        "charCode" in t
          ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
          : (t = e),
        t === 10 && (t = 13),
        32 <= t || t === 13 ? t : 0
      );
    }
    function ku() {
      return !0;
    }
    function qf() {
      return !1;
    }
    function De(t) {
      function e(n, l, u, i, o) {
        (this._reactName = n),
          (this._targetInst = u),
          (this.type = l),
          (this.nativeEvent = i),
          (this.target = o),
          (this.currentTarget = null);
        for (var d in t)
          t.hasOwnProperty(d) && ((n = t[d]), (this[d] = n ? n(i) : i[d]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented != null
              ? i.defaultPrevented
              : i.returnValue === !1
          )
            ? ku
            : qf),
          (this.isPropagationStopped = qf),
          this
        );
      }
      return (
        O(e.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != "unknown" && (n.returnValue = !1),
              (this.isDefaultPrevented = ku));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
              (this.isPropagationStopped = ku));
          },
          persist: function () {},
          isPersistent: ku,
        }),
        e
      );
    }
    var sl = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (t) {
          return t.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      $u = De(sl),
      Ca = O({}, sl, { view: 0, detail: 0 }),
      ip = De(Ca),
      Jr,
      kr,
      Ua,
      Fu = O({}, Ca, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Fr,
        button: 0,
        buttons: 0,
        relatedTarget: function (t) {
          return t.relatedTarget === void 0
            ? t.fromElement === t.srcElement
              ? t.toElement
              : t.fromElement
            : t.relatedTarget;
        },
        movementX: function (t) {
          return "movementX" in t
            ? t.movementX
            : (t !== Ua &&
                (Ua && t.type === "mousemove"
                  ? ((Jr = t.screenX - Ua.screenX),
                    (kr = t.screenY - Ua.screenY))
                  : (kr = Jr = 0),
                (Ua = t)),
              Jr);
        },
        movementY: function (t) {
          return "movementY" in t ? t.movementY : kr;
        },
      }),
      Bf = De(Fu),
      rp = O({}, Fu, { dataTransfer: 0 }),
      cp = De(rp),
      sp = O({}, Ca, { relatedTarget: 0 }),
      $r = De(sp),
      op = O({}, sl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      fp = De(op),
      dp = O({}, sl, {
        clipboardData: function (t) {
          return "clipboardData" in t ? t.clipboardData : window.clipboardData;
        },
      }),
      hp = De(dp),
      mp = O({}, sl, { data: 0 }),
      Gf = De(mp),
      gp = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      yp = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      vp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function bp(t) {
      var e = this.nativeEvent;
      return e.getModifierState
        ? e.getModifierState(t)
        : (t = vp[t])
          ? !!e[t]
          : !1;
    }
    function Fr() {
      return bp;
    }
    var pp = O({}, Ca, {
        key: function (t) {
          if (t.key) {
            var e = gp[t.key] || t.key;
            if (e !== "Unidentified") return e;
          }
          return t.type === "keypress"
            ? ((t = Ju(t)), t === 13 ? "Enter" : String.fromCharCode(t))
            : t.type === "keydown" || t.type === "keyup"
              ? yp[t.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Fr,
        charCode: function (t) {
          return t.type === "keypress" ? Ju(t) : 0;
        },
        keyCode: function (t) {
          return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
        },
        which: function (t) {
          return t.type === "keypress"
            ? Ju(t)
            : t.type === "keydown" || t.type === "keyup"
              ? t.keyCode
              : 0;
        },
      }),
      Sp = De(pp),
      Ep = O({}, Fu, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      Yf = De(Ep),
      Tp = O({}, Ca, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Fr,
      }),
      Ap = De(Tp),
      wp = O({}, sl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Mp = De(wp),
      xp = O({}, Fu, {
        deltaX: function (t) {
          return "deltaX" in t
            ? t.deltaX
            : "wheelDeltaX" in t
              ? -t.wheelDeltaX
              : 0;
        },
        deltaY: function (t) {
          return "deltaY" in t
            ? t.deltaY
            : "wheelDeltaY" in t
              ? -t.wheelDeltaY
              : "wheelDelta" in t
                ? -t.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      _p = De(xp),
      Dp = O({}, sl, { newState: 0, oldState: 0 }),
      Op = De(Dp),
      Rp = [9, 13, 27, 32],
      Ir = mn && "CompositionEvent" in window,
      Ha = null;
    mn && "documentMode" in document && (Ha = document.documentMode);
    var zp = mn && "TextEvent" in window && !Ha,
      Vf = mn && (!Ir || (Ha && 8 < Ha && 11 >= Ha)),
      jf = " ",
      Xf = !1;
    function Qf(t, e) {
      switch (t) {
        case "keyup":
          return Rp.indexOf(e.keyCode) !== -1;
        case "keydown":
          return e.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Zf(t) {
      return (
        (t = t.detail), typeof t == "object" && "data" in t ? t.data : null
      );
    }
    var Ql = !1;
    function Np(t, e) {
      switch (t) {
        case "compositionend":
          return Zf(e);
        case "keypress":
          return e.which !== 32 ? null : ((Xf = !0), jf);
        case "textInput":
          return (t = e.data), t === jf && Xf ? null : t;
        default:
          return null;
      }
    }
    function Cp(t, e) {
      if (Ql)
        return t === "compositionend" || (!Ir && Qf(t, e))
          ? ((t = Lf()), (Ku = Kr = Ln = null), (Ql = !1), t)
          : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(e.ctrlKey || e.altKey || e.metaKey) ||
            (e.ctrlKey && e.altKey)
          ) {
            if (e.char && 1 < e.char.length) return e.char;
            if (e.which) return String.fromCharCode(e.which);
          }
          return null;
        case "compositionend":
          return Vf && e.locale !== "ko" ? null : e.data;
        default:
          return null;
      }
    }
    var Up = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function Kf(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === "input" ? !!Up[t.type] : e === "textarea";
    }
    function Jf(t, e, n, l) {
      jl ? (Xl ? Xl.push(l) : (Xl = [l])) : (jl = l),
        (e = Li(e, "onChange")),
        0 < e.length &&
          ((n = new $u("onChange", "change", null, n, l)),
          t.push({ event: n, listeners: e }));
    }
    var La = null,
      qa = null;
    function Hp(t) {
      _m(t, 0);
    }
    function Iu(t) {
      var e = Ft(t);
      if (Df(e)) return t;
    }
    function kf(t, e) {
      if (t === "change") return e;
    }
    var $f = !1;
    if (mn) {
      var Wr;
      if (mn) {
        var Pr = "oninput" in document;
        if (!Pr) {
          var Ff = document.createElement("div");
          Ff.setAttribute("oninput", "return;"),
            (Pr = typeof Ff.oninput == "function");
        }
        Wr = Pr;
      } else Wr = !1;
      $f = Wr && (!document.documentMode || 9 < document.documentMode);
    }
    function If() {
      La && (La.detachEvent("onpropertychange", Wf), (qa = La = null));
    }
    function Wf(t) {
      if (t.propertyName === "value" && Iu(qa)) {
        var e = [];
        Jf(e, qa, t, Xr(t)), Hf(Hp, e);
      }
    }
    function Lp(t, e, n) {
      t === "focusin"
        ? (If(), (La = e), (qa = n), La.attachEvent("onpropertychange", Wf))
        : t === "focusout" && If();
    }
    function qp(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return Iu(qa);
    }
    function Bp(t, e) {
      if (t === "click") return Iu(e);
    }
    function Gp(t, e) {
      if (t === "input" || t === "change") return Iu(e);
    }
    function Yp(t, e) {
      return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
    }
    var Ce = typeof Object.is == "function" ? Object.is : Yp;
    function Ba(t, e) {
      if (Ce(t, e)) return !0;
      if (
        typeof t != "object" ||
        t === null ||
        typeof e != "object" ||
        e === null
      )
        return !1;
      var n = Object.keys(t),
        l = Object.keys(e);
      if (n.length !== l.length) return !1;
      for (l = 0; l < n.length; l++) {
        var u = n[l];
        if (!wa.call(e, u) || !Ce(t[u], e[u])) return !1;
      }
      return !0;
    }
    function Pf(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function td(t, e) {
      var n = Pf(t);
      t = 0;
      for (var l; n; ) {
        if (n.nodeType === 3) {
          if (((l = t + n.textContent.length), t <= e && l >= e))
            return { node: n, offset: e - t };
          t = l;
        }
        t: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break t;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Pf(n);
      }
    }
    function ed(t, e) {
      return t && e
        ? t === e
          ? !0
          : t && t.nodeType === 3
            ? !1
            : e && e.nodeType === 3
              ? ed(t, e.parentNode)
              : "contains" in t
                ? t.contains(e)
                : t.compareDocumentPosition
                  ? !!(t.compareDocumentPosition(e) & 16)
                  : !1
        : !1;
    }
    function nd(t) {
      t =
        t != null &&
        t.ownerDocument != null &&
        t.ownerDocument.defaultView != null
          ? t.ownerDocument.defaultView
          : window;
      for (var e = Qu(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var n = typeof e.contentWindow.location.href == "string";
        } catch {
          n = !1;
        }
        if (n) t = e.contentWindow;
        else break;
        e = Qu(t.document);
      }
      return e;
    }
    function tc(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return (
        e &&
        ((e === "input" &&
          (t.type === "text" ||
            t.type === "search" ||
            t.type === "tel" ||
            t.type === "url" ||
            t.type === "password")) ||
          e === "textarea" ||
          t.contentEditable === "true")
      );
    }
    var Vp = mn && "documentMode" in document && 11 >= document.documentMode,
      Zl = null,
      ec = null,
      Ga = null,
      nc = !1;
    function ld(t, e, n) {
      var l =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      nc ||
        Zl == null ||
        Zl !== Qu(l) ||
        ((l = Zl),
        "selectionStart" in l && tc(l)
          ? (l = { start: l.selectionStart, end: l.selectionEnd })
          : ((l = (
              (l.ownerDocument && l.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (l = {
              anchorNode: l.anchorNode,
              anchorOffset: l.anchorOffset,
              focusNode: l.focusNode,
              focusOffset: l.focusOffset,
            })),
        (Ga && Ba(Ga, l)) ||
          ((Ga = l),
          (l = Li(ec, "onSelect")),
          0 < l.length &&
            ((e = new $u("onSelect", "select", null, e, n)),
            t.push({ event: e, listeners: l }),
            (e.target = Zl))));
    }
    function ol(t, e) {
      var n = {};
      return (
        (n[t.toLowerCase()] = e.toLowerCase()),
        (n["Webkit" + t] = "webkit" + e),
        (n["Moz" + t] = "moz" + e),
        n
      );
    }
    var Kl = {
        animationend: ol("Animation", "AnimationEnd"),
        animationiteration: ol("Animation", "AnimationIteration"),
        animationstart: ol("Animation", "AnimationStart"),
        transitionrun: ol("Transition", "TransitionRun"),
        transitionstart: ol("Transition", "TransitionStart"),
        transitioncancel: ol("Transition", "TransitionCancel"),
        transitionend: ol("Transition", "TransitionEnd"),
      },
      lc = {},
      ad = {};
    mn &&
      ((ad = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Kl.animationend.animation,
        delete Kl.animationiteration.animation,
        delete Kl.animationstart.animation),
      "TransitionEvent" in window || delete Kl.transitionend.transition);
    function fl(t) {
      if (lc[t]) return lc[t];
      if (!Kl[t]) return t;
      var e = Kl[t],
        n;
      for (n in e) if (e.hasOwnProperty(n) && n in ad) return (lc[t] = e[n]);
      return t;
    }
    var ud = fl("animationend"),
      id = fl("animationiteration"),
      rd = fl("animationstart"),
      jp = fl("transitionrun"),
      Xp = fl("transitionstart"),
      Qp = fl("transitioncancel"),
      cd = fl("transitionend"),
      sd = new Map(),
      ac =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " ",
        );
    ac.push("scrollEnd");
    function Pe(t, e) {
      sd.set(t, e), Ne(e, [t]);
    }
    var od = new WeakMap();
    function Xe(t, e) {
      if (typeof t == "object" && t !== null) {
        var n = od.get(t);
        return n !== void 0
          ? n
          : ((e = { value: t, source: e, stack: xf(e) }), od.set(t, e), e);
      }
      return { value: t, source: e, stack: xf(e) };
    }
    var Qe = [],
      Jl = 0,
      uc = 0;
    function Wu() {
      for (var t = Jl, e = (uc = Jl = 0); e < t; ) {
        var n = Qe[e];
        Qe[e++] = null;
        var l = Qe[e];
        Qe[e++] = null;
        var u = Qe[e];
        Qe[e++] = null;
        var i = Qe[e];
        if (((Qe[e++] = null), l !== null && u !== null)) {
          var o = l.pending;
          o === null ? (u.next = u) : ((u.next = o.next), (o.next = u)),
            (l.pending = u);
        }
        i !== 0 && fd(n, u, i);
      }
    }
    function Pu(t, e, n, l) {
      (Qe[Jl++] = t),
        (Qe[Jl++] = e),
        (Qe[Jl++] = n),
        (Qe[Jl++] = l),
        (uc |= l),
        (t.lanes |= l),
        (t = t.alternate),
        t !== null && (t.lanes |= l);
    }
    function ic(t, e, n, l) {
      return Pu(t, e, n, l), ti(t);
    }
    function kl(t, e) {
      return Pu(t, null, null, e), ti(t);
    }
    function fd(t, e, n) {
      t.lanes |= n;
      var l = t.alternate;
      l !== null && (l.lanes |= n);
      for (var u = !1, i = t.return; i !== null; )
        (i.childLanes |= n),
          (l = i.alternate),
          l !== null && (l.childLanes |= n),
          i.tag === 22 &&
            ((t = i.stateNode), t === null || t._visibility & 1 || (u = !0)),
          (t = i),
          (i = i.return);
      return t.tag === 3
        ? ((i = t.stateNode),
          u &&
            e !== null &&
            ((u = 31 - Jt(n)),
            (t = i.hiddenUpdates),
            (l = t[u]),
            l === null ? (t[u] = [e]) : l.push(e),
            (e.lane = n | 536870912)),
          i)
        : null;
    }
    function ti(t) {
      if (50 < ou) throw ((ou = 0), (ds = null), Error(c(185)));
      for (var e = t.return; e !== null; ) (t = e), (e = t.return);
      return t.tag === 3 ? t.stateNode : null;
    }
    var $l = {};
    function Zp(t, e, n, l) {
      (this.tag = t),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = e),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = l),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function Ue(t, e, n, l) {
      return new Zp(t, e, n, l);
    }
    function rc(t) {
      return (t = t.prototype), !(!t || !t.isReactComponent);
    }
    function gn(t, e) {
      var n = t.alternate;
      return (
        n === null
          ? ((n = Ue(t.tag, e, t.key, t.mode)),
            (n.elementType = t.elementType),
            (n.type = t.type),
            (n.stateNode = t.stateNode),
            (n.alternate = t),
            (t.alternate = n))
          : ((n.pendingProps = e),
            (n.type = t.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = t.flags & 65011712),
        (n.childLanes = t.childLanes),
        (n.lanes = t.lanes),
        (n.child = t.child),
        (n.memoizedProps = t.memoizedProps),
        (n.memoizedState = t.memoizedState),
        (n.updateQueue = t.updateQueue),
        (e = t.dependencies),
        (n.dependencies =
          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
        (n.sibling = t.sibling),
        (n.index = t.index),
        (n.ref = t.ref),
        (n.refCleanup = t.refCleanup),
        n
      );
    }
    function dd(t, e) {
      t.flags &= 65011714;
      var n = t.alternate;
      return (
        n === null
          ? ((t.childLanes = 0),
            (t.lanes = e),
            (t.child = null),
            (t.subtreeFlags = 0),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.dependencies = null),
            (t.stateNode = null))
          : ((t.childLanes = n.childLanes),
            (t.lanes = n.lanes),
            (t.child = n.child),
            (t.subtreeFlags = 0),
            (t.deletions = null),
            (t.memoizedProps = n.memoizedProps),
            (t.memoizedState = n.memoizedState),
            (t.updateQueue = n.updateQueue),
            (t.type = n.type),
            (e = n.dependencies),
            (t.dependencies =
              e === null
                ? null
                : { lanes: e.lanes, firstContext: e.firstContext })),
        t
      );
    }
    function ei(t, e, n, l, u, i) {
      var o = 0;
      if (((l = t), typeof t == "function")) rc(t) && (o = 1);
      else if (typeof t == "string")
        o = J0(t, n, lt.current)
          ? 26
          : t === "html" || t === "head" || t === "body"
            ? 27
            : 5;
      else
        t: switch (t) {
          case Rt:
            return (
              (t = Ue(31, n, e, u)), (t.elementType = Rt), (t.lanes = i), t
            );
          case $:
            return dl(n.children, u, i, e);
          case z:
            (o = 8), (u |= 24);
            break;
          case C:
            return (
              (t = Ue(12, n, e, u | 2)), (t.elementType = C), (t.lanes = i), t
            );
          case J:
            return (t = Ue(13, n, e, u)), (t.elementType = J), (t.lanes = i), t;
          case K:
            return (t = Ue(19, n, e, u)), (t.elementType = K), (t.lanes = i), t;
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case U:
                case F:
                  o = 10;
                  break t;
                case X:
                  o = 9;
                  break t;
                case nt:
                  o = 11;
                  break t;
                case gt:
                  o = 14;
                  break t;
                case Ot:
                  (o = 16), (l = null);
                  break t;
              }
            (o = 29),
              (n = Error(c(130, t === null ? "null" : typeof t, ""))),
              (l = null);
        }
      return (
        (e = Ue(o, n, e, u)),
        (e.elementType = t),
        (e.type = l),
        (e.lanes = i),
        e
      );
    }
    function dl(t, e, n, l) {
      return (t = Ue(7, t, l, e)), (t.lanes = n), t;
    }
    function cc(t, e, n) {
      return (t = Ue(6, t, null, e)), (t.lanes = n), t;
    }
    function sc(t, e, n) {
      return (
        (e = Ue(4, t.children !== null ? t.children : [], t.key, e)),
        (e.lanes = n),
        (e.stateNode = {
          containerInfo: t.containerInfo,
          pendingChildren: null,
          implementation: t.implementation,
        }),
        e
      );
    }
    var Fl = [],
      Il = 0,
      ni = null,
      li = 0,
      Ze = [],
      Ke = 0,
      hl = null,
      yn = 1,
      vn = "";
    function ml(t, e) {
      (Fl[Il++] = li), (Fl[Il++] = ni), (ni = t), (li = e);
    }
    function hd(t, e, n) {
      (Ze[Ke++] = yn), (Ze[Ke++] = vn), (Ze[Ke++] = hl), (hl = t);
      var l = yn;
      t = vn;
      var u = 32 - Jt(l) - 1;
      (l &= ~(1 << u)), (n += 1);
      var i = 32 - Jt(e) + u;
      if (30 < i) {
        var o = u - (u % 5);
        (i = (l & ((1 << o) - 1)).toString(32)),
          (l >>= o),
          (u -= o),
          (yn = (1 << (32 - Jt(e) + u)) | (n << u) | l),
          (vn = i + t);
      } else (yn = (1 << i) | (n << u) | l), (vn = t);
    }
    function oc(t) {
      t.return !== null && (ml(t, 1), hd(t, 1, 0));
    }
    function fc(t) {
      for (; t === ni; )
        (ni = Fl[--Il]), (Fl[Il] = null), (li = Fl[--Il]), (Fl[Il] = null);
      for (; t === hl; )
        (hl = Ze[--Ke]),
          (Ze[Ke] = null),
          (vn = Ze[--Ke]),
          (Ze[Ke] = null),
          (yn = Ze[--Ke]),
          (Ze[Ke] = null);
    }
    var xe = null,
      ee = null,
      Lt = !1,
      gl = null,
      an = !1,
      dc = Error(c(519));
    function yl(t) {
      var e = Error(c(418, ""));
      throw (ja(Xe(e, t)), dc);
    }
    function md(t) {
      var e = t.stateNode,
        n = t.type,
        l = t.memoizedProps;
      switch (((e[w] = t), (e[q] = l), n)) {
        case "dialog":
          _t("cancel", e), _t("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          _t("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < du.length; n++) _t(du[n], e);
          break;
        case "source":
          _t("error", e);
          break;
        case "img":
        case "image":
        case "link":
          _t("error", e), _t("load", e);
          break;
        case "details":
          _t("toggle", e);
          break;
        case "input":
          _t("invalid", e),
            Of(
              e,
              l.value,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
              !0,
            ),
            Xu(e);
          break;
        case "select":
          _t("invalid", e);
          break;
        case "textarea":
          _t("invalid", e), zf(e, l.value, l.defaultValue, l.children), Xu(e);
      }
      (n = l.children),
        (typeof n != "string" &&
          typeof n != "number" &&
          typeof n != "bigint") ||
        e.textContent === "" + n ||
        l.suppressHydrationWarning === !0 ||
        zm(e.textContent, n)
          ? (l.popover != null && (_t("beforetoggle", e), _t("toggle", e)),
            l.onScroll != null && _t("scroll", e),
            l.onScrollEnd != null && _t("scrollend", e),
            l.onClick != null && (e.onclick = qi),
            (e = !0))
          : (e = !1),
        e || yl(t);
    }
    function gd(t) {
      for (xe = t.return; xe; )
        switch (xe.tag) {
          case 5:
          case 13:
            an = !1;
            return;
          case 27:
          case 3:
            an = !0;
            return;
          default:
            xe = xe.return;
        }
    }
    function Ya(t) {
      if (t !== xe) return !1;
      if (!Lt) return gd(t), (Lt = !0), !1;
      var e = t.tag,
        n;
      if (
        ((n = e !== 3 && e !== 27) &&
          ((n = e === 5) &&
            ((n = t.type),
            (n =
              !(n !== "form" && n !== "button") ||
              Ds(t.type, t.memoizedProps))),
          (n = !n)),
        n && ee && yl(t),
        gd(t),
        e === 13)
      ) {
        if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
          throw Error(c(317));
        t: {
          for (t = t.nextSibling, e = 0; t; ) {
            if (t.nodeType === 8)
              if (((n = t.data), n === "/$")) {
                if (e === 0) {
                  ee = en(t.nextSibling);
                  break t;
                }
                e--;
              } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
            t = t.nextSibling;
          }
          ee = null;
        }
      } else
        e === 27
          ? ((e = ee),
            Wn(t.type) ? ((t = Ns), (Ns = null), (ee = t)) : (ee = e))
          : (ee = xe ? en(t.stateNode.nextSibling) : null);
      return !0;
    }
    function Va() {
      (ee = xe = null), (Lt = !1);
    }
    function yd() {
      var t = gl;
      return (
        t !== null &&
          (ze === null ? (ze = t) : ze.push.apply(ze, t), (gl = null)),
        t
      );
    }
    function ja(t) {
      gl === null ? (gl = [t]) : gl.push(t);
    }
    var hc = V(null),
      vl = null,
      bn = null;
    function qn(t, e, n) {
      I(hc, e._currentValue), (e._currentValue = n);
    }
    function pn(t) {
      (t._currentValue = hc.current), Z(hc);
    }
    function mc(t, e, n) {
      for (; t !== null; ) {
        var l = t.alternate;
        if (
          ((t.childLanes & e) !== e
            ? ((t.childLanes |= e), l !== null && (l.childLanes |= e))
            : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e),
          t === n)
        )
          break;
        t = t.return;
      }
    }
    function gc(t, e, n, l) {
      var u = t.child;
      for (u !== null && (u.return = t); u !== null; ) {
        var i = u.dependencies;
        if (i !== null) {
          var o = u.child;
          i = i.firstContext;
          t: for (; i !== null; ) {
            var d = i;
            i = u;
            for (var v = 0; v < e.length; v++)
              if (d.context === e[v]) {
                (i.lanes |= n),
                  (d = i.alternate),
                  d !== null && (d.lanes |= n),
                  mc(i.return, n, t),
                  l || (o = null);
                break t;
              }
            i = d.next;
          }
        } else if (u.tag === 18) {
          if (((o = u.return), o === null)) throw Error(c(341));
          (o.lanes |= n),
            (i = o.alternate),
            i !== null && (i.lanes |= n),
            mc(o, n, t),
            (o = null);
        } else o = u.child;
        if (o !== null) o.return = u;
        else
          for (o = u; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (((u = o.sibling), u !== null)) {
              (u.return = o.return), (o = u);
              break;
            }
            o = o.return;
          }
        u = o;
      }
    }
    function Xa(t, e, n, l) {
      t = null;
      for (var u = e, i = !1; u !== null; ) {
        if (!i) {
          if ((u.flags & 524288) !== 0) i = !0;
          else if ((u.flags & 262144) !== 0) break;
        }
        if (u.tag === 10) {
          var o = u.alternate;
          if (o === null) throw Error(c(387));
          if (((o = o.memoizedProps), o !== null)) {
            var d = u.type;
            Ce(u.pendingProps.value, o.value) ||
              (t !== null ? t.push(d) : (t = [d]));
          }
        } else if (u === Wt.current) {
          if (((o = u.alternate), o === null)) throw Error(c(387));
          o.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
            (t !== null ? t.push(bu) : (t = [bu]));
        }
        u = u.return;
      }
      t !== null && gc(e, t, n, l), (e.flags |= 262144);
    }
    function ai(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!Ce(t.context._currentValue, t.memoizedValue)) return !0;
        t = t.next;
      }
      return !1;
    }
    function bl(t) {
      (vl = t),
        (bn = null),
        (t = t.dependencies),
        t !== null && (t.firstContext = null);
    }
    function Te(t) {
      return vd(vl, t);
    }
    function ui(t, e) {
      return vl === null && bl(t), vd(t, e);
    }
    function vd(t, e) {
      var n = e._currentValue;
      if (((e = { context: e, memoizedValue: n, next: null }), bn === null)) {
        if (t === null) throw Error(c(308));
        (bn = e),
          (t.dependencies = { lanes: 0, firstContext: e }),
          (t.flags |= 524288);
      } else bn = bn.next = e;
      return n;
    }
    var Kp =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var t = [],
                e = (this.signal = {
                  aborted: !1,
                  addEventListener: function (n, l) {
                    t.push(l);
                  },
                });
              this.abort = function () {
                (e.aborted = !0),
                  t.forEach(function (n) {
                    return n();
                  });
              };
            },
      Jp = a.unstable_scheduleCallback,
      kp = a.unstable_NormalPriority,
      se = {
        $$typeof: F,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function yc() {
      return { controller: new Kp(), data: new Map(), refCount: 0 };
    }
    function Qa(t) {
      t.refCount--,
        t.refCount === 0 &&
          Jp(kp, function () {
            t.controller.abort();
          });
    }
    var Za = null,
      vc = 0,
      Wl = 0,
      Pl = null;
    function $p(t, e) {
      if (Za === null) {
        var n = (Za = []);
        (vc = 0),
          (Wl = ps()),
          (Pl = {
            status: "pending",
            value: void 0,
            then: function (l) {
              n.push(l);
            },
          });
      }
      return vc++, e.then(bd, bd), e;
    }
    function bd() {
      if (--vc === 0 && Za !== null) {
        Pl !== null && (Pl.status = "fulfilled");
        var t = Za;
        (Za = null), (Wl = 0), (Pl = null);
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function Fp(t, e) {
      var n = [],
        l = {
          status: "pending",
          value: null,
          reason: null,
          then: function (u) {
            n.push(u);
          },
        };
      return (
        t.then(
          function () {
            (l.status = "fulfilled"), (l.value = e);
            for (var u = 0; u < n.length; u++) (0, n[u])(e);
          },
          function (u) {
            for (l.status = "rejected", l.reason = u, u = 0; u < n.length; u++)
              (0, n[u])(void 0);
          },
        ),
        l
      );
    }
    var pd = _.S;
    _.S = function (t, e) {
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        $p(t, e),
        pd !== null && pd(t, e);
    };
    var pl = V(null);
    function bc() {
      var t = pl.current;
      return t !== null ? t : kt.pooledCache;
    }
    function ii(t, e) {
      e === null ? I(pl, pl.current) : I(pl, e.pool);
    }
    function Sd() {
      var t = bc();
      return t === null ? null : { parent: se._currentValue, pool: t };
    }
    var Ka = Error(c(460)),
      Ed = Error(c(474)),
      ri = Error(c(542)),
      pc = { then: function () {} };
    function Td(t) {
      return (t = t.status), t === "fulfilled" || t === "rejected";
    }
    function ci() {}
    function Ad(t, e, n) {
      switch (
        ((n = t[n]),
        n === void 0 ? t.push(e) : n !== e && (e.then(ci, ci), (e = n)),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw ((t = e.reason), Md(t), t);
        default:
          if (typeof e.status == "string") e.then(ci, ci);
          else {
            if (((t = kt), t !== null && 100 < t.shellSuspendCounter))
              throw Error(c(482));
            (t = e),
              (t.status = "pending"),
              t.then(
                function (l) {
                  if (e.status === "pending") {
                    var u = e;
                    (u.status = "fulfilled"), (u.value = l);
                  }
                },
                function (l) {
                  if (e.status === "pending") {
                    var u = e;
                    (u.status = "rejected"), (u.reason = l);
                  }
                },
              );
          }
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw ((t = e.reason), Md(t), t);
          }
          throw ((Ja = e), Ka);
      }
    }
    var Ja = null;
    function wd() {
      if (Ja === null) throw Error(c(459));
      var t = Ja;
      return (Ja = null), t;
    }
    function Md(t) {
      if (t === Ka || t === ri) throw Error(c(483));
    }
    var Bn = !1;
    function Sc(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Ec(t, e) {
      (t = t.updateQueue),
        e.updateQueue === t &&
          (e.updateQueue = {
            baseState: t.baseState,
            firstBaseUpdate: t.firstBaseUpdate,
            lastBaseUpdate: t.lastBaseUpdate,
            shared: t.shared,
            callbacks: null,
          });
    }
    function Gn(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function Yn(t, e, n) {
      var l = t.updateQueue;
      if (l === null) return null;
      if (((l = l.shared), (Gt & 2) !== 0)) {
        var u = l.pending;
        return (
          u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
          (l.pending = e),
          (e = ti(t)),
          fd(t, null, n),
          e
        );
      }
      return Pu(t, l, e, n), ti(t);
    }
    function ka(t, e, n) {
      if (
        ((e = e.updateQueue),
        e !== null && ((e = e.shared), (n & 4194048) !== 0))
      ) {
        var l = e.lanes;
        (l &= t.pendingLanes), (n |= l), (e.lanes = n), Yu(t, n);
      }
    }
    function Tc(t, e) {
      var n = t.updateQueue,
        l = t.alternate;
      if (l !== null && ((l = l.updateQueue), n === l)) {
        var u = null,
          i = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = {
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null,
            };
            i === null ? (u = i = o) : (i = i.next = o), (n = n.next);
          } while (n !== null);
          i === null ? (u = i = e) : (i = i.next = e);
        } else u = i = e;
        (n = {
          baseState: l.baseState,
          firstBaseUpdate: u,
          lastBaseUpdate: i,
          shared: l.shared,
          callbacks: l.callbacks,
        }),
          (t.updateQueue = n);
        return;
      }
      (t = n.lastBaseUpdate),
        t === null ? (n.firstBaseUpdate = e) : (t.next = e),
        (n.lastBaseUpdate = e);
    }
    var Ac = !1;
    function $a() {
      if (Ac) {
        var t = Pl;
        if (t !== null) throw t;
      }
    }
    function Fa(t, e, n, l) {
      Ac = !1;
      var u = t.updateQueue;
      Bn = !1;
      var i = u.firstBaseUpdate,
        o = u.lastBaseUpdate,
        d = u.shared.pending;
      if (d !== null) {
        u.shared.pending = null;
        var v = d,
          D = v.next;
        (v.next = null), o === null ? (i = D) : (o.next = D), (o = v);
        var B = t.alternate;
        B !== null &&
          ((B = B.updateQueue),
          (d = B.lastBaseUpdate),
          d !== o &&
            (d === null ? (B.firstBaseUpdate = D) : (d.next = D),
            (B.lastBaseUpdate = v)));
      }
      if (i !== null) {
        var Y = u.baseState;
        (o = 0), (B = D = v = null), (d = i);
        do {
          var R = d.lane & -536870913,
            N = R !== d.lane;
          if (N ? (Nt & R) === R : (l & R) === R) {
            R !== 0 && R === Wl && (Ac = !0),
              B !== null &&
                (B = B.next =
                  {
                    lane: 0,
                    tag: d.tag,
                    payload: d.payload,
                    callback: null,
                    next: null,
                  });
            t: {
              var vt = t,
                dt = d;
              R = e;
              var Xt = n;
              switch (dt.tag) {
                case 1:
                  if (((vt = dt.payload), typeof vt == "function")) {
                    Y = vt.call(Xt, Y, R);
                    break t;
                  }
                  Y = vt;
                  break t;
                case 3:
                  vt.flags = (vt.flags & -65537) | 128;
                case 0:
                  if (
                    ((vt = dt.payload),
                    (R = typeof vt == "function" ? vt.call(Xt, Y, R) : vt),
                    R == null)
                  )
                    break t;
                  Y = O({}, Y, R);
                  break t;
                case 2:
                  Bn = !0;
              }
            }
            (R = d.callback),
              R !== null &&
                ((t.flags |= 64),
                N && (t.flags |= 8192),
                (N = u.callbacks),
                N === null ? (u.callbacks = [R]) : N.push(R));
          } else
            (N = {
              lane: R,
              tag: d.tag,
              payload: d.payload,
              callback: d.callback,
              next: null,
            }),
              B === null ? ((D = B = N), (v = Y)) : (B = B.next = N),
              (o |= R);
          if (((d = d.next), d === null)) {
            if (((d = u.shared.pending), d === null)) break;
            (N = d),
              (d = N.next),
              (N.next = null),
              (u.lastBaseUpdate = N),
              (u.shared.pending = null);
          }
        } while (!0);
        B === null && (v = Y),
          (u.baseState = v),
          (u.firstBaseUpdate = D),
          (u.lastBaseUpdate = B),
          i === null && (u.shared.lanes = 0),
          (kn |= o),
          (t.lanes = o),
          (t.memoizedState = Y);
      }
    }
    function xd(t, e) {
      if (typeof t != "function") throw Error(c(191, t));
      t.call(e);
    }
    function _d(t, e) {
      var n = t.callbacks;
      if (n !== null)
        for (t.callbacks = null, t = 0; t < n.length; t++) xd(n[t], e);
    }
    var ta = V(null),
      si = V(0);
    function Dd(t, e) {
      (t = xn), I(si, t), I(ta, e), (xn = t | e.baseLanes);
    }
    function wc() {
      I(si, xn), I(ta, ta.current);
    }
    function Mc() {
      (xn = si.current), Z(ta), Z(si);
    }
    var Vn = 0,
      At = null,
      Vt = null,
      re = null,
      oi = !1,
      ea = !1,
      Sl = !1,
      fi = 0,
      Ia = 0,
      na = null,
      Ip = 0;
    function le() {
      throw Error(c(321));
    }
    function xc(t, e) {
      if (e === null) return !1;
      for (var n = 0; n < e.length && n < t.length; n++)
        if (!Ce(t[n], e[n])) return !1;
      return !0;
    }
    function _c(t, e, n, l, u, i) {
      return (
        (Vn = i),
        (At = e),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.lanes = 0),
        (_.H = t === null || t.memoizedState === null ? fh : dh),
        (Sl = !1),
        (i = n(l, u)),
        (Sl = !1),
        ea && (i = Rd(e, n, l, u)),
        Od(t),
        i
      );
    }
    function Od(t) {
      _.H = vi;
      var e = Vt !== null && Vt.next !== null;
      if (
        ((Vn = 0), (re = Vt = At = null), (oi = !1), (Ia = 0), (na = null), e)
      )
        throw Error(c(300));
      t === null ||
        he ||
        ((t = t.dependencies), t !== null && ai(t) && (he = !0));
    }
    function Rd(t, e, n, l) {
      At = t;
      var u = 0;
      do {
        if ((ea && (na = null), (Ia = 0), (ea = !1), 25 <= u))
          throw Error(c(301));
        if (((u += 1), (re = Vt = null), t.updateQueue != null)) {
          var i = t.updateQueue;
          (i.lastEffect = null),
            (i.events = null),
            (i.stores = null),
            i.memoCache != null && (i.memoCache.index = 0);
        }
        (_.H = a0), (i = e(n, l));
      } while (ea);
      return i;
    }
    function Wp() {
      var t = _.H,
        e = t.useState()[0];
      return (
        (e = typeof e.then == "function" ? Wa(e) : e),
        (t = t.useState()[0]),
        (Vt !== null ? Vt.memoizedState : null) !== t && (At.flags |= 1024),
        e
      );
    }
    function Dc() {
      var t = fi !== 0;
      return (fi = 0), t;
    }
    function Oc(t, e, n) {
      (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n);
    }
    function Rc(t) {
      if (oi) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), (t = t.next);
        }
        oi = !1;
      }
      (Vn = 0), (re = Vt = At = null), (ea = !1), (Ia = fi = 0), (na = null);
    }
    function Oe() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return re === null ? (At.memoizedState = re = t) : (re = re.next = t), re;
    }
    function ce() {
      if (Vt === null) {
        var t = At.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = Vt.next;
      var e = re === null ? At.memoizedState : re.next;
      if (e !== null) (re = e), (Vt = t);
      else {
        if (t === null)
          throw At.alternate === null ? Error(c(467)) : Error(c(310));
        (Vt = t),
          (t = {
            memoizedState: Vt.memoizedState,
            baseState: Vt.baseState,
            baseQueue: Vt.baseQueue,
            queue: Vt.queue,
            next: null,
          }),
          re === null ? (At.memoizedState = re = t) : (re = re.next = t);
      }
      return re;
    }
    function zc() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Wa(t) {
      var e = Ia;
      return (
        (Ia += 1),
        na === null && (na = []),
        (t = Ad(na, t, e)),
        (e = At),
        (re === null ? e.memoizedState : re.next) === null &&
          ((e = e.alternate),
          (_.H = e === null || e.memoizedState === null ? fh : dh)),
        t
      );
    }
    function di(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Wa(t);
        if (t.$$typeof === F) return Te(t);
      }
      throw Error(c(438, String(t)));
    }
    function Nc(t) {
      var e = null,
        n = At.updateQueue;
      if ((n !== null && (e = n.memoCache), e == null)) {
        var l = At.alternate;
        l !== null &&
          ((l = l.updateQueue),
          l !== null &&
            ((l = l.memoCache),
            l != null &&
              (e = {
                data: l.data.map(function (u) {
                  return u.slice();
                }),
                index: 0,
              })));
      }
      if (
        (e == null && (e = { data: [], index: 0 }),
        n === null && ((n = zc()), (At.updateQueue = n)),
        (n.memoCache = e),
        (n = e.data[e.index]),
        n === void 0)
      )
        for (n = e.data[e.index] = Array(t), l = 0; l < t; l++) n[l] = Tt;
      return e.index++, n;
    }
    function Sn(t, e) {
      return typeof e == "function" ? e(t) : e;
    }
    function hi(t) {
      var e = ce();
      return Cc(e, Vt, t);
    }
    function Cc(t, e, n) {
      var l = t.queue;
      if (l === null) throw Error(c(311));
      l.lastRenderedReducer = n;
      var u = t.baseQueue,
        i = l.pending;
      if (i !== null) {
        if (u !== null) {
          var o = u.next;
          (u.next = i.next), (i.next = o);
        }
        (e.baseQueue = u = i), (l.pending = null);
      }
      if (((i = t.baseState), u === null)) t.memoizedState = i;
      else {
        e = u.next;
        var d = (o = null),
          v = null,
          D = e,
          B = !1;
        do {
          var Y = D.lane & -536870913;
          if (Y !== D.lane ? (Nt & Y) === Y : (Vn & Y) === Y) {
            var R = D.revertLane;
            if (R === 0)
              v !== null &&
                (v = v.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    action: D.action,
                    hasEagerState: D.hasEagerState,
                    eagerState: D.eagerState,
                    next: null,
                  }),
                Y === Wl && (B = !0);
            else if ((Vn & R) === R) {
              (D = D.next), R === Wl && (B = !0);
              continue;
            } else
              (Y = {
                lane: 0,
                revertLane: D.revertLane,
                action: D.action,
                hasEagerState: D.hasEagerState,
                eagerState: D.eagerState,
                next: null,
              }),
                v === null ? ((d = v = Y), (o = i)) : (v = v.next = Y),
                (At.lanes |= R),
                (kn |= R);
            (Y = D.action),
              Sl && n(i, Y),
              (i = D.hasEagerState ? D.eagerState : n(i, Y));
          } else
            (R = {
              lane: Y,
              revertLane: D.revertLane,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              v === null ? ((d = v = R), (o = i)) : (v = v.next = R),
              (At.lanes |= Y),
              (kn |= Y);
          D = D.next;
        } while (D !== null && D !== e);
        if (
          (v === null ? (o = i) : (v.next = d),
          !Ce(i, t.memoizedState) && ((he = !0), B && ((n = Pl), n !== null)))
        )
          throw n;
        (t.memoizedState = i),
          (t.baseState = o),
          (t.baseQueue = v),
          (l.lastRenderedState = i);
      }
      return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
    }
    function Uc(t) {
      var e = ce(),
        n = e.queue;
      if (n === null) throw Error(c(311));
      n.lastRenderedReducer = t;
      var l = n.dispatch,
        u = n.pending,
        i = e.memoizedState;
      if (u !== null) {
        n.pending = null;
        var o = (u = u.next);
        do (i = t(i, o.action)), (o = o.next);
        while (o !== u);
        Ce(i, e.memoizedState) || (he = !0),
          (e.memoizedState = i),
          e.baseQueue === null && (e.baseState = i),
          (n.lastRenderedState = i);
      }
      return [i, l];
    }
    function zd(t, e, n) {
      var l = At,
        u = ce(),
        i = Lt;
      if (i) {
        if (n === void 0) throw Error(c(407));
        n = n();
      } else n = e();
      var o = !Ce((Vt || u).memoizedState, n);
      o && ((u.memoizedState = n), (he = !0)), (u = u.queue);
      var d = Ud.bind(null, l, u, t);
      if (
        (Pa(2048, 8, d, [t]),
        u.getSnapshot !== e || o || (re !== null && re.memoizedState.tag & 1))
      ) {
        if (
          ((l.flags |= 2048),
          la(9, mi(), Cd.bind(null, l, u, n, e), null),
          kt === null)
        )
          throw Error(c(349));
        i || (Vn & 124) !== 0 || Nd(l, e, n);
      }
      return n;
    }
    function Nd(t, e, n) {
      (t.flags |= 16384),
        (t = { getSnapshot: e, value: n }),
        (e = At.updateQueue),
        e === null
          ? ((e = zc()), (At.updateQueue = e), (e.stores = [t]))
          : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t));
    }
    function Cd(t, e, n, l) {
      (e.value = n), (e.getSnapshot = l), Hd(e) && Ld(t);
    }
    function Ud(t, e, n) {
      return n(function () {
        Hd(e) && Ld(t);
      });
    }
    function Hd(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var n = e();
        return !Ce(t, n);
      } catch {
        return !0;
      }
    }
    function Ld(t) {
      var e = kl(t, 2);
      e !== null && Ge(e, t, 2);
    }
    function Hc(t) {
      var e = Oe();
      if (typeof t == "function") {
        var n = t;
        if (((t = n()), Sl)) {
          ue(!0);
          try {
            n();
          } finally {
            ue(!1);
          }
        }
      }
      return (
        (e.memoizedState = e.baseState = t),
        (e.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Sn,
          lastRenderedState: t,
        }),
        e
      );
    }
    function qd(t, e, n, l) {
      return (t.baseState = n), Cc(t, Vt, typeof l == "function" ? l : Sn);
    }
    function Pp(t, e, n, l, u) {
      if (yi(t)) throw Error(c(485));
      if (((t = e.action), t !== null)) {
        var i = {
          payload: u,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (o) {
            i.listeners.push(o);
          },
        };
        _.T !== null ? n(!0) : (i.isTransition = !1),
          l(i),
          (n = e.pending),
          n === null
            ? ((i.next = e.pending = i), Bd(e, i))
            : ((i.next = n.next), (e.pending = n.next = i));
      }
    }
    function Bd(t, e) {
      var n = e.action,
        l = e.payload,
        u = t.state;
      if (e.isTransition) {
        var i = _.T,
          o = {};
        _.T = o;
        try {
          var d = n(u, l),
            v = _.S;
          v !== null && v(o, d), Gd(t, e, d);
        } catch (D) {
          Lc(t, e, D);
        } finally {
          _.T = i;
        }
      } else
        try {
          (i = n(u, l)), Gd(t, e, i);
        } catch (D) {
          Lc(t, e, D);
        }
    }
    function Gd(t, e, n) {
      n !== null && typeof n == "object" && typeof n.then == "function"
        ? n.then(
            function (l) {
              Yd(t, e, l);
            },
            function (l) {
              return Lc(t, e, l);
            },
          )
        : Yd(t, e, n);
    }
    function Yd(t, e, n) {
      (e.status = "fulfilled"),
        (e.value = n),
        Vd(e),
        (t.state = n),
        (e = t.pending),
        e !== null &&
          ((n = e.next),
          n === e
            ? (t.pending = null)
            : ((n = n.next), (e.next = n), Bd(t, n)));
    }
    function Lc(t, e, n) {
      var l = t.pending;
      if (((t.pending = null), l !== null)) {
        l = l.next;
        do (e.status = "rejected"), (e.reason = n), Vd(e), (e = e.next);
        while (e !== l);
      }
      t.action = null;
    }
    function Vd(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function jd(t, e) {
      return e;
    }
    function Xd(t, e) {
      if (Lt) {
        var n = kt.formState;
        if (n !== null) {
          t: {
            var l = At;
            if (Lt) {
              if (ee) {
                e: {
                  for (var u = ee, i = an; u.nodeType !== 8; ) {
                    if (!i) {
                      u = null;
                      break e;
                    }
                    if (((u = en(u.nextSibling)), u === null)) {
                      u = null;
                      break e;
                    }
                  }
                  (i = u.data), (u = i === "F!" || i === "F" ? u : null);
                }
                if (u) {
                  (ee = en(u.nextSibling)), (l = u.data === "F!");
                  break t;
                }
              }
              yl(l);
            }
            l = !1;
          }
          l && (e = n[0]);
        }
      }
      return (
        (n = Oe()),
        (n.memoizedState = n.baseState = e),
        (l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: jd,
          lastRenderedState: e,
        }),
        (n.queue = l),
        (n = ch.bind(null, At, l)),
        (l.dispatch = n),
        (l = Hc(!1)),
        (i = Vc.bind(null, At, !1, l.queue)),
        (l = Oe()),
        (u = { state: e, dispatch: null, action: t, pending: null }),
        (l.queue = u),
        (n = Pp.bind(null, At, u, i, n)),
        (u.dispatch = n),
        (l.memoizedState = t),
        [e, n, !1]
      );
    }
    function Qd(t) {
      var e = ce();
      return Zd(e, Vt, t);
    }
    function Zd(t, e, n) {
      if (
        ((e = Cc(t, e, jd)[0]),
        (t = hi(Sn)[0]),
        typeof e == "object" && e !== null && typeof e.then == "function")
      )
        try {
          var l = Wa(e);
        } catch (o) {
          throw o === Ka ? ri : o;
        }
      else l = e;
      e = ce();
      var u = e.queue,
        i = u.dispatch;
      return (
        n !== e.memoizedState &&
          ((At.flags |= 2048), la(9, mi(), t0.bind(null, u, n), null)),
        [l, i, t]
      );
    }
    function t0(t, e) {
      t.action = e;
    }
    function Kd(t) {
      var e = ce(),
        n = Vt;
      if (n !== null) return Zd(e, n, t);
      ce(), (e = e.memoizedState), (n = ce());
      var l = n.queue.dispatch;
      return (n.memoizedState = t), [e, l, !1];
    }
    function la(t, e, n, l) {
      return (
        (t = { tag: t, create: n, deps: l, inst: e, next: null }),
        (e = At.updateQueue),
        e === null && ((e = zc()), (At.updateQueue = e)),
        (n = e.lastEffect),
        n === null
          ? (e.lastEffect = t.next = t)
          : ((l = n.next), (n.next = t), (t.next = l), (e.lastEffect = t)),
        t
      );
    }
    function mi() {
      return { destroy: void 0, resource: void 0 };
    }
    function Jd() {
      return ce().memoizedState;
    }
    function gi(t, e, n, l) {
      var u = Oe();
      (l = l === void 0 ? null : l),
        (At.flags |= t),
        (u.memoizedState = la(1 | e, mi(), n, l));
    }
    function Pa(t, e, n, l) {
      var u = ce();
      l = l === void 0 ? null : l;
      var i = u.memoizedState.inst;
      Vt !== null && l !== null && xc(l, Vt.memoizedState.deps)
        ? (u.memoizedState = la(e, i, n, l))
        : ((At.flags |= t), (u.memoizedState = la(1 | e, i, n, l)));
    }
    function kd(t, e) {
      gi(8390656, 8, t, e);
    }
    function $d(t, e) {
      Pa(2048, 8, t, e);
    }
    function Fd(t, e) {
      return Pa(4, 2, t, e);
    }
    function Id(t, e) {
      return Pa(4, 4, t, e);
    }
    function Wd(t, e) {
      if (typeof e == "function") {
        t = t();
        var n = e(t);
        return function () {
          typeof n == "function" ? n() : e(null);
        };
      }
      if (e != null)
        return (
          (t = t()),
          (e.current = t),
          function () {
            e.current = null;
          }
        );
    }
    function Pd(t, e, n) {
      (n = n != null ? n.concat([t]) : null), Pa(4, 4, Wd.bind(null, e, t), n);
    }
    function qc() {}
    function th(t, e) {
      var n = ce();
      e = e === void 0 ? null : e;
      var l = n.memoizedState;
      return e !== null && xc(e, l[1]) ? l[0] : ((n.memoizedState = [t, e]), t);
    }
    function eh(t, e) {
      var n = ce();
      e = e === void 0 ? null : e;
      var l = n.memoizedState;
      if (e !== null && xc(e, l[1])) return l[0];
      if (((l = t()), Sl)) {
        ue(!0);
        try {
          t();
        } finally {
          ue(!1);
        }
      }
      return (n.memoizedState = [l, e]), l;
    }
    function Bc(t, e, n) {
      return n === void 0 || (Vn & 1073741824) !== 0
        ? (t.memoizedState = e)
        : ((t.memoizedState = n), (t = am()), (At.lanes |= t), (kn |= t), n);
    }
    function nh(t, e, n, l) {
      return Ce(n, e)
        ? n
        : ta.current !== null
          ? ((t = Bc(t, n, l)), Ce(t, e) || (he = !0), t)
          : (Vn & 42) === 0
            ? ((he = !0), (t.memoizedState = n))
            : ((t = am()), (At.lanes |= t), (kn |= t), e);
    }
    function lh(t, e, n, l, u) {
      var i = W.p;
      W.p = i !== 0 && 8 > i ? i : 8;
      var o = _.T,
        d = {};
      (_.T = d), Vc(t, !1, e, n);
      try {
        var v = u(),
          D = _.S;
        if (
          (D !== null && D(d, v),
          v !== null && typeof v == "object" && typeof v.then == "function")
        ) {
          var B = Fp(v, l);
          tu(t, e, B, Be(t));
        } else tu(t, e, l, Be(t));
      } catch (Y) {
        tu(t, e, { then: function () {}, status: "rejected", reason: Y }, Be());
      } finally {
        (W.p = i), (_.T = o);
      }
    }
    function e0() {}
    function Gc(t, e, n, l) {
      if (t.tag !== 5) throw Error(c(476));
      var u = ah(t).queue;
      lh(
        t,
        u,
        e,
        tt,
        n === null
          ? e0
          : function () {
              return uh(t), n(l);
            },
      );
    }
    function ah(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = {
        memoizedState: tt,
        baseState: tt,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Sn,
          lastRenderedState: tt,
        },
        next: null,
      };
      var n = {};
      return (
        (e.next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Sn,
            lastRenderedState: n,
          },
          next: null,
        }),
        (t.memoizedState = e),
        (t = t.alternate),
        t !== null && (t.memoizedState = e),
        e
      );
    }
    function uh(t) {
      var e = ah(t).next.queue;
      tu(t, e, {}, Be());
    }
    function Yc() {
      return Te(bu);
    }
    function ih() {
      return ce().memoizedState;
    }
    function rh() {
      return ce().memoizedState;
    }
    function n0(t) {
      for (var e = t.return; e !== null; ) {
        switch (e.tag) {
          case 24:
          case 3:
            var n = Be();
            t = Gn(n);
            var l = Yn(e, t, n);
            l !== null && (Ge(l, e, n), ka(l, e, n)),
              (e = { cache: yc() }),
              (t.payload = e);
            return;
        }
        e = e.return;
      }
    }
    function l0(t, e, n) {
      var l = Be();
      (n = {
        lane: l,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        yi(t)
          ? sh(e, n)
          : ((n = ic(t, e, n, l)), n !== null && (Ge(n, t, l), oh(n, e, l)));
    }
    function ch(t, e, n) {
      var l = Be();
      tu(t, e, n, l);
    }
    function tu(t, e, n, l) {
      var u = {
        lane: l,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (yi(t)) sh(e, u);
      else {
        var i = t.alternate;
        if (
          t.lanes === 0 &&
          (i === null || i.lanes === 0) &&
          ((i = e.lastRenderedReducer), i !== null)
        )
          try {
            var o = e.lastRenderedState,
              d = i(o, n);
            if (((u.hasEagerState = !0), (u.eagerState = d), Ce(d, o)))
              return Pu(t, e, u, 0), kt === null && Wu(), !1;
          } catch {
          } finally {
          }
        if (((n = ic(t, e, u, l)), n !== null))
          return Ge(n, t, l), oh(n, e, l), !0;
      }
      return !1;
    }
    function Vc(t, e, n, l) {
      if (
        ((l = {
          lane: 2,
          revertLane: ps(),
          action: l,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        yi(t))
      ) {
        if (e) throw Error(c(479));
      } else (e = ic(t, n, l, 2)), e !== null && Ge(e, t, 2);
    }
    function yi(t) {
      var e = t.alternate;
      return t === At || (e !== null && e === At);
    }
    function sh(t, e) {
      ea = oi = !0;
      var n = t.pending;
      n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
        (t.pending = e);
    }
    function oh(t, e, n) {
      if ((n & 4194048) !== 0) {
        var l = e.lanes;
        (l &= t.pendingLanes), (n |= l), (e.lanes = n), Yu(t, n);
      }
    }
    var vi = {
        readContext: Te,
        use: di,
        useCallback: le,
        useContext: le,
        useEffect: le,
        useImperativeHandle: le,
        useLayoutEffect: le,
        useInsertionEffect: le,
        useMemo: le,
        useReducer: le,
        useRef: le,
        useState: le,
        useDebugValue: le,
        useDeferredValue: le,
        useTransition: le,
        useSyncExternalStore: le,
        useId: le,
        useHostTransitionStatus: le,
        useFormState: le,
        useActionState: le,
        useOptimistic: le,
        useMemoCache: le,
        useCacheRefresh: le,
      },
      fh = {
        readContext: Te,
        use: di,
        useCallback: function (t, e) {
          return (Oe().memoizedState = [t, e === void 0 ? null : e]), t;
        },
        useContext: Te,
        useEffect: kd,
        useImperativeHandle: function (t, e, n) {
          (n = n != null ? n.concat([t]) : null),
            gi(4194308, 4, Wd.bind(null, e, t), n);
        },
        useLayoutEffect: function (t, e) {
          return gi(4194308, 4, t, e);
        },
        useInsertionEffect: function (t, e) {
          gi(4, 2, t, e);
        },
        useMemo: function (t, e) {
          var n = Oe();
          e = e === void 0 ? null : e;
          var l = t();
          if (Sl) {
            ue(!0);
            try {
              t();
            } finally {
              ue(!1);
            }
          }
          return (n.memoizedState = [l, e]), l;
        },
        useReducer: function (t, e, n) {
          var l = Oe();
          if (n !== void 0) {
            var u = n(e);
            if (Sl) {
              ue(!0);
              try {
                n(e);
              } finally {
                ue(!1);
              }
            }
          } else u = e;
          return (
            (l.memoizedState = l.baseState = u),
            (t = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: t,
              lastRenderedState: u,
            }),
            (l.queue = t),
            (t = t.dispatch = l0.bind(null, At, t)),
            [l.memoizedState, t]
          );
        },
        useRef: function (t) {
          var e = Oe();
          return (t = { current: t }), (e.memoizedState = t);
        },
        useState: function (t) {
          t = Hc(t);
          var e = t.queue,
            n = ch.bind(null, At, e);
          return (e.dispatch = n), [t.memoizedState, n];
        },
        useDebugValue: qc,
        useDeferredValue: function (t, e) {
          var n = Oe();
          return Bc(n, t, e);
        },
        useTransition: function () {
          var t = Hc(!1);
          return (
            (t = lh.bind(null, At, t.queue, !0, !1)),
            (Oe().memoizedState = t),
            [!1, t]
          );
        },
        useSyncExternalStore: function (t, e, n) {
          var l = At,
            u = Oe();
          if (Lt) {
            if (n === void 0) throw Error(c(407));
            n = n();
          } else {
            if (((n = e()), kt === null)) throw Error(c(349));
            (Nt & 124) !== 0 || Nd(l, e, n);
          }
          u.memoizedState = n;
          var i = { value: n, getSnapshot: e };
          return (
            (u.queue = i),
            kd(Ud.bind(null, l, i, t), [t]),
            (l.flags |= 2048),
            la(9, mi(), Cd.bind(null, l, i, n, e), null),
            n
          );
        },
        useId: function () {
          var t = Oe(),
            e = kt.identifierPrefix;
          if (Lt) {
            var n = vn,
              l = yn;
            (n = (l & ~(1 << (32 - Jt(l) - 1))).toString(32) + n),
              (e = "«" + e + "R" + n),
              (n = fi++),
              0 < n && (e += "H" + n.toString(32)),
              (e += "»");
          } else (n = Ip++), (e = "«" + e + "r" + n.toString(32) + "»");
          return (t.memoizedState = e);
        },
        useHostTransitionStatus: Yc,
        useFormState: Xd,
        useActionState: Xd,
        useOptimistic: function (t) {
          var e = Oe();
          e.memoizedState = e.baseState = t;
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (e.queue = n),
            (e = Vc.bind(null, At, !0, n)),
            (n.dispatch = e),
            [t, e]
          );
        },
        useMemoCache: Nc,
        useCacheRefresh: function () {
          return (Oe().memoizedState = n0.bind(null, At));
        },
      },
      dh = {
        readContext: Te,
        use: di,
        useCallback: th,
        useContext: Te,
        useEffect: $d,
        useImperativeHandle: Pd,
        useInsertionEffect: Fd,
        useLayoutEffect: Id,
        useMemo: eh,
        useReducer: hi,
        useRef: Jd,
        useState: function () {
          return hi(Sn);
        },
        useDebugValue: qc,
        useDeferredValue: function (t, e) {
          var n = ce();
          return nh(n, Vt.memoizedState, t, e);
        },
        useTransition: function () {
          var t = hi(Sn)[0],
            e = ce().memoizedState;
          return [typeof t == "boolean" ? t : Wa(t), e];
        },
        useSyncExternalStore: zd,
        useId: ih,
        useHostTransitionStatus: Yc,
        useFormState: Qd,
        useActionState: Qd,
        useOptimistic: function (t, e) {
          var n = ce();
          return qd(n, Vt, t, e);
        },
        useMemoCache: Nc,
        useCacheRefresh: rh,
      },
      a0 = {
        readContext: Te,
        use: di,
        useCallback: th,
        useContext: Te,
        useEffect: $d,
        useImperativeHandle: Pd,
        useInsertionEffect: Fd,
        useLayoutEffect: Id,
        useMemo: eh,
        useReducer: Uc,
        useRef: Jd,
        useState: function () {
          return Uc(Sn);
        },
        useDebugValue: qc,
        useDeferredValue: function (t, e) {
          var n = ce();
          return Vt === null ? Bc(n, t, e) : nh(n, Vt.memoizedState, t, e);
        },
        useTransition: function () {
          var t = Uc(Sn)[0],
            e = ce().memoizedState;
          return [typeof t == "boolean" ? t : Wa(t), e];
        },
        useSyncExternalStore: zd,
        useId: ih,
        useHostTransitionStatus: Yc,
        useFormState: Kd,
        useActionState: Kd,
        useOptimistic: function (t, e) {
          var n = ce();
          return Vt !== null
            ? qd(n, Vt, t, e)
            : ((n.baseState = t), [t, n.queue.dispatch]);
        },
        useMemoCache: Nc,
        useCacheRefresh: rh,
      },
      aa = null,
      eu = 0;
    function bi(t) {
      var e = eu;
      return (eu += 1), aa === null && (aa = []), Ad(aa, t, e);
    }
    function nu(t, e) {
      (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
    }
    function pi(t, e) {
      throw e.$$typeof === k
        ? Error(c(525))
        : ((t = Object.prototype.toString.call(e)),
          Error(
            c(
              31,
              t === "[object Object]"
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : t,
            ),
          ));
    }
    function hh(t) {
      var e = t._init;
      return e(t._payload);
    }
    function mh(t) {
      function e(M, T) {
        if (t) {
          var x = M.deletions;
          x === null ? ((M.deletions = [T]), (M.flags |= 16)) : x.push(T);
        }
      }
      function n(M, T) {
        if (!t) return null;
        for (; T !== null; ) e(M, T), (T = T.sibling);
        return null;
      }
      function l(M) {
        for (var T = new Map(); M !== null; )
          M.key !== null ? T.set(M.key, M) : T.set(M.index, M), (M = M.sibling);
        return T;
      }
      function u(M, T) {
        return (M = gn(M, T)), (M.index = 0), (M.sibling = null), M;
      }
      function i(M, T, x) {
        return (
          (M.index = x),
          t
            ? ((x = M.alternate),
              x !== null
                ? ((x = x.index), x < T ? ((M.flags |= 67108866), T) : x)
                : ((M.flags |= 67108866), T))
            : ((M.flags |= 1048576), T)
        );
      }
      function o(M) {
        return t && M.alternate === null && (M.flags |= 67108866), M;
      }
      function d(M, T, x, G) {
        return T === null || T.tag !== 6
          ? ((T = cc(x, M.mode, G)), (T.return = M), T)
          : ((T = u(T, x)), (T.return = M), T);
      }
      function v(M, T, x, G) {
        var at = x.type;
        return at === $
          ? B(M, T, x.props.children, G, x.key)
          : T !== null &&
              (T.elementType === at ||
                (typeof at == "object" &&
                  at !== null &&
                  at.$$typeof === Ot &&
                  hh(at) === T.type))
            ? ((T = u(T, x.props)), nu(T, x), (T.return = M), T)
            : ((T = ei(x.type, x.key, x.props, null, M.mode, G)),
              nu(T, x),
              (T.return = M),
              T);
      }
      function D(M, T, x, G) {
        return T === null ||
          T.tag !== 4 ||
          T.stateNode.containerInfo !== x.containerInfo ||
          T.stateNode.implementation !== x.implementation
          ? ((T = sc(x, M.mode, G)), (T.return = M), T)
          : ((T = u(T, x.children || [])), (T.return = M), T);
      }
      function B(M, T, x, G, at) {
        return T === null || T.tag !== 7
          ? ((T = dl(x, M.mode, G, at)), (T.return = M), T)
          : ((T = u(T, x)), (T.return = M), T);
      }
      function Y(M, T, x) {
        if (
          (typeof T == "string" && T !== "") ||
          typeof T == "number" ||
          typeof T == "bigint"
        )
          return (T = cc("" + T, M.mode, x)), (T.return = M), T;
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case L:
              return (
                (x = ei(T.type, T.key, T.props, null, M.mode, x)),
                nu(x, T),
                (x.return = M),
                x
              );
            case Q:
              return (T = sc(T, M.mode, x)), (T.return = M), T;
            case Ot:
              var G = T._init;
              return (T = G(T._payload)), Y(M, T, x);
          }
          if (yt(T) || Ct(T))
            return (T = dl(T, M.mode, x, null)), (T.return = M), T;
          if (typeof T.then == "function") return Y(M, bi(T), x);
          if (T.$$typeof === F) return Y(M, ui(M, T), x);
          pi(M, T);
        }
        return null;
      }
      function R(M, T, x, G) {
        var at = T !== null ? T.key : null;
        if (
          (typeof x == "string" && x !== "") ||
          typeof x == "number" ||
          typeof x == "bigint"
        )
          return at !== null ? null : d(M, T, "" + x, G);
        if (typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case L:
              return x.key === at ? v(M, T, x, G) : null;
            case Q:
              return x.key === at ? D(M, T, x, G) : null;
            case Ot:
              return (at = x._init), (x = at(x._payload)), R(M, T, x, G);
          }
          if (yt(x) || Ct(x)) return at !== null ? null : B(M, T, x, G, null);
          if (typeof x.then == "function") return R(M, T, bi(x), G);
          if (x.$$typeof === F) return R(M, T, ui(M, x), G);
          pi(M, x);
        }
        return null;
      }
      function N(M, T, x, G, at) {
        if (
          (typeof G == "string" && G !== "") ||
          typeof G == "number" ||
          typeof G == "bigint"
        )
          return (M = M.get(x) || null), d(T, M, "" + G, at);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case L:
              return (
                (M = M.get(G.key === null ? x : G.key) || null), v(T, M, G, at)
              );
            case Q:
              return (
                (M = M.get(G.key === null ? x : G.key) || null), D(T, M, G, at)
              );
            case Ot:
              var wt = G._init;
              return (G = wt(G._payload)), N(M, T, x, G, at);
          }
          if (yt(G) || Ct(G))
            return (M = M.get(x) || null), B(T, M, G, at, null);
          if (typeof G.then == "function") return N(M, T, x, bi(G), at);
          if (G.$$typeof === F) return N(M, T, x, ui(T, G), at);
          pi(T, G);
        }
        return null;
      }
      function vt(M, T, x, G) {
        for (
          var at = null, wt = null, ct = T, mt = (T = 0), ge = null;
          ct !== null && mt < x.length;
          mt++
        ) {
          ct.index > mt ? ((ge = ct), (ct = null)) : (ge = ct.sibling);
          var Ht = R(M, ct, x[mt], G);
          if (Ht === null) {
            ct === null && (ct = ge);
            break;
          }
          t && ct && Ht.alternate === null && e(M, ct),
            (T = i(Ht, T, mt)),
            wt === null ? (at = Ht) : (wt.sibling = Ht),
            (wt = Ht),
            (ct = ge);
        }
        if (mt === x.length) return n(M, ct), Lt && ml(M, mt), at;
        if (ct === null) {
          for (; mt < x.length; mt++)
            (ct = Y(M, x[mt], G)),
              ct !== null &&
                ((T = i(ct, T, mt)),
                wt === null ? (at = ct) : (wt.sibling = ct),
                (wt = ct));
          return Lt && ml(M, mt), at;
        }
        for (ct = l(ct); mt < x.length; mt++)
          (ge = N(ct, M, mt, x[mt], G)),
            ge !== null &&
              (t &&
                ge.alternate !== null &&
                ct.delete(ge.key === null ? mt : ge.key),
              (T = i(ge, T, mt)),
              wt === null ? (at = ge) : (wt.sibling = ge),
              (wt = ge));
        return (
          t &&
            ct.forEach(function (ll) {
              return e(M, ll);
            }),
          Lt && ml(M, mt),
          at
        );
      }
      function dt(M, T, x, G) {
        if (x == null) throw Error(c(151));
        for (
          var at = null,
            wt = null,
            ct = T,
            mt = (T = 0),
            ge = null,
            Ht = x.next();
          ct !== null && !Ht.done;
          mt++, Ht = x.next()
        ) {
          ct.index > mt ? ((ge = ct), (ct = null)) : (ge = ct.sibling);
          var ll = R(M, ct, Ht.value, G);
          if (ll === null) {
            ct === null && (ct = ge);
            break;
          }
          t && ct && ll.alternate === null && e(M, ct),
            (T = i(ll, T, mt)),
            wt === null ? (at = ll) : (wt.sibling = ll),
            (wt = ll),
            (ct = ge);
        }
        if (Ht.done) return n(M, ct), Lt && ml(M, mt), at;
        if (ct === null) {
          for (; !Ht.done; mt++, Ht = x.next())
            (Ht = Y(M, Ht.value, G)),
              Ht !== null &&
                ((T = i(Ht, T, mt)),
                wt === null ? (at = Ht) : (wt.sibling = Ht),
                (wt = Ht));
          return Lt && ml(M, mt), at;
        }
        for (ct = l(ct); !Ht.done; mt++, Ht = x.next())
          (Ht = N(ct, M, mt, Ht.value, G)),
            Ht !== null &&
              (t &&
                Ht.alternate !== null &&
                ct.delete(Ht.key === null ? mt : Ht.key),
              (T = i(Ht, T, mt)),
              wt === null ? (at = Ht) : (wt.sibling = Ht),
              (wt = Ht));
        return (
          t &&
            ct.forEach(function (u1) {
              return e(M, u1);
            }),
          Lt && ml(M, mt),
          at
        );
      }
      function Xt(M, T, x, G) {
        if (
          (typeof x == "object" &&
            x !== null &&
            x.type === $ &&
            x.key === null &&
            (x = x.props.children),
          typeof x == "object" && x !== null)
        ) {
          switch (x.$$typeof) {
            case L:
              t: {
                for (var at = x.key; T !== null; ) {
                  if (T.key === at) {
                    if (((at = x.type), at === $)) {
                      if (T.tag === 7) {
                        n(M, T.sibling),
                          (G = u(T, x.props.children)),
                          (G.return = M),
                          (M = G);
                        break t;
                      }
                    } else if (
                      T.elementType === at ||
                      (typeof at == "object" &&
                        at !== null &&
                        at.$$typeof === Ot &&
                        hh(at) === T.type)
                    ) {
                      n(M, T.sibling),
                        (G = u(T, x.props)),
                        nu(G, x),
                        (G.return = M),
                        (M = G);
                      break t;
                    }
                    n(M, T);
                    break;
                  } else e(M, T);
                  T = T.sibling;
                }
                x.type === $
                  ? ((G = dl(x.props.children, M.mode, G, x.key)),
                    (G.return = M),
                    (M = G))
                  : ((G = ei(x.type, x.key, x.props, null, M.mode, G)),
                    nu(G, x),
                    (G.return = M),
                    (M = G));
              }
              return o(M);
            case Q:
              t: {
                for (at = x.key; T !== null; ) {
                  if (T.key === at)
                    if (
                      T.tag === 4 &&
                      T.stateNode.containerInfo === x.containerInfo &&
                      T.stateNode.implementation === x.implementation
                    ) {
                      n(M, T.sibling),
                        (G = u(T, x.children || [])),
                        (G.return = M),
                        (M = G);
                      break t;
                    } else {
                      n(M, T);
                      break;
                    }
                  else e(M, T);
                  T = T.sibling;
                }
                (G = sc(x, M.mode, G)), (G.return = M), (M = G);
              }
              return o(M);
            case Ot:
              return (at = x._init), (x = at(x._payload)), Xt(M, T, x, G);
          }
          if (yt(x)) return vt(M, T, x, G);
          if (Ct(x)) {
            if (((at = Ct(x)), typeof at != "function")) throw Error(c(150));
            return (x = at.call(x)), dt(M, T, x, G);
          }
          if (typeof x.then == "function") return Xt(M, T, bi(x), G);
          if (x.$$typeof === F) return Xt(M, T, ui(M, x), G);
          pi(M, x);
        }
        return (typeof x == "string" && x !== "") ||
          typeof x == "number" ||
          typeof x == "bigint"
          ? ((x = "" + x),
            T !== null && T.tag === 6
              ? (n(M, T.sibling), (G = u(T, x)), (G.return = M), (M = G))
              : (n(M, T), (G = cc(x, M.mode, G)), (G.return = M), (M = G)),
            o(M))
          : n(M, T);
      }
      return function (M, T, x, G) {
        try {
          eu = 0;
          var at = Xt(M, T, x, G);
          return (aa = null), at;
        } catch (ct) {
          if (ct === Ka || ct === ri) throw ct;
          var wt = Ue(29, ct, null, M.mode);
          return (wt.lanes = G), (wt.return = M), wt;
        } finally {
        }
      };
    }
    var ua = mh(!0),
      gh = mh(!1),
      Je = V(null),
      un = null;
    function jn(t) {
      var e = t.alternate;
      I(oe, oe.current & 1),
        I(Je, t),
        un === null &&
          (e === null || ta.current !== null || e.memoizedState !== null) &&
          (un = t);
    }
    function yh(t) {
      if (t.tag === 22) {
        if ((I(oe, oe.current), I(Je, t), un === null)) {
          var e = t.alternate;
          e !== null && e.memoizedState !== null && (un = t);
        }
      } else Xn();
    }
    function Xn() {
      I(oe, oe.current), I(Je, Je.current);
    }
    function En(t) {
      Z(Je), un === t && (un = null), Z(oe);
    }
    var oe = V(0);
    function Si(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var n = e.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated), n === null || n.data === "$?" || zs(n))
          )
            return e;
        } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
      return null;
    }
    function jc(t, e, n, l) {
      (e = t.memoizedState),
        (n = n(l, e)),
        (n = n == null ? e : O({}, e, n)),
        (t.memoizedState = n),
        t.lanes === 0 && (t.updateQueue.baseState = n);
    }
    var Xc = {
      enqueueSetState: function (t, e, n) {
        t = t._reactInternals;
        var l = Be(),
          u = Gn(l);
        (u.payload = e),
          n != null && (u.callback = n),
          (e = Yn(t, u, l)),
          e !== null && (Ge(e, t, l), ka(e, t, l));
      },
      enqueueReplaceState: function (t, e, n) {
        t = t._reactInternals;
        var l = Be(),
          u = Gn(l);
        (u.tag = 1),
          (u.payload = e),
          n != null && (u.callback = n),
          (e = Yn(t, u, l)),
          e !== null && (Ge(e, t, l), ka(e, t, l));
      },
      enqueueForceUpdate: function (t, e) {
        t = t._reactInternals;
        var n = Be(),
          l = Gn(n);
        (l.tag = 2),
          e != null && (l.callback = e),
          (e = Yn(t, l, n)),
          e !== null && (Ge(e, t, n), ka(e, t, n));
      },
    };
    function vh(t, e, n, l, u, i, o) {
      return (
        (t = t.stateNode),
        typeof t.shouldComponentUpdate == "function"
          ? t.shouldComponentUpdate(l, i, o)
          : e.prototype && e.prototype.isPureReactComponent
            ? !Ba(n, l) || !Ba(u, i)
            : !0
      );
    }
    function bh(t, e, n, l) {
      (t = e.state),
        typeof e.componentWillReceiveProps == "function" &&
          e.componentWillReceiveProps(n, l),
        typeof e.UNSAFE_componentWillReceiveProps == "function" &&
          e.UNSAFE_componentWillReceiveProps(n, l),
        e.state !== t && Xc.enqueueReplaceState(e, e.state, null);
    }
    function El(t, e) {
      var n = e;
      if ("ref" in e) {
        n = {};
        for (var l in e) l !== "ref" && (n[l] = e[l]);
      }
      if ((t = t.defaultProps)) {
        n === e && (n = O({}, n));
        for (var u in t) n[u] === void 0 && (n[u] = t[u]);
      }
      return n;
    }
    var Ei =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          };
    function ph(t) {
      Ei(t);
    }
    function Sh(t) {
      console.error(t);
    }
    function Eh(t) {
      Ei(t);
    }
    function Ti(t, e) {
      try {
        var n = t.onUncaughtError;
        n(e.value, { componentStack: e.stack });
      } catch (l) {
        setTimeout(function () {
          throw l;
        });
      }
    }
    function Th(t, e, n) {
      try {
        var l = t.onCaughtError;
        l(n.value, {
          componentStack: n.stack,
          errorBoundary: e.tag === 1 ? e.stateNode : null,
        });
      } catch (u) {
        setTimeout(function () {
          throw u;
        });
      }
    }
    function Qc(t, e, n) {
      return (
        (n = Gn(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Ti(t, e);
        }),
        n
      );
    }
    function Ah(t) {
      return (t = Gn(t)), (t.tag = 3), t;
    }
    function wh(t, e, n, l) {
      var u = n.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var i = l.value;
        (t.payload = function () {
          return u(i);
        }),
          (t.callback = function () {
            Th(e, n, l);
          });
      }
      var o = n.stateNode;
      o !== null &&
        typeof o.componentDidCatch == "function" &&
        (t.callback = function () {
          Th(e, n, l),
            typeof u != "function" &&
              ($n === null ? ($n = new Set([this])) : $n.add(this));
          var d = l.stack;
          this.componentDidCatch(l.value, {
            componentStack: d !== null ? d : "",
          });
        });
    }
    function u0(t, e, n, l, u) {
      if (
        ((n.flags |= 32768),
        l !== null && typeof l == "object" && typeof l.then == "function")
      ) {
        if (
          ((e = n.alternate),
          e !== null && Xa(e, n, u, !0),
          (n = Je.current),
          n !== null)
        ) {
          switch (n.tag) {
            case 13:
              return (
                un === null
                  ? ms()
                  : n.alternate === null && ne === 0 && (ne = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = u),
                l === pc
                  ? (n.flags |= 16384)
                  : ((e = n.updateQueue),
                    e === null ? (n.updateQueue = new Set([l])) : e.add(l),
                    ys(t, l, u)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                l === pc
                  ? (n.flags |= 16384)
                  : ((e = n.updateQueue),
                    e === null
                      ? ((e = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([l]),
                        }),
                        (n.updateQueue = e))
                      : ((n = e.retryQueue),
                        n === null ? (e.retryQueue = new Set([l])) : n.add(l)),
                    ys(t, l, u)),
                !1
              );
          }
          throw Error(c(435, n.tag));
        }
        return ys(t, l, u), ms(), !1;
      }
      if (Lt)
        return (
          (e = Je.current),
          e !== null
            ? ((e.flags & 65536) === 0 && (e.flags |= 256),
              (e.flags |= 65536),
              (e.lanes = u),
              l !== dc && ((t = Error(c(422), { cause: l })), ja(Xe(t, n))))
            : (l !== dc && ((e = Error(c(423), { cause: l })), ja(Xe(e, n))),
              (t = t.current.alternate),
              (t.flags |= 65536),
              (u &= -u),
              (t.lanes |= u),
              (l = Xe(l, n)),
              (u = Qc(t.stateNode, l, u)),
              Tc(t, u),
              ne !== 4 && (ne = 2)),
          !1
        );
      var i = Error(c(520), { cause: l });
      if (
        ((i = Xe(i, n)),
        su === null ? (su = [i]) : su.push(i),
        ne !== 4 && (ne = 2),
        e === null)
      )
        return !0;
      (l = Xe(l, n)), (n = e);
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (t = u & -u),
              (n.lanes |= t),
              (t = Qc(n.stateNode, l, t)),
              Tc(n, t),
              !1
            );
          case 1:
            if (
              ((e = n.type),
              (i = n.stateNode),
              (n.flags & 128) === 0 &&
                (typeof e.getDerivedStateFromError == "function" ||
                  (i !== null &&
                    typeof i.componentDidCatch == "function" &&
                    ($n === null || !$n.has(i)))))
            )
              return (
                (n.flags |= 65536),
                (u &= -u),
                (n.lanes |= u),
                (u = Ah(u)),
                wh(u, t, n, l),
                Tc(n, u),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var Mh = Error(c(461)),
      he = !1;
    function ye(t, e, n, l) {
      e.child = t === null ? gh(e, null, n, l) : ua(e, t.child, n, l);
    }
    function xh(t, e, n, l, u) {
      n = n.render;
      var i = e.ref;
      if ("ref" in l) {
        var o = {};
        for (var d in l) d !== "ref" && (o[d] = l[d]);
      } else o = l;
      return (
        bl(e),
        (l = _c(t, e, n, o, i, u)),
        (d = Dc()),
        t !== null && !he
          ? (Oc(t, e, u), Tn(t, e, u))
          : (Lt && d && oc(e), (e.flags |= 1), ye(t, e, l, u), e.child)
      );
    }
    function _h(t, e, n, l, u) {
      if (t === null) {
        var i = n.type;
        return typeof i == "function" &&
          !rc(i) &&
          i.defaultProps === void 0 &&
          n.compare === null
          ? ((e.tag = 15), (e.type = i), Dh(t, e, i, l, u))
          : ((t = ei(n.type, null, l, e, e.mode, u)),
            (t.ref = e.ref),
            (t.return = e),
            (e.child = t));
      }
      if (((i = t.child), !Wc(t, u))) {
        var o = i.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Ba),
          n(o, l) && t.ref === e.ref)
        )
          return Tn(t, e, u);
      }
      return (
        (e.flags |= 1),
        (t = gn(i, l)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t)
      );
    }
    function Dh(t, e, n, l, u) {
      if (t !== null) {
        var i = t.memoizedProps;
        if (Ba(i, l) && t.ref === e.ref)
          if (((he = !1), (e.pendingProps = l = i), Wc(t, u)))
            (t.flags & 131072) !== 0 && (he = !0);
          else return (e.lanes = t.lanes), Tn(t, e, u);
      }
      return Zc(t, e, n, l, u);
    }
    function Oh(t, e, n) {
      var l = e.pendingProps,
        u = l.children,
        i = t !== null ? t.memoizedState : null;
      if (l.mode === "hidden") {
        if ((e.flags & 128) !== 0) {
          if (((l = i !== null ? i.baseLanes | n : n), t !== null)) {
            for (u = e.child = t.child, i = 0; u !== null; )
              (i = i | u.lanes | u.childLanes), (u = u.sibling);
            e.childLanes = i & ~l;
          } else (e.childLanes = 0), (e.child = null);
          return Rh(t, e, l, n);
        }
        if ((n & 536870912) !== 0)
          (e.memoizedState = { baseLanes: 0, cachePool: null }),
            t !== null && ii(e, i !== null ? i.cachePool : null),
            i !== null ? Dd(e, i) : wc(),
            yh(e);
        else
          return (
            (e.lanes = e.childLanes = 536870912),
            Rh(t, e, i !== null ? i.baseLanes | n : n, n)
          );
      } else
        i !== null
          ? (ii(e, i.cachePool), Dd(e, i), Xn(), (e.memoizedState = null))
          : (t !== null && ii(e, null), wc(), Xn());
      return ye(t, e, u, n), e.child;
    }
    function Rh(t, e, n, l) {
      var u = bc();
      return (
        (u = u === null ? null : { parent: se._currentValue, pool: u }),
        (e.memoizedState = { baseLanes: n, cachePool: u }),
        t !== null && ii(e, null),
        wc(),
        yh(e),
        t !== null && Xa(t, e, l, !0),
        null
      );
    }
    function Ai(t, e) {
      var n = e.ref;
      if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof n != "function" && typeof n != "object") throw Error(c(284));
        (t === null || t.ref !== n) && (e.flags |= 4194816);
      }
    }
    function Zc(t, e, n, l, u) {
      return (
        bl(e),
        (n = _c(t, e, n, l, void 0, u)),
        (l = Dc()),
        t !== null && !he
          ? (Oc(t, e, u), Tn(t, e, u))
          : (Lt && l && oc(e), (e.flags |= 1), ye(t, e, n, u), e.child)
      );
    }
    function zh(t, e, n, l, u, i) {
      return (
        bl(e),
        (e.updateQueue = null),
        (n = Rd(e, l, n, u)),
        Od(t),
        (l = Dc()),
        t !== null && !he
          ? (Oc(t, e, i), Tn(t, e, i))
          : (Lt && l && oc(e), (e.flags |= 1), ye(t, e, n, i), e.child)
      );
    }
    function Nh(t, e, n, l, u) {
      if ((bl(e), e.stateNode === null)) {
        var i = $l,
          o = n.contextType;
        typeof o == "object" && o !== null && (i = Te(o)),
          (i = new n(l, i)),
          (e.memoizedState =
            i.state !== null && i.state !== void 0 ? i.state : null),
          (i.updater = Xc),
          (e.stateNode = i),
          (i._reactInternals = e),
          (i = e.stateNode),
          (i.props = l),
          (i.state = e.memoizedState),
          (i.refs = {}),
          Sc(e),
          (o = n.contextType),
          (i.context = typeof o == "object" && o !== null ? Te(o) : $l),
          (i.state = e.memoizedState),
          (o = n.getDerivedStateFromProps),
          typeof o == "function" &&
            (jc(e, n, o, l), (i.state = e.memoizedState)),
          typeof n.getDerivedStateFromProps == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function" ||
            (typeof i.UNSAFE_componentWillMount != "function" &&
              typeof i.componentWillMount != "function") ||
            ((o = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
              i.UNSAFE_componentWillMount(),
            o !== i.state && Xc.enqueueReplaceState(i, i.state, null),
            Fa(e, l, i, u),
            $a(),
            (i.state = e.memoizedState)),
          typeof i.componentDidMount == "function" && (e.flags |= 4194308),
          (l = !0);
      } else if (t === null) {
        i = e.stateNode;
        var d = e.memoizedProps,
          v = El(n, d);
        i.props = v;
        var D = i.context,
          B = n.contextType;
        (o = $l), typeof B == "object" && B !== null && (o = Te(B));
        var Y = n.getDerivedStateFromProps;
        (B =
          typeof Y == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function"),
          (d = e.pendingProps !== d),
          B ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
              typeof i.componentWillReceiveProps != "function") ||
            ((d || D !== o) && bh(e, i, l, o)),
          (Bn = !1);
        var R = e.memoizedState;
        (i.state = R),
          Fa(e, l, i, u),
          $a(),
          (D = e.memoizedState),
          d || R !== D || Bn
            ? (typeof Y == "function" &&
                (jc(e, n, Y, l), (D = e.memoizedState)),
              (v = Bn || vh(e, n, v, l, R, D, o))
                ? (B ||
                    (typeof i.UNSAFE_componentWillMount != "function" &&
                      typeof i.componentWillMount != "function") ||
                    (typeof i.componentWillMount == "function" &&
                      i.componentWillMount(),
                    typeof i.UNSAFE_componentWillMount == "function" &&
                      i.UNSAFE_componentWillMount()),
                  typeof i.componentDidMount == "function" &&
                    (e.flags |= 4194308))
                : (typeof i.componentDidMount == "function" &&
                    (e.flags |= 4194308),
                  (e.memoizedProps = l),
                  (e.memoizedState = D)),
              (i.props = l),
              (i.state = D),
              (i.context = o),
              (l = v))
            : (typeof i.componentDidMount == "function" && (e.flags |= 4194308),
              (l = !1));
      } else {
        (i = e.stateNode),
          Ec(t, e),
          (o = e.memoizedProps),
          (B = El(n, o)),
          (i.props = B),
          (Y = e.pendingProps),
          (R = i.context),
          (D = n.contextType),
          (v = $l),
          typeof D == "object" && D !== null && (v = Te(D)),
          (d = n.getDerivedStateFromProps),
          (D =
            typeof d == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function") ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
              typeof i.componentWillReceiveProps != "function") ||
            ((o !== Y || R !== v) && bh(e, i, l, v)),
          (Bn = !1),
          (R = e.memoizedState),
          (i.state = R),
          Fa(e, l, i, u),
          $a();
        var N = e.memoizedState;
        o !== Y ||
        R !== N ||
        Bn ||
        (t !== null && t.dependencies !== null && ai(t.dependencies))
          ? (typeof d == "function" && (jc(e, n, d, l), (N = e.memoizedState)),
            (B =
              Bn ||
              vh(e, n, B, l, R, N, v) ||
              (t !== null && t.dependencies !== null && ai(t.dependencies)))
              ? (D ||
                  (typeof i.UNSAFE_componentWillUpdate != "function" &&
                    typeof i.componentWillUpdate != "function") ||
                  (typeof i.componentWillUpdate == "function" &&
                    i.componentWillUpdate(l, N, v),
                  typeof i.UNSAFE_componentWillUpdate == "function" &&
                    i.UNSAFE_componentWillUpdate(l, N, v)),
                typeof i.componentDidUpdate == "function" && (e.flags |= 4),
                typeof i.getSnapshotBeforeUpdate == "function" &&
                  (e.flags |= 1024))
              : (typeof i.componentDidUpdate != "function" ||
                  (o === t.memoizedProps && R === t.memoizedState) ||
                  (e.flags |= 4),
                typeof i.getSnapshotBeforeUpdate != "function" ||
                  (o === t.memoizedProps && R === t.memoizedState) ||
                  (e.flags |= 1024),
                (e.memoizedProps = l),
                (e.memoizedState = N)),
            (i.props = l),
            (i.state = N),
            (i.context = v),
            (l = B))
          : (typeof i.componentDidUpdate != "function" ||
              (o === t.memoizedProps && R === t.memoizedState) ||
              (e.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (o === t.memoizedProps && R === t.memoizedState) ||
              (e.flags |= 1024),
            (l = !1));
      }
      return (
        (i = l),
        Ai(t, e),
        (l = (e.flags & 128) !== 0),
        i || l
          ? ((i = e.stateNode),
            (n =
              l && typeof n.getDerivedStateFromError != "function"
                ? null
                : i.render()),
            (e.flags |= 1),
            t !== null && l
              ? ((e.child = ua(e, t.child, null, u)),
                (e.child = ua(e, null, n, u)))
              : ye(t, e, n, u),
            (e.memoizedState = i.state),
            (t = e.child))
          : (t = Tn(t, e, u)),
        t
      );
    }
    function Ch(t, e, n, l) {
      return Va(), (e.flags |= 256), ye(t, e, n, l), e.child;
    }
    var Kc = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Jc(t) {
      return { baseLanes: t, cachePool: Sd() };
    }
    function kc(t, e, n) {
      return (t = t !== null ? t.childLanes & ~n : 0), e && (t |= ke), t;
    }
    function Uh(t, e, n) {
      var l = e.pendingProps,
        u = !1,
        i = (e.flags & 128) !== 0,
        o;
      if (
        ((o = i) ||
          (o =
            t !== null && t.memoizedState === null
              ? !1
              : (oe.current & 2) !== 0),
        o && ((u = !0), (e.flags &= -129)),
        (o = (e.flags & 32) !== 0),
        (e.flags &= -33),
        t === null)
      ) {
        if (Lt) {
          if ((u ? jn(e) : Xn(), Lt)) {
            var d = ee,
              v;
            if ((v = d)) {
              t: {
                for (v = d, d = an; v.nodeType !== 8; ) {
                  if (!d) {
                    d = null;
                    break t;
                  }
                  if (((v = en(v.nextSibling)), v === null)) {
                    d = null;
                    break t;
                  }
                }
                d = v;
              }
              d !== null
                ? ((e.memoizedState = {
                    dehydrated: d,
                    treeContext: hl !== null ? { id: yn, overflow: vn } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (v = Ue(18, null, null, 0)),
                  (v.stateNode = d),
                  (v.return = e),
                  (e.child = v),
                  (xe = e),
                  (ee = null),
                  (v = !0))
                : (v = !1);
            }
            v || yl(e);
          }
          if (
            ((d = e.memoizedState),
            d !== null && ((d = d.dehydrated), d !== null))
          )
            return zs(d) ? (e.lanes = 32) : (e.lanes = 536870912), null;
          En(e);
        }
        return (
          (d = l.children),
          (l = l.fallback),
          u
            ? (Xn(),
              (u = e.mode),
              (d = wi({ mode: "hidden", children: d }, u)),
              (l = dl(l, u, n, null)),
              (d.return = e),
              (l.return = e),
              (d.sibling = l),
              (e.child = d),
              (u = e.child),
              (u.memoizedState = Jc(n)),
              (u.childLanes = kc(t, o, n)),
              (e.memoizedState = Kc),
              l)
            : (jn(e), $c(e, d))
        );
      }
      if (
        ((v = t.memoizedState), v !== null && ((d = v.dehydrated), d !== null))
      ) {
        if (i)
          e.flags & 256
            ? (jn(e), (e.flags &= -257), (e = Fc(t, e, n)))
            : e.memoizedState !== null
              ? (Xn(), (e.child = t.child), (e.flags |= 128), (e = null))
              : (Xn(),
                (u = l.fallback),
                (d = e.mode),
                (l = wi({ mode: "visible", children: l.children }, d)),
                (u = dl(u, d, n, null)),
                (u.flags |= 2),
                (l.return = e),
                (u.return = e),
                (l.sibling = u),
                (e.child = l),
                ua(e, t.child, null, n),
                (l = e.child),
                (l.memoizedState = Jc(n)),
                (l.childLanes = kc(t, o, n)),
                (e.memoizedState = Kc),
                (e = u));
        else if ((jn(e), zs(d))) {
          if (((o = d.nextSibling && d.nextSibling.dataset), o)) var D = o.dgst;
          (o = D),
            (l = Error(c(419))),
            (l.stack = ""),
            (l.digest = o),
            ja({ value: l, source: null, stack: null }),
            (e = Fc(t, e, n));
        } else if (
          (he || Xa(t, e, n, !1), (o = (n & t.childLanes) !== 0), he || o)
        ) {
          if (
            ((o = kt),
            o !== null &&
              ((l = n & -n),
              (l = (l & 42) !== 0 ? 1 : Ra(l)),
              (l = (l & (o.suspendedLanes | n)) !== 0 ? 0 : l),
              l !== 0 && l !== v.retryLane))
          )
            throw ((v.retryLane = l), kl(t, l), Ge(o, t, l), Mh);
          d.data === "$?" || ms(), (e = Fc(t, e, n));
        } else
          d.data === "$?"
            ? ((e.flags |= 192), (e.child = t.child), (e = null))
            : ((t = v.treeContext),
              (ee = en(d.nextSibling)),
              (xe = e),
              (Lt = !0),
              (gl = null),
              (an = !1),
              t !== null &&
                ((Ze[Ke++] = yn),
                (Ze[Ke++] = vn),
                (Ze[Ke++] = hl),
                (yn = t.id),
                (vn = t.overflow),
                (hl = e)),
              (e = $c(e, l.children)),
              (e.flags |= 4096));
        return e;
      }
      return u
        ? (Xn(),
          (u = l.fallback),
          (d = e.mode),
          (v = t.child),
          (D = v.sibling),
          (l = gn(v, { mode: "hidden", children: l.children })),
          (l.subtreeFlags = v.subtreeFlags & 65011712),
          D !== null
            ? (u = gn(D, u))
            : ((u = dl(u, d, n, null)), (u.flags |= 2)),
          (u.return = e),
          (l.return = e),
          (l.sibling = u),
          (e.child = l),
          (l = u),
          (u = e.child),
          (d = t.child.memoizedState),
          d === null
            ? (d = Jc(n))
            : ((v = d.cachePool),
              v !== null
                ? ((D = se._currentValue),
                  (v = v.parent !== D ? { parent: D, pool: D } : v))
                : (v = Sd()),
              (d = { baseLanes: d.baseLanes | n, cachePool: v })),
          (u.memoizedState = d),
          (u.childLanes = kc(t, o, n)),
          (e.memoizedState = Kc),
          l)
        : (jn(e),
          (n = t.child),
          (t = n.sibling),
          (n = gn(n, { mode: "visible", children: l.children })),
          (n.return = e),
          (n.sibling = null),
          t !== null &&
            ((o = e.deletions),
            o === null ? ((e.deletions = [t]), (e.flags |= 16)) : o.push(t)),
          (e.child = n),
          (e.memoizedState = null),
          n);
    }
    function $c(t, e) {
      return (
        (e = wi({ mode: "visible", children: e }, t.mode)),
        (e.return = t),
        (t.child = e)
      );
    }
    function wi(t, e) {
      return (
        (t = Ue(22, t, null, e)),
        (t.lanes = 0),
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
        t
      );
    }
    function Fc(t, e, n) {
      return (
        ua(e, t.child, null, n),
        (t = $c(e, e.pendingProps.children)),
        (t.flags |= 2),
        (e.memoizedState = null),
        t
      );
    }
    function Hh(t, e, n) {
      t.lanes |= e;
      var l = t.alternate;
      l !== null && (l.lanes |= e), mc(t.return, e, n);
    }
    function Ic(t, e, n, l, u) {
      var i = t.memoizedState;
      i === null
        ? (t.memoizedState = {
            isBackwards: e,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: n,
            tailMode: u,
          })
        : ((i.isBackwards = e),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = l),
          (i.tail = n),
          (i.tailMode = u));
    }
    function Lh(t, e, n) {
      var l = e.pendingProps,
        u = l.revealOrder,
        i = l.tail;
      if ((ye(t, e, l.children, n), (l = oe.current), (l & 2) !== 0))
        (l = (l & 1) | 2), (e.flags |= 128);
      else {
        if (t !== null && (t.flags & 128) !== 0)
          t: for (t = e.child; t !== null; ) {
            if (t.tag === 13) t.memoizedState !== null && Hh(t, n, e);
            else if (t.tag === 19) Hh(t, n, e);
            else if (t.child !== null) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break t;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break t;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
        l &= 1;
      }
      switch ((I(oe, l), u)) {
        case "forwards":
          for (n = e.child, u = null; n !== null; )
            (t = n.alternate),
              t !== null && Si(t) === null && (u = n),
              (n = n.sibling);
          (n = u),
            n === null
              ? ((u = e.child), (e.child = null))
              : ((u = n.sibling), (n.sibling = null)),
            Ic(e, !1, u, n, i);
          break;
        case "backwards":
          for (n = null, u = e.child, e.child = null; u !== null; ) {
            if (((t = u.alternate), t !== null && Si(t) === null)) {
              e.child = u;
              break;
            }
            (t = u.sibling), (u.sibling = n), (n = u), (u = t);
          }
          Ic(e, !0, n, null, i);
          break;
        case "together":
          Ic(e, !1, null, null, void 0);
          break;
        default:
          e.memoizedState = null;
      }
      return e.child;
    }
    function Tn(t, e, n) {
      if (
        (t !== null && (e.dependencies = t.dependencies),
        (kn |= e.lanes),
        (n & e.childLanes) === 0)
      )
        if (t !== null) {
          if ((Xa(t, e, n, !1), (n & e.childLanes) === 0)) return null;
        } else return null;
      if (t !== null && e.child !== t.child) throw Error(c(153));
      if (e.child !== null) {
        for (
          t = e.child, n = gn(t, t.pendingProps), e.child = n, n.return = e;
          t.sibling !== null;

        )
          (t = t.sibling),
            (n = n.sibling = gn(t, t.pendingProps)),
            (n.return = e);
        n.sibling = null;
      }
      return e.child;
    }
    function Wc(t, e) {
      return (t.lanes & e) !== 0
        ? !0
        : ((t = t.dependencies), !!(t !== null && ai(t)));
    }
    function i0(t, e, n) {
      switch (e.tag) {
        case 3:
          Kt(e, e.stateNode.containerInfo),
            qn(e, se, t.memoizedState.cache),
            Va();
          break;
        case 27:
        case 5:
          Aa(e);
          break;
        case 4:
          Kt(e, e.stateNode.containerInfo);
          break;
        case 10:
          qn(e, e.type, e.memoizedProps.value);
          break;
        case 13:
          var l = e.memoizedState;
          if (l !== null)
            return l.dehydrated !== null
              ? (jn(e), (e.flags |= 128), null)
              : (n & e.child.childLanes) !== 0
                ? Uh(t, e, n)
                : (jn(e), (t = Tn(t, e, n)), t !== null ? t.sibling : null);
          jn(e);
          break;
        case 19:
          var u = (t.flags & 128) !== 0;
          if (
            ((l = (n & e.childLanes) !== 0),
            l || (Xa(t, e, n, !1), (l = (n & e.childLanes) !== 0)),
            u)
          ) {
            if (l) return Lh(t, e, n);
            e.flags |= 128;
          }
          if (
            ((u = e.memoizedState),
            u !== null &&
              ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
            I(oe, oe.current),
            l)
          )
            break;
          return null;
        case 22:
        case 23:
          return (e.lanes = 0), Oh(t, e, n);
        case 24:
          qn(e, se, t.memoizedState.cache);
      }
      return Tn(t, e, n);
    }
    function qh(t, e, n) {
      if (t !== null)
        if (t.memoizedProps !== e.pendingProps) he = !0;
        else {
          if (!Wc(t, n) && (e.flags & 128) === 0) return (he = !1), i0(t, e, n);
          he = (t.flags & 131072) !== 0;
        }
      else (he = !1), Lt && (e.flags & 1048576) !== 0 && hd(e, li, e.index);
      switch (((e.lanes = 0), e.tag)) {
        case 16:
          t: {
            t = e.pendingProps;
            var l = e.elementType,
              u = l._init;
            if (((l = u(l._payload)), (e.type = l), typeof l == "function"))
              rc(l)
                ? ((t = El(l, t)), (e.tag = 1), (e = Nh(null, e, l, t, n)))
                : ((e.tag = 0), (e = Zc(null, e, l, t, n)));
            else {
              if (l != null) {
                if (((u = l.$$typeof), u === nt)) {
                  (e.tag = 11), (e = xh(null, e, l, t, n));
                  break t;
                } else if (u === gt) {
                  (e.tag = 14), (e = _h(null, e, l, t, n));
                  break t;
                }
              }
              throw ((e = $t(l) || l), Error(c(306, e, "")));
            }
          }
          return e;
        case 0:
          return Zc(t, e, e.type, e.pendingProps, n);
        case 1:
          return (l = e.type), (u = El(l, e.pendingProps)), Nh(t, e, l, u, n);
        case 3:
          t: {
            if ((Kt(e, e.stateNode.containerInfo), t === null))
              throw Error(c(387));
            l = e.pendingProps;
            var i = e.memoizedState;
            (u = i.element), Ec(t, e), Fa(e, l, null, n);
            var o = e.memoizedState;
            if (
              ((l = o.cache),
              qn(e, se, l),
              l !== i.cache && gc(e, [se], n, !0),
              $a(),
              (l = o.element),
              i.isDehydrated)
            )
              if (
                ((i = { element: l, isDehydrated: !1, cache: o.cache }),
                (e.updateQueue.baseState = i),
                (e.memoizedState = i),
                e.flags & 256)
              ) {
                e = Ch(t, e, l, n);
                break t;
              } else if (l !== u) {
                (u = Xe(Error(c(424)), e)), ja(u), (e = Ch(t, e, l, n));
                break t;
              } else {
                switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                  case 9:
                    t = t.body;
                    break;
                  default:
                    t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
                }
                for (
                  ee = en(t.firstChild),
                    xe = e,
                    Lt = !0,
                    gl = null,
                    an = !0,
                    n = gh(e, null, l, n),
                    e.child = n;
                  n;

                )
                  (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
              }
            else {
              if ((Va(), l === u)) {
                e = Tn(t, e, n);
                break t;
              }
              ye(t, e, l, n);
            }
            e = e.child;
          }
          return e;
        case 26:
          return (
            Ai(t, e),
            t === null
              ? (n = Vm(e.type, null, e.pendingProps, null))
                ? (e.memoizedState = n)
                : Lt ||
                  ((n = e.type),
                  (t = e.pendingProps),
                  (l = Bi(ht.current).createElement(n)),
                  (l[w] = e),
                  (l[q] = t),
                  be(l, n, t),
                  Ut(l),
                  (e.stateNode = l))
              : (e.memoizedState = Vm(
                  e.type,
                  t.memoizedProps,
                  e.pendingProps,
                  t.memoizedState,
                )),
            null
          );
        case 27:
          return (
            Aa(e),
            t === null &&
              Lt &&
              ((l = e.stateNode = Bm(e.type, e.pendingProps, ht.current)),
              (xe = e),
              (an = !0),
              (u = ee),
              Wn(e.type) ? ((Ns = u), (ee = en(l.firstChild))) : (ee = u)),
            ye(t, e, e.pendingProps.children, n),
            Ai(t, e),
            t === null && (e.flags |= 4194304),
            e.child
          );
        case 5:
          return (
            t === null &&
              Lt &&
              ((u = l = ee) &&
                ((l = U0(l, e.type, e.pendingProps, an)),
                l !== null
                  ? ((e.stateNode = l),
                    (xe = e),
                    (ee = en(l.firstChild)),
                    (an = !1),
                    (u = !0))
                  : (u = !1)),
              u || yl(e)),
            Aa(e),
            (u = e.type),
            (i = e.pendingProps),
            (o = t !== null ? t.memoizedProps : null),
            (l = i.children),
            Ds(u, i) ? (l = null) : o !== null && Ds(u, o) && (e.flags |= 32),
            e.memoizedState !== null &&
              ((u = _c(t, e, Wp, null, null, n)), (bu._currentValue = u)),
            Ai(t, e),
            ye(t, e, l, n),
            e.child
          );
        case 6:
          return (
            t === null &&
              Lt &&
              ((t = n = ee) &&
                ((n = H0(n, e.pendingProps, an)),
                n !== null
                  ? ((e.stateNode = n), (xe = e), (ee = null), (t = !0))
                  : (t = !1)),
              t || yl(e)),
            null
          );
        case 13:
          return Uh(t, e, n);
        case 4:
          return (
            Kt(e, e.stateNode.containerInfo),
            (l = e.pendingProps),
            t === null ? (e.child = ua(e, null, l, n)) : ye(t, e, l, n),
            e.child
          );
        case 11:
          return xh(t, e, e.type, e.pendingProps, n);
        case 7:
          return ye(t, e, e.pendingProps, n), e.child;
        case 8:
          return ye(t, e, e.pendingProps.children, n), e.child;
        case 12:
          return ye(t, e, e.pendingProps.children, n), e.child;
        case 10:
          return (
            (l = e.pendingProps),
            qn(e, e.type, l.value),
            ye(t, e, l.children, n),
            e.child
          );
        case 9:
          return (
            (u = e.type._context),
            (l = e.pendingProps.children),
            bl(e),
            (u = Te(u)),
            (l = l(u)),
            (e.flags |= 1),
            ye(t, e, l, n),
            e.child
          );
        case 14:
          return _h(t, e, e.type, e.pendingProps, n);
        case 15:
          return Dh(t, e, e.type, e.pendingProps, n);
        case 19:
          return Lh(t, e, n);
        case 31:
          return (
            (l = e.pendingProps),
            (n = e.mode),
            (l = { mode: l.mode, children: l.children }),
            t === null
              ? ((n = wi(l, n)),
                (n.ref = e.ref),
                (e.child = n),
                (n.return = e),
                (e = n))
              : ((n = gn(t.child, l)),
                (n.ref = e.ref),
                (e.child = n),
                (n.return = e),
                (e = n)),
            e
          );
        case 22:
          return Oh(t, e, n);
        case 24:
          return (
            bl(e),
            (l = Te(se)),
            t === null
              ? ((u = bc()),
                u === null &&
                  ((u = kt),
                  (i = yc()),
                  (u.pooledCache = i),
                  i.refCount++,
                  i !== null && (u.pooledCacheLanes |= n),
                  (u = i)),
                (e.memoizedState = { parent: l, cache: u }),
                Sc(e),
                qn(e, se, u))
              : ((t.lanes & n) !== 0 && (Ec(t, e), Fa(e, null, null, n), $a()),
                (u = t.memoizedState),
                (i = e.memoizedState),
                u.parent !== l
                  ? ((u = { parent: l, cache: l }),
                    (e.memoizedState = u),
                    e.lanes === 0 &&
                      (e.memoizedState = e.updateQueue.baseState = u),
                    qn(e, se, l))
                  : ((l = i.cache),
                    qn(e, se, l),
                    l !== u.cache && gc(e, [se], n, !0))),
            ye(t, e, e.pendingProps.children, n),
            e.child
          );
        case 29:
          throw e.pendingProps;
      }
      throw Error(c(156, e.tag));
    }
    function An(t) {
      t.flags |= 4;
    }
    function Bh(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
        t.flags &= -16777217;
      else if (((t.flags |= 16777216), !Km(e))) {
        if (
          ((e = Je.current),
          e !== null &&
            ((Nt & 4194048) === Nt
              ? un !== null
              : ((Nt & 62914560) !== Nt && (Nt & 536870912) === 0) || e !== un))
        )
          throw ((Ja = pc), Ed);
        t.flags |= 8192;
      }
    }
    function Mi(t, e) {
      e !== null && (t.flags |= 4),
        t.flags & 16384 &&
          ((e = t.tag !== 22 ? ql() : 536870912), (t.lanes |= e), (sa |= e));
    }
    function lu(t, e) {
      if (!Lt)
        switch (t.tailMode) {
          case "hidden":
            e = t.tail;
            for (var n = null; e !== null; )
              e.alternate !== null && (n = e), (e = e.sibling);
            n === null ? (t.tail = null) : (n.sibling = null);
            break;
          case "collapsed":
            n = t.tail;
            for (var l = null; n !== null; )
              n.alternate !== null && (l = n), (n = n.sibling);
            l === null
              ? e || t.tail === null
                ? (t.tail = null)
                : (t.tail.sibling = null)
              : (l.sibling = null);
        }
    }
    function te(t) {
      var e = t.alternate !== null && t.alternate.child === t.child,
        n = 0,
        l = 0;
      if (e)
        for (var u = t.child; u !== null; )
          (n |= u.lanes | u.childLanes),
            (l |= u.subtreeFlags & 65011712),
            (l |= u.flags & 65011712),
            (u.return = t),
            (u = u.sibling);
      else
        for (u = t.child; u !== null; )
          (n |= u.lanes | u.childLanes),
            (l |= u.subtreeFlags),
            (l |= u.flags),
            (u.return = t),
            (u = u.sibling);
      return (t.subtreeFlags |= l), (t.childLanes = n), e;
    }
    function r0(t, e, n) {
      var l = e.pendingProps;
      switch ((fc(e), e.tag)) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return te(e), null;
        case 1:
          return te(e), null;
        case 3:
          return (
            (n = e.stateNode),
            (l = null),
            t !== null && (l = t.memoizedState.cache),
            e.memoizedState.cache !== l && (e.flags |= 2048),
            pn(se),
            We(),
            n.pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (t === null || t.child === null) &&
              (Ya(e)
                ? An(e)
                : t === null ||
                  (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                  ((e.flags |= 1024), yd())),
            te(e),
            null
          );
        case 26:
          return (
            (n = e.memoizedState),
            t === null
              ? (An(e),
                n !== null
                  ? (te(e), Bh(e, n))
                  : (te(e), (e.flags &= -16777217)))
              : n
                ? n !== t.memoizedState
                  ? (An(e), te(e), Bh(e, n))
                  : (te(e), (e.flags &= -16777217))
                : (t.memoizedProps !== l && An(e),
                  te(e),
                  (e.flags &= -16777217)),
            null
          );
        case 27:
          Cl(e), (n = ht.current);
          var u = e.type;
          if (t !== null && e.stateNode != null) t.memoizedProps !== l && An(e);
          else {
            if (!l) {
              if (e.stateNode === null) throw Error(c(166));
              return te(e), null;
            }
            (t = lt.current),
              Ya(e) ? md(e) : ((t = Bm(u, l, n)), (e.stateNode = t), An(e));
          }
          return te(e), null;
        case 5:
          if ((Cl(e), (n = e.type), t !== null && e.stateNode != null))
            t.memoizedProps !== l && An(e);
          else {
            if (!l) {
              if (e.stateNode === null) throw Error(c(166));
              return te(e), null;
            }
            if (((t = lt.current), Ya(e))) md(e);
            else {
              switch (((u = Bi(ht.current)), t)) {
                case 1:
                  t = u.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case 2:
                  t = u.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n,
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      t = u.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case "math":
                      t = u.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n,
                      );
                      break;
                    case "script":
                      (t = u.createElement("div")),
                        (t.innerHTML = "<script><\/script>"),
                        (t = t.removeChild(t.firstChild));
                      break;
                    case "select":
                      (t =
                        typeof l.is == "string"
                          ? u.createElement("select", { is: l.is })
                          : u.createElement("select")),
                        l.multiple
                          ? (t.multiple = !0)
                          : l.size && (t.size = l.size);
                      break;
                    default:
                      t =
                        typeof l.is == "string"
                          ? u.createElement(n, { is: l.is })
                          : u.createElement(n);
                  }
              }
              (t[w] = e), (t[q] = l);
              t: for (u = e.child; u !== null; ) {
                if (u.tag === 5 || u.tag === 6) t.appendChild(u.stateNode);
                else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                  (u.child.return = u), (u = u.child);
                  continue;
                }
                if (u === e) break t;
                for (; u.sibling === null; ) {
                  if (u.return === null || u.return === e) break t;
                  u = u.return;
                }
                (u.sibling.return = u.return), (u = u.sibling);
              }
              e.stateNode = t;
              t: switch ((be(t, n, l), n)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  t = !!l.autoFocus;
                  break t;
                case "img":
                  t = !0;
                  break t;
                default:
                  t = !1;
              }
              t && An(e);
            }
          }
          return te(e), (e.flags &= -16777217), null;
        case 6:
          if (t && e.stateNode != null) t.memoizedProps !== l && An(e);
          else {
            if (typeof l != "string" && e.stateNode === null)
              throw Error(c(166));
            if (((t = ht.current), Ya(e))) {
              if (
                ((t = e.stateNode),
                (n = e.memoizedProps),
                (l = null),
                (u = xe),
                u !== null)
              )
                switch (u.tag) {
                  case 27:
                  case 5:
                    l = u.memoizedProps;
                }
              (t[w] = e),
                (t = !!(
                  t.nodeValue === n ||
                  (l !== null && l.suppressHydrationWarning === !0) ||
                  zm(t.nodeValue, n)
                )),
                t || yl(e);
            } else (t = Bi(t).createTextNode(l)), (t[w] = e), (e.stateNode = t);
          }
          return te(e), null;
        case 13:
          if (
            ((l = e.memoizedState),
            t === null ||
              (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
          ) {
            if (((u = Ya(e)), l !== null && l.dehydrated !== null)) {
              if (t === null) {
                if (!u) throw Error(c(318));
                if (
                  ((u = e.memoizedState),
                  (u = u !== null ? u.dehydrated : null),
                  !u)
                )
                  throw Error(c(317));
                u[w] = e;
              } else
                Va(),
                  (e.flags & 128) === 0 && (e.memoizedState = null),
                  (e.flags |= 4);
              te(e), (u = !1);
            } else
              (u = yd()),
                t !== null &&
                  t.memoizedState !== null &&
                  (t.memoizedState.hydrationErrors = u),
                (u = !0);
            if (!u) return e.flags & 256 ? (En(e), e) : (En(e), null);
          }
          if ((En(e), (e.flags & 128) !== 0)) return (e.lanes = n), e;
          if (
            ((n = l !== null), (t = t !== null && t.memoizedState !== null), n)
          ) {
            (l = e.child),
              (u = null),
              l.alternate !== null &&
                l.alternate.memoizedState !== null &&
                l.alternate.memoizedState.cachePool !== null &&
                (u = l.alternate.memoizedState.cachePool.pool);
            var i = null;
            l.memoizedState !== null &&
              l.memoizedState.cachePool !== null &&
              (i = l.memoizedState.cachePool.pool),
              i !== u && (l.flags |= 2048);
          }
          return (
            n !== t && n && (e.child.flags |= 8192),
            Mi(e, e.updateQueue),
            te(e),
            null
          );
        case 4:
          return We(), t === null && As(e.stateNode.containerInfo), te(e), null;
        case 10:
          return pn(e.type), te(e), null;
        case 19:
          if ((Z(oe), (u = e.memoizedState), u === null)) return te(e), null;
          if (((l = (e.flags & 128) !== 0), (i = u.rendering), i === null))
            if (l) lu(u, !1);
            else {
              if (ne !== 0 || (t !== null && (t.flags & 128) !== 0))
                for (t = e.child; t !== null; ) {
                  if (((i = Si(t)), i !== null)) {
                    for (
                      e.flags |= 128,
                        lu(u, !1),
                        t = i.updateQueue,
                        e.updateQueue = t,
                        Mi(e, t),
                        e.subtreeFlags = 0,
                        t = n,
                        n = e.child;
                      n !== null;

                    )
                      dd(n, t), (n = n.sibling);
                    return I(oe, (oe.current & 1) | 2), e.child;
                  }
                  t = t.sibling;
                }
              u.tail !== null &&
                Ee() > Di &&
                ((e.flags |= 128), (l = !0), lu(u, !1), (e.lanes = 4194304));
            }
          else {
            if (!l)
              if (((t = Si(i)), t !== null)) {
                if (
                  ((e.flags |= 128),
                  (l = !0),
                  (t = t.updateQueue),
                  (e.updateQueue = t),
                  Mi(e, t),
                  lu(u, !0),
                  u.tail === null &&
                    u.tailMode === "hidden" &&
                    !i.alternate &&
                    !Lt)
                )
                  return te(e), null;
              } else
                2 * Ee() - u.renderingStartTime > Di &&
                  n !== 536870912 &&
                  ((e.flags |= 128), (l = !0), lu(u, !1), (e.lanes = 4194304));
            u.isBackwards
              ? ((i.sibling = e.child), (e.child = i))
              : ((t = u.last),
                t !== null ? (t.sibling = i) : (e.child = i),
                (u.last = i));
          }
          return u.tail !== null
            ? ((e = u.tail),
              (u.rendering = e),
              (u.tail = e.sibling),
              (u.renderingStartTime = Ee()),
              (e.sibling = null),
              (t = oe.current),
              I(oe, l ? (t & 1) | 2 : t & 1),
              e)
            : (te(e), null);
        case 22:
        case 23:
          return (
            En(e),
            Mc(),
            (l = e.memoizedState !== null),
            t !== null
              ? (t.memoizedState !== null) !== l && (e.flags |= 8192)
              : l && (e.flags |= 8192),
            l
              ? (n & 536870912) !== 0 &&
                (e.flags & 128) === 0 &&
                (te(e), e.subtreeFlags & 6 && (e.flags |= 8192))
              : te(e),
            (n = e.updateQueue),
            n !== null && Mi(e, n.retryQueue),
            (n = null),
            t !== null &&
              t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (n = t.memoizedState.cachePool.pool),
            (l = null),
            e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (l = e.memoizedState.cachePool.pool),
            l !== n && (e.flags |= 2048),
            t !== null && Z(pl),
            null
          );
        case 24:
          return (
            (n = null),
            t !== null && (n = t.memoizedState.cache),
            e.memoizedState.cache !== n && (e.flags |= 2048),
            pn(se),
            te(e),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(c(156, e.tag));
    }
    function c0(t, e) {
      switch ((fc(e), e.tag)) {
        case 1:
          return (
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 3:
          return (
            pn(se),
            We(),
            (t = e.flags),
            (t & 65536) !== 0 && (t & 128) === 0
              ? ((e.flags = (t & -65537) | 128), e)
              : null
          );
        case 26:
        case 27:
        case 5:
          return Cl(e), null;
        case 13:
          if (
            (En(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
          ) {
            if (e.alternate === null) throw Error(c(340));
            Va();
          }
          return (
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 19:
          return Z(oe), null;
        case 4:
          return We(), null;
        case 10:
          return pn(e.type), null;
        case 22:
        case 23:
          return (
            En(e),
            Mc(),
            t !== null && Z(pl),
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 24:
          return pn(se), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Gh(t, e) {
      switch ((fc(e), e.tag)) {
        case 3:
          pn(se), We();
          break;
        case 26:
        case 27:
        case 5:
          Cl(e);
          break;
        case 4:
          We();
          break;
        case 13:
          En(e);
          break;
        case 19:
          Z(oe);
          break;
        case 10:
          pn(e.type);
          break;
        case 22:
        case 23:
          En(e), Mc(), t !== null && Z(pl);
          break;
        case 24:
          pn(se);
      }
    }
    function au(t, e) {
      try {
        var n = e.updateQueue,
          l = n !== null ? n.lastEffect : null;
        if (l !== null) {
          var u = l.next;
          n = u;
          do {
            if ((n.tag & t) === t) {
              l = void 0;
              var i = n.create,
                o = n.inst;
              (l = i()), (o.destroy = l);
            }
            n = n.next;
          } while (n !== u);
        }
      } catch (d) {
        Zt(e, e.return, d);
      }
    }
    function Qn(t, e, n) {
      try {
        var l = e.updateQueue,
          u = l !== null ? l.lastEffect : null;
        if (u !== null) {
          var i = u.next;
          l = i;
          do {
            if ((l.tag & t) === t) {
              var o = l.inst,
                d = o.destroy;
              if (d !== void 0) {
                (o.destroy = void 0), (u = e);
                var v = n,
                  D = d;
                try {
                  D();
                } catch (B) {
                  Zt(u, v, B);
                }
              }
            }
            l = l.next;
          } while (l !== i);
        }
      } catch (B) {
        Zt(e, e.return, B);
      }
    }
    function Yh(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var n = t.stateNode;
        try {
          _d(e, n);
        } catch (l) {
          Zt(t, t.return, l);
        }
      }
    }
    function Vh(t, e, n) {
      (n.props = El(t.type, t.memoizedProps)), (n.state = t.memoizedState);
      try {
        n.componentWillUnmount();
      } catch (l) {
        Zt(t, e, l);
      }
    }
    function uu(t, e) {
      try {
        var n = t.ref;
        if (n !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var l = t.stateNode;
              break;
            case 30:
              l = t.stateNode;
              break;
            default:
              l = t.stateNode;
          }
          typeof n == "function" ? (t.refCleanup = n(l)) : (n.current = l);
        }
      } catch (u) {
        Zt(t, e, u);
      }
    }
    function rn(t, e) {
      var n = t.ref,
        l = t.refCleanup;
      if (n !== null)
        if (typeof l == "function")
          try {
            l();
          } catch (u) {
            Zt(t, e, u);
          } finally {
            (t.refCleanup = null),
              (t = t.alternate),
              t != null && (t.refCleanup = null);
          }
        else if (typeof n == "function")
          try {
            n(null);
          } catch (u) {
            Zt(t, e, u);
          }
        else n.current = null;
    }
    function jh(t) {
      var e = t.type,
        n = t.memoizedProps,
        l = t.stateNode;
      try {
        t: switch (e) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            n.autoFocus && l.focus();
            break t;
          case "img":
            n.src ? (l.src = n.src) : n.srcSet && (l.srcset = n.srcSet);
        }
      } catch (u) {
        Zt(t, t.return, u);
      }
    }
    function Pc(t, e, n) {
      try {
        var l = t.stateNode;
        O0(l, t.type, n, e), (l[q] = e);
      } catch (u) {
        Zt(t, t.return, u);
      }
    }
    function Xh(t) {
      return (
        t.tag === 5 ||
        t.tag === 3 ||
        t.tag === 26 ||
        (t.tag === 27 && Wn(t.type)) ||
        t.tag === 4
      );
    }
    function ts(t) {
      t: for (;;) {
        for (; t.sibling === null; ) {
          if (t.return === null || Xh(t.return)) return null;
          t = t.return;
        }
        for (
          t.sibling.return = t.return, t = t.sibling;
          t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

        ) {
          if (
            (t.tag === 27 && Wn(t.type)) ||
            t.flags & 2 ||
            t.child === null ||
            t.tag === 4
          )
            continue t;
          (t.child.return = t), (t = t.child);
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function es(t, e, n) {
      var l = t.tag;
      if (l === 5 || l === 6)
        (t = t.stateNode),
          e
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(t, e)
            : ((e =
                n.nodeType === 9
                  ? n.body
                  : n.nodeName === "HTML"
                    ? n.ownerDocument.body
                    : n),
              e.appendChild(t),
              (n = n._reactRootContainer),
              n != null || e.onclick !== null || (e.onclick = qi));
      else if (
        l !== 4 &&
        (l === 27 && Wn(t.type) && ((n = t.stateNode), (e = null)),
        (t = t.child),
        t !== null)
      )
        for (es(t, e, n), t = t.sibling; t !== null; )
          es(t, e, n), (t = t.sibling);
    }
    function xi(t, e, n) {
      var l = t.tag;
      if (l === 5 || l === 6)
        (t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t);
      else if (
        l !== 4 &&
        (l === 27 && Wn(t.type) && (n = t.stateNode), (t = t.child), t !== null)
      )
        for (xi(t, e, n), t = t.sibling; t !== null; )
          xi(t, e, n), (t = t.sibling);
    }
    function Qh(t) {
      var e = t.stateNode,
        n = t.memoizedProps;
      try {
        for (var l = t.type, u = e.attributes; u.length; )
          e.removeAttributeNode(u[0]);
        be(e, l, n), (e[w] = t), (e[q] = n);
      } catch (i) {
        Zt(t, t.return, i);
      }
    }
    var wn = !1,
      ae = !1,
      ns = !1,
      Zh = typeof WeakSet == "function" ? WeakSet : Set,
      me = null;
    function s0(t, e) {
      if (((t = t.containerInfo), (xs = Qi), (t = nd(t)), tc(t))) {
        if ("selectionStart" in t)
          var n = { start: t.selectionStart, end: t.selectionEnd };
        else
          t: {
            n = ((n = t.ownerDocument) && n.defaultView) || window;
            var l = n.getSelection && n.getSelection();
            if (l && l.rangeCount !== 0) {
              n = l.anchorNode;
              var u = l.anchorOffset,
                i = l.focusNode;
              l = l.focusOffset;
              try {
                n.nodeType, i.nodeType;
              } catch {
                n = null;
                break t;
              }
              var o = 0,
                d = -1,
                v = -1,
                D = 0,
                B = 0,
                Y = t,
                R = null;
              e: for (;;) {
                for (
                  var N;
                  Y !== n || (u !== 0 && Y.nodeType !== 3) || (d = o + u),
                    Y !== i || (l !== 0 && Y.nodeType !== 3) || (v = o + l),
                    Y.nodeType === 3 && (o += Y.nodeValue.length),
                    (N = Y.firstChild) !== null;

                )
                  (R = Y), (Y = N);
                for (;;) {
                  if (Y === t) break e;
                  if (
                    (R === n && ++D === u && (d = o),
                    R === i && ++B === l && (v = o),
                    (N = Y.nextSibling) !== null)
                  )
                    break;
                  (Y = R), (R = Y.parentNode);
                }
                Y = N;
              }
              n = d === -1 || v === -1 ? null : { start: d, end: v };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (
        _s = { focusedElem: t, selectionRange: n }, Qi = !1, me = e;
        me !== null;

      )
        if (
          ((e = me), (t = e.child), (e.subtreeFlags & 1024) !== 0 && t !== null)
        )
          (t.return = e), (me = t);
        else
          for (; me !== null; ) {
            switch (((e = me), (i = e.alternate), (t = e.flags), e.tag)) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((t & 1024) !== 0 && i !== null) {
                  (t = void 0),
                    (n = e),
                    (u = i.memoizedProps),
                    (i = i.memoizedState),
                    (l = n.stateNode);
                  try {
                    var vt = El(n.type, u, n.elementType === n.type);
                    (t = l.getSnapshotBeforeUpdate(vt, i)),
                      (l.__reactInternalSnapshotBeforeUpdate = t);
                  } catch (dt) {
                    Zt(n, n.return, dt);
                  }
                }
                break;
              case 3:
                if ((t & 1024) !== 0) {
                  if (
                    ((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)
                  )
                    Rs(t);
                  else if (n === 1)
                    switch (t.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        Rs(t);
                        break;
                      default:
                        t.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((t & 1024) !== 0) throw Error(c(163));
            }
            if (((t = e.sibling), t !== null)) {
              (t.return = e.return), (me = t);
              break;
            }
            me = e.return;
          }
    }
    function Kh(t, e, n) {
      var l = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Zn(t, n), l & 4 && au(5, n);
          break;
        case 1:
          if ((Zn(t, n), l & 4))
            if (((t = n.stateNode), e === null))
              try {
                t.componentDidMount();
              } catch (o) {
                Zt(n, n.return, o);
              }
            else {
              var u = El(n.type, e.memoizedProps);
              e = e.memoizedState;
              try {
                t.componentDidUpdate(
                  u,
                  e,
                  t.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (o) {
                Zt(n, n.return, o);
              }
            }
          l & 64 && Yh(n), l & 512 && uu(n, n.return);
          break;
        case 3:
          if ((Zn(t, n), l & 64 && ((t = n.updateQueue), t !== null))) {
            if (((e = null), n.child !== null))
              switch (n.child.tag) {
                case 27:
                case 5:
                  e = n.child.stateNode;
                  break;
                case 1:
                  e = n.child.stateNode;
              }
            try {
              _d(t, e);
            } catch (o) {
              Zt(n, n.return, o);
            }
          }
          break;
        case 27:
          e === null && l & 4 && Qh(n);
        case 26:
        case 5:
          Zn(t, n), e === null && l & 4 && jh(n), l & 512 && uu(n, n.return);
          break;
        case 12:
          Zn(t, n);
          break;
        case 13:
          Zn(t, n),
            l & 4 && $h(t, n),
            l & 64 &&
              ((t = n.memoizedState),
              t !== null &&
                ((t = t.dehydrated),
                t !== null && ((n = b0.bind(null, n)), L0(t, n))));
          break;
        case 22:
          if (((l = n.memoizedState !== null || wn), !l)) {
            (e = (e !== null && e.memoizedState !== null) || ae), (u = wn);
            var i = ae;
            (wn = l),
              (ae = e) && !i
                ? Kn(t, n, (n.subtreeFlags & 8772) !== 0)
                : Zn(t, n),
              (wn = u),
              (ae = i);
          }
          break;
        case 30:
          break;
        default:
          Zn(t, n);
      }
    }
    function Jh(t) {
      var e = t.alternate;
      e !== null && ((t.alternate = null), Jh(e)),
        (t.child = null),
        (t.deletions = null),
        (t.sibling = null),
        t.tag === 5 && ((e = t.stateNode), e !== null && St(e)),
        (t.stateNode = null),
        (t.return = null),
        (t.dependencies = null),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.pendingProps = null),
        (t.stateNode = null),
        (t.updateQueue = null);
    }
    var It = null,
      Re = !1;
    function Mn(t, e, n) {
      for (n = n.child; n !== null; ) kh(t, e, n), (n = n.sibling);
    }
    function kh(t, e, n) {
      if (de && typeof de.onCommitFiberUnmount == "function")
        try {
          de.onCommitFiberUnmount(Mt, n);
        } catch {}
      switch (n.tag) {
        case 26:
          ae || rn(n, e),
            Mn(t, e, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
          break;
        case 27:
          ae || rn(n, e);
          var l = It,
            u = Re;
          Wn(n.type) && ((It = n.stateNode), (Re = !1)),
            Mn(t, e, n),
            mu(n.stateNode),
            (It = l),
            (Re = u);
          break;
        case 5:
          ae || rn(n, e);
        case 6:
          if (
            ((l = It),
            (u = Re),
            (It = null),
            Mn(t, e, n),
            (It = l),
            (Re = u),
            It !== null)
          )
            if (Re)
              try {
                (It.nodeType === 9
                  ? It.body
                  : It.nodeName === "HTML"
                    ? It.ownerDocument.body
                    : It
                ).removeChild(n.stateNode);
              } catch (i) {
                Zt(n, e, i);
              }
            else
              try {
                It.removeChild(n.stateNode);
              } catch (i) {
                Zt(n, e, i);
              }
          break;
        case 18:
          It !== null &&
            (Re
              ? ((t = It),
                Lm(
                  t.nodeType === 9
                    ? t.body
                    : t.nodeName === "HTML"
                      ? t.ownerDocument.body
                      : t,
                  n.stateNode,
                ),
                Tu(t))
              : Lm(It, n.stateNode));
          break;
        case 4:
          (l = It),
            (u = Re),
            (It = n.stateNode.containerInfo),
            (Re = !0),
            Mn(t, e, n),
            (It = l),
            (Re = u);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          ae || Qn(2, n, e), ae || Qn(4, n, e), Mn(t, e, n);
          break;
        case 1:
          ae ||
            (rn(n, e),
            (l = n.stateNode),
            typeof l.componentWillUnmount == "function" && Vh(n, e, l)),
            Mn(t, e, n);
          break;
        case 21:
          Mn(t, e, n);
          break;
        case 22:
          (ae = (l = ae) || n.memoizedState !== null), Mn(t, e, n), (ae = l);
          break;
        default:
          Mn(t, e, n);
      }
    }
    function $h(t, e) {
      if (
        e.memoizedState === null &&
        ((t = e.alternate),
        t !== null &&
          ((t = t.memoizedState),
          t !== null && ((t = t.dehydrated), t !== null)))
      )
        try {
          Tu(t);
        } catch (n) {
          Zt(e, e.return, n);
        }
    }
    function o0(t) {
      switch (t.tag) {
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new Zh()), e;
        case 22:
          return (
            (t = t.stateNode),
            (e = t._retryCache),
            e === null && (e = t._retryCache = new Zh()),
            e
          );
        default:
          throw Error(c(435, t.tag));
      }
    }
    function ls(t, e) {
      var n = o0(t);
      e.forEach(function (l) {
        var u = p0.bind(null, t, l);
        n.has(l) || (n.add(l), l.then(u, u));
      });
    }
    function He(t, e) {
      var n = e.deletions;
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var u = n[l],
            i = t,
            o = e,
            d = o;
          t: for (; d !== null; ) {
            switch (d.tag) {
              case 27:
                if (Wn(d.type)) {
                  (It = d.stateNode), (Re = !1);
                  break t;
                }
                break;
              case 5:
                (It = d.stateNode), (Re = !1);
                break t;
              case 3:
              case 4:
                (It = d.stateNode.containerInfo), (Re = !0);
                break t;
            }
            d = d.return;
          }
          if (It === null) throw Error(c(160));
          kh(i, o, u),
            (It = null),
            (Re = !1),
            (i = u.alternate),
            i !== null && (i.return = null),
            (u.return = null);
        }
      if (e.subtreeFlags & 13878)
        for (e = e.child; e !== null; ) Fh(e, t), (e = e.sibling);
    }
    var tn = null;
    function Fh(t, e) {
      var n = t.alternate,
        l = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          He(e, t),
            Le(t),
            l & 4 && (Qn(3, t, t.return), au(3, t), Qn(5, t, t.return));
          break;
        case 1:
          He(e, t),
            Le(t),
            l & 512 && (ae || n === null || rn(n, n.return)),
            l & 64 &&
              wn &&
              ((t = t.updateQueue),
              t !== null &&
                ((l = t.callbacks),
                l !== null &&
                  ((n = t.shared.hiddenCallbacks),
                  (t.shared.hiddenCallbacks = n === null ? l : n.concat(l)))));
          break;
        case 26:
          var u = tn;
          if (
            (He(e, t),
            Le(t),
            l & 512 && (ae || n === null || rn(n, n.return)),
            l & 4)
          ) {
            var i = n !== null ? n.memoizedState : null;
            if (((l = t.memoizedState), n === null))
              if (l === null)
                if (t.stateNode === null) {
                  t: {
                    (l = t.type),
                      (n = t.memoizedProps),
                      (u = u.ownerDocument || u);
                    e: switch (l) {
                      case "title":
                        (i = u.getElementsByTagName("title")[0]),
                          (!i ||
                            i[ot] ||
                            i[w] ||
                            i.namespaceURI === "http://www.w3.org/2000/svg" ||
                            i.hasAttribute("itemprop")) &&
                            ((i = u.createElement(l)),
                            u.head.insertBefore(
                              i,
                              u.querySelector("head > title"),
                            )),
                          be(i, l, n),
                          (i[w] = t),
                          Ut(i),
                          (l = i);
                        break t;
                      case "link":
                        var o = Qm("link", "href", u).get(l + (n.href || ""));
                        if (o) {
                          for (var d = 0; d < o.length; d++)
                            if (
                              ((i = o[d]),
                              i.getAttribute("href") ===
                                (n.href == null || n.href === ""
                                  ? null
                                  : n.href) &&
                                i.getAttribute("rel") ===
                                  (n.rel == null ? null : n.rel) &&
                                i.getAttribute("title") ===
                                  (n.title == null ? null : n.title) &&
                                i.getAttribute("crossorigin") ===
                                  (n.crossOrigin == null
                                    ? null
                                    : n.crossOrigin))
                            ) {
                              o.splice(d, 1);
                              break e;
                            }
                        }
                        (i = u.createElement(l)),
                          be(i, l, n),
                          u.head.appendChild(i);
                        break;
                      case "meta":
                        if (
                          (o = Qm("meta", "content", u).get(
                            l + (n.content || ""),
                          ))
                        ) {
                          for (d = 0; d < o.length; d++)
                            if (
                              ((i = o[d]),
                              i.getAttribute("content") ===
                                (n.content == null ? null : "" + n.content) &&
                                i.getAttribute("name") ===
                                  (n.name == null ? null : n.name) &&
                                i.getAttribute("property") ===
                                  (n.property == null ? null : n.property) &&
                                i.getAttribute("http-equiv") ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                i.getAttribute("charset") ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              o.splice(d, 1);
                              break e;
                            }
                        }
                        (i = u.createElement(l)),
                          be(i, l, n),
                          u.head.appendChild(i);
                        break;
                      default:
                        throw Error(c(468, l));
                    }
                    (i[w] = t), Ut(i), (l = i);
                  }
                  t.stateNode = l;
                } else Zm(u, t.type, t.stateNode);
              else t.stateNode = Xm(u, l, t.memoizedProps);
            else
              i !== l
                ? (i === null
                    ? n.stateNode !== null &&
                      ((n = n.stateNode), n.parentNode.removeChild(n))
                    : i.count--,
                  l === null
                    ? Zm(u, t.type, t.stateNode)
                    : Xm(u, l, t.memoizedProps))
                : l === null &&
                  t.stateNode !== null &&
                  Pc(t, t.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          He(e, t),
            Le(t),
            l & 512 && (ae || n === null || rn(n, n.return)),
            n !== null && l & 4 && Pc(t, t.memoizedProps, n.memoizedProps);
          break;
        case 5:
          if (
            (He(e, t),
            Le(t),
            l & 512 && (ae || n === null || rn(n, n.return)),
            t.flags & 32)
          ) {
            u = t.stateNode;
            try {
              Vl(u, "");
            } catch (N) {
              Zt(t, t.return, N);
            }
          }
          l & 4 &&
            t.stateNode != null &&
            ((u = t.memoizedProps), Pc(t, u, n !== null ? n.memoizedProps : u)),
            l & 1024 && (ns = !0);
          break;
        case 6:
          if ((He(e, t), Le(t), l & 4)) {
            if (t.stateNode === null) throw Error(c(162));
            (l = t.memoizedProps), (n = t.stateNode);
            try {
              n.nodeValue = l;
            } catch (N) {
              Zt(t, t.return, N);
            }
          }
          break;
        case 3:
          if (
            ((Vi = null),
            (u = tn),
            (tn = Gi(e.containerInfo)),
            He(e, t),
            (tn = u),
            Le(t),
            l & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Tu(e.containerInfo);
            } catch (N) {
              Zt(t, t.return, N);
            }
          ns && ((ns = !1), Ih(t));
          break;
        case 4:
          (l = tn),
            (tn = Gi(t.stateNode.containerInfo)),
            He(e, t),
            Le(t),
            (tn = l);
          break;
        case 12:
          He(e, t), Le(t);
          break;
        case 13:
          He(e, t),
            Le(t),
            t.child.flags & 8192 &&
              (t.memoizedState !== null) !=
                (n !== null && n.memoizedState !== null) &&
              (ss = Ee()),
            l & 4 &&
              ((l = t.updateQueue),
              l !== null && ((t.updateQueue = null), ls(t, l)));
          break;
        case 22:
          u = t.memoizedState !== null;
          var v = n !== null && n.memoizedState !== null,
            D = wn,
            B = ae;
          if (
            ((wn = D || u),
            (ae = B || v),
            He(e, t),
            (ae = B),
            (wn = D),
            Le(t),
            l & 8192)
          )
            t: for (
              e = t.stateNode,
                e._visibility = u ? e._visibility & -2 : e._visibility | 1,
                u && (n === null || v || wn || ae || Tl(t)),
                n = null,
                e = t;
              ;

            ) {
              if (e.tag === 5 || e.tag === 26) {
                if (n === null) {
                  v = n = e;
                  try {
                    if (((i = v.stateNode), u))
                      (o = i.style),
                        typeof o.setProperty == "function"
                          ? o.setProperty("display", "none", "important")
                          : (o.display = "none");
                    else {
                      d = v.stateNode;
                      var Y = v.memoizedProps.style,
                        R =
                          Y != null && Y.hasOwnProperty("display")
                            ? Y.display
                            : null;
                      d.style.display =
                        R == null || typeof R == "boolean"
                          ? ""
                          : ("" + R).trim();
                    }
                  } catch (N) {
                    Zt(v, v.return, N);
                  }
                }
              } else if (e.tag === 6) {
                if (n === null) {
                  v = e;
                  try {
                    v.stateNode.nodeValue = u ? "" : v.memoizedProps;
                  } catch (N) {
                    Zt(v, v.return, N);
                  }
                }
              } else if (
                ((e.tag !== 22 && e.tag !== 23) ||
                  e.memoizedState === null ||
                  e === t) &&
                e.child !== null
              ) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === t) break t;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t) break t;
                n === e && (n = null), (e = e.return);
              }
              n === e && (n = null),
                (e.sibling.return = e.return),
                (e = e.sibling);
            }
          l & 4 &&
            ((l = t.updateQueue),
            l !== null &&
              ((n = l.retryQueue),
              n !== null && ((l.retryQueue = null), ls(t, n))));
          break;
        case 19:
          He(e, t),
            Le(t),
            l & 4 &&
              ((l = t.updateQueue),
              l !== null && ((t.updateQueue = null), ls(t, l)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          He(e, t), Le(t);
      }
    }
    function Le(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          for (var n, l = t.return; l !== null; ) {
            if (Xh(l)) {
              n = l;
              break;
            }
            l = l.return;
          }
          if (n == null) throw Error(c(160));
          switch (n.tag) {
            case 27:
              var u = n.stateNode,
                i = ts(t);
              xi(t, i, u);
              break;
            case 5:
              var o = n.stateNode;
              n.flags & 32 && (Vl(o, ""), (n.flags &= -33));
              var d = ts(t);
              xi(t, d, o);
              break;
            case 3:
            case 4:
              var v = n.stateNode.containerInfo,
                D = ts(t);
              es(t, D, v);
              break;
            default:
              throw Error(c(161));
          }
        } catch (B) {
          Zt(t, t.return, B);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function Ih(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var e = t;
          Ih(e),
            e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
            (t = t.sibling);
        }
    }
    function Zn(t, e) {
      if (e.subtreeFlags & 8772)
        for (e = e.child; e !== null; ) Kh(t, e.alternate, e), (e = e.sibling);
    }
    function Tl(t) {
      for (t = t.child; t !== null; ) {
        var e = t;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Qn(4, e, e.return), Tl(e);
            break;
          case 1:
            rn(e, e.return);
            var n = e.stateNode;
            typeof n.componentWillUnmount == "function" && Vh(e, e.return, n),
              Tl(e);
            break;
          case 27:
            mu(e.stateNode);
          case 26:
          case 5:
            rn(e, e.return), Tl(e);
            break;
          case 22:
            e.memoizedState === null && Tl(e);
            break;
          case 30:
            Tl(e);
            break;
          default:
            Tl(e);
        }
        t = t.sibling;
      }
    }
    function Kn(t, e, n) {
      for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
        var l = e.alternate,
          u = t,
          i = e,
          o = i.flags;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Kn(u, i, n), au(4, i);
            break;
          case 1:
            if (
              (Kn(u, i, n),
              (l = i),
              (u = l.stateNode),
              typeof u.componentDidMount == "function")
            )
              try {
                u.componentDidMount();
              } catch (D) {
                Zt(l, l.return, D);
              }
            if (((l = i), (u = l.updateQueue), u !== null)) {
              var d = l.stateNode;
              try {
                var v = u.shared.hiddenCallbacks;
                if (v !== null)
                  for (
                    u.shared.hiddenCallbacks = null, u = 0;
                    u < v.length;
                    u++
                  )
                    xd(v[u], d);
              } catch (D) {
                Zt(l, l.return, D);
              }
            }
            n && o & 64 && Yh(i), uu(i, i.return);
            break;
          case 27:
            Qh(i);
          case 26:
          case 5:
            Kn(u, i, n), n && l === null && o & 4 && jh(i), uu(i, i.return);
            break;
          case 12:
            Kn(u, i, n);
            break;
          case 13:
            Kn(u, i, n), n && o & 4 && $h(u, i);
            break;
          case 22:
            i.memoizedState === null && Kn(u, i, n), uu(i, i.return);
            break;
          case 30:
            break;
          default:
            Kn(u, i, n);
        }
        e = e.sibling;
      }
    }
    function as(t, e) {
      var n = null;
      t !== null &&
        t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (n = t.memoizedState.cachePool.pool),
        (t = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (t = e.memoizedState.cachePool.pool),
        t !== n && (t != null && t.refCount++, n != null && Qa(n));
    }
    function us(t, e) {
      (t = null),
        e.alternate !== null && (t = e.alternate.memoizedState.cache),
        (e = e.memoizedState.cache),
        e !== t && (e.refCount++, t != null && Qa(t));
    }
    function cn(t, e, n, l) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) Wh(t, e, n, l), (e = e.sibling);
    }
    function Wh(t, e, n, l) {
      var u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          cn(t, e, n, l), u & 2048 && au(9, e);
          break;
        case 1:
          cn(t, e, n, l);
          break;
        case 3:
          cn(t, e, n, l),
            u & 2048 &&
              ((t = null),
              e.alternate !== null && (t = e.alternate.memoizedState.cache),
              (e = e.memoizedState.cache),
              e !== t && (e.refCount++, t != null && Qa(t)));
          break;
        case 12:
          if (u & 2048) {
            cn(t, e, n, l), (t = e.stateNode);
            try {
              var i = e.memoizedProps,
                o = i.id,
                d = i.onPostCommit;
              typeof d == "function" &&
                d(
                  o,
                  e.alternate === null ? "mount" : "update",
                  t.passiveEffectDuration,
                  -0,
                );
            } catch (v) {
              Zt(e, e.return, v);
            }
          } else cn(t, e, n, l);
          break;
        case 13:
          cn(t, e, n, l);
          break;
        case 23:
          break;
        case 22:
          (i = e.stateNode),
            (o = e.alternate),
            e.memoizedState !== null
              ? i._visibility & 2
                ? cn(t, e, n, l)
                : iu(t, e)
              : i._visibility & 2
                ? cn(t, e, n, l)
                : ((i._visibility |= 2),
                  ia(t, e, n, l, (e.subtreeFlags & 10256) !== 0)),
            u & 2048 && as(o, e);
          break;
        case 24:
          cn(t, e, n, l), u & 2048 && us(e.alternate, e);
          break;
        default:
          cn(t, e, n, l);
      }
    }
    function ia(t, e, n, l, u) {
      for (u = u && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
        var i = t,
          o = e,
          d = n,
          v = l,
          D = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            ia(i, o, d, v, u), au(8, o);
            break;
          case 23:
            break;
          case 22:
            var B = o.stateNode;
            o.memoizedState !== null
              ? B._visibility & 2
                ? ia(i, o, d, v, u)
                : iu(i, o)
              : ((B._visibility |= 2), ia(i, o, d, v, u)),
              u && D & 2048 && as(o.alternate, o);
            break;
          case 24:
            ia(i, o, d, v, u), u && D & 2048 && us(o.alternate, o);
            break;
          default:
            ia(i, o, d, v, u);
        }
        e = e.sibling;
      }
    }
    function iu(t, e) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) {
          var n = t,
            l = e,
            u = l.flags;
          switch (l.tag) {
            case 22:
              iu(n, l), u & 2048 && as(l.alternate, l);
              break;
            case 24:
              iu(n, l), u & 2048 && us(l.alternate, l);
              break;
            default:
              iu(n, l);
          }
          e = e.sibling;
        }
    }
    var ru = 8192;
    function ra(t) {
      if (t.subtreeFlags & ru)
        for (t = t.child; t !== null; ) Ph(t), (t = t.sibling);
    }
    function Ph(t) {
      switch (t.tag) {
        case 26:
          ra(t),
            t.flags & ru &&
              t.memoizedState !== null &&
              $0(tn, t.memoizedState, t.memoizedProps);
          break;
        case 5:
          ra(t);
          break;
        case 3:
        case 4:
          var e = tn;
          (tn = Gi(t.stateNode.containerInfo)), ra(t), (tn = e);
          break;
        case 22:
          t.memoizedState === null &&
            ((e = t.alternate),
            e !== null && e.memoizedState !== null
              ? ((e = ru), (ru = 16777216), ra(t), (ru = e))
              : ra(t));
          break;
        default:
          ra(t);
      }
    }
    function tm(t) {
      var e = t.alternate;
      if (e !== null && ((t = e.child), t !== null)) {
        e.child = null;
        do (e = t.sibling), (t.sibling = null), (t = e);
        while (t !== null);
      }
    }
    function cu(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var n = 0; n < e.length; n++) {
            var l = e[n];
            (me = l), nm(l, t);
          }
        tm(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) em(t), (t = t.sibling);
    }
    function em(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          cu(t), t.flags & 2048 && Qn(9, t, t.return);
          break;
        case 3:
          cu(t);
          break;
        case 12:
          cu(t);
          break;
        case 22:
          var e = t.stateNode;
          t.memoizedState !== null &&
          e._visibility & 2 &&
          (t.return === null || t.return.tag !== 13)
            ? ((e._visibility &= -3), _i(t))
            : cu(t);
          break;
        default:
          cu(t);
      }
    }
    function _i(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var n = 0; n < e.length; n++) {
            var l = e[n];
            (me = l), nm(l, t);
          }
        tm(t);
      }
      for (t = t.child; t !== null; ) {
        switch (((e = t), e.tag)) {
          case 0:
          case 11:
          case 15:
            Qn(8, e, e.return), _i(e);
            break;
          case 22:
            (n = e.stateNode),
              n._visibility & 2 && ((n._visibility &= -3), _i(e));
            break;
          default:
            _i(e);
        }
        t = t.sibling;
      }
    }
    function nm(t, e) {
      for (; me !== null; ) {
        var n = me;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Qn(8, n, e);
            break;
          case 23:
          case 22:
            if (
              n.memoizedState !== null &&
              n.memoizedState.cachePool !== null
            ) {
              var l = n.memoizedState.cachePool.pool;
              l != null && l.refCount++;
            }
            break;
          case 24:
            Qa(n.memoizedState.cache);
        }
        if (((l = n.child), l !== null)) (l.return = n), (me = l);
        else
          t: for (n = t; me !== null; ) {
            l = me;
            var u = l.sibling,
              i = l.return;
            if ((Jh(l), l === n)) {
              me = null;
              break t;
            }
            if (u !== null) {
              (u.return = i), (me = u);
              break t;
            }
            me = i;
          }
      }
    }
    var f0 = {
        getCacheForType: function (t) {
          var e = Te(se),
            n = e.data.get(t);
          return n === void 0 && ((n = t()), e.data.set(t, n)), n;
        },
      },
      d0 = typeof WeakMap == "function" ? WeakMap : Map,
      Gt = 0,
      kt = null,
      xt = null,
      Nt = 0,
      Yt = 0,
      qe = null,
      Jn = !1,
      ca = !1,
      is = !1,
      xn = 0,
      ne = 0,
      kn = 0,
      Al = 0,
      rs = 0,
      ke = 0,
      sa = 0,
      su = null,
      ze = null,
      cs = !1,
      ss = 0,
      Di = 1 / 0,
      Oi = null,
      $n = null,
      ve = 0,
      Fn = null,
      oa = null,
      fa = 0,
      os = 0,
      fs = null,
      lm = null,
      ou = 0,
      ds = null;
    function Be() {
      if ((Gt & 2) !== 0 && Nt !== 0) return Nt & -Nt;
      if (_.T !== null) {
        var t = Wl;
        return t !== 0 ? t : ps();
      }
      return y();
    }
    function am() {
      ke === 0 && (ke = (Nt & 536870912) === 0 || Lt ? cl() : 536870912);
      var t = Je.current;
      return t !== null && (t.flags |= 32), ke;
    }
    function Ge(t, e, n) {
      ((t === kt && (Yt === 2 || Yt === 9)) ||
        t.cancelPendingCommit !== null) &&
        (da(t, 0), In(t, Nt, ke, !1)),
        ln(t, n),
        ((Gt & 2) === 0 || t !== kt) &&
          (t === kt &&
            ((Gt & 2) === 0 && (Al |= n), ne === 4 && In(t, Nt, ke, !1)),
          sn(t));
    }
    function um(t, e, n) {
      if ((Gt & 6) !== 0) throw Error(c(327));
      var l = (!n && (e & 124) === 0 && (e & t.expiredLanes) === 0) || Un(t, e),
        u = l ? g0(t, e) : gs(t, e, !0),
        i = l;
      do {
        if (u === 0) {
          ca && !l && In(t, e, 0, !1);
          break;
        } else {
          if (((n = t.current.alternate), i && !h0(n))) {
            (u = gs(t, e, !1)), (i = !1);
            continue;
          }
          if (u === 2) {
            if (((i = e), t.errorRecoveryDisabledLanes & i)) var o = 0;
            else
              (o = t.pendingLanes & -536870913),
                (o = o !== 0 ? o : o & 536870912 ? 536870912 : 0);
            if (o !== 0) {
              e = o;
              t: {
                var d = t;
                u = su;
                var v = d.current.memoizedState.isDehydrated;
                if (
                  (v && (da(d, o).flags |= 256), (o = gs(d, o, !1)), o !== 2)
                ) {
                  if (is && !v) {
                    (d.errorRecoveryDisabledLanes |= i), (Al |= i), (u = 4);
                    break t;
                  }
                  (i = ze),
                    (ze = u),
                    i !== null &&
                      (ze === null ? (ze = i) : ze.push.apply(ze, i));
                }
                u = o;
              }
              if (((i = !1), u !== 2)) continue;
            }
          }
          if (u === 1) {
            da(t, 0), In(t, e, 0, !0);
            break;
          }
          t: {
            switch (((l = t), (i = u), i)) {
              case 0:
              case 1:
                throw Error(c(345));
              case 4:
                if ((e & 4194048) !== e) break;
              case 6:
                In(l, e, ke, !Jn);
                break t;
              case 2:
                ze = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(c(329));
            }
            if ((e & 62914560) === e && ((u = ss + 300 - Ee()), 10 < u)) {
              if ((In(l, e, ke, !Jn), Cn(l, 0, !0) !== 0)) break t;
              l.timeoutHandle = Um(
                im.bind(null, l, n, ze, Oi, cs, e, ke, Al, sa, Jn, i, 2, -0, 0),
                u,
              );
              break t;
            }
            im(l, n, ze, Oi, cs, e, ke, Al, sa, Jn, i, 0, -0, 0);
          }
        }
        break;
      } while (!0);
      sn(t);
    }
    function im(t, e, n, l, u, i, o, d, v, D, B, Y, R, N) {
      if (
        ((t.timeoutHandle = -1),
        (Y = e.subtreeFlags),
        (Y & 8192 || (Y & 16785408) === 16785408) &&
          ((vu = { stylesheets: null, count: 0, unsuspend: k0 }),
          Ph(e),
          (Y = F0()),
          Y !== null))
      ) {
        (t.cancelPendingCommit = Y(
          hm.bind(null, t, e, i, n, l, u, o, d, v, B, 1, R, N),
        )),
          In(t, i, o, !D);
        return;
      }
      hm(t, e, i, n, l, u, o, d, v);
    }
    function h0(t) {
      for (var e = t; ; ) {
        var n = e.tag;
        if (
          (n === 0 || n === 11 || n === 15) &&
          e.flags & 16384 &&
          ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var l = 0; l < n.length; l++) {
            var u = n[l],
              i = u.getSnapshot;
            u = u.value;
            try {
              if (!Ce(i(), u)) return !1;
            } catch {
              return !1;
            }
          }
        if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
          (n.return = e), (e = n);
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return !0;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      }
      return !0;
    }
    function In(t, e, n, l) {
      (e &= ~rs),
        (e &= ~Al),
        (t.suspendedLanes |= e),
        (t.pingedLanes &= ~e),
        l && (t.warmLanes |= e),
        (l = t.expirationTimes);
      for (var u = e; 0 < u; ) {
        var i = 31 - Jt(u),
          o = 1 << i;
        (l[i] = -1), (u &= ~o);
      }
      n !== 0 && Bl(t, n, e);
    }
    function Ri() {
      return (Gt & 6) === 0 ? (fu(0), !1) : !0;
    }
    function hs() {
      if (xt !== null) {
        if (Yt === 0) var t = xt.return;
        else (t = xt), (bn = vl = null), Rc(t), (aa = null), (eu = 0), (t = xt);
        for (; t !== null; ) Gh(t.alternate, t), (t = t.return);
        xt = null;
      }
    }
    function da(t, e) {
      var n = t.timeoutHandle;
      n !== -1 && ((t.timeoutHandle = -1), z0(n)),
        (n = t.cancelPendingCommit),
        n !== null && ((t.cancelPendingCommit = null), n()),
        hs(),
        (kt = t),
        (xt = n = gn(t.current, null)),
        (Nt = e),
        (Yt = 0),
        (qe = null),
        (Jn = !1),
        (ca = Un(t, e)),
        (is = !1),
        (sa = ke = rs = Al = kn = ne = 0),
        (ze = su = null),
        (cs = !1),
        (e & 8) !== 0 && (e |= e & 32);
      var l = t.entangledLanes;
      if (l !== 0)
        for (t = t.entanglements, l &= e; 0 < l; ) {
          var u = 31 - Jt(l),
            i = 1 << u;
          (e |= t[u]), (l &= ~i);
        }
      return (xn = e), Wu(), n;
    }
    function rm(t, e) {
      (At = null),
        (_.H = vi),
        e === Ka || e === ri
          ? ((e = wd()), (Yt = 3))
          : e === Ed
            ? ((e = wd()), (Yt = 4))
            : (Yt =
                e === Mh
                  ? 8
                  : e !== null &&
                      typeof e == "object" &&
                      typeof e.then == "function"
                    ? 6
                    : 1),
        (qe = e),
        xt === null && ((ne = 1), Ti(t, Xe(e, t.current)));
    }
    function cm() {
      var t = _.H;
      return (_.H = vi), t === null ? vi : t;
    }
    function sm() {
      var t = _.A;
      return (_.A = f0), t;
    }
    function ms() {
      (ne = 4),
        Jn || ((Nt & 4194048) !== Nt && Je.current !== null) || (ca = !0),
        ((kn & 134217727) === 0 && (Al & 134217727) === 0) ||
          kt === null ||
          In(kt, Nt, ke, !1);
    }
    function gs(t, e, n) {
      var l = Gt;
      Gt |= 2;
      var u = cm(),
        i = sm();
      (kt !== t || Nt !== e) && ((Oi = null), da(t, e)), (e = !1);
      var o = ne;
      t: do
        try {
          if (Yt !== 0 && xt !== null) {
            var d = xt,
              v = qe;
            switch (Yt) {
              case 8:
                hs(), (o = 6);
                break t;
              case 3:
              case 2:
              case 9:
              case 6:
                Je.current === null && (e = !0);
                var D = Yt;
                if (((Yt = 0), (qe = null), ha(t, d, v, D), n && ca)) {
                  o = 0;
                  break t;
                }
                break;
              default:
                (D = Yt), (Yt = 0), (qe = null), ha(t, d, v, D);
            }
          }
          m0(), (o = ne);
          break;
        } catch (B) {
          rm(t, B);
        }
      while (!0);
      return (
        e && t.shellSuspendCounter++,
        (bn = vl = null),
        (Gt = l),
        (_.H = u),
        (_.A = i),
        xt === null && ((kt = null), (Nt = 0), Wu()),
        o
      );
    }
    function m0() {
      for (; xt !== null; ) om(xt);
    }
    function g0(t, e) {
      var n = Gt;
      Gt |= 2;
      var l = cm(),
        u = sm();
      kt !== t || Nt !== e
        ? ((Oi = null), (Di = Ee() + 500), da(t, e))
        : (ca = Un(t, e));
      t: do
        try {
          if (Yt !== 0 && xt !== null) {
            e = xt;
            var i = qe;
            e: switch (Yt) {
              case 1:
                (Yt = 0), (qe = null), ha(t, e, i, 1);
                break;
              case 2:
              case 9:
                if (Td(i)) {
                  (Yt = 0), (qe = null), fm(e);
                  break;
                }
                (e = function () {
                  (Yt !== 2 && Yt !== 9) || kt !== t || (Yt = 7), sn(t);
                }),
                  i.then(e, e);
                break t;
              case 3:
                Yt = 7;
                break t;
              case 4:
                Yt = 5;
                break t;
              case 7:
                Td(i)
                  ? ((Yt = 0), (qe = null), fm(e))
                  : ((Yt = 0), (qe = null), ha(t, e, i, 7));
                break;
              case 5:
                var o = null;
                switch (xt.tag) {
                  case 26:
                    o = xt.memoizedState;
                  case 5:
                  case 27:
                    var d = xt;
                    if (!o || Km(o)) {
                      (Yt = 0), (qe = null);
                      var v = d.sibling;
                      if (v !== null) xt = v;
                      else {
                        var D = d.return;
                        D !== null ? ((xt = D), zi(D)) : (xt = null);
                      }
                      break e;
                    }
                }
                (Yt = 0), (qe = null), ha(t, e, i, 5);
                break;
              case 6:
                (Yt = 0), (qe = null), ha(t, e, i, 6);
                break;
              case 8:
                hs(), (ne = 6);
                break t;
              default:
                throw Error(c(462));
            }
          }
          y0();
          break;
        } catch (B) {
          rm(t, B);
        }
      while (!0);
      return (
        (bn = vl = null),
        (_.H = l),
        (_.A = u),
        (Gt = n),
        xt !== null ? 0 : ((kt = null), (Nt = 0), Wu(), ne)
      );
    }
    function y0() {
      for (; xt !== null && !zr(); ) om(xt);
    }
    function om(t) {
      var e = qh(t.alternate, t, xn);
      (t.memoizedProps = t.pendingProps), e === null ? zi(t) : (xt = e);
    }
    function fm(t) {
      var e = t,
        n = e.alternate;
      switch (e.tag) {
        case 15:
        case 0:
          e = zh(n, e, e.pendingProps, e.type, void 0, Nt);
          break;
        case 11:
          e = zh(n, e, e.pendingProps, e.type.render, e.ref, Nt);
          break;
        case 5:
          Rc(e);
        default:
          Gh(n, e), (e = xt = dd(e, xn)), (e = qh(n, e, xn));
      }
      (t.memoizedProps = t.pendingProps), e === null ? zi(t) : (xt = e);
    }
    function ha(t, e, n, l) {
      (bn = vl = null), Rc(e), (aa = null), (eu = 0);
      var u = e.return;
      try {
        if (u0(t, u, e, n, Nt)) {
          (ne = 1), Ti(t, Xe(n, t.current)), (xt = null);
          return;
        }
      } catch (i) {
        if (u !== null) throw ((xt = u), i);
        (ne = 1), Ti(t, Xe(n, t.current)), (xt = null);
        return;
      }
      e.flags & 32768
        ? (Lt || l === 1
            ? (t = !0)
            : ca || (Nt & 536870912) !== 0
              ? (t = !1)
              : ((Jn = t = !0),
                (l === 2 || l === 9 || l === 3 || l === 6) &&
                  ((l = Je.current),
                  l !== null && l.tag === 13 && (l.flags |= 16384))),
          dm(e, t))
        : zi(e);
    }
    function zi(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          dm(e, Jn);
          return;
        }
        t = e.return;
        var n = r0(e.alternate, e, xn);
        if (n !== null) {
          xt = n;
          return;
        }
        if (((e = e.sibling), e !== null)) {
          xt = e;
          return;
        }
        xt = e = t;
      } while (e !== null);
      ne === 0 && (ne = 5);
    }
    function dm(t, e) {
      do {
        var n = c0(t.alternate, t);
        if (n !== null) {
          (n.flags &= 32767), (xt = n);
          return;
        }
        if (
          ((n = t.return),
          n !== null &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !e && ((t = t.sibling), t !== null))
        ) {
          xt = t;
          return;
        }
        xt = t = n;
      } while (t !== null);
      (ne = 6), (xt = null);
    }
    function hm(t, e, n, l, u, i, o, d, v) {
      t.cancelPendingCommit = null;
      do Ni();
      while (ve !== 0);
      if ((Gt & 6) !== 0) throw Error(c(327));
      if (e !== null) {
        if (e === t.current) throw Error(c(177));
        if (
          ((i = e.lanes | e.childLanes),
          (i |= uc),
          Oa(t, n, i, o, d, v),
          t === kt && ((xt = kt = null), (Nt = 0)),
          (oa = e),
          (Fn = t),
          (fa = n),
          (os = i),
          (fs = u),
          (lm = l),
          (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
            ? ((t.callbackNode = null),
              (t.callbackPriority = 0),
              S0(_e, function () {
                return bm(), null;
              }))
            : ((t.callbackNode = null), (t.callbackPriority = 0)),
          (l = (e.flags & 13878) !== 0),
          (e.subtreeFlags & 13878) !== 0 || l)
        ) {
          (l = _.T), (_.T = null), (u = W.p), (W.p = 2), (o = Gt), (Gt |= 4);
          try {
            s0(t, e, n);
          } finally {
            (Gt = o), (W.p = u), (_.T = l);
          }
        }
        (ve = 1), mm(), gm(), ym();
      }
    }
    function mm() {
      if (ve === 1) {
        ve = 0;
        var t = Fn,
          e = oa,
          n = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || n) {
          (n = _.T), (_.T = null);
          var l = W.p;
          W.p = 2;
          var u = Gt;
          Gt |= 4;
          try {
            Fh(e, t);
            var i = _s,
              o = nd(t.containerInfo),
              d = i.focusedElem,
              v = i.selectionRange;
            if (
              o !== d &&
              d &&
              d.ownerDocument &&
              ed(d.ownerDocument.documentElement, d)
            ) {
              if (v !== null && tc(d)) {
                var D = v.start,
                  B = v.end;
                if ((B === void 0 && (B = D), "selectionStart" in d))
                  (d.selectionStart = D),
                    (d.selectionEnd = Math.min(B, d.value.length));
                else {
                  var Y = d.ownerDocument || document,
                    R = (Y && Y.defaultView) || window;
                  if (R.getSelection) {
                    var N = R.getSelection(),
                      vt = d.textContent.length,
                      dt = Math.min(v.start, vt),
                      Xt = v.end === void 0 ? dt : Math.min(v.end, vt);
                    !N.extend && dt > Xt && ((o = Xt), (Xt = dt), (dt = o));
                    var M = td(d, dt),
                      T = td(d, Xt);
                    if (
                      M &&
                      T &&
                      (N.rangeCount !== 1 ||
                        N.anchorNode !== M.node ||
                        N.anchorOffset !== M.offset ||
                        N.focusNode !== T.node ||
                        N.focusOffset !== T.offset)
                    ) {
                      var x = Y.createRange();
                      x.setStart(M.node, M.offset),
                        N.removeAllRanges(),
                        dt > Xt
                          ? (N.addRange(x), N.extend(T.node, T.offset))
                          : (x.setEnd(T.node, T.offset), N.addRange(x));
                    }
                  }
                }
              }
              for (Y = [], N = d; (N = N.parentNode); )
                N.nodeType === 1 &&
                  Y.push({ element: N, left: N.scrollLeft, top: N.scrollTop });
              for (
                typeof d.focus == "function" && d.focus(), d = 0;
                d < Y.length;
                d++
              ) {
                var G = Y[d];
                (G.element.scrollLeft = G.left), (G.element.scrollTop = G.top);
              }
            }
            (Qi = !!xs), (_s = xs = null);
          } finally {
            (Gt = u), (W.p = l), (_.T = n);
          }
        }
        (t.current = e), (ve = 2);
      }
    }
    function gm() {
      if (ve === 2) {
        ve = 0;
        var t = Fn,
          e = oa,
          n = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || n) {
          (n = _.T), (_.T = null);
          var l = W.p;
          W.p = 2;
          var u = Gt;
          Gt |= 4;
          try {
            Kh(t, e.alternate, e);
          } finally {
            (Gt = u), (W.p = l), (_.T = n);
          }
        }
        ve = 3;
      }
    }
    function ym() {
      if (ve === 4 || ve === 3) {
        (ve = 0), Nr();
        var t = Fn,
          e = oa,
          n = fa,
          l = lm;
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? (ve = 5)
          : ((ve = 0), (oa = Fn = null), vm(t, t.pendingLanes));
        var u = t.pendingLanes;
        if (
          (u === 0 && ($n = null),
          h(n),
          (e = e.stateNode),
          de && typeof de.onCommitFiberRoot == "function")
        )
          try {
            de.onCommitFiberRoot(
              Mt,
              e,
              void 0,
              (e.current.flags & 128) === 128,
            );
          } catch {}
        if (l !== null) {
          (e = _.T), (u = W.p), (W.p = 2), (_.T = null);
          try {
            for (var i = t.onRecoverableError, o = 0; o < l.length; o++) {
              var d = l[o];
              i(d.value, { componentStack: d.stack });
            }
          } finally {
            (_.T = e), (W.p = u);
          }
        }
        (fa & 3) !== 0 && Ni(),
          sn(t),
          (u = t.pendingLanes),
          (n & 4194090) !== 0 && (u & 42) !== 0
            ? t === ds
              ? ou++
              : ((ou = 0), (ds = t))
            : (ou = 0),
          fu(0);
      }
    }
    function vm(t, e) {
      (t.pooledCacheLanes &= e) === 0 &&
        ((e = t.pooledCache), e != null && ((t.pooledCache = null), Qa(e)));
    }
    function Ni(t) {
      return mm(), gm(), ym(), bm();
    }
    function bm() {
      if (ve !== 5) return !1;
      var t = Fn,
        e = os;
      os = 0;
      var n = h(fa),
        l = _.T,
        u = W.p;
      try {
        (W.p = 32 > n ? 32 : n), (_.T = null), (n = fs), (fs = null);
        var i = Fn,
          o = fa;
        if (((ve = 0), (oa = Fn = null), (fa = 0), (Gt & 6) !== 0))
          throw Error(c(331));
        var d = Gt;
        if (
          ((Gt |= 4),
          em(i.current),
          Wh(i, i.current, o, n),
          (Gt = d),
          fu(0, !1),
          de && typeof de.onPostCommitFiberRoot == "function")
        )
          try {
            de.onPostCommitFiberRoot(Mt, i);
          } catch {}
        return !0;
      } finally {
        (W.p = u), (_.T = l), vm(t, e);
      }
    }
    function pm(t, e, n) {
      (e = Xe(n, e)),
        (e = Qc(t.stateNode, e, 2)),
        (t = Yn(t, e, 2)),
        t !== null && (ln(t, 2), sn(t));
    }
    function Zt(t, e, n) {
      if (t.tag === 3) pm(t, t, n);
      else
        for (; e !== null; ) {
          if (e.tag === 3) {
            pm(e, t, n);
            break;
          } else if (e.tag === 1) {
            var l = e.stateNode;
            if (
              typeof e.type.getDerivedStateFromError == "function" ||
              (typeof l.componentDidCatch == "function" &&
                ($n === null || !$n.has(l)))
            ) {
              (t = Xe(n, t)),
                (n = Ah(2)),
                (l = Yn(e, n, 2)),
                l !== null && (wh(n, l, e, t), ln(l, 2), sn(l));
              break;
            }
          }
          e = e.return;
        }
    }
    function ys(t, e, n) {
      var l = t.pingCache;
      if (l === null) {
        l = t.pingCache = new d0();
        var u = new Set();
        l.set(e, u);
      } else (u = l.get(e)), u === void 0 && ((u = new Set()), l.set(e, u));
      u.has(n) ||
        ((is = !0), u.add(n), (t = v0.bind(null, t, e, n)), e.then(t, t));
    }
    function v0(t, e, n) {
      var l = t.pingCache;
      l !== null && l.delete(e),
        (t.pingedLanes |= t.suspendedLanes & n),
        (t.warmLanes &= ~n),
        kt === t &&
          (Nt & n) === n &&
          (ne === 4 || (ne === 3 && (Nt & 62914560) === Nt && 300 > Ee() - ss)
            ? (Gt & 2) === 0 && da(t, 0)
            : (rs |= n),
          sa === Nt && (sa = 0)),
        sn(t);
    }
    function Sm(t, e) {
      e === 0 && (e = ql()), (t = kl(t, e)), t !== null && (ln(t, e), sn(t));
    }
    function b0(t) {
      var e = t.memoizedState,
        n = 0;
      e !== null && (n = e.retryLane), Sm(t, n);
    }
    function p0(t, e) {
      var n = 0;
      switch (t.tag) {
        case 13:
          var l = t.stateNode,
            u = t.memoizedState;
          u !== null && (n = u.retryLane);
          break;
        case 19:
          l = t.stateNode;
          break;
        case 22:
          l = t.stateNode._retryCache;
          break;
        default:
          throw Error(c(314));
      }
      l !== null && l.delete(e), Sm(t, n);
    }
    function S0(t, e) {
      return Nn(t, e);
    }
    var Ci = null,
      ma = null,
      vs = !1,
      Ui = !1,
      bs = !1,
      wl = 0;
    function sn(t) {
      t !== ma &&
        t.next === null &&
        (ma === null ? (Ci = ma = t) : (ma = ma.next = t)),
        (Ui = !0),
        vs || ((vs = !0), T0());
    }
    function fu(t, e) {
      if (!bs && Ui) {
        bs = !0;
        do
          for (var n = !1, l = Ci; l !== null; ) {
            if (t !== 0) {
              var u = l.pendingLanes;
              if (u === 0) var i = 0;
              else {
                var o = l.suspendedLanes,
                  d = l.pingedLanes;
                (i = (1 << (31 - Jt(42 | t) + 1)) - 1),
                  (i &= u & ~(o & ~d)),
                  (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0);
              }
              i !== 0 && ((n = !0), wm(l, i));
            } else
              (i = Nt),
                (i = Cn(
                  l,
                  l === kt ? i : 0,
                  l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
                )),
                (i & 3) === 0 || Un(l, i) || ((n = !0), wm(l, i));
            l = l.next;
          }
        while (n);
        bs = !1;
      }
    }
    function E0() {
      Em();
    }
    function Em() {
      Ui = vs = !1;
      var t = 0;
      wl !== 0 && (R0() && (t = wl), (wl = 0));
      for (var e = Ee(), n = null, l = Ci; l !== null; ) {
        var u = l.next,
          i = Tm(l, e);
        i === 0
          ? ((l.next = null),
            n === null ? (Ci = u) : (n.next = u),
            u === null && (ma = n))
          : ((n = l), (t !== 0 || (i & 3) !== 0) && (Ui = !0)),
          (l = u);
      }
      fu(t);
    }
    function Tm(t, e) {
      for (
        var n = t.suspendedLanes,
          l = t.pingedLanes,
          u = t.expirationTimes,
          i = t.pendingLanes & -62914561;
        0 < i;

      ) {
        var o = 31 - Jt(i),
          d = 1 << o,
          v = u[o];
        v === -1
          ? ((d & n) === 0 || (d & l) !== 0) && (u[o] = Ll(d, e))
          : v <= e && (t.expiredLanes |= d),
          (i &= ~d);
      }
      if (
        ((e = kt),
        (n = Nt),
        (n = Cn(
          t,
          t === e ? n : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
        )),
        (l = t.callbackNode),
        n === 0 ||
          (t === e && (Yt === 2 || Yt === 9)) ||
          t.cancelPendingCommit !== null)
      )
        return (
          l !== null && l !== null && Ma(l),
          (t.callbackNode = null),
          (t.callbackPriority = 0)
        );
      if ((n & 3) === 0 || Un(t, n)) {
        if (((e = n & -n), e === t.callbackPriority)) return e;
        switch ((l !== null && Ma(l), h(n))) {
          case 2:
          case 8:
            n = Ye;
            break;
          case 32:
            n = _e;
            break;
          case 268435456:
            n = xa;
            break;
          default:
            n = _e;
        }
        return (
          (l = Am.bind(null, t)),
          (n = Nn(n, l)),
          (t.callbackPriority = e),
          (t.callbackNode = n),
          e
        );
      }
      return (
        l !== null && l !== null && Ma(l),
        (t.callbackPriority = 2),
        (t.callbackNode = null),
        2
      );
    }
    function Am(t, e) {
      if (ve !== 0 && ve !== 5)
        return (t.callbackNode = null), (t.callbackPriority = 0), null;
      var n = t.callbackNode;
      if (Ni() && t.callbackNode !== n) return null;
      var l = Nt;
      return (
        (l = Cn(
          t,
          t === kt ? l : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
        )),
        l === 0
          ? null
          : (um(t, l, e),
            Tm(t, Ee()),
            t.callbackNode != null && t.callbackNode === n
              ? Am.bind(null, t)
              : null)
      );
    }
    function wm(t, e) {
      if (Ni()) return null;
      um(t, e, !0);
    }
    function T0() {
      N0(function () {
        (Gt & 6) !== 0 ? Nn(Ul, E0) : Em();
      });
    }
    function ps() {
      return wl === 0 && (wl = cl()), wl;
    }
    function Mm(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean"
        ? null
        : typeof t == "function"
          ? t
          : Zu("" + t);
    }
    function xm(t, e) {
      var n = e.ownerDocument.createElement("input");
      return (
        (n.name = e.name),
        (n.value = e.value),
        t.id && n.setAttribute("form", t.id),
        e.parentNode.insertBefore(n, e),
        (t = new FormData(t)),
        n.parentNode.removeChild(n),
        t
      );
    }
    function A0(t, e, n, l, u) {
      if (e === "submit" && n && n.stateNode === u) {
        var i = Mm((u[q] || null).action),
          o = l.submitter;
        o &&
          ((e = (e = o[q] || null)
            ? Mm(e.formAction)
            : o.getAttribute("formAction")),
          e !== null && ((i = e), (o = null)));
        var d = new $u("action", "action", null, l, u);
        t.push({
          event: d,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (l.defaultPrevented) {
                  if (wl !== 0) {
                    var v = o ? xm(u, o) : new FormData(u);
                    Gc(
                      n,
                      { pending: !0, data: v, method: u.method, action: i },
                      null,
                      v,
                    );
                  }
                } else
                  typeof i == "function" &&
                    (d.preventDefault(),
                    (v = o ? xm(u, o) : new FormData(u)),
                    Gc(
                      n,
                      { pending: !0, data: v, method: u.method, action: i },
                      i,
                      v,
                    ));
              },
              currentTarget: u,
            },
          ],
        });
      }
    }
    for (var Ss = 0; Ss < ac.length; Ss++) {
      var Es = ac[Ss],
        w0 = Es.toLowerCase(),
        M0 = Es[0].toUpperCase() + Es.slice(1);
      Pe(w0, "on" + M0);
    }
    Pe(ud, "onAnimationEnd"),
      Pe(id, "onAnimationIteration"),
      Pe(rd, "onAnimationStart"),
      Pe("dblclick", "onDoubleClick"),
      Pe("focusin", "onFocus"),
      Pe("focusout", "onBlur"),
      Pe(jp, "onTransitionRun"),
      Pe(Xp, "onTransitionStart"),
      Pe(Qp, "onTransitionCancel"),
      Pe(cd, "onTransitionEnd"),
      ie("onMouseEnter", ["mouseout", "mouseover"]),
      ie("onMouseLeave", ["mouseout", "mouseover"]),
      ie("onPointerEnter", ["pointerout", "pointerover"]),
      ie("onPointerLeave", ["pointerout", "pointerover"]),
      Ne(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " ",
        ),
      ),
      Ne(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " ",
        ),
      ),
      Ne("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
      Ne(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" "),
      ),
      Ne(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" "),
      ),
      Ne(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(
          " ",
        ),
      );
    var du =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " ",
        ),
      x0 = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(du),
      );
    function _m(t, e) {
      e = (e & 4) !== 0;
      for (var n = 0; n < t.length; n++) {
        var l = t[n],
          u = l.event;
        l = l.listeners;
        t: {
          var i = void 0;
          if (e)
            for (var o = l.length - 1; 0 <= o; o--) {
              var d = l[o],
                v = d.instance,
                D = d.currentTarget;
              if (((d = d.listener), v !== i && u.isPropagationStopped()))
                break t;
              (i = d), (u.currentTarget = D);
              try {
                i(u);
              } catch (B) {
                Ei(B);
              }
              (u.currentTarget = null), (i = v);
            }
          else
            for (o = 0; o < l.length; o++) {
              if (
                ((d = l[o]),
                (v = d.instance),
                (D = d.currentTarget),
                (d = d.listener),
                v !== i && u.isPropagationStopped())
              )
                break t;
              (i = d), (u.currentTarget = D);
              try {
                i(u);
              } catch (B) {
                Ei(B);
              }
              (u.currentTarget = null), (i = v);
            }
        }
      }
    }
    function _t(t, e) {
      var n = e[P];
      n === void 0 && (n = e[P] = new Set());
      var l = t + "__bubble";
      n.has(l) || (Dm(e, t, 2, !1), n.add(l));
    }
    function Ts(t, e, n) {
      var l = 0;
      e && (l |= 4), Dm(n, t, l, e);
    }
    var Hi = "_reactListening" + Math.random().toString(36).slice(2);
    function As(t) {
      if (!t[Hi]) {
        (t[Hi] = !0),
          Qt.forEach(function (n) {
            n !== "selectionchange" &&
              (x0.has(n) || Ts(n, !1, t), Ts(n, !0, t));
          });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[Hi] || ((e[Hi] = !0), Ts("selectionchange", !1, e));
      }
    }
    function Dm(t, e, n, l) {
      switch (Wm(e)) {
        case 2:
          var u = P0;
          break;
        case 8:
          u = t1;
          break;
        default:
          u = qs;
      }
      (n = u.bind(null, e, n, t)),
        (u = void 0),
        !Zr ||
          (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
          (u = !0),
        l
          ? u !== void 0
            ? t.addEventListener(e, n, { capture: !0, passive: u })
            : t.addEventListener(e, n, !0)
          : u !== void 0
            ? t.addEventListener(e, n, { passive: u })
            : t.addEventListener(e, n, !1);
    }
    function ws(t, e, n, l, u) {
      var i = l;
      if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
        t: for (;;) {
          if (l === null) return;
          var o = l.tag;
          if (o === 3 || o === 4) {
            var d = l.stateNode.containerInfo;
            if (d === u) break;
            if (o === 4)
              for (o = l.return; o !== null; ) {
                var v = o.tag;
                if ((v === 3 || v === 4) && o.stateNode.containerInfo === u)
                  return;
                o = o.return;
              }
            for (; d !== null; ) {
              if (((o = zt(d)), o === null)) return;
              if (((v = o.tag), v === 5 || v === 6 || v === 26 || v === 27)) {
                l = i = o;
                continue t;
              }
              d = d.parentNode;
            }
          }
          l = l.return;
        }
      Hf(function () {
        var D = i,
          B = Xr(n),
          Y = [];
        t: {
          var R = sd.get(t);
          if (R !== void 0) {
            var N = $u,
              vt = t;
            switch (t) {
              case "keypress":
                if (Ju(n) === 0) break t;
              case "keydown":
              case "keyup":
                N = Sp;
                break;
              case "focusin":
                (vt = "focus"), (N = $r);
                break;
              case "focusout":
                (vt = "blur"), (N = $r);
                break;
              case "beforeblur":
              case "afterblur":
                N = $r;
                break;
              case "click":
                if (n.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                N = Bf;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                N = cp;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                N = Ap;
                break;
              case ud:
              case id:
              case rd:
                N = fp;
                break;
              case cd:
                N = Mp;
                break;
              case "scroll":
              case "scrollend":
                N = ip;
                break;
              case "wheel":
                N = _p;
                break;
              case "copy":
              case "cut":
              case "paste":
                N = hp;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                N = Yf;
                break;
              case "toggle":
              case "beforetoggle":
                N = Op;
            }
            var dt = (e & 4) !== 0,
              Xt = !dt && (t === "scroll" || t === "scrollend"),
              M = dt ? (R !== null ? R + "Capture" : null) : R;
            dt = [];
            for (var T = D, x; T !== null; ) {
              var G = T;
              if (
                ((x = G.stateNode),
                (G = G.tag),
                (G !== 5 && G !== 26 && G !== 27) ||
                  x === null ||
                  M === null ||
                  ((G = za(T, M)), G != null && dt.push(hu(T, G, x))),
                Xt)
              )
                break;
              T = T.return;
            }
            0 < dt.length &&
              ((R = new N(R, vt, null, n, B)),
              Y.push({ event: R, listeners: dt }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (
              ((R = t === "mouseover" || t === "pointerover"),
              (N = t === "mouseout" || t === "pointerout"),
              R &&
                n !== jr &&
                (vt = n.relatedTarget || n.fromElement) &&
                (zt(vt) || vt[j]))
            )
              break t;
            if (
              (N || R) &&
              ((R =
                B.window === B
                  ? B
                  : (R = B.ownerDocument)
                    ? R.defaultView || R.parentWindow
                    : window),
              N
                ? ((vt = n.relatedTarget || n.toElement),
                  (N = D),
                  (vt = vt ? zt(vt) : null),
                  vt !== null &&
                    ((Xt = m(vt)),
                    (dt = vt.tag),
                    vt !== Xt || (dt !== 5 && dt !== 27 && dt !== 6)) &&
                    (vt = null))
                : ((N = null), (vt = D)),
              N !== vt)
            ) {
              if (
                ((dt = Bf),
                (G = "onMouseLeave"),
                (M = "onMouseEnter"),
                (T = "mouse"),
                (t === "pointerout" || t === "pointerover") &&
                  ((dt = Yf),
                  (G = "onPointerLeave"),
                  (M = "onPointerEnter"),
                  (T = "pointer")),
                (Xt = N == null ? R : Ft(N)),
                (x = vt == null ? R : Ft(vt)),
                (R = new dt(G, T + "leave", N, n, B)),
                (R.target = Xt),
                (R.relatedTarget = x),
                (G = null),
                zt(B) === D &&
                  ((dt = new dt(M, T + "enter", vt, n, B)),
                  (dt.target = x),
                  (dt.relatedTarget = Xt),
                  (G = dt)),
                (Xt = G),
                N && vt)
              )
                e: {
                  for (dt = N, M = vt, T = 0, x = dt; x; x = ga(x)) T++;
                  for (x = 0, G = M; G; G = ga(G)) x++;
                  for (; 0 < T - x; ) (dt = ga(dt)), T--;
                  for (; 0 < x - T; ) (M = ga(M)), x--;
                  for (; T--; ) {
                    if (dt === M || (M !== null && dt === M.alternate)) break e;
                    (dt = ga(dt)), (M = ga(M));
                  }
                  dt = null;
                }
              else dt = null;
              N !== null && Om(Y, R, N, dt, !1),
                vt !== null && Xt !== null && Om(Y, Xt, vt, dt, !0);
            }
          }
          t: {
            if (
              ((R = D ? Ft(D) : window),
              (N = R.nodeName && R.nodeName.toLowerCase()),
              N === "select" || (N === "input" && R.type === "file"))
            )
              var at = kf;
            else if (Kf(R))
              if ($f) at = Gp;
              else {
                at = qp;
                var wt = Lp;
              }
            else
              (N = R.nodeName),
                !N ||
                N.toLowerCase() !== "input" ||
                (R.type !== "checkbox" && R.type !== "radio")
                  ? D && Vr(D.elementType) && (at = kf)
                  : (at = Bp);
            if (at && (at = at(t, D))) {
              Jf(Y, at, n, B);
              break t;
            }
            wt && wt(t, R, D),
              t === "focusout" &&
                D &&
                R.type === "number" &&
                D.memoizedProps.value != null &&
                Yr(R, "number", R.value);
          }
          switch (((wt = D ? Ft(D) : window), t)) {
            case "focusin":
              (Kf(wt) || wt.contentEditable === "true") &&
                ((Zl = wt), (ec = D), (Ga = null));
              break;
            case "focusout":
              Ga = ec = Zl = null;
              break;
            case "mousedown":
              nc = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (nc = !1), ld(Y, n, B);
              break;
            case "selectionchange":
              if (Vp) break;
            case "keydown":
            case "keyup":
              ld(Y, n, B);
          }
          var ct;
          if (Ir)
            t: {
              switch (t) {
                case "compositionstart":
                  var mt = "onCompositionStart";
                  break t;
                case "compositionend":
                  mt = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  mt = "onCompositionUpdate";
                  break t;
              }
              mt = void 0;
            }
          else
            Ql
              ? Qf(t, n) && (mt = "onCompositionEnd")
              : t === "keydown" &&
                n.keyCode === 229 &&
                (mt = "onCompositionStart");
          mt &&
            (Vf &&
              n.locale !== "ko" &&
              (Ql || mt !== "onCompositionStart"
                ? mt === "onCompositionEnd" && Ql && (ct = Lf())
                : ((Ln = B),
                  (Kr = "value" in Ln ? Ln.value : Ln.textContent),
                  (Ql = !0))),
            (wt = Li(D, mt)),
            0 < wt.length &&
              ((mt = new Gf(mt, t, null, n, B)),
              Y.push({ event: mt, listeners: wt }),
              ct
                ? (mt.data = ct)
                : ((ct = Zf(n)), ct !== null && (mt.data = ct)))),
            (ct = zp ? Np(t, n) : Cp(t, n)) &&
              ((mt = Li(D, "onBeforeInput")),
              0 < mt.length &&
                ((wt = new Gf("onBeforeInput", "beforeinput", null, n, B)),
                Y.push({ event: wt, listeners: mt }),
                (wt.data = ct))),
            A0(Y, t, D, n, B);
        }
        _m(Y, e);
      });
    }
    function hu(t, e, n) {
      return { instance: t, listener: e, currentTarget: n };
    }
    function Li(t, e) {
      for (var n = e + "Capture", l = []; t !== null; ) {
        var u = t,
          i = u.stateNode;
        if (
          ((u = u.tag),
          (u !== 5 && u !== 26 && u !== 27) ||
            i === null ||
            ((u = za(t, n)),
            u != null && l.unshift(hu(t, u, i)),
            (u = za(t, e)),
            u != null && l.push(hu(t, u, i))),
          t.tag === 3)
        )
          return l;
        t = t.return;
      }
      return [];
    }
    function ga(t) {
      if (t === null) return null;
      do t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function Om(t, e, n, l, u) {
      for (var i = e._reactName, o = []; n !== null && n !== l; ) {
        var d = n,
          v = d.alternate,
          D = d.stateNode;
        if (((d = d.tag), v !== null && v === l)) break;
        (d !== 5 && d !== 26 && d !== 27) ||
          D === null ||
          ((v = D),
          u
            ? ((D = za(n, i)), D != null && o.unshift(hu(n, D, v)))
            : u || ((D = za(n, i)), D != null && o.push(hu(n, D, v)))),
          (n = n.return);
      }
      o.length !== 0 && t.push({ event: e, listeners: o });
    }
    var _0 = /\r\n?/g,
      D0 = /\u0000|\uFFFD/g;
    function Rm(t) {
      return (typeof t == "string" ? t : "" + t)
        .replace(
          _0,
          `
`,
        )
        .replace(D0, "");
    }
    function zm(t, e) {
      return (e = Rm(e)), Rm(t) === e;
    }
    function qi() {}
    function jt(t, e, n, l, u, i) {
      switch (n) {
        case "children":
          typeof l == "string"
            ? e === "body" || (e === "textarea" && l === "") || Vl(t, l)
            : (typeof l == "number" || typeof l == "bigint") &&
              e !== "body" &&
              Vl(t, "" + l);
          break;
        case "className":
          ju(t, "class", l);
          break;
        case "tabIndex":
          ju(t, "tabindex", l);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ju(t, n, l);
          break;
        case "style":
          Cf(t, l, i);
          break;
        case "data":
          if (e !== "object") {
            ju(t, "data", l);
            break;
          }
        case "src":
        case "href":
          if (l === "" && (e !== "a" || n !== "href")) {
            t.removeAttribute(n);
            break;
          }
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "symbol" ||
            typeof l == "boolean"
          ) {
            t.removeAttribute(n);
            break;
          }
          (l = Zu("" + l)), t.setAttribute(n, l);
          break;
        case "action":
        case "formAction":
          if (typeof l == "function") {
            t.setAttribute(
              n,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
            );
            break;
          } else
            typeof i == "function" &&
              (n === "formAction"
                ? (e !== "input" && jt(t, e, "name", u.name, u, null),
                  jt(t, e, "formEncType", u.formEncType, u, null),
                  jt(t, e, "formMethod", u.formMethod, u, null),
                  jt(t, e, "formTarget", u.formTarget, u, null))
                : (jt(t, e, "encType", u.encType, u, null),
                  jt(t, e, "method", u.method, u, null),
                  jt(t, e, "target", u.target, u, null)));
          if (l == null || typeof l == "symbol" || typeof l == "boolean") {
            t.removeAttribute(n);
            break;
          }
          (l = Zu("" + l)), t.setAttribute(n, l);
          break;
        case "onClick":
          l != null && (t.onclick = qi);
          break;
        case "onScroll":
          l != null && _t("scroll", t);
          break;
        case "onScrollEnd":
          l != null && _t("scrollend", t);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
            if (((n = l.__html), n != null)) {
              if (u.children != null) throw Error(c(60));
              t.innerHTML = n;
            }
          }
          break;
        case "multiple":
          t.multiple = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "muted":
          t.muted = l && typeof l != "function" && typeof l != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            l == null ||
            typeof l == "function" ||
            typeof l == "boolean" ||
            typeof l == "symbol"
          ) {
            t.removeAttribute("xlink:href");
            break;
          }
          (n = Zu("" + l)),
            t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          l != null && typeof l != "function" && typeof l != "symbol"
            ? t.setAttribute(n, "" + l)
            : t.removeAttribute(n);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          l && typeof l != "function" && typeof l != "symbol"
            ? t.setAttribute(n, "")
            : t.removeAttribute(n);
          break;
        case "capture":
        case "download":
          l === !0
            ? t.setAttribute(n, "")
            : l !== !1 &&
                l != null &&
                typeof l != "function" &&
                typeof l != "symbol"
              ? t.setAttribute(n, l)
              : t.removeAttribute(n);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          l != null &&
          typeof l != "function" &&
          typeof l != "symbol" &&
          !isNaN(l) &&
          1 <= l
            ? t.setAttribute(n, l)
            : t.removeAttribute(n);
          break;
        case "rowSpan":
        case "start":
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          isNaN(l)
            ? t.removeAttribute(n)
            : t.setAttribute(n, l);
          break;
        case "popover":
          _t("beforetoggle", t), _t("toggle", t), Vu(t, "popover", l);
          break;
        case "xlinkActuate":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
          break;
        case "xlinkArcrole":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
          break;
        case "xlinkRole":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
          break;
        case "xlinkShow":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
          break;
        case "xlinkTitle":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
          break;
        case "xlinkType":
          hn(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
          break;
        case "xmlBase":
          hn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
          break;
        case "xmlLang":
          hn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
          break;
        case "xmlSpace":
          hn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
          break;
        case "is":
          Vu(t, "is", l);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < n.length) ||
            (n[0] !== "o" && n[0] !== "O") ||
            (n[1] !== "n" && n[1] !== "N")) &&
            ((n = ap.get(n) || n), Vu(t, n, l));
      }
    }
    function Ms(t, e, n, l, u, i) {
      switch (n) {
        case "style":
          Cf(t, l, i);
          break;
        case "dangerouslySetInnerHTML":
          if (l != null) {
            if (typeof l != "object" || !("__html" in l)) throw Error(c(61));
            if (((n = l.__html), n != null)) {
              if (u.children != null) throw Error(c(60));
              t.innerHTML = n;
            }
          }
          break;
        case "children":
          typeof l == "string"
            ? Vl(t, l)
            : (typeof l == "number" || typeof l == "bigint") && Vl(t, "" + l);
          break;
        case "onScroll":
          l != null && _t("scroll", t);
          break;
        case "onScrollEnd":
          l != null && _t("scrollend", t);
          break;
        case "onClick":
          l != null && (t.onclick = qi);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!Hn.hasOwnProperty(n))
            t: {
              if (
                n[0] === "o" &&
                n[1] === "n" &&
                ((u = n.endsWith("Capture")),
                (e = n.slice(2, u ? n.length - 7 : void 0)),
                (i = t[q] || null),
                (i = i != null ? i[n] : null),
                typeof i == "function" && t.removeEventListener(e, i, u),
                typeof l == "function")
              ) {
                typeof i != "function" &&
                  i !== null &&
                  (n in t
                    ? (t[n] = null)
                    : t.hasAttribute(n) && t.removeAttribute(n)),
                  t.addEventListener(e, l, u);
                break t;
              }
              n in t
                ? (t[n] = l)
                : l === !0
                  ? t.setAttribute(n, "")
                  : Vu(t, n, l);
            }
      }
    }
    function be(t, e, n) {
      switch (e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          _t("error", t), _t("load", t);
          var l = !1,
            u = !1,
            i;
          for (i in n)
            if (n.hasOwnProperty(i)) {
              var o = n[i];
              if (o != null)
                switch (i) {
                  case "src":
                    l = !0;
                    break;
                  case "srcSet":
                    u = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(c(137, e));
                  default:
                    jt(t, e, i, o, n, null);
                }
            }
          u && jt(t, e, "srcSet", n.srcSet, n, null),
            l && jt(t, e, "src", n.src, n, null);
          return;
        case "input":
          _t("invalid", t);
          var d = (i = o = u = null),
            v = null,
            D = null;
          for (l in n)
            if (n.hasOwnProperty(l)) {
              var B = n[l];
              if (B != null)
                switch (l) {
                  case "name":
                    u = B;
                    break;
                  case "type":
                    o = B;
                    break;
                  case "checked":
                    v = B;
                    break;
                  case "defaultChecked":
                    D = B;
                    break;
                  case "value":
                    i = B;
                    break;
                  case "defaultValue":
                    d = B;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (B != null) throw Error(c(137, e));
                    break;
                  default:
                    jt(t, e, l, B, n, null);
                }
            }
          Of(t, i, d, v, D, o, u, !1), Xu(t);
          return;
        case "select":
          _t("invalid", t), (l = o = i = null);
          for (u in n)
            if (n.hasOwnProperty(u) && ((d = n[u]), d != null))
              switch (u) {
                case "value":
                  i = d;
                  break;
                case "defaultValue":
                  o = d;
                  break;
                case "multiple":
                  l = d;
                default:
                  jt(t, e, u, d, n, null);
              }
          (e = i),
            (n = o),
            (t.multiple = !!l),
            e != null ? Yl(t, !!l, e, !1) : n != null && Yl(t, !!l, n, !0);
          return;
        case "textarea":
          _t("invalid", t), (i = u = l = null);
          for (o in n)
            if (n.hasOwnProperty(o) && ((d = n[o]), d != null))
              switch (o) {
                case "value":
                  l = d;
                  break;
                case "defaultValue":
                  u = d;
                  break;
                case "children":
                  i = d;
                  break;
                case "dangerouslySetInnerHTML":
                  if (d != null) throw Error(c(91));
                  break;
                default:
                  jt(t, e, o, d, n, null);
              }
          zf(t, l, u, i), Xu(t);
          return;
        case "option":
          for (v in n)
            if (n.hasOwnProperty(v) && ((l = n[v]), l != null))
              switch (v) {
                case "selected":
                  t.selected =
                    l && typeof l != "function" && typeof l != "symbol";
                  break;
                default:
                  jt(t, e, v, l, n, null);
              }
          return;
        case "dialog":
          _t("beforetoggle", t),
            _t("toggle", t),
            _t("cancel", t),
            _t("close", t);
          break;
        case "iframe":
        case "object":
          _t("load", t);
          break;
        case "video":
        case "audio":
          for (l = 0; l < du.length; l++) _t(du[l], t);
          break;
        case "image":
          _t("error", t), _t("load", t);
          break;
        case "details":
          _t("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          _t("error", t), _t("load", t);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (D in n)
            if (n.hasOwnProperty(D) && ((l = n[D]), l != null))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, e));
                default:
                  jt(t, e, D, l, n, null);
              }
          return;
        default:
          if (Vr(e)) {
            for (B in n)
              n.hasOwnProperty(B) &&
                ((l = n[B]), l !== void 0 && Ms(t, e, B, l, n, void 0));
            return;
          }
      }
      for (d in n)
        n.hasOwnProperty(d) &&
          ((l = n[d]), l != null && jt(t, e, d, l, n, null));
    }
    function O0(t, e, n, l) {
      switch (e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var u = null,
            i = null,
            o = null,
            d = null,
            v = null,
            D = null,
            B = null;
          for (N in n) {
            var Y = n[N];
            if (n.hasOwnProperty(N) && Y != null)
              switch (N) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  v = Y;
                default:
                  l.hasOwnProperty(N) || jt(t, e, N, null, l, Y);
              }
          }
          for (var R in l) {
            var N = l[R];
            if (((Y = n[R]), l.hasOwnProperty(R) && (N != null || Y != null)))
              switch (R) {
                case "type":
                  i = N;
                  break;
                case "name":
                  u = N;
                  break;
                case "checked":
                  D = N;
                  break;
                case "defaultChecked":
                  B = N;
                  break;
                case "value":
                  o = N;
                  break;
                case "defaultValue":
                  d = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null) throw Error(c(137, e));
                  break;
                default:
                  N !== Y && jt(t, e, R, N, l, Y);
              }
          }
          Gr(t, o, d, v, D, B, i, u);
          return;
        case "select":
          N = o = d = R = null;
          for (i in n)
            if (((v = n[i]), n.hasOwnProperty(i) && v != null))
              switch (i) {
                case "value":
                  break;
                case "multiple":
                  N = v;
                default:
                  l.hasOwnProperty(i) || jt(t, e, i, null, l, v);
              }
          for (u in l)
            if (
              ((i = l[u]),
              (v = n[u]),
              l.hasOwnProperty(u) && (i != null || v != null))
            )
              switch (u) {
                case "value":
                  R = i;
                  break;
                case "defaultValue":
                  d = i;
                  break;
                case "multiple":
                  o = i;
                default:
                  i !== v && jt(t, e, u, i, l, v);
              }
          (e = d),
            (n = o),
            (l = N),
            R != null
              ? Yl(t, !!n, R, !1)
              : !!l != !!n &&
                (e != null ? Yl(t, !!n, e, !0) : Yl(t, !!n, n ? [] : "", !1));
          return;
        case "textarea":
          N = R = null;
          for (d in n)
            if (
              ((u = n[d]),
              n.hasOwnProperty(d) && u != null && !l.hasOwnProperty(d))
            )
              switch (d) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  jt(t, e, d, null, l, u);
              }
          for (o in l)
            if (
              ((u = l[o]),
              (i = n[o]),
              l.hasOwnProperty(o) && (u != null || i != null))
            )
              switch (o) {
                case "value":
                  R = u;
                  break;
                case "defaultValue":
                  N = u;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (u != null) throw Error(c(91));
                  break;
                default:
                  u !== i && jt(t, e, o, u, l, i);
              }
          Rf(t, R, N);
          return;
        case "option":
          for (var vt in n)
            if (
              ((R = n[vt]),
              n.hasOwnProperty(vt) && R != null && !l.hasOwnProperty(vt))
            )
              switch (vt) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  jt(t, e, vt, null, l, R);
              }
          for (v in l)
            if (
              ((R = l[v]),
              (N = n[v]),
              l.hasOwnProperty(v) && R !== N && (R != null || N != null))
            )
              switch (v) {
                case "selected":
                  t.selected =
                    R && typeof R != "function" && typeof R != "symbol";
                  break;
                default:
                  jt(t, e, v, R, l, N);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var dt in n)
            (R = n[dt]),
              n.hasOwnProperty(dt) &&
                R != null &&
                !l.hasOwnProperty(dt) &&
                jt(t, e, dt, null, l, R);
          for (D in l)
            if (
              ((R = l[D]),
              (N = n[D]),
              l.hasOwnProperty(D) && R !== N && (R != null || N != null))
            )
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null) throw Error(c(137, e));
                  break;
                default:
                  jt(t, e, D, R, l, N);
              }
          return;
        default:
          if (Vr(e)) {
            for (var Xt in n)
              (R = n[Xt]),
                n.hasOwnProperty(Xt) &&
                  R !== void 0 &&
                  !l.hasOwnProperty(Xt) &&
                  Ms(t, e, Xt, void 0, l, R);
            for (B in l)
              (R = l[B]),
                (N = n[B]),
                !l.hasOwnProperty(B) ||
                  R === N ||
                  (R === void 0 && N === void 0) ||
                  Ms(t, e, B, R, l, N);
            return;
          }
      }
      for (var M in n)
        (R = n[M]),
          n.hasOwnProperty(M) &&
            R != null &&
            !l.hasOwnProperty(M) &&
            jt(t, e, M, null, l, R);
      for (Y in l)
        (R = l[Y]),
          (N = n[Y]),
          !l.hasOwnProperty(Y) ||
            R === N ||
            (R == null && N == null) ||
            jt(t, e, Y, R, l, N);
    }
    var xs = null,
      _s = null;
    function Bi(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function Nm(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function Cm(t, e) {
      if (t === 0)
        switch (e) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return t === 1 && e === "foreignObject" ? 0 : t;
    }
    function Ds(t, e) {
      return (
        t === "textarea" ||
        t === "noscript" ||
        typeof e.children == "string" ||
        typeof e.children == "number" ||
        typeof e.children == "bigint" ||
        (typeof e.dangerouslySetInnerHTML == "object" &&
          e.dangerouslySetInnerHTML !== null &&
          e.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Os = null;
    function R0() {
      var t = window.event;
      return t && t.type === "popstate"
        ? t === Os
          ? !1
          : ((Os = t), !0)
        : ((Os = null), !1);
    }
    var Um = typeof setTimeout == "function" ? setTimeout : void 0,
      z0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
      Hm = typeof Promise == "function" ? Promise : void 0,
      N0 =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof Hm < "u"
            ? function (t) {
                return Hm.resolve(null).then(t).catch(C0);
              }
            : Um;
    function C0(t) {
      setTimeout(function () {
        throw t;
      });
    }
    function Wn(t) {
      return t === "head";
    }
    function Lm(t, e) {
      var n = e,
        l = 0,
        u = 0;
      do {
        var i = n.nextSibling;
        if ((t.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === "/$")) {
            if (0 < l && 8 > l) {
              n = l;
              var o = t.ownerDocument;
              if ((n & 1 && mu(o.documentElement), n & 2 && mu(o.body), n & 4))
                for (n = o.head, mu(n), o = n.firstChild; o; ) {
                  var d = o.nextSibling,
                    v = o.nodeName;
                  o[ot] ||
                    v === "SCRIPT" ||
                    v === "STYLE" ||
                    (v === "LINK" && o.rel.toLowerCase() === "stylesheet") ||
                    n.removeChild(o),
                    (o = d);
                }
            }
            if (u === 0) {
              t.removeChild(i), Tu(e);
              return;
            }
            u--;
          } else
            n === "$" || n === "$?" || n === "$!"
              ? u++
              : (l = n.charCodeAt(0) - 48);
        else l = 0;
        n = i;
      } while (n);
      Tu(e);
    }
    function Rs(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var n = e;
        switch (((e = e.nextSibling), n.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Rs(n), St(n);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (n.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(n);
      }
    }
    function U0(t, e, n, l) {
      for (; t.nodeType === 1; ) {
        var u = n;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
        } else if (l) {
          if (!t[ot])
            switch (e) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (
                  ((i = t.getAttribute("rel")),
                  i === "stylesheet" && t.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  i !== u.rel ||
                  t.getAttribute("href") !==
                    (u.href == null || u.href === "" ? null : u.href) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin) ||
                  t.getAttribute("title") !== (u.title == null ? null : u.title)
                )
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (
                  ((i = t.getAttribute("src")),
                  (i !== (u.src == null ? null : u.src) ||
                    t.getAttribute("type") !==
                      (u.type == null ? null : u.type) ||
                    t.getAttribute("crossorigin") !==
                      (u.crossOrigin == null ? null : u.crossOrigin)) &&
                    i &&
                    t.hasAttribute("async") &&
                    !t.hasAttribute("itemprop"))
                )
                  break;
                return t;
              default:
                return t;
            }
        } else if (e === "input" && t.type === "hidden") {
          var i = u.name == null ? null : "" + u.name;
          if (u.type === "hidden" && t.getAttribute("name") === i) return t;
        } else return t;
        if (((t = en(t.nextSibling)), t === null)) break;
      }
      return null;
    }
    function H0(t, e, n) {
      if (e === "") return null;
      for (; t.nodeType !== 3; )
        if (
          ((t.nodeType !== 1 ||
            t.nodeName !== "INPUT" ||
            t.type !== "hidden") &&
            !n) ||
          ((t = en(t.nextSibling)), t === null)
        )
          return null;
      return t;
    }
    function zs(t) {
      return (
        t.data === "$!" ||
        (t.data === "$?" && t.ownerDocument.readyState === "complete")
      );
    }
    function L0(t, e) {
      var n = t.ownerDocument;
      if (t.data !== "$?" || n.readyState === "complete") e();
      else {
        var l = function () {
          e(), n.removeEventListener("DOMContentLoaded", l);
        };
        n.addEventListener("DOMContentLoaded", l), (t._reactRetry = l);
      }
    }
    function en(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (
            ((e = t.data),
            e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
          )
            break;
          if (e === "/$") return null;
        }
      }
      return t;
    }
    var Ns = null;
    function qm(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "$" || n === "$!" || n === "$?") {
            if (e === 0) return t;
            e--;
          } else n === "/$" && e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Bm(t, e, n) {
      switch (((e = Bi(n)), t)) {
        case "html":
          if (((t = e.documentElement), !t)) throw Error(c(452));
          return t;
        case "head":
          if (((t = e.head), !t)) throw Error(c(453));
          return t;
        case "body":
          if (((t = e.body), !t)) throw Error(c(454));
          return t;
        default:
          throw Error(c(451));
      }
    }
    function mu(t) {
      for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
      St(t);
    }
    var $e = new Map(),
      Gm = new Set();
    function Gi(t) {
      return typeof t.getRootNode == "function"
        ? t.getRootNode()
        : t.nodeType === 9
          ? t
          : t.ownerDocument;
    }
    var _n = W.d;
    W.d = { f: q0, r: B0, D: G0, C: Y0, L: V0, m: j0, X: Q0, S: X0, M: Z0 };
    function q0() {
      var t = _n.f(),
        e = Ri();
      return t || e;
    }
    function B0(t) {
      var e = rt(t);
      e !== null && e.tag === 5 && e.type === "form" ? uh(e) : _n.r(t);
    }
    var ya = typeof document > "u" ? null : document;
    function Ym(t, e, n) {
      var l = ya;
      if (l && typeof e == "string" && e) {
        var u = je(e);
        (u = 'link[rel="' + t + '"][href="' + u + '"]'),
          typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
          Gm.has(u) ||
            (Gm.add(u),
            (t = { rel: t, crossOrigin: n, href: e }),
            l.querySelector(u) === null &&
              ((e = l.createElement("link")),
              be(e, "link", t),
              Ut(e),
              l.head.appendChild(e)));
      }
    }
    function G0(t) {
      _n.D(t), Ym("dns-prefetch", t, null);
    }
    function Y0(t, e) {
      _n.C(t, e), Ym("preconnect", t, e);
    }
    function V0(t, e, n) {
      _n.L(t, e, n);
      var l = ya;
      if (l && t && e) {
        var u = 'link[rel="preload"][as="' + je(e) + '"]';
        e === "image" && n && n.imageSrcSet
          ? ((u += '[imagesrcset="' + je(n.imageSrcSet) + '"]'),
            typeof n.imageSizes == "string" &&
              (u += '[imagesizes="' + je(n.imageSizes) + '"]'))
          : (u += '[href="' + je(t) + '"]');
        var i = u;
        switch (e) {
          case "style":
            i = va(t);
            break;
          case "script":
            i = ba(t);
        }
        $e.has(i) ||
          ((t = O(
            {
              rel: "preload",
              href: e === "image" && n && n.imageSrcSet ? void 0 : t,
              as: e,
            },
            n,
          )),
          $e.set(i, t),
          l.querySelector(u) !== null ||
            (e === "style" && l.querySelector(gu(i))) ||
            (e === "script" && l.querySelector(yu(i))) ||
            ((e = l.createElement("link")),
            be(e, "link", t),
            Ut(e),
            l.head.appendChild(e)));
      }
    }
    function j0(t, e) {
      _n.m(t, e);
      var n = ya;
      if (n && t) {
        var l = e && typeof e.as == "string" ? e.as : "script",
          u =
            'link[rel="modulepreload"][as="' +
            je(l) +
            '"][href="' +
            je(t) +
            '"]',
          i = u;
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            i = ba(t);
        }
        if (
          !$e.has(i) &&
          ((t = O({ rel: "modulepreload", href: t }, e)),
          $e.set(i, t),
          n.querySelector(u) === null)
        ) {
          switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (n.querySelector(yu(i))) return;
          }
          (l = n.createElement("link")),
            be(l, "link", t),
            Ut(l),
            n.head.appendChild(l);
        }
      }
    }
    function X0(t, e, n) {
      _n.S(t, e, n);
      var l = ya;
      if (l && t) {
        var u = Pt(l).hoistableStyles,
          i = va(t);
        e = e || "default";
        var o = u.get(i);
        if (!o) {
          var d = { loading: 0, preload: null };
          if ((o = l.querySelector(gu(i)))) d.loading = 5;
          else {
            (t = O({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
              (n = $e.get(i)) && Cs(t, n);
            var v = (o = l.createElement("link"));
            Ut(v),
              be(v, "link", t),
              (v._p = new Promise(function (D, B) {
                (v.onload = D), (v.onerror = B);
              })),
              v.addEventListener("load", function () {
                d.loading |= 1;
              }),
              v.addEventListener("error", function () {
                d.loading |= 2;
              }),
              (d.loading |= 4),
              Yi(o, e, l);
          }
          (o = { type: "stylesheet", instance: o, count: 1, state: d }),
            u.set(i, o);
        }
      }
    }
    function Q0(t, e) {
      _n.X(t, e);
      var n = ya;
      if (n && t) {
        var l = Pt(n).hoistableScripts,
          u = ba(t),
          i = l.get(u);
        i ||
          ((i = n.querySelector(yu(u))),
          i ||
            ((t = O({ src: t, async: !0 }, e)),
            (e = $e.get(u)) && Us(t, e),
            (i = n.createElement("script")),
            Ut(i),
            be(i, "link", t),
            n.head.appendChild(i)),
          (i = { type: "script", instance: i, count: 1, state: null }),
          l.set(u, i));
      }
    }
    function Z0(t, e) {
      _n.M(t, e);
      var n = ya;
      if (n && t) {
        var l = Pt(n).hoistableScripts,
          u = ba(t),
          i = l.get(u);
        i ||
          ((i = n.querySelector(yu(u))),
          i ||
            ((t = O({ src: t, async: !0, type: "module" }, e)),
            (e = $e.get(u)) && Us(t, e),
            (i = n.createElement("script")),
            Ut(i),
            be(i, "link", t),
            n.head.appendChild(i)),
          (i = { type: "script", instance: i, count: 1, state: null }),
          l.set(u, i));
      }
    }
    function Vm(t, e, n, l) {
      var u = (u = ht.current) ? Gi(u) : null;
      if (!u) throw Error(c(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof n.precedence == "string" && typeof n.href == "string"
            ? ((e = va(n.href)),
              (n = Pt(u).hoistableStyles),
              (l = n.get(e)),
              l ||
                ((l = { type: "style", instance: null, count: 0, state: null }),
                n.set(e, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            n.rel === "stylesheet" &&
            typeof n.href == "string" &&
            typeof n.precedence == "string"
          ) {
            t = va(n.href);
            var i = Pt(u).hoistableStyles,
              o = i.get(t);
            if (
              (o ||
                ((u = u.ownerDocument || u),
                (o = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                i.set(t, o),
                (i = u.querySelector(gu(t))) &&
                  !i._p &&
                  ((o.instance = i), (o.state.loading = 5)),
                $e.has(t) ||
                  ((n = {
                    rel: "preload",
                    as: "style",
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  $e.set(t, n),
                  i || K0(u, t, n, o.state))),
              e && l === null)
            )
              throw Error(c(528, ""));
            return o;
          }
          if (e && l !== null) throw Error(c(529, ""));
          return null;
        case "script":
          return (
            (e = n.async),
            (n = n.src),
            typeof n == "string" &&
            e &&
            typeof e != "function" &&
            typeof e != "symbol"
              ? ((e = ba(n)),
                (n = Pt(u).hoistableScripts),
                (l = n.get(e)),
                l ||
                  ((l = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  n.set(e, l)),
                l)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(c(444, t));
      }
    }
    function va(t) {
      return 'href="' + je(t) + '"';
    }
    function gu(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function jm(t) {
      return O({}, t, { "data-precedence": t.precedence, precedence: null });
    }
    function K0(t, e, n, l) {
      t.querySelector('link[rel="preload"][as="style"][' + e + "]")
        ? (l.loading = 1)
        : ((e = t.createElement("link")),
          (l.preload = e),
          e.addEventListener("load", function () {
            return (l.loading |= 1);
          }),
          e.addEventListener("error", function () {
            return (l.loading |= 2);
          }),
          be(e, "link", n),
          Ut(e),
          t.head.appendChild(e));
    }
    function ba(t) {
      return '[src="' + je(t) + '"]';
    }
    function yu(t) {
      return "script[async]" + t;
    }
    function Xm(t, e, n) {
      if ((e.count++, e.instance === null))
        switch (e.type) {
          case "style":
            var l = t.querySelector('style[data-href~="' + je(n.href) + '"]');
            if (l) return (e.instance = l), Ut(l), l;
            var u = O({}, n, {
              "data-href": n.href,
              "data-precedence": n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (l = (t.ownerDocument || t).createElement("style")),
              Ut(l),
              be(l, "style", u),
              Yi(l, n.precedence, t),
              (e.instance = l)
            );
          case "stylesheet":
            u = va(n.href);
            var i = t.querySelector(gu(u));
            if (i) return (e.state.loading |= 4), (e.instance = i), Ut(i), i;
            (l = jm(n)),
              (u = $e.get(u)) && Cs(l, u),
              (i = (t.ownerDocument || t).createElement("link")),
              Ut(i);
            var o = i;
            return (
              (o._p = new Promise(function (d, v) {
                (o.onload = d), (o.onerror = v);
              })),
              be(i, "link", l),
              (e.state.loading |= 4),
              Yi(i, n.precedence, t),
              (e.instance = i)
            );
          case "script":
            return (
              (i = ba(n.src)),
              (u = t.querySelector(yu(i)))
                ? ((e.instance = u), Ut(u), u)
                : ((l = n),
                  (u = $e.get(i)) && ((l = O({}, n)), Us(l, u)),
                  (t = t.ownerDocument || t),
                  (u = t.createElement("script")),
                  Ut(u),
                  be(u, "link", l),
                  t.head.appendChild(u),
                  (e.instance = u))
            );
          case "void":
            return null;
          default:
            throw Error(c(443, e.type));
        }
      else
        e.type === "stylesheet" &&
          (e.state.loading & 4) === 0 &&
          ((l = e.instance), (e.state.loading |= 4), Yi(l, n.precedence, t));
      return e.instance;
    }
    function Yi(t, e, n) {
      for (
        var l = n.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]',
          ),
          u = l.length ? l[l.length - 1] : null,
          i = u,
          o = 0;
        o < l.length;
        o++
      ) {
        var d = l[o];
        if (d.dataset.precedence === e) i = d;
        else if (i !== u) break;
      }
      i
        ? i.parentNode.insertBefore(t, i.nextSibling)
        : ((e = n.nodeType === 9 ? n.head : n),
          e.insertBefore(t, e.firstChild));
    }
    function Cs(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.title == null && (t.title = e.title);
    }
    function Us(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.integrity == null && (t.integrity = e.integrity);
    }
    var Vi = null;
    function Qm(t, e, n) {
      if (Vi === null) {
        var l = new Map(),
          u = (Vi = new Map());
        u.set(n, l);
      } else (u = Vi), (l = u.get(n)), l || ((l = new Map()), u.set(n, l));
      if (l.has(t)) return l;
      for (
        l.set(t, null), n = n.getElementsByTagName(t), u = 0;
        u < n.length;
        u++
      ) {
        var i = n[u];
        if (
          !(
            i[ot] ||
            i[w] ||
            (t === "link" && i.getAttribute("rel") === "stylesheet")
          ) &&
          i.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var o = i.getAttribute(e) || "";
          o = t + o;
          var d = l.get(o);
          d ? d.push(i) : l.set(o, [i]);
        }
      }
      return l;
    }
    function Zm(t, e, n) {
      (t = t.ownerDocument || t),
        t.head.insertBefore(
          n,
          e === "title" ? t.querySelector("head > title") : null,
        );
    }
    function J0(t, e, n) {
      if (n === 1 || e.itemProp != null) return !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof e.precedence != "string" ||
            typeof e.href != "string" ||
            e.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof e.rel != "string" ||
            typeof e.href != "string" ||
            e.href === "" ||
            e.onLoad ||
            e.onError
          )
            break;
          switch (e.rel) {
            case "stylesheet":
              return (
                (t = e.disabled), typeof e.precedence == "string" && t == null
              );
            default:
              return !0;
          }
        case "script":
          if (
            e.async &&
            typeof e.async != "function" &&
            typeof e.async != "symbol" &&
            !e.onLoad &&
            !e.onError &&
            e.src &&
            typeof e.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function Km(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    var vu = null;
    function k0() {}
    function $0(t, e, n) {
      if (vu === null) throw Error(c(475));
      var l = vu;
      if (
        e.type === "stylesheet" &&
        (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
        (e.state.loading & 4) === 0
      ) {
        if (e.instance === null) {
          var u = va(n.href),
            i = t.querySelector(gu(u));
          if (i) {
            (t = i._p),
              t !== null &&
                typeof t == "object" &&
                typeof t.then == "function" &&
                (l.count++, (l = ji.bind(l)), t.then(l, l)),
              (e.state.loading |= 4),
              (e.instance = i),
              Ut(i);
            return;
          }
          (i = t.ownerDocument || t),
            (n = jm(n)),
            (u = $e.get(u)) && Cs(n, u),
            (i = i.createElement("link")),
            Ut(i);
          var o = i;
          (o._p = new Promise(function (d, v) {
            (o.onload = d), (o.onerror = v);
          })),
            be(i, "link", n),
            (e.instance = i);
        }
        l.stylesheets === null && (l.stylesheets = new Map()),
          l.stylesheets.set(e, t),
          (t = e.state.preload) &&
            (e.state.loading & 3) === 0 &&
            (l.count++,
            (e = ji.bind(l)),
            t.addEventListener("load", e),
            t.addEventListener("error", e));
      }
    }
    function F0() {
      if (vu === null) throw Error(c(475));
      var t = vu;
      return (
        t.stylesheets && t.count === 0 && Hs(t, t.stylesheets),
        0 < t.count
          ? function (e) {
              var n = setTimeout(function () {
                if ((t.stylesheets && Hs(t, t.stylesheets), t.unsuspend)) {
                  var l = t.unsuspend;
                  (t.unsuspend = null), l();
                }
              }, 6e4);
              return (
                (t.unsuspend = e),
                function () {
                  (t.unsuspend = null), clearTimeout(n);
                }
              );
            }
          : null
      );
    }
    function ji() {
      if ((this.count--, this.count === 0)) {
        if (this.stylesheets) Hs(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          (this.unsuspend = null), t();
        }
      }
    }
    var Xi = null;
    function Hs(t, e) {
      (t.stylesheets = null),
        t.unsuspend !== null &&
          (t.count++,
          (Xi = new Map()),
          e.forEach(I0, t),
          (Xi = null),
          ji.call(t));
    }
    function I0(t, e) {
      if (!(e.state.loading & 4)) {
        var n = Xi.get(t);
        if (n) var l = n.get(null);
        else {
          (n = new Map()), Xi.set(t, n);
          for (
            var u = t.querySelectorAll(
                "link[data-precedence],style[data-precedence]",
              ),
              i = 0;
            i < u.length;
            i++
          ) {
            var o = u[i];
            (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") &&
              (n.set(o.dataset.precedence, o), (l = o));
          }
          l && n.set(null, l);
        }
        (u = e.instance),
          (o = u.getAttribute("data-precedence")),
          (i = n.get(o) || l),
          i === l && n.set(null, u),
          n.set(o, u),
          this.count++,
          (l = ji.bind(this)),
          u.addEventListener("load", l),
          u.addEventListener("error", l),
          i
            ? i.parentNode.insertBefore(u, i.nextSibling)
            : ((t = t.nodeType === 9 ? t.head : t),
              t.insertBefore(u, t.firstChild)),
          (e.state.loading |= 4);
      }
    }
    var bu = {
      $$typeof: F,
      Provider: null,
      Consumer: null,
      _currentValue: tt,
      _currentValue2: tt,
      _threadCount: 0,
    };
    function W0(t, e, n, l, u, i, o, d) {
      (this.tag = 1),
        (this.containerInfo = t),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = Da(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Da(0)),
        (this.hiddenUpdates = Da(null)),
        (this.identifierPrefix = l),
        (this.onUncaughtError = u),
        (this.onCaughtError = i),
        (this.onRecoverableError = o),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = d),
        (this.incompleteTransitions = new Map());
    }
    function Jm(t, e, n, l, u, i, o, d, v, D, B, Y) {
      return (
        (t = new W0(t, e, n, o, d, v, D, Y)),
        (e = 1),
        i === !0 && (e |= 24),
        (i = Ue(3, null, null, e)),
        (t.current = i),
        (i.stateNode = t),
        (e = yc()),
        e.refCount++,
        (t.pooledCache = e),
        e.refCount++,
        (i.memoizedState = { element: l, isDehydrated: n, cache: e }),
        Sc(i),
        t
      );
    }
    function km(t) {
      return t ? ((t = $l), t) : $l;
    }
    function $m(t, e, n, l, u, i) {
      (u = km(u)),
        l.context === null ? (l.context = u) : (l.pendingContext = u),
        (l = Gn(e)),
        (l.payload = { element: n }),
        (i = i === void 0 ? null : i),
        i !== null && (l.callback = i),
        (n = Yn(t, l, e)),
        n !== null && (Ge(n, t, e), ka(n, t, e));
    }
    function Fm(t, e) {
      if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
        var n = t.retryLane;
        t.retryLane = n !== 0 && n < e ? n : e;
      }
    }
    function Ls(t, e) {
      Fm(t, e), (t = t.alternate) && Fm(t, e);
    }
    function Im(t) {
      if (t.tag === 13) {
        var e = kl(t, 67108864);
        e !== null && Ge(e, t, 67108864), Ls(t, 67108864);
      }
    }
    var Qi = !0;
    function P0(t, e, n, l) {
      var u = _.T;
      _.T = null;
      var i = W.p;
      try {
        (W.p = 2), qs(t, e, n, l);
      } finally {
        (W.p = i), (_.T = u);
      }
    }
    function t1(t, e, n, l) {
      var u = _.T;
      _.T = null;
      var i = W.p;
      try {
        (W.p = 8), qs(t, e, n, l);
      } finally {
        (W.p = i), (_.T = u);
      }
    }
    function qs(t, e, n, l) {
      if (Qi) {
        var u = Bs(l);
        if (u === null) ws(t, e, l, Zi, n), Pm(t, l);
        else if (n1(u, t, e, n, l)) l.stopPropagation();
        else if ((Pm(t, l), e & 4 && -1 < e1.indexOf(t))) {
          for (; u !== null; ) {
            var i = rt(u);
            if (i !== null)
              switch (i.tag) {
                case 3:
                  if (
                    ((i = i.stateNode), i.current.memoizedState.isDehydrated)
                  ) {
                    var o = Me(i.pendingLanes);
                    if (o !== 0) {
                      var d = i;
                      for (d.pendingLanes |= 2, d.entangledLanes |= 2; o; ) {
                        var v = 1 << (31 - Jt(o));
                        (d.entanglements[1] |= v), (o &= ~v);
                      }
                      sn(i), (Gt & 6) === 0 && ((Di = Ee() + 500), fu(0));
                    }
                  }
                  break;
                case 13:
                  (d = kl(i, 2)), d !== null && Ge(d, i, 2), Ri(), Ls(i, 2);
              }
            if (((i = Bs(l)), i === null && ws(t, e, l, Zi, n), i === u)) break;
            u = i;
          }
          u !== null && l.stopPropagation();
        } else ws(t, e, l, null, n);
      }
    }
    function Bs(t) {
      return (t = Xr(t)), Gs(t);
    }
    var Zi = null;
    function Gs(t) {
      if (((Zi = null), (t = zt(t)), t !== null)) {
        var e = m(t);
        if (e === null) t = null;
        else {
          var n = e.tag;
          if (n === 13) {
            if (((t = g(e)), t !== null)) return t;
            t = null;
          } else if (n === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated)
              return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return (Zi = t), null;
    }
    function Wm(t) {
      switch (t) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (Cr()) {
            case Ul:
              return 2;
            case Ye:
              return 8;
            case _e:
            case qu:
              return 32;
            case xa:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Ys = !1,
      Pn = null,
      tl = null,
      el = null,
      pu = new Map(),
      Su = new Map(),
      nl = [],
      e1 =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " ",
        );
    function Pm(t, e) {
      switch (t) {
        case "focusin":
        case "focusout":
          Pn = null;
          break;
        case "dragenter":
        case "dragleave":
          tl = null;
          break;
        case "mouseover":
        case "mouseout":
          el = null;
          break;
        case "pointerover":
        case "pointerout":
          pu.delete(e.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Su.delete(e.pointerId);
      }
    }
    function Eu(t, e, n, l, u, i) {
      return t === null || t.nativeEvent !== i
        ? ((t = {
            blockedOn: e,
            domEventName: n,
            eventSystemFlags: l,
            nativeEvent: i,
            targetContainers: [u],
          }),
          e !== null && ((e = rt(e)), e !== null && Im(e)),
          t)
        : ((t.eventSystemFlags |= l),
          (e = t.targetContainers),
          u !== null && e.indexOf(u) === -1 && e.push(u),
          t);
    }
    function n1(t, e, n, l, u) {
      switch (e) {
        case "focusin":
          return (Pn = Eu(Pn, t, e, n, l, u)), !0;
        case "dragenter":
          return (tl = Eu(tl, t, e, n, l, u)), !0;
        case "mouseover":
          return (el = Eu(el, t, e, n, l, u)), !0;
        case "pointerover":
          var i = u.pointerId;
          return pu.set(i, Eu(pu.get(i) || null, t, e, n, l, u)), !0;
        case "gotpointercapture":
          return (
            (i = u.pointerId),
            Su.set(i, Eu(Su.get(i) || null, t, e, n, l, u)),
            !0
          );
      }
      return !1;
    }
    function tg(t) {
      var e = zt(t.target);
      if (e !== null) {
        var n = m(e);
        if (n !== null) {
          if (((e = n.tag), e === 13)) {
            if (((e = g(n)), e !== null)) {
              (t.blockedOn = e),
                A(t.priority, function () {
                  if (n.tag === 13) {
                    var l = Be();
                    l = Ra(l);
                    var u = kl(n, l);
                    u !== null && Ge(u, n, l), Ls(n, l);
                  }
                });
              return;
            }
          } else if (
            e === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function Ki(t) {
      if (t.blockedOn !== null) return !1;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var n = Bs(t.nativeEvent);
        if (n === null) {
          n = t.nativeEvent;
          var l = new n.constructor(n.type, n);
          (jr = l), n.target.dispatchEvent(l), (jr = null);
        } else return (e = rt(n)), e !== null && Im(e), (t.blockedOn = n), !1;
        e.shift();
      }
      return !0;
    }
    function eg(t, e, n) {
      Ki(t) && n.delete(e);
    }
    function l1() {
      (Ys = !1),
        Pn !== null && Ki(Pn) && (Pn = null),
        tl !== null && Ki(tl) && (tl = null),
        el !== null && Ki(el) && (el = null),
        pu.forEach(eg),
        Su.forEach(eg);
    }
    function Ji(t, e) {
      t.blockedOn === e &&
        ((t.blockedOn = null),
        Ys ||
          ((Ys = !0),
          a.unstable_scheduleCallback(a.unstable_NormalPriority, l1)));
    }
    var ki = null;
    function ng(t) {
      ki !== t &&
        ((ki = t),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
          ki === t && (ki = null);
          for (var e = 0; e < t.length; e += 3) {
            var n = t[e],
              l = t[e + 1],
              u = t[e + 2];
            if (typeof l != "function") {
              if (Gs(l || n) === null) continue;
              break;
            }
            var i = rt(n);
            i !== null &&
              (t.splice(e, 3),
              (e -= 3),
              Gc(
                i,
                { pending: !0, data: u, method: n.method, action: l },
                l,
                u,
              ));
          }
        }));
    }
    function Tu(t) {
      function e(v) {
        return Ji(v, t);
      }
      Pn !== null && Ji(Pn, t),
        tl !== null && Ji(tl, t),
        el !== null && Ji(el, t),
        pu.forEach(e),
        Su.forEach(e);
      for (var n = 0; n < nl.length; n++) {
        var l = nl[n];
        l.blockedOn === t && (l.blockedOn = null);
      }
      for (; 0 < nl.length && ((n = nl[0]), n.blockedOn === null); )
        tg(n), n.blockedOn === null && nl.shift();
      if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
        for (l = 0; l < n.length; l += 3) {
          var u = n[l],
            i = n[l + 1],
            o = u[q] || null;
          if (typeof i == "function") o || ng(n);
          else if (o) {
            var d = null;
            if (i && i.hasAttribute("formAction")) {
              if (((u = i), (o = i[q] || null))) d = o.formAction;
              else if (Gs(u) !== null) continue;
            } else d = o.action;
            typeof d == "function"
              ? (n[l + 1] = d)
              : (n.splice(l, 3), (l -= 3)),
              ng(n);
          }
        }
    }
    function Vs(t) {
      this._internalRoot = t;
    }
    ($i.prototype.render = Vs.prototype.render =
      function (t) {
        var e = this._internalRoot;
        if (e === null) throw Error(c(409));
        var n = e.current,
          l = Be();
        $m(n, l, t, e, null, null);
      }),
      ($i.prototype.unmount = Vs.prototype.unmount =
        function () {
          var t = this._internalRoot;
          if (t !== null) {
            this._internalRoot = null;
            var e = t.containerInfo;
            $m(t.current, 2, null, t, null, null), Ri(), (e[j] = null);
          }
        });
    function $i(t) {
      this._internalRoot = t;
    }
    $i.prototype.unstable_scheduleHydration = function (t) {
      if (t) {
        var e = y();
        t = { blockedOn: null, target: t, priority: e };
        for (var n = 0; n < nl.length && e !== 0 && e < nl[n].priority; n++);
        nl.splice(n, 0, t), n === 0 && tg(t);
      }
    };
    var lg = r.version;
    if (lg !== "19.1.0") throw Error(c(527, lg, "19.1.0"));
    W.findDOMNode = function (t) {
      var e = t._reactInternals;
      if (e === void 0)
        throw typeof t.render == "function"
          ? Error(c(188))
          : ((t = Object.keys(t).join(",")), Error(c(268, t)));
      return (
        (t = b(e)),
        (t = t !== null ? p(t) : null),
        (t = t === null ? null : t.stateNode),
        t
      );
    };
    var a1 = {
      bundleType: 0,
      version: "19.1.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: _,
      reconcilerVersion: "19.1.0",
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Fi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Fi.isDisabled && Fi.supportsFiber)
        try {
          (Mt = Fi.inject(a1)), (de = Fi);
        } catch {}
    }
    return (
      (Sa.createRoot = function (t, e) {
        if (!f(t)) throw Error(c(299));
        var n = !1,
          l = "",
          u = ph,
          i = Sh,
          o = Eh,
          d = null;
        return (
          e != null &&
            (e.unstable_strictMode === !0 && (n = !0),
            e.identifierPrefix !== void 0 && (l = e.identifierPrefix),
            e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
            e.onCaughtError !== void 0 && (i = e.onCaughtError),
            e.onRecoverableError !== void 0 && (o = e.onRecoverableError),
            e.unstable_transitionCallbacks !== void 0 &&
              (d = e.unstable_transitionCallbacks)),
          (e = Jm(t, 1, !1, null, null, n, l, u, i, o, d, null)),
          (t[j] = e.current),
          As(t),
          new Vs(e)
        );
      }),
      (Sa.hydrateRoot = function (t, e, n) {
        if (!f(t)) throw Error(c(299));
        var l = !1,
          u = "",
          i = ph,
          o = Sh,
          d = Eh,
          v = null,
          D = null;
        return (
          n != null &&
            (n.unstable_strictMode === !0 && (l = !0),
            n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
            n.onUncaughtError !== void 0 && (i = n.onUncaughtError),
            n.onCaughtError !== void 0 && (o = n.onCaughtError),
            n.onRecoverableError !== void 0 && (d = n.onRecoverableError),
            n.unstable_transitionCallbacks !== void 0 &&
              (v = n.unstable_transitionCallbacks),
            n.formState !== void 0 && (D = n.formState)),
          (e = Jm(t, 1, !0, e, n ?? null, l, u, i, o, d, v, D)),
          (e.context = km(null)),
          (n = e.current),
          (l = Be()),
          (l = Ra(l)),
          (u = Gn(l)),
          (u.callback = null),
          Yn(n, u, l),
          (n = l),
          (e.current.lanes = n),
          ln(e, n),
          sn(e),
          (t[j] = e.current),
          As(t),
          new $i(e)
        );
      }),
      (Sa.version = "19.1.0"),
      Sa
    );
  }
  var ho;
  function Gg() {
    if (ho) return er.exports;
    ho = 1;
    function a() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
        } catch (r) {
          console.error(r);
        }
    }
    return a(), (er.exports = Bg()), er.exports;
  }
  var Yg = Gg();
  const Ea =
    (Sf = (pf = globalThis.browser) == null ? void 0 : pf.runtime) != null &&
    Sf.id
      ? globalThis.browser
      : globalThis.chrome;
  var rr, mo;
  function Vg() {
    if (mo) return rr;
    mo = 1;
    var a =
        /^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/,
      r = function (s) {
        return a.test(s);
      };
    return (rr = r), rr;
  }
  var jg = Vg();
  const Xg = Dn(jg);
  var Qg = (a, r, s) =>
    new Promise((c, f) => {
      var m = (b) => {
          try {
            E(s.next(b));
          } catch (p) {
            f(p);
          }
        },
        g = (b) => {
          try {
            E(s.throw(b));
          } catch (p) {
            f(p);
          }
        },
        E = (b) => (b.done ? c(b.value) : Promise.resolve(b.value).then(m, g));
      E((s = s.apply(a, r)).next());
    });
  function Zg(a) {
    return Qg(this, null, function* () {
      const { name: r, mode: s = "closed", css: c, isolateEvents: f = !1 } = a;
      if (!Xg(r))
        throw Error(
          `"${r}" is not a valid custom element name. It must be two words and kebab-case, with a few exceptions. See spec for more details: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name`,
        );
      const m = document.createElement(r),
        g = m.attachShadow({ mode: s }),
        E = document.createElement("html"),
        b = document.createElement("body"),
        p = document.createElement("head");
      if (c) {
        const O = document.createElement("style");
        "url" in c
          ? (O.textContent = yield fetch(c.url).then((k) => k.text()))
          : (O.textContent = c.textContent),
          p.appendChild(O);
      }
      return (
        E.appendChild(p),
        E.appendChild(b),
        g.appendChild(E),
        f &&
          (Array.isArray(f) ? f : ["keydown", "keyup", "keypress"]).forEach(
            (k) => {
              b.addEventListener(k, (L) => L.stopPropagation());
            },
          ),
        { parentElement: m, shadow: g, isolatedElement: b }
      );
    });
  }
  const Kg = Symbol("null");
  let Jg = 0;
  class kg extends Map {
    constructor() {
      super(),
        (this._objectHashes = new WeakMap()),
        (this._symbolHashes = new Map()),
        (this._publicKeys = new Map());
      const [r] = arguments;
      if (r != null) {
        if (typeof r[Symbol.iterator] != "function")
          throw new TypeError(
            typeof r +
              " is not iterable (cannot read property Symbol(Symbol.iterator))",
          );
        for (const [s, c] of r) this.set(s, c);
      }
    }
    _getPublicKeys(r, s = !1) {
      if (!Array.isArray(r))
        throw new TypeError("The keys parameter must be an array");
      const c = this._getPrivateKey(r, s);
      let f;
      return (
        c && this._publicKeys.has(c)
          ? (f = this._publicKeys.get(c))
          : s && ((f = [...r]), this._publicKeys.set(c, f)),
        { privateKey: c, publicKey: f }
      );
    }
    _getPrivateKey(r, s = !1) {
      const c = [];
      for (let f of r) {
        f === null && (f = Kg);
        const m =
          typeof f == "object" || typeof f == "function"
            ? "_objectHashes"
            : typeof f == "symbol"
              ? "_symbolHashes"
              : !1;
        if (!m) c.push(f);
        else if (this[m].has(f)) c.push(this[m].get(f));
        else if (s) {
          const g = `@@mkm-ref-${Jg++}@@`;
          this[m].set(f, g), c.push(g);
        } else return !1;
      }
      return JSON.stringify(c);
    }
    set(r, s) {
      const { publicKey: c } = this._getPublicKeys(r, !0);
      return super.set(c, s);
    }
    get(r) {
      const { publicKey: s } = this._getPublicKeys(r);
      return super.get(s);
    }
    has(r) {
      const { publicKey: s } = this._getPublicKeys(r);
      return super.has(s);
    }
    delete(r) {
      const { publicKey: s, privateKey: c } = this._getPublicKeys(r);
      return !!(s && super.delete(s) && this._publicKeys.delete(c));
    }
    clear() {
      super.clear(), this._symbolHashes.clear(), this._publicKeys.clear();
    }
    get [Symbol.toStringTag]() {
      return "ManyKeysMap";
    }
    get size() {
      return super.size;
    }
  }
  function cr(a) {
    if (a === null || typeof a != "object") return !1;
    const r = Object.getPrototypeOf(a);
    return (r !== null &&
      r !== Object.prototype &&
      Object.getPrototypeOf(r) !== null) ||
      Symbol.iterator in a
      ? !1
      : Symbol.toStringTag in a
        ? Object.prototype.toString.call(a) === "[object Module]"
        : !0;
  }
  function sr(a, r, s = ".", c) {
    if (!cr(r)) return sr(a, {}, s, c);
    const f = Object.assign({}, r);
    for (const m in a) {
      if (m === "__proto__" || m === "constructor") continue;
      const g = a[m];
      g != null &&
        ((c && c(f, m, g, s)) ||
          (Array.isArray(g) && Array.isArray(f[m])
            ? (f[m] = [...g, ...f[m]])
            : cr(g) && cr(f[m])
              ? (f[m] = sr(g, f[m], (s ? `${s}.` : "") + m.toString(), c))
              : (f[m] = g)));
    }
    return f;
  }
  function $g(a) {
    return (...r) => r.reduce((s, c) => sr(s, c, "", a), {});
  }
  const Fg = $g(),
    go = (a) =>
      a !== null ? { isDetected: !0, result: a } : { isDetected: !1 },
    Ig = (a) =>
      a === null ? { isDetected: !0, result: null } : { isDetected: !1 },
    Wg = () => ({
      target: globalThis.document,
      unifyProcess: !0,
      detector: go,
      observeConfigs: { childList: !0, subtree: !0, attributes: !0 },
      signal: void 0,
      customMatcher: void 0,
    }),
    Pg = (a, r) => Fg(a, r),
    or = new kg();
  function ty(a) {
    const { defaultOptions: r } = a;
    return (s, c) => {
      const {
          target: f,
          unifyProcess: m,
          observeConfigs: g,
          detector: E,
          signal: b,
          customMatcher: p,
        } = Pg(c, r),
        O = [s, f, m, g, E, b, p],
        k = or.get(O);
      if (m && k) return k;
      const L = new Promise(async (Q, $) => {
        if (b != null && b.aborted) return $(b.reason);
        const z = new MutationObserver(async (U) => {
          for (const X of U) {
            if (b != null && b.aborted) {
              z.disconnect();
              break;
            }
            const F = await yo({
              selector: s,
              target: f,
              detector: E,
              customMatcher: p,
            });
            if (F.isDetected) {
              z.disconnect(), Q(F.result);
              break;
            }
          }
        });
        b == null ||
          b.addEventListener("abort", () => (z.disconnect(), $(b.reason)), {
            once: !0,
          });
        const C = await yo({
          selector: s,
          target: f,
          detector: E,
          customMatcher: p,
        });
        if (C.isDetected) return Q(C.result);
        z.observe(f, g);
      }).finally(() => {
        or.delete(O);
      });
      return or.set(O, L), L;
    };
  }
  async function yo({ target: a, selector: r, detector: s, customMatcher: c }) {
    const f = c ? c(r) : a.querySelector(r);
    return await s(f);
  }
  const ey = ty({ defaultOptions: Wg() });
  function Au(a, ...r) {}
  const fr = {
    debug: (...a) => Au(console.debug, ...a),
    log: (...a) => Au(console.log, ...a),
    warn: (...a) => Au(console.warn, ...a),
    error: (...a) => Au(console.error, ...a),
  };
  function ny(a, r, s) {
    var c, f;
    s.position !== "inline" &&
      (s.zIndex != null && (a.style.zIndex = String(s.zIndex)),
      (a.style.overflow = "visible"),
      (a.style.position = "relative"),
      (a.style.width = "0"),
      (a.style.height = "0"),
      (a.style.display = "block"),
      r &&
        (s.position === "overlay"
          ? ((r.style.position = "absolute"),
            (c = s.alignment) != null && c.startsWith("bottom-")
              ? (r.style.bottom = "0")
              : (r.style.top = "0"),
            (f = s.alignment) != null && f.endsWith("-right")
              ? (r.style.right = "0")
              : (r.style.left = "0"))
          : ((r.style.position = "fixed"),
            (r.style.top = "0"),
            (r.style.bottom = "0"),
            (r.style.left = "0"),
            (r.style.right = "0"))));
  }
  function dr(a) {
    if (a.anchor == null) return document.body;
    let r = typeof a.anchor == "function" ? a.anchor() : a.anchor;
    return typeof r == "string"
      ? r.startsWith("/")
        ? (document.evaluate(
            r,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          ).singleNodeValue ?? void 0)
        : (document.querySelector(r) ?? void 0)
      : (r ?? void 0);
  }
  function ly(a, r) {
    var c, f;
    const s = dr(r);
    if (s == null)
      throw Error(
        "Failed to mount content script UI: could not find anchor element",
      );
    switch (r.append) {
      case void 0:
      case "last":
        s.append(a);
        break;
      case "first":
        s.prepend(a);
        break;
      case "replace":
        s.replaceWith(a);
        break;
      case "after":
        (c = s.parentElement) == null ||
          c.insertBefore(a, s.nextElementSibling);
        break;
      case "before":
        (f = s.parentElement) == null || f.insertBefore(a, s);
        break;
      default:
        r.append(s, a);
        break;
    }
  }
  function ay(a, r) {
    let s;
    const c = () => {
        s == null || s.stopAutoMount(), (s = void 0);
      },
      f = () => {
        a.mount();
      },
      m = a.remove;
    return {
      mount: f,
      remove: () => {
        c(), a.remove();
      },
      autoMount: (b) => {
        s && fr.warn("autoMount is already set."),
          (s = uy({ mount: f, unmount: m, stopAutoMount: c }, { ...r, ...b }));
      },
    };
  }
  function uy(a, r) {
    const s = new AbortController(),
      c = "explicit_stop_auto_mount",
      f = () => {
        var E;
        s.abort(c), (E = r.onStop) == null || E.call(r);
      };
    let m = typeof r.anchor == "function" ? r.anchor() : r.anchor;
    if (m instanceof Element)
      throw Error(
        "autoMount and Element anchor option cannot be combined. Avoid passing `Element` directly or `() => Element` to the anchor.",
      );
    async function g(E) {
      let b = !!dr(r);
      for (b && a.mount(); !s.signal.aborted; )
        try {
          (b = !!(await ey(E ?? "body", {
            customMatcher: () => dr(r) ?? null,
            detector: b ? Ig : go,
            signal: s.signal,
          }))),
            b ? a.mount() : (a.unmount(), r.once && a.stopAutoMount());
        } catch (p) {
          if (s.signal.aborted && s.signal.reason === c) break;
          throw p;
        }
    }
    return g(m), { stopAutoMount: f };
  }
  async function iy(a, r) {
    var O;
    const s = [];
    if (
      (r.inheritStyles ||
        s.push("/* WXT Shadow Root Reset */ body{all:initial;}"),
      r.css && s.push(r.css),
      ((O = a.options) == null ? void 0 : O.cssInjectionMode) === "ui")
    ) {
      const k = await ry();
      s.push(k.replaceAll(":root", ":host"));
    }
    const {
      isolatedElement: c,
      parentElement: f,
      shadow: m,
    } = await Zg({
      name: r.name,
      css: {
        textContent: s
          .join(
            `
`,
          )
          .trim(),
      },
      mode: r.mode ?? "open",
      isolateEvents: r.isolateEvents,
    });
    f.setAttribute("data-wxt-shadow-root", "");
    let g;
    const E = () => {
        ly(f, r), ny(f, m.querySelector("html"), r), (g = r.onMount(c, m, f));
      },
      b = () => {
        var k;
        for (
          (k = r.onRemove) == null || k.call(r, g), f.remove();
          c.lastChild;

        )
          c.removeChild(c.lastChild);
        g = void 0;
      },
      p = ay({ mount: E, remove: b }, r);
    return (
      a.onInvalidated(b),
      {
        shadow: m,
        shadowHost: f,
        uiContainer: c,
        ...p,
        get mounted() {
          return g;
        },
      }
    );
  }
  async function ry() {
    const a = Ea.runtime.getURL("/content-scripts/content.css");
    try {
      return await (await fetch(a)).text();
    } catch (r) {
      return (
        fr.warn(
          `Failed to load styles @ ${a}. Did you forget to import the stylesheet in your entrypoint?`,
          r,
        ),
        ""
      );
    }
  }
  function s1(a) {
    return a;
  }
  function cy(a) {
    if (a instanceof Error) return a.message || a.name;
    {
      console.error("Unexpected error:", a);
      const r = JSON.stringify(a);
      return r !== "{}" ? r : String(a);
    }
  }
  const vo = "__extensionStackError__";
  function sy(a) {
    return typeof a == "object" && a !== null && vo in a;
  }
  function oy(a) {
    return { [vo]: !0, message: a };
  }
  function On() {
    async function a(c, f, m) {
      const g = { type: c, payload: f };
      let E;
      if (
        (m === null
          ? (E = await chrome.runtime.sendMessage(g))
          : (E = await chrome.tabs.sendMessage(m, g)),
        sy(E))
      )
        throw new Error(E.message);
      return E;
    }
    function r(c) {
      return (f, m) => a(c, f, m);
    }
    function s(c, f, { requiredSenderTabId: m } = {}) {
      const g = (E, b, p) => {
        var O;
        if (
          !(E.type !== c || (m && ((O = b.tab) == null ? void 0 : O.id) !== m))
        )
          return (
            f(E, b)
              .then((k) => {
                p(k);
              })
              .catch((k) => {
                const L = cy(k);
                p(oy(L));
              }),
            !0
          );
      };
      return (
        chrome.runtime.onMessage.addListener(g),
        () => chrome.runtime.onMessage.removeListener(g)
      );
    }
    return { sendMessage: a, createMessageSender: r, addMessageListener: s };
  }
  const { sendMessage: fy } = On();
  async function dy() {
    await fy("ready", void 0, null);
  }
  let hr;
  function bo(a) {
    let r = hr == null ? void 0 : hr.get(a);
    return (
      r === void 0 &&
        (r = a
          .replace(/[\u200b\u00ad]/g, "")
          .trim()
          .replace(/\s+/g, " ")),
      r
    );
  }
  function po(a) {
    return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function hy(a, r) {
    const s = a.length,
      c = r.length;
    let f = 0,
      m = 0;
    const g = Array(s + 1)
      .fill(null)
      .map(() => Array(c + 1).fill(0));
    for (let E = 1; E <= s; E++)
      for (let b = 1; b <= c; b++)
        a[E - 1] === r[b - 1] &&
          ((g[E][b] = g[E - 1][b - 1] + 1),
          g[E][b] > f && ((f = g[E][b]), (m = E)));
    return a.slice(m - f, m);
  }
  let my = "";
  function wu(a) {
    if (a.parentElement) return a.parentElement;
    if (a.parentNode && a.parentNode.nodeType === 11 && a.parentNode.host)
      return a.parentNode.host;
  }
  function gy(a) {
    let r = a;
    for (; r.parentNode; ) r = r.parentNode;
    if (r.nodeType === 11 || r.nodeType === 9) return r;
  }
  function yy(a) {
    for (; a.parentElement; ) a = a.parentElement;
    return wu(a);
  }
  function Mu(a, r, s) {
    for (; a; ) {
      const c = a.closest(r);
      if (c) return c;
      a = yy(a);
    }
  }
  function Dl(a, r) {
    return a.ownerDocument && a.ownerDocument.defaultView
      ? a.ownerDocument.defaultView.getComputedStyle(a, r)
      : void 0;
  }
  function vy(a, r) {
    if (((r = r ?? Dl(a)), !r)) return !0;
    if (Element.prototype.checkVisibility && my !== "webkit") {
      if (!a.checkVisibility()) return !1;
    } else {
      const s = a.closest("details,summary");
      if (s !== a && (s == null ? void 0 : s.nodeName) === "DETAILS" && !s.open)
        return !1;
    }
    return r.visibility === "visible";
  }
  function by(a) {
    const r = a.ownerDocument.createRange();
    r.selectNode(a);
    const s = r.getBoundingClientRect();
    return s.width > 0 && s.height > 0;
  }
  function Ae(a) {
    return a instanceof HTMLFormElement ? "FORM" : a.tagName.toUpperCase();
  }
  function So(a) {
    return a.hasAttribute("aria-label") || a.hasAttribute("aria-labelledby");
  }
  const Eo =
      "article:not([role]), aside:not([role]), main:not([role]), nav:not([role]), section:not([role]), [role=article], [role=complementary], [role=main], [role=navigation], [role=region]",
    py = [
      ["aria-atomic", void 0],
      ["aria-busy", void 0],
      ["aria-controls", void 0],
      ["aria-current", void 0],
      ["aria-describedby", void 0],
      ["aria-details", void 0],
      ["aria-dropeffect", void 0],
      ["aria-flowto", void 0],
      ["aria-grabbed", void 0],
      ["aria-hidden", void 0],
      ["aria-keyshortcuts", void 0],
      [
        "aria-label",
        [
          "caption",
          "code",
          "deletion",
          "emphasis",
          "generic",
          "insertion",
          "paragraph",
          "presentation",
          "strong",
          "subscript",
          "superscript",
        ],
      ],
      [
        "aria-labelledby",
        [
          "caption",
          "code",
          "deletion",
          "emphasis",
          "generic",
          "insertion",
          "paragraph",
          "presentation",
          "strong",
          "subscript",
          "superscript",
        ],
      ],
      ["aria-live", void 0],
      ["aria-owns", void 0],
      ["aria-relevant", void 0],
      ["aria-roledescription", ["generic"]],
    ];
  function To(a, r) {
    return py.some(
      ([s, c]) => !(c != null && c.includes(r || "")) && a.hasAttribute(s),
    );
  }
  function Ao(a) {
    return !Number.isNaN(Number(String(a.getAttribute("tabindex"))));
  }
  function Sy(a) {
    return !Lo(a) && (Ey(a) || Ao(a));
  }
  function Ey(a) {
    const r = Ae(a);
    return ["BUTTON", "DETAILS", "SELECT", "TEXTAREA"].includes(r)
      ? !0
      : r === "A" || r === "AREA"
        ? a.hasAttribute("href")
        : r === "INPUT"
          ? !a.hidden
          : !1;
  }
  const mr = {
      A: (a) => (a.hasAttribute("href") ? "link" : null),
      AREA: (a) => (a.hasAttribute("href") ? "link" : null),
      ARTICLE: () => "article",
      ASIDE: () => "complementary",
      BLOCKQUOTE: () => "blockquote",
      BUTTON: () => "button",
      CAPTION: () => "caption",
      CODE: () => "code",
      DATALIST: () => "listbox",
      DD: () => "definition",
      DEL: () => "deletion",
      DETAILS: () => "group",
      DFN: () => "term",
      DIALOG: () => "dialog",
      DT: () => "term",
      EM: () => "emphasis",
      FIELDSET: () => "group",
      FIGURE: () => "figure",
      FOOTER: (a) => (Mu(a, Eo) ? null : "contentinfo"),
      FORM: (a) => (So(a) ? "form" : null),
      H1: () => "heading",
      H2: () => "heading",
      H3: () => "heading",
      H4: () => "heading",
      H5: () => "heading",
      H6: () => "heading",
      HEADER: (a) => (Mu(a, Eo) ? null : "banner"),
      HR: () => "separator",
      HTML: () => "document",
      IMG: (a) =>
        a.getAttribute("alt") === "" &&
        !a.getAttribute("title") &&
        !To(a) &&
        !Ao(a)
          ? "presentation"
          : "img",
      INPUT: (a) => {
        const r = a.type.toLowerCase();
        if (r === "search")
          return a.hasAttribute("list") ? "combobox" : "searchbox";
        if (["email", "tel", "text", "url", ""].includes(r)) {
          const s = _u(a, a.getAttribute("list"))[0];
          return s && Ae(s) === "DATALIST" ? "combobox" : "textbox";
        }
        return r === "hidden" ? null : Yy[r] || "textbox";
      },
      INS: () => "insertion",
      LI: () => "listitem",
      MAIN: () => "main",
      MARK: () => "mark",
      MATH: () => "math",
      MENU: () => "list",
      METER: () => "meter",
      NAV: () => "navigation",
      OL: () => "list",
      OPTGROUP: () => "group",
      OPTION: () => "option",
      OUTPUT: () => "status",
      P: () => "paragraph",
      PROGRESS: () => "progressbar",
      SECTION: (a) => (So(a) ? "region" : null),
      SELECT: (a) =>
        a.hasAttribute("multiple") || a.size > 1 ? "listbox" : "combobox",
      STRONG: () => "strong",
      SUB: () => "subscript",
      SUP: () => "superscript",
      SVG: () => "img",
      TABLE: () => "table",
      TBODY: () => "rowgroup",
      TD: (a) => {
        const r = Mu(a, "table"),
          s = r ? xu(r) : "";
        return s === "grid" || s === "treegrid" ? "gridcell" : "cell";
      },
      TEXTAREA: () => "textbox",
      TFOOT: () => "rowgroup",
      TH: (a) => {
        if (a.getAttribute("scope") === "col") return "columnheader";
        if (a.getAttribute("scope") === "row") return "rowheader";
        const r = Mu(a, "table"),
          s = r ? xu(r) : "";
        return s === "grid" || s === "treegrid" ? "gridcell" : "cell";
      },
      THEAD: () => "rowgroup",
      TIME: () => "time",
      TR: () => "row",
      UL: () => "list",
    },
    Ty = {
      DD: ["DL", "DIV"],
      DIV: ["DL"],
      DT: ["DL", "DIV"],
      LI: ["OL", "UL"],
      TBODY: ["TABLE"],
      TD: ["TR"],
      TFOOT: ["TABLE"],
      TH: ["TR"],
      THEAD: ["TABLE"],
      TR: ["THEAD", "TBODY", "TFOOT", "TABLE"],
    };
  function wo(a) {
    var c;
    const r = ((c = mr[Ae(a)]) == null ? void 0 : c.call(mr, a)) || "";
    if (!r) return null;
    let s = a;
    for (; s; ) {
      const f = wu(s),
        m = Ty[Ae(s)];
      if (!m || !f || !m.includes(Ae(f))) break;
      const g = xu(f);
      if ((g === "none" || g === "presentation") && !Mo(f, g)) return g;
      s = f;
    }
    return r;
  }
  const Ay = [
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "blockquote",
    "button",
    "caption",
    "cell",
    "checkbox",
    "code",
    "columnheader",
    "combobox",
    "complementary",
    "contentinfo",
    "definition",
    "deletion",
    "dialog",
    "directory",
    "document",
    "emphasis",
    "feed",
    "figure",
    "form",
    "generic",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "insertion",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "mark",
    "marquee",
    "math",
    "meter",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "none",
    "note",
    "option",
    "paragraph",
    "presentation",
    "progressbar",
    "radio",
    "radiogroup",
    "region",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "strong",
    "subscript",
    "superscript",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "time",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
  ];
  function xu(a) {
    return (
      (a.getAttribute("role") || "")
        .split(" ")
        .map((s) => s.trim())
        .find((s) => Ay.includes(s)) || null
    );
  }
  function Mo(a, r) {
    return To(a, r) || Sy(a);
  }
  function Ie(a) {
    const r = xu(a);
    if (!r) return wo(a);
    if (r === "none" || r === "presentation") {
      const s = wo(a);
      if (Mo(a, s)) return s;
    }
    return r;
  }
  function xo(a) {
    return a === null ? void 0 : a.toLowerCase() === "true";
  }
  function _o(a) {
    return ["STYLE", "SCRIPT", "NOSCRIPT", "TEMPLATE"].includes(Ae(a));
  }
  function on(a) {
    if (_o(a)) return !0;
    const r = Dl(a),
      s = a.nodeName === "SLOT";
    if ((r == null ? void 0 : r.display) === "contents" && !s) {
      for (let f = a.firstChild; f; f = f.nextSibling)
        if ((f.nodeType === 1 && !on(f)) || (f.nodeType === 3 && by(f)))
          return !1;
      return !0;
    }
    return !(a.nodeName === "OPTION" && !!a.closest("select")) &&
      !s &&
      !vy(a, r)
      ? !0
      : Do(a);
  }
  function Do(a) {
    let r = Rn == null ? void 0 : Rn.get(a);
    if (r === void 0) {
      if (
        ((r = !1),
        a.parentElement &&
          a.parentElement.shadowRoot &&
          !a.assignedSlot &&
          (r = !0),
        !r)
      ) {
        const s = Dl(a);
        r =
          !s ||
          s.display === "none" ||
          xo(a.getAttribute("aria-hidden")) === !0;
      }
      if (!r) {
        const s = wu(a);
        s && (r = Do(s));
      }
      Rn == null || Rn.set(a, r);
    }
    return r;
  }
  function _u(a, r) {
    if (!r) return [];
    const s = gy(a);
    if (!s) return [];
    try {
      const c = r.split(" ").filter((m) => !!m),
        f = [];
      for (const m of c) {
        const g = s.querySelector("#" + CSS.escape(m));
        g && !f.includes(g) && f.push(g);
      }
      return f;
    } catch {
      return [];
    }
  }
  function fn(a) {
    return a.trim();
  }
  function wy(a) {
    return a
      .split(" ")
      .map((r) =>
        r
          .replace(
            /\r\n/g,
            `
`,
          )
          .replace(/[\u200b\u00ad]/g, "")
          .replace(/\s\s*/g, " "),
      )
      .join(" ")
      .trim();
  }
  function Oo(a, r) {
    const s = [...a.querySelectorAll(r)];
    for (const c of _u(a, a.getAttribute("aria-owns")))
      c.matches(r) && s.push(c), s.push(...c.querySelectorAll(r));
    return s;
  }
  function Du(a, r) {
    const s = r === "::before" ? yr : vr;
    if (s != null && s.has(a)) return (s == null ? void 0 : s.get(a)) || "";
    const c = Dl(a, r),
      f = My(a, c);
    return s && s.set(a, f), f;
  }
  function My(a, r) {
    if (!r || r.display === "none" || r.visibility === "hidden") return "";
    const s = r.content;
    let c;
    if (
      (s[0] === "'" && s[s.length - 1] === "'") ||
      (s[0] === '"' && s[s.length - 1] === '"')
    )
      c = s.substring(1, s.length - 1);
    else if (s.startsWith("attr(") && s.endsWith(")")) {
      const f = s.substring(5, s.length - 1).trim();
      c = a.getAttribute(f) || "";
    }
    return c !== void 0
      ? (r.display || "inline") !== "inline"
        ? " " + c + " "
        : c
      : "";
  }
  function xy(a) {
    const r = a.getAttribute("aria-labelledby");
    if (r === null) return null;
    const s = _u(a, r);
    return s.length ? s : null;
  }
  function _y(a, r) {
    const s = [
        "button",
        "cell",
        "checkbox",
        "columnheader",
        "gridcell",
        "heading",
        "link",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "row",
        "rowheader",
        "switch",
        "tab",
        "tooltip",
        "treeitem",
      ].includes(a),
      c =
        r &&
        [
          "",
          "caption",
          "code",
          "contentinfo",
          "definition",
          "deletion",
          "emphasis",
          "insertion",
          "list",
          "listitem",
          "mark",
          "none",
          "paragraph",
          "presentation",
          "region",
          "row",
          "rowgroup",
          "section",
          "strong",
          "subscript",
          "superscript",
          "table",
          "term",
          "time",
        ].includes(a);
    return s || c;
  }
  function Dy(a, r, s) {
    const c = gr;
    let f = c == null ? void 0 : c.get(r);
    return (
      f === void 0 &&
        ((f = ""),
        [
          "caption",
          "code",
          "definition",
          "deletion",
          "emphasis",
          "generic",
          "insertion",
          "mark",
          "paragraph",
          "presentation",
          "strong",
          "subscript",
          "suggestion",
          "superscript",
          "term",
          "time",
        ].includes(Ie(r) || "") ||
          (f = wy(
            dn(r, {
              builtins: a,
              includeHidden: s,
              visitedElements: new a.Set(),
              embeddedInTargetElement: "self",
            }),
          )),
        c == null || c.set(r, f)),
      f
    );
  }
  function dn(a, r) {
    var b, p, O, k;
    if (r.visitedElements.has(a)) return "";
    const s = {
      ...r,
      embeddedInTargetElement:
        r.embeddedInTargetElement === "self"
          ? "descendant"
          : r.embeddedInTargetElement,
    };
    if (!r.includeHidden) {
      const L =
        !!((b = r.embeddedInLabelledBy) != null && b.hidden) ||
        !!((p = r.embeddedInDescribedBy) != null && p.hidden) ||
        !!((O = r.embeddedInNativeTextAlternative) != null && O.hidden) ||
        !!((k = r.embeddedInLabel) != null && k.hidden);
      if (_o(a) || (!L && on(a))) return r.visitedElements.add(a), "";
    }
    const c = xy(a);
    if (!r.embeddedInLabelledBy) {
      const L = (c || [])
        .map((Q) =>
          dn(Q, {
            ...r,
            embeddedInLabelledBy: { element: Q, hidden: on(Q) },
            embeddedInDescribedBy: void 0,
            embeddedInTargetElement: void 0,
            embeddedInLabel: void 0,
            embeddedInNativeTextAlternative: void 0,
          }),
        )
        .join(" ");
      if (L) return L;
    }
    const f = Ie(a) || "",
      m = Ae(a);
    if (
      r.embeddedInLabel ||
      r.embeddedInLabelledBy ||
      r.embeddedInTargetElement === "descendant"
    ) {
      const L = [...(a.labels || [])].includes(a),
        Q = (c || []).includes(a);
      if (!L && !Q) {
        if (f === "textbox")
          return (
            r.visitedElements.add(a),
            m === "INPUT" || m === "TEXTAREA" ? a.value : a.textContent || ""
          );
        if (["combobox", "listbox"].includes(f)) {
          r.visitedElements.add(a);
          let $;
          if (m === "SELECT")
            ($ = [...a.selectedOptions]),
              !$.length && a.options.length && $.push(a.options[0]);
          else {
            const z =
              f === "combobox"
                ? Oo(a, "*").find((C) => Ie(C) === "listbox")
                : a;
            $ = z
              ? Oo(z, '[aria-selected="true"]').filter(
                  (C) => Ie(C) === "option",
                )
              : [];
          }
          return !$.length && m === "INPUT"
            ? a.value
            : $.map((z) => dn(z, s)).join(" ");
        }
        if (
          [
            "progressbar",
            "scrollbar",
            "slider",
            "spinbutton",
            "meter",
          ].includes(f)
        )
          return (
            r.visitedElements.add(a),
            a.hasAttribute("aria-valuetext")
              ? a.getAttribute("aria-valuetext") || ""
              : a.hasAttribute("aria-valuenow")
                ? a.getAttribute("aria-valuenow") || ""
                : a.getAttribute("value") || ""
          );
        if (["menu"].includes(f)) return r.visitedElements.add(a), "";
      }
    }
    const g = a.getAttribute("aria-label") || "";
    if (fn(g)) return r.visitedElements.add(a), g;
    if (!["presentation", "none"].includes(f)) {
      if (m === "INPUT" && ["button", "submit", "reset"].includes(a.type)) {
        r.visitedElements.add(a);
        const L = a.value || "";
        return fn(L)
          ? L
          : a.type === "submit"
            ? "Submit"
            : a.type === "reset"
              ? "Reset"
              : a.getAttribute("title") || "";
      }
      if (m === "INPUT" && a.type === "image") {
        r.visitedElements.add(a);
        const L = a.labels || [];
        if (L.length && !r.embeddedInLabelledBy) return Ou(L, r);
        const Q = a.getAttribute("alt") || "";
        if (fn(Q)) return Q;
        const $ = a.getAttribute("title") || "";
        return fn($) ? $ : "Submit";
      }
      if (!c && m === "BUTTON") {
        r.visitedElements.add(a);
        const L = a.labels || [];
        if (L.length) return Ou(L, r);
      }
      if (!c && m === "OUTPUT") {
        r.visitedElements.add(a);
        const L = a.labels || [];
        return L.length ? Ou(L, r) : a.getAttribute("title") || "";
      }
      if (!c && (m === "TEXTAREA" || m === "SELECT" || m === "INPUT")) {
        r.visitedElements.add(a);
        const L = a.labels || [];
        if (L.length) return Ou(L, r);
        const Q =
            (m === "INPUT" &&
              ["text", "password", "search", "tel", "email", "url"].includes(
                a.type,
              )) ||
            m === "TEXTAREA",
          $ = a.getAttribute("placeholder") || "",
          z = a.getAttribute("title") || "";
        return !Q || z ? z : $;
      }
      if (!c && m === "FIELDSET") {
        r.visitedElements.add(a);
        for (let Q = a.firstElementChild; Q; Q = Q.nextElementSibling)
          if (Ae(Q) === "LEGEND")
            return dn(Q, {
              ...s,
              embeddedInNativeTextAlternative: { element: Q, hidden: on(Q) },
            });
        return a.getAttribute("title") || "";
      }
      if (!c && m === "FIGURE") {
        r.visitedElements.add(a);
        for (let Q = a.firstElementChild; Q; Q = Q.nextElementSibling)
          if (Ae(Q) === "FIGCAPTION")
            return dn(Q, {
              ...s,
              embeddedInNativeTextAlternative: { element: Q, hidden: on(Q) },
            });
        return a.getAttribute("title") || "";
      }
      if (m === "IMG") {
        r.visitedElements.add(a);
        const L = a.getAttribute("alt") || "";
        return fn(L) ? L : a.getAttribute("title") || "";
      }
      if (m === "TABLE") {
        r.visitedElements.add(a);
        for (let Q = a.firstElementChild; Q; Q = Q.nextElementSibling)
          if (Ae(Q) === "CAPTION")
            return dn(Q, {
              ...s,
              embeddedInNativeTextAlternative: { element: Q, hidden: on(Q) },
            });
        const L = a.getAttribute("summary") || "";
        if (L) return L;
      }
      if (m === "AREA") {
        r.visitedElements.add(a);
        const L = a.getAttribute("alt") || "";
        return fn(L) ? L : a.getAttribute("title") || "";
      }
      if (m === "SVG" || a.ownerSVGElement) {
        r.visitedElements.add(a);
        for (let L = a.firstElementChild; L; L = L.nextElementSibling)
          if (Ae(L) === "TITLE" && L.ownerSVGElement)
            return dn(L, {
              ...s,
              embeddedInLabelledBy: { element: L, hidden: on(L) },
            });
      }
      if (a.ownerSVGElement && m === "A") {
        const L = a.getAttribute("xlink:title") || "";
        if (fn(L)) return r.visitedElements.add(a), L;
      }
    }
    const E = m === "SUMMARY" && !["presentation", "none"].includes(f);
    if (
      _y(f, r.embeddedInTargetElement === "descendant") ||
      E ||
      r.embeddedInLabelledBy ||
      r.embeddedInDescribedBy ||
      r.embeddedInLabel ||
      r.embeddedInNativeTextAlternative
    ) {
      r.visitedElements.add(a);
      const L = Oy(r.builtins, a, s);
      if (r.embeddedInTargetElement === "self" ? fn(L) : L) return L;
    }
    if (!["presentation", "none"].includes(f) || m === "IFRAME") {
      r.visitedElements.add(a);
      const L = a.getAttribute("title") || "";
      if (fn(L)) return L;
    }
    return r.visitedElements.add(a), "";
  }
  function Oy(a, r, s) {
    const c = [],
      f = (g, E) => {
        var b;
        if (!(E && g.assignedSlot))
          if (g.nodeType === 1) {
            const p = ((b = Dl(g)) == null ? void 0 : b.display) || "inline";
            let O = dn(g, s);
            (p !== "inline" || g.nodeName === "BR") && (O = " " + O + " "),
              c.push(O);
          } else g.nodeType === 3 && c.push(g.textContent || "");
      };
    c.push(Du(r, "::before"));
    const m = r.nodeName === "SLOT" ? r.assignedNodes() : [];
    if (m.length) for (const g of m) f(g, !1);
    else {
      for (let g = r.firstChild; g; g = g.nextSibling) f(g, !0);
      if (r.shadowRoot)
        for (let g = r.shadowRoot.firstChild; g; g = g.nextSibling) f(g, !0);
      for (const g of _u(r, r.getAttribute("aria-owns"))) f(g, !0);
    }
    return c.push(Du(r, "::after")), c.join("");
  }
  const Ro = [
    "gridcell",
    "option",
    "row",
    "tab",
    "rowheader",
    "columnheader",
    "treeitem",
  ];
  function Ry(a) {
    return Ae(a) === "OPTION"
      ? a.selected
      : Ro.includes(Ie(a) || "")
        ? xo(a.getAttribute("aria-selected")) === !0
        : !1;
  }
  const zo = [
    "checkbox",
    "menuitemcheckbox",
    "option",
    "radio",
    "switch",
    "menuitemradio",
    "treeitem",
  ];
  function zy(a) {
    const r = Ny(a);
    return r === "error" ? !1 : r;
  }
  function Ny(a, r) {
    const s = Ae(a);
    if (s === "INPUT" && a.indeterminate) return "mixed";
    if (s === "INPUT" && ["checkbox", "radio"].includes(a.type))
      return a.checked;
    if (zo.includes(Ie(a) || "")) {
      const c = a.getAttribute("aria-checked");
      return c === "true" ? !0 : c === "mixed" ? "mixed" : !1;
    }
    return "error";
  }
  const No = ["button"];
  function Cy(a) {
    if (No.includes(Ie(a) || "")) {
      const r = a.getAttribute("aria-pressed");
      if (r === "true") return !0;
      if (r === "mixed") return "mixed";
    }
    return !1;
  }
  const Co = [
    "application",
    "button",
    "checkbox",
    "combobox",
    "gridcell",
    "link",
    "listbox",
    "menuitem",
    "row",
    "rowheader",
    "tab",
    "treeitem",
    "columnheader",
    "menuitemcheckbox",
    "menuitemradio",
    "rowheader",
    "switch",
  ];
  function Uy(a) {
    if (Ae(a) === "DETAILS") return a.open;
    if (Co.includes(Ie(a) || "")) {
      const r = a.getAttribute("aria-expanded");
      return r === null ? void 0 : r === "true";
    }
  }
  const Uo = ["heading", "listitem", "row", "treeitem"];
  function Hy(a) {
    const r = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }[Ae(a)];
    if (r) return r;
    if (Uo.includes(Ie(a) || "")) {
      const s = a.getAttribute("aria-level"),
        c = s === null ? Number.NaN : Number(s);
      if (Number.isInteger(c) && c >= 1) return c;
    }
    return 0;
  }
  const Ho = [
    "application",
    "button",
    "composite",
    "gridcell",
    "group",
    "input",
    "link",
    "menuitem",
    "scrollbar",
    "separator",
    "tab",
    "checkbox",
    "columnheader",
    "combobox",
    "grid",
    "listbox",
    "menu",
    "menubar",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "radiogroup",
    "row",
    "rowheader",
    "searchbox",
    "select",
    "slider",
    "spinbutton",
    "switch",
    "tablist",
    "textbox",
    "toolbar",
    "tree",
    "treegrid",
    "treeitem",
  ];
  function Ly(a) {
    return Lo(a) || qo(a);
  }
  function Lo(a) {
    return (
      ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "OPTION", "OPTGROUP"].includes(
        a.tagName,
      ) &&
      (a.hasAttribute("disabled") || qy(a))
    );
  }
  function qy(a) {
    const r = a == null ? void 0 : a.closest("FIELDSET[DISABLED]");
    if (!r) return !1;
    const s = r.querySelector(":scope > LEGEND");
    return !s || !s.contains(a);
  }
  function qo(a) {
    if (!a) return !1;
    if (Ho.includes(Ie(a) || "")) {
      const r = (a.getAttribute("aria-disabled") || "").toLowerCase();
      if (r === "true") return !0;
      if (r === "false") return !1;
    }
    return qo(wu(a));
  }
  function Ou(a, r) {
    return [...a]
      .map((s) =>
        dn(s, {
          ...r,
          embeddedInLabel: { element: s, hidden: on(s) },
          embeddedInNativeTextAlternative: void 0,
          embeddedInLabelledBy: void 0,
          embeddedInDescribedBy: void 0,
          embeddedInTargetElement: void 0,
        }),
      )
      .filter((s) => !!s)
      .join(" ");
  }
  let gr,
    Bo,
    Go,
    Yo,
    Vo,
    Rn,
    yr,
    vr,
    jo = 0;
  function By(a) {
    ++jo,
      gr ?? (gr = new a.Map()),
      Bo ?? (Bo = new a.Map()),
      Go ?? (Go = new a.Map()),
      Yo ?? (Yo = new a.Map()),
      Vo ?? (Vo = new a.Map()),
      Rn ?? (Rn = new a.Map()),
      yr ?? (yr = new a.Map()),
      vr ?? (vr = new a.Map());
  }
  function Gy() {
    --jo ||
      ((gr = void 0),
      (Bo = void 0),
      (Go = void 0),
      (Yo = void 0),
      (Vo = void 0),
      (Rn = void 0),
      (yr = void 0),
      (vr = void 0));
  }
  const Yy = {
    button: "button",
    checkbox: "checkbox",
    image: "button",
    number: "spinbutton",
    radio: "radio",
    range: "slider",
    reset: "button",
    submit: "button",
  };
  function Vy(a) {
    return Xo(a) ? "'" + a.replace(/'/g, "''") + "'" : a;
  }
  function br(a) {
    return Xo(a)
      ? '"' +
          a.replace(/[\\"\x00-\x1f\x7f-\x9f]/g, (r) => {
            switch (r) {
              case "\\":
                return "\\\\";
              case '"':
                return '\\"';
              case "\b":
                return "\\b";
              case "\f":
                return "\\f";
              case `
`:
                return "\\n";
              case "\r":
                return "\\r";
              case "	":
                return "\\t";
              default:
                return "\\x" + r.charCodeAt(0).toString(16).padStart(2, "0");
            }
          }) +
          '"'
      : a;
  }
  function Xo(a) {
    return !!(
      a.length === 0 ||
      /^\s|\s$/.test(a) ||
      /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/.test(a) ||
      /^-/.test(a) ||
      /[\n:](\s|$)/.test(a) ||
      /\s#/.test(a) ||
      /[\n\r]/.test(a) ||
      /^[&*\],?!>|@"'#%]/.test(a) ||
      /[{}`]/.test(a) ||
      /^\[/.test(a) ||
      !isNaN(Number(a)) ||
      ["y", "n", "yes", "no", "true", "false", "on", "off", "null"].includes(
        a.toLowerCase(),
      )
    );
  }
  function jy(a, r, s) {
    const c = new a.Set(),
      f = {
        root: {
          role: "fragment",
          name: "",
          children: [],
          element: r,
          props: {},
        },
        elements: new a.Map(),
        generation: s,
        ids: new a.Map(),
      },
      m = (b) => {
        const p = f.elements.size + 1;
        f.elements.set(p, b), f.ids.set(b, p);
      };
    m(r);
    const g = (b, p) => {
      if (c.has(p)) return;
      if ((c.add(p), p.nodeType === Node.TEXT_NODE && p.nodeValue)) {
        const Q = p.nodeValue;
        b.role !== "textbox" && Q && b.children.push(p.nodeValue || "");
        return;
      }
      if (p.nodeType !== Node.ELEMENT_NODE) return;
      const O = p;
      if (on(O)) return;
      const k = [];
      if (O.hasAttribute("aria-owns")) {
        const Q = O.getAttribute("aria-owns").split(/\s+/);
        for (const $ of Q) {
          const z = r.ownerDocument.getElementById($);
          z && k.push(z);
        }
      }
      m(O);
      const L = Xy(a, O);
      L && b.children.push(L), E(L || b, O, k);
    };
    function E(b, p, O = []) {
      var $;
      const L =
        ((($ = Dl(p)) == null ? void 0 : $.display) || "inline") !== "inline" ||
        p.nodeName === "BR"
          ? " "
          : "";
      L && b.children.push(L), b.children.push(Du(p, "::before"));
      const Q = p.nodeName === "SLOT" ? p.assignedNodes() : [];
      if (Q.length) for (const z of Q) g(b, z);
      else {
        for (let z = p.firstChild; z; z = z.nextSibling)
          z.assignedSlot || g(b, z);
        if (p.shadowRoot)
          for (let z = p.shadowRoot.firstChild; z; z = z.nextSibling) g(b, z);
      }
      for (const z of O) g(b, z);
      if (
        (b.children.push(Du(p, "::after")),
        L && b.children.push(L),
        b.children.length === 1 &&
          b.name === b.children[0] &&
          (b.children = []),
        b.role === "link" && p.hasAttribute("href"))
      ) {
        const z = p.getAttribute("href");
        b.props.url = z;
      }
    }
    By(a);
    try {
      g(f.root, r);
    } finally {
      Gy();
    }
    return Qy(f.root), f;
  }
  function Xy(a, r) {
    const s = Ie(r);
    if (!s || s === "presentation" || s === "none") return null;
    const c = bo(Dy(a, r, !1) || ""),
      f = { role: s, name: c, children: [], props: {}, element: r };
    return (
      zo.includes(s) && (f.checked = zy(r)),
      Ho.includes(s) && (f.disabled = Ly(r)),
      Co.includes(s) && (f.expanded = Uy(r)),
      Uo.includes(s) && (f.level = Hy(r)),
      No.includes(s) && (f.pressed = Cy(r)),
      Ro.includes(s) && (f.selected = Ry(r)),
      (r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) &&
        r.type !== "checkbox" &&
        r.type !== "radio" &&
        (f.children = [r.value]),
      f
    );
  }
  function Qy(a) {
    const r = (c, f) => {
        if (!c.length) return;
        const m = bo(c.join(""));
        m && f.push(m), (c.length = 0);
      },
      s = (c) => {
        const f = [],
          m = [];
        for (const g of c.children || [])
          typeof g == "string" ? m.push(g) : (r(m, f), s(g), f.push(g));
        r(m, f),
          (c.children = f.length ? f : []),
          c.children.length === 1 &&
            c.children[0] === c.name &&
            (c.children = []);
      };
    s(a);
  }
  function Zy(a, r) {
    const s = [],
      c = (r == null ? void 0 : r.mode) === "regex" ? Jy : () => !0,
      f = (r == null ? void 0 : r.mode) === "regex" ? Ky : (E) => E,
      m = (E, b, p) => {
        if (typeof E == "string") {
          if (b && !c(b, E)) return;
          const Q = br(f(E));
          Q && s.push(p + "- text: " + Q);
          return;
        }
        let O = E.role;
        if (E.name && E.name.length <= 900) {
          const Q = f(E.name);
          if (Q) {
            const $ =
              Q.startsWith("/") && Q.endsWith("/") ? Q : JSON.stringify(Q);
            O += " " + $;
          }
        }
        E.checked === "mixed" && (O += " [checked=mixed]"),
          E.checked === !0 && (O += " [checked]"),
          E.disabled && (O += " [disabled]"),
          E.expanded && (O += " [expanded]"),
          E.level && (O += ` [level=${E.level}]`),
          E.pressed === "mixed" && (O += " [pressed=mixed]"),
          E.pressed === !0 && (O += " [pressed]"),
          E.selected === !0 && (O += " [selected]");
        {
          const Q = a.ids.get(E.element);
          Q && (O += ` [ref=s${a.generation}e${Q}]`);
        }
        const k = p + "- " + Vy(O),
          L = !!Object.keys(E.props).length;
        if (!E.children.length && !L) s.push(k);
        else if (
          E.children.length === 1 &&
          typeof E.children[0] == "string" &&
          !L
        ) {
          const Q = c(E, E.children[0]) ? f(E.children[0]) : null;
          Q ? s.push(k + ": " + br(Q)) : s.push(k);
        } else {
          s.push(k + ":");
          for (const [Q, $] of Object.entries(E.props))
            s.push(p + "  - /" + Q + ": " + br($));
          for (const Q of E.children || []) m(Q, E, p + "  ");
        }
      },
      g = a.root;
    if (g.role === "fragment") for (const E of g.children || []) m(E, g, "");
    else m(g, null, "");
    return s.join(`
`);
  }
  function Ky(a) {
    const r = [
      { regex: /\b[\d,.]+[bkmBKM]+\b/, replacement: "[\\d,.]+[bkmBKM]+" },
      { regex: /\b\d+[hmsp]+\b/, replacement: "\\d+[hmsp]+" },
      { regex: /\b[\d,.]+[hmsp]+\b/, replacement: "[\\d,.]+[hmsp]+" },
      { regex: /\b\d+,\d+\b/, replacement: "\\d+,\\d+" },
      { regex: /\b\d+\.\d{2,}\b/, replacement: "\\d+\\.\\d+" },
      { regex: /\b\d{2,}\.\d+\b/, replacement: "\\d+\\.\\d+" },
      { regex: /\b\d{2,}\b/, replacement: "\\d+" },
    ];
    let s = "",
      c = 0;
    const f = new RegExp(
      r.map((m) => "(" + m.regex.source + ")").join("|"),
      "g",
    );
    return (
      a.replace(f, (m, ...g) => {
        const E = g[g.length - 2],
          b = g.slice(0, -2);
        s += po(a.slice(c, E));
        for (let p = 0; p < b.length; p++)
          if (b[p]) {
            const { replacement: O } = r[p];
            s += O;
            break;
          }
        return (c = E + m.length), m;
      }),
      s ? ((s += po(a.slice(c))), String(new RegExp(s))) : a
    );
  }
  function Jy(a, r) {
    if (!r.length) return !1;
    if (!a.name) return !0;
    if (a.name.length > r.length) return !1;
    const s = r.length <= 200 && a.name.length <= 200 ? hy(r, a.name) : "";
    let c = r;
    for (; s && c.includes(s); ) c = c.replace(s, "");
    return c.trim().length / r.length > 0.1;
  }
  function ky(a) {
    var r, s, c, f, m, g, E, b, p;
    if (!a.__playwright_builtins__) {
      const O = {
        setTimeout: (r = a.setTimeout) == null ? void 0 : r.bind(a),
        clearTimeout: (s = a.clearTimeout) == null ? void 0 : s.bind(a),
        setInterval: (c = a.setInterval) == null ? void 0 : c.bind(a),
        clearInterval: (f = a.clearInterval) == null ? void 0 : f.bind(a),
        requestAnimationFrame:
          (m = a.requestAnimationFrame) == null ? void 0 : m.bind(a),
        cancelAnimationFrame:
          (g = a.cancelAnimationFrame) == null ? void 0 : g.bind(a),
        requestIdleCallback:
          (E = a.requestIdleCallback) == null ? void 0 : E.bind(a),
        cancelIdleCallback:
          (b = a.cancelIdleCallback) == null ? void 0 : b.bind(a),
        performance: a.performance,
        eval: (p = a.eval) == null ? void 0 : p.bind(a),
        Intl: a.Intl,
        Date: a.Date,
        Map: a.Map,
        Set: a.Set,
      };
      Object.defineProperty(a, "__playwright_builtins__", {
        value: O,
        configurable: !1,
        enumerable: !1,
        writable: !1,
      });
    }
    return a.__playwright_builtins__;
  }
  function $y(a, r = {}) {
    return Fy(a, { ...r, limit: 1 })[0];
  }
  function Fy(a, r) {
    const { ancestorSelector: s } = r,
      c = Iy(a, { ancestorSelector: s });
    return Wy(c, r);
  }
  function Iy(a, r = {}) {
    const { ancestorSelector: s, component: c, pierceShadow: f = !0 } = r,
      m = [a, ...pa(a, f)];
    let g = "";
    for (let E = 0; E < m.length; E++) {
      const b = m[E],
        p = E > 0 ? m[E - 1] : null,
        O = p ? Qo(b, p) : "";
      if (s && tr(b, s)) return p ? `${s}${O}${g}` : s;
      const k = b === c ? Ru(b) : nv(b);
      g = p ? `${k}${O}${g}` : k;
    }
    return g;
  }
  function Qo(a, r) {
    var s;
    if ((s = a.shadowRoot) != null && s.contains(r)) return " >>> ";
    if (!a.contains(r)) throw new Error("Parent does not contain descendant");
    return r.parentElement === a ? " > " : " ";
  }
  function Wy(a, r) {
    const { ancestorSelector: s } = r,
      c = s ? s.split(" >>> ").length - 1 : -1,
      f = a.split(" >>> "),
      m = [];
    let g = "";
    return (
      f.forEach((E, b) => {
        if (b < c) return;
        const p = f.slice(0, b).join(" >>> "),
          O = Ko(E, p, { ...r, ancestorSelector: b === c ? s : void 0 });
        if (b === f.length - 1)
          O.forEach((L) => {
            const Q = Ol(g, L);
            m.push(Q);
          });
        else {
          const L = O[0];
          g = Ol(g, L);
        }
      }),
      m
    );
  }
  const Zo = 1e3;
  function Ko(a, r, s) {
    const {
        useSimple: c,
        ancestorSelector: f,
        limit: m,
        matchCriteria: g,
        allowReusingElementSelectors: E,
      } = s,
      b = Ol(r, a),
      p = al(b);
    if (p.length === 0) throw new Error(`Unable to get elements: ${a}`);
    if (f) {
      const J = al(f);
      if (Fo(J, p)) return [f];
    }
    const O = p[0],
      k = [O, ...pa(O, !1)],
      L = f ? $o(O, f) : null,
      Q = k.findIndex((J) => J === L),
      $ = a
        .split(">")
        .map((J) => J.trim())
        .reverse(),
      z = (J) => {
        const K = $.slice(J).reverse().join(" > "),
          gt = Ol(r, K);
        return al(gt);
      },
      C = [],
      U = [],
      X = [];
    let F = 0;
    const nt = Q !== -1 ? Q : $.length;
    for (; C.length < m && F < nt; ) {
      const J = $[F],
        K = k[F],
        gt = ev(K),
        Ot = c ? [J] : [...gt, J],
        Rt = F + 1,
        Tt = z(F),
        qt = Ot.filter((yt) => {
          const _ = $.slice(Rt).reverse().join(" > "),
            W = _ ? `${_} > ${yt}` : yt,
            tt = Ol(r, W);
          return ko({ selector: tt, elementsToMatch: Tt, matchCriteria: g });
        });
      if (
        Io(K).filter((yt) => yt.tagName === K.tagName).length > 1 &&
        qt.length > 1
      ) {
        const yt = qt.findIndex((_) => _ === J);
        qt.splice(yt, 1);
      }
      U[F] = qt;
      const Bt = Py(U);
      if (Bt.length >= Zo)
        if (E) {
          if (C.length > 0) break;
        } else return Ko(a, r, { ...s, allowReusingElementSelectors: !0 });
      let $t = 0;
      for (; C.length < m && $t < Bt.length; ) {
        const yt = Bt[$t],
          _ = [...yt].reverse().join(" > "),
          W = f
            ? tv({ ancestorSelector: f, element: K, elementSelector: _ })
            : void 0,
          tt = W ?? Ol(r, _),
          bt = ko({ selector: tt, elementsToMatch: p, matchCriteria: g }),
          V =
            !yt.some((Z, I) => {
              const lt = X[I];
              return lt && lt.has(Z);
            }) || E;
        if (bt && V) {
          const Z = W ?? _;
          C.push(Z),
            yt.forEach((I, lt) => {
              X[lt] || (X[lt] = new Set()),
                X[lt].add(I),
                X[lt].size === U[lt].length && (X[lt] = new Set());
            });
        }
        $t++;
      }
      (U[F] = qt.slice(0, m)), F++;
    }
    if (C.length === 0) throw new Error(`Unable to shorten selector: ${a}`);
    return C.slice(0, m);
  }
  function Py(a) {
    const r = [];
    return Jo(a, r), r;
  }
  function Jo(a, r = [], s = [], c = 0) {
    if (c === a.length) {
      r.push([...s]);
      return;
    }
    for (const f of a[c])
      if ((s.push(f), Jo(a, r, s, c + 1), s.pop(), r.length >= Zo)) break;
  }
  function tv({ ancestorSelector: a, element: r, elementSelector: s }) {
    const c = $o(r, a);
    if (r === c) return a;
    const f = Qo(c, r);
    return `${a}${f}${s}`;
  }
  function ko({ selector: a, elementsToMatch: r, matchCriteria: s = "exact" }) {
    const c = al(a);
    return r.length === 1 && s === "firstMatch" ? c[0] === r[0] : Fo(c, r);
  }
  function $o(a, r) {
    const c = [a, ...pa(a)].find((f) => tr(f, r));
    if (!c) throw new Error(`Unable to get ancestor: ${r}`);
    return c;
  }
  function Ol(a, r) {
    if (!r) throw new Error("Missing local selector");
    return a ? `${a} >>> ${r}` : r;
  }
  function ev(a) {
    return [...rv(a), fv(a), ...cv(a), iv(a), ...uv(a)].filter((r) => !!r);
  }
  function Fo(a, r) {
    return a.length !== r.length ? !1 : a.every((s) => r.includes(s));
  }
  function Ru(a) {
    return CSS.escape(a.tagName.toLowerCase());
  }
  function nv(a) {
    const s = Io(a)
      .filter((f) => f.tagName === a.tagName)
      .findIndex((f) => f === a);
    return `${Ru(a)}:nth-of-type(${s + 1})`;
  }
  function Io(a) {
    const r = a.parentNode;
    if (!r) throw new Error("Unable to get parent");
    return lo(r);
  }
  const lv = "hoverClass",
    av = "clickClass";
  function uv(a) {
    const r = (m) => {
        if (!(a instanceof HTMLElement || a instanceof SVGElement)) return [];
        const g = a.dataset[m];
        return g ? g.split(/\s+/) : [];
      },
      s = r(lv),
      c = r(av),
      f = [...s, ...c];
    return Array.from(a.classList)
      .filter((m) => !f.includes(m))
      .map((m) => `.${CSS.escape(m)}`);
  }
  function iv(a) {
    const r = a.getAttribute("id");
    return r && yv(r, { disallowedTypes: ["digit"] })
      ? `#${CSS.escape(r)}`
      : "";
  }
  function rv(a) {
    return Array.from(a.attributes)
      .filter((r) => r.name.startsWith("data-test"))
      .map((r) => {
        const { name: s, value: c } = r;
        return Wo({ attribute: s, value: c, options: { removeNumbers: !0 } });
      });
  }
  function cv(a) {
    const r = [
        "aria-label",
        "aria-labelledby",
        "role",
        "tabindex",
        "title",
        "name",
        "placeholder",
        "type",
        "alt",
      ],
      s = Ru(a);
    return r.reduce((c, f) => {
      const m = a.getAttribute(f);
      if (!m || ov(m)) return c;
      const E = [
        Wo({ attribute: f, value: m, options: { removeNumbers: !0 } }),
        ...sv(f, m),
      ].map((b) => `${s}${b}`);
      return [...c, ...E];
    }, []);
  }
  function sv(a, r) {
    if (a === "aria-label") {
      const c = pr(r).split(/\s+/);
      if (c.length === 1) return [];
      const f = c[0];
      return [`[${a}^="${f}"]`];
    } else return [];
  }
  function ov(a) {
    return a.split(/\s+/).every((s) => /\d/.test(s));
  }
  function Wo({ attribute: a, value: r, options: s = {} }) {
    const { removeNumbers: c } = s,
      f = pr(r, s),
      m = /\d/.test(r);
    return c && m ? `[${a}*="${f}"]` : `[${a}="${f}"]`;
  }
  function fv(a) {
    if (!(a instanceof HTMLElement)) return "";
    const r =
        a instanceof HTMLButtonElement || a.getAttribute("role") === "button",
      s = a instanceof HTMLAnchorElement;
    if (!r && !s) return "";
    const c = a.innerText;
    if (c.length === 0) return "";
    const f = c
      .split(/\s+/)
      .filter((b) => !/\d/.test(b))
      .filter((b) => !b.includes("."));
    if (!(f.length > 0 && f.length <= 3)) return "";
    const m = Ru(a),
      g = a.getAttribute("role") === "button" ? '[role="button"]' : "",
      E = pr(c, { removeNumbers: !0 });
    return `${m}${g}:contains("${E}")`;
  }
  function pr(a, r = {}) {
    const { removeNumbers: s } = r,
      c = /\d/.test(a);
    if (s && c) {
      const f = mv(a);
      f.length > 0 && (a = f);
    }
    return CSS.escape(a).replace(/\\ /g, " ");
  }
  function dv(a) {
    const r = /\b\w*\d\w*\b/;
    return a
      .split(r)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  function hv(a) {
    return a
      .split(/\d+/)
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
  }
  function mv(a) {
    const r = dv(a);
    return (r.length > 0 ? r : hv(a)).reduce(
      (f, m) => (m.length > f.length ? m : f),
      "",
    );
  }
  function Sr(a) {
    if (a.length !== 1)
      throw new Error(`Character must have length of 1: ${a}`);
    return a >= "a" && a <= "z"
      ? "lower"
      : a >= "A" && a <= "Z"
        ? "upper"
        : a >= "0" && a <= "9"
          ? "digit"
          : "other";
  }
  const gv = 4;
  function yv(a, r = {}) {
    const { disallowedTypes: s = [] } = r;
    for (const f of a) if (s.includes(Sr(f))) return !1;
    const c = vv(a);
    return a.length / c > gv;
  }
  function vv(a) {
    if (a.length === 0) return 0;
    let r = 0,
      s = Sr(a[0]);
    for (let c = 1; c < a.length; c++) {
      const f = a[c];
      if (f === "-" || f === "_") continue;
      const m = Sr(f);
      m !== s && (r++, (s = m));
    }
    return r;
  }
  const { addMessageListener: Po } = On();
  let we;
  function bv() {
    return Po("generateAriaSnapshot", async () => {
      const a = ky(window),
        r = ((we == null ? void 0 : we.generation) ?? 0) + 1;
      return (we = await jy(a, document.documentElement, r)), Zy(we, {});
    });
  }
  function pv() {
    return Po("getSelectorForAriaRef", async (a) => {
      var g;
      const { ariaRef: r } = a.payload,
        s = r.match(/^s(\d+)e(\d+)$/);
      if (!s)
        throw new Error(
          "Invalid aria-ref selector, should be of form s<number>e<number>",
        );
      if (!we)
        throw new Error(
          "No snapshot found. Please generate an aria snapshot before trying again.",
        );
      const [, c, f] = s;
      if ((we == null ? void 0 : we.generation) !== +c)
        throw new Error(
          `Stale aria-ref, expected s${we == null ? void 0 : we.generation}e${f}, got ${r}. Please regenerate an aria snapshot before trying again.`,
        );
      const m =
        (g = we == null ? void 0 : we.elements) == null ? void 0 : g.get(+f);
      if (!m) throw new Error(`Element with aria-ref ${r} not found`);
      return $y(m);
    });
  }
  const { addMessageListener: zu } = On();
  function Sv() {
    return zu("selectText", async (a) => {
      const { selector: r } = a.payload,
        s = await _l(r);
      bg(s);
    });
  }
  function Ev() {
    return zu("waitForStableDOM", async (a) => {
      const { minStableMs: r, maxMutations: s, maxWaitMs: c } = a.payload;
      await zg({ minStableMs: r, maxMutations: s, maxWaitMs: c });
    });
  }
  function Tv() {
    return zu("getInputType", async (a) => {
      const { selector: r } = a.payload,
        s = await _l(r);
      return s instanceof HTMLInputElement ? s.type.toLowerCase() : null;
    });
  }
  function Av() {
    return zu("setInputValue", async (a) => {
      const { selector: r, value: s } = a.payload,
        c = await _l(r);
      if (!(c instanceof HTMLInputElement))
        throw new Error(`Element is not an input element: ${r}`);
      (c.value = s),
        c.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })),
        c.dispatchEvent(new Event("change", { bubbles: !0 }));
    });
  }
  const { addMessageListener: wv } = On();
  function Mv() {
    return wv("removeExtensionFrames", async () => {
      xv({ pierceShadow: !0 }).forEach((s) => {
        s.src.startsWith("chrome-extension://") && s.remove();
      }),
        _v().forEach((s) => {
          s.remove();
        });
    });
  }
  function xv(a = {}) {
    const { pierceShadow: r } = a;
    return r
      ? Ng("iframe, frame")
      : Array.from(document.querySelectorAll("iframe, frame"));
  }
  function _v() {
    const a = Array.from(document.querySelectorAll("*")).filter((s) =>
        s.tagName.toLowerCase().includes("1password"),
      ),
      r = Array.from(document.querySelectorAll("*")).filter((s) =>
        Array.from(s.attributes).some(
          (c) => c.name.startsWith("data-") && c.name.includes("lastpass"),
        ),
      );
    return [...a, ...r];
  }
  async function Dv({ imageUrl: a, maxWidth: r, maxHeight: s }) {
    const c = new Image();
    (c.src = a), await new Promise((b) => (c.onload = b));
    const { width: f, height: m } = Ov({
        width: c.width,
        height: c.height,
        maxWidth: r,
        maxHeight: s,
      }),
      g = document.createElement("canvas");
    (g.width = f), (g.height = m);
    const E = g.getContext("2d");
    if (!E) throw new Error("Failed to get canvas context");
    return (
      E.drawImage(c, 0, 0, f, m),
      { dataUrl: g.toDataURL(), width: f, height: m }
    );
  }
  function Ov({ width: a, height: r, maxWidth: s, maxHeight: c }) {
    const f = a / r;
    let m, g;
    return (
      f > s / c
        ? ((m = s), (g = Math.round(s / f)))
        : ((g = c), (m = Math.round(c * f))),
      { width: m, height: g }
    );
  }
  const { addMessageListener: Rv } = On();
  function zv() {
    return Rv("resizeImage", async (a) => {
      const { imageUrl: r, maxWidth: s, maxHeight: c } = a.payload;
      return Dv({ imageUrl: r, maxWidth: s, maxHeight: c });
    });
  }
  const { addMessageListener: Nv } = On();
  function Cv() {
    return Nv("ping", async () => {});
  }
  const { addMessageListener: Uv } = On();
  function Hv() {
    const a = [Lv(), Cv(), Mv(), bv(), pv(), Tv(), Av(), Sv(), Ev(), zv()];
    return () => {
      a.forEach((r) => r());
    };
  }
  const tf = {
    getElementCoordinates: async (a) => {
      const { selector: r, options: s = {} } = a.payload,
        { clickable: c } = s,
        f = await _l(r, { visible: !0, stable: !0, clickable: c }),
        m = Fs(f);
      if (!m) throw new Error("Unable to get coordinates for element");
      return m;
    },
    scrollIntoView: async (a) => {
      const { selector: r, force: s } = a.payload,
        c = await _l(r);
      Is(c, { force: s }),
        await Wi(c),
        Ag(c) || (Is(c, { force: s }), await Wi(c));
    },
    selectOption: async (a) => {
      const { selector: r, values: s, selectMethod: c } = a.payload,
        f = await _l(r);
      if (!(f instanceof HTMLSelectElement))
        throw new Error(`Element is not a <select> element: ${r}`);
      f.value = "";
      const m = f.multiple ? s : [s[0]],
        g = Array.from(f.options);
      m.forEach((E) => {
        const b = g.find((p) => {
          if (c === "text") return p.innerText === E;
          if (c === "value") return p.value === E;
          ig(c);
        });
        if (!b) throw new Error(`Unable to find option for value: ${E}`);
        (b.selected = !0),
          f.dispatchEvent(new Event("input", { bubbles: !0 })),
          f.dispatchEvent(new Event("change", { bubbles: !0 }));
      });
    },
  };
  function Lv() {
    const a = [];
    return (
      Object.keys(tf).forEach((r) => {
        const s = tf[r],
          c = Uv(r, s);
        a.push(c);
      }),
      () => {
        a.forEach((r) => {
          r();
        });
      }
    );
  }
  var Se = ur();
  /**
   * @license lucide-react v0.485.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const qv = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    Bv = (a) =>
      a.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, s, c) =>
        c ? c.toUpperCase() : s.toLowerCase(),
      ),
    ef = (a) => {
      const r = Bv(a);
      return r.charAt(0).toUpperCase() + r.slice(1);
    },
    nf = (...a) =>
      a
        .filter((r, s, c) => !!r && r.trim() !== "" && c.indexOf(r) === s)
        .join(" ")
        .trim();
  /**
   * @license lucide-react v0.485.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ var Gv = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  /**
   * @license lucide-react v0.485.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Yv = Se.forwardRef(
    (
      {
        color: a = "currentColor",
        size: r = 24,
        strokeWidth: s = 2,
        absoluteStrokeWidth: c,
        className: f = "",
        children: m,
        iconNode: g,
        ...E
      },
      b,
    ) =>
      Se.createElement(
        "svg",
        {
          ref: b,
          ...Gv,
          width: r,
          height: r,
          stroke: a,
          strokeWidth: c ? (Number(s) * 24) / Number(r) : s,
          className: nf("lucide", f),
          ...E,
        },
        [
          ...g.map(([p, O]) => Se.createElement(p, O)),
          ...(Array.isArray(m) ? m : [m]),
        ],
      ),
  );
  /**
   * @license lucide-react v0.485.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Vv = (a, r) => {
    const s = Se.forwardRef(({ className: c, ...f }, m) =>
      Se.createElement(Yv, {
        ref: m,
        iconNode: r,
        className: nf(`lucide-${qv(ef(a))}`, `lucide-${a}`, c),
        ...f,
      }),
    );
    return (s.displayName = ef(a)), s;
  };
  /**
   * @license lucide-react v0.485.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const jv = Vv("mouse-pointer-2", [
    [
      "path",
      {
        d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
        key: "edeuup",
      },
    ],
  ]);
  function Xv() {
    const { addMessageListener: a } = On();
    function r(s, c, { requiredSenderTabId: f } = {}) {
      const m = Se.useRef(void 0);
      Se.useEffect(() => {
        m.current = c;
      }, [c]),
        Se.useEffect(() => {
          const g = (...E) => {
            if (!m.current)
              throw new Error(`Missing listener for message type: ${s}`);
            return m.current(...E);
          };
          if (s) return a(s, g, { requiredSenderTabId: f });
        }, [s, f]);
    }
    return { useExtensionMessageListener: r };
  }
  function lf(a) {
    var r,
      s,
      c = "";
    if (typeof a == "string" || typeof a == "number") c += a;
    else if (typeof a == "object")
      if (Array.isArray(a)) {
        var f = a.length;
        for (r = 0; r < f; r++)
          a[r] && (s = lf(a[r])) && (c && (c += " "), (c += s));
      } else for (s in a) a[s] && (c && (c += " "), (c += s));
    return c;
  }
  function Qv() {
    for (var a, r, s = 0, c = "", f = arguments.length; s < f; s++)
      (a = arguments[s]) && (r = lf(a)) && (c && (c += " "), (c += r));
    return c;
  }
  const Er = "-",
    Zv = (a) => {
      const r = Jv(a),
        { conflictingClassGroups: s, conflictingClassGroupModifiers: c } = a;
      return {
        getClassGroupId: (g) => {
          const E = g.split(Er);
          return E[0] === "" && E.length !== 1 && E.shift(), af(E, r) || Kv(g);
        },
        getConflictingClassGroupIds: (g, E) => {
          const b = s[g] || [];
          return E && c[g] ? [...b, ...c[g]] : b;
        },
      };
    },
    af = (a, r) => {
      var g;
      if (a.length === 0) return r.classGroupId;
      const s = a[0],
        c = r.nextPart.get(s),
        f = c ? af(a.slice(1), c) : void 0;
      if (f) return f;
      if (r.validators.length === 0) return;
      const m = a.join(Er);
      return (g = r.validators.find(({ validator: E }) => E(m))) == null
        ? void 0
        : g.classGroupId;
    },
    uf = /^\[(.+)\]$/,
    Kv = (a) => {
      if (uf.test(a)) {
        const r = uf.exec(a)[1],
          s = r == null ? void 0 : r.substring(0, r.indexOf(":"));
        if (s) return "arbitrary.." + s;
      }
    },
    Jv = (a) => {
      const { theme: r, classGroups: s } = a,
        c = { nextPart: new Map(), validators: [] };
      for (const f in s) Tr(s[f], c, f, r);
      return c;
    },
    Tr = (a, r, s, c) => {
      a.forEach((f) => {
        if (typeof f == "string") {
          const m = f === "" ? r : rf(r, f);
          m.classGroupId = s;
          return;
        }
        if (typeof f == "function") {
          if (kv(f)) {
            Tr(f(c), r, s, c);
            return;
          }
          r.validators.push({ validator: f, classGroupId: s });
          return;
        }
        Object.entries(f).forEach(([m, g]) => {
          Tr(g, rf(r, m), s, c);
        });
      });
    },
    rf = (a, r) => {
      let s = a;
      return (
        r.split(Er).forEach((c) => {
          s.nextPart.has(c) ||
            s.nextPart.set(c, { nextPart: new Map(), validators: [] }),
            (s = s.nextPart.get(c));
        }),
        s
      );
    },
    kv = (a) => a.isThemeGetter,
    $v = (a) => {
      if (a < 1) return { get: () => {}, set: () => {} };
      let r = 0,
        s = new Map(),
        c = new Map();
      const f = (m, g) => {
        s.set(m, g), r++, r > a && ((r = 0), (c = s), (s = new Map()));
      };
      return {
        get(m) {
          let g = s.get(m);
          if (g !== void 0) return g;
          if ((g = c.get(m)) !== void 0) return f(m, g), g;
        },
        set(m, g) {
          s.has(m) ? s.set(m, g) : f(m, g);
        },
      };
    },
    Ar = "!",
    wr = ":",
    Fv = wr.length,
    Iv = (a) => {
      const { prefix: r, experimentalParseClassName: s } = a;
      let c = (f) => {
        const m = [];
        let g = 0,
          E = 0,
          b = 0,
          p;
        for (let $ = 0; $ < f.length; $++) {
          let z = f[$];
          if (g === 0 && E === 0) {
            if (z === wr) {
              m.push(f.slice(b, $)), (b = $ + Fv);
              continue;
            }
            if (z === "/") {
              p = $;
              continue;
            }
          }
          z === "["
            ? g++
            : z === "]"
              ? g--
              : z === "("
                ? E++
                : z === ")" && E--;
        }
        const O = m.length === 0 ? f : f.substring(b),
          k = Wv(O),
          L = k !== O,
          Q = p && p > b ? p - b : void 0;
        return {
          modifiers: m,
          hasImportantModifier: L,
          baseClassName: k,
          maybePostfixModifierPosition: Q,
        };
      };
      if (r) {
        const f = r + wr,
          m = c;
        c = (g) =>
          g.startsWith(f)
            ? m(g.substring(f.length))
            : {
                isExternal: !0,
                modifiers: [],
                hasImportantModifier: !1,
                baseClassName: g,
                maybePostfixModifierPosition: void 0,
              };
      }
      if (s) {
        const f = c;
        c = (m) => s({ className: m, parseClassName: f });
      }
      return c;
    },
    Wv = (a) =>
      a.endsWith(Ar)
        ? a.substring(0, a.length - 1)
        : a.startsWith(Ar)
          ? a.substring(1)
          : a,
    Pv = (a) => {
      const r = Object.fromEntries(
        a.orderSensitiveModifiers.map((c) => [c, !0]),
      );
      return (c) => {
        if (c.length <= 1) return c;
        const f = [];
        let m = [];
        return (
          c.forEach((g) => {
            g[0] === "[" || r[g]
              ? (f.push(...m.sort(), g), (m = []))
              : m.push(g);
          }),
          f.push(...m.sort()),
          f
        );
      };
    },
    tb = (a) => ({
      cache: $v(a.cacheSize),
      parseClassName: Iv(a),
      sortModifiers: Pv(a),
      ...Zv(a),
    }),
    eb = /\s+/,
    nb = (a, r) => {
      const {
          parseClassName: s,
          getClassGroupId: c,
          getConflictingClassGroupIds: f,
          sortModifiers: m,
        } = r,
        g = [],
        E = a.trim().split(eb);
      let b = "";
      for (let p = E.length - 1; p >= 0; p -= 1) {
        const O = E[p],
          {
            isExternal: k,
            modifiers: L,
            hasImportantModifier: Q,
            baseClassName: $,
            maybePostfixModifierPosition: z,
          } = s(O);
        if (k) {
          b = O + (b.length > 0 ? " " + b : b);
          continue;
        }
        let C = !!z,
          U = c(C ? $.substring(0, z) : $);
        if (!U) {
          if (!C) {
            b = O + (b.length > 0 ? " " + b : b);
            continue;
          }
          if (((U = c($)), !U)) {
            b = O + (b.length > 0 ? " " + b : b);
            continue;
          }
          C = !1;
        }
        const X = m(L).join(":"),
          F = Q ? X + Ar : X,
          nt = F + U;
        if (g.includes(nt)) continue;
        g.push(nt);
        const J = f(U, C);
        for (let K = 0; K < J.length; ++K) {
          const gt = J[K];
          g.push(F + gt);
        }
        b = O + (b.length > 0 ? " " + b : b);
      }
      return b;
    };
  function lb() {
    let a = 0,
      r,
      s,
      c = "";
    for (; a < arguments.length; )
      (r = arguments[a++]) && (s = cf(r)) && (c && (c += " "), (c += s));
    return c;
  }
  const cf = (a) => {
    if (typeof a == "string") return a;
    let r,
      s = "";
    for (let c = 0; c < a.length; c++)
      a[c] && (r = cf(a[c])) && (s && (s += " "), (s += r));
    return s;
  };
  function ab(a, ...r) {
    let s,
      c,
      f,
      m = g;
    function g(b) {
      const p = r.reduce((O, k) => k(O), a());
      return (s = tb(p)), (c = s.cache.get), (f = s.cache.set), (m = E), E(b);
    }
    function E(b) {
      const p = c(b);
      if (p) return p;
      const O = nb(b, s);
      return f(b, O), O;
    }
    return function () {
      return m(lb.apply(null, arguments));
    };
  }
  const fe = (a) => {
      const r = (s) => s[a] || [];
      return (r.isThemeGetter = !0), r;
    },
    sf = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
    of = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
    ub = /^\d+\/\d+$/,
    ib = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    rb =
      /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    cb = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    sb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    ob =
      /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    Rl = (a) => ub.test(a),
    Dt = (a) => !!a && !Number.isNaN(Number(a)),
    ul = (a) => !!a && Number.isInteger(Number(a)),
    ff = (a) => a.endsWith("%") && Dt(a.slice(0, -1)),
    zn = (a) => ib.test(a),
    fb = () => !0,
    db = (a) => rb.test(a) && !cb.test(a),
    Mr = () => !1,
    hb = (a) => sb.test(a),
    mb = (a) => ob.test(a),
    gb = (a) => !ut(a) && !it(a),
    yb = (a) => zl(a, mf, Mr),
    ut = (a) => sf.test(a),
    il = (a) => zl(a, gf, db),
    xr = (a) => zl(a, _b, Dt),
    vb = (a) => zl(a, df, Mr),
    bb = (a) => zl(a, hf, mb),
    pb = (a) => zl(a, Mr, hb),
    it = (a) => of.test(a),
    Nu = (a) => Nl(a, gf),
    Sb = (a) => Nl(a, Db),
    Eb = (a) => Nl(a, df),
    Tb = (a) => Nl(a, mf),
    Ab = (a) => Nl(a, hf),
    wb = (a) => Nl(a, Ob, !0),
    zl = (a, r, s) => {
      const c = sf.exec(a);
      return c ? (c[1] ? r(c[1]) : s(c[2])) : !1;
    },
    Nl = (a, r, s = !1) => {
      const c = of.exec(a);
      return c ? (c[1] ? r(c[1]) : s) : !1;
    },
    df = (a) => a === "position",
    Mb = new Set(["image", "url"]),
    hf = (a) => Mb.has(a),
    xb = new Set(["length", "size", "percentage"]),
    mf = (a) => xb.has(a),
    gf = (a) => a === "length",
    _b = (a) => a === "number",
    Db = (a) => a === "family-name",
    Ob = (a) => a === "shadow",
    Rb = ab(() => {
      const a = fe("color"),
        r = fe("font"),
        s = fe("text"),
        c = fe("font-weight"),
        f = fe("tracking"),
        m = fe("leading"),
        g = fe("breakpoint"),
        E = fe("container"),
        b = fe("spacing"),
        p = fe("radius"),
        O = fe("shadow"),
        k = fe("inset-shadow"),
        L = fe("drop-shadow"),
        Q = fe("blur"),
        $ = fe("perspective"),
        z = fe("aspect"),
        C = fe("ease"),
        U = fe("animate"),
        X = () => [
          "auto",
          "avoid",
          "all",
          "avoid-page",
          "page",
          "left",
          "right",
          "column",
        ],
        F = () => [
          "bottom",
          "center",
          "left",
          "left-bottom",
          "left-top",
          "right",
          "right-bottom",
          "right-top",
          "top",
        ],
        nt = () => ["auto", "hidden", "clip", "visible", "scroll"],
        J = () => ["auto", "contain", "none"],
        K = () => [it, ut, b],
        gt = () => [Rl, "full", "auto", ...K()],
        Ot = () => [ul, "none", "subgrid", it, ut],
        Rt = () => ["auto", { span: ["full", ul, it, ut] }, it, ut],
        Tt = () => [ul, "auto", it, ut],
        qt = () => ["auto", "min", "max", "fr", it, ut],
        Ct = () => [
          "start",
          "end",
          "center",
          "between",
          "around",
          "evenly",
          "stretch",
          "baseline",
        ],
        Bt = () => ["start", "end", "center", "stretch"],
        $t = () => ["auto", ...K()],
        yt = () => [
          Rl,
          "auto",
          "full",
          "dvw",
          "dvh",
          "lvw",
          "lvh",
          "svw",
          "svh",
          "min",
          "max",
          "fit",
          ...K(),
        ],
        _ = () => [a, it, ut],
        W = () => [ff, il],
        tt = () => ["", "none", "full", p, it, ut],
        bt = () => ["", Dt, Nu, il],
        S = () => ["solid", "dashed", "dotted", "double"],
        V = () => [
          "normal",
          "multiply",
          "screen",
          "overlay",
          "darken",
          "lighten",
          "color-dodge",
          "color-burn",
          "hard-light",
          "soft-light",
          "difference",
          "exclusion",
          "hue",
          "saturation",
          "color",
          "luminosity",
        ],
        Z = () => ["", "none", Q, it, ut],
        I = () => [
          "center",
          "top",
          "top-right",
          "right",
          "bottom-right",
          "bottom",
          "bottom-left",
          "left",
          "top-left",
          it,
          ut,
        ],
        lt = () => ["none", Dt, it, ut],
        pt = () => ["none", Dt, it, ut],
        ht = () => [Dt, it, ut],
        Wt = () => [Rl, "full", ...K()];
      return {
        cacheSize: 500,
        theme: {
          animate: ["spin", "ping", "pulse", "bounce"],
          aspect: ["video"],
          blur: [zn],
          breakpoint: [zn],
          color: [fb],
          container: [zn],
          "drop-shadow": [zn],
          ease: ["in", "out", "in-out"],
          font: [gb],
          "font-weight": [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
          ],
          "inset-shadow": [zn],
          leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
          perspective: [
            "dramatic",
            "near",
            "normal",
            "midrange",
            "distant",
            "none",
          ],
          radius: [zn],
          shadow: [zn],
          spacing: ["px", Dt],
          text: [zn],
          tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
        },
        classGroups: {
          aspect: [{ aspect: ["auto", "square", Rl, ut, it, z] }],
          container: ["container"],
          columns: [{ columns: [Dt, ut, it, E] }],
          "break-after": [{ "break-after": X() }],
          "break-before": [{ "break-before": X() }],
          "break-inside": [
            { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
          ],
          "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
          box: [{ box: ["border", "content"] }],
          display: [
            "block",
            "inline-block",
            "inline",
            "flex",
            "inline-flex",
            "table",
            "inline-table",
            "table-caption",
            "table-cell",
            "table-column",
            "table-column-group",
            "table-footer-group",
            "table-header-group",
            "table-row-group",
            "table-row",
            "flow-root",
            "grid",
            "inline-grid",
            "contents",
            "list-item",
            "hidden",
          ],
          sr: ["sr-only", "not-sr-only"],
          float: [{ float: ["right", "left", "none", "start", "end"] }],
          clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
          isolation: ["isolate", "isolation-auto"],
          "object-fit": [
            { object: ["contain", "cover", "fill", "none", "scale-down"] },
          ],
          "object-position": [{ object: [...F(), ut, it] }],
          overflow: [{ overflow: nt() }],
          "overflow-x": [{ "overflow-x": nt() }],
          "overflow-y": [{ "overflow-y": nt() }],
          overscroll: [{ overscroll: J() }],
          "overscroll-x": [{ "overscroll-x": J() }],
          "overscroll-y": [{ "overscroll-y": J() }],
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          inset: [{ inset: gt() }],
          "inset-x": [{ "inset-x": gt() }],
          "inset-y": [{ "inset-y": gt() }],
          start: [{ start: gt() }],
          end: [{ end: gt() }],
          top: [{ top: gt() }],
          right: [{ right: gt() }],
          bottom: [{ bottom: gt() }],
          left: [{ left: gt() }],
          visibility: ["visible", "invisible", "collapse"],
          z: [{ z: [ul, "auto", it, ut] }],
          basis: [{ basis: [Rl, "full", "auto", E, ...K()] }],
          "flex-direction": [
            { flex: ["row", "row-reverse", "col", "col-reverse"] },
          ],
          "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
          flex: [{ flex: [Dt, Rl, "auto", "initial", "none", ut] }],
          grow: [{ grow: ["", Dt, it, ut] }],
          shrink: [{ shrink: ["", Dt, it, ut] }],
          order: [{ order: [ul, "first", "last", "none", it, ut] }],
          "grid-cols": [{ "grid-cols": Ot() }],
          "col-start-end": [{ col: Rt() }],
          "col-start": [{ "col-start": Tt() }],
          "col-end": [{ "col-end": Tt() }],
          "grid-rows": [{ "grid-rows": Ot() }],
          "row-start-end": [{ row: Rt() }],
          "row-start": [{ "row-start": Tt() }],
          "row-end": [{ "row-end": Tt() }],
          "grid-flow": [
            { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
          ],
          "auto-cols": [{ "auto-cols": qt() }],
          "auto-rows": [{ "auto-rows": qt() }],
          gap: [{ gap: K() }],
          "gap-x": [{ "gap-x": K() }],
          "gap-y": [{ "gap-y": K() }],
          "justify-content": [{ justify: [...Ct(), "normal"] }],
          "justify-items": [{ "justify-items": [...Bt(), "normal"] }],
          "justify-self": [{ "justify-self": ["auto", ...Bt()] }],
          "align-content": [{ content: ["normal", ...Ct()] }],
          "align-items": [{ items: [...Bt(), "baseline"] }],
          "align-self": [{ self: ["auto", ...Bt(), "baseline"] }],
          "place-content": [{ "place-content": Ct() }],
          "place-items": [{ "place-items": [...Bt(), "baseline"] }],
          "place-self": [{ "place-self": ["auto", ...Bt()] }],
          p: [{ p: K() }],
          px: [{ px: K() }],
          py: [{ py: K() }],
          ps: [{ ps: K() }],
          pe: [{ pe: K() }],
          pt: [{ pt: K() }],
          pr: [{ pr: K() }],
          pb: [{ pb: K() }],
          pl: [{ pl: K() }],
          m: [{ m: $t() }],
          mx: [{ mx: $t() }],
          my: [{ my: $t() }],
          ms: [{ ms: $t() }],
          me: [{ me: $t() }],
          mt: [{ mt: $t() }],
          mr: [{ mr: $t() }],
          mb: [{ mb: $t() }],
          ml: [{ ml: $t() }],
          "space-x": [{ "space-x": K() }],
          "space-x-reverse": ["space-x-reverse"],
          "space-y": [{ "space-y": K() }],
          "space-y-reverse": ["space-y-reverse"],
          size: [{ size: yt() }],
          w: [{ w: [E, "screen", ...yt()] }],
          "min-w": [{ "min-w": [E, "screen", "none", ...yt()] }],
          "max-w": [
            {
              "max-w": [E, "screen", "none", "prose", { screen: [g] }, ...yt()],
            },
          ],
          h: [{ h: ["screen", ...yt()] }],
          "min-h": [{ "min-h": ["screen", "none", ...yt()] }],
          "max-h": [{ "max-h": ["screen", ...yt()] }],
          "font-size": [{ text: ["base", s, Nu, il] }],
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          "font-style": ["italic", "not-italic"],
          "font-weight": [{ font: [c, it, xr] }],
          "font-stretch": [
            {
              "font-stretch": [
                "ultra-condensed",
                "extra-condensed",
                "condensed",
                "semi-condensed",
                "normal",
                "semi-expanded",
                "expanded",
                "extra-expanded",
                "ultra-expanded",
                ff,
                ut,
              ],
            },
          ],
          "font-family": [{ font: [Sb, ut, r] }],
          "fvn-normal": ["normal-nums"],
          "fvn-ordinal": ["ordinal"],
          "fvn-slashed-zero": ["slashed-zero"],
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          tracking: [{ tracking: [f, it, ut] }],
          "line-clamp": [{ "line-clamp": [Dt, "none", it, xr] }],
          leading: [{ leading: [m, ...K()] }],
          "list-image": [{ "list-image": ["none", it, ut] }],
          "list-style-position": [{ list: ["inside", "outside"] }],
          "list-style-type": [{ list: ["disc", "decimal", "none", it, ut] }],
          "text-alignment": [
            { text: ["left", "center", "right", "justify", "start", "end"] },
          ],
          "placeholder-color": [{ placeholder: _() }],
          "text-color": [{ text: _() }],
          "text-decoration": [
            "underline",
            "overline",
            "line-through",
            "no-underline",
          ],
          "text-decoration-style": [{ decoration: [...S(), "wavy"] }],
          "text-decoration-thickness": [
            { decoration: [Dt, "from-font", "auto", it, il] },
          ],
          "text-decoration-color": [{ decoration: _() }],
          "underline-offset": [{ "underline-offset": [Dt, "auto", it, ut] }],
          "text-transform": [
            "uppercase",
            "lowercase",
            "capitalize",
            "normal-case",
          ],
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
          indent: [{ indent: K() }],
          "vertical-align": [
            {
              align: [
                "baseline",
                "top",
                "middle",
                "bottom",
                "text-top",
                "text-bottom",
                "sub",
                "super",
                it,
                ut,
              ],
            },
          ],
          whitespace: [
            {
              whitespace: [
                "normal",
                "nowrap",
                "pre",
                "pre-line",
                "pre-wrap",
                "break-spaces",
              ],
            },
          ],
          break: [{ break: ["normal", "words", "all", "keep"] }],
          hyphens: [{ hyphens: ["none", "manual", "auto"] }],
          content: [{ content: ["none", it, ut] }],
          "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
          "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
          "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
          "bg-position": [{ bg: [...F(), Eb, vb] }],
          "bg-repeat": [
            { bg: ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }] },
          ],
          "bg-size": [{ bg: ["auto", "cover", "contain", Tb, yb] }],
          "bg-image": [
            {
              bg: [
                "none",
                {
                  linear: [
                    { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                    ul,
                    it,
                    ut,
                  ],
                  radial: ["", it, ut],
                  conic: [ul, it, ut],
                },
                Ab,
                bb,
              ],
            },
          ],
          "bg-color": [{ bg: _() }],
          "gradient-from-pos": [{ from: W() }],
          "gradient-via-pos": [{ via: W() }],
          "gradient-to-pos": [{ to: W() }],
          "gradient-from": [{ from: _() }],
          "gradient-via": [{ via: _() }],
          "gradient-to": [{ to: _() }],
          rounded: [{ rounded: tt() }],
          "rounded-s": [{ "rounded-s": tt() }],
          "rounded-e": [{ "rounded-e": tt() }],
          "rounded-t": [{ "rounded-t": tt() }],
          "rounded-r": [{ "rounded-r": tt() }],
          "rounded-b": [{ "rounded-b": tt() }],
          "rounded-l": [{ "rounded-l": tt() }],
          "rounded-ss": [{ "rounded-ss": tt() }],
          "rounded-se": [{ "rounded-se": tt() }],
          "rounded-ee": [{ "rounded-ee": tt() }],
          "rounded-es": [{ "rounded-es": tt() }],
          "rounded-tl": [{ "rounded-tl": tt() }],
          "rounded-tr": [{ "rounded-tr": tt() }],
          "rounded-br": [{ "rounded-br": tt() }],
          "rounded-bl": [{ "rounded-bl": tt() }],
          "border-w": [{ border: bt() }],
          "border-w-x": [{ "border-x": bt() }],
          "border-w-y": [{ "border-y": bt() }],
          "border-w-s": [{ "border-s": bt() }],
          "border-w-e": [{ "border-e": bt() }],
          "border-w-t": [{ "border-t": bt() }],
          "border-w-r": [{ "border-r": bt() }],
          "border-w-b": [{ "border-b": bt() }],
          "border-w-l": [{ "border-l": bt() }],
          "divide-x": [{ "divide-x": bt() }],
          "divide-x-reverse": ["divide-x-reverse"],
          "divide-y": [{ "divide-y": bt() }],
          "divide-y-reverse": ["divide-y-reverse"],
          "border-style": [{ border: [...S(), "hidden", "none"] }],
          "divide-style": [{ divide: [...S(), "hidden", "none"] }],
          "border-color": [{ border: _() }],
          "border-color-x": [{ "border-x": _() }],
          "border-color-y": [{ "border-y": _() }],
          "border-color-s": [{ "border-s": _() }],
          "border-color-e": [{ "border-e": _() }],
          "border-color-t": [{ "border-t": _() }],
          "border-color-r": [{ "border-r": _() }],
          "border-color-b": [{ "border-b": _() }],
          "border-color-l": [{ "border-l": _() }],
          "divide-color": [{ divide: _() }],
          "outline-style": [{ outline: [...S(), "none", "hidden"] }],
          "outline-offset": [{ "outline-offset": [Dt, it, ut] }],
          "outline-w": [{ outline: ["", Dt, Nu, il] }],
          "outline-color": [{ outline: [a] }],
          shadow: [{ shadow: ["", "none", O, wb, pb] }],
          "shadow-color": [{ shadow: _() }],
          "inset-shadow": [{ "inset-shadow": ["none", it, ut, k] }],
          "inset-shadow-color": [{ "inset-shadow": _() }],
          "ring-w": [{ ring: bt() }],
          "ring-w-inset": ["ring-inset"],
          "ring-color": [{ ring: _() }],
          "ring-offset-w": [{ "ring-offset": [Dt, il] }],
          "ring-offset-color": [{ "ring-offset": _() }],
          "inset-ring-w": [{ "inset-ring": bt() }],
          "inset-ring-color": [{ "inset-ring": _() }],
          opacity: [{ opacity: [Dt, it, ut] }],
          "mix-blend": [
            { "mix-blend": [...V(), "plus-darker", "plus-lighter"] },
          ],
          "bg-blend": [{ "bg-blend": V() }],
          filter: [{ filter: ["", "none", it, ut] }],
          blur: [{ blur: Z() }],
          brightness: [{ brightness: [Dt, it, ut] }],
          contrast: [{ contrast: [Dt, it, ut] }],
          "drop-shadow": [{ "drop-shadow": ["", "none", L, it, ut] }],
          grayscale: [{ grayscale: ["", Dt, it, ut] }],
          "hue-rotate": [{ "hue-rotate": [Dt, it, ut] }],
          invert: [{ invert: ["", Dt, it, ut] }],
          saturate: [{ saturate: [Dt, it, ut] }],
          sepia: [{ sepia: ["", Dt, it, ut] }],
          "backdrop-filter": [{ "backdrop-filter": ["", "none", it, ut] }],
          "backdrop-blur": [{ "backdrop-blur": Z() }],
          "backdrop-brightness": [{ "backdrop-brightness": [Dt, it, ut] }],
          "backdrop-contrast": [{ "backdrop-contrast": [Dt, it, ut] }],
          "backdrop-grayscale": [{ "backdrop-grayscale": ["", Dt, it, ut] }],
          "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Dt, it, ut] }],
          "backdrop-invert": [{ "backdrop-invert": ["", Dt, it, ut] }],
          "backdrop-opacity": [{ "backdrop-opacity": [Dt, it, ut] }],
          "backdrop-saturate": [{ "backdrop-saturate": [Dt, it, ut] }],
          "backdrop-sepia": [{ "backdrop-sepia": ["", Dt, it, ut] }],
          "border-collapse": [{ border: ["collapse", "separate"] }],
          "border-spacing": [{ "border-spacing": K() }],
          "border-spacing-x": [{ "border-spacing-x": K() }],
          "border-spacing-y": [{ "border-spacing-y": K() }],
          "table-layout": [{ table: ["auto", "fixed"] }],
          caption: [{ caption: ["top", "bottom"] }],
          transition: [
            {
              transition: [
                "",
                "all",
                "colors",
                "opacity",
                "shadow",
                "transform",
                "none",
                it,
                ut,
              ],
            },
          ],
          "transition-behavior": [{ transition: ["normal", "discrete"] }],
          duration: [{ duration: [Dt, "initial", it, ut] }],
          ease: [{ ease: ["linear", "initial", C, it, ut] }],
          delay: [{ delay: [Dt, it, ut] }],
          animate: [{ animate: ["none", U, it, ut] }],
          backface: [{ backface: ["hidden", "visible"] }],
          perspective: [{ perspective: [$, it, ut] }],
          "perspective-origin": [{ "perspective-origin": I() }],
          rotate: [{ rotate: lt() }],
          "rotate-x": [{ "rotate-x": lt() }],
          "rotate-y": [{ "rotate-y": lt() }],
          "rotate-z": [{ "rotate-z": lt() }],
          scale: [{ scale: pt() }],
          "scale-x": [{ "scale-x": pt() }],
          "scale-y": [{ "scale-y": pt() }],
          "scale-z": [{ "scale-z": pt() }],
          "scale-3d": ["scale-3d"],
          skew: [{ skew: ht() }],
          "skew-x": [{ "skew-x": ht() }],
          "skew-y": [{ "skew-y": ht() }],
          transform: [{ transform: [it, ut, "", "none", "gpu", "cpu"] }],
          "transform-origin": [{ origin: I() }],
          "transform-style": [{ transform: ["3d", "flat"] }],
          translate: [{ translate: Wt() }],
          "translate-x": [{ "translate-x": Wt() }],
          "translate-y": [{ "translate-y": Wt() }],
          "translate-z": [{ "translate-z": Wt() }],
          "translate-none": ["translate-none"],
          accent: [{ accent: _() }],
          appearance: [{ appearance: ["none", "auto"] }],
          "caret-color": [{ caret: _() }],
          "color-scheme": [
            {
              scheme: [
                "normal",
                "dark",
                "light",
                "light-dark",
                "only-dark",
                "only-light",
              ],
            },
          ],
          cursor: [
            {
              cursor: [
                "auto",
                "default",
                "pointer",
                "wait",
                "text",
                "move",
                "help",
                "not-allowed",
                "none",
                "context-menu",
                "progress",
                "cell",
                "crosshair",
                "vertical-text",
                "alias",
                "copy",
                "no-drop",
                "grab",
                "grabbing",
                "all-scroll",
                "col-resize",
                "row-resize",
                "n-resize",
                "e-resize",
                "s-resize",
                "w-resize",
                "ne-resize",
                "nw-resize",
                "se-resize",
                "sw-resize",
                "ew-resize",
                "ns-resize",
                "nesw-resize",
                "nwse-resize",
                "zoom-in",
                "zoom-out",
                it,
                ut,
              ],
            },
          ],
          "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
          "pointer-events": [{ "pointer-events": ["auto", "none"] }],
          resize: [{ resize: ["none", "", "y", "x"] }],
          "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
          "scroll-m": [{ "scroll-m": K() }],
          "scroll-mx": [{ "scroll-mx": K() }],
          "scroll-my": [{ "scroll-my": K() }],
          "scroll-ms": [{ "scroll-ms": K() }],
          "scroll-me": [{ "scroll-me": K() }],
          "scroll-mt": [{ "scroll-mt": K() }],
          "scroll-mr": [{ "scroll-mr": K() }],
          "scroll-mb": [{ "scroll-mb": K() }],
          "scroll-ml": [{ "scroll-ml": K() }],
          "scroll-p": [{ "scroll-p": K() }],
          "scroll-px": [{ "scroll-px": K() }],
          "scroll-py": [{ "scroll-py": K() }],
          "scroll-ps": [{ "scroll-ps": K() }],
          "scroll-pe": [{ "scroll-pe": K() }],
          "scroll-pt": [{ "scroll-pt": K() }],
          "scroll-pr": [{ "scroll-pr": K() }],
          "scroll-pb": [{ "scroll-pb": K() }],
          "scroll-pl": [{ "scroll-pl": K() }],
          "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
          "snap-stop": [{ snap: ["normal", "always"] }],
          "snap-type": [{ snap: ["none", "x", "y", "both"] }],
          "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
          touch: [{ touch: ["auto", "none", "manipulation"] }],
          "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
          "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
          "touch-pz": ["touch-pinch-zoom"],
          select: [{ select: ["none", "text", "all", "auto"] }],
          "will-change": [
            {
              "will-change": [
                "auto",
                "scroll",
                "contents",
                "transform",
                it,
                ut,
              ],
            },
          ],
          fill: [{ fill: ["none", ..._()] }],
          "stroke-w": [{ stroke: [Dt, Nu, il, xr] }],
          stroke: [{ stroke: ["none", ..._()] }],
          "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: [
            "inset-x",
            "inset-y",
            "start",
            "end",
            "top",
            "right",
            "bottom",
            "left",
          ],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": [
            "fvn-ordinal",
            "fvn-slashed-zero",
            "fvn-figure",
            "fvn-spacing",
            "fvn-fraction",
          ],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: [
            "rounded-s",
            "rounded-e",
            "rounded-t",
            "rounded-r",
            "rounded-b",
            "rounded-l",
            "rounded-ss",
            "rounded-se",
            "rounded-ee",
            "rounded-es",
            "rounded-tl",
            "rounded-tr",
            "rounded-br",
            "rounded-bl",
          ],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": [
            "border-w-s",
            "border-w-e",
            "border-w-t",
            "border-w-r",
            "border-w-b",
            "border-w-l",
          ],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": [
            "border-color-s",
            "border-color-e",
            "border-color-t",
            "border-color-r",
            "border-color-b",
            "border-color-l",
          ],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          translate: ["translate-x", "translate-y", "translate-none"],
          "translate-none": [
            "translate",
            "translate-x",
            "translate-y",
            "translate-z",
          ],
          "scroll-m": [
            "scroll-mx",
            "scroll-my",
            "scroll-ms",
            "scroll-me",
            "scroll-mt",
            "scroll-mr",
            "scroll-mb",
            "scroll-ml",
          ],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": [
            "scroll-px",
            "scroll-py",
            "scroll-ps",
            "scroll-pe",
            "scroll-pt",
            "scroll-pr",
            "scroll-pb",
            "scroll-pl",
          ],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"],
        },
        conflictingClassGroupModifiers: { "font-size": ["leading"] },
        orderSensitiveModifiers: [
          "before",
          "after",
          "placeholder",
          "file",
          "marker",
          "selection",
          "first-line",
          "first-letter",
          "backdrop",
          "*",
          "**",
        ],
      };
    });
  function zb(...a) {
    return Rb(Qv(a));
  }
  const { useExtensionMessageListener: yf } = Xv();
  function Nb() {
    const [a, r] = Se.useState(null),
      [s, c] = Se.useState(!1),
      f = Se.useRef(null);
    return (
      yf("setCursorPosition", async (m) => {
        const { x: g, y: E } = m.payload;
        if (!a) {
          const b = Ub({ position: a, targetPosition: { x: g, y: E } });
          r(b);
        }
        c(!0), setTimeout(() => r({ x: g, y: E }), 100);
      }),
      yf("hideCursor", async () => {
        c(!1);
      }),
      Se.useEffect(() => {
        f.current &&
          a &&
          (f.current.style.transform = `translate(${a.x}px, ${a.y}px)`);
      }, [a]),
      s
        ? xl.jsx("div", {
            ref: f,
            className: zb(
              "z-2147483647 pointer-events-none fixed",
              "-left-1 -top-1 size-8",
              "transition-transform duration-500 ease-in",
            ),
            style: {
              transform: a
                ? `translate(${a.x}px, ${a.y}px)`
                : "translate(0, 0)",
            },
            children: xl.jsx(jv, {
              className:
                "size-full fill-black stroke-white stroke-[1.5] text-black",
            }),
          })
        : null
    );
  }
  const Cb = 100;
  function Ub({ position: a, targetPosition: r, distancePx: s = Cb }) {
    const { x: c, y: f } = r,
      m = a ?? { x: 0, y: 0 };
    if (Math.sqrt((m.x - c) ** 2 + (m.y - f) ** 2) <= s) return r;
    const E = Math.atan2(m.y - f, m.x - c),
      b = c + s * Math.cos(E),
      p = f + s * Math.sin(E);
    return { x: b, y: p };
  }
  function Hb(a) {
    const [r, s] = Se.useState(void 0),
      [c, f] = Se.useState(!0);
    return (
      Se.useEffect(() => {
        async function m() {
          const g = await a.getValue();
          s(g), f(!1);
        }
        m();
      }, [a]),
      Se.useEffect(() => {
        const m = a.watch((g) => {
          s(g);
        });
        return () => {
          m();
        };
      }, [a]),
      [r, a.setValue, c]
    );
  }
  var vf = Object.prototype.hasOwnProperty;
  function _r(a, r) {
    var s, c;
    if (a === r) return !0;
    if (a && r && (s = a.constructor) === r.constructor) {
      if (s === Date) return a.getTime() === r.getTime();
      if (s === RegExp) return a.toString() === r.toString();
      if (s === Array) {
        if ((c = a.length) === r.length) for (; c-- && _r(a[c], r[c]); );
        return c === -1;
      }
      if (!s || typeof a == "object") {
        c = 0;
        for (s in a)
          if (
            (vf.call(a, s) && ++c && !vf.call(r, s)) ||
            !(s in r) ||
            !_r(a[s], r[s])
          )
            return !1;
        return Object.keys(r).length === c;
      }
    }
    return a !== a && r !== r;
  }
  const Lb = new Error("request for lock canceled");
  var qb = function (a, r, s, c) {
    function f(m) {
      return m instanceof s
        ? m
        : new s(function (g) {
            g(m);
          });
    }
    return new (s || (s = Promise))(function (m, g) {
      function E(O) {
        try {
          p(c.next(O));
        } catch (k) {
          g(k);
        }
      }
      function b(O) {
        try {
          p(c.throw(O));
        } catch (k) {
          g(k);
        }
      }
      function p(O) {
        O.done ? m(O.value) : f(O.value).then(E, b);
      }
      p((c = c.apply(a, r || [])).next());
    });
  };
  class Bb {
    constructor(r, s = Lb) {
      (this._value = r),
        (this._cancelError = s),
        (this._queue = []),
        (this._weightedWaiters = []);
    }
    acquire(r = 1, s = 0) {
      if (r <= 0) throw new Error(`invalid weight ${r}: must be positive`);
      return new Promise((c, f) => {
        const m = { resolve: c, reject: f, weight: r, priority: s },
          g = bf(this._queue, (E) => s <= E.priority);
        g === -1 && r <= this._value
          ? this._dispatchItem(m)
          : this._queue.splice(g + 1, 0, m);
      });
    }
    runExclusive(r) {
      return qb(this, arguments, void 0, function* (s, c = 1, f = 0) {
        const [m, g] = yield this.acquire(c, f);
        try {
          return yield s(m);
        } finally {
          g();
        }
      });
    }
    waitForUnlock(r = 1, s = 0) {
      if (r <= 0) throw new Error(`invalid weight ${r}: must be positive`);
      return this._couldLockImmediately(r, s)
        ? Promise.resolve()
        : new Promise((c) => {
            this._weightedWaiters[r - 1] || (this._weightedWaiters[r - 1] = []),
              Gb(this._weightedWaiters[r - 1], { resolve: c, priority: s });
          });
    }
    isLocked() {
      return this._value <= 0;
    }
    getValue() {
      return this._value;
    }
    setValue(r) {
      (this._value = r), this._dispatchQueue();
    }
    release(r = 1) {
      if (r <= 0) throw new Error(`invalid weight ${r}: must be positive`);
      (this._value += r), this._dispatchQueue();
    }
    cancel() {
      this._queue.forEach((r) => r.reject(this._cancelError)),
        (this._queue = []);
    }
    _dispatchQueue() {
      for (
        this._drainUnlockWaiters();
        this._queue.length > 0 && this._queue[0].weight <= this._value;

      )
        this._dispatchItem(this._queue.shift()), this._drainUnlockWaiters();
    }
    _dispatchItem(r) {
      const s = this._value;
      (this._value -= r.weight), r.resolve([s, this._newReleaser(r.weight)]);
    }
    _newReleaser(r) {
      let s = !1;
      return () => {
        s || ((s = !0), this.release(r));
      };
    }
    _drainUnlockWaiters() {
      if (this._queue.length === 0)
        for (let r = this._value; r > 0; r--) {
          const s = this._weightedWaiters[r - 1];
          s &&
            (s.forEach((c) => c.resolve()),
            (this._weightedWaiters[r - 1] = []));
        }
      else {
        const r = this._queue[0].priority;
        for (let s = this._value; s > 0; s--) {
          const c = this._weightedWaiters[s - 1];
          if (!c) continue;
          const f = c.findIndex((m) => m.priority <= r);
          (f === -1 ? c : c.splice(0, f)).forEach((m) => m.resolve());
        }
      }
    }
    _couldLockImmediately(r, s) {
      return (
        (this._queue.length === 0 || this._queue[0].priority < s) &&
        r <= this._value
      );
    }
  }
  function Gb(a, r) {
    const s = bf(a, (c) => r.priority <= c.priority);
    a.splice(s + 1, 0, r);
  }
  function bf(a, r) {
    for (let s = a.length - 1; s >= 0; s--) if (r(a[s])) return s;
    return -1;
  }
  var Yb = function (a, r, s, c) {
    function f(m) {
      return m instanceof s
        ? m
        : new s(function (g) {
            g(m);
          });
    }
    return new (s || (s = Promise))(function (m, g) {
      function E(O) {
        try {
          p(c.next(O));
        } catch (k) {
          g(k);
        }
      }
      function b(O) {
        try {
          p(c.throw(O));
        } catch (k) {
          g(k);
        }
      }
      function p(O) {
        O.done ? m(O.value) : f(O.value).then(E, b);
      }
      p((c = c.apply(a, r || [])).next());
    });
  };
  class Vb {
    constructor(r) {
      this._semaphore = new Bb(1, r);
    }
    acquire() {
      return Yb(this, arguments, void 0, function* (r = 0) {
        const [, s] = yield this._semaphore.acquire(1, r);
        return s;
      });
    }
    runExclusive(r, s = 0) {
      return this._semaphore.runExclusive(() => r(), 1, s);
    }
    isLocked() {
      return this._semaphore.isLocked();
    }
    waitForUnlock(r = 0) {
      return this._semaphore.waitForUnlock(1, r);
    }
    release() {
      this._semaphore.isLocked() && this._semaphore.release();
    }
    cancel() {
      return this._semaphore.cancel();
    }
  }
  const Cu =
      ((Tf = (Ef = globalThis.browser) == null ? void 0 : Ef.runtime) == null
        ? void 0
        : Tf.id) == null
        ? globalThis.chrome
        : globalThis.browser,
    jb = Xb();
  function Xb() {
    const a = {
        local: Uu("local"),
        session: Uu("session"),
        sync: Uu("sync"),
        managed: Uu("managed"),
      },
      r = (z) => {
        const C = a[z];
        if (C == null) {
          const U = Object.keys(a).join(", ");
          throw Error(`Invalid area "${z}". Options: ${U}`);
        }
        return C;
      },
      s = (z) => {
        const C = z.indexOf(":"),
          U = z.substring(0, C),
          X = z.substring(C + 1);
        if (X == null)
          throw Error(
            `Storage key should be in the form of "area:key", but received "${z}"`,
          );
        return { driverArea: U, driverKey: X, driver: r(U) };
      },
      c = (z) => z + "$",
      f = (z, C) => {
        const U = { ...z };
        return (
          Object.entries(C).forEach(([X, F]) => {
            F == null ? delete U[X] : (U[X] = F);
          }),
          U
        );
      },
      m = (z, C) => z ?? C ?? null,
      g = (z) => (typeof z == "object" && !Array.isArray(z) ? z : {}),
      E = async (z, C, U) => {
        const X = await z.getItem(C);
        return m(
          X,
          (U == null ? void 0 : U.fallback) ??
            (U == null ? void 0 : U.defaultValue),
        );
      },
      b = async (z, C) => {
        const U = c(C),
          X = await z.getItem(U);
        return g(X);
      },
      p = async (z, C, U) => {
        await z.setItem(C, U ?? null);
      },
      O = async (z, C, U) => {
        const X = c(C),
          F = g(await z.getItem(X));
        await z.setItem(X, f(F, U));
      },
      k = async (z, C, U) => {
        if ((await z.removeItem(C), U != null && U.removeMeta)) {
          const X = c(C);
          await z.removeItem(X);
        }
      },
      L = async (z, C, U) => {
        const X = c(C);
        if (U == null) await z.removeItem(X);
        else {
          const F = g(await z.getItem(X));
          [U].flat().forEach((nt) => delete F[nt]), await z.setItem(X, F);
        }
      },
      Q = (z, C, U) => z.watch(C, U);
    return {
      getItem: async (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        return await E(U, X, C);
      },
      getItems: async (z) => {
        const C = new Map(),
          U = new Map(),
          X = [];
        z.forEach((nt) => {
          let J, K;
          typeof nt == "string"
            ? (J = nt)
            : "getValue" in nt
              ? ((J = nt.key), (K = { fallback: nt.fallback }))
              : ((J = nt.key), (K = nt.options)),
            X.push(J);
          const { driverArea: gt, driverKey: Ot } = s(J),
            Rt = C.get(gt) ?? [];
          C.set(gt, Rt.concat(Ot)), U.set(J, K);
        });
        const F = new Map();
        return (
          await Promise.all(
            Array.from(C.entries()).map(async ([nt, J]) => {
              (await a[nt].getItems(J)).forEach((gt) => {
                const Ot = `${nt}:${gt.key}`,
                  Rt = U.get(Ot),
                  Tt = m(
                    gt.value,
                    (Rt == null ? void 0 : Rt.fallback) ??
                      (Rt == null ? void 0 : Rt.defaultValue),
                  );
                F.set(Ot, Tt);
              });
            }),
          ),
          X.map((nt) => ({ key: nt, value: F.get(nt) }))
        );
      },
      getMeta: async (z) => {
        const { driver: C, driverKey: U } = s(z);
        return await b(C, U);
      },
      getMetas: async (z) => {
        const C = z.map((F) => {
            const nt = typeof F == "string" ? F : F.key,
              { driverArea: J, driverKey: K } = s(nt);
            return {
              key: nt,
              driverArea: J,
              driverKey: K,
              driverMetaKey: c(K),
            };
          }),
          U = C.reduce((F, nt) => {
            var J;
            return (
              F[(J = nt.driverArea)] ?? (F[J] = []),
              F[nt.driverArea].push(nt),
              F
            );
          }, {}),
          X = {};
        return (
          await Promise.all(
            Object.entries(U).map(async ([F, nt]) => {
              const J = await Cu.storage[F].get(nt.map((K) => K.driverMetaKey));
              nt.forEach((K) => {
                X[K.key] = J[K.driverMetaKey] ?? {};
              });
            }),
          ),
          C.map((F) => ({ key: F.key, meta: X[F.key] }))
        );
      },
      setItem: async (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        await p(U, X, C);
      },
      setItems: async (z) => {
        const C = {};
        z.forEach((U) => {
          const { driverArea: X, driverKey: F } = s(
            "key" in U ? U.key : U.item.key,
          );
          C[X] ?? (C[X] = []), C[X].push({ key: F, value: U.value });
        }),
          await Promise.all(
            Object.entries(C).map(async ([U, X]) => {
              await r(U).setItems(X);
            }),
          );
      },
      setMeta: async (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        await O(U, X, C);
      },
      setMetas: async (z) => {
        const C = {};
        z.forEach((U) => {
          const { driverArea: X, driverKey: F } = s(
            "key" in U ? U.key : U.item.key,
          );
          C[X] ?? (C[X] = []), C[X].push({ key: F, properties: U.meta });
        }),
          await Promise.all(
            Object.entries(C).map(async ([U, X]) => {
              const F = r(U),
                nt = X.map(({ key: Ot }) => c(Ot));
              console.log(U, nt);
              const J = await F.getItems(nt),
                K = Object.fromEntries(
                  J.map(({ key: Ot, value: Rt }) => [Ot, g(Rt)]),
                ),
                gt = X.map(({ key: Ot, properties: Rt }) => {
                  const Tt = c(Ot);
                  return { key: Tt, value: f(K[Tt] ?? {}, Rt) };
                });
              await F.setItems(gt);
            }),
          );
      },
      removeItem: async (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        await k(U, X, C);
      },
      removeItems: async (z) => {
        const C = {};
        z.forEach((U) => {
          let X, F;
          typeof U == "string"
            ? (X = U)
            : "getValue" in U
              ? (X = U.key)
              : "item" in U
                ? ((X = U.item.key), (F = U.options))
                : ((X = U.key), (F = U.options));
          const { driverArea: nt, driverKey: J } = s(X);
          C[nt] ?? (C[nt] = []),
            C[nt].push(J),
            F != null && F.removeMeta && C[nt].push(c(J));
        }),
          await Promise.all(
            Object.entries(C).map(async ([U, X]) => {
              await r(U).removeItems(X);
            }),
          );
      },
      clear: async (z) => {
        await r(z).clear();
      },
      removeMeta: async (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        await L(U, X, C);
      },
      snapshot: async (z, C) => {
        var F;
        const X = await r(z).snapshot();
        return (
          (F = C == null ? void 0 : C.excludeKeys) == null ||
            F.forEach((nt) => {
              delete X[nt], delete X[c(nt)];
            }),
          X
        );
      },
      restoreSnapshot: async (z, C) => {
        await r(z).restoreSnapshot(C);
      },
      watch: (z, C) => {
        const { driver: U, driverKey: X } = s(z);
        return Q(U, X, C);
      },
      unwatch() {
        Object.values(a).forEach((z) => {
          z.unwatch();
        });
      },
      defineItem: (z, C) => {
        const { driver: U, driverKey: X } = s(z),
          { version: F = 1, migrations: nt = {} } = C ?? {};
        if (F < 1)
          throw Error(
            "Storage item version cannot be less than 1. Initial versions should be set to 1, not 0.",
          );
        const J = async () => {
            var _;
            const Tt = c(X),
              [{ value: qt }, { value: Ct }] = await U.getItems([X, Tt]);
            if (qt == null) return;
            const Bt = (Ct == null ? void 0 : Ct.v) ?? 1;
            if (Bt > F)
              throw Error(
                `Version downgrade detected (v${Bt} -> v${F}) for "${z}"`,
              );
            if (Bt === F) return;
            console.debug(
              `[@wxt-dev/storage] Running storage migration for ${z}: v${Bt} -> v${F}`,
            );
            const $t = Array.from({ length: F - Bt }, (W, tt) => Bt + tt + 1);
            let yt = qt;
            for (const W of $t)
              try {
                yt =
                  (await ((_ = nt == null ? void 0 : nt[W]) == null
                    ? void 0
                    : _.call(nt, yt))) ?? yt;
              } catch (tt) {
                throw new Qb(z, W, { cause: tt });
              }
            await U.setItems([
              { key: X, value: yt },
              { key: Tt, value: { ...Ct, v: F } },
            ]),
              console.debug(
                `[@wxt-dev/storage] Storage migration completed for ${z} v${F}`,
                { migratedValue: yt },
              );
          },
          K =
            (C == null ? void 0 : C.migrations) == null
              ? Promise.resolve()
              : J().catch((Tt) => {
                  console.error(
                    `[@wxt-dev/storage] Migration failed for ${z}`,
                    Tt,
                  );
                }),
          gt = new Vb(),
          Ot = () =>
            (C == null ? void 0 : C.fallback) ??
            (C == null ? void 0 : C.defaultValue) ??
            null,
          Rt = () =>
            gt.runExclusive(async () => {
              const Tt = await U.getItem(X);
              if (Tt != null || (C == null ? void 0 : C.init) == null)
                return Tt;
              const qt = await C.init();
              return await U.setItem(X, qt), qt;
            });
        return (
          K.then(Rt),
          {
            key: z,
            get defaultValue() {
              return Ot();
            },
            get fallback() {
              return Ot();
            },
            getValue: async () => (
              await K, C != null && C.init ? await Rt() : await E(U, X, C)
            ),
            getMeta: async () => (await K, await b(U, X)),
            setValue: async (Tt) => (await K, await p(U, X, Tt)),
            setMeta: async (Tt) => (await K, await O(U, X, Tt)),
            removeValue: async (Tt) => (await K, await k(U, X, Tt)),
            removeMeta: async (Tt) => (await K, await L(U, X, Tt)),
            watch: (Tt) => Q(U, X, (qt, Ct) => Tt(qt ?? Ot(), Ct ?? Ot())),
            migrate: J,
          }
        );
      },
    };
  }
  function Uu(a) {
    const r = () => {
        if (Cu.runtime == null)
          throw Error(
            [
              "'wxt/storage' must be loaded in a web extension environment",
              `
 - If thrown during a build, see https://github.com/wxt-dev/wxt/issues/371`,
              ` - If thrown during tests, mock 'wxt/browser' correctly. See https://wxt.dev/guide/go-further/testing.html
`,
            ].join(`
`),
          );
        if (Cu.storage == null)
          throw Error(
            "You must add the 'storage' permission to your manifest to use 'wxt/storage'",
          );
        const c = Cu.storage[a];
        if (c == null) throw Error(`"browser.storage.${a}" is undefined`);
        return c;
      },
      s = new Set();
    return {
      getItem: async (c) => (await r().get(c))[c],
      getItems: async (c) => {
        const f = await r().get(c);
        return c.map((m) => ({ key: m, value: f[m] ?? null }));
      },
      setItem: async (c, f) => {
        f == null ? await r().remove(c) : await r().set({ [c]: f });
      },
      setItems: async (c) => {
        const f = c.reduce((m, { key: g, value: E }) => ((m[g] = E), m), {});
        await r().set(f);
      },
      removeItem: async (c) => {
        await r().remove(c);
      },
      removeItems: async (c) => {
        await r().remove(c);
      },
      clear: async () => {
        await r().clear();
      },
      snapshot: async () => await r().get(),
      restoreSnapshot: async (c) => {
        await r().set(c);
      },
      watch(c, f) {
        const m = (g) => {
          const E = g[c];
          E != null &&
            (_r(E.newValue, E.oldValue) ||
              f(E.newValue ?? null, E.oldValue ?? null));
        };
        return (
          r().onChanged.addListener(m),
          s.add(m),
          () => {
            r().onChanged.removeListener(m), s.delete(m);
          }
        );
      },
      unwatch() {
        s.forEach((c) => {
          r().onChanged.removeListener(c);
        }),
          s.clear();
      },
    };
  }
  class Qb extends Error {
    constructor(r, s, c) {
      super(`v${s} migration failed for "${r}"`, c),
        (this.key = r),
        (this.version = s);
    }
  }
  const Zb = jb.defineItem("local:selectedTabId", { fallback: null });
  function Kb() {
    const [a] = Hb(Zb);
    return !!a;
  }
  function Jb({ children: a }) {
    return Kb() ? xl.jsx("div", { children: a }) : null;
  }
  function kb() {
    return xl.jsx(Jb, { children: xl.jsx(Nb, {}) });
  }
  const $b = {
      matches: ["<all_urls>"],
      cssInjectionMode: "ui",
      async main(a) {
        (
          await iy(a, {
            name: eo(),
            position: "inline",
            anchor: "body",
            isolateEvents: !0,
            inheritStyles: !0,
            onMount: (c) => {
              const f = document.createElement("div");
              c.append(f);
              const m = Yg.createRoot(f);
              return m.render(xl.jsx(kb, {})), m;
            },
            onRemove: (c) => {
              c == null || c.unmount();
            },
          })
        ).mount();
        const s = Hv();
        a.onInvalidated(() => {
          s();
        }),
          dy();
      },
    },
    Lu = class Lu extends Event {
      constructor(r, s) {
        super(Lu.EVENT_NAME, {}), (this.newUrl = r), (this.oldUrl = s);
      }
    };
  Ml(Lu, "EVENT_NAME", Or("wxt:locationchange"));
  let Dr = Lu;
  function Or(a) {
    var r;
    return `${(r = Ea == null ? void 0 : Ea.runtime) == null ? void 0 : r.id}:content:${a}`;
  }
  function Fb(a) {
    let r, s;
    return {
      run() {
        r == null &&
          ((s = new URL(location.href)),
          (r = a.setInterval(() => {
            let c = new URL(location.href);
            c.href !== s.href && (window.dispatchEvent(new Dr(c, s)), (s = c));
          }, 1e3)));
      },
    };
  }
  const Ta = class Ta {
    constructor(r, s) {
      Ml(this, "isTopFrame", window.self === window.top);
      Ml(this, "abortController");
      Ml(this, "locationWatcher", Fb(this));
      Ml(this, "receivedMessageIds", new Set());
      (this.contentScriptName = r),
        (this.options = s),
        (this.abortController = new AbortController()),
        this.isTopFrame
          ? (this.listenForNewerScripts({ ignoreFirstEvent: !0 }),
            this.stopOldScripts())
          : this.listenForNewerScripts();
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(r) {
      return this.abortController.abort(r);
    }
    get isInvalid() {
      return (
        Ea.runtime.id == null && this.notifyInvalidated(), this.signal.aborted
      );
    }
    get isValid() {
      return !this.isInvalid;
    }
    onInvalidated(r) {
      return (
        this.signal.addEventListener("abort", r),
        () => this.signal.removeEventListener("abort", r)
      );
    }
    block() {
      return new Promise(() => {});
    }
    setInterval(r, s) {
      const c = setInterval(() => {
        this.isValid && r();
      }, s);
      return this.onInvalidated(() => clearInterval(c)), c;
    }
    setTimeout(r, s) {
      const c = setTimeout(() => {
        this.isValid && r();
      }, s);
      return this.onInvalidated(() => clearTimeout(c)), c;
    }
    requestAnimationFrame(r) {
      const s = requestAnimationFrame((...c) => {
        this.isValid && r(...c);
      });
      return this.onInvalidated(() => cancelAnimationFrame(s)), s;
    }
    requestIdleCallback(r, s) {
      const c = requestIdleCallback((...f) => {
        this.signal.aborted || r(...f);
      }, s);
      return this.onInvalidated(() => cancelIdleCallback(c)), c;
    }
    addEventListener(r, s, c, f) {
      var m;
      s === "wxt:locationchange" && this.isValid && this.locationWatcher.run(),
        (m = r.addEventListener) == null ||
          m.call(r, s.startsWith("wxt:") ? Or(s) : s, c, {
            ...f,
            signal: this.signal,
          });
    }
    notifyInvalidated() {
      this.abort("Content script context invalidated"),
        fr.debug(
          `Content script "${this.contentScriptName}" context invalidated`,
        );
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: Ta.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName,
          messageId: Math.random().toString(36).slice(2),
        },
        "*",
      );
    }
    verifyScriptStartedEvent(r) {
      var m, g, E;
      const s =
          ((m = r.data) == null ? void 0 : m.type) ===
          Ta.SCRIPT_STARTED_MESSAGE_TYPE,
        c =
          ((g = r.data) == null ? void 0 : g.contentScriptName) ===
          this.contentScriptName,
        f = !this.receivedMessageIds.has(
          (E = r.data) == null ? void 0 : E.messageId,
        );
      return s && c && f;
    }
    listenForNewerScripts(r) {
      let s = !0;
      const c = (f) => {
        if (this.verifyScriptStartedEvent(f)) {
          this.receivedMessageIds.add(f.data.messageId);
          const m = s;
          if (((s = !1), m && r != null && r.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      addEventListener("message", c),
        this.onInvalidated(() => removeEventListener("message", c));
    }
  };
  Ml(Ta, "SCRIPT_STARTED_MESSAGE_TYPE", Or("wxt:content-script-started"));
  let Rr = Ta;
  function g1() {}
  function Hu(a, ...r) {}
  const Ib = {
    debug: (...a) => Hu(console.debug, ...a),
    log: (...a) => Hu(console.log, ...a),
    warn: (...a) => Hu(console.warn, ...a),
    error: (...a) => Hu(console.error, ...a),
  };
  return (async () => {
    try {
      const { main: a, ...r } = $b,
        s = new Rr("content", r);
      return await a(s);
    } catch (a) {
      throw (
        (Ib.error('The content script "content" crashed on startup!', a), a)
      );
    }
  })();
})();
content;
