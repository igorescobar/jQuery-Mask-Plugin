
var donationBar   = document.getElementsByClassName('donate')[0],
    donationClose = donationBar.getElementsByTagName('i')[0];

donationClose.addEventListener('click', function() {
  donationBar.classList.add('hidden');

  setTimeout(function(){
    donationBar.classList.add('top');
    donationBar.classList.remove('hidden');
  }, 200);
});


$(window).scroll(function(){
  var position = $(this).scrollTop();

  if ( $(window).scrollTop() > 300 ) {
    donationClose.classList.remove('hidden');
  } else {
    donationClose.classList.add('hidden');
  }

  if ( $(window).scrollTop() > 50 ) {
    donationBar.classList.add('scrolled');
  } else {
    donationBar.classList.remove('scrolled');
  }

  if ( $(window).scrollTop() == 0 ) {
    donationBar.classList.remove('top');
  }
});
