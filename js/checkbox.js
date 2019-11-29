;(function ( $, window, document, undefined ) {
  $.uiCheckbox = {
    setting:function(){
      var target = $('[data-checkbox-type]');
      target.each(function(){
        var type   = $(this).attr('data-checkbox-type');
        var size = target.attr('data-checkobx-size');
        size = $.uiCheckbox.getSize(size);
        if(type === 'group'){
          $.uiCheckbox.group($(this), size);
        }else if(type === 'tree'){
          $.uiCheckbox.tree($(this), size);
        }else if(type === 'chip-choice'){
          $.uiCheckbox.chip($(this), size);
        }
        else{
          $.uiCheckbox.single($(this), size);
        }
      });
    },
    single:function(target, size){
      var label;
      var theme = target.attr("data-checkbox-theme");
      var detailText = target.attr("data-checkbox-detaile");
      var detaileClass = !detailText ? '' : 'detail-text';
      var name = target.attr("data-checkbox-name") ? 'name="'+target.attr("data-checkbox-name")+'" ' : '';
      var disabled = !target.attr("data-checkbox-disabled") ? '' : 'disabled ';
      var id = target.attr("id");
      var wrapId = !target.attr("id") ? '' : 'id="'+target.attr("id")+'" ';
      var wrapClass = !target.attr("class") ? '' : 'class="'+target.attr("class")+'" ';
      var defaultOption = !target.attr("data-checkbox-default") ? '' : 'checked="checked" ';
      var value = !target.attr("data-checkbox-value") ? 'value="'+target.attr("data-checkbox-label")+'" ' : 'value="'+target.attr("data-checkbox-value")+'" ';
      var horizontal = !target.attr("data-horizontal") ? '' : "horizontal ";
      var addonInput = target.data("addon-input");
      var dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : '';
      //여기 다시
      var addonFunction = !addonInput ? '' : 'onChange="addonCheck(\'checkbox\', \''+dataAddOn+'\', \''+id+'\')"';
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? " mobile" : " pc";
      if(addonInput){
        label ='';
      }else{
        label = !target.attr('data-checkbox-label') ? target.attr("data-checkbox-value") : target.attr("data-checkbox-label");
      }
      var checkboxWrap = '';
      if(detailText){
        checkboxWrap =
          '<span>'  +
          '  <input '+wrapId+wrapClass+name+value+defaultOption+disabled+addonFunction+' type="checkbox" />'  +
          '  <span class="arrow"></span>'  +
          '</span>'  +
          '<div>'  +
          '  <span>'+label+'</span>'  +
          '  <p>'+detailText+'</p>'  +
          '</div>';
      }else {
        checkboxWrap =
          '<span>'  +
          '  <input '+wrapId+wrapClass+name+defaultOption+value+disabled+addonFunction+' type="checkbox" />'  +
          '  <span class="arrow"></span>'  +
          '</span>'  +
          '<span>'+label+'</span>';
      }
      if(addonInput){
        var addonInputBox = '';
        $.each(addonInput, function(index, item){
          var itemClass = !item.class ? '' : 'class="'+item.class+'" ';
          var placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'" ';
          var itemTheme = !item.theme ? theme : item.theme;
          addonInputBox =
            '<div class="text-input-'+itemTheme+'" >'  +
            '  <input id="'+dataAddOn+'" '+itemClass+name+placeholder+' type="text" disabled/>'  +
            '</div>';
        });
        target.replaceWith('<div class="addon"><label class="checkbox-'+theme+' '+horizontal+detaileClass+disabled+isMobile+'">'+checkboxWrap+'</label>'+addonInputBox+'</div>');
      }else{
        target.replaceWith('<div><label class="checkbox-'+theme+' '+detaileClass+horizontal+disabled+isMobile+'">'+checkboxWrap+'</label></div>');
      }
    },
    group:function(target, size){
      var options = target.data('options');
      var theme = target.attr('data-checkbox-theme');
      var name = !target.attr('data-checkbox-name') ? '' : 'name="'+target.attr("data-checkbox-name")+'" ';
      var disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled ';
      var wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'" ';
      var wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'" ';
      var horizontal = !target.attr('data-horizontal') ? '' : 'horizontal ';
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? " mobile" : " pc";
      var groupCheckbox = '';
      $.each(options, function(index, item){
        var value = !item.value ? 'value="'+item.label+'" ' : 'value="'+item.value+'" ';
        var label = !item.label ? item.value : item.label;
        var itemId = !item.id ? '' : 'id="'+item.id+'" ';
        var itemClass = !item.class ? '' : 'class="'+item.class+'" ';
        var itemDefault = !item.default ? '' : 'checked="checked" '
        var itemDetaile = item.detail;
        var itemDetaileClass = item.detail ? 'detail-text ' : '';
        var itemDisabled = !item.disabled ? '' : 'disabled'
        var itemAddon = !item.addonId ? '' : item.addonId;
        var checkboxWrap = '';
        if(itemAddon){
          var placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'" ';
          checkboxWrap =
            '<div class="addon">'  +
            '  <label class="checkbox-'+theme+' '+horizontal+disabled+itemDisabled+isMobile+'">'  +
            '    <span>'  +
            '      <input '+itemId+itemClass+value+name+disabled+itemDisabled+itemDefault+' type="checkbox" onChange="addonCheck(\'checkbox\', \''+item.addonId+'\', \''+item.id+'\')" />'  +
            '      <span class="arrow"></span>'  +
            '    </span>'  +
            '    <span></span>'  +
            '  </label>'  +
            '  <div class="text-input-'+theme+'">'  +
            '    <input id="'+item.addonId+'" '+itemClass+name+placeholder+'type="text" disabled/>'  +
            '  </div>'  +
            '</div>';
          groupCheckbox += checkboxWrap;
        }else{
          if(itemDetaile){
            checkboxWrap =
              '<div>' +
              '<label class="checkbox-'+theme+' '+horizontal+itemDetaileClass+disabled+itemDisabled+isMobile+' ">' +
              '  <span>'  +
              '    <input '+itemId+itemClass+value+disabled+name+itemDisabled+itemDefault+' type="checkbox" />' +
              '    <span class="arrow"></span>' +
              '  </span>' +
              '  <div>' +
              '    <span>'+label+'</span>'  +
              '    <p>'+itemDetaile+'</p>'  +
              '  </div>'  +
              '</label>' +
              '</div>';
          }else {
            checkboxWrap =
              '<div>' +
              '<label class="checkbox-'+theme+' '+horizontal+disabled+itemDisabled+isMobile+'">'  +
              '  <span>'  +
              '    <input '+itemId+itemClass+value+name+disabled+itemDisabled+itemDefault+' type="checkbox" />'  +
              '    <span class="arrow"></span>'  +
              '  </span>'  +
              '  <span>'+label+'</span>'  +
              '</label>' +
              '</div>';
          }
          groupCheckbox += checkboxWrap;
        }
      });
    
      target.replaceWith('<div '+wrapId+wrapClass+'>'+groupCheckbox+'</div>');
    },
    chip:function(target, size){
      var theme = target.attr('data-checkbox-theme');
      var name = target.attr('data-checkbox-name') ? 'name="'+target.attr('data-checkbox-name')+'"' : '';
      var disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled';
      var wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'"';
      var wrapClass = !target.attr("class") ? '' : 'class="'+target.attr("class")+'"';
      var defaultOption = !target.attr('data-checkbox-default') ? '' : 'checked="checked"';
      var value = !target.attr('data-checkbox-value') ? '' : 'value="'+target.attr('data-checkbox-value')+'"';
      var label = !target.attr('data-checkbox-label') ? target.attr('data-checkbox-value') : target.attr('data-checkbox-label');
      var vertical = target.attr("data-vertical") ? 'vertical' : ''
      var checkboxWrap =
        '<label class="chip-choice-'+theme+' '+disabled+' '+vertical+'">' +
        '  <input '+wrapId+' '+wrapClass+' '+name+' '+disabled+' '+defaultOption+' '+value+' type="checkbox" />' +
        '  <span>'+label+'</span>' +
        '</label>';
      target.replaceWith(checkboxWrap);
    },
    tree:function(target, size){
      var options = target.data('options');
      var theme = target.attr('data-checkbox-theme');
      var wrapId = !target.attr("id") ? '' : 'id="'+target.attr("id")+' "';
      var disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled';
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? " mobile" : " pc";
      var treeList = '';
      $.each(options, function(index, item){
        var depth = item.depth;
        var value = !item.value ? 'value="'+item.label+'" ' : 'value="'+item.value+'" ';
        var label = !item.label ? item.value : item.label;
        var itemId = !item.id ? '' : 'id="'+item.id+'" ';
        var itemClass = !item.class ? '' : 'class="'+item.class+'" ';
        var itemDefault = !item.default ? '' : 'checked="checked" '
        var itemDisabled = !item.disabled ? '' : 'disabled';
        var itemName = !item.name ? '' : 'name="'+item.name+'"';
        var treeName = !item.tree ? null : 'data-tree="'+item.tree+'"'
        var childList = '';
        var titleList = '';
        if(depth === 1){
          titleList =
            '<li>'  +
            '  <label class="checkbox-'+theme+' '+itemDisabled+disabled+isMobile+'">'  +
            '    <span>'  +
            '      <input '+itemId+value+itemClass+itemName+itemDefault+disabled+itemDisabled+' type="checkbox" data-tree-type="'+item.tree+'-parent" onChange="treeCheck(\''+item.tree+'\', \'parent\')" />' +
            '      <span class="arrow"></span>' +
            '    </span>' +
            '    <span>'+label+'</span>'  +
            '  </label>'  +
            '</li>';
        }else{
          childList =
            '<li class="child-list">' +
            '  <label class="checkbox-'+theme+' '+itemDisabled+disabled+isMobile+'">' +
            '    <span>' +
            '      <input '+itemId+value+itemClass+itemName+treeName+itemDefault+disabled+itemDisabled+' type="checkbox" data-tree-type="'+item.tree+'-child" onChange="treeCheck(\''+item.tree+'\', \'child\')" />' +
            '      <span class="arrow"></span>' +
            '    </span>' +
            '    <span>'+label+'</span>' +
            '  </label>' +
            '</li>';
            '';
        }
        treeList += titleList;
        treeList += childList;
      });
      target.replaceWith('<div '+wrapId+' class="tree-checkbox"><ul>'+treeList+'</ul></div>');
    },
    getSize:function(size){
      if(size === 's'){
        return 'input-small'
      }else if(size === 'l'){
        return 'input-large'
      }else if(size === 'xl'){
        return 'input-xlarge'
      }else{
        return
      }
    },
  }
})( jQuery, window, document );

