/*$(document).ready(function() {
  $('#forgot-password').click(function(e) {
    e.preventDefault();
    $('div#form-loginpage').toggle('500');
  });
  $('#back-to-login').click(function(e) {
    e.preventDefault();
    $('div#form-loginpage').toggle('500');
  });
  
 
});

*/

$(document).ready(function() {
  $('#forgot-password').click(function(e) {
    e.preventDefault();
    $('div#form-loginpage').hide(500);
    $('div#form-forgot').show(500);
    $('div#form-register').hide(500);
  });
  $('#back-to-login').click(function(e) {
    e.preventDefault();
    $('div#form-loginpage').show(500);
    $('div#form-forgot').hide(500);
    $('div#form-register').hide(500);
  });
  $('#register').click(function(e) {
	    e.preventDefault();
	    $('div#form-loginpage').hide(500);
	    $('div#form-forgot').hide(500);
	    $('div#form-register').show(500);
	  });
  $('#login-from-register').click(function(e) {
	    e.preventDefault();
	    $('div#form-loginpage').show(500);
	    $('div#form-forgot').hide(500);
	    $('div#form-register').hide(500);
	  });
 
});

