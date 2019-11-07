;(function ( $, window, document, undefined ) {
  $.uiToggle = {
    setting:function(){
      const target = $(".toggle");
      target.each(function(){
        let size = target.attr('data-toggle-size');
        size = $.uiToggle.getSize(size);
        $.uiToggle.toggle($(this), size);
      });
    },
    toggle:function(target, size){
      target.find("button").on("click", function(){
        const type = $(this).eq(0).text();
        const input = target.children("input");
        const value = target.children("input").val();
        if(value === undefined){
          target.find("button").removeClass("active");
        }else if(value === 'on'){
        }
        if(type === 'on'){
          input.val('true');
          $(this).addClass("active");
          $(this).next().removeClass("active");
        }else{
          input.val('false');
          $(this).addClass("active");
          $(this).prev().removeClass("active");
        }
      });
    },
    getSize:function(size){
    },
  };
})( jQuery, window, document );