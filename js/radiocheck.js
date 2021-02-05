;(function ($, window) {
  "use strict";
  var newObject = {},
      defaults = {
        type: "default",
        align: "vertical",
        width: "inherit"
    },

    UiRadioCheck = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="window__tooltip";
  else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac__tooltip";

  UiRadioCheck.prototype = {
    init: function(){
      var type = this.$node.attr("type");
      if(this.settings.type === "tree"){
        this.createHtml('checkbox', this.$node.find("input:checkbox"));
      }else{
        if(type === 'checkbox'){
          if(this.settings.type === "chip"){
            this.createHtml('chip');
          }else{
            this.settings.type === "default" ? this.createHtml('checkbox') : (this.settings.type === "card-checkbox" ? this.createCard('card-checkbox') : this.createCard('card-checkbox-wide'));
          }
        }else if(type === 'radio'){
          this.settings.type === "default" ? this.createHtml('radio') : (this.settings.type === "card-radio" ? this.createCard('card-radio') : this.createCard('card-radio-wide'));
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
      var self = this,
          disabled = this.$node.attr("disabled") ? ' disabled' : '',
          inputName = this.$node.attr("name"),
          theme,
          cardImg = this.$node.siblings(".card-img-box"),
          cardText = this.$node.siblings(".card-text"),
          cardTooltip = this.$node.siblings(".card-tooltip");
      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      if(type === "card-radio"){
        this.$node.wrap('<label class="card-radio '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span><span class="dot"></span></span>');
      }else if(type === "card-radio-wide"){
        this.$node.wrap('<label class="card-radio-wide '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span><span class="dot"></span></span>');
      }else if(type === "card-checkbox"){
        this.$node.wrap('<label class="card-checkbox '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
      }else if(type === "card-checkbox-wide"){
        this.$node.wrap('<label class="card-checkbox-wide '+theme+disabled+'"><span></span></label>');
        this.$node.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
      }
      this.$node.parent().parent().append(cardImg);
      this.$node.parent().parent().append(cardText);
      this.$node.parent().parent().append(cardTooltip);
      cardTooltip ? self.toggle("true", cardTooltip, OSName) : null;
      this.$node.parent().parent().css("width", this.settings.width);
      type === "card-radio-wide" || type === "card-checkbox-wide" ? (this.$node.parent().siblings(".card-text").children(".subtext").height() > 30 ? this.$node.parent().parent().css("padding", "16px 16px 16px 116px") : null) : null;
      this.$node.is(":checked") === true ? self.toggle(true, this.$node.parent().parent(), "selected") : null;
      this.$node.on("change", function(){
        var $this = $(this);
        if(type === "card-radio" || type === "card-radio-wide"){
          self.toggle(false, $("input[name="+inputName+"]").parent().parent(), 'selected');
          self.toggle(true, $this.parent().parent(), "selected");
        }else{
          $this.is(":checked") === true ? self.toggle(true, $this.parent().parent(), "selected") : self.toggle(false, $this.parent().parent(), "selected");
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
      var self = this,
          theme,
          disabled = this.$node.attr("disabled") ? ' disabled' : '',
          subText = this.$node.siblings("p").html(),
          subTextClass = subText ? ' detail-text' : '',
          label = this.$node.siblings("label").html(),
          addon = this.$node.siblings("input"),
          datepicker = this.$node.siblings(".ui-datepicker");

      label ? this.$node.siblings("label").remove() : null;
      subText ? this.$node.siblings("p").remove() : null;

      if(this.$node.attr("class") && this.$node.attr("class").match(/(theme-)\w+/g)){
        theme = this.$node.attr("class").match(/(theme-)\w+/g)[0];
      }
      theme = theme ? theme.split("theme-")[1] : '';

      if(this.settings.type === "tree"){
        this.$node.addClass("tree-checkbox");
        node.each(function(){
          var $this = $(this);
          if($this.attr("class") && $this.attr("class").match(/(theme-)\w+/g)){
            theme = $this.attr("class").match(/(theme-)\w+/g)[0];
          }
          theme = theme ? theme.split("theme-")[1] : '';
          disabled = $this.attr("disabled") ? ' disabled' : '';
          subText = $this.siblings("p").text();
          subTextClass = subText ? ' detail-text' : '';
          label = $this.siblings("label").text();
          addon = $this.siblings("input");
          label ? $this.siblings("label").remove() : null;
          subText ? $this.siblings("p").remove() : null;
          $this.wrap('<label class="checkbox-'+theme+disabled+subTextClass+'"><span></span></label>');
          $this.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
          if(subText){
            $this.parent().after('<div><span>'+label+'</span><p>'+subText+'</p></div>');
          }else{
            $this.parent().after('<span>'+label+'</span>');
          }
        });

        node.on("click", function(){
          var $this = $(this),
              parent = $(this).parentsUntil('.tree-checkbox').siblings("label"),
              isChecked = $this.is(":checked"),
              minusicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="indeterminate-icon" style="stroke-dashoffset:29.7833385;" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 8h8"></path></g></svg>',
              checkedicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" style="stroke-dashoffset:29.7833385;" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg>';

          if(isChecked === true){
            self.treeCheck(true, $this.parent().parent().parent().find("input[type='checkbox']"));
            self.treeCheck(true, parent.children().children("input"));
            parent.children().children("span").children("svg").remove();
            parent.children().children("span").append(minusicon);
            self.toggle(false, parent.children().children("span"), "arrow");
            self.toggle(true, parent.children().children("span"), "minus-icon");
            parent.children().children("span").children("svg").children().children().css("stroke-dashoffset", "0");
            parent.siblings(".sub-tree").each(function(){
              var $this = $(this),
                  listCheck;

              $this.find("input[type='checkbox']").each(function(){
                var $this = $(this);
                if($this.is(":checked") === false){
                  listCheck = false;
                  return false;
                }
                listCheck = true;
              });
              if(listCheck){
                self.toggle(true, $this.siblings("label").children().children("span.minus-icon"), "arrow");
                $this.siblings("label").children().children("span.minus-icon").children("svg").remove();
                self.toggle(false, $this.siblings("label").children().children("span.minus-icon"), "minus-icon");
                $this.siblings("label").children().children("span.arrow").append(checkedicon);
                $this.siblings("label").children().children("span.arrow").children("svg").children().children().css("stroke-dashoffset", "0");
              }
            });
          }else{
            if($this.siblings("span").hasClass("arrow")){
              self.treeCheck(false, $this.parent().parent().parent().find("input[type='checkbox']"));
              parent.siblings(".sub-tree").each(function(){
                var $this = $(this);
                if($this.find("input[type='checkbox']").is(":checked")){
                  self.toggle(true, $this.siblings("label").children().children("span.arrow"), "minus-icon");
                  $this.siblings("label").children().children("span.arrow").children("svg").remove();
                  self.toggle(false, $this.siblings("label").children().children("span.arrow"), "arrow")
                  $this.siblings("label").children().children("span.minus-icon").append(minusicon);
                  $this.siblings("label").children().children("span.minus-icon").children("svg").children().children().css("stroke-dashoffset", "0");
                }else{
                  var listCheck;
                  self.treeCheck(false, $this.siblings("label").children().children("input[type='checkbox']"));
                  $this.parentsUntil('.tree-checkbox').siblings("label").siblings(".sub-tree").each(function(){
                    $this.find("input").each(function(){
                      if($this.is(":checked") === true){
                        listCheck = true;
                        return false;
                      };
                      listCheck = false;
                    });
                    if(!listCheck){
                      self.treeCheck(false, $this.parentsUntil('.tree-checkbox').children("label").children().children("input"));
                    }
                  });
                }
              });
            }else{
              self.toggle(false, $this.parent().parent().parent().find("input[type='checkbox']").siblings("span"), "minus-icon");
              self.toggle(true, $this.parent().parent().parent().find("input[type='checkbox']").siblings("span"), "arrow");
              self.treeCheck(true, $this.parent().parent().parent().find("input[type='checkbox']"));
              parent.each(function(){
                var listCheck;
                $(this).siblings(".sub-tree").find("input[type='checkbox']").each(function(){
                  var $this = $(this);
                  if($this.is(":checked") === false){
                    listCheck = false;
                    return false;
                  };
                  listCheck = true;
                });
                if(listCheck){
                  self.toggle(false, $this.children().children("span"), "minus-icon");
                  self.toggle(true, $this.children().children("span"), "arrow");
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
            this.$node.wrap('<div class="addon"><label class="checkbox-'+theme+disabled+subTextClass+'"><span></span></label></div>');
            this.$node.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
          }else if(type==='radio'){
            this.$node.wrap('<div class="addon"><label class="radio-'+theme+disabled+subTextClass+'"><span></span></label></div>');
            this.$node.after('<span><span class="dot"></span></span>');
          }
          this.$node.parent().parent().parent().append(addon);
          addon.wrap('<div class="default-input-'+theme+'"></div')
          this.$node.parent().after('<span></span>');
        }else if(datepicker.length > 0){
          this.$node.is(":checked") ? datepicker.children("input").attr('disabled', false) : datepicker.children("input").attr('disabled', true);
          if(type==='checkbox'){
            this.$node.wrap('<div class="addon"><label class="checkbox-'+theme+disabled+subTextClass+'"><span></span></label></div>');
            this.$node.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
          }else if(type==='radio'){
            this.$node.wrap('<div class="addon"><label class="radio-'+theme+disabled+subTextClass+'"><span></span></label></div>');
            this.$node.after('<span><span class="dot"></span></span>');
          }
          this.$node.parent().parent().parent().append(datepicker);
          this.$node.parent().after('<span></span>');
        }else{
          if(type==='checkbox'){
            this.$node.wrap('<label class="checkbox-'+theme+disabled+subTextClass+'"><span></span></label>');
            this.$node.after('<span class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><path class="checked-icon" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M4 7.8L7 11l5-6"></path></g></svg></span>');
          }else if(type==='radio'){
            this.$node.wrap('<label class="radio-'+theme+disabled+subTextClass+'"><span></span></label>');
            this.$node.after('<span><span class="dot"></span></span>');
          }else if(type==='chip'){
            this.$node.wrap('<label class="chip-choice-'+theme+disabled+'"></label>');
            this.$node.after('<span>'+label+'</span>');
          }

          if(subText){
            this.$node.parent().after('<div><span>'+label+'</span><p>'+subText+'</p></div>');
          }else{
            type==='chip' ? null : this.$node.parent().after('<span>'+label+'</span>');
          }
        }

        if (/Edge/.test(navigator.userAgent)) {
          if(addon.length > 0 || datepicker.length > 0){
            addon.length > 0 ? addon.parent().after('<div class="addon__edge-bg" />') : null;
            datepicker.length > 0 ? datepicker.after('<div class="addon__edge-bg" />') : null;
            var $edge__bg = this.$node.parent().parent().parent().find(".addon__edge-bg"),
                $checked = this.$node,
                self = this;

            $edge__bg.on("change click", function(){
              $(this).siblings("div").children("input").trigger("click");
              $(this).siblings("div").children("input").trigger("focus");
              $(this).siblings("div").children("input").trigger("change");
            });
          }
        }

        if(addon.length > 0 || datepicker.length > 0){
          var $addonbox = this.$node.parent().parent().parent().find(".addon-input").parent(),
              $checked = this.$node
          self.addonClickEvent($addonbox, $checked);
        }

        this.$node.on("change click", function(){
          var $this = $(this);
          if(type==='radio'){
            if(addon.length > 0 || datepicker.length > 0){
              var addonInput = $this.parent().parent().parent().parent().parent().find(".addon-input");
              self.addonEvent(true, 'radio', addonInput, $this.parent().parent().siblings("div").children("input"));
              $this.parent().parent().siblings("div").children("input").focus();
            }else{
              var addonInput = $this.parent().parent().parent().parent().find(".addon-input");
              self.addonEvent(false, 'radio', addonInput);
            }
          }else{
            if(addon.length > 0 || datepicker.length > 0){
              if($this.is(":checked")){
                self.addonEvent(true, 'checkbox', addonInput, $this.parent().parent().siblings("div").children("input"));
                $this.parent().parent().siblings("div").children("input").focus();
              }else{
                self.addonEvent(false, 'checkbox', addonInput, $this.parent().parent().siblings("div").children("input"));
              }
            }
          }
        });
      }
    },
    addonClickEvent: function(node, $checked){
      var self = this;
      node.on("change click", function(){
        var $this = $(this);
        if($checked.is(":checked") === false){
          var addonInput = $this.parent().parent().parent().parent().parent().find(".addon-input");
          self.addonEvent(true, $checked.attr("type"), addonInput, $(this).children("input"));
          $(this).children("input").focus();
          /Edge/.test(navigator.userAgent) ? $(this).children("input").trigger("focus") : null;
          $checked.prop("checked", true);
        }
      });
    },
    addonEvent: function(state, type, input, node){
      if(type === 'radio'){
        input.each(function(){
          $(this).attr('disabled', true);
          /Edge/.test(navigator.userAgent) ? $(this).parent().siblings(".addon__edge-bg").css("z-index", "9999999") : null;
        });
      }
      if(state){
        node.attr('disabled', false);
        /Edge/.test(navigator.userAgent) ? node.parent().siblings(".addon__edge-bg").css("z-index", "-9999999") : null;
      }else if(!state && node){
        node.attr('disabled', true);
        /Edge/.test(navigator.userAgent) ? node.parent().siblings(".addon__edge-bg").css("z-index", "9999999") : null;
      }
    }
  };
  $.fn.uiRadioCheck=function(options){
    return this.each(function(i){
      newObject[i] = new UiRadioCheck(this, options);
    });
  };
})(jQuery, window);