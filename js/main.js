var elementPosition = $('.docs-nav').offset();

var donationBar   = document.getElementsByClassName('donate')[0],
    donationClose = donationBar.getElementsByTagName('i')[0];

$(window).scroll(function(){
  if($(window).scrollTop() > elementPosition.top - 120){
    $('.docs-nav').addClass('fixed');
  } else {
    $('.docs-nav').removeClass('fixed');
  }

  if ( $(window).scrollTop() > 600 ) {
    donationClose.classList.remove('hidden');
  } else {
    donationClose.classList.add('hidden');
  }

  if ( $(window).scrollTop() == 0 ) {
    donationBar.classList.remove('top');
  }
});

donationClose.addEventListener('click', function() {
  donationBar.classList.add('hidden');

  setTimeout(function(){
    donationBar.classList.add('top');
    donationBar.classList.remove('hidden');
  }, 200);
});

var codeNavigationLinks = $('.code-nav a'),
    codeTopic = document.getElementsByClassName('doc-point');

for (var i = 0; i < codeNavigationLinks.length; i++) {
  codeNavigationLinks[i].addEventListener('click', function(e) {
    e.preventDefault();

    var codeTopicId = this.getAttribute('href');

    removeActiveCodeNavItem();
    $(this).addClass('active');

    for (var i = 0; i < codeTopic.length; i++) {
      if ( '#' + codeTopic[i].getElementsByTagName('h3')[0].getAttribute('id') == codeTopicId ) {
        $('html, body')
        .animate(
          { scrollTop: $(codeTopic[i]).offset().top - 120 + 'px' },
          500
        );
      }
    }
  });
}

var removeActiveCodeNavItem = function() {
  for (var i = 0; i < codeNavigationLinks.length; i++) {
    if ( $(codeNavigationLinks[i]).hasClass('active') )
      $(codeNavigationLinks[i]).removeClass('active');
  }
}
