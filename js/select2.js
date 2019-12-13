;(function ($, window) {
  "use strict";
  var newObject = {}

  var defaults = {
    width: "100%", //width
    type: "default-select", //type
  }

  var UiSelect = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    if(this.settings.type === 'default-select'){
      this.defaultInit();
      
    }else if(this.settings.type === 'label-select'){
      this.labelInit();
    }
    
  };

  UiSelect.prototype = {
    toggle: function(state, node, classNmae){
      if(state){
        node.addClass(classNmae);
      }else{
        node.removeClass(classNmae);
      }
    },

    selectSync: function(value){
      this.$node.val(value).prop("selected", true);
      this.$node.trigger("change");
    },

    //label input
    labelInit: function(){
      this.labelCreateHtml();
      this.$node.hide();
      this.$node.next().css('width', this.settings.width);
    },

    labelPractice: function(){
      var self = this;
      var divSelect = this.$node.next();

      //셀렉트 클릭
      divSelect.on("click", function(e){
        var value = $(e.target).attr("data-select-value");
        var otherSelector = $("div.ui-label-select").not($(this));

        //선택한 셀렉트 제외한 셀렉트 닫기
        otherSelector.each(function(){
          $(this).hasClass("selected") ? null : $(this).removeClass("active");
          $(this).children(".select-dropdown").removeClass("open");
          $(this).children(".select-box").children(".select-icon").removeClass("active");
        });

        //option 선택
        if(value){
          $(this).children(".select-box").children(".select-name").text($(e.target).text());
          self.toggle(false, $(this).children(".select-dropdown"), "open");
          self.toggle(true, $(this), "selected");
          self.toggle(false, $(this).children(".select-dropdown").children(".current"), "current");
          self.toggle(true, $(e.target), "current");
          self.selectSync(value);
        }

        if(divSelect.children(".select-dropdown").hasClass("open")){
          self.toggle(false, $(this).children(".select-dropdown"), "open");
          self.toggle(false, $(this).children(".select-box").children(".select-icon"), "active");
          divSelect.hasClass("selected") ? null : self.toggle(false, $(this), "active");
        }else{
          self.toggle(true, $(this).children(".select-dropdown"), "open");
          self.toggle(true, $(this).children(".select-box").children(".select-icon"), "active");
          self.toggle(true, $(this), "active");
        }
      });
    },

    labelCreateHtml: function(){
      var label = this.$node.find("option:first").text();
      $(this.node).find("option:first").remove();
      var option = this.$node.find("option");
      var wrapClass = this.$node.attr("class");
      var disabled = this.$node.attr("diabled") ? ' disabled' : '';

      var createSelect =
        '<div class="ui-label-select  '+wrapClass+disabled+'" tabindex="0">' +
        '  <span class="select-box">' +
        '    <span class="select-label basic">'+label+'</span>' +
        '    <p class="select-name"></p>' +
        '    <i class="select-icon"><svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" fill-rule="evenodd" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M1 4l6 6 6-6"/></svg></i>' +
        '  </span>' +
        '  <p class="selectBg"></p>' +
        '  <ul class="select-dropdown">' +
        '  </ul>' +
        '</div>';
      this.$node.after(createSelect);

      var selectDropdown = this.$node.next().children(".select-dropdown");

      option.each(function(){
        var value = this.value;
        var text = this.innerText;
        var selected = $(this).attr("selected") ? 'current' : '';
        var disabled = $(this).attr("disabled") ? 'disabled' : '';
        var getClass = selected || disabled ? ' class="'+selected+' '+disabled+'"' : ''
        if($(this).attr("selected")){
          $(this).parent().next().addClass("selected");
          $(this).parent().next().addClass("active");
          $(this).parent().next().children(".select-box").children(".select-name").text($(this).text());
        }
        selectDropdown.append('<li data-select-value="'+value+'"'+getClass+'>'+text+'</li>')
      });
      this.labelPractice();
    },

    //default
    defaultInit: function(){
      
    }
  };

  $.fn.uiSelect=function(options){
    //label select close
    $(document).on("click", function(e){
      if(!$(e.target).hasClass('selectBg') && !$(e.target).hasClass("ui-label-select")){
        $("div.ui-label-select").each(function(){
          $(this).hasClass("selected") ? null : $(this).removeClass("active");
          $(this).children(".select-dropdown").removeClass("open");
          $(this).children(".select-box").children(".select-icon").removeClass("active");
        });
      }
    });

    return this.each(function(i){
      newObject[i] = new UiSelect(this, options);
    });
  };
})(jQuery, window);