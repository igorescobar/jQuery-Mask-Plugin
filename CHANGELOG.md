== v1.11.3 (Jan/28 2015 15:41 -0200 by Igor Escobar) ==

Changes:

* Added commonjs module definition

== v1.11.2 (Dec/26 2014 15:36 -0200 by Igor Escobar) ==

Bugfixes:

* unreachable code

== v1.11.1 (Dec/26 2014 15:34 -0200 by Igor Escobar) ==

Bugfixes:

* unreachable code

== v1.11.0 (Dec/26 2014 15:33 -0200 by Igor Escobar) ==

Features:

* implementing selectOnFocus and data-mask-selectonfocus option
* adding public method called: .applyDataMask in case you want to decide whether to apply masks in data-mask fields

== v1.10.13 (Nov/19 2014 16:06 -0200 by Igor Escobar) ==

Bugfixes:

* fixing bug with watchInputs feature when mask is used as a function and not a string.

== v1.10.12 (Nov/06 2014 13:08 -0200 by Igor Escobar) ==

Changes:

* making a few improvements to make selection, copy events easier

== v1.10.11 (Nov/06 2014 11:26 -0200 by Igor Escobar) ==

Bugfixes:

* we need to revaluate dataMask flags everytime

== v1.10.10 (Nov/06 2014 10:41 -0200 by Igor Escobar) ==

Bugfixes:

* fixing dynamically data-mask added elements

== v1.10.9 (Nov/05 2014 10:52 -0200 by Igor Escobar) ==

Bugfixes:

* data-mask wasnt working

== v1.10.8 (Nov/01 2014 13:49 -0200 by Igor Escobar) ==

Changes:

* we dont need to seek for data-mask every time

== v1.10.7 (Nov/01 2014 13:18 -0200 by Igor Escobar) ==

Changes:

* little optimization

== v1.10.6 (Oct/28 2014 13:59 -0200 by Igor Escobar) ==

Bugfixes:

* fixing weird cursor problems in weird cases.
* dynamically added inputs wasnt working

== v1.10.5 (Oct/23 2014 11:41 -0200 by Igor Escobar) ==

Bugfixes:

* fixing weird cursor problems in weird cases.

== v1.10.4 (Oct/23 2014 11:02 -0200 by Igor Escobar) ==

Bugfixes:

* fixing on the fly mask change feature.

== v1.10.3 (Oct/22 2014 09:50 -0200 by Igor Escobar) ==

Bugfixes:

* fixing unmask method.

== v1.10.2 (Oct/20 2014 16:38 -0200 by Igor Escobar) ==

Bugfixes:

* onChange event fired at the wrong time when the field already has a value.

== v1.10.1 (Oct/20 2014 16:08 -0200 by Igor Escobar) ==

Bugfixes:

* fixing onChange event behaviour

== v1.10.0 (Oct/20 2014 10:56 -0200 by Igor Escobar) ==

Features:

* adding a way to change global settings like translation object and the byPassKeys object.

== v1.9.2 (Oct/20 2014 10:08 -0200 by Igor Escobar) ==

Bugfixes:

* fixing fallback digits implementation. Thanks @A1rPun

== v1.9.1 (Oct/18 2014 12:27 -0300 by Igor Escobar) ==

Bugfixes:

* cant convert circular json exception

== v1.9.0 (Oct/18 2014 12:07 -0300 by Igor Escobar) ==

Features:

* adding onInvalid callback

== v1.8.0 (Oct/17 2014 11:35 -0300 by Igor Escobar) ==

Changes:

* removing automatic maxlength support
* making a few optimizations to make it faster and retro compatible with other libraries
* creating globalOptions to make it more fast and flexible

Bugfixes:

* fixing issue #196

Features:

* adding the fallback translation option

== v1.7.8 (Oct/15 2014 10:55 -0300 by Igor Escobar) ==

Bugfixes:

* change event may experience issues
* avoid maximum call stack trace error

== v1.7.7 (Sep/10 2014 22:31 -0300 by Igor Escobar) ==

Bugfixes:

* fixing clojure compile issue

== v1.7.6 (Sep/10 2014 22:14 -0300 by Igor Escobar) ==

Bugfixes:

* fixing clearifnotmatch in masks with literal digits

== v1.7.5 (Sep/09 2014 15:43 -0300 by Igor Escobar) ==

Bugfixes:

* fixing paste inside of empty fields.

== v1.7.4 (Aug/11 2014 14:53 -0300 by Igor Escobar) ==

Changes:

* smaller and reliable code

== v1.7.3 (Aug/11 2014 11:28 -0300 by Igor Escobar) ==

Bugfixes:

* fixing issue #185

