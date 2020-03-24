var QUNIT = true;
$(document).ready(function(){

    var testfield = $('.simple-field'),
        testfieldDataMask = $('.simple-field-data-mask'),
        testfieldDataMaskWithReverse = $('.simple-field-data-mask-reverse'),
        testfieldDataMaskWithClearIfNotMatch = $('.simple-field-data-mask-clearifnotmatch'),
        testfieldDataMaskWithClearIfNotMatchAndOptionalMask = $('.simple-field-data-mask-clearifnotmatch-and-optional-mask'),
        testdiv = $('.simple-div'),
        typeTest = function (typedValue, obj) {
          obj = typeof obj === "undefined" ? testfield : obj;

          return obj.keydown().val(typedValue).trigger('input').val();
        },
        typeDivTest = function(typedValue){
          return testdiv.keydown().text(typedValue).trigger('input').text();
        };

    module('Setting Up');
    test("test if the mask method exists after plugin insertion", function() {
      equal( typeof testfield.mask , "function" , "mask function should exists" );
    });

    module('Simple Masks');
    test("Masks with only numbers.", function(){
      testfield.mask('000000');

      equal( typeTest("1."), "1");
      equal( typeTest('1éáa2aaaaqwo'), "12");
      equal( typeTest('1234567'), "123456");

    });

    test("When I change the mask on-the-fly things should work normally", function(){
      testfield.mask('0000.0000');

      equal( typeTest("1."), "1");
      equal( typeTest('1éáa2aaaaqwo'), "12");
      equal( typeTest('1234567'), "1234.567");

      // changing on-the-fly
      testfield.mask('0.000.000');

      equal( typeTest("1."), "1.");
      equal( typeTest('1éáa2aaaaqwo'), "1.2");
      equal( typeTest('1234567'), "1.234.567");

    });

    test("When I change the mask on-the-fly with onChange callback things should work normally", function(){

      var masks = ['0000.00009', '0.0000.0000'];
      var SPphoneMask = function(phone){
        return phone.length <= 9 ? masks[0] : masks[1];
      };

      testfield.mask(SPphoneMask, {onChange: function(phone, e, currentField, options){
        $(currentField).mask(SPphoneMask(phone), options);
      }});

      equal( typeTest("1"), "1");
      equal( typeTest("12"), "12");
      equal( typeTest("123"), "123");
      equal( typeTest("1234"), "1234");
      equal( typeTest("12345"), "1234.5");
      equal( typeTest("123456"), "1234.56");
      equal( typeTest("1234567"), "1234.567");
      equal( typeTest("12345678"), "1234.5678");
      equal( typeTest("123456789"), "1.2345.6789");

    });

    test("When I change the mask on-the-fly with onKeyPress callback things should work normally", function(){

      var masks = ['0000.00009', '0.0000.0000'];
      var SPphoneMask = function(phone){
        return phone.length <= 9 ? masks[0] : masks[1];
      };

      testfield.mask(SPphoneMask, {onKeyPress: function(phone, e, currentField, options){
        $(currentField).mask(SPphoneMask(phone), options);
      }});

      equal( typeTest("1"), "1");
      equal( typeTest("12"), "12");
      equal( typeTest("123"), "123");
      equal( typeTest("1234"), "1234");
      equal( typeTest("12345"), "1234.5");
      equal( typeTest("123456"), "1234.56");
      equal( typeTest("1234567"), "1234.567");
      equal( typeTest("12345678"), "1234.5678");
      equal( typeTest("123456789"), "1.2345.6789");

    });

    test("#onInvalid callback. should call when invalid", function(){
      testfield.mask('00/00/0000', {onInvalid: function(val, e, el, invalid, options){
        equal(val, "1")
        equal(typeof e, "object")
        equal(typeof el, "object")
        equal(invalid.length, 1);
        equal(invalid[0]["e"], "/\\d/");
        equal(invalid[0]["p"], 1);
        equal(invalid[0]["v"], "a");
        equal(typeof options.onInvalid, "function");
      }});

      equal( typeTest("1a") , "1");
    });

    test("#onInvalid callback. should not call when valid", function(){
      var callback = sinon.spy();
      testfield.mask('00/00/0000', {onInvalid: callback});

      equal( typeTest("11") , "11");
      equal(callback.called, false)
    });

    test('When I typed a char thats the same as the mask char', function(){
      testfield.unmask();
      testfield.mask('00/00/0000');

      equal( typeTest("00/"), "00/");
      equal( typeTest("00a"), "00/");
      equal( typeTest("00a00/00"), "00/00/00");
      equal( typeTest("0a/00/00"), "00/00/0");
      equal( typeTest("0a/0a/00"), "00/00");

    });

    test('When I typed exactly the same as the mask', function(){
      testfield.mask('00/00/0000');
      equal( typeTest("00"), "00");
      equal( typeTest("00/"), "00/");
      equal( typeTest("aa/"), "");
      equal( typeTest("00/0"), "00/0");
      equal( typeTest("00/00"), "00/00");
      equal( typeTest("00/00/0"), "00/00/0");
      equal( typeTest("00/00/00"), "00/00/00");
    });

    test("Testing masks with a literal on the last char", function () {
      testfield.mask("(99)");

      equal( typeTest("(99"), "(99)");
    });


    module('Masks with numbers and especial characters');

    test("Masks with numbers and special characters.", function(){
      testfield.mask('(000) 000-0000');

      equal( typeTest("1"), "(1");
      equal( typeTest('12'), "(12");
      equal( typeTest('123'), "(123");
      equal( typeTest('1234'), "(123) 4");
      equal( typeTest('12345'), "(123) 45");
      equal( typeTest('(123) 456'), "(123) 456");
      equal( typeTest('(123) 4567'), "(123) 456-7");

    });

    test("Testing masks with a annonymous function", function(){
      testfield.mask(function(){
        return "(123) 456-7899"
      });

      equal( typeTest("1"), "(1");
      equal( typeTest('12'), "(12");
      equal( typeTest('123'), "(123");
      equal( typeTest('1234'), "(123) 4");
      equal( typeTest('12345'), "(123) 45");
      equal( typeTest('123456'), "(123) 456");
      equal( typeTest('1234567'), "(123) 456-7");

    });

    test("Masks with numbers, strings e special characters", function(){
      testfield.mask('(999) A99-SSSS');

      equal( typeTest("(1"), "(1");
      equal( typeTest('(12'), "(12");
      equal( typeTest('(123'), "(123");
      equal( typeTest('(123) 4'), "(123) 4");
      equal( typeTest('(123) A'), "(123) A");
      equal( typeTest('123.'), "(123) ");
      equal( typeTest('(123) 45'), "(123) 45");
      equal( typeTest('(123) 456'), "(123) 456");
      equal( typeTest('(123) 456-A'), "(123) 456-A");
      equal( typeTest('(123) 456-AB'), "(123) 456-AB");
      equal( typeTest('(123) 456-ABC'), "(123) 456-ABC");
      equal( typeTest('(123) 456-ABCD'), "(123) 456-ABCD");
      equal( typeTest('(123) 456-ABCDE'), "(123) 456-ABCD");
      equal( typeTest('(123) 456-ABCD1'), "(123) 456-ABCD");

    });

    test("Masks with numbers, strings e special characters #2 ", function(){
      testfield.mask('AAA 000-S0S');

      equal( typeTest("1"), "1");
      equal( typeTest('12'), "12");
      equal( typeTest('123'), "123");
      equal( typeTest('123 4'), "123 4");
      equal( typeTest('123 45'), "123 45");
      equal( typeTest('123 456'), "123 456");
      equal( typeTest('123 456-7'), "123 456-");

    });

    module("Testing Reversible Masks");

    test("Testing a CPF Mask", function(){
      testfield.mask('000.000.000-00', {reverse: true});

      equal( typeTest("1"), "1");
      equal( typeTest("12"), "12");
      equal( typeTest("123"), "1-23");
      equal( typeTest("12-34"), "12-34");
      equal( typeTest("123-45"), "123-45");
      equal( typeTest("1.234-56"), "1.234-56");
      equal( typeTest("12.345-67"), "12.345-67");
      equal( typeTest("123.456-78"), "123.456-78");
      equal( typeTest("1.234.567-89"), "1.234.567-89");
      equal( typeTest("12.345.678-90"), "12.345.678-90");
      equal( typeTest("123.456.789-00"), "123.456.789-00");
      equal( typeTest("123.456.789-00"), "123.456.789-00");

      equal( typeTest("123.456.789a00"), "123.456.789-00");
      equal( typeTest("123-a5"), "12-35");

      equal( typeTest("1"), "1");
      equal( typeTest("12"), "12");
      equal( typeTest("1-23"), "1-23");
      equal( typeTest("12-34"), "12-34");
      equal( typeTest("12-345"), "123-45");
      equal( typeTest("1.234-56"), "1.234-56");
      equal( typeTest("12.345-67"), "12.345-67");
      equal( typeTest("123.456-78"), "123.456-78");
      equal( typeTest("1.234.567-89"), "1.234.567-89");
      equal( typeTest("12.345.678-90"), "12.345.678-90");
      equal( typeTest("123.456.789-00"), "123.456.789-00");
      equal( typeTest("123.456.789-00"), "123.456.789-00");
      equal( typeTest("123.456.789a00"), "123.456.789-00");
    });

  test("Testing Reverse numbers with recursive mask", function(){
    testfield.mask("#.##0,00", {reverse: true});

    equal(typeTest(""), "");
    equal(typeTest("1"), "1");
    equal(typeTest("12"), "12");
    equal(typeTest("123"), "1,23");
    equal(typeTest("1,234"), "12,34");
    equal(typeTest("12,345"), "123,45");
    equal(typeTest("123,456"), "1.234,56");
    equal(typeTest("1.234,567"), "12.345,67");
    equal(typeTest("12.345,678"), "123.456,78");
    equal(typeTest("123.456,789"), "1.234.567,89");
    equal(typeTest("1.234.567,890"), "12.345.678,90");
    equal(typeTest("12.345.678,901"), "123.456.789,01");
    equal(typeTest("123.456.789,012"), "1.234.567.890,12");
    equal(typeTest("1.234.567.890,1"), "123.456.789,01");
    equal(typeTest("123.456.789,0"), "12.345.678,90");
    equal(typeTest("12.345.678,9"), "1.234.567,89");
    equal(typeTest("1.234.567,8"), "123.456,78");
  });

  test("Testing numbers with recursive mask", function(){
    testfield.mask("0#.#");

    equal(typeTest(""), "");
    equal(typeTest("1"), "1");
    equal(typeTest("12"), "12");
    equal(typeTest("12."), "12.");
    equal(typeTest("12.3"), "12.3");
    equal(typeTest("12.34"), "12.34");
    equal(typeTest("12.345"), "12.34.5");
    equal(typeTest("12.34.5."), "12.34.5");
    equal(typeTest("12.34.56"), "12.34.56");
    equal(typeTest("12.34.567"), "12.34.56.7");
    equal(typeTest("12.34.56."), "12.34.56.");
    equal(typeTest("12.34.56"), "12.34.56");
    equal(typeTest("12.34.5"), "12.34.5");
  });

  test("Testing numbers with recursive mask with one #", function(){
    testfield.mask("0#", {});

    equal(typeTest(""), "");
    equal(typeTest("1"), "1");
    equal(typeTest("12"), "12");
    equal(typeTest("123"), "123");
    equal(typeTest("1234"), "1234");
    equal(typeTest("12345"), "12345");
    equal(typeTest("12345"), "12345");
    equal(typeTest("123456"), "123456");
    equal(typeTest("1234567"), "1234567");
    equal(typeTest("123456."), "123456");
    equal(typeTest("123456"), "123456");
    equal(typeTest("12345"), "12345");
  });
  test("Testing numbers with recursive mask with one # and reverse", function(){
    testfield.mask("#0", {reverse: true});

    equal(typeTest(""), "");
    equal(typeTest("1"), "1");
    equal(typeTest("12"), "12");
    equal(typeTest("123"), "123");
    equal(typeTest("1234"), "1234");
    equal(typeTest("12345"), "12345");
    equal(typeTest("12345"), "12345");
    equal(typeTest("123456"), "123456");
    equal(typeTest("1234567"), "1234567");
    equal(typeTest("123456."), "123456");
    equal(typeTest("123456"), "123456");
    equal(typeTest("12345"), "12345");
  });
  test("Testing reversible masks with a literal on the last char", function () {
      testfield.mask("(99)");

      equal( typeTest("(99"), "(99)");
    });

  module('Removing mask');

  test("when I get the unmasked value", function(){
    testfield.mask('(00) 0000-0000', { placeholder: '(__) ____-____' });

    equal(typeTest("1299999999"), "(12) 9999-9999");
    testfield.unmask()
    equal(testfield.val(), "1299999999");

    if (window.Zepto) {
      equal(testfield.attr('placeholder'), '');
      equal(testfield.attr('maxlength'), null);
    } else {
      equal(testfield.attr('placeholder'), undefined);
      equal(testfield.attr('maxlength'), undefined);
    }
  });

  module('Getting Unmasked Value');

  test("when I get the unmasked value", function(){
    testfield.mask('(00) 0000-0000');

    equal( typeTest("1299999999"), "(12) 9999-9999");
    equal( testfield.cleanVal(), "1299999999");
  });

  test("when I get the unmasked value with recursive mask", function(){
    testfield.mask('#.##0,00', {reverse:true});

    equal( typeTest("123123123123123123", testfield), "1.231.231.231.231.231,23");
    equal( testfield.cleanVal(), "123123123123123123");
  });

  module('Masking a value programmatically');

  test("when I get the masked value programmatically", function(){
    testfield.mask('(00) 0000-0000');
    typeTest("1299999999", testfield);
    equal( testfield.masked("3488888888"), "(34) 8888-8888");
  });

  module('personalized settings')

  test("when adding more itens to the table translation",function(){
    testfield.mask('00/00/0000', {'translation': {0: {pattern: /[0-9*]/}}});

    equal( typeTest('12/34/5678'), '12/34/5678');
    equal( typeTest('**/34/5678'), '**/34/5678');
  });

  test("when adding more itens to the table translation #2",function(){
    testfield.mask('00/YY/0000', {'translation': {'Y': {pattern: /[0-9*]/}}});

    equal( typeTest('12/34/5678'), '12/34/5678');
    equal( typeTest('12/**/5678'), '12/**/5678');
  });

  test("when adding more itens to the table translation #3",function(){
    var old_translation = $.jMaskGlobals.translation
    $.jMaskGlobals.translation = {
      '1': {pattern: /\d/},
      '9': {pattern: /\d/, optional: true},
      '#': {pattern: /\d/, recursive: true},
      'A': {pattern: /[a-zA-Z0-9]/},
      'S': {pattern: /[a-zA-Z]/}
    };

    testfield.mask('00/11/1111');

    equal( typeTest('12/12/5678'), '00/12/1256');

    testfield.mask('11/00/1111');
    equal( typeTest('12/12/5678'), '12/00/1256');

    $.jMaskGlobals.translation = old_translation;
  });

  test("when adding more itens to the table translation #fallback",function(){
    testfield.mask('zz/z0/0000', {'translation': {'z': {pattern: /[0-9*]/, fallback: '*'}}});

    equal( typeTest('12/:4/5678'), '12/*4/5678');
    equal( typeTest('::/:4/5678'), '**/*4/5678');
  });

  test("test the translation #fallback #1" , function(){
    testfield.mask('00t00', {'translation': {'t': {pattern: /[:,.]/, fallback: ':'}}});

    equal( typeTest('1'), '1');
    equal( typeTest('13'), '13');
    equal( typeTest('137'), '13:7');
    equal( typeTest('1337'), '13:37');
    equal( typeTest('13z00'), '13:00');
  });

  test("test the translation #fallback #2" , function(){
    testfield.mask('00/t0/t0', {'translation': {'t': {pattern: /[:,.*]/, fallback: '*'}}});

    equal( typeTest('1'), '1');
    equal( typeTest('13'), '13');
    equal( typeTest('13/'), '13/');
    equal( typeTest('13/a'), '13/*');
    equal( typeTest('13/a1z1'), '13/*1/*1');
  });

  test("test the translation #fallback #3" , function(){
    testfield.mask('tt/00/00', {'translation': {'t': {pattern: /[:,.*]/, fallback: '*'}}});

    equal( typeTest('*'), '*');
    equal( typeTest('13'), '**/13');
    equal( typeTest('13/'), '**/13/');
    equal( typeTest('13/a'), '**/13/');
    equal( typeTest('13/a1z1'), '**/13/11');
  });

  test("when adding opcional chars",function(){
    testfield.mask('099.099.099.099');

    equal( typeTest('0.0.0.0'), '0.0.0.0');
    equal( typeTest('00.00.00.00'), '00.00.00.00');
    equal( typeTest('00.000.00.000'), '00.000.00.000');
    equal( typeTest('000.00.000.00'), '000.00.000.00');
    equal( typeTest('000.000.000.000'), '000.000.000.000');
    equal( typeTest('000000000000'), '000.000.000.000');
    equal( typeTest('0'), '0');
    equal( typeTest('00'), '00');
    equal( typeTest('00.'), '00.');
    equal( typeTest('00.0'), '00.0');
    equal( typeTest('00.00'), '00.00');
    equal( typeTest('00.00.'), '00.00.');
    equal( typeTest('00.00.000'), '00.00.000');
    equal( typeTest('00.00.000.'), '00.00.000.');
    equal( typeTest('00.00.000.0'), '00.00.000.0');
    equal( typeTest('00..'), '00.');
  });

  test("when aplying mask on a element different than a form field",function(){
    testdiv.mask('000.000.000-00', {reverse: true});

    equal( typeDivTest('12312312312'), '123.123.123-12');
    equal( typeDivTest('123.123.123-12'), '123.123.123-12');
    equal( typeDivTest('123.123a123-12'), '123.123.123-12');
    equal( typeDivTest('191'), '1-91');

    testdiv.mask('00/00/0000');
    equal( typeDivTest('000000'), '00/00/00');
    equal( typeDivTest('00000000'), '00/00/0000');
    equal( typeDivTest('00/00/0000'), '00/00/0000');
    equal( typeDivTest('0a/00/0000'), '00/00/000');

  });

  module('Testing data-mask attribute support');

  test("Testing data-mask attribute", function(){
    equal( typeTest("00/", testfieldDataMask), "00/");
    equal( typeTest("00a", testfieldDataMask), "00/");
    equal( typeTest("00a00/00", testfieldDataMask), "00/00/00");
    equal( typeTest("0a/00/00", testfieldDataMask), "00/00/0");
    equal( typeTest("0a/0a/00", testfieldDataMask), "00/00");
    equal( typeTest("00000000", testfieldDataMask), "00/00/0000");
  });

  test("Testing data-mask-reverse attribute", function(){
    equal( typeTest("0000", testfieldDataMaskWithReverse), "00,00");
    equal( typeTest("000000", testfieldDataMaskWithReverse), "0.000,00");
    equal( typeTest("0000000000", testfieldDataMaskWithReverse), "00.000.000,00");
  });

  module('Event fire test');

  // TODO: need to understand why zepto.js isnt calling change event!
  if(!window.Zepto) {
    test('onChange Test', 2, function(){
      testfield.unmask();

      var callback = sinon.spy();
      var mock = sinon.mock()
      var typeAndBlur = function(typedValue){
        testfield.trigger('keydown');
        testfield.val(typedValue);
        testfield.trigger('input');
        testfield.trigger("blur");
      };

      testfield.mask('000.(000).000/0-0');

      testfield.on("change", callback);

      typeAndBlur("");
      typeAndBlur("1");
      typeAndBlur("12");
      typeAndBlur("123");
      typeAndBlur("1234");
      typeAndBlur("12345");
      typeAndBlur("123456");
      typeAndBlur("1234567");
      typeAndBlur("12345678");
      typeAndBlur("123456789");
      typeAndBlur("123456789");
      typeAndBlur("1234567891");
      typeAndBlur("12345678912");

      equal(testfield.val(), "123.(456).789/1-2" );
      equal(true, sinon.match(11).or(12).test(callback.callCount))

      testfield.off("change");
      testfield.unmask();

    });
  }


  test('onDrop Test', function(){
    ok(true, "todo");
  });

  module('testing Remove If Not Match Feature');

  test('test when clearifnotmatch javascript notation', 4, function(){
    var typeAndFocusOut = function(typedValue){
      testfield.keydown().val(typedValue).trigger('input');
      testfield.trigger("focusout");
    };

    testfield.mask('000');

    typeAndFocusOut("1");
    equal( testfield.val(), "1" );

    testfield.mask('000', {clearIfNotMatch: true});

    typeAndFocusOut("1");
    equal( testfield.val(), "" );

    typeAndFocusOut("12");
    equal( testfield.val(), "" );

    typeAndFocusOut("123");
    equal( testfield.val(), "123" );
  });

  test('test when clearifnotmatch javascript notation #2', 4, function(){
    var typeAndFocusOut = function(typedValue){
      testfield.keydown().val(typedValue).trigger('input');
      testfield.trigger("focusout");
    };

    testfield.mask('7 (000) 000-0000');

    typeAndFocusOut("1");
    equal( testfield.val(), "7 (1" );

    testfield.mask('7 (000) 000-0000', {clearIfNotMatch: true});

    typeAndFocusOut("1");
    equal( testfield.val(), "" );

    typeAndFocusOut("12");
    equal( testfield.val(), "" );

    typeAndFocusOut("7 (123) 123-1234");
    equal( testfield.val(), "7 (123) 123-1234" );
  });

  test('test when clearifnotmatch is HTML notation', 3, function(){
    var typeAndFocusOut = function(typedValue){
      testfieldDataMaskWithClearIfNotMatch.keydown().val(typedValue).trigger('input');
      testfieldDataMaskWithClearIfNotMatch.trigger("focusout");
    };

    typeAndFocusOut("1");
    equal( testfieldDataMaskWithClearIfNotMatch.val(), "" );

    typeAndFocusOut("12");
    equal( testfieldDataMaskWithClearIfNotMatch.val(), "" );

    typeAndFocusOut("123");
    equal( testfieldDataMaskWithClearIfNotMatch.val(), "123" );
  });

  module('testing Remove If Not Match Feature');

  test('test when clearifnotmatch javascript notation', 1, function(){

    testfield.mask('000', {placeholder: '___'});
    equal( testfield.attr('placeholder'), "___" );

  });

  test('test when clearifnotmatch with optional mask', 9, function(){
    // html notation
    var typeAndBlur = function(field, typedValue){
      field.keydown().val(typedValue).trigger('input');
      field.trigger("focusout");
    };

    typeAndBlur(testfieldDataMaskWithClearIfNotMatchAndOptionalMask, "1");
    equal( testfieldDataMaskWithClearIfNotMatchAndOptionalMask.val(), "" );

    typeAndBlur(testfieldDataMaskWithClearIfNotMatchAndOptionalMask, "12");
    equal( testfieldDataMaskWithClearIfNotMatchAndOptionalMask.val(), "12" );

    typeAndBlur(testfieldDataMaskWithClearIfNotMatchAndOptionalMask, "123");
    equal( testfieldDataMaskWithClearIfNotMatchAndOptionalMask.val(), "123" );

    // javascript notation
    testfield.mask('099.099.099.099', {clearIfNotMatch: true});

    typeAndBlur(testfield, "1");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "123.");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "123.0");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "123.01.000.");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "123.01.000.123");
    equal( testfield.val(), "123.01.000.123" );

    typeAndBlur(testfield, "0.0.0.0");
    equal( testfield.val(), "0.0.0.0" );
  });

  test('test when clearifnotmatch with recursive mask', 4, function(){
    // html notation
    var typeAndBlur = function(field, typedValue){
      field.keydown().val(typedValue).trigger('input');
      field.trigger("focusout");
    };

    // javascript notation
    testfield.mask('#.##0,00', {clearIfNotMatch: true, reverse: true});

    typeAndBlur(testfield, "0");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "00");
    equal( testfield.val(), "" );

    typeAndBlur(testfield, "0,00");
    equal( testfield.val(), "0,00" );

    typeAndBlur(testfield, "1.000,00");
    equal( testfield.val(), "1.000,00" );

  });

  module('dynamically loaded elements')
  test('#non-inputs', function(){
    expect(5);

    var $container = $('#container-dy-non-inputs');
    var clock = this.clock;
    var ticker;
    var tester;
    var c = 0;

    function write() {

      if (c >= 5) {
          clearInterval(ticker);
          clearInterval(tester);
          return;
      }

      c++;

      $container.append('<div class="c">' + c + c + c + c + '</div>');
      clock.tick(1000);
    };

    function testIt() {

      var cs = $container.find('.c');
      $.each(cs, function(k, field){
        var t = k + 1;
        equal($(field).text(), '' + t + t + ':' + t + t);
        t++;
      });
    };

    ticker = setInterval(write, 1000);

    write();
    $('.c', $container).mask('00:00');
    testIt()
  });
});
