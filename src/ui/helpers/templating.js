// https://github.com/jcgregorio/stamp/wiki

var Stamp = Stamp || {};

(function(ns) {

  ns.Context = function() {
  };

  ns.Context.prototype.import = function(id) {
    return document.importNode(this.doc.querySelector('#'+id).content, true);
  };

  var re = /{{\s([\w\.\^]+)\s}}/g;

  function filterState(address, state) {
    var mystate = state;
    for (var i = 0, len = address.length; i < len; i++) {
      var a = address[i];
      if (a in mystate) {
        mystate = mystate[a];
      } else if (mystate.hasAttribute && mystate.hasAttribute(a)) {
        mystate = mystate.getAttribute(a);
      } else {
        throw a + " is not a valid property of " + JSON.stringify(mystate);
      }
    }
    return mystate;
  }

  function ssplice(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
  }

  let match;
  function addressOf(s) {
    if ((match = re.exec(s)) != null) {
      return match[1].split(".");
    } else {
      return null;
    }
  }

  function expandString(s, state) {
    var match;
    var matches = [];
    re.exec("");
    while ((match = re.exec(s)) != null) {
      matches.push(match);
    }

    for (var i = matches.length - 1; i >= 0; i--) {
      match = matches[i];
      var address = match[1].split(".");
      var m = filterState(address, state);
      s = ssplice(s, match.index, match[0].length, m);
    }
    if (matches.length) {
      return s;
    }
    return null;
  }

  function cloneAllNodes(a) {
    var clones = [];
    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i].nodeName == "TEMPLATE") {
        clones.push(a[i].content.cloneNode(true));
      } else {
        clones.push(a[i].cloneNode(true));
      }
    }
    return clones;
  }

  function appendChildren(ele, nodes) {
    for (var i = 0, len = nodes.length; i < len; i++) {
      ele.appendChild(nodes[i]);
    }
  }

  function removeChildren(ele) {
    ele.innerHTML = "";
  }

  function replaceChildren(ele, nodes) {
    ele.innerHTML = "";
    appendChildren(ele, nodes);
  }

  function expand(ele, state) {
    if (ele.nodeName === "#text") {
      m = expandString(ele.textContent, state);
      if (m != null) {
        ele.textContent = m;
      }
      return ele;
    }
    if (!Array.isArray(ele)) {
      ele = [ele];
    }
    for (var j = 0, len = ele.length; j < len; j++) {
      var e = ele[j];
      var processChildren = true;
      if (e.nodeName === "#text") {
        m = expandString(e.textContent, state);
        if (m != null) {
          e.textContent = m;
        }
      } else {
        if (e.attributes != undefined) {
          for (var i = e.attributes.length-1; i >= 0; i--) {
            var attr = e.attributes[i];
            if (attr.name.indexOf('data-repeat') === 0) {
              processChildren = false;
              var parts = attr.name.split('-');
              if (parts.length !== 3 && parts.length !== 4) {
                throw "Repeat format is data-repeat-<name>[-<iterName>]. Got " + attr.name;
              }
              var name = parts[2];
              var iterName = parts[3];
              var tpl = [];
              while (e.firstChild) {
                tpl.push(e.removeChild(e.firstChild));
              }
              var address = [attr.value];
              if (attr.value.indexOf("}}") !== -1) {
                address = addressOf(attr.value);
              }
              if (address === null) {
                throw attr.value + " doesn't contain an address.";
              }
              var childState = filterState(address, state);
              var instanceState = {
                "^": state,
              };
              if (Object.prototype.toString.call( childState) === '[object Array]') {
                iterName = iterName || "i";
                for (var k = 0; k < childState.length; k++) {
                  var cl = cloneAllNodes(tpl);
                  instanceState[name] =  childState[k];
                  instanceState[iterName] = k;
                  expand(cl, instanceState);
                  appendChildren(e, cl);
                }
              } else {
                iterName = iterName || "key";
                var keys = Object.keys(childState).sort();
                for (var m = 0; m < keys.length; m++) {
                  var key = keys[m];
                  var cl = cloneAllNodes(tpl);
                  instanceState[name] = childState[key];
                  instanceState[iterName] = key;
                  expand(cl, instanceState);
                  appendChildren(e, cl);
                }
              }
              e.removeAttribute(attr.name);
            } else {
              m = expandString(attr.value, state);
              if (m != null) {
                var name = attr.name;
                if (name.charAt(name.length-1) == "-") {
                  e.removeAttribute(attr.name);
                  e.setAttribute(attr.name.slice(0, -1), m);
                } else {
                  attr.value = m;
                }
              }
            }
          }
        }
      }
      if (processChildren) {
        var childEle = e.firstChild;
        while (childEle != null) {
          var nextSibling = childEle.nextSibling;
          if (childEle.nodeName == "TEMPLATE") {
            var replacement = expand(childEle.content.cloneNode(true), state);
            while (replacement[0].childNodes.length > 0) {
              e.insertBefore(replacement[0].firstChild, childEle);
            }
            e.removeChild(childEle);
          } else {
            expand(childEle, state);
          }
          childEle = nextSibling;
        }
      }
    }
    return ele;
  };

  function expandInto(target, ele, state) {
    replaceChildren(target, expand(ele, state));
  }

  ns.appendChildren = appendChildren;
  ns.expand = expand;
  ns.expandInto = expandInto;
})(Stamp);

export const renderTemplate = (context, content, parent, clone) => {
    const contentClone = clone || document.importNode(content, true);    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(contentClone, context);
    Stamp.appendChildren(parent, expanded);
};