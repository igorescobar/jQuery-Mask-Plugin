 /**
 * jquery.mask.js
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

(function($) {
  "use strict";

  var  e, oValue, oNewValue, keyCode, pMask;

  var Mask = function(element, mask, options) {

    var plugin = this;

    $.extend(this, {
      element: element,
      settings: $.extend(getDefaults(mask), options || {})
    });

    plugin.init();

  }

  // Public Functions

  $.extend(Mask.prototype, {
    init: function() {
      var context = this,
        settings = context.settings,
        mask = settings.mask,
        element = $(context.element);

      destroyEvents(context);
      element.attr('maxlength', mask.length);

      bindEvent(context, true);
    },
    remove: function() {
      var context = this, element = $(context.element);
      destroyEvents(context);
      element.val(onlyNumbers(element.val()));
    },
    validDigit: function (nowMask, nowDigit) {
      if (isNaN(parseInt(nowMask, 10)) === false && /\d/.test(nowDigit) === false) {
        return false;
      } else if (nowMask === 'A' && /[a-zA-Z0-9]/.test(nowDigit) === false) {
        return false;
      } else if (nowMask === 'S' && /[a-zA-Z]/.test(nowDigit) === false) {
        return false;
      } else if (typeof this.settings.specialChars[nowDigit] === "number" && nowMask !== nowDigit) {
        return false;
      }
      return true;
    }
  });

  // Context Functions

  function bindEvent(context, trigger) {
    var element = $(context.element);
    element.live('keyup', function (event) {
      var e = event || window.event,
        keyCode = e.keyCode || e.which,
        oNewValue;
      if ( $.inArray(keyCode, context.settings.byPassKeys) >= 0 ) return true;
      oNewValue = applyMask(context);
      seekCallbacks(context, e, oNewValue);
      if ( oNewValue !== element.val() ) element.val(oNewValue);
    });
    if ( trigger ) element.trigger('keyup');
  }

  function destroyEvents(context){
    $(context.element).unbind('keyup').die('keyup');
  }

  function applyMask(context) {
    var settings = context.settings,
      element = $(context.element),
      mask, oValue,
      reverse = settings.reverse,
      oCleanedValue = onlyNumbers(element.val());

    mask = (reverse === true) ?
      getProportionalReverseMask(context, oCleanedValue) :
      getProportionalMask(context, oCleanedValue);
    oValue = oCleanedValue.substring(0, mask.replace(/\W/g, '').length);

    return oValue.replace(maskToRegex(mask), function () {
      var oNewValue = '', i = 1, arg,
        args = arguments, len2 = args.length - 2;
      while ( i < len2 ) {
        arg = args[i++];
        oNewValue += ( typeof arg == "undefined" || arg === "" ) ? mask[i-1] : arg;
      }
      return cleanBullShit(context, oNewValue, mask);
    });
  }

  function seekCallbacks(context, event, oNewValue) {
    var settings = context.settings,
      element = $(context.element),
      mask = settings.mask;
    if (settings.onKeyPress && event.isTrigger === undefined && typeof settings.onKeyPress == "function") {
      settings.onKeyPress(oNewValue, event, element, settings);
    }

    if (settings.onComplete && event.isTrigger === undefined &&
        oNewValue.length === mask.length && typeof settings.onComplete == "function") {
      settings.onComplete(oNewValue, event, element, settings);
    }
  }

  function getProportionalReverseMask(context, oValue) {
    var m = 0, len = oValue.length - 1,
      settings = context.settings,
      specialChars = settings.specialChars,
      mask = settings.mask,
      mlen = mask.length,
      startMask = mlen - (mlen >= 1 ? 0 : 1),
      endMask = startMask;
    while (m <= len) {
      while (typeof specialChars[mask.charAt(endMask-1)] === "number")
        endMask--;
      endMask--;
      m++;
    }
    endMask = endMask - (mlen >= 1 ? 0 : 1);
    return mask.substring(startMask, endMask);
  }

  function getProportionalMask(context, oValue) {
    var endMask = 0, m = 0, len = oValue.length - 1,
      settings = context.settings,
      specialChars = settings.specialChars,
      mask = settings.mask;
    while (m <= len){
      while(typeof specialChars[mask.charAt(endMask)] === "number")
        endMask++;
      endMask++;
      m++;
    }
    return mask.substring(0, endMask);
  }

  function cleanBullShit(context, oNewValue, mask) {
    oNewValue = oNewValue.split('');
    for(var i = 0; i < mask.length; i++){
      if(context.validDigit(mask.charAt(i), oNewValue[i]) === false)
        oNewValue[i] = '';
    }
    return oNewValue.join('');
  }

  // Local Functions

  function getDefaults(mask) {
    return {
      byPassKeys: [8,9,37,38,39,40],
      specialChars: {':': 191, '-': 189, '.': 190, '(': 57, ')': 48, '/': 191, ',': 188, '_': 189, ' ': 32, '+': 187},
      mask: mask
    };
  }

  function onlyNumbers(string) {
    return string.replace(/\W/g, '');
  };

  function cachedFunction(func) {
    var cache = {};
    return function (arg) {
      return cache[arg] || (cache[arg] = func(arg));
    };
  }

  var translation = { 0: '(.)', 1: '(.)', 2: '(.)', 3: '(.)', 4: '(.)', 5: '(.)', 6: '(.)', 7: '(.)',
    8: '(.)', 9: '(.)', 'A': '(.)', 'S': '(.)',':': '(:)?', '-': '(-)?', '.': '(\\\.)?', '(': '(\\()?',
    ')': '(\\))?', '/': '(/)?', ',': '(,)?', '_': '(_)?', ' ': '(\\s)?', '+': '(\\\+)?'};
  var maskToRegex = cachedFunction(function (mask) {
    var regex = '', len = mask.length, fragment, i = 0;
    while ( i < len ) {
      if ( fragment = translation[mask[i++]] ) regex += fragment;
    }
    return new RegExp( regex );
  });

  // Public API

  $.fn.mask = function(mask, options) {
    return this.each(function() {
      var plugin = new Mask(this, mask, options);
      $(this).data('mask', plugin);
    });
  }

})(jQuery);