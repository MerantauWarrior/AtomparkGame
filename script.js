$( document ).ready(function() {

  var timeout;
  var mouseStoped = false;
  $(document).mousemove(function(e){
    if(mouseStoped === true){
      $(".helper").css({left:e.pageX, top:e.pageY});
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      mouseStoped = true;
      $(".helper").css({left:e.pageX, top:e.pageY});
    }, 3000);
  });

});