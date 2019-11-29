;(function ( $, window, document, undefined ) {
  "use strict";
  $.uiToggle = {
    setting:function(){
      var target = $(".toggle");
      target.each(function(){
        var size = target.attr('data-toggle-size');
        size = $.uiToggle.getSize(size);
        $.uiToggle.toggle($(this), size);
      });
    },
    toggle:function(target, size){
      target.children("p").height();
      target.height(target.children("p").height());
      target.find("button").on("click", function(){
        var type = $(this).eq(0).text();
        var input = target.children("input");
        var value = target.children("input").val();
        if(value === undefined){
          target.find("button").removeClass("active");
        }else if(value === 'on'){
        }
        if(type === 'on'){
          input.val('true');
          $(this).parent().children(".active").removeClass("active");
          $(this).addClass("active");
        }else{
          input.val('false');
          $(this).parent().children(".active").removeClass("active");
          $(this).addClass("active");
        }
        input.change();
      });
    },
    getSize:function(size){
    },
  };
})( jQuery, window, document );