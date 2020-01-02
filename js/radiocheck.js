;(function ($, window) {
  "use strict";
  let newObject = {}
  let defaults = {
    type: "default",
    align: "vertical",
    width: "inherit"
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
      if(this.settings.type === "tree"){
        this.createHtml('checkbox', this.$node.find("input"));
      }else{
        if(type === 'checkbox'){
          this.settings.type === "default" ? this.createHtml('checkbox') : (this.settings.type === "card-checkbox" ? this.createCard('card-checkbox') : this.createCard('card-checkbox-wide'))
        }else if(type === 'radio'){
          this.settings.type === "default" ? this.createHtml('radio') : (this.settings.type === "card-radio" ? this.createCard('card-radio') : this.createCard('card-radio-wide'))
        }
      }
    },

    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className);
      }
    },

    createCard: function(type){
      var self = this;
      var disabled = this.$node.attr("disabled") ? ' disabled' : '';
      var inputName = this.$node.attr("name");
      var theme;
      
      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      var cardImg = this.$node.siblings(".card-img-box");
      var cardText = this.$node.siblings(".card-text");
      if(type === "card-radio"){
        this.$node.wrap('<label class="card-radio '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span><span class="dot"></span></span>');
      }else if(type === "card-radio-wide"){
        this.$node.wrap('<label class="card-radio-wide '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span><span class="dot"></span></span>');
      }else if(type === "card-checkbox"){
        this.$node.wrap('<label class="card-checkbox '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span class="arrow"></span>');
      }else if(type === "card-checkbox-wide"){
        this.$node.wrap('<label class="card-checkbox-wide '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span class="arrow"></span>');
      }
      
      this.$node.parent().parent().append(cardImg);
      this.$node.parent().parent().append(cardText);
      this.$node.parent().parent().css("width", this.settings.width);
      type === "card-radio-wide" || type === "card-checkbox-wide" ? (this.$node.parent().siblings(".card-text").children(".subtext").height() > 30 ? this.$node.parent().parent().css("padding", "16px 16px 16px 116px") : null) : null;
      this.$node.is(":checked") === true ? self.toggle(true, this.$node.parent().parent(), "selected") : null;
      this.$node.on("change", function(){
        if(type === "card-radio" || type === "card-radio-wide"){
          self.toggle(false, $("input[name="+inputName+"]").parent().parent(), 'selected');
          self.toggle(true, $(this).parent().parent(), "selected");
        }else{
          $(this).is(":checked") === true ? self.toggle(true, $(this).parent().parent(), "selected") : self.toggle(false, $(this).parent().parent(), "selected");
        }
      });
    },

    treeCheck: function(state, node){
      if(state){
        node.prop("checked", true);
      }else{
        node.prop("checked", false);
      }
    },

    createHtml: function(type, node){
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

      if(this.settings.type === "tree"){
        this.$node.addClass("tree-checkbox");
        node.each(function(){
          if($(this).attr("class") && $(this).attr("class").match(/(theme-)\w+/g)){
            theme = $(this).attr("class").match(/(theme-)\w+/g)[0];
          }
          theme = theme ? theme.split("theme-")[1] : '';
          disabled = $(this).attr("disabled") ? ' disabled' : '';
          subText = $(this).siblings("p").text();
          subTextClass = subText ? ' detail-text' : '';
          label = $(this).siblings("label").text();
          addon = $(this).siblings("input");
          label ? $(this).siblings("label").remove() : null;
          subText ? $(this).siblings("p").remove() : null;
          $(this).css("background", "red");
          $(this).wrap('<label class="checkbox-'+theme+disabled+subTextClass+isMobile+'"><span></span></label>');
          $(this).after('<span class="arrow"></span>');
          if(subText){
            $(this).parent().after('<div><span>'+label+'</span><p>'+subText+'</p></div>');
          }else{
            $(this).parent().after('<span>'+label+'</span>');
          }
        });

        node.on("click", function(){
          var parent = $(this).parentsUntil('.tree-checkbox').siblings("label");
          var isChecked = $(this).is(":checked");
          if(isChecked === true){
            console.log("checked true");
            self.treeCheck(true, $(this).parent().parent().parent().find("input[type='checkbox']"));
            self.treeCheck(true, parent.children().children("input"));
            self.toggle(false, parent.children().children("span"), "arrow");
            self.toggle(true, parent.children().children("span"), "minus-icon");
            parent.siblings(".sub-tree").each(function(){
              var listCheck;
              $(this).find("input[type='checkbox']").each(function(){
                if($(this).is(":checked") === false){
                  listCheck = false;
                  return false;
                }
                listCheck = true;
              });
              if(listCheck){
                self.toggle(true, $(this).siblings("label").children().children("span.minus-icon"), "arrow");
                self.toggle(false, $(this).siblings("label").children().children("span.minus-icon"), "minus-icon");
              }
            });
          }else{
            if($(this).siblings("span").hasClass("arrow")){
              self.treeCheck(false, $(this).parent().parent().parent().find("input[type='checkbox']"));
              parent.siblings(".sub-tree").each(function(){
                if($(this).find("input[type='checkbox']").is(":checked")){
                  self.toggle(true, $(this).siblings("label").children().children("span.arrow"), "minus-icon");
                  self.toggle(false, $(this).siblings("label").children().children("span.arrow"), "arrow")
                }else{
                  var listCheck;
                  self.treeCheck(false, $(this).siblings("label").children().children("input[type='checkbox']"));
                  $(this).parentsUntil('.tree-checkbox').siblings("label").siblings(".sub-tree").each(function(){
                    $(this).find("input").each(function(){
                      if($(this).is(":checked") === true){
                        listCheck = true;
                        return false;
                      };
                      listCheck = false;
                    });
                    if(!listCheck){
                      self.treeCheck(false, $(this).parentsUntil('.tree-checkbox').children("label").children().children("input"));
                    }
                  });
                }
              });
            }else{
              self.toggle(false, $(this).parent().parent().parent().find("input[type='checkbox']").siblings("span"), "minus-icon");
              self.toggle(true, $(this).parent().parent().parent().find("input[type='checkbox']").siblings("span"), "arrow");
              self.treeCheck(true, $(this).parent().parent().parent().find("input[type='checkbox']"));
              parent.each(function(){
                var listCheck;
                $(this).siblings(".sub-tree").find("input[type='checkbox']").each(function(){
                  if($(this).is(":checked") === false){
                    listCheck = false;
                    return false;
                  };
                  listCheck = true;
                });
                if(listCheck){
                  self.toggle(false, $(this).children().children("span"), "minus-icon");
                  self.toggle(true, $(this).children().children("span"), "arrow");
                }
              });
            }
          }
        });
      }else{
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

        this.$node.on("change click", function(){
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
      }
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