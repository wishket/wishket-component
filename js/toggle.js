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
      console.log(target);
      target.children("p").height();
      target.height(target.children("p").height());
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
          console.log()
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