

/*!
 * headroom.js v0.12.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

! function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).Headroom = n()
}(this, function () {
    "use strict";

    function t() {
        return "undefined" != typeof window
    }

    function d(t) {
        return function (t) {
            return t && t.document && function (t) {
                return 9 === t.nodeType
            }(t.document)
        }(t) ? function (t) {
            var n = t.document,
                o = n.body,
                s = n.documentElement;
            return {
                scrollHeight: function () {
                    return Math.max(o.scrollHeight, s.scrollHeight, o.offsetHeight, s.offsetHeight, o.clientHeight, s.clientHeight)
                },
                height: function () {
                    return t.innerHeight || s.clientHeight || o.clientHeight
                },
                scrollY: function () {
                    return void 0 !== t.pageYOffset ? t.pageYOffset : (s || o.parentNode || o).scrollTop
                }
            }
        }(t) : function (t) {}(t)
    }

    function n(t, s, e) {
        var n, o = function () {
                var n = !1;
                try {
                    var t = {
                        get passive() {
                            n = !0
                        }
                    };
                    window.addEventListener("test", t, t),
                        window.removeEventListener("test", t, t)
                } catch (t) {
                    n = !1
                }
                return n
            }(),
            i = !1,
            r = d(t),
            l = r.scrollY(),
            a = {};

        function c() {
            var t = Math.round(r.scrollY()),
                n = r.height(),
                o = r.scrollHeight();
            a.scrollY = t,
                a.lastScrollY = l,
                a.direction = l < t ? "down" : "up",
                a.distance = Math.abs(t - l),
                a.isOutOfBounds = t < 0 || o < t + n,
                a.top = t <= s.offset[a.direction],
                a.bottom = o <= t + n,
                a.toleranceExceeded = a.distance > s.tolerance[a.direction],
                e(a),
                l = t,
                i = !1
        }

        function h() {
            i || (i = !0,
                n = requestAnimationFrame(c))
        }
        var u = !!o && {
            passive: !0,
            capture: !1
        };
        return t.addEventListener("scroll", h, u),
            c(), {
                destroy: function () {}
            }
    }

    function o(t) {
        return t === Object(t) ? t : {
            down: t,
            up: t
        }
    }

    function s(t, n) {
        n = n || {},
            Object.assign(this, s.options, n),
            this.classes = Object.assign({}, s.options.classes, n.classes),
            this.elem = t,
            this.tolerance = o(this.tolerance),
            this.offset = o(this.offset),
            this.initialised = !1,
            this.frozen = !1
    }
    return s.prototype = {
            constructor: s,
            init: function () {
                return s.cutsTheMustard && !this.initialised && (this.addClass("initial"),
                        this.initialised = !0,
                        setTimeout(function (t) {
                            t.scrollTracker = n(t.scroller, {
                                offset: t.offset,
                                tolerance: t.tolerance
                            }, t.update.bind(t))
                        }, 100, this)),
                    this
            },
            destroy: function () {},
            unpin: function () {
                !this.hasClass("pinned") && this.hasClass("unpinned") || (this.addClass("unpinned"),
                    this.removeClass("pinned"),
                    this.onUnpin && this.onUnpin.call(this))
            },
            pin: function () {
                this.hasClass("unpinned") && (this.addClass("pinned"),
                    this.removeClass("unpinned"),
                    this.onPin && this.onPin.call(this))
            },
            freeze: function () {},
            unfreeze: function () {},
            top: function () {},
            notTop: function () {
                this.hasClass("notTop") || (this.addClass("notTop"),
                    this.removeClass("top"),
                    this.onNotTop && this.onNotTop.call(this))
            },
            bottom: function () {},
            notBottom: function () {
                this.hasClass("notBottom") || (this.addClass("notBottom"),
                    this.removeClass("bottom"),
                    this.onNotBottom && this.onNotBottom.call(this))
            },
            shouldUnpin: function (t) {
                return "down" === t.direction && !t.top && t.toleranceExceeded
            },
            shouldPin: function (t) {
                return "up" === t.direction && t.toleranceExceeded || t.top
            },
            addClass: function (t) {
                this.elem.classList.add.apply(this.elem.classList, this.classes[t].split(" "))
            },
            removeClass: function (t) {
                this.elem.classList.remove.apply(this.elem.classList, this.classes[t].split(" "))
            },
            hasClass: function (t) {
                return this.classes[t].split(" ").every(function (t) {
                    return this.classList.contains(t)
                }, this.elem)
            },
            update: function (t) {
                t.isOutOfBounds || !0 !== this.frozen && (t.top ? this.top() : this.notTop(),
                    t.bottom ? this.bottom() : this.notBottom(),
                    this.shouldUnpin(t) ? this.unpin() : this.shouldPin(t) && this.pin())
            }
        },
        s.options = {
            tolerance: {
                up: 0,
                down: 0
            },
            offset: 0,
            scroller: t() ? window : null,
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
        s.cutsTheMustard = !!(t() && function () {}
            .bind && "classList" in document.documentElement && Object.assign && Object.keys && requestAnimationFrame),
        s
});

(function () {
    var header = document.querySelector("#header");

    var headroom = new Headroom(header, {
        "offset": 205,
        "tolerance": 5,

        tolerance: {
            down: 10,
            up: 20
        },
        offset: 15
    });
    headroom.init();
})();



// Pure-media v1.0

// Developer: https://github.com/localnetwork/

;(function() {
    'use strict';

    // set progressive image loading
    var y4s = document.querySelectorAll('.y4');
    for (var i = 0; i < y4s.length; i++) {
        loadImage(y4s[i]);
    }

    // global function
    function loadImage(y4) {

        // calculate aspect ratio
        // for the y2
        // that helps to set a fixed fill for loading images
        var width = y4.dataset.width,
        height = y4.dataset.height,
        fill = height / width * 100,
        placeholderFill = y4.previousElementSibling;

        placeholderFill.setAttribute('style', 'padding-bottom:'+fill+'%;');


        // set max-height and max-width to y1
        // that is fun
        var y1 = y4.parentElement,
        maxWidth = y1.offsetWidth,
        maxHeight = y1.offsetHeight; 

        // y1.setAttribute('style', 'max-width:'+maxWidth+'px; max-height:'+maxHeight+'px;');


        // get thumbnail height wight   
        // make canvas fun part
        var thumbnail = y4.querySelector('.y5'),
        smImageWidth = thumbnail.width,
        smImageheight = thumbnail.height,

        canvas = y4.querySelector('.y6'),
        context = canvas.getContext('2d');

        canvas.height = smImageheight;
        canvas.width = smImageWidth;

        var img = new Image();
        img.src = thumbnail.src;

        img.onload = function () {
            // context.drawImage(img, 0, 0);
            // draw canvas
            var canvasImage = new CanvasImage(canvas, img);
            canvasImage.blur(2);

            // load canvas visible
            y4.classList.add('is-canvasLoaded');
        };


        // grab data-src from original image
        // from u3
        // var lgImage = y4.querySelector('.u3');
        // lgImage.src = lgImage.dataset.src;

        // onload image visible
        // lgImage.onload = function() {
        //     y4.classList.add('is-imageLoaded');
        // }
    }

})();

// canvas blur function
CanvasImage = function (e, t) {
    this.image = t;
    this.element = e;
    e.width = t.width;
    e.height = t.height;
    this.context = e.getContext('2d');
    this.context.drawImage(t, 0, 0);
};

CanvasImage.prototype = {
    blur:function(e) {
        this.context.globalAlpha = 0.5;
        for(var t = -e; t <= e; t += 2) {
            for(var n = -e; n <= e; n += 2) {
                this.context.drawImage(this.element, n, t);
                var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n -1), -(t-1));
            }
        }
    }
};

/*! lazysizes - v5.2.2 */

! function (e) {
    var t = function (u, D, f) {
        "use strict";
        var k, H;
        if (function () {
                var e;
                var t = {
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
                    init: true,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: true,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                H = u.lazySizesConfig || u.lazysizesConfig || {};
                for (e in t) {
                    if (!(e in H)) {
                        H[e] = t[e]
                    }
                }
            }(), !D || !D.getElementsByClassName) {
            return {
                init: function () {},
                cfg: H,
                noSupport: true
            }
        }
        var O = D.documentElement,
            i = u.HTMLPictureElement,
            P = "addEventListener",
            $ = "getAttribute",
            q = u[P].bind(u),
            I = u.setTimeout,
            U = u.requestAnimationFrame || I,
            o = u.requestIdleCallback,
            j = /^picture$/i,
            r = ["load", "error", "lazyincluded", "_lazyloaded"],
            a = {},
            G = Array.prototype.forEach,
            J = function (e, t) {
                if (!a[t]) {
                    a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
                }
                return a[t].test(e[$]("class") || "") && a[t]
            },
            K = function (e, t) {
                if (!J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
                }
            },
            Q = function (e, t) {
                var a;
                if (a = J(e, t)) {
                    e.setAttribute("class", (e[$]("class") || "").replace(a, " "))
                }
            },
            V = function (t, a, e) {
                var i = e ? P : "removeEventListener";
                if (e) {
                    V(t, a)
                }
                r.forEach(function (e) {
                    t[i](e, a)
                })
            },
            X = function (e, t, a, i, r) {
                var n = D.createEvent("Event");
                if (!a) {
                    a = {}
                }
                a.instance = k;
                n.initEvent(t, !i, !r);
                n.detail = a;
                e.dispatchEvent(n);
                return n
            },
            Y = function (e, t) {},
            Z = function (e, t) {},
            s = function (e, t, a) {},
            ee = function () {
                var a, i;
                var t = [];
                var r = [];
                var n = t;
                var s = function () {
                    var e = n;
                    n = t.length ? r : t;
                    a = true;
                    i = false;
                    while (e.length) {
                        e.shift()()
                    }
                    a = false
                };
                var e = function (e, t) {
                    if (a && !t) {
                        e.apply(this, arguments)
                    } else {
                        n.push(e);
                        if (!i) {
                            i = true;
                            (D.hidden ? I : U)(s)
                        }
                    }
                };
                e._lsFlush = s;
                return e
            }(),
            te = function (a, e) {
                return e ? function () {
                        ee(a)
                    } :
                    function () {
                        var e = this;
                        var t = arguments;
                        ee(function () {
                            a.apply(e, t)
                        })
                    }
            },
            ae = function (e) {
                var a;
                var i = 0;
                var r = H.throttleDelay;
                var n = H.ricTimeout;
                var t = function () {
                    a = false;
                    i = f.now();
                    e()
                };
                var s = o && n > 49 ? function () {} :
                    te(function () {
                        I(t)
                    }, true);
                return function (e) {
                    var t;
                    if (e = e === true) {
                        n = 33
                    }
                    if (a) {
                        return
                    }
                    a = true;
                    t = r - (f.now() - i);
                    if (t < 0) {
                        t = 0
                    }
                    if (e || t < 9) {
                        s()
                    } else {
                        I(s, t)
                    }
                }
            },
            ie = function (e) {
                var t, a;
                var i = 99;
                var r = function () {
                    t = null;
                    e()
                };
                var n = function () {
                    var e = f.now() - a;
                    if (e < i) {
                        I(n, i - e)
                    } else {
                        (o || r)(r)
                    }
                };
                return function () {
                    a = f.now();
                    if (!t) {
                        t = I(n, i)
                    }
                }
            },
            e = function () {
                var v, m, c, h, e;
                var y, z, g, p, C, b, A;
                var n = /^img$/i;
                var d = /^iframe$/i;
                var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
                var _ = 0;
                var w = 0;
                var M = 0;
                var N = -1;
                var L = function (e) {
                    M--;
                    if (!e || M < 0 || !e.target) {
                        M = 0
                    }
                };
                var x = function (e) {};
                var W = function (e, t) {};
                var t = function () {
                    var e, t, a, i, r, n, s, o, l, u, f, c;
                    var d = k.elements;
                    if ((h = H.loadMode) && M < 8 && (e = d.length)) {
                        t = 0;
                        N++;
                        for (; t < e; t++) {
                            if (!d[t] || d[t]._lazyRace) {
                                continue
                            }
                            if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
                                R(d[t]);
                                continue
                            }
                            if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                                n = w
                            }
                            if (!u) {
                                u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
                                k._defEx = u;
                                f = u * H.expFactor;
                                c = H.hFac;
                                A = null;
                                if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                                    w = f;
                                    N = 0
                                } else if (h > 1 && N > 1 && M < 6) {
                                    w = u
                                } else {
                                    w = _
                                }
                            }
                            if (l !== n) {
                                y = innerWidth + n * c;
                                z = innerHeight + n;
                                s = n * -1;
                                l = n
                            }
                            a = d[t].getBoundingClientRect();
                            if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
                                R(d[t]);
                                r = true;
                                if (M > 9) {
                                    break
                                }
                            } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
                                i = v[0] || d[t]
                            }
                        }
                        if (i && !r) {
                            R(i)
                        }
                    }
                };
                var a = ae(t);
                var S = function (e) {
                    var t = e.target;
                    if (t._lazyCache) {
                        delete t._lazyCache;
                        return
                    }
                    L(e);
                    K(t, H.loadedClass);
                    Q(t, H.loadingClass);
                    V(t, B);
                    X(t, "lazyloaded")
                };
                var i = te(S);
                var B = function (e) {
                    i({
                        target: e.target
                    })
                };
                var T = function (e, t) {};
                var F = function (e) {};
                var s = te(function (t, e, a, i, r) {
                    var n, s, o, l, u, f;
                    if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
                        if (i) {
                            if (a) {
                                K(t, H.autosizesClass)
                            } else {
                                t.setAttribute("sizes", i)
                            }
                        }
                        s = t[$](H.srcsetAttr);
                        n = t[$](H.srcAttr);
                        if (r) {
                            o = t.parentNode;
                            l = o && j.test(o.nodeName || "")
                        }
                        f = e.firesLoad || "src" in t && (s || n || l);
                        u = {
                            target: t
                        };
                        K(t, H.loadingClass);
                        if (f) {
                            clearTimeout(c);
                            c = I(L, 2500);
                            V(t, B, true)
                        }
                        if (l) {
                            G.call(o.getElementsByTagName("source"), F)
                        }
                        if (s) {
                            t.setAttribute("srcset", s)
                        } else if (n && !l) {
                            if (d.test(t.nodeName)) {
                                T(t, n)
                            } else {
                                t.src = n
                            }
                        }
                        if (r && (s || l)) {
                            Y(t, {
                                src: n
                            })
                        }
                    }
                    if (t._lazyRace) {
                        delete t._lazyRace
                    }
                    Q(t, H.lazyClass);
                    ee(function () {
                        var e = t.complete && t.naturalWidth > 1;
                        if (!f || e) {
                            if (e) {
                                K(t, H.fastLoadedClass)
                            }
                            S(u);
                            t._lazyCache = true;
                            I(function () {
                                if ("_lazyCache" in t) {
                                    delete t._lazyCache
                                }
                            }, 9)
                        }
                        if (t.loading == "lazy") {
                            M--
                        }
                    }, true)
                });
                var R = function (e) {
                    if (e._lazyRace) {
                        return
                    }
                    var t;
                    var a = n.test(e.nodeName);
                    var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
                    var r = i == "auto";
                    if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
                        return
                    }
                    t = X(e, "lazyunveilread").detail;
                    if (r) {
                        re.updateElem(e, true, e.offsetWidth)
                    }
                    e._lazyRace = true;
                    M++;
                    s(e, t, r, i, a)
                };
                var r = ie(function () {
                    H.loadMode = 3;
                    a()
                });
                var o = function () {
                    if (H.loadMode == 3) {
                        H.loadMode = 2
                    }
                    r()
                };
                var l = function () {
                    if (m) {
                        return
                    }
                    if (f.now() - e < 999) {
                        I(l, 999);
                        return
                    }
                    m = true;
                    H.loadMode = 3;
                    a();
                    q("scroll", o, true)
                };
                return {
                    _: function () {
                        e = f.now();
                        k.elements = D.getElementsByClassName(H.lazyClass);
                        v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
                        q("scroll", a, true);
                        q("resize", a, true);
                        q("pageshow", function (e) {
                            if (e.persisted) {
                                var t = D.querySelectorAll("." + H.loadingClass);
                                if (t.length && t.forEach) {
                                    U(function () {})
                                }
                            }
                        });
                        if (u.MutationObserver) {
                            new MutationObserver(a).observe(O, {
                                childList: true,
                                subtree: true,
                                attributes: true
                            })
                        } else {
                            O[P]("DOMNodeInserted", a, true);
                            O[P]("DOMAttrModified", a, true);
                            setInterval(a, 999)
                        }
                        q("hashchange", a, true);
                        ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
                            D[P](e, a, true)
                        });
                        if (/d$|^c/.test(D.readyState)) {
                            l()
                        } else {
                            q("load", l);
                            D[P]("DOMContentLoaded", a);
                            I(l, 2e4)
                        }
                        if (k.elements.length) {
                            t();
                            ee._lsFlush()
                        } else {
                            a()
                        }
                    },
                    checkElems: a,
                    unveil: R,
                    _aLSL: o
                }
            }(),
            re = function () {
                var a;
                var n = te(function (e, t, a, i) {});
                var i = function (e, t, a) {};
                var e = function () {
                    var e;
                    var t = a.length;
                    if (t) {
                        e = 0;
                        for (; e < t; e++) {
                            i(a[e])
                        }
                    }
                };
                var t = ie(e);
                return {
                    _: function () {
                        a = D.getElementsByClassName(H.autosizesClass);
                        q("resize", t)
                    },
                    checkElems: t,
                    updateElem: i
                }
            }(),
            t = function () {
                if (!t.i && D.getElementsByClassName) {
                    t.i = true;
                    re._();
                    e._()
                }
            };
        return I(function () {
                H.init && t()
            }),
            k = {
                cfg: H,
                autoSizer: re,
                loader: e,
                init: t,
                uP: Y,
                aC: K,
                rC: Q,
                hC: J,
                fire: X,
                gW: s,
                rAF: ee
            }
    }(e, e.document, Date);
    e.lazySizes = t,
        "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});

/*! https://unpkg.com/splitting/dist/splitting.js */
! function (n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Splitting = t()
}(this, function () {
    "use strict"
    var o = document,
        l = o.createTextNode.bind(o)

    function d(n, t, e) {
        n.style.setProperty(t, e)
    }

    function f(n, t) {
        return n.appendChild(t)
    }

    function p(n, t, e, r) {
        var i = o.createElement("span")
        return t && (i.className = t),
            e && (!r && i.setAttribute("data-" + t, e),
                i.textContent = e),
            n && f(n, i) || i
    }

    function h(n, t) {
        return n.getAttribute("data-" + t)
    }

    function m(n, t) {
        return n && 0 != n.length ? n.nodeName ? [n] : [].slice.call(n[0].nodeName ? n : (t || o).querySelectorAll(n)) : []
    }

    function v(n, t) {
        n && n.some(t)
    }

    function c(t) {
        return function (n) {
            return t[n]
        }
    }
    var a = {}

    function n(n, t, e, r) {
        return {
            by: n,
            depends: t,
            key: e,
            split: r
        }
    }

    function r(n) {
        return function t(e, n, r) {
            var i = r.indexOf(e)
            if (-1 == i) {
                r.unshift(e)
                var o = a[e]
                if (!o)
                    throw new Error("plugin not loaded: " + e)
                v(o.depends, function (n) {
                    t(n, e, r)
                })
            } else {
                var u = r.indexOf(n)
                r.splice(i, 1),
                    r.splice(u, 0, e)
            }
            return r
        }(n, 0, []).map(c(a))
    }

    function t(n) {
        a[n.by] = n
    }

    function g(n, r, i, o, u) {
        n.normalize()
        var c = [],
            a = document.createDocumentFragment()
        o && c.push(n.previousSibling)
        var s = []
        return m(n.childNodes).some(function (n) {
                if (!n.tagName || n.hasChildNodes()) {
                    if (n.childNodes && n.childNodes.length)
                        return s.push(n),
                            void c.push.apply(c, g(n, r, i, o, u))
                    var t = n.wholeText || "",
                        e = t.trim()
                    e.length && (" " === t[0] && s.push(l(" ")),
                        v(e.split(i), function (n, t) {
                            t && u && s.push(p(a, "whitespace", " ", u))
                            var e = p(a, r, n)
                            c.push(e),
                                s.push(e)
                        }),
                        " " === t[t.length - 1] && s.push(l(" ")))
                } else
                    s.push(n)
            }),
            v(s, function (n) {
                f(a, n)
            }),
            n.innerHTML = "",
            f(n, a),
            c
    }
    var s = 0
    var i = "words",
        e = n(i, s, "word", function (n) {
            return g(n, "word", /\s+/, 0, 1)
        }),
        y = "chars",
        w = n(y, [i], "char", function (n, e, t) {
            var r = []
            return v(t[i], function (n, t) {
                    r.push.apply(r, g(n, "char", "", e.whitespace && t))
                }),
                r
        })

    function b(e) {
        var f = (e = e || {}).key
        return m(e.target || "[data-splitting]").map(function (a) {
            var s = a["🍌"]
            if (!e.force && s)
                return s
            s = a["🍌"] = {
                el: a
            }
            var n = e.by || h(a, "splitting")
            n && "true" != n || (n = y)
            var t = r(n),
                l = function (n, t) {
                    for (var e in t)
                        n[e] = t[e]
                    return n
                }({}, e)
            return v(t, function (n) {
                    if (n.split) {
                        var t = n.by,
                            e = (f ? "-" + f : "") + n.key,
                            r = n.split(a, l, s)
                        e && (i = a,
                                c = (u = "--" + e) + "-index",
                                v(o = r, function (n, t) {
                                    Array.isArray(n) ? v(n, function (n) {}) : d(n, c, t)
                                }),
                                d(i, u + "-total", o.length)),
                            s[t] = r,
                            a.classList.add(t)
                    }
                    var i, o, u, c
                }),
                a.classList.add("splitting"),
                s
        })
    }
    b.html = function (n) {},
        b.add = t
    var T = n("lines", [i], "line", function (n, t, e) {}),
        L = n("items", s, "item", function (n, t) {}),
        k = n("rows", s, "row", function (n, t) {}),
        A = n("cols", s, "col", function (n, t) {}),
        C = n("grid", ["rows", "cols"]),
        M = "layout",
        S = n(M, s, s, function (n, t) {}),
        H = n("cellRows", [M], "row", function (n, t, e) {}),
        O = n("cellColumns", [M], "col", function (n, t, e) {}),
        j = n("cells", ["cellRows", "cellColumns"], "cell", function (n, t, e) {})
    return t(e),
        t(w),
        t(T),
        t(L),
        t(k),
        t(A),
        t(C),
        t(S),
        t(H),
        t(O),
        t(j),
        b
})