== v1.7.2 (Aug/08 2014 11:11 -0300 by Igor Escobar) ==

Changes:

* smaller code

Bugfixes:

* fixing remove bug

== v1.7.1 (Aug/08 2014 00:55 -0300 by Igor Escobar) ==

Changes:

* upgrading zepto, smaller syntax and fixing build

== v1.7.0 (Aug/07 2014 23:56 -0300 by Igor Escobar) ==

Features:

* applying masks to dynamically added elements. (html/javascript notation)

== v1.6.5 (Jun/30 2014 10:24 -0300 by Igor Escobar) ==

Bugfixes:

* fixing clearIfNotMatch feature in cases of optional and recursive digits

== v1.6.4 (May/08 2014 23:54 -0300 by Igor Escobar) ==

Changes:

* testing some deployment stunts

== v1.6.3 (May/08 2014 23:51 -0300 by Igor Escobar) ==

Changes:

* testing some deployment stunts

== v1.6.2 (May/08 2014 23:45 -0300 by Igor Escobar) ==

Bugfixes:

* fuckin typo

== v1.6.1 (May/08 2014 23:39 -0300 by Igor Escobar) ==

Bugfixes:

* fixing autofocus bug

== v1.6.0 (May/07 2014 21:13 -0300 by Igor Escobar) ==

Bugfixes:

* fixing autofocus bug

Features:

* adding support to the clearIfNotMatch option
* HTML5 placeholder support

== v1.5.7 (May/01 2014 18:37 -0300 by Igor Escobar) ==

Changes:

* some cleanup and stuff

== v1.5.6 (May/01 2014 18:30 -0300 by Igor Escobar) ==

Bugfixes:

* Bug in calculating difference between mask characters between old and new field values
* Fix stack limit exceeded

== v1.5.5 (Apr/27 2014 13:47 -0300 by Igor Escobar) ==

Changes:

* UMD (Universal Module Definition) patterns for JavaScript modules

Bugfixes:

* caret position correction
* 114 - Fix onChange Event error

== v1.5.4 (Feb/09 2014 12:02 -0200 by Igor Escobar) ==

Changes:

* optmizing code

== v1.5.3 (Feb/08 2014 14:59 -0200 by Igor Escobar) ==

Bugfixes:

* fixing ctrl a bug

== v1.5.2 (Dec/20 2013 16:35 -0200 by Igor Escobar) ==

Changes:

* smaller source code

== v1.5.1 (Dec/18 2013 22:34 -0200 by Igor Escobar) ==

Changes:

* fixing some code climate problems

== v1.5.0 (Dec/18 2013 22:10 -0200 by Igor Escobar) ==

Bugfixes:

* fixing getCleanVal()

Features:

* new public method called cleanVal

== v1.4.2 (Dec/16 2013 15:48 -0200 by Igor Escobar) ==

Bugfixes:

* Dirty fix for masks not completing with a literal

== v1.4.1 (Dec/09 2013 21:23 -0200 by Igor Escobar) ==

Changes:

* revising ignored keys

== v1.4.0 (Nov/28 2013 18:06 -0200 by Igor Escobar) ==

Features:

* caret positioning implementation

== v1.3.1 (Oct/08 2013 20:38 -0300 by Igor Escobar) ==

Changes:

* adding more keys to ignore list to make the char navigation smoothly

Bugfixes:

* Sounds like 'options' has disappeared for some reason

== v1.3.0 (Sep/13 2013 10:37 -0300 by Igor Escobar) ==

Features:

* creating the maxlength option

== v1.2.0 (Sep/07 2013 12:07 -0300 by Igor Escobar) ==

Features:

* adding the possibility to put recursive digits inside masks

== v1.1.3 (Sep/04 2013 21:21 -0300 by Igor Escobar) ==

Bugfixes:

* fixing late masking

== v1.1.2 (Aug/26 2013 15:08 -0300 by Igor Escobar) ==

Bugfixes:

* fixing mask on div,span etc

== v1.1.1 (Aug/26 2013 14:42 -0300 by Igor Escobar) ==

Bugfixes:

* better callback handling

== v1.1.0 (Aug/24 2013 15:59 -0300 by Igor Escobar) ==

Features:

* adding onchange support

== v1.0.3 (Aug/23 2013 23:10 -0300 by Igor Escobar) ==

Changes:

* optimizations to mask on non html fields

== v1.0.2 (Aug/23 2013 22:46 -0300 by Igor Escobar) ==

Bugfixes:

* adding remask method do improve callback performance

== v1.0.1 (Aug/23 2013 22:01 -0300 by Igor Escobar) ==

Changes:

* normal releases again

== v1.0.0 (Aug/23 2013 21:59 -0300 by Igor Escobar) ==

Features:

