;(function ($, window) {
  "use strict";
  let newObject = {}
  let defaults = {
    addon: false,
    align: "vertical",
  }
  let UiRadioCheck = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  UiRadioCheck.prototype = {
    init: function(){
      var type = this.$node.attr("type");
      if(type === 'checkbox'){
        this.createHtml('checkbox');
      }else if(type === 'radio'){
        this.createHtml('radio');
      }
    },
    createHtml: function(type){
      var self = this;
      var theme;
      var disabled = this.$node.attr("disabled") ? ' disabled' : '';
      var subText = this.$node.siblings("p").text();
      var subTextClass = subText ? ' detail-text' : '';
      var label = this.$node.siblings("label").text();
      var addon = this.$node.siblings("input");
      label ? this.$node.siblings("label").remove() : null;
      subText ? this.$node.siblings("p").remove() : null;
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? " mobile" : " pc";

      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      theme = theme ? theme.split("theme-")[1] : '';

      if(addon.length > 0){
        this.$node.is(":checked") ? addon.attr('disabled', false) : addon.attr('disabled', true);
        addon.remove();
        if(type==='checkbox'){
          this.$node.wrap('<div class="addon"><label class="checkbox-'+theme+disabled+subTextClass+isMobile+'"><span></span></label></div>');
          this.$node.after('<span class="arrow"></span>');
        }else if(type==='radio'){
          this.$node.wrap('<div class="addon"><label class="radio-'+theme+disabled+subTextClass+isMobile+'"><span></span></label></div>');
          this.$node.after('<span><span class="dot"></span></span>');
        }
        this.$node.parent().parent().parent().append(addon);
        addon.wrap('<div class="default-input-'+theme+'"></div')
        this.$node.parent().after('<span></span>');
      }else{
        if(type==='checkbox'){
          this.$node.wrap('<label class="checkbox-'+theme+disabled+subTextClass+isMobile+'"><span></span></label>');
          this.$node.after('<span class="arrow"></span>');
        }else if(type==='radio'){
          this.$node.wrap('<label class="radio-'+theme+disabled+subTextClass+isMobile+'"><span></span></label>');
          this.$node.after('<span><span class="dot"></span></span>');
        }
        if(subText){
          this.$node.parent().after('<div><span>'+label+'</span><p>'+subText+'</p></div>');
        }else{
          this.$node.parent().after('<span>'+label+'</span>');
        }
      }
      
      this.$node.on("change", function(){
        if(type==='radio'){
          if(addon.length > 0){
            var addonInput = $(this).parent().parent().parent().parent().parent().find(".addon-input");
            self.addonEvent(true, 'radio', addonInput, $(this).parent().parent().siblings("div").children("input"));
          }else{
            var addonInput = $(this).parent().parent().parent().parent().find(".addon-input");
            self.addonEvent(false, 'radio', addonInput);
          }
        }else{
          if(addon.length > 0){
            if($(this).is(":checked")){
              self.addonEvent(true, 'checkbox', addonInput, $(this).parent().parent().siblings("div").children());
            }else{
              self.addonEvent(false, 'checkbox', addonInput, $(this).parent().parent().siblings("div").children()); 
            }
            
          }
        }
      });
    },
    addonEvent: function(state, type, input, node){
      if(type === 'radio'){
        input.each(function(){
          $(this).attr('disabled', true);
        });
      }
      if(state){
        node.attr('disabled', false);
      }else if(!state && node){
        node.attr('disabled', true);
      }
    }
  };
  $.fn.uiRadioCheck=function(options){
    return this.each(function(i){
      newObject[i] = new UiRadioCheck(this, options);
    });
  };
})(jQuery, window);