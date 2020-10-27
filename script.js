$( document ).ready(function() {

  // GAME
  var lang = $('html').attr('lang');
  var tries = 3;
  var endGame = false;

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
    var triesText = '';
    if(tries === 2){
      if(lang === 'en'){
        triesText = '<div class="modal__title">Уупс! К сожалению, не то окно:(</div>\n' +
          '        <div class="modal__text">Попробуйте еще раз</div>' +
          '<div class="btn js-play-next">Play again</div>';
      }else{
        triesText = '<div class="modal__title">Уупс! К сожалению, не то окно:(</div>\n' +
          '        <div class="modal__text">Попробуйте еще раз</div>' +
          '<div class="btn js-play-next">ИГРАТЬ ДАЛЬШЕ</div>';
      }
    }
    if(tries === 1){
      if(lang === 'en'){
        triesText = '<div class="modal__title">Увы и Ах, но промах...</div>\n' +
          '        <div class="modal__text">У вас на одну попытку меньше</div>' +
          '<div class="btn js-play-next">Play again</div>';

      }else{
        triesText = '<div class="modal__title">Увы и Ах, но промах...</div>\n' +
          '        <div class="modal__text">У вас на одну попытку меньше</div>' +
          '<div class="btn js-play-next">ИГРАТЬ ДАЛЬШЕ</div>';
      }
    }
    if(tries === 0){
      if(lang === 'en'){
        triesText = '<div class="modal__title">Хмм...может сегодня не ваш день?</div>\n' +
          '        <div class="modal__text">Поищите скидку в другом окошке</div>' +
          '<div class="btn js-play-next">Play again</div>';

      }else{
        triesText = '<div class="modal__title">Хмм...может сегодня не ваш день?</div>\n' +
          '        <div class="modal__text">Поищите скидку в другом окошке</div>' +
          '<div class="btn js-play-next">ИГРАТЬ ДАЛЬШЕ</div>';
      }
    }
    if($(this).hasClass('tower-window--7')){
      if(lang === 'en'){
        triesText = '<div class="modal__title">Миау конечно...Ну да ладно!</div>\n' +
          '        <div class="modal__text">От победы вас отделяет одно окошко</div>' +
          '<div class="btn js-play-next">Play again</div>';

      }else{
        triesText = '<div class="modal__title">Миау конечно...Ну да ладно!</div>\n' +
          '        <div class="modal__text">От победы вас отделяет одно окошко</div>' +
          '<div class="btn js-play-next">ИГРАТЬ ДАЛЬШЕ</div>';
      }
    }
    if(tries < 0){
      alert('No attemps left :(')
      return false;
    }
    $('.modal').removeClass('modal_opened');
    $(this).addClass('clicked');
    $(this).find('.tower-window__door').addClass('tower-window__door_opened');
    $(this).find('.monster').addClass('monster_visible');
    $('.modal-lose').html('');
    $('.modal-lose').removeClass (function (index, className) {
      return (className.match (/(^|\s)tower-window-\S+/g) || []).join(' ');
    });
    if($(this).hasClass('tower-window--1')){
      $('.modal-lose').addClass('tower-window-1');
    }
    if($(this).hasClass('tower-window--3')){
      $('.modal-lose').addClass('tower-window-3');
    }
    if($(this).hasClass('tower-window--5')){
      $('.modal-lose').addClass('tower-window-5');
    }
    if($(this).hasClass('tower-window--7')){
      $('.modal-lose').addClass('tower-window-7');
    }
    $('.modal-lose').prepend(triesText);
    $('.modal-lose').delay(1000).queue(function(next){
      $(this).addClass('modal_opened');
      next();
    });
  });
  $(document).on('click','.js-play-next', function (e) {
    e.stopPropagation();
    $(this).closest('.modal').removeClass('modal_opened');
  });

});