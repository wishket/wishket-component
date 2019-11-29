;(function ($, window) {
  "use strict";
  var newObject = {}
  var UiSelect = function (node){
    this.node = node;
    this.$node = $(this.node);
    this.init();
  };

  UiSelect.prototype = {
    init: function(){
      this.createHtml();
    },

    practice: function(selected){
      var self = this,
          $selectBox = this.$node.next(),
          selectNode = this.node;

      // display 제거
      this.node.style.display = "none";
      

      var width = this.node.getAttribute("data-width") ? this.node.getAttribute("data-width") : "100%";
      var dropDown = $selectBox.children(".select-dropdown");
      dropDown.css('width', width);
      $selectBox.css('width', width);
      
      //close
      $(document).on("click.ui-label-select", function(e){
        var target = String(e.target.classList);
        if(target === "select-box" || target === "current" || target === "select-label" || target === "select-icon" || target === "select-name"){
          // $(document).find(".select-dropdown.open").removeClass("open");
          // $(this).find(".select-dropdown.open") ? $(document).find(".select-dropdown.open").removeClass("open") : null;
          
        }else{
          dropDown.removeClass("open");
          dropDown.parent().children(".select-box").children(".select-icon").removeClass("active");
          var currentCheck = dropDown.children().hasClass("current");
          currentCheck ? null : dropDown.parent().removeClass("active");
        }
      });

      //open
      $selectBox.on("click", function(e){
        if($(this).hasClass("active")){
          self.open(e, $(this), selectNode, dropDown);
        }else{
          self.open(e, $(this), selectNode, dropDown);
          self.toggle(true, $(this), "active");
          // self.toggle(true, $(this).children(".select-box").children(".select-icon"), "active");
        }
      });
    
      $selectBox.children(".select-dropdown").children().on("click", function(){
        self.listSelectClick($(this));
        self.toggle(false, $(this).parent().prev().children(".select-icon"), "active");
      });

      $selectBox.on("keydown", function(e){
        if(e.keyCode == '13'){
          //엔터
        }else if(e.keyCode == '32'){
          //스페이스
          e.preventDefault();
        }else if(e.keyCode == '27'){
          //esc
        }
      });
    },
    
    listSelectClick: function(node){
      var self = this;
      var selectValue = node.attr('data-select-value');
      node.parent().parent().prev().val(selectValue).prop("selected", true);
      this.$node.trigger("change");
      self.toggle(false, node.siblings(".current"),"current");
      node.parent().children("li").each(function(){
        var listValue = node.attr("data-select-value");
        listValue === selectValue ? self.toggle(true, node, "current") : null;
      });
      node.parent().prev().children(".select-name").text(node.text());
    },

    open: function(e, node, selectNode, dropDown){
      if(dropDown.hasClass("open")){
        $(document).find(".select-dropdown.open").removeClass("open");
        if(node.children(".select-box").children(".select-name").text() === ''){
          this.toggle(false, node, "active");
          this.toggle(false, node.children(".select-box").children(".select-icon"), "active");
        }else{
          this.toggle(false, node.children(".select-box").children(".select-icon"), "active");
        }
      }else{
        $(document).find(".select-dropdown.open").removeClass("open");
        dropDown.addClass("open");
        this.toggle(true, node.children(".select-box").children(".select-icon"), "active");
      }
    },

    toggle: function(state, node, classNmae){
      if(state){
        node.addClass(classNmae);
      }else{
        node.removeClass(classNmae);
      }
    },

    createHtml: function(){
      var label = this.$node.find("option:first").text();
      $(this.node).find("option:first").remove();
      var option = this.$node.find("option");
      var wrapClass = this.$node.attr("class");
      var disabled = this.$node.attr("diabled") ? ' disabled' : '';

      var createSelect =
        '<div class="'+wrapClass+disabled+'" tabindex="0">' +
        '  <span class="select-box">' +
        '    <span class="select-label basic">'+label+'</span>' +
        '    <p class="select-name"></p>' +
        '    <i class="select-icon"><svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" fill-rule="evenodd" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M1 4l6 6 6-6"/></svg></i>' +
        '  </span>' +
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
      this.practice();
    },
  };
  $.fn.uiSelect=function(){
    return this.each(function(i){
      newObject[i] = new UiSelect(this);
    });
  };
})(jQuery, window);