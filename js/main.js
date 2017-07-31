var codeNavigationLinks = $('.code-nav a');

$(codeNavigationLinks).on('click', function(e) {
  codeNavigationLinks.removeClass('active');
  $(this).addClass('active');

  var codeTopicId = $(this).attr('href');
  var docPoint = $(codeTopicId).closest('.doc-point');

  $('html, body').animate({ scrollTop: $(docPoint).offset().top - 120 + 'px' }, 500);
});