/*! https://unpkg.com/scroll-out/dist/scroll-out.min.js */
var ScrollOut = function () {
    "use strict"

    function S(e, t, n) {
        return e < t ? t : n < e ? n : e
    }

    function T(e) {
        return +(0 < e) - +(e < 0)
    }
    var q, t = {}

    function n(e) {
        return "-" + e[0].toLowerCase()
    }

    function d(e) {
        return t[e] || (t[e] = e.replace(/([A-Z])/g, n))
    }

    function v(e, t) {
        return e && 0 !== e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (t || document.documentElement).querySelectorAll(e)) : []
    }

    function h(e, t) {
        for (var n in t)
            n.indexOf("_") && e.setAttribute("data-" + d(n), t[n])
    }
    var z = []

    function e() {
        q = 0,
            z.slice().forEach(function (e) {
                return e()
            }),
            F()
    }

    function F() {
        !q && z.length && (q = requestAnimationFrame(e))
    }

    function N(e, t, n, r) {
        return "function" == typeof e ? e(t, n, r) : e
    }

    function m() {}
    return function (L) {
        var i, P, _, H, o = (L = L || {}).onChange || m,
            l = L.onHidden || m,
            c = L.onShown || m,
            s = L.onScroll || m,
            f = L.cssProps ? (i = L.cssProps
            ) : m,
            e = L.scrollingElement,
            A = e ? v(e)[0] : window,
            W = e ? v(e)[0] : document.documentElement,
            x = !1,
            O = {},
            y = []

        function t() {
            y = v(L.targets || "[data-scroll]", v(L.scope || W)[0]).map(function (e) {
                return {
                    element: e
                }
            })
        }

        function n() {
            var e = W.clientWidth,
                t = W.clientHeight,
                n = T(-P + (P = W.scrollLeft || window.pageXOffset)),
                r = T(-_ + (_ = W.scrollTop || window.pageYOffset)),
                i = W.scrollLeft / (W.scrollWidth - e || 1),
                o = W.scrollTop / (W.scrollHeight - t || 1)
            x = x || O.scrollDirX !== n || O.scrollDirY !== r || O.scrollPercentX !== i || O.scrollPercentY !== o,
                O.scrollDirX = n,
                O.scrollDirY = r,
                O.scrollPercentX = i,
                O.scrollPercentY = o
            for (var l, c = !1, s = 0; s < y.length; s++) {
                for (var f = y[s], u = f.element, a = u, d = 0, v = 0; d += a.offsetLeft,
                    v += a.offsetTop,
                    (a = a.offsetParent) && a !== A;)
                ;
                var h = u.clientHeight || u.offsetHeight || 0,
                    m = u.clientWidth || u.offsetWidth || 0,
                    g = (S(d + m, P, P + e) - S(d, P, P + e)) / m,
                    p = (S(v + h, _, _ + t) - S(v, _, _ + t)) / h,
                    w = 1 === g ? 0 : T(d - P),
                    X = 1 === p ? 0 : T(v - _),
                    Y = S((P - (m / 2 + d - e / 2)) / (e / 2), -1, 1),
                    b = S((_ - (h / 2 + v - t / 2)) / (t / 2), -1, 1),
                    D = void 0
                D = L.offset ? N(L.offset, u, f, W) > _ ? 0 : 1 : (N(L.threshold, u, f, W) || 0) < g * p ? 1 : 0
                var E = f.visible !== D;
                (f._changed || E || f.visibleX !== g || f.visibleY !== p || f.index !== s || f.elementHeight !== h || f.elementWidth !== m || f.offsetX !== d || f.offsetY !== v || f.intersectX != f.intersectX || f.intersectY != f.intersectY || f.viewportX !== Y || f.viewportY !== b) && (c = !0,
                    f._changed = !0,
                    f._visibleChanged = E,
                    f.visible = D,
                    f.elementHeight = h,
                    f.elementWidth = m,
                    f.index = s,
                    f.offsetX = d,
                    f.offsetY = v,
                    f.visibleX = g,
                    f.visibleY = p,
                    f.intersectX = w,
                    f.intersectY = X,
                    f.viewportX = Y,
                    f.viewportY = b,
                    f.visible = D)
            }
            H || !x && !c || (l = C,
                z.push(l),
                F(),
                H = function () {
                    !(z = z.filter(function (e) {
                        return e !== l
                    })).length && q && (cancelAnimationFrame(q),
                        q = 0)
                }
            )
        }

        function C() {
            u(),
                x && (x = !1,
                    h(W, {
                        scrollDirX: O.scrollDirX,
                        scrollDirY: O.scrollDirY
                    }),
                    f(W, O),
                    s(W, O, y))
            for (var e = y.length - 1; - 1 < e; e--) {
                var t = y[e],
                    n = t.element,
                    r = t.visible,
                    i = n.hasAttribute("scrollout-once") || !1
                t._changed && (t._changed = !1,
                        f(n, t)),
                    t._visibleChanged && (h(n, {
                            scroll: r ? "in" : "out"
                        }),
                        o(n, t, W),
                        (r ? c : l)(n, t, W)),
                    r && (L.once || i) && y.splice(e, 1)
            }
        }

        function u() {
            H && (H(),
                H = void 0)
        }
        t(),
            n(),
            C()
        var r = 0,
            a = function () {
                r = r || setTimeout(function () {
                    r = 0,
                        n()
                }, 0)
            }
        return window.addEventListener("resize", a),
            A.addEventListener("scroll", a), {
                index: t,
                update: n,
                teardown: function () {}
            }
    }
}()

Splitting();
ScrollOut({
    targets: '[data-splitting]'
});

Splitting();
ScrollOut({
    targets: '.word'
});

ScrollOut({
    threshold: .2,
    once: true
});

