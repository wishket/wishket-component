;(function ($, window) {
  "use strict";
  let newObject = {}
  //디폴트 설정
  const defaults = {
    labelmaxcount : 10,  //라벨 최대갯수
    textlength : 100,  //인풋 텍스트 글자수
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
      $(document).on("click", ".i-close", function(e){
        target.inputSync(false, $(this).parent());
        target.addLabel("remove", $(this).parent());
      });
      $tagBox.children().on("keyup", function(e){
        target.keyEventSearch(e, $(this), $dropDown);
      });
    },

    //키이벤트
    keyEventSearch: function(e, target, $dropDown){
      const self = this;
      let value = target.val();
      const textlength = this.settings.textlength;

      //글자수 체크
      if(target.val().length > textlength){
        value = target.val(value.slice(0, textlength));
      }

      //드롭다운 액션
      if(value){
        this.toggle(true, $dropDown, "open");
        this.toggle(true, target.parent(), "active");
      }else{
        this.toggle(false, $dropDown, "open")
        this.toggle(false, target.parent(), "active");
      }

      //엔터
      if(e.keyCode == '13' && value){
        let stop = true;
        const labelMaxLength = this.settings.labelmaxcount;
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
            this.addLabel("add", value, target);
          }
        }else{
          console.log("더 이상 추가가 힘들어요.");
          target.val("");
        }
        this.toggle(false, $dropDown, "open");
        this.toggle(false, target.parent(), "active");
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
        selected = this.$node.val().replace(/=/gi, '');
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
          $dropDown.html("");
          if(data.length > 0){
            console.log("a");
            for (let i = 0; i < data.length; i++) {
              const listName = data[i].name.replace(new RegExp('('+value+')(?!([^<]+)?>)','g'), '<strong>$1</strong>');
              $dropDown.append("<li data-tag='"+data[i].name+"'><strong>‘</strong>"+listName+"<strong>’</strong> 입력</li>");
            }
          }else{
            $dropDown.append("<li data-tag='"+value+"'><strong>‘"+value+"’</strong> 입력</li>");
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

    toggle: function(state, node, className){
      if(state){
        node.addClass(className);
      }else{
        node.removeClass(className);
      }
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
        $tagBox.before("<span class=\"autocomplete-label\">"+tag+"<i class=\"i-close\"></i></span>");
        this.inputSync(true, tag);
        target.val("");
        this.$node.next().children(".tag-dropdown").css("top", this.$node.next().height());
        // this.widthChange(target.parent());
      }
    },

    //인풋 싱크
    inputSync: function(state, tag){
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