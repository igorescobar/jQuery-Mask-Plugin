/*!
 * jQuery Mask Plugin
 * https://github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright 2012, Igor Escobar (blog.igorescobar.com)
 *
 * Date: Sat Mar 10 03:50:23 2012
 */

/*jslint undef: false, browser: false, es5: true, maxerr: 50, indent: 2 */

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