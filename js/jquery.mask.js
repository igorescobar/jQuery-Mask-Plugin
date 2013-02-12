 /**
 * jquery.mask.js
 * @version: v0.7.0 
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

  var Mask = function(el, mask, options) {
    var plugin = this,
        $el = $(el),
        defaults = {
          byPassKeys: [8,9,37,38,39,40],
          maskChars: {':': '(:)?', '-': '(-)?', '.': '(\\\.)?', '(': '(\\()?', ')': '(\\))?', '/': '(\/)?', ',': '(,)?', '_': '(_)?', ' ': '(\\s)?', '+': '(\\\+)?'},
          translationNumbers: {0: '(\\d)', 1: '(\\d)', 2: '(\\d)', 3: '(\\d)', 4: '(\\d)', 5: '(\\d)', 6: '(\\d)', 7: '(\\d)', 8: '(\\d)', 9: '(\\d)'},
          translation: {'A': '([a-zA-Z0-9])', 'S': '([a-zA-Z])'}
        };
    
    plugin.init = function() {
      plugin.settings = {};
      options = options || {};

      defaults.translation = $.extend({}, defaults.translation, defaults.translationNumbers)
      plugin.settings = $.extend(true, {}, defaults, options);
      plugin.settings.specialChars = $.extend({}, plugin.settings.maskChars, plugin.settings.translation);
        
      
      $el.each(function() {
        mask = resolveDynamicMask(mask, $(this).val(), e, $(this), options);
        $el.attr('maxlength', mask.length);
        $el.attr('autocomplete', 'off');

        destroyEvents();
        setOnKeyUp();
        setOnPaste();    
      });
    };

    // public methods
    plugin.remove = function() {
      destroyEvents();
      $el.val(onlyNonMaskChars($el.val()));
    };

    // private methods
    var resolveDynamicMask = function(mask, oValue, e, currentField, options){
      return typeof mask == "function" ? mask(oValue, e, currentField, options) : mask;
    };

    var onlyNonMaskChars = function(string) {
      $.each(plugin.settings.maskChars, function(k,v){
        string = string.replace(new RegExp(plugin.settings.maskChars[k], 'g'), '')
      });
      return string;
    };

    var onPasteMethod = function(){
      setTimeout(function(){
        $el.trigger('keyup');
      }, 100);
    };

    var setOnPaste = function() {
      (hasOnSupport()) ? $el.on("paste", onPasteMethod) : $el.onpaste = onPasteMethod;
    };

    var setOnKeyUp = function(){
      $el.keyup(maskBehaviour).trigger('keyup');
    };

    var hasOnSupport = function() {
      return $.isFunction($.on);
    };

    var destroyEvents = function(){
      $el.unbind('keyup').unbind('onpaste');
    };

    var maskBehaviour = function(e){
      e = e || window.event;
      keyCode = e.keyCode || e.which;

      if ($.inArray(keyCode, plugin.settings.byPassKeys) > -1)  return true;

      var oCleanedValue = onlyNonMaskChars($el.val()),
          nowDigitIndex = $el.val().length-1,
          nowDigitValue = $el.val()[nowDigitIndex] ;

      pMask = (typeof options.reverse == "boolean" && options.reverse === true) ?
              getProportionalReverseMask(oCleanedValue, mask) :
              getProportionalMask(oCleanedValue, mask);

      if (nowDigitValue === mask[nowDigitIndex] && plugin.settings.maskChars[nowDigitValue]) {
        $el.val(cleanBullShit($el.val(), mask));
        return true;
      } 

      oNewValue = applyMask(e, $el, pMask, options);

      if (oNewValue !== $el.val()){
        $el.val(oNewValue).trigger('change');
      }
        
      return seekCallbacks(e, options, oNewValue, mask, $el);
    };

    var applyMask = function (e, fieldObject, mask, options) {
      var oValue = onlyNonMaskChars(fieldObject.val()).substring(0, onlyNonMaskChars(mask).length);
      return cleanBullShit(oValue.replace(new RegExp(maskToRegex(mask)), function() {
        for (var i = 1, oNewValue = ''; i < arguments.length - 2; i++) {
          if (typeof arguments[i] == "undefined" || arguments[i] === "")
            arguments[i] = mask.charAt(i-1);
          oNewValue += arguments[i];
        }

        return oNewValue;
      }), mask);
    };

    var getProportionalMask = function (oValue, mask) {
      var endMask = 0, m = 0;

      while (m <= oValue.length-1){
        while(plugin.settings.maskChars[mask.charAt(endMask)])
          endMask++;
        endMask++;
        m++;
      }

      return mask.substring(0, endMask);
    };

    var getProportionalReverseMask = function (oValue, mask) {
      var startMask = 0, endMask = 0, m = 0;
      startMask = (mask.length >= 1) ? mask.length : mask.length-1;
      endMask = startMask;

      while (m <= oValue.length-1) {
        while (plugin.settings.maskChars[mask.charAt(endMask-1)])
          endMask--;
        endMask--;
        m++;
      }

      endMask = (mask.length >= 1) ? endMask : endMask-1;
      return mask.substring(startMask, endMask);
    };

    var maskToRegex = function (mask) {
      for (var i = 0, regex = ''; i < mask.length; i ++){
        if (plugin.settings.specialChars[mask.charAt(i)])
          regex += plugin.settings.specialChars[mask.charAt(i)];
      }
      return regex;
    };

    var validDigit = function (nowMask, nowDigit) {
      if (new RegExp(plugin.settings.specialChars[nowMask]).test(nowDigit) === false) {
        return false;
      }
      return true;
    };

    var cleanBullShit = function (oNewValue, mask, index) {
      index = index || 0;
      oNewValue = oNewValue.split('');
      for (var i = index; i < mask.length; i++) {
        if (validDigit(mask.charAt(i), oNewValue[i]) === false && typeof oNewValue[i] !== "undefined") {
          oNewValue[i] = '';
          return cleanBullShit(oNewValue.join(''), mask, 0);
        } 
      }
      return oNewValue.join('');
    };

    var seekCallbacks = function (e, options, oNewValue, mask, currentField) {
      if (options.onKeyPress && e.isTrigger === undefined && typeof options.onKeyPress == "function") {
        options.onKeyPress(oNewValue, e, currentField, options);
      }
      
      if (options.onComplete && e.isTrigger === undefined &&
          oNewValue.length === mask.length && typeof options.onComplete == "function") {
        options.onComplete(oNewValue, e, currentField, options);
      }
    };

    plugin.init();
  };

  $.fn.mask = function(mask, options) {
    return this.each(function() {
      $(this).data('mask', new Mask(this, mask, options));
    });
  };

})(jQuery);