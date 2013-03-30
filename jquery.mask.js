 /**
 * jquery.mask.js
 * @version: v0.7.8
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {
    "use strict";
    var  e;
    var Mask = function (el, mask, options) {
        var plugin = this,
            $el = $(el),
            defaults = {
                byPassKeys: [8, 9, 37, 38, 39, 40],
                maskChars: {':': ':', '-': '-', '.': '\\\.', '(': '\\(', ')': '\\)', '/': '\/', ',': ',', '_': '_', ' ': '\\s', '+': '\\\+'},
                translationNumbers: {0: '\\d', 1: '\\d', 2: '\\d', 3: '\\d', 4: '\\d', 5: '\\d', 6: '\\d', 7: '\\d', 8: '\\d', 9: '\\d'},
                translation: {'A': '[a-zA-Z0-9]', 'S': '[a-zA-Z]'}
            };

        plugin.init = function() {
            plugin.settings = {};
            options = options || {};

            defaults.translation = $.extend({}, defaults.translation, defaults.translationNumbers)
            plugin.settings = $.extend(true, {}, defaults, options);
            plugin.settings.specialChars = $.extend({}, plugin.settings.maskChars, plugin.settings.translation);

            $el.each(function() {
                mask = __p.resolveMask();
                $el.attr('maxlength', mask.length);
                $el.attr('autocomplete', 'off');

                __p.destroyEvents();
                __p.setOnKeyUp();
                __p.setOnPaste();    
            });
        };

        var __p = {
            resolveMask: function() {
                return typeof mask == "function" ? mask(__p.getVal(), e, options) : mask;
            },
            onPasteMethod: function() {
                setTimeout(function() {
                    $el.trigger('keyup');
                }, 100);
            },
            setOnPaste: function() {
                __p.hasOnSupport() ? $el.on("paste", __p.onPasteMethod) : $el.get(0).addEventListener("paste", __p.onPasteMethod, false);
            },
            setOnKeyUp: function() {
                $el.keyup(__p.maskBehaviour).trigger('keyup');
            },
            setVal: function(v) {
                return $el.val(v);
            },
            getVal: function() {
                return $el.val();
            },
            hasOnSupport: function() {
                return $.isFunction($().on);
            },
            destroyEvents: function() {
                $el.unbind('keyup').unbind('onpaste');
            },
            maskBehaviour: function(e) {
                e = e || window.event;
                var keyCode = e.keyCode || e.which, newVal;

                if ($.inArray(keyCode, plugin.settings.byPassKeys) > -1) return true;

                var cleanVal = __p.cleanBullShit(__p.getVal(), mask),
                    digitIdx = __p.getVal().length-1,
                    digitVal = __p.getVal()[digitIdx],
                    pMask = __p.getMask(cleanVal, mask);

                if (digitVal === mask[digitIdx] && plugin.settings.maskChars[digitVal]) {
                    __p.setVal(cleanVal !== "" ? cleanVal += digitVal : cleanVal);
                    return true;
                } 

                newVal = __p.applyMask(e, pMask);

                if (newVal !== __p.getVal())
                    __p.setVal(newVal).trigger('change');

                return __p.seekCallbacks(e, newVal);
            },
            applyMask: function (e, mask) {
                if(mask === "") return; 

                var oVal = __p.cleanBullShit(__p.getVal(), mask).substring(0, mask.length),
                    maskRegex = new RegExp(__p.maskToRegex(mask));

                return oVal.replace(maskRegex, function() {
                    for (var i = 1, newVal = ''; i < arguments.length - 2; i++) {
                        if (typeof arguments[i] === "undefined" || arguments[i] === "")
                            arguments[i] = mask.charAt(i-1);
                        newVal += arguments[i];
                    }
                  return newVal;
                });
            },
            getMask: function (cleanVal) {
                var proportional = function(oVal) {
                    var endMask = 0, m = 0;

                    while (m <= oVal.length-1){
                        while(plugin.settings.maskChars[mask.charAt(endMask)])
                            endMask++;
                        endMask++;
                        m++;
                    }

                    return mask.substring(0, endMask);
                };
                var proportionalReverse = function (oVal) {
                    var startMask = 0, endMask = 0, m = 0, mLength = mask.length;
                    startMask = (mLength >= 1) ? mLength : mLength-1;
                    endMask = startMask;

                    while (m <= oVal.length-1) {
                        while (plugin.settings.maskChars[mask.charAt(endMask-1)])
                            endMask--;
                        endMask--;
                        m++;
                    }

                    endMask = (mask.length >= 1) ? endMask : endMask-1;
                    return mask.substring(startMask, endMask);
                };

                return (typeof options.reverse == "boolean" && options.reverse === true) ?
                        proportionalReverse(cleanVal) :
                        proportional(cleanVal);
            },
            maskToRegex: function (mask) {
                for (var i = 0, regex = ''; i < mask.length; i ++) {
                    var specialChar = plugin.settings.specialChars[mask.charAt(i)];
                    if (specialChar) regex += "(" + specialChar + ")";
                    if (plugin.settings.maskChars[mask.charAt(i)]) regex += "?"
                }

                return regex;
            },
            validDigit: function (nowMask, nowDigit) {
                var regex = "(" + plugin.settings.specialChars[nowMask] + ")";
                if (plugin.settings.maskChars[nowMask]) regex += "?";
                return new RegExp(regex).test(nowDigit);
            },
            cleanBullShit: function (newVal, mask, index) {
                index = index || 0;
                newVal = newVal.split('');
                for (var i = index, m = index, mLen = mask.length, valueLen = newVal.length; i < mLen; i++, m++) {
                    while(plugin.settings.maskChars[mask.charAt(m)]) m++;
                    
                    if (!__p.validDigit(mask.charAt(m), newVal[i]) && typeof newVal[i] !== "undefined") {
                        newVal[i] = '';
                        newVal = newVal.join('');
                        return __p.cleanBullShit(newVal, __p.getMask(newVal, mask), 0);
                    } 
                }
                return newVal.join('');
            },
            seekCallbacks: function (e, newVal) {
                if (options.onKeyPress && e.isTrigger === undefined && 
                    typeof options.onKeyPress == "function")
                        options.onKeyPress(newVal, e, $el, options);

                if (options.onComplete && e.isTrigger === undefined &&
                    newVal.length === mask.length && typeof options.onComplete == "function")
                        options.onComplete(newVal, e, $el, options);
            }
        };

        // qunit private methods testing
        if (typeof QUNIT === "boolean") plugin.__p = __p;

        // public methods
        plugin.remove = function() {
          __p.destroyEvents();
          __p.setVal(__p.getVal().replace(/\D+/g, ''));
        };

        plugin.init();
    };

    $.fn.mask = function(mask, options) {
        return this.each(function() {
            $(this).data('mask', new Mask(this, mask, options));
        });
    };

})(jQuery);