* huge refactoring focusing no reduce source code weight and bugfixing

== v0.11.5 (Aug/20 2013 17:11 -0300 by Igor Escobar) ==

Bugfixes:

* bug fixing when mask range is bigger than 2 digits.

== v0.11.4 (Aug/19 2013 10:24 -0300 by Igor Escobar) ==

Changes:

* adding de delete key to byPassKeys

== v0.11.3 (Aug/18 2013 00:48 -0300 by Igor Escobar) ==

Bugfixes:

* fixing zepto compatibily

== v0.11.2 (Aug/17 2013 18:39 -0300 by Igor Escobar) ==

Bugfixes:

* jmask iterate all items

== v0.11.1 (Aug/17 2013 18:32 -0300 by Igor Escobar) ==

Changes:

* a little bit smaller source code

== v0.11.0 (Aug/16 2013 21:27 -0300 by Igor Escobar) ==

Bugfixes:

* Altered "ignored keys" hook to run events (i.e. onKeyPress) afterwards. Otherwise, we miss key triggered events when the user deletes the entire text box, etc.

Features:

* adding support to method getCleanVal

== v0.10.1 (Jul/26 2013 09:35 -0300 by ) ==



== v0.10.0 (Jul/19 2013 23:07 -0300 by Igor Escobar) ==

Features:

* adding data-mask support

== v0.9.1 (Jul/19 2013 22:35 -0300 by Igor Escobar) ==

Changes:

* jQuery-Mask-Plugin is now available at bower.io

Bugfixes:

* fixing addEventListener on IE7

== v0.9.0 (Apr/24 2013 07:44 -0300 by Igor Escobar) ==

Features:

* Adding compatibility with Zepto.js

== v0.8.0 (Apr/07 2013 18:39 -0300 by Igor Escobar) ==

Features:

* applying masks anything != than input :)
* implementing the possibility of range chars ex: A{1,3}

== v0.7.11 (Apr/05 2013 22:12 -0300 by Igor Escobar) ==

Changes:

* now when you type a wrong char, the plugin will make your text fit inside of the mask instead of lose your data.

== v0.7.10 (Apr/04 2013 22:14 -0300 by Igor Escobar) ==

Changes:

* changing yui-compressor to clojure-compiler

== v0.7.9 (Apr/04 2013 22:04 -0300 by Igor Escobar) ==

Changes:

* refactoring and implementation of optional mask digits

Bugfixes:

* fixing maxlength and adding a smarter mask removal. issue #18

== v0.7.8 (Mar/30 2013 00:48 -0300 by Igor Escobar) ==

Changes:

* a few changes to get the code smallest possible.
* removing unnecessary methods and making code smaller.

== v0.7.7 (Mar/29 2013 12:38 -0300 by Igor Escobar) ==

Bugfixes:

* fixing copy and paste problem related on issue #15

== v0.7.6 (Mar/29 2013 00:28 -0300 by Igor Escobar) ==

Bugfixes:

* correcting mask formatationg problem related on issue #16

== v0.7.5 (Mar/03 2013 20:56 -0300 by Igor Escobar) ==

Changes:

* generating .gz file on deploy

== v0.7.4 (Mar/03 2013 20:38 -0300 by Igor Escobar) ==

Changes:

* changing minifier jsmin to yui compressor.

== v0.7.3 (Mar/02 2013 01:12 -0300 by Igor Escobar) ==

Bugfixes:

* bug fixing when typed wrong data type on mixing masks.

== v0.7.2 (Feb/24 2013 22:02 -0300 by Igor Escobar) ==

Bugfixes:

* fuckin stupid comma.

== v0.7.1 (Feb/24 2013 21:57 -0300 by Igor Escobar) ==

Changes:

* testing the private method maskToRegex
* a little bit of changes to make the code more testable

== v0.7.0 (Feb/12 2013 00:30 -0200 by Igor Escobar) ==

Features:

* Now you can decide for jquery mask plugin how to interpret 0 to 9, A and S and even teach him how to reconize patterns.

== v0.6.3 (Feb/11 2013 12:20 -0200 by Igor Escobar) ==

Bugfixes:

* When the user paste a text and the last char is valid sanitize may fail

== v0.6.2 (Feb/11 2013 00:02 -0200 by Igor Escobar) ==

Bugfixes:

* allowing the user type the same character as the mask without erasing it.

== v0.6.1 (Jan/20 2013 23:57 -0200 by Igor Escobar) ==

Changes:

* changing the way ta deployment occurs to correct jquery plugins deployments.

== v0.6.0 (Jan/18 2013 17:19 -0200 by Igor Escobar) ==

Changes:

* Now pushing jQuery Mask Plugin to jQuery Plugins Repository

