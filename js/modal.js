;(function ($, window) {
  "use strict";
  var newObject = {}

  var defaults = {
    type:"default"
  }

  var UiModal = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.$openButton = this.$node.siblings(".open__modal");
    this.init();
  };

  UiModal.prototype = {
    init: function(){
      this.createHTML();
      var modal = this.$node.parent();
      this.$openButton.on('click', function(){
        // this.$node.parent().show();
        modal.show();
        modal.children().addClass("active");
        var agent = navigator.userAgent.toLowerCase();
        if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
          $('body').css({
            "overflow-y":"hidden",
            "padding-right":"17px",
          });
        }else{
          $('body').css({
            "overflow-y":"hidden",
          });
        }
        
      });
      modal.find(".close__modal").on('click', function(){
        modal.hide();
        modal.children().removeClass("active");
        $('body').css({
          "overflow-y":"auto",
          "padding-right":"0",
        });
      });

      modal.children().children(".modal__body").find("input").on("change", function(){
        var inputName = $(this).attr('name');
        var isChecked;
        isChecked = false;
        $("input[name="+inputName+"]").each(function(){
          if($(this).is(":checked") === true){
            isChecked = true;
            return false
          }
          isChecked = false;
        });
        isChecked ? modal.children().children(".modal__footer").find("button").not(".close__modal").attr('disabled', false) : modal.children().children(".modal__footer").find("button").not(".close__modal").attr('disabled', true);
      });
    },
    createHTML: function(){
      if(this.$node.children(".modal__title").length < 1){
        this.$node.addClass("text__modal");
      }else{
        if(this.settings.type === 'list'){
          this.$node.addClass("list__modal");
          this.$node.children(".modal__footer").find("button").not(".close__modal").attr('disabled', true);
          if(this.$node.children(".modal__body").find("input").is(":checked") === true){
            // this.$node.children(".modal__footer").find("button").not(".close__modal").attr('disabled', false);
          }
        }else{
          this.$node.addClass("title__modal");
        }
      }
      this.$node.wrap("<div class='modal__container'></div>");
      this.$node.after("<button class='close__modal'></button>");
      this.$node.children(".modal__footer").children("p").length > 0 ? this.$node.children(".modal__footer").css("padding", "16px 32px 24px") : null;
      this.$node.parent().hide();
    }
  };
  $.fn.uiModal=function(options){
    return this.each(function(i){
      newObject[i] = new UiModal(this, options);
    });
  };
})( jQuery, window);