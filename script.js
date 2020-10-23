$( document ).ready(function() {

  var timeout;
  var mouseStoped = false;
  var hideHelper = false;
  $(document).mousemove(function(e){
    if(mouseStoped === true && hideHelper === false){
      $(".helper").css({left:e.pageX+46, top:e.pageY});
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      mouseStoped = true;
      hideHelper = false;
      $(".helper").css({left:e.pageX+46, top:e.pageY});
    }, 3000);
  });
  $(document).click(function () {
    hideHelper = true;
    $(".helper").css({left:'-999px', top:'-999px'});
  })

  // MODALS
  $('.modal-close').click(function () {
    $(this).closest('.modal').removeClass('modal_opened');
  });
  // OPEN MODALS
  $('.tower-window--2, .tower-window--4, .tower-window--6').click(function () {
    $('.modal-discount#'+$(this).data('id')).addClass('modal_opened');
  });
  // SHOW DISCOUNTS
  $('.js-get-discount').click(function () {
    $(this).closest('.modal').removeClass('modal_opened');
    $('.bottomline').show();
    $('.bottomline-item#'+$(this).data('id')).addClass('bottomline-item_current');
  });
  $('.tower-window--1, .tower-window--3, .tower-window--5, .tower-window--7').click(function () {
    $('.modal-lose').removeClass('modal_opened');
    $(this).children('.modal-lose').addClass('modal_opened');
  });
  $('.js-play-next').click(function (e) {
    e.stopPropagation();
    $(this).closest('.modal').removeClass('modal_opened');
  });

});