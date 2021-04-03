$(document).ready(function() {

    let $contactBtn     = $('.contact-button'),
        $window         = $(window),
        $navbarItems    = $('li.nav-item');
        $navbarLink     = $('.navbar-list li a.nav-link'),
        $section        = $('.service'),
        $animatedIcone  = $('i.animated'),
        $button         = $('button.animated'),
        $navbar         = $('nav.navbar'),
        $sections       = $('section.block'),
        $contactSection = $('#contact-us');
        $moreBtn        = $('.more-products'),
        $productsPara   = $('.product p'),
        $readMoreBtn    = $('.product div button'),
        $sevrvice       = $('.service'),
        $input          = $(':input[required]');
    
    
    const readMoreHandle = function(paragraph, button) {
        let maxLength = 100;
        let orignalText;
        let shortTxt;
        paragraph.each(function() {
            orignalText = $(this).text();
            $(this).after('<p class="hidden-para">' + orignalText + '</p>');
            if(paragraph.hasClass('hidden-para')) {
                shortTxt = $(this).text();
                $(this).text(shortTxt);
            } else {
                shortTxt = $(this).text().substr(0, maxLength);
                $(this).text(shortTxt + '...');
            }
        });
        button.click(function(event) {
            let $target = event.target;
            let $hiddenText = $($target).siblings('p.hidden-para').text();
            let header = $(this).parent('div').siblings('h5.main-color').text();
            $('.modal-body').text($hiddenText);
            $('.modal-title').text(header);
        });
    };
    readMoreHandle($productsPara, $readMoreBtn);

    $('.site-header').height($(window).height());

    $navbarItems.click(function(event) {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $navbarLink.click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('section')).offset().top - 100
        }, 1000);
    });

    $section.hover(function() {
        $(this).each(function() {
            let $animate = $(this).find('button.animated');
            if($animate.hasClass('shake')) {
                $animate.removeClass('shake');
            } else {
                $animate.addClass('shake');
            }
        });
    });
    $('.service-last').hover(function() {
        let $btn = $(this).find('button.animated');
        if($btn.hasClass('shake')) {
            $btn.removeClass('shake');
        } else {
            $btn.addClass('shake');
        }
        if($(this).hasClass('box-shadow')) {
            $(this).removeClass('box-shadow');
        } else {
            $(this).addClass('box-shadow');
        }
    });

    $sevrvice.each(function() {
        $(this).hover(function() {
            if($(this).hasClass('box-shadow')) {
                $(this).removeClass('box-shadow');
            } else {
                $(this).addClass('box-shadow');
            }
        });
    });

    $button.each(function() {
        $(this).hover(function() {
            if($(this).hasClass('tada')) {
                $(this).removeClass('tada');
            } else {
                $(this).addClass('tada');
            }
        });
    });

    $('.more-products').click(function() {
        let hiddenProducts = $(this).parent().siblings('.hidden');
        hiddenProducts.addClass('show-hidden');
        $(this).hide();
    });
    $('section.products .product').each(function() {
        let $this = $(this);
        $this.hover(function() {
            let img = $this.find('.img-cover img');
            if(img.hasClass('add-filter')) {
                img.removeClass('add-filter');
            } else {
                img.addClass('add-filter');
            }
        });
    });

    $contactBtn.click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $contactSection.offset().top - 100
        }, 1000);
    });
    
    $window.on('scroll', function() {
        if($window.scrollTop() > 46) {
            $navbar.css({
                position: 'fixed',
                width: '100%',
                zIndex: '99999',
                top: '0',
            });
        } else {
            $navbar.css({
                position: 'unset',
                top: 'unset',
            });
        }
    });

     $('.carousel').carousel({
        interval: 10000
    });
    
    const isEmpty = function(fields) {
        let name     = fields[0];
        let email    = fields[1];
        let subject = fields[2];
        let message  = fields[3];
        if(name.value === '' ||  email.value === '' || subject.value === '' || message.value === '') {
            return true;
        }
    }
    const isNotEmpty = function(fields) {
        let name     = fields[0];
        let email    = fields[1];
        let subject = fields[2];
        let message  = fields[3];
        if(name.value.length > 0 && email.value.length > 0 && subject.value.length > 0 && message.value.length > 0) {
            return true;
        }
    }

    const buttonHandl = function(button) {
        button.hover(function() {
            if(isEmpty($input)) {
                if(!button.hasClass('disabled')) {
                    button.prop('disabled', true).css('cursor', 'no-drop');
                }
            }
            if(isNotEmpty($input)) {
                if(button.hasClass('disabled')) {
                    button.prop('disabled', false).css('cursor', 'auto');
                }
            }
        });
    }
    buttonHandl($('.send'));

    const onblurFocus = function(selector) {
        selector.focus(function() {
            let input  = $(this);
            input.keyup(function() {
                input.siblings('.error').fadeOut(300);
                if(input.val().length > 0 ) {
                    input.css({
                        border: '1px solid #2ecc71'
                    }, 300);
                } else {
                    input.siblings('.error').fadeIn(300);
                    input.css({
                        border: '1px solid #e74c3c'
                    });
                }
            });
        }).blur(function() {
            let input = $(this);
            if(input.val() === '') {
                input.siblings('.error').fadeIn(300);
                input.css({
                    border: '1px solid #e74c3c'
                });
            }
        });
    }
    onblurFocus($input);

    const emptyFieldsF = function(fields) {
        fields.each(function() {
            let $this = $(this);
            for(let i = 0; i < $this.length; i++) {
                $this.val('');
                $this.css({
                    boxShadow: 'none',
                });
            }
            return true;
        });
    }

    $('.send').click(function(event) {
        event.preventDefault();
        let form = $('form');

        const formData = form.serialize();
        if($(this).submit) {
            $.ajax({
                method: 'POST',
                url: './' + form.attr('action'),
                data: formData,
                success: function(data, status, xhr) {
                    if(status === 'success') {
                        let $successMsg = $('.ajax-succMsg');
                        $successMsg.fadeIn(200).delay(5000).fadeOut(200);
                        if(emptyFieldsF($input) === 'true') {
                           $input.each(function() {
                               let $this = $(this);
                            $input.siblings('.error').fadeOut(300);
                                $this.css({
                                    border: '1px solid #ced4da !important'
                                });
                           });
                        }
                    }
                },
                error: function(xhr, two, statusTxt) {
                    let $errMessage = $('.ajax-errMsg');
                    $errMessage.fadeIn(200).delay(5000).fadeOut(200);
                }
            });
        }
        
    });
});