== v0.5.4 (Jan/17 2013 23:06 -0200 by Igor Escobar) ==

Changes:

* upgrading jquery plugins manifest file

== v0.5.3 (Jan/17 2013 22:48 -0200 by Igor Escobar) ==

Bugfixes:

* correctly generating jmask version inside of jquery mask source

== v0.5.2 (Jan/17 2013 22:43 -0200 by Igor Escobar) ==

Changes:

* Now pushing to jQuery Plugin Repository

== v0.5.1 (Jan/07 2013 23:33 -0200 by Igor Escobar) ==

Changes:

* improving the deploy process with the new stepup's upgrade.

== v0.5.0 (Oct/27 2012 13:40 -0200 by Igor Escobar) ==

Bugfixes:

* Bug fixes on OnSupport method with Firefox.

Features:

* the first parameter of the .mask() function, now accepts a string or a anonymous function

== v0.4.7 (Aug/06 2012 22:56 -0300 by Igor Escobar) ==

Changes:

* Nothing big, just class refactoring

== v0.4.6 (Aug/06 2012 01:25 -0300 by Igor Escobar) ==

Changes:

- better OOP design
- implementing the jquery data object on each mask field
- implementing the public method .remove to disable and remove the mask

== v0.4.5 (Aug/04 2012 01:31 -0300 by Igor Escobar) ==

Changes:

- improving support to complex jquery selectors
- performance improvement.
- callback handling improvement

== v0.4.4 (Jun/03 2012 21:01 -0300 by Igor Escobar) ==

Bugfixes:

* Bug fixes on Internet Explorer 8.

== v0.4.3 (Mar/19 2012 21:52 -0300 by Igor Escobar) ==

Bugfixes:

* Corrigindo bug para mascaras com +

== v0.4.2 (Mar/18 2012 15:28 -0300 by Igor Escobar) ==

Bugfixes:

* Mascara não pararecia no firefox

== v0.4.1 (Mar/18 2012 15:01 -0300 by Igor Escobar) ==

Bugfixes:

* Corrigindo tim das macaras.

== v0.4.0 (Mar/18 2012 14:51 -0300 by Igor Escobar) ==

Features:

* Implementado mascara reversa para moeda/cpf/rg/etc.
* Nova engine.

== v0.3.0 (Mar/14 2012 10:14 -0300 by Igor Escobar) ==

Changes:

* License and comments up to date.

Features:

* On-the-fly mask change.
* onComplete and onKeyPress new callbacks.

== v0.2.5 (Mar/13 2012 22:55 -0300 by Igor Escobar) ==

Bugfixes:

- Corrigindo ctrl+v com mascara errada. - Cortando dados que exceder a mascara no ctrl+v ou se segurar alguma tecla. - Refatorando algumas partes do código.

== v0.2.4 (Mar/13 2012 11:06 -0300 by Igor Escobar) ==

Changes:

* Codigo refatorado, otimizado, validação mais precisa e efetiva.

== v0.2.3 (Mar/13 2012 01:01 -0300 by Igor Escobar) ==

Changes:

* Melhorando expressoes regulares.

== v0.2.2 (Mar/13 2012 00:50 -0300 by Igor Escobar) ==

Bugfixes:

* Corrindo regex de validação

== v0.2.1 (Mar/13 2012 00:41 -0300 by Igor Escobar) ==

Bugfixes:

* Corrigida validação alphanumerica.

== v0.2.0 (Mar/13 2012 00:24 -0300 by Igor Escobar) ==

Features:

- Input Data Type Validation.
- Automatic MaxLength (When are not defined).
- Live Event Implemented for Ajax-based Apps.
- Mixed mask with validation.
* S for string digit
* A for alphanumeric digit
* 0 to 9 for numeric digit.

== v0.1.1.1 (Mar/10 2012 21:49 -0300 by Igor Escobar) ==

- Isolando instancia do jQuery para dentro do Plugin
- Crossbrowser keyCode
- Implementando mascaras sequencias
- Aprimorando preenchimento das mascaras
- Adicionando as setas do teclado como byPassKeys

== v0.1.1 (Mar/10 2012 14:05 -0300 by Igor Escobar) ==

Bugfixes:

* Implementando Crossbrowser event handling.

== v0.1.0 (Mar/10 2012 13:10 -0300 by Igor Escobar) ==

Features:

* Implementando mascaras com espaço para data e hora

== v0.0.1 (Mar/10 2012 04:42 -0300 by Igor Escobar) ==

Changes:

* Refatorando o codigo para suportar multiplas instancias

== v0.0.0.1 (Mar/10 2012 01:13 -0300 by Igor Escobar) ==

Primeira versão do jQuery-Mask-Plugin.
