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

$(function () {
  "use strict";

  jQuery.fn.extend({
    specialChars: {':': 191, '-': 189, '.': 190, '(': 57, ')': 48, '/': 191, ',': 188, '_': 189, ' ': 32, '+': 187},
    mask: function (Mascara) {
      var mask_pattern = Mascara;
      $(this).keydown(function (e){
        $(this).preventSpecialKeys(e);
        $(this).apply_mask(e, mask_pattern);
      });
    },
    preventSpecialKeys: function (e){
      e = e || window.event;
      var SpecialChars = $(this).specialChars,
        oValue = $(this).val(),
        lastTypedChar = oValue.substring(oValue.length-1);

      if (typeof SpecialChars[lastTypedChar] === "number" && e.keyCode == SpecialChars[lastTypedChar])
        e.preventDefault();

    },
    apply_mask: function (e, Mascara) {
      e = e || window.event;
      var SpecialChars = $(this).specialChars,
        byPassKeys = [8],
        keyCode = e.keyCode? e.keyCode : e.charCode,
        oValue = $(this).val(),
        lastTypedChar = oValue.substring(oValue.length-1),
        pressedKeyChar = String.fromCharCode(lastTypedChar.charCodeAt(0)),
        nowMask = Mascara.charAt(oValue.length-1),
        replacePattern = oValue.substring(0, oValue.length-1) + '' + nowMask + pressedKeyChar;

      if ($.inArray(keyCode, byPassKeys) > -1) return true;

      if (typeof SpecialChars[nowMask] === "number" && pressedKeyChar !== nowMask) {
        $(this).val(replacePattern);
      }
    }
  });
});