function treeCheck(name, type){
  var length = $('input:checkbox[data-tree="'+name+'"]').length;
  var checkLength = $('input:checkbox[data-tree="'+name+'"]:checked').length;
  var parentTarget = $('input[data-tree-type="'+name+'-parent"]');
  var childTarget = $('input[data-tree-type="'+name+'-child"]');
  if(type === 'parent'){
    if(length > checkLength){
      parentTarget.next().removeClass('minus-icon');
      parentTarget.next().addClass('arrow');
      parentTarget.prop('checked', true);
      childTarget.each(function(){
        $(this).prop('checked', true);
      });
    }else{
      if(childTarget.length > 0){
        parentTarget.next().removeClass('minus-icon');
        parentTarget.next().addClass('arrow');
        parentTarget.prop('checked', false);
        childTarget.each(function(){
          $(this).prop('checked', false);
        });
      }
    }
  }else{
    if(length > checkLength){
      if(checkLength == 0){
        parentTarget.prop('checked', false);
        parentTarget.next().removeClass('minus-icon');
        parentTarget.next().addClass('arrow');
      }else{
        parentTarget.next().removeClass('arrow');
        parentTarget.next().addClass('minus-icon');
        parentTarget.prop('checked', true);
      }
    }else{
      parentTarget.next().removeClass('minus-icon');
      parentTarget.next().addClass('arrow');
    }
  }
}

function addonCheck(type, name, id, scale){
  if(type === 'checkbox'){
    var check = $('#'+id+'').is(":checked");
    var textInput= $('#'+name+'');
    if(check === false){
      textInput.attr('disabled', true);
    }else{
      textInput.attr('disabled', false);
    }
  }else{  // radio
    var textInput= $('input:text[name="'+name+'"]');
    var check = $('#'+id+'').is(":checked");
    if(check === false){
      textInput.attr('disabled', true);
    }else{
      textInput.attr('disabled', false);
    }
  }
}