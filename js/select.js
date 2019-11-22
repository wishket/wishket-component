;(function ($, window) {
  "use strict";
  let newObject = {}
  let UiSelect = function (node){
    this.node = node;
    this.$node = $(this.node);
    this.init();
  };

  UiSelect.prototype = {
    init: function(){
      this.createHtml();
    },

    practice: function(selected){
      let self = this,
          $selectBox = this.$node.next(),
          selectNode = this.node;

      // this.node.style.display = "none";

      const width = this.node.getAttribute("data-width") ? this.node.getAttribute("data-width") : "100%";
      const dropDown = $selectBox.children(".select-dropdown");
      dropDown.css('width', width);
      $selectBox.css('width', width);
      
      //close
      $(document).on("click.ui-label-select", function(e){
        const target = String(e.target.classList.value);
        if(target === "select-box" || target === "current" || target === "select-label" || target === "select-icon" || target === "select-name"){
          // $(document).find(".select-dropdown.open").removeClass("open");
          // $(this).find(".select-dropdown.open") ? $(document).find(".select-dropdown.open").removeClass("open") : null;
        }else{
          dropDown.removeClass("open");
          const currentCheck = dropDown.children().hasClass("current");
          currentCheck ? null : dropDown.parent().removeClass("active");
        }
      });

      //open
      $selectBox.on("click", function(e){
        if($(this).hasClass("active")){
          self.open(e, $(this), selectNode, dropDown);
        }else{
          console.log("not active class");
          self.open(e, $(this), selectNode, dropDown);
          self.toggle(true, $(this), "active");
        }
      });
    
      $selectBox.children(".select-dropdown").children().on("click", function(){
        self.listSelectClick($(this));
        
      });

      $selectBox.on("keydown", function(e){
        if(e.keyCode == '13'){
          //엔터
        }else if(e.keyCode == '32'){
          //스페이스
          e.preventDefault();
        }else if(e.keyCode == '27'){
          //esc
          console.log('esc');
        }
      });
    },
    
    listSelectClick: function(node){
      const self = this;
      const selectValue = node.attr('data-select-value');
      node.parent().parent().prev().val(selectValue).prop("selected", true);
      this.$node.trigger("change");
      self.toggle(false, node.siblings(".current"),"current");
      node.parent().children("li").each(function(){
        const listValue = node.attr("data-select-value");
        listValue === selectValue ? self.toggle(true, node, "current") : null;
      });
      node.parent().prev().children(".select-name").text(node.text());
    },

    open: function(e, node, selectNode, dropDown){
      if(dropDown.hasClass("open")){
        $(document).find(".select-dropdown.open").removeClass("open");
        console.log("active remove!!");
      }else{
        $(document).find(".select-dropdown.open").removeClass("open");
        dropDown.addClass("open");
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
      const label = this.$node.find("option:first").text();
      $(this.node).find("option:first").remove();
      const option = this.$node.find("option");
      const wrapClass = this.$node.attr("class");
      const disabled = this.$node.attr("diabled") ? ' disabled' : '';

      let createSelect =
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

      const selectDropdown = this.$node.next().children(".select-dropdown");

      option.each(function(){
        const value = this.value;
        const text = this.innerText;
        let selectedClass = $(this).attr("selected") ? 'class="current"' : '';
        if($(this).attr("selected")){
          $(this).parent().next().addClass("selected");
          $(this).parent().next().addClass("active");
          $(this).parent().next().children(".select-box").children(".select-name").text($(this).text());
        }
        selectDropdown.append('<li data-select-value="'+value+'" '+selectedClass+'>'+text+'</li>')
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