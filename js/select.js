;(function ($, window) {
  "use strict";

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
  }
  
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
  
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  var newObject = {}

  var defaults = {
    width: "100%", //width
    type: "default"
  }

  $(document).on("click", function(e){
    var target = e.target.closest("div.ui-label-select, div.ui-select");
    if(!target){
      $("div.ui-label-select, div.ui-select").not(target).each(function(){
        var $this = $(this);
        if($this.children(".select-dropdown").hasClass("open")){
          $this.hasClass("selected") ? null : $this.removeClass("active");
          $this.children(".select-dropdown").removeClass("open");
          $this.children(".select-box").children(".select-icon").removeClass("active");
          $this.removeClass("select__border");
        }
      });
    }
  });

  var UiSelect = function (node, options){
    var that = this;
    this.node = node;
    this.$node = $(this.node);
    this.initValue = this.$node.find("option:first").text()
    if(options === 'clear') {
      this.$dropdown = this.$node.siblings('.ui-select');
      this.syncOptions();
    } else if(options === 'reset') {
      this.$dropdown = this.$node.siblings('.ui-select');
      this.$node.val(this.initValue);
      this.syncOptions();
    } else {
      this.settings = $.extend({}, defaults, options);
      this.init();
    }
    this.$node.on('change', function () {
      that.syncOptions();
    });
  };

  UiSelect.prototype = {
    init: function(){
      this.createHtml();
      this.$node.hide();
      this.$node.next().css('width', this.settings.width);
    },

    syncOptions: function() {
      var selectDropdown = this.$node.next().children(".select-dropdown");
      var selectNameEl = this.$node.next().find(".select-name");
      var option = this.$node.find("option").not(':first');
      var targetValue = this.$node.val();
      var selectedValue;

      selectDropdown.children().remove();
      option.each(function(){
        var value = this.value,
            text = this.innerText,
            $this = $(this),
            selected = this.value === targetValue ? 'current' : '',
            disabled = $this.attr("disabled") ? 'disabled' : '',
            getClass = selected || disabled ? ' class="'+selected+' '+disabled+'"' : '';
        if(this.value === targetValue){
          $this.parent().next().addClass("selected");
          $this.parent().next().addClass("active");
          selectedValue = $this.text();
        }
        selectDropdown.append('<li data-select-value="'+value+'"'+getClass+'>'+text+'</li>')
      });
      selectNameEl.text(selectedValue ? selectedValue : this.initValue);
    },

    wait: function(){
      var self = this,
          divSelect = this.$node.next();

      if(!this.$node.attr("disabled")){
        divSelect.on("click", function(e){
          var $this = $(this),
              otherSelectors = $("div.ui-label-select, div.ui-select").not($this),
              $target = $(e.target);
          otherSelectors.each(function(){
            var $this = $(this);
            if($this.children(".select-dropdown").hasClass("open")){
              $this.hasClass("selected") ? null : $this.removeClass("active");
              $this.children(".select-dropdown").removeClass("open");
              $this.children(".select-box").children(".select-icon").removeClass("active");
              $this.removeClass("select__border");
            }
          });

          if($target.prop("tagName") === "LI"){
            var value = $target.attr("data-select-value");
            if(!$target.hasClass("disabled") && divSelect.children(".select-dropdown").hasClass("open")){
              $this.children(".select-box").children(".select-name").text($target.text());
              self.toggle(true, $this, "selected");
              self.toggle(false, $target.siblings(".current"), "current");
              self.toggle(true, $target, "current");
              self.toggle(false, $this.children(".select-box").children(".select-icon"), "active");
              self.toggle(false, $this.children(".select-dropdown"), "open");
              self.toggle(false, $this, "select__border");
              self.selectSync(value);
            }
          }else{
            if(divSelect.children(".select-dropdown").hasClass("open")){
              self.toggle(false, $this.children(".select-dropdown"), "open");
              self.toggle(false, $this.children(".select-box").children(".select-icon"), "active");
              self.toggle(false, $this, "select__border");
              divSelect.hasClass("selected") ? null : self.toggle(false, $this, "active");
            }else{
              self.toggle(true, $this.children(".select-dropdown"), "open");
              self.toggle(true, $this.children(".select-box").children(".select-icon"), "active");
              self.toggle(true, $this, "select__border");
              self.toggle(true, $this, "active");
            }
          }
        });
      }
    },



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

    createHtml: function(){
      var label = this.$node.find("option:first").text();
      var shape = (this.$node.attr('data-shape') === undefined)? '':this.$node.attr('data-shape');

      // this.$node.find("option:first").remove();
      var option = this.$node.find("option").not(":first"),
          wrapClass = this.$node.attr("class"),
          wrapDisabled = this.$node.attr("disabled") ? ' wrapdisabled' : '',
          createSelect = $(document.createDocumentFragment());

      if(this.settings.type === "label"){
        createSelect.append(
          '<div class="ui-label-select '+wrapClass+wrapDisabled+' '+shape+'" tabindex="0">' +
          '  <span class="select-box">' +
          '    <span class="select-label basic">'+label+'</span>' +
          '    <p class="select-name"></p>' +
          '    <i class="select-icon"><svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" fill-rule="evenodd" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M1 4l6 6 6-6"/></svg></i>' +
          '  </span>' +
          '  <p class="selectBg"></p>' +
          '  <ul class="select-dropdown">' +
          '  </ul>' +
          '</div>');
      }else{
        createSelect.append(
          '<div class="ui-select '+wrapClass+wrapDisabled+'" tabindex="0">' +
          '  <span class="select-box">' +
          '    <p class="select-name">'+label+'</p>' +
          '    <i class="select-icon"><svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" fill-rule="evenodd" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M1 4l6 6 6-6"/></svg></i>' +
          '  </span>' +
          '  <p class="selectBg"></p>' +
          '  <ul class="select-dropdown">' +
          '  </ul>' +
          '</div>');
      }
      createSelect = createSelect.detach();
      this.$node.after(createSelect);

      var selectDropdown = this.$node.next().children(".select-dropdown");
      var selectedValue = ""
      option.each(function(){
        var value = this.value,
            text = this.innerText,
            $this = $(this),
            selected = $this.attr("selected") ? 'current' : '',
            disabled = $this.attr("disabled") ? 'disabled' : '',
            getClass = selected || disabled ? ' class="'+selected+' '+disabled+'"' : '';

        if($this.attr("selected")){
          $this.parent().next().addClass("selected");
          $this.parent().next().addClass("active");
          $this.parent().next().children(".select-box").children(".select-name").text($this.text());
          selectedValue = value
        }
        selectDropdown.append('<li data-select-value="'+value+'"'+getClass+'>'+text+'</li>')
      });
      // 기본 값 설정
      this.$node.val(selectedValue)
      this.wait();
    },
  };
  $.fn.uiSelect=function(options){
    return this.each(function(i){
      newObject[i] = new UiSelect(this, options);
    });
  };
})(jQuery, window);
