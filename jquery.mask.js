/**
* Formata o campo de acordo com a mascara informada.
* Ex: $('.date_fields').mask('99/99/9999')
* @author Igor Escobar (blog@igorescobar.com)
* @param Mascara String que possui a mascara de formatação do campo.
* @returns {void}
*/

$(function () {
  "use strict";
  var mask_pattern = null;
  jQuery.fn.extend({
    mask: function (Mascara) {
      mask_pattern = Mascara
      $(this).keyup(function (){
        $(this).apply_mask();
      });
    },
    apply_mask: function () {

      if (event.keyCode == 8) return true;

      var SpecialChars = [':', '-', '.', '(',')', '/', ',', '_'],
        oValue = $(this).val(),
        novo_valor = '';

      for (i = 0 ; i <= oValue.length; i++) {
        var nowMask = mask_pattern.charAt(i),
          nowLetter = oValue.charAt(i),
          DuplicatedMask = new RegExp(nowMask + "{2,}");

        novo_valor += ($.inArray(nowMask, SpecialChars) > -1 && nowLetter != nowMask) ? (nowMask + '' + nowLetter) : nowLetter;
        novo_valor = novo_valor.replace(DuplicatedMask, nowMask);
      }

      $(this).val(novo_valor);
    }
  });
});
