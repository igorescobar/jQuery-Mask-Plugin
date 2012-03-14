 /**
 * jquery.mask.js
 * @author: igorescobar
 * @version: 1.1.3
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
    e, m, fieldObject, oValue, oNewValue, oCleanedValue, keyCode, keyPressedString;

  $.fn.mask = function (Mascara) {
    $(this).attr('maxlength', Mascara.length);
    $(this).live('keyup', function(e){
      e = e || window.event;
      keyCode = e.keyCode || e.which;

      if ($.inArray(keyCode, byPassKeys) >= 0) return true;

      applyMask(e, $(this), Mascara);
    });
  };

  var validateDigit = function (oNewValue, Mascara, bufferedMasks) {
    var oNewValueSize = oNewValue.length-1,
        nowMask = Mascara.charAt(oNewValueSize);

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

  var applyMask = function (e, fieldObject, Mascara) {
    oValue = fieldObject.val();
    oNewValue = '';
    oCleanedValue = oValue.replace(/\W/g, '').substring(0, Mascara.replace(/\W/g, '').length);
    m = 0;

    for (var i = 0; i < oCleanedValue.length; i++) {
      keyPressedString = oCleanedValue.charAt(i);

      var bufferedMasks  = '';
      while (typeof specialChars[Mascara.charAt(m)] === "number") {
        bufferedMasks += Mascara.charAt(m);
        m++;
      }
      m++;

      oNewValue += (bufferedMasks !== '') ? (bufferedMasks + keyPressedString) : keyPressedString;
      oNewValue = validateDigit(oNewValue, Mascara, bufferedMasks);
    }

    if (oNewValue !== fieldObject.val())
      fieldObject.val(oNewValue);
  };
})(jQuery);