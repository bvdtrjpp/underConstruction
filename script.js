$(document).ready(function () {
    
    const DATE_DAY = 24;
    const DATE_MONTH = 7;
    const DATE_YEAR = 2024;

    const DATE_HOURS = 23;
    const DATE_MINUTES = 2;

    let intervalID = setInterval(function Counter(){

        let endDate = new Date(DATE_YEAR, DATE_MONTH-1, DATE_DAY, DATE_HOURS, DATE_MINUTES);
        let currentDate = new Date();
        gap = endDate - currentDate;

        if(gap<0){
            clearInterval(intervalID);
            gap = 0;
        }

        let days = Math.floor(gap / 1000 / 60 / 60 / 24);
        let hours = Math.floor(gap / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(gap / 1000 / 60) % 60;
        let seconds = Math.floor(gap / 1000) % 60;
    
        let UI_DAYS = $('#number-days');
        let UI_HOURS = $('#number-hours');
        let UI_MINUTES = $('#number-minutes');
        let UI_SECONDS = $('#number-seconds');
    
        UI_DAYS.html(days);
        UI_HOURS.html(hours);
        UI_MINUTES.html(minutes);
        UI_SECONDS.html(seconds);
        
    }, 1000);


//---------------------------ЛИСТНЕРЫ :D--------------------------------




    $('.list-item').click(function (e) { 
        e.preventDefault();

        
        
        if(!$(this).hasClass('active')){



            anotherItem = $('.list-item').filter('.active');
            anotherItemContent = anotherItem.find('.info-block');
            anotherItemContent.addClass('wrem').removeClass('wadd'); 
            anotherItem.addClass('deactive').removeClass('active');
            $(this).addClass('active').removeClass('deactive');
            $(this).find('.info-block').addClass('wadd').removeClass('wrem'); 
            // animate({

            //     'width' : '995px'

            // });
        }
    });

    $('.footer-input').on('input', function (e) { 


        if(isRightRegex(e.target.value)){

            $('.footer-button').attr('disabled', false);
            $('.footer-input-block').removeClass('error-message');
        }
        else{
            $('.footer-button').attr('disabled', true);
            $('.footer-input-block').addClass('error-message'); 
        }

    });


    $('.footer-button').click(function (e) { 
        e.preventDefault();
        let input = $('.footer-input');
        let email = input.val();

        $.ajax({
            type: 'POST',
            url: 'assets/backdoor/backdoor.php',
            data: {email : email},
            success: function (response) {
                if(response === 'okay'){

                    $('.pop-message').css('display', 'flex');
                    input.val("");

                }
                else alert('somthing wrong');
            },
            error: function(response){
                
            }
        });

    });

    $('.pop-close-button').click(function (e) { 
        e.preventDefault();
        closeWindow();
    });
    $('.close-cross').click(function (e) { 
        e.preventDefault();
        closeWindow();
    });
    

});

function closeWindow(){

    $('.pop-message').css('display', 'none');

}


function isRightRegex(value){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
}