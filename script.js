
var typing = new Typed(".text_animation", {
    strings: ["", "Website Designer", "Full Responsive Website", "FrontEnd Developer", "SEO Optimization"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true,
});

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function () {
    progress_bar();
});

function progress_bar() {
    var speed = 30;
    var items = $('.progress_bar').find('.progress_bar_item');
    items.each(function () {
        var item = $(this).find('.progress');
        var itemValue = item.data('progress');
        var i = 0;
        var value = $(this);

        var count = setInterval(function () {
            if (i <= itemValue) {
                var iStr = i.toString();
                item.css({
                    'width': iStr + '%'
                });
                value.find('.item_value').html(iStr + '%');
            }
            else {
                clearInterval(count);
            }
            i++;
        }, speed);
    });
}

const header = document.querySelector(".header-sticky");
const toggleClass = "is-sticky";
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add(toggleClass);
    } else {
        header.classList.remove(toggleClass);
    }
});

// Active Header Menu Js **********************************

var header_menu = $('.Ac_menu')
    , nav = $('.header_right')
    , nav_height = nav.outerHeight();
$(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
    header_menu.each(function () {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('activeMenu');
            header_menu.removeClass('activeMenu');

            $(this).addClass('activeMenu');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('activeMenu');
        }
    });
});

nav.find('a').on('click', function () {
    var $el = $(this)
        , id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);
    return false;
});

AOS.init();
// PortFolio Hide Show**************************

// $(document).ready(function () {
//     $('.gallery .portfolio_img_box:lt(4)').show();
//     $('.less').hide();
//     var items = 8;
//     var shown = 4;
//     $('.more').click(function () {
//         $('.less').show();
//         shown = $('.gallery .portfolio_img_box:visible').length+4;
//         if (shown < items) {
//             $('.gallery .portfolio_img_box:lt(' + shown + ')').show(300);
//         } else {
//             $('.gallery .portfolio_img_box:lt(' + items + ')').show(300);
//             $('.more').hide();
//         }
//     });
//     $('.less').click(function () {
//         $('.gallery .portfolio_img_box').not(':lt(4)').hide(300);
//         $('.more').show();
//         $('.less').hide();
//     });
// });

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait... "

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
       
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});