/*! jQuery v3.5.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector | (c) JS Foundation and other contributors | jquery.org/license */
! function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {} :
        t(e)
}("undefined" != typeof window ? window : this, function (g, e) {
    "use strict";
    var t = [],
        u = t.push,
        n = {},
        o = n.toString,
        m = {},
        b = function (e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        x = function (e) {
            return null != e && e === e.window
        },
        w = g.document,
        c = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function T(e) {
    }
    var f = "3.5.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector",
        E = function (e, t) {
            return new E.fn.init(e, t)
        };

    function d(e) {
        var t = !!e && "length" in e && e.length,
            n = T(e);
        return !b(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    E.fn = E.prototype = {
            jquery: f,
            constructor: E,
            length: 0,
            toArray: function () {},
            get: function (e) {},
            pushStack: function (e) {
                var t = E.merge(this.constructor(), e);
                return t.prevObject = this,
                    t
            },
            each: function (e) {
                return E.each(this, e)
            },
            map: function (n) {},
            slice: function () {},
            first: function () {},
            last: function () {},
            even: function () {},
            odd: function () {},
            eq: function (e) {},
            end: function () {},
            push: u,
            sort: t.sort,
            splice: t.splice
        },
        E.extend = E.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {},
                s = 1,
                u = arguments.length,
                l = !1;
            for ("boolean" == typeof a && (l = a,
                    a = arguments[s] || {},
                    s++),
                "object" == typeof a || b(a) || (a = {}),
                s === u && (a = this,
                    s--); s < u; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        r = e[t],
                        "__proto__" !== t && a !== r && (l && r && (E.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                            o = i && !Array.isArray(n) ? [] : i || E.isPlainObject(n) ? n : {},
                            i = !1,
                            a[t] = E.extend(l, o, r)) : void 0 !== r && (a[t] = r));
            return a
        },
        E.extend({
            expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {},
            noop: function () {},
            isPlainObject: function (e) {},
            isEmptyObject: function (e) {},
            globalEval: function (e, t, n) {},
            each: function (e, t) {
                var n, r = 0;
                if (d(e)) {
                    for (n = e.length; r < n; r++)
                        if (!1 === t.call(e[r], r, e[r]))
                            break
                } else
                    for (r in e)
                        if (!1 === t.call(e[r], r, e[r]))
                            break;
                return e
            },
            makeArray: function (e, t) {
                var n = t || [];
                return null != e && (d(Object(e)) ? E.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)),
                    n
            },
            inArray: function (e, t, n) {},
            merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                    e[i++] = t[r];
                return e.length = i,
                    e
            },
            grep: function (e, t, n) {},
            map: function (e, t, n) {},
            guid: 1,
            support: m
        }),
        "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]),
        E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            n["[object " + t + "]"] = t.toLowerCase()
        });
    var p = function (n) {
        var e, p, x, o, i, h, f, g, w, u, l, C, T, a, E, v, s, c, y, A = "sizzle" + 1 * new Date,
            d = n.document,
            N = 0,
            r = 0,
            m = ue(),
            b = ue(),
            S = ue(),
            k = ue(),
            D = function (e, t) {
                return e === t && (l = !0),
                    0
            },
            L = {}.hasOwnProperty,
            t = [],
            j = t.pop,
            q = t.push,
            O = t.push,
            P = t.slice,
            H = function (e, t) {},
            I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]",
            B = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            M = "\\[" + R + "*(" + B + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + R + "*\\]",
            W = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
            F = new RegExp(R + "+", "g"),
            $ = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
            z = new RegExp("^" + R + "*," + R + "*"),
            _ = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
            U = new RegExp(R + "|>"),
            V = new RegExp(W),
            X = new RegExp("^" + B + "$"),
            Q = {
                ID: new RegExp("^#(" + B + ")"),
                CLASS: new RegExp("^\\.(" + B + ")"),
                TAG: new RegExp("^(" + B + "|[*])"),
                ATTR: new RegExp("^" + M),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + I + ")$", "i"),
                needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /HTML$/i,
            G = /^(?:input|select|textarea|button)$/i,
            K = /^h\d$/i,
            J = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"),
            ne = function (e, t) {},
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ie = function (e, t) {},
            oe = function () {},
            ae = xe(function (e) {}, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            O.apply(t = P.call(d.childNodes), d.childNodes),
                t[d.childNodes.length].nodeType
        } catch (e) {
            O = {}
        }

        function se(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument,
                d = e ? e.nodeType : 9;
            if (n = n || [],
                "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d)
                return n;
            if (!r && (C(e),
                    e = e || T,
                    E)) {
                if (11 !== d && (u = Z.exec(t)))
                    if (i = u[1]) {
                        if (9 === d) {
                            if (!(a = e.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                    n
                        } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
                            return n.push(a),
                                n
                    } else {
                        if (u[2])
                            return O.apply(n, e.getElementsByTagName(t)),
                                n;
                        if ((i = u[3]) && p.getElementsByClassName && e.getElementsByClassName)
                            return O.apply(n, e.getElementsByClassName(i)),
                                n
                    }

            }
            return g(t.replace($, "$1"), e, n, r)
        }



        function ce(e) {
        }

        function fe(e, t) {}

        function pe(t) {
        }

        function he(n) {
        }
        for (e in p = se.support = {},
            i = se.isXML = function (e) {
            },
            C = se.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : d;
                return r != T && 9 === r.nodeType && r.documentElement && (a = (T = r).documentElement,
                        E = !i(T),
                        p.getElementsByClassName = J.test(T.getElementsByClassName)
                    ),
                    T
            },

            se.matchesSelector = function (e, t) {},
            se.contains = function (e, t) {},
            se.attr = function (e, t) {},
            se.escape = function (e) {},
            se.error = function (e) {},
            se.uniqueSort = function (e) {},
            o = se.getText = function (e) {},
            (x = se.selectors = {
                cacheLength: 50,
                createPseudo: le,
                match: Q,
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
            }).pseudos.nth = x.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
            x.pseudos[e] = pe(e);
        for (e in {
                submit: !0,
                reset: !0
            })
            x.pseudos[e] = he(e);

        function me() {}

        function xe(s, e, t) {
        }


        return me.prototype = x.filters = x.pseudos,
            x.setFilters = new me,
            h = se.tokenize = function (e, t) {},
            f = se.compile = function (e, t) {},
            g = se.select = function (e, t, n, r) {},
            p.sortStable = A.split("").sort(D).join("") === A,
            p.detectDuplicates = !!l,
            C(),
            p.sortDetached = ce(function (e) {
            }),
            ce(function (e) {
            }) || fe("type|href|height|width", function (e, t, n) {}),
            p.attributes && ce(function (e) {
            }) || fe("value", function (e, t, n) {}),
            ce(function (e) {
            }) || fe(I, function (e, t, n) {}),
            se
    }(g);
    E.find = p,
        E.expr = p.selectors,
        E.expr[":"] = E.expr.pseudos,
        E.uniqueSort = E.unique = p.uniqueSort,
        E.text = p.getText,
        E.isXMLDoc = p.isXML,
        E.contains = p.contains,
        E.escapeSelector = p.escape;
    var h = function (e, t, n) {},
        A = function (e, t) {},
        N = E.expr.match.needsContext;

    function S(e, t) {}
    var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;


    E.filter = function (e, t, n) {},
        E.fn.extend({
            find: function (e) {
                var t, n, r = this.length,
                    i = this;
                if ("string" != typeof e)
                    return this.pushStack(E(e).filter(function () {}));
                for (n = this.pushStack([]),
                    t = 0; t < r; t++)
                    E.find(e, i[t], n);
                return 1 < r ? E.uniqueSort(n) : n
            },
            filter: function (e) {},
            not: function (e) {},
            is: function (e) {}
        });
    var L, j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (E.fn.init = function (e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || L,
            "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : j.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
            }
            return (i = w.getElementById(r[2])) && (this[0] = i,
                    this.length = 1),
                this
        }
        return e.nodeType ? (this[0] = e,
            this.length = 1,
            this) : b(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this)
    }).prototype = E.fn,
        L = E(w);
    var q = /^(?:parents|prev(?:Until|All))/,
        O = {
        };


    E.fn.extend({}),
        E.each({}, function (r, i) {
        });
    var H = /[^\x20\t\r\n\f]+/g;



    E.Callbacks = function (r) {
        },
        E.extend({
            Deferred: function (e) {
                var o = [
                        ["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2],
                        ["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]
                    ],
                    i = "pending",
                    a = {
                        state: function () {},
                        always: function () {},
                        "catch": function (e) {
                        },
                        pipe: function () {},
                        then: function (t, n, r) {
                        },
                        promise: function (e) {
                        }
                    },
                    s = {};
                return E.each(o, function (e, t) {
                    }),
                    a.promise(s),
                    e && e.call(s, s),
                    s
            },
            when: function (e) {}
        });
    var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    E.Deferred.exceptionHook = function (e, t) {},
        E.readyException = function (e) {};
    var W = E.Deferred();


    E.fn.ready = function (e) {
        },
        E.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (e) {
            }
        }),
        E.ready.then = W.then,
        "complete" === w.readyState || "loading" !== w.readyState && !w.documentElement.doScroll ? g.setTimeout(E.ready) : (w.addEventListener("DOMContentLoaded", F),
            g.addEventListener("load", F));
    var $ = function (e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === T(n))
                for (s in i = !0,
                    n)
                    $(e, t, s, n[s], !0, o, a);
            else if (void 0 !== r && (i = !0,
                    b(r) || (a = !0),
                    l && (a ? (t.call(e, r),
                        t = null) : (l = t,
                        t = function (e, t, n) {
                            return l.call(E(e), n)
                        }
                    )),
                    t))
                for (; s < u; s++)
                    t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        z = /^-ms-/,
        _ = /-([a-z])/g;

    function U(e, t) {}

    function V(e) {
        return e.replace(z, "ms-").replace(_, U)
    }
    var X = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function Q() {
    }
    Q.uid = 1,
        Q.prototype = {
            cache: function (e) {
                var t = e[this.expando];
                return t || (t = {},
                        X(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        }))),
                    t
            },
            set: function (e, t, n) {},
            get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
            },
            access: function (e, t, n) {},
            remove: function (e, t) {},
            hasData: function (e) {}
        };
    var Y = new Q,
        G = new Q,
        K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        J = /[A-Z]/g;


    E.extend({}),
        E.fn.extend({}),
        E.extend({
            queue: function (e, t, n) {},
            dequeue: function (e, t) {},
            _queueHooks: function (e, t) {}
        }),
        E.fn.extend({
            queue: function (t, n) {},
            dequeue: function (e) {},
            clearQueue: function (e) {},
            promise: function (e, t) {}
        });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ne = ["Top", "Right", "Bottom", "Left"],
        re = w.documentElement,
        ie = function (e) {},
        oe = {
            composed: !0
        };
    re.getRootNode && (ie = function (e) {});
    var ae = function (e, t) {};
    var se = {};

    function ue(e, t) {}
    E.fn.extend({
    });
    var le, ce, fe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        pe = /^$|^module$|\/(?:java|ecma)script/i;
    var he = {
    };

    function ge(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
            void 0 === t || t && S(e, t) ? E.merge([e], n) : n
    }




    var be = /^key/,
        xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        we = /^([^.]*)(?:\.(.+)|)/;



    function Te() {
        return !1
    }



    function Ae(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
        }
        if (null == r && null == i ? (i = n,
                r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
                r = void 0) : (i = r,
                r = n,
                n = void 0)), !1 === i)
            i = Te;
        else if (!i)
            return e;
        return 1 === o && (a = i,
                (i = function (e) {}).guid = a.guid || (a.guid = E.guid++)),
            e.each(function () {
                E.event.add(this, t, i, r, n)
            })
    }


    E.event = {
            global: {},
            add: function (t, e, n, r, i) {
                var o, a, s, u, l, c, f, d, p, h, g, v = Y.get(t);
                if (X(t)) {
                    n.handler && (n = (o = n).handler,
                            i = o.selector),
                        i && E.find.matchesSelector(re, i),
                        n.guid || (n.guid = E.guid++),
                        (u = v.events) || (u = v.events = Object.create(null)),
                        (a = v.handle) || (a = v.handle = function (e) {
                            return "undefined" != typeof E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0
                        }),
                        l = (e = (e || "").match(H) || [""]).length;
                    while (l--)
                        p = g = (s = we.exec(e[l]) || [])[1],
                        h = (s[2] || "").split(".").sort(),
                        p && (f = E.event.special[p] || {},
                            p = (i ? f.delegateType : f.bindType) || p,
                            f = E.event.special[p] || {},
                            c = E.extend({
                                type: p,
                                origType: g,
                                data: r,
                                handler: n,
                                guid: n.guid,
                                selector: i,
                                needsContext: i && E.expr.match.needsContext.test(i),
                                namespace: h.join(".")
                            }, o),
                            (d = u[p]) || ((d = u[p] = []).delegateCount = 0,
                                f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)),
                            f.add && (f.add.call(t, c),
                                c.handler.guid || (c.handler.guid = n.guid)),
                            i ? d.splice(d.delegateCount++, 0, c) : d.push(c),
                            E.event.global[p] = !0)
                }
            },
            remove: function (e, t, n, r, i) {},
            dispatch: function (e) {
                var t, n, r, i, o, a, s = new Array(arguments.length),
                    u = E.event.fix(e),
                    l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
                    c = E.event.special[u.type] || {};
                for (s[0] = u,
                    t = 1; t < arguments.length; t++)
                    s[t] = arguments[t];
                if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                    a = E.event.handlers.call(this, u, l),
                        t = 0;
                    while ((i = a[t++]) && !u.isPropagationStopped()) {
                        u.currentTarget = i.elem,
                            n = 0;
                        while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
                            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                                u.data = o.data,
                                void 0 !== (r = ((E.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(),
                                    u.stopPropagation()))
                    }
                    return c.postDispatch && c.postDispatch.call(this, u),
                        u.result
                }
            },
            handlers: function (e, t) {
                var n, r, i, o, a, s = [],
                    u = t.delegateCount,
                    l = e.target;
                if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; l !== this; l = l.parentNode || this)
                        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                            for (o = [],
                                a = {},
                                n = 0; n < u; n++)
                                void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < E(i, this).index(l) : E.find(i, this, null, [l]).length),
                                a[i] && o.push(r);
                            o.length && s.push({
                                elem: l,
                                handlers: o
                            })
                        }
                return l = this,
                    u < t.length && s.push({
                        elem: l,
                        handlers: t.slice(u)
                    }),
                    s
            },
            addProp: function (t, e) {
            },
            fix: function (e) {
                return e[E.expando] ? e : new E.Event(e)
            },
            special: {
            }
        },
        E.removeEvent = function (e, t, n) {},
        E.Event = function (e, t) {
            if (!(this instanceof E.Event))
                return new E.Event(e, t);
            e && e.type ? (this.originalEvent = e,
                    this.type = e.type,
                    this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Te,
                    this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
                    this.currentTarget = e.currentTarget,
                    this.relatedTarget = e.relatedTarget) : this.type = e,
                t && E.extend(this, t),
                this.timeStamp = e && e.timeStamp || Date.now(),
                this[E.expando] = !0
        },
        E.Event.prototype = {
            constructor: E.Event,
            isDefaultPrevented: Te,
            isPropagationStopped: Te,
            isImmediatePropagationStopped: Te,
            isSimulated: !1,
            preventDefault: function () {},
            stopPropagation: function () {},
            stopImmediatePropagation: function () {}
        },
        E.each({
        }, E.event.addProp),
        E.each({
        }, function (e, t) {
        }),
        E.each({
        }, function (e, i) {
        }),
        E.fn.extend({
            on: function (e, t, n, r) {
                return Ae(this, e, t, n, r)
            },
            one: function (e, t, n, r) {},
            off: function (e, t, n) {}
        });
    var Se = /<script|<style|<link/i,
        ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
        De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;


    E.extend({
            htmlPrefilter: function (e) {
                return e
            },
            clone: function (e, t, n) {},
            cleanData: function (e) {
            }
        }),
        E.fn.extend({
            detach: function (e) {},
            remove: function (e) {},
            text: function (e) {
            },
            append: function () {
            },
            prepend: function () {
            },
            before: function () {
            },
            after: function () {
            },
            empty: function () {
            },
            clone: function (e, t) {
            },
            html: function (e) {
                return $(this, function (e) {
                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (void 0 === e && 1 === t.nodeType)
                        return t.innerHTML;
                    if ("string" == typeof e && !Se.test(e) && !he[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = E.htmlPrefilter(e);
                        try {
                            for (; n < r; n++)
                                1 === (t = this[n] || {}).nodeType && (E.cleanData(ge(t, !1)),
                                    t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function () {}
        }),
        E.each({
        }, function (e, a) {});
    var Ie = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        Re = function (e) {},
        Be = function (e, t, n) {},
        Me = new RegExp(ne.join("|"), "i");



    function Fe(e, t) {
    }! function () {
    }();
    var $e = ["Webkit", "Moz", "ms"],
        ze = w.createElement("div").style,
        _e = {};
    var Ve, Xe, Qe = /^(none|table(?!-c[ea]).+)/,
        Ye = /^--/,
        Ge = {
        },
        Ke = {
        };
    E.extend({
            cssHooks: {
            },
            cssNumber: {
            },
            cssProps: {},
            style: function (e, t, n, r) {},
            css: function (e, t, n, r) {}
        }),
        E.each(["height", "width"], function (e, u) {
        }),
        E.cssHooks.marginLeft = Fe(m.reliableMarginLeft, function (e, t) {}),
        E.each({
        }, function (i, o) {
        }),
        E.fn.extend({
        }),
        E.fn.delay = function (r, e) {},
        Ve = w.createElement("input"),
        Xe = w.createElement("select").appendChild(w.createElement("option")),
        Ve.type = "checkbox",
        m.checkOn = "" !== Ve.value,
        m.optSelected = Xe.selected,
        (Ve = w.createElement("input")).value = "t",
        Ve.type = "radio",
        m.radioValue = "t" === Ve.value;
    var tt, nt = E.expr.attrHandle;
    E.fn.extend({
        }),
        E.extend({
        }),
        tt = {
        },
        E.each(E.expr.match.bool.source.match(/\w+/g), function (e, t) {
        });
    var rt = /^(?:input|select|textarea|button)$/i,
        it = /^(?:a|area)$/i;

    function ot(e) {
        return (e.match(H) || []).join(" ")
    }

    function at(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function st(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || []
    }
    E.fn.extend({
        }),
        E.extend({
            prop: function (e, t, n) {},
            propHooks: {
            },
            propFix: {
            }
        }),
        m.optSelected || (E.propHooks.selected = {
        }),
        E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            E.propFix[this.toLowerCase()] = this
        }),
        E.fn.extend({
            addClass: function (t) {
                var e, n, r, i, o, a, s, u = 0;
                if (b(t))
                    return this.each(function (e) {});
                if ((e = st(t)).length)
                    while (n = this[u++])
                        if (i = at(n),
                            r = 1 === n.nodeType && " " + ot(i) + " ") {
                            a = 0;
                            while (o = e[a++])
                                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                            i !== (s = ot(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function (t) {
                var e, n, r, i, o, a, s, u = 0;
                if (b(t))
                    return this.each(function (e) {});
                if (!arguments.length)
                    return this.attr("class", "");
                if ((e = st(t)).length)
                    while (n = this[u++])
                        if (i = at(n),
                            r = 1 === n.nodeType && " " + ot(i) + " ") {
                            a = 0;
                            while (o = e[a++])
                                while (-1 < r.indexOf(" " + o + " "))
                                    r = r.replace(" " + o + " ", " ");
                            i !== (s = ot(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function (i, t) {
                var o = typeof i,
                    a = "string" === o || Array.isArray(i);
                return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : b(i) ? this.each(function (e) {}) : this.each(function () {
                    var e, t, n, r;
                    if (a) {
                        t = 0,
                            n = E(this),
                            r = st(i);
                        while (e = r[t++])
                            n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
                    } else
                        void 0 !== i && "boolean" !== o || ((e = at(this)) && Y.set(this, "__className__", e),
                            this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""))
                })
            },
            hasClass: function (e) {
                var t, n, r = 0;
                t = " " + e + " ";
                while (n = this[r++])
                    if (1 === n.nodeType && -1 < (" " + ot(at(n)) + " ").indexOf(t))
                        return !0;
                return !1
            }
        });
    var ut = /\r/g;
    E.fn.extend({
        }),
        E.extend({
            valHooks: {
            }
        }),
        E.each(["radio", "checkbox"], function () {
            E.valHooks[this] = {
                },
                m.checkOn || (E.valHooks[this].get = function (e) {})
        }),
        m.focusin = "onfocusin" in g;
    var lt = /^(?:focusinfocus|focusoutblur)$/,
        ct = function (e) {};
    E.extend(E.event, {
        }),
        E.fn.extend({
        }),
        m.focusin || E.each({
        }, function (n, r) {
        }),
        E.parseXML = function (e) {};
    var ft, dt = /\[\]$/,
        pt = /\r?\n/g,
        ht = /^(?:submit|button|image|reset|file)$/i,
        gt = /^(?:input|select|textarea|keygen)/i;
    E.param = function (e, t) {},
        E.fn.extend({}),
        E.fn.extend({}),
        E.expr.pseudos.hidden = function (e) {},
        E.expr.pseudos.visible = function (e) {},
        m.createHTMLDocument = ((ft = w.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
            2 === ft.childNodes.length),
        E.parseHTML = function (e, t, n) {},
        E.offset = {},
        E.fn.extend({}),
        E.each({
        }, function (t, i) {
        }),
        E.each(["top", "left"], function (e, n) {}),
        E.each({
        }, function (a, s) {
        }),
        E.fn.extend({}),
        E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
            E.fn[n] = function (e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
            }
        });
    var yt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    E.proxy = function (e, t) {},
        E.holdReady = function (e) {},
        E.isArray = Array.isArray,
        E.parseJSON = JSON.parse,
        E.nodeName = S,
        E.isFunction = b,
        E.isWindow = x,
        E.camelCase = V,
        E.type = T,
        E.now = Date.now,
        E.isNumeric = function (e) {},
        E.trim = function (e) {
            return null == e ? "" : (e + "").replace(yt, "")
        },
        "function" == typeof define && define.amd && define("jquery", [], function () {});
    var mt = g.jQuery,
        bt = g.$;
    return E.noConflict = function (e) {},
        "undefined" == typeof e && (g.jQuery = g.$ = E),
        E
});

/*! jquery 黑暗模式 */
$(".sk").click(function () {
    $(".u9").toggleClass('av');
    $('body, .bar').toggleClass('dark');
});

/*! 继续阅读 */
$('.af').html(function (i, html) {
    var chars = $.trim(html).split("");

    return '<span>' + chars.join('</span><span>') + '</span>';
});

t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } :
    function (t) {},
    function (t) {
        function e(o) {
            if (n[o])
                return n[o].exports;
            var r = n[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(r.exports, r, r.exports, e),
                r.l = !0,
                r.exports
        }
        var n = {};
        e.d = function (t, n, o) {
                e.o(t, n) || Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: o
                })
            },
            e.r = function (t) {},
            e.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            },
            e.p = "",
            e(e.s = 151)
    }([function (t, e, n) {}, function (t, e) {
        t.exports = function (t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    }, function (t, e) {
        var n = Array.isArray;
        t.exports = n
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(40);
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = {};
        e.IX2EngineConstants = e.IX2EngineActionTypes = void 0;
        var i = n(305);
        Object.keys(i).forEach((function (t) {
            "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(r, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: function () {
                    return i[t]
                }
            }))
        }));
        var u = n(306);
        Object.keys(u).forEach((function (t) {
            "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(r, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: function () {
                    return u[t]
                }
            }))
        }));
        var a = n(307);
        Object.keys(a).forEach((function (t) {}));
        var c = o(n(308));
        e.IX2EngineActionTypes = c;
        var f = o(n(309));
        e.IX2EngineConstants = f
    }, function (t, e, n) {
        var o = {},
            r = {},
            i = (window.Webflow,
                window.jQuery),
            u = (i(window),
                i(document)),
            a = (i.isFunction,
                o._ = n(153)),
            c = o.tram = n(91) && i.tram;
        c.config.hideBackface = !1,
            c.config.keepInherited = !0,
            o.define = function (t, e, n) {
                return r[t] && v(r[t]),
                    r[t] = e(i, a, n) || {}
            },
            o.require = function (t) {
                return r[t]
            },
            o.push = function (t) {},
            o.env = function (t) {};
        var f = navigator.userAgent.toLowerCase(),
            s = o.env.touch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            l = o.env.chrome = /chrome/.test(f) && /Google/.test(navigator.vendor) && parseInt(f.match(/chrome\/(\d+)\./)[1], 10),
            E = o.env.ios = /(ipod|iphone|ipad)/.test(f);
        o.env.safari = /safari/.test(f) && !l && !E,
            s && u.on("touchstart mousedown", (function (t) {})),
            o.validClick = s ? function (t) {} :
            function () {},
            o.resize = void 0,
            o.scroll = void 0,
            o.redraw = void 0,
            o.location = function (t) {},
            o.env() && (o.location = function () {}),
            o.ready = function () {},
            o.load = function (t) {},
            o.destroy = function (t) {},
            i(o.ready),
            t.exports = window.Webflow = o
    }, function (t, e, n) {}, function (t, e) {}, function (e, n, o) {
        var r = o(96),
            i = "object" == ("undefined" == typeof self ? "undefined" : t(self)) && self && self.Object === Object && self,
            u = r || i || Function("return this")();
        e.exports = u
    }, function (t, e, n) {}, function (e, n) {
        e.exports = function (e) {
            var n = void 0 === e ? "undefined" : t(e);
            return null != e && ("object" == n || "function" == n)
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (e, n, o) {
        var r = o(157),
            i = o(211),
            u = o(71),
            a = o(2),
            c = o(220);
        e.exports = function (e) {
            return "function" == typeof e ? e : null == e ? u : "object" == (void 0 === e ? "undefined" : t(e)) ? a(e) ? i(e[0], e[1]) : r(e) : c(e)
        }
    }, function (t, e, n) {
        var o = n(169),
            r = n(174);
        t.exports = function (t, e) {
            var n = r(t, e);
            return o(n) ? n : void 0
        }
    }, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(32),
            r = n(170),
            i = n(171),
            u = o ? o.toStringTag : void 0;
        t.exports = function (t) {
            return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : u && u in Object(t) ? r(t) : i(t)
        }
    }, function (t, e, n) {
        var o = n(95),
            r = n(65);
        t.exports = function (t) {
            return null != t && r(t.length) && !o(t)
        }
    }, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(40);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.IX2VanillaUtils = e.IX2VanillaPlugins = e.IX2ElementsReducer = e.IX2EasingUtils = e.IX2Easings = e.IX2BrowserSupport = void 0;
        var r = o(n(86));
        e.IX2BrowserSupport = r;
        var i = o(n(137));
        e.IX2Easings = i;
        var u = o(n(139));
        e.IX2EasingUtils = u;
        var a = o(n(315));
        e.IX2ElementsReducer = a;
        var c = o(n(141));
        e.IX2VanillaPlugins = c;
        var f = o(n(317));
        e.IX2VanillaUtils = f
    }, function (t, e) {
        function n() {
            return t.exports = n = Object.assign || function (t) {},
                n.apply(this, arguments)
        }
        t.exports = n
    }, function (t, e) {
        t.exports = function (t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n,
                t
        }
    }, function (t, e, n) {}, function (t, e, n) {
        var o = n(52);
        t.exports = function (t) {
            if ("string" == typeof t || o(t))
                return t;
            var e = t + "";
            return "0" == e && 1 / t == -1 / 0 ? "-0" : e
        }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {
        t.exports = function (t) {
            if (t && t.__esModule)
                return t;
            var e = {};
            if (null != t)
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n);
            return e.default = t,
                e
        }
    }, function (e, n, o) {
        function r(t) {
            var e = Object.keys(t);
            return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e
        }

        function i(t) {
            if (Array.isArray(t))
                return t.slice();
            for (var e = r(t), n = {}, o = 0; o < e.length; o++) {
                var i = e[o];
                n[i] = t[i]
            }
            return n
        }

        function u(t, e, n) {
            var o = n;
            null == o && a(d);
            for (var f = !1, s = arguments.length, l = Array(s > 3 ? s - 3 : 0), E = 3; E < s; E++)
                l[E - 3] = arguments[E];
            for (var _ = 0; _ < l.length; _++) {
                var I = l[_];
                if (null != I) {
                    var v = r(I);
                    if (v.length)
                        for (var p = 0; p <= v.length; p++) {
                            var T = v[p];
                            if (!t || void 0 === o[T]) {
                                var O = I[T];
                                e && c(o[T]) && c(O) && (O = u(t, e, o[T], O)),
                                    void 0 !== O && O !== o[T] && (f || (f = !0,
                                            o = i(o)),
                                        o[T] = O)
                            }
                        }
                }
            }
            return o
        }

        function c(t) {
            var e = void 0 === t ? "undefined" : E(t);
            return null != t && ("object" === e || "function" === e)
        }

        function f(t, e) {
            if (!Array.isArray(e) && a(d),
                null != t) {
                for (var n = t, o = 0; o < e.length; o++) {
                    var r = e[o];
                    if (void 0 === (n = null != n ? n[r] : void 0))
                        return n
                }
                return n
            }
        }

        function s(t, e, n) {
            var o = null == t ? "number" == typeof e ? [] : {} : t;
            if (o[e] === n)
                return o;
            var r = i(o);
            return r[e] = n,
                r
        }

        function l(t, e, n) {
            return e.length ? function t(e, n, o, r) {
                var i = n[r];
                return s(e, i, r === n.length - 1 ? o : t(c(e) && c(e[i]) ? e[i] : "number" == typeof n[r + 1] ? [] : {}, n, o, r + 1))
            }(t, e, n, 0) : n
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var E = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function (e) {
                return void 0 === e ? "undefined" : t(e)
            } :
            function (t) {};
        n.clone = i,
            n.addLast = function (t, e) {
                return Array.isArray(e) ? t.concat(e) : t.concat([e])
            },
            n.addFirst = function (t, e) {},
            n.removeLast = function (t) {},
            n.removeFirst = function (t) {},
            n.insert = function (t, e, n) {},
            n.removeAt = function (t, e) {},
            n.replaceAt = function (t, e, n) {},
            n.getIn = f,
            n.set = s,
            n.setIn = l,
            n.update = function (t, e, n) {},
            n.updateIn = function (t, e, n) {},
            n.merge = function (t, e, n, o, r, i) {
                for (var a = arguments.length, c = Array(a > 6 ? a - 6 : 0), f = 6; f < a; f++)
                    c[f - 6] = arguments[f];
                return c.length ? u.call.apply(u, [null, !1, !1, t, e, n, o, r, i].concat(c)) : u(!1, !1, t, e, n, o, r, i)
            },
            n.mergeDeep = function (t, e, n, o, r, i) {},
            n.mergeIn = function (t, e, n, o, r, i, a) {
                var c = f(t, e);
                null == c && (c = {});
                for (var s = arguments.length, E = Array(s > 7 ? s - 7 : 0), d = 7; d < s; d++)
                    E[d - 7] = arguments[d];
                return l(t, e, E.length ? u.call.apply(u, [null, !1, !1, c, n, o, r, i, a].concat(E)) : u(!1, !1, c, n, o, r, i, a))
            },
            n.omit = function (t, e) {},
            n.addDefaults = function (t, e, n, o, r, i) {};
        var d = "INVALID_ARGS";
        n.default = {}
    }, function (e, n) {
        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function (e) {
                    return void 0 === e ? "undefined" : t(e)
                } :
                function (t) {}
            )(e)
        }

        function r(t) {
            return "function" == typeof Symbol && "symbol" === o(Symbol.iterator) ? e.exports = r = function (t) {
                    return o(t)
                } :
                e.exports = r = function (t) {},
                r(t)
        }
        e.exports = r
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(66),
            r = n(25);
        t.exports = function (t) {
            return r(t) ? a(t) : o(t)
        }
    }, function (t, e, n) {}, function (t, e, n) {
        var o = n(69);
        t.exports = function (t, e, n) {
            var r = null == t ? void 0 : o(t, e);
            return void 0 === r ? n : r
        }
    }, function (t, e, n) {
        var o = n(2),
            r = n(70),
            i = n(212),
            u = n(215);
        t.exports = function (t, e) {
            return o(t) ? t : r(t, e) ? [t] : i(u(t))
        }
    }, function (t, e, n) {
        n(24),
            n(20),
            t.exports = function (t) {}
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {
        var o = n(19)(n(10), "Map");
        t.exports = o
    }, function (t, e, n) {
        function o(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;)
            ;
        }
        var r = n(175),
            i = n(0),
            u = n(0),
            a = n(175),
            c = n(175);
        o.prototype.clear = r,
            o.prototype.delete = i,
            o.prototype.get = u,
            o.prototype.has = a,
            o.prototype.set = c,
            t.exports = o
    }, function (t, e) {
        t.exports = function (t, e) {
            for (var n = -1, o = e.length, r = t.length; ++n < o;)
                t[r + n] = e[n];
            return t
        }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e) {
        t.exports = function (t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
        }
    }, function (t, e, n) {
        var o = n(67),
            r = n(206),
            i = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
            if (!o(t))
                return r(t);
            var e = [];
            for (var n in Object(t))
                i.call(t, n) && "constructor" != n && e.push(n);
            return e
        }
    }, function (t, e) {
        var n = Object.prototype;
        t.exports = function (t) {
            var e = t && t.constructor;
            return t === ("function" == typeof e && e.prototype || n)
        }
    }, function (t, e, n) {
        var o = n(207),
            r = n(59),
            i = n(208),
            u = n(209),
            a = n(106),
            c = n(24),
            f = n(97),
            s = (f(o),
                f(r),
                f(i),
                f(u),
                f(a),
                c);
        (o && "[object DataView]" != s(new o(new ArrayBuffer(1))) || r && "[object Map]" != s(new r) || i && "[object Promise]" != s(i.resolve()) || u && "[object Set]" != s(new u) || a && "[object WeakMap]" != s(new a)) && (s = function (t) {}),
        t.exports = s
    }, function (t, e, n) {
        var o = n(51),
            r = n(33);
        t.exports = function (t, e) {
            for (var n = 0, i = (e = o(e, t)).length; null != t && n < i;)
                t = t[r(e[n++])];
            return n && n == i ? t : void 0
        }
    }, function (t, e, n) {
        n(2),
            n(52),
            t.exports = function (t, e) {}
    }, function (t, e) {}, function (t, e, n) {
        n(12),
            n(52),
            parseInt,
            t.exports = function (t) {}
    }, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {
        function o(t, e, n) {
            function o(t) {
                if (!Object(r.default)(t))
                    throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                if (void 0 === t.type)
                    throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                if (E)
                    throw new Error("Reducers may not dispatch actions.");
                try {
                    E = !0,
                        f = c(f, t)
                } finally {
                    E = !1
                }
                for (var e = s = l, n = 0; n < e.length; n++)
                    e[n]();
                return t
            }
            var a;
            if ("function" == typeof e && void 0 === n && (n = e,
                    e = void 0),
                "function" != typeof t)
                throw new Error("Expected the reducer to be a function.");
            var c = t,
                f = e,
                s = [],
                l = s,
                E = !1;
            return o({
                    type: u.INIT
                }),
                (a = {
                    dispatch: o,
                    subscribe: function (t) {
                        if ("function" != typeof t)
                            throw new Error("Expected listener to be a function.");
                        return l.push(t)
                    },
                    getState: function () {
                        return f
                    },
                    replaceReducer: function (t) {}
                })[i.default] = function () {},
                a
        }
        n.r(e),
            n.d(e, "ActionTypes", (function () {})),
            n.d(e, "default", (function () {
                return o
            }));
        var r = n(129),
            i = n(300),
            u = {
                INIT: "@@redux/INIT"
            }
    }, function (t, e, n) {}, function (t, e, n) {
        var o = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.TRANSFORM_STYLE_PREFIXED = e.TRANSFORM_PREFIXED = e.FLEX_PREFIXED = e.ELEMENT_MATCHES = e.withBrowser = e.IS_BROWSER_ENV = void 0,
            o(n(135));
        var r = "undefined" != typeof window;
        e.IS_BROWSER_ENV = r;
        var i = function (t, e) {
            return r ? t() : e
        };
        e.withBrowser = i;
        var u = i((function () {}));
        e.ELEMENT_MATCHES = u;
        var a = i((function () {
            var t = document.createElement("i"),
                e = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"];
            try {
                for (var n = e.length, o = 0; o < n; o++) {
                    var r = e[o];
                    if (t.style.display = r,
                        t.style.display === r)
                        return r
                }
                return ""
            } catch (t) {
                return ""
            }
        }), "flex");
        e.FLEX_PREFIXED = a;
        var c = i((function () {
            var t = document.createElement("i");
            if (null == t.style.transform)
                for (var e = ["Webkit", "Moz", "ms"], n = e.length, o = 0; o < n; o++) {
                    var r = e[o] + "Transform";
                    if (void 0 !== t.style[r])
                        return r
                }
            return "transform"
        }), "transform");
        e.TRANSFORM_PREFIXED = c;
        var f = c.split("transform")[0],
            s = f ? f + "TransformStyle" : "transformStyle";
        e.TRANSFORM_STYLE_PREFIXED = s
    }, function (t, e, n) {
        var o = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.mediaQueriesDefined = e.viewportWidthChanged = e.actionListPlaybackChanged = e.elementStateChanged = e.instanceRemoved = e.instanceStarted = e.instanceAdded = e.parameterChanged = e.animationFrameChanged = e.eventStateChanged = e.testFrameRendered = e.eventListenerAdded = e.clearRequested = e.stopRequested = e.playbackRequested = e.previewRequested = e.sessionStopped = e.sessionStarted = e.sessionInitialized = e.rawDataImported = void 0;
        var r = o(n(30)),
            i = n(6),
            u = n(29),
            a = i.IX2EngineActionTypes,
            c = a.IX2_RAW_DATA_IMPORTED,
            f = a.IX2_SESSION_INITIALIZED,
            s = a.IX2_SESSION_STARTED,
            l = (a.IX2_SESSION_STOPPED,
                a.IX2_PREVIEW_REQUESTED,
                a.IX2_PLAYBACK_REQUESTED,
                a.IX2_STOP_REQUESTED,
                a.IX2_CLEAR_REQUESTED,
                a.IX2_EVENT_LISTENER_ADDED),
            E = (a.IX2_TEST_FRAME_RENDERED,
                a.IX2_EVENT_STATE_CHANGED),
            d = a.IX2_ANIMATION_FRAME_CHANGED,
            _ = (a.IX2_PARAMETER_CHANGED,
                a.IX2_INSTANCE_ADDED),
            I = a.IX2_INSTANCE_STARTED,
            v = (a.IX2_INSTANCE_REMOVED,
                a.IX2_ELEMENT_STATE_CHANGED),
            p = (a.IX2_ACTION_LIST_PLAYBACK_CHANGED,
                a.IX2_VIEWPORT_WIDTH_CHANGED,
                a.IX2_MEDIA_QUERIES_DEFINED,
                u.IX2VanillaUtils.reifyState);
        e.rawDataImported = function (t) {
                return {
                    type: c,
                    payload: (0,
                        r.default)({}, p(t))
                }
            },
            e.sessionInitialized = function (t) {
                var e = t.hasBoundaryNodes;
                return {
                    type: f,
                    payload: {
                        hasBoundaryNodes: e
                    }
                }
            },
            e.sessionStarted = function () {
                return {
                    type: s
                }
            },
            e.sessionStopped = function () {},
            e.previewRequested = function (t) {},
            e.playbackRequested = function (t) {},
            e.stopRequested = function (t) {},
            e.clearRequested = function () {},
            e.eventListenerAdded = function (t, e) {
                return {
                    type: l,
                    payload: {
                        target: t,
                        listenerParams: e
                    }
                }
            },
            e.testFrameRendered = function () {},
            e.eventStateChanged = function (t, e) {
                return {
                    type: E,
                    payload: {
                        stateKey: t,
                        newState: e
                    }
                }
            },
            e.animationFrameChanged = function (t, e) {
                return {
                    type: d,
                    payload: {
                        now: t,
                        parameters: e
                    }
                }
            },
            e.parameterChanged = function (t, e) {},
            e.instanceAdded = function (t) {
                return {
                    type: _,
                    payload: (0,
                        r.default)({}, t)
                }
            },
            e.instanceStarted = function (t, e) {
                return {
                    type: I,
                    payload: {
                        instanceId: t,
                        time: e
                    }
                }
            },
            e.elementStateChanged = function (t, e, n, o) {
                return {
                    type: v,
                    payload: {
                        elementId: t,
                        actionTypeId: e,
                        current: n,
                        actionItem: o
                    }
                }
            },
            e.mediaQueriesDefined = function () {}
    }, function (t, e, n) {
        function o(t, e) {}
        var r = n(148),
            i = n(89);
        o.prototype = r(i.prototype),
            o.prototype.constructor = o,
            t.exports = o
    }, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {
        n(1)(n(42)),
            window.tram = function (t) {
                var n = document;
                return window,
                    n.createElement("a"),
                    e.support = {},
                    e.frame = void 0,
                    e.now = void 0,
                    e.config = {},
                    t.style,
                    t.css,
                    t.tram = e
            }(window.jQuery)
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(24),
            r = n(12);
        t.exports = function (t) {
            if (!r(t))
                return !1;
            var e = o(t);
            return "[object Function]" == e || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e
        }
    }, function (e, n, o) {
        (function (n) {
            var o = "object" == (void 0 === n ? "undefined" : t(n)) && n && n.Object === Object && n;
            e.exports = o
        }).call(this, o(45))
    }, function (t, e) {
        var n = Function.prototype.toString;
        t.exports = function (t) {
            if (null != t) {
                try {
                    return n.call(t)
                } catch (t) {}
                try {
                    return t + ""
                } catch (t) {}
            }
            return ""
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(61),
            r = n(2);
        t.exports = function (t, e, n) {
            var i = e(t);
            return r(t) ? i : o(i, n(t))
        }
    }, function (t, e, n) {
        var o = n(199),
            r = n(102),
            i = (Object.prototype.propertyIsEnumerable,
                Object.getOwnPropertySymbols),
            u = i ? function (t) {
                return null == t ? [] : (t = Object(t),
                    o(i(t), (function (t) {})))
            } :
            r;
        t.exports = u
    }, function (t, e) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {
        t.exports = function (t, e) {
            return function (n) {
                return t(e(n))
            }
        }
    }, function (t, e, n) {
        var o = n(19)(n(10), "WeakMap");
        t.exports = o
    }, function (t, e, n) {}, function (t, e) {}, function (t, e) {
        t.exports = function (t, e) {
            for (var n = -1, o = null == t ? 0 : t.length, r = Array(o); ++n < o;)
                r[n] = e(t[n], n, t);
            return r
        }
    }, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        n.r(e);
        var o = n(84);
        n.d(e, "createStore", (function () {
            return o.default
        }));
        var r = n(131);
        n.d(e, "combineReducers", (function () {
                return r.default
            })),
            n(133),
            n.d(e, "bindActionCreators", (function () {})),
            n(134),
            n.d(e, "applyMiddleware", (function () {})),
            n(85),
            n.d(e, "compose", (function () {})),
            n(132)
    }, function (t, e, n) {
        n.r(e);
        var o = n(292),
            r = n(297),
            i = n(299),
            u = Function.prototype,
            a = Object.prototype,
            c = u.toString,
            f = a.hasOwnProperty,
            s = c.call(Object);
        e.default = function (t) {
            if (!Object(i.default)(t) || "[object Object]" != Object(o.default)(t))
                return !1;
            var e = Object(r.default)(t);
            if (null === e)
                return !0;
            var n = f.call(e, "constructor") && e.constructor;
            return "function" == typeof n && n instanceof n && c.call(n) == s
        }
    }, function (t, e, n) {}, function (t, e, n) {
        function o(t) {
            for (var e = Object.keys(t), n = {}, o = 0; o < e.length; o++) {
                var r = e[o];
                "function" == typeof t[r] && (n[r] = t[r])
            }
            var i = Object.keys(n);
            return function () {
                for (var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = arguments[1], o = !1, r = {}, u = 0; u < i.length; u++) {
                    var a = i[u],
                        c = n[a],
                        f = t[a],
                        s = c(f, e);
                    r[a] = s,
                        o = o || s !== f
                }
                return o ? r : t
            }
        }
        n.r(e),
            n.d(e, "default", (function () {
                return o
            })),
            n(84),
            n(129),
            n(132)
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(136)(n(92));
        t.exports = o
    }, function (t, e, n) {
        n(18),
            n(25),
            n(48),
            t.exports = function (t) {
                return function (t, e, n) {}
            }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {
        function o(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10,
                o = Math.pow(n, e),
                r = Number(Math.round(t * o) / o);
            return Math.abs(r) > 1e-4 ? r : 0
        }
        var r = (n(1)(n(140)),
                n(1)),
            i = n(40);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.optimizeFloat = o,
            e.createBezierEasing = function (t) {},
            e.applyEasing = function (t, e, n) {
                return 0 === e ? 0 : 1 === e ? 1 : o(n ? e > 0 ? n(e) : e : e > 0 && t && u[t] ? u[t](e) : e)
            };
        var u = i(n(137));
        r(n(138))
    }, function (t, e, n) {}, function (t, e, n) {
        var o = n(1)(n(31));
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.isPluginType = function (t) {},
            e.clearPlugin = e.renderPlugin = e.createPluginInstance = e.getPluginDestination = e.getPluginDuration = e.getPluginOrigin = e.getPluginConfig = void 0,
            n(316);
        var r = n(6);
        n(86),
            (0,
                o.default)({}, r.ActionTypeConsts.PLUGIN_LOTTIE, {}),
            e.clearPlugin = void 0
    }, function (t, e, n) {
        var o = n(143),
            r = n(323)(o);
        t.exports = r
    }, function (t, e, n) {
        var o = n(321),
            r = n(48);
        t.exports = function (t, e) {
            return t && o(t, e, r)
        }
    }, function (t, e, n) {
        var o = n(327);
        e.__esModule = !0,
            e.default = void 0;
        var r = o(n(328)).default;
        e.default = r
    }, function (t, e, n) {
        function o(t) {
            var e, n = t.store,
                o = t.eventId,
                i = t.eventTarget,
                u = t.eventStateKey,
                a = t.actionListId,
                c = t.groupIndex,
                f = void 0 === c ? 0 : c,
                l = t.immediate,
                E = t.verbose,
                d = n.getState(),
                _ = d.ixData,
                I = d.ixSession,
                v = _.events[o] || {},
                p = v.mediaQueries,
                T = void 0 === p ? _.mediaQueryKeys : p,
                S = (0,
                    s.default)(_, "actionLists.".concat(a), {}),
                A = S.actionItemGroups,
                R = S.useFirstGroupAsInitialState;
            if (!A || !A.length)
                return !1;
            f >= A.length && (0,
                    s.default)(v, "config.loop") && (f = 0),
                0 === f && R && f++;
            var g = (0 === f || 1 === f && R) && (0,
                    O.isQuickEffect)(null === (e = v.action) || void 0 === e ? void 0 : e.actionTypeId) ? v.config.delay : void 0,
                N = (0,
                    s.default)(A, [f, "actionItems"], []);
            if (!N.length)
                return !1;
            if (!V(T, I.mediaQueryKey))
                return !1;
            var L = I.hasBoundaryNodes && i ? y.getClosestElement(i, C) : null,
                m = G(N),
                D = !1;
            return N.forEach((function (t, e) {
                    var c = t.config,
                        s = t.actionTypeId,
                        d = H(s),
                        _ = c.target;
                    if (_) {
                        var I = _.boundaryMode ? L : null;
                        M({
                            config: c,
                            event: v,
                            eventTarget: i,
                            elementRoot: I,
                            elementApi: y
                        }).forEach((function (c, _) {
                            var I = d ? B(s)(c, t) : null,
                                v = d ? W(s)(c, t) : null;
                            D = !0;
                            var p = m === e && 0 === _,
                                T = w({
                                    element: c,
                                    actionItem: t
                                }),
                                O = b({
                                    element: c,
                                    actionItem: t,
                                    elementApi: y
                                }, I);
                            r({
                                store: n,
                                element: c,
                                actionItem: t,
                                eventId: o,
                                eventTarget: i,
                                eventStateKey: u,
                                actionListId: a,
                                groupIndex: f,
                                isCarrier: p,
                                computedStyle: T,
                                destination: O,
                                immediate: l,
                                verbose: E,
                                pluginInstance: I,
                                pluginDuration: v,
                                instanceDelay: g
                            })
                        }))
                    }
                })),
                D
        }

        function r(t) {
            var e = t.store,
                n = t.computedStyle,
                o = (0,
                    f.default)(t, ["store", "computedStyle"]),
                r = !o.continuous,
                u = o.element,
                a = o.actionItem,
                s = o.immediate,
                l = o.pluginInstance,
                E = x(),
                d = e.getState(),
                _ = d.ixElements,
                I = d.ixSession,
                v = P(_, u),
                p = (_[v] || {}).refState,
                T = y.getRefType(u),
                O = U(u, p, n, a, y, l);
            e.dispatch((0,
                    A.instanceAdded)((0,
                    c.default)({
                    instanceId: E,
                    elementId: v,
                    origin: O,
                    refType: T
                }, o))),
                function (t, e, n) {
                    var o = document.createEvent("CustomEvent");
                    o.initCustomEvent("ix2-animation-started", !0, !0, n),
                        t.dispatchEvent(o)
                }(document.body, 0, E),
                s || (F({
                        store: e,
                        select: function (t) {
                            return t.ixInstances[E]
                        },
                        onChange: i
                    }),
                    r && e.dispatch((0,
                        A.instanceStarted)(E, I.tick)))
        }

        function i(t, e) {
            var n = t.active,
                r = t.continuous,
                i = t.complete,
                u = t.elementId,
                a = t.actionItem,
                c = t.actionTypeId,
                f = t.renderType,
                s = t.current,
                l = t.groupIndex,
                E = t.eventId,
                d = t.eventTarget,
                _ = t.eventStateKey,
                I = t.actionListId,
                v = t.isCarrier,
                p = t.styleProp,
                T = t.verbose,
                O = t.pluginInstance,
                S = e.getState(),
                R = S.ixData,
                g = S.ixSession,
                N = (R.events[E] || {}).mediaQueries,
                C = void 0 === N ? R.mediaQueryKeys : N;
            if (V(C, g.mediaQueryKey) && (r || n || i)) {
                if (s || f === m && i) {
                    e.dispatch((0,
                        A.elementStateChanged)(u, c, s, a));
                    var D = e.getState().ixElements[u] || {},
                        h = D.ref,
                        M = D.refType,
                        P = D.refState,
                        b = P && P[c];
                    switch (M) {
                        case L:
                            X(h, P, b, E, a, p, y, f, O)
                    }
                }
                if (i && v) {
                    var F = o({
                        store: e,
                        eventId: E,
                        eventTarget: d,
                        eventStateKey: _,
                        actionListId: I,
                        groupIndex: l + 1,
                        verbose: T
                    });
                    T && !F && e.dispatch((0,
                        A.actionListPlaybackChanged)({
                        actionListId: I,
                        isPlaying: !1
                    }))
                }
            }
        }
        var u = (n(1)(n(140)),
                n(40)),
            a = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.observeRequests = function (t) {},
            e.startEngine = function (t) {
                var e, n = t.store,
                    o = t.rawData,
                    r = t.allowEvents,
                    i = t.testManual,
                    u = n.getState().ixSession;
                o && n.dispatch((0,
                        A.rawDataImported)(o)),
                    u.active || (n.dispatch((0,
                            A.sessionInitialized)({
                            hasBoundaryNodes: Boolean(document.querySelector(C))
                        })),
                        r && (function (t) {
                                var e = t.getState().ixData.eventTypeMap;
                                (0,
                                    I.default)(e, (function (e, n) {
                                    var o = R.default[n];
                                    o ? function (t) {
                                        var e = t.logic,
                                            n = t.store,
                                            o = t.events;
                                        ! function (t) {
                                            if (K) {
                                                var e = {},
                                                    n = "";
                                                for (var o in t) {
                                                    var r = t[o],
                                                        i = r.eventTypeId,
                                                        u = r.target,
                                                        a = y.getQuerySelector(u);
                                                    e[a] || i !== T.EventTypeConsts.MOUSE_CLICK && i !== T.EventTypeConsts.MOUSE_SECOND_CLICK || (e[a] = !0,
                                                        n += a + "{cursor: pointer;touch-action: manipulation;}")
                                                }
                                                if (n) {
                                                    var c = document.createElement("style");
                                                    c.textContent = n,
                                                        document.body.appendChild(c)
                                                }
                                            }
                                        }(o);
                                        var r = e.types,
                                            i = e.handler,
                                            u = n.getState().ixData,
                                            a = (u.actionLists,
                                                k(o, Z));
                                        if ((0,
                                                l.default)(a)) {
                                            (0,
                                                I.default)(a, (function (t, e) {}));
                                            var c = function (t) {
                                                    var e = n.getState().ixSession;
                                                    z(a, (function (r, a, c) {
                                                        var f = o[a],
                                                            s = e.eventState[c],
                                                            l = f.action,
                                                            E = f.mediaQueries,
                                                            d = void 0 === E ? u.mediaQueryKeys : E;
                                                        if (V(d, e.mediaQueryKey)) {
                                                            var _ = function () {
                                                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                                                    o = i({
                                                                        store: n,
                                                                        element: r,
                                                                        event: f,
                                                                        eventConfig: e,
                                                                        nativeEvent: t,
                                                                        eventStateKey: c
                                                                    }, s);
                                                                (0,
                                                                    p.default)(o, s) || n.dispatch((0,
                                                                    A.eventStateChanged)(c, o))
                                                            };
                                                            l.actionTypeId === T.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION ? (Array.isArray(f.config) ? f.config : [f.config]).forEach(_) : _()
                                                        }
                                                    }))
                                                },
                                                f = (0,
                                                    v.default)(c, Q),
                                                s = function (t) {
                                                    var e = t.target,
                                                        o = void 0 === e ? document : e,
                                                        r = t.types,
                                                        i = t.throttle;
                                                    r.split(" ").filter(Boolean).forEach((function (t) {
                                                        var e = i ? f : c;
                                                        o.addEventListener(t, e),
                                                            n.dispatch((0,
                                                                A.eventListenerAdded)(o, [t, e]))
                                                    }))
                                                };
                                            Array.isArray(r) ? r.forEach(s) : "string" == typeof r && s(e)
                                        }
                                    }({
                                        logic: o,
                                        store: t,
                                        events: e
                                    }) : console.warn("IX2 event type not configured: ".concat(n))
                                })),
                                t.getState().ixSession.eventListeners.length
                            }(n), -1 === (e = document.documentElement).className.indexOf(D) && (e.className += " ".concat(D)),
                            n.getState().ixSession.hasDefinedMediaQueries),
                        n.dispatch((0,
                            A.sessionStarted)()),
                        function (t, e) {
                            ! function n(o) {
                                var r = t.getState(),
                                    i = r.ixSession,
                                    u = r.ixParameters;
                                i.active && (t.dispatch((0,
                                        A.animationFrameChanged)(o, u)),
                                    e || requestAnimationFrame(n))
                            }(window.performance.now())
                        }(n, i))
            },
            e.stopEngine = function (t) {},
            e.stopAllActionGroups = function (t) {},
            e.stopActionGroup = function (t) {},
            e.startActionGroup = o;
        var c = a(n(30)),
            f = a(n(331)),
            s = (a(n(135)),
                a(n(50))),
            l = a(n(332)),
            E = a(n(338)),
            d = a(n(350)),
            _ = a(n(351)),
            I = a(n(352)),
            v = a(n(355)),
            p = a(n(144)),
            T = n(6),
            O = n(358),
            S = n(29),
            A = n(87),
            y = u(n(360)),
            R = a(n(361)),
            g = T.IX2EngineConstants,
            N = g.COLON_DELIMITER,
            C = g.BOUNDARY_SELECTOR,
            L = g.HTML_ELEMENT,
            m = g.RENDER_GENERAL,
            D = g.W_MOD_IX,
            h = S.IX2VanillaUtils,
            M = h.getAffectedElements,
            P = h.getElementId,
            b = h.getDestinationValues,
            F = h.observeStore,
            x = h.getInstanceId,
            X = h.renderHTMLElement,
            G = (h.clearAllStyles,
                h.getMaxDurationItemIndex),
            w = h.getComputedStyle,
            U = h.getInstanceOrigin,
            V = (h.reduceListToGroup,
                h.shouldNamespaceEventParameter,
                h.getNamespacedParameterId,
                h.shouldAllowMediaQuery),
            j = (h.cleanupHTMLElement,
                h.stringifyTarget,
                h.mediaQueriesEqual,
                S.IX2VanillaPlugins),
            H = j.isPluginType,
            B = j.createPluginInstance,
            W = j.getPluginDuration,
            Y = navigator.userAgent,
            K = Y.match(/iPad/i) || Y.match(/iPhone/),
            Q = 12,
            k = function (t, e) {
                return (0,
                    E.default)((0,
                    _.default)(t, e), d.default)
            },
            z = function (t, e) {
                (0,
                    I.default)(t, (function (t, n) {
                    t.forEach((function (t, o) {
                        e(t, n, n + N + o)
                    }))
                }))
            },
            Z = function (t) {
                var e = t.target,
                    n = t.targets;
                return n && n.length ? n.reduce((function (t, e) {}), []) : M({
                    config: {
                        target: e
                    },
                    elementApi: y
                })
            }
    }, function (t, e, n) {
        var o = n(147);
        t.exports = function (t, e, n) {
            "__proto__" == e && o ? o(t, e, {}) : t[e] = n
        }
    }, function (t, e, n) {
        var o = n(19),
            r = function () {
                try {
                    var t = o(Object, "defineProperty");
                    return t({}, "", {}),
                        t
                } catch (t) {}
            }();
        t.exports = r
    }, function (t, e, n) {
        var o = n(12),
            r = Object.create;
        t.exports = function (e) {
            if (!o(e))
                return {};
            if (r)
                return r(e);
            t.prototype = e;
            var n = new t;
            return t.prototype = void 0,
                n
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        n(287),
            t.exports = n(394)
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(95),
            i = n(172),
            u = n(12),
            a = n(97),
            c = Function.prototype,
            f = Object.prototype,
            s = c.toString,
            l = f.hasOwnProperty,
            E = RegExp("^" + s.call(l).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        t.exports = function (t) {
            return !(!u(t) || i(t)) && (o(t) ? E : r).test(a(t))
        }
    }, function (t, e, n) {}, function (t, e) {
        var n = Object.prototype.toString;
        t.exports = function (t) {
            return n.call(t)
        }
    }, function (t, e, n) {
        var o = n(173);
        /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || ""),
            t.exports = function (t) {}
    }, function (t, e, n) {}, function (t, e) {
        t.exports = function (t, e) {
            return null == t ? void 0 : t[e]
        }
    }, function (t, e, n) {
        n(0),
            t.exports = function () {}
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {
        t.exports = function (t, e) {
            for (var n = -1, o = null == t ? 0 : t.length; ++n < o;)
            ;
            return []
        }
    }, function (t, e) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(105)(Object.keys, Object);
        t.exports = o
    }, function (t, e, n) {
        var o = n(19)(n(10), "DataView");
        t.exports = o
    }, function (t, e, n) {
        var o = n(19)(n(10), "Promise");
        t.exports = o
    }, function (t, e, n) {
        var o = n(19)(n(10), "Set");
        t.exports = o
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(213),
            r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            i = /\\(\\)?/g,
            u = o((function (t) {
                var e = [];
                return 46 === t.charCodeAt(0) && e.push(""),
                    t.replace(r, (function (t, n, o, r) {
                        e.push(o ? r.replace(i, "$1") : n || t)
                    })),
                    e
            }));
        t.exports = u
    }, function (t, e, n) {
        var o = n(214);
        t.exports = function (t) {
            var e = o(t, (function (t) {
                    return 500 === n.size && n.clear(),
                        t
                })),
                n = e.cache;
            return e
        }
    }, function (t, e, n) {
        function o(t, e) {
            if ("function" != typeof t || null != e && "function" != typeof e)
                throw new TypeError(i);
            var n = function n() {
                var o = arguments,
                    r = e ? e.apply(this, o) : o[0],
                    i = n.cache;
                if (i.has(r))
                    return i.get(r);
                var u = t.apply(this, o);
                return n.cache = i.set(r, u) || i,
                    u
            };
            return n.cache = new(o.Cache || r),
                n
        }
        var r = n(60),
            i = "Expected a function";
        o.Cache = r,
            t.exports = o
    }, function (t, e, n) {
        var o = n(216);
        t.exports = function (t) {
            return null == t ? "" : o(t)
        }
    }, function (t, e, n) {
        var o = n(32),
            r = n(109),
            i = n(2),
            u = n(52),
            a = o ? o.prototype : void 0,
            c = a ? a.toString : void 0;
        t.exports = function t(e) {
            if ("string" == typeof e)
                return e;
            if (i(e))
                return r(e, t) + "";
            if (u(e))
                return c ? c.call(e) : "";
            var n = e + "";
            return "0" == n && 1 / e == -1 / 0 ? "-0" : n
        }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        var o = n(7),
            r = n(288);
        r.setEnv(o.env),
            o.define("ix2", t.exports = function () {
                return r
            })
    }, function (t, e, n) {
        function o() {
            (0,
                c.stopEngine)(s)
        }
        var r = n(40),
            i = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.setEnv = function (t) {
                t() && (0,
                    c.observeRequests)(s)
            },
            e.init = function (t) {
                o(),
                    (0,
                        c.startEngine)({
                        store: s,
                        rawData: t,
                        allowEvents: !0
                    })
            },
            e.destroy = o,
            e.actions = e.store = void 0,
            n(289);
        var u = n(128),
            a = i(n(303)),
            c = n(145),
            f = r(n(87));
        e.actions = f;
        var s = (0,
            u.createStore)(a.default);
        e.store = s
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        n.r(e);
        var o = n(130),
            r = n(295),
            i = n(296),
            u = o.default ? o.default.toStringTag : void 0;
        e.default = function (t) {
            return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : u && u in Object(t) ? Object(r.default)(t) : Object(i.default)(t)
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {
        n.r(e);
        var o = Object.prototype.toString;
        e.default = function (t) {
            return o.call(t)
        }
    }, function (t, e, n) {
        n.r(e);
        var o = n(298),
            r = Object(o.default)(Object.getPrototypeOf, Object);
        e.default = r
    }, function (t, e, n) {
        n.r(e),
            e.default = function (t, e) {
                return function (n) {
                    return t(e(n))
                }
            }
    }, function (e, n, o) {
        o.r(n),
            n.default = function (e) {
                return null != e && "object" == (void 0 === e ? "undefined" : t(e))
            }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = void 0;
        var o = n(128),
            r = n(304),
            i = n(310),
            u = n(311),
            a = n(29),
            c = n(329),
            f = n(330),
            s = a.IX2ElementsReducer.ixElements,
            l = (0,
                o.combineReducers)({
                ixData: r.ixData,
                ixRequest: i.ixRequest,
                ixSession: u.ixSession,
                ixElements: s,
                ixInstances: c.ixInstances,
                ixParameters: f.ixParameters
            });
        e.default = l
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.ixData = void 0;
        var o = n(6).IX2EngineActionTypes.IX2_RAW_DATA_IMPORTED;
        e.ixData = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.freeze({}),
                e = arguments.length > 1 ? arguments[1] : void 0;
            switch (e.type) {
                case o:
                    return e.payload.ixData || Object.freeze({});
                default:
                    return t
            }
        }
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.QuickEffectDirectionConsts = e.QuickEffectIds = e.EventLimitAffectedElements = e.EventContinuousMouseAxes = e.EventBasedOn = e.EventAppliesTo = e.EventTypeConsts = void 0,
            e.EventTypeConsts = {
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
            e.EventAppliesTo = {
                ELEMENT: "ELEMENT",
                CLASS: "CLASS",
                PAGE: "PAGE"
            },
            e.EventBasedOn = {
                ELEMENT: "ELEMENT",
                VIEWPORT: "VIEWPORT"
            },
            e.EventContinuousMouseAxes = {
                X_AXIS: "X_AXIS",
                Y_AXIS: "Y_AXIS"
            },
            e.EventLimitAffectedElements = {
                CHILDREN: "CHILDREN",
                SIBLINGS: "SIBLINGS",
                IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN"
            },
            e.QuickEffectIds = {
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
            e.QuickEffectDirectionConsts = {
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
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.ActionAppliesTo = e.ActionTypeConsts = void 0,
            e.ActionTypeConsts = {
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
            e.ActionAppliesTo = {
                ELEMENT: "ELEMENT",
                ELEMENT_CLASS: "ELEMENT_CLASS",
                TRIGGER_ELEMENT: "TRIGGER_ELEMENT"
            }
    }, function (t, e, n) {}, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.IX2_TEST_FRAME_RENDERED = e.IX2_MEDIA_QUERIES_DEFINED = e.IX2_VIEWPORT_WIDTH_CHANGED = e.IX2_ACTION_LIST_PLAYBACK_CHANGED = e.IX2_ELEMENT_STATE_CHANGED = e.IX2_INSTANCE_REMOVED = e.IX2_INSTANCE_STARTED = e.IX2_INSTANCE_ADDED = e.IX2_PARAMETER_CHANGED = e.IX2_ANIMATION_FRAME_CHANGED = e.IX2_EVENT_STATE_CHANGED = e.IX2_EVENT_LISTENER_ADDED = e.IX2_CLEAR_REQUESTED = e.IX2_STOP_REQUESTED = e.IX2_PLAYBACK_REQUESTED = e.IX2_PREVIEW_REQUESTED = e.IX2_SESSION_STOPPED = e.IX2_SESSION_STARTED = e.IX2_SESSION_INITIALIZED = e.IX2_RAW_DATA_IMPORTED = void 0,
            e.IX2_RAW_DATA_IMPORTED = "IX2_RAW_DATA_IMPORTED",
            e.IX2_SESSION_INITIALIZED = "IX2_SESSION_INITIALIZED",
            e.IX2_SESSION_STARTED = "IX2_SESSION_STARTED",
            e.IX2_SESSION_STOPPED = "IX2_SESSION_STOPPED",
            e.IX2_PREVIEW_REQUESTED = "IX2_PREVIEW_REQUESTED",
            e.IX2_PLAYBACK_REQUESTED = "IX2_PLAYBACK_REQUESTED",
            e.IX2_STOP_REQUESTED = "IX2_STOP_REQUESTED",
            e.IX2_CLEAR_REQUESTED = "IX2_CLEAR_REQUESTED",
            e.IX2_EVENT_LISTENER_ADDED = "IX2_EVENT_LISTENER_ADDED",
            e.IX2_EVENT_STATE_CHANGED = "IX2_EVENT_STATE_CHANGED",
            e.IX2_ANIMATION_FRAME_CHANGED = "IX2_ANIMATION_FRAME_CHANGED",
            e.IX2_PARAMETER_CHANGED = "IX2_PARAMETER_CHANGED",
            e.IX2_INSTANCE_ADDED = "IX2_INSTANCE_ADDED",
            e.IX2_INSTANCE_STARTED = "IX2_INSTANCE_STARTED",
            e.IX2_INSTANCE_REMOVED = "IX2_INSTANCE_REMOVED",
            e.IX2_ELEMENT_STATE_CHANGED = "IX2_ELEMENT_STATE_CHANGED",
            e.IX2_ACTION_LIST_PLAYBACK_CHANGED = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
            e.IX2_VIEWPORT_WIDTH_CHANGED = "IX2_VIEWPORT_WIDTH_CHANGED",
            e.IX2_MEDIA_QUERIES_DEFINED = "IX2_MEDIA_QUERIES_DEFINED",
            e.IX2_TEST_FRAME_RENDERED = "IX2_TEST_FRAME_RENDERED"
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.RENDER_PLUGIN = e.RENDER_STYLE = e.RENDER_GENERAL = e.RENDER_TRANSFORM = e.ABSTRACT_NODE = e.PLAIN_OBJECT = e.HTML_ELEMENT = e.PRESERVE_3D = e.PARENT = e.SIBLINGS = e.IMMEDIATE_CHILDREN = e.CHILDREN = e.BAR_DELIMITER = e.COLON_DELIMITER = e.COMMA_DELIMITER = e.AUTO = e.WILL_CHANGE = e.FLEX = e.DISPLAY = e.COLOR = e.BORDER_COLOR = e.BACKGROUND = e.BACKGROUND_COLOR = e.HEIGHT = e.WIDTH = e.FILTER = e.OPACITY = e.SKEW_Y = e.SKEW_X = e.SKEW = e.ROTATE_Z = e.ROTATE_Y = e.ROTATE_X = e.SCALE_3D = e.SCALE_Z = e.SCALE_Y = e.SCALE_X = e.TRANSLATE_3D = e.TRANSLATE_Z = e.TRANSLATE_Y = e.TRANSLATE_X = e.TRANSFORM = e.CONFIG_UNIT = e.CONFIG_Z_UNIT = e.CONFIG_Y_UNIT = e.CONFIG_X_UNIT = e.CONFIG_VALUE = e.CONFIG_Z_VALUE = e.CONFIG_Y_VALUE = e.CONFIG_X_VALUE = e.BOUNDARY_SELECTOR = e.W_MOD_IX = e.W_MOD_JS = e.WF_PAGE = e.IX2_ID_DELIMITER = void 0,
            e.IX2_ID_DELIMITER = "|",
            e.WF_PAGE = "data-wf-page",
            e.W_MOD_JS = "w-mod-js",
            e.W_MOD_IX = "w-mod-ix",
            e.BOUNDARY_SELECTOR = ".w-dyn-item",
            e.CONFIG_X_VALUE = "xValue",
            e.CONFIG_Y_VALUE = "yValue",
            e.CONFIG_Z_VALUE = "zValue",
            e.CONFIG_VALUE = "value",
            e.CONFIG_X_UNIT = "xUnit",
            e.CONFIG_Y_UNIT = "yUnit",
            e.CONFIG_Z_UNIT = "zUnit",
            e.CONFIG_UNIT = "unit",
            e.TRANSFORM = "transform",
            e.TRANSLATE_X = "translateX",
            e.TRANSLATE_Y = "translateY",
            e.TRANSLATE_Z = "translateZ",
            e.TRANSLATE_3D = "translate3d",
            e.SCALE_X = "scaleX",
            e.SCALE_Y = "scaleY",
            e.SCALE_Z = "scaleZ",
            e.SCALE_3D = "scale3d",
            e.ROTATE_X = "rotateX",
            e.ROTATE_Y = "rotateY",
            e.ROTATE_Z = "rotateZ",
            e.SKEW = "skew",
            e.SKEW_X = "skewX",
            e.SKEW_Y = "skewY",
            e.OPACITY = "opacity",
            e.FILTER = "filter",
            e.WIDTH = "width",
            e.HEIGHT = "height",
            e.BACKGROUND_COLOR = "backgroundColor",
            e.BACKGROUND = "background",
            e.BORDER_COLOR = "borderColor",
            e.COLOR = "color",
            e.DISPLAY = "display",
            e.FLEX = "flex",
            e.WILL_CHANGE = "willChange",
            e.AUTO = "AUTO",
            e.COMMA_DELIMITER = ",",
            e.COLON_DELIMITER = ":",
            e.BAR_DELIMITER = "|",
            e.CHILDREN = "CHILDREN",
            e.IMMEDIATE_CHILDREN = "IMMEDIATE_CHILDREN",
            e.SIBLINGS = "SIBLINGS",
            e.PARENT = "PARENT",
            e.PRESERVE_3D = "preserve-3d",
            e.HTML_ELEMENT = "HTML_ELEMENT",
            e.PLAIN_OBJECT = "PLAIN_OBJECT",
            e.ABSTRACT_NODE = "ABSTRACT_NODE",
            e.RENDER_TRANSFORM = "RENDER_TRANSFORM",
            e.RENDER_GENERAL = "RENDER_GENERAL",
            e.RENDER_STYLE = "RENDER_STYLE",
            e.RENDER_PLUGIN = "RENDER_PLUGIN"
    }, function (t, e, n) {}, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.ixSession = void 0;
        var o = n(6),
            r = n(41),
            i = o.IX2EngineActionTypes,
            u = i.IX2_SESSION_INITIALIZED,
            a = i.IX2_SESSION_STARTED,
            c = i.IX2_TEST_FRAME_RENDERED,
            f = i.IX2_SESSION_STOPPED,
            s = i.IX2_EVENT_LISTENER_ADDED,
            l = i.IX2_EVENT_STATE_CHANGED,
            E = i.IX2_ANIMATION_FRAME_CHANGED,
            d = i.IX2_ACTION_LIST_PLAYBACK_CHANGED,
            _ = i.IX2_VIEWPORT_WIDTH_CHANGED,
            I = i.IX2_MEDIA_QUERIES_DEFINED,
            v = {
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
        e.ixSession = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v,
                e = arguments.length > 1 ? arguments[1] : void 0;
            switch (e.type) {
                case u:
                    var n = e.payload.hasBoundaryNodes;
                    return (0,
                        r.set)(t, "hasBoundaryNodes", n);
                case a:
                    return (0,
                        r.set)(t, "active", !0);
                case c:
                    var o = e.payload.step,
                        i = void 0 === o ? 20 : o;
                    return (0,
                        r.set)(t, "tick", t.tick + i);
                case f:
                    return v;
                case E:
                    var p = e.payload.now;
                    return (0,
                        r.set)(t, "tick", p);
                case s:
                    var T = (0,
                        r.addLast)(t.eventListeners, e.payload);
                    return (0,
                        r.set)(t, "eventListeners", T);
                case l:
                    var O = e.payload,
                        S = O.stateKey,
                        A = O.newState;
                    return (0,
                        r.setIn)(t, ["eventState", S], A);
                case d:
                    var y = e.payload,
                        R = y.actionListId,
                        g = y.isPlaying;
                    return (0,
                        r.setIn)(t, ["playbackState", R], g);
                case _:
                    for (var N = e.payload, C = N.width, L = N.mediaQueries, m = L.length, D = null, h = 0; h < m; h++) {
                        var M = L[h],
                            P = M.key,
                            b = M.min,
                            F = M.max;
                        if (C >= b && C <= F) {
                            D = P;
                            break
                        }
                    }
                    return (0,
                        r.merge)(t, {
                        viewportWidth: C,
                        mediaQueryKey: D
                    });
                case I:
                    return (0,
                        r.set)(t, "hasDefinedMediaQueries", !0);
                default:
                    return t
            }
        }
    }, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {
        function o(t, e, n, o, r) {
            var u = n === c ? (0,
                i.getIn)(r, ["config", "target", "objectId"]) : null;
            return (0,
                i.mergeIn)(t, [o], {
                id: o,
                ref: e,
                refId: u,
                refType: n
            })
        }

        function r(t, e, n, o, r) {
            var u = function (t) {
                    var e = t.config;
                    return R.reduce((function (t, n) {
                        var o = n[0],
                            r = n[1],
                            i = e[o],
                            u = e[r];
                        return null != i && null != u && (t[r] = u),
                            t
                    }), {})
                }(r),
                a = [e, y, n];
            return (0,
                i.mergeIn)(t, a, o, u)
        }
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.createElementState = o,
            e.mergeActionState = r,
            e.ixElements = void 0;
        var i = n(41),
            u = n(6),
            a = u.IX2EngineConstants,
            c = (a.HTML_ELEMENT,
                a.PLAIN_OBJECT),
            f = (a.ABSTRACT_NODE,
                a.CONFIG_X_VALUE),
            s = a.CONFIG_Y_VALUE,
            l = a.CONFIG_Z_VALUE,
            E = a.CONFIG_VALUE,
            d = a.CONFIG_X_UNIT,
            _ = a.CONFIG_Y_UNIT,
            I = a.CONFIG_Z_UNIT,
            v = a.CONFIG_UNIT,
            p = u.IX2EngineActionTypes,
            T = p.IX2_SESSION_STOPPED,
            O = p.IX2_INSTANCE_ADDED,
            S = p.IX2_ELEMENT_STATE_CHANGED,
            A = {},
            y = "refState";
        e.ixElements = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : A,
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            switch (e.type) {
                case T:
                    return A;
                case O:
                    var n = e.payload,
                        u = n.elementId,
                        a = n.element,
                        c = n.origin,
                        f = n.actionItem,
                        s = n.refType,
                        l = f.actionTypeId,
                        E = t;
                    return (0,
                            i.getIn)(E, [u, a]) !== a && (E = o(E, a, s, u, f)),
                        r(E, u, l, c, f);
                case S:
                    var d = e.payload;
                    return r(t, d.elementId, d.actionTypeId, d.current, d.actionItem);
                default:
                    return t
            }
        };
        var R = [
            [f, d],
            [s, _],
            [l, I],
            [E, v]
        ]
    }, function (t, e, n) {}, function (t, e, n) {
        function o(t) {
            var e = (0,
                c.default)(t);
            return "string" === e ? {
                id: t
            } : null != t && "object" === e ? {
                id: t.id,
                objectId: t.objectId,
                selector: t.selector,
                selectorGuids: t.selectorGuids,
                appliesTo: t.appliesTo,
                useEventTarget: t.useEventTarget
            } : {}
        }
        var r, i, u, a = n(1),
            c = a(n(42)),
            f = a(n(31)),
            s = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.getInstanceId = function () {
                return "i" + ct++
            },
            e.getElementId = function (t, e) {
                for (var n in t) {
                    var o = t[n];
                    if (o && o.ref === e)
                        return o.id
                }
                return "e" + ft++
            },
            e.reifyState = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = t.events,
                    n = t.actionLists,
                    o = t.site,
                    r = (0,
                        E.default)(e, (function (t, e) {
                        var n = e.eventTypeId;
                        return t[n] || (t[n] = {}),
                            t[n][e.id] = e,
                            t
                    }), {}),
                    i = o && o.mediaQueries,
                    u = [];
                return i ? u = i.map((function (t) {})) : (i = [],
                    console.warn()), {
                    ixData: {
                        events: e,
                        actionLists: n,
                        eventTypeMap: r,
                        mediaQueries: i,
                        mediaQueryKeys: u
                    }
                }
            },
            e.observeStore = function (t) {
                var e = t.store,
                    n = t.select,
                    o = t.onChange,
                    r = t.comparator,
                    i = void 0 === r ? st : r,
                    u = e.getState,
                    a = (0,
                        e.subscribe)((function () {
                        var t = n(u());
                        null != t ? i(t, c) || o(c = t, e) : a()
                    })),
                    c = n(u());
                return a
            },
            e.getAffectedElements = function (t) {
                var e = t.config,
                    n = t.event,
                    r = t.eventTarget,
                    i = t.elementRoot,
                    u = t.elementApi;
                if (!u)
                    throw new Error("IX2 missing elementApi");
                var a = u.getValidDocument,
                    c = u.getQuerySelector,
                    f = u.queryDocument,
                    s = u.getChildElements,
                    l = u.getSiblingElements,
                    E = u.matchSelector,
                    I = u.elementContains,
                    p = (u.isSiblingNode,
                        e.target);
                if (!p)
                    return [];
                var T = o(p),
                    O = T.id,
                    S = T.objectId,
                    A = T.selector,
                    y = T.selectorGuids,
                    R = T.appliesTo,
                    g = T.useEventTarget;
                if (S)
                    return [at[S] || (at[S] = {})];
                if (R === _.EventAppliesTo.PAGE) {
                    var N = a(O);
                    return N ? [N] : []
                }
                var C, L, m, D = (0,
                        d.default)(n, "action.config.affectedElements", {})[O || A] || {},
                    h = Boolean(D.id || D.selector),
                    M = n && c(o(n.target));
                if (h ? (C = D.limitAffectedElements,
                        L = M,
                        m = c(D)) : L = m = c({
                        id: O,
                        selector: A,
                        selectorGuids: y
                    }),
                    n && g) {
                    var P = r && (m || !0 === g) ? [r] : f(M);
                    if (m) {
                        if (g === G)
                            return f(m).filter((function (t) {}));
                        if (g === F)
                            return f(m).filter((function (t) {
                                return P.some((function (e) {
                                    return I(e, t)
                                }))
                            }));
                        if (g === X)
                            return f(m).filter((function (t) {}))
                    }
                    return P
                }
                return null == L || null == m ? [] : v.IS_BROWSER_ENV && i ? f(m).filter((function (t) {})) : C === F ? f(L, m) : C === x ? s(f(L)).filter(E(m)) : C === X ? l(f(L)).filter(E(m)) : f(m)
            },
            e.getComputedStyle = function (t) {
                var e = t.element,
                    n = t.actionItem;
                if (!v.IS_BROWSER_ENV)
                    return {};
                switch (n.actionTypeId) {
                    case $:
                    case tt:
                    case et:
                    case nt:
                    case ot:
                        return window.getComputedStyle(e);
                    default:
                        return {}
                }
            },
            e.getInstanceOrigin = function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = arguments.length > 3 ? arguments[3] : void 0,
                    r = (arguments.length > 4 ? arguments[4] : void 0).getStyle,
                    i = o.actionTypeId,
                    u = o.config;
                if ((0,
                        I.isPluginType)(i))
                    return (0,
                        I.getPluginOrigin)(i)(e[i]);
                switch (i) {
                    case Q:
                    case k:
                    case z:
                    case Z:
                        return e[i] || _t[i];
                    case J:
                        return Et(e[i], o.config.filters);
                    case q:
                        return {
                            value: (0,
                                l.default)(parseFloat(r(t, L)), 1)
                        };
                    case $:
                        var a = r(t, D),
                            c = r(t, h);
                        return {
                            widthValue: u.widthUnit === V ? lt.test(a) ? parseFloat(a) : parseFloat(n.width) : (0,
                                l.default)(parseFloat(a), parseFloat(n.width)),
                            heightValue: u.heightUnit === V ? lt.test(c) ? parseFloat(c) : parseFloat(n.height) : (0,
                                l.default)(parseFloat(c), parseFloat(n.height))
                        };
                    case tt:
                    case et:
                    case nt:
                        return;
                    case ot:
                        return {
                            value: (0,
                                l.default)(r(t, w), n.display)
                        };
                    case rt:
                        return e[i] || {
                            value: 0
                        };
                    default:
                        return
                }
            },
            e.getDestinationValues = function (t) {
                var e = t.element,
                    n = t.actionItem,
                    o = t.elementApi,
                    r = n.actionTypeId;
                if ((0,
                        I.isPluginType)(r))
                    return (0,
                        I.getPluginDestination)(r)(n.config);
                switch (r) {
                    case Q:
                    case k:
                    case z:
                    case Z:
                        var i = n.config;
                        return {
                            xValue: i.xValue,
                            yValue: i.yValue,
                            zValue: i.zValue
                        };
                    case $:
                        var u = o.getStyle,
                            a = o.setStyle,
                            c = o.getProperty,
                            f = n.config,
                            s = f.widthUnit,
                            l = f.heightUnit,
                            E = n.config,
                            d = E.widthValue,
                            _ = E.heightValue;
                        if (!v.IS_BROWSER_ENV)
                            return {
                                widthValue: d,
                                heightValue: _
                            };
                        if (s === V) {
                            var p = u(e, D);
                            a(e, D, ""),
                                d = c(e, "offsetWidth"),
                                a(e, D, p)
                        }
                        if (l === V) {
                            var T = u(e, h);
                            a(e, h, ""),
                                _ = c(e, "offsetHeight"),
                                a(e, h, T)
                        }
                        return {
                            widthValue: d,
                            heightValue: _
                        };
                    case tt:
                    case et:
                    case nt:
                        var O = n.config;
                        return {
                            rValue: O.rValue,
                            gValue: O.gValue,
                            bValue: O.bValue,
                            aValue: O.aValue
                        };
                    case J:
                        return n.config.filters.reduce(dt, {});
                    default:
                        return {
                            value: n.config.value
                        }
                }
            },
            e.getRenderType = function (t) {
                return /^TRANSFORM_/.test(t) ? H : /^STYLE_/.test(t) ? W : /^GENERAL_/.test(t) ? B : /^PLUGIN_/.test(t) ? Y : void 0
            },
            e.getStyleProp = function (t, e) {
                return t === W ? e.replace("STYLE_", "").toLowerCase() : null
            },
            e.renderHTMLElement = function (t, e, n, o, r, i, u, a, c) {
                switch (a) {
                    case H:
                        return function (t, e, n, o, r) {
                            var i, u, a, c, f, s = It.map((function (t) {
                                    var n = _t[t],
                                        o = e[t] || {},
                                        r = o.xValue,
                                        i = void 0 === r ? n.xValue : r,
                                        u = o.yValue,
                                        a = void 0 === u ? n.yValue : u,
                                        c = o.zValue,
                                        f = void 0 === c ? n.zValue : c,
                                        s = o.xUnit,
                                        l = void 0 === s ? "" : s,
                                        E = o.yUnit,
                                        d = void 0 === E ? "" : E,
                                        _ = o.zUnit,
                                        I = void 0 === _ ? "" : _;
                                    switch (t) {
                                        case Q:
                                            return "".concat(S, "(").concat(i).concat(l, ", ").concat(a).concat(d, ", ").concat(f).concat(I, ")");
                                        case k:
                                            return "".concat(A, "(").concat(i).concat(l, ", ").concat(a).concat(d, ", ").concat(f).concat(I, ")");
                                        case z:
                                            return "".concat(y, "(").concat(i).concat(l, ") ").concat(R, "(").concat(a).concat(d, ") ").concat(g, "(").concat(f).concat(I, ")");
                                        case Z:
                                            return "".concat(N, "(").concat(i).concat(l, ", ").concat(a).concat(d, ")");
                                        default:
                                            return ""
                                    }
                                })).join(" "),
                                l = r.setStyle;
                            (function (t, e, n) {
                                if (v.IS_BROWSER_ENV) {
                                    var o = ut[e];
                                    if (o) {
                                        var r = n.getStyle,
                                            i = n.setStyle,
                                            u = r(t, U);
                                        if (u) {
                                            var a = u.split(j).map(it); -
                                            1 === a.indexOf(o) && i(t, U, a.concat(o).join(j))
                                        } else
                                            i(t, U, o)
                                    }
                                }
                            })(t, v.TRANSFORM_PREFIXED, r),
                            l(t, v.TRANSFORM_PREFIXED, s),
                                i = n,
                                u = o.actionTypeId,
                                a = i.xValue,
                                c = i.yValue,
                                f = i.zValue,
                                (u === Q && void 0 !== f || u === k && void 0 !== f || u === z && (void 0 !== a || void 0 !== c)) && l(t, v.TRANSFORM_STYLE_PREFIXED, C)
                        }(t, e, n, r, u);
                    case W:
                    case B:
                        return;
                    case Y:
                        var f = r.actionTypeId;
                        if ((0,
                                I.isPluginType)(f))
                            return (0,
                                I.renderPlugin)(f)(c, e, r)
                }
            },
            e.clearAllStyles = function (t) {},
            e.cleanupHTMLElement = function (t, e, n) {},
            e.getMaxDurationItemIndex = function (t) {
                var e = 0,
                    n = 0;
                return t.forEach((function (t, o) {
                        var r = t.config,
                            i = r.delay + r.duration;
                        i >= e && (e = i,
                            n = o)
                    })),
                    n
            },
            e.getActionListProgress = function (t, e) {},
            e.reduceListToGroup = function (t) {},
            e.shouldNamespaceEventParameter = function (t, e) {},
            e.getNamespacedParameterId = function (t, e) {},
            e.shouldAllowMediaQuery = function (t, e) {
                return null == e || -1 !== t.indexOf(e)
            },
            e.mediaQueriesEqual = function (t, e) {},
            e.stringifyTarget = function (t) {},
            e.getItemConfigByKey = void 0;
        var l = s(n(318)),
            E = s(n(319)),
            d = (s(n(325)),
                s(n(50))),
            _ = (n(41),
                s(n(144)),
                n(6)),
            I = (n(139),
                n(141)),
            v = n(86),
            p = _.IX2EngineConstants,
            T = p.BACKGROUND,
            O = p.TRANSFORM,
            S = p.TRANSLATE_3D,
            A = p.SCALE_3D,
            y = p.ROTATE_X,
            R = p.ROTATE_Y,
            g = p.ROTATE_Z,
            N = p.SKEW,
            C = p.PRESERVE_3D,
            L = (p.FLEX,
                p.OPACITY),
            m = p.FILTER,
            D = p.WIDTH,
            h = p.HEIGHT,
            M = p.BACKGROUND_COLOR,
            P = p.BORDER_COLOR,
            b = p.COLOR,
            F = p.CHILDREN,
            x = p.IMMEDIATE_CHILDREN,
            X = p.SIBLINGS,
            G = p.PARENT,
            w = p.DISPLAY,
            U = p.WILL_CHANGE,
            V = p.AUTO,
            j = p.COMMA_DELIMITER,
            H = (p.COLON_DELIMITER,
                p.BAR_DELIMITER,
                p.RENDER_TRANSFORM),
            B = p.RENDER_GENERAL,
            W = p.RENDER_STYLE,
            Y = p.RENDER_PLUGIN,
            K = _.ActionTypeConsts,
            Q = K.TRANSFORM_MOVE,
            k = K.TRANSFORM_SCALE,
            z = K.TRANSFORM_ROTATE,
            Z = K.TRANSFORM_SKEW,
            q = K.STYLE_OPACITY,
            J = K.STYLE_FILTER,
            $ = K.STYLE_SIZE,
            tt = K.STYLE_BACKGROUND_COLOR,
            et = K.STYLE_BORDER,
            nt = K.STYLE_TEXT_COLOR,
            ot = K.GENERAL_DISPLAY,
            rt = "OBJECT_VALUE",
            it = function (t) {
                return t.trim()
            },
            ut = (Object.freeze((r = {},
                    (0,
                        f.default)(r, tt, M),
                    (0,
                        f.default)(r, et, P),
                    (0,
                        f.default)(r, nt, b),
                    r)),
                Object.freeze((i = {},
                    (0,
                        f.default)(i, v.TRANSFORM_PREFIXED, O),
                    (0,
                        f.default)(i, M, T),
                    (0,
                        f.default)(i, L, L),
                    (0,
                        f.default)(i, m, m),
                    (0,
                        f.default)(i, D, D),
                    (0,
                        f.default)(i, h, h),
                    i))),
            at = {},
            ct = 1,
            ft = 1,
            st = function (t, e) {
                return t === e
            },
            lt = /px/,
            Et = function (t, e) {},
            dt = function (t, e) {};
        e.getItemConfigByKey = function (t, e, n) {};
        var _t = (u = {},
                (0,
                    f.default)(u, Q, Object.freeze({
                    xValue: 0,
                    yValue: 0,
                    zValue: 0
                })),
                (0,
                    f.default)(u, k, Object.freeze({
                    xValue: 1,
                    yValue: 1,
                    zValue: 1
                })),
                (0,
                    f.default)(u, z, Object.freeze({
                    xValue: 0,
                    yValue: 0,
                    zValue: 0
                })),
                (0,
                    f.default)(u, Z, Object.freeze({
                    xValue: 0,
                    yValue: 0
                })),
                u),
            It = (Object.freeze({
                    blur: 0,
                    "hue-rotate": 0,
                    invert: 0,
                    grayscale: 0,
                    saturate: 100,
                    sepia: 0,
                    contrast: 100,
                    brightness: 100
                }),
                Object.keys(_t));
        RegExp("rgba?".concat("\\(([^)]+)\\)"))
    }, function (t, e) {}, function (t, e, n) {
        var o = n(320),
            r = n(142),
            i = n(18),
            u = n(324),
            a = n(2);
        t.exports = function (t, e, n) {
            var c = a(t) ? o : u,
                f = arguments.length < 3;
            return c(t, i(e, 4), n, f, r)
        }
    }, function (t, e) {}, function (t, e, n) {
        var o = n(322)();
        t.exports = o
    }, function (t, e) {
        t.exports = function (t) {
            return function (e, n, o) {
                for (var r = -1, i = Object(e), u = o(e), a = u.length; a--;) {
                    var c = u[t ? a : ++r];
                    if (!1 === n(i[c], c, i))
                        break
                }
                return e
            }
        }
    }, function (t, e, n) {
        var o = n(25);
        t.exports = function (t, e) {
            return function (n, r) {
                if (null == n)
                    return n;
                if (!o(n))
                    return t(n, r);
                for (var i = n.length, u = e ? i : -1, a = Object(n);
                    (e ? u-- : ++u < i) && !1 !== r(a[u], u, a);)
                ;
                return n
            }
        }
    }, function (t, e) {
        t.exports = function (t, e, n, o, r) {
            return r(t, (function (t, r, i) {
                    n = o ? (o = !1,
                        t) : e(n, t, r, i)
                })),
                n
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {
        t.exports = function (t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    }, function (e, n, o) {
        function r(t, e) {
            return t === e ? 0 !== t || 0 !== e || 1 / t == 1 / e : t != t && e != e
        }
        var i = Object.prototype.hasOwnProperty;
        e.exports = function (e, n) {
            if (r(e, n))
                return !0;
            if ("object" != (void 0 === e ? "undefined" : t(e)) || null === e || "object" != (void 0 === n ? "undefined" : t(n)) || null === n)
                return !1;
            var o = Object.keys(e),
                u = Object.keys(n);
            if (o.length !== u.length)
                return !1;
            for (var a = 0; a < o.length; a++)
                if (!i.call(n, o[a]) || !r(e[o[a]], n[o[a]]))
                    return !1;
            return !0
        }
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.ixInstances = void 0;
        var o = n(6),
            r = n(29),
            i = n(41),
            u = o.IX2EngineActionTypes,
            a = u.IX2_RAW_DATA_IMPORTED,
            c = u.IX2_SESSION_STOPPED,
            f = u.IX2_INSTANCE_ADDED,
            s = u.IX2_INSTANCE_STARTED,
            l = u.IX2_INSTANCE_REMOVED,
            E = u.IX2_ANIMATION_FRAME_CHANGED,
            d = r.IX2EasingUtils,
            _ = d.optimizeFloat,
            I = d.applyEasing,
            v = d.createBezierEasing,
            p = o.IX2EngineConstants.RENDER_GENERAL,
            T = r.IX2VanillaUtils,
            O = (T.getItemConfigByKey,
                T.getRenderType),
            S = T.getStyleProp,
            A = function (t, e) {},
            y = function (t, e) {
                var n = t,
                    o = n.active,
                    r = n.origin,
                    u = n.start,
                    a = n.immediate,
                    c = n.renderType,
                    f = n.verbose,
                    s = n.actionItem,
                    l = n.destination,
                    E = n.destinationKeys,
                    d = n.pluginDuration,
                    v = n.instanceDelay,
                    T = n.customEasingFn,
                    O = s.config.easing,
                    S = s.config,
                    A = S.duration,
                    y = S.delay;
                null != d && (A = d),
                    y = null != v ? v : y,
                    c === p ? A = 0 : a && (A = y = 0);
                var R = e.payload.now;
                if (o && r) {
                    var g = R - (u + y);
                    if (f) {
                        var N = R - u,
                            C = A + y,
                            L = _(Math.min(Math.max(0, N / C), 1));
                        t = (0,
                            i.set)(t, "verboseTimeElapsed", C * L)
                    }
                    if (g < 0)
                        return t;
                    var m = _(Math.min(Math.max(0, g / A), 1)),
                        D = I(O, m, T),
                        h = {},
                        M = null;
                    return E.length && (M = E.reduce((function (t, e) {
                            var n = l[e],
                                o = parseFloat(r[e]) || 0,
                                i = (parseFloat(n) - o) * D + o;
                            return t[e] = i,
                                t
                        }), {})),
                        h.current = M,
                        h.position = m,
                        1 === m && (h.active = !1,
                            h.complete = !0),
                        (0,
                            i.merge)(t, h)
                }
                return t
            };
        e.ixInstances = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Object.freeze({}),
                e = arguments.length > 1 ? arguments[1] : void 0;
            switch (e.type) {
                case a:
                    return e.payload.ixInstances || Object.freeze({});
                case c:
                    return Object.freeze({});
                case f:
                    var n = e.payload,
                        o = n.instanceId,
                        r = n.elementId,
                        u = n.actionItem,
                        d = n.eventId,
                        _ = n.eventTarget,
                        I = n.eventStateKey,
                        p = n.actionListId,
                        T = n.groupIndex,
                        R = n.isCarrier,
                        g = n.origin,
                        N = n.destination,
                        C = n.immediate,
                        L = n.verbose,
                        m = n.continuous,
                        D = n.parameterId,
                        h = n.actionGroups,
                        M = n.smoothing,
                        P = n.restingValue,
                        b = n.pluginInstance,
                        F = n.pluginDuration,
                        x = n.instanceDelay,
                        X = u.actionTypeId,
                        G = O(X),
                        w = S(G, X),
                        U = Object.keys(N).filter((function (t) {
                            return null != N[t]
                        })),
                        V = u.config.easing;
                    return (0,
                        i.set)(t, o, {
                        id: o,
                        elementId: r,
                        active: !1,
                        position: 0,
                        start: 0,
                        origin: g,
                        destination: N,
                        destinationKeys: U,
                        immediate: C,
                        verbose: L,
                        current: null,
                        actionItem: u,
                        actionTypeId: X,
                        eventId: d,
                        eventTarget: _,
                        eventStateKey: I,
                        actionListId: p,
                        groupIndex: T,
                        renderType: G,
                        isCarrier: R,
                        styleProp: w,
                        continuous: m,
                        parameterId: D,
                        actionGroups: h,
                        smoothing: M,
                        restingValue: P,
                        pluginInstance: b,
                        pluginDuration: F,
                        instanceDelay: x,
                        customEasingFn: Array.isArray(V) && 4 === V.length ? v(V) : void 0
                    });
                case s:
                    var j = e.payload,
                        H = j.instanceId,
                        B = j.time;
                    return (0,
                        i.mergeIn)(t, [H], {
                        active: !0,
                        complete: !1,
                        start: B
                    });
                case l:
                    var W = e.payload.instanceId;
                    if (!t[W])
                        return t;
                    for (var Y = {}, K = Object.keys(t), Q = K.length, k = 0; k < Q; k++) {
                        var z = K[k];
                        z !== W && (Y[z] = t[z])
                    }
                    return Y;
                case E:
                    for (var Z = t, q = Object.keys(t), J = q.length, $ = 0; $ < J; $++) {
                        var tt = q[$],
                            et = t[tt],
                            nt = et.continuous ? A : y;
                        Z = (0,
                            i.set)(Z, tt, nt(et, e))
                    }
                    return Z;
                default:
                    return t
            }
        }
    }, function (t, e, n) {}, function (t, e) {
        t.exports = function (t, e) {
            if (null == t)
                return {};
            var n, o, r = {},
                i = Object.keys(t);
            for (o = 0; o < i.length; o++)
                n = i[o],
                e.indexOf(n) >= 0 || (r[n] = t[n]);
            return r
        }
    }, function (t, e, n) {
        var o = n(66),
            r = n(68),
            i = n(25),
            u = n(333),
            a = n(334);
        t.exports = function (t) {
            if (null == t)
                return 0;
            if (i(t))
                return u(t) ? a(t) : t.length;
            var e = r(t);
            return "[object Map]" == e || "[object Set]" == e ? t.size : o(t).length
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {
        var o = n(18),
            r = n(339),
            i = n(340);
        t.exports = function (t, e) {
            return i(t, r(o(e)))
        }
    }, function (t, e) {
        t.exports = function (t) {
            if ("function" != typeof t)
                throw new TypeError("Expected a function");
            return function () {
                var e = arguments;
                switch (e.length) {
                    case 0:
                        return !t.call(this);
                    case 1:
                        return !t.call(this, e[0]);
                    case 2:
                        return !t.call(this, e[0], e[1]);
                    case 3:
                        return !t.call(this, e[0], e[1], e[2])
                }
                return !t.apply(this, e)
            }
        }
    }, function (t, e, n) {
        var o = n(109),
            r = n(18),
            i = n(341),
            u = n(344);
        t.exports = function (t, e) {
            if (null == t)
                return {};
            var n = o(u(t), (function (t) {
                return [t]
            }));
            return e = r(e),
                i(t, n, (function (t, n) {
                    return e(t, n[0])
                }))
        }
    }, function (t, e, n) {
        var o = n(69),
            r = n(342),
            i = n(51);
        t.exports = function (t, e, n) {
            for (var u = -1, a = e.length, c = {}; ++u < a;) {
                var f = e[u],
                    s = o(t, f);
                n(s, f) && r(c, i(f, t), s)
            }
            return c
        }
    }, function (t, e, n) {
        var o = n(343),
            r = n(51),
            i = n(63),
            u = n(12),
            a = n(33);
        t.exports = function (t, e, n, c) {
            if (!u(t))
                return t;
            for (var f = -1, s = (e = r(e, t)).length, l = s - 1, E = t; null != E && ++f < s;) {
                var d = a(e[f]),
                    _ = n;
                if ("__proto__" === d || "constructor" === d || "prototype" === d)
                    return t;
                if (f != l) {
                    var I = E[d];
                    void 0 === (_ = c ? c(I, d, E) : void 0) && (_ = u(I) ? I : i(e[f + 1]) ? [] : {})
                }
                o(E, d, _),
                    E = E[d]
            }
            return t
        }
    }, function (t, e, n) {
        var o = n(146),
            r = n(58),
            i = Object.prototype.hasOwnProperty;
        t.exports = function (t, e, n) {
            var u = t[e];
            i.call(t, e) && r(u, n) && (void 0 !== n || e in t) || o(t, e, n)
        }
    }, function (t, e, n) {
        var o = n(100),
            r = n(345),
            i = n(347);
        t.exports = function (t) {
            return o(t, i, r)
        }
    }, function (t, e, n) {
        var o = n(61),
            r = n(346),
            i = n(101),
            u = n(102),
            a = Object.getOwnPropertySymbols ? function (t) {
                for (var e = []; t;)
                    o(e, i(t)),
                    t = r(t);
                return e
            } :
            u;
        t.exports = a
    }, function (t, e, n) {
        var o = n(105)(Object.getPrototypeOf, Object);
        t.exports = o
    }, function (t, e, n) {
        var o = n(103),
            r = n(348),
            i = n(25);
        t.exports = function (t) {
            return i(t) ? o(t, !0) : r(t)
        }
    }, function (t, e, n) {
        var o = n(12),
            r = n(67),
            i = n(349),
            u = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
            if (!o(t))
                return i(t);
            var e = r(t),
                n = [];
            for (var a in t)
                ("constructor" != a || !e && u.call(t, a)) && n.push(a);
            return n
        }
    }, function (t, e) {}, function (t, e, n) {
        var o = n(66),
            r = n(68),
            i = n(49),
            u = n(2),
            a = n(25),
            c = n(62),
            f = n(67),
            s = n(64),
            l = Object.prototype.hasOwnProperty;
        t.exports = function (t) {
            if (null == t)
                return !0;
            if (a(t) && (u(t) || "string" == typeof t || "function" == typeof t.splice || c(t) || s(t) || i(t)))
                return !t.length;
            var e = r(t);
            if ("[object Map]" == e || "[object Set]" == e)
                return !t.size;
            if (f(t))
                return !o(t).length;
            for (var n in t)
                if (l.call(t, n))
                    return !1;
            return !0
        }
    }, function (t, e, n) {
        var o = n(146),
            r = n(143),
            i = n(18);
        t.exports = function (t, e) {
            var n = {};
            return e = i(e, 3),
                r(t, (function (t, r, i) {
                    o(n, r, e(t, r, i))
                })),
                n
        }
    }, function (t, e, n) {
        var o = n(353),
            r = n(142),
            i = n(354),
            u = n(2);
        t.exports = function (t, e) {
            return (u(t) ? o : r)(t, i(e))
        }
    }, function (t, e) {}, function (t, e, n) {
        var o = n(71);
        t.exports = function (t) {
            return "function" == typeof t ? t : o
        }
    }, function (t, e, n) {
        var o = n(356),
            r = n(12);
        t.exports = function (t, e, n) {
            var i = !0,
                u = !0;
            if ("function" != typeof t)
                throw new TypeError("Expected a function");
            return r(n) && (i = "leading" in n ? !!n.leading : i,
                    u = "trailing" in n ? !!n.trailing : u),
                o(t, e, {
                    leading: i,
                    maxWait: e,
                    trailing: u
                })
        }
    }, function (t, e, n) {
        var o = n(12),
            r = n(357),
            i = n(72),
            u = Math.max;
        Math.min,
            t.exports = function (t, e, n) {
                function a(e) {
                    var n = l,
                        o = E;
                    return l = E = void 0,
                        p = e,
                        _ = t.apply(o, n)
                }

                function c(t) {
                    var n = t - v;
                    return void 0 === v || n >= e || n < 0 || O && t - p >= d
                }

                function f() {}

                function s() {
                    var t = r(),
                        n = c(t);
                    if (l = arguments,
                        E = this,
                        v = t,
                        n) {
                        if (void 0 === I)
                            return function (t) {
                                return p = t,
                                    I = setTimeout(f, e),
                                    T ? a(t) : _
                            }(v);
                        if (O)
                            return clearTimeout(I),
                                I = setTimeout(f, e),
                                a(v)
                    }
                    return void 0 === I && (I = setTimeout(f, e)),
                        _
                }
                var l, E, d, _, I, v, p = 0,
                    T = !1,
                    O = !1,
                    S = !0;
                if ("function" != typeof t)
                    throw new TypeError("Expected a function");
                return e = i(e) || 0,
                    o(n) && (T = !!n.leading,
                        d = (O = "maxWait" in n) ? u(i(n.maxWait) || 0, e) : d,
                        S = "trailing" in n ? !!n.trailing : S),
                    s.cancel = function () {},
                    s.flush = function () {},
                    s
            }
    }, function (t, e, n) {
        var o = n(10);
        t.exports = function () {
            return o.Date.now()
        }
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(359);
        Object.keys(o).forEach((function (t) {
            "default" !== t && "__esModule" !== t && Object.defineProperty(e, t, {
                enumerable: !0,
                get: function () {
                    return o[t]
                }
            })
        }))
    }, function (t, e, n) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.isQuickEffect = void 0;
        var o = n(6),
            r = Object.keys(o.QuickEffectIds);
        e.isQuickEffect = function (t) {
            return r.includes(t)
        }
    }, function (t, e, n) {
        var o = n(1)(n(42));
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.setStyle = function (t, e, n) {
                t.style[e] = n
            },
            e.getStyle = function (t, e) {
                return t.style[e]
            },
            e.getProperty = function (t, e) {},
            e.matchSelector = function (t) {},
            e.getQuerySelector = function (t) {
                var e = t.id,
                    n = t.selector;
                if (e) {
                    var o = e;
                    if (-1 !== e.indexOf(a)) {
                        var r = e.split(a),
                            i = r[0];
                        if (o = r[1],
                            i !== document.documentElement.getAttribute(s))
                            return null
                    }
                    return '[data-w-id^="'.concat(o, '"]')
                }
                return n
            },
            e.queryDocument = function (t, e) {
                return Array.prototype.slice.call(document.querySelectorAll(e ? t + " " + e : t))
            },
            e.elementContains = function (t, e) {
                return t.contains(e)
            },
            e.isSiblingNode = function (t, e) {},
            e.getChildElements = function (t) {},
            e.getSiblingElements = function () {},
            e.getRefType = function (t) {
                return null != t && "object" == (0,
                    o.default)(t) ? t instanceof Element ? c : f : null
            },
            e.getClosestElement = void 0;
        var r = n(29),
            i = n(6),
            u = (r.IX2BrowserSupport.ELEMENT_MATCHES,
                i.IX2EngineConstants),
            a = u.IX2_ID_DELIMITER,
            c = u.HTML_ELEMENT,
            f = u.PLAIN_OBJECT,
            s = u.WF_PAGE,
            l = (Element.prototype.closest,
                function (t, e) {}
            );
        e.getClosestElement = l
    }, function (t, e, n) {
        var o, r = n(1),
            i = r(n(31)),
            u = r(n(42)),
            a = n(1);
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.default = void 0;
        var c, f, s, l = a(n(30)),
            E = a(n(362)),
            d = a(n(50)),
            _ = a(n(381)),
            I = n(6),
            v = n(145),
            p = (n(87),
                n(29)),
            T = I.EventTypeConsts,
            O = T.MOUSE_CLICK,
            S = T.MOUSE_SECOND_CLICK,
            A = T.MOUSE_DOWN,
            y = T.MOUSE_UP,
            R = T.MOUSE_OVER,
            g = T.MOUSE_OUT,
            N = T.DROPDOWN_CLOSE,
            C = T.DROPDOWN_OPEN,
            L = T.SLIDER_ACTIVE,
            m = T.SLIDER_INACTIVE,
            D = T.TAB_ACTIVE,
            h = T.TAB_INACTIVE,
            M = T.NAVBAR_CLOSE,
            P = T.NAVBAR_OPEN,
            b = T.MOUSE_MOVE,
            F = T.PAGE_SCROLL_DOWN,
            x = T.SCROLL_INTO_VIEW,
            X = T.SCROLL_OUT_OF_VIEW,
            G = T.PAGE_SCROLL_UP,
            w = T.SCROLLING_IN_VIEW,
            U = T.PAGE_FINISH,
            V = T.ECOMMERCE_CART_CLOSE,
            j = T.ECOMMERCE_CART_OPEN,
            H = T.PAGE_START,
            B = T.PAGE_SCROLL,
            W = I.IX2EngineConstants.COLON_DELIMITER,
            Y = (p.IX2VanillaUtils.getNamespacedParameterId,
                function (t) {
                    return function (e) {
                        return !("object" !== (0,
                            u.default)(e) || !t(e)) || e
                    }
                }
            ),
            K = Y((function (t) {
                return t.element === t.nativeEvent.target
            })),
            Q = Y((function (t) {
                var e = t.element,
                    n = t.nativeEvent;
                return e.contains(n.target)
            })),
            k = (0,
                E.default)([K, Q]),
            z = function (t, e) {
                var n = t.store,
                    o = t.event,
                    r = t.element,
                    i = t.eventStateKey,
                    u = o.action,
                    a = o.id,
                    c = u.config,
                    f = c.actionListId,
                    s = c.autoStopEventId,
                    l = function (t, e) {
                        if (e) {
                            var n = t.getState().ixData.events[e];
                            if (n && !tt[n.eventTypeId])
                                return n
                        }
                        return null
                    }(n, s);
                return l && (0,
                        v.stopActionGroup)({
                        store: n,
                        eventId: s,
                        eventTarget: r,
                        eventStateKey: s + W + i.split(W)[1],
                        actionListId: (0,
                            d.default)(l, "action.config.actionListId")
                    }),
                    (0,
                        v.stopActionGroup)({
                        store: n,
                        eventId: a,
                        eventTarget: r,
                        eventStateKey: i,
                        actionListId: f
                    }),
                    (0,
                        v.startActionGroup)({
                        store: n,
                        eventId: a,
                        eventTarget: r,
                        eventStateKey: i,
                        actionListId: f
                    }),
                    e
            },
            Z = function (t, e) {
                return function (n, o) {
                    return !0 === t(n, o) ? e(n, o) : o
                }
            },
            q = {
                handler: Z(k, z)
            },
            J = (0,
                l.default)({}, q, {
                types: ["COMPONENT_ACTIVE", "COMPONENT_INACTIVE"].join(" ")
            }),
            $ = {
                types: [{
                    target: window,
                    types: "resize orientationchange",
                    throttle: !0
                }, {
                    target: document,
                    types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
                    throttle: !0
                }]
            },
            tt = {
                PAGE_START: H,
                PAGE_FINISH: U
            },
            et = (c = void 0 !== window.pageXOffset,
                f = "CSS1Compat" === document.compatMode ? document.documentElement : document.body,
                function () {
                    return {
                        scrollLeft: c ? window.pageXOffset : f.scrollLeft,
                        scrollTop: c ? window.pageYOffset : f.scrollTop,
                        stiffScrollTop: (0,
                            _.default)(c ? window.pageYOffset : f.scrollTop, 0, f.scrollHeight - window.innerHeight),
                        scrollWidth: f.scrollWidth,
                        scrollHeight: f.scrollHeight,
                        clientWidth: f.clientWidth,
                        clientHeight: f.clientHeight,
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight
                    }
                }
            ),
            nt = function (t) {
                var e = t.element,
                    n = t.nativeEvent,
                    o = n.type,
                    r = n.target,
                    i = n.relatedTarget,
                    u = e.contains(r);
                if ("mouseover" === o && u)
                    return !0;
                var a = e.contains(i);
                return !("mouseout" !== o || !u || !a)
            },
            ot = function (t) {
                var e, n, o = t.element,
                    r = t.event.config,
                    i = et(),
                    u = i.clientWidth,
                    a = i.clientHeight,
                    c = r.scrollOffsetValue,
                    f = "PX" === r.scrollOffsetUnit ? c : a * (c || 0) / 100;
                return n = {
                    left: 0,
                    top: f,
                    right: u,
                    bottom: a - f
                }, !((e = o.getBoundingClientRect()).left > n.right || e.right < n.left || e.top > n.bottom || e.bottom < n.top)
            },
            rt = function (t) {
                return function (e, n) {
                    var o = {
                        elementHovered: nt(e)
                    };
                    return (n ? o.elementHovered !== n.elementHovered : o.elementHovered) && t(e, o) || o
                }
            },
            it = function () {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return (0,
                    l.default)({}, J, {
                    handler: Z(t ? k : K, void 0)
                })
            },
            ut = function () {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return (0,
                    l.default)({}, J, {
                    handler: Z(t ? k : K, void 0)
                })
            },
            at = (0,
                l.default)({}, $, {
                handler: (s = function (t, e) {
                        var n = e.elementVisible,
                            o = t.event;
                        return !t.store.getState().ixData.events[o.action.config.autoStopEventId] && e.triggered ? e : o.eventTypeId === x === n ? (z(t),
                            (0,
                                l.default)({}, e, {
                                triggered: !0
                            })) : e
                    },
                    function (t, e) {
                        var n = (0,
                            l.default)({}, e, {
                            elementVisible: ot(t)
                        });
                        return (e ? n.elementVisible !== e.elementVisible : n.elementVisible) && s(t, n) || n
                    }
                )
            }),
            ct = (o = {},
                (0,
                    i.default)(o, L, it()),
                (0,
                    i.default)(o, m, ut()),
                (0,
                    i.default)(o, C, it()),
                (0,
                    i.default)(o, N, ut()),
                (0,
                    i.default)(o, P, it(!1)),
                (0,
                    i.default)(o, M, ut(!1)),
                (0,
                    i.default)(o, D, it()),
                (0,
                    i.default)(o, h, ut()),
                (0,
                    i.default)(o, j, {}),
                (0,
                    i.default)(o, V, {}),
                (0,
                    i.default)(o, O, {}),
                (0,
                    i.default)(o, S, {}),
                (0,
                    i.default)(o, A, (0,
                    l.default)({}, q, {
                    types: "mousedown"
                })),
                (0,
                    i.default)(o, y, (0,
                    l.default)({}, q, {
                    types: "mouseup"
                })),
                (0,
                    i.default)(o, R, {
                    types: "mouseover mouseout",
                    handler: Z(k, rt((function (t, e) {
                        e.elementHovered && z(t)
                    })))
                }),
                (0,
                    i.default)(o, g, {
                    types: "mouseover mouseout",
                    handler: Z(k, rt((function (t, e) {
                        e.elementHovered || z(t)
                    })))
                }),
                (0,
                    i.default)(o, b, {}),
                (0,
                    i.default)(o, B, {}),
                (0,
                    i.default)(o, w, {}),
                (0,
                    i.default)(o, x, at),
                (0,
                    i.default)(o, X, at),
                (0,
                    i.default)(o, F, (0,
                    l.default)({}, $, {})),
                (0,
                    i.default)(o, G, (0,
                    l.default)({}, $, {})),
                (0,
                    i.default)(o, U, {}),
                (0,
                    i.default)(o, H, {}),
                o);
        e.default = ct
    }, function (t, e, n) {
        var o = n(363)();
        t.exports = o
    }, function (t, e, n) {
        var o = n(88),
            r = n(364),
            i = n(149),
            u = n(150),
            a = n(2),
            c = n(377);
        t.exports = function (t) {
            return r((function (e) {
                var n = e.length,
                    r = n,
                    f = o.prototype.thru;
                for (t && e.reverse(); r--;) {
                    var s = e[r];
                    if ("function" != typeof s)
                        throw new TypeError("Expected a function");
                    if (f && !l && "wrapper" == u(s))
                        var l = new o([], !0)
                }
                for (r = l ? r : n; ++r < n;) {
                    s = e[r];
                    var E = u(s),
                        d = "wrapper" == E ? i(s) : void 0;
                    l = d && c(d[0]) && 424 == d[1] && !d[4].length && 1 == d[9] ? l[u(d[0])].apply(l, d[3]) : 1 == s.length && c(s) ? l[E]() : l.thru(s)
                }
                return function () {
                    var t = arguments,
                        o = t[0];
                    if (l && 1 == t.length && a(o))
                        return l.plant(o).value();
                    for (var r = 0, i = n ? e[r].apply(this, t) : o; ++r < n;)
                        i = e[r].call(this, i);
                    return i
                }
            }))
        }
    }, function (t, e, n) {
        var o = n(365),
            r = n(368),
            i = n(370);
        t.exports = function (t) {
            return i(r(t, void 0, o), t + "")
        }
    }, function (t, e, n) {
        var o = n(366);
        t.exports = function (t) {
            return null != t && t.length ? o(t, 1) : []
        }
    }, function (t, e, n) {
        var o = n(61),
            r = n(367);
        t.exports = function t(e, n, i, u, a) {
            var c = -1,
                f = e.length;
            for (i || (i = r),
                a || (a = []); ++c < f;) {
                var s = e[c];
                n > 0 && i(s) ? n > 1 ? t(s, n - 1, i, u, a) : o(a, s) : u || (a[a.length] = s)
            }
            return a
        }
    }, function (t, e, n) {
        var o = n(32),
            r = n(49),
            i = n(2),
            u = o ? o.isConcatSpreadable : void 0;
        t.exports = function (t) {
            return i(t) || r(t) || !!(u && t && t[u])
        }
    }, function (t, e, n) {
        var o = n(369),
            r = Math.max;
        t.exports = function (t, e, n) {
            return e = r(void 0 === e ? t.length - 1 : e, 0),
                function () {
                    for (var i = arguments, u = -1, a = r(i.length - e, 0), c = Array(a); ++u < a;)
                        c[u] = i[e + u];
                    u = -1;
                    for (var f = Array(e + 1); ++u < e;)
                        f[u] = i[u];
                    return f[e] = n(c),
                        o(t, this, f)
                }
        }
    }, function (t, e) {
        t.exports = function (t, e, n) {
            switch (n.length) {
                case 0:
                    return t.call(e);
                case 1:
                    return t.call(e, n[0]);
                case 2:
                    return t.call(e, n[0], n[1]);
                case 3:
                    return t.call(e, n[0], n[1], n[2])
            }
            return t.apply(e, n)
        }
    }, function (t, e, n) {
        var o = n(371),
            r = n(373)(o);
        t.exports = r
    }, function (t, e, n) {
        var o = n(372),
            r = n(147),
            i = n(71),
            u = r ? function (t, e) {
                return r(t, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: o(e),
                    writable: !0
                })
            } :
            i;
        t.exports = u
    }, function (t, e) {
        t.exports = function (t) {}
    }, function (t, e) {
        var n = Date.now;
        t.exports = function (t) {
            var e = 0,
                o = 0;
            return function () {
                var r = n(),
                    i = 16 - (r - o);
                if (o = r,
                    i > 0) {
                    if (++e >= 800)
                        return arguments[0]
                } else
                    e = 0;
                return t.apply(void 0, arguments)
            }
        }
    }, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e, n) {
        var o = n(382),
            r = n(72);
        t.exports = function (t, e, n) {
            return void 0 === n && (n = e,
                    e = void 0),
                void 0 !== n && (n = (n = r(n)) == n ? n : 0),
                void 0 !== e && (e = (e = r(e)) == e ? e : 0),
                o(r(t), e, n)
        }
    }, function (t, e) {
        t.exports = function (t, e, n) {
            return t == t && (void 0 !== n && (t = t <= n ? t : n),
                    void 0 !== e && (t = t >= e ? t : e)),
                t
        }
    }, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e) {}, function (t, e) {}, function (t, e) {}, function (t, e, n) {}, function (t, e, n) {}, function (t, e, n) {}]),
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
    })

  

