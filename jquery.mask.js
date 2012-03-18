 /**
 * jquery.mask.js
 * @author: igorescobar
 * @version: 0.3.0
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

(function ($){
  "use strict";

  var byPassKeys = [8,9,37,38,39,40],
    specialChars = {':': 191, '-': 189, '.': 190, '(': 57, ')': 48, '/': 191, ',': 188, '_': 189, ' ': 32, '+': 187},
    e, m, fieldObject, oValue, oNewValue, oCleanedValue, keyCode, keyPressedString, pMask;

  $.fn.mask = function (Mask, options) {
    options = options || {};

    $(this).attr('maxlength', Mask.replace(/\W/g, '').length);
    $(this).die('keyup.jquerymask');
    $(this).live('keyup.jquerymask', function(e){
      e = e || window.event;
      keyCode = e.keyCode || e.which;

      if ($.inArray(keyCode, byPassKeys) >= 0) return true;

      oNewValue = (typeof options.reverse == "boolean" && options.reverse === true) ? applyReverseMask(e, $(this), Mask, options) : applyMask(e, $(this), Mask, options);

      if (oNewValue !== $(this).val())
        $(this).val(oNewValue);

    }).trigger('keyup');
  };

  var validateDigit = function (oNewValue, Mask, bufferedMasks) {
    var oNewValueSize = oNewValue.length-1,
        nowMask = Mask.charAt(oNewValueSize);

    if (isNaN(parseInt(nowMask, 10)) === false && /\d/.test(keyPressedString) === false) {
      return oNewValue.substring(0, oNewValueSize);
    } else if (nowMask === 'A' && /[a-zA-Z0-9]/.test(keyPressedString) === false) {
      return oNewValue.substring(0, oNewValueSize);
    } else if (nowMask === 'S' && /[a-zA-Z]/.test(keyPressedString) === false) {
      return oNewValue.substring(0, oNewValueSize);
    } else {
      return oNewValue;
    }
  };

  var seekCallbacks = function (e, options, oNewValue, Mask) {
    if (options.onKeyPress && e.isTrigger === undefined && typeof options.onKeyPress == "function") {
      options.onKeyPress(oNewValue, e, keyCode);
    }

    if (options.onComplete && e.isTrigger === undefined &&
        oNewValue.length === Mask.length && typeof options.onComplete == "function") {
      options.onComplete(oNewValue);
    }
  };

  var applyReverseMask = function (e,fieldObject, Mask, options) {
    oValue = fieldObject.val();
    oCleanedValue = oValue.replace(/\W/g, '').substring(0, Mask.replace(/\W/g, '').length);

    var typedDigits = oCleanedValue.split('');
    Mask = Mask.split("").reverse().join("");

    var m = 0;
    for (var i = oCleanedValue.length; i > 0 ; i--){
      if (typeof specialChars[Mask.charAt(m)] === "number"){
        typedDigits[i] = Mask.charAt(m) + typedDigits[i];
        m++;
      }
      m++;
    }

    return typedDigits.join('');
  };

  var applyMask = function (e, fieldObject, Mask, options) {
    oValue = fieldObject.val();
    oNewValue = '';
    oCleanedValue = oValue.replace(/\W/g, '').substring(0, Mask.replace(/\W/g, '').length);
    m = 0;

    for (var i = 0; i < oCleanedValue.length; i++) {
      keyPressedString = oCleanedValue.charAt(i);

      var bufferedMasks  = '';
      while (typeof specialChars[Mask.charAt(m)] === "number") {
        bufferedMasks += Mask.charAt(m);
        m++;
      }
      m++;

      oNewValue += (bufferedMasks !== '') ? (bufferedMasks + keyPressedString) : keyPressedString;
      oNewValue = validateDigit(oNewValue, Mask, bufferedMasks);
    }

    seekCallbacks(e, options, oNewValue, Mask);
    return oNewValue;
  };
})(jQuery);