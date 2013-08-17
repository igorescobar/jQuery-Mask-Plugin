var QUNIT = true;
$(document).ready(function(){

    var testfield = $('.simple-field'),
        testfieldDataMask = $('.simple-field-data-mask'),
        testdiv = $('.simple-div'),
        typeTest = function (typedValue, obj) {
          obj = typeof obj === "undefined" ? testfield : obj;

          return obj.val(typedValue).trigger('keyup').val();
        },
        typeDivTest = function(typedValue){
          return testdiv.text(typedValue).trigger('keyup').text();
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
      equal( typeTest("00a"), "00");
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


    module('Masks with numbers and especial characters');

    test("Masks with numbers and special characters.", function(){
      testfield.mask('(123) 456-7899');

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
      equal( typeTest('123.'), "(123");
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

    module('Removing mask');

    test("when disabing a simple mask", function(){
      testfield.mask('(00) 0000-0000');

      equal( typeTest("1299999999"), "(12) 9999-9999");

      testfield.data('mask').remove();
      equal( testfield.val(), "1299999999");
      equal( testfield.attr('maxlength'), undefined);
    });

    module('Getting Unmasked Value');

    test("when I get the unmasked value", function(){
      testfield.mask('(00) 0000-0000');

      equal( typeTest("1299999999"), "(12) 9999-9999");

      equal( testfield.data('mask').getCleanVal(), "1299999999");
    });

    module('personalized settings')

    test("when adding more itens to the table translation",function(){
      testfield.mask('00/00/0000', {'translation': {0: '[0-9*]'}});

      equal( typeTest('12/34/5678'), '12/34/5678');
      equal( typeTest('**/34/5678'), '**/34/5678');
    });

    test("when adding more itens to the table translation #2",function(){
      testfield.mask('11/YY/0000', {'translation': {'Y': '[0-9*]'}});

      equal( typeTest('12/34/5678'), '12/34/5678');
      equal( typeTest('12/**/5678'), '12/**/5678');
    });

    test("when adding opcional chars",function(){
      testfield.mask('0YY.0YY.0YY.0YY', {'translation': {'Y': '[0-9]?'}});

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

    test("Masks with range with optional numbers ", function(){
      testfield.mask('0{1,3}.0{1,3}.0{1,3}.0{1,3}');

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

    test("Masks with range with optional letters ", function(){
      testfield.mask('A{1,3}.S{1,3}.0{1,3}');

      equal( typeTest('0.0.0'), '0.');
      equal( typeTest('z1.s.00'), 'z1.s.00');

      testfield.mask('0{1,2}');
      equal( typeTest('0'), '0');
      equal( typeTest('00'), '00');

      testfield.mask('0{2,3}-0');
      equal( typeTest('0-'), '0');
      equal( typeTest('00-0'), '00-0');
      equal( typeTest('000-0'), '000-0');

      testfield.mask('0{2,3}-0');
      equal( typeTest('0-'), '0');
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



    module('Testing private methods');

    test("#getMask - Normal", function(){
      testfield.mask('(00) 0000-0000');
      equal(testfield.data('mask').p.getMask('0'), '(00) 0000-0000');
      equal(testfield.data('mask').p.getMask('000000'), '(00) 0000-0000');
      equal(testfield.data('mask').p.getMask('0000000000'), '(00) 0000-0000');
    });

    test("#getMask - Reverse", function(){
      testfield.mask('000.000.000-00', {reverse: true});
      equal(testfield.data('mask').p.getMask('0'), '0');
      equal(testfield.data('mask').p.getMask('00'), '00');
      equal(testfield.data('mask').p.getMask('000'), '0-00');
      equal(testfield.data('mask').p.getMask('0000'), '00-00');
      equal(testfield.data('mask').p.getMask('00000'), '000-00');
      equal(testfield.data('mask').p.getMask('000000'), '0.000-00');
      equal(testfield.data('mask').p.getMask('0000000'), '00.000-00');
      equal(testfield.data('mask').p.getMask('00000000'), '000.000-00');
      equal(testfield.data('mask').p.getMask('000000000'), '0.000.000-00');
      equal(testfield.data('mask').p.getMask('0000000000'), '00.000.000-00');
      equal(testfield.data('mask').p.getMask('00000000000'), '000.000.000-00');

      equal(testfield.data('mask').p.getMask('0'), '0');
      equal(testfield.data('mask').p.getMask('00'), '00');
      equal(testfield.data('mask').p.getMask('0-00'), '0-00');
      equal(testfield.data('mask').p.getMask('00-00'), '00-00');
      equal(testfield.data('mask').p.getMask('000-00'), '000-00');
      equal(testfield.data('mask').p.getMask('0.000-00'), '0.000-00');
      equal(testfield.data('mask').p.getMask('00.000-00'), '00.000-00');
      equal(testfield.data('mask').p.getMask('000.000-00'), '000.000-00');
      equal(testfield.data('mask').p.getMask('0.000.000-00'), '0.000.000-00');
      equal(testfield.data('mask').p.getMask('00.000.000-00'), '00.000.000-00');
      equal(testfield.data('mask').p.getMask('000.000.000-00'), '000.000.000-00');
    });

    test("#maskToRegex", function(){
      testfield.mask('(00) 0000-0000');
      equal(testfield.data('mask').p.maskToRegex('01/23/4567'), "(\\d)?(\\d)?(/)?(\\d)?(\\d)?(/)?(\\d)?(\\d)?(\\d)?(\\d)?");
      equal(testfield.data('mask').p.maskToRegex('AA/SS'), "([a-zA-Z0-9])?([a-zA-Z0-9])?(/)?([a-zA-Z])?([a-zA-Z])?");
      equal(testfield.data('mask').p.maskToRegex(':-.()/,_ +'), "(:)?(-)?(\\\.)?(\\()?(\\))?(/)?(,)?(_)?(\\s)?(\\\+)?");
    });


    module('Testing data-mask attribute support');
    
    test("Testing data-mask attribute", function(){
      equal( typeTest("00/", testfieldDataMask), "00/");
      equal( typeTest("00a", testfieldDataMask), "00");
      equal( typeTest("00a00/00", testfieldDataMask), "00/00/00");
      equal( typeTest("0a/00/00", testfieldDataMask), "00/00/0");
      equal( typeTest("0a/0a/00", testfieldDataMask), "00/00");
      equal( typeTest("00000000", testfieldDataMask), "00/00/0000");
    });


  });