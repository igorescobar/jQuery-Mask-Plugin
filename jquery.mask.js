 /**
 * jquery.mask.js
 * @version: v0.11.5
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
    var Mask = function (el, mask, options) {
        var jMask = this,
            el = $(el);

        jMask.init = function() {
            options = options || {};

            jMask.byPassKeys = [8, 9, 37, 38, 39, 40, 46];
            jMask.translation = {
                '0': {pattern: /\d/}, 
                '9': {pattern: /\d/, optional: true}, 
                'A': {pattern: /[a-zA-Z0-9]/}, 
                'S': {pattern: /[a-zA-Z]/}
            };

            jMask.translation = $.extend({}, jMask.translation, options.translation);
            jMask = $.extend(true, {}, jMask, options);

            el.each(function() {
                p.resolveMask();

                el.attr('maxlength', mask.length).attr('autocomplete', 'off');
                p.destroyEvents();
                p.events();
            });
        };

        var p = {
            events: function() {
                el.on('keyup.mask', p.maskBehaviour);
                el.on("paste.mask", function() {
                    setTimeout(function() {
                        el.keyup();
                    }, 100);
                });
            },
            destroyEvents: function() {
                el.off("keyup.mask").off("paste.mask");
            },
            resolveMask: function() {
                mask = typeof mask == "function" ? mask(p.val(), options) : mask;
            },
            val: function(v) {
                var input = el.get(0).tagName.toLowerCase() === "input";
                return arguments.length > 0 ? (input ? el.val(v) : el.text(v)) : (input ? el.val() : el.text());
            },
            maskBehaviour: function(e) {
                var newVal = p.applyMask(mask);
                e = e || window.event;

                if ($.inArray(e.keyCode || e.which, jMask.byPassKeys) === -1 && newVal !== p.val())
                    p.val(newVal).change();

                return p.seekCallbacks(e, newVal);
            },
            applyMask: function () {
                var buf = [],
                    value = p.val(),
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = "push",
                    check;

                if (options.reverse) {
                    addMethod = "unshift";
                    offset = -1;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    check = function () {
                        return m < maskLen && v < valLen
                    };
                }

                while (check()) { 
                    var maskDigit = mask.charAt(m),
                        translationMaskDigit = jMask.translation[maskDigit],
                        valDigit = value.charAt(v);

                    if (translationMaskDigit){
                        if (valDigit.match(translationMaskDigit.pattern)){
                            buf[addMethod](valDigit);
                            m += offset;
                        } else if (translationMaskDigit.optional == true) {
                            m += offset;
                            v -= offset;
                        }
                        v += offset;
                    } else {
                        buf[addMethod](maskDigit);
                        if (valDigit == maskDigit)
                            v += offset;
                        m += offset;
                    }
                }
                return buf.join("");
            },
            removeMaskChars: function(string) {
                var buf = [];
                for (var m = 0; m < mask.length; m++){
                    if (jMask.translation[mask.charAt(m)]) {
                        buf["push"](string.charAt(m));
                    }
                }
                return buf.join("");
            },
            seekCallbacks: function (e, newVal) {
                if (options.onKeyPress && typeof options.onKeyPress == "function")
                    options.onKeyPress(newVal, e, el, options);

                if (options.onComplete && newVal.length === mask.length && typeof options.onComplete === "function")
                    options.onComplete(newVal, e, el, options);
            }
        };

        // public methods
        jMask.remove = function() {
          p.destroyEvents();
          p.val(p.removeMaskChars(p.val())).removeAttr('maxlength');
        };
        
        // get value without mask
        jMask.getCleanVal = function() {
          return p.removeMaskChars(p.val());
        };

        jMask.init();
    };

    $.fn.mask = function(mask, options) {
        return this.each(function() {
            $(this).data('mask', new Mask(this, mask, options));
        });
    };

    // looking for inputs with data-mask attribute
    $('input[data-mask]').each(function() {
        $(this).mask($(this).attr('data-mask'));
    });
   
})(window.jQuery || window.Zepto);