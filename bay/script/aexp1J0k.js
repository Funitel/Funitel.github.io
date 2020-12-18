!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Headroom = t()
}(this, function() {
    "use strict";
    function e() {
        return "undefined" != typeof window
    }
    function t(e, t, n) {
        var i = function() {
            var e = !1;
            try {
                var t = {
                    get passive() {
                        e = !0
                    }
                };
                window.addEventListener("test", t, t),
                window.removeEventListener("test", t, t)
            } catch (t) {
                e = !1
            }
            return e
        }()
          , o = !1
          , r = function(e) {
            return function(e) {
                return e && e.document && function(e) {
                    return 9 === e.nodeType
                }(e.document)
            }(e) ? function(e) {
                var t = e.document
                  , n = t.body
                  , i = t.documentElement;
                return {
                    scrollHeight: function() {
                        return Math.max(n.scrollHeight, i.scrollHeight, n.offsetHeight, i.offsetHeight, n.clientHeight, i.clientHeight)
                    },
                    height: function() {
                        return e.innerHeight || i.clientHeight || n.clientHeight
                    },
                    scrollY: function() {
                        return void 0 !== e.pageYOffset ? e.pageYOffset : (i || n.parentNode || n).scrollTop
                    }
                }
            }(e) : void 0
        }(e)
          , a = r.scrollY()
          , s = {};
        function c() {
            var e = Math.round(r.scrollY())
              , i = r.height()
              , c = r.scrollHeight();
            s.scrollY = e,
            s.lastScrollY = a,
            s.direction = a < e ? "down" : "up",
            s.distance = Math.abs(e - a),
            s.isOutOfBounds = e < 0 || c < e + i,
            s.top = e <= t.offset[s.direction],
            s.bottom = c <= e + i,
            s.toleranceExceeded = s.distance > t.tolerance[s.direction],
            n(s),
            a = e,
            o = !1
        }
        var u = !!i && {
            passive: !0,
            capture: !1
        };
        return e.addEventListener("scroll", function() {
            o || (o = !0,
            requestAnimationFrame(c))
        }, u),
        c(),
        {
            destroy: function() {}
        }
    }
    function n(e) {
        return e === Object(e) ? e : {
            down: e,
            up: e
        }
    }
    function i(e, t) {
        t = t || {},
        Object.assign(this, i.options, t),
        this.classes = Object.assign({}, i.options.classes, t.classes),
        this.elem = e,
        this.tolerance = n(this.tolerance),
        this.offset = n(this.offset),
        this.initialised = !1,
        this.frozen = !1
    }
    return i.prototype = {
        constructor: i,
        init: function() {
            return i.cutsTheMustard && !this.initialised && (this.addClass("initial"),
            this.initialised = !0,
            setTimeout(function(e) {
                e.scrollTracker = t(e.scroller, {
                    offset: e.offset,
                    tolerance: e.tolerance
                }, e.update.bind(e))
            }, 100, this)),
            this
        },
        destroy: function() {},
        unpin: function() {
            !this.hasClass("pinned") && this.hasClass("unpinned") || (this.addClass("unpinned"),
            this.removeClass("pinned"),
            this.onUnpin && this.onUnpin.call(this))
        },
        pin: function() {
            this.hasClass("unpinned") && (this.addClass("pinned"),
            this.removeClass("unpinned"),
            this.onPin && this.onPin.call(this))
        },
        freeze: function() {},
        unfreeze: function() {},
        top: function() {},
        notTop: function() {
            this.hasClass("notTop") || (this.addClass("notTop"),
            this.removeClass("top"),
            this.onNotTop && this.onNotTop.call(this))
        },
        bottom: function() {},
        notBottom: function() {
            this.hasClass("notBottom") || (this.addClass("notBottom"),
            this.removeClass("bottom"),
            this.onNotBottom && this.onNotBottom.call(this))
        },
        shouldUnpin: function(e) {
            return "down" === e.direction && !e.top && e.toleranceExceeded
        },
        shouldPin: function(e) {
            return "up" === e.direction && e.toleranceExceeded || e.top
        },
        addClass: function(e) {
            this.elem.classList.add.apply(this.elem.classList, this.classes[e].split(" "))
        },
        removeClass: function(e) {
            this.elem.classList.remove.apply(this.elem.classList, this.classes[e].split(" "))
        },
        hasClass: function(e) {
            return this.classes[e].split(" ").every(function(e) {
                return this.classList.contains(e)
            }, this.elem)
        },
        update: function(e) {
            e.isOutOfBounds || !0 !== this.frozen && (e.top ? this.top() : this.notTop(),
            e.bottom ? this.bottom() : this.notBottom(),
            this.shouldUnpin(e) ? this.unpin() : this.shouldPin(e) && this.pin())
        }
    },
    i.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: e() ? window : null,
        classes: {
            frozen: "headroom--frozen",
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    },
    i.cutsTheMustard = !!(e() && function() {}
    .bind && "classList"in document.documentElement && Object.assign && Object.keys && requestAnimationFrame),
    i
}),
function() {
    var e = document.querySelector("#header");
    new Headroom(e,{
        offset: 205,
        tolerance: 5,
        tolerance: {
            down: 10,
            up: 20
        },
        offset: 15
    }).init()
}(),
function() {
    "use strict";
    for (var e = document.querySelectorAll(".y4"), t = 0; t < e.length; t++)
        n(e[t]);
    function n(e) {
        var t = e.dataset.width
          , n = e.dataset.height / t * 100;
        e.previousElementSibling.setAttribute("style", "padding-bottom:" + n + "%;");
        var i = e.parentElement
          , o = (i.offsetWidth,
        i.offsetHeight,
        e.querySelector(".y5"))
          , r = o.width
          , a = o.height
          , s = e.querySelector(".y6");
        s.getContext("2d");
        s.height = a,
        s.width = r;
        var c = new Image;
        c.src = o.src,
        c.onload = function() {
            new CanvasImage(s,c).blur(2),
            e.classList.add("is-canvasLoaded")
        }
    }
}(),
CanvasImage = function(e, t) {
    this.image = t,
    this.element = e,
    e.width = t.width,
    e.height = t.height,
    this.context = e.getContext("2d"),
    this.context.drawImage(t, 0, 0)
}
,
CanvasImage.prototype = {
    blur: function(e) {
        this.context.globalAlpha = .5;
        for (var t = -e; t <= e; t += 2)
            for (var n = -e; n <= e; n += 2) {
                this.context.drawImage(this.element, n, t);
                n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n - 1), -(t - 1))
            }
    }
},
function(e) {
    var t = function(e, t, n) {
        "use strict";
        var i, o;
        if (function() {
            var t, n = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                fastLoadedClass: "ls-is-cached",
                iframeLoadMode: 0,
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            for (t in o = e.lazySizesConfig || e.lazysizesConfig || {},
            n)
                t in o || (o[t] = n[t])
        }(),
        !t || !t.getElementsByClassName)
            return {
                init: function() {},
                cfg: o,
                noSupport: !0
            };
        var r = t.documentElement
          , a = (e.HTMLPictureElement,
        "addEventListener")
          , s = "getAttribute"
          , c = e[a].bind(e)
          , u = e.setTimeout
          , l = e.requestAnimationFrame || u
          , f = e.requestIdleCallback
          , d = /^picture$/i
          , p = ["load", "error", "lazyincluded", "_lazyloaded"]
          , v = {}
          , h = Array.prototype.forEach
          , E = function(e, t) {
            return v[t] || (v[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
            v[t].test(e[s]("class") || "") && v[t]
        }
          , m = function(e, t) {
            E(e, t) || e.setAttribute("class", (e[s]("class") || "").trim() + " " + t)
        }
          , g = function(e, t) {
            var n;
            (n = E(e, t)) && e.setAttribute("class", (e[s]("class") || "").replace(n, " "))
        }
          , y = function(e, t, n) {
            var i = n ? a : "removeEventListener";
            n && y(e, t),
            p.forEach(function(n) {
                e[i](n, t)
            })
        }
          , _ = function(e, n, o, r, a) {
            var s = t.createEvent("Event");
            return o || (o = {}),
            o.instance = i,
            s.initEvent(n, !r, !a),
            s.detail = o,
            e.dispatchEvent(s),
            s
        }
          , b = function(e, t) {}
          , I = function() {
            var e, n, i = [], o = [], r = i, a = function() {
                var t = r;
                for (r = i.length ? o : i,
                e = !0,
                n = !1; t.length; )
                    t.shift()();
                e = !1
            }, s = function(i, o) {
                e && !o ? i.apply(this, arguments) : (r.push(i),
                n || (n = !0,
                (t.hidden ? u : l)(a)))
            };
            return s._lsFlush = a,
            s
        }()
          , T = function(e, t) {
            return t ? function() {
                I(e)
            }
            : function() {
                var t = this
                  , n = arguments;
                I(function() {
                    e.apply(t, n)
                })
            }
        }
          , S = function(e) {
            var t, i = 0, r = o.throttleDelay, a = o.ricTimeout, s = function() {
                t = !1,
                i = n.now(),
                e()
            }, c = f && a > 49 ? function() {}
            : T(function() {
                u(s)
            }, !0);
            return function(e) {
                var o;
                (e = !0 === e) && (a = 33),
                t || (t = !0,
                (o = r - (n.now() - i)) < 0 && (o = 0),
                e || o < 9 ? c() : u(c, o))
            }
        }
          , O = function(e) {
            var t, i, o = function() {
                t = null,
                e()
            }, r = function() {
                var e = n.now() - i;
                e < 99 ? u(r, 99 - e) : (f || o)(o)
            };
            return function() {
                i = n.now(),
                t || (t = u(r, 99))
            }
        }
          , A = function() {
            var l, f, p, v, b, A, x, R, L, N, D, w = /^img$/i, M = /^iframe$/i, F = "onscroll"in e && !/(gle|ing)bot/.test(navigator.userAgent), P = 0, U = 0, X = -1, j = function(e) {
                U--,
                (!e || U < 0 || !e.target) && (U = 0)
            }, G = function() {
                var e, n, a, c, u, d, p, h, E, m, g, y, _ = i.elements;
                if ((v = o.loadMode) && U < 8 && (e = _.length)) {
                    for (n = 0,
                    X++; n < e; n++)
                        if (_[n] && !_[n]._lazyRace)
                            if (!F || i.prematureUnveil && i.prematureUnveil(_[n]))
                                Y(_[n]);
                            else if ((h = _[n][s]("data-expand")) && (d = 1 * h) || (d = P),
                            m || (m = !o.expand || o.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : o.expand,
                            i._defEx = m,
                            g = m * o.expFactor,
                            y = o.hFac,
                            null,
                            P < g && U < 1 && X > 2 && v > 2 && !t.hidden ? (P = g,
                            X = 0) : P = v > 1 && X > 1 && U < 6 ? m : 0),
                            E !== d && (A = innerWidth + d * y,
                            x = innerHeight + d,
                            p = -1 * d,
                            E = d),
                            a = _[n].getBoundingClientRect(),
                            (D = a.bottom) >= p && (R = a.top) <= x && (N = a.right) >= p * y && (L = a.left) <= A && (D || N || L || R) && (o.loadHidden || void _[n]) && (f && U < 3 && !h && (v < 3 || X < 4) || void _[n])) {
                                if (Y(_[n]),
                                u = !0,
                                U > 9)
                                    break
                            } else
                                !u && f && !c && U < 4 && X < 4 && v > 2 && (l[0] || o.preloadAfterLoad) && (l[0] || !h && (D || N || L || R || "auto" != _[n][s](o.sizesAttr))) && (c = l[0] || _[n]);
                    c && !u && Y(c)
                }
            }, V = S(G), B = function(e) {
                var t = e.target;
                t._lazyCache ? delete t._lazyCache : (j(e),
                m(t, o.loadedClass),
                g(t, o.loadingClass),
                y(t, z),
                _(t, "lazyloaded"))
            }, H = T(B), z = function(e) {
                H({
                    target: e.target
                })
            }, W = function(e) {}, k = T(function(e, t, n, i, r) {
                var a, c, l, f, v, E;
                (v = _(e, "lazybeforeunveil", t)).defaultPrevented || (i && (n ? m(e, o.autosizesClass) : e.setAttribute("sizes", i)),
                c = e[s](o.srcsetAttr),
                a = e[s](o.srcAttr),
                r && (f = (l = e.parentNode) && d.test(l.nodeName || "")),
                E = t.firesLoad || "src"in e && (c || a || f),
                v = {
                    target: e
                },
                m(e, o.loadingClass),
                E && (clearTimeout(p),
                p = u(j, 2500),
                y(e, z, !0)),
                f && h.call(l.getElementsByTagName("source"), W),
                c ? e.setAttribute("srcset", c) : a && !f && (M.test(e.nodeName) || (e.src = a))),
                e._lazyRace && delete e._lazyRace,
                g(e, o.lazyClass),
                I(function() {
                    var t = e.complete && e.naturalWidth > 1;
                    E && !t || (t && m(e, o.fastLoadedClass),
                    B(v),
                    e._lazyCache = !0,
                    u(function() {
                        "_lazyCache"in e && delete e._lazyCache
                    }, 9)),
                    "lazy" == e.loading && U--
                }, !0)
            }), Y = function(e) {
                if (!e._lazyRace) {
                    var t, n = w.test(e.nodeName), i = n && (e[s](o.sizesAttr) || e[s]("sizes")), r = "auto" == i;
                    (!r && f || !n || !e[s]("src") && !e.srcset || e.complete || E(e, o.errorClass) || !E(e, o.lazyClass)) && (t = _(e, "lazyunveilread").detail,
                    r && C.updateElem(e, !0, e.offsetWidth),
                    e._lazyRace = !0,
                    U++,
                    k(e, t, r, i, n))
                }
            }, q = O(function() {
                o.loadMode = 3,
                V()
            }), K = function() {
                3 == o.loadMode && (o.loadMode = 2),
                q()
            }, Q = function() {
                f || (n.now() - b < 999 ? u(Q, 999) : (f = !0,
                o.loadMode = 3,
                V(),
                c("scroll", K, !0)))
            };
            return {
                _: function() {
                    b = n.now(),
                    i.elements = t.getElementsByClassName(o.lazyClass),
                    l = t.getElementsByClassName(o.lazyClass + " " + o.preloadClass),
                    c("scroll", V, !0),
                    c("resize", V, !0),
                    c("pageshow", function(e) {}),
                    e.MutationObserver ? new MutationObserver(V).observe(r, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (r[a]("DOMNodeInserted", V, !0),
                    r[a]("DOMAttrModified", V, !0),
                    setInterval(V, 999)),
                    c("hashchange", V, !0),
                    ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                        t[a](e, V, !0)
                    }),
                    /d$|^c/.test(t.readyState) ? Q() : (c("load", Q),
                    t[a]("DOMContentLoaded", V),
                    u(Q, 2e4)),
                    i.elements.length ? (G(),
                    I._lsFlush()) : V()
                },
                checkElems: V,
                unveil: Y,
                _aLSL: K
            }
        }()
          , C = function() {
            T(function(e, t, n, i) {});
            var e, n = function(e, t, n) {}, i = O(function() {
                var t, n = e.length;
                if (n)
                    for (t = 0; t < n; t++)
                        e[t]
            });
            return {
                _: function() {
                    e = t.getElementsByClassName(o.autosizesClass),
                    c("resize", i)
                },
                checkElems: i,
                updateElem: n
            }
        }()
          , x = function() {
            !x.i && t.getElementsByClassName && (x.i = !0,
            C._(),
            A._())
        };
        return u(function() {
            o.init && x()
        }),
        i = {
            cfg: o,
            autoSizer: C,
            loader: A,
            init: x,
            uP: b,
            aC: m,
            rC: g,
            hC: E,
            fire: _,
            gW: function(e, t, n) {},
            rAF: I
        }
    }(e, e.document, Date);
    e.lazySizes = t,
    "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Splitting = t()
}(this, function() {
    "use strict";
    var e = document;
    e.createTextNode.bind(e);
    var t = {};
    function n(e, t, n, i) {
        return {
            by: e,
            depends: t,
            key: n,
            split: i
        }
    }
    function i(e) {
        t[e.by] = e
    }
    var o = "words"
      , r = n(o, 0, "word", function(e) {})
      , a = n("chars", [o], "char", function(e, t, n) {});
    function s(t) {
        var n, i;
        (t = t || {}).key;
        return (n = t.target || "[data-splitting]",
        n && 0 != n.length ? n.nodeName ? [n] : [].slice.call(n[0].nodeName ? n : (i || e).querySelectorAll(n)) : []).map(function(e) {})
    }
    s.html = function(e) {}
    ,
    s.add = i;
    var c = n("lines", [o], "line", function(e, t, n) {})
      , u = n("items", 0, "item", function(e, t) {})
      , l = n("rows", 0, "row", function(e, t) {})
      , f = n("cols", 0, "col", function(e, t) {})
      , d = n("grid", ["rows", "cols"])
      , p = "layout"
      , v = n(p, 0, 0, function(e, t) {})
      , h = n("cellRows", [p], "row", function(e, t, n) {})
      , E = n("cellColumns", [p], "col", function(e, t, n) {})
      , m = n("cells", ["cellRows", "cellColumns"], "cell", function(e, t, n) {});
    return i(r),
    i(a),
    i(c),
    i(u),
    i(l),
    i(f),
    i(d),
    i(v),
    i(h),
    i(E),
    i(m),
    s
});
var ScrollOut = function() {
    "use strict";
    function e(e, t, n) {
        return e < t ? t : n < e ? n : e
    }
    function t(e) {
        return +(0 < e) - +(e < 0)
    }
    var n, i = {};
    function o(e) {
        return "-" + e[0].toLowerCase()
    }
    function r(e) {
        return i[e] || (i[e] = e.replace(/([A-Z])/g, o))
    }
    function a(e, t) {
        return e && 0 !== e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (t || document.documentElement).querySelectorAll(e)) : []
    }
    function s(e, t) {
        for (var n in t)
            n.indexOf("_") && e.setAttribute("data-" + r(n), t[n])
    }
    var c = [];
    function u() {
        n = 0,
        c.slice().forEach(function(e) {
            return e()
        }),
        l()
    }
    function l() {
        !n && c.length && (n = requestAnimationFrame(u))
    }
    function f(e, t, n, i) {
        return "function" == typeof e ? e(t, n, i) : e
    }
    function d() {}
    return function(i) {
        var o, r, u, p = (i = i || {}).onChange || d, v = i.onHidden || d, h = i.onShown || d, E = i.onScroll || d, m = i.cssProps ? i.cssProps : d, g = i.scrollingElement, y = g ? a(g)[0] : window, _ = g ? a(g)[0] : document.documentElement, b = !1, I = {}, T = [];
        function S() {
            T = a(i.targets || "[data-scroll]", a(i.scope || _)[0]).map(function(e) {
                return {
                    element: e
                }
            })
        }
        function O() {
            var a = _.clientWidth
              , s = _.clientHeight
              , d = t(-o + (o = _.scrollLeft || window.pageXOffset))
              , p = t(-r + (r = _.scrollTop || window.pageYOffset))
              , v = _.scrollLeft / (_.scrollWidth - a || 1)
              , h = _.scrollTop / (_.scrollHeight - s || 1);
            b = b || I.scrollDirX !== d || I.scrollDirY !== p || I.scrollPercentX !== v || I.scrollPercentY !== h,
            I.scrollDirX = d,
            I.scrollDirY = p,
            I.scrollPercentX = v,
            I.scrollPercentY = h;
            for (var E, m = !1, g = 0; g < T.length; g++) {
                for (var S = T[g], O = S.element, C = O, x = 0, R = 0; x += C.offsetLeft,
                R += C.offsetTop,
                (C = C.offsetParent) && C !== y; )
                    ;
                var L, N = O.clientHeight || O.offsetHeight || 0, D = O.clientWidth || O.offsetWidth || 0, w = (e(x + D, o, o + a) - e(x, o, o + a)) / D, M = (e(R + N, r, r + s) - e(R, r, r + s)) / N, F = 1 === w ? 0 : t(x - o), P = 1 === M ? 0 : t(R - r), U = e((o - (D / 2 + x - a / 2)) / (a / 2), -1, 1), X = e((r - (N / 2 + R - s / 2)) / (s / 2), -1, 1);
                L = i.offset ? f(i.offset, O, S, _) > r ? 0 : 1 : (f(i.threshold, O, S, _) || 0) < w * M ? 1 : 0;
                var j = S.visible !== L;
                (S._changed || j || S.visibleX !== w || S.visibleY !== M || S.index !== g || S.elementHeight !== N || S.elementWidth !== D || S.offsetX !== x || S.offsetY !== R || S.intersectX != S.intersectX || S.intersectY != S.intersectY || S.viewportX !== U || S.viewportY !== X) && (m = !0,
                S._changed = !0,
                S._visibleChanged = j,
                S.visible = L,
                S.elementHeight = N,
                S.elementWidth = D,
                S.index = g,
                S.offsetX = x,
                S.offsetY = R,
                S.visibleX = w,
                S.visibleY = M,
                S.intersectX = F,
                S.intersectY = P,
                S.viewportX = U,
                S.viewportY = X,
                S.visible = L)
            }
            u || !b && !m || (E = A,
            c.push(E),
            l(),
            u = function() {
                !(c = c.filter(function(e) {
                    return e !== E
                })).length && n && (cancelAnimationFrame(n),
                n = 0)
            }
            )
        }
        function A() {
            u && (u(),
            u = void 0),
            b && (b = !1,
            s(_, {
                scrollDirX: I.scrollDirX,
                scrollDirY: I.scrollDirY
            }),
            m(_, I),
            E(_, I, T));
            for (var e = T.length - 1; -1 < e; e--) {
                var t = T[e]
                  , n = t.element
                  , o = t.visible
                  , r = n.hasAttribute("scrollout-once") || !1;
                t._changed && (t._changed = !1,
                m(n, t)),
                t._visibleChanged && (s(n, {
                    scroll: o ? "in" : "out"
                }),
                p(n, t, _),
                (o ? h : v)(n, t, _)),
                o && (i.once || r) && T.splice(e, 1)
            }
        }
        S(),
        O(),
        A();
        var C = 0
          , x = function() {
            C = C || setTimeout(function() {
                C = 0,
                O()
            }, 0)
        };
        return window.addEventListener("resize", x),
        y.addEventListener("scroll", x),
        {
            index: S,
            update: O,
            teardown: function() {}
        }
    }
}();
function normalizeColor(e) {
    return [(e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (255 & e) / 255]
}
Splitting(),
ScrollOut({
    targets: "[data-splitting]"
}),
Splitting(),
ScrollOut({
    targets: ".word"
}),
ScrollOut({
    threshold: .2,
    once: !0
}),
function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {}
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n = []
      , i = n.push
      , o = {}
      , r = (o.toString,
    {})
      , a = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType
    }
      , s = function(e) {
        return null != e && e === e.window
    }
      , c = e.document;
    function u(e) {}
    var l = "3.5.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector"
      , f = function(e, t) {
        return new f.fn.init(e,t)
    };
    function d(e) {
        var t = !!e && "length"in e && e.length;
        return !a(e) && !s(e) && (0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    f.fn = f.prototype = {
        jquery: l,
        constructor: f,
        length: 0,
        toArray: function() {},
        get: function(e) {},
        pushStack: function(e) {
            var t = f.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return f.each(this, e)
        },
        map: function(e) {},
        slice: function() {},
        first: function() {},
        last: function() {},
        even: function() {},
        odd: function() {},
        eq: function(e) {},
        end: function() {},
        push: i,
        sort: n.sort,
        splice: n.splice
    },
    f.extend = f.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {}, c = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof s && (l = s,
        s = arguments[c] || {},
        c++),
        "object" == typeof s || a(s) || (s = {}),
        c === u && (s = this,
        c--); c < u; c++)
            if (null != (e = arguments[c]))
                for (t in e)
                    i = e[t],
                    "__proto__" !== t && s !== i && (l && i && (f.isPlainObject(i) || (o = Array.isArray(i))) ? (n = s[t],
                    r = o && !Array.isArray(n) ? [] : o || f.isPlainObject(n) ? n : {},
                    o = !1,
                    s[t] = f.extend(l, r, i)) : void 0 !== i && (s[t] = i));
        return s
    }
    ,
    f.extend({
        expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {},
        noop: function() {},
        isPlainObject: function(e) {},
        isEmptyObject: function(e) {},
        globalEval: function(e, t, n) {},
        each: function(e, t) {
            var n, i = 0;
            if (d(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++)
                    ;
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i]))
                        break;
            return e
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (d(Object(e)) ? f.merge(n, "string" == typeof e ? [e] : e) : i.call(n, e)),
            n
        },
        inArray: function(e, t, n) {},
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++)
                e[o++] = t[i];
            return e.length = o,
            e
        },
        grep: function(e, t, n) {},
        map: function(e, t, n) {},
        guid: 1,
        support: r
    }),
    "function" == typeof Symbol && (f.fn[Symbol.iterator] = n[Symbol.iterator]),
    f.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        o["[object " + t + "]"] = t.toLowerCase()
    });
    var p = function(e) {
        var t, n, i, o, r, a, s, c, u, l, f = "sizzle" + 1 * new Date, d = e.document, p = [], v = (p.pop,
        p.push,
        p.push), h = p.slice, E = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", m = "[\\x20\\t\\r\\n\\f]", g = "(?:\\\\[\\da-fA-F]{1,6}" + m + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", y = "\\[" + m + "*(" + g + ")(?:" + m + "*([*^$|!~]?=)" + m + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + g + "))|)" + m + "*\\]", _ = ":(" + g + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + y + ")*)|.*)\\)|)", b = (new RegExp(m + "+","g"),
        new RegExp("^" + m + "+|((?:^|[^\\\\])(?:\\\\.)*)" + m + "+$","g")), I = (new RegExp("^" + m + "*," + m + "*"),
        new RegExp("^" + m + "*([>+~]|" + m + ")" + m + "*"),
        new RegExp(m + "|>"),
        new RegExp(_),
        new RegExp("^" + g + "$"),
        {
            ID: new RegExp("^#(" + g + ")"),
            CLASS: new RegExp("^\\.(" + g + ")"),
            TAG: new RegExp("^(" + g + "|[*])"),
            ATTR: new RegExp("^" + y),
            PSEUDO: new RegExp("^" + _),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + m + "*(even|odd|(([+-]|)(\\d*)n|)" + m + "*(?:([+-]|)" + m + "*(\\d+)|))" + m + "*\\)|)","i"),
            bool: new RegExp("^(?:" + E + ")$","i"),
            needsContext: new RegExp("^" + m + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + m + "*((?:-\\d)?\\d*)" + m + "*\\)|)(?=[^-]|$)","i")
        }), T = /^[^{]+\{\s*\[native \w/, S = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        new RegExp("\\\\[\\da-fA-F]{1,6}" + m + "?|\\\\([^\\r\\n\\f])","g");
        try {
            v.apply(p = h.call(d.childNodes), d.childNodes),
            p[d.childNodes.length].nodeType
        } catch (t) {
            v = {}
        }
        function O(e, t, i, o) {
            var a, f, d, p = t && t.ownerDocument, h = t ? t.nodeType : 9;
            if (i = i || [],
            "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h)
                return i;
            if (!o && (s(t),
            t = t || c,
            u) && 11 !== h && (d = S.exec(e)))
                if (a = d[1]) {
                    if (9 === h) {
                        if (!(f = t.getElementById(a)))
                            return i;
                        if (f.id === a)
                            return i.push(f),
                            i
                    } else if (p && (f = p.getElementById(a)) && l(t, f) && f.id === a)
                        return i.push(f),
                        i
                } else {
                    if (d[2])
                        return v.apply(i, t.getElementsByTagName(e)),
                        i;
                    if ((a = d[3]) && n.getElementsByClassName && t.getElementsByClassName)
                        return v.apply(i, t.getElementsByClassName(a)),
                        i
                }
            return r(e.replace(b, "$1"), t, i, o)
        }
        for (t in n = O.support = {},
        o = O.isXML = function(e) {}
        ,
        s = O.setDocument = function(e) {
            var t = e ? e.ownerDocument || e : d;
            return t != c && 9 === t.nodeType && t.documentElement && ((c = t).documentElement,
            u = !o(c),
            n.getElementsByClassName = T.test(c.getElementsByClassName)),
            c
        }
        ,
        O.matchesSelector = function(e, t) {}
        ,
        O.contains = function(e, t) {}
        ,
        O.attr = function(e, t) {}
        ,
        O.escape = function(e) {}
        ,
        O.error = function(e) {}
        ,
        O.uniqueSort = function(e) {}
        ,
        O.getText = function(e) {}
        ,
        (i = O.selectors = {
            cacheLength: 50,
            createPseudo: void 0,
            match: I,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {},
            filter: {},
            pseudos: {}
        }).pseudos.nth = i.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            i.pseudos[t] = void 0;
        for (t in {
            submit: !0,
            reset: !0
        })
            i.pseudos[t] = void 0;
        function A() {}
        return A.prototype = i.filters = i.pseudos,
        i.setFilters = new A,
        O.tokenize = function(e, t) {}
        ,
        O.compile = function(e, t) {}
        ,
        r = O.select = function(e, t, n, i) {}
        ,
        n.sortStable = f.split("").sort(function(e, t) {
            return e === t && (a = !0),
            0
        }).join("") === f,
        n.detectDuplicates = !!a,
        s(),
        n.sortDetached = void 0,
        n.attributes,
        O
    }(e);
    f.find = p,
    f.expr = p.selectors,
    f.expr[":"] = f.expr.pseudos,
    f.uniqueSort = f.unique = p.uniqueSort,
    f.text = p.getText,
    f.isXMLDoc = p.isXML,
    f.contains = p.contains,
    f.escapeSelector = p.escape;
    f.expr.match.needsContext;
    function v(e, t) {}
    f.filter = function(e, t, n) {}
    ,
    f.fn.extend({
        find: function(e) {
            var t, n, i = this.length;
            if ("string" != typeof e)
                return this.pushStack(f(e).filter(function() {}));
            for (n = this.pushStack([]),
            t = 0; t < i; t++)
                f.find(e, this[t], n);
            return 1 < i ? f.uniqueSort(n) : n
        },
        filter: function(e) {},
        not: function(e) {},
        is: function(e) {}
    });
    var h, E = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (f.fn.init = function(e, t, n) {
        var i, o;
        return e ? (n = n || h,
        "string" == typeof e ? !(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : E.exec(e)) || !i[1] && t ? !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e) : (i[1],
        (o = c.getElementById(i[2])) && (this[0] = o,
        this.length = 1),
        this) : e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : a(e) ? void 0 !== n.ready ? n.ready(e) : e(f) : f.makeArray(e, this)) : this
    }
    ).prototype = f.fn,
    h = f(c);
    f.fn.extend({}),
    f.each({}, function(e, t) {});
    var m = /[^\x20\t\r\n\f]+/g;
    f.Callbacks = function(e) {}
    ,
    f.extend({
        Deferred: function(e) {
            var t = [["notify", "progress", f.Callbacks("memory"), f.Callbacks("memory"), 2], ["resolve", "done", f.Callbacks("once memory"), f.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", f.Callbacks("once memory"), f.Callbacks("once memory"), 1, "rejected"]]
              , n = {};
            return f.each(t, function(e, t) {}),
            e && e.call(n, n),
            n
        },
        when: function(e) {}
    });
    f.Deferred.exceptionHook = function(e, t) {}
    ,
    f.readyException = function(e) {}
    ;
    var g = f.Deferred();
    f.fn.ready = function(e) {}
    ,
    f.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {}
    }),
    f.ready.then = g.then,
    "complete" === c.readyState || "loading" !== c.readyState && !c.documentElement.doScroll ? e.setTimeout(f.ready) : (c.addEventListener("DOMContentLoaded", F),
    e.addEventListener("load", F));
    var y = function(e, t, n, i, o, r, s) {
        var c = 0
          , u = e.length
          , l = null == n;
        if (void 0 !== i && (o = !0,
        a(i) || (s = !0),
        l && (s ? (t.call(e, i),
        t = null) : (l = t,
        t = function(e, t, n) {
            return l.call(f(e), n)
        }
        )),
        t))
            for (; c < u; c++)
                t(e[c], n, s ? i : i.call(e[c], c, t(e[c], n)));
        return o ? e : l ? t.call(e) : u ? t(e[0], n) : r
    }
      , _ = /^-ms-/
      , b = /-([a-z])/g;
    function I(e, t) {}
    function T(e) {
        return e.replace(_, "ms-").replace(b, I)
    }
    var S = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function O() {}
    O.uid = 1,
    O.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            S(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {}))),
            t
        },
        set: function(e, t, n) {},
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][T(t)]
        },
        access: function(e, t, n) {},
        remove: function(e, t) {},
        hasData: function(e) {}
    };
    var A = new O;
    new O;
    f.extend({}),
    f.fn.extend({}),
    f.extend({
        queue: function(e, t, n) {},
        dequeue: function(e, t) {},
        _queueHooks: function(e, t) {}
    }),
    f.fn.extend({
        queue: function(e, t) {},
        dequeue: function(e) {},
        clearQueue: function(e) {},
        promise: function(e, t) {}
    });
    var C = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , x = (new RegExp("^(?:([+-])=|)(" + C + ")([a-z%]*)$","i"),
    c.documentElement);
    x.getRootNode;
    f.fn.extend({});
    var R = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
      , L = {};
    function N(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t ? f.merge([e], n) : n
    }
    var D = /^([^.]*)(?:\.(.+)|)/;
    function w() {
        return !1
    }
    f.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, a, s, c, u, l, d, p, v, h, E, g = A.get(e);
            if (S(e))
                for (n.handler && (n = (r = n).handler,
                o = r.selector),
                o && f.find.matchesSelector(x, o),
                n.guid || (n.guid = f.guid++),
                (c = g.events) || (c = g.events = Object.create(null)),
                (a = g.handle) || (a = g.handle = function(t) {
                }
                ),
                u = (t = (t || "").match(m) || [""]).length; u--; )
                    v = E = (s = D.exec(t[u]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    v && (d = f.event.special[v] || {},
                    v = (o ? d.delegateType : d.bindType) || v,
                    d = f.event.special[v] || {},
                    l = f.extend({
                        type: v,
                        origType: E,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && f.expr.match.needsContext.test(o),
                        namespace: h.join(".")
                    }, r),
                    (p = c[v]) || ((p = c[v] = []).delegateCount = 0,
                    d.setup && !1 !== d.setup.call(e, i, h, a) || e.addEventListener && e.addEventListener(v, a)),
                    d.add && (d.add.call(e, l),
                    l.handler.guid || (l.handler.guid = n.guid)),
                    o ? p.splice(p.delegateCount++, 0, l) : p.push(l),
                    f.event.global[v] = !0)
        },
        remove: function(e, t, n, i, o) {},
        dispatch: function(e) {
        },
        handlers: function(e, t) {
        },
        addProp: function(e, t) {},
        fix: function(e) {
        },
        special: {}
    },
    f.removeEvent = function(e, t, n) {}
    ,
    f.Event = function(e, t) {
    }
    ,
    f.Event.prototype = {
        constructor: f.Event,
        isDefaultPrevented: w,
        isPropagationStopped: w,
        isImmediatePropagationStopped: w,
        isSimulated: !1,
        preventDefault: function() {},
        stopPropagation: function() {},
        stopImmediatePropagation: function() {}
    },
    f.each({}, f.event.addProp),
    f.each({}, function(e, t) {}),
    f.each({}, function(e, t) {}),
    f.fn.extend({
        on: function(e, t, n, i) {
            return function(e, t, n, i, o, r) {
                var a;
                if (null == i && null == o ? (o = n,
                i = n = void 0) : null == o && ("string" == typeof n ? (o = i,
                i = void 0) : (o = i,
                i = n,
                n = void 0)),
                !1 === o)
                    o = w;
                else if (!o)
                    return e;
                return 1 === r && (a = o,
                (o = function(e) {}
                ).guid = a.guid || (a.guid = f.guid++)),
                e.each(function() {
                    f.event.add(this, t, o, i, n)
                })
            }(this, e, t, n, i)
        },
        one: function(e, t, n, i) {},
        off: function(e, t, n) {}
    });
    var M = /<script|<style|<link/i;
    f.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {},
        cleanData: function(e) {}
    }),
    f.fn.extend({
        detach: function(e) {},
        remove: function(e) {},
        text: function(e) {},
        append: function() {},
        prepend: function() {},
        before: function() {},
        after: function() {},
        empty: function() {},
        clone: function(e, t) {},
        html: function(e) {
            return y(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , i = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !M.test(e) && !L[(R.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = f.htmlPrefilter(e);
                    try {
                        for (; n < i; n++)
                            1 === (t = this[n] || {}).nodeType && (f.cleanData(N(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {}
    }),
    f.each({}, function(e, t) {});
    new RegExp("^(" + C + ")(?!px)[a-z%]+$","i"),
    new RegExp(["Top", "Right", "Bottom", "Left"].join("|"),"i");
    var P, U;
    c.createElement("div").style;
    f.extend({
        cssHooks: {},
        cssNumber: {},
        cssProps: {},
        style: function(e, t, n, i) {},
        css: function(e, t, n, i) {}
    }),
    f.each(["height", "width"], function(e, t) {}),
    f.cssHooks.marginLeft = void r.reliableMarginLeft,
    f.each({}, function(e, t) {}),
    f.fn.extend({}),
    f.fn.delay = function(e, t) {}
    ,
    P = c.createElement("input"),
    U = c.createElement("select").appendChild(c.createElement("option")),
    P.type = "checkbox",
    r.checkOn = "" !== P.value,
    r.optSelected = U.selected,
    (P = c.createElement("input")).value = "t",
    P.type = "radio",
    r.radioValue = "t" === P.value;
    f.expr.attrHandle;
    f.fn.extend({}),
    f.extend({}),
    f.each(f.expr.match.bool.source.match(/\w+/g), function(e, t) {});
    function X(e) {
    }
    function j(e) {
    }
    function G(e) {
    }
    f.fn.extend({}),
    f.extend({
        prop: function(e, t, n) {},
        propHooks: {},
        propFix: {}
    }),
    r.optSelected || (f.propHooks.selected = {}),
    f.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        f.propFix[this.toLowerCase()] = this
    }),
    f.fn.extend({
        addClass: function(e) {
        },
        removeClass: function(e) {
        },
        toggleClass: function(e, t) {
        },
        hasClass: function(e) {}
    });
    f.fn.extend({}),
    f.extend({
        valHooks: {}
    }),
    f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {},
        r.checkOn || (f.valHooks[this].get = function(e) {}
        )
    }),
    r.focusin = "onfocusin"in e;
    f.extend(f.event, {}),
    f.fn.extend({}),
    r.focusin || f.each({}, function(e, t) {}),
    f.parseXML = function(e) {}
    ;
    var V;
    f.param = function(e, t) {}
    ,
    f.fn.extend({}),
    f.fn.extend({}),
    f.expr.pseudos.hidden = function(e) {}
    ,
    f.expr.pseudos.visible = function(e) {}
    ,
    r.createHTMLDocument = ((V = c.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === V.childNodes.length),
    f.parseHTML = function(e, t, n) {}
    ,
    f.offset = {},
    f.fn.extend({}),
    f.each({}, function(e, t) {}),
    f.each(["top", "left"], function(e, t) {}),
    f.each({}, function(e, t) {}),
    f.fn.extend({}),
    f.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        f.fn[t] = function(e, n) {
            return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t)
        }
    });
    var B = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    f.proxy = function(e, t) {}
    ,
    f.holdReady = function(e) {}
    ,
    f.isArray = Array.isArray,
    f.parseJSON = JSON.parse,
    f.nodeName = v,
    f.isFunction = a,
    f.isWindow = s,
    f.camelCase = T,
    f.type = u,
    f.now = Date.now,
    f.isNumeric = function(e) {}
    ,
    f.trim = function(e) {
        return null == e ? "" : (e + "").replace(B, "")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {});
    e.jQuery,
    e.$;
    return f.noConflict = function(e) {}
    ,
    void 0 === t && (e.jQuery = e.$ = f),
    f
}),
$(".sk").click(function() {
    $(".u9").toggleClass("av"),
    $("body, .bar").toggleClass("dark")
}),
$(".af").html(function(e, t) {
    return "<span>" + $.trim(t).split("").join("</span><span>") + "</span>"
}),
t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
}
: function(e) {}
,
function(e) {
    function t(i) {
        if (n[i])
            return n[i].exports;
        var o = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, t),
        o.l = !0,
        o.exports
    }
    var n = {};
    t.d = function(e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: i
        })
    }
    ,
    t.r = function(e) {}
    ,
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    t.p = "",
    t(t.s = 151)
}([function(e, t, n) {}
, function(e, t) {
    e.exports = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}
, function(e, t) {
    var n = Array.isArray;
    e.exports = n
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(40);
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = {};
    t.IX2EngineConstants = t.IX2EngineActionTypes = void 0;
    var r = n(305);
    Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && (Object.prototype.hasOwnProperty.call(o, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return r[e]
            }
        }))
    });
    var a = n(306);
    Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && (Object.prototype.hasOwnProperty.call(o, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return a[e]
            }
        }))
    });
    var s = n(307);
    Object.keys(s).forEach(function(e) {});
    var c = i(n(308));
    t.IX2EngineActionTypes = c;
    var u = i(n(309));
    t.IX2EngineConstants = u
}
, function(e, t, n) {
    var i = {}
      , o = {}
      , r = (window.Webflow,
    window.jQuery)
      , a = (r(window),
    r(document))
      , s = (r.isFunction,
    i._ = n(153))
      , c = i.tram = n(91) && r.tram;
    c.config.hideBackface = !1,
    c.config.keepInherited = !0,
    i.define = function(e, t, n) {
        return o[e] && v(o[e]),
        o[e] = t(r, s, n) || {}
    }
    ,
    i.require = function(e) {
        return o[e]
    }
    ,
    i.push = function(e) {}
    ,
    i.env = function(e) {}
    ;
    var u = navigator.userAgent.toLowerCase()
      , l = i.env.touch = "ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch
      , f = i.env.chrome = /chrome/.test(u) && /Google/.test(navigator.vendor) && parseInt(u.match(/chrome\/(\d+)\./)[1], 10)
      , d = i.env.ios = /(ipod|iphone|ipad)/.test(u);
    i.env.safari = /safari/.test(u) && !f && !d,
    l && a.on("touchstart mousedown", function(e) {}),
    i.validClick = l ? function(e) {}
    : function() {}
    ,
    i.resize = void 0,
    i.scroll = void 0,
    i.redraw = void 0,
    i.location = function(e) {}
    ,
    i.env() && (i.location = function() {}
    ),
    i.ready = function() {}
    ,
    i.load = function(e) {}
    ,
    i.destroy = function(e) {}
    ,
    r(i.ready),
    e.exports = window.Webflow = i
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, n, i) {
    var o = i(96)
      , r = "object" == ("undefined" == typeof self ? "undefined" : t(self)) && self && self.Object === Object && self
      , a = o || r || Function("return this")();
    e.exports = a
}
, function(e, t, n) {}
, function(e, n) {
    e.exports = function(e) {
        var n = void 0 === e ? "undefined" : t(e);
        return null != e && ("object" == n || "function" == n)
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, n, i) {
    var o = i(157)
      , r = i(211)
      , a = i(71)
      , s = i(2)
      , c = i(220);
    e.exports = function(e) {
        return "function" == typeof e ? e : null == e ? a : "object" == (void 0 === e ? "undefined" : t(e)) ? s(e) ? r(e[0], e[1]) : o(e) : c(e)
    }
}
, function(e, t, n) {
    var i = n(169)
      , o = n(174);
    e.exports = function(e, t) {
        var n = o(e, t);
        return i(n) ? n : void 0
    }
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(32)
      , o = n(170)
      , r = n(171)
      , a = i ? i.toStringTag : void 0;
    e.exports = function(e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : a && a in Object(e) ? o(e) : r(e)
    }
}
, function(e, t, n) {
    var i = n(95)
      , o = n(65);
    e.exports = function(e) {
        return null != e && o(e.length) && !i(e)
    }
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(40);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.IX2VanillaUtils = t.IX2VanillaPlugins = t.IX2ElementsReducer = t.IX2EasingUtils = t.IX2Easings = t.IX2BrowserSupport = void 0;
    var o = i(n(86));
    t.IX2BrowserSupport = o;
    var r = i(n(137));
    t.IX2Easings = r;
    var a = i(n(139));
    t.IX2EasingUtils = a;
    var s = i(n(315));
    t.IX2ElementsReducer = s;
    var c = i(n(141));
    t.IX2VanillaPlugins = c;
    var u = i(n(317));
    t.IX2VanillaUtils = u
}
, function(e, t) {
    function n() {
        return e.exports = n = Object.assign || function(e) {}
        ,
        n.apply(this, arguments)
    }
    e.exports = n
}
, function(e, t) {
    e.exports = function(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(52);
    e.exports = function(e) {
        if ("string" == typeof e || i(e))
            return e;
        var t = e + "";
        return "0" == t && 1 / e == -1 / 0 ? "-0" : t
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e) {
        if (e && e.__esModule)
            return e;
        var t = {};
        if (null != e)
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n);
        return t.default = e,
        t
    }
}
, function(e, n, i) {
    function o(e) {
        var t = Object.keys(e);
        return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(e)) : t
    }
    function r(e) {
        if (Array.isArray(e))
            return e.slice();
        for (var t = o(e), n = {}, i = 0; i < t.length; i++) {
            var r = t[i];
            n[r] = e[r]
        }
        return n
    }
    function s(e, t, n) {
        var i = n;
        null == i && a(p);
        for (var u = !1, l = arguments.length, f = Array(l > 3 ? l - 3 : 0), d = 3; d < l; d++)
            f[d - 3] = arguments[d];
        for (var v = 0; v < f.length; v++) {
            var h = f[v];
            if (null != h) {
                var E = o(h);
                if (E.length)
                    for (var m = 0; m <= E.length; m++) {
                        var g = E[m];
                        if (!e || void 0 === i[g]) {
                            var y = h[g];
                            t && c(i[g]) && c(y) && (y = s(e, t, i[g], y)),
                            void 0 !== y && y !== i[g] && (u || (u = !0,
                            i = r(i)),
                            i[g] = y)
                        }
                    }
            }
        }
        return i
    }
    function c(e) {
        var t = void 0 === e ? "undefined" : d(e);
        return null != e && ("object" === t || "function" === t)
    }
    function u(e, t) {
        if (!Array.isArray(t) && a(p),
        null != e) {
            for (var n = e, i = 0; i < t.length; i++) {
                var o = t[i];
                if (void 0 === (n = null != n ? n[o] : void 0))
                    return n
            }
            return n
        }
    }
    function l(e, t, n) {
        var i = null == e ? "number" == typeof t ? [] : {} : e;
        if (i[t] === n)
            return i;
        var o = r(i);
        return o[t] = n,
        o
    }
    function f(e, t, n) {
        return t.length ? function e(t, n, i, o) {
            var r = n[o];
            return l(t, r, o === n.length - 1 ? i : e(c(t) && c(t[r]) ? t[r] : "number" == typeof n[o + 1] ? [] : {}, n, i, o + 1))
        }(e, t, n, 0) : n
    }
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var d = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
        return void 0 === e ? "undefined" : t(e)
    }
    : function(e) {}
    ;
    n.clone = r,
    n.addLast = function(e, t) {
        return Array.isArray(t) ? e.concat(t) : e.concat([t])
    }
    ,
    n.addFirst = function(e, t) {}
    ,
    n.removeLast = function(e) {}
    ,
    n.removeFirst = function(e) {}
    ,
    n.insert = function(e, t, n) {}
    ,
    n.removeAt = function(e, t) {}
    ,
    n.replaceAt = function(e, t, n) {}
    ,
    n.getIn = u,
    n.set = l,
    n.setIn = f,
    n.update = function(e, t, n) {}
    ,
    n.updateIn = function(e, t, n) {}
    ,
    n.merge = function(e, t, n, i, o, r) {
        for (var a = arguments.length, c = Array(a > 6 ? a - 6 : 0), u = 6; u < a; u++)
            c[u - 6] = arguments[u];
        return c.length ? s.call.apply(s, [null, !1, !1, e, t, n, i, o, r].concat(c)) : s(!1, !1, e, t, n, i, o, r)
    }
    ,
    n.mergeDeep = function(e, t, n, i, o, r) {}
    ,
    n.mergeIn = function(e, t, n, i, o, r, a) {
        var c = u(e, t);
        null == c && (c = {});
        for (var l = arguments.length, d = Array(l > 7 ? l - 7 : 0), p = 7; p < l; p++)
            d[p - 7] = arguments[p];
        return f(e, t, d.length ? s.call.apply(s, [null, !1, !1, c, n, i, o, r, a].concat(d)) : s(!1, !1, c, n, i, o, r, a))
    }
    ,
    n.omit = function(e, t) {}
    ,
    n.addDefaults = function(e, t, n, i, o, r) {}
    ;
    var p = "INVALID_ARGS";
    n.default = {}
}
, function(e, n) {
    function i(e) {
        return (i = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e)
        }
        : function(e) {}
        )(e)
    }
    function o(t) {
        return "function" == typeof Symbol && "symbol" === i(Symbol.iterator) ? e.exports = o = function(e) {
            return i(e)
        }
        : e.exports = o = function(e) {}
        ,
        o(t)
    }
    e.exports = o
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(66)
      , o = n(25);
    e.exports = function(e) {
        return o(e) ? a(e) : i(e)
    }
}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(69);
    e.exports = function(e, t, n) {
        var o = null == e ? void 0 : i(e, t);
        return void 0 === o ? n : o
    }
}
, function(e, t, n) {
    var i = n(2)
      , o = n(70)
      , r = n(212)
      , a = n(215);
    e.exports = function(e, t) {
        return i(e) ? e : o(e, t) ? [e] : r(a(e))
    }
}
, function(e, t, n) {
    n(24),
    n(20),
    e.exports = function(e) {}
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {
    var i = n(19)(n(10), "Map");
    e.exports = i
}
, function(e, t, n) {
    function i(e) {
        var t = -1
          , n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; )
            ;
    }
    var o = n(175)
      , r = n(0)
      , a = n(0)
      , s = n(175)
      , c = n(175);
    i.prototype.clear = o,
    i.prototype.delete = r,
    i.prototype.get = a,
    i.prototype.has = s,
    i.prototype.set = c,
    e.exports = i
}
, function(e, t) {
    e.exports = function(e, t) {
        for (var n = -1, i = t.length, o = e.length; ++n < i; )
            e[o + n] = t[n];
        return e
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
    }
}
, function(e, t, n) {
    var i = n(67)
      , o = n(206)
      , r = Object.prototype.hasOwnProperty;
    e.exports = function(e) {
        if (!i(e))
            return o(e);
        var t = [];
        for (var n in Object(e))
            r.call(e, n) && "constructor" != n && t.push(n);
        return t
    }
}
, function(e, t) {
    var n = Object.prototype;
    e.exports = function(e) {
        var t = e && e.constructor;
        return e === ("function" == typeof t && t.prototype || n)
    }
}
, function(e, t, n) {
    var i = n(207)
      , o = n(59)
      , r = n(208)
      , a = n(209)
      , s = n(106)
      , c = n(24)
      , u = n(97)
      , l = (u(i),
    u(o),
    u(r),
    u(a),
    u(s),
    c);
    (i && "[object DataView]" != l(new i(new ArrayBuffer(1))) || o && "[object Map]" != l(new o) || r && "[object Promise]" != l(r.resolve()) || a && "[object Set]" != l(new a) || s && "[object WeakMap]" != l(new s)) && (l = function(e) {}
    ),
    e.exports = l
}
, function(e, t, n) {
    var i = n(51)
      , o = n(33);
    e.exports = function(e, t) {
        for (var n = 0, r = (t = i(t, e)).length; null != e && n < r; )
            e = e[o(t[n++])];
        return n && n == r ? e : void 0
    }
}
, function(e, t, n) {
    n(2),
    n(52),
    e.exports = function(e, t) {}
}
, function(e, t) {}
, function(e, t, n) {
    n(12),
    n(52),
    parseInt,
    e.exports = function(e) {}
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {
    function i(e, t, n) {
        function i(e) {
            if (!Object(o.default)(e))
                throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if (void 0 === e.type)
                throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (d)
                throw new Error("Reducers may not dispatch actions.");
            try {
                d = !0,
                u = c(u, e)
            } finally {
                d = !1
            }
            for (var t = l = f, n = 0; n < t.length; n++)
                t[n]();
            return e
        }
        var s;
        if ("function" == typeof t && void 0 === n && (n = t,
        t = void 0),
        "function" != typeof e)
            throw new Error("Expected the reducer to be a function.");
        var c = e
          , u = t
          , l = []
          , f = l
          , d = !1;
        return i({
            type: a.INIT
        }),
        (s = {
            dispatch: i,
            subscribe: function(e) {
                if ("function" != typeof e)
                    throw new Error("Expected listener to be a function.");
                return f.push(e)
            },
            getState: function() {
                return u
            },
            replaceReducer: function(e) {}
        })[r.default] = function() {}
        ,
        s
    }
    n.r(t),
    n.d(t, "ActionTypes", function() {}),
    n.d(t, "default", function() {
        return i
    });
    var o = n(129)
      , r = n(300)
      , a = {
        INIT: "@@redux/INIT"
    }
}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.TRANSFORM_STYLE_PREFIXED = t.TRANSFORM_PREFIXED = t.FLEX_PREFIXED = t.ELEMENT_MATCHES = t.withBrowser = t.IS_BROWSER_ENV = void 0,
    i(n(135));
    var o = "undefined" != typeof window;
    t.IS_BROWSER_ENV = o;
    var r = function(e, t) {
        return o ? e() : t
    };
    t.withBrowser = r;
    var a = r(function() {});
    t.ELEMENT_MATCHES = a;
    var s = r(function() {
        var e = document.createElement("i")
          , t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"];
        try {
            for (var n = t.length, i = 0; i < n; i++) {
                var o = t[i];
                if (e.style.display = o,
                e.style.display === o)
                    return o
            }
            return ""
        } catch (e) {
            return ""
        }
    }, "flex");
    t.FLEX_PREFIXED = s;
    var c = r(function() {
        var e = document.createElement("i");
        if (null == e.style.transform)
            for (var t = ["Webkit", "Moz", "ms"], n = t.length, i = 0; i < n; i++) {
                var o = t[i] + "Transform";
                if (void 0 !== e.style[o])
                    return o
            }
        return "transform"
    }, "transform");
    t.TRANSFORM_PREFIXED = c;
    var u = c.split("transform")[0]
      , l = u ? u + "TransformStyle" : "transformStyle";
    t.TRANSFORM_STYLE_PREFIXED = l
}
, function(e, t, n) {
    var i = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.mediaQueriesDefined = t.viewportWidthChanged = t.actionListPlaybackChanged = t.elementStateChanged = t.instanceRemoved = t.instanceStarted = t.instanceAdded = t.parameterChanged = t.animationFrameChanged = t.eventStateChanged = t.testFrameRendered = t.eventListenerAdded = t.clearRequested = t.stopRequested = t.playbackRequested = t.previewRequested = t.sessionStopped = t.sessionStarted = t.sessionInitialized = t.rawDataImported = void 0;
    var o = i(n(30))
      , r = n(6)
      , a = n(29)
      , s = r.IX2EngineActionTypes
      , c = s.IX2_RAW_DATA_IMPORTED
      , u = s.IX2_SESSION_INITIALIZED
      , l = s.IX2_SESSION_STARTED
      , f = (s.IX2_SESSION_STOPPED,
    s.IX2_PREVIEW_REQUESTED,
    s.IX2_PLAYBACK_REQUESTED,
    s.IX2_STOP_REQUESTED,
    s.IX2_CLEAR_REQUESTED,
    s.IX2_EVENT_LISTENER_ADDED)
      , d = (s.IX2_TEST_FRAME_RENDERED,
    s.IX2_EVENT_STATE_CHANGED)
      , p = s.IX2_ANIMATION_FRAME_CHANGED
      , v = (s.IX2_PARAMETER_CHANGED,
    s.IX2_INSTANCE_ADDED)
      , h = s.IX2_INSTANCE_STARTED
      , E = (s.IX2_INSTANCE_REMOVED,
    s.IX2_ELEMENT_STATE_CHANGED)
      , m = (s.IX2_ACTION_LIST_PLAYBACK_CHANGED,
    s.IX2_VIEWPORT_WIDTH_CHANGED,
    s.IX2_MEDIA_QUERIES_DEFINED,
    a.IX2VanillaUtils.reifyState);
    t.rawDataImported = function(e) {
        return {
            type: c,
            payload: (0,
            o.default)({}, m(e))
        }
    }
    ,
    t.sessionInitialized = function(e) {
        var t = e.hasBoundaryNodes;
        return {
            type: u,
            payload: {
                hasBoundaryNodes: t
            }
        }
    }
    ,
    t.sessionStarted = function() {
        return {
            type: l
        }
    }
    ,
    t.sessionStopped = function() {}
    ,
    t.previewRequested = function(e) {}
    ,
    t.playbackRequested = function(e) {}
    ,
    t.stopRequested = function(e) {}
    ,
    t.clearRequested = function() {}
    ,
    t.eventListenerAdded = function(e, t) {
        return {
            type: f,
            payload: {
                target: e,
                listenerParams: t
            }
        }
    }
    ,
    t.testFrameRendered = function() {}
    ,
    t.eventStateChanged = function(e, t) {
        return {
            type: d,
            payload: {
                stateKey: e,
                newState: t
            }
        }
    }
    ,
    t.animationFrameChanged = function(e, t) {
        return {
            type: p,
            payload: {
                now: e,
                parameters: t
            }
        }
    }
    ,
    t.parameterChanged = function(e, t) {}
    ,
    t.instanceAdded = function(e) {
        return {
            type: v,
            payload: (0,
            o.default)({}, e)
        }
    }
    ,
    t.instanceStarted = function(e, t) {
        return {
            type: h,
            payload: {
                instanceId: e,
                time: t
            }
        }
    }
    ,
    t.elementStateChanged = function(e, t, n, i) {
        return {
            type: E,
            payload: {
                elementId: e,
                actionTypeId: t,
                current: n,
                actionItem: i
            }
        }
    }
    ,
    t.mediaQueriesDefined = function() {}
}
, function(e, t, n) {
    function i(e, t) {}
    var o = n(148)
      , r = n(89);
    i.prototype = o(r.prototype),
    i.prototype.constructor = i,
    e.exports = i
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {
    n(1)(n(42)),
    window.tram = function(e) {
        var n = document;
        return window,
        n.createElement("a"),
        t.support = {},
        t.frame = void 0,
        t.now = void 0,
        t.config = {},
        e.style,
        e.css,
        e.tram = t
    }(window.jQuery)
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(24)
      , o = n(12);
    e.exports = function(e) {
        if (!o(e))
            return !1;
        var t = i(e);
        return "[object Function]" == t || "[object GeneratorFunction]" == t || "[object AsyncFunction]" == t || "[object Proxy]" == t
    }
}
, function(e, n, i) {
    (function(n) {
        var i = "object" == (void 0 === n ? "undefined" : t(n)) && n && n.Object === Object && n;
        e.exports = i
    }
    ).call(this, i(45))
}
, function(e, t) {
    var n = Function.prototype.toString;
    e.exports = function(e) {
        if (null != e) {
            try {
                return n.call(e)
            } catch (e) {}
            try {
                return e + ""
            } catch (e) {}
        }
        return ""
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(61)
      , o = n(2);
    e.exports = function(e, t, n) {
        var r = t(e);
        return o(e) ? r : i(r, n(e))
    }
}
, function(e, t, n) {
    var i = n(199)
      , o = n(102)
      , r = (Object.prototype.propertyIsEnumerable,
    Object.getOwnPropertySymbols)
      , a = r ? function(e) {
        return null == e ? [] : (e = Object(e),
        i(r(e), function(e) {}))
    }
    : o;
    e.exports = a
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {
    e.exports = function(e, t) {
        return function(n) {
            return e(t(n))
        }
    }
}
, function(e, t, n) {
    var i = n(19)(n(10), "WeakMap");
    e.exports = i
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {
    e.exports = function(e, t) {
        for (var n = -1, i = null == e ? 0 : e.length, o = Array(i); ++n < i; )
            o[n] = t(e[n], n, e);
        return o
    }
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    n.r(t);
    var i = n(84);
    n.d(t, "createStore", function() {
        return i.default
    });
    var o = n(131);
    n.d(t, "combineReducers", function() {
        return o.default
    }),
    n(133),
    n.d(t, "bindActionCreators", function() {}),
    n(134),
    n.d(t, "applyMiddleware", function() {}),
    n(85),
    n.d(t, "compose", function() {}),
    n(132)
}
, function(e, t, n) {
    n.r(t);
    var i = n(292)
      , o = n(297)
      , r = n(299)
      , a = Function.prototype
      , s = Object.prototype
      , c = a.toString
      , u = s.hasOwnProperty
      , l = c.call(Object);
    t.default = function(e) {
        if (!Object(r.default)(e) || "[object Object]" != Object(i.default)(e))
            return !1;
        var t = Object(o.default)(e);
        if (null === t)
            return !0;
        var n = u.call(t, "constructor") && t.constructor;
        return "function" == typeof n && n instanceof n && c.call(n) == l
    }
}
, function(e, t, n) {}
, function(e, t, n) {
    function i(e) {
        for (var t = Object.keys(e), n = {}, i = 0; i < t.length; i++) {
            var o = t[i];
            "function" == typeof e[o] && (n[o] = e[o])
        }
        var r = Object.keys(n);
        return function() {
            for (var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], t = arguments[1], i = !1, o = {}, a = 0; a < r.length; a++) {
                var s = r[a]
                  , c = n[s]
                  , u = e[s]
                  , l = c(u, t);
                o[s] = l,
                i = i || l !== u
            }
            return i ? o : e
        }
    }
    n.r(t),
    n.d(t, "default", function() {
        return i
    }),
    n(84),
    n(129),
    n(132)
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(136)(n(92));
    e.exports = i
}
, function(e, t, n) {
    n(18),
    n(25),
    n(48),
    e.exports = function(e) {
        return function(e, t, n) {}
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {
    function i(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5
          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10
          , i = Math.pow(n, t)
          , o = Number(Math.round(e * i) / i);
        return Math.abs(o) > 1e-4 ? o : 0
    }
    var o = (n(1)(n(140)),
    n(1))
      , r = n(40);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.optimizeFloat = i,
    t.createBezierEasing = function(e) {}
    ,
    t.applyEasing = function(e, t, n) {
        return 0 === t ? 0 : 1 === t ? 1 : i(n ? t > 0 ? n(t) : t : t > 0 && e && a[e] ? a[e](t) : t)
    }
    ;
    var a = r(n(137));
    o(n(138))
}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(1)(n(31));
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.isPluginType = function(e) {}
    ,
    t.clearPlugin = t.renderPlugin = t.createPluginInstance = t.getPluginDestination = t.getPluginDuration = t.getPluginOrigin = t.getPluginConfig = void 0,
    n(316);
    var o = n(6);
    n(86),
    (0,
    i.default)({}, o.ActionTypeConsts.PLUGIN_LOTTIE, {}),
    t.clearPlugin = void 0
}
, function(e, t, n) {
    var i = n(143)
      , o = n(323)(i);
    e.exports = o
}
, function(e, t, n) {
    var i = n(321)
      , o = n(48);
    e.exports = function(e, t) {
        return e && i(e, t, o)
    }
}
, function(e, t, n) {
    var i = n(327);
    t.__esModule = !0,
    t.default = void 0;
    var o = i(n(328)).default;
    t.default = o
}
, function(e, t, n) {
    function i(e) {
        var t, n = e.store, i = e.eventId, r = e.eventTarget, a = e.eventStateKey, s = e.actionListId, c = e.groupIndex, u = void 0 === c ? 0 : c, f = e.immediate, d = e.verbose, p = n.getState(), v = p.ixData, h = p.ixSession, E = v.events[i] || {}, m = E.mediaQueries, g = void 0 === m ? v.mediaQueryKeys : m, _ = (0,
        l.default)(v, "actionLists.".concat(s), {}), b = _.actionItemGroups, T = _.useFirstGroupAsInitialState;
        if (!b || !b.length)
            return !1;
        u >= b.length && (0,
        l.default)(E, "config.loop") && (u = 0),
        0 === u && T && u++;
        var S = (0 === u || 1 === u && T) && (0,
        y.isQuickEffect)(null === (t = E.action) || void 0 === t ? void 0 : t.actionTypeId) ? E.config.delay : void 0
          , O = (0,
        l.default)(b, [u, "actionItems"], []);
        if (!O.length)
            return !1;
        if (!G(g, h.mediaQueryKey))
            return !1;
        var C = h.hasBoundaryNodes && r ? I.getClosestElement(r, A) : null
          , x = U(O)
          , R = !1;
        return O.forEach(function(e, t) {
            var c = e.config
              , l = e.actionTypeId
              , p = B(l)
              , v = c.target;
            if (v) {
                var h = v.boundaryMode ? C : null;
                N({
                    config: c,
                    event: E,
                    eventTarget: r,
                    elementRoot: h,
                    elementApi: I
                }).forEach(function(c, v) {
                    var h = p ? H(l)(c, e) : null
                      , E = p ? z(l)(c, e) : null;
                    R = !0;
                    var m = x === t && 0 === v
                      , g = X({
                        element: c,
                        actionItem: e
                    })
                      , y = w({
                        element: c,
                        actionItem: e,
                        elementApi: I
                    }, h);
                    o({
                        store: n,
                        element: c,
                        actionItem: e,
                        eventId: i,
                        eventTarget: r,
                        eventStateKey: a,
                        actionListId: s,
                        groupIndex: u,
                        isCarrier: m,
                        computedStyle: g,
                        destination: y,
                        immediate: f,
                        verbose: d,
                        pluginInstance: h,
                        pluginDuration: E,
                        instanceDelay: S
                    })
                })
            }
        }),
        R
    }
    function o(e) {
        var t = e.store
          , n = e.computedStyle
          , i = (0,
        u.default)(e, ["store", "computedStyle"])
          , o = !i.continuous
          , a = i.element
          , s = i.actionItem
          , l = i.immediate
          , f = i.pluginInstance
          , d = F()
          , p = t.getState()
          , v = p.ixElements
          , h = p.ixSession
          , E = D(v, a)
          , m = (v[E] || {}).refState
          , g = I.getRefType(a)
          , y = j(a, m, n, s, I, f);
        t.dispatch((0,
        b.instanceAdded)((0,
        c.default)({
            instanceId: d,
            elementId: E,
            origin: y,
            refType: g
        }, i))),
        function(e, t, n) {
            var i = document.createEvent("CustomEvent");
            i.initCustomEvent("ix2-animation-started", !0, !0, n),
            e.dispatchEvent(i)
        }(document.body, 0, d),
        l || (M({
            store: t,
            select: function(e) {
                return e.ixInstances[d]
            },
            onChange: r
        }),
        o && t.dispatch((0,
        b.instanceStarted)(d, h.tick)))
    }
    function r(e, t) {
        var n = e.active
          , o = e.continuous
          , r = e.complete
          , a = e.elementId
          , s = e.actionItem
          , c = e.actionTypeId
          , u = e.renderType
          , l = e.current
          , f = e.groupIndex
          , d = e.eventId
          , p = e.eventTarget
          , v = e.eventStateKey
          , h = e.actionListId
          , E = e.isCarrier
          , m = e.styleProp
          , g = e.verbose
          , y = e.pluginInstance
          , _ = t.getState()
          , T = _.ixData
          , S = _.ixSession
          , O = (T.events[d] || {}).mediaQueries
          , A = void 0 === O ? T.mediaQueryKeys : O;
        if (G(A, S.mediaQueryKey) && (o || n || r)) {
            if (l || u === x && r) {
                t.dispatch((0,
                b.elementStateChanged)(a, c, l, s));
                var R = t.getState().ixElements[a] || {}
                  , L = R.ref
                  , N = R.refType
                  , D = R.refState
                  , w = D && D[c];
                switch (N) {
                case C:
                    P(L, D, w, d, s, m, I, u, y)
                }
            }
            if (r && E) {
                var M = i({
                    store: t,
                    eventId: d,
                    eventTarget: p,
                    eventStateKey: v,
                    actionListId: h,
                    groupIndex: f + 1,
                    verbose: g
                });
                g && !M && t.dispatch((0,
                b.actionListPlaybackChanged)({
                    actionListId: h,
                    isPlaying: !1
                }))
            }
        }
    }
    var a = (n(1)(n(140)),
    n(40))
      , s = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.observeRequests = function(e) {}
    ,
    t.startEngine = function(e) {
        var t, n = e.store, i = e.rawData, o = e.allowEvents, r = e.testManual, a = n.getState().ixSession;
        i && n.dispatch((0,
        b.rawDataImported)(i)),
        a.active || (n.dispatch((0,
        b.sessionInitialized)({
            hasBoundaryNodes: Boolean(document.querySelector(A))
        })),
        o && (function(e) {
            var t = e.getState().ixData.eventTypeMap;
            (0,
            h.default)(t, function(t, n) {
                var i = T.default[n];
                i ? function(e) {
                    var t = e.logic
                      , n = e.store
                      , i = e.events;
                    !function(e) {
                        if (k) {
                            var t = {}
                              , n = "";
                            for (var i in e) {
                                var o = e[i]
                                  , r = o.eventTypeId
                                  , a = o.target
                                  , s = I.getQuerySelector(a);
                                t[s] || r !== g.EventTypeConsts.MOUSE_CLICK && r !== g.EventTypeConsts.MOUSE_SECOND_CLICK || (t[s] = !0,
                                n += s + "{cursor: pointer;touch-action: manipulation;}")
                            }
                            if (n) {
                                var c = document.createElement("style");
                                c.textContent = n,
                                document.body.appendChild(c)
                            }
                        }
                    }(i);
                    var o = t.types
                      , r = t.handler
                      , a = n.getState().ixData
                      , s = (a.actionLists,
                    q(i, Q));
                    if ((0,
                    f.default)(s)) {
                        (0,
                        h.default)(s, function(e, t) {});
                        var c = function(e) {
                            var t = n.getState().ixSession;
                            K(s, function(o, s, c) {
                                var u = i[s]
                                  , l = t.eventState[c]
                                  , f = u.action
                                  , d = u.mediaQueries
                                  , p = void 0 === d ? a.mediaQueryKeys : d;
                                if (G(p, t.mediaQueryKey)) {
                                    var v = function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                          , i = r({
                                            store: n,
                                            element: o,
                                            event: u,
                                            eventConfig: t,
                                            nativeEvent: e,
                                            eventStateKey: c
                                        }, l);
                                        (0,
                                        m.default)(i, l) || n.dispatch((0,
                                        b.eventStateChanged)(c, i))
                                    };
                                    f.actionTypeId === g.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION ? (Array.isArray(u.config) ? u.config : [u.config]).forEach(v) : v()
                                }
                            })
                        }
                          , u = (0,
                        E.default)(c, Y)
                          , l = function(e) {
                            var t = e.target
                              , i = void 0 === t ? document : t
                              , o = e.types
                              , r = e.throttle;
                            o.split(" ").filter(Boolean).forEach(function(e) {
                                var t = r ? u : c;
                                i.addEventListener(e, t),
                                n.dispatch((0,
                                b.eventListenerAdded)(i, [e, t]))
                            })
                        };
                        Array.isArray(o) ? o.forEach(l) : "string" == typeof o && l(t)
                    }
                }({
                    logic: i,
                    store: e,
                    events: t
                }) : console.warn("IX2 event type not configured: ".concat(n))
            }),
            e.getState().ixSession.eventListeners.length
        }(n),
        -1 === (t = document.documentElement).className.indexOf(R) && (t.className += " ".concat(R)),
        n.getState().ixSession.hasDefinedMediaQueries),
        n.dispatch((0,
        b.sessionStarted)()),
        function(e, t) {
            !function n(i) {
                var o = e.getState()
                  , r = o.ixSession
                  , a = o.ixParameters;
                r.active && (e.dispatch((0,
                b.animationFrameChanged)(i, a)),
                t || requestAnimationFrame(n))
            }(window.performance.now())
        }(n, r))
    }
    ,
    t.stopEngine = function(e) {}
    ,
    t.stopAllActionGroups = function(e) {}
    ,
    t.stopActionGroup = function(e) {}
    ,
    t.startActionGroup = i;
    var c = s(n(30))
      , u = s(n(331))
      , l = (s(n(135)),
    s(n(50)))
      , f = s(n(332))
      , d = s(n(338))
      , p = s(n(350))
      , v = s(n(351))
      , h = s(n(352))
      , E = s(n(355))
      , m = s(n(144))
      , g = n(6)
      , y = n(358)
      , _ = n(29)
      , b = n(87)
      , I = a(n(360))
      , T = s(n(361))
      , S = g.IX2EngineConstants
      , O = S.COLON_DELIMITER
      , A = S.BOUNDARY_SELECTOR
      , C = S.HTML_ELEMENT
      , x = S.RENDER_GENERAL
      , R = S.W_MOD_IX
      , L = _.IX2VanillaUtils
      , N = L.getAffectedElements
      , D = L.getElementId
      , w = L.getDestinationValues
      , M = L.observeStore
      , F = L.getInstanceId
      , P = L.renderHTMLElement
      , U = (L.clearAllStyles,
    L.getMaxDurationItemIndex)
      , X = L.getComputedStyle
      , j = L.getInstanceOrigin
      , G = (L.reduceListToGroup,
    L.shouldNamespaceEventParameter,
    L.getNamespacedParameterId,
    L.shouldAllowMediaQuery)
      , V = (L.cleanupHTMLElement,
    L.stringifyTarget,
    L.mediaQueriesEqual,
    _.IX2VanillaPlugins)
      , B = V.isPluginType
      , H = V.createPluginInstance
      , z = V.getPluginDuration
      , W = navigator.userAgent
      , k = W.match(/iPad/i) || W.match(/iPhone/)
      , Y = 12
      , q = function(e, t) {
        return (0,
        d.default)((0,
        v.default)(e, t), p.default)
    }
      , K = function(e, t) {
        (0,
        h.default)(e, function(e, n) {
            e.forEach(function(e, i) {
                t(e, n, n + O + i)
            })
        })
    }
      , Q = function(e) {
        var t = e.target
          , n = e.targets;
        return n && n.length ? n.reduce(function(e, t) {}, []) : N({
            config: {
                target: t
            },
            elementApi: I
        })
    }
}
, function(e, t, n) {
    var i = n(147);
    e.exports = function(e, t, n) {
        "__proto__" == t && i ? i(e, t, {}) : e[t] = n
    }
}
, function(e, t, n) {
    var i = n(19)
      , o = function() {
        try {
            var e = i(Object, "defineProperty");
            return e({}, "", {}),
            e
        } catch (e) {}
    }();
    e.exports = o
}
, function(e, t, n) {
    var i = n(12)
      , o = Object.create;
    e.exports = function(t) {
        if (!i(t))
            return {};
        if (o)
            return o(t);
        e.prototype = t;
        var n = new e;
        return e.prototype = void 0,
        n
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    n(287),
    e.exports = n(394)
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(95)
      , o = n(172)
      , a = n(12)
      , s = n(97)
      , c = Function.prototype
      , u = Object.prototype
      , l = c.toString
      , f = u.hasOwnProperty
      , d = RegExp("^" + l.call(f).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    e.exports = function(e) {
        return !(!a(e) || o(e)) && (i(e) ? d : r).test(s(e))
    }
}
, function(e, t, n) {}
, function(e, t) {
    var n = Object.prototype.toString;
    e.exports = function(e) {
        return n.call(e)
    }
}
, function(e, t, n) {
    var i = n(173);
    /[^.]+$/.exec(i && i.keys && i.keys.IE_PROTO || ""),
    e.exports = function(e) {}
}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e, t) {
        return null == e ? void 0 : e[t]
    }
}
, function(e, t, n) {
    n(0),
    e.exports = function() {}
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e, t) {
        for (var n = -1, i = null == e ? 0 : e.length; ++n < i; )
            ;
        return []
    }
}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(105)(Object.keys, Object);
    e.exports = i
}
, function(e, t, n) {
    var i = n(19)(n(10), "DataView");
    e.exports = i
}
, function(e, t, n) {
    var i = n(19)(n(10), "Promise");
    e.exports = i
}
, function(e, t, n) {
    var i = n(19)(n(10), "Set");
    e.exports = i
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(213)
      , o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
      , r = /\\(\\)?/g
      , a = i(function(e) {
        var t = [];
        return 46 === e.charCodeAt(0) && t.push(""),
        e.replace(o, function(e, n, i, o) {
            t.push(i ? o.replace(r, "$1") : n || e)
        }),
        t
    });
    e.exports = a
}
, function(e, t, n) {
    var i = n(214);
    e.exports = function(e) {
        var t = i(e, function(e) {
            return 500 === n.size && n.clear(),
            e
        })
          , n = t.cache;
        return t
    }
}
, function(e, t, n) {
    function i(e, t) {
        if ("function" != typeof e || null != t && "function" != typeof t)
            throw new TypeError(r);
        var n = function n() {
            var i = arguments
              , o = t ? t.apply(this, i) : i[0]
              , r = n.cache;
            if (r.has(o))
                return r.get(o);
            var a = e.apply(this, i);
            return n.cache = r.set(o, a) || r,
            a
        };
        return n.cache = new (i.Cache || o),
        n
    }
    var o = n(60)
      , r = "Expected a function";
    i.Cache = o,
    e.exports = i
}
, function(e, t, n) {
    var i = n(216);
    e.exports = function(e) {
        return null == e ? "" : i(e)
    }
}
, function(e, t, n) {
    var i = n(32)
      , o = n(109)
      , r = n(2)
      , a = n(52)
      , s = i ? i.prototype : void 0
      , c = s ? s.toString : void 0;
    e.exports = function e(t) {
        if ("string" == typeof t)
            return t;
        if (r(t))
            return o(t, e) + "";
        if (a(t))
            return c ? c.call(t) : "";
        var n = t + "";
        return "0" == n && 1 / t == -1 / 0 ? "-0" : n
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    var i = n(7)
      , o = n(288);
    o.setEnv(i.env),
    i.define("ix2", e.exports = function() {
        return o
    }
    )
}
, function(e, t, n) {
    function i() {
        (0,
        c.stopEngine)(l)
    }
    var o = n(40)
      , r = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.setEnv = function(e) {
        e() && (0,
        c.observeRequests)(l)
    }
    ,
    t.init = function(e) {
        i(),
        (0,
        c.startEngine)({
            store: l,
            rawData: e,
            allowEvents: !0
        })
    }
    ,
    t.destroy = i,
    t.actions = t.store = void 0,
    n(289);
    var a = n(128)
      , s = r(n(303))
      , c = n(145)
      , u = o(n(87));
    t.actions = u;
    var l = (0,
    a.createStore)(s.default);
    t.store = l
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    n.r(t);
    var i = n(130)
      , o = n(295)
      , r = n(296)
      , a = i.default ? i.default.toStringTag : void 0;
    t.default = function(e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : a && a in Object(e) ? Object(o.default)(e) : Object(r.default)(e)
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {
    n.r(t);
    var i = Object.prototype.toString;
    t.default = function(e) {
        return i.call(e)
    }
}
, function(e, t, n) {
    n.r(t);
    var i = n(298)
      , o = Object(i.default)(Object.getPrototypeOf, Object);
    t.default = o
}
, function(e, t, n) {
    n.r(t),
    t.default = function(e, t) {
        return function(n) {
            return e(t(n))
        }
    }
}
, function(e, n, i) {
    i.r(n),
    n.default = function(e) {
        return null != e && "object" == (void 0 === e ? "undefined" : t(e))
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var i = n(128)
      , o = n(304)
      , r = n(310)
      , a = n(311)
      , s = n(29)
      , c = n(329)
      , u = n(330)
      , l = s.IX2ElementsReducer.ixElements
      , f = (0,
    i.combineReducers)({
        ixData: o.ixData,
        ixRequest: r.ixRequest,
        ixSession: a.ixSession,
        ixElements: l,
        ixInstances: c.ixInstances,
        ixParameters: u.ixParameters
    });
    t.default = f
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ixData = void 0;
    var i = n(6).IX2EngineActionTypes.IX2_RAW_DATA_IMPORTED;
    t.ixData = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.freeze({})
          , t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
        case i:
            return t.payload.ixData || Object.freeze({});
        default:
            return e
        }
    }
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.QuickEffectDirectionConsts = t.QuickEffectIds = t.EventLimitAffectedElements = t.EventContinuousMouseAxes = t.EventBasedOn = t.EventAppliesTo = t.EventTypeConsts = void 0,
    t.EventTypeConsts = {
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE"
    },
    t.EventAppliesTo = {
        ELEMENT: "ELEMENT",
        CLASS: "CLASS",
        PAGE: "PAGE"
    },
    t.EventBasedOn = {
        ELEMENT: "ELEMENT",
        VIEWPORT: "VIEWPORT"
    },
    t.EventContinuousMouseAxes = {
        X_AXIS: "X_AXIS",
        Y_AXIS: "Y_AXIS"
    },
    t.EventLimitAffectedElements = {
        CHILDREN: "CHILDREN",
        SIBLINGS: "SIBLINGS",
        IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN"
    },
    t.QuickEffectIds = {
        FADE_EFFECT: "FADE_EFFECT",
        SLIDE_EFFECT: "SLIDE_EFFECT",
        GROW_EFFECT: "GROW_EFFECT",
        SHRINK_EFFECT: "SHRINK_EFFECT",
        SPIN_EFFECT: "SPIN_EFFECT",
        FLY_EFFECT: "FLY_EFFECT",
        POP_EFFECT: "POP_EFFECT",
        FLIP_EFFECT: "FLIP_EFFECT",
        JIGGLE_EFFECT: "JIGGLE_EFFECT",
        PULSE_EFFECT: "PULSE_EFFECT",
        DROP_EFFECT: "DROP_EFFECT",
        BLINK_EFFECT: "BLINK_EFFECT",
        BOUNCE_EFFECT: "BOUNCE_EFFECT",
        FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
        FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
        RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
        JELLO_EFFECT: "JELLO_EFFECT",
        GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
        SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
        PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT"
    },
    t.QuickEffectDirectionConsts = {
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        BOTTOM: "BOTTOM",
        TOP: "TOP",
        BOTTOM_LEFT: "BOTTOM_LEFT",
        BOTTOM_RIGHT: "BOTTOM_RIGHT",
        TOP_RIGHT: "TOP_RIGHT",
        TOP_LEFT: "TOP_LEFT",
        CLOCKWISE: "CLOCKWISE",
        COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE"
    }
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ActionAppliesTo = t.ActionTypeConsts = void 0,
    t.ActionTypeConsts = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW"
    },
    t.ActionAppliesTo = {
        ELEMENT: "ELEMENT",
        ELEMENT_CLASS: "ELEMENT_CLASS",
        TRIGGER_ELEMENT: "TRIGGER_ELEMENT"
    }
}
, function(e, t, n) {}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.IX2_TEST_FRAME_RENDERED = t.IX2_MEDIA_QUERIES_DEFINED = t.IX2_VIEWPORT_WIDTH_CHANGED = t.IX2_ACTION_LIST_PLAYBACK_CHANGED = t.IX2_ELEMENT_STATE_CHANGED = t.IX2_INSTANCE_REMOVED = t.IX2_INSTANCE_STARTED = t.IX2_INSTANCE_ADDED = t.IX2_PARAMETER_CHANGED = t.IX2_ANIMATION_FRAME_CHANGED = t.IX2_EVENT_STATE_CHANGED = t.IX2_EVENT_LISTENER_ADDED = t.IX2_CLEAR_REQUESTED = t.IX2_STOP_REQUESTED = t.IX2_PLAYBACK_REQUESTED = t.IX2_PREVIEW_REQUESTED = t.IX2_SESSION_STOPPED = t.IX2_SESSION_STARTED = t.IX2_SESSION_INITIALIZED = t.IX2_RAW_DATA_IMPORTED = void 0,
    t.IX2_RAW_DATA_IMPORTED = "IX2_RAW_DATA_IMPORTED",
    t.IX2_SESSION_INITIALIZED = "IX2_SESSION_INITIALIZED",
    t.IX2_SESSION_STARTED = "IX2_SESSION_STARTED",
    t.IX2_SESSION_STOPPED = "IX2_SESSION_STOPPED",
    t.IX2_PREVIEW_REQUESTED = "IX2_PREVIEW_REQUESTED",
    t.IX2_PLAYBACK_REQUESTED = "IX2_PLAYBACK_REQUESTED",
    t.IX2_STOP_REQUESTED = "IX2_STOP_REQUESTED",
    t.IX2_CLEAR_REQUESTED = "IX2_CLEAR_REQUESTED",
    t.IX2_EVENT_LISTENER_ADDED = "IX2_EVENT_LISTENER_ADDED",
    t.IX2_EVENT_STATE_CHANGED = "IX2_EVENT_STATE_CHANGED",
    t.IX2_ANIMATION_FRAME_CHANGED = "IX2_ANIMATION_FRAME_CHANGED",
    t.IX2_PARAMETER_CHANGED = "IX2_PARAMETER_CHANGED",
    t.IX2_INSTANCE_ADDED = "IX2_INSTANCE_ADDED",
    t.IX2_INSTANCE_STARTED = "IX2_INSTANCE_STARTED",
    t.IX2_INSTANCE_REMOVED = "IX2_INSTANCE_REMOVED",
    t.IX2_ELEMENT_STATE_CHANGED = "IX2_ELEMENT_STATE_CHANGED",
    t.IX2_ACTION_LIST_PLAYBACK_CHANGED = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
    t.IX2_VIEWPORT_WIDTH_CHANGED = "IX2_VIEWPORT_WIDTH_CHANGED",
    t.IX2_MEDIA_QUERIES_DEFINED = "IX2_MEDIA_QUERIES_DEFINED",
    t.IX2_TEST_FRAME_RENDERED = "IX2_TEST_FRAME_RENDERED"
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.RENDER_PLUGIN = t.RENDER_STYLE = t.RENDER_GENERAL = t.RENDER_TRANSFORM = t.ABSTRACT_NODE = t.PLAIN_OBJECT = t.HTML_ELEMENT = t.PRESERVE_3D = t.PARENT = t.SIBLINGS = t.IMMEDIATE_CHILDREN = t.CHILDREN = t.BAR_DELIMITER = t.COLON_DELIMITER = t.COMMA_DELIMITER = t.AUTO = t.WILL_CHANGE = t.FLEX = t.DISPLAY = t.COLOR = t.BORDER_COLOR = t.BACKGROUND = t.BACKGROUND_COLOR = t.HEIGHT = t.WIDTH = t.FILTER = t.OPACITY = t.SKEW_Y = t.SKEW_X = t.SKEW = t.ROTATE_Z = t.ROTATE_Y = t.ROTATE_X = t.SCALE_3D = t.SCALE_Z = t.SCALE_Y = t.SCALE_X = t.TRANSLATE_3D = t.TRANSLATE_Z = t.TRANSLATE_Y = t.TRANSLATE_X = t.TRANSFORM = t.CONFIG_UNIT = t.CONFIG_Z_UNIT = t.CONFIG_Y_UNIT = t.CONFIG_X_UNIT = t.CONFIG_VALUE = t.CONFIG_Z_VALUE = t.CONFIG_Y_VALUE = t.CONFIG_X_VALUE = t.BOUNDARY_SELECTOR = t.W_MOD_IX = t.W_MOD_JS = t.WF_PAGE = t.IX2_ID_DELIMITER = void 0,
    t.IX2_ID_DELIMITER = "|",
    t.WF_PAGE = "data-wf-page",
    t.W_MOD_JS = "w-mod-js",
    t.W_MOD_IX = "w-mod-ix",
    t.BOUNDARY_SELECTOR = ".w-dyn-item",
    t.CONFIG_X_VALUE = "xValue",
    t.CONFIG_Y_VALUE = "yValue",
    t.CONFIG_Z_VALUE = "zValue",
    t.CONFIG_VALUE = "value",
    t.CONFIG_X_UNIT = "xUnit",
    t.CONFIG_Y_UNIT = "yUnit",
    t.CONFIG_Z_UNIT = "zUnit",
    t.CONFIG_UNIT = "unit",
    t.TRANSFORM = "transform",
    t.TRANSLATE_X = "translateX",
    t.TRANSLATE_Y = "translateY",
    t.TRANSLATE_Z = "translateZ",
    t.TRANSLATE_3D = "translate3d",
    t.SCALE_X = "scaleX",
    t.SCALE_Y = "scaleY",
    t.SCALE_Z = "scaleZ",
    t.SCALE_3D = "scale3d",
    t.ROTATE_X = "rotateX",
    t.ROTATE_Y = "rotateY",
    t.ROTATE_Z = "rotateZ",
    t.SKEW = "skew",
    t.SKEW_X = "skewX",
    t.SKEW_Y = "skewY",
    t.OPACITY = "opacity",
    t.FILTER = "filter",
    t.WIDTH = "width",
    t.HEIGHT = "height",
    t.BACKGROUND_COLOR = "backgroundColor",
    t.BACKGROUND = "background",
    t.BORDER_COLOR = "borderColor",
    t.COLOR = "color",
    t.DISPLAY = "display",
    t.FLEX = "flex",
    t.WILL_CHANGE = "willChange",
    t.AUTO = "AUTO",
    t.COMMA_DELIMITER = ",",
    t.COLON_DELIMITER = ":",
    t.BAR_DELIMITER = "|",
    t.CHILDREN = "CHILDREN",
    t.IMMEDIATE_CHILDREN = "IMMEDIATE_CHILDREN",
    t.SIBLINGS = "SIBLINGS",
    t.PARENT = "PARENT",
    t.PRESERVE_3D = "preserve-3d",
    t.HTML_ELEMENT = "HTML_ELEMENT",
    t.PLAIN_OBJECT = "PLAIN_OBJECT",
    t.ABSTRACT_NODE = "ABSTRACT_NODE",
    t.RENDER_TRANSFORM = "RENDER_TRANSFORM",
    t.RENDER_GENERAL = "RENDER_GENERAL",
    t.RENDER_STYLE = "RENDER_STYLE",
    t.RENDER_PLUGIN = "RENDER_PLUGIN"
}
, function(e, t, n) {}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ixSession = void 0;
    var i = n(6)
      , o = n(41)
      , r = i.IX2EngineActionTypes
      , a = r.IX2_SESSION_INITIALIZED
      , s = r.IX2_SESSION_STARTED
      , c = r.IX2_TEST_FRAME_RENDERED
      , u = r.IX2_SESSION_STOPPED
      , l = r.IX2_EVENT_LISTENER_ADDED
      , f = r.IX2_EVENT_STATE_CHANGED
      , d = r.IX2_ANIMATION_FRAME_CHANGED
      , p = r.IX2_ACTION_LIST_PLAYBACK_CHANGED
      , v = r.IX2_VIEWPORT_WIDTH_CHANGED
      , h = r.IX2_MEDIA_QUERIES_DEFINED
      , E = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1
    };
    t.ixSession = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E
          , t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
        case a:
            var n = t.payload.hasBoundaryNodes;
            return (0,
            o.set)(e, "hasBoundaryNodes", n);
        case s:
            return (0,
            o.set)(e, "active", !0);
        case c:
            var i = t.payload.step
              , r = void 0 === i ? 20 : i;
            return (0,
            o.set)(e, "tick", e.tick + r);
        case u:
            return E;
        case d:
            var m = t.payload.now;
            return (0,
            o.set)(e, "tick", m);
        case l:
            var g = (0,
            o.addLast)(e.eventListeners, t.payload);
            return (0,
            o.set)(e, "eventListeners", g);
        case f:
            var y = t.payload
              , _ = y.stateKey
              , b = y.newState;
            return (0,
            o.setIn)(e, ["eventState", _], b);
        case p:
            var I = t.payload
              , T = I.actionListId
              , S = I.isPlaying;
            return (0,
            o.setIn)(e, ["playbackState", T], S);
        case v:
            for (var O = t.payload, A = O.width, C = O.mediaQueries, x = C.length, R = null, L = 0; L < x; L++) {
                var N = C[L]
                  , D = N.key
                  , w = N.min
                  , M = N.max;
                if (A >= w && A <= M) {
                    R = D;
                    break
                }
            }
            return (0,
            o.merge)(e, {
                viewportWidth: A,
                mediaQueryKey: R
            });
        case h:
            return (0,
            o.set)(e, "hasDefinedMediaQueries", !0);
        default:
            return e
        }
    }
}
, function(e, t) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {
    function i(e, t, n, i, o) {
        var a = n === c ? (0,
        r.getIn)(o, ["config", "target", "objectId"]) : null;
        return (0,
        r.mergeIn)(e, [i], {
            id: i,
            ref: t,
            refId: a,
            refType: n
        })
    }
    function o(e, t, n, i, o) {
        var a = function(e) {
            var t = o.config;
            return T.reduce(function(e, n) {
                var i = n[0]
                  , o = n[1]
                  , r = t[i]
                  , a = t[o];
                return null != r && null != a && (e[o] = a),
                e
            }, {})
        }()
          , s = [t, I, n];
        return (0,
        r.mergeIn)(e, s, i, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.createElementState = i,
    t.mergeActionState = o,
    t.ixElements = void 0;
    var r = n(41)
      , a = n(6)
      , s = a.IX2EngineConstants
      , c = (s.HTML_ELEMENT,
    s.PLAIN_OBJECT)
      , u = (s.ABSTRACT_NODE,
    s.CONFIG_X_VALUE)
      , l = s.CONFIG_Y_VALUE
      , f = s.CONFIG_Z_VALUE
      , d = s.CONFIG_VALUE
      , p = s.CONFIG_X_UNIT
      , v = s.CONFIG_Y_UNIT
      , h = s.CONFIG_Z_UNIT
      , E = s.CONFIG_UNIT
      , m = a.IX2EngineActionTypes
      , g = m.IX2_SESSION_STOPPED
      , y = m.IX2_INSTANCE_ADDED
      , _ = m.IX2_ELEMENT_STATE_CHANGED
      , b = {}
      , I = "refState";
    t.ixElements = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : b
          , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        switch (t.type) {
        case g:
            return b;
        case y:
            var n = t.payload
              , a = n.elementId
              , s = n.element
              , c = n.origin
              , u = n.actionItem
              , l = n.refType
              , f = u.actionTypeId
              , d = e;
            return (0,
            r.getIn)(d, [a, s]) !== s && (d = i(d, s, l, a, u)),
            o(d, a, f, c, u);
        case _:
            var p = t.payload;
            return o(e, p.elementId, p.actionTypeId, p.current, p.actionItem);
        default:
            return e
        }
    }
    ;
    var T = [[u, p], [l, v], [f, h], [d, E]]
}
, function(e, t, n) {}
, function(e, t, n) {
    function i(e) {
        var t = (0,
        c.default)(e);
        return "string" === t ? {
            id: e
        } : null != e && "object" === t ? {
            id: e.id,
            objectId: e.objectId,
            selector: e.selector,
            selectorGuids: e.selectorGuids,
            appliesTo: e.appliesTo,
            useEventTarget: e.useEventTarget
        } : {}
    }
    var o, r, a, s = n(1), c = s(n(42)), u = s(n(31)), l = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getInstanceId = function() {
        return "i" + ce++
    }
    ,
    t.getElementId = function(e, t) {
        for (var n in e) {
            var i = e[n];
            if (i && i.ref === t)
                return i.id
        }
        return "e" + ue++
    }
    ,
    t.reifyState = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          , t = e.events
          , n = e.actionLists
          , i = e.site
          , o = (0,
        d.default)(t, function(e, t) {
            var n = t.eventTypeId;
            return e[n] || (e[n] = {}),
            e[n][t.id] = t,
            e
        }, {})
          , r = i && i.mediaQueries
          , a = [];
        return r ? a = r.map(function(e) {}) : (r = [],
        console.warn()),
        {
            ixData: {
                events: t,
                actionLists: n,
                eventTypeMap: o,
                mediaQueries: r,
                mediaQueryKeys: a
            }
        }
    }
    ,
    t.observeStore = function(e) {
        var t = e.store
          , n = e.select
          , i = e.onChange
          , o = e.comparator
          , r = void 0 === o ? le : o
          , a = t.getState
          , s = (0,
        t.subscribe)(function() {
            var e = n(a());
            null != e ? r(e, c) || i(c = e, t) : s()
        })
          , c = n(a());
        return s
    }
    ,
    t.getAffectedElements = function(e) {
        var t = e.config
          , n = e.event
          , o = e.eventTarget
          , r = e.elementRoot
          , a = e.elementApi;
        if (!a)
            throw new Error("IX2 missing elementApi");
        var s = a.getValidDocument
          , c = a.getQuerySelector
          , u = a.queryDocument
          , l = a.getChildElements
          , f = a.getSiblingElements
          , d = a.matchSelector
          , h = a.elementContains
          , m = (a.isSiblingNode,
        t.target);
        if (!m)
            return [];
        var g = i(m)
          , y = g.id
          , _ = g.objectId
          , b = g.selector
          , I = g.selectorGuids
          , T = g.appliesTo
          , S = g.useEventTarget;
        if (_)
            return [se[_] || (se[_] = {})];
        if (T === v.EventAppliesTo.PAGE) {
            var O = s(y);
            return O ? [O] : []
        }
        var A, C, x, R = (0,
        p.default)(n, "action.config.affectedElements", {})[y || b] || {}, L = Boolean(R.id || R.selector), N = n && c(i(n.target));
        if (L ? (A = R.limitAffectedElements,
        C = N,
        x = c(R)) : C = x = c({
            id: y,
            selector: b,
            selectorGuids: I
        }),
        n && S) {
            var D = o && (x || !0 === S) ? [o] : u(N);
            if (x) {
                if (S === U)
                    return u(x).filter(function(e) {});
                if (S === M)
                    return u(x).filter(function(e) {
                        return D.some(function(t) {
                            return h(t, e)
                        })
                    });
                if (S === P)
                    return u(x).filter(function(e) {})
            }
            return D
        }
        return null == C || null == x ? [] : E.IS_BROWSER_ENV && r ? u(x).filter(function(e) {}) : A === M ? u(C, x) : A === F ? l(u(C)).filter(d(x)) : A === P ? f(u(C)).filter(d(x)) : u(x)
    }
    ,
    t.getComputedStyle = function(e) {
        var t = e.element
          , n = e.actionItem;
        if (!E.IS_BROWSER_ENV)
            return {};
        switch (n.actionTypeId) {
        case J:
        case ee:
        case te:
        case ne:
        case ie:
            return window.getComputedStyle(t);
        default:
            return {}
        }
    }
    ,
    t.getInstanceOrigin = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          , i = arguments.length > 3 ? arguments[3] : void 0
          , o = (arguments.length > 4 ? arguments[4] : void 0).getStyle
          , r = i.actionTypeId
          , a = i.config;
        if ((0,
        h.isPluginType)(r))
            return (0,
            h.getPluginOrigin)(r)(t[r]);
        switch (r) {
        case Y:
        case q:
        case K:
        case Q:
            return t[r] || ve[r];
        case Z:
            return de(t[r], i.config.filters);
        case $:
            return {
                value: (0,
                f.default)(parseFloat(o(e, C)), 1)
            };
        case J:
            var s = o(e, R)
              , c = o(e, L);
            return {
                widthValue: a.widthUnit === G ? fe.test(s) ? parseFloat(s) : parseFloat(n.width) : (0,
                f.default)(parseFloat(s), parseFloat(n.width)),
                heightValue: a.heightUnit === G ? fe.test(c) ? parseFloat(c) : parseFloat(n.height) : (0,
                f.default)(parseFloat(c), parseFloat(n.height))
            };
        case ee:
        case te:
        case ne:
            return;
        case ie:
            return {
                value: (0,
                f.default)(o(e, X), n.display)
            };
        case oe:
            return t[r] || {
                value: 0
            };
        default:
            return
        }
    }
    ,
    t.getDestinationValues = function(e) {
        var t = e.element
          , n = e.actionItem
          , i = e.elementApi
          , o = n.actionTypeId;
        if ((0,
        h.isPluginType)(o))
            return (0,
            h.getPluginDestination)(o)(n.config);
        switch (o) {
        case Y:
        case q:
        case K:
        case Q:
            var r = n.config;
            return {
                xValue: r.xValue,
                yValue: r.yValue,
                zValue: r.zValue
            };
        case J:
            var a = i.getStyle
              , s = i.setStyle
              , c = i.getProperty
              , u = n.config
              , l = u.widthUnit
              , f = u.heightUnit
              , d = n.config
              , p = d.widthValue
              , v = d.heightValue;
            if (!E.IS_BROWSER_ENV)
                return {
                    widthValue: p,
                    heightValue: v
                };
            if (l === G) {
                var m = a(t, R);
                s(t, R, ""),
                p = c(t, "offsetWidth"),
                s(t, R, m)
            }
            if (f === G) {
                var g = a(t, L);
                s(t, L, ""),
                v = c(t, "offsetHeight"),
                s(t, L, g)
            }
            return {
                widthValue: p,
                heightValue: v
            };
        case ee:
        case te:
        case ne:
            var y = n.config;
            return {
                rValue: y.rValue,
                gValue: y.gValue,
                bValue: y.bValue,
                aValue: y.aValue
            };
        case Z:
            return n.config.filters.reduce(pe, {});
        default:
            return {
                value: n.config.value
            }
        }
    }
    ,
    t.getRenderType = function(e) {
        return /^TRANSFORM_/.test(e) ? B : /^STYLE_/.test(e) ? z : /^GENERAL_/.test(e) ? H : /^PLUGIN_/.test(e) ? W : void 0
    }
    ,
    t.getStyleProp = function(e, t) {
        return e === z ? t.replace("STYLE_", "").toLowerCase() : null
    }
    ,
    t.renderHTMLElement = function(e, t, n, i, o, r, a, s, c) {
        switch (s) {
        case B:
            return function(e, t, n, i, o) {
                var r, a, s, c, u, l = he.map(function(e) {
                    var n = ve[e]
                      , i = t[e] || {}
                      , o = i.xValue
                      , r = void 0 === o ? n.xValue : o
                      , a = i.yValue
                      , s = void 0 === a ? n.yValue : a
                      , c = i.zValue
                      , u = void 0 === c ? n.zValue : c
                      , l = i.xUnit
                      , f = void 0 === l ? "" : l
                      , d = i.yUnit
                      , p = void 0 === d ? "" : d
                      , v = i.zUnit
                      , h = void 0 === v ? "" : v;
                    switch (e) {
                    case Y:
                        return "".concat(_, "(").concat(r).concat(f, ", ").concat(s).concat(p, ", ").concat(u).concat(h, ")");
                    case q:
                        return "".concat(b, "(").concat(r).concat(f, ", ").concat(s).concat(p, ", ").concat(u).concat(h, ")");
                    case K:
                        return "".concat(I, "(").concat(r).concat(f, ") ").concat(T, "(").concat(s).concat(p, ") ").concat(S, "(").concat(u).concat(h, ")");
                    case Q:
                        return "".concat(O, "(").concat(r).concat(f, ", ").concat(s).concat(p, ")");
                    default:
                        return ""
                    }
                }).join(" "), f = o.setStyle;
                (function(e, t, n) {
                    if (E.IS_BROWSER_ENV) {
                        var i = ae[t];
                        if (i) {
                            var o = n.getStyle
                              , r = n.setStyle
                              , a = o(e, j);
                            if (a) {
                                var s = a.split(V).map(re);
                                -1 === s.indexOf(i) && r(e, j, s.concat(i).join(V))
                            } else
                                r(e, j, i)
                        }
                    }
                }
                )(e, E.TRANSFORM_PREFIXED, o),
                f(e, E.TRANSFORM_PREFIXED, l),
                r = n,
                a = i.actionTypeId,
                s = r.xValue,
                c = r.yValue,
                u = r.zValue,
                (a === Y && void 0 !== u || a === q && void 0 !== u || a === K && (void 0 !== s || void 0 !== c)) && f(e, E.TRANSFORM_STYLE_PREFIXED, A)
            }(e, t, n, o, a);
        case z:
        case H:
            return;
        case W:
            var u = o.actionTypeId;
            if ((0,
            h.isPluginType)(u))
                return (0,
                h.renderPlugin)(u)(c, t, o)
        }
    }
    ,
    t.clearAllStyles = function(e) {}
    ,
    t.cleanupHTMLElement = function(e, t, n) {}
    ,
    t.getMaxDurationItemIndex = function(e) {
        var t = 0
          , n = 0;
        return e.forEach(function(e, i) {
            var o = e.config
              , r = o.delay + o.duration;
            r >= t && (t = r,
            n = i)
        }),
        n
    }
    ,
    t.getActionListProgress = function(e, t) {}
    ,
    t.reduceListToGroup = function(e) {}
    ,
    t.shouldNamespaceEventParameter = function(e, t) {}
    ,
    t.getNamespacedParameterId = function(e, t) {}
    ,
    t.shouldAllowMediaQuery = function(e, t) {
        return null == t || -1 !== e.indexOf(t)
    }
    ,
    t.mediaQueriesEqual = function(e, t) {}
    ,
    t.stringifyTarget = function(e) {}
    ,
    t.getItemConfigByKey = void 0;
    var f = l(n(318))
      , d = l(n(319))
      , p = (l(n(325)),
    l(n(50)))
      , v = (n(41),
    l(n(144)),
    n(6))
      , h = (n(139),
    n(141))
      , E = n(86)
      , m = v.IX2EngineConstants
      , g = m.BACKGROUND
      , y = m.TRANSFORM
      , _ = m.TRANSLATE_3D
      , b = m.SCALE_3D
      , I = m.ROTATE_X
      , T = m.ROTATE_Y
      , S = m.ROTATE_Z
      , O = m.SKEW
      , A = m.PRESERVE_3D
      , C = (m.FLEX,
    m.OPACITY)
      , x = m.FILTER
      , R = m.WIDTH
      , L = m.HEIGHT
      , N = m.BACKGROUND_COLOR
      , D = m.BORDER_COLOR
      , w = m.COLOR
      , M = m.CHILDREN
      , F = m.IMMEDIATE_CHILDREN
      , P = m.SIBLINGS
      , U = m.PARENT
      , X = m.DISPLAY
      , j = m.WILL_CHANGE
      , G = m.AUTO
      , V = m.COMMA_DELIMITER
      , B = (m.COLON_DELIMITER,
    m.BAR_DELIMITER,
    m.RENDER_TRANSFORM)
      , H = m.RENDER_GENERAL
      , z = m.RENDER_STYLE
      , W = m.RENDER_PLUGIN
      , k = v.ActionTypeConsts
      , Y = k.TRANSFORM_MOVE
      , q = k.TRANSFORM_SCALE
      , K = k.TRANSFORM_ROTATE
      , Q = k.TRANSFORM_SKEW
      , $ = k.STYLE_OPACITY
      , Z = k.STYLE_FILTER
      , J = k.STYLE_SIZE
      , ee = k.STYLE_BACKGROUND_COLOR
      , te = k.STYLE_BORDER
      , ne = k.STYLE_TEXT_COLOR
      , ie = k.GENERAL_DISPLAY
      , oe = "OBJECT_VALUE"
      , re = function(e) {
        return e.trim()
    }
      , ae = (Object.freeze((o = {},
    (0,
    u.default)(o, ee, N),
    (0,
    u.default)(o, te, D),
    (0,
    u.default)(o, ne, w),
    o)),
    Object.freeze((r = {},
    (0,
    u.default)(r, E.TRANSFORM_PREFIXED, y),
    (0,
    u.default)(r, N, g),
    (0,
    u.default)(r, C, C),
    (0,
    u.default)(r, x, x),
    (0,
    u.default)(r, R, R),
    (0,
    u.default)(r, L, L),
    r)))
      , se = {}
      , ce = 1
      , ue = 1
      , le = function(e, t) {
        return e === t
    }
      , fe = /px/
      , de = function(e, t) {}
      , pe = function(e, t) {};
    t.getItemConfigByKey = function(e, t, n) {}
    ;
    var ve = (a = {},
    (0,
    u.default)(a, Y, Object.freeze({
        xValue: 0,
        yValue: 0,
        zValue: 0
    })),
    (0,
    u.default)(a, q, Object.freeze({
        xValue: 1,
        yValue: 1,
        zValue: 1
    })),
    (0,
    u.default)(a, K, Object.freeze({
        xValue: 0,
        yValue: 0,
        zValue: 0
    })),
    (0,
    u.default)(a, Q, Object.freeze({
        xValue: 0,
        yValue: 0
    })),
    a)
      , he = (Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100
    }),
    Object.keys(ve));
    RegExp("rgba?".concat("\\(([^)]+)\\)"))
}
, function(e, t) {}
, function(e, t, n) {
    var i = n(320)
      , o = n(142)
      , r = n(18)
      , a = n(324)
      , s = n(2);
    e.exports = function(e, t, n) {
        var c = s(e) ? i : a
          , u = arguments.length < 3;
        return c(e, r(t, 4), n, u, o)
    }
}
, function(e, t) {}
, function(e, t, n) {
    var i = n(322)();
    e.exports = i
}
, function(e, t) {
    e.exports = function(e) {
        return function(t, n, i) {
            for (var o = -1, r = Object(t), a = i(t), s = a.length; s--; ) {
                var c = a[e ? s : ++o];
                if (!1 === n(r[c], c, r))
                    break
            }
            return t
        }
    }
}
, function(e, t, n) {
    var i = n(25);
    e.exports = function(e, t) {
        return function(n, o) {
            if (null == n)
                return n;
            if (!i(n))
                return e(n, o);
            for (var r = n.length, a = t ? r : -1, s = Object(n); (t ? a-- : ++a < r) && !1 !== o(s[a], a, s); )
                ;
            return n
        }
    }
}
, function(e, t) {
    e.exports = function(e, t, n, i, o) {
        return o(e, function(e, o, r) {
            n = i ? (i = !1,
            e) : t(n, e, o, r)
        }),
        n
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}
, function(e, n, i) {
    function o(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t
    }
    var r = Object.prototype.hasOwnProperty;
    e.exports = function(e, n) {
        if (o(e, n))
            return !0;
        if ("object" != (void 0 === e ? "undefined" : t(e)) || null === e || "object" != (void 0 === n ? "undefined" : t(n)) || null === n)
            return !1;
        var i = Object.keys(e)
          , a = Object.keys(n);
        if (i.length !== a.length)
            return !1;
        for (var s = 0; s < i.length; s++)
            if (!r.call(n, i[s]) || !o(e[i[s]], n[i[s]]))
                return !1;
        return !0
    }
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ixInstances = void 0;
    var i = n(6)
      , o = n(29)
      , r = n(41)
      , a = i.IX2EngineActionTypes
      , s = a.IX2_RAW_DATA_IMPORTED
      , c = a.IX2_SESSION_STOPPED
      , u = a.IX2_INSTANCE_ADDED
      , l = a.IX2_INSTANCE_STARTED
      , f = a.IX2_INSTANCE_REMOVED
      , d = a.IX2_ANIMATION_FRAME_CHANGED
      , p = o.IX2EasingUtils
      , v = p.optimizeFloat
      , h = p.applyEasing
      , E = p.createBezierEasing
      , m = i.IX2EngineConstants.RENDER_GENERAL
      , g = o.IX2VanillaUtils
      , y = (g.getItemConfigByKey,
    g.getRenderType)
      , _ = g.getStyleProp
      , b = function(e, t) {}
      , I = function(e, t) {
        var n = e
          , i = n.active
          , o = n.origin
          , a = n.start
          , s = n.immediate
          , c = n.renderType
          , u = n.verbose
          , l = n.actionItem
          , f = n.destination
          , d = n.destinationKeys
          , p = n.pluginDuration
          , E = n.instanceDelay
          , g = n.customEasingFn
          , y = l.config.easing
          , _ = l.config
          , b = _.duration
          , I = _.delay;
        null != p && (b = p),
        I = null != E ? E : I,
        c === m ? b = 0 : s && (b = I = 0);
        var T = t.payload.now;
        if (i && o) {
            var S = T - (a + I);
            if (u) {
                var O = T - a
                  , A = b + I
                  , C = v(Math.min(Math.max(0, O / A), 1));
                e = (0,
                r.set)(e, "verboseTimeElapsed", A * C)
            }
            if (S < 0)
                return e;
            var x = v(Math.min(Math.max(0, S / b), 1))
              , R = h(y, x, g)
              , L = {}
              , N = null;
            return d.length && (N = d.reduce(function(e, t) {
                var n = f[t]
                  , i = parseFloat(o[t]) || 0
                  , r = (parseFloat(n) - i) * R + i;
                return e[t] = r,
                e
            }, {})),
            L.current = N,
            L.position = x,
            1 === x && (L.active = !1,
            L.complete = !0),
            (0,
            r.merge)(e, L)
        }
        return e
    };
    t.ixInstances = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.freeze({})
          , t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
        case s:
            return t.payload.ixInstances || Object.freeze({});
        case c:
            return Object.freeze({});
        case u:
            var n = t.payload
              , i = n.instanceId
              , o = n.elementId
              , a = n.actionItem
              , p = n.eventId
              , v = n.eventTarget
              , h = n.eventStateKey
              , m = n.actionListId
              , g = n.groupIndex
              , T = n.isCarrier
              , S = n.origin
              , O = n.destination
              , A = n.immediate
              , C = n.verbose
              , x = n.continuous
              , R = n.parameterId
              , L = n.actionGroups
              , N = n.smoothing
              , D = n.restingValue
              , w = n.pluginInstance
              , M = n.pluginDuration
              , F = n.instanceDelay
              , P = a.actionTypeId
              , U = y(P)
              , X = _(U, P)
              , j = Object.keys(O).filter(function(e) {
                return null != O[e]
            })
              , G = a.config.easing;
            return (0,
            r.set)(e, i, {
                id: i,
                elementId: o,
                active: !1,
                position: 0,
                start: 0,
                origin: S,
                destination: O,
                destinationKeys: j,
                immediate: A,
                verbose: C,
                current: null,
                actionItem: a,
                actionTypeId: P,
                eventId: p,
                eventTarget: v,
                eventStateKey: h,
                actionListId: m,
                groupIndex: g,
                renderType: U,
                isCarrier: T,
                styleProp: X,
                continuous: x,
                parameterId: R,
                actionGroups: L,
                smoothing: N,
                restingValue: D,
                pluginInstance: w,
                pluginDuration: M,
                instanceDelay: F,
                customEasingFn: Array.isArray(G) && 4 === G.length ? E(G) : void 0
            });
        case l:
            var V = t.payload
              , B = V.instanceId
              , H = V.time;
            return (0,
            r.mergeIn)(e, [B], {
                active: !0,
                complete: !1,
                start: H
            });
        case f:
            var z = t.payload.instanceId;
            if (!e[z])
                return e;
            for (var W = {}, k = Object.keys(e), Y = k.length, q = 0; q < Y; q++) {
                var K = k[q];
                K !== z && (W[K] = e[K])
            }
            return W;
        case d:
            for (var Q = e, $ = Object.keys(e), Z = $.length, J = 0; J < Z; J++) {
                var ee = $[J]
                  , te = e[ee]
                  , ne = te.continuous ? b : I;
                Q = (0,
                r.set)(Q, ee, ne(te, t))
            }
            return Q;
        default:
            return e
        }
    }
}
, function(e, t, n) {}
, function(e, t) {
    e.exports = function(e, t) {
        if (null == e)
            return {};
        var n, i, o = {}, r = Object.keys(e);
        for (i = 0; i < r.length; i++)
            n = r[i],
            t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o
    }
}
, function(e, t, n) {
    var i = n(66)
      , o = n(68)
      , r = n(25)
      , a = n(333)
      , s = n(334);
    e.exports = function(e) {
        if (null == e)
            return 0;
        if (r(e))
            return a(e) ? s(e) : e.length;
        var t = o(e);
        return "[object Map]" == t || "[object Set]" == t ? e.size : i(e).length
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {
    var i = n(18)
      , o = n(339)
      , r = n(340);
    e.exports = function(e, t) {
        return r(e, o(i(t)))
    }
}
, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e)
            throw new TypeError("Expected a function");
        return function() {
            var t = arguments;
            switch (t.length) {
            case 0:
                return !e.call(this);
            case 1:
                return !e.call(this, t[0]);
            case 2:
                return !e.call(this, t[0], t[1]);
            case 3:
                return !e.call(this, t[0], t[1], t[2])
            }
            return !e.apply(this, t)
        }
    }
}
, function(e, t, n) {
    var i = n(109)
      , o = n(18)
      , r = n(341)
      , a = n(344);
    e.exports = function(e, t) {
        if (null == e)
            return {};
        var n = i(a(e), function(e) {
            return [e]
        });
        return t = o(t),
        r(e, n, function(e, n) {
            return t(e, n[0])
        })
    }
}
, function(e, t, n) {
    var i = n(69)
      , o = n(342)
      , r = n(51);
    e.exports = function(e, t, n) {
        for (var a = -1, s = t.length, c = {}; ++a < s; ) {
            var u = t[a]
              , l = i(e, u);
            n(l, u) && o(c, r(u, e), l)
        }
        return c
    }
}
, function(e, t, n) {
    var i = n(343)
      , o = n(51)
      , r = n(63)
      , a = n(12)
      , s = n(33);
    e.exports = function(e, t, n, c) {
        if (!a(e))
            return e;
        for (var u = -1, l = (t = o(t, e)).length, f = l - 1, d = e; null != d && ++u < l; ) {
            var p = s(t[u])
              , v = n;
            if ("__proto__" === p || "constructor" === p || "prototype" === p)
                return e;
            if (u != f) {
                var h = d[p];
                void 0 === (v = c ? c(h, p, d) : void 0) && (v = a(h) ? h : r(t[u + 1]) ? [] : {})
            }
            i(d, p, v),
            d = d[p]
        }
        return e
    }
}
, function(e, t, n) {
    var i = n(146)
      , o = n(58)
      , r = Object.prototype.hasOwnProperty;
    e.exports = function(e, t, n) {
        var a = e[t];
        r.call(e, t) && o(a, n) && (void 0 !== n || t in e) || i(e, t, n)
    }
}
, function(e, t, n) {
    var i = n(100)
      , o = n(345)
      , r = n(347);
    e.exports = function(e) {
        return i(e, r, o)
    }
}
, function(e, t, n) {
    var i = n(61)
      , o = n(346)
      , r = n(101)
      , a = n(102)
      , s = Object.getOwnPropertySymbols ? function(e) {
        for (var t = []; e; )
            i(t, r(e)),
            e = o(e);
        return t
    }
    : a;
    e.exports = s
}
, function(e, t, n) {
    var i = n(105)(Object.getPrototypeOf, Object);
    e.exports = i
}
, function(e, t, n) {
    var i = n(103)
      , o = n(348)
      , r = n(25);
    e.exports = function(e) {
        return r(e) ? i(e, !0) : o(e)
    }
}
, function(e, t, n) {
    var i = n(12)
      , o = n(67)
      , r = n(349)
      , a = Object.prototype.hasOwnProperty;
    e.exports = function(e) {
        if (!i(e))
            return r(e);
        var t = o(e)
          , n = [];
        for (var s in e)
            ("constructor" != s || !t && a.call(e, s)) && n.push(s);
        return n
    }
}
, function(e, t) {}
, function(e, t, n) {
    var i = n(66)
      , o = n(68)
      , r = n(49)
      , a = n(2)
      , s = n(25)
      , c = n(62)
      , u = n(67)
      , l = n(64)
      , f = Object.prototype.hasOwnProperty;
    e.exports = function(e) {
        if (null == e)
            return !0;
        if (s(e) && (a(e) || "string" == typeof e || "function" == typeof e.splice || c(e) || l(e) || r(e)))
            return !e.length;
        var t = o(e);
        if ("[object Map]" == t || "[object Set]" == t)
            return !e.size;
        if (u(e))
            return !i(e).length;
        for (var n in e)
            if (f.call(e, n))
                return !1;
        return !0
    }
}
, function(e, t, n) {
    var i = n(146)
      , o = n(143)
      , r = n(18);
    e.exports = function(e, t) {
        var n = {};
        return t = r(t, 3),
        o(e, function(e, o, r) {
            i(n, o, t(e, o, r))
        }),
        n
    }
}
, function(e, t, n) {
    var i = n(353)
      , o = n(142)
      , r = n(354)
      , a = n(2);
    e.exports = function(e, t) {
        return (a(e) ? i : o)(e, r(t))
    }
}
, function(e, t) {}
, function(e, t, n) {
    var i = n(71);
    e.exports = function(e) {
        return "function" == typeof e ? e : i
    }
}
, function(e, t, n) {
    var i = n(356)
      , o = n(12);
    e.exports = function(e, t, n) {
        var r = !0
          , a = !0;
        if ("function" != typeof e)
            throw new TypeError("Expected a function");
        return o(n) && (r = "leading"in n ? !!n.leading : r,
        a = "trailing"in n ? !!n.trailing : a),
        i(e, t, {
            leading: r,
            maxWait: t,
            trailing: a
        })
    }
}
, function(e, t, n) {
    var i = n(12)
      , o = n(357)
      , r = n(72)
      , a = Math.max;
    Math.min,
    e.exports = function(e, t, n) {
        function s(t) {
            var n = l
              , i = f;
            return l = f = void 0,
            E = t,
            p = e.apply(i, n)
        }
        function c() {}
        function u() {
            var e = o()
              , n = function(e) {
                var n = e - h;
                return void 0 === h || n >= t || n < 0 || g && e - E >= d
            }(e);
            if (l = arguments,
            f = this,
            h = e,
            n) {
                if (void 0 === v)
                    return function(e) {
                        return E = e,
                        v = setTimeout(c, t),
                        m ? s(e) : p
                    }(h);
                if (g)
                    return clearTimeout(v),
                    v = setTimeout(c, t),
                    s(h)
            }
            return void 0 === v && (v = setTimeout(c, t)),
            p
        }
        var l, f, d, p, v, h, E = 0, m = !1, g = !1, y = !0;
        if ("function" != typeof e)
            throw new TypeError("Expected a function");
        return t = r(t) || 0,
        i(n) && (m = !!n.leading,
        d = (g = "maxWait"in n) ? a(r(n.maxWait) || 0, t) : d,
        y = "trailing"in n ? !!n.trailing : y),
        u.cancel = function() {}
        ,
        u.flush = function() {}
        ,
        u
    }
}
, function(e, t, n) {
    var i = n(10);
    e.exports = function() {
        return i.Date.now()
    }
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(359);
    Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return i[e]
            }
        })
    })
}
, function(e, t, n) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.isQuickEffect = void 0;
    var i = n(6)
      , o = Object.keys(i.QuickEffectIds);
    t.isQuickEffect = function(e) {
        return o.includes(e)
    }
}
, function(e, t, n) {
    var i = n(1)(n(42));
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.setStyle = function(e, t, n) {
        e.style[t] = n
    }
    ,
    t.getStyle = function(e, t) {
        return e.style[t]
    }
    ,
    t.getProperty = function(e, t) {}
    ,
    t.matchSelector = function(e) {}
    ,
    t.getQuerySelector = function(e) {
        var t = e.id
          , n = e.selector;
        if (t) {
            var i = t;
            if (-1 !== t.indexOf(s)) {
                var o = t.split(s)
                  , r = o[0];
                if (i = o[1],
                r !== document.documentElement.getAttribute(l))
                    return null
            }
            return '[data-w-id^="'.concat(i, '"]')
        }
        return n
    }
    ,
    t.queryDocument = function(e, t) {
        return Array.prototype.slice.call(document.querySelectorAll(t ? e + " " + t : e))
    }
    ,
    t.elementContains = function(e, t) {
        return e.contains(t)
    }
    ,
    t.isSiblingNode = function(e, t) {}
    ,
    t.getChildElements = function(e) {}
    ,
    t.getSiblingElements = function() {}
    ,
    t.getRefType = function(e) {
        return null != e && "object" == (0,
        i.default)(e) ? e instanceof Element ? c : u : null
    }
    ,
    t.getClosestElement = void 0;
    var o = n(29)
      , r = n(6)
      , a = (o.IX2BrowserSupport.ELEMENT_MATCHES,
    r.IX2EngineConstants)
      , s = a.IX2_ID_DELIMITER
      , c = a.HTML_ELEMENT
      , u = a.PLAIN_OBJECT
      , l = a.WF_PAGE
      , f = (Element.prototype.closest,
    function(e, t) {}
    );
    t.getClosestElement = f
}
, function(e, t, n) {
    var i, o = n(1), r = o(n(31)), a = o(n(42)), s = n(1);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var c, u, l, f = s(n(30)), d = s(n(362)), p = s(n(50)), v = s(n(381)), h = n(6), E = n(145), m = (n(87),
    n(29)), g = h.EventTypeConsts, y = g.MOUSE_CLICK, _ = g.MOUSE_SECOND_CLICK, b = g.MOUSE_DOWN, I = g.MOUSE_UP, T = g.MOUSE_OVER, S = g.MOUSE_OUT, O = g.DROPDOWN_CLOSE, A = g.DROPDOWN_OPEN, C = g.SLIDER_ACTIVE, x = g.SLIDER_INACTIVE, R = g.TAB_ACTIVE, L = g.TAB_INACTIVE, N = g.NAVBAR_CLOSE, D = g.NAVBAR_OPEN, w = g.MOUSE_MOVE, M = g.PAGE_SCROLL_DOWN, F = g.SCROLL_INTO_VIEW, P = g.SCROLL_OUT_OF_VIEW, U = g.PAGE_SCROLL_UP, X = g.SCROLLING_IN_VIEW, j = g.PAGE_FINISH, G = g.ECOMMERCE_CART_CLOSE, V = g.ECOMMERCE_CART_OPEN, B = g.PAGE_START, H = g.PAGE_SCROLL, z = h.IX2EngineConstants.COLON_DELIMITER, W = (m.IX2VanillaUtils.getNamespacedParameterId,
    function(e) {
        return function(t) {
            return !("object" !== (0,
            a.default)(t) || !e(t)) || t
        }
    }
    ), k = W(function(e) {
        return e.element === e.nativeEvent.target
    }), Y = W(function(e) {
        var t = e.element
          , n = e.nativeEvent;
        return t.contains(n.target)
    }), q = (0,
    d.default)([k, Y]), K = function(e, t) {
        var n = e.store
          , i = e.event
          , o = e.element
          , r = e.eventStateKey
          , a = i.action
          , s = i.id
          , c = a.config
          , u = c.actionListId
          , l = c.autoStopEventId
          , f = function(e, t) {
            if (t) {
                var n = e.getState().ixData.events[t];
                if (n && !ee[n.eventTypeId])
                    return n
            }
            return null
        }(n, l);
        return f && (0,
        E.stopActionGroup)({
            store: n,
            eventId: l,
            eventTarget: o,
            eventStateKey: l + z + r.split(z)[1],
            actionListId: (0,
            p.default)(f, "action.config.actionListId")
        }),
        (0,
        E.stopActionGroup)({
            store: n,
            eventId: s,
            eventTarget: o,
            eventStateKey: r,
            actionListId: u
        }),
        (0,
        E.startActionGroup)({
            store: n,
            eventId: s,
            eventTarget: o,
            eventStateKey: r,
            actionListId: u
        }),
        t
    }, Q = function(e, t) {
        return function(n, i) {
            return !0 === e(n, i) ? t(n, i) : i
        }
    }, $ = {
        handler: Q(q, K)
    }, Z = (0,
    f.default)({}, $, {
        types: ["COMPONENT_ACTIVE", "COMPONENT_INACTIVE"].join(" ")
    }), J = {
        types: [{
            target: window,
            types: "resize orientationchange",
            throttle: !0
        }, {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0
        }]
    }, ee = {
        PAGE_START: B,
        PAGE_FINISH: j
    }, te = (c = void 0 !== window.pageXOffset,
    u = "CSS1Compat" === document.compatMode ? document.documentElement : document.body,
    function() {
        return {
            scrollLeft: c ? window.pageXOffset : u.scrollLeft,
            scrollTop: c ? window.pageYOffset : u.scrollTop,
            stiffScrollTop: (0,
            v.default)(c ? window.pageYOffset : u.scrollTop, 0, u.scrollHeight - window.innerHeight),
            scrollWidth: u.scrollWidth,
            scrollHeight: u.scrollHeight,
            clientWidth: u.clientWidth,
            clientHeight: u.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        }
    }
    ), ne = function(e) {
        var t = e.element
          , n = e.nativeEvent
          , i = n.type
          , o = n.target
          , r = n.relatedTarget
          , a = t.contains(o);
        if ("mouseover" === i && a)
            return !0;
        var s = t.contains(r);
        return !("mouseout" !== i || !a || !s)
    }, ie = function(e) {
        var t, n, i = e.element, o = e.event.config, r = te(), a = r.clientWidth, s = r.clientHeight, c = o.scrollOffsetValue, u = "PX" === o.scrollOffsetUnit ? c : s * (c || 0) / 100;
        return n = {
            left: 0,
            top: u,
            right: a,
            bottom: s - u
        },
        !((t = i.getBoundingClientRect()).left > n.right || t.right < n.left || t.top > n.bottom || t.bottom < n.top)
    }, oe = function(e) {
        return function(t, n) {
            var i = {
                elementHovered: ne(t)
            };
            return (n ? i.elementHovered !== n.elementHovered : i.elementHovered) && e(t, i) || i
        }
    }, re = function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return (0,
        f.default)({}, Z, {
            handler: Q(e ? q : k, void 0)
        })
    }, ae = function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return (0,
        f.default)({}, Z, {
            handler: Q(e ? q : k, void 0)
        })
    }, se = (0,
    f.default)({}, J, {
        handler: (l = function(e, t) {
            var n = t.elementVisible
              , i = e.event;
            return !e.store.getState().ixData.events[i.action.config.autoStopEventId] && t.triggered ? t : i.eventTypeId === F === n ? (K(e),
            (0,
            f.default)({}, t, {
                triggered: !0
            })) : t
        }
        ,
        function(e, t) {
            var n = (0,
            f.default)({}, t, {
                elementVisible: ie(e)
            });
            return (t ? n.elementVisible !== t.elementVisible : n.elementVisible) && l(e, n) || n
        }
        )
    }), ce = (i = {},
    (0,
    r.default)(i, C, re()),
    (0,
    r.default)(i, x, ae()),
    (0,
    r.default)(i, A, re()),
    (0,
    r.default)(i, O, ae()),
    (0,
    r.default)(i, D, re(!1)),
    (0,
    r.default)(i, N, ae(!1)),
    (0,
    r.default)(i, R, re()),
    (0,
    r.default)(i, L, ae()),
    (0,
    r.default)(i, V, {}),
    (0,
    r.default)(i, G, {}),
    (0,
    r.default)(i, y, {}),
    (0,
    r.default)(i, _, {}),
    (0,
    r.default)(i, b, (0,
    f.default)({}, $, {
        types: "mousedown"
    })),
    (0,
    r.default)(i, I, (0,
    f.default)({}, $, {
        types: "mouseup"
    })),
    (0,
    r.default)(i, T, {
        types: "mouseover mouseout",
        handler: Q(q, oe(function(e, t) {
            t.elementHovered && K(e)
        }))
    }),
    (0,
    r.default)(i, S, {
        types: "mouseover mouseout",
        handler: Q(q, oe(function(e, t) {
            t.elementHovered || K(e)
        }))
    }),
    (0,
    r.default)(i, w, {}),
    (0,
    r.default)(i, H, {}),
    (0,
    r.default)(i, X, {}),
    (0,
    r.default)(i, F, se),
    (0,
    r.default)(i, P, se),
    (0,
    r.default)(i, M, (0,
    f.default)({}, J, {})),
    (0,
    r.default)(i, U, (0,
    f.default)({}, J, {})),
    (0,
    r.default)(i, j, {}),
    (0,
    r.default)(i, B, {}),
    i);
    t.default = ce
}
, function(e, t, n) {
    var i = n(363)();
    e.exports = i
}
, function(e, t, n) {
    var i = n(88)
      , o = n(364)
      , r = n(149)
      , a = n(150)
      , s = n(2)
      , c = n(377);
    e.exports = function(e) {
        return o(function(t) {
            var n = t.length
              , o = n
              , u = i.prototype.thru;
            for (e && t.reverse(); o--; ) {
                var l = t[o];
                if ("function" != typeof l)
                    throw new TypeError("Expected a function");
                if (u && !f && "wrapper" == a(l))
                    var f = new i([],!0)
            }
            for (o = f ? o : n; ++o < n; ) {
                l = t[o];
                var d = a(l)
                  , p = "wrapper" == d ? r(l) : void 0;
                f = p && c(p[0]) && 424 == p[1] && !p[4].length && 1 == p[9] ? f[a(p[0])].apply(f, p[3]) : 1 == l.length && c(l) ? f[d]() : f.thru(l)
            }
            return function() {
                var e = arguments
                  , i = e[0];
                if (f && 1 == e.length && s(i))
                    return f.plant(i).value();
                for (var o = 0, r = n ? t[o].apply(this, e) : i; ++o < n; )
                    r = t[o].call(this, r);
                return r
            }
        })
    }
}
, function(e, t, n) {
    var i = n(365)
      , o = n(368)
      , r = n(370);
    e.exports = function(e) {
        return r(o(e, void 0, i), e + "")
    }
}
, function(e, t, n) {
    var i = n(366);
    e.exports = function(e) {
        return null != e && e.length ? i(e, 1) : []
    }
}
, function(e, t, n) {
    var i = n(61)
      , o = n(367);
    e.exports = function e(t, n, r, a, s) {
        var c = -1
          , u = t.length;
        for (r || (r = o),
        s || (s = []); ++c < u; ) {
            var l = t[c];
            n > 0 && r(l) ? n > 1 ? e(l, n - 1, r, a, s) : i(s, l) : a || (s[s.length] = l)
        }
        return s
    }
}
, function(e, t, n) {
    var i = n(32)
      , o = n(49)
      , r = n(2)
      , a = i ? i.isConcatSpreadable : void 0;
    e.exports = function(e) {
        return r(e) || o(e) || !!(a && e && e[a])
    }
}
, function(e, t, n) {
    var i = n(369)
      , o = Math.max;
    e.exports = function(e, t, n) {
        return t = o(void 0 === t ? e.length - 1 : t, 0),
        function() {
            for (var r = arguments, a = -1, s = o(r.length - t, 0), c = Array(s); ++a < s; )
                c[a] = r[t + a];
            a = -1;
            for (var u = Array(t + 1); ++a < t; )
                u[a] = r[a];
            return u[t] = n(c),
            i(e, this, u)
        }
    }
}
, function(e, t) {
    e.exports = function(e, t, n) {
        switch (n.length) {
        case 0:
            return e.call(t);
        case 1:
            return e.call(t, n[0]);
        case 2:
            return e.call(t, n[0], n[1]);
        case 3:
            return e.call(t, n[0], n[1], n[2])
        }
        return e.apply(t, n)
    }
}
, function(e, t, n) {
    var i = n(371)
      , o = n(373)(i);
    e.exports = o
}
, function(e, t, n) {
    var i = n(372)
      , o = n(147)
      , r = n(71)
      , a = o ? function(e, t) {
        return o(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: i(t),
            writable: !0
        })
    }
    : r;
    e.exports = a
}
, function(e, t) {
    e.exports = function(e) {}
}
, function(e, t) {
    var n = Date.now;
    e.exports = function(e) {
        var t = 0
          , i = 0;
        return function() {
            var o = n()
              , r = 16 - (o - i);
            if (i = o,
            r > 0) {
                if (++t >= 800)
                    return arguments[0]
            } else
                t = 0;
            return e.apply(void 0, arguments)
        }
    }
}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t, n) {
    var i = n(382)
      , o = n(72);
    e.exports = function(e, t, n) {
        return void 0 === n && (n = t,
        t = void 0),
        void 0 !== n && (n = (n = o(n)) == n ? n : 0),
        void 0 !== t && (t = (t = o(t)) == t ? t : 0),
        i(o(e), t, n)
    }
}
, function(e, t) {
    e.exports = function(e, t, n) {
        return e == e && (void 0 !== n && (e = e <= n ? e : n),
        void 0 !== t && (e = e >= t ? e : t)),
        e
    }
}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t) {}
, function(e, t, n) {}
, function(e, t, n) {}
, function(e, t, n) {}
]),
Webflow.require("ix2").init({
    events: {
        "e-3": {
            id: "e-3",
            name: "",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: !1,
                    autoStopEventId: "e-4"
                }
            },
            mediaQueries: ["main", "medium"],
            target: {
                appliesTo: "ELEMENT",
                styleBlockIds: [],
                id: "raw|22fd"
            },
            targets: [],
            config: {
                loop: !0,
                playInReverse: !1,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%"
            },
            createdOn: 1598527274158
        },
        "e-29": {
            id: "e-29",
            name: "",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-22",
                    affectedElements: {},
                    playInReverse: !1,
                    autoStopEventId: "e-30"
                }
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                selector: ".ts3",
                appliesTo: "CLASS"
            },
            targets: [],
            config: {
                loop: !1,
                playInReverse: !1
            }
        },
        "e-30": {
            id: "e-30",
            name: "",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-23",
                    affectedElements: {},
                    playInReverse: !1,
                    autoStopEventId: "e-29"
                }
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                selector: ".ts3",
                appliesTo: "CLASS"
            },
            targets: [],
            config: {
                loop: !1,
                playInReverse: !1
            }
        }
    },
    actionLists: {
        "a-2": {
            id: "a-2",
            title: "Loop - Templates Slider",
            actionItemGroups: [{
                actionItems: [{
                    id: "a-2-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                            useEventTarget: "CHILDREN",
                            selector: ".ts1"
                        },
                        xValue: 0,
                        xUnit: "%",
                        yUnit: "PX",
                        zUnit: "PX"
                    }
                }]
            }, {
                actionItems: [{
                    id: "a-2-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                        delay: 0,
                        easing: "",
                        duration: 6e4,
                        target: {
                            useEventTarget: "CHILDREN",
                            selector: ".ts1"
                        },
                        xValue: -100,
                        xUnit: "%",
                        yUnit: "PX",
                        zUnit: "PX"
                    }
                }]
            }, {
                actionItems: [{
                    id: "a-2-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                            useEventTarget: "CHILDREN",
                            selector: ".ts1"
                        },
                        xValue: 0,
                        xUnit: "%",
                        yUnit: "PX",
                        zUnit: "PX"
                    }
                }]
            }],
            useFirstGroupAsInitialState: !1
        },
        "a-22": {
            id: "a-22",
            title: "Hover On - Card",
            actionItemGroups: [{
                actionItems: [{
                    id: "a-22-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                        delay: 0,
                        easing: "outCubic",
                        duration: 200,
                        target: {
                            useEventTarget: !0
                        },
                        yValue: -8,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX"
                    }
                }]
            }],
            useFirstGroupAsInitialState: !1
        },
        "a-23": {
            id: "a-23",
            title: "Hover Off - Card",
            actionItemGroups: [{
                actionItems: [{
                    id: "a-23-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                        delay: 0,
                        easing: "outCubic",
                        duration: 200,
                        target: {
                            useEventTarget: !0
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX"
                    }
                }]
            }],
            useFirstGroupAsInitialState: !1
        }
    },
    site: {}
}),
["SCREEN", "LINEAR_LIGHT"].reduce((e,t,n)=>Object.assign(e, {
    [t]: n
}), {});
class MiniGl {
    constructor(e, t, n, i=!1) {
        const o = this
          , r = -1 !== document.location.search.toLowerCase().indexOf("debug=webgl");
        o.canvas = e,
        o.gl = o.canvas.getContext("webgl", {
            antialias: !0
        }),
        o.meshes = [];
        const a = o.gl;
        t && n && this.setSize(t, n),
        o.lastDebugMsg,
        o.debug = i && r ? function(e) {}
        : ()=>{}
        ,
        Object.defineProperties(o, {
            Material: {
                enumerable: !1,
                value: class {
                    constructor(e, t, n={}) {
                        function i(e, t) {
                            const n = a.createShader(e);
                            return a.shaderSource(n, t),
                            a.compileShader(n),
                            a.getShaderParameter(n, a.COMPILE_STATUS) || console.error(a.getShaderInfoLog(n)),
                            o.debug("Material.compileShaderSource", {
                                source: t
                            }),
                            n
                        }
                        function r(e, t) {
                            return Object.entries(e).map(([e,n])=>n.getDeclaration(e, t)).join("\n")
                        }
                        this.uniforms = n,
                        this.uniformInstances = [];
                        const s = "\n              precision highp float;\n            ";
                        this.vertexSource = `\n              ${s}\n              attribute vec4 position;\n              attribute vec2 uv;\n              attribute vec2 uvNorm;\n              ${r(o.commonUniforms, "vertex")}\n              ${r(n, "vertex")}\n              ${e}\n            `,
                        this.Source = `\n              ${s}\n              ${r(o.commonUniforms, "fragment")}\n              ${r(n, "fragment")}\n              ${t}\n            `,
                        this.vertexShader = i(a.VERTEX_SHADER, this.vertexSource),
                        this.fragmentShader = i(a.FRAGMENT_SHADER, this.Source),
                        this.program = a.createProgram(),
                        a.attachShader(this.program, this.vertexShader),
                        a.attachShader(this.program, this.fragmentShader),
                        a.linkProgram(this.program),
                        a.getProgramParameter(this.program, a.LINK_STATUS) || console.error(a.getProgramInfoLog(this.program)),
                        a.useProgram(this.program),
                        this.attachUniforms(void 0, o.commonUniforms),
                        this.attachUniforms(void 0, this.uniforms)
                    }
                    attachUniforms(e, t) {
                        const n = this;
                        void 0 === e ? Object.entries(t).forEach(([e,t])=>{
                            n.attachUniforms(e, t)
                        }
                        ) : "array" == t.type ? t.value.forEach((t,i)=>n.attachUniforms(`${e}[${i}]`, t)) : "struct" == t.type ? Object.entries(t.value).forEach(([t,i])=>n.attachUniforms(`${e}.${t}`, i)) : (o.debug("Material.attachUniforms", {
                            name: e,
                            uniform: t
                        }),
                        n.uniformInstances.push({
                            uniform: t,
                            location: a.getUniformLocation(n.program, e)
                        }))
                    }
                }
            },
            Uniform: {
                enumerable: !1,
                value: class {
                    constructor(e) {
                        this.type = "float",
                        Object.assign(this, e),
                        this.typeFn = {
                            float: "1f",
                            int: "1i",
                            vec2: "2fv",
                            vec3: "3fv",
                            vec4: "4fv",
                            mat4: "Matrix4fv"
                        }[this.type] || "1f",
                        this.update()
                    }
                    update(e) {
                        void 0 !== this.value && a[`uniform${this.typeFn}`](e, 0 === this.typeFn.indexOf("Matrix") ? this.transpose : this.value, 0 === this.typeFn.indexOf("Matrix") ? this.value : null)
                    }
                    getDeclaration(e, t, n) {
                        const i = this;
                        if (i.excludeFrom !== t) {
                            if ("array" === i.type)
                                return i.value[0].getDeclaration(e, t, i.value.length) + `\nconst int ${e}_length = ${i.value.length};`;
                            if ("struct" === i.type) {
                                let o = e.replace("u_", "");
                                return `uniform struct ${o = o.charAt(0).toUpperCase() + o.slice(1)} \n                                {\n` + Object.entries(i.value).map(([e,n])=>n.getDeclaration(e, t).replace(/^uniform/, "")).join("") + `\n} ${e}${n > 0 ? `[${n}]` : ""};`
                            }
                            return `uniform ${i.type} ${e}${n > 0 ? `[${n}]` : ""};`
                        }
                    }
                }
            },
            PlaneGeometry: {
                enumerable: !1,
                value: class {
                    constructor(e, t, n, i, r) {
                        a.createBuffer(),
                        this.attributes = {
                            position: new o.Attribute({
                                target: a.ARRAY_BUFFER,
                                size: 3
                            }),
                            uv: new o.Attribute({
                                target: a.ARRAY_BUFFER,
                                size: 2
                            }),
                            uvNorm: new o.Attribute({
                                target: a.ARRAY_BUFFER,
                                size: 2
                            }),
                            index: new o.Attribute({
                                target: a.ELEMENT_ARRAY_BUFFER,
                                size: 3,
                                type: a.UNSIGNED_SHORT
                            })
                        },
                        this.setTopology(n, i),
                        this.setSize(e, t, r)
                    }
                    setTopology(e=1, t=1) {
                        const n = this;
                        n.xSegCount = e,
                        n.ySegCount = t,
                        n.vertexCount = (n.xSegCount + 1) * (n.ySegCount + 1),
                        n.quadCount = n.xSegCount * n.ySegCount * 2,
                        n.attributes.uv.values = new Float32Array(2 * n.vertexCount),
                        n.attributes.uvNorm.values = new Float32Array(2 * n.vertexCount),
                        n.attributes.index.values = new Uint16Array(3 * n.quadCount);
                        for (let e = 0; e <= n.ySegCount; e++)
                            for (let t = 0; t <= n.xSegCount; t++) {
                                const i = e * (n.xSegCount + 1) + t;
                                if (n.attributes.uv.values[2 * i] = t / n.xSegCount,
                                n.attributes.uv.values[2 * i + 1] = 1 - e / n.ySegCount,
                                n.attributes.uvNorm.values[2 * i] = t / n.xSegCount * 2 - 1,
                                n.attributes.uvNorm.values[2 * i + 1] = 1 - e / n.ySegCount * 2,
                                t < n.xSegCount && e < n.ySegCount) {
                                    const o = e * n.xSegCount + t;
                                    n.attributes.index.values[6 * o] = i,
                                    n.attributes.index.values[6 * o + 1] = i + 1 + n.xSegCount,
                                    n.attributes.index.values[6 * o + 2] = i + 1,
                                    n.attributes.index.values[6 * o + 3] = i + 1,
                                    n.attributes.index.values[6 * o + 4] = i + 1 + n.xSegCount,
                                    n.attributes.index.values[6 * o + 5] = i + 2 + n.xSegCount
                                }
                            }
                        n.attributes.uv.update(),
                        n.attributes.uvNorm.update(),
                        n.attributes.index.update(),
                        o.debug("Geometry.setTopology", {
                            uv: n.attributes.uv,
                            uvNorm: n.attributes.uvNorm,
                            index: n.attributes.index
                        })
                    }
                    setSize(e=1, t=1, n="xz") {
                        const i = this;
                        i.width = e,
                        i.height = t,
                        i.orientation = n,
                        i.attributes.position.values && i.attributes.position.values.length === 3 * i.vertexCount || (i.attributes.position.values = new Float32Array(3 * i.vertexCount));
                        const r = e / -2
                          , a = t / -2
                          , s = e / i.xSegCount
                          , c = t / i.ySegCount;
                        for (let e = 0; e <= i.ySegCount; e++) {
                            const t = a + e * c;
                            for (let o = 0; o <= i.xSegCount; o++) {
                                const a = r + o * s
                                  , c = e * (i.xSegCount + 1) + o;
                                i.attributes.position.values[3 * c + "xyz".indexOf(n[0])] = a,
                                i.attributes.position.values[3 * c + "xyz".indexOf(n[1])] = -t
                            }
                        }
                        i.attributes.position.update(),
                        o.debug("Geometry.setSize", {
                            position: i.attributes.position
                        })
                    }
                }
            },
            Mesh: {
                enumerable: !1,
                value: class {
                    constructor(e, t) {
                        const n = this;
                        n.geometry = e,
                        n.material = t,
                        n.wireframe = !1,
                        n.attributeInstances = [],
                        Object.entries(n.geometry.attributes).forEach(([e,t])=>{
                            n.attributeInstances.push({
                                attribute: t,
                                location: t.attach(e, n.material.program)
                            })
                        }
                        ),
                        o.meshes.push(n),
                        o.debug("Mesh.constructor", {
                            mesh: n
                        })
                    }
                    draw() {
                        a.useProgram(this.material.program),
                        this.material.uniformInstances.forEach(({uniform: e, location: t})=>e.update(t)),
                        this.attributeInstances.forEach(({attribute: e, location: t})=>e.use(t)),
                        a.drawElements(this.wireframe ? a.LINES : a.TRIANGLES, this.geometry.attributes.index.values.length, a.UNSIGNED_SHORT, 0)
                    }
                    remove() {
                        o.meshes = o.meshes.filter(e=>e != this)
                    }
                }
            },
            Attribute: {
                enumerable: !1,
                value: class {
                    constructor(e) {
                        this.type = a.FLOAT,
                        this.normalized = !1,
                        this.buffer = a.createBuffer(),
                        Object.assign(this, e),
                        this.update()
                    }
                    update() {
                        void 0 !== this.values && (a.bindBuffer(this.target, this.buffer),
                        a.bufferData(this.target, this.values, a.STATIC_DRAW))
                    }
                    attach(e, t) {
                        const n = a.getAttribLocation(t, e);
                        return this.target === a.ARRAY_BUFFER && (a.enableVertexAttribArray(n),
                        a.vertexAttribPointer(n, this.size, this.type, this.normalized, 0, 0)),
                        n
                    }
                    use(e) {
                        a.bindBuffer(this.target, this.buffer),
                        this.target === a.ARRAY_BUFFER && (a.enableVertexAttribArray(e),
                        a.vertexAttribPointer(e, this.size, this.type, this.normalized, 0, 0))
                    }
                }
            }
        });
        const s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        o.commonUniforms = {
            projectionMatrix: new o.Uniform({
                type: "mat4",
                value: s
            }),
            modelViewMatrix: new o.Uniform({
                type: "mat4",
                value: s
            }),
            resolution: new o.Uniform({
                type: "vec2",
                value: [1, 1]
            }),
            aspectRatio: new o.Uniform({
                type: "float",
                value: 1
            })
        }
    }
    setSize(e=640, t=480) {
        this.width = e,
        this.height = t,
        this.canvas.width = e,
        this.canvas.height = t,
        this.gl.viewport(0, 0, e, t),
        this.commonUniforms.resolution.value = [e, t],
        this.commonUniforms.aspectRatio.value = e / t,
        this.debug("MiniGL.setSize", {
            width: e,
            height: t
        })
    }
    setOrthographicCamera(e=0, t=0, n=0, i=-2e3, o=2e3) {
        this.commonUniforms.projectionMatrix.value = [2 / this.width, 0, 0, 0, 0, 2 / this.height, 0, 0, 0, 0, 2 / (i - o), 0, e, t, n, 1],
        this.debug("setOrthographicCamera", this.commonUniforms.projectionMatrix.value)
    }
    render() {
        this.gl.clearColor(0, 0, 0, 0),
        this.gl.clearDepth(1),
        this.meshes.forEach(e=>e.draw())
    }
}
function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
class Gradient {
    constructor(...t) {
        e(this, "el", void 0),
        e(this, "cssVarRetries", 0),
        e(this, "maxCssVarRetries", 200),
        e(this, "angle", 0),
        e(this, "isLoadedClass", !1),
        e(this, "isScrolling", !1),
        e(this, "scrollingTimeout", void 0),
        e(this, "scrollingRefreshDelay", 200),
        e(this, "isIntersecting", !1),
        e(this, "shaderFiles", void 0),
        e(this, "vertexShader", void 0),
        e(this, "sectionColors", void 0),
        e(this, "computedCanvasStyle", void 0),
        e(this, "conf", void 0),
        e(this, "uniforms", void 0),
        e(this, "t", 1253106),
        e(this, "last", 0),
        e(this, "width", void 0),
        e(this, "minWidth", 1111),
        e(this, "height", 600),
        e(this, "xSegCount", void 0),
        e(this, "ySegCount", void 0),
        e(this, "mesh", void 0),
        e(this, "material", void 0),
        e(this, "geometry", void 0),
        e(this, "minigl", void 0),
        e(this, "scrollObserver", void 0),
        e(this, "amp", 320),
        e(this, "seed", 5),
        e(this, "freqX", 14e-5),
        e(this, "freqY", 29e-5),
        e(this, "freqDelta", 1e-5),
        e(this, "activeColors", [1, 1, 1, 1]),
        e(this, "isMetaKey", !1),
        e(this, "isGradientLegendVisible", !1),
        e(this, "isMouseDown", !1),
        e(this, "handleScroll", ()=>{}
        ),
        e(this, "handleScrollEnd", ()=>{
            this.isScrolling = !1,
            this.isIntersecting && this.play()
        }
        ),
        e(this, "resize", ()=>{
            this.width = window.innerWidth,
            this.minigl.setSize(this.width, this.height),
            this.minigl.setOrthographicCamera(),
            this.xSegCount = Math.ceil(this.width * this.conf.density[0]),
            this.ySegCount = Math.ceil(this.height * this.conf.density[1]),
            this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount),
            this.mesh.geometry.setSize(this.width, this.height),
            this.mesh.material.uniforms.u_shadow_power.value = this.width < 600 ? 5 : 6
        }
        ),
        e(this, "handleMouseDown", e=>{
            this.isGradientLegendVisible && (this.isMetaKey = e.metaKey,
            this.isMouseDown = !0,
            !1 === this.conf.playing && requestAnimationFrame(this.animate))
        }
        ),
        e(this, "handleMouseUp", ()=>{
            this.isMouseDown = !1
        }
        ),
        e(this, "animate", e=>{
            if (!this.shouldSkipFrame(e) || this.isMouseDown) {
                if (this.t += Math.min(e - this.last, 1e3 / 15),
                this.last = e,
                this.isMouseDown) {
                    let e = 160;
                    this.isMetaKey && (e = -160),
                    this.t += e
                }
                this.mesh.material.uniforms.u_time.value = this.t,
                this.minigl.render()
            }
            if (0 !== this.last && this.isStatic)
                return this.minigl.render(),
                void this.disconnect();
            (this.conf.playing || this.isMouseDown) && requestAnimationFrame(this.animate)
        }
        ),
        e(this, "addIsLoadedClass", ()=>{
            !this.isLoadedClass && (this.isLoadedClass = !0,
            this.el.classList.add("isLoaded"),
            setTimeout(()=>{
                this.el.parentElement.classList.add("isLoaded")
            }
            , 3e3))
        }
        ),
        e(this, "pause", ()=>{
            this.conf.playing = !1
        }
        ),
        e(this, "play", ()=>{
            requestAnimationFrame(this.animate),
            this.conf.playing = !0
        }
        ),
        e(this, "initGradient", e=>(this.el = document.querySelector(e),
        this.connect(),
        this))
    }
    async connect() {
        this.shaderFiles = {
            vertex: "varying vec3 v_color;\n\nvoid main() {\n  float time = u_time * u_global.noiseSpeed;\n\n  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;\n\n  vec2 st = 1. - uvNorm.xy;\n\n  //\n  // Tilting the plane\n  //\n\n  // Front-to-back tilt\n  float tilt = resolution.y / 2.0 * uvNorm.y;\n\n  // Left-to-right angle\n  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;\n\n  // Up-down shift to offset incline\n  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);\n\n  //\n  // Vertex noise\n  //\n\n  float noise = snoise(vec3(\n    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,\n    noiseCoord.y * u_vertDeform.noiseFreq.y,\n    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed\n  )) * u_vertDeform.noiseAmp;\n\n  // Fade noise to zero at edges\n  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);\n\n  // Clamp to 0\n  noise = max(0.0, noise);\n\n  vec3 pos = vec3(\n    position.x,\n    position.y + tilt + incline + noise - offset,\n    position.z\n  );\n\n  //\n  // Vertex color, to be passed to fragment shader\n  //\n\n  if (u_active_colors[0] == 1.) {\n    v_color = u_baseColor;\n  }\n\n  for (int i = 0; i < u_waveLayers_length; i++) {\n    if (u_active_colors[i + 1] == 1.) {\n      WaveLayers layer = u_waveLayers[i];\n\n      float noise = smoothstep(\n        layer.noiseFloor,\n        layer.noiseCeil,\n        snoise(vec3(\n          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,\n          noiseCoord.y * layer.noiseFreq.y,\n          time * layer.noiseSpeed + layer.noiseSeed\n        )) / 2.0 + 0.5\n      );\n\n      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));\n    }\n  }\n\n  //\n  // Finish\n  //\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}",
            noise: "//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n    return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n{\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}",
            blend: "//\n// https://github.com/jamieowen/glsl-blend\n//\n\n// Normal\n\nvec3 blendNormal(vec3 base, vec3 blend) {\n\treturn blend;\n}\n\nvec3 blendNormal(vec3 base, vec3 blend, float opacity) {\n\treturn (blendNormal(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Screen\n\nfloat blendScreen(float base, float blend) {\n\treturn 1.0-((1.0-base)*(1.0-blend));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend) {\n\treturn vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));\n}\n\nvec3 blendScreen(vec3 base, vec3 blend, float opacity) {\n\treturn (blendScreen(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Multiply\n\nvec3 blendMultiply(vec3 base, vec3 blend) {\n\treturn base*blend;\n}\n\nvec3 blendMultiply(vec3 base, vec3 blend, float opacity) {\n\treturn (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Overlay\n\nfloat blendOverlay(float base, float blend) {\n\treturn base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend) {\n\treturn vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));\n}\n\nvec3 blendOverlay(vec3 base, vec3 blend, float opacity) {\n\treturn (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Hard light\n\nvec3 blendHardLight(vec3 base, vec3 blend) {\n\treturn blendOverlay(blend,base);\n}\n\nvec3 blendHardLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Soft light\n\nfloat blendSoftLight(float base, float blend) {\n\treturn (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend) {\n\treturn vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));\n}\n\nvec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color dodge\n\nfloat blendColorDodge(float base, float blend) {\n\treturn (blend==1.0)?blend:min(base/(1.0-blend),1.0);\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend) {\n\treturn vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));\n}\n\nvec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {\n\treturn (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Color burn\n\nfloat blendColorBurn(float base, float blend) {\n\treturn (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend) {\n\treturn vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));\n}\n\nvec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {\n\treturn (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Vivid Light\n\nfloat blendVividLight(float base, float blend) {\n\treturn (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend) {\n\treturn vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));\n}\n\nvec3 blendVividLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Lighten\n\nfloat blendLighten(float base, float blend) {\n\treturn max(blend,base);\n}\n\nvec3 blendLighten(vec3 base, vec3 blend) {\n\treturn vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));\n}\n\nvec3 blendLighten(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLighten(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear burn\n\nfloat blendLinearBurn(float base, float blend) {\n\t// Note : Same implementation as BlendSubtractf\n\treturn max(base+blend-1.0,0.0);\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend) {\n\t// Note : Same implementation as BlendSubtract\n\treturn max(base+blend-vec3(1.0),vec3(0.0));\n}\n\nvec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear dodge\n\nfloat blendLinearDodge(float base, float blend) {\n\t// Note : Same implementation as BlendAddf\n\treturn min(base+blend,1.0);\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend) {\n\t// Note : Same implementation as BlendAdd\n\treturn min(base+blend,vec3(1.0));\n}\n\nvec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));\n}\n\n// Linear light\n\nfloat blendLinearLight(float base, float blend) {\n\treturn blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend) {\n\treturn vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));\n}\n\nvec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {\n\treturn (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));\n}",
            fragment: "varying vec3 v_color;\n\nvoid main() {\n  vec3 color = v_color;\n  if (u_darken_top == 1.0) {\n    vec2 st = gl_FragCoord.xy/resolution.xy;\n    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;\n  }\n  gl_FragColor = vec4(color, 1.0);\n}"
        },
        this.conf = {
            presetName: "",
            wireframe: !1,
            density: [.06, .16],
            zoom: 1,
            rotation: 0,
            playing: !0
        },
        document.querySelectorAll("canvas").length < 1 ? console.log("DID NOT LOAD HERO STRIPE CANVAS") : (this.minigl = new MiniGl(this.el,null,null,!0),
        requestAnimationFrame(()=>{
            this.el && (this.computedCanvasStyle = getComputedStyle(this.el),
            this.waitForCssVars())
        }
        ))
    }
    disconnect() {}
    initMaterial() {
        this.uniforms = {
            u_time: new this.minigl.Uniform({
                value: 0
            }),
            u_shadow_power: new this.minigl.Uniform({
                value: 5
            }),
            u_darken_top: new this.minigl.Uniform({
                value: "" === this.el.dataset.jsDarkenTop ? 1 : 0
            }),
            u_active_colors: new this.minigl.Uniform({
                value: this.activeColors,
                type: "vec4"
            }),
            u_global: new this.minigl.Uniform({
                value: {
                    noiseFreq: new this.minigl.Uniform({
                        value: [this.freqX, this.freqY],
                        type: "vec2"
                    }),
                    noiseSpeed: new this.minigl.Uniform({
                        value: 5e-6
                    })
                },
                type: "struct"
            }),
            u_vertDeform: new this.minigl.Uniform({
                value: {
                    incline: new this.minigl.Uniform({
                        value: Math.sin(this.angle) / Math.cos(this.angle)
                    }),
                    offsetTop: new this.minigl.Uniform({
                        value: -.5
                    }),
                    offsetBottom: new this.minigl.Uniform({
                        value: -.5
                    }),
                    noiseFreq: new this.minigl.Uniform({
                        value: [3, 4],
                        type: "vec2"
                    }),
                    noiseAmp: new this.minigl.Uniform({
                        value: this.amp
                    }),
                    noiseSpeed: new this.minigl.Uniform({
                        value: 10
                    }),
                    noiseFlow: new this.minigl.Uniform({
                        value: 3
                    }),
                    noiseSeed: new this.minigl.Uniform({
                        value: this.seed
                    })
                },
                type: "struct",
                excludeFrom: "fragment"
            }),
            u_baseColor: new this.minigl.Uniform({
                value: this.sectionColors[0],
                type: "vec3",
                excludeFrom: "fragment"
            }),
            u_waveLayers: new this.minigl.Uniform({
                value: [],
                excludeFrom: "fragment",
                type: "array"
            })
        };
        for (let e = 1; e < this.sectionColors.length; e += 1)
            this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({
                value: {
                    color: new this.minigl.Uniform({
                        value: this.sectionColors[e],
                        type: "vec3"
                    }),
                    noiseFreq: new this.minigl.Uniform({
                        value: [2 + e / this.sectionColors.length, 3 + e / this.sectionColors.length],
                        type: "vec2"
                    }),
                    noiseSpeed: new this.minigl.Uniform({
                        value: 11 + .3 * e
                    }),
                    noiseFlow: new this.minigl.Uniform({
                        value: 6.5 + .3 * e
                    }),
                    noiseSeed: new this.minigl.Uniform({
                        value: this.seed + 10 * e
                    }),
                    noiseFloor: new this.minigl.Uniform({
                        value: .1
                    }),
                    noiseCeil: new this.minigl.Uniform({
                        value: .63 + .07 * e
                    })
                },
                type: "struct"
            }));
        return this.vertexShader = [this.shaderFiles.noise, this.shaderFiles.blend, this.shaderFiles.vertex].join("\n\n"),
        new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)
    }
    initMesh() {
        this.material = this.initMaterial(),
        this.geometry = new this.minigl.PlaneGeometry,
        this.mesh = new this.minigl.Mesh(this.geometry,this.material)
    }
    shouldSkipFrame(e) {
        return !!window.document.hidden || !this.conf.playing || parseInt(e, 10) % 2 == 0 || void 0
    }
    init() {
        this.initGradientColors(),
        this.initMesh(),
        this.resize(),
        requestAnimationFrame(this.animate),
        window.addEventListener("resize", this.resize)
    }
    waitForCssVars() {
        if (this.computedCanvasStyle && -1 !== this.computedCanvasStyle.getPropertyValue("--gradient-color-1").indexOf("#"))
            this.init(),
            this.addIsLoadedClass();
        else {
            if (this.cssVarRetries += 1,
            this.cssVarRetries > this.maxCssVarRetries)
                return this.sectionColors = [16711680, 16711680, 16711935, 65280, 255],
                void this.init();
            requestAnimationFrame(()=>this.waitForCssVars())
        }
    }
    initGradientColors() {
        this.sectionColors = ["--gradient-color-1", "--gradient-color-2", "--gradient-color-3", "--gradient-color-4"].map(e=>{
            let t = this.computedCanvasStyle.getPropertyValue(e).trim();
            if (4 === t.length) {
                const e = t.substr(1).split("").map(e=>e + e).join("");
                t = `#${e}`
            }
            return t && `0x${t.substr(1)}`
        }
        ).filter(Boolean).map(normalizeColor)
    }
}
var gradient = new Gradient;
gradient.initGradient("#gradient-canvas"),
(()=>{
    const e = document.documentElement
      , t = document.getElementById("o0")
      , n = e=>{
        try {
            return localStorage.getItem(e)
        } catch (e) {
            return null
        }
    }
      , i = ()=>{
        const t = getComputedStyle(e).getPropertyValue("--color-mode");
        return t.length ? t.replace(/\"/g, "").trim() : "dark" === t ? "dark" : "light"
    }
      , o = ()=>{
        e.removeAttribute("data-user-color-scheme"),
        (e=>{
            try {
                localStorage.removeItem(e)
            } catch (e) {}
        }
        )("user-color-scheme")
    }
      , r = {
        dark: !0,
        light: !0
    }
      , a = t=>{
        const a = t || n("user-color-scheme");
        a === i() ? o() : r[a] ? e.setAttribute("data-user-color-scheme", a) : o()
    }
      , s = {
        dark: "light",
        light: "dark"
    }
      , c = ()=>{
        let e = n("user-color-scheme");
        if (r[e])
            e = s[e];
        else {
            if (null !== e)
                return;
            e = s[i()]
        }
        return ((e,t)=>{
            try {
                localStorage.setItem(e, t)
            } catch (e) {}
        }
        )("user-color-scheme", e),
        e
    }
    ;
    a(),
    t.addEventListener("click", ()=>{
        a(c())
    }
    )
}
)();
const paragraphs = [].slice.call(document.querySelectorAll("span.placeholder"));
paragraphs.forEach(e=>{
    e.innerHTML = e.textContent.split(" ").filter(e=>e.length > 4).map(e=>`<span class="placeholder__word">${e}</span>`).join(" "),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = void 0 : "function" == typeof define && define.amd ? define(t) : (e = e || self).mediumZoom = void 0
    }(this, function() {})
}
);
