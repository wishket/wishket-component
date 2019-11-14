;(function ($, window) {
  "use strict";
  let newObject = {}
  let UiSelect = function (node){
    //이렇게 하는 이유는 node를 사용하면 이벤트를 줄수가 없음
    this.node = node;
    this.$node = $(this.node);
    this.init();
  };

  UiSelect.prototype = {
    init: function(){
      this.createHtml();
      //close
    },

    practice: function(){
      let target = this,
          $selectBox = this.$node.next(),
          selectNode = this.node;

      this.node.style.display = "none";
      //셀렉트박스 width값 설정 default 100%
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
        
        target.open(e, this, selectNode, dropDown);
      });
    },
    
    open: function(e, node, selectNode, dropDown){
      if(dropDown.hasClass("open")){
        $(document).find(".select-dropdown.open").removeClass("open");
      }else{
        $(document).find(".select-dropdown.open").removeClass("open");
        dropDown.addClass("open");
      }
      const $dropDown = $(document).find(".select-dropdown");
      $dropDown.each(function(){
        const currentCheck = $(this).children().hasClass("current");
        currentCheck ? null : $(this).parent().removeClass("active");
      });
      node.classList.add("active");
      const selectValue = e.target.getAttribute("data-select-value");
      if(selectValue){
        const current = node.getElementsByClassName("current");
        const currentText = e.target.innerText;
        if(current.length > 0){
          for(let i=0; i < current.length; i++ ){
            current[i].classList.remove("current");
          }
        }
        node.getElementsByClassName("select-name")[0].innerText = currentText;
        const selectName = selectNode.getAttribute("name");
        e.target.classList.add("current");
        $("select[name="+selectName+"]").val(selectValue).prop("selected", true);
        this.toggle(null, dropDown, "open");
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
        '<div class="'+wrapClass+disabled+'">' +
        '  <span class="select-box">' +
        '    <span class="select-label">'+label+'</span>' +
        '    <p class="select-name"></p>' +
        '    <i class="select-icon"><svg class="select-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" fill-rule="evenodd" stroke="#9E9E9E" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M1 4l6 6 6-6"/></svg></i>' +
        '  </span>' +
        '  <ul class="select-dropdown">';
      option.each(function(){
        // label = option.attr("data-label");
        // console.log(option);
        const value = this.value;
        const text = this.innerText;
        createSelect += '<li data-select-value="'+value+'">'+text+'</li>';
      });
      createSelect += '  </ul>';
      createSelect += '</div>';

      this.$node.after(createSelect);

      this.practice();
    },
  };
  $.fn.uiSelect=function(){
    return this.each(function(i){
      newObject[i] = new UiSelect(this);
    });
  };
})(jQuery, window);