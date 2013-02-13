var QUNIT = true;
$(document).ready(function(){

    $('body').append('<input class="simple-field" type="text" />');
    var testfield = $('.simple-field'),
      typeTest = function (typedValue) {
      return testfield.val(typedValue).trigger('keyup').val();
    };

    module('Setting Up');
    test("test if the mask method exists after plugin insertion", function() {
      equal( typeof testfield.mask , "function" , "mask function should exists" );
    });

    module("Automatic Maxlength");
    test("maxlength should be 11", function(){
      testfield.mask('999-9990-99');
      equal( testfield.attr('maxlength'), 11)
    });

    module('Simple Masks');
    test("Masks with only numbers.", function(){
      testfield.mask('000000');

      equal( typeTest("1."), "1");
      equal( typeTest('1éáa2aaaaqwo'), "12");
      equal( typeTest('1234567'), "123456");

    });

    test('When I typed a char thats the same as the mask char', function(){
      testfield.mask('00/00/0000');
      equal( typeTest("00/"), "00/");
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


    module('Masks with numbers and especial characters');

    test("Masks with numbers and special characters.", function(){
      testfield.mask('(123) 456-7899');

      equal( typeTest("1"), "(1");
      equal( typeTest('12'), "(12");
      equal( typeTest('123'), "(123");
      equal( typeTest('1234'), "(123) 4");
      equal( typeTest('12345'), "(123) 45");
      equal( typeTest('123456'), "(123) 456");
      equal( typeTest('1234567'), "(123) 456-7");
      equal( typeTest('12345678'), "(123) 456-78");
      equal( typeTest('123456789'), "(123) 456-789");
      equal( typeTest('1234567899'), "(123) 456-7899");
      equal( typeTest('12345678999'), "(123) 456-7899");

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
      equal( typeTest('12345678'), "(123) 456-78");
      equal( typeTest('123456789'), "(123) 456-789");
      equal( typeTest('1234567899'), "(123) 456-7899");
      equal( typeTest('12345678999'), "(123) 456-7899");

    });

    test("Masks with numbers, strings e special characters", function(){
      testfield.mask('(999) A99-SSSS');

      equal( typeTest("1"), "(1");
      equal( typeTest('12'), "(12");
      equal( typeTest('123'), "(123");
      equal( typeTest('1234'), "(123) 4");
      equal( typeTest('123A'), "(123) A");
      equal( typeTest('123.'), "(123");
      equal( typeTest('12345'), "(123) 45");
      equal( typeTest('123456'), "(123) 456");
      equal( typeTest('123456A'), "(123) 456-A");
      equal( typeTest('123456AB'), "(123) 456-AB");
      equal( typeTest('123456ABC'), "(123) 456-ABC");
      equal( typeTest('123456ABCD'), "(123) 456-ABCD");
      equal( typeTest('123456ABCDE'), "(123) 456-ABCD");

    });

    module("Testing Reversible Masks");

    test("Testing a CPF Mask", function(){
      testfield.mask('000.000.000-00', {reverse: true});

      equal( typeTest("1"), "1");
      equal( typeTest("12"), "12");
      equal( typeTest("123"), "1-23");
      equal( typeTest("1234"), "12-34");
      equal( typeTest("12345"), "123-45");
      equal( typeTest("123456"), "1.234-56");
      equal( typeTest("1234567"), "12.345-67");
      equal( typeTest("12345678"), "123.456-78");
      equal( typeTest("123456789"), "1.234.567-89");
      equal( typeTest("1234567890"), "12.345.678-90");
      equal( typeTest("12345678900"), "123.456.789-00");
      equal( typeTest("123456789000"), "123.456.789-00");

    });

    module('Removing mask');

    test("when disabing a simple mask", function(){
      testfield.mask('(00) 0000-0000');

      equal( typeTest("1299999999"), "(12) 9999-9999");

      testfield.data('mask').remove();
      equal( testfield.val(), "1299999999");

    });

    module('testing setting')

    test("when adding more itens to the table translation",function(){
      testfield.mask('00/00/0000', {'translation': {0: '([0-9*])'}});

      equal( typeTest('12/34/5678'), '12/34/5678');
      equal( typeTest('**/34/5678'), '**/34/5678');
    });

    test("when adding more itens to the table translation #2",function(){
      testfield.mask('11/YY/0000', {'translation': {'Y': '([0-9*])'}});

      equal( typeTest('12/34/5678'), '12/34/5678');
      equal( typeTest('12/**/5678'), '12/**/5678');
    });

    module('Testing private methods');

    test("#maskToRegex", function(){
      testfield.mask('(00) 0000-0000');
      equal(testfield.data('mask').__p.maskToRegex('01/23/4567'), "(\\d)(\\d)(/)?(\\d)(\\d)(/)?(\\d)(\\d)(\\d)(\\d)");
      equal(testfield.data('mask').__p.maskToRegex('AA/SS'), "([a-zA-Z0-9])([a-zA-Z0-9])(/)?([a-zA-Z])([a-zA-Z])");
      equal(testfield.data('mask').__p.maskToRegex(':-.()/,_ +'), "(:)?(-)?(\\\.)?(\\()?(\\))?(/)?(,)?(_)?(\\s)?(\\\+)?");
    });
  });