$( document ).ready(function() {

  var timeout;
  var mouseStoped = false;
  var hideHelper = false;
  $(document).mousemove(function(e){
    if(mouseStoped === true && hideHelper === false){
      $(".helper").css({left:e.pageX, top:e.pageY});
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      mouseStoped = true;
      hideHelper = false;
      $(".helper").css({left:e.pageX, top:e.pageY});
    }, 1000);
  });
  $(document).click(function () {
    hideHelper = true;
    $(".helper").css({left:'-999px', top:'-999px'});
  })

});