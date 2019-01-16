$(function(){
    $('.teh-reviews-slider').slick({
        infinite: true,
        slidesToShow: 2,
        arrows: true,
        slidesToScroll: 2,
        responsive: [
            {
              breakpoint: 901,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
              }
            }
        ]
    });

    $('.teh-example-slider').slick({
        infinite: true,
        slidesToShow: 4,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 901,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 701,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
            }
        ]
    });

    $('.teh-client-slider').slick({
        infinite: true,
        slidesToShow: 6,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 961,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
                breakpoint: 701,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                }
            },
            {
                breakpoint: 571,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                }
            }
        ]
    });

    $('.teh-banner').slick({
        infinite: true,
        slidesToShow: 1,
        arrows: true,
        dots:true,
        slidesToScroll: 1
    });
});
