$( document ).ready(function() {

  // GAME
  var tries = 3;
  var endGame = false;
  var triesText = '';

  // HEELPER
  if (window.matchMedia("(min-width: 1024px)").matches) {
    var timeout;
    var mouseStoped = false;
    var hideHelper = false;
    $(document).mousemove(function(e){
      if(mouseStoped === true && hideHelper === false && endGame === false){
        $(".helper").css({left:e.pageX+46, top:e.pageY});
      }
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        mouseStoped = true;
        hideHelper = false;
        if(endGame === false){
          $(".helper").css({left:e.pageX+46, top:e.pageY});
        }
      }, 3000);
    });
    $('.tower-window').click(function () {
      hideHelper = true;
      $(".helper").css({left:'-999px', top:'-999px'});
    })
  }

  // MODALS
  $('.modal-close').click(function () {
    $(this).closest('.modal').removeClass('modal_opened');
  });
  // OPEN MODALS
  $('.tower-window--2, .tower-window--4, .tower-window--6').click(function () {
    if (endGame === true){
      alert('You already have a discount:)')
      return false;
    }
    endGame = true;
    $('.modal').removeClass('modal_opened');
    $(this).find('.tower-window__door').addClass('tower-window__door_opened');
    $('.modal-discount#'+$(this).data('id')).addClass('modal_opened');
  });
  // SHOW DISCOUNTS
  $('.js-get-discount').click(function () {
    $(this).closest('.modal').removeClass('modal_opened');
    $('.bottomline').show();
    $('.bottomline-item').removeClass('bottomline-item_current');
    $('.bottomline-item#'+$(this).data('id')).addClass('bottomline-item_current');
  });
  $('.tower-window--1, .tower-window--3, .tower-window--5, .tower-window--7').click(function () {
    if (endGame === true){
      alert('You already have a discount:)')
      return false;
    }
    if($(this).hasClass('clicked')){
      return false;
    }
    if($(this).hasClass('tower-window--7')){
      tries+1;
    }else {
      tries--;
    }
    if(tries === 2){
      triesText = '<div class="modal__title">Уупс! К сожалению, не то окно:(</div>\n' +
        '        <div class="modal__text">Попробуйте еще раз</div>';
    }
    if(tries === 1){
      triesText = '<div class="modal__title">Увы и Ах, но промах...</div>\n' +
        '        <div class="modal__text">У вас на одну попытку меньше</div>';
    }
    if(tries === 0){
      triesText = '<div class="modal__title">Хмм...может сегодня не ваш день?</div>\n' +
        '        <div class="modal__text">Поищите скидку в другом окошке</div>';
    }
    if($(this).hasClass('tower-window--7')){
      triesText = '<div class="modal__title">Миау конечно...Ну да ладно!</div>\n' +
        '        <div class="modal__text">От победы вас отделяет одно окошко</div>';
    }
    if(tries < 0){
      alert('No attemps left :(')
      return false;
    }
    $('.modal').removeClass('modal_opened');
    $(this).addClass('clicked');
    $(this).find('.tower-window__door').addClass('tower-window__door_opened');
    $(this).find('.monster').addClass('monster_visible');
    $(this).children('.modal-lose').prepend(triesText);
    $(this).children('.modal-lose').delay(1000).queue(function(next){
      $(this).addClass('modal_opened');
      next();
    });
  });
  $('.js-play-next').click(function (e) {
    e.stopPropagation();
    $(this).closest('.modal').removeClass('modal_opened');
  });

});