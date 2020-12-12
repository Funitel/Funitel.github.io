var base = function(t) {
    "use strict";
    function e(t) {
        for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
            i[r - 1] = arguments[r];
        return i.forEach((function(e) {
            return Object.keys(e).forEach((function(i) {
                return t[i] = e[i]
            }
            ))
        }
        )),
        t
    }
    var i = {
        position: "relative",
        overflow: "hidden"
    }
      , r = {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0"
    };
    var n = {
        display: "block",
        maxWidth: "100%",
        touchAction: "none"
    }
      , s = {
        position: "absolute",
        cursor: "move",
        transform: "translate(-50%, -50%)"
    }
      , o = {
        onChange: function() {},
        retina: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e %3cg fill='none' fill-rule='evenodd'%3e %3ccircle id='a' cx='10' cy='10' r='10' fill='black' fill-opacity='.3' /%3e %3ccircle cx='10' cy='10' r='9' stroke='white' stroke-opacity='.8' stroke-width='2'/%3e %3c/g%3e%3c/svg%3e"
    }
      , a = function() {
        function t(t, r) {
            var a = this;
            void 0 === r && (r = {}),
            this.startDragging = function(t) {
                t.preventDefault(),
                a.isDragging = !0,
                t instanceof MouseEvent ? a.updateCoordinates(t.clientX, t.clientY) : a.updateCoordinates(t.touches[0].clientX, t.touches[0].clientY)
            }
            ,
            this.handleMove = function(t) {
                if (t.preventDefault(),
                t instanceof MouseEvent)
                    a.updateCoordinates(t.clientX, t.clientY);
                else {
                    var e = t.touches[0]
                      , i = document.elementFromPoint(e.pageX, e.pageY);
                    i !== a.retina && i !== a.img ? a.stopDragging() : a.updateCoordinates(e.clientX, e.clientY)
                }
            }
            ,
            this.stopDragging = function() {
                a.isDragging = !1
            }
            ,
            this.updateRetinaPositionFromFocus = function() {
                a.updateRetinaPosition(a.calculateOffsetFromFocus())
            }
            ,
            this.updateRetinaPosition = function(t) {
                a.retina.style.top = t.offsetY + "px",
                a.retina.style.left = t.offsetX + "px"
            }
            ,
            this.options = e({}, o, r),
            this.img = t,
            this.container = "PICTURE" == t.parentElement.tagName ? t.parentElement.parentElement : t.parentElement,
            this.retina = document.createElement("img"),
            this.retina.src = this.options.retina,
            this.retina.draggable = !1,
            this.container.appendChild(this.retina),
            this.img.draggable = !1,
            this.startListening(),
            e(this.img.style, n),
            e(this.retina.style, s),
            e(this.container.style, i),
            this.focus = this.options.focus ? this.options.focus : {
                x: parseFloat(this.img.getAttribute("data-focus-x")) || 0,
                y: parseFloat(this.img.getAttribute("data-focus-y")) || 0
            },
            this.setFocus(this.focus)
        }
        var r = t.prototype;
        return r.startListening = function() {
            this.container.addEventListener("mousedown", this.startDragging),
            this.container.addEventListener("mousemove", this.handleMove),
            this.container.addEventListener("mouseup", this.stopDragging),
            this.container.addEventListener("mouseleave", this.stopDragging),
            this.container.addEventListener("touchend", this.stopDragging),
            this.container.addEventListener("touchstart", this.startDragging, {
                passive: !0
            }),
            this.container.addEventListener("touchmove", this.handleMove, {
                passive: !0
            }),
            this.img.addEventListener("load", this.updateRetinaPositionFromFocus)
        }
        ,
        r.stopListening = function() {
            this.container.removeEventListener("mousedown", this.startDragging),
            this.container.removeEventListener("mousemove", this.handleMove),
            this.container.removeEventListener("mouseup", this.stopDragging),
            this.container.removeEventListener("mouseleave", this.stopDragging),
            this.container.removeEventListener("touchend", this.stopDragging),
            this.container.removeEventListener("touchstart", this.startDragging),
            this.container.removeEventListener("touchmove", this.handleMove),
            this.img.removeEventListener("load", this.updateRetinaPositionFromFocus)
        }
        ,
        r.setFocus = function(t) {
            this.focus = t,
            this.img.setAttribute("data-focus-x", t.x.toString()),
            this.img.setAttribute("data-focus-y", t.y.toString()),
            this.updateRetinaPositionFromFocus(),
            this.options.onChange(t)
        }
        ,
        r.calculateOffsetFromFocus = function() {
            var t = this.img.getBoundingClientRect()
              , e = t.width
              , i = t.height;
            return {
                offsetX: e * (this.focus.x / 2 + .5),
                offsetY: i * (this.focus.y / -2 + .5)
            }
        }
        ,
        r.updateCoordinates = function(t, e) {
            if (this.isDragging) {
                var i = this.img.getBoundingClientRect()
                  , r = i.width
                  , n = i.height
                  , s = 2 * ((t - i.left) / r - .5)
                  , o = -2 * ((e - i.top) / n - .5);
                this.setFocus({
                    x: s,
                    y: o
                })
            }
        }
        ,
        t
    }();
    var l = {
        minHeight: "100%",
        minWidth: "100%"
    }
      , u = {
        height: "100%",
        width: "100%",
        border: "none",
        opacity: 0,
        zIndex: -1,
        pointerEvents: "none"
    }
      , c = {
        debounceTime: 17,
        updateOnWindowResize: !0,
        updateOnContainerResize: !1,
        containerPosition: "relative"
    }
      , h = function() {
        function t(t, n) {
            var s, o, a, u = this;
            void 0 === n && (n = {}),
            this.imageNode = t,
            this.listening = !1,
            this.setFocus = function(t) {
                u.focus = t,
                u.img.setAttribute("data-focus-x", t.x.toString()),
                u.img.setAttribute("data-focus-y", t.y.toString()),
                u.applyShift()
            }
            ,
            this.applyShift = function() {
                var t = u.img
                  , e = t.naturalWidth
                  , i = t.naturalHeight
                  , r = u.container.getBoundingClientRect()
                  , n = r.width
                  , s = r.height
                  , o = "0"
                  , a = "0";
                if (!(n > 0 && s > 0 && e > 0 && i > 0))
                    return !1;
                var l = e / n
                  , c = i / s;
                u.img.style.maxHeight = null,
                u.img.style.maxWidth = null,
                e > n && i > s && (u.img.style[l > c ? "maxHeight" : "maxWidth"] = "100%"),
                l > c ? o = u.calcShift(c, n, e, u.focus.x) + "%" : l < c && (a = u.calcShift(l, s, i, u.focus.y, !0) + "%"),
                u.img.style.top = a,
                u.img.style.left = o
            }
            ,
            this.options = e(c, n),
            this.img = t,
            this.container = "PICTURE" == t.parentElement.tagName ? t.parentElement.parentElement : t.parentElement,
            this.img.__focused_image_instance__ && (this.img.__focused_image_instance__.stopListening(),
            this.img.removeEventListener("load", this.applyShift)),
            this.img.__focused_image_instance__ = this,
            this.img.addEventListener("load", this.applyShift),
            e(this.container.style, i),
            this.container.style.position = this.options.containerPosition,
            e(this.img.style, l, r),
            this.debounceApplyShift = (s = this.applyShift,
            o = this.options.debounceTime,
            function() {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                clearTimeout(a),
                a = setTimeout((function() {
                    return s.apply(void 0, e)
                }
                ), o)
            }
            ),
            this.focus = this.options.focus ? this.options.focus : {
                x: parseFloat(this.img.getAttribute("data-focus-x")) || 0,
                y: parseFloat(this.img.getAttribute("data-focus-y")) || 0
            },
            this.startListening(),
            this.setFocus(this.focus)
        }
        var n = t.prototype;
        return n.startListening = function() {
            var t = this;
            if (!this.listening && (this.listening = !0,
            this.options.updateOnWindowResize && window.addEventListener("resize", this.debounceApplyShift),
            this.options.updateOnContainerResize)) {
                var i = document.createElement("object");
                e(i.style, u, r),
                i.addEventListener("load", (function(e) {
                    return i.contentDocument.defaultView.addEventListener("resize", (function() {
                        return t.debounceApplyShift()
                    }
                    ))
                }
                )),
                i.type = "text/html",
                i.setAttribute("aria-hidden", "true"),
                i.tabIndex = -1,
                this.container.appendChild(i),
                i.data = "about:blank",
                this.resizeListenerObject = i
            }
        }
        ,
        n.stopListening = function() {
            this.listening && (this.listening = !1,
            window.removeEventListener("resize", this.debounceApplyShift),
            this.resizeListenerObject && (this.resizeListenerObject.contentDocument.defaultView.removeEventListener("resize", this.debounceApplyShift),
            this.container.removeChild(this.resizeListenerObject),
            this.resizeListenerObject = null))
        }
        ,
        n.calcShift = function(t, e, i, r, n) {
            var s = Math.floor(e / 2)
              , o = (r + 1) / 2
              , a = Math.floor(i / t)
              , l = Math.floor(o * a);
            n && (l = a - l);
            var u = l - s
              , c = a - l
              , h = e - s;
            return c < h && (u -= h - c),
            u < 0 && (u = 0),
            -100 * u / e
        }
        ,
        t
    }();
    function d(t) {
        const e = document.createElement("template");
        return e.innerHTML = t,
        e.content
    }
    function f(t) {
        const e = document.createElementNS("http://www.w3.org/2000/svg", "g");
        return e.innerHTML = t,
        e
    }
    const p = Object.assign(g(d, t=>{
        if (null === t.firstChild)
            return null;
        if (t.firstChild === t.lastChild)
            return t.removeChild(t.firstChild);
        const e = document.createElement("span");
        return e.appendChild(t),
        e
    }
    ), {
        fragment: g(d, t=>t)
    });
    Object.assign(g(f, t=>null === t.firstChild ? null : t.firstChild === t.lastChild ? t.removeChild(t.firstChild) : t), {
        fragment: g(f, t=>{
            const e = document.createDocumentFragment();
            for (; t.firstChild; )
                e.appendChild(t.firstChild);
            return e
        }
        )
    });
    function g(t, e) {
        return function({raw: i}) {
            let r, n, s = 1, o = "", a = 0;
            for (let t = 0, e = arguments.length; t < e; ++t) {
                const e = i[t];
                if (t > 0) {
                    const l = arguments[t];
                    switch (s) {
                    case 1:
                        null == l || (l instanceof Node || "string" != typeof l && l[Symbol.iterator] || /(?:^|>)$/.test(i[t - 1]) && /^(?:<|$)/.test(e) ? (o += "\x3c!--::" + t + "--\x3e",
                        a |= 128) : o += (l + "").replace(/[<&]/g, m));
                        break;
                    case 9:
                        if (s = 12,
                        /^[\s>]/.test(e)) {
                            if (null == l || !1 === l) {
                                o = o.slice(0, r - i[t - 1].length);
                                break
                            }
                            if (!0 === l) {
                                o += "''";
                                break
                            }
                            if ("style" === i[t - 1].slice(r, n) && y(l) || "function" == typeof l) {
                                o += "::" + t,
                                a |= 1;
                                break
                            }
                        }
                        o += (l + "").replace(/^['"]|[\s>&]/g, m);
                        break;
                    case 12:
                        o += (l + "").replace(/[\s>&]/g, m);
                        break;
                    case 11:
                        o += (l + "").replace(/['&]/g, m);
                        break;
                    case 10:
                        o += (l + "").replace(/["&]/g, m);
                        break;
                    case 6:
                        if (y(l)) {
                            o += "::" + t + "=''",
                            a |= 1;
                            break
                        }
                        throw new Error("invalid binding");
                    case 17:
                        break;
                    default:
                        throw new Error("invalid binding")
                    }
                }
                for (let t = 0, i = e.length; t < i; ++t) {
                    const i = e.charCodeAt(t);
                    switch (s) {
                    case 1:
                        60 === i && (s = 2);
                        break;
                    case 2:
                        33 === i ? s = 25 : 47 === i ? s = 3 : v(i) ? (s = 4,
                        --t) : 63 === i ? (s = 5,
                        --t) : (s = 1,
                        --t);
                        break;
                    case 3:
                        v(i) ? (s = 4,
                        --t) : 62 === i ? s = 1 : (s = 5,
                        --t);
                        break;
                    case 4:
                        _(i) ? s = 6 : 47 === i ? s = 14 : 62 === i && (s = 1);
                        break;
                    case 6:
                        _(i) || (47 === i || 62 === i ? (s = 7,
                        --t) : 61 === i ? (s = 8,
                        r = t + 1,
                        n = void 0) : (s = 8,
                        --t,
                        r = t + 1,
                        n = void 0));
                        break;
                    case 8:
                        _(i) || 47 === i || 62 === i ? (s = 7,
                        --t,
                        n = t) : 61 === i && (s = 9,
                        n = t);
                        break;
                    case 7:
                        _(i) || (47 === i ? s = 14 : 61 === i ? s = 9 : 62 === i ? s = 1 : (s = 8,
                        --t,
                        r = t + 1,
                        n = void 0));
                        break;
                    case 9:
                        _(i) || (34 === i ? s = 10 : 39 === i ? s = 11 : 62 === i ? s = 1 : (s = 12,
                        --t));
                        break;
                    case 10:
                        34 === i && (s = 13);
                        break;
                    case 11:
                        39 === i && (s = 13);
                        break;
                    case 12:
                        _(i) ? s = 6 : 62 === i && (s = 1);
                        break;
                    case 13:
                        _(i) ? s = 6 : 47 === i ? s = 14 : 62 === i ? s = 1 : (s = 6,
                        --t);
                        break;
                    case 14:
                        62 === i ? s = 1 : (s = 6,
                        --t);
                        break;
                    case 5:
                        62 === i && (s = 1);
                        break;
                    case 15:
                        45 === i ? s = 16 : 62 === i ? s = 1 : (s = 17,
                        --t);
                        break;
                    case 16:
                        45 === i ? s = 23 : 62 === i ? s = 1 : (s = 17,
                        --t);
                        break;
                    case 17:
                        60 === i ? s = 18 : 45 === i && (s = 22);
                        break;
                    case 18:
                        33 === i ? s = 19 : 60 !== i && (s = 17,
                        --t);
                        break;
                    case 19:
                        45 === i ? s = 20 : (s = 17,
                        --t);
                        break;
                    case 20:
                        45 === i ? s = 21 : (s = 23,
                        --t);
                        break;
                    case 21:
                        s = 23,
                        --t;
                        break;
                    case 22:
                        45 === i ? s = 23 : (s = 17,
                        --t);
                        break;
                    case 23:
                        62 === i ? s = 1 : 33 === i ? s = 24 : 45 !== i && (s = 17,
                        --t);
                        break;
                    case 24:
                        45 === i ? s = 22 : 62 === i ? s = 1 : (s = 17,
                        --t);
                        break;
                    case 25:
                        45 === i && 45 === e.charCodeAt(t + 1) ? (s = 15,
                        ++t) : (s = 5,
                        --t);
                        break;
                    default:
                        s = void 0
                    }
                }
                o += e
            }
            const l = t(o)
              , u = document.createTreeWalker(l, a, null, !1)
              , c = [];
            for (; u.nextNode(); ) {
                const t = u.currentNode;
                switch (t.nodeType) {
                case 1:
                    {
                        const e = t.attributes;
                        for (let i = 0, r = e.length; i < r; ++i) {
                            const n = e[i];
                            if (/^::/.test(n.name)) {
                                const e = arguments[+n.name.slice(2)];
                                t.removeAttribute(n.name),
                                --i,
                                --r;
                                for (const i in e) {
                                    const r = e[i];
                                    null == r || !1 === r || ("function" == typeof r ? t[i] = r : "style" === i && y(r) ? Object.assign(t[i], r) : t.setAttribute(i, !0 === r ? "" : r))
                                }
                            } else if (/^::/.test(n.value)) {
                                const e = arguments[+n.value.slice(2)];
                                t.removeAttribute(n.name),
                                --i,
                                --r,
                                "function" == typeof e ? t[n.name] = e : Object.assign(t[n.name], e)
                            }
                        }
                        break
                    }
                case 8:
                    if (/^::/.test(t.data)) {
                        const e = t.parentNode
                          , i = arguments[+t.data.slice(2)];
                        if (i instanceof Node)
                            e.insertBefore(i, t);
                        else if ("string" != typeof i && i[Symbol.iterator])
                            if (i instanceof NodeList || i instanceof HTMLCollection)
                                for (let r = i.length - 1, n = t; r >= 0; --r)
                                    n = e.insertBefore(i[r], n);
                            else
                                for (const r of i)
                                    null != r && e.insertBefore(r instanceof Node ? r : document.createTextNode(r), t);
                        else
                            e.insertBefore(document.createTextNode(i), t);
                        c.push(t)
                    }
                }
            }
            for (const t of c)
                t.parentNode.removeChild(t);
            return e(l)
        }
    }
    function m(t) {
        return `&#${t.charCodeAt(0).toString()};`
    }
    function v(t) {
        return 65 <= t && t <= 90 || 97 <= t && t <= 122
    }
    function _(t) {
        return 9 === t || 10 === t || 12 === t || 32 === t || 13 === t
    }
    function y(t) {
        return t && t.toString === Object.prototype.toString
    }
    class b {
        constructor(t) {
            this.opts = {
                targets: void 0,
                focusX: "50%",
                focusY: "0%",
                picker: !1,
                contain: !1,
                ...t
            },
            this.pickerClass = "___fullbleed-img-picker";
            ("string" == typeof this.opts.targets ? [...document.querySelectorAll("" + this.opts.targets)] : [...t.targets]).filter(t=>!t.classList.contains(this.pickerClass)).forEach(t=>{
                const e = "PICTURE" == t.tagName
                  , i = "IMG" == t.tagName;
                if (e || i) {
                    const i = e ? t.querySelector("img") : t;
                    i.classList.add("ngm-fit-kit"),
                    this.opts.contain ? this.setContainMedia(i) : this.setFocusedMedia(i)
                } else
                    t.classList.add("ngm-fit-kit"),
                    this.opts.contain ? this.setContainEl(t) : t.classList.contains("ai2html") ? this.setBleedAi2html(t) : this.setBleedEl(t)
            }
            )
        }
        setContainMedia(t) {
            t.classList.add("ngm-fit-kit-contain-media")
        }
        setContainEl(t) {
            t.classList.add("ngm-fit-kit-contain-el")
        }
        setBleedAi2html(t) {
            t.querySelectorAll(".g-artboard").forEach(t=>{
                t.classList.add("ngm-fit-kit-bleed-el"),
                t.style.position = "absolute",
                t.style.top = this.opts.focusY,
                t.style.left = this.opts.focusX,
                t.style.transform = `translate(${-parseFloat(this.opts.focusX)}%, ${-parseFloat(this.opts.focusY)}%)`,
                t.style.maxWidth && (t.style.width = t.style.maxWidth),
                t.style.maxHeight && (t.style.height = t.style.maxHeight)
            }
            )
        }
        setBleedEl(t) {
            t.classList.add("ngm-fit-kit-bleed-el"),
            t.style.top = this.opts.focusY,
            t.style.left = this.opts.focusX,
            t.style.transform = `translate(${-parseFloat(this.opts.focusX)}%, ${-parseFloat(this.opts.focusY)}%)`
        }
        setFocusedMedia(t) {
            const e = {
                x: this.scaleLinear(parseFloat(t.getAttribute("data-focus-x") || this.opts.focusX), [0, 100], [-1, 1]),
                y: this.scaleLinear(parseFloat(t.getAttribute("data-focus-y") || this.opts.focusY), [0, 100], [1, -1])
            }
              , i = new h(t,{
                focus: e,
                containerPosition: "absolute",
                updateOnWindowResize: !0
            });
            this.opts.picker && this.insertPicker(i)
        }
        scaleLinear(t, e, i) {
            const r = e[0]
              , n = e[1]
              , s = i[0];
            return s + (t - r) / (n - r) * (i[1] - s)
        }
        roundToDecimals(t, e=2) {
            return Number(Math.round(t + "e" + e) + "e-" + e)
        }
        insertPicker(t) {
            const e = t.container
              , i = t.img.src || t.img.getAttribute("data-srcset") || t.img.getAttribute("data-src")
              , r = p.fragment`
            <div class="${this.pickerClass}">
                <div>
                    <img src=${i} />
                </div>
                <code></code>
            </div>
        `;
            e.appendChild(r);
            const n = e.querySelector("." + this.pickerClass)
              , s = n.querySelector("img")
              , o = n.querySelector("code");
            new a(s,{
                focus: t.focus,
                onChange: e=>{
                    const i = this.roundToDecimals(this.scaleLinear(e.x, [-1, 1], [0, 100])) + "%"
                      , r = this.roundToDecimals(this.scaleLinear(e.y, [1, -1], [0, 100])) + "%";
                    o.innerHTML = `data-focus-x="${i}" data-focus-y="${r}"`,
                    t.setFocus(e)
                }
            })
        }
    }
    function x(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function w(t, e) {
        t.prototype = Object.create(e.prototype),
        t.prototype.constructor = t,
        t.__proto__ = e
    }
    var T, k, C, S, A, E, O, M, L, z, P, F, R = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    }, D = {
        duration: .5,
        overwrite: !1,
        delay: 0
    }, B = 1e8, I = 2 * Math.PI, N = I / 4, V = 0, q = Math.sqrt, W = Math.cos, Y = Math.sin, X = function(t) {
        return "string" == typeof t
    }, $ = function(t) {
        return "function" == typeof t
    }, j = function(t) {
        return "number" == typeof t
    }, U = function(t) {
        return void 0 === t
    }, H = function(t) {
        return "object" == typeof t
    }, G = function(t) {
        return !1 !== t
    }, Z = function() {
        return "undefined" != typeof window
    }, Q = function(t) {
        return $(t) || X(t)
    }, J = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}
    , K = Array.isArray, tt = /(?:-?\.?\d|\.)+/gi, et = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g, it = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, rt = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi, nt = /[+-]=-?[\.\d]+/, st = /[#\-+.]*\b[a-z\d-=+%.]+/gi, ot = {}, at = {}, lt = function(t) {
        return (at = Ft(t, ot)) && mi
    }, ut = function(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    }, ct = function(t, e) {
        return !e && console.warn(t)
    }, ht = function(t, e) {
        return t && (ot[t] = e) && at && (at[t] = e) || ot
    }, dt = function() {
        return 0
    }, ft = {}, pt = [], gt = {}, mt = {}, vt = {}, _t = 30, yt = [], bt = "", xt = function(t) {
        var e, i, r = t[0];
        if (H(r) || $(r) || (t = [t]),
        !(e = (r._gsap || {}).harness)) {
            for (i = yt.length; i-- && !yt[i].targetTest(r); )
                ;
            e = yt[i]
        }
        for (i = t.length; i--; )
            t[i] && (t[i]._gsap || (t[i]._gsap = new qe(t[i],e))) || t.splice(i, 1);
        return t
    }, wt = function(t) {
        return t._gsap || xt(ae(t))[0]._gsap
    }, Tt = function(t, e, i) {
        return (i = t[e]) && $(i) ? t[e]() : U(i) && t.getAttribute && t.getAttribute(e) || i
    }, kt = function(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }, Ct = function(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }, St = function(t, e) {
        for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
            ;
        return r < i
    }, At = function(t, e, i) {
        var r, n = j(t[1]), s = (n ? 2 : 1) + (e < 2 ? 0 : 1), o = t[s];
        if (n && (o.duration = t[1]),
        o.parent = i,
        e) {
            for (r = o; i && !("immediateRender"in r); )
                r = i.vars.defaults || {},
                i = G(i.vars.inherit) && i.parent;
            o.immediateRender = G(r.immediateRender),
            e < 2 ? o.runBackwards = 1 : o.startAt = t[s - 1]
        }
        return o
    }, Et = function() {
        var t, e, i = pt.length, r = pt.slice(0);
        for (gt = {},
        pt.length = 0,
        t = 0; t < i; t++)
            (e = r[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }, Ot = function(t, e, i, r) {
        pt.length && Et(),
        t.render(e, i, r),
        pt.length && Et()
    }, Mt = function(t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(st).length < 2 ? e : X(t) ? t.trim() : t
    }, Lt = function(t) {
        return t
    }, zt = function(t, e) {
        for (var i in e)
            i in t || (t[i] = e[i]);
        return t
    }, Pt = function(t, e) {
        for (var i in e)
            i in t || "duration" === i || "ease" === i || (t[i] = e[i])
    }, Ft = function(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }, Rt = function t(e, i) {
        for (var r in i)
            e[r] = H(i[r]) ? t(e[r] || (e[r] = {}), i[r]) : i[r];
        return e
    }, Dt = function(t, e) {
        var i, r = {};
        for (i in t)
            i in e || (r[i] = t[i]);
        return r
    }, Bt = function(t) {
        var e = t.parent || T
          , i = t.keyframes ? Pt : zt;
        if (G(t.inherit))
            for (; e; )
                i(t, e.vars.defaults),
                e = e.parent || e._dp;
        return t
    }, It = function(t, e, i, r) {
        void 0 === i && (i = "_first"),
        void 0 === r && (r = "_last");
        var n = e._prev
          , s = e._next;
        n ? n._next = s : t[i] === e && (t[i] = s),
        s ? s._prev = n : t[r] === e && (t[r] = n),
        e._next = e._prev = e.parent = null
    }, Nt = function(t, e) {
        t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
        t._act = 0
    }, Vt = function(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var i = t; i; )
                i._dirty = 1,
                i = i.parent;
        return t
    }, qt = function(t) {
        for (var e = t.parent; e && e.parent; )
            e._dirty = 1,
            e.totalDuration(),
            e = e.parent;
        return t
    }, Wt = function(t) {
        return t._repeat ? Yt(t._tTime, t = t.duration() + t._rDelay) * t : 0
    }, Yt = function(t, e) {
        return (t /= e) && ~~t === t ? ~~t - 1 : ~~t
    }, Xt = function(t, e) {
        return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    }, $t = function(t) {
        return t._end = Ct(t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0))
    }, jt = function(t, e) {
        var i = t._dp;
        return i && i.smoothChildTiming && t._ts && (t._start = Ct(t._dp._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)),
        $t(t),
        i._dirty || Vt(i, t)),
        t
    }, Ut = function(t, e) {
        var i;
        if ((e._time || e._initted && !e._dur) && (i = Xt(t.rawTime(), e),
        (!e._dur || ie(0, e.totalDuration(), i) - e._tTime > 1e-8) && e.render(i, !0)),
        Vt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (i = t; i._dp; )
                    i.rawTime() >= 0 && i.totalTime(i._tTime),
                    i = i._dp;
            t._zTime = -1e-8
        }
    }, Ht = function(t, e, i, r) {
        return e.parent && Nt(e),
        e._start = Ct(i + e._delay),
        e._end = Ct(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)),
        function(t, e, i, r, n) {
            void 0 === i && (i = "_first"),
            void 0 === r && (r = "_last");
            var s, o = t[r];
            if (n)
                for (s = e[n]; o && o[n] > s; )
                    o = o._prev;
            o ? (e._next = o._next,
            o._next = e) : (e._next = t[i],
            t[i] = e),
            e._next ? e._next._prev = e : t[r] = e,
            e._prev = o,
            e.parent = e._dp = t
        }(t, e, "_first", "_last", t._sort ? "_start" : 0),
        t._recent = e,
        r || Ut(t, e),
        t
    }, Gt = function(t, e) {
        return (ot.ScrollTrigger || ut("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t)
    }, Zt = function(t, e, i, r) {
        return He(t, e),
        t._initted ? !i && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && E !== Ee.frame ? (pt.push(t),
        t._lazy = [e, r],
        1) : void 0 : 1
    }, Qt = function(t, e, i, r) {
        var n = t._repeat
          , s = Ct(e) || 0
          , o = t._tTime / t._tDur;
        return o && !r && (t._time *= s / t._dur),
        t._dur = s,
        t._tDur = n ? n < 0 ? 1e10 : Ct(s * (n + 1) + t._rDelay * n) : s,
        o && !r ? jt(t, t._tTime = t._tDur * o) : t.parent && $t(t),
        i || Vt(t.parent, t),
        t
    }, Jt = function(t) {
        return t instanceof Ye ? Vt(t) : Qt(t, t._dur)
    }, Kt = {
        _start: 0,
        endTime: dt
    }, te = function t(e, i) {
        var r, n, s = e.labels, o = e._recent || Kt, a = e.duration() >= B ? o.endTime(!1) : e._dur;
        return X(i) && (isNaN(i) || i in s) ? "<" === (r = i.charAt(0)) || ">" === r ? ("<" === r ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) : (r = i.indexOf("=")) < 0 ? (i in s || (s[i] = a),
        s[i]) : (n = +(i.charAt(r - 1) + i.substr(r + 1)),
        r > 1 ? t(e, i.substr(0, r - 1)) + n : a + n) : null == i ? a : +i
    }, ee = function(t, e) {
        return t || 0 === t ? e(t) : e
    }, ie = function(t, e, i) {
        return i < t ? t : i > e ? e : i
    }, re = function(t) {
        return (t = (t + "").substr((parseFloat(t) + "").length)) && isNaN(t) ? t : ""
    }, ne = [].slice, se = function(t, e) {
        return t && H(t) && "length"in t && (!e && !t.length || t.length - 1 in t && H(t[0])) && !t.nodeType && t !== k
    }, oe = function(t, e, i) {
        return void 0 === i && (i = []),
        t.forEach((function(t) {
            var r;
            return X(t) && !e || se(t, 1) ? (r = i).push.apply(r, ae(t)) : i.push(t)
        }
        )) || i
    }, ae = function(t, e) {
        return !X(t) || e || !C && Oe() ? K(t) ? oe(t, e) : se(t) ? ne.call(t, 0) : t ? [t] : [] : ne.call(S.querySelectorAll(t), 0)
    }, le = function(t) {
        return t.sort((function() {
            return .5 - Math.random()
        }
        ))
    }, ue = function(t) {
        if ($(t))
            return t;
        var e = H(t) ? t : {
            each: t
        }
          , i = De(e.ease)
          , r = e.from || 0
          , n = parseFloat(e.base) || 0
          , s = {}
          , o = r > 0 && r < 1
          , a = isNaN(r) || o
          , l = e.axis
          , u = r
          , c = r;
        return X(r) ? u = c = {
            center: .5,
            edges: .5,
            end: 1
        }[r] || 0 : !o && a && (u = r[0],
        c = r[1]),
        function(t, o, h) {
            var d, f, p, g, m, v, _, y, b, x = (h || e).length, w = s[x];
            if (!w) {
                if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, B])[1])) {
                    for (_ = -B; _ < (_ = h[b++].getBoundingClientRect().left) && b < x; )
                        ;
                    b--
                }
                for (w = s[x] = [],
                d = a ? Math.min(b, x) * u - .5 : r % b,
                f = a ? x * c / b - .5 : r / b | 0,
                _ = 0,
                y = B,
                v = 0; v < x; v++)
                    p = v % b - d,
                    g = f - (v / b | 0),
                    w[v] = m = l ? Math.abs("y" === l ? g : p) : q(p * p + g * g),
                    m > _ && (_ = m),
                    m < y && (y = m);
                "random" === r && le(w),
                w.max = _ - y,
                w.min = y,
                w.v = x = (parseFloat(e.amount) || parseFloat(e.each) * (b > x ? x - 1 : l ? "y" === l ? x / b : b : Math.max(b, x / b)) || 0) * ("edges" === r ? -1 : 1),
                w.b = x < 0 ? n - x : n,
                w.u = re(e.amount || e.each) || 0,
                i = i && x < 0 ? Fe(i) : i
            }
            return x = (w[t] - w.min) / w.max || 0,
            Ct(w.b + (i ? i(x) : x) * w.v) + w.u
        }
    }, ce = function(t) {
        var e = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
        return function(i) {
            return Math.floor(Math.round(parseFloat(i) / t) * t * e) / e + (j(i) ? 0 : re(i))
        }
    }, he = function(t, e) {
        var i, r, n = K(t);
        return !n && H(t) && (i = n = t.radius || B,
        t.values ? (t = ae(t.values),
        (r = !j(t[0])) && (i *= i)) : t = ce(t.increment)),
        ee(e, n ? $(t) ? function(e) {
            return r = t(e),
            Math.abs(r - e) <= i ? r : e
        }
        : function(e) {
            for (var n, s, o = parseFloat(r ? e.x : e), a = parseFloat(r ? e.y : 0), l = B, u = 0, c = t.length; c--; )
                (n = r ? (n = t[c].x - o) * n + (s = t[c].y - a) * s : Math.abs(t[c] - o)) < l && (l = n,
                u = c);
            return u = !i || l <= i ? t[u] : e,
            r || u === e || j(e) ? u : u + re(e)
        }
        : ce(t))
    }, de = function(t, e, i, r) {
        return ee(K(t) ? !e : !0 === i ? !!(i = 0) : !r, (function() {
            return K(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t + Math.random() * (e - t)) / i) * i * r) / r
        }
        ))
    }, fe = function(t, e, i) {
        return ee(i, (function(i) {
            return t[~~e(i)]
        }
        ))
    }, pe = function(t) {
        for (var e, i, r, n, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
            r = t.indexOf(")", e),
            n = "[" === t.charAt(e + 7),
            i = t.substr(e + 7, r - e - 7).match(n ? st : tt),
            o += t.substr(s, e - s) + de(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5),
            s = r + 1;
        return o + t.substr(s, t.length - s)
    }, ge = function(t, e, i, r, n) {
        var s = e - t
          , o = r - i;
        return ee(n, (function(e) {
            return i + ((e - t) / s * o || 0)
        }
        ))
    }, me = function(t, e, i) {
        var r, n, s, o = t.labels, a = B;
        for (r in o)
            (n = o[r] - e) < 0 == !!i && n && a > (n = Math.abs(n)) && (s = r,
            a = n);
        return s
    }, ve = function(t, e, i) {
        var r, n, s = t.vars, o = s[e];
        if (o)
            return r = s[e + "Params"],
            n = s.callbackScope || t,
            i && pt.length && Et(),
            r ? o.apply(n, r) : o.call(n)
    }, _e = function(t) {
        return Nt(t),
        t.progress() < 1 && ve(t, "onInterrupt"),
        t
    }, ye = function(t) {
        var e = (t = !t.name && t.default || t).name
          , i = $(t)
          , r = e && !i && t.init ? function() {
            this._props = []
        }
        : t
          , n = {
            init: dt,
            render: ai,
            add: je,
            kill: ui,
            modifier: li,
            rawVars: 0
        }
          , s = {
            targetTest: 0,
            get: 0,
            getSetter: ri,
            aliases: {},
            register: 0
        };
        if (Oe(),
        t !== r) {
            if (mt[e])
                return;
            zt(r, zt(Dt(t, n), s)),
            Ft(r.prototype, Ft(n, Dt(t, s))),
            mt[r.prop = e] = r,
            t.targetTest && (yt.push(r),
            ft[e] = 1),
            e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
        }
        ht(e, r),
        t.register && t.register(mi, r, di)
    }, be = {
        aqua: [0, 255, 255],
        lime: [0, 255, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, 255],
        navy: [0, 0, 128],
        white: [255, 255, 255],
        olive: [128, 128, 0],
        yellow: [255, 255, 0],
        orange: [255, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [255, 0, 0],
        pink: [255, 192, 203],
        cyan: [0, 255, 255],
        transparent: [255, 255, 255, 0]
    }, xe = function(t, e, i) {
        return 255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
    }, we = function(t, e, i) {
        var r, n, s, o, a, l, u, c, h, d, f = t ? j(t) ? [t >> 16, t >> 8 & 255, 255 & t] : 0 : be.black;
        if (!f) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)),
            be[t])
                f = be[t];
            else if ("#" === t.charAt(0))
                4 === t.length && (r = t.charAt(1),
                n = t.charAt(2),
                s = t.charAt(3),
                t = "#" + r + r + n + n + s + s),
                f = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t];
            else if ("hsl" === t.substr(0, 3))
                if (f = d = t.match(tt),
                e) {
                    if (~t.indexOf("="))
                        return f = t.match(et),
                        i && f.length < 4 && (f[3] = 1),
                        f
                } else
                    o = +f[0] % 360 / 360,
                    a = +f[1] / 100,
                    r = 2 * (l = +f[2] / 100) - (n = l <= .5 ? l * (a + 1) : l + a - l * a),
                    f.length > 3 && (f[3] *= 1),
                    f[0] = xe(o + 1 / 3, r, n),
                    f[1] = xe(o, r, n),
                    f[2] = xe(o - 1 / 3, r, n);
            else
                f = t.match(tt) || be.transparent;
            f = f.map(Number)
        }
        return e && !d && (r = f[0] / 255,
        n = f[1] / 255,
        s = f[2] / 255,
        l = ((u = Math.max(r, n, s)) + (c = Math.min(r, n, s))) / 2,
        u === c ? o = a = 0 : (h = u - c,
        a = l > .5 ? h / (2 - u - c) : h / (u + c),
        o = u === r ? (n - s) / h + (n < s ? 6 : 0) : u === n ? (s - r) / h + 2 : (r - n) / h + 4,
        o *= 60),
        f[0] = ~~(o + .5),
        f[1] = ~~(100 * a + .5),
        f[2] = ~~(100 * l + .5)),
        i && f.length < 4 && (f[3] = 1),
        f
    }, Te = function(t) {
        var e = []
          , i = []
          , r = -1;
        return t.split(Ce).forEach((function(t) {
            var n = t.match(it) || [];
            e.push.apply(e, n),
            i.push(r += n.length + 1)
        }
        )),
        e.c = i,
        e
    }, ke = function(t, e, i) {
        var r, n, s, o, a = "", l = (t + a).match(Ce), u = e ? "hsla(" : "rgba(", c = 0;
        if (!l)
            return t;
        if (l = l.map((function(t) {
            return (t = we(t, e, 1)) && u + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
        }
        )),
        i && (s = Te(t),
        (r = i.c).join(a) !== s.c.join(a)))
            for (o = (n = t.replace(Ce, "1").split(it)).length - 1; c < o; c++)
                a += n[c] + (~r.indexOf(c) ? l.shift() || u + "0,0,0,0)" : (s.length ? s : l.length ? l : i).shift());
        if (!n)
            for (o = (n = t.split(Ce)).length - 1; c < o; c++)
                a += n[c] + l[c];
        return a + n[o]
    }, Ce = function() {
        var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (t in be)
            e += "|" + t + "\\b";
        return new RegExp(e + ")","gi")
    }(), Se = /hsl[a]?\(/, Ae = function(t) {
        var e, i = t.join(" ");
        if (Ce.lastIndex = 0,
        Ce.test(i))
            return e = Se.test(i),
            t[1] = ke(t[1], e),
            t[0] = ke(t[0], e, Te(t[1])),
            !0
    }, Ee = function() {
        var t, e, i, r, n, s, o = Date.now, a = 500, l = 33, u = o(), c = u, h = 1e3 / 240, d = h, f = [], p = function i(p) {
            var g, m, v, _, y = o() - c, b = !0 === p;
            if (y > a && (u += y - l),
            ((g = (v = (c += y) - u) - d) > 0 || b) && (_ = ++r.frame,
            n = v - 1e3 * r.time,
            r.time = v /= 1e3,
            d += g + (g >= h ? 4 : h - g),
            m = 1),
            b || (t = e(i)),
            m)
                for (s = 0; s < f.length; s++)
                    f[s](v, n, _, p)
        };
        return r = {
            time: 0,
            frame: 0,
            tick: function() {
                p(!0)
            },
            deltaRatio: function(t) {
                return n / (1e3 / (t || 60))
            },
            wake: function() {
                A && (!C && Z() && (k = C = window,
                S = k.document || {},
                ot.gsap = mi,
                (k.gsapVersions || (k.gsapVersions = [])).push(mi.version),
                lt(at || k.GreenSockGlobals || !k.gsap && k || {}),
                i = k.requestAnimationFrame),
                t && r.sleep(),
                e = i || function(t) {
                    return setTimeout(t, d - 1e3 * r.time + 1 | 0)
                }
                ,
                M = 1,
                p(2))
            },
            sleep: function() {
                (i ? k.cancelAnimationFrame : clearTimeout)(t),
                M = 0,
                e = dt
            },
            lagSmoothing: function(t, e) {
                a = t || 1 / 1e-8,
                l = Math.min(e, a, 0)
            },
            fps: function(t) {
                h = 1e3 / (t || 240),
                d = 1e3 * r.time + h
            },
            add: function(t) {
                f.indexOf(t) < 0 && f.push(t),
                Oe()
            },
            remove: function(t) {
                var e;
                ~(e = f.indexOf(t)) && f.splice(e, 1) && s >= e && s--
            },
            _listeners: f
        }
    }(), Oe = function() {
        return !M && Ee.wake()
    }, Me = {}, Le = /^[\d.\-M][\d.\-,\s]/, ze = /["']/g, Pe = function(t) {
        for (var e, i, r, n = {}, s = t.substr(1, t.length - 3).split(":"), o = s[0], a = 1, l = s.length; a < l; a++)
            i = s[a],
            e = a !== l - 1 ? i.lastIndexOf(",") : i.length,
            r = i.substr(0, e),
            n[o] = isNaN(r) ? r.replace(ze, "").trim() : +r,
            o = i.substr(e + 1).trim();
        return n
    }, Fe = function(t) {
        return function(e) {
            return 1 - t(1 - e)
        }
    }, Re = function t(e, i) {
        for (var r, n = e._first; n; )
            n instanceof Ye ? t(n, i) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === i || (n.timeline ? t(n.timeline, i) : (r = n._ease,
            n._ease = n._yEase,
            n._yEase = r,
            n._yoyo = i)),
            n = n._next
    }, De = function(t, e) {
        return t && ($(t) ? t : Me[t] || function(t) {
            var e, i, r, n, s = (t + "").split("("), o = Me[s[0]];
            return o && s.length > 1 && o.config ? o.config.apply(null, ~t.indexOf("{") ? [Pe(s[1])] : (e = t,
            i = e.indexOf("(") + 1,
            r = e.indexOf(")"),
            n = e.indexOf("(", i),
            e.substring(i, ~n && n < r ? e.indexOf(")", r + 1) : r)).split(",").map(Mt)) : Me._CE && Le.test(t) ? Me._CE("", t) : o
        }(t)) || e
    }, Be = function(t, e, i, r) {
        void 0 === i && (i = function(t) {
            return 1 - e(1 - t)
        }
        ),
        void 0 === r && (r = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        }
        );
        var n, s = {
            easeIn: e,
            easeOut: i,
            easeInOut: r
        };
        return kt(t, (function(t) {
            for (var e in Me[t] = ot[t] = s,
            Me[n = t.toLowerCase()] = i,
            s)
                Me[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Me[t + "." + e] = s[e]
        }
        )),
        s
    }, Ie = function(t) {
        return function(e) {
            return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
        }
    }, Ne = function t(e, i, r) {
        var n = i >= 1 ? i : 1
          , s = (r || (e ? .3 : .45)) / (i < 1 ? i : 1)
          , o = s / I * (Math.asin(1 / n) || 0)
          , a = function(t) {
            return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Y((t - o) * s) + 1
        }
          , l = "out" === e ? a : "in" === e ? function(t) {
            return 1 - a(1 - t)
        }
        : Ie(a);
        return s = I / s,
        l.config = function(i, r) {
            return t(e, i, r)
        }
        ,
        l
    }, Ve = function t(e, i) {
        void 0 === i && (i = 1.70158);
        var r = function(t) {
            return t ? --t * t * ((i + 1) * t + i) + 1 : 0
        }
          , n = "out" === e ? r : "in" === e ? function(t) {
            return 1 - r(1 - t)
        }
        : Ie(r);
        return n.config = function(i) {
            return t(e, i)
        }
        ,
        n
    };
    kt("Linear,Quad,Cubic,Quart,Quint,Strong", (function(t, e) {
        var i = e < 5 ? e + 1 : e;
        Be(t + ",Power" + (i - 1), e ? function(t) {
            return Math.pow(t, i)
        }
        : function(t) {
            return t
        }
        , (function(t) {
            return 1 - Math.pow(1 - t, i)
        }
        ), (function(t) {
            return t < .5 ? Math.pow(2 * t, i) / 2 : 1 - Math.pow(2 * (1 - t), i) / 2
        }
        ))
    }
    )),
    Me.Linear.easeNone = Me.none = Me.Linear.easeIn,
    Be("Elastic", Ne("in"), Ne("out"), Ne()),
    L = 7.5625,
    P = 1 / (z = 2.75),
    Be("Bounce", (function(t) {
        return 1 - F(1 - t)
    }
    ), F = function(t) {
        return t < P ? L * t * t : t < .7272727272727273 ? L * Math.pow(t - 1.5 / z, 2) + .75 : t < .9090909090909092 ? L * (t -= 2.25 / z) * t + .9375 : L * Math.pow(t - 2.625 / z, 2) + .984375
    }
    ),
    Be("Expo", (function(t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    }
    )),
    Be("Circ", (function(t) {
        return -(q(1 - t * t) - 1)
    }
    )),
    Be("Sine", (function(t) {
        return 1 === t ? 1 : 1 - W(t * N)
    }
    )),
    Be("Back", Ve("in"), Ve("out"), Ve()),
    Me.SteppedEase = Me.steps = ot.SteppedEase = {
        config: function(t, e) {
            void 0 === t && (t = 1);
            var i = 1 / t
              , r = t + (e ? 0 : 1)
              , n = e ? 1 : 0;
            return function(t) {
                return ((r * ie(0, 1 - 1e-8, t) | 0) + n) * i
            }
        }
    },
    D.ease = Me["quad.out"],
    kt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(t) {
        return bt += t + "," + t + "Params,"
    }
    ));
    var qe = function(t, e) {
        this.id = V++,
        t._gsap = this,
        this.target = t,
        this.harness = e,
        this.get = e ? e.get : Tt,
        this.set = e ? e.getSetter : ri
    }
      , We = function() {
        function t(t, e) {
            var i = t.parent || T;
            this.vars = t,
            this._delay = +t.delay || 0,
            (this._repeat = t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
            this._yoyo = !!t.yoyo || !!t.yoyoEase),
            this._ts = 1,
            Qt(this, +t.duration, 1, 1),
            this.data = t.data,
            M || Ee.wake(),
            i && Ht(i, this, e || 0 === e ? e : i._time, 1),
            t.reversed && this.reverse(),
            t.paused && this.paused(!0)
        }
        var e = t.prototype;
        return e.delay = function(t) {
            return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay),
            this._delay = t,
            this) : this._delay
        }
        ,
        e.duration = function(t) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
        }
        ,
        e.totalDuration = function(t) {
            return arguments.length ? (this._dirty = 0,
            Qt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }
        ,
        e.totalTime = function(t, e) {
            if (Oe(),
            !arguments.length)
                return this._tTime;
            var i = this._dp;
            if (i && i.smoothChildTiming && this._ts) {
                for (jt(this, t); i.parent; )
                    i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0),
                    i = i.parent;
                !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Ht(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== t || !this._dur && !e || this._initted && 1e-8 === Math.abs(this._zTime) || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t),
            Ot(this, t, e)),
            this
        }
        ,
        e.time = function(t, e) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Wt(this)) % this._dur || (t ? this._dur : 0), e) : this._time
        }
        ,
        e.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
        }
        ,
        e.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Wt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
        }
        ,
        e.iteration = function(t, e) {
            var i = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * i, e) : this._repeat ? Yt(this._tTime, i) + 1 : 1
        }
        ,
        e.timeScale = function(t) {
            if (!arguments.length)
                return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === t)
                return this;
            var e = this.parent && this._ts ? Xt(this.parent._time, this) : this._tTime;
            return this._rts = +t || 0,
            this._ts = this._ps || -1e-8 === t ? 0 : this._rts,
            qt(this.totalTime(ie(-this._delay, this._tDur, e), !0))
        }
        ,
        e.paused = function(t) {
            return arguments.length ? (this._ps !== t && (this._ps = t,
            t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
            this._ts = this._act = 0) : (Oe(),
            this._ts = this._rts,
            this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= 1e-8) && 1e-8 !== Math.abs(this._zTime)))),
            this) : this._ps
        }
        ,
        e.startTime = function(t) {
            if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return e && (e._sort || !this.parent) && Ht(e, this, t - this._delay),
                this
            }
            return this._start
        }
        ,
        e.endTime = function(t) {
            return this._start + (G(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
        }
        ,
        e.rawTime = function(t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Xt(e.rawTime(t), this) : this._tTime : this._tTime
        }
        ,
        e.globalTime = function(t) {
            for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
                i = e._start + i / (e._ts || 1),
                e = e._dp;
            return i
        }
        ,
        e.repeat = function(t) {
            return arguments.length ? (this._repeat = t,
            Jt(this)) : this._repeat
        }
        ,
        e.repeatDelay = function(t) {
            return arguments.length ? (this._rDelay = t,
            Jt(this)) : this._rDelay
        }
        ,
        e.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t,
            this) : this._yoyo
        }
        ,
        e.seek = function(t, e) {
            return this.totalTime(te(this, t), G(e))
        }
        ,
        e.restart = function(t, e) {
            return this.play().totalTime(t ? -this._delay : 0, G(e))
        }
        ,
        e.play = function(t, e) {
            return null != t && this.seek(t, e),
            this.reversed(!1).paused(!1)
        }
        ,
        e.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
        }
        ,
        e.pause = function(t, e) {
            return null != t && this.seek(t, e),
            this.paused(!0)
        }
        ,
        e.resume = function() {
            return this.paused(!1)
        }
        ,
        e.reversed = function(t) {
            return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)),
            this) : this._rts < 0
        }
        ,
        e.invalidate = function() {
            return this._initted = 0,
            this._zTime = -1e-8,
            this
        }
        ,
        e.isActive = function() {
            var t, e = this.parent || this._dp, i = this._start;
            return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= i && t < this.endTime(!0) - 1e-8))
        }
        ,
        e.eventCallback = function(t, e, i) {
            var r = this.vars;
            return arguments.length > 1 ? (e ? (r[t] = e,
            i && (r[t + "Params"] = i),
            "onUpdate" === t && (this._onUpdate = e)) : delete r[t],
            this) : r[t]
        }
        ,
        e.then = function(t) {
            var e = this;
            return new Promise((function(i) {
                var r = $(t) ? t : Lt
                  , n = function() {
                    var t = e.then;
                    e.then = null,
                    $(r) && (r = r(e)) && (r.then || r === e) && (e.then = t),
                    i(r),
                    e.then = t
                };
                e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? n() : e._prom = n
            }
            ))
        }
        ,
        e.kill = function() {
            _e(this)
        }
        ,
        t
    }();
    zt(We.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Ye = function(t) {
        function e(e, i) {
            var r;
            return void 0 === e && (e = {}),
            (r = t.call(this, e, i) || this).labels = {},
            r.smoothChildTiming = !!e.smoothChildTiming,
            r.autoRemoveChildren = !!e.autoRemoveChildren,
            r._sort = G(e.sortChildren),
            r.parent && Ut(r.parent, x(r)),
            e.scrollTrigger && Gt(x(r), e.scrollTrigger),
            r
        }
        w(e, t);
        var i = e.prototype;
        return i.to = function(t, e, i) {
            return new Je(t,At(arguments, 0, this),te(this, j(e) ? arguments[3] : i)),
            this
        }
        ,
        i.from = function(t, e, i) {
            return new Je(t,At(arguments, 1, this),te(this, j(e) ? arguments[3] : i)),
            this
        }
        ,
        i.fromTo = function(t, e, i, r) {
            return new Je(t,At(arguments, 2, this),te(this, j(e) ? arguments[4] : r)),
            this
        }
        ,
        i.set = function(t, e, i) {
            return e.duration = 0,
            e.parent = this,
            Bt(e).repeatDelay || (e.repeat = 0),
            e.immediateRender = !!e.immediateRender,
            new Je(t,e,te(this, i),1),
            this
        }
        ,
        i.call = function(t, e, i) {
            return Ht(this, Je.delayedCall(0, t, e), te(this, i))
        }
        ,
        i.staggerTo = function(t, e, i, r, n, s, o) {
            return i.duration = e,
            i.stagger = i.stagger || r,
            i.onComplete = s,
            i.onCompleteParams = o,
            i.parent = this,
            new Je(t,i,te(this, n)),
            this
        }
        ,
        i.staggerFrom = function(t, e, i, r, n, s, o) {
            return i.runBackwards = 1,
            Bt(i).immediateRender = G(i.immediateRender),
            this.staggerTo(t, e, i, r, n, s, o)
        }
        ,
        i.staggerFromTo = function(t, e, i, r, n, s, o, a) {
            return r.startAt = i,
            Bt(r).immediateRender = G(r.immediateRender),
            this.staggerTo(t, e, r, n, s, o, a)
        }
        ,
        i.render = function(t, e, i) {
            var r, n, s, o, a, l, u, c, h, d, f, p, g = this._time, m = this._dirty ? this.totalDuration() : this._tDur, v = this._dur, _ = this !== T && t > m - 1e-8 && t >= 0 ? m : t < 1e-8 ? 0 : t, y = this._zTime < 0 != t < 0 && (this._initted || !v);
            if (_ !== this._tTime || i || y) {
                if (g !== this._time && v && (_ += this._time - g,
                t += this._time - g),
                r = _,
                h = this._start,
                l = !(c = this._ts),
                y && (v || (g = this._zTime),
                (t || !e) && (this._zTime = t)),
                this._repeat && (f = this._yoyo,
                a = v + this._rDelay,
                r = Ct(_ % a),
                _ === m ? (o = this._repeat,
                r = v) : ((o = ~~(_ / a)) && o === _ / a && (r = v,
                o--),
                r > v && (r = v)),
                d = Yt(this._tTime, a),
                !g && this._tTime && d !== o && (d = o),
                f && 1 & o && (r = v - r,
                p = 1),
                o !== d && !this._lock)) {
                    var b = f && 1 & d
                      , x = b === (f && 1 & o);
                    if (o < d && (b = !b),
                    g = b ? 0 : v,
                    this._lock = 1,
                    this.render(g || (p ? 0 : Ct(o * a)), e, !v)._lock = 0,
                    !e && this.parent && ve(this, "onRepeat"),
                    this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                    g !== this._time || l !== !this._ts)
                        return this;
                    if (v = this._dur,
                    m = this._tDur,
                    x && (this._lock = 2,
                    g = b ? v : -1e-4,
                    this.render(g, !0),
                    this.vars.repeatRefresh && !p && this.invalidate()),
                    this._lock = 0,
                    !this._ts && !l)
                        return this;
                    Re(this, p)
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (u = function(t, e, i) {
                    var r;
                    if (i > e)
                        for (r = t._first; r && r._start <= i; ) {
                            if (!r._dur && "isPause" === r.data && r._start > e)
                                return r;
                            r = r._next
                        }
                    else
                        for (r = t._last; r && r._start >= i; ) {
                            if (!r._dur && "isPause" === r.data && r._start < e)
                                return r;
                            r = r._prev
                        }
                }(this, Ct(g), Ct(r))) && (_ -= r - (r = u._start)),
                this._tTime = _,
                this._time = r,
                this._act = !c,
                this._initted || (this._onUpdate = this.vars.onUpdate,
                this._initted = 1,
                this._zTime = t),
                !g && r && !e && ve(this, "onStart"),
                r >= g && t >= 0)
                    for (n = this._first; n; ) {
                        if (s = n._next,
                        (n._act || r >= n._start) && n._ts && u !== n) {
                            if (n.parent !== this)
                                return this.render(t, e, i);
                            if (n.render(n._ts > 0 ? (r - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (r - n._start) * n._ts, e, i),
                            r !== this._time || !this._ts && !l) {
                                u = 0,
                                s && (_ += this._zTime = -1e-8);
                                break
                            }
                        }
                        n = s
                    }
                else {
                    n = this._last;
                    for (var w = t < 0 ? t : r; n; ) {
                        if (s = n._prev,
                        (n._act || w <= n._end) && n._ts && u !== n) {
                            if (n.parent !== this)
                                return this.render(t, e, i);
                            if (n.render(n._ts > 0 ? (w - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (w - n._start) * n._ts, e, i),
                            r !== this._time || !this._ts && !l) {
                                u = 0,
                                s && (_ += this._zTime = w ? -1e-8 : 1e-8);
                                break
                            }
                        }
                        n = s
                    }
                }
                if (u && !e && (this.pause(),
                u.render(r >= g ? 0 : -1e-8)._zTime = r >= g ? 1 : -1,
                this._ts))
                    return this._start = h,
                    $t(this),
                    this.render(t, e, i);
                this._onUpdate && !e && ve(this, "onUpdate", !0),
                (_ === m && m >= this.totalDuration() || !_ && g) && (h !== this._start && Math.abs(c) === Math.abs(this._ts) || this._lock || ((t || !v) && (_ === m && this._ts > 0 || !_ && this._ts < 0) && Nt(this, 1),
                e || t < 0 && !g || !_ && !g || (ve(this, _ === m ? "onComplete" : "onReverseComplete", !0),
                this._prom && !(_ < m && this.timeScale() > 0) && this._prom())))
            }
            return this
        }
        ,
        i.add = function(t, e) {
            var i = this;
            if (j(e) || (e = te(this, e)),
            !(t instanceof We)) {
                if (K(t))
                    return t.forEach((function(t) {
                        return i.add(t, e)
                    }
                    )),
                    this;
                if (X(t))
                    return this.addLabel(t, e);
                if (!$(t))
                    return this;
                t = Je.delayedCall(0, t)
            }
            return this !== t ? Ht(this, t, e) : this
        }
        ,
        i.getChildren = function(t, e, i, r) {
            void 0 === t && (t = !0),
            void 0 === e && (e = !0),
            void 0 === i && (i = !0),
            void 0 === r && (r = -B);
            for (var n = [], s = this._first; s; )
                s._start >= r && (s instanceof Je ? e && n.push(s) : (i && n.push(s),
                t && n.push.apply(n, s.getChildren(!0, e, i)))),
                s = s._next;
            return n
        }
        ,
        i.getById = function(t) {
            for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
                if (e[i].vars.id === t)
                    return e[i]
        }
        ,
        i.remove = function(t) {
            return X(t) ? this.removeLabel(t) : $(t) ? this.killTweensOf(t) : (It(this, t),
            t === this._recent && (this._recent = this._last),
            Vt(this))
        }
        ,
        i.totalTime = function(e, i) {
            return arguments.length ? (this._forcing = 1,
            !this._dp && this._ts && (this._start = Ct(Ee.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))),
            t.prototype.totalTime.call(this, e, i),
            this._forcing = 0,
            this) : this._tTime
        }
        ,
        i.addLabel = function(t, e) {
            return this.labels[t] = te(this, e),
            this
        }
        ,
        i.removeLabel = function(t) {
            return delete this.labels[t],
            this
        }
        ,
        i.addPause = function(t, e, i) {
            var r = Je.delayedCall(0, e || dt, i);
            return r.data = "isPause",
            this._hasPause = 1,
            Ht(this, r, te(this, t))
        }
        ,
        i.removePause = function(t) {
            var e = this._first;
            for (t = te(this, t); e; )
                e._start === t && "isPause" === e.data && Nt(e),
                e = e._next
        }
        ,
        i.killTweensOf = function(t, e, i) {
            for (var r = this.getTweensOf(t, i), n = r.length; n--; )
                Xe !== r[n] && r[n].kill(t, e);
            return this
        }
        ,
        i.getTweensOf = function(t, e) {
            for (var i, r = [], n = ae(t), s = this._first, o = j(e); s; )
                s instanceof Je ? St(s._targets, n) && (o ? (!Xe || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && r.push(s) : (i = s.getTweensOf(n, e)).length && r.push.apply(r, i),
                s = s._next;
            return r
        }
        ,
        i.tweenTo = function(t, e) {
            e = e || {};
            var i = this
              , r = te(i, t)
              , n = e
              , s = n.startAt
              , o = n.onStart
              , a = n.onStartParams
              , l = Je.to(i, zt(e, {
                ease: "none",
                lazy: !1,
                time: r,
                overwrite: "auto",
                duration: e.duration || Math.abs((r - (s && "time"in s ? s.time : i._time)) / i.timeScale()) || 1e-8,
                onStart: function() {
                    i.pause();
                    var t = e.duration || Math.abs((r - i._time) / i.timeScale());
                    l._dur !== t && Qt(l, t, 0, 1).render(l._time, !0, !0),
                    o && o.apply(l, a || [])
                }
            }));
            return l
        }
        ,
        i.tweenFromTo = function(t, e, i) {
            return this.tweenTo(e, zt({
                startAt: {
                    time: te(this, t)
                }
            }, i))
        }
        ,
        i.recent = function() {
            return this._recent
        }
        ,
        i.nextLabel = function(t) {
            return void 0 === t && (t = this._time),
            me(this, te(this, t))
        }
        ,
        i.previousLabel = function(t) {
            return void 0 === t && (t = this._time),
            me(this, te(this, t), 1)
        }
        ,
        i.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + 1e-8)
        }
        ,
        i.shiftChildren = function(t, e, i) {
            void 0 === i && (i = 0);
            for (var r, n = this._first, s = this.labels; n; )
                n._start >= i && (n._start += t,
                n._end += t),
                n = n._next;
            if (e)
                for (r in s)
                    s[r] >= i && (s[r] += t);
            return Vt(this)
        }
        ,
        i.invalidate = function() {
            var e = this._first;
            for (this._lock = 0; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        i.clear = function(t) {
            void 0 === t && (t = !0);
            for (var e, i = this._first; i; )
                e = i._next,
                this.remove(i),
                i = e;
            return this._time = this._tTime = this._pTime = 0,
            t && (this.labels = {}),
            Vt(this)
        }
        ,
        i.totalDuration = function(t) {
            var e, i, r, n = 0, s = this, o = s._last, a = B;
            if (arguments.length)
                return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -t : t));
            if (s._dirty) {
                for (r = s.parent; o; )
                    e = o._prev,
                    o._dirty && o.totalDuration(),
                    (i = o._start) > a && s._sort && o._ts && !s._lock ? (s._lock = 1,
                    Ht(s, o, i - o._delay, 1)._lock = 0) : a = i,
                    i < 0 && o._ts && (n -= i,
                    (!r && !s._dp || r && r.smoothChildTiming) && (s._start += i / s._ts,
                    s._time -= i,
                    s._tTime -= i),
                    s.shiftChildren(-i, !1, -Infinity),
                    a = 0),
                    o._end > n && o._ts && (n = o._end),
                    o = e;
                Qt(s, s === T && s._time > n ? s._time : n, 1, 1),
                s._dirty = 0
            }
            return s._tDur
        }
        ,
        e.updateRoot = function(t) {
            if (T._ts && (Ot(T, Xt(t, T)),
            E = Ee.frame),
            Ee.frame >= _t) {
                _t += R.autoSleep || 120;
                var e = T._first;
                if ((!e || !e._ts) && R.autoSleep && Ee._listeners.length < 2) {
                    for (; e && !e._ts; )
                        e = e._next;
                    e || Ee.sleep()
                }
            }
        }
        ,
        e
    }(We);
    zt(Ye.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var Xe, $e = function(t, e, i, r, n, s, o) {
        var a, l, u, c, h, d, f, p, g = new di(this._pt,t,e,0,1,oi,null,n), m = 0, v = 0;
        for (g.b = i,
        g.e = r,
        i += "",
        (f = ~(r += "").indexOf("random(")) && (r = pe(r)),
        s && (s(p = [i, r], t, e),
        i = p[0],
        r = p[1]),
        l = i.match(rt) || []; a = rt.exec(r); )
            c = a[0],
            h = r.substring(m, a.index),
            u ? u = (u + 1) % 5 : "rgba(" === h.substr(-5) && (u = 1),
            c !== l[v++] && (d = parseFloat(l[v - 1]) || 0,
            g._pt = {
                _next: g._pt,
                p: h || 1 === v ? h : ",",
                s: d,
                c: "=" === c.charAt(1) ? parseFloat(c.substr(2)) * ("-" === c.charAt(0) ? -1 : 1) : parseFloat(c) - d,
                m: u && u < 4 ? Math.round : 0
            },
            m = rt.lastIndex);
        return g.c = m < r.length ? r.substring(m, r.length) : "",
        g.fp = o,
        (nt.test(r) || f) && (g.e = 0),
        this._pt = g,
        g
    }, je = function(t, e, i, r, n, s, o, a, l) {
        $(r) && (r = r(n || 0, t, s));
        var u, c = t[e], h = "get" !== i ? i : $(c) ? l ? t[e.indexOf("set") || !$(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : c, d = $(c) ? l ? ei : ti : Ke;
        if (X(r) && (~r.indexOf("random(") && (r = pe(r)),
        "=" === r.charAt(1) && (r = parseFloat(h) + parseFloat(r.substr(2)) * ("-" === r.charAt(0) ? -1 : 1) + (re(h) || 0))),
        h !== r)
            return isNaN(h * r) ? (!c && !(e in t) && ut(e, r),
            $e.call(this, t, e, h, r, d, a || R.stringFilter, l)) : (u = new di(this._pt,t,e,+h || 0,r - (h || 0),"boolean" == typeof c ? si : ni,0,d),
            l && (u.fp = l),
            o && u.modifier(o, this, t),
            this._pt = u)
    }, Ue = function(t, e, i, r, n, s) {
        var o, a, l, u;
        if (mt[t] && !1 !== (o = new mt[t]).init(n, o.rawVars ? e[t] : function(t, e, i, r, n) {
            if ($(t) && (t = Ge(t, n, e, i, r)),
            !H(t) || t.style && t.nodeType || K(t) || J(t))
                return X(t) ? Ge(t, n, e, i, r) : t;
            var s, o = {};
            for (s in t)
                o[s] = Ge(t[s], n, e, i, r);
            return o
        }(e[t], r, n, s, i), i, r, s) && (i._pt = a = new di(i._pt,n,t,0,1,o.render,o,0,o.priority),
        i !== O))
            for (l = i._ptLookup[i._targets.indexOf(n)],
            u = o._props.length; u--; )
                l[o._props[u]] = a;
        return o
    }, He = function t(e, i) {
        var r, n, s, o, a, l, u, c, h, d, f, p, g, m = e.vars, v = m.ease, _ = m.startAt, y = m.immediateRender, b = m.lazy, x = m.onUpdate, w = m.onUpdateParams, k = m.callbackScope, C = m.runBackwards, S = m.yoyoEase, A = m.keyframes, E = m.autoRevert, O = e._dur, M = e._startAt, L = e._targets, z = e.parent, P = z && "nested" === z.data ? z.parent._targets : L, F = "auto" === e._overwrite, R = e.timeline;
        if (R && (!A || !v) && (v = "none"),
        e._ease = De(v, D.ease),
        e._yEase = S ? Fe(De(!0 === S ? v : S, D.ease)) : 0,
        S && e._yoyo && !e._repeat && (S = e._yEase,
        e._yEase = e._ease,
        e._ease = S),
        !R) {
            if (p = (c = L[0] ? wt(L[0]).harness : 0) && m[c.prop],
            r = Dt(m, ft),
            M && M.render(-1, !0).kill(),
            _) {
                if (Nt(e._startAt = Je.set(L, zt({
                    data: "isStart",
                    overwrite: !1,
                    parent: z,
                    immediateRender: !0,
                    lazy: G(b),
                    startAt: null,
                    delay: 0,
                    onUpdate: x,
                    onUpdateParams: w,
                    callbackScope: k,
                    stagger: 0
                }, _))),
                y)
                    if (i > 0)
                        E || (e._startAt = 0);
                    else if (O && !(i < 0 && M))
                        return void (i && (e._zTime = i))
            } else if (C && O)
                if (M)
                    !E && (e._startAt = 0);
                else if (i && (y = !1),
                s = zt({
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: y && G(b),
                    immediateRender: y,
                    stagger: 0,
                    parent: z
                }, r),
                p && (s[c.prop] = p),
                Nt(e._startAt = Je.set(L, s)),
                y) {
                    if (!i)
                        return
                } else
                    t(e._startAt, 1e-8);
            for (e._pt = 0,
            b = O && G(b) || b && !O,
            n = 0; n < L.length; n++) {
                if (u = (a = L[n])._gsap || xt(L)[n]._gsap,
                e._ptLookup[n] = d = {},
                gt[u.id] && pt.length && Et(),
                f = P === L ? n : P.indexOf(a),
                c && !1 !== (h = new c).init(a, p || r, e, f, P) && (e._pt = o = new di(e._pt,a,h.name,0,1,h.render,h,0,h.priority),
                h._props.forEach((function(t) {
                    d[t] = o
                }
                )),
                h.priority && (l = 1)),
                !c || p)
                    for (s in r)
                        mt[s] && (h = Ue(s, r, e, f, a, P)) ? h.priority && (l = 1) : d[s] = o = je.call(e, a, s, "get", r[s], f, P, 0, m.stringFilter);
                e._op && e._op[n] && e.kill(a, e._op[n]),
                F && e._pt && (Xe = e,
                T.killTweensOf(a, d, e.globalTime(0)),
                g = !e.parent,
                Xe = 0),
                e._pt && b && (gt[u.id] = 1)
            }
            l && hi(e),
            e._onInit && e._onInit(e)
        }
        e._from = !R && !!m.runBackwards,
        e._onUpdate = x,
        e._initted = (!e._op || e._pt) && !g
    }, Ge = function(t, e, i, r, n) {
        return $(t) ? t.call(e, i, r, n) : X(t) && ~t.indexOf("random(") ? pe(t) : t
    }, Ze = bt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase", Qe = (Ze + ",id,stagger,delay,duration,paused,scrollTrigger").split(","), Je = function(t) {
        function e(e, i, r, n) {
            var s;
            "number" == typeof i && (r.duration = i,
            i = r,
            r = null);
            var o, a, l, u, c, h, d, f, p = (s = t.call(this, n ? i : Bt(i), r) || this).vars, g = p.duration, m = p.delay, v = p.immediateRender, _ = p.stagger, y = p.overwrite, b = p.keyframes, w = p.defaults, k = p.scrollTrigger, C = p.yoyoEase, S = s.parent, A = (K(e) || J(e) ? j(e[0]) : "length"in i) ? [e] : ae(e);
            if (s._targets = A.length ? xt(A) : ct("GSAP target " + e + " not found. https://greensock.com", !R.nullTargetWarn) || [],
            s._ptLookup = [],
            s._overwrite = y,
            b || _ || Q(g) || Q(m)) {
                if (i = s.vars,
                (o = s.timeline = new Ye({
                    data: "nested",
                    defaults: w || {}
                })).kill(),
                o.parent = x(s),
                b)
                    zt(o.vars.defaults, {
                        ease: "none"
                    }),
                    b.forEach((function(t) {
                        return o.to(A, t, ">")
                    }
                    ));
                else {
                    if (u = A.length,
                    d = _ ? ue(_) : dt,
                    H(_))
                        for (c in _)
                            ~Ze.indexOf(c) && (f || (f = {}),
                            f[c] = _[c]);
                    for (a = 0; a < u; a++) {
                        for (c in l = {},
                        i)
                            Qe.indexOf(c) < 0 && (l[c] = i[c]);
                        l.stagger = 0,
                        C && (l.yoyoEase = C),
                        f && Ft(l, f),
                        h = A[a],
                        l.duration = +Ge(g, x(s), a, h, A),
                        l.delay = (+Ge(m, x(s), a, h, A) || 0) - s._delay,
                        !_ && 1 === u && l.delay && (s._delay = m = l.delay,
                        s._start += m,
                        l.delay = 0),
                        o.to(h, l, d(a, h, A))
                    }
                    o.duration() ? g = m = 0 : s.timeline = 0
                }
                g || s.duration(g = o.duration())
            } else
                s.timeline = 0;
            return !0 === y && (Xe = x(s),
            T.killTweensOf(A),
            Xe = 0),
            S && Ut(S, x(s)),
            (v || !g && !b && s._start === Ct(S._time) && G(v) && function t(e) {
                return !e || e._ts && t(e.parent)
            }(x(s)) && "nested" !== S.data) && (s._tTime = -1e-8,
            s.render(Math.max(0, -m))),
            k && Gt(x(s), k),
            s
        }
        w(e, t);
        var i = e.prototype;
        return i.render = function(t, e, i) {
            var r, n, s, o, a, l, u, c, h, d = this._time, f = this._tDur, p = this._dur, g = t > f - 1e-8 && t >= 0 ? f : t < 1e-8 ? 0 : t;
            if (p) {
                if (g !== this._tTime || !t || i || this._startAt && this._zTime < 0 != t < 0) {
                    if (r = g,
                    c = this.timeline,
                    this._repeat) {
                        if (o = p + this._rDelay,
                        r = Ct(g % o),
                        g === f ? (s = this._repeat,
                        r = p) : ((s = ~~(g / o)) && s === g / o && (r = p,
                        s--),
                        r > p && (r = p)),
                        (l = this._yoyo && 1 & s) && (h = this._yEase,
                        r = p - r),
                        a = Yt(this._tTime, o),
                        r === d && !i && this._initted)
                            return this;
                        s !== a && (c && this._yEase && Re(c, l),
                        !this.vars.repeatRefresh || l || this._lock || (this._lock = i = 1,
                        this.render(Ct(o * s), !0).invalidate()._lock = 0))
                    }
                    if (!this._initted) {
                        if (Zt(this, t < 0 ? t : r, i, e))
                            return this._tTime = 0,
                            this;
                        if (p !== this._dur)
                            return this.render(t, e, i)
                    }
                    for (this._tTime = g,
                    this._time = r,
                    !this._act && this._ts && (this._act = 1,
                    this._lazy = 0),
                    this.ratio = u = (h || this._ease)(r / p),
                    this._from && (this.ratio = u = 1 - u),
                    r && !d && !e && ve(this, "onStart"),
                    n = this._pt; n; )
                        n.r(u, n.d),
                        n = n._next;
                    c && c.render(t < 0 ? t : !r && l ? -1e-8 : c._dur * u, e, i) || this._startAt && (this._zTime = t),
                    this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, i),
                    ve(this, "onUpdate")),
                    this._repeat && s !== a && this.vars.onRepeat && !e && this.parent && ve(this, "onRepeat"),
                    g !== this._tDur && g || this._tTime !== g || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0),
                    (t || !p) && (g === this._tDur && this._ts > 0 || !g && this._ts < 0) && Nt(this, 1),
                    e || t < 0 && !d || !g && !d || (ve(this, g === f ? "onComplete" : "onReverseComplete", !0),
                    this._prom && !(g < f && this.timeScale() > 0) && this._prom()))
                }
            } else
                !function(t, e, i, r) {
                    var n, s, o = t.ratio, a = e < 0 || !e && o && !t._start && t._zTime > 1e-8 && !t._dp._lock || (t._ts < 0 || t._dp._ts < 0) && "isFromStart" !== t.data && "isStart" !== t.data ? 0 : 1, l = t._rDelay, u = 0;
                    if (l && t._repeat && (u = ie(0, t._tDur, e),
                    Yt(u, l) !== (s = Yt(t._tTime, l)) && (o = 1 - a,
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                    a !== o || r || 1e-8 === t._zTime || !e && t._zTime) {
                        if (!t._initted && Zt(t, e, r, i))
                            return;
                        for (s = t._zTime,
                        t._zTime = e || (i ? 1e-8 : 0),
                        i || (i = e && !s),
                        t.ratio = a,
                        t._from && (a = 1 - a),
                        t._time = 0,
                        t._tTime = u,
                        i || ve(t, "onStart"),
                        n = t._pt; n; )
                            n.r(a, n.d),
                            n = n._next;
                        t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                        t._onUpdate && !i && ve(t, "onUpdate"),
                        u && t._repeat && !i && t.parent && ve(t, "onRepeat"),
                        (e >= t._tDur || e < 0) && t.ratio === a && (a && Nt(t, 1),
                        i || (ve(t, a ? "onComplete" : "onReverseComplete", !0),
                        t._prom && t._prom()))
                    } else
                        t._zTime || (t._zTime = e)
                }(this, t, e, i);
            return this
        }
        ,
        i.targets = function() {
            return this._targets
        }
        ,
        i.invalidate = function() {
            return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0,
            this._ptLookup = [],
            this.timeline && this.timeline.invalidate(),
            t.prototype.invalidate.call(this)
        }
        ,
        i.kill = function(t, e) {
            if (void 0 === e && (e = "all"),
            !(t || e && "all" !== e) && (this._lazy = 0,
            this.parent))
                return _e(this);
            if (this.timeline) {
                var i = this.timeline.totalDuration();
                return this.timeline.killTweensOf(t, e, Xe && !0 !== Xe.vars.overwrite)._first || _e(this),
                this.parent && i !== this.timeline.totalDuration() && Qt(this, this._dur * this.timeline._tDur / i, 0, 1),
                this
            }
            var r, n, s, o, a, l, u, c = this._targets, h = t ? ae(t) : c, d = this._ptLookup, f = this._pt;
            if ((!e || "all" === e) && function(t, e) {
                for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
                    ;
                return i < 0
            }(c, h))
                return "all" === e && (this._pt = 0),
                _e(this);
            for (r = this._op = this._op || [],
            "all" !== e && (X(e) && (a = {},
            kt(e, (function(t) {
                return a[t] = 1
            }
            )),
            e = a),
            e = function(t, e) {
                var i, r, n, s, o = t[0] ? wt(t[0]).harness : 0, a = o && o.aliases;
                if (!a)
                    return e;
                for (r in i = Ft({}, e),
                a)
                    if (r in i)
                        for (n = (s = a[r].split(",")).length; n--; )
                            i[s[n]] = i[r];
                return i
            }(c, e)),
            u = c.length; u--; )
                if (~h.indexOf(c[u]))
                    for (a in n = d[u],
                    "all" === e ? (r[u] = e,
                    o = n,
                    s = {}) : (s = r[u] = r[u] || {},
                    o = e),
                    o)
                        (l = n && n[a]) && ("kill"in l.d && !0 !== l.d.kill(a) || It(this, l, "_pt"),
                        delete n[a]),
                        "all" !== s && (s[a] = 1);
            return this._initted && !this._pt && f && _e(this),
            this
        }
        ,
        e.to = function(t, i) {
            return new e(t,i,arguments[2])
        }
        ,
        e.from = function(t, i) {
            return new e(t,At(arguments, 1))
        }
        ,
        e.delayedCall = function(t, i, r, n) {
            return new e(i,0,{
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: i,
                onReverseComplete: i,
                onCompleteParams: r,
                onReverseCompleteParams: r,
                callbackScope: n
            })
        }
        ,
        e.fromTo = function(t, i, r) {
            return new e(t,At(arguments, 2))
        }
        ,
        e.set = function(t, i) {
            return i.duration = 0,
            i.repeatDelay || (i.repeat = 0),
            new e(t,i)
        }
        ,
        e.killTweensOf = function(t, e, i) {
            return T.killTweensOf(t, e, i)
        }
        ,
        e
    }(We);
    zt(Je.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }),
    kt("staggerTo,staggerFrom,staggerFromTo", (function(t) {
        Je[t] = function() {
            var e = new Ye
              , i = ne.call(arguments, 0);
            return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0),
            e[t].apply(e, i)
        }
    }
    ));
    var Ke = function(t, e, i) {
        return t[e] = i
    }
      , ti = function(t, e, i) {
        return t[e](i)
    }
      , ei = function(t, e, i, r) {
        return t[e](r.fp, i)
    }
      , ii = function(t, e, i) {
        return t.setAttribute(e, i)
    }
      , ri = function(t, e) {
        return $(t[e]) ? ti : U(t[e]) && t.setAttribute ? ii : Ke
    }
      , ni = function(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e)
    }
      , si = function(t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
    }
      , oi = function(t, e) {
        var i = e._pt
          , r = "";
        if (!t && e.b)
            r = e.b;
        else if (1 === t && e.e)
            r = e.e;
        else {
            for (; i; )
                r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round(1e4 * (i.s + i.c * t)) / 1e4) + r,
                i = i._next;
            r += e.c
        }
        e.set(e.t, e.p, r, e)
    }
      , ai = function(t, e) {
        for (var i = e._pt; i; )
            i.r(t, i.d),
            i = i._next
    }
      , li = function(t, e, i, r) {
        for (var n, s = this._pt; s; )
            n = s._next,
            s.p === r && s.modifier(t, e, i),
            s = n
    }
      , ui = function(t) {
        for (var e, i, r = this._pt; r; )
            i = r._next,
            r.p === t && !r.op || r.op === t ? It(this, r, "_pt") : r.dep || (e = 1),
            r = i;
        return !e
    }
      , ci = function(t, e, i, r) {
        r.mSet(t, e, r.m.call(r.tween, i, r.mt), r)
    }
      , hi = function(t) {
        for (var e, i, r, n, s = t._pt; s; ) {
            for (e = s._next,
            i = r; i && i.pr > s.pr; )
                i = i._next;
            (s._prev = i ? i._prev : n) ? s._prev._next = s : r = s,
            (s._next = i) ? i._prev = s : n = s,
            s = e
        }
        t._pt = r
    }
      , di = function() {
        function t(t, e, i, r, n, s, o, a, l) {
            this.t = e,
            this.s = r,
            this.c = n,
            this.p = i,
            this.r = s || ni,
            this.d = o || this,
            this.set = a || Ke,
            this.pr = l || 0,
            this._next = t,
            t && (t._prev = this)
        }
        return t.prototype.modifier = function(t, e, i) {
            this.mSet = this.mSet || this.set,
            this.set = ci,
            this.m = t,
            this.mt = i,
            this.tween = e
        }
        ,
        t
    }();
    kt(bt + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(t) {
        return ft[t] = 1
    }
    )),
    ot.TweenMax = ot.TweenLite = Je,
    ot.TimelineLite = ot.TimelineMax = Ye,
    T = new Ye({
        sortChildren: !1,
        defaults: D,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }),
    R.stringFilter = Ae;
    var fi = {
        registerPlugin: function() {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                e[i] = arguments[i];
            e.forEach((function(t) {
                return ye(t)
            }
            ))
        },
        timeline: function(t) {
            return new Ye(t)
        },
        getTweensOf: function(t, e) {
            return T.getTweensOf(t, e)
        },
        getProperty: function(t, e, i, r) {
            X(t) && (t = ae(t)[0]);
            var n = wt(t || {}).get
              , s = i ? Lt : Mt;
            return "native" === i && (i = ""),
            t ? e ? s((mt[e] && mt[e].get || n)(t, e, i, r)) : function(e, i, r) {
                return s((mt[e] && mt[e].get || n)(t, e, i, r))
            }
            : t
        },
        quickSetter: function(t, e, i) {
            if ((t = ae(t)).length > 1) {
                var r = t.map((function(t) {
                    return mi.quickSetter(t, e, i)
                }
                ))
                  , n = r.length;
                return function(t) {
                    for (var e = n; e--; )
                        r[e](t)
                }
            }
            t = t[0] || {};
            var s = mt[e]
              , o = wt(t)
              , a = o.harness && (o.harness.aliases || {})[e] || e
              , l = s ? function(e) {
                var r = new s;
                O._pt = 0,
                r.init(t, i ? e + i : e, O, 0, [t]),
                r.render(1, r),
                O._pt && ai(1, O)
            }
            : o.set(t, a);
            return s ? l : function(e) {
                return l(t, a, i ? e + i : e, o, 1)
            }
        },
        isTweening: function(t) {
            return T.getTweensOf(t, !0).length > 0
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = De(t.ease, D.ease)),
            Rt(D, t || {})
        },
        config: function(t) {
            return Rt(R, t || {})
        },
        registerEffect: function(t) {
            var e = t.name
              , i = t.effect
              , r = t.plugins
              , n = t.defaults
              , s = t.extendTimeline;
            (r || "").split(",").forEach((function(t) {
                return t && !mt[t] && !ot[t] && ct(e + " effect requires " + t + " plugin.")
            }
            )),
            vt[e] = function(t, e, r) {
                return i(ae(t), zt(e || {}, n), r)
            }
            ,
            s && (Ye.prototype[e] = function(t, i, r) {
                return this.add(vt[e](t, H(i) ? i : (r = i) && {}, this), r)
            }
            )
        },
        registerEase: function(t, e) {
            Me[t] = De(e)
        },
        parseEase: function(t, e) {
            return arguments.length ? De(t, e) : Me
        },
        getById: function(t) {
            return T.getById(t)
        },
        exportRoot: function(t, e) {
            void 0 === t && (t = {});
            var i, r, n = new Ye(t);
            for (n.smoothChildTiming = G(t.smoothChildTiming),
            T.remove(n),
            n._dp = 0,
            n._time = n._tTime = T._time,
            i = T._first; i; )
                r = i._next,
                !e && !i._dur && i instanceof Je && i.vars.onComplete === i._targets[0] || Ht(n, i, i._start - i._delay),
                i = r;
            return Ht(T, n, 0),
            n
        },
        utils: {
            wrap: function t(e, i, r) {
                var n = i - e;
                return K(e) ? fe(e, t(0, e.length), i) : ee(r, (function(t) {
                    return (n + (t - e) % n) % n + e
                }
                ))
            },
            wrapYoyo: function t(e, i, r) {
                var n = i - e
                  , s = 2 * n;
                return K(e) ? fe(e, t(0, e.length - 1), i) : ee(r, (function(t) {
                    return e + ((t = (s + (t - e) % s) % s || 0) > n ? s - t : t)
                }
                ))
            },
            distribute: ue,
            random: de,
            snap: he,
            normalize: function(t, e, i) {
                return ge(t, e, 0, 1, i)
            },
            getUnit: re,
            clamp: function(t, e, i) {
                return ee(i, (function(i) {
                    return ie(t, e, i)
                }
                ))
            },
            splitColor: we,
            toArray: ae,
            mapRange: ge,
            pipe: function() {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                    e[i] = arguments[i];
                return function(t) {
                    return e.reduce((function(t, e) {
                        return e(t)
                    }
                    ), t)
                }
            },
            unitize: function(t, e) {
                return function(i) {
                    return t(parseFloat(i)) + (e || re(i))
                }
            },
            interpolate: function t(e, i, r, n) {
                var s = isNaN(e + i) ? 0 : function(t) {
                    return (1 - t) * e + t * i
                }
                ;
                if (!s) {
                    var o, a, l, u, c, h = X(e), d = {};
                    if (!0 === r && (n = 1) && (r = null),
                    h)
                        e = {
                            p: e
                        },
                        i = {
                            p: i
                        };
                    else if (K(e) && !K(i)) {
                        for (l = [],
                        u = e.length,
                        c = u - 2,
                        a = 1; a < u; a++)
                            l.push(t(e[a - 1], e[a]));
                        u--,
                        s = function(t) {
                            t *= u;
                            var e = Math.min(c, ~~t);
                            return l[e](t - e)
                        }
                        ,
                        r = i
                    } else
                        n || (e = Ft(K(e) ? [] : {}, e));
                    if (!l) {
                        for (o in i)
                            je.call(d, e, o, "get", i[o]);
                        s = function(t) {
                            return ai(t, d) || (h ? e.p : e)
                        }
                    }
                }
                return ee(r, s)
            },
            shuffle: le
        },
        install: lt,
        effects: vt,
        ticker: Ee,
        updateRoot: Ye.updateRoot,
        plugins: mt,
        globalTimeline: T,
        core: {
            PropTween: di,
            globals: ht,
            Tween: Je,
            Timeline: Ye,
            Animation: We,
            getCache: wt,
            _removeLinkedListItem: It
        }
    };
    kt("to,from,fromTo,delayedCall,set,killTweensOf", (function(t) {
        return fi[t] = Je[t]
    }
    )),
    Ee.add(Ye.updateRoot),
    O = fi.to({}, {
        duration: 0
    });
    var pi = function(t, e) {
        for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
            i = i._next;
        return i
    }
      , gi = function(t, e) {
        return {
            name: t,
            rawVars: 1,
            init: function(t, i, r) {
                r._onInit = function(t) {
                    var r, n;
                    if (X(i) && (r = {},
                    kt(i, (function(t) {
                        return r[t] = 1
                    }
                    )),
                    i = r),
                    e) {
                        for (n in r = {},
                        i)
                            r[n] = e(i[n]);
                        i = r
                    }
                    !function(t, e) {
                        var i, r, n, s = t._targets;
                        for (i in e)
                            for (r = s.length; r--; )
                                (n = t._ptLookup[r][i]) && (n = n.d) && (n._pt && (n = pi(n, i)),
                                n && n.modifier && n.modifier(e[i], t, s[r], i))
                    }(t, i)
                }
            }
        }
    }
      , mi = fi.registerPlugin({
        name: "attr",
        init: function(t, e, i, r, n) {
            var s, o;
            for (s in e)
                (o = this.add(t, "setAttribute", (t.getAttribute(s) || 0) + "", e[s], r, n, 0, 0, s)) && (o.op = s),
                this._props.push(s)
        }
    }, {
        name: "endArray",
        init: function(t, e) {
            for (var i = e.length; i--; )
                this.add(t, i, t[i] || 0, e[i])
        }
    }, gi("roundProps", ce), gi("modifiers"), gi("snap", he)) || fi;
    Je.version = Ye.version = mi.version = "3.5.1",
    A = 1,
    Z() && Oe();
    var vi, _i, yi, bi, xi, wi, Ti, ki, Ci = {}, Si = 180 / Math.PI, Ai = Math.PI / 180, Ei = Math.atan2, Oi = /([A-Z])/g, Mi = /(?:left|right|width|margin|padding|x)/i, Li = /[\s,\(]\S/, zi = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    }, Pi = function(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }, Fi = function(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }, Ri = function(t, e) {
        return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    }, Di = function(t, e) {
        var i = e.s + e.c * t;
        e.set(e.t, e.p, ~~(i + (i < 0 ? -.5 : .5)) + e.u, e)
    }, Bi = function(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }, Ii = function(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }, Ni = function(t, e, i) {
        return t.style[e] = i
    }, Vi = function(t, e, i) {
        return t.style.setProperty(e, i)
    }, qi = function(t, e, i) {
        return t._gsap[e] = i
    }, Wi = function(t, e, i) {
        return t._gsap.scaleX = t._gsap.scaleY = i
    }, Yi = function(t, e, i, r, n) {
        var s = t._gsap;
        s.scaleX = s.scaleY = i,
        s.renderTransform(n, s)
    }, Xi = function(t, e, i, r, n) {
        var s = t._gsap;
        s[e] = i,
        s.renderTransform(n, s)
    }, $i = "transform", ji = $i + "Origin", Ui = function(t, e) {
        var i = _i.createElementNS ? _i.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : _i.createElement(t);
        return i.style ? i : _i.createElement(t)
    }, Hi = function t(e, i, r) {
        var n = getComputedStyle(e);
        return n[i] || n.getPropertyValue(i.replace(Oi, "-$1").toLowerCase()) || n.getPropertyValue(i) || !r && t(e, Zi(i) || i, 1) || ""
    }, Gi = "O,Moz,ms,Ms,Webkit".split(","), Zi = function(t, e, i) {
        var r = (e || xi).style
          , n = 5;
        if (t in r && !i)
            return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(Gi[n] + t in r); )
            ;
        return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? Gi[n] : "") + t
    }, Qi = function() {
        "undefined" != typeof window && window.document && (vi = window,
        _i = vi.document,
        yi = _i.documentElement,
        xi = Ui("div") || {
            style: {}
        },
        wi = Ui("div"),
        $i = Zi($i),
        ji = $i + "Origin",
        xi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
        ki = !!Zi("perspective"),
        bi = 1)
    }, Ji = function t(e) {
        var i, r = Ui("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, s = this.nextSibling, o = this.style.cssText;
        if (yi.appendChild(r),
        r.appendChild(this),
        this.style.display = "block",
        e)
            try {
                i = this.getBBox(),
                this._gsapBBox = this.getBBox,
                this.getBBox = t
            } catch (t) {}
        else
            this._gsapBBox && (i = this._gsapBBox());
        return n && (s ? n.insertBefore(this, s) : n.appendChild(this)),
        yi.removeChild(r),
        this.style.cssText = o,
        i
    }, Ki = function(t, e) {
        for (var i = e.length; i--; )
            if (t.hasAttribute(e[i]))
                return t.getAttribute(e[i])
    }, tr = function(t) {
        var e;
        try {
            e = t.getBBox()
        } catch (i) {
            e = Ji.call(t, !0)
        }
        return e && (e.width || e.height) || t.getBBox === Ji || (e = Ji.call(t, !0)),
        !e || e.width || e.x || e.y ? e : {
            x: +Ki(t, ["x", "cx", "x1"]) || 0,
            y: +Ki(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }, er = function(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !tr(t))
    }, ir = function(t, e) {
        if (e) {
            var i = t.style;
            e in Ci && e !== ji && (e = $i),
            i.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
            i.removeProperty(e.replace(Oi, "-$1").toLowerCase())) : i.removeAttribute(e)
        }
    }, rr = function(t, e, i, r, n, s) {
        var o = new di(t._pt,e,i,0,1,s ? Ii : Bi);
        return t._pt = o,
        o.b = r,
        o.e = n,
        t._props.push(i),
        o
    }, nr = {
        deg: 1,
        rad: 1,
        turn: 1
    }, sr = function t(e, i, r, n) {
        var s, o, a, l, u = parseFloat(r) || 0, c = (r + "").trim().substr((u + "").length) || "px", h = xi.style, d = Mi.test(i), f = "svg" === e.tagName.toLowerCase(), p = (f ? "client" : "offset") + (d ? "Width" : "Height"), g = "px" === n, m = "%" === n;
        return n === c || !u || nr[n] || nr[c] ? u : ("px" !== c && !g && (u = t(e, i, r, "px")),
        l = e.getCTM && er(e),
        m && (Ci[i] || ~i.indexOf("adius")) ? Ct(u / (l ? e.getBBox()[d ? "width" : "height"] : e[p]) * 100) : (h[d ? "width" : "height"] = 100 + (g ? c : n),
        o = ~i.indexOf("adius") || "em" === n && e.appendChild && !f ? e : e.parentNode,
        l && (o = (e.ownerSVGElement || {}).parentNode),
        o && o !== _i && o.appendChild || (o = _i.body),
        (a = o._gsap) && m && a.width && d && a.time === Ee.time ? Ct(u / a.width * 100) : ((m || "%" === c) && (h.position = Hi(e, "position")),
        o === e && (h.position = "static"),
        o.appendChild(xi),
        s = xi[p],
        o.removeChild(xi),
        h.position = "absolute",
        d && m && ((a = wt(o)).time = Ee.time,
        a.width = o[p]),
        Ct(g ? s * u / 100 : s && u ? 100 / s * u : 0))))
    }, or = function(t, e, i, r) {
        var n;
        return bi || Qi(),
        e in zi && "transform" !== e && ~(e = zi[e]).indexOf(",") && (e = e.split(",")[0]),
        Ci[e] && "transform" !== e ? (n = vr(t, r),
        n = "transformOrigin" !== e ? n[e] : _r(Hi(t, ji)) + " " + n.zOrigin + "px") : (!(n = t.style[e]) || "auto" === n || r || ~(n + "").indexOf("calc(")) && (n = cr[e] && cr[e](t, e, i) || Hi(t, e) || Tt(t, e) || ("opacity" === e ? 1 : 0)),
        i && !~(n + "").indexOf(" ") ? sr(t, e, n, i) + i : n
    }, ar = function(t, e, i, r) {
        if (!i || "none" === i) {
            var n = Zi(e, t, 1)
              , s = n && Hi(t, n, 1);
            s && s !== i ? (e = n,
            i = s) : "borderColor" === e && (i = Hi(t, "borderTopColor"))
        }
        var o, a, l, u, c, h, d, f, p, g, m, v, _ = new di(this._pt,t.style,e,0,1,oi), y = 0, b = 0;
        if (_.b = i,
        _.e = r,
        i += "",
        "auto" === (r += "") && (t.style[e] = r,
        r = Hi(t, e) || r,
        t.style[e] = i),
        Ae(o = [i, r]),
        r = o[1],
        l = (i = o[0]).match(it) || [],
        (r.match(it) || []).length) {
            for (; a = it.exec(r); )
                d = a[0],
                p = r.substring(y, a.index),
                c ? c = (c + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (c = 1),
                d !== (h = l[b++] || "") && (u = parseFloat(h) || 0,
                m = h.substr((u + "").length),
                (v = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)),
                f = parseFloat(d),
                g = d.substr((f + "").length),
                y = it.lastIndex - g.length,
                g || (g = g || R.units[e] || m,
                y === r.length && (r += g,
                _.e += g)),
                m !== g && (u = sr(t, e, h, g) || 0),
                _._pt = {
                    _next: _._pt,
                    p: p || 1 === b ? p : ",",
                    s: u,
                    c: v ? v * f : f - u,
                    m: c && c < 4 ? Math.round : 0
                });
            _.c = y < r.length ? r.substring(y, r.length) : ""
        } else
            _.r = "display" === e && "none" === r ? Ii : Bi;
        return nt.test(r) && (_.e = 0),
        this._pt = _,
        _
    }, lr = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, ur = function(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var i, r, n, s = e.t, o = s.style, a = e.u, l = s._gsap;
            if ("all" === a || !0 === a)
                o.cssText = "",
                r = 1;
            else
                for (n = (a = a.split(",")).length; --n > -1; )
                    i = a[n],
                    Ci[i] && (r = 1,
                    i = "transformOrigin" === i ? ji : $i),
                    ir(s, i);
            r && (ir(s, $i),
            l && (l.svg && s.removeAttribute("transform"),
            vr(s, 1),
            l.uncache = 1))
        }
    }, cr = {
        clearProps: function(t, e, i, r, n) {
            if ("isFromStart" !== n.data) {
                var s = t._pt = new di(t._pt,e,i,0,0,ur);
                return s.u = r,
                s.pr = -10,
                s.tween = n,
                t._props.push(i),
                1
            }
        }
    }, hr = [1, 0, 0, 1, 0, 0], dr = {}, fr = function(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }, pr = function(t) {
        var e = Hi(t, $i);
        return fr(e) ? hr : e.substr(7).match(et).map(Ct)
    }, gr = function(t, e) {
        var i, r, n, s, o = t._gsap || wt(t), a = t.style, l = pr(t);
        return o.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? hr : l : (l !== hr || t.offsetParent || t === yi || o.svg || (n = a.display,
        a.display = "block",
        (i = t.parentNode) && t.offsetParent || (s = 1,
        r = t.nextSibling,
        yi.appendChild(t)),
        l = pr(t),
        n ? a.display = n : ir(t, "display"),
        s && (r ? i.insertBefore(t, r) : i ? i.appendChild(t) : yi.removeChild(t))),
        e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
    }, mr = function(t, e, i, r, n, s) {
        var o, a, l, u = t._gsap, c = n || gr(t, !0), h = u.xOrigin || 0, d = u.yOrigin || 0, f = u.xOffset || 0, p = u.yOffset || 0, g = c[0], m = c[1], v = c[2], _ = c[3], y = c[4], b = c[5], x = e.split(" "), w = parseFloat(x[0]) || 0, T = parseFloat(x[1]) || 0;
        i ? c !== hr && (a = g * _ - m * v) && (l = w * (-m / a) + T * (g / a) - (g * b - m * y) / a,
        w = w * (_ / a) + T * (-v / a) + (v * b - _ * y) / a,
        T = l) : (w = (o = tr(t)).x + (~x[0].indexOf("%") ? w / 100 * o.width : w),
        T = o.y + (~(x[1] || x[0]).indexOf("%") ? T / 100 * o.height : T)),
        r || !1 !== r && u.smooth ? (y = w - h,
        b = T - d,
        u.xOffset = f + (y * g + b * v) - y,
        u.yOffset = p + (y * m + b * _) - b) : u.xOffset = u.yOffset = 0,
        u.xOrigin = w,
        u.yOrigin = T,
        u.smooth = !!r,
        u.origin = e,
        u.originIsAbsolute = !!i,
        t.style[ji] = "0px 0px",
        s && (rr(s, u, "xOrigin", h, w),
        rr(s, u, "yOrigin", d, T),
        rr(s, u, "xOffset", f, u.xOffset),
        rr(s, u, "yOffset", p, u.yOffset)),
        t.setAttribute("data-svg-origin", w + " " + T)
    }, vr = function(t, e) {
        var i = t._gsap || new qe(t);
        if ("x"in i && !e && !i.uncache)
            return i;
        var r, n, s, o, a, l, u, c, h, d, f, p, g, m, v, _, y, b, x, w, T, k, C, S, A, E, O, M, L, z, P, F, D = t.style, B = i.scaleX < 0, I = Hi(t, ji) || "0";
        return r = n = s = l = u = c = h = d = f = 0,
        o = a = 1,
        i.svg = !(!t.getCTM || !er(t)),
        m = gr(t, i.svg),
        i.svg && (S = !i.uncache && t.getAttribute("data-svg-origin"),
        mr(t, S || I, !!S || i.originIsAbsolute, !1 !== i.smooth, m)),
        p = i.xOrigin || 0,
        g = i.yOrigin || 0,
        m !== hr && (b = m[0],
        x = m[1],
        w = m[2],
        T = m[3],
        r = k = m[4],
        n = C = m[5],
        6 === m.length ? (o = Math.sqrt(b * b + x * x),
        a = Math.sqrt(T * T + w * w),
        l = b || x ? Ei(x, b) * Si : 0,
        (h = w || T ? Ei(w, T) * Si + l : 0) && (a *= Math.cos(h * Ai)),
        i.svg && (r -= p - (p * b + g * w),
        n -= g - (p * x + g * T))) : (F = m[6],
        z = m[7],
        O = m[8],
        M = m[9],
        L = m[10],
        P = m[11],
        r = m[12],
        n = m[13],
        s = m[14],
        u = (v = Ei(F, L)) * Si,
        v && (S = k * (_ = Math.cos(-v)) + O * (y = Math.sin(-v)),
        A = C * _ + M * y,
        E = F * _ + L * y,
        O = k * -y + O * _,
        M = C * -y + M * _,
        L = F * -y + L * _,
        P = z * -y + P * _,
        k = S,
        C = A,
        F = E),
        c = (v = Ei(-w, L)) * Si,
        v && (_ = Math.cos(-v),
        P = T * (y = Math.sin(-v)) + P * _,
        b = S = b * _ - O * y,
        x = A = x * _ - M * y,
        w = E = w * _ - L * y),
        l = (v = Ei(x, b)) * Si,
        v && (S = b * (_ = Math.cos(v)) + x * (y = Math.sin(v)),
        A = k * _ + C * y,
        x = x * _ - b * y,
        C = C * _ - k * y,
        b = S,
        k = A),
        u && Math.abs(u) + Math.abs(l) > 359.9 && (u = l = 0,
        c = 180 - c),
        o = Ct(Math.sqrt(b * b + x * x + w * w)),
        a = Ct(Math.sqrt(C * C + F * F)),
        v = Ei(k, C),
        h = Math.abs(v) > 2e-4 ? v * Si : 0,
        f = P ? 1 / (P < 0 ? -P : P) : 0),
        i.svg && (S = t.getAttribute("transform"),
        i.forceCSS = t.setAttribute("transform", "") || !fr(Hi(t, $i)),
        S && t.setAttribute("transform", S))),
        Math.abs(h) > 90 && Math.abs(h) < 270 && (B ? (o *= -1,
        h += l <= 0 ? 180 : -180,
        l += l <= 0 ? 180 : -180) : (a *= -1,
        h += h <= 0 ? 180 : -180)),
        i.x = ((i.xPercent = r && Math.round(t.offsetWidth / 2) === Math.round(-r) ? -50 : 0) ? 0 : r) + "px",
        i.y = ((i.yPercent = n && Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0) ? 0 : n) + "px",
        i.z = s + "px",
        i.scaleX = Ct(o),
        i.scaleY = Ct(a),
        i.rotation = Ct(l) + "deg",
        i.rotationX = Ct(u) + "deg",
        i.rotationY = Ct(c) + "deg",
        i.skewX = h + "deg",
        i.skewY = d + "deg",
        i.transformPerspective = f + "px",
        (i.zOrigin = parseFloat(I.split(" ")[2]) || 0) && (D[ji] = _r(I)),
        i.xOffset = i.yOffset = 0,
        i.force3D = R.force3D,
        i.renderTransform = i.svg ? wr : ki ? xr : br,
        i.uncache = 0,
        i
    }, _r = function(t) {
        return (t = t.split(" "))[0] + " " + t[1]
    }, yr = function(t, e, i) {
        var r = re(e);
        return Ct(parseFloat(e) + parseFloat(sr(t, "x", i + "px", r))) + r
    }, br = function(t, e) {
        e.z = "0px",
        e.rotationY = e.rotationX = "0deg",
        e.force3D = 0,
        xr(t, e)
    }, xr = function(t, e) {
        var i = e || this
          , r = i.xPercent
          , n = i.yPercent
          , s = i.x
          , o = i.y
          , a = i.z
          , l = i.rotation
          , u = i.rotationY
          , c = i.rotationX
          , h = i.skewX
          , d = i.skewY
          , f = i.scaleX
          , p = i.scaleY
          , g = i.transformPerspective
          , m = i.force3D
          , v = i.target
          , _ = i.zOrigin
          , y = ""
          , b = "auto" === m && t && 1 !== t || !0 === m;
        if (_ && ("0deg" !== c || "0deg" !== u)) {
            var x, w = parseFloat(u) * Ai, T = Math.sin(w), k = Math.cos(w);
            w = parseFloat(c) * Ai,
            x = Math.cos(w),
            s = yr(v, s, T * x * -_),
            o = yr(v, o, -Math.sin(w) * -_),
            a = yr(v, a, k * x * -_ + _)
        }
        "0px" !== g && (y += "perspective(" + g + ") "),
        (r || n) && (y += "translate(" + r + "%, " + n + "%) "),
        (b || "0px" !== s || "0px" !== o || "0px" !== a) && (y += "0px" !== a || b ? "translate3d(" + s + ", " + o + ", " + a + ") " : "translate(" + s + ", " + o + ") "),
        "0deg" !== l && (y += "rotate(" + l + ") "),
        "0deg" !== u && (y += "rotateY(" + u + ") "),
        "0deg" !== c && (y += "rotateX(" + c + ") "),
        "0deg" === h && "0deg" === d || (y += "skew(" + h + ", " + d + ") "),
        1 === f && 1 === p || (y += "scale(" + f + ", " + p + ") "),
        v.style[$i] = y || "translate(0, 0)"
    }, wr = function(t, e) {
        var i, r, n, s, o, a = e || this, l = a.xPercent, u = a.yPercent, c = a.x, h = a.y, d = a.rotation, f = a.skewX, p = a.skewY, g = a.scaleX, m = a.scaleY, v = a.target, _ = a.xOrigin, y = a.yOrigin, b = a.xOffset, x = a.yOffset, w = a.forceCSS, T = parseFloat(c), k = parseFloat(h);
        d = parseFloat(d),
        f = parseFloat(f),
        (p = parseFloat(p)) && (f += p = parseFloat(p),
        d += p),
        d || f ? (d *= Ai,
        f *= Ai,
        i = Math.cos(d) * g,
        r = Math.sin(d) * g,
        n = Math.sin(d - f) * -m,
        s = Math.cos(d - f) * m,
        f && (p *= Ai,
        o = Math.tan(f - p),
        n *= o = Math.sqrt(1 + o * o),
        s *= o,
        p && (o = Math.tan(p),
        i *= o = Math.sqrt(1 + o * o),
        r *= o)),
        i = Ct(i),
        r = Ct(r),
        n = Ct(n),
        s = Ct(s)) : (i = g,
        s = m,
        r = n = 0),
        (T && !~(c + "").indexOf("px") || k && !~(h + "").indexOf("px")) && (T = sr(v, "x", c, "px"),
        k = sr(v, "y", h, "px")),
        (_ || y || b || x) && (T = Ct(T + _ - (_ * i + y * n) + b),
        k = Ct(k + y - (_ * r + y * s) + x)),
        (l || u) && (o = v.getBBox(),
        T = Ct(T + l / 100 * o.width),
        k = Ct(k + u / 100 * o.height)),
        o = "matrix(" + i + "," + r + "," + n + "," + s + "," + T + "," + k + ")",
        v.setAttribute("transform", o),
        w && (v.style[$i] = o)
    }, Tr = function(t, e, i, r, n, s) {
        var o, a, l = X(n), u = parseFloat(n) * (l && ~n.indexOf("rad") ? Si : 1), c = s ? u * s : u - r, h = r + c + "deg";
        return l && ("short" === (o = n.split("_")[1]) && (c %= 360) !== c % 180 && (c += c < 0 ? 360 : -360),
        "cw" === o && c < 0 ? c = (c + 36e9) % 360 - 360 * ~~(c / 360) : "ccw" === o && c > 0 && (c = (c - 36e9) % 360 - 360 * ~~(c / 360))),
        t._pt = a = new di(t._pt,e,i,r,c,Fi),
        a.e = h,
        a.u = "deg",
        t._props.push(i),
        a
    }, kr = function(t, e, i) {
        var r, n, s, o, a, l, u, c = wi.style, h = i._gsap;
        for (n in c.cssText = getComputedStyle(i).cssText + ";position:absolute;display:block;",
        c[$i] = e,
        _i.body.appendChild(wi),
        r = vr(wi, 1),
        Ci)
            (s = h[n]) !== (o = r[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (a = re(s) !== (u = re(o)) ? sr(i, n, s, u) : parseFloat(s),
            l = parseFloat(o),
            t._pt = new di(t._pt,h,n,a,l - a,Pi),
            t._pt.u = u || 0,
            t._props.push(n));
        _i.body.removeChild(wi)
    };
    kt("padding,margin,Width,Radius", (function(t, e) {
        var i = "Top"
          , r = "Right"
          , n = "Bottom"
          , s = "Left"
          , o = (e < 3 ? [i, r, n, s] : [i + s, i + r, n + r, n + s]).map((function(i) {
            return e < 2 ? t + i : "border" + i + t
        }
        ));
        cr[e > 1 ? "border" + t : t] = function(t, e, i, r, n) {
            var s, a;
            if (arguments.length < 4)
                return s = o.map((function(e) {
                    return or(t, e, i)
                }
                )),
                5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a;
            s = (r + "").split(" "),
            a = {},
            o.forEach((function(t, e) {
                return a[t] = s[e] = s[e] || s[(e - 1) / 2 | 0]
            }
            )),
            t.init(e, a, n)
        }
    }
    ));
    var Cr, Sr, Ar = {
        name: "css",
        register: Qi,
        targetTest: function(t) {
            return t.style && t.nodeType
        },
        init: function(t, e, i, r, n) {
            var s, o, a, l, u, c, h, d, f, p, g, m, v, _, y, b, x, w, T, k = this._props, C = t.style;
            for (h in bi || Qi(),
            e)
                if ("autoRound" !== h && (o = e[h],
                !mt[h] || !Ue(h, e, i, r, t, n)))
                    if (u = typeof o,
                    c = cr[h],
                    "function" === u && (u = typeof (o = o.call(i, r, t, n))),
                    "string" === u && ~o.indexOf("random(") && (o = pe(o)),
                    c)
                        c(this, t, h, o, i) && (y = 1);
                    else if ("--" === h.substr(0, 2))
                        this.add(C, "setProperty", getComputedStyle(t).getPropertyValue(h) + "", o + "", r, n, 0, 0, h);
                    else if ("undefined" !== u) {
                        if (s = or(t, h),
                        l = parseFloat(s),
                        (p = "string" === u && "=" === o.charAt(1) ? +(o.charAt(0) + "1") : 0) && (o = o.substr(2)),
                        a = parseFloat(o),
                        h in zi && ("autoAlpha" === h && (1 === l && "hidden" === or(t, "visibility") && a && (l = 0),
                        rr(this, C, "visibility", l ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)),
                        "scale" !== h && "transform" !== h && ~(h = zi[h]).indexOf(",") && (h = h.split(",")[0])),
                        g = h in Ci)
                            if (m || ((v = t._gsap).renderTransform || vr(t),
                            _ = !1 !== e.smoothOrigin && v.smooth,
                            (m = this._pt = new di(this._pt,C,$i,0,1,v.renderTransform,v,0,-1)).dep = 1),
                            "scale" === h)
                                this._pt = new di(this._pt,v,"scaleY",v.scaleY,p ? p * a : a - v.scaleY),
                                k.push("scaleY", h),
                                h += "X";
                            else {
                                if ("transformOrigin" === h) {
                                    x = void 0,
                                    w = void 0,
                                    T = void 0,
                                    x = (b = o).split(" "),
                                    w = x[0],
                                    T = x[1] || "50%",
                                    "top" !== w && "bottom" !== w && "left" !== T && "right" !== T || (b = w,
                                    w = T,
                                    T = b),
                                    x[0] = lr[w] || w,
                                    x[1] = lr[T] || T,
                                    o = x.join(" "),
                                    v.svg ? mr(t, o, 0, _, 0, this) : ((f = parseFloat(o.split(" ")[2]) || 0) !== v.zOrigin && rr(this, v, "zOrigin", v.zOrigin, f),
                                    rr(this, C, h, _r(s), _r(o)));
                                    continue
                                }
                                if ("svgOrigin" === h) {
                                    mr(t, o, 1, _, 0, this);
                                    continue
                                }
                                if (h in dr) {
                                    Tr(this, v, h, l, o, p);
                                    continue
                                }
                                if ("smoothOrigin" === h) {
                                    rr(this, v, "smooth", v.smooth, o);
                                    continue
                                }
                                if ("force3D" === h) {
                                    v[h] = o;
                                    continue
                                }
                                if ("transform" === h) {
                                    kr(this, o, t);
                                    continue
                                }
                            }
                        else
                            h in C || (h = Zi(h) || h);
                        if (g || (a || 0 === a) && (l || 0 === l) && !Li.test(o) && h in C)
                            a || (a = 0),
                            (d = (s + "").substr((l + "").length)) !== (f = re(o) || (h in R.units ? R.units[h] : d)) && (l = sr(t, h, s, f)),
                            this._pt = new di(this._pt,g ? v : C,h,l,p ? p * a : a - l,"px" !== f || !1 === e.autoRound || g ? Pi : Di),
                            this._pt.u = f || 0,
                            d !== f && (this._pt.b = s,
                            this._pt.r = Ri);
                        else if (h in C)
                            ar.call(this, t, h, s, o);
                        else {
                            if (!(h in t)) {
                                ut(h, o);
                                continue
                            }
                            this.add(t, h, t[h], o, r, n)
                        }
                        k.push(h)
                    }
            y && hi(this)
        },
        get: or,
        aliases: zi,
        getSetter: function(t, e, i) {
            var r = zi[e];
            return r && r.indexOf(",") < 0 && (e = r),
            e in Ci && e !== ji && (t._gsap.x || or(t, "x")) ? i && Ti === i ? "scale" === e ? Wi : qi : (Ti = i || {}) && ("scale" === e ? Yi : Xi) : t.style && !U(t.style[e]) ? Ni : ~e.indexOf("-") ? Vi : ri(t, e)
        },
        core: {
            _removeProperty: ir,
            _getMatrix: gr
        }
    };
    mi.utils.checkPrefix = Zi,
    Sr = kt("x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + (Cr = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(t) {
        Ci[t] = 1
    }
    )),
    kt(Cr, (function(t) {
        R.units[t] = "deg",
        dr[t] = 1
    }
    )),
    zi[Sr[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Cr,
    kt("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(t) {
        var e = t.split(":");
        zi[e[1]] = Sr[e[0]]
    }
    )),
    kt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
        R.units[t] = "px"
    }
    )),
    mi.registerPlugin(Ar);
    var Er, Or, Mr, Lr, zr, Pr, Fr, Rr, Dr, Br, Ir, Nr, Vr, qr, Wr, Yr, Xr, $r, jr, Ur, Hr, Gr, Zr, Qr, Jr, Kr = 1, tn = [], en = [], rn = Date.now, nn = rn(), sn = 0, on = 1, an = function(t) {
        return t
    }, ln = function() {
        return "undefined" != typeof window
    }, un = function() {
        return Er || ln() && (Er = window.gsap) && Er.registerPlugin && Er
    }, cn = function(t) {
        return !!~Fr.indexOf(t)
    }, hn = function(t, e) {
        return ~tn.indexOf(t) && tn[tn.indexOf(t) + 1][e]
    }, dn = function(t, e) {
        var i = e.s
          , r = e.sc
          , n = en.indexOf(t)
          , s = r === Sn.sc ? 1 : 2;
        return !~n && (n = en.push(t) - 1),
        en[n + s] || (en[n + s] = hn(t, i) || (cn(t) ? r : function(e) {
            return arguments.length ? t[i] = e : t[i]
        }
        ))
    }, fn = function(t) {
        return hn(t, "getBoundingClientRect") || (cn(t) ? function() {
            return cs.width = Mr.innerWidth,
            cs.height = Mr.innerHeight,
            cs
        }
        : function() {
            return On(t)
        }
        )
    }, pn = function(t, e) {
        var i = e.s
          , r = e.d2
          , n = e.d
          , s = e.a;
        return (i = "scroll" + r) && (s = hn(t, i)) ? s() - fn(t)()[n] : cn(t) ? Math.max(zr[i], Pr[i]) - (Mr["inner" + r] || zr["client" + r] || Pr["client" + r]) : t[i] - t["offset" + r]
    }, gn = function(t, e) {
        for (var i = 0; i < Hr.length; i += 3)
            (!e || ~e.indexOf(Hr[i + 1])) && t(Hr[i], Hr[i + 1], Hr[i + 2])
    }, mn = function(t) {
        return "string" == typeof t
    }, vn = function(t) {
        return "function" == typeof t
    }, _n = function(t) {
        return "number" == typeof t
    }, yn = function(t) {
        return "object" == typeof t
    }, bn = function(t) {
        return vn(t) && t()
    }, xn = function(t, e) {
        return function() {
            var i = bn(t)
              , r = bn(e);
            return function() {
                bn(i),
                bn(r)
            }
        }
    }, wn = Math.abs, Tn = "padding", kn = "px", Cn = {
        s: "scrollLeft",
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: function(t) {
            return arguments.length ? Mr.scrollTo(t, Sn.sc()) : Mr.pageXOffset || Lr.scrollLeft || zr.scrollLeft || Pr.scrollLeft || 0
        }
    }, Sn = {
        s: "scrollTop",
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: Cn,
        sc: function(t) {
            return arguments.length ? Mr.scrollTo(Cn.sc(), t) : Mr.pageYOffset || Lr.scrollTop || zr.scrollTop || Pr.scrollTop || 0
        }
    }, An = function(t) {
        return Mr.getComputedStyle(t)
    }, En = function(t, e) {
        for (var i in e)
            i in t || (t[i] = e[i]);
        return t
    }, On = function(t, e) {
        var i = e && "matrix(1, 0, 0, 1, 0, 0)" !== An(t)[Xr] && Er.to(t, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0
        }).progress(1)
          , r = t.getBoundingClientRect();
        return i && i.progress(0).kill(),
        r
    }, Mn = function(t, e) {
        var i = e.d2;
        return t["offset" + i] || t["client" + i] || 0
    }, Ln = function(t, e, i, r) {
        return i.split(",").forEach((function(i) {
            return t(e, i, r)
        }
        ))
    }, zn = function(t, e, i) {
        return t.addEventListener(e, i, {
            passive: !0
        })
    }, Pn = function(t, e, i) {
        return t.removeEventListener(e, i)
    }, Fn = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal"
    }, Rn = {
        toggleActions: "play",
        anticipatePin: 0
    }, Dn = {
        top: 0,
        left: 0,
        center: .5,
        bottom: 1,
        right: 1
    }, Bn = function(t, e) {
        if (mn(t)) {
            var i = t.indexOf("=")
              , r = ~i ? +(t.charAt(i - 1) + 1) * parseFloat(t.substr(i + 1)) : 0;
            r && (t.indexOf("%") > i && (r *= e / 100),
            t = t.substr(0, i - 1)),
            t = r + (t in Dn ? Dn[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
        }
        return t
    }, In = function(t, e, i, r, n, s, o) {
        var a = n.startColor
          , l = n.endColor
          , u = n.fontSize
          , c = n.indent
          , h = n.fontWeight
          , d = Lr.createElement("div")
          , f = cn(i) || "fixed" === hn(i, "pinType")
          , p = -1 !== t.indexOf("scroller")
          , g = f ? Pr : i
          , m = -1 !== t.indexOf("start")
          , v = m ? a : l
          , _ = "border-color:" + v + ";font-size:" + u + ";color:" + v + ";font-weight:" + h + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return _ += "position:" + (p && f ? "fixed;" : "absolute;"),
        (p || !f) && (_ += (r === Sn ? "right" : "bottom") + ":" + (s + parseFloat(c)) + "px;"),
        o && (_ += "box-sizing:border-box;text-align:left;width:" + o.offsetWidth + "px;"),
        d._isStart = m,
        d.setAttribute("class", "gsap-marker-" + t),
        d.style.cssText = _,
        d.innerText = e || 0 === e ? t + "-" + e : t,
        g.insertBefore(d, g.children[0]),
        d._offset = d["offset" + r.op.d2],
        Nn(d, 0, r, m),
        d
    }, Nn = function(t, e, i, r) {
        var n = {
            display: "block"
        }
          , s = i[r ? "os2" : "p2"]
          , o = i[r ? "p2" : "os2"];
        t._isFlipped = r,
        n[i.a + "Percent"] = r ? -100 : 0,
        n[i.a] = r ? 1 : 0,
        n["border" + s + "Width"] = 1,
        n["border" + o + "Width"] = 0,
        n[i.p] = e,
        Er.set(t, n)
    }, Vn = [], qn = {}, Wn = function() {
        return Br || (Br = Dr(rs))
    }, Yn = function() {
        Br || (Br = Dr(rs),
        sn || Zn("scrollStart"),
        sn = rn())
    }, Xn = function() {
        return !Wr && Rr.restart(!0)
    }, $n = {}, jn = [], Un = [], Hn = function(t) {
        var e, i = Er.ticker.frame, r = [], n = 0;
        if (Jr !== i || Kr) {
            for (Kn(); n < Un.length; n += 4)
                (e = Mr.matchMedia(Un[n]).matches) !== Un[n + 3] && (Un[n + 3] = e,
                e ? r.push(n) : Kn(1, Un[n]) || vn(Un[n + 2]) && Un[n + 2]());
            for (Jn(),
            n = 0; n < r.length; n++)
                e = r[n],
                Qr = Un[e],
                Un[e + 2] = Un[e + 1](t);
            Qr = 0,
            ts(0, 1),
            Jr = i,
            Zn("matchMedia")
        }
    }, Gn = function t() {
        return Pn(gs, "scrollEnd", t) || ts(!0)
    }, Zn = function(t) {
        return $n[t] && $n[t].map((function(t) {
            return t()
        }
        )) || jn
    }, Qn = [], Jn = function(t) {
        for (var e = 0; e < Qn.length; e += 4)
            t && Qn[e + 3] !== t || (Qn[e].style.cssText = Qn[e + 1],
            Qn[e + 2].uncache = 1)
    }, Kn = function(t, e) {
        var i;
        for ($r = 0; $r < Vn.length; $r++)
            i = Vn[$r],
            e && i.media !== e || (t ? i.kill(1) : (i.scroll.rec || (i.scroll.rec = i.scroll()),
            i.revert()));
        Jn(e),
        e || Zn("revert")
    }, ts = function(t, e) {
        if (!sn || t) {
            var i = Zn("refreshInit");
            for (Gr && gs.sort(),
            e || Kn(),
            $r = 0; $r < Vn.length; $r++)
                Vn[$r].refresh();
            for (i.forEach((function(t) {
                return t && t.render && t.render(-1)
            }
            )),
            $r = Vn.length; $r--; )
                Vn[$r].scroll.rec = 0;
            Rr.pause(),
            Zn("refresh")
        } else
            zn(gs, "scrollEnd", Gn)
    }, es = 0, is = 1, rs = function() {
        var t = Vn.length
          , e = rn()
          , i = e - nn >= 50
          , r = t && Vn[0].scroll();
        if (is = es > r ? -1 : 1,
        es = r,
        i && (sn && !Yr && e - sn > 200 && (sn = 0,
        Zn("scrollEnd")),
        Vr = nn,
        nn = e),
        is < 0) {
            for ($r = t; $r--; )
                Vn[$r] && Vn[$r].update(0, i);
            is = 1
        } else
            for ($r = 0; $r < t; $r++)
                Vn[$r] && Vn[$r].update(0, i);
        Br = 0
    }, ns = ["left", "top", "bottom", "right", "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float"], ss = ns.concat(["width", "height", "boxSizing", "maxWidth", "maxHeight", "position", "margin", Tn, Tn + "Top", Tn + "Right", Tn + "Bottom", Tn + "Left"]), os = function(t, e, i, r) {
        if (t.parentNode !== e) {
            for (var n, s = ns.length, o = e.style, a = t.style; s--; )
                o[n = ns[s]] = i[n];
            o.position = "absolute" === i.position ? "absolute" : "relative",
            "inline" === i.display && (o.display = "inline-block"),
            a.bottom = a.right = "auto",
            o.overflow = "visible",
            o.boxSizing = "border-box",
            o.width = Mn(t, Cn) + kn,
            o.height = Mn(t, Sn) + kn,
            o[Tn] = a.margin = a.top = a.left = "0",
            ls(r),
            a.width = a.maxWidth = i.width,
            a.height = a.maxHeight = i.height,
            a[Tn] = i[Tn],
            t.parentNode.insertBefore(e, t),
            e.appendChild(t)
        }
    }, as = /([A-Z])/g, ls = function(t) {
        if (t)
            for (var e, i, r = t.t.style, n = t.length, s = 0; s < n; s += 2)
                i = t[s + 1],
                e = t[s],
                i ? r[e] = i : r[e] && r.removeProperty(e.replace(as, "-$1").toLowerCase())
    }, us = function(t) {
        for (var e = ss.length, i = t.style, r = [], n = 0; n < e; n++)
            r.push(ss[n], i[ss[n]]);
        return r.t = t,
        r
    }, cs = {
        left: 0,
        top: 0
    }, hs = function(t, e, i, r, n, s, o, a, l, u, c, h) {
        if (vn(t) && (t = t(a)),
        mn(t) && "max" === t.substr(0, 3) && (t = h + ("=" === t.charAt(4) ? Bn("0" + t.substr(3), i) : 0)),
        _n(t))
            o && Nn(o, i, r, !0);
        else {
            vn(e) && (e = e(a));
            var d, f, p, g = Ir(e)[0] || Pr, m = On(g) || {}, v = t.split(" ");
            m && (m.left || m.top) || "none" !== An(g).display || (p = g.style.display,
            g.style.display = "block",
            m = On(g),
            p ? g.style.display = p : g.style.removeProperty("display")),
            d = Bn(v[0], m[r.d]),
            f = Bn(v[1] || "0", i),
            t = m[r.p] - l[r.p] - u + d + n - f,
            o && Nn(o, f, r, i - f < 20 || o._isStart && f > 20),
            i -= i - f
        }
        if (s) {
            var _ = t + i
              , y = s._isStart;
            h = "scroll" + r.d2,
            Nn(s, _, r, y && _ > 20 || !y && (c ? Math.max(Pr[h], zr[h]) : s.parentNode[h]) <= _ + 1),
            c && (l = On(o),
            c && (s.style[r.op.p] = l[r.op.p] - r.op.m - s._offset + kn))
        }
        return Math.round(t)
    }, ds = /(?:webkit|moz|length|cssText)/i, fs = function(t, e, i, r) {
        if (t.parentNode !== e) {
            var n, s, o = t.style;
            if (e === Pr) {
                for (n in t._stOrig = o.cssText,
                s = An(t))
                    +n || ds.test(n) || !s[n] || "string" != typeof o[n] || "0" === n || (o[n] = s[n]);
                o.top = i,
                o.left = r
            } else
                o.cssText = t._stOrig;
            Er.core.getCache(t).uncache = 1,
            e.appendChild(t)
        }
    }, ps = function(t, e) {
        var i, r, n = dn(t, e), s = "_scroll" + e.p2;
        return t[s] = n,
        function e(o, a, l, u, c) {
            var h = e.tween
              , d = a.onComplete
              , f = {};
            return h && h.kill(),
            i = Math.round(l),
            a[s] = o,
            a.modifiers = f,
            f[s] = function(t) {
                return (t = Math.round(n())) !== i && t !== r ? (h.kill(),
                e.tween = 0) : t = l + u * h.ratio + c * h.ratio * h.ratio,
                r = i,
                i = Math.round(t)
            }
            ,
            a.onComplete = function() {
                e.tween = 0,
                d && d.call(h)
            }
            ,
            h = e.tween = Er.to(t, a)
        }
    };
    Cn.op = Sn;
    var gs = function() {
        function t(e, i) {
            Or || t.register(Er) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
            this.init(e, i)
        }
        return t.prototype.init = function(e, i) {
            if (this.progress = 0,
            this.vars && this.kill(1),
            on) {
                var r, n, s, o, a, l, u, c, h, d, f, p, g, m, v, _, y, b, x, w, T, k, C, S, A, E, O, M, L, z, P, F, R, D, B, I, N, V, q = (e = En(mn(e) || _n(e) || e.nodeType ? {
                    trigger: e
                } : e, Rn)).horizontal ? Cn : Sn, W = e, Y = W.onUpdate, X = W.toggleClass, $ = W.id, j = W.onToggle, U = W.onRefresh, H = W.scrub, G = W.trigger, Z = W.pin, Q = W.pinSpacing, J = W.invalidateOnRefresh, K = W.anticipatePin, tt = W.onScrubComplete, et = W.onSnapComplete, it = W.once, rt = W.snap, nt = W.pinReparent, st = !H && 0 !== H, ot = Ir(e.scroller || Mr)[0], at = Er.core.getCache(ot), lt = cn(ot), ut = "pinType"in e ? "fixed" === e.pinType : lt || "fixed" === hn(ot, "pinType"), ct = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], ht = st && e.toggleActions.split(" "), dt = "markers"in e ? e.markers : Rn.markers, ft = lt ? 0 : parseFloat(An(ot)["border" + q.p2 + "Width"]) || 0, pt = this, gt = e.onRefreshInit && function() {
                    return e.onRefreshInit(pt)
                }
                , mt = function(t, e, i) {
                    var r = i.d
                      , n = i.d2
                      , s = i.a;
                    return (s = hn(t, "getBoundingClientRect")) ? function() {
                        return s()[r]
                    }
                    : function() {
                        return (e ? Mr["inner" + n] : t["client" + n]) || 0
                    }
                }(ot, lt, q), vt = function(t, e) {
                    return !e || ~tn.indexOf(t) ? fn(t) : function() {
                        return cs
                    }
                }(ot, lt);
                pt.media = Qr,
                K *= 45,
                Vn.push(pt),
                pt.scroller = ot,
                pt.scroll = dn(ot, q),
                a = pt.scroll(),
                pt.vars = e,
                i = i || e.animation,
                "refreshPriority"in e && (Gr = 1),
                at.tweenScroll = at.tweenScroll || {
                    top: ps(ot, Sn),
                    left: ps(ot, Cn)
                },
                pt.tweenTo = r = at.tweenScroll[q.p],
                i && (i.vars.lazy = !1,
                i._initted || !1 !== i.vars.immediateRender && !1 !== e.immediateRender && i.render(0, !0, !0),
                pt.animation = i.pause(),
                i.scrollTrigger = pt,
                (F = _n(H) && H) && (P = Er.to(i, {
                    ease: "power3",
                    duration: F,
                    onComplete: function() {
                        return tt && tt(pt)
                    }
                })),
                L = 0,
                $ || ($ = i.vars.id)),
                rt && (yn(rt) || (rt = {
                    snapTo: rt
                }),
                Er.set(lt ? [Pr, zr] : ot, {
                    scrollBehavior: "auto"
                }),
                s = vn(rt.snapTo) ? rt.snapTo : "labels" === rt.snapTo ? function(t) {
                    return function(e) {
                        var i, r = [], n = t.labels, s = t.duration();
                        for (i in n)
                            r.push(n[i] / s);
                        return Er.utils.snap(r, e)
                    }
                }(i) : Er.utils.snap(rt.snapTo),
                R = rt.duration || {
                    min: .1,
                    max: 2
                },
                R = yn(R) ? Nr(R.min, R.max) : Nr(R, R),
                D = Er.delayedCall(rt.delay || F / 2 || .1, (function() {
                    if (Math.abs(pt.getVelocity()) < 10 && !Yr) {
                        var t = i && !st ? i.totalProgress() : pt.progress
                          , e = (t - z) / (rn() - Vr) * 1e3 || 0
                          , n = wn(e / 2) * e / .185
                          , o = t + n
                          , a = Nr(0, 1, s(o, pt))
                          , l = pt.scroll()
                          , h = Math.round(u + a * m)
                          , d = r.tween;
                        if (l <= c && l >= u && h !== l) {
                            if (d && !d._initted && d.data <= Math.abs(h - l))
                                return;
                            r(h, {
                                duration: R(wn(.185 * Math.max(wn(o - t), wn(a - t)) / e / .05 || 0)),
                                ease: rt.ease || "power3",
                                data: Math.abs(h - l),
                                onComplete: function() {
                                    L = z = i && !st ? i.totalProgress() : pt.progress,
                                    et && et(pt)
                                }
                            }, l, n * m, h - l - n * m)
                        }
                    } else
                        pt.isActive && D.restart(!0)
                }
                )).pause()),
                $ && (qn[$] = pt),
                G = pt.trigger = Ir(G || Z)[0],
                Z = !0 === Z ? G : Ir(Z)[0],
                mn(X) && (X = {
                    targets: G,
                    className: X
                }),
                Z && (!1 === Q || "margin" === Q || (Q = !(!Q && "flex" === An(Z.parentNode).display) && Tn),
                pt.pin = Z,
                !1 !== e.force3D && Er.set(Z, {
                    force3D: !0
                }),
                (n = Er.core.getCache(Z)).spacer ? v = n.pinState : (n.spacer = b = Lr.createElement("div"),
                b.setAttribute("class", "pin-spacer" + ($ ? " pin-spacer-" + $ : "")),
                n.pinState = v = us(Z)),
                pt.spacer = b = n.spacer,
                M = An(Z),
                S = M[Q + q.os2],
                w = Er.getProperty(Z),
                T = Er.quickSetter(Z, q.a, kn),
                os(Z, b, M),
                y = us(Z)),
                dt && (g = yn(dt) ? En(dt, Fn) : Fn,
                f = In("scroller-start", $, ot, q, g, 0),
                p = In("scroller-end", $, ot, q, g, 0, f),
                x = f["offset" + q.op.d2],
                h = In("start", $, ot, q, g, x),
                d = In("end", $, ot, q, g, x),
                ut || ((V = ot).style.position = "absolute" === An(V).position ? "absolute" : "relative",
                Er.set([f, p], {
                    force3D: !0
                }),
                E = Er.quickSetter(f, q.a, kn),
                O = Er.quickSetter(p, q.a, kn))),
                pt.revert = function(t) {
                    var e = !1 !== t || !pt.enabled
                      , r = Wr;
                    e !== o && (e && (I = Math.max(pt.scroll(), pt.scroll.rec || 0),
                    B = pt.progress,
                    N = i && i.progress()),
                    h && [h, d, f, p].forEach((function(t) {
                        return t.style.display = e ? "none" : "block"
                    }
                    )),
                    e && (Wr = 1),
                    pt.update(e),
                    Wr = r,
                    Z && (e ? function(t, e, i) {
                        if (ls(i),
                        t.parentNode === e) {
                            var r = e.parentNode;
                            r && (r.insertBefore(t, e),
                            r.removeChild(e))
                        }
                    }(Z, b, v) : (!nt || !pt.isActive) && os(Z, b, An(Z), A)),
                    o = e)
                }
                ,
                pt.refresh = function(r) {
                    if (!Wr && pt.enabled)
                        if (Z && r && sn)
                            zn(t, "scrollEnd", Gn);
                        else {
                            Wr = 1,
                            P && P.kill(),
                            J && i && i.progress(0).invalidate(),
                            o || pt.revert();
                            for (var n, s, g, x, T, S, E, O, M = mt(), L = vt(), z = pn(ot, q), F = 0, R = 0, D = e.end, V = e.endTrigger || G, W = e.start || (0 === e.start ? 0 : Z || !G ? "0 0" : "0 100%"), Y = G && Math.max(0, Vn.indexOf(pt)) || 0, X = Y; X--; )
                                (E = Vn[X].pin) && (E === G || E === Z) && Vn[X].revert();
                            for (u = hs(W, G, M, q, pt.scroll(), h, f, pt, L, ft, ut, z) || (Z ? -.001 : 0),
                            vn(D) && (D = D(pt)),
                            mn(D) && !D.indexOf("+=") && (~D.indexOf(" ") ? D = (mn(W) ? W.split(" ")[0] : "") + D : (F = Bn(D.substr(2), M),
                            D = mn(W) ? W : u + F,
                            V = G)),
                            c = Math.max(u, hs(D || (V ? "100% 0" : z), V, M, q, pt.scroll() + F, d, p, pt, L, ft, ut, z)) || -.001,
                            m = c - u || (u -= .01) && .001,
                            F = 0,
                            X = Y; X--; )
                                (E = (S = Vn[X]).pin) && S.start - S._pinPush < u && (n = S.end - S.start,
                                E === G && (F += n),
                                E === Z && (R += n));
                            if (u += F,
                            c += F,
                            pt._pinPush = R,
                            h && F && ((n = {})[q.a] = "+=" + F,
                            Er.set([h, d], n)),
                            Z)
                                n = An(Z),
                                x = q === Sn,
                                g = pt.scroll(),
                                k = parseFloat(w(q.a)) + R,
                                !z && c > 1 && ((lt ? Pr : ot).style["overflow-" + q.a] = "scroll"),
                                os(Z, b, n),
                                y = us(Z),
                                s = On(Z, !0),
                                O = ut && dn(ot, x ? Cn : Sn)(),
                                Q && ((A = [Q + q.os2, m + R + kn]).t = b,
                                (X = Q === Tn ? Mn(Z, q) + m + R : 0) && A.push(q.d, X + kn),
                                ls(A),
                                ut && pt.scroll(I)),
                                ut && ((T = {
                                    top: s.top + (x ? g - u : O) + kn,
                                    left: s.left + (x ? O : g - u) + kn,
                                    boxSizing: "border-box",
                                    position: "fixed"
                                }).width = T.maxWidth = Math.ceil(s.width) + kn,
                                T.height = T.maxHeight = Math.ceil(s.height) + kn,
                                T.margin = T.marginTop = T.marginRight = T.marginBottom = T.marginLeft = "0",
                                T[Tn] = n[Tn],
                                T[Tn + "Top"] = n[Tn + "Top"],
                                T[Tn + "Right"] = n[Tn + "Right"],
                                T[Tn + "Bottom"] = n[Tn + "Bottom"],
                                T[Tn + "Left"] = n[Tn + "Left"],
                                _ = function(t, e, i) {
                                    for (var r, n = [], s = t.length, o = i ? 8 : 0; o < s; o += 2)
                                        r = t[o],
                                        n.push(r, r in e ? e[r] : t[o + 1]);
                                    return n.t = t.t,
                                    n
                                }(v, T, nt)),
                                i ? (i.progress(1, !0),
                                C = w(q.a) - k + m + R,
                                m !== C && _.splice(_.length - 2, 2),
                                i.progress(0, !0)) : C = m;
                            else if (G && pt.scroll())
                                for (s = G.parentNode; s && s !== Pr; )
                                    s._pinOffset && (u -= s._pinOffset,
                                    c -= s._pinOffset),
                                    s = s.parentNode;
                            for (X = 0; X < Y; X++)
                                (S = Vn[X].pin) && (S === G || S === Z) && Vn[X].revert(!1);
                            pt.start = u,
                            pt.end = c,
                            (a = l = pt.scroll()) < I && pt.scroll(I),
                            pt.revert(!1),
                            Wr = 0,
                            N && st && i.progress(N, !0),
                            B !== pt.progress && (P && i.totalProgress(B, !0),
                            pt.progress = B,
                            pt.update()),
                            Z && Q && (b._pinOffset = Math.round(pt.progress * C)),
                            U && U(pt)
                        }
                }
                ,
                pt.getVelocity = function() {
                    return (pt.scroll() - l) / (rn() - Vr) * 1e3 || 0
                }
                ,
                pt.update = function(t, e) {
                    var n, s, o, h, d, p = pt.scroll(), g = t ? 0 : (p - u) / m, v = g < 0 ? 0 : g > 1 ? 1 : g || 0, x = pt.progress;
                    if (e && (l = a,
                    a = p,
                    rt && (z = L,
                    L = i && !st ? i.totalProgress() : v)),
                    K && !v && Z && !Wr && !Kr && sn && u < p + (p - l) / (rn() - Vr) * K && (v = 1e-4),
                    v !== x && pt.enabled) {
                        if (h = (d = (n = pt.isActive = !!v && v < 1) !== (!!x && x < 1)) || !!v != !!x,
                        pt.direction = v > x ? 1 : -1,
                        pt.progress = v,
                        st || (!P || Wr || Kr ? i && i.totalProgress(v, !!Wr) : (P.vars.totalProgress = v,
                        P.invalidate().restart())),
                        Z)
                            if (t && Q && (b.style[Q + q.os2] = S),
                            ut) {
                                if (h) {
                                    if (o = !t && v > x && c + 1 > p && p + 1 >= pn(ot, q),
                                    nt)
                                        if (t || !n && !o)
                                            fs(Z, b);
                                        else {
                                            var w = On(Z, !0)
                                              , A = p - u;
                                            fs(Z, Pr, w.top + (q === Sn ? A : 0) + kn, w.left + (q === Sn ? 0 : A) + kn)
                                        }
                                    ls(n || o ? _ : y),
                                    C !== m && v < 1 && n || T(k + (1 !== v || o ? 0 : C))
                                }
                            } else
                                T(k + C * v);
                        rt && !r.tween && !Wr && !Kr && D.restart(!0),
                        X && (d || it && v && (v < 1 || !Zr)) && Ir(X.targets).forEach((function(t) {
                            return t.classList[n || it ? "add" : "remove"](X.className)
                        }
                        )),
                        Y && !st && !t && Y(pt),
                        h && !Wr ? (s = v && !x ? 0 : 1 === v ? 1 : 1 === x ? 2 : 3,
                        st && (o = !d && "none" !== ht[s + 1] && ht[s + 1] || ht[s],
                        i && ("complete" === o || "reset" === o || o in i) && ("complete" === o ? i.pause().totalProgress(1) : "reset" === o ? i.restart(!0).pause() : i[o]()),
                        Y && Y(pt)),
                        !d && Zr || (j && d && j(pt),
                        ct[s] && ct[s](pt),
                        it && (1 === v ? pt.kill(!1, 1) : ct[s] = 0),
                        d || ct[s = 1 === v ? 1 : 3] && ct[s](pt))) : st && Y && !Wr && Y(pt)
                    }
                    O && (E(p + (f._isFlipped ? 1 : 0)),
                    O(p))
                }
                ,
                pt.enable = function() {
                    pt.enabled || (pt.enabled = !0,
                    zn(ot, "resize", Xn),
                    zn(ot, "scroll", Yn),
                    gt && zn(t, "refreshInit", gt),
                    i && i.add ? Er.delayedCall(.01, (function() {
                        return u || c || pt.refresh()
                    }
                    )) && (m = .01) && (u = c = 0) : pt.refresh())
                }
                ,
                pt.disable = function(e, i) {
                    if (pt.enabled && (!1 !== e && pt.revert(),
                    pt.enabled = pt.isActive = !1,
                    i || P && P.pause(),
                    I = 0,
                    n && (n.uncache = 1),
                    gt && Pn(t, "refreshInit", gt),
                    D && (D.pause(),
                    r.tween && r.tween.kill() && (r.tween = 0)),
                    !lt)) {
                        for (var s = Vn.length; s--; )
                            if (Vn[s].scroller === ot && Vn[s] !== pt)
                                return;
                        Pn(ot, "resize", Xn),
                        Pn(ot, "scroll", Yn)
                    }
                }
                ,
                pt.kill = function(t, e) {
                    pt.disable(t, e),
                    $ && delete qn[$];
                    var r = Vn.indexOf(pt);
                    Vn.splice(r, 1),
                    r === $r && is > 0 && $r--,
                    i && (i.scrollTrigger = null,
                    t && i.render(-1),
                    e || i.kill()),
                    h && [h, d, f, p].forEach((function(t) {
                        return t.parentNode.removeChild(t)
                    }
                    )),
                    n && (n.uncache = 1)
                }
                ,
                pt.enable()
            } else
                this.update = this.refresh = this.kill = an
        }
        ,
        t.register = function(e) {
            if (!Or && (Er = e || un(),
            ln() && window.document && (Mr = window,
            Lr = document,
            zr = Lr.documentElement,
            Pr = Lr.body),
            Er && (Ir = Er.utils.toArray,
            Nr = Er.utils.clamp,
            Er.core.globals("ScrollTrigger", t),
            Pr))) {
                Dr = Mr.requestAnimationFrame || function(t) {
                    return setTimeout(t, 16)
                }
                ,
                zn(Mr, "mousewheel", Yn),
                Fr = [Mr, Lr, zr, Pr],
                zn(Lr, "scroll", Yn);
                var i, r = Pr.style, n = r.borderTop;
                r.borderTop = "1px solid #000",
                i = On(Pr),
                Sn.m = Math.round(i.top + Sn.sc()) || 0,
                Cn.m = Math.round(i.left + Cn.sc()) || 0,
                n ? r.borderTop = n : r.removeProperty("border-top"),
                qr = setInterval(Wn, 200),
                Er.delayedCall(.5, (function() {
                    return Kr = 0
                }
                )),
                zn(Lr, "touchcancel", an),
                zn(Pr, "touchstart", an),
                Ln(zn, Lr, "pointerdown,touchstart,mousedown", (function() {
                    return Yr = 1
                }
                )),
                Ln(zn, Lr, "pointerup,touchend,mouseup", (function() {
                    return Yr = 0
                }
                )),
                Xr = Er.utils.checkPrefix("transform"),
                ss.push(Xr),
                Or = rn(),
                Rr = Er.delayedCall(.2, ts).pause(),
                Hr = [Lr, "visibilitychange", function() {
                    var t = Mr.innerWidth
                      , e = Mr.innerHeight;
                    Lr.hidden ? (jr = t,
                    Ur = e) : jr === t && Ur === e || Xn()
                }
                , Lr, "DOMContentLoaded", ts, Mr, "load", function() {
                    return sn || ts()
                }
                , Mr, "resize", Xn],
                gn(zn)
            }
            return Or
        }
        ,
        t.defaults = function(t) {
            for (var e in t)
                Rn[e] = t[e]
        }
        ,
        t.kill = function() {
            on = 0,
            Vn.slice(0).forEach((function(t) {
                return t.kill(1)
            }
            ))
        }
        ,
        t.config = function(t) {
            "limitCallbacks"in t && (Zr = !!t.limitCallbacks);
            var e = t.syncInterval;
            e && clearInterval(qr) || (qr = e) && setInterval(Wn, e),
            "autoRefreshEvents"in t && (gn(Pn) || gn(zn, t.autoRefreshEvents || "none"))
        }
        ,
        t.scrollerProxy = function(t, e) {
            var i = Ir(t)[0];
            cn(i) ? tn.unshift(Mr, e, Pr, e, zr, e) : tn.unshift(i, e)
        }
        ,
        t.matchMedia = function(t) {
            var e, i, r, n, s;
            for (i in t)
                r = Un.indexOf(i),
                n = t[i],
                Qr = i,
                "all" === i ? n() : (e = Mr.matchMedia(i)) && (e.matches && (s = n()),
                ~r ? (Un[r + 1] = xn(Un[r + 1], n),
                Un[r + 2] = xn(Un[r + 2], s)) : (r = Un.length,
                Un.push(i, n, s),
                e.addListener ? e.addListener(Hn) : e.addEventListener("change", Hn)),
                Un[r + 3] = e.matches),
                Qr = 0;
            return Un
        }
        ,
        t.clearMatchMedia = function(t) {
            t || (Un.length = 0),
            (t = Un.indexOf(t)) >= 0 && Un.splice(t, 4)
        }
        ,
        t
    }();
    gs.version = "3.5.1",
    gs.saveStyles = function(t) {
        return t ? Ir(t).forEach((function(t) {
            var e = Qn.indexOf(t);
            e >= 0 && Qn.splice(e, 4),
            Qn.push(t, t.style.cssText, Er.core.getCache(t), Qr)
        }
        )) : Qn
    }
    ,
    gs.revert = function(t, e) {
        return Kn(!t, e)
    }
    ,
    gs.create = function(t, e) {
        return new gs(t,e)
    }
    ,
    gs.refresh = function(t) {
        return t ? Xn() : ts(!0)
    }
    ,
    gs.update = rs,
    gs.maxScroll = function(t, e) {
        return pn(t, e ? Cn : Sn)
    }
    ,
    gs.getScrollFunc = function(t, e) {
        return dn(Ir(t)[0], e ? Cn : Sn)
    }
    ,
    gs.getById = function(t) {
        return qn[t]
    }
    ,
    gs.getAll = function() {
        return Vn.slice(0)
    }
    ,
    gs.isScrolling = function() {
        return !!sn
    }
    ,
    gs.addEventListener = function(t, e) {
        var i = $n[t] || ($n[t] = []);
        ~i.indexOf(e) || i.push(e)
    }
    ,
    gs.removeEventListener = function(t, e) {
        var i = $n[t]
          , r = i && i.indexOf(e);
        r >= 0 && i.splice(r, 1)
    }
    ,
    gs.batch = function(t, e) {
        var i, r = [], n = {}, s = e.interval || .016, o = e.batchMax || 1e9, a = function(t, e) {
            var i = []
              , r = []
              , n = Er.delayedCall(s, (function() {
                e(i, r),
                i = [],
                r = []
            }
            )).pause();
            return function(t) {
                i.length || n.restart(!0),
                i.push(t.trigger),
                r.push(t),
                o <= i.length && n.progress(1)
            }
        };
        for (i in e)
            n[i] = "on" === i.substr(0, 2) && vn(e[i]) && "onRefreshInit" !== i ? a(0, e[i]) : e[i];
        return vn(o) && (o = o(),
        zn(gs, "refresh", (function() {
            return o = e.batchMax()
        }
        ))),
        Ir(t).forEach((function(t) {
            var e = {};
            for (i in n)
                e[i] = n[i];
            e.trigger = t,
            r.push(gs.create(e))
        }
        )),
        r
    }
    ,
    gs.sort = function(t) {
        return Vn.sort(t || function(t, e) {
            return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
        }
        )
    }
    ,
    un() && Er.registerPlugin(gs);
    class ms {
        constructor(t) {
            return this.opts = {
                target: void 0,
                ...t
            },
            this.video = "string" == typeof t.target ? document.querySelector(t.target) : t.target,
            this.video.setAttribute("preload", "none"),
            this.currVidSourceLoaded = !1,
            this.isContained = "100%" == window.getComputedStyle(this.video)["max-width"],
            this.vidSources = this.parseSources("src"),
            this.currVidSource = this.calcSource(this.vidSources),
            this.posterSources = this.parseSources("poster"),
            this.currPosterSource = this.calcSource(this.posterSources),
            this.loadPoster(),
            window.addEventListener("resize", ()=>{
                if (this.vidSources) {
                    const t = this.calcSource(this.vidSources);
                    this.currVidSource != t && (this.currVidSource = t,
                    this.currVidSourceLoaded && (this.currVidSourceLoaded = !1,
                    this.load()))
                }
                if (this.posterSources) {
                    const t = this.calcSource(this.posterSources);
                    this.currPosterSource != t && (this.currPosterSource = t,
                    this.loadPoster())
                }
            }
            ),
            this
        }
        load() {
            return this.video.src && this.currVidSourceLoaded || (this.video.src = this.currVidSource),
            (this.video.readyState < 4 || !this.currVidSourceLoaded) && (this.video.load(),
            this.currVidSourceLoaded = !0),
            this
        }
        loadPoster() {
            this.currPosterSource && (this.video.poster = this.currPosterSource)
        }
        parseSources(t) {
            const e = [];
            for (const i in this.video.dataset)
                if (i.includes(t)) {
                    const t = i.split("-");
                    t[1] ? e.push({
                        width: parseInt(t[1]),
                        src: this.video.dataset[i]
                    }) : e.push({
                        width: 0,
                        src: this.video.dataset[i]
                    })
                }
            return e
        }
        calcSource(t) {
            if (this.videoWidth = this.isContained ? this.video.offsetWidth : window.innerWidth,
            t.length) {
                return t.reduce((t,e)=>e.width < this.videoWidth ? e : t).src
            }
        }
        getTimeFromPct(t) {
            return this.video.duration * t
        }
        setTimeFromPct(t) {
            this.video.currentTime = this.getTimeFromPct(t)
        }
        startVidMonitor() {
            const t = ()=>{
                this.video.paused || (this.playRangeEnd && this.video.currentTime >= this.playRangeEnd ? this.pauseWithMonitor() : this.vidRaf = window.requestAnimationFrame(t))
            }
            ;
            return window.requestAnimationFrame(t),
            this
        }
        stopVidMonitor() {
            return console.log("CLEAR RAF", this.vidRaf),
            window.cancelAnimationFrame(this.vidRaf),
            this
        }
        playTo({pct: t, time: e}) {
            return this.playRangeEnd = t ? this.getTimeFromPct(t) : e,
            this.playRangeEnd < this.video.currentTime ? (this.pauseWithMonitor(),
            this.playReverse()) : (this.video.paused && this.video.play(),
            this.startVidMonitor()),
            this
        }
        playReverse() {
            this.video.pause();
            var t = setInterval(()=>{
                this.video.currentTime <= this.playRangeEnd || 0 == this.video.currentTime ? (clearInterval(t),
                this.video.pause()) : this.video.currentTime += -.04
            }
            , 40)
        }
        pauseWithMonitor() {
            return this.video.pause(),
            this.stopVidMonitor(),
            this
        }
        clearPlayRange() {
            return this.playRangeStart = null,
            this.playRangeEnd = null,
            this
        }
        setPlayRange(t, e) {
            return t && (this.playRangeStart = this.getProgressFromDate(t)),
            e && (this.playRangeEnd = this.getProgressFromDate(e)),
            this
        }
    }
    function vs(t, e) {
        let i, r;
        return function() {
            const n = this
              , s = arguments;
            r ? (clearTimeout(i),
            i = setTimeout((function() {
                Date.now() - r >= e && (t.apply(n, s),
                r = Date.now())
            }
            ), e - (Date.now() - r))) : (t.apply(n, s),
            r = Date.now())
        }
    }
    class _s {
        constructor() {
            this.subscriptions = Object.create(null)
        }
        emit(t) {
            let e = Array.prototype.slice.call(arguments, 1);
            const i = this.subscriptions[t] || [];
            for (let t = 0; t < i.length; t++)
                i[t].apply(null, e)
        }
        on(t, e) {
            if ("function" != typeof e)
                throw "Subscribers must be functions";
            const i = this.subscriptions[t] || [];
            i.push(e),
            this.subscriptions[t] = i
        }
        off(t, e) {
            const i = (this.subscriptions[t] || []).filter(t=>t !== e);
            this.subscriptions[t] = i
        }
        cancel(t) {
            delete this.subscriptions[t]
        }
    }
    class ys {
        constructor(t) {
            if (this.opts = {
                target: "",
                slideClass: ".ngm-gallery-slide",
                slideTransitionDuration: .3,
                autoplayVideo: !0,
                autoplayFirstVideo: !1,
                loop: !0,
                fullScreen: !1,
                ...t
            },
            this.state = {
                index: void 0
            },
            this.events = new _s,
            this.timelineLabelPrefix = "slide_",
            this.el = "string" == typeof this.opts.target ? document.querySelector(this.opts.target) : t.target,
            this.slideEls = this.el.querySelectorAll(this.opts.slideClass),
            this.size = this.slideEls.length,
            this.opts.fullScreen) {
                const t = document.querySelector("#interactive-refresh-ad");
                t && t.classList.add("ngm-gallery-ad-control"),
                this.el.classList.add("ngm-gallery-full")
            }
            this.initSlides(),
            this.set(0)
        }
        initSlides() {
            this.timeline = new Ye({
                paused: !0,
                onInterrupt: ()=>{
                    console.log("interrrupted")
                }
            }),
            this.slides = [],
            this.slideEls.forEach((t,e)=>{
                this.slides.push({
                    id: t.id,
                    label: this.timelineLabelFromIndex(e),
                    el: t,
                    ai2html: t.querySelector(".ai2html"),
                    nextAi2html: this.slideEls[e + 1] ? this.slideEls[e + 1].querySelector(".ai2html") : null,
                    video: t.querySelector("video"),
                    prevVideo: this.slideEls[e - 1] ? this.slideEls[e - 1].querySelector("video") : null,
                    nextVideo: this.slideEls[e + 1] ? this.slideEls[e + 1].querySelector("video") : null
                }),
                this.timeline.add(this.createSlideTransition(e, this.slides[e].el)).addLabel(this.slides[e].label)
            }
            )
        }
        createSlideTransition(t, e) {
            return (new Ye).fromTo(this.slides[t].el, {
                autoAlpha: 0 === t ? 1 : 0,
                ease: "none"
            }, {
                autoAlpha: 1,
                ease: "none",
                duration: this.opts.slideTransitionDuration
            })
        }
        initAi2htmlArtboard(t) {
            function e(t, e) {
                return e ? Array.prototype.slice.call(e.querySelectorAll(t)) : []
            }
            function i(t) {
                var e = t.getAttribute("data-src");
                e && t.getAttribute("src") != e && t.setAttribute("src", e)
            }
            function r() {
                var r = e(".g-artboard[data-min-width]", t)
                  , n = Math.round(t.getBoundingClientRect().width);
                console.log(r, n),
                r.forEach((function(t) {
                    var r = t.getAttribute("data-min-width")
                      , s = t.getAttribute("data-max-width");
                    +r <= n && (+s >= n || null === s) ? (e(".g-aiImg", t).forEach(i),
                    t.style.display = "block") : t.style.display = "none"
                }
                ))
            }
            r(),
            window.addEventListener("resize", vs(r, 200))
        }
        next() {
            return this.state.index + 1 == this.slides.length ? this.opts.loop && (this.setIndex(0),
            this.timeline.seek(this.timelineLabelFromIndex(0), !0)) : (this.setIndex(this.state.index + 1),
            this.timeline.tweenTo(this.timelineLabelFromIndex(this.state.index))),
            this.handleVideoForward(this.slides[this.state.index]),
            this.loadAi2html(this.slides[this.state.index].ai2html),
            this
        }
        prev() {
            return this.state.index - 1 < 0 ? (this.opts.loop && (this.setIndex(this.slides.length - 1),
            this.timeline.seek(this.timelineLabelFromIndex(this.state.index), !0)),
            this.handleVideoForward(this.slides[this.state.index])) : (this.setIndex(this.state.index - 1),
            this.timeline.tweenTo(this.timelineLabelFromIndex(this.state.index)),
            this.handleVideoBackward(this.slides[this.state.index])),
            this
        }
        set(t) {
            const e = this.state.index;
            this.setIndex(t),
            this.timeline.tweenTo(this.timelineLabelFromIndex(t));
            const i = this.slides[t];
            return e < this.state.index ? (this.handleVideoForward(i),
            this.handleAi2htmlForward(i)) : e > this.state.index ? this.handleVideoBackward(i) : e === this.state.index ? this.handleVideoReset(i) : (this.loadAi2html(i.ai2html),
            this.loadVideo(i.video),
            this.handleVideoForward(i, this.opts.autoplayFirstVideo)),
            this
        }
        get(t) {
            const e = this.slides.find(e=>e.id == t);
            if (e)
                return e;
            throw new Error(`GalPal.get error: "${t}" is invalid. It must match an id of an element being tracked e.g.: <div id="ng-track-me" class="ngm-scroll-fg-slide">`)
        }
        timelineLabelFromIndex(t) {
            return `${this.timelineLabelPrefix}${t}`
        }
        timelineLabelToIndex(t) {
            return parseFloat(t.replace(this.timelineLabelPrefix, ""))
        }
        loadVideo(t) {
            t && new ms({
                target: t
            }).load()
        }
        loadAi2html(t) {}
        handleAi2htmlForward(t) {
            t.nextAi2html && this.loadAi2html(t.nextAi2html)
        }
        handleVideoForward(t, e=!0) {
            t.nextVideo && this.loadVideo(t.nextVideo),
            this.opts.autoplayVideo && (t.prevVideo && setTimeout(()=>{
                t.prevVideo.pause(),
                t.prevVideo.currentTime = 0
            }
            , 1e3 * this.opts.slideTransitionDuration),
            t.video && e && setTimeout(()=>{
                t.video.currentTime = 0,
                t.video.play()
            }
            , 1e3 * this.opts.slideTransitionDuration))
        }
        handleVideoBackward(t) {
            this.opts.autoplayVideo && (t.video && setTimeout(()=>{
                t.video.play(),
                t.video.currentTime = 0
            }
            , 1e3 * this.opts.slideTransitionDuration),
            t.nextVideo && setTimeout(()=>{
                t.nextVideo.pause(),
                t.nextVideo.currentTime = 0
            }
            , 1e3 * this.opts.slideTransitionDuration))
        }
        handleVideoReset(t) {
            this.opts.autoplayVideo && t.video && (t.video.currentTime = 0,
            t.video.play())
        }
        setIndex(t) {
            this.state.index = t,
            this.events.emit("change", this.state)
        }
        on(t, e) {
            this.events.on(t, e)
        }
        off(t, e) {
            this.events.off(t, e)
        }
    }
    class bs {
        constructor(t) {
            this.opts = {
                target: void 0,
                size: 0,
                progressElClass: "ngm-progress",
                progressItemElClass: "ngm-progress-item",
                progressItemElActiveClass: "ngm-progress-item-active",
                style: "tick",
                orientation: "horizontal",
                ...t
            },
            this.el = "string" == typeof this.opts.target ? document.querySelector(this.opts.target) : t.target,
            this.init()
        }
        init() {
            "bar" == this.opts.style ? this.el.appendChild(p.fragment`
                    <div class="${this.opts.progressElClass} ngm-progress-${this.opts.orientation} ngm-progress-${this.opts.style}">
                        <div class="${this.opts.progressItemElClass}"></div>
                    </div>
                `) : this.el.appendChild(p.fragment`
                    <div class="${this.opts.progressElClass} ngm-progress-${this.opts.orientation} ngm-progress-${this.opts.style}">
                        ${[...Array(this.opts.size).keys()].map(t=>p.fragment`<div class="${this.opts.progressItemElClass}"></div>`)}
                    </div>
                                    `),
            this.progressItemEls = this.el.querySelectorAll("." + this.opts.progressItemElClass),
            this.set(0)
        }
        set(t) {
            return "vertical" == this.opts.orientation && (t = this.progressItemEls.length - 1 - t),
            "tick" == this.opts.style ? (this.progressItemEls.forEach((e,i)=>{
                i !== t && e.classList.remove(this.opts.progressItemElActiveClass)
            }
            ),
            this.progressItemEls[t].classList.add(this.opts.progressItemElActiveClass)) : "countup" == this.opts.style ? (this.progressItemEls.forEach((e,i)=>{
                i > t && e.classList.remove(this.opts.progressItemElActiveClass)
            }
            ),
            this.progressItemEls[t].classList.add(this.opts.progressItemElActiveClass)) : "bar" == this.opts.style && (this.progressItemEls[0].style.width = t / this.opts.size * 100 + "%"),
            this
        }
    }
    var xs = mi.registerPlugin(Ar) || mi;
    xs.core.Tween;
    xs.registerPlugin(gs);
    class ws {
        constructor(t) {
            this.opts = {
                id: "",
                target: null,
                monitorOffsetChanges: !1,
                ...t,
                scrollOptions: {
                    markers: !1,
                    scrub: !0,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                    onEnter: ()=>{}
                    ,
                    onEnterBack: ()=>{}
                    ,
                    onLeave: ()=>{}
                    ,
                    onLeaveBack: ()=>{}
                    ,
                    onRefresh: ()=>{}
                    ,
                    onUpdate: ()=>{}
                    ,
                    onScrubComplete: ()=>{}
                    ,
                    onSnapComplete: ()=>{}
                    ,
                    onToggle: ()=>{}
                    ,
                    ...t.scrollOptions
                }
            },
            this.id = this.opts.id,
            this.el = "string" == typeof t.target ? document.querySelector(this.opts.target) : this.opts.target,
            this.state = {
                scrolling: null,
                progress: null,
                direction: null,
                isActive: null
            },
            this.events = new _s,
            this.timeline = new Ye({
                scrollTrigger: {
                    ...this.opts.scrollOptions,
                    id: this.id,
                    trigger: this.el,
                    onEnter: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("enter", this.state),
                        this.opts.scrollOptions.onEnter({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onEnterBack: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("enterBack", this.state),
                        this.opts.scrollOptions.onEnterBack({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onLeave: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("leave", this.state),
                        this.opts.scrollOptions.onLeave({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onLeaveBack: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("leaveBack", this.state),
                        this.opts.scrollOptions.onLeave({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onRefresh: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("refresh", this.state),
                        this.opts.scrollOptions.onRefresh({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onUpdate: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("update", this.state),
                        this.opts.scrollOptions.onUpdate({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onScrubComplete: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("scrubComplete", this.state),
                        this.opts.scrollOptions.onScrubComplete({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onSnapComplete: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("snapComplete", this.state),
                        this.opts.scrollOptions.onSnapComplete({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                    ,
                    onToggle: ({progress: t, direction: e, isActive: i})=>{
                        this.state.progress = t,
                        this.state.direction = e,
                        this.state.isActive = i,
                        this.events.emit("toggle", this.state),
                        this.opts.scrollOptions.onToggle({
                            progress: t,
                            direction: e,
                            isActive: i
                        })
                    }
                }
            }),
            gs.addEventListener("scrollStart", ()=>{
                this.state.scrolling = !0,
                this.events.emit("scrollStart", this.state)
            }
            ),
            gs.addEventListener("scrollEnd", ()=>{
                this.state.scrolling = !1,
                this.events.emit("scrollEnd", this.state)
            }
            ),
            this.opts.monitorOffsetChanges && this.pollForOffset()
        }
        pollForOffset() {
            function t(t) {
                const e = t.getBoundingClientRect()
                  , i = window.pageYOffset || document.documentElement.scrollTop;
                return e.top + i
            }
            let e = t(this.el);
            xs.ticker.add(vs(()=>{
                const i = t(this.el);
                i !== e && (e = i,
                gs.refresh())
            }
            , 1e3))
        }
        on(t, e) {
            this.events.on(t, e)
        }
        off(t, e) {
            this.events.off(t, e)
        }
    }
    function Ts() {
        return (Ts = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var r in i)
                    Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            return t
        }
        ).apply(this, arguments)
    }
    var ks = function() {
        function t(t, e) {
            var i = this
              , r = void 0 !== e ? e : {};
            this.version = "3.7.7",
            this.userAgent = window.navigator.userAgent || "no `userAgent` provided by the browser",
            this.props = {
                customStickyChangeNumber: r.customStickyChangeNumber || null,
                noStyles: r.noStyles || !1,
                stickyBitStickyOffset: r.stickyBitStickyOffset || 0,
                parentClass: r.parentClass || "js-stickybit-parent",
                scrollEl: "string" == typeof r.scrollEl ? document.querySelector(r.scrollEl) : r.scrollEl || window,
                stickyClass: r.stickyClass || "js-is-sticky",
                stuckClass: r.stuckClass || "js-is-stuck",
                stickyChangeClass: r.stickyChangeClass || "js-is-sticky--change",
                useStickyClasses: r.useStickyClasses || !1,
                useFixed: r.useFixed || !1,
                useGetBoundingClientRect: r.useGetBoundingClientRect || !1,
                verticalPosition: r.verticalPosition || "top",
                applyStyle: r.applyStyle || function(t, e) {
                    return i.applyStyle(t, e)
                }
            },
            this.props.positionVal = this.definePosition() || "fixed",
            this.instances = [];
            var n = this.props
              , s = n.positionVal
              , o = n.verticalPosition
              , a = n.noStyles
              , l = n.stickyBitStickyOffset
              , u = "top" !== o || a ? "" : l + "px"
              , c = "fixed" !== s ? s : "";
            this.els = "string" == typeof t ? document.querySelectorAll(t) : t,
            "length"in this.els || (this.els = [this.els]);
            for (var h = 0; h < this.els.length; h++) {
                var d, f = this.els[h], p = this.addInstance(f, this.props);
                this.props.applyStyle({
                    styles: (d = {},
                    d[o] = u,
                    d.position = c,
                    d),
                    classes: {}
                }, p),
                this.manageState(p),
                this.instances.push(p)
            }
        }
        var e = t.prototype;
        return e.definePosition = function() {
            var t;
            if (this.props.useFixed)
                t = "fixed";
            else {
                for (var e = ["", "-o-", "-webkit-", "-moz-", "-ms-"], i = document.head.style, r = 0; r < e.length; r += 1)
                    i.position = e[r] + "sticky";
                t = i.position ? i.position : "fixed",
                i.position = ""
            }
            return t
        }
        ,
        e.addInstance = function(t, e) {
            var i = this
              , r = {
                el: t,
                parent: t.parentNode,
                props: e
            };
            if ("fixed" === e.positionVal || e.useStickyClasses) {
                this.isWin = this.props.scrollEl === window;
                var n = this.isWin ? window : this.getClosestParent(r.el, r.props.scrollEl);
                this.computeScrollOffsets(r),
                this.toggleClasses(r.parent, "", e.parentClass),
                r.state = "default",
                r.stateChange = "default",
                r.stateContainer = function() {
                    return i.manageState(r)
                }
                ,
                n.addEventListener("scroll", r.stateContainer)
            }
            return r
        }
        ,
        e.getClosestParent = function(t, e) {
            var i = e
              , r = t;
            if (r.parentElement === i)
                return i;
            for (; r.parentElement !== i; )
                r = r.parentElement;
            return i
        }
        ,
        e.getTopPosition = function(t) {
            if (this.props.useGetBoundingClientRect)
                return t.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
            var e = 0;
            do {
                e = t.offsetTop + e
            } while (t = t.offsetParent);return e
        }
        ,
        e.computeScrollOffsets = function(t) {
            var e = t
              , i = e.props
              , r = e.el
              , n = e.parent
              , s = !this.isWin && "fixed" === i.positionVal
              , o = "bottom" !== i.verticalPosition
              , a = s ? this.getTopPosition(i.scrollEl) : 0
              , l = s ? this.getTopPosition(n) - a : this.getTopPosition(n)
              , u = null !== i.customStickyChangeNumber ? i.customStickyChangeNumber : r.offsetHeight
              , c = l + n.offsetHeight;
            e.offset = s ? 0 : a + i.stickyBitStickyOffset,
            e.stickyStart = o ? l - e.offset : 0,
            e.stickyChange = e.stickyStart + u,
            e.stickyStop = o ? c - (r.offsetHeight + e.offset) : c - window.innerHeight
        }
        ,
        e.toggleClasses = function(t, e, i) {
            var r = t
              , n = r.className.split(" ");
            i && -1 === n.indexOf(i) && n.push(i);
            var s = n.indexOf(e);
            -1 !== s && n.splice(s, 1),
            r.className = n.join(" ")
        }
        ,
        e.manageState = function(t) {
            var e = this
              , i = t
              , r = i.props
              , n = i.state
              , s = i.stateChange
              , o = i.stickyStart
              , a = i.stickyChange
              , l = i.stickyStop
              , u = r.positionVal
              , c = r.scrollEl
              , h = r.stickyClass
              , d = r.stickyChangeClass
              , f = r.stuckClass
              , p = r.verticalPosition
              , g = "bottom" !== p
              , m = r.applyStyle
              , v = r.noStyles
              , _ = function(t) {
                t()
            }
              , y = this.isWin && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) || _
              , b = this.isWin ? window.scrollY || window.pageYOffset : c.scrollTop
              , x = g && b <= o && ("sticky" === n || "stuck" === n)
              , w = b >= l && "sticky" === n;
            b > o && b < l && ("default" === n || "stuck" === n) ? i.state = "sticky" : x ? i.state = "default" : w && (i.state = "stuck");
            var T = b >= a && b <= l;
            b < a / 2 || b > l ? i.stateChange = "default" : T && (i.stateChange = "sticky"),
            n === i.state && s === i.stateChange || y((function() {
                var n, s, o, a, l, c, g = {
                    sticky: {
                        styles: (n = {
                            position: u,
                            top: "",
                            bottom: ""
                        },
                        n[p] = r.stickyBitStickyOffset + "px",
                        n),
                        classes: (s = {},
                        s[h] = !0,
                        s)
                    },
                    default: {
                        styles: (o = {},
                        o[p] = "",
                        o),
                        classes: {}
                    },
                    stuck: {
                        styles: Ts((a = {},
                        a[p] = "",
                        a), "fixed" === u && !v || !e.isWin ? {
                            position: "absolute",
                            top: "",
                            bottom: "0"
                        } : {}),
                        classes: (l = {},
                        l[f] = !0,
                        l)
                    }
                };
                "fixed" === u && (g.default.styles.position = "");
                var _ = g[i.state];
                _.classes = ((c = {})[f] = !!_.classes[f],
                c[h] = !!_.classes[h],
                c[d] = T,
                c),
                m(_, t)
            }
            ))
        }
        ,
        e.applyStyle = function(t, e) {
            var i = t.styles
              , r = t.classes
              , n = e
              , s = n.el
              , o = n.props
              , a = s.style
              , l = o.noStyles
              , u = s.className.split(" ");
            for (var c in r) {
                if (r[c])
                    -1 === u.indexOf(c) && u.push(c);
                else {
                    var h = u.indexOf(c);
                    -1 !== h && u.splice(h, 1)
                }
            }
            if (s.className = u.join(" "),
            i.position && (a.position = i.position),
            !l)
                for (var d in i)
                    a[d] = i[d]
        }
        ,
        e.update = function(t) {
            var e = this;
            return void 0 === t && (t = null),
            this.instances.forEach((function(i) {
                if (e.computeScrollOffsets(i),
                t)
                    for (var r in t)
                        i.props[r] = t[r]
            }
            )),
            this
        }
        ,
        e.removeInstance = function(t) {
            var e, i, r = t.el, n = t.props;
            this.applyStyle({
                styles: (e = {
                    position: ""
                },
                e[n.verticalPosition] = "",
                e),
                classes: (i = {},
                i[n.stickyClass] = "",
                i[n.stuckClass] = "",
                i)
            }, t),
            this.toggleClasses(r.parentNode, n.parentClass)
        }
        ,
        e.cleanup = function() {
            for (var t = 0; t < this.instances.length; t += 1) {
                var e = this.instances[t];
                e.stateContainer && e.props.scrollEl.removeEventListener("scroll", e.stateContainer),
                this.removeInstance(e)
            }
            this.manageState = !1,
            this.instances = []
        }
        ,
        t
    }();
    xs.registerPlugin(gs);
    class Cs {
        constructor(t) {
            return this.opts = {
                monitorOffsetChanges: !0,
                target: void 0,
                markers: !1,
                pin: !0,
                pinTarget: ".ngm-scroll-bg",
                scrollTrackElTarget: ".ngm-scroll-fg-slide",
                ...t
            },
            this.state = {
                index: 0,
                progress: 0
            },
            this.events = new _s,
            this.timelineLabelPrefix = "section_",
            this.scrollTracks = [],
            this.el = "string" == typeof t.target ? document.querySelector(this.opts.target) : this.opts.target,
            this.sectionEls = this.el.querySelectorAll(this.opts.scrollTrackElTarget),
            this.size = this.sectionEls.length,
            this.opts.pin && this.initStickySection(),
            this.initScrollTracking(),
            this
        }
        initStickySection() {
            const t = (e = this.el.querySelector(this.opts.pinTarget),
            new ks(e,{
                useGetBoundingClientRect: !0
            }));
            var e;
            window.addEventListener("resize", ()=>{
                t.update()
            }
            )
        }
        initScrollTracking() {
            this.timeline = new Ye({
                scrollTrigger: {
                    trigger: this.el,
                    start: "top top",
                    end: "bottom top",
                    scrub: !0,
                    markers: !1,
                    toggleActions: "play none none reverse"
                }
            }),
            this.timeline.to(this.state, {
                progress: this.timeline.duration(),
                onUpdate: ()=>{
                    this.events.emit("update", this.state)
                }
            }, 0),
            this.sectionEls.forEach((t,e)=>{
                const i = new ws({
                    monitorOffsetChanges: this.opts.monitorOffsetChanges,
                    id: t.id,
                    target: t,
                    scrollOptions: {
                        markers: this.opts.markers,
                        scrub: !0,
                        start: "top bottom",
                        end: "bottom top",
                        toggleActions: "play none none reverse",
                        onEnter: ()=>{
                            this.setIndex(this.timelineLabelToIndex(i.timeline.currentLabel()))
                        }
                        ,
                        onEnterBack: ()=>{
                            this.setIndex(this.timelineLabelToIndex(i.timeline.currentLabel()))
                        }
                    }
                });
                i.timeline.addLabel(this.timelineLabelFromIndex(e)),
                this.timeline.add(i.timeline),
                this.scrollTracks.push(i)
            }
            )
        }
        timelineLabelFromIndex(t) {
            return `${this.timelineLabelPrefix}${t}`
        }
        timelineLabelToIndex(t) {
            return parseFloat(t.replace(this.timelineLabelPrefix, ""))
        }
        get(t) {
            const e = this.scrollTracks.find(e=>e.id == t);
            if (e)
                return e;
            throw new Error(`ScollSlides.get error: "${t}" is an invalid. It must match an id of an element being tracked e.g.: <div id="ng-track-me" class="ngm-scroll-fg-slide">`)
        }
        setIndex(t) {
            this.state.index = t,
            this.events.emit("change", this.state)
        }
        on(t, e) {
            this.events.on(t, e)
        }
        off(t, e) {
            this.events.off(t, e)
        }
    }
    !function(t, e, i) {
        t(i = {
            path: e,
            exports: {},
            require: function(t, e) {
                return function() {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == e && i.path)
            }
        }, i.exports),
        i.exports
    }((function(t) {
        !function(e, i) {
            var r = function(t, e, i) {
                var r, n;
                if (function() {
                    var e, i = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
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
                    for (e in n = t.lazySizesConfig || t.lazysizesConfig || {},
                    i)
                        e in n || (n[e] = i[e])
                }(),
                !e || !e.getElementsByClassName)
                    return {
                        init: function() {},
                        cfg: n,
                        noSupport: !0
                    };
                var s = e.documentElement
                  , o = t.HTMLPictureElement
                  , a = t.addEventListener.bind(t)
                  , l = t.setTimeout
                  , u = t.requestAnimationFrame || l
                  , c = t.requestIdleCallback
                  , h = /^picture$/i
                  , d = ["load", "error", "lazyincluded", "_lazyloaded"]
                  , f = {}
                  , p = Array.prototype.forEach
                  , g = function(t, e) {
                    return f[e] || (f[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")),
                    f[e].test(t.getAttribute("class") || "") && f[e]
                }
                  , m = function(t, e) {
                    g(t, e) || t.setAttribute("class", (t.getAttribute("class") || "").trim() + " " + e)
                }
                  , v = function(t, e) {
                    var i;
                    (i = g(t, e)) && t.setAttribute("class", (t.getAttribute("class") || "").replace(i, " "))
                }
                  , _ = function(t, e, i) {
                    var r = i ? "addEventListener" : "removeEventListener";
                    i && _(t, e),
                    d.forEach((function(i) {
                        t[r](i, e)
                    }
                    ))
                }
                  , y = function(t, i, n, s, o) {
                    var a = e.createEvent("Event");
                    return n || (n = {}),
                    n.instance = r,
                    a.initEvent(i, !s, !o),
                    a.detail = n,
                    t.dispatchEvent(a),
                    a
                }
                  , b = function(e, i) {
                    var r;
                    !o && (r = t.picturefill || n.pf) ? (i && i.src && !e.getAttribute("srcset") && e.setAttribute("srcset", i.src),
                    r({
                        reevaluate: !0,
                        elements: [e]
                    })) : i && i.src && (e.src = i.src)
                }
                  , x = function(t, e) {
                    return (getComputedStyle(t, null) || {})[e]
                }
                  , w = function(t, e, i) {
                    for (i = i || t.offsetWidth; i < n.minSize && e && !t._lazysizesWidth; )
                        i = e.offsetWidth,
                        e = e.parentNode;
                    return i
                }
                  , T = (ft = [],
                pt = [],
                gt = ft,
                mt = function() {
                    var t = gt;
                    for (gt = ft.length ? pt : ft,
                    ht = !0,
                    dt = !1; t.length; )
                        t.shift()();
                    ht = !1
                }
                ,
                vt = function(t, i) {
                    ht && !i ? t.apply(this, arguments) : (gt.push(t),
                    dt || (dt = !0,
                    (e.hidden ? l : u)(mt)))
                }
                ,
                vt._lsFlush = mt,
                vt)
                  , k = function(t, e) {
                    return e ? function() {
                        T(t)
                    }
                    : function() {
                        var e = this
                          , i = arguments;
                        T((function() {
                            t.apply(e, i)
                        }
                        ))
                    }
                }
                  , C = function(t) {
                    var e, r, n = function() {
                        e = null,
                        t()
                    }, s = function() {
                        var t = i.now() - r;
                        t < 99 ? l(s, 99 - t) : (c || n)(n)
                    };
                    return function() {
                        r = i.now(),
                        e || (e = l(s, 99))
                    }
                }
                  , S = ($ = /^img$/i,
                j = /^iframe$/i,
                U = "onscroll"in t && !/(gle|ing)bot/.test(navigator.userAgent),
                H = 0,
                G = 0,
                Z = -1,
                Q = function(t) {
                    G--,
                    (!t || G < 0 || !t.target) && (G = 0)
                }
                ,
                J = function(t) {
                    return null == X && (X = "hidden" == x(e.body, "visibility")),
                    X || !("hidden" == x(t.parentNode, "visibility") && "hidden" == x(t, "visibility"))
                }
                ,
                K = function(t, i) {
                    var r, n = t, o = J(t);
                    for (V -= i,
                    Y += i,
                    q -= i,
                    W += i; o && (n = n.offsetParent) && n != e.body && n != s; )
                        (o = (x(n, "opacity") || 1) > 0) && "visible" != x(n, "overflow") && (r = n.getBoundingClientRect(),
                        o = W > r.left && q < r.right && Y > r.top - 1 && V < r.bottom + 1);
                    return o
                }
                ,
                tt = function() {
                    var t, i, o, a, l, u, c, h, d, f, p, g, m = r.elements;
                    if ((D = n.loadMode) && G < 8 && (t = m.length)) {
                        for (i = 0,
                        Z++; i < t; i++)
                            if (m[i] && !m[i]._lazyRace)
                                if (!U || r.prematureUnveil && r.prematureUnveil(m[i]))
                                    at(m[i]);
                                else if ((h = m[i].getAttribute("data-expand")) && (u = 1 * h) || (u = H),
                                f || (f = !n.expand || n.expand < 1 ? s.clientHeight > 500 && s.clientWidth > 500 ? 500 : 370 : n.expand,
                                r._defEx = f,
                                p = f * n.expFactor,
                                g = n.hFac,
                                X = null,
                                H < p && G < 1 && Z > 2 && D > 2 && !e.hidden ? (H = p,
                                Z = 0) : H = D > 1 && Z > 1 && G < 6 ? f : 0),
                                d !== u && (I = innerWidth + u * g,
                                N = innerHeight + u,
                                c = -1 * u,
                                d = u),
                                o = m[i].getBoundingClientRect(),
                                (Y = o.bottom) >= c && (V = o.top) <= N && (W = o.right) >= c * g && (q = o.left) <= I && (Y || W || q || V) && (n.loadHidden || J(m[i])) && (F && G < 3 && !h && (D < 3 || Z < 4) || K(m[i], u))) {
                                    if (at(m[i]),
                                    l = !0,
                                    G > 9)
                                        break
                                } else
                                    !l && F && !a && G < 4 && Z < 4 && D > 2 && (P[0] || n.preloadAfterLoad) && (P[0] || !h && (Y || W || q || V || "auto" != m[i].getAttribute(n.sizesAttr))) && (a = P[0] || m[i]);
                        a && !l && at(a)
                    }
                }
                ,
                et = function(t) {
                    var e, r = 0, s = n.throttleDelay, o = n.ricTimeout, a = function() {
                        e = !1,
                        r = i.now(),
                        t()
                    }, u = c && o > 49 ? function() {
                        c(a, {
                            timeout: o
                        }),
                        o !== n.ricTimeout && (o = n.ricTimeout)
                    }
                    : k((function() {
                        l(a)
                    }
                    ), !0);
                    return function(t) {
                        var n;
                        (t = !0 === t) && (o = 33),
                        e || (e = !0,
                        (n = s - (i.now() - r)) < 0 && (n = 0),
                        t || n < 9 ? u() : l(u, n))
                    }
                }(tt),
                it = function(t) {
                    var e = t.target;
                    e._lazyCache ? delete e._lazyCache : (Q(t),
                    m(e, n.loadedClass),
                    v(e, n.loadingClass),
                    _(e, nt),
                    y(e, "lazyloaded"))
                }
                ,
                rt = k(it),
                nt = function(t) {
                    rt({
                        target: t.target
                    })
                }
                ,
                st = function(t) {
                    var e, i = t.getAttribute(n.srcsetAttr);
                    (e = n.customMedia[t.getAttribute("data-media") || t.getAttribute("media")]) && t.setAttribute("media", e),
                    i && t.setAttribute("srcset", i)
                }
                ,
                ot = k((function(t, e, i, r, s) {
                    var o, a, u, c, d, f;
                    (d = y(t, "lazybeforeunveil", e)).defaultPrevented || (r && (i ? m(t, n.autosizesClass) : t.setAttribute("sizes", r)),
                    a = t.getAttribute(n.srcsetAttr),
                    o = t.getAttribute(n.srcAttr),
                    s && (c = (u = t.parentNode) && h.test(u.nodeName || "")),
                    f = e.firesLoad || "src"in t && (a || o || c),
                    d = {
                        target: t
                    },
                    m(t, n.loadingClass),
                    f && (clearTimeout(R),
                    R = l(Q, 2500),
                    _(t, nt, !0)),
                    c && p.call(u.getElementsByTagName("source"), st),
                    a ? t.setAttribute("srcset", a) : o && !c && (j.test(t.nodeName) ? function(t, e) {
                        try {
                            t.contentWindow.location.replace(e)
                        } catch (i) {
                            t.src = e
                        }
                    }(t, o) : t.src = o),
                    s && (a || c) && b(t, {
                        src: o
                    })),
                    t._lazyRace && delete t._lazyRace,
                    v(t, n.lazyClass),
                    T((function() {
                        var e = t.complete && t.naturalWidth > 1;
                        f && !e || (e && m(t, "ls-is-cached"),
                        it(d),
                        t._lazyCache = !0,
                        l((function() {
                            "_lazyCache"in t && delete t._lazyCache
                        }
                        ), 9)),
                        "lazy" == t.loading && G--
                    }
                    ), !0)
                }
                )),
                at = function(t) {
                    if (!t._lazyRace) {
                        var e, i = $.test(t.nodeName), r = i && (t.getAttribute(n.sizesAttr) || t.getAttribute("sizes")), s = "auto" == r;
                        (!s && F || !i || !t.getAttribute("src") && !t.srcset || t.complete || g(t, n.errorClass) || !g(t, n.lazyClass)) && (e = y(t, "lazyunveilread").detail,
                        s && A.updateElem(t, !0, t.offsetWidth),
                        t._lazyRace = !0,
                        G++,
                        ot(t, e, s, r, i))
                    }
                }
                ,
                lt = C((function() {
                    n.loadMode = 3,
                    et()
                }
                )),
                ut = function() {
                    3 == n.loadMode && (n.loadMode = 2),
                    lt()
                }
                ,
                ct = function() {
                    F || (i.now() - B < 999 ? l(ct, 999) : (F = !0,
                    n.loadMode = 3,
                    et(),
                    a("scroll", ut, !0)))
                }
                ,
                {
                    _: function() {
                        B = i.now(),
                        r.elements = e.getElementsByClassName(n.lazyClass),
                        P = e.getElementsByClassName(n.lazyClass + " " + n.preloadClass),
                        a("scroll", et, !0),
                        a("resize", et, !0),
                        a("pageshow", (function(t) {
                            if (t.persisted) {
                                var i = e.querySelectorAll("." + n.loadingClass);
                                i.length && i.forEach && u((function() {
                                    i.forEach((function(t) {
                                        t.complete && at(t)
                                    }
                                    ))
                                }
                                ))
                            }
                        }
                        )),
                        t.MutationObserver ? new MutationObserver(et).observe(s, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (s.addEventListener("DOMNodeInserted", et, !0),
                        s.addEventListener("DOMAttrModified", et, !0),
                        setInterval(et, 999)),
                        a("hashchange", et, !0),
                        ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(t) {
                            e.addEventListener(t, et, !0)
                        }
                        )),
                        /d$|^c/.test(e.readyState) ? ct() : (a("load", ct),
                        e.addEventListener("DOMContentLoaded", et),
                        l(ct, 2e4)),
                        r.elements.length ? (tt(),
                        T._lsFlush()) : et()
                    },
                    checkElems: et,
                    unveil: at,
                    _aLSL: ut
                })
                  , A = (M = k((function(t, e, i, r) {
                    var n, s, o;
                    if (t._lazysizesWidth = r,
                    r += "px",
                    t.setAttribute("sizes", r),
                    h.test(e.nodeName || ""))
                        for (s = 0,
                        o = (n = e.getElementsByTagName("source")).length; s < o; s++)
                            n[s].setAttribute("sizes", r);
                    i.detail.dataAttr || b(t, i.detail)
                }
                )),
                L = function(t, e, i) {
                    var r, n = t.parentNode;
                    n && (i = w(t, n, i),
                    (r = y(t, "lazybeforesizes", {
                        width: i,
                        dataAttr: !!e
                    })).defaultPrevented || (i = r.detail.width) && i !== t._lazysizesWidth && M(t, n, r, i))
                }
                ,
                z = C((function() {
                    var t, e = O.length;
                    if (e)
                        for (t = 0; t < e; t++)
                            L(O[t])
                }
                )),
                {
                    _: function() {
                        O = e.getElementsByClassName(n.autosizesClass),
                        a("resize", z)
                    },
                    checkElems: z,
                    updateElem: L
                })
                  , E = function() {
                    !E.i && e.getElementsByClassName && (E.i = !0,
                    A._(),
                    S._())
                };
                var O, M, L, z;
                var P, F, R, D, B, I, N, V, q, W, Y, X, $, j, U, H, G, Z, Q, J, K, tt, et, it, rt, nt, st, ot, at, lt, ut, ct;
                var ht, dt, ft, pt, gt, mt, vt;
                return l((function() {
                    n.init && E()
                }
                )),
                r = {
                    cfg: n,
                    autoSizer: A,
                    loader: S,
                    init: E,
                    uP: b,
                    aC: m,
                    rC: v,
                    hC: g,
                    fire: y,
                    gW: w,
                    rAF: T
                }
            }(e, e.document, Date);
            e.lazySizes = r,
            t.exports && (t.exports = r)
        }("undefined" != typeof window ? window : {})
    }
    ));
    function Ss() {
        const t = window.matchMedia("(min-width: 600px)").matches
          , e = document.querySelectorAll(".ngm-scroll-gallery-dispatches");
        e.forEach((function(e) {
            const i = new ys({
                target: e.querySelector(".ngm-scroll-bg")
            })
              , r = (new b({
                targets: e.querySelectorAll(".ngm-scroll-bg .ai2html, .ngm-scroll-bg .ngm-fit-me, .ngm-scroll-bg .ngm-fit-test, .ngm-scroll-bg video"),
                picker: !1,
                contain: !t
            }),
            new Cs({
                target: e,
                markers: !1
            }))
              , n = new bs({
                target: e.querySelector(".ngm-scroll-progress"),
                size: i.size,
                orientation: "vertical"
            });
            r.on("change", t=>{
                i.set(t.index),
                n.set(t.index)
            }
            )
        }
        ));
        let i = document.querySelectorAll("nav ul li a");
        document.querySelectorAll("body");
        e.forEach(t=>{
            const e = new ws({
                target: t,
                scrollOptions: {
                    markers: !1,
                    start: "top top",
                    end: "bottom bottom"
                }
            })
              , r = ()=>{
                i.forEach(t=>{
                    t.classList.remove("current")
                }
                );
                Array.from(i).find(e=>e.hash.replace("#", "") == t.id).classList.add("current")
            }
            ;
            e.on("enter", ()=>{
                r()
            }
            ),
            e.on("enterBack", ()=>{
                r()
            }
            )
        }
        ),
        document.querySelector("#navigation_hack_for_page").closest(".Interactive.section").classList.add("covid-sticky__container_top")
    }
    return document.addEventListener("DOMContentLoaded", ()=>Ss()),
    t.render = Ss,
    t
}({});
