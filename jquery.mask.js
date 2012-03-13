/*!
 * jQuery Mask Plugin
 *
 * http://blog.igorescobar.com/
 *
 * Copyright 2012, Igor Escobar
 *
 * Date: Sat Mar 10 03:50:23 2012
 */

/*jslint undef: false, browser: false, es5: true, maxerr: 50, indent: 2 */

(function ($){
  "use strict";

  var byPassKeys = [8,9,17,37,38,39,40,91],
    specialChars = {':': 191, '-': 189, '.': 190, '(': 57, ')': 48, '/': 191, ',': 188, '_': 189, ' ': 32, '+': 187},
    specialCharsValues = [191,189,190,57,48,191,188,189,32,187],
    e, fieldObject, oNewValue, keyCode, keyPressedString, options, oValue;

  $.fn.mask = function (Mascara) {
    if (!$(this).attr('maxlength'))
      $(this).attr('maxlength', Mascara.length);

    $(this).live('keyup', function(e){
      oValue = $(this).val();
      var lastDigit = oValue.substring(oValue.length-1).replace(/[:\-.()/,_ +]/g, "");
      var nowMask = Mascara.charAt(oValue.length-1);
      var cleanedValue = oValue.substring(0,oValue.length-1);

      if (isNaN(parseInt(nowMask, 10)) === false && /\d/.test(lastDigit) === false) {
        $(this).val(cleanedValue);
      } else if(nowMask === 'A' && /\w/.test(lastDigit) === false) {
        $(this).val(cleanedValue);
      } else if(nowMask === 'S' && /[a-zA-Z]/.test(lastDigit) === false) {
        $(this).val(cleanedValue);
      }
    });

    $(this).live('keydown', function (e){
      if (preventSpecialKeys(e, $(this), Mascara))
        return true;
      else
        applyMask(e, $(this), Mascara);
    });
  };

  var preventSpecialKeys = function (e, fieldObject, Mascara) {
    e = e || window.event;
    keyCode = e.keyCode || e.which;
    oValue = fieldObject.val();
    keyPressedString = String.fromCharCode(keyCode);
    oNewValue = oValue + keyPressedString;
    var nowMask = Mascara.charAt(oNewValue.length-1);

    if ($.inArray(keyCode, byPassKeys) >= 0){
      return true;
    }

    if ($.inArray(keyCode, specialCharsValues) >= 0){
      e.preventDefault();
    }

  };

  var applyMask = function (e, fieldObject, Mascara) {
    oValue = fieldObject.val();
    e = e || window.event;
    keyCode = e.keyCode || e.which;
    keyPressedString = String.fromCharCode(keyCode);

    var oNewValue = oValue + keyPressedString,
      nowMask = Mascara.charAt(oNewValue.length-1),
      bufferedMasks  = '',
      m = oNewValue.length-1;

    while (typeof specialChars[Mascara.charAt(m)] === "number"){
      bufferedMasks += Mascara.charAt(m);
      m++;
    }

    var replacePattern = oNewValue.substring(0, oNewValue.length-1) + bufferedMasks;
    if (typeof specialChars[nowMask] === "number") {
      fieldObject.val(replacePattern);
    }
  };
})(jQuery);