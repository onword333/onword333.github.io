/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 /*$('.slider').slick();*/
 
 $('.slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  cssEase: 'linear'
});


$('.tovar-slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  cssEase: 'linear'
});

function showHideSearchForm() {
    $('.search-form').slideToggle();
}


$('#range-weight').on('input', function () {
    

    $('#calc-weight').text(this.value);
});


/*
$('.range-weight').change(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    alert($(this).attr('max'));
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #78886c), '
                + 'color-stop(' + val + ', #bababa)'
                + ')'
                );
});
*/