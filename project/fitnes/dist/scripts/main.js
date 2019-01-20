$('#doOrder').click(function() {
  $('#modalWindowOrder').modal('show')
});


$('#toLearnMore').click(function(e){
  e.preventDefault();

  $('#modalWindowOrder').modal('show');
  // var
  //   sc = $(this).attr("href"),
  //   dn = $(sc).offset().top;
  //
  // $('html, body').animate({scrollTop: dn}, 1000);
});


$('#formOrder').submit(function(e) {
  var
    elem = $(this),
    button = $("[type=submit], button",elem);

  var name = $('input[name=name]', this);
  var phone = $('input[name=phone]', this);

  name.val($.trim(name.val()));
  phone.val($.trim(phone.val()));

  if (!name.val()) {
    alert('Укажите корректные ФИО!');
    return false;
  }

  if (!phone.val() || phone.val().length < 7) {
    alert('Укажите корректный телефон!');
    return false;
  }

  button.prop("disabled", true);
  sendData(name.val(), phone.val());
  return false;
});

$(document).ready(function() {

});

function carousel() {
//   var i;
//   var header_el = document.getElementsByClassName("header header_bg color-overlay");
// //  for (i = 0; i < x.length; i++) {
// //    x[i].style.display = "none";
// //  }
//   slideIndex++;
//   if (slideIndex > 3) {slideIndex = 1}
//   header_el[0].style.backgroundImage = "url(../images/mini_bands_" + slideIndex + ".jpg)";
//   setTimeout(carousel, 3000); // Change image every 2 seconds
}
