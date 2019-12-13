;(function ($, window) {
  "use strict";
  let newObject = {}
  let defaults = {
  }
  let UiInput = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  UiInput.prototype = {
    init: function(){
      if(this.$node.attr("class").indexOf('addon-input') === -1){
        var type = this.$node.attr("data-type");
        if(type === 'label'){
          this.createHtml('label');
        }else if(type === 'text'){
          this.createHtml('text');
        }else{
          this.createHtml();
        }
      }
    },

    wait: function(type){
      var self = this;
      var inputType = this.$node.attr("type");
      if(type === 'label'){
        var value = this.$node.val();
        value ? self.toggle(true, this.$node.parent(),'label-effect') : null;
        this.$node.on('focus', function(){
          self.toggle(true, $(this).parent(), "label-effect");
        });
        this.$node.on('blur', function(){
          var value = $(this).val();
          if(!value){
            self.toggle(false, $(this).parent(), "label-effect");
          }
        });
      }

      if(inputType === 'text'){
        self.textKeyEvent(type);
      }else if(inputType === 'number'){
        self.numberKeyEvent();
      }
    },

    numberKeyEvent: function(){
      this.$node.on('keypress',function(){
        var number = $(this).val().split("");
        for(var i=1; i<=$(this).val().length + 1; i++){
          if(i % 3 == 0 ){
            console.log(number);
            console.log("뭐고 이거");
          }
        }
      });
    },

    textKeyEvent: function(type){
      var self = this;
      this.$node.on('keyup change keydown',function(){
        var count = $(this).val().length;
        var maxlength = $(this).attr("maxlength");
        if(count >= maxlength){
          $(this).val($(this).val().slice(0, maxlength));
          if(type === 'text'){
            self.toggle(true, $(this).parent().parent(), "error");
            $(this).parent().siblings("span.helper-text").hide();
          }else{
            self.toggle(true, $(this).parent(), "error");
          }
          self.error(true, $(this).parent().siblings("span.error-text"), '글자수를 초과하였습니다.');
        }else{
          if(type === 'text'){
            self.toggle(false, $(this).parent().parent(), "error");
            $(this).parent().siblings("span.helper-text").show();
          }else{
            self.toggle(false, $(this).parent(), "error");
          }
          self.error(false, $(this).parent().siblings("span.error-text"));
        }
        if(type === 'text'){
          $(this).parent().siblings(".word-length").html(''+count+'/'+maxlength+'');
        }
      });
    },

    error: function(state, node, messageCode){
      if(state){
        node.show().text(messageCode);
      }else{
        node.hide();
      }
    },

    createHtml: function(type){
      var theme;
      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      theme = theme ? theme.split("theme-")[1] : '';
      var iconRight= this.$node.next('i');
      var iconLeft = this.$node.prev('i');
      var iconClass = iconRight.length > 0 ? 'icon-right ' : '' + iconLeft.length > 0 ? 'icon-left ' : '';
      if(type === 'label'){
        var label = this.$node.siblings("label");
        this.$node.wrap('<div class="label-input-'+theme+' '+iconClass+'"></div>');
        this.$node.parent().append(label);
        this.$node.parent().after("<span class='error-text' style='display:none;'>에러상세 메시지</span>");
      }else if(type === 'text'){
        var helperText = this.$node.siblings("span.helper-text");
        var maxlength = this.$node.attr("maxlength");
        this.$node.wrap('<div class="text-input-'+theme+' '+iconClass+'"></div>');
        this.$node.parent().append(helperText);
        this.$node.after("<span class='word-length'>0/"+maxlength+"</span>");
        this.$node.after("<span class='error-text'>에러상세 메시지</span>");
        this.$node.wrap("<div></div>");
      }else{
        this.$node.wrap('<div class="default-input-'+theme+' '+iconClass+'"></div>')
      }
      iconLeft ? this.$node.parent().prepend(iconLeft) : null;
      iconRight ? this.$node.parent().append(iconRight) : null;
      this.wait(type);
    },

    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className); 
      }
    }
  };
  $.fn.uiInput=function(options){
    return this.each(function(i){
      newObject[i] = new UiInput(this, options);
    });
  };
})(jQuery, window);