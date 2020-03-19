;(function ($, window) {
  "use strict";

  var newObject = {}
  //디폴트 설정
  var defaults = {
    labelmaxcount : 10,  //라벨 최대갯수
    textlength : 100,  //인풋 텍스트 글자수
    listwidth : "inherit",
    test : false
  }
  var selectData;
  var UiAutoComple = function (node, options){
    this.node = node;
    this.$node = $(this.node);
    this.settings = $.extend({}, defaults, options);
    this.init();
  };

  $(document).on("click", function(e){
    var target = e.target.closest("div.autocompletebox");
    if(!target){
      $("div.autocompletebox").not(target).each(function(){
        var $this = $(this);
        if($this.children(".ui-autocomplete").hasClass("active")){
          $this.children(".ui-autocomplete").removeClass("active");
          $this.children(".tag-dropdown").removeClass("open");
        }
      });
    }else{
      $("div.autocompletebox").not(target).each(function(){
        var $this = $(this);
        if($this.children(".ui-autocomplete").hasClass("active")){
          $this.children(".ui-autocomplete").removeClass("active");
          $this.children(".tag-dropdown").removeClass("open");
        }
      });
    }
  });

  UiAutoComple.prototype = {
    init: function(){
      this.createHtml();
      this.$node.css("display", "none");
    },

    wait: function(){
      var target = this,
          $tagBox = this.$node.next().children(".ui-autocomplete"),
          $dropDown = this.$node.next().children(".tag-dropdown"),
          self = this;
      $dropDown.css("width", this.settings.listwidth);

      $(document).on("click", ".i-close", function(e){
        var $this = $(this);
        target.inputSync(false, $this.parent().text());
        target.addLabel("remove", $this.parent());
      });

      $tagBox.children().on("keyup click", function(e){
        var $this = $(this);
        self.toggle(true, $this.parent(), "active");
        if(e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '38' || e.keyCode == '13'){
          target.keyboardAccessibility($this, e.keyCode);
        }else{
          target.keyEventSearch(e, $this, $dropDown);
        }
      });
    },

    //키이벤트
    keyEventSearch: function(e, target, $dropDown){
      var self = this,
          value = target.val(),
          textlength = this.settings.textlength;
      this.stringReplace(value, target);

        //글자수 체크
      if(target.val().length > textlength){
        target.val(value.slice(0, textlength));
      }

      var dropdownPostion;
      if(target.parent().width() === target.width() + 8){
        dropdownPostion = 0;
      }else{
        dropdownPostion = target.parent().width() - target.width() - 16;
      }

      if(value.replace(/ /gi, '') === ''){
        $dropDown.css("left", dropdownPostion);
        this.toggle(false, $dropDown, "open")
      }else{
        $dropDown.css("left", dropdownPostion);
        this.toggle(true, $dropDown, "open");
      }

      var selected = [];
      var selectedsLabel = $dropDown.prev().children("span");
      if(selectedsLabel.length > 0){
        selected = value.replace(/=/gi, '');
      }

      var selected_string = (selected !== [] ? "&selected=" + selected : "");
      selected_string = selected_string.replace(/#/gi, '%23');
      selected_string = selected_string.replace(/:/gi, '');
      selected_string = selected_string.replace(/\//gi, '%2F');
      selected_string = selected_string.replace(/\+/gi, '%2B');

      if(this.settings.test){
        e.preventDefault();
        $dropDown.html("");
        $dropDown.append("<li class='dropdown-list' data-tag='"+value+"' tabindex='0'><strong>‘"+value+"’</strong> 입력</li>");
        $dropDown.children().on("click", function(){
          var $this = $(this);
          var value = $(this).data("tag");
          var stop = true;
          var labelMaxLength = self.settings.labelmaxcount;
          var labelCurrentLength = $dropDown.prev().children("span").length;
          if(labelMaxLength > labelCurrentLength){
            $dropDown.prev().children("span").each(function () {
              if($this.text()=== value){
                stop = false;
                var label = $this;
                label.addClass("error");
                setTimeout(function(i){
                  label.removeClass("error");
                }, 2000);
                $this.siblings("input").val("");
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
      }else{
        $.ajax({
          url: "/tag/?startwith=" + value + selected_string,
          method: "GET",
          success: function (data) {
            e.preventDefault();
            $dropDown.html("");
            if(data.length > 0){
              for (var i = 0; i < data.length; i++) {
                var listName = data[i].name.replace(new RegExp('('+value+')(?!([^<]+)?>)','g'), '<strong>$1</strong>');
                $dropDown.append("<li class='dropdown-list' data-tag='"+data[i].name+"' tabindex='0'><strong>‘</strong>"+listName+"<strong>’</strong> <span class='count-data'>"+data[i].count+"</span></li>");
              }
            }else{
              $dropDown.append("<li class='dropdown-list' data-tag='"+value+"' tabindex='0'><strong>‘"+value+"’</strong> 입력</li>");
            }
            $dropDown.children().on("click", function(){
              var value = $(this).data("tag"),
                  stop = true,
                  labelMaxLength = self.settings.labelmaxcount,
                  labelCurrentLength = $dropDown.prev().children("span").length;
              if(labelMaxLength > labelCurrentLength){
                $dropDown.prev().children("span").each(function () {
                  $this = $(this);
                  if($this.text()=== value){
                    stop = false;
                    var label = $this;
                    label.addClass("error");
                    setTimeout(function(i){
                      label.removeClass("error");
                    }, 2000);
                    $this.siblings("input").val("");
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
      }
    },

    stringReplace: function (value, node){
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
      var self = this,
          list = node.parent().next().children("li"),
          $dropDown = node.parent().next();
      if(keycode == '40'){
        list.each(function(){
          var $this = $(this);
          if($this.hasClass("list-selected")){
            if($this.next(".dropdown-list")[0]){
              self.toggle(true, $this.next(), "list-selected");
              self.toggle(false, $this, "list-selected");
            }
            self.toggle(false, list.first(), "list-selected");
            return false;
          }else{
            self.toggle(true, list.first(), "list-selected");
          }
        });
      }else if(keycode == '38'){
        list.each(function(){
          var $this = $(this);
          if($this.hasClass("list-selected")){
            if($this.next(".dropdown-list")[0]){
              self.toggle(true, $this.prev(), "list-selected");
              self.toggle(false, $this, "list-selected");
            }else{
              self.toggle(true, $this.prev(), "list-selected");
              self.toggle(false, $this, "list-selected");
            }
          }
        });
      }else if(keycode == '13'){  //엔터
        if(node.val() !== ' '){
          if(list.hasClass("list-selected")){
            var dataTag = node.parent().next().children(".list-selected").attr("data-tag");
                dataTag = dataTag.replace(/  +/g, ' ');
                dataTag = dataTag.trim();
            var stop = true,
                labelMaxLength = this.settings.labelmaxcount,
                labelCurrentLength = $dropDown.prev().children("span").length;
            if(labelMaxLength > labelCurrentLength){
              $dropDown.prev().children("span").each(function () {
                var $this = $(this);
                if($this.text()=== dataTag){
                  stop = false;
                  var label = $this;
                  label.addClass("error");
                  setTimeout(function(i){
                      label.removeClass("error");
                  }, 2000);
                  $this.siblings("input").val("");
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
          }else if(!node.val()){
            return
          }else{
            var stop = true,
                labelMaxLength = this.settings.labelmaxcount,
                labelCurrentLength = $dropDown.prev().children("span").length,
                value = node.val();
                value = value.replace(/  +/g, ' ');
                value = value.trim();
            if(labelMaxLength > labelCurrentLength){
              $dropDown.prev().children("span").each(function () {
                if($(this).text()=== value){
                  stop = false;
                  var label = $(this);
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
      }
      return false;
    },

    //라벨 추가, 제거
    addLabel: function(type, tag, target){
      var $tagBox = this.$node.next().children(".ui-autocomplete").children(".tag-input");
      if(type === "create"){
        tag = tag.split('*!*');
        if(tag.length > 1){
          for(var i=0; i<tag.length; i++){
            $tagBox.before("<span class=\"autocomplete-label\">"+tag[i]+"<i class=\"i-close\"></i></span>");
          }
        }
      }else if(type === "remove"){
        tag.remove();
        this.$node.next().children(".tag-dropdown").css("top", this.$node.next().height());
      }else{
        if(tag !== ''){
          tag = tag.replace(/  +/g, ' ');
          tag = tag.trim();
          $tagBox.before("<span class=\"autocomplete-label\">"+tag+"<i class=\"i-close\"></i></span>");
          this.inputSync(true, tag);
          target.val("");
          this.$node.next().children(".tag-dropdown").css("top", this.$node.next().height());
          // this.widthChange(target.parent());
        }
      }
    },

    //인풋 싱크
    inputSync: function(state, tag){
      tag = tag.trim();
      tag = tag.replace(/  +/g, ' ');
      if(state){
        var currentValue = this.$node.val();
        if(!this.$node.val()){
          this.$node.val(tag);
        }else{
          this.$node.val(currentValue+"*!*"+tag);
          this.$node.trigger("change");
        }
      }else{
        var currentValue = this.$node.val().split('*!*');
        var findValue = currentValue.indexOf(tag);
        currentValue.splice(findValue, 1);
        this.$node.val(currentValue.join('*!*'));
        this.$node.trigger("change");
      }
    },

    //생성
    createHtml: function(value){
      var wrapClass = this.node.getAttribute("class") ? 'class="ui-autocomplete '+this.node.getAttribute("class")+'" ' : '',
          placeholder = this.node.getAttribute("placeholder") ? 'placeholder="'+this.node.getAttribute("placeholder")+'"' : '',
          loadTag = this.$node.attr("value"),
          $flag = $(document.createDocumentFragment());
      this.node.classList.add("hiddenInput");
      var createHtml =
        '<div class="autocompletebox">' +
        '  <div '+wrapClass+'>' +
        '    <input class="tag-input" type="text" '+placeholder+' />' +
        '  </div>' +
        '  <ul class="tag-dropdown" >' +
        '  </ul>' +
        '</div>';
      $flag.append(createHtml);
      this.$node.after($flag);
      loadTag ? this.addLabel("create", loadTag) : null;
      this.wait();
    },
  };

  $.fn.uiAutoComple=function(options){
    return this.each(function(i){
      newObject[i] = new UiAutoComple(this, options);
    });
  };
})(jQuery, window);