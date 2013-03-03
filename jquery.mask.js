 /**
 * jquery.mask.js
 * @version: v0.7.4
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
                mask = __p.resolveDynamicMask(mask, $(this).val(), e, $(this), options);
                $el.attr('maxlength', mask.length);
                $el.attr('autocomplete', 'off');

                __p.destroyEvents();
                __p.setOnKeyUp();
                __p.setOnPaste();    
            });
        };

        var __p = {
            resolveDynamicMask: function(mask, oValue, e, currentField, options) {
                return typeof mask == "function" ? mask(oValue, e, currentField, options) : mask;
            },
            onlyNonMaskChars: function(string) {
                $.each(plugin.settings.maskChars, function(k,v){
                    string = string.replace(new RegExp("(" + plugin.settings.maskChars[k] + ")?", 'g'), '')
                });
                return string;
            },
            onPasteMethod: function() {
                setTimeout(function() {
                    $el.trigger('keyup');
                }, 100);
            },
            setOnPaste: function() {
                (__p.hasOnSupport()) ? $el.on("paste", __p.onPasteMethod) : $el.onpaste = __p.onPasteMethod;
            },
            setOnKeyUp: function() {
                $el.keyup(__p.maskBehaviour).trigger('keyup');
            },
            hasOnSupport: function() {
                return $.isFunction($.on);
            },
            destroyEvents: function() {
                $el.unbind('keyup').unbind('onpaste');
            },
            maskBehaviour: function(e) {
                e = e || window.event;
                var keyCode = e.keyCode || e.which;

                if ($.inArray(keyCode, plugin.settings.byPassKeys) > -1)  return true;

                var oCleanedValue = __p.onlyNonMaskChars($el.val()),
                    nowDigitIndex = $el.val().length-1,
                    nowDigitValue = $el.val()[nowDigitIndex],
                    pMask = __p.getMask(oCleanedValue, mask);

                if (nowDigitValue === mask[nowDigitIndex] && plugin.settings.maskChars[nowDigitValue]) {
                    var cleanedValue = __p.cleanBullShit($el.val(), mask);
                    if (cleanedValue !== "") cleanedValue += nowDigitValue;
                    $el.val(cleanedValue);
                    return true;
                } 

                var oNewValue = __p.applyMask(e, $el, pMask, options);

                if (oNewValue !== $el.val()){
                    $el.val(oNewValue).trigger('change');
                }
                  
                return __p.seekCallbacks(e, options, oNewValue, mask, $el);
            },
            applyMask: function (e, fieldObject, mask, options) {
                if(mask === "") return; 

                var oValue = __p.cleanBullShit(__p.onlyNonMaskChars(fieldObject.val()).substring(0, __p.onlyNonMaskChars(mask).length), mask),
                    maskRegex = new RegExp(__p.maskToRegex(__p.getMask(oValue, mask)));

                return oValue.replace(maskRegex, function() {
                    for (var i = 1, oNewValue = ''; i < arguments.length - 2; i++) {
                        if (typeof arguments[i] === "undefined" || arguments[i] === "")
                            arguments[i] = mask.charAt(i-1);
                        oNewValue += arguments[i];
                    }
                  return oNewValue;
                });
            },
            getMask: function (oCleanedValue, mask) {
                return (typeof options.reverse == "boolean" && options.reverse === true) ?
                        __p.getProportionalReverseMask(oCleanedValue, mask) :
                        __p.getProportionalMask(oCleanedValue, mask);
            },
            getProportionalMask: function (oValue, mask) {
                var endMask = 0, m = 0;

                while (m <= oValue.length-1){
                    while(plugin.settings.maskChars[mask.charAt(endMask)])
                        endMask++;
                    endMask++;
                    m++;
                }

                return mask.substring(0, endMask);
            },
            getProportionalReverseMask: function (oValue, mask) {
                var startMask = 0, endMask = 0, m = 0, mLength = mask.length;
                startMask = (mLength >= 1) ? mLength : mLength-1;
                endMask = startMask;

                while (m <= oValue.length-1) {
                    while (plugin.settings.maskChars[mask.charAt(endMask-1)])
                        endMask--;
                    endMask--;
                    m++;
                }

                endMask = (mask.length >= 1) ? endMask : endMask-1;
                return mask.substring(startMask, endMask);
            },
            maskToRegex: function (mask) {
                for (var i = 0, regex = ''; i < mask.length; i ++){
                    var specialChar = plugin.settings.specialChars[mask.charAt(i)];
                    if (specialChar)
                        regex += "(" + specialChar + ")";
                    if (plugin.settings.maskChars[mask.charAt(i)])
                        regex += "?"
                }

                return regex;
            },
            validDigit: function (nowMask, nowDigit) {
                var regex = "(" + plugin.settings.specialChars[nowMask] + ")";
                if (plugin.settings.maskChars[nowMask]) regex += "?";
                return new RegExp(regex).test(nowDigit);
            },
            cleanBullShit: function (oNewValue, mask, index) {
                index = index || 0;
                oNewValue = oNewValue.split('');
                for (var i = index, m = index, mLen = mask.length, valueLen = oNewValue.length; i < mLen; i++, m++) {
                    while(plugin.settings.maskChars[mask.charAt(m)]) m++;
                    
                    if (!__p.validDigit(mask.charAt(m), oNewValue[i]) && typeof oNewValue[i] !== "undefined") {
                        oNewValue[i] = '';
                        oNewValue = oNewValue.join('');
                        return __p.cleanBullShit(oNewValue, __p.getMask(oNewValue, mask), 0);
                    } 
                }
                return oNewValue.join('');
            },
            seekCallbacks: function (e, options, oNewValue, mask, currentField) {
                if (options.onKeyPress && e.isTrigger === undefined && 
                    typeof options.onKeyPress == "function")
                        options.onKeyPress(oNewValue, e, currentField, options);

                if (options.onComplete && e.isTrigger === undefined &&
                    oNewValue.length === mask.length && typeof options.onComplete == "function")
                        options.onComplete(oNewValue, e, currentField, options);
            }
        };

        // qunit private methods testing
        if (typeof QUNIT === "boolean") plugin.__p = __p;

        // public methods
        plugin.remove = function() {
          __p.destroyEvents();
          $el.val(__p.onlyNonMaskChars($el.val()));
        };

        plugin.init();
    };

    $.fn.mask = function(mask, options) {
        return this.each(function() {
            $(this).data('mask', new Mask(this, mask, options));
        });
    };

})(jQuery);