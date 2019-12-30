;(function ($, window) {
  "use strict";
  var newObject = {}

  var defaults = {
  }

  var UiToggle = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  UiToggle.prototype = {
    init: function(){
      var self = this;
      this.creatHtml();
      this.$node.parent().height(this.$node.siblings("p").height());
      this.$node.siblings(".on").on("click", function(){
        self.toggle(true, $(this), "active");
        self.toggle(false, $(this).siblings(".off"), "active");
        self.syncInput("on");
      })
      this.$node.siblings(".off").on("click", function(){
        self.toggle(true, $(this), "active");
        self.toggle(false, $(this).siblings(".on"), "active");
        self.syncInput("off");
      })
    },
    
    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className);
      }
    },

    syncInput: function(value){
      this.$node.val(value);
      this.$node.change();
    },

    creatHtml: function(){
      var classWrap = this.$node.attr("class");
      var helptext = this.$node.siblings("p");
      this.$node.wrap('<div class="toggle '+classWrap+'"></div>');
      this.$node.parent().prepend(helptext);
      var html =
        '<button class="off">off<span></span></button>' +
        '<button class="on">on<span></span></button>';
      this.$node.before(html);
    }
  };
  $.fn.uiToggle=function(){
    return this.each(function(i){
      newObject[i] = new UiToggle(this);
    });
  };
})( jQuery, window);