/*
*   Stripe WebGl Gradient Animation
*   All Credits to Stripe.com
*   ScrollObserver functionality to disable animation when not scrolled into view has been disabled and 
*   commented out for now.
*   https://kevinhufnagl.com
*/


//Converting colors to proper format
function normalizeColor(hexCode) {
  return [(hexCode >> 16 & 255) / 255, (hexCode >> 8 & 255) / 255, (255 & hexCode) / 255]
} ["SCREEN", "LINEAR_LIGHT"].reduce((hexCode, t, n) => Object.assign(hexCode, {
  [t]: n
}), {});

//Essential functionality of WebGl
//t = width
//n = height
class MiniGl {
  constructor(canvas, width, height, debug = false) {
      const _miniGl = this,
          debug_output = -1 !== document.location.search.toLowerCase().indexOf("debug=webgl");
      _miniGl.canvas = canvas, _miniGl.gl = _miniGl.canvas.getContext("webgl", {
          antialias: true
      }), _miniGl.meshes = [];
      const context = _miniGl.gl;
      width && height && this.setSize(width, height), _miniGl.lastDebugMsg, _miniGl.debug = debug && debug_output ? function(e) {
          const t = new Date;
          t - _miniGl.lastDebugMsg > 1e3 && console.log("---"), console.log(t.toLocaleTimeString() + Array(Math.max(0, 32 - e.length)).join(" ") + e + ": ", ...Array.from(arguments).slice(1)), _miniGl.lastDebugMsg = t
      } : () => {}, Object.defineProperties(_miniGl, {
          Material: {
              enumerable: false,
              value: class {
                  constructor(vertexShaders, fragments, uniforms = {}) {
                      const material = this;
                      function getShaderByType(type, source) {
                          const shader = context.createShader(type);
                          return context.shaderSource(shader, source), context.compileShader(shader), context.getShaderParameter(shader, context.COMPILE_STATUS) || console.error(context.getShaderInfoLog(shader)), _miniGl.debug("Material.compileShaderSource", {
                              source: source
                          }), shader
                      }
                      function getUniformVariableDeclarations(uniforms, type) {
                          return Object.entries(uniforms).map(([uniform, value]) => value.getDeclaration(uniform, type)).join("\n")
                      }
                      material.uniforms = uniforms, material.uniformInstances = [];

                      const prefix = "\n              precision highp float;\n            ";
                      material.vertexSource = `\n              ${prefix}\n              attribute vec4 position;\n              attribute vec2 uv;\n              attribute vec2 uvNorm;\n              ${getUniformVariableDeclarations(_miniGl.commonUniforms,"vertex")}\n              ${getUniformVariableDeclarations(uniforms,"vertex")}\n              ${vertexShaders}\n            `,
                      material.Source = `\n              ${prefix}\n              ${getUniformVariableDeclarations(_miniGl.commonUniforms,"fragment")}\n              ${getUniformVariableDeclarations(uniforms,"fragment")}\n              ${fragments}\n            `,
                      material.vertexShader = getShaderByType(context.VERTEX_SHADER, material.vertexSource),
                      material.fragmentShader = getShaderByType(context.FRAGMENT_SHADER, material.Source),
                      material.program = context.createProgram(),
                      context.attachShader(material.program, material.vertexShader),
                      context.attachShader(material.program, material.fragmentShader),
                      context.linkProgram(material.program),
                      context.getProgramParameter(material.program, context.LINK_STATUS) || console.error(context.getProgramInfoLog(material.program)),
                      context.useProgram(material.program),
                      material.attachUniforms(void 0, _miniGl.commonUniforms),
                      material.attachUniforms(void 0, material.uniforms)
                  }
                  //t = uniform
                  attachUniforms(name, uniforms) {
                      //n  = material
                      const material = this;
                      void 0 === name ? Object.entries(uniforms).forEach(([name, uniform]) => {
                          material.attachUniforms(name, uniform)
                      }) : "array" == uniforms.type ? uniforms.value.forEach((uniform, i) => material.attachUniforms(`${name}[${i}]`, uniform)) : "struct" == uniforms.type ? Object.entries(uniforms.value).forEach(([uniform, i]) => material.attachUniforms(`${name}.${uniform}`, i)) : (_miniGl.debug("Material.attachUniforms", {
                          name: name,
                          uniform: uniforms
                      }), material.uniformInstances.push({
                          uniform: uniforms,
                          location: context.getUniformLocation(material.program, name)
                      }))
                  }
              }
          },
          Uniform: {
              enumerable: !1,
              value: class {
                  constructor(e) {
                      this.type = "float", Object.assign(this, e);
                      this.typeFn = {
                          float: "1f",
                          int: "1i",
                          vec2: "2fv",
                          vec3: "3fv",
                          vec4: "4fv",
                          mat4: "Matrix4fv"
                      } [this.type] || "1f", this.update()
                  }
                  update(value) {
                      void 0 !== this.value && context[`uniform${this.typeFn}`](value, 0 === this.typeFn.indexOf("Matrix") ? this.transpose : this.value, 0 === this.typeFn.indexOf("Matrix") ? this.value : null)
                  }
                  //e - name
                  //t - type
                  //n - length
                  getDeclaration(name, type, length) {
                      const uniform = this;
                      if (uniform.excludeFrom !== type) {
                          if ("array" === uniform.type) return uniform.value[0].getDeclaration(name, type, uniform.value.length) + `\nconst int ${name}_length = ${uniform.value.length};`;
                          if ("struct" === uniform.type) {
                              let name_no_prefix = name.replace("u_", "");
                              return name_no_prefix = 
                                name_no_prefix.charAt(0).toUpperCase() + 
                                name_no_prefix.slice(1), 
                                `uniform struct ${name_no_prefix} 
                                {\n` + 
                                Object.entries(uniform.value).map(([name, uniform]) => 
                                uniform.getDeclaration(name, type)
                                .replace(/^uniform/, ""))
                                .join("") 
                                + `\n} ${name}${length>0?`[${length}]`:""};`
                          }
                          return `uniform ${uniform.type} ${name}${length>0?`[${length}]`:""};`
                      }
                  }
              }
          },
          PlaneGeometry: {
              enumerable: !1,
              value: class {
                  constructor(width, height, n, i, orientation) {
                    context.createBuffer(), this.attributes = {
                          position: new _miniGl.Attribute({
                              target: context.ARRAY_BUFFER,
                              size: 3
                          }),
                          uv: new _miniGl.Attribute({
                              target: context.ARRAY_BUFFER,
                              size: 2
                          }),
                          uvNorm: new _miniGl.Attribute({
                              target: context.ARRAY_BUFFER,
                              size: 2
                          }),
                          index: new _miniGl.Attribute({
                              target: context.ELEMENT_ARRAY_BUFFER,
                              size: 3,
                              type: context.UNSIGNED_SHORT
                          })
                      }, this.setTopology(n, i), this.setSize(width, height, orientation)
                  }
                  setTopology(e = 1, t = 1) {
                      const n = this;
                      n.xSegCount = e, n.ySegCount = t, n.vertexCount = (n.xSegCount + 1) * (n.ySegCount + 1), n.quadCount = n.xSegCount * n.ySegCount * 2, n.attributes.uv.values = new Float32Array(2 * n.vertexCount), n.attributes.uvNorm.values = new Float32Array(2 * n.vertexCount), n.attributes.index.values = new Uint16Array(3 * n.quadCount);
                      for (let e = 0; e <= n.ySegCount; e++)
                          for (let t = 0; t <= n.xSegCount; t++) {
                              const i = e * (n.xSegCount + 1) + t;
                              if (n.attributes.uv.values[2 * i] = t / n.xSegCount, n.attributes.uv.values[2 * i + 1] = 1 - e / n.ySegCount, n.attributes.uvNorm.values[2 * i] = t / n.xSegCount * 2 - 1, n.attributes.uvNorm.values[2 * i + 1] = 1 - e / n.ySegCount * 2, t < n.xSegCount && e < n.ySegCount) {
                                  const s = e * n.xSegCount + t;
                                  n.attributes.index.values[6 * s] = i, n.attributes.index.values[6 * s + 1] = i + 1 + n.xSegCount, n.attributes.index.values[6 * s + 2] = i + 1, n.attributes.index.values[6 * s + 3] = i + 1, n.attributes.index.values[6 * s + 4] = i + 1 + n.xSegCount, n.attributes.index.values[6 * s + 5] = i + 2 + n.xSegCount
                              }
                          }
                      n.attributes.uv.update(), n.attributes.uvNorm.update(), n.attributes.index.update(), _miniGl.debug("Geometry.setTopology", {
                          uv: n.attributes.uv,
                          uvNorm: n.attributes.uvNorm,
                          index: n.attributes.index
                      })
                  }
                  setSize(width = 1, height = 1, orientation = "xz") {
                      const geometry = this;
                      geometry.width = width,
                      geometry.height = height,
                      geometry.orientation = orientation,
                      geometry.attributes.position.values && geometry.attributes.position.values.length === 3 * geometry.vertexCount 
                      || (geometry.attributes.position.values = new Float32Array(3 * geometry.vertexCount));
                      const o = width / -2,
                          r = height / -2,
                          segment_width = width / geometry.xSegCount,
                          segment_height = height / geometry.ySegCount;
                      for (let yIndex= 0; yIndex <= geometry.ySegCount; yIndex++) {
                          const t = r + yIndex * segment_height;
                          for (let xIndex = 0; xIndex <= geometry.xSegCount; xIndex++) {
                              const r = o + xIndex * segment_width,
                                  l = yIndex * (geometry.xSegCount + 1) + xIndex;
                              geometry.attributes.position.values[3 * l + "xyz".indexOf(orientation[0])] = r, 
                              geometry.attributes.position.values[3 * l + "xyz".indexOf(orientation[1])] = -t
                          }
                      }
                      geometry.attributes.position.update(), _miniGl.debug("Geometry.setSize", {
                          position: geometry.attributes.position
                      })
                  }
              }
          },
          Mesh: {
              enumerable: !1,
              value: class {
                  constructor(geometry, material) {
                      const mesh = this;
                      mesh.geometry = geometry, mesh.material = material, mesh.wireframe = !1, mesh.attributeInstances = [], Object.entries(mesh.geometry.attributes).forEach(([e, attribute]) => {
                          mesh.attributeInstances.push({
                              attribute: attribute,
                              location: attribute.attach(e, mesh.material.program)
                          })
                      }), _miniGl.meshes.push(mesh), _miniGl.debug("Mesh.constructor", {
                          mesh: mesh
                      })
                  }
                  draw() {
                    context.useProgram(this.material.program), this.material.uniformInstances.forEach(({
                          uniform: e,
                          location: t
                      }) => e.update(t)), this.attributeInstances.forEach(({
                          attribute: e,
                          location: t
                      }) => e.use(t)), context.drawElements(this.wireframe ? context.LINES : context.TRIANGLES, this.geometry.attributes.index.values.length, context.UNSIGNED_SHORT, 0)
                  }
                  remove() {
                      _miniGl.meshes = _miniGl.meshes.filter(e => e != this)
                  }
              }
          },
          Attribute: {
              enumerable: !1,
              value: class {
                  constructor(e) {
                      this.type = context.FLOAT, this.normalized = !1, this.buffer = context.createBuffer(), Object.assign(this, e), this.update()
                  }
                  update() {
                      void 0 !== this.values && (context.bindBuffer(this.target, this.buffer), context.bufferData(this.target, this.values, context.STATIC_DRAW))
                  }
                  attach(e, t) {
                      const n = context.getAttribLocation(t, e);
                      return this.target === context.ARRAY_BUFFER && (context.enableVertexAttribArray(n), context.vertexAttribPointer(n, this.size, this.type, this.normalized, 0, 0)), n
                  }
                  use(e) {
                    context.bindBuffer(this.target, this.buffer), this.target === context.ARRAY_BUFFER && (context.enableVertexAttribArray(e), context.vertexAttribPointer(e, this.size, this.type, this.normalized, 0, 0))
                  }
              }
          }
      });
      const a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      _miniGl.commonUniforms = {
          projectionMatrix: new _miniGl.Uniform({
              type: "mat4",
              value: a
          }),
          modelViewMatrix: new _miniGl.Uniform({
              type: "mat4",
              value: a
          }),
          resolution: new _miniGl.Uniform({
              type: "vec2",
              value: [1, 1]
          }),
          aspectRatio: new _miniGl.Uniform({
              type: "float",
              value: 1
          })
      }
  }
  setSize(e = 640, t = 480) {
      this.width = e, this.height = t, this.canvas.width = e, this.canvas.height = t, this.gl.viewport(0, 0, e, t), this.commonUniforms.resolution.value = [e, t], this.commonUniforms.aspectRatio.value = e / t, this.debug("MiniGL.setSize", {
          width: e,
          height: t
      })
  }
  //left, right, top, bottom, near, far
  setOrthographicCamera(e = 0, t = 0, n = 0, i = -2e3, s = 2e3) {
      this.commonUniforms.projectionMatrix.value = [2 / this.width, 0, 0, 0, 0, 2 / this.height, 0, 0, 0, 0, 2 / (i - s), 0, e, t, n, 1], this.debug("setOrthographicCamera", this.commonUniforms.projectionMatrix.value)
  }
  render() {
      this.gl.clearColor(0, 0, 0, 0), this.gl.clearDepth(1), this.meshes.forEach(e => e.draw())
  }
}



