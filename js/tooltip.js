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
    width:"260px",
    position:"top"
  }

  var isMobile = navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/) ? true : false;

  var UiTooltip = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  UiTooltip.prototype = {
    init: function(){
      this.$node.addClass("ui-tooltip");
      var boxHeight = this.$node.height();
      var boxWidth = this.$node.width();
      var tooltipTextBox = this.$node.children("div.tooltip-container");
      if(isMobile){
        tooltipTextBox.remove();
        this.$node.addClass("mobile__tooltip");
        this.tooltipEventMobile(tooltipTextBox, this.settings.width, this.settings.position);
      }else{
        if(this.settings.position === "bottom"){
          this.$node.children(".tooltip-container").css({
            "left":"50%",
            "transform":"translateX(-50%)",
            "top":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "bottomleft"){
          this.$node.children(".tooltip-container").css({
            "right":0,
            "top":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "bottomright"){
          this.$node.children(".tooltip-container").css({
            "left":0,
            "top":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "top"){
          this.$node.children(".tooltip-container").css({
            "left":"50%",
            "transform":"translateX(-50%)",
            "bottom":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "topleft"){
          this.$node.children(".tooltip-container").css({
            "right":0,
            "bottom":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "topright"){
          this.$node.children(".tooltip-container").css({
            "left":0,
            "bottom":boxHeight + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "left"){
          this.$node.children(".tooltip-container").css({
            "top":"0",
            "right":boxWidth + 8,
            "width":this.settings.width
          });
        }else if(this.settings.position === "right"){
          this.$node.children(".tooltip-container").css({
            "top":"0",
            "left":boxWidth + 8,
            "width":this.settings.width
          });
        }
        this.tooltipEventPc(tooltipTextBox);
      }
    },

    tooltipEventMobile: function(textBox, boxWidth, boxPosition){
      this.$node.on('click', function(){
        var $this = $(this),
            otherTooltip = $(".tooltip-container").not($this);
        if(textBox.hasClass("active")){
          textBox.removeClass("active");
          textBox.remove();
        }else{
          $('body').append(textBox);
          otherTooltip.each(function(){
            $this.removeClass("active");
            $this.remove();
          });
          if(boxPosition === "bottom"){
            textBox.css({
              "left":"50%",
              "transform":"translateX(-50%)",
              "top":$this.offset().top + 8 + $this.outerHeight(),
              "width": boxWidth
            });
          }else if(boxPosition === "top"){
            textBox.css({
              "left":"50%",
              "transform":"translateX(-50%)",
              "width": boxWidth
            });
            textBox.css('top', $this.offset().top - textBox.outerHeight() - 8);
          }else if(boxPosition === "left"){
            textBox.css({
              "left":$this.offset().left - parseInt(boxWidth) - 8,
              "top":$this.offset().top,
              "width": boxWidth
            });
          }else if(boxPosition === "right"){
            textBox.css({
              "left":$this.offset().left + $this.width() + 8,
              "top":$this.offset().top,
              "width": boxWidth
            });

          }
          textBox.addClass('active');
        }
      });
    },

    tooltipEventPc: function(textBox){
      this.$node.on('mouseenter', function(){
        $(this).css('z-index', '1');
        textBox.addClass('active');
      });
      this.$node.on('mouseleave', function(){
        $(this).css('z-index', 'inherit');
        textBox.removeClass('active');
      });
    },
  };
  $.fn.uiTooltip=function(options){
    if(isMobile){
      $(document).on("click", function(e){
        if(!e.target.closest(".tooltip-container") && !e.target.closest(".ui-tooltip")){
          $(".tooltip-container").each(function(){
            var $this = $(this);
            $this.removeClass("active");
            $this.remove();
          });
        }
      });
    }
    return this.each(function(i){
      newObject[i] = new UiTooltip(this, options);
    });
  };
})( jQuery, window);