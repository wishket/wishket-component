;(function ($, window) {
  "use strict";
  var newObject = {}
  var defaults = {
    inputType: "default",
  }
  var UiInput = function (node, options){
    this.settings = $.extend({}, defaults, options);
    this.node = node;
    this.$node = $(this.node);
    this.init();
  };

  UiInput.prototype = {
    init: function(){
      if(this.$node.attr("class").indexOf('addon-input') === -1){
        var type = this.$node.attr("data-type");
        var shape = this.$node.attr("data-shape");
        if(type === 'label'){
          this.createHtml('label', shape);
        }else if(type === 'label-placeholder'){
          this.createHtml('label-placeholder', shape);
        }else if(type === 'text'){
          this.createHtml('text', shape);
        }else{
          if(this.settings.inputType==='textArea'){
            this.createTextArea(shape);
          }else{
            this.createHtml();
          }
        }
      }
    },

    wait: function(type){
      var self = this;
      if(type === 'label'){
        var value = this.$node.val();
        value ? self.toggle(true, this.$node.parent(),'label-effect') : null;
        this.$node.on('focus click', function(){
          self.toggle(true, $(this).parent(), "label-effect");
        });

        this.$node.on('blur', function(e){
          var $this = $(this),
              value = $this.val();

          if(!value){
            self.toggle(false, $this.parent(), "label-effect");
          }
        });
      }
      if(this.settings.inputType === "default"){
        self.textKeyEvent(type);
      }else if(this.settings.inputType === "price"){
        self.priceKeyEvent();
      }else if(this.settings.inputType === "tel"){
        self.telKeyEvent();
      }
      else if(this.settings.inputType === "textArea"){
        self.textKeyEvent("textArea");
        this.$node.on({
          focus: function(){
            self.toggle(true, $(this).parent(), "active");
            self.toggle(true, $(this).parent().parent().find('label'), "active");
          },
          blur: function(){
            self.toggle(false, $(this).parent(), "active");
            self.toggle(false, $(this).parent().parent().find('label'), "active");
          }
        })
      }
    },

    telKeyEvent: function(){
      this.$node.on('keyup keydown', function(){
        var $this = $(this),
            number = $this.val().replace(/[^0-9]/g, ""),
            telNumber = '';
        if(number.substr(0, 2).indexOf("02") === 0){
          if(number.length < 10){
            if(number.length < 3){
              telNumber = number;
            }else if(number.length < 6){
              telNumber = number.substr(0, 2)+"-"+number.substr(2, 3);
            }else{
              telNumber = number.substr(0, 2)+"-"+number.substr(2, 3)+"-"+number.substr(5,4);
            }
          }else{
            if(number.length < 3){
              telNumber = number;
            }else if(number.length < 7){
              telNumber = number.substr(0, 2)+"-"+number.substr(2, 4);
            }else{
              telNumber = number.substr(0, 2)+"-"+number.substr(2, 4)+"-"+number.substr(6,4);
            }
          }
        }else{
          if(number.length < 11){
            if(number.length < 4){
              telNumber = number;
            }else if(number.length < 7){
              telNumber = number.substr(0, 3)+"-"+number.substr(3, 3);
            }else{
              telNumber = number.substr(0, 3)+"-"+number.substr(3, 3)+"-"+number.substr(6,4);
            }
          }else{
            if(number.length < 4){
              telNumber = number;
            }else if(number.length < 8){
              telNumber = number.substr(0, 3)+"-"+number.substr(3, 4);
            }else{
              telNumber = number.substr(0, 3)+"-"+number.substr(3, 4)+"-"+number.substr(7,4);
            }
          }
        }
        $this.val(telNumber);
        $this.nextAll('.text-unit') ? ( $this.val() ? $this.nextAll('.text-unit').addClass("active") : $this.nextAll('.text-unit').removeClass("active") ) : null;
      });
    },

    priceKeyEvent: function(){
      var self = this,
          maxlength = this.$node.attr("maxlength");

      maxlength = Number(maxlength) + Math.floor(maxlength/3);
      this.$node.on('keyup change keydown keypress',function(){
        var $this = $(this),
            count = $this.val().length;
        $this.attr("maxlength", maxlength);
        var number = $this.val().replace(/\D/g, "");
        number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $this.val(number);
        if(count >= maxlength){
          self.toggle(true, $this.parent(), "error");
          self.error(true, $this.parent().siblings("span.error-text"), '글자수를 초과하였습니다.');
        }else{
          self.toggle(false, $this.parent(), "error");
          self.error(false, $this.parent().siblings("span.error-text"));
        }
        $this.nextAll('.text-unit') ? ( $this.val() ? $this.nextAll('.text-unit').addClass("active") : $this.nextAll('.text-unit').removeClass("active") ) : null;
      });
    },

    textKeyEvent: function(type){
      var self = this;
      this.$node.on('keyup change keydown',function(){
        var $this = $(this),
            count = $this.val().length,
            maxlength = $this.attr("maxlength");
        if(count >= maxlength){
          $this.val($this.val().slice(0, maxlength));
          if(type === 'text'){
            self.toggle(true, $this.parent().parent(), "error");
            $this.parent().siblings("span.helper-text").hide();
            self.error(true, $this.parent().siblings("span.error-text"), '글자수를 초과하였습니다.');
          }else if(type === 'textArea'){
            self.toggle(true, $this.parent().parent(), "error");
            $this.parent().siblings("span.helper-text").hide();
            self.error(true, $this.parent().siblings("span.error-text"), '글자수를 초과하였습니다.');
          }else{
            self.toggle(true, $this.parent(), "error");
            self.error(true, $this.parent().siblings("span.error-text"), '글자수를 초과하였습니다.');
          }
        }else{
          if(type === 'text'){
            self.toggle(false, $this.parent().parent(), "error");
            $this.parent().siblings("span.helper-text").show();
            self.error(false, $this.parent().siblings("span.error-text"));
          }else if(type === 'textArea'){
            self.toggle(false, $this.parent().parent(), "error");
            $this.parent().siblings("span.helper-text").show();
            self.error(false, $this.parent().siblings("span.error-text"));
          }else{
            self.toggle(false, $this.parent(), "error");
            self.error(false, $this.parent().siblings("span.error-text"));
          }
        }
        if(type === 'text'){
          $this.parent().siblings(".word-length").html(''+count+'/'+maxlength+'');
        }else if(type === 'textArea'){
          $this.parent().siblings(".word-length").html(''+count+'/'+maxlength+'');
        }

        $this.nextAll('.text-unit') ? ( $this.val() ? $this.nextAll('.text-unit').addClass("active") : $this.nextAll('.text-unit').removeClass("active") ) : null;
      });
    },

    error: function(state, node, messageCode){
      if(state){
        node.show().text(messageCode);
      }else{
        node.hide();
      }
    },

    createHtml: function(type, shape){
      shape = (shape === undefined)? '':shape;

      var theme;
      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      theme = theme ? theme.split("theme-")[1] : '';
      var iconRight = this.$node.next('i').length > 0 ? this.$node.next('i') : this.$node.next('.text-unit'),
          iconLeft = this.$node.prev('i').length > 0 ? this.$node.prev('i') : this.$node.prev('.text-unit'),
          iconClass = iconRight.length === 1 && iconLeft.length === 1 ? 'icon-left-right ' : (iconRight.length > 0 ? 'icon-right ' : '' + iconLeft.length > 0 ? 'icon-left ' : '');
      iconClass === "icon-left-right " ? iconLeft.addClass("first") : null;
      this.$node.next('.text-unit').length > 0 ? ( this.$node.val() ? this.$node.next('.text-unit').addClass("active") : null ) : null;

      // 부모 엘리먼트가 display none 인 경우 width 값 0으로 잡히는 문제 해결
      if (this.$node.parents(":hidden:last")) {
        var hiddenParent = this.$node.parents(":hidden:last");
        hiddenParent.css({ visibility: "hidden", display: "" });
        this.$node.css("padding-right", iconRight.width() + 24);
        hiddenParent.css({ visibility: ""}).addClass('hide');
      } else {
        this.$node.css("padding-right", iconRight.width() + 24);
      }

      if(type === 'label'){
        var label = this.$node.siblings("label");
        this.$node.wrap('<div class="label-input-'+theme+' '+iconClass+' '+shape+'"></div>');
        this.$node.parent().append(label);
        this.$node.parent().after("<span class='error-text' style='display:none;'>에러상세 메시지</span>");
      }else if(type === 'label-placeholder'){
        var label = this.$node.siblings("label");
        this.$node.wrap('<div class="label-input-'+theme+' label-placeholder label-effect '+iconClass+' '+shape+'"></div>');
        this.$node.parent().append(label);
        this.$node.parent().after("<span class='error-text' style='display:none;'>에러상세 메시지</span>");
      }else if(type === 'text'){
        var helperText = this.$node.siblings("span.helper-text");
        var maxlength = this.$node.attr("maxlength");
        this.$node.wrap('<div class="text-input-'+theme+' '+iconClass+' '+shape+'"></div>');
        this.$node.parent().append(helperText);
        this.$node.after("<span class='word-length'>" + this.$node.val().length + "/" + maxlength + "</span>");
        this.$node.after("<span class='error-text'>에러상세 메시지</span>");
        this.$node.wrap("<div></div>");
      }else{
        this.$node.wrap('<div class="default-input-'+theme+' '+iconClass+' '+shape+'"></div>');
        this.$node.parent().after("<span class='error-text'>에러상세 메시지</span>");
      }
      iconLeft ? this.$node.parent().prepend(iconLeft) : null;
      iconRight ? this.$node.parent().append(iconRight) : null;
      this.wait(type);
    },

    createTextArea:function(){
      var theme;
      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      theme = theme ? theme.split("theme-")[1] : '';
      var helperText = this.$node.siblings("span.helper-text"),
          maxlength = this.$node.attr("maxlength"),
          label = this.$node.siblings("label");
      var type = (this.$node.attr("data-type") === undefined)? '':this.$node.attr("data-type");
      var shape = (this.$node.attr('data-shape') === undefined)? '':this.$node.attr('data-shape');


      this.$node.wrap('<div class="ui-textarea-'+theme+' '+shape+' '+type+'"></div>');
      if (type === 'label-textarea') {
        this.$node.parent().prepend("<span class='word-length'>" + this.$node.val().length + "/" + maxlength + "</span>");
        this.$node.parent().prepend(label);
      }else {
        this.$node.after("<span class='word-length'>" + this.$node.val().length + "/" + maxlength + "</span>");
      }
      this.$node.parent().append(helperText);
      this.$node.after("<span class='error-text'>에러상세 메시지</span>");
      this.$node.wrap('<div class="textarea__border"></div>');
      this.$node.attr('disabled') ? this.toggle(true, this.$node.parent(), 'disabled') : null;
      this.wait();
    },

    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className);
      }
      return;
    }
  };
  $.fn.uiInput=function(options){
    return this.each(function(i){
      newObject[i] = new UiInput(this, options);
    });
  };
})(jQuery, window);