//Sets initial properties
function e(object, propertyName, val) {
  return propertyName in object ? Object.defineProperty(object, propertyName, {
      value: val,
      enumerable: !0,
      configurable: !0,
      writable: !0
  }) : object[propertyName] = val, object
}

//Gradient object
class Gradient {
  constructor(...t) {
      e(this, "el", void 0), e(this, "cssVarRetries", 0), e(this, "maxCssVarRetries", 200), e(this, "angle", 0), e(this, "isLoadedClass", !1), e(this, "isScrolling", !1), /*e(this, "isStatic", o.disableAmbientAnimations()),*/ e(this, "scrollingTimeout", void 0), e(this, "scrollingRefreshDelay", 200), e(this, "isIntersecting", !1), e(this, "shaderFiles", void 0), e(this, "vertexShader", void 0), e(this, "sectionColors", void 0), e(this, "computedCanvasStyle", void 0), e(this, "conf", void 0), e(this, "uniforms", void 0), e(this, "t", 1253106), e(this, "last", 0), e(this, "width", void 0), e(this, "minWidth", 1111), e(this, "height", 600), e(this, "xSegCount", void 0), e(this, "ySegCount", void 0), e(this, "mesh", void 0), e(this, "material", void 0), e(this, "geometry", void 0), e(this, "minigl", void 0), e(this, "scrollObserver", void 0), e(this, "amp", 320), e(this, "seed", 5), e(this, "freqX", 14e-5), e(this, "freqY", 29e-5), e(this, "freqDelta", 1e-5), e(this, "activeColors", [1, 1, 1, 1]), e(this, "isMetaKey", !1), e(this, "isGradientLegendVisible", !1), e(this, "isMouseDown", !1), e(this, "handleScroll", () => {
          clearTimeout(this.scrollingTimeout), this.scrollingTimeout = setTimeout(this.handleScrollEnd, this.scrollingRefreshDelay), this.isGradientLegendVisible && this.hideGradientLegend(), this.conf.playing && (this.isScrolling = !0, this.pause())
      }), e(this, "handleScrollEnd", () => {
          this.isScrolling = !1, this.isIntersecting && this.play()
      }), e(this, "resize", () => {
          this.width = window.innerWidth, this.minigl.setSize(this.width, this.height), this.minigl.setOrthographicCamera(), this.xSegCount = Math.ceil(this.width * this.conf.density[0]), this.ySegCount = Math.ceil(this.height * this.conf.density[1]), this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount), this.mesh.geometry.setSize(this.width, this.height), this.mesh.material.uniforms.u_shadow_power.value = this.width < 600 ? 5 : 6
      }), e(this, "handleMouseDown", e => {
          this.isGradientLegendVisible && (this.isMetaKey = e.metaKey, this.isMouseDown = !0, !1 === this.conf.playing && requestAnimationFrame(this.animate))
      }), e(this, "handleMouseUp", () => {
          this.isMouseDown = !1
      }), e(this, "animate", e => {
          if (!this.shouldSkipFrame(e) || this.isMouseDown) {
              if (this.t += Math.min(e - this.last, 1e3 / 15), this.last = e, this.isMouseDown) {
                  let e = 160;
                  this.isMetaKey && (e = -160), this.t += e
              }
              this.mesh.material.uniforms.u_time.value = this.t, this.minigl.render()

          }
          if (0 !== this.last && this.isStatic) return this.minigl.render(), void this.disconnect();
          (/*this.isIntersecting && */this.conf.playing || this.isMouseDown) && requestAnimationFrame(this.animate)
      }), e(this, "addIsLoadedClass", () => {
          /*this.isIntersecting && */!this.isLoadedClass && (this.isLoadedClass = !0, this.el.classList.add("isLoaded"), setTimeout(() => {
              this.el.parentElement.classList.add("isLoaded")
          }, 3e3))
      }), e(this, "pause", () => {
          this.conf.playing = false
      }), e(this, "play", () => {
          requestAnimationFrame(this.animate), this.conf.playing = true
      }), e(this,"initGradient", (selector) => {
        this.el = document.querySelector(selector);
        this.connect();
        return this;
      })
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
          wireframe: false,
          density: [.06, .16],
          zoom: 1,
          rotation: 0,
          playing: true
      }, 
      document.querySelectorAll("canvas").length < 1 ? console.log("DID NOT LOAD HERO STRIPE CANVAS") : (
        
        this.minigl = new MiniGl(this.el, null, null, !0), 
        requestAnimationFrame(() => {
            this.el && (this.computedCanvasStyle = getComputedStyle(this.el), this.waitForCssVars())
        })
        /*
        this.scrollObserver = await s.create(.1, !1),
        this.scrollObserver.observe(this.el),
        this.scrollObserver.onSeparate(() => {
            window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("keydown", this.handleKeyDown), this.isIntersecting = !1, this.conf.playing && this.pause()
        }), 
        this.scrollObserver.onIntersect(() => {
            window.addEventListener("scroll", this.handleScroll), window.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("keydown", this.handleKeyDown), this.isIntersecting = !0, this.addIsLoadedClass(), this.play()
        })*/

      )
  }
  disconnect() {
      this.scrollObserver && (window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("keydown", this.handleKeyDown), this.scrollObserver.disconnect()), window.removeEventListener("resize", this.resize)
  }
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
      for (let e = 1; e < this.sectionColors.length; e += 1) this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({
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
      return this.vertexShader = [this.shaderFiles.noise, this.shaderFiles.blend, this.shaderFiles.vertex].join("\n\n"), new this.minigl.Material(this.vertexShader, this.shaderFiles.fragment, this.uniforms)
  }
  initMesh() {
      this.material = this.initMaterial(), this.geometry = new this.minigl.PlaneGeometry, this.mesh = new this.minigl.Mesh(this.geometry, this.material)
  }
  shouldSkipFrame(e) {
      return !!window.document.hidden || (!this.conf.playing || (parseInt(e, 10) % 2 == 0 || void 0))
  }
  updateFrequency(e) {
      this.freqX += e, this.freqY += e
  }
  toggleColor(index) {
      this.activeColors[index] = 0 === this.activeColors[index] ? 1 : 0
  }
  showGradientLegend() {
      this.width > this.minWidth && (this.isGradientLegendVisible = !0, document.body.classList.add("isGradientLegendVisible"))
  }
  hideGradientLegend() {
      this.isGradientLegendVisible = !1, document.body.classList.remove("isGradientLegendVisible")
  }
  init() {
      this.initGradientColors(), this.initMesh(), this.resize(), requestAnimationFrame(this.animate), window.addEventListener("resize", this.resize)
  }
  /*
  * Waiting for the css variables to become available, usually on page load before we can continue.
  * Using default colors assigned below if no variables have been found after maxCssVarRetries
  */
  waitForCssVars() {
      if (this.computedCanvasStyle && -1 !== this.computedCanvasStyle.getPropertyValue("--gradient-color-1").indexOf("#")) this.init(), this.addIsLoadedClass();
      else {
          if (this.cssVarRetries += 1, this.cssVarRetries > this.maxCssVarRetries) {
              return this.sectionColors = [16711680, 16711680, 16711935, 65280, 255],void this.init();
          }
          requestAnimationFrame(() => this.waitForCssVars())
      }
  }
  /*
  * Initializes the four section colors by retrieving them from css variables.
  */
  initGradientColors() {
      this.sectionColors = ["--gradient-color-1", "--gradient-color-2", "--gradient-color-3", "--gradient-color-4"].map(cssPropertyName => {
          let hex = this.computedCanvasStyle.getPropertyValue(cssPropertyName).trim();
          //Check if shorthand hex value was used and double the length so the conversion in normalizeColor will work.
          if (4 === hex.length) {
              const hexTemp = hex.substr(1).split("").map(hexTemp => hexTemp + hexTemp).join("");
              hex = `#${hexTemp}`
          }
          return hex && `0x${hex.substr(1)}`
      }).filter(Boolean).map(normalizeColor)
  }
}




