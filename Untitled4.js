var $scru = (function() {
    var f = {};
    var a = {},
        i = {},
        b = {},
        e = {},
        d = {};
    var c = 0;

    function g(n) {
        var m = true;
        for (var k = 0, j = i[n].length; k < j; k += 1) {
            var l = i[n][k];
            if (!d[l]) {
                m = false;
                b[l] = b[l] || {};
                b[l][n] = true;
                f.invoke(l)
            }
        }
        return m
    }
    f.queue = function(l, k, j) {
        a[l] = k;
        i[l] = j || []
    };
    f.invoke = function(j) {
        if (!e[j] && !d[j] && g(j)) {
            e[j] = true;
            a[j](j)
        }
    };
    f.execute = function(k, j) {
        var l = "_fn_" + (c++) + "_";
        f.queue(l, k, j);
        f.invoke(l)
    };
    f.ready = function(k) {
        if (!d[k]) {
            d[k] = true;
            for (var j in b[k]) {
                f.invoke(j)
            }
        }
    };
    f.fn = {};
    return f
})();
$scru.fn.async_load = function(a) {
    return function(d) {
        var b = document.createElement("script"),
            c = false;
        b.onload = b.onreadystatechange = function() {
            if ((this.readyState && this.readyState != "loaded" && this.readyState != "complete") || c) {
                return
            }
            this.onload = this.onreadystatechange = null;
            c = true;
            $scru.ready(d)
        };
        b.src = a;
        b.type = "text/javascript";
        b.async = true;
        document.getElementsByTagName("head")[0].appendChild(b)
    }
};
$scru.fn.google_load = function(b, a, d) {
    d = d || [];
    var c = d.callback || function() {};
    return function(e) {
        d.callback = function() {
            $scru.ready(e);
            c()
        };
        google.load(b, a, d)
    }
};
$scru.queue("effects", $scru.fn.async_load("http://ajax.googleapis.com/ajax/libs/scriptaculous/1.9.0/effects.js"));
$scru.queue("dragdrop", $scru.fn.async_load("http://ajax.googleapis.com/ajax/libs/scriptaculous/1.9.0/dragdrop.js"), ["effects"]);
$scru.queue("google:jsapi", $scru.fn.async_load("http://www.google.com/jsapi"));
$scru.queue("google:visualization", $scru.fn.google_load("visualization", "1", {
    packages: ["corechart"]
}), ["google:jsapi"]);
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
};
var Overlay = function() {
    var b, a;
    b = function(c) {
        c.element().remove();
        c.stop()
    }.bindAsEventListener();
    a = function(f, c, e) {
        var d = new Element("div", {
            "class": "overlay"
        }).setStyle({
            width: f + "px",
            height: c + "px",
            opacity: "0.2",
            background: "black",
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "pointer",
            "z-index": 10
        }).observe("click", b);
        if (Object.isFunction(e)) {
            d.observe("click", e)
        }
        return d
    };
    return {
        drawOverDocument: function(f) {
            var e = $$("html")[0],
                c = $$("body")[0],
                d;
            d = a(e.getWidth(), e.getHeight(), f);
            c.insert({
                top: d
            });
            return d
        },
        drawOver: function(c, e) {
            var d;
            c = $(c);
            d = a(c.getWidth(), c.getHeight(), e);
            c.insert({
                bottom: d
            });
            return d
        }
    }
}();
Form.Element.Hinter = Class.create({
    options: {
        caption: "Search",
        emptyClass: "empty"
    },
    initialize: function(b, a) {
        this.element = $(b);
        this.options = $H(this.options).merge(a || {});
        this.element.value = "";
        this.element.observe("focus", this.handleFocus.bind(this));
        this.element.observe("blur", this.handleBlur.bind(this));
        this.handleBlur()
    },
    handleFocus: function(a) {
        if (this.element.hasClassName(this.options.get("emptyClass"))) {
            this.element.removeClassName(this.options.get("emptyClass"));
            this.element.value = ""
        }
    },
    handleBlur: function(a) {
        if ($F(this.element).strip() === "") {
            this.element.addClassName(this.options.get("emptyClass"));
            this.element.value = this.options.get("caption")
        }
    }
});
Ajax.Request.prototype.abort = function() {
    this.transport.onreadystatechange = Prototype.emptyFunction;
    this.transport.abort();
    Ajax.activeRequestCount--
};
Function.prototype.memoize = function() {
    var a = this;
    return function() {
        var b = a();
        a = function() {
            return b
        };
        return a()
    }
};
Event.delegate = function(a) {
    return function(d) {
        var c = $(d.element());
        for (var b in a) {
            if (c.match(b)) {
                return a[b].apply(this, $A(arguments))
            }
        }
    }
};
Element.addMethods("SELECT", {
    setValue: function(a, b) {
        var c = false;
        a = $(a);
        a.select("option").each(function(e, d) {
            if (e.value == b) {
                a.selectedIndex = d;
                c = true;
                throw $break
            }
        });
        return c
    }
});
var CallbackManager = function() {
    var c, b, d = {},
        a;
    c = function(g, f) {
        var e = a[f.name];
        if (!Object.isFunction(e)) {
            throw "Not a function: " + f.name
        }
        e(g, f.parameters)
    };
    b = function(g, f) {
        var e = g.responseJSON;
        e.commands.each(c.bind(null, f))
    };
    a = {
        updateCallbackParams: function(f, e) {
            f.updateCallbackParams(e.params)
        },
        setBlockAttributes: function(f, e) {
            $H(e.attributes).each(function(g) {
                f.setAttribute(g.key, g.value)
            })
        },
        updateContainer: function(g, f) {
            var e;
            if (f.container == null) {
                e = g.el
            }
            else {
                e = g.container.select(f.container);
                if (e.size() === 0) {
                    throw "Container with selector '" + f.container + "' not found."
                }
                e = e[0]
            }
            e.update(f.content);
            TimestampFormatter.format(e)
        },
        insert: function(j, g) {
            var f, e = g.position || "bottom",
                i = {};
            if (g.container == null) {
                f = j.el
            }
            else {
                f = j.container.select(g.container);
                if (f.size() === 0) {
                    throw "Container with selector '" + g.container + "' not found."
                }
                f = f[0]
            }
            i[e] = g.content;
            f.insert(i);
            TimestampFormatter.format(["before", "after"].include(e) ? f.parentNode : f)
        },
        callGetOdds: function(k, i) {
            k.hideOddsTr(i.match_id);
            try {
                var f = "";
                for (var g in k.params.get("bookmaker_urls")) {
                    f += f != "" ? "," : "";
                    f += String(g)
                }
                CallbackManager.callbackBlock(null, "odds1x2", {
                    match_id: i.match_id,
                    bookmaker_ids: f
                }, {
                    onSuccess: function(l, e) {
                        k.populateOdds(l.responseJSON, i.match_id);
                        k.showOdds(i.match_id);
                        k.hideOddsLoading(i.match_id)
                    },
                    onException: function() {
                        k.showOdds(i.match_id);
                        k.hideOddsLoading(i.match_id)
                    }
                })
            }
            catch (j) {}
        }
    };
    return {
        register: function(e) {
            d[e.id] = e
        },
        callback: function(k, i, g, e) {
            var j = d[k],
                f;
            if (j === "undefined") {
                throw "Unknown block specified."
            }
            e = $H(e);
            e.get("onStart")();
            f = new Ajax.Request(e.get("ajaxUrl") + "/" + j.name, {
                method: "get",
                parameters: {
                    block_id: j.id,
                    callback_params: Object.toJSON(j.params),
                    action: i,
                    params: Object.toJSON(g || {})
                },
                onSuccess: function(l) {
                    e.get("onRequestSuccess")();
                    b(l, j);
                    e.get("onSuccess")()
                },
                onComplete: e.get("onComplete"),
                onException: e.get("onException")
            })
        },
        registerHandler: function(e, f) {
            a[e] = f
        },
        callbackBlock: function(e, k, j, g) {
            var i = $H({
                onRequestSuccess: Prototype.emptyFunction,
                onStart: Prototype.emptyFunction,
                onSuccess: Prototype.emptyFunction,
                onComplete: Prototype.emptyFunction,
                onException: Prototype.emptyFunction,
                ajaxUrl: Config.get("ajax_block_path")
            });
            i.update(g);
            i.get("onStart")();
            var f = {
                method: "get",
                parameters: j || {},
                onSuccess: function(l) {
                    i.get("onSuccess")(l)
                },
                evalScripts: true,
                onComplete: i.get("onComplete"),
                onException: i.get("onException")
            };
            if (e) {
                request = new Ajax.Updater(e, i.get("ajaxUrl") + "/" + k, f)
            }
            else {
                request = new Ajax.Request(i.get("ajaxUrl") + "/" + k, f)
            }
        },
        callbackJsonP: function(e, g) {
            var f = $H({
                onSuccess: Prototype.emptyFunction,
                onTimeout: Prototype.emptyFunction,
                timeout: 3000,
                callbackName: "dummyCallback" + (Math.random() * 1000).toFixed(0) + "_" + (Math.random() * 1000).toFixed(0)
            });
            f.update(g);
            $jsonp.send(e + "&callback=" + f.get("callbackName"), {
                onTimeout: f.get("onTimeout")(),
                callbackName: f.get("callbackName"),
                onSuccess: function(j, i) {
                    f.get("onSuccess")(j, i)
                },
                timeout: f.get("timeout")
            })
        }
    }
}();
var BlockManager = (function() {
    var a = {};
    return {
        register: function(b) {
            a[b.id] = b
        },
        get: function(b) {
            return a[b]
        }
    }
})();
var Block = Class.create({
    initialize: function(c, a, b) {
        this.id = c;
        this.name = a;
        this.params = $H(b);
        this.callbackOptions = $H({
            onRequestSuccess: Prototype.emptyFunction,
            onStart: Prototype.emptyFunction,
            onSuccess: this.reinitialize.bind(this),
            onComplete: Prototype.emptyFunction,
            onException: Prototype.emptyFunction,
            showLoading: true,
            ajaxUrl: Config.get("ajax_path")
        });
        this.registered = false;
        this.attributes = new Hash();
        this.el = $(c);
        if (this.el === null) {
            throw "Block element for " + this.id + " not found."
        }
        this.container = this.el.hasClassName("block") ? this.el : this.el.up(".block");
        if (this.container === null) {
            throw "Container for block element " + this.id + " not found."
        }
        this.registeredSubnav = this.initSubnav();
        this.reinitialize();
        BlockManager.register(this);
        this.postInitialize()
    },
    postInitialize: Prototype.emptyFunction,
    reinitialize: Prototype.emptyFunction,
    registerForCallbacks: function() {
        CallbackManager.register(this);
        this.registered = true
    },
    callback: function(d, f, c) {
        var a, e, b;
        if (!this.registered) {
            throw "Block " + this.id + " is not registered to receive callbacks."
        }
        c = this.callbackOptions.merge(c || {});
        if (c.get("showLoading")) {
            a = c.get("onStart");
            c.set("onStart", function() {
                b = Overlay.drawOver(this.container.select(".content")[0]);
                a()
            }.bind(this));
            e = c.get("onComplete");
            c.set("onComplete", function() {
                e();
                b.remove();
                if (window.SortableTable != undefined && typeof(window.SortableTable === "object")) {
                    SortableTable.load()
                }
            })
        }
        CallbackManager.callback(this.id, d, f, c)
    },
    addCallbackObserver: function(b, d, e, a, c) {
        if (!this.registered) {
            throw "Block " + this.id + " is not registered to receive callbacks."
        }
        if (c == null) {
            c = "click"
        }
        $(b).observe(c, function() {
            this.callback(d, e, a)
        }.bind(this))
    },
    setAttribute: function(a, b) {
        this.attributes.set(a, b)
    },
    getAttribute: function(a) {
        return this.attributes.get(a)
    },
    updateCallbackParams: function(a) {
        this.params = $H(a)
    },
    setCallbackParam: function(a, b) {
        this.params.set(a, b)
    },
    getCallbackParam: function(a) {
        return this.params.get(a)
    },
    updateContent: function() {
        this.callback("updateContent", {})
    },
    initSubnav: function() {
        var a = this.container.select("div.subnav > ul");
        var b = new Hash();
        if (a.size() === 0) {
            return false
        }
        a.each(function(g) {
            var c, e, j;
            c = g.select("a");
            if (c.size() === 0) {
                return false
            }
            e = c[0];
            j = function(i) {
                return function(k) {
                    i.up("li").removeClassName("selected");
                    i = k.element();
                    i.up("li").addClassName("selected")
                }.bindAsEventListener()
            }(e);
            c.invoke("observe", "click", j);
            for (var d = 0; d < c.length; d++) {
                e = c[d];
                var f = e.readAttribute("register");
                if (f) {
                    b.set(f, e)
                }
            }
        });
        return b
    }
});
var FormBlock = Class.create(Block, {
    postInitialize: function($super) {
        $super();
        this.initRecordControls()
    },
    initRecordControls: function() {
        this.el.select("dd.record").each(function(f) {
            var c = f.select(".record-search-button")[0],
                b = f.select(".record-search-reset")[0],
                e = f.select(".record-search-field")[0],
                i = f.select(".results-loading")[0],
                a = f.select(".search-options")[0],
                g = e.readAttribute("data-fieldname");
            b.store("resetContent", a.innerHTML);
            c.enable();
            b.enable();
            e.enable();
            var d = function(j) {
                i.show();
                c.disable();
                e.disable();
                b.disable();
                this.callback("recordSearch", {
                    q: $F(e),
                    field_name: g
                }, {
                    showLoading: false,
                    onComplete: function() {
                        i.hide();
                        c.enable();
                        e.enable();
                        b.enable()
                    }
                })
            }.bind(this);
            c.observe("click", d);
            e.observe("keydown", function(j) {
                if (j.keyCode == Event.KEY_RETURN) {
                    j.stop();
                    d()
                }
            });
            b.observe("click", function(j) {
                a.update(b.retrieve("resetContent"));
                e.value = ""
            })
        }.bind(this))
    }
});
var PaginatedBlock = Class.create(Block, {
    reinitialize: function() {
        this.initPagination()
    },
    initPagination: function() {
        if ($(this.id + "_pagination")) {
            this.previousPage = this.previousPage.bind(this);
            this.nextPage = this.nextPage.bind(this);
            this.pagination = true;
            this.previousButton = $(this.id + "_previous");
            this.nextButton = $(this.id + "_next");
            this.setPaginationHandlers()
        }
        else {
            this.pagination = false
        }
    },
    reinitPagination: function() {
        if (this.pagination) {
            this.previousButton.stopObserving("click", this.previousPage).removeClassName("disabled");
            this.nextButton.stopObserving("click", this.nextPage).removeClassName("disabled");
            if (!this.getAttribute("has_previous_page")) {
                this.previousButton.addClassName("disabled")
            }
            if (!this.getAttribute("has_next_page")) {
                this.nextButton.addClassName("disabled")
            }
            this.setPaginationHandlers()
        }
    },
    setPaginationHandlers: function() {
        if (!this.previousButton.hasClassName("disabled")) {
            this.previousButton.observe("click", this.previousPage)
        }
        if (!this.nextButton.hasClassName("disabled")) {
            this.nextButton.observe("click", this.nextPage)
        }
    },
    previousPage: function() {
        var a = parseInt(this.getCallbackParam("page"));
        a = !isNaN(a) ? a - 1 : 0;
        this.changePage(a)
    },
    nextPage: function() {
        var a = parseInt(this.getCallbackParam("page"));
        a = !isNaN(a) ? a + 1 : 0;
        this.changePage(a)
    },
    changePage: function(a) {
        this.callback("changePage", {
            page: a
        }, {
            onSuccess: this.reinitPagination.bind(this)
        })
    }
});
var MatchesBlock = Class.create(Block, {
    rowTemplate: new Template('<tr class="#{odd_even} loading event"><td colspan="#{colspan_left}"><div></div></td><td class="loading-icon {event-icon}"><div><span>Loading</span></div></td><td colspan="#{colspan_right}"><div></div></td></tr>'),
    postInitialize: function($super) {
        $super();
        this.el.observe("click", Event.delegate({
            "a.events-button-button": this.eventClickHandler.bindAsEventListener(this)
        }));
        if (!L10nManager.disableBetting()) {
            this.el.observe("click", Event.delegate({
                "a.odds-button-button": this.oddsButtonClickHandler.bindAsEventListener(this)
            }));
            this.el.observe("click", Event.delegate({
                "a.bookmaker-button-button": this.bookmakerButtonClickHandler.bindAsEventListener(this)
            }));
            this.last_bookmaker_key = new Array
        }
        else {
            this.removeBettingButtons()
        }
    },
    reinitialize: function() {
        this.initTable();
        this.initPagination()
    },
    removeBettingButtons: function() {
        if (L10nManager.disableBetting()) {
            $$("a.odds-button-button").invoke("remove");
            $$("a.bookmaker-button-button").invoke("remove");
            this.params.set("bookmaker_urls", []);
            var a = $$(".oddsSubnavButton").first();
            if (a) {
                a.hide()
            }
        }
    },
    initTable: function() {
        this.reinitPagination();
        this.removeBettingButtons()
    },
    initPagination: function() {
        if ($(this.id + "_pagination")) {
            this.previousPage = this.previousPage.bind(this);
            this.nextPage = this.nextPage.bind(this);
            this.pagination = true;
            this.previousButton = $(this.id + "_previous");
            this.nextButton = $(this.id + "_next");
            this.pageDropdown = $(this.id + "_page_dropdown");
            if (this.pageDropdown) {
                this.pageDropdown.observe("change", function(a) {
                    var b = parseInt($F(a.element()), 10);
                    this.changePage(b)
                }.bindAsEventListener(this))
            }
            this.setPaginationHandlers()
        }
        else {
            this.pagination = false
        }
    },
    reinitPagination: function() {
        if (this.pagination) {
            this.previousButton.stopObserving("click", this.previousPage).removeClassName("disabled");
            this.nextButton.stopObserving("click", this.nextPage).removeClassName("disabled");
            if (!this.getAttribute("has_previous_page")) {
                this.previousButton.addClassName("disabled")
            }
            if (!this.getAttribute("has_next_page")) {
                this.nextButton.addClassName("disabled")
            }
            this.setPaginationHandlers()
        }
    },
    setPaginationHandlers: function() {
        if (!this.previousButton.hasClassName("disabled")) {
            this.previousButton.observe("click", this.previousPage)
        }
        if (!this.nextButton.hasClassName("disabled")) {
            this.nextButton.observe("click", this.nextPage)
        }
    },
    updatePageDropdownValue: function(a) {
        if (this.pageDropdown.options[this.pageDropdown.selectedIndex].value != a) {
            this.pageDropdown.selectedIndex = a
        }
    },
    previousPage: function() {
        var a = parseInt(this.getCallbackParam("page"));
        a = !isNaN(a) ? a - 1 : 0;
        this.changePage(a)
    },
    nextPage: function() {
        var a = parseInt(this.getCallbackParam("page"));
        a = !isNaN(a) ? a + 1 : 0;
        this.changePage(a)
    },
    changePage: function(c) {
        if (this.pageDropdown) {
            this.updatePageDropdownValue(c)
        }
        var b = this.getCallbackParam("type");
        var a = this.getCallbackParam("formats");
        var d = {
            page: c
        };
        if (b) {
            d.type = b
        }
        if (a) {
            d.formats = a
        }
        this.callback("changePage", d, {
            onSuccess: this.initTable.bind(this)
        })
    },
    eventClickHandler: function(a) {
        var b = a.element(),
            c = b.up("tr");
        a.stop();
        if (b.hasClassName("expanded")) {
            this.hideEvents(c);
            b.removeClassName("expanded");
            if (this.getEventRows(c).last().hasClassName("last")) {
                c.addClassName("last")
            }
        }
        else {
            if (c.hasClassName("loaded")) {
                b.addClassName("expanded");
                c.removeClassName("last");
                this.showEvents(c)
            }
            else {
                b.addClassName("expanded");
                this.loadEvents(c)
            }
        }
    },
    iterateEventRows: function(a, b, d) {
        var c = $(a).next();
        while (c && c.hasClassName("event")) {
            next_row = c.next();
            c[b](d);
            c = next_row
        }
    },
    getEventRows: function(a) {
        var b = [],
            c = $(a).next();
        while (c && c.hasClassName("event")) {
            b.push(c);
            c = c.next()
        }
        return b
    },
    hideEvents: function(a) {
        this.iterateEventRows(a, "removeClassName", "expanded")
    },
    showEvents: function(a) {
        this.iterateEventRows(a, "addClassName", "expanded")
    },
    showOdds: function(i) {
        var f = this.el;
        var g = f.select("table#odds-match_id_" + i);
        var d = g.first();
        if (d) {
            var c = new Array;
            var a = d.select("tr[completed=1]");
            if (a && a.length > 0) {
                a.each(function(j) {
                    $(j).setStyle({
                        display: "none"
                    })
                });
                if (typeof this.last_bookmaker_key[i] == "undefined") {
                    this.last_bookmaker_key[i] = this.getRandomBookmaker(a)
                }
                var b = this.last_bookmaker_key[i];
                d.select("tr#" + b.id).first().setStyle({
                    display: "table-row"
                })
            }
            else {
                var e = d.select("tr.no_odds");
                if (e && 0 < e.length) {
                    e.first().setStyle({
                        display: "table-row"
                    })
                }
            }
            d.setStyle({
                display: "table"
            })
        }
    },
    hideOdds: function(b) {
        matchId = parseInt(/-(\d+)$/.exec(b.readAttribute("id"))[1], 10);
        matchRow = b.up("tr");
        var d = this.el;
        var e = d.select("table#odds-match_id_" + matchId);
        var c = e.first();
        if (c) {
            var a = c.select("tr");
            if (a && a.length > 0) {
                a.each(function(f) {
                    $(f).setStyle({
                        display: "none"
                    })
                })
            }
        }
        this.iterateEventRows(matchRow, "removeClassName", "expanded");
        b.removeClassName("expanded")
    },
    removeEvents: function(a) {
        this.iterateEventRows(a, "remove")
    },
    bookmakerButtonClickHandler: function(a) {
        var d = a.element();
        var i = parseInt(/-(\d+)$/.exec(d.readAttribute("id"))[1], 10);
        var g = d.up("tr").readAttribute("data-competition");
        g = isNaN(g) ? 0 : g;
        if (typeof this.last_bookmaker_key[i] == "undefined") {
            var f = this.params.get("bookmaker_urls");
            var e = $H(f).values();
            this.last_bookmaker_key[i] = this.getRandomBookmaker(e)
        }
        var c = this.last_bookmaker_key[i];
        var b = typeof(c[g]) == "undefined" ? c[0]["name"] : c[g]["name"];
        $(d).up(0).setAttribute("data-bookmaker", b);
        d.href = typeof(c[g]) == "undefined" ? c[0]["link"] : c[g]["link"]
    },
    oddsButtonClickHandler: function(c) {
        var d = c.element();
        var b = d.up("tr");
        var a = d.readAttribute("id");
        var f = parseInt(/-(\d+)$/.exec(d.readAttribute("id"))[1], 10);
        if ("number" != typeof(f)) {
            return false
        }
        c.stop();
        if (d.hasClassName("expanded")) {
            this.hideOdds(d, this.id)
        }
        else {
            if (b.hasClassName("loaded")) {
                d.addClassName("expanded");
                this.iterateEventRows(b, "addClassName", "expanded");
                this.showOdds(f, this.id)
            }
            else {
                var e = b.hasClassName("odd") ? "odd" : "even";
                this.showEventsLoading(b, e);
                this.callback("showOdds", {
                    match_id: f,
                    odd_even: e
                }, {
                    onRequestSuccess: function() {}.bind(this),
                    onSuccess: function() {}.bind(this),
                    onComplete: function() {}.bind(this),
                    showLoading: false
                });
                d.addClassName("expanded");
                this.iterateEventRows(b, "addClassName", "expanded");
                b.addClassName("loaded")
            }
        }
    },
    populateOdds: function(f, i) {
        var e = this.el;
        var g = e.select("table#odds-match_id_" + i);
        var c = g.first();
        if ("object" != typeof(f)) {
            return false
        }
        if (f["1x2"]) {
            for (var b in f["1x2"]) {
                if (isNaN(b)) {
                    break
                }
                data = f["1x2"][b];
                var d = c.select("#match_id_" + i + "_bookmaker_id_" + data.bookmaker_id).first();
                if (d) {
                    d.setAttribute("completed", 1);
                    d.select("span.rate_1").first().update((data["1"] * 1).toFixed(2));
                    d.select("span.rate_x").first().update((data.x * 1).toFixed(2));
                    d.select("span.rate_2").first().update((data["2"] * 1).toFixed(2))
                }
            }
        }
        if (c) {
            var a = c.select("tr.bookmaker");
            if (a && a.length > 0) {
                a.each(function(j) {
                    if (!$(j).hasAttribute("completed")) {
                        $(j).remove()
                    }
                })
            }
        }
    },
    hideOddsTr: function(e) {
        var c = this.el;
        var d = c.select("table#odds-match_id_" + e);
        var b = d.first();
        if (b) {
            var a = b.select("tr");
            if (a && a.length > 0) {
                a.each(function(f) {
                    $(f).setStyle({
                        display: "none"
                    })
                })
            }
        }
    },
    loadEvents: function(a) {
        var c = a.hasClassName("odd") ? "odd" : "even";
        var b = a.hasClassName("last");
        a.removeClassName("last");
        this.showEventsLoading(a, c);
        if (b) {
            a.next().addClassName("last")
        }
        var d = parseInt(/-(\d+)$/.exec(a.readAttribute("id"))[1], 10);
        this.callback("showEvents", {
            match_id: d,
            odd_even: c
        }, {
            onRequestSuccess: function() {
                this.removeEvents(a)
            }.bind(this),
            onSuccess: Prototype.emptyFunction,
            onComplete: function() {
                this.hideEventsLoading(a);
                if (b) {
                    this.getEventRows(a).last().addClassName("last")
                }
            }.bind(this),
            showLoading: false
        });
        a.addClassName("loaded")
    },
    showEventsLoading: function(a, d, c) {
        var e = "event-icon";
        if ("undefined" != typeof(c)) {
            e = c
        }
        var b = this.rowTemplate.evaluate({
            odd_even: d,
            colspan_left: this.getAttribute("colspan_left"),
            colspan_right: this.getAttribute("colspan_right"),
            "event-icon": e
        });
        a.insert({
            after: b
        })
    },
    hideEventsLoading: function(a) {
        a.next("tr.loading").remove()
    },
    hideOddsLoading: function(c) {
        var b = this.id + "_match-" + c;
        var a = $(b);
        a.next("tr.loading").remove()
    },
    getRandomBookmaker: function(b) {
        length = b.length;
        if (0 < length) {
            var a = Math.floor(Math.random() * length);
            return b[a]
        }
        return null
    },
});
var GroupedMatchesBlock = Class.create(MatchesBlock, {
    postInitialize: function($super) {
        $super();
        this.currentHeadRowId = null;
        this.el.observe("click", Event.delegate({
            "tr.group-head.clickable *": this.groupClickHandler.bindAsEventListener(this)
        }))
    },
    groupClickHandler: function(a) {
        if (!a.findElement("th.competition-link")) {
            var b = a.findElement("tr");
            this[b.hasClassName("expanded") ? "hideGroup" : "showGroup"](b)
        }
    },
    hideGroup: function(b) {
        var a;
        b = $(b).removeClassName("expanded");
        a = b.next();
        while (a) {
            if (a.hasClassName("match") || a.hasClassName("round-head")) {
                a.removeClassName("expanded")
            }
            else {
                if (a.hasClassName("event")) {
                    a.hide()
                }
                else {
                    break
                }
            }
            a = a.next()
        }
        this.currentHeadRowId = null
    },
    removeGroup: function(c) {
        var b, a;
        c = $(c).removeClassName("expanded");
        a = c.next();
        b = a;
        while (b) {
            a = b.next();
            if (b.hasClassName("match") || b.hasClassName("round-head") || b.hasClassName("event")) {
                b.remove()
            }
            else {
                break
            }
            b = a
        }
        this.currentHeadRowId = null
    },
    showGroup: function(b) {
        var a;
        b = $(b).addClassName("expanded");
        this.currentHeadRowId = b.id;
        if (!b.hasClassName("loaded")) {
            this.loadMatches(b);
            return
        }
        a = b.next();
        while (a) {
            if (a.hasClassName("match") || a.hasClassName("round-head")) {
                a.addClassName("expanded")
            }
            else {
                if (a.hasClassName("event")) {
                    a.show()
                }
                else {
                    break
                }
            }
            a = a.next()
        }
    },
    loadMatches: function(c) {
        var c = $(c),
            a = c.id.split("-"),
            b;
        if (a.size() === 3) {
            b = {
                round_id: parseInt(a[2], 10),
                competition_id: parseInt(a[1], 10)
            }
        }
        else {
            b = {
                competition_id: parseInt(a.last(), 10)
            }
        }
        if (c.hasAttribute("stage-value")) {
            this.setCallbackParam("stage-value", c.readAttribute("stage-value"))
        }
        this.showEventsLoading(c);
        this.callback("showMatches", b, {
            onSuccess: Prototype.emptyFunction,
            onComplete: function() {
                this.hideEventsLoading(c);
                this.removeBettingButtons()
            }.bind(this),
            showLoading: false
        });
        c.addClassName("loaded")
    },
    expandAllGroups: function() {
        this.el.select("tr.group-head").each(this.showCompetition.bind(this))
    },
    collapseAllGroups: function() {
        this.el.select("tr.group-head").each(this.hideCompetition.bind(this))
    }
});
var HomeMatchesBlock = Class.create(GroupedMatchesBlock, {
    initialize: function($super, c, a, b) {
        b = $H(b);
        this.timestamp = b.unset("timestamp");
        $super(c, a, b);
        this.executingMatchUpdate = false;
        this.executingMatchMissedCounter = 0;
        this.num_live = 0;
        this.nowPlayingCounter = null;
        this.reloadCounter = null;
        CallbackManager.registerHandler("setLastUpdatedMatches", function(e, d) {
            e.updatedMatches(d.matches)
        });
        CallbackManager.registerHandler("setOddsWidget", function(e, d) {
            e.updatedMatches(d.matches)
        });
        this.startInterval()
    },
    startInterval: function() {
        this.interval = new PeriodicalExecuter(this.getLastUpdatedMatches.bind(this), 30)
    },
    stopInterval: function() {
        if (this.interval !== null) {
            this.interval.stop();
            this.interval = null
        }
    },
    getLastUpdatedMatches: function(a) {
        if (!this.executingMatchUpdate || this.executingMatchMissedCounter > 3) {
            if (this.reloadCounter !== null) {
                this.reloadCounter++
            }
            if (this.reloadCounter == 2) {
                this.reloadCounter = null;
                this.updateContent(a);
                return
            }
            this.executingMatchUpdate = true;
            this.executingMatchMissedCounter = 0;
            var b = this.params.unset("timestamp");
            if (b !== undefined && b > this.timestamp) {
                this.timestamp = b
            }
            this.callback("setLastUpdatedMatches", {}, {
                onComplete: function() {
                    this.executingMatchUpdate = false
                }.bind(this),
                onException: function(d, c) {
                    this.executingMatchUpdate = false
                }.bind(this),
                showLoading: false,
                ajaxUrl: Config.get("live_update_path")
            })
        }
        else {
            this.executingMatchMissedCounter++
        }
    },
    updatedMatches: function(e) {
        var c = this.params.unset("timestamp");
        if (c !== undefined && c > this.timestamp) {
            this.timestamp = c
        }
        var b = this.structurizeMatches(e);
        var d = b.unset("timestamp");
        var a = b.unset("num_live");
        this.updateNowPlayingCounter(a);
        b.detect(function(f) {
            var g = f.value.detect(function(i) {
                var j = this.getHeadRow(f.key, i.key);
                return this.refreshGroup(j, i.value)
            }, this);
            return (g !== undefined)
        }, this);
        this.timestamp = d
    },
    structurizeMatches: function(c) {
        var k = this.timestamp;
        var g = $H();
        var a = {
            c: "competition_id",
            r: "round_id",
            m: "match_id",
            u: "last_updated",
            e: "event_last_updated",
            l: "live",
            i: "minute",
            s: "status",
            t: "status_type"
        };
        var b = 0;
        for (var e in c) {
            var d = c[e];
            if (d.l === "1") {
                b++
            }
            if (d.u > this.timestamp) {
                for (var f in a) {
                    d[a[f]] = d[f];
                    delete d[f]
                }
                if (d.last_updated > k) {
                    k = d.last_updated
                }
                d.update_events = (d.event_last_updated && d.event_last_updated > this.timestamp);
                delete d.event_last_updated;
                var j = g.get(d.competition_id);
                if (j === undefined) {
                    j = $H()
                }
                var i = j.get(d.round_id);
                if (i === undefined) {
                    i = $H()
                }
                i.set(d.match_id, d);
                j.set(d.round_id, i);
                g.set(d.competition_id, j)
            }
        }
        g.set("timestamp", k);
        g.set("num_live", b);
        return g
    },
    getHeadRow: function(c, a) {
        var b = c + "-" + a;
        row = $("date_matches-" + b);
        if (row === null) {
            row = $("date_matches-" + c)
        }
        return row
    },
    updateContent: function(a) {
        this.callback("updateContent", {}, {
            onSuccess: function() {
                this.initTable();
                this.expandCompetitions()
            }.bind(this),
            showLoading: false
        })
    },
    refreshGroup: function(c, b) {
        if (c === null) {
            if (this.reloadCounter === null) {
                var a = b.detect(function(d) {
                    return (d.value.live == "1")
                });
                if (a !== undefined) {
                    this.reloadCounter = 0
                }
            }
            return false
        }
        if (c.hasClassName("loaded")) {
            c.removeClassName("loaded")
        }
        if (c.hasClassName("expanded")) {
            this.updateMatches(c, b)
        }
        else {
            if (!c.hasClassName("live") && this.reloadCounter === null) {
                var a = b.detect(function(d) {
                    return (d.value.live == "1")
                });
                if (a !== undefined) {
                    c.addClassName("live");
                    this.reloadCounter = 0
                }
            }
        }
        return false
    },
    updateMatches: function(d, c) {
        var b = 0;
        var a = d;
        while (a = this.nextMatchRow(a)) {
            if (this.updateMatch(a, c)) {
                b++
            }
            if (b == c.size()) {
                break
            }
        }
        if (b < c.size()) {
            this.reloadMatches(d, c)
        }
    },
    nextMatchRow: function(a) {
        a = a.next();
        while (a && !a.hasClassName("match") && !a.hasClassName("group-head")) {
            a = a.next()
        }
        if (!a || !a.hasClassName("match")) {
            return null
        }
        return a
    },
    updateMatch: function(a, e) {
        var f = a.id.split("-").pop();
        var b = e.get(f);
        if (b === undefined) {
            return false
        }
        else {
            if (b.update_events) {
                if (a.hasClassName("loaded")) {
                    a.removeClassName("loaded");
                    if (a.next().hasClassName("expanded")) {
                        this.loadEvents(a)
                    }
                }
                else {
                    if (a.select("a.events-button-button").size() == 0) {
                        return false
                    }
                }
            }
            if (b.live == "1" && !a.hasClassName("highlight")) {
                a.addClassName("highlight")
            }
            else {
                if (b.live == "" && a.hasClassName("highlight")) {
                    a.removeClassName("highlight")
                }
            }
            var d = a.firstDescendant();
            if (b.minute == "") {
                d.update("&nbsp;");
                if (d.hasClassName("visible")) {
                    d.removeClassName("visible")
                }
            }
            else {
                d.update(b.minute);
                if (!d.hasClassName("visible")) {
                    d.addClassName("visible")
                }
            }
            var c = d.next().next();
            if (b.status_type == "score" && c.hasClassName("status")) {
                c.removeClassName("status");
                c.addClassName("score")
            }
            else {
                if (b.status_type == "status" && c.hasClassName("score")) {
                    c.removeClassName("score");
                    c.addClassName("status")
                }
            }
            c.firstDescendant().update(b.status);
            return true
        }
    },
    reloadMatches: function(c) {
        var c = $(c),
            a = c.id.split("-"),
            b;
        if (a.size() === 3) {
            b = {
                round_id: parseInt(a[2], 10),
                competition_id: parseInt(a[1], 10)
            }
        }
        else {
            b = {
                competition_id: parseInt(a.last(), 10)
            }
        }
        this.callback("showMatches", b, {
            onRequestSuccess: function() {
                this.removeGroup(c);
                this.showEventsLoading(c)
            }.bind(this),
            onSuccess: Prototype.emptyFunction,
            onComplete: function() {
                this.hideEventsLoading(c);
                c.addClassName("expanded");
                c.addClassName("loaded");
                this.removeBettingButtons()
            }.bind(this),
            showLoading: false
        })
    },
    expandCompetitions: function() {
        if (this.currentHeadRowId != null) {
            this.showGroup($(this.currentHeadRowId))
        }
    },
    filterContent: function(a) {
        this.stopInterval();
        this.callback("filterContent", a, {
            onSuccess: function() {
                if (this.getCallbackParam("display") !== "odds") {
                    this.startInterval();
                    this.removeBettingButtons()
                }
            }.bind(this)
        })
    },
    filterOdds: function(a) {
        this.stopInterval();
        this.callback("filterOdds", a, {
            onSuccess: function() {
                if (this.getCallbackParam("display") !== "odds") {
                    this.startInterval();
                    this.removeBettingButtons()
                }
            }.bind(this)
        })
    },
    updateNowPlayingCounter: function(a) {
        if (a == this.num_live) {
            return
        }
        if (this.nowPlayingCounter === null) {
            var b = this.registeredSubnav.get("now_playing");
            this.nowPlayingCounter = b.firstDescendant()
        }
        if (a == 0) {
            this.nowPlayingCounter.update("")
        }
        else {
            this.nowPlayingCounter.update(" (" + a + ")")
        }
    }
});
var TeamSquadBlock = Class.create(Block, {
    reinitialize: function() {
        var a = $(this.id + "-season-select");
        if (a) {
            a.observe("change", function(c) {
                this.callback(a.readAttribute("data-callback"), {
                    season_id: $F(c.element())
                })
            }.bind(this))
        }
        var b = $$("#" + this.id + " #year-select")[0];
        if (b) {
            b.observe("change", function(c) {
                this.callback("changeTransfers", {
                    year: $F(c.element())
                })
            }.bind(this))
        }
    }
});
var IndexBlock = Class.create(Block, {
    postInitialize: function() {
        this.el.select("ul:first-child")[0].on("click", "li", function(a, b) {
            this.itemize(b);
            b.expand();
            if (b.expandable()) {
                Event.stop(a)
            }
        }.bind(this))
    },
    expand: function(a) {
        this.itemize(a);
        a.expand(this)
    },
    itemize: function(a) {
        if (typeof a.itemized === "undefined") {
            Object.extend(a, this.item_methods);
            a.block = this
        }
    },
    item_methods: {
        itemized: function() {
            return true
        },
        expand: function() {
            if (this.expandable()) {
                if (this.expanded()) {
                    this.removeClassName("expanded")
                }
                else {
                    if (this.loaded()) {
                        this.addClassName("expanded")
                    }
                    else {
                        var a = this.params();
                        a.level = this.level();
                        a.item_key = this.item_key();
                        this.addClassName("expanded");
                        this.select("div.row")[0].insert({
                            after: '<div class="loading"></div>'
                        });
                        this.block.callback("expandItem", a, {
                            onSuccess: function() {
                                this.addClassName("loaded")
                            }.bind(this),
                            onComplete: function() {
                                this.select("div.loading")[0].remove()
                            }.bind(this),
                            showLoading: false
                        })
                    }
                }
            }
        },
        expandable: function() {
            return this.hasClassName("expandable")
        },
        expanded: function() {
            return this.hasClassName("expanded")
        },
        loaded: function() {
            return this.hasClassName("loaded")
        },
        params: function() {
            var c = {};
            var a = this.attributes;
            for (var b = 0; b < a.length; b += 1) {
                attr = a[b];
                attr_parts = attr.name.split("-", 2);
                if ((attr_parts.length == 2) && (attr_parts[0] == "data")) {
                    c[attr_parts[1]] = attr.value
                }
            }
            return c
        },
        level: function() {
            return parseInt(this.parentNode.getAttribute("data-level")) + 1
        },
        item_key: function() {
            return this.parentNode.getAttribute("data-item-key")
        }
    }
});
var H2hTeamSelectionBlock = Class.create(Block, {
    postInitialize: function() {
        this.el.select("#h2h_team_selection_type")[0].observe("change", function(b) {
            this.loadDropdowns($F(b.element()))
        }.bind(this));
        var a = new ActiveDropdown(this);
        a.addObserver("area", function(b) {
            this.loadClubOtherDropdown(a, b)
        }.bind(this));
        a.addObserver("competition", function(b) {
            this.loadClubOtherDropdown(a, b)
        }.bind(this));
        this.submit_btn = this.el.select('input[type="submit"]')[0];
        this.el.on((Prototype.Browser.IE ? "click" : "change"), "select", this.handleSubmitBtn.bind(this));
        this.handleSubmitBtn()
    },
    submit_btn: null,
    handleSubmitBtn: function() {
        this.submit_btn.disabled = true;
        var a = this.el.select('div[data-active-dropdown-id="team"] select');
        if (a.length == 2) {
            if (a.all(function(b) {
                    return (b.value != "")
                })) {
                this.submit_btn.disabled = false
            }
        }
    },
    loadDropdowns: function(a) {
        this.callback("initDropdowns", {
            type: a
        }, {})
    },
    loadClubOtherDropdown: function(g, f) {
        if (this.el.select("#h2h_team_selection_type")[0].value == "club") {
            var c = (f.wrapper_id == "h2h_team_a" ? "h2h_team_b" : "h2h_team_a");
            var b = 'div[data-active-dropdown-wrapper-id="' + c + '"] div[data-active-dropdown-id="' + f.id + '"]';
            var e = $("h2h_team_selection_dropdowns").select(b)[0];
            var d = e.select("select")[0];
            if (d.value == "") {
                for (var a = 0; a < d.length; a += 1) {
                    if (d[a].value == f.value) {
                        d[a].selected = true
                    }
                }
                g.loadDropdown(this, d, d.parentNode)
            }
        }
    }
});
var SortableTable = {
    init: function(g, f) {
        var d = $(g);
        if (d.tagName != "TABLE") {
            return
        }
        if (!d.id) {
            d.id = "sortable-table-" + SortableTable._count++
        }
        Object.extend(SortableTable.options, f || {});
        var a = (SortableTable.options.tableScroll == "on" || (SortableTable.options.tableScroll == "class" && d.hasClassName(SortableTable.options.tableScrollClass)));
        var c;
        var b = SortableTable.getHeaderCells(d);
        b.each(function(i) {
            i = $(i);
            if (!a) {
                Event.observe(i, "click", SortableTable._sort.bindAsEventListener(i));
                i.addClassName(SortableTable.options.columnClass)
            }
            if (i.hasClassName(SortableTable.options.sortFirstAscendingClass) || i.hasClassName(SortableTable.options.sortFirstDecendingClass)) {
                c = i
            }
        });
        if (c) {
            if (c.hasClassName(SortableTable.options.sortFirstAscendingClass)) {
                SortableTable.sort(d, c, 1)
            }
            else {
                SortableTable.sort(d, c, -1)
            }
        }
        else {
            var e = SortableTable.getBodyRows(d);
            e.each(function(k, j) {
                SortableTable.addRowClass(k, j)
            })
        }
        if (a) {
            SortableTable.initScroll(d)
        }
    },
    initScroll: function(d) {
        var g = $(d);
        if (g.tagName != "TABLE") {
            return
        }
        g.addClassName(SortableTable.options.tableScrollClass);
        var f = g.getDimensions().width;
        g.setStyle({
            "border-spacing": "0",
            "table-layout": "fixed",
            width: f + "px"
        });
        var j = SortableTable.getHeaderCells(g);
        j.each(function(m, l) {
            m = $(m);
            var k = m.getDimensions().width;
            m.setStyle({
                width: k + "px"
            });
            $A(g.tBodies[0].rows).each(function(n) {
                $(n.cells[l]).setStyle({
                    width: k + "px"
                })
            })
        });
        var e = (g.tHead && g.tHead.rows.length > 0) ? g.tHead : g.rows[0];
        var c = e.cloneNode(true);
        var i = $(document.createElement("div"));
        i.id = g.id + "-head";
        g.parentNode.insertBefore(i, g);
        i.setStyle({
            overflow: "hidden"
        });
        var b = $(document.createElement("table"));
        b.setStyle({
            "border-spacing": "0",
            "table-layout": "fixed",
            width: f + "px"
        });
        i.appendChild(b);
        i.addClassName("scroll-table-head");
        g.removeChild(e);
        b.appendChild(c);
        j = SortableTable.getHeaderCells(b);
        j.each(function(k) {
            k = $(k);
            Event.observe(k, "click", SortableTable._sortScroll.bindAsEventListener(k));
            k.addClassName(SortableTable.options.columnClass)
        });
        var a = $(document.createElement("div"));
        a.id = g.id + "-body";
        g.parentNode.insertBefore(a, g);
        a.setStyle({
            overflow: "auto"
        });
        a.appendChild(g);
        a.addClassName("scroll-table-body");
        i.scrollLeft = 0;
        a.scrollLeft = 0;
        Event.observe(a, "scroll", SortableTable._scroll.bindAsEventListener(g), false);
        if (g.offsetHeight - a.offsetHeight > 0) {
            a.setStyle({
                width: (a.getDimensions().width + 16) + "px"
            })
        }
    },
    _scroll: function() {
        $(this.id + "-head").scrollLeft = $(this.id + "-body").scrollLeft
    },
    _sort: function(a) {
        SortableTable.sort(null, this)
    },
    _sortScroll: function(b) {
        var a = $(this).up("div.scroll-table-head");
        var c = a.id.match(/^(.*)-head$/);
        SortableTable.sort($(c[1]), this)
    },
    sort: function(j, e, a) {
        var f;
        if (typeof e == "number") {
            if (!j || (j.tagName && j.tagName != "TABLE")) {
                return
            }
            e = Math.min(j.rows[0].cells.length, e);
            e = Math.max(1, e);
            e -= 1;
            f = (j.tHead && j.tHead.rows.length > 0) ? $(j.tHead.rows[j.tHead.rows.length - 1].cells[e]) : $(j.rows[0].cells[e])
        }
        else {
            f = $(e);
            j = j ? $(j) : f.up("table");
            e = SortableTable.getCellIndex(f)
        }
        var d = SortableTable.options;
        if (f.hasClassName(d.nosortClass)) {
            return
        }
        if (!a) {
            if (f.hasClassName(d.descendingClass) || (!f.hasClassName(d.ascendingClass) && f.hasClassName(d.sortDefaultAscendingClass))) {
                a = 1
            }
            else {
                a = -1
            }
        }
        var g = SortableTable.getHeaderCells(null, f);
        var c = 0;
        $A(g).each(function(l) {
            l = $(l);
            if (c == e) {
                if (a == 1) {
                    l.removeClassName(d.descendingClass);
                    l.addClassName(d.ascendingClass)
                }
                else {
                    l.removeClassName(d.ascendingClass);
                    l.addClassName(d.descendingClass)
                }
            }
            else {
                l.removeClassName(d.ascendingClass);
                l.removeClassName(d.descendingClass)
            }
            var i = parseInt(l.readAttribute("colspan") || 1);
            c += i
        });
        var k = SortableTable.getBodyRows(j);
        var b = SortableTable.getDataType(f, e, j);
        k.sort(function(m, l) {
            var i = a * SortableTable.types[b](SortableTable.getCellText(m.cells[e]), SortableTable.getCellText(l.cells[e]));
            return i
        });
        k.each(function(m, l) {
            j.tBodies[0].appendChild(m);
            SortableTable.addRowClass(m, l)
        })
    },
    types: {
        number: function(d, c) {
            var e = function(a) {
                a = parseFloat(a.replace(/^.*?([-+]?[\d]*\.?[\d]+(?:[eE][-+]?[\d]+)?).*$/, "$1"));
                return isNaN(a) ? 0 : a
            };
            return SortableTable.compare(e(d), e(c))
        },
        text: function(d, c) {
            return SortableTable.compare(d ? d.toLowerCase() : "", c ? c.toLowerCase() : "")
        },
        casesensitivetext: function(d, c) {
            return SortableTable.compare(d, c)
        },
        datasize: function(d, c) {
            var e = function(g) {
                var i = g.match(/^([-+]?[\d]*\.?[\d]+([eE][-+]?[\d]+)?)\s?([k|m|g|t]?b)?/i);
                var f = i[1] ? Number(i[1]).valueOf() : 0;
                var a = i[3] ? i[3].substr(0, 1).toLowerCase() : "";
                switch (a) {
                    case "k":
                        return f * 1024;
                        break;
                    case "m":
                        return f * 1024 * 1024;
                        break;
                    case "g":
                        return f * 1024 * 1024 * 1024;
                        break;
                    case "t":
                        return f * 1024 * 1024 * 1024 * 1024;
                        break
                }
                return f
            };
            return SortableTable.compare(e(d), e(c))
        },
        "date-au": function(d, c) {
            var e = function(f) {
                var j = f.match(/^(\d{2})\/(\d{2})\/(\d{4})\s?(?:(\d{1,2})\:(\d{2})(?:\:(\d{2}))?\s?([a|p]?m?))?/i);
                var k = j[3];
                var b = parseInt(j[2]) - 1;
                var i = j[1];
                var g = j[4] ? j[4] : 0;
                if (j[7] && j[7].toLowerCase().indexOf("p") != -1) {
                    g = parseInt(j[4]) + 12
                }
                var a = j[5] ? j[5] : 0;
                var l = j[6] ? j[6] : 0;
                return new Date(k, b, i, g, a, l, 0).valueOf()
            };
            return SortableTable.compare(d ? e(d) : 0, c ? e(c) : 0)
        },
        "date-us": function(d, c) {
            var e = function(f) {
                var j = f.match(/^(\d{2})\/(\d{2})\/(\d{4})\s?(?:(\d{1,2})\:(\d{2})(?:\:(\d{2}))?\s?([a|p]?m?))?/i);
                var k = j[3];
                var b = parseInt(j[1]) - 1;
                var i = j[2];
                var g = j[4] ? j[4] : 0;
                if (j[7] && j[7].toLowerCase().indexOf("p") != -1) {
                    g = parseInt(j[4]) + 12
                }
                var a = j[5] ? j[5] : 0;
                var l = j[6] ? j[6] : 0;
                return new Date(k, b, i, g, a, l, 0).valueOf()
            };
            return SortableTable.compare(d ? e(d) : 0, c ? e(c) : 0)
        },
        "date-eu": function(d, c) {
            var e = function(b) {
                var g = b.match(/^(\d{2})-(\d{2})-(\d{4})/);
                var i = g[3];
                var a = parseInt(g[2]) - 1;
                var f = g[1];
                return new Date(i, a, f).valueOf()
            };
            return SortableTable.compare(d ? e(d) : 0, c ? e(c) : 0)
        },
        "date-iso": function(d, c) {
            var e = function(a) {
                var i = a.match(/([\d]{4})(-([\d]{2})(-([\d]{2})(T([\d]{2}):([\d]{2})(:([\d]{2})(\.([\d]+))?)?(Z|(([-+])([\d]{2}):([\d]{2})))?)?)?)?/);
                var g = 0;
                var b = new Date(i[1], 0, 1);
                if (i[3]) {
                    b.setMonth(i[3] - 1)
                }
                if (i[5]) {
                    b.setDate(i[5])
                }
                if (i[7]) {
                    b.setHours(i[7])
                }
                if (i[8]) {
                    b.setMinutes(i[8])
                }
                if (i[10]) {
                    b.setSeconds(i[10])
                }
                if (i[12]) {
                    b.setMilliseconds(Number("0." + i[12]) * 1000)
                }
                if (i[14]) {
                    g = (Number(i[16]) * 60) + Number(i[17]);
                    g *= ((i[15] == "-") ? 1 : -1)
                }
                g -= b.getTimezoneOffset();
                if (g != 0) {
                    var f = (Number(b) + (g * 60 * 1000));
                    b.setTime(Number(f))
                }
                return b.valueOf()
            };
            return SortableTable.compare(d ? e(d) : 0, c ? e(c) : 0)
        },
        date: function(d, c) {
            if (d && c) {
                return SortableTable.compare(new Date(d), new Date(c))
            }
            else {
                return SortableTable.compare(d ? 1 : 0, c ? 1 : 0)
            }
            return SortableTable.compare(d ? new Date(d).valueOf() : 0, c ? new Date(c).valueOf() : 0)
        },
        time: function(e, c) {
            var g = new Date();
            var f = g.getMonth() + "/" + g.getDate() + "/" + g.getFullYear() + " ";
            return SortableTable.compare(new Date(f + e), new Date(f + c))
        },
        currency: function(d, c) {
            d = parseFloat(d.replace(/[^-\d\.]/g, ""));
            c = parseFloat(c.replace(/[^-\d\.]/g, ""));
            return SortableTable.compare(d, c)
        }
    },
    compare: function(d, c) {
        return d < c ? -1 : d == c ? 0 : 1
    },
    detectors: $A([{
        re: /[\d]{4}-[\d]{2}-[\d]{2}(?:T[\d]{2}\:[\d]{2}(?:\:[\d]{2}(?:\.[\d]+)?)?(Z|([-+][\d]{2}:[\d]{2})?)?)?/,
        type: "date-iso"
    }, {
        re: /^sun|mon|tue|wed|thu|fri|sat\,\s\d{1,2}\sjan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec\s\d{4}(?:\s\d{2}\:\d{2}(?:\:\d{2})?(?:\sGMT(?:[+-]\d{4})?)?)?/i,
        type: "date"
    }, {
        re: /^\d{2}-\d{2}-\d{4}/i,
        type: "date-eu"
    }, {
        re: /^\d{2}\/\d{2}\/\d{4}\s?(?:\d{1,2}\:\d{2}(?:\:\d{2})?\s?[a|p]?m?)?/i,
        type: "date-au"
    }, {
        re: /^\d{1,2}\:\d{2}(?:\:\d{2})?(?:\s[a|p]m)?$/i,
        type: "time"
    }, {
        re: /^[$����]/,
        type: "currency"
    }, {
        re: /^[-+]?[\d]*\.?[\d]+(?:[eE][-+]?[\d]+)?\s?[k|m|g|t]b$/i,
        type: "datasize"
    }, {
        re: /^[-+]?[\d]*\.?[\d]+(?:[eE][-+]?[\d]+)?/,
        type: "number"
    }, {
        re: /^[A-Z]+$/,
        type: "casesensitivetext"
    }, {
        re: /.*/,
        type: "text"
    }]),
    addSortType: function(b, a) {
        SortableTable.types[b] = a
    },
    addDetector: function(b, a) {
        SortableTable.detectors.unshift({
            re: b,
            type: a
        })
    },
    getBodyRows: function(a) {
        a = $(a);
        return (a.hasClassName(SortableTable.options.tableScrollClass) || a.tHead && a.tHead.rows.length > 0) ? $A(a.tBodies[0].rows) : $A(a.rows).without(a.rows[0])
    },
    addRowClass: function(b, a) {
        b = $(b);
        b.removeClassName(SortableTable.options.rowEvenClass);
        b.removeClassName(SortableTable.options.rowOddClass);
        b.addClassName(((a + 1) % 2 == 0 ? SortableTable.options.rowEvenClass : SortableTable.options.rowOddClass))
    },
    getHeaderCells: function(b, a) {
        if (!b) {
            b = $(a).up("table")
        }
        return $A((b.tHead && b.tHead.rows.length > 0) ? b.tHead.rows[b.tHead.rows.length - 1].cells : b.rows[0].cells)
    },
    getCellIndex: function(a) {
        var c = a.parentNode.cells,
            b = 0,
            e;
        for (var d = 0; d < c.length; d++) {
            e = c[d];
            if (e == a) {
                return b
            }
            var f = parseInt($(e).readAttribute("colspan") || 1);
            b += f
        }
        return -1
    },
    getCellText: function(a) {
        if (!a) {
            return ""
        }
        return a.textContent ? a.textContent : a.innerText
    },
    getDataType: function(a, b, e) {
        a = $(a);
        var d = a.classNames().detect(function(g) {
            return (SortableTable.types[g]) ? true : false
        });
        if (!d) {
            var c = b ? b : SortableTable.getCellIndex(a);
            var f = e ? e : a.up("table");
            a = f.tBodies[0].rows[0].cells[c];
            d = SortableTable.detectors.detect(function(g) {
                return g.re.test(SortableTable.getCellText(a))
            })["type"]
        }
        return d
    },
    setup: function(a) {
        Object.extend(SortableTable.options, a || {});
        Object.extend(SortableTable.types, SortableTable.options.types || {});
        SortableTable.options.types = {};
        if (SortableTable.options.detectors) {
            SortableTable.detectors = $A(SortableTable.options.detectors).concat(SortableTable.detectors);
            SortableTable.options.detectors = []
        }
    },
    options: {
        autoLoad: true,
        tableSelector: ["table.sortable"],
        columnClass: "sortcol",
        descendingClass: "sortdesc",
        ascendingClass: "sortasc",
        nosortClass: "nosort",
        sortFirstAscendingClass: "sortfirstasc",
        sortFirstDecendingClass: "sortfirstdesc",
        sortDefaultAscendingClass: "sortdefaultasc",
        sortDefaultDescendingClass: "sortdefaultdesc",
        rowEvenClass: "even",
        rowOddClass: "odd",
        tableScroll: "off",
        tableScrollClass: "scroll"
    },
    _count: 0,
    load: function() {
        if (SortableTable.options.autoLoad) {
            $A(SortableTable.options.tableSelector).each(function(a) {
                $$(a).each(function(b) {
                    SortableTable.init(b)
                })
            })
        }
    }
};
document.observe("dom:loaded", SortableTable.load);
Object.extend(Date.prototype, {
    succ: function() {
        var a = new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1);
        a.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
        return a
    },
    firstofmonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), 1)
    },
    lastofmonth: function() {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0)
    },
    formatPadding: true,
    format: function(b) {
        if (!this.valueOf()) {
            return "&nbsp;"
        }
        var c = this;
        var a = {
            yyyy: c.getFullYear(),
            mmmm: this.monthnames[c.getMonth()],
            mmm: this.short_monthnames[c.getMonth()],
            mm: this.formatPadding ? ((c.getMonth()).succ()).toPaddedString(2) : (c.getMonth()).succ(),
            dddd: this.daynames[c.getDay()],
            ddd: this.short_daynames[c.getDay()],
            dd: c.getDate().toPaddedString(2),
            hh: h = c.getHours() % 12 ? h : 12,
            nn: c.getMinutes(),
            ss: c.getSeconds(),
            "a/p": c.getHours() < 12 ? "a" : "p"
        };
        return b.gsub(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/i, function(d) {
            return a[d[0].toLowerCase()]
        })
    }
});
var scal = {};
scal = Class.create();
scal.prototype = {
    initialize: function(a, c) {
        this.element = $(a);
        var b = Try.these(function() {
            if (!Object.isUndefined(Effect)) {
                return "Effect"
            }
        }, function() {
            return "Element"
        });
        this.options = Object.extend({
            oncalchange: Prototype.emptyFunction,
            daypadding: false,
            titleformat: "mmmm yyyy",
            updateformat: "yyyy-mm-dd",
            closebutton: "X",
            prevbutton: "&laquo;",
            nextbutton: "&raquo;",
            yearnext: "&raquo;&raquo;",
            yearprev: "&laquo;&laquo;",
            openeffect: b == "Effect" ? Effect.Appear : Element.show,
            closeeffect: b == "Effect" ? Effect.Fade : Element.hide,
            exactweeks: false,
            dayheadlength: 2,
            weekdaystart: 0,
            planner: false,
            tabular: false,
            highlightselected: true
        }, arguments[2] || {});
        this.table = false;
        this.thead = false;
        this.startdate = this._setStartDate(arguments[2]);
        if (this.options.planner) {
            this._setupPlanner(this.options.planner)
        }
        if (this.options.tabular) {
            this.table = new Element("table", {
                "class": "cal_table",
                border: 0,
                cellspacing: 0,
                cellpadding: 0
            });
            this.thead = new Element("thead");
            this.table.insert(this.thead);
            this.element.insert(this.table)
        }
        this.updateelement = c;
        this._setCurrentDate(this.startdate);
        this.initDate = new Date(this.currentdate);
        this.controls = this._buildControls();
        this._updateTitles();
        this[this.table ? "thead" : "element"].insert(this.controls);
        this.cal_wrapper = this._buildHead();
        this.cells = [];
        this._buildCal()
    },
    _setStartDate: function() {
        var a = arguments[0];
        var b = new Date();
        this.options.month = a && a.month && Object.isNumber(a.month) ? a.month - 1 : b.getMonth();
        this.options.year = a && a.year && Object.isNumber(a.year) ? a.year : b.getFullYear();
        this.options.day = a && a.day && Object.isNumber(a.day) ? a.day : (this.options.month != b.getMonth()) ? 1 : b.getDate();
        b.setHours(0, 0, 0, 0);
        b.setDate(this.options.day);
        b.setMonth(this.options.month);
        b.setFullYear(this.options.year);
        return b
    },
    _emptyCells: function() {
        if (this.cells.size() > 0) {
            this.cells.invoke("stopObserving");
            this.cells.invoke("remove");
            this.cells = []
        }
    },
    _buildCal: function() {
        this._emptyCells();
        if (!(Object.isUndefined(this.cal_weeks_wrapper) || this.table)) {
            this.cal_weeks_wrapper.remove()
        }
        this.cal_weeks_wrapper = this._buildWrapper();
        if (this.table) {
            this.table.select("tbody tr.weekbox:not(.weekboxname)").invoke("remove");
            this.table.select("tbody.cal_wrapper").invoke("remove");
            this.cal_weeks_wrapper.each(function(a) {
                this.cal_wrapper.insert(a)
            }.bind(this))
        }
        else {
            this.cal_wrapper.insert(this.cal_weeks_wrapper)
        }
        this[this.table ? "table" : "element"].insert(this.cal_wrapper)
    },
    _click: function(b, a) {
        this.element.select(".dayselected").invoke("removeClassName", "dayselected");
        (b.target.hasClassName("daybox") ? b.target : b.target.up()).addClassName("dayselected");
        this._setCurrentDate(this.dateRange[a]);
        this._updateExternal()
    },
    _updateExternal: function() {
        if (Object.isFunction(this.updateelement)) {
            this.updateelement(this.currentdate)
        }
        else {
            var a = $(this.updateelement);
            a[a.tagName == "INPUT" ? "setValue" : "update"](this.currentdate.format(this.options.updateformat))
        }
    },
    _buildHead: function() {
        var b = new Element(this.table ? "tbody" : "div", {
            "class": "cal_wrapper"
        });
        var a = new Element(this.table ? "tr" : "div", {
            "class": "weekbox weekboxname"
        });
        Date.prototype.daynames.sortBy(function(d, c) {
            c -= this.options.weekdaystart;
            if (c < 0) {
                c += 7
            }
            return c
        }.bind(this)).each(function(d, e) {
            var c = new Element(this.table ? "td" : "div", {
                "class": "cal_day_name_" + e
            });
            c.addClassName("daybox").addClassName("dayboxname").update(d.substr(0, this.options.dayheadlength));
            if (e == 6) {
                c.addClassName("endweek")
            }
            a.insert(c)
        }.bind(this));
        return b.insert(a)
    },
    _buildWrapper: function() {
        var f = new Date(this.firstofmonth.getFullYear(), this.firstofmonth.getMonth(), this.firstofmonth.getDate());
        var d = new Date(this.lastofmonth.getFullYear(), this.lastofmonth.getMonth(), this.lastofmonth.getDate());
        if (this.options.weekdaystart - f.getDay() < f.getDate()) {
            f.setDate(f.getDate() - f.getDay() + this.options.weekdaystart)
        }
        else {
            f.setDate(f.getDate() - (f.getDay() + 7 - this.options.weekdaystart))
        }
        var i = $A($R(f, d));
        var b = this.table ? [] : new Element("div", {
            "class": "calweekswrapper"
        });
        var j;
        var k;
        var e;
        this.dateRange = [];
        this.indicators = [];
        var c = function(l) {
            k.insert(this._buildDay(j, l));
            e = l
        }.bind(this);
        i.eachSlice(7, function(m, l) {
            j = l;
            k = new Element(this.table ? "tr" : "div", {
                "class": "cal_week_" + j
            }).addClassName("weekbox");
            while (m.length < 7) {
                m.push(m.last().succ())
            }
            m.map(c);
            b[this.table ? "push" : "insert"](k)
        }.bind(this));
        if (!this.options.exactweeks) {
            var a = 42 - this.cells.size();
            var g = Math.ceil(a / 7);
            if (g > 0) {
                a = a / g
            }
            $R(1, g).each(function(l) {
                j += 1;
                k = new Element(this.table ? "tr" : "div", {
                    "class": "cal_week_" + j
                }).addClassName("weekbox");
                $R(1, a).each(function(m) {
                    var n = e.succ();
                    k.insert(this._buildDay(j, n));
                    b[this.table ? "push" : "insert"](k);
                    e = n
                }.bind(this))
            }.bind(this))
        }
        return b
    },
    _compareDates: function(c, b, a) {
        return (this.indicators.indexOf(a) < 0) && ["getMonth", "getDate", "getFullYear"].all(function(d) {
            return c[d]() == b[d]()
        })
    },
    _buildDay: function(f, d) {
        this.dateRange.push(d);
        var e = false;
        var i = "cal_day_" + f + "_" + d.getDay();
        var a = new Element(this.table ? "td" : "div", {
            "class": i
        });
        var c = new Element("div", {
            "class": i + "_date"
        }).addClassName("dayboxdate").update(this.options.daypadding ? ((d.getDate()).toPaddedString(2)) : d.getDate());
        var b = new Element("div", {
            "class": i + "_value"
        }).addClassName("dayboxvalue");
        if (this.options.planner) {
            this._updatePlanner(d, b)
        }
        a.insert(c).insert(b).addClassName("daybox").addClassName("daybox" + d.format("dddd").toLowerCase());
        if (this.options.highlightselected && this._compareDates(d, this.initDate, "dayselected")) {
            e = true;
            a.addClassName("dayselected");
            this.indicators.push("dayselected")
        }
        if (this._compareDates(d, new Date(), "today")) {
            a.addClassName("today");
            this.indicators.push("today")
        }
        if (d.getDay() == 6) {
            a.addClassName("endweek")
        }
        var g = d.getMonth() != this.currentdate.getMonth() ? ["dayoutmonth", "dayinmonth"] : ["dayinmonth", "dayoutmonth"];
        a.addClassName(g[0]);
        if (a.hasClassName(g[1])) {
            a.removeClassName(g[1])
        }
        this.cells.push(a);
        if (!e) {
            a.observe("click", this._click.bindAsEventListener(this, this.cells.size() - 1))
        }
        return a
    },
    _updateTitles: function() {
        var a = this.currentdate.getFullYear();
        var c = this.currentdate.getMonth();
        var b = {
            calprevmonth: Date.prototype.monthnames[(c - 1) == -1 ? 11 : c - 1],
            calprevyear: a - 1,
            calnextyear: a + 1,
            calnextmonth: Date.prototype.monthnames[(c + 1) == 12 ? 0 : c + 1]
        };
        this.controls.select(".calcontrol").each(function(d) {
            var e = b[d.className.split(" ")[0]];
            if (!Object.isUndefined(e)) {
                d.setAttribute("title", e)
            }
        })
    },
    _buildControls: function() {
        var a = [{
            p: "calclose",
            u: this.options.closebutton,
            f: this.toggleCalendar.bindAsEventListener(this)
        }, {
            p: "calprevmonth",
            u: this.options.prevbutton,
            f: this._switchCal.bindAsEventListener(this, "monthdown")
        }, {
            p: "calprevyear",
            u: this.options.yearprev,
            f: this._switchCal.bindAsEventListener(this, "yeardown")
        }, {
            p: "calnextyear",
            u: this.options.yearnext,
            f: this._switchCal.bindAsEventListener(this, "yearup")
        }, {
            p: "calnextmonth",
            u: this.options.nextbutton,
            f: this._switchCal.bindAsEventListener(this, "monthup")
        }, {
            p: "caltitle",
            u: this.currentdate.format(this.options.titleformat),
            f: Prototype.emptyFunction
        }];
        if (this.table) {
            a = [a[1], a[2], a[5], a[3], a[4], a[0]]
        }
        var b = new Element(this.table ? "tr" : "div", {
            "class": "calheader"
        });
        a.each(function(c) {
            var d = new Element(this.table ? "td" : "div", {
                "class": c.p
            });
            if (c.p == "caltitle") {
                this.title = d;
                if (this.table) {
                    d.writeAttribute({
                        colspan: 2
                    })
                }
                d.update(c.u).observe("click", c.f)
            }
            else {
                d.addClassName("calcontrol");
                d[typeof(c.u) == "object" ? "insert" : "update"](c.u).observe("click", c.f)
            }
            b.insert(d)
        }.bind(this));
        return b
    },
    _switchCal: function() {
        if (arguments[1]) {
            var a = arguments[0];
            var b = arguments[1];
            a.date = this.currentdate
        }
        else {
            var b = arguments[0]
        }
        var f = {
            f: "setTime",
            p: this.initDate.getTime()
        };
        var e = this.currentdate.getDate();
        if (b != "init") {
            var c = this.currentdate[b.include("month") ? "getMonth" : "getFullYear"]();
            f = {
                f: b.include("month") ? "setMonth" : "setYear",
                p: b.include("up") ? c + 1 : c - 1
            }
        }
        this.currentdate[f.f](f.p);
        if (this.currentdate.getDate() != e) {
            this.currentdate.setDate(0)
        }
        if (arguments[1]) {
            this.options.oncalchange(a)
        }
        this._update()
    },
    _update: function() {
        this._setCurrentDate(arguments[0] ? arguments[0] : this.currentdate);
        this.title.update(this.currentdate.format(this.options.titleformat));
        this._buildCal();
        this._updateTitles()
    },
    _setCurrentDate: function(a) {
        this.currentdate = new Date(a.getFullYear(), a.getMonth(), a.getDate());
        this.firstofmonth = this.currentdate.firstofmonth();
        this.lastofmonth = this.currentdate.lastofmonth()
    },
    _getCellIndexByDate: function(c) {
        var a = c.getTime();
        var b = 0;
        this.dateRange.each(function(e, d) {
            if (e.getTime() == a) {
                b = d;
                throw $break
            }
        });
        return b
    },
    destroy: function() {
        this._emptyCells();
        if (this.table) {
            this.table.remove()
        }
        else {
            this.cal_weeks_wrapper.remove()
        }
        this.controls.descendants().invoke("stopObserving");
        [this.cal_wrapper, this.controls].invoke("remove")
    },
    setCurrentDate: function(a) {
        this[(a instanceof Date) ? "_update" : "_switchCal"](a);
        if (!arguments[1]) {
            this._updateExternal()
        }
        return this.currentdate
    },
    toggleCalendar: function() {
        this.options[this.element.visible() ? "closeeffect" : "openeffect"](this.element)
    },
    getElementByDate: function(a) {
        return this.cells[this._getCellIndexByDate(a)]
    },
    getElementsByWeek: function(a) {
        return this.element.select(".weekbox:nth-of-type(" + (a + 1) + ") .daybox:not(.dayboxname)")
    },
    getSelectedElement: function() {
        return this.element.select(".dayselected")[0]
    },
    getTodaysElement: function() {
        return this.element.select(".today")[0]
    },
    getDateByElement: function(a) {
        return this.dateRange[this.cells.indexOf(a)]
    },
    _setupPlanner: Prototype.emptyFunction,
    _updatePlanner: Prototype.emptyFunction,
    openCalendar: function() {
        if (!this.isOpen()) {
            this.toggleCalendar()
        }
    },
    closeCalendar: function() {
        if (this.isOpen()) {
            this.toggleCalendar()
        }
    },
    isOpen: function() {
        return this.element.visible()
    }
};
var DropdownManager = function() {
    var i = null,
        l = null,
        g, f, e, d, j, m = "",
        n = null,
        c, b, k, a = false;
    g = function(o) {
        if (o.findElement(".dropdown") == null) {
            e()
        }
    }.bindAsEventListener();
    handleKeyPress = function(o) {
        var p;
        switch (o.keyCode) {
            case Event.KEY_ESC:
                o.stop();
                e();
                break;
            default:
                if (i.searchable && !(o.ctrlKey || o.shiftKey || o.altKey || o.metaKey || o.modifiers)) {
                    p = String.fromCharCode(o.which ? o.which : o.keyCode);
                    if (p.search(/^[a-z]+$/i) < 0) {
                        c();
                        return
                    }
                    b();
                    m += p;
                    o.stop();
                    i.search(m)
                }
        }
    }.bindAsEventListener();
    c = function() {
        k();
        m = ""
    };
    b = function() {
        k();
        n = c.delay(1)
    };
    k = function() {
        if (n !== null) {
            window.clearTimeout(n);
            n = null
        }
    };
    e = function() {
        document.stopObserving("click", g);
        document.stopObserving("keypress", handleKeyPress);
        d()
    };
    d = function() {
        if (i !== null) {
            i.hide();
            i = null;
            l.removeClassName("active");
            l = null
        }
        k()
    };
    j = function(p, o) {
        if (i !== null) {
            d()
        }
        else {
            document.observe("click", g);
            document.observe("keypress", handleKeyPress)
        }
        p.show();
        i = p;
        o.addClassName("active");
        l = o
    };
    f = function(o, p) {
        if (i !== null && i === p) {
            e()
        }
        else {
            j(p, o.element())
        }
        o.stop()
    };
    return {
        create: function(q, p, o) {
            var r = Dropdown(q, o);
            $(p).observe("click", f.bindAsEventListener(null, r));
            return r
        }
    }
}();
var Dropdown = function(f, e) {
    var i, d, a, g, b, c;
    if (Object.isUndefined(e)) {
        e = false
    }
    f = $(f);
    i = f.visible();
    d = function() {
        f.hide();
        i = false
    };
    a = function() {
        f.show();
        i = true
    };
    g = function() {
        return f.select("li")
    }.memoize();
    b = function(j) {
        f.scrollTop = parseInt(j, 10)
    };
    c = function(o) {
        if (!e) {
            throw "Dropdown is not searchable.";
            return false
        }
        var j = g(),
            p = 0,
            l, n;
        o = o.toLowerCase();
        for (var k = 0, m = j.size(); k < m; ++k) {
            l = j[k];
            if (!l.hasClassName("group-head")) {
                n = j[k].innerHTML.stripTags().toLowerCase();
                if (n.startsWith(o)) {
                    b(p);
                    l.firstDescendant().focus();
                    break
                }
            }
            p += l.getHeight()
        }
    };
    return {
        searchable: e,
        search: c,
        show: a,
        hide: d
    }
};
var Cookie = (function() {
    var c = $H({
        expires: null,
        path: null,
        domain: null
    });

    function f(j) {
        return c.merge(j || {}).inject("", function(k, l) {
            if (l[1] !== null) {
                if (l[0] == "expires" && l[1].constructor == Date) {
                    l[1] = l[1].toUTCString()
                }
                k += ["; ", l[0], "=", l[1]].join("")
            }
            return k
        })
    }

    function e(l) {
        var n = document.cookie.split(";"),
            k, o;
        for (var j = 0, m = n.length; j < m; ++j) {
            k = n[j].replace(/^\s+|\s+$/g, "");
            o = k.split("=");
            if (unescape(o[0]) === l) {
                return unescape(o[1])
            }
        }
        return null
    }

    function i(l, m, j) {
        var k = escape(l) + "=" + escape(m);
        j = f(j);
        document.cookie = k + j
    }

    function g(k, j) {
        j = $H(j).merge({
            expires: "Thu, 01-Jan-1970 00:00:01 GMT"
        });
        if (e(k)) {
            i(k, "", j)
        }
    }

    function a() {
        var k = b();
        for (var j in k) {
            g(j)
        }
    }

    function b() {
        var l = {};
        for (var j = 0, k = l.length; j < k; ++j) {
            cookie = l[j].replace(/^\s+|\s+$/g, "");
            parts = cookie.split("=");
            l[unescape(parts[0])] = unescape(parts[1])
        }
        return l
    }

    function d() {
        i("cookies_enabled", "1");
        var j = (e("cookies_enabled") == "1");
        g("cookies_enabled");
        return j
    }
    return {
        get: e,
        set: i,
        unset: g,
        clear: a,
        getHash: b,
        enabled: d
    }
})();
var dateFormat = function() {
    var a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        b = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        d = /[^-+\dA-Z]/g,
        c = function(f, e) {
            f = String(f);
            e = e || 2;
            while (f.length < e) {
                f = "0" + f
            }
            return f
        };
    return function(j, w, r) {
        var g = dateFormat;
        if (arguments.length == 1 && Object.prototype.toString.call(j) == "[object String]" && !/\d/.test(j)) {
            w = j;
            j = undefined
        }
        j = j ? new Date(j) : new Date;
        if (isNaN(j)) {
            throw SyntaxError("invalid date")
        }
        w = String(g.masks[w] || w || g.masks["default"]);
        if (w.slice(0, 4) == "UTC:") {
            w = w.slice(4);
            r = true
        }
        var u = r ? "getUTC" : "get",
            n = j[u + "Date"](),
            e = j[u + "Day"](),
            k = j[u + "Month"](),
            q = j[u + "FullYear"](),
            t = j[u + "Hours"](),
            l = j[u + "Minutes"](),
            v = j[u + "Seconds"](),
            p = j[u + "Milliseconds"](),
            f = r ? 0 : j.getTimezoneOffset(),
            i = {
                d: n,
                dd: c(n),
                ddd: g.i18n.dayNames[e],
                dddd: g.i18n.dayNames[e + 7],
                m: k + 1,
                mm: c(k + 1),
                mmm: g.i18n.monthNames[k],
                mmmm: g.i18n.monthNames[k + 12],
                yy: String(q).slice(2),
                yyyy: q,
                h: t % 12 || 12,
                hh: c(t % 12 || 12),
                H: t,
                HH: c(t),
                M: l,
                MM: c(l),
                s: v,
                ss: c(v),
                l: c(p, 3),
                L: c(p > 99 ? Math.round(p / 10) : p),
                t: t < 12 ? "a" : "p",
                tt: t < 12 ? "am" : "pm",
                T: t < 12 ? "A" : "P",
                TT: t < 12 ? "AM" : "PM",
                Z: r ? "UTC" : (String(j).match(b) || [""]).pop().replace(d, ""),
                o: (f > 0 ? "-" : "+") + c(Math.floor(Math.abs(f) / 60) * 100 + Math.abs(f) % 60, 4),
                S: ["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : (n % 100 - n % 10 != 10) * n % 10]
            };
        return w.replace(a, function(m) {
            return m in i ? i[m] : m.slice(1, m.length - 1)
        })
    }
}();
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
Date.prototype.format = function(a, b) {
    return dateFormat(this, a, b)
};
var TimestampFormatter = (function() {
    var k = (Cookie.get("tf_disabled") != 1),
        g = 1000,
        m = 60 * g,
        i = 60 * m,
        n = 24 * i,
        o = Config.get("cookie_domain"),
        l = "/";

    function e(q, r) {
        var p = new Date();
        p.setTime(q * 1000);
        return p.format(r)
    }

    function j(p) {
        var q = p.readAttribute("data-value"),
            r = p.readAttribute("data-format");
        p.replace(e(q, r))
    }

    function a(p) {
        var q;
        if (!Object.isUndefined(p)) {
            c(p);
            q = $(p).select("span.timestamp")
        }
        else {
            q = $$("span.timestamp")
        }
        q.each(j)
    }

    function f() {
        var p = new Element("div").update(document.title);
        a(p);
        document.title = p.innerHTML
    }

    function b() {
        var p = new Date();
        p.setTime(p.getTime() + 30 * n);
        Cookie.set("tf_disabled", "1", {
            expires: p.toUTCString(),
            path: l,
            domain: o
        });
        k = false
    }

    function d() {
        Cookie.unset("tf_disabled", {
            path: l,
            domain: o
        });
        k = true
    }

    function c(p) {
        var q = null;
        $(p).select(".matches:not(.aggregates) .no-date-repetition").each(function(r) {
            var s = e(r.readAttribute("data-timestamp"), "yyyymmdd");
            if (s === q) {
                r.select(".no-repetition span.timestamp").invoke("remove")
            }
            q = s
        })
    }
    return {
        initialize: function() {
            if (k) {
                a()
            }
            else {
                b()
            }
        },
        format: function(p) {
            if (k) {
                a(p)
            }
        },
        forceFormat: a,
        fixDateRepetition: c,
        disable: b,
        enable: d
    }
})();
document.observe("dom:loaded", TimestampFormatter.initialize.bind(TimestampFormatter));
var L10nManager = (function() {
    var m = Config.get("l10n_cookie_name");
    var k = Cookie.get(m);
    var a = Config.get("betting_disabled_countries");

    function g() {
        if ((Config.get("l10n") == "www") && Cookie.enabled()) {
            if (k) {
                d(k)
            }
            else {
                new Ajax.Request(Config.get("geo_script"), {
                    method: "get",
                    asynchronous: false,
                    onCreate: function(n) {
                        n.transport.setRequestHeader = Prototype.emptyFunction
                    },
                    onSuccess: function(n) {
                        d(n.responseText);
                        l(n.responseText)
                    }
                })
            }
        }
    }

    function d(o, n) {
        o = c(o);
        if (!e(o)) {
            o = Config.get("l10n");
            if (!e(o)) {
                o = Config.get("default_l10n")
            }
        }
        if (!n) {
            j(o)
        }
        if (o != Config.get("l10n")) {
            i(o)
        }
    }

    function j(o) {
        var n = new Date();
        n.setTime(n.getTime() + 30 * 24 * 60 * 60 * 1000);
        Cookie.set(Config.get("l10n_cookie_name"), o, {
            expires: n,
            path: "/",
            domain: Config.get("base_domain")
        })
    }

    function l(o) {
        var n = new Date();
        n.setTime(n.getTime() + 30 * 24 * 60 * 60 * 1000);
        Cookie.set("sw_l10org", o, {
            expires: n,
            path: "/",
            domain: Config.get("base_domain")
        })
    }

    function e(n) {
        return Config.get("valid_l10ns").include(n)
    }

    function c(n) {
        n = Config.get("localization_groups")[n] || n;
        return n
    }

    function i(n) {
        window.location.href = "http://" + n + "." + Config.get("base_domain") + b()
    }

    function b() {
        return window.location.href.match(/^http:\/\/.+?(\/.+?(\?.*)?)?$/)[1] || "/"
    }

    function f() {
        var n = Cookie.get("sw_l10org");
        var o = Cookie.get(Config.get("l10n_cookie_name"));
        if (!n && (o != "int")) {
            n = o
        }
        return a.include(n)
    }
    return {
        initialize: g,
        process: d,
        disableBetting: f
    }
})();
var UserManager = (function() {
    var c = Cookie.get(Config.get("username_cookie_name")),
        a = c;

    function b() {
        if (a) {
            var d = $("username-link");
            d.update(c).writeAttribute("href", d.readAttribute("href") + c + "/");
            $("logged-in-container").show()
        }
        else {
            $("logged-out-container").show()
        }
    }
    return {
        init: b
    }
})();
var LeagueTable = function(e) {
    e = $(e);
    if (e.up(".block").hasClassName("block_competition_league_table")) {
        var d = 0;
        $A(e.select('input[type="checkbox"]:checked')).each(function(f) {
            f.up("tr").addClassName("highlight");
            d += 1
        });
        var b = e.select("input.compare-button")[0];
        b.disabled = (d < 2);
        var a = function(f) {
            var g = f.element();
            var i = g.up("tr");
            if (g.checked) {
                if (d + 1 > 2) {
                    f.stop();
                    return
                }
                d += 1;
                i.addClassName("highlight")
            }
            else {
                d -= 1;
                i.removeClassName("highlight")
            }
            b.disabled = (d < 2)
        };
        e.select('input[type="checkbox"]').invoke("observe", "click", a.bindAsEventListener())
    }

    function c(f) {
        if (f.getAttribute("id").indexOf("competition_form_table") > 0) {
            return false
        }
        if (f.getAttribute("id").indexOf("competition_halftime_table") > 0) {
            return false
        }
        return true
    }
    if (c(e)) {
        Popupizer.setup(e.select('td[class*="total mp"]'), "competition_league_table_popup", {
            column: "mp"
        });
        Popupizer.setup(e.select('td[class*="total_won"]'), "competition_league_table_popup", {
            column: "total_won"
        });
        Popupizer.setup(e.select('td[class*="total_drawn"]'), "competition_league_table_popup", {
            column: "total_drawn"
        });
        Popupizer.setup(e.select('td[class*="total_lost"]'), "competition_league_table_popup", {
            column: "total_lost"
        });
        Popupizer.setup(e.select('td[class*="total_gf"]'), "competition_league_table_popup", {
            column: "total_gf"
        });
        Popupizer.setup(e.select('td[class*="total_ga"]'), "competition_league_table_popup", {
            column: "total_ga"
        });
        Popupizer.setup(e.select('td[class*="points"]'), "competition_league_table_popup", {
            column: "points"
        });
        new PopupManager(e)
    }
};
var PopupManager = Class.create({
    initialize: function(a) {
        this.el = a;
        this.el.on("click", "*[data-popup]", function(b, c) {
            this.showPopup(c)
        }.bind(this))
    },
    collectParams: function(b) {
        var d = {};

        function c(k) {
            var g = k.attributes;
            for (var j = 0, l = g.length; j < l; j++) {
                var e = g.item(j);
                if (e.nodeName.indexOf("data-") === 0) {
                    var f = e.nodeName.substring(5);
                    if (f != "popup") {
                        d[f] = e.nodeValue
                    }
                }
            }
        }
        c(b);
        var a = b;
        do {
            a = $(a.parentNode);
            c(a)
        } while (a != this.el);
        return d
    },
    showPopup: function(a) {
        var c = a.getAttribute("data-popup");
        if (!c) {
            return false
        }
        $scru.queue("popup:dragdrop", function() {
            new Draggable("popup", {
                starteffect: Prototype.emptyFunction,
                endeffect: Prototype.emptyFunction,
                handle: "handle",
                scroll: window,
                snap: function(d, f) {
                    if (d < 0) {
                        d = 0
                    }
                    if (f < 0) {
                        f = 0
                    }
                    var e = document.viewport.getWidth() - PopupElement.get().getWidth();
                    if (d > e) {
                        d = e
                    }
                    return [d, f]
                }
            })
        }, ["dragdrop"]);
        $scru.invoke("popup:dragdrop");
        var b = c.split(".");
        block_name = "block_" + b[0];
        block_action = b[1] ? b[1] : "updateContent";
        block_params = this.collectParams(a);
        PopupElement.show();
        PopupElement.get().addClassName("popup-loading");
        new Ajax.Request(Config.get("ajax_path") + "/" + block_name, {
            method: "get",
            parameters: {
                block_id: "",
                callback_params: Object.toJSON(block_params),
                action: block_action,
                params: Object.toJSON({})
            },
            onSuccess: function(f) {
                var d = f.responseJSON;
                var e = d.commands[0]["parameters"]["content"];
                PopupElement.get().removeClassName("popup-loading");
                PopupElement.update(e)
            }
        })
    }
});
var PopupElement = {
    get: function() {
        if (!this.el) {
            this.el = $("popup");
            this.el.select(".close-button").invoke("observe", "click", this.close.bind(this))
        }
        return this.el
    },
    show: function() {
        var c = this.get();
        var b = document.viewport.getScrollOffsets();
        var a = b.left + ((document.viewport.getWidth() - c.getWidth()) / 2),
            d = b.top + ((document.viewport.getHeight() - c.getHeight()) / 2);
        c.setStyle({
            left: a + "px",
            top: d + "px"
        });
        c.removeClassName("hidden");
        this.overlay = Overlay.drawOver(document.body, this.close.bind(this));
        c.show()
    },
    close: function() {
        var a = this.get();
        a.select(".content")[0].update("&nbsp;");
        a.addClassName("hidden");
        this.overlay.remove()
    },
    update: function(a) {
        this.el.select(".content")[0].update(a);
        TimestampFormatter.format(this.el)
    }
};
var Popupizer = {
    setup: function(b, a, c) {
        b.each(function(e) {
            if (e.innerHTML != "0" && e.innerHTML != "?") {
                e.setAttribute("data-popup", a);
                for (var d in c) {
                    e.setAttribute("data-" + d, c[d])
                }
            }
        })
    }
};
var ActiveDropdown = Class.create({
    initialize: function(c) {
        var a = {},
            b = {};
        c.el.on((Prototype.Browser.IE ? "click" : "change"), ".active-dropdown select", function(d, g) {
            var e = $(g.parentNode);
            if (d.type == "click") {
                var f = e.readAttribute("data-active-dropdown-id");
                if (b[f] != true) {
                    b[f] = true;
                    return
                }
                if (d.target.value == "") {
                    return
                }
                if (a[f] == d.target.value) {
                    return
                }
                a[f] = d.target.value
            }
            if (e.readAttribute("data-active-dropdown-last") == "1") {
                return
            }
            e.nextSiblings().each(function(i) {
                i.remove()
            });
            this.loadDropdown(c, g, e)
        }.bind(this))
    },
    loadDropdown: function(e, c, a) {
        if (c.value != "") {
            var d = {
                id: a.readAttribute("data-active-dropdown-id"),
                value: c.value,
                wrapper_id: $(a.parentNode).readAttribute("data-active-dropdown-wrapper-id")
            };
            var b = c.readAttribute("name");
            if (b) {
                d[b] = c.value
            }
            e.callback("loadDropdown", d, {});
            this.notifyObservers(d)
        }
    },
    observers: {},
    notifyObservers: function(a) {
        if (typeof(this.observers[a.id]) != "undefined") {
            this.observers[a.id].each(function(b) {
                b.call(this, a)
            })
        }
    },
    addObserver: function(b, a) {
        if (typeof(this.observers[b]) == "undefined") {
            this.observers[b] = []
        }
        this.observers[b].push(a)
    }
});
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
    var a = document.createElement("script");
    a.async = true;
    a.type = "text/javascript";
    var c = "https:" == document.location.protocol;
    a.src = (c ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
})();
googletag.cmd.push(function() {
    googletag.defineSlot("/6176201/Contextual_units_bottom", [557, 30], "div-gpt-ad-1325073145951-1").addService(googletag.pubads());
    googletag.defineSlot("/6176201/Sw_header_text", [240, 28], "div-gpt-ad-1325073145951-5").addService(googletag.pubads());
    googletag.defineSlot("/6176201/Sw_homepage_middle", [557, 40], "div-gpt-ad-1325073145951-6").addService(googletag.pubads());
    googletag.defineSlot("/6176201/News_bottom", [557, 30], "div-gpt-ad-1325624493142-0").addService(googletag.pubads());
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().enableSingleRequest();
    googletag.enableServices()
});
(function() {
    document.observe("dom:loaded", function() {
        _gaq = _gaq || [];
        var a = $$("body")[0].id;
        var b = function(c) {
            c.select("a").each(function(e, d) {
                e.observe("click", function(f) {
                    var g = c.className.match(/block_(\w+)/);
                    name = (g && g[1]) ? g[1] : "unknown";
                    _gaq.push(["_trackEvent", "adclick", a.substr(5) + " / " + name + " / " + (d + 1), this.href])
                })
            })
        };
        $$(".block_ad_news_bottom").each(b)
    })
})();
window.Modernizr = function(ap, ao, an) {
    function O() {
        al.input = function(e) {
            for (var d = 0, f = e.length; d < f; d++) {
                R[e[d]] = !!(e[d] in ae)
            }
            return R
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), al.inputtypes = function(b) {
            for (var l = 0, k, j, g, c = b.length; l < c; l++) {
                ae.setAttribute("type", j = b[l]), k = ae.type !== "text", k && (ae.value = ad, ae.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(j) && ae.style.WebkitAppearance !== an ? (aj.appendChild(ae), g = ao.defaultView, k = g.getComputedStyle && g.getComputedStyle(ae, null).WebkitAppearance !== "textfield" && ae.offsetHeight !== 0, aj.removeChild(ae)) : /^(search|tel)$/.test(j) || (/^(url|email)$/.test(j) ? k = ae.checkValidity && ae.checkValidity() === !1 : /^color$/.test(j) ? (aj.appendChild(ae), aj.offsetWidth, k = ae.value != ad, aj.removeChild(ae)) : k = ae.value != ad)), T[b[l]] = !!k
            }
            return T
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }

    function Q(f, e) {
        var i = f.charAt(0).toUpperCase() + f.substr(1),
            g = (f + " " + Z.join(i + " ") + i).split(" ");
        return !!S(g, e)
    }

    function S(e, c) {
        for (var f in e) {
            if (af[e[f]] !== an && (!c || c(e[f], ag))) {
                return !0
            }
        }
    }

    function U(d, c) {
        return ("" + d).indexOf(c) !== -1
    }

    function W(d, c) {
        return typeof d === c
    }

    function Y(d, c) {
        return aa(ab.join(d + ";") + (c || ""))
    }

    function aa(b) {
        af.cssText = b
    }
    var am = "1.7",
        al = {},
        ak = !0,
        aj = ao.documentElement,
        ai = ao.head || ao.getElementsByTagName("head")[0],
        ah = "modernizr",
        ag = ao.createElement(ah),
        af = ag.style,
        ae = ao.createElement("input"),
        ad = ":)",
        ac = Object.prototype.toString,
        ab = " -webkit- -moz- -o- -ms- -khtml- ".split(" "),
        Z = "Webkit Moz O ms Khtml".split(" "),
        X = {
            svg: "http://www.w3.org/2000/svg"
        },
        V = {},
        T = {},
        R = {},
        P = [],
        N, M = function(b) {
            var i = ao.createElement("style"),
                g = ao.createElement("div"),
                f;
            i.textContent = b + "{#modernizr{height:3px}}", ai.appendChild(i), g.id = "modernizr", aj.appendChild(g), f = g.offsetHeight === 3, i.parentNode.removeChild(i), g.parentNode.removeChild(g);
            return !!f
        },
        K = function() {
            function c(i, g) {
                g = g || ao.createElement(b[i] || "div");
                var a = (i = "on" + i) in g;
                a || (g.setAttribute || (g = ao.createElement("div")), g.setAttribute && g.removeAttribute && (g.setAttribute(i, ""), a = W(g[i], "function"), W(g[i], an) || (g[i] = an), g.removeAttribute(i))), g = null;
                return a
            }
            var b = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return c
        }(),
        J = ({}).hasOwnProperty,
        I;
    W(J, an) || W(J.call, an) ? I = function(d, c) {
        return c in d && W(d.constructor.prototype[c], an)
    } : I = function(d, c) {
        return J.call(d, c)
    }, V.flexbox = function() {
        function k(f, e, m, l) {
            f.style.cssText = ab.join(e + ":" + m + ";") + (l || "")
        }

        function b(f, e, m, l) {
            e += ":", f.style.cssText = (e + ab.join(m + ";" + e)).slice(0, -e.length) + (l || "")
        }
        var j = ao.createElement("div"),
            i = ao.createElement("div");
        b(j, "display", "box", "width:42px;padding:0;"), k(i, "box-flex", "1", "width:10px;"), j.appendChild(i), aj.appendChild(j);
        var g = i.offsetWidth === 42;
        j.removeChild(i), aj.removeChild(j);
        return g
    }, V.canvas = function() {
        var b = ao.createElement("canvas");
        return b.getContext && b.getContext("2d")
    }, V.canvastext = function() {
        return al.canvas && W(ao.createElement("canvas").getContext("2d").fillText, "function")
    }, V.webgl = function() {
        return !!ap.WebGLRenderingContext
    }, V.touch = function() {
        return "ontouchstart" in ap || M("@media (" + ab.join("touch-enabled),(") + "modernizr)")
    }, V.geolocation = function() {
        return !!navigator.geolocation
    }, V.postmessage = function() {
        return !!ap.postMessage
    }, V.websqldatabase = function() {
        var a = !!ap.openDatabase;
        return a
    }, V.indexedDB = function() {
        for (var a = -1, f = Z.length; ++a < f;) {
            var e = Z[a].toLowerCase();
            if (ap[e + "_indexedDB"] || ap[e + "IndexedDB"]) {
                return !0
            }
        }
        return !1
    }, V.hashchange = function() {
        return K("hashchange", ap) && (ao.documentMode === an || ao.documentMode > 7)
    }, V.history = function() {
        return !!(ap.history && history.pushState)
    }, V.draganddrop = function() {
        return K("dragstart") && K("drop")
    }, V.websockets = function() {
        return "WebSocket" in ap
    }, V.rgba = function() {
        aa("background-color:rgba(150,255,150,.5)");
        return U(af.backgroundColor, "rgba")
    }, V.hsla = function() {
        aa("background-color:hsla(120,40%,100%,.5)");
        return U(af.backgroundColor, "rgba") || U(af.backgroundColor, "hsla")
    }, V.multiplebgs = function() {
        aa("background:url(//:),url(//:),red url(//:)");
        return (new RegExp("(url\\s*\\(.*?){3}")).test(af.background)
    }, V.backgroundsize = function() {
        return Q("backgroundSize")
    }, V.borderimage = function() {
        return Q("borderImage")
    }, V.borderradius = function() {
        return Q("borderRadius", "", function(b) {
            return U(b, "orderRadius")
        })
    }, V.boxshadow = function() {
        return Q("boxShadow")
    }, V.textshadow = function() {
        return ao.createElement("div").style.textShadow === ""
    }, V.opacity = function() {
        Y("opacity:.55");
        return /^0.55$/.test(af.opacity)
    }, V.cssanimations = function() {
        return Q("animationName")
    }, V.csscolumns = function() {
        return Q("columnCount")
    }, V.cssgradients = function() {
        var e = "background-image:",
            d = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            f = "linear-gradient(left top,#9f9, white);";
        aa((e + ab.join(d + e) + ab.join(f + e)).slice(0, -e.length));
        return U(af.backgroundImage, "gradient")
    }, V.cssreflections = function() {
        return Q("boxReflect")
    }, V.csstransforms = function() {
        return !!S(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])
    }, V.csstransforms3d = function() {
        var b = !!S(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);
        b && "webkitPerspective" in aj.style && (b = M("@media (" + ab.join("transform-3d),(") + "modernizr)"));
        return b
    }, V.csstransitions = function() {
        return Q("transitionProperty")
    }, V.fontface = function() {
        var b, m, l = ai || aj,
            k = ao.createElement("style"),
            j = ao.implementation || {
                hasFeature: function() {
                    return !1
                }
            };
        k.type = "text/css", l.insertBefore(k, l.firstChild), b = k.sheet || k.styleSheet;
        var g = j.hasFeature("CSS2", "") ? function(a) {
            if (!b || !a) {
                return !1
            }
            var f = !1;
            try {
                b.insertRule(a, 0), f = /src/i.test(b.cssRules[0].cssText), b.deleteRule(b.cssRules.length - 1)
            }
            catch (e) {}
            return f
        } : function(a) {
            if (!b || !a) {
                return !1
            }
            b.cssText = a;
            return b.cssText.length !== 0 && /src/i.test(b.cssText) && b.cssText.replace(/\r+|\n+/g, "").indexOf(a.split(" ")[0]) === 0
        };
        m = g('@font-face { font-family: "font"; src: url(data:,); }'), l.removeChild(k);
        return m
    }, V.video = function() {
        var b = ao.createElement("video"),
            f = !!b.canPlayType;
        if (f) {
            f = new Boolean(f), f.ogg = b.canPlayType('video/ogg; codecs="theora"');
            var e = 'video/mp4; codecs="avc1.42E01E';
            f.h264 = b.canPlayType(e + '"') || b.canPlayType(e + ', mp4a.40.2"'), f.webm = b.canPlayType('video/webm; codecs="vp8, vorbis"')
        }
        return f
    }, V.audio = function() {
        var b = ao.createElement("audio"),
            d = !!b.canPlayType;
        d && (d = new Boolean(d), d.ogg = b.canPlayType('audio/ogg; codecs="vorbis"'), d.mp3 = b.canPlayType("audio/mpeg;"), d.wav = b.canPlayType('audio/wav; codecs="1"'), d.m4a = b.canPlayType("audio/x-m4a;") || b.canPlayType("audio/aac;"));
        return d
    }, V.localstorage = function() {
        try {
            return !!localStorage.getItem
        }
        catch (b) {
            return !1
        }
    }, V.sessionstorage = function() {
        try {
            return !!sessionStorage.getItem
        }
        catch (b) {
            return !1
        }
    }, V.webWorkers = function() {
        return !!ap.Worker
    }, V.applicationcache = function() {
        return !!ap.applicationCache
    }, V.svg = function() {
        return !!ao.createElementNS && !!ao.createElementNS(X.svg, "svg").createSVGRect
    }, V.inlinesvg = function() {
        var b = ao.createElement("div");
        b.innerHTML = "<svg/>";
        return (b.firstChild && b.firstChild.namespaceURI) == X.svg
    }, V.smil = function() {
        return !!ao.createElementNS && /SVG/.test(ac.call(ao.createElementNS(X.svg, "animate")))
    }, V.svgclippaths = function() {
        return !!ao.createElementNS && /SVG/.test(ac.call(ao.createElementNS(X.svg, "clipPath")))
    };
    for (var L in V) {
        I(V, L) && (N = L.toLowerCase(), al[N] = V[L](), P.push((al[N] ? "" : "no-") + N))
    }
    al.input || O(), al.crosswindowmessaging = al.postmessage, al.historymanagement = al.history, al.addTest = function(d, c) {
        d = d.toLowerCase();
        if (!al[d]) {
            c = !!c(), aj.className += " " + (c ? "" : "no-") + d, al[d] = c;
            return al
        }
    }, aa(""), ag = ae = null, ak && ap.attachEvent && function() {
        var b = ao.createElement("div");
        b.innerHTML = "<elem></elem>";
        return b.childNodes.length !== 1
    }() && function(F, E) {
        function q(i, g) {
            var m = -1,
                l = i.length,
                k, j = [];
            while (++m < l) {
                k = i[m], (g = k.media || g) != "screen" && j.push(q(k.imports, g), k.cssText)
            }
            return j.join("")
        }

        function r(d) {
            var c = -1;
            while (++c < B) {
                d.createElement(C[c])
            }
        }
        var D = "abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            C = D.split("|"),
            B = C.length,
            A = new RegExp("(^|\\s)(" + D + ")", "gi"),
            z = new RegExp("<(/*)(" + D + ")", "gi"),
            y = new RegExp("(^|[^\\n]*?\\s)(" + D + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
            x = E.createDocumentFragment(),
            w = E.documentElement,
            v = w.firstChild,
            u = E.createElement("body"),
            t = E.createElement("style"),
            s;
        r(E), r(x), v.insertBefore(t, v.firstChild), t.media = "print", F.attachEvent("onbeforeprint", function() {
            var b = -1,
                j = q(E.styleSheets, "all"),
                d = [],
                i;
            s = s || E.body;
            while ((i = y.exec(j)) != null) {
                d.push((i[1] + i[2] + i[3]).replace(A, "$1.iepp_$2") + i[4])
            }
            t.styleSheet.cssText = d.join("\n");
            while (++b < B) {
                var g = E.getElementsByTagName(C[b]),
                    f = g.length,
                    e = -1;
                while (++e < f) {
                    g[e].className.indexOf("iepp_") < 0 && (g[e].className += " iepp_" + C[b])
                }
            }
            x.appendChild(s), w.appendChild(u), u.className = s.className, u.innerHTML = s.innerHTML.replace(z, "<$1font")
        }), F.attachEvent("onafterprint", function() {
            u.innerHTML = "", w.removeChild(u), w.appendChild(s), t.styleSheet.cssText = ""
        })
    }(ap, ao), al._enableHTML5 = ak, al._version = am, aj.className = aj.className.replace(/\bno-js\b/, "") + " js " + P.join(" ");
    return al
}(this, this.document);
var GoalComFeedsDataprovider = (function() {
    var b = function(e, c) {
        if (!c) {
            var c = 3
        }
        var d = Config.get("top_most_feed_url");
        d += "&matchId=" + Number(e);
        d += "&limit=" + c;
        return d
    };
    var a = function(f, e, d) {
        var c = Config.get("goal_save_prediction");
        c += "&matchId=" + Number(f);
        c += "&homeScore=" + e;
        c += "&awayScore=" + d;
        return c
    };
    return {
        retriveScoreOdds: function(f, e, c, d) {
            CallbackManager.callbackBlock(null, "odds1x2", {
                match_id: f,
                bookmaker_ids: c,
                score: e
            }, d)
        },
        retrivePopularPredictions: function(e, c, d) {
            CallbackManager.callbackBlock(null, "popular_predictions", {
                match_id: e
            }, d)
        },
        savePredictionOnServer: function(f, e, d) {
            var c = a(f, e, d);
            CallbackManager.callbackJsonP(c)
        }
    }
})();
var Widget1x2Block = Class.create(Block, {
    timeout: 1,
    prediction_widget_odds: false,
    initialize: function($super, c, a, b) {
        if (!L10nManager.disableBetting()) {
            $super(c, a, b)
        }
        else {
            $(c).hide()
        }
    },
    postInitialize: function($super) {
        $super();
        if (this.params.get("timeout")) {
            this.timeout = this.params.get("timeout")
        }
        if (document.loaded) {
            this.reinitializeWidget()
        }
        else {
            document.observe("dom:loaded", function() {
                this.reinitializeWidget()
            }.bind(this))
        }
    },
    reinitializeWidget: function() {
        this.prediction_widget_odds = this.el.hasClassName("block_prediction_widget_odds");
        this.hideContainer();
        this.showHideSwitcherContainer(true);
        this.hideAllTr();
        if (this.prediction_widget_odds) {
            this.getScoreOdds()
        }
        else {
            this.getOddsFeed(this.params.get("goal_feed_url"))
        }
    },
    getOddsFeed: function(b) {
        var a = this;
        CallbackManager.callbackBlock(null, "odds1x2", {
            match_id: this.params.get("match_id"),
            bookmaker_ids: this.params.get("bookmaker_ids")
        }, {
            onSuccess: function(f, e) {
                var c = f.responseJSON;
                $ods_exists = false;
                if (c["1x2"]) {
                    for (var d in c["1x2"]) {
                        if (isNaN(d)) {
                            break
                        }
                        $ods_exists = true;
                        a.completeBookmakerTr(c["1x2"][d])
                    }
                }
                if ($ods_exists) {
                    a.handleWithPlacement();
                    if (a.prediction_widget_odds) {
                        a.el.select("div.prediction-widget-odds-container").first().setStyle({
                            display: "table-row"
                        })
                    }
                }
                else {
                    a.showHideSwitcherContainer()
                }
                a.cleanUp();
                a.showOneRandomly();
                a.displayContainer()
            },
            onException: function() {
                if (!a.showHideSwitcherContainer()) {
                    a.displayContainer()
                }
                a.cleanUp()
            }
        })
    },
    hideAllTr: function() {
        this.el.select("tr.bookmaker").each(function(a) {
            $(a).setStyle({
                display: "none"
            })
        });
        this.el.select("tr.bet-now-button-row").each(function(a) {
            $(a).setStyle({
                display: "none"
            })
        })
    },
    completeBookmakerPrediction: function(e) {
        var d = this.el.select("#bookmaker_id_" + e.bookmaker_id).first();
        var b = this;
        if (d) {
            d.setAttribute("completed", 1);
            var c = e.rate;
            d.setAttribute("data-rate", c);
            d.select("select.amounts option").first().setAttribute("selected", "selected");
            select = d.select("select.amounts").first();
            var a = function() {
                amount = this.value;
                var f = $(this);
                if (b.prediction_widget_odds) {
                    f.previous().update(f[f.selectedIndex].text)
                }
                var i = f.up("tr");
                var g = i.getAttribute("data-rate");
                i.select("span.predicted-value").first().update((amount * g).toFixed(2))
            };
            select.observe("change", a);
            a.call(select)
        }
    },
    completeBookmakerTr: function(c) {
        var b = this.el.select("#bookmaker_id_" + c.bookmaker_id).first();
        if (b) {
            b.setAttribute("completed", 1);
            b.select("span.rate_1").first().setAttribute("data-rate_1", c["1"]);
            b.select("span.rate_x").first().setAttribute("data-rate_x", c.x);
            b.select("span.rate_2").first().setAttribute("data-rate_1", c["2"]);
            b.select("select.amounts option").first().setAttribute("selected", "selected");
            select = b.select("select.amounts").first();
            var a = function() {
                amount = this.value;
                var d = $(this).up("tr");
                rate_1 = d.select("span.rate_1").first().getAttribute("data-rate_1");
                rate_x = d.select("span.rate_x").first().getAttribute("data-rate_x");
                rate_2 = d.select("span.rate_2").first().getAttribute("data-rate_1");
                d.select("span.rate_1").first().update((amount * rate_1).toFixed(2));
                d.select("span.rate_x").first().update((amount * rate_x).toFixed(2));
                d.select("span.rate_2").first().update((amount * rate_2).toFixed(2))
            };
            select.observe("change", a);
            a.call(select)
        }
    },
    cleanUp: function() {
        this.el.select("tr.bookmaker").each(function(a) {
            if (!$(a).hasAttribute("completed")) {
                $(a).remove()
            }
        })
    },
    handleWithPlacement: function() {
        if (this.params.get("display_container")) {
            var a = $(this.params.get("display_container"));
            a.innerHTML = "";
            a.addClassName("widget-replaced");
            a.insert(this.el)
        }
    },
    displayContainer: function() {
        if (this.params.get("display_container")) {
            var a = $(this.params.get("display_container"));
            a.setStyle({
                display: "block"
            })
        }
    },
    showOneRandomly: function() {
        var b = this.el.select("tr.bookmaker");
        length = b.length;
        if (0 < length) {
            var a = Math.floor(Math.random() * length);
            b[a].setStyle({
                display: "table-row"
            });
            if (this.el.select("tr.bet-now-button-row").length > 0) {
                b[a].next("tr.bet-now-button-row").setStyle({
                    display: "table-row"
                })
            }
        }
    },
    hideContainer: function() {
        if (this.params.get("display_container")) {
            var a = $(this.params.get("display_container"));
            a.hide()
        }
    },
    showHideSwitcherContainer: function(a) {
        if (this.params.get("switch_container")) {
            if (a) {
                $(this.params.get("switch_container")).hide()
            }
            else {
                $(this.params.get("switch_container")).setStyle({
                    display: "block"
                })
            }
            return true
        }
        return false
    },
    getScoreOdds: function() {
        var a = function(c) {
            var b = c.responseJSON;
            if (b.score) {
                b.score.each(function(d) {
                    this.completeBookmakerPrediction(d)
                }.bind(this));
                this.handleWithPlacement();
                this.el.select("div.prediction-widget-odds-container").first().setStyle({
                    display: "block"
                });
                this.cleanUp();
                this.showOneRandomly();
                this.displayContainer()
            }
        }.bind(this);
        GoalComFeedsDataprovider.retriveScoreOdds(this.params.get("match_id"), this.params.get("predicted_score").join("-"), this.params.get("bookmaker_ids"), {
            onSuccess: a
        })
    }
});
var WidgetDefaultBlock = Class.create(Block, {
    initialize: function($super, c, a, b) {
        if (!L10nManager.disableBetting()) {
            $super(c, a, b)
        }
        else {
            $(c).hide()
        }
    },
    postInitialize: function($super) {
        $super();
        document.observe("dom:loaded", function() {
            this.hideAllTr();
            this.showOneRandomly()
        }.bind(this))
    },
    showOneRandomly: function() {
        var a = $$("table.widget-default tr").size();
        if (0 < a) {
            ran = Math.floor(Math.random() * a) + 1;
            $$("table.widget-default tr:nth-child(" + ran + ")").first().setStyle({
                display: "inline"
            })
        }
    },
    hideAllTr: function() {
        $$("table.widget-default tr").each(function(a) {
            $(a).setStyle({
                display: "none"
            })
        })
    }
});
var PredictionWidget = Class.create(Block, {
    block_parent: null,
    initialize: function($super, c, a, b) {
        if (!L10nManager.disableBetting()) {
            $super(c, a, b)
        }
        else {
            $(c).hide()
        }
    },
    postInitialize: function($super) {
        $super();
        this.block_parent = this.el.up(".block");
        this.block_parent.observe("click", Event.delegate({
            "a.prediction-match-picker": this.showHideMatches.bindAsEventListener(this)
        }));
        this.el.observe("click", Event.delegate({
            "div#prediction-matches-list li": this.fetchSelectedMatch.bindAsEventListener(this)
        }));
        this.el.observe("click", Event.delegate({
            "button.prediction-button": this.savePrediction.bindAsEventListener(this)
        }));
        this.el.observe("change", Event.delegate({
            "select.prediction-select": this.updateScore.bindAsEventListener(this)
        }));
        document.observe("dom:loaded", function() {
            this.checkIfPredicted()
        }.bind(this))
    },
    fetchSelectedMatch: function(a) {
        var b = a.target;
        var c = b.readAttribute("data-match_id");
        this.el.select("div#prediction-matches-list li.selected").each(function(d) {
            d.removeClassName("selected")
        });
        b.addClassName("selected");
        if (!isNaN(c)) {
            this.params.set("match_id", c);
            this.el.select("div.team-a div.prediction-container").first().update(b.select("div.team_A_container").first().innerHTML);
            this.el.select("div.team-b div.prediction-container").first().update(b.select("div.team_B_container").first().innerHTML);
            this.updateMatchPrediction();
            this.resetScoresPicker();
            this.el.select("div#prediction-widget-odds").first().hide();
            this.displayInfoAfterSubmit(false);
            this.checkIfPredicted();
            this.reloadMostPopularWidget()
        }
    },
    resetScoresPicker: function() {
        this.disablePredictorSelects(false);
        this.diablePredictorButton(false);
        this.el.select("select.prediction-select").each(function(a) {
            a.selectedIndex = 0
        });
        this.updateScore()
    },
    showHideMatches: function(a) {
        a.stop();
        this.updateMatchPrediction();
        return false
    },
    updateMatchPrediction: function() {
        var b = this.block_parent.select("a.prediction-match-picker").first();
        var a = this.el.select("div#prediction-matches-list").first();
        if (a.hasClassName("active")) {
            a.removeClassName("active");
            b.removeClassName("active")
        }
        else {
            a.addClassName("active");
            b.addClassName("active")
        }
        $scru.execute(function() {
            Effect.toggle(a, "blind", {
                duration: 0.5
            })
        }, ["effects"])
    },
    updateScore: function() {
        var a = false;
        this.el.select("select.prediction-select").each(function(b) {
            b.previous().update(b.value);
            if (isNaN(b.value)) {
                a = true
            }
        });
        this.diablePredictorButton(a)
    },
    savePrediction: function(a) {
        this.diablePredictorButton(true);
        this.disablePredictorSelects(true);
        var b = "";
        this.el.select("select.prediction-select").each(function(c) {
            if (b != "") {
                b += ";"
            }
            b = b + String(Number(c.value))
        });
        this.saveCookieOfMatch(b);
        this.storePrediction(b)
    },
    saveCookieOfMatch: function(c) {
        var a = new Date();
        var b = this.getCookieName();
        a.setTime(a.getTime() + 60 * 24 * 60 * 60 * 1000);
        Cookie.set(b, c, {
            expires: a,
            path: "/",
            domain: Config.get("base_domain")
        })
    },
    storePrediction: function(a) {
        var b = a.split(";");
        GoalComFeedsDataprovider.savePredictionOnServer(this.params.get("match_id"), b[0], b[1]);
        this.callbackOdds(a);
        this.displayInfoAfterSubmit(true)
    },
    checkIfPredicted: function() {
        var b = this.getCookieName();
        var a = Cookie.get(b);
        if (a) {
            this.diablePredictorButton(true);
            this.disablePredictorSelects(true);
            this.updatePickerFromCookie(a);
            this.callbackOdds(a);
            return false
        }
        return true
    },
    getCookieName: function() {
        return "pwmid_" + this.params.get("match_id")
    },
    disablePredictorSelects: function(a) {
        this.el.select("select.prediction-select").each(function(b) {
            b.writeAttribute("disabled", a);
            if (a) {
                b.up("div.prediction-score-picker").addClassName("disabled")
            }
            else {
                b.up("div.prediction-score-picker").removeClassName("disabled")
            }
        })
    },
    diablePredictorButton: function(a) {
        this.el.select("button.prediction-button").first().writeAttribute("disabled", a)
    },
    updatePickerFromCookie: function(b) {
        var a = String(b).split(";");
        this.el.select("div.score-container").each(function(d, c) {
            d.innerHTML = a[c]
        })
    },
    displayInfoAfterSubmit: function(a) {
        if (a) {
            this.el.select("div.prediction-widget-submited").first().show()
        }
        else {
            this.el.select("div.prediction-widget-submited").first().hide()
        }
    },
    callbackOdds: function(a) {
        var c = this.params.get("match_id");
        var b = function(d) {
            $("prediction-widget-odds").show()
        };
        CallbackManager.callbackBlock($("prediction-widget-odds"), "prediction_widget_odds", {
            match_id: c,
            predicted_score: a,
            prediction_page: this.params.get("prediction_page")
        }, {
            onSuccess: b
        })
    },
    reloadMostPopularWidget: function() {
        var a = this.params.get("match_id");
        CallbackManager.callbackBlock(this.el.select("div.prediction-widget-popular-container").first(), "prediction_widget_popular", {
            match_id: a,
            prediction_page: this.params.get("prediction_page")
        }, {})
    }
});
var PredictionWidgetPopular = Class.create(Block, {
    random_link: null,
    initialize: function($super, c, a, b) {
        if (!L10nManager.disableBetting()) {
            $super(c, a, b)
        }
        else {
            $(c).hide()
        }
    },
    postInitialize: function($super) {
        $super();
        this.setRandomLink();
        if (document.loaded) {
            this.retrievePopularPredictions()
        }
        else {
            document.observe("dom:loaded", function() {
                this.retrievePopularPredictions()
            }.bind(this))
        }
    },
    setRandomLink: function() {
        var b = this.params.get("bookmakers");
        if (b.length) {
            var a = Math.floor(Math.random() * b.length);
            this.random_link = b[a]
        }
    },
    retrievePopularPredictions: function() {
        GoalComFeedsDataprovider.retrivePopularPredictions(this.params.get("match_id"), 3, {
            onSuccess: this.postRetrieveData.bind(this)
        })
    },
    postRetrieveData: function(a) {
        a = a.responseJSON;
        if (typeof a === "object" && a.result && a.result.length > 0) {
            var b = [];
            a.result.each(function(c) {
                b.push(c.score.home + "-" + c.score.away)
            });
            GoalComFeedsDataprovider.retriveScoreOdds(this.params.get("match_id"), b.join(","), [this.random_link.bookmaker_id], {
                onSuccess: function(c) {
                    this.postRetrieveOdds(c.responseJSON, a)
                }.bind(this)
            })
        }
    },
    postRetrieveOdds: function(b, a) {
        var c = this.el.select("div.prediction-widget-popular-container").first();
        var d = false;
        b = this.prepareResult(b);
        a.result.each(function(f) {
            var g = f.score.home + "-" + f.score.away;
            var e = this.el.select("div.template-row .popular-item").first().clone(true);
            e.select("div.match-teams-result span.predicted-result").first().update(g);
            e.select("div.chart-bar span.chart-bar-value").first().update(f.percentage + "%");
            e.select("div.chart-bar-progress").first().setStyle({
                width: f.percentage + "%"
            });
            e.select("div.odd-value span").first().update(this.parseOddsForScore(g, b));
            e.select("div.bet-now-button-container a").first().writeAttribute("href", this.random_link.link);
            e.select("div.bet-now-button-container").first().writeAttribute("data-bookmaker", this.random_link.name);
            if (d) {
                e.addClassName("even")
            }
            d = !d;
            c.insert(e)
        }.bind(this));
        c.show();
        this.el.up("div.block").setStyle({
            display: "block"
        })
    },
    parseOddsForScore: function(b, a) {
        if (typeof a[b] != "undefined") {
            if (a[b] && a[b].rate) {
                return Number(a[b].rate).toFixed(2)
            }
        }
        return "0.00"
    },
    prepareResult: function(a) {
        var b = {};
        if (a && a.score) {
            a.score.each(function(c) {
                b[c.score] = c
            })
        }
        return b
    }
});
(function(b, a, c) {
    var d = function(f) {
        c(".custom-dropdown.opened").each(function() {
            var j = f.keyCode == 38 || f.keyCode == 40;
            var g = j && f.keyCode == 38 ? true : false;
            if (j) {
                var l = c("li.selected", this);
                var k;
                if (l.length > 0) {
                    l.removeClass("selected");
                    var k = g ? l.prev() : l.next();
                    if (k.length == 0) {
                        k = l.parents("li").first();
                        k = g ? k.prev() : k.next();
                        if (k.length == 0) {
                            k = l
                        }
                    }
                    if (k.children().length > 0) {
                        k = g ? k.find("ul li").last() : k.find("ul li").first()
                    }
                }
                else {
                    k = c("ul li", this).first()
                }
                k.addClass("selected");
                c("ul", this).scrollTop(c("ul li", this).first().offset().top);
                var i = k.offset().top - c("ul li", this).first().offset().top;
                c("ul", this).scrollTop(i);
                f.preventDefault()
            }
        })
    };
    c(a).unbind("keydown", d).bind("keydown", d);
    var e = function(f) {
        if (f.keyCode == 13 && c(".custom-dropdown.opened li.selected").length) {
            c(".custom-dropdown.opened li.selected").click()
        }
    };
    c(a).unbind("keypress", e).bind("keypress", e);
    c.fn.extend({
        customDropdown: function(i) {
            var g = {
                openClass: "opened",
                hiddenClass: "hidden",
                callback: function() {
                    return c(this).text()
                }
            };
            var f = c.extend({}, g, i);
            return this.each(function() {
                var m = c(this).addClass(f.hiddenClass);
                var j = c();
                var l = c();
                var k = c();
                var p = m.wrap('<div class="custom-dropdown">').parent();
                var n = [];
                j = c('<div class="label-wrapper"><span class="selector"></span><div class="label"><span class="text">' + m.find(":selected").text() + "</span></div></div>").appendTo(p);
                l = c('<ul class="list hidden"></ul>').appendTo(p);

                function q() {
                    p.removeClass(f.openClass)
                }

                function o(r) {
                    return r == "" ? "" : 'data-value="' + r + '"'
                }
                m.children().each(function() {
                    if (this.tagName === "OPTGROUP") {
                        n.push('<li><span class="optgroup-label">' + c(this).attr("label") + "</span><ul>");
                        c(this).children("option").each(function() {
                            n.push("<li " + o(c(this).val()) + ">" + f.callback.call(this) + "</li>")
                        });
                        n.push("</ul></li>")
                    }
                    else {
                        n.push("<li " + o(c(this).val()) + ">" + f.callback.call(this) + "</li>")
                    }
                });
                l.html(n.join(""));
                k = l.find('[data-value="' + m.find(":selected").val() + '"]');
                j.find(".label").html(k.html());
                c("html").on("click", q);
                j.on("click", function(r) {
                    r.stopPropagation();
                    c(".custom-dropdown .label-wrapper").not(this).parents(".custom-dropdown").removeClass(f.openClass);
                    p.toggleClass(f.openClass)
                });
                p.on("click", "li[data-value]", function() {
                    m.val(c(this).data("value")).change();
                    j.find(".label").html(c(this).html());
                    q()
                })
            })
        }
    })
}(window, document, jQuery));
(function(b, a, c) {
    c.fn.extend({
        omnitureBettingTracking: function() {
            var d = s_gi(s_account);
            var e = c(this).closest("[data-bookmaker]").attr("data-bookmaker");
            var f = "Betting:" + e + ":" + d.pageType + ":" + d.pageName;
            d.tl(this, "o", f)
        },
    })
}(window, document, jQuery));
(function(c, a, d) {
    d.extend(d.expr[":"], {
        startWith: function(g, f, e, j) {
            return (g.textContent || g.innerText || "").toLowerCase().indexOf((e[3] || "").toLowerCase()) == 0
        }
    });
    var b = function(e) {
        d('[data-searchable="1"]').each(function() {
            d(this).trigger("searchByKey", e)
        })
    };
    d(a).unbind("keypress", b).bind("keypress", b);
    d.fn.extend({
        searchByKeyChar: function(k) {
            var i = d.extend({}, {
                isSearchAble: function() {
                    return true
                },
                dataSelector: "ul li",
                scrollSelector: "ul",
                selectedClass: "selected",
                filterData: function() {
                    return true
                }
            }, k);
            var f = void 0;
            var e = void 0;
            var j = "";
            var l = function(m) {
                if (typeof m.which == "undefined") {
                    return true
                }
                else {
                    if (typeof m.which == "number" && m.which > 0) {
                        return !m.ctrlKey && !m.metaKey && !m.altKey && m.which != 8 && m.which != 13
                    }
                }
                return false
            };
            var g = function(m) {
                if (m.which == 32) {
                    evn.preventDefault()
                }
            };
            return this.each(function() {
                d(this).attr("data-searchable", 1);
                d(this).data("text", "");
                d(this).bind("searchByKey", function(m, n) {
                    if (!i.isSearchAble.call(this) || !l(n)) {
                        return
                    }
                    g(n);
                    j += String.fromCharCode(n.which);
                    clearTimeout(e);
                    e = setTimeout(function() {
                        var p = d(i.dataSelector + ":startWith(" + j + ")", this);
                        p = p.filter(i.filterData);
                        if (p.length) {
                            d("." + i.selectedClass, this).removeClass(i.selectedClass);
                            p.first().addClass(i.selectedClass);
                            d(i.scrollSelector, this).scrollTop(d(i.dataSelector, this).first().offset().top);
                            var o = p.first().offset().top - d(i.dataSelector, this).first().offset().top;
                            d(i.scrollSelector, this).scrollTop(o)
                        }
                    }.call(this), 400);
                    clearTimeout(f);
                    f = setTimeout(function() {
                        return j = ""
                    }, 800)
                })
            })
        },
    })
}(window, document, jQuery));