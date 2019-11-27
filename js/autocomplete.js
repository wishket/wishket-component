;(function ($, window) {
  "use strict";
  let newObject = {}
  //디폴트 설정
  const defaults = {
    labelmaxcount : 10,  //라벨 최대갯수
    textlength : 100,  //인풋 텍스트 글자수
    listwidth : "inherit",
  }
  let selectData;
  let UiAutoComple = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  UiAutoComple.prototype = {
    init: function(){
      this.createHtml();
      this.$node.css("display", "none");
    },

    practice: function(){
      const target = this;
      const $tagBox = $(this.node).next().children(".ui-autocomplete");
      const $dropDown = $(this.node).next().children(".tag-dropdown");
      $dropDown.css("width", this.settings.listwidth);
      $(document).on("click", ".i-close", function(e){
        target.inputSync(false, $(this).parent());
        target.addLabel("remove", $(this).parent());
      });
      $tagBox.children().on("keyup", function(e){
        if(e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '38' || e.keyCode == '13'){
          target.keyboardAccessibility($(this), e.keyCode);
        }else{
          target.keyEventSearch(e, $(this), $dropDown);
        }
      });
    },

    //키이벤트
    keyEventSearch: function(e, target, $dropDown){
      const self = this;
      let value = target.val();
      const textlength = this.settings.textlength;
      this.stringReplace(value, target);

        //글자수 체크
      if(target.val().length > textlength){
        target.val(value.slice(0, textlength));
      }

      const dropdownPostion = target.parent().width() - target.width() - 16;
      //드롭다운 액션

      if(value.replace(/ /gi, '') === ''){
        $dropDown.css("left", dropdownPostion);
        this.toggle(false, $dropDown, "open")
        this.toggle(false, target.parent(), "active");
      }else{
        $dropDown.css("left", dropdownPostion);
        this.toggle(true, $dropDown, "open");
        this.toggle(true, target.parent(), "active");
      }

      //백스페이스시 삭제
      // else if(e.keyCode == '8' && !value){
      //   const target = this.$node.next().children(".ui-autocomplete").children(".tag-input").prev();
      //   this.addLabel("remove", target);
      //   this.inputSync(false, target);
      // }

      let selected = [];
      const selectedsLabel = $dropDown.prev().children("span");
      if(selectedsLabel.length > 0){
        selected = value.replace(/=/gi, '');
      }

      let selected_string = (selected !== [] ? "&selected=" + selected : "");
      selected_string = selected_string.replace(/#/gi, '%23');
      selected_string = selected_string.replace(/:/gi, '');
      selected_string = selected_string.replace(/\//gi, '%2F');
      selected_string = selected_string.replace(/\+/gi, '%2B');

      $.ajax({
        url: "/tag/?startwith=" + value + selected_string,
        method: "GET",
        success: function (data) {
          event.preventDefault();
          $dropDown.html("");
          if(data.length > 0){
            for (let i = 0; i < data.length; i++) {
              const listName = data[i].name.replace(new RegExp('('+value+')(?!([^<]+)?>)','g'), '<strong>$1</strong>');
              $dropDown.append("<li class='dropdown-list' data-tag='"+data[i].name+"' tabindex='0'><strong>‘</strong>"+listName+"<strong>’</strong> <span class='count-data'>"+data[i].count+"</span></li>");
            }
          }else{
            $dropDown.append("<li class='dropdown-list' data-tag='"+value+"' tabindex='0'><strong>‘"+value+"’</strong> 입력</li>");
          }
          $dropDown.children().on("click", function(){
            const value = $(this).data("tag");
            let stop = true;
            const labelMaxLength = self.settings.labelmaxcount;
            const labelCurrentLength = $dropDown.prev().children("span").length;
            if(labelMaxLength > labelCurrentLength){
              $dropDown.prev().children("span").each(function () {
                if($(this).text()=== value){
                  stop = false;
                  const label = $(this);
                  label.addClass("error");
                  setTimeout(function(i){
                    label.removeClass("error");
                  }, 2000);
                  $(this).siblings("input").val("");
                }
              });
              if(stop){
                self.addLabel("add", value, target);
                self.inputSync(true, value);
              }
            }else{
              console.log("더 이상 추가가 힘들어요.");
              $dropDown.prev().children("input").val("");
            }
            self.toggle(false, $dropDown, "open");
            self.toggle(false, $dropDown.prev(), "active");
          });
        }
      });
    },

    // //input width
    // widthChange: function(node){
    //   //node 기준 .ui-autocomplete
    //   const fullWidth = parseInt(node.width());
    //   const label = node.children(".autocomplete-label");
    //   let labelWidth = 0;
    //   if(label.length > 0){
    //     label.each(function(){
    //       labelWidth = labelWidth + parseInt($(this).outerWidth() + 20);
    //     });
    //     node.children(".tag-input").width(fullWidth - labelWidth);
    //     console.log(fullWidth - labelWidth +' input 변경 width');
    //   }else{
    //     node.children(".tag-input").width(fullWidth - 8);
    //   }
    // },

    stringReplace: function (value, node){
      // selected_string = selected_string.replace(/#/gi, '%23');
      // selected_string = selected_string.replace(/:/gi, '');
      // selected_string = selected_string.replace(/\//gi, '%2F');
      // value.
        node.val(value.replace("*!*", ""));
    },

    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className);
      }
    },

    keyboardAccessibility: function(node, keycode){
      const self = this;
      const list = node.parent().next().children("li");
      const $dropDown = node.parent().next();
      if(keycode == '40'){
        list.each(function(){
          if($(this).hasClass("list-selected")){
            if($(this).next(".dropdown-list")[0]){
              self.toggle(true, $(this).next(), "list-selected");
              self.toggle(false, $(this), "list-selected");
            }
            self.toggle(false, list.first(), "list-selected");
            return false;
          }else{
            self.toggle(true, list.first(), "list-selected");
          }
        });
      }else if(keycode == '38'){
        list.each(function(){
          if($(this).hasClass("list-selected")){
            if($(this).next(".dropdown-list")[0]){
              self.toggle(true, $(this).prev(), "list-selected");
              self.toggle(false, $(this), "list-selected");
            }else{
              self.toggle(true, $(this).prev(), "list-selected");
              self.toggle(false, $(this), "list-selected");
            }
          }
        });
      }else if(keycode == '13'){  //엔터
        if(list.hasClass("list-selected")){
          let dataTag = node.parent().next().children(".list-selected").attr("data-tag");
          dataTag = dataTag.replace(/  +/g, ' ');
          dataTag = dataTag.trim();
          let stop = true;
          const labelMaxLength = this.settings.labelmaxcount;
          const labelCurrentLength = $dropDown.prev().children("span").length;
          if(labelMaxLength > labelCurrentLength){
            $dropDown.prev().children("span").each(function () {
              if($(this).text()=== dataTag){
                stop = false;
                const label = $(this);
                label.addClass("error");
                setTimeout(function(i){
                    label.removeClass("error");
                }, 2000);
                $(this).siblings("input").val("");
              }
            });
            if(stop){
              this.addLabel("add", dataTag, node);
            }
          }else{
            console.log("더 이상 추가가 힘들어요.");
            node.val("");
          }
          this.toggle(false, $dropDown, "open");
          this.toggle(false, node.parent(), "active");
        }else{
          let stop = true;
          const labelMaxLength = this.settings.labelmaxcount;
          const labelCurrentLength = $dropDown.prev().children("span").length;
          let value = node.val();
          value = value.replace(/  +/g, ' ');
          value = value.trim();
          if(labelMaxLength > labelCurrentLength){
            $dropDown.prev().children("span").each(function () {
              if($(this).text()=== value){
                stop = false;
                const label = $(this);
                label.addClass("error");
                setTimeout(function(i){
                    label.removeClass("error");
                }, 2000);
                $(this).siblings("input").val("");
              }
            });
            if(stop){
              this.addLabel("add", value, node);
            }
          }else{
            console.log("더 이상 추가가 힘들어요.");
            node.val("");
          }
          this.toggle(false, $dropDown, "open");
          this.toggle(false, node.parent(), "active");
        }
      }

      // if(e.keyCode == '40'){  //화살표 아래
      //   node.parent().next().children(":first").focus();
      // }else if(e.keyCode == '38'){  //화살표 위
      //
      // }
      return false;
    },

    //라벨 추가, 제거
    addLabel: function(type, tag, target){
      const $tagBox = this.$node.next().children(".ui-autocomplete").children(".tag-input");
      if(type === "create"){
        tag = tag.split('*!*');
        if(tag.length > 1){
          for(let i=0; i<tag.length; i++){
            $tagBox.before("<span class=\"autocomplete-label\">"+tag[i]+"<i class=\"i-close\"></i></span>");
          }
        }
      }else if(type === "remove"){
        tag.remove();
        this.$node.next().children(".tag-dropdown").css("top", this.$node.next().height());
      }else{
        tag = tag.replace(/  +/g, ' ');
        tag = tag.trim();
        $tagBox.before("<span class=\"autocomplete-label\">"+tag+"<i class=\"i-close\"></i></span>");
        this.inputSync(true, tag);
        target.val("");
        this.$node.next().children(".tag-dropdown").css("top", this.$node.next().height());
        // this.widthChange(target.parent());
      }
    },

    //인풋 싱크
    inputSync: function(state, tag){
      tag = tag.trim();
      tag = tag.replace(/  +/g, ' ');
      if(state){
        const currentValue = this.$node.val();
        if(!this.$node.val()){
          this.$node.val(tag);
        }else{
          this.$node.val(currentValue+"*!*"+tag);
          this.$node.trigger("change");
        }
      }else{
        const currentValue = this.$node.val().split('*!*');
        const findValue = currentValue.indexOf(tag.text());
        currentValue.splice(findValue, 1);
        this.$node.val(currentValue.join('*!*'));
        this.$node.trigger("change");
      }
    },

    //생성
    createHtml: function(value){
      const wrapClass = this.node.getAttribute("class") ? 'class="'+this.node.getAttribute("class")+'" ' : '';
      const placeholder = this.node.getAttribute("placeholder") ? 'placeholder="'+this.node.getAttribute("placeholder")+'"' : '';
      this.node.classList.add("hiddenInput");
      const createHtml =
        '<div class="autocompletebox">' +
        '  <div '+wrapClass+'>' +
        '    <input class="tag-input" type="text" '+placeholder+' />' +
        '  </div>' +
        '  <ul class="tag-dropdown" >' +
        '  </ul>' +
        '</div>';
      this.$node.after(createHtml);
      let loadTag = this.$node.attr("value");
      loadTag ? this.addLabel("create", loadTag) : null;
      this.practice();
    },
  };

  $.fn.uiAutoComple=function(options){
    return this.each(function(i){
      newObject[i] = new UiAutoComple(this, options);
    });
  };
})(jQuery, window);