/*
*Finally initializing the Gradient class, assigning a canvas to it and calling Gradient.connect() which initializes everything,
* Use Gradient.pause() and Gradient.play() for controls.
*
* Here are some default property values you can change anytime:
* Amplitude:    Gradient.amp = 0
* Colors:       Gradient.sectionColors (if you change colors, use normalizeColor(#hexValue)) before you assign it.
*
*
* Useful functions
* Gradient.toggleColor(index)
* Gradient.updateFrequency(freq)
*/
var gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");








  (()=>{
      const rootElement = document.documentElement;
      // <html>
      const darkModeStorageKey = "user-color-scheme";
      // 作为 localStorage 的 key
      const darkModeMediaQueryKey = "--color-mode";
      const rootElementDarkModeAttributeName = "data-user-color-scheme";
      const darkModeToggleBottonElement = document.getElementById("o0");
      
      const setLS = (k,v)=>{
          try {
              localStorage.setItem(k, v);
          } catch (e) {}
      }
      ;
      
      const removeLS = k=>{
          try {
              localStorage.removeItem(k);
          } catch (e) {}
      }
      ;
      
      const getLS = k=>{
          try {
              return localStorage.getItem(k);
          } catch (e) {
              return null;
              // 和 localStorage 中没有找到对应 key 的行为一致
          }
      }
      ;
      
      const getModeFromCSSMediaQuery = ()=>{
          const res = getComputedStyle(rootElement).getPropertyValue(darkModeMediaQueryKey);
          if (res.length)
              return res.replace(/\"/g, "").trim();
          return res === "dark" ? "dark" : "light";
      }
      ;
      
      const resetRootDarkModeAttributeAndLS = ()=>{
          rootElement.removeAttribute(rootElementDarkModeAttributeName);
          removeLS(darkModeStorageKey);
      }
      ;
      
      const validColorModeKeys = {
          dark: true,
          light: true
      };
      
      const applyCustomDarkModeSettings = mode=>{
          // 接受从「开关」处传来的模式，或者从 localStorage 读取
          const currentSetting = mode || getLS(darkModeStorageKey);
      
          if (currentSetting === getModeFromCSSMediaQuery()) {
              // 当用户自定义的显示模式和 prefers-color-scheme 相同时重置、恢复到自动模式
              resetRootDarkModeAttributeAndLS();
          } else if (validColorModeKeys[currentSetting]) {
              // 相比 Array#indexOf，这种写法 Uglify 后字节数更少
              rootElement.setAttribute(rootElementDarkModeAttributeName, currentSetting);
          } else {
              // 首次访问或从未使用过开关、localStorage 中没有存储的值，currentSetting 是 null
              // 或者 localStorage 被篡改，currentSetting 不是合法值
              resetRootDarkModeAttributeAndLS();
          }
      }
      ;
      
      const invertDarkModeObj = {
          dark: "light",
          light: "dark"
      };
      
      const toggleCustomDarkMode = ()=>{
          let currentSetting = getLS(darkModeStorageKey);
      
          if (validColorModeKeys[currentSetting]) {
              // 从 localStorage 中读取模式，并取相反的模式
              currentSetting = invertDarkModeObj[currentSetting];
          } else if (currentSetting === null) {
              // localStorage 中没有相关值，或者 localStorage 抛了 Error
              // 从 CSS 中读取当前 prefers-color-scheme 并取相反的模式
              currentSetting = invertDarkModeObj[getModeFromCSSMediaQuery()];
          } else {
              // 不知道出了什么其它幺蛾子，比如 localStorage 被篡改成非法值
              return;
              // 直接 return;
          }
          // 将相反的模式写入 localStorage
          setLS(darkModeStorageKey, currentSetting);
      
          return currentSetting;
      }
      ;
      
      // 当页面加载时，将显示模式设置为 localStorage 中自定义的值（如果有的话）
      applyCustomDarkModeSettings();
      
      darkModeToggleBottonElement.addEventListener("click", ()=>{
          // 当用户点击「开关」时，获得新的显示模式、写入 localStorage、并在页面上生效
          applyCustomDarkModeSettings(toggleCustomDarkMode());
      }
      );
      }
      )();
   
   
 
