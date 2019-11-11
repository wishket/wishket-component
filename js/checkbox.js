;(function ( $, window, document, undefined ) {
  $.uiCheckbox = {
    setting:function(){
      const target = $('[data-checkbox-type]');
      target.each(function(){
        const type   = $(this).attr('data-checkbox-type');
        let size = target.attr('data-checkobx-size');
        size = $.uiInput.getSize(size);
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
      const theme = target.attr("data-checkbox-theme");
      const detailText = target.attr("data-checkbox-detaile");
      const detaileClass = !detailText ? '' : 'detail-text';
      const name = target.attr("data-checkbox-name") ? 'name="'+target.attr("data-checkbox-name")+'" ' : '';
      const disabled = !target.attr("data-checkbox-disabled") ? '' : 'disabled ';
      const id = target.attr("id");
      const wrapId = !target.attr("id") ? '' : 'id="'+target.attr("id")+'" ';
      const wrapClass = !target.attr("class") ? '' : 'class="'+target.attr("class")+'" ';
      const defaultOption = !target.attr("data-checkbox-default") ? '' : 'checked="checked" ';
      const value = !target.attr("data-checkbox-value") ? 'value="'+target.attr("data-checkbox-label")+'" ' : 'value="'+target.attr("data-checkbox-value")+'" ';
      const label = !target.attr('data-checkbox-label') ? target.attr("data-checkbox-value") : target.attr("data-checkbox-label");
      const horizontal = !target.attr("data-horizontal") ? '' : "horizontal ";
      const addonInput = target.data("addon-input");
      const dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : '';
      //여기 다시
      const addonFunction = !addonInput ? '' : `onChange="addonCheck('checkbox', '${dataAddOn}', '${id}')"`;
      let checkboxWrap = '';
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
        let addonInputBox = ``;
        $.each(addonInput, function(index, item){
          const itemClass = !item.class ? '' : 'class="'+item.class+'" ';
          const placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'" ';
          const itemTheme = !item.theme ? theme : item.theme;
          addonInputBox =
            '<div class="text-input-'+itemTheme+'" >'  +
            '  <input id="'+dataAddOn+'" '+itemClass+name+placeholder+' type="text" disabled/>'  +
            '</div>';
        });
        target.replaceWith('<div class="addon"><label class="checkbox-'+theme+' '+horizontal+detaileClass+disabled+'">'+checkboxWrap+'</label>'+addonInputBox+'</div>');
      }else{
        target.replaceWith('<label class="checkbox-'+theme+' '+detaileClass+horizontal+disabled+'">'+checkboxWrap+'</label>')
      }
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const name = !target.attr('data-checkbox-name') ? '' : 'name="'+target.attr("data-checkbox-name")+'" ';
      const disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled ';
      const wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'" ';
      const wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'" ';
      const horizontal = !target.attr('data-horizontal') ? '' : 'horizontal ';

      let groupCheckbox = '';
      $.each(options, function(index, item){
        const value = !item.value ? 'value="'+item.label+'" ' : 'value="'+item.value+'" ';
        const label = !item.label ? item.value : item.label;
        const itemId = !item.id ? '' : 'id="'+item.id+'" ';
        const itemClass = !item.class ? '' : 'class="'+item.class+'" ';
        const itemDefault = !item.default ? '' : 'checked="checked" '
        const itemDetaile = item.detail;
        const itemDetaileClass = item.detail ? 'detail-text ' : '';
        const itemDisabled = !item.disabled ? '' : 'disabled'
        const itemAddon = !item.addonId ? '' : item.addonId;
        let checkboxWrap = '';
        if(itemAddon){
          const placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'" ';
          checkboxWrap =
            '<div class="addon">'  +
            '  <label class="checkbox-'+theme+' '+horizontal+disabled+itemDisabled+'">'  +
            '    <span>'  +
            '      <input '+itemId+itemClass+value+name+disabled+itemDisabled+itemDefault+' type="checkbox" onChange="addonCheck(\'checkbox\', \''+item.addonId+'\', \''+item.id+'\')" />'  +
            '      <span class="arrow"></span>'  +
            '    </span>'  +
            '    <span>'+label+'</span>'  +
            '  </label>'  +
            '  <div class="text-input-'+theme+'">'  +
            '    <input id="'+item.addonId+'" '+itemClass+name+placeholder+'type="text" disabled/>'  +
            '  </div>'  +
            '</div>';
          groupCheckbox += checkboxWrap;
        }else{
          if(itemDetaile){
            checkboxWrap =
              '<label class="checkbox-'+theme+' '+horizontal+itemDetaileClass+disabled+itemDisabled+' ">' +
              '  <span>'  +
              '    <input '+itemId+itemClass+value+disabled+name+itemDisabled+itemDefault+' type="checkbox" />' +
              '    <span class="arrow"></span>' +
              '  </span>' +
              '  <div>' +
              '    <span>'+label+'</span>'  +
              '    <p>'+itemDetaile+'</p>'  +
              '  </div>'  +
              '</label>';
          }else {
            checkboxWrap =
              '<label class="checkbox-'+theme+' '+horizontal+disabled+itemDisabled+'">'  +
              '  <span>'  +
              '    <input '+itemId+itemClass+value+name+disabled+itemDisabled+itemDefault+' type="checkbox" />'  +
              '    <span class="arrow"></span>'  +
              '  </span>'  +
              '  <span>'+label+'</span>'  +
              '</label>';
          }
          groupCheckbox += checkboxWrap;
        }
      });
    
      target.replaceWith('<div '+wrapId+wrapClass+'>'+groupCheckbox+'</div>');
    },
    chip:function(target, size){
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name') ? 'name="'+target.attr('data-checkbox-name')+'"' : '';
      const disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled';
      const wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'"';
      const wrapClass = !target.attr("class") ? '' : 'class="'+target.attr("class")+'"';
      const defaultOption = !target.attr('data-checkbox-default') ? '' : 'checked="checked"';
      const value = !target.attr('data-checkbox-value') ? '' : 'value="'+target.attr('data-checkbox-value')+'"';
      const label = !target.attr('data-checkbox-label') ? target.attr('data-checkbox-value') : target.attr('data-checkbox-label');
      const vertical = target.attr("data-vertical") ? 'vertical' : ''
      const checkboxWrap =
        '<label class="chip-choice-'+theme+' '+disabled+' '+vertical+'">' +
        '  <input '+wrapId+' '+wrapClass+' '+name+' '+disabled+' '+defaultOption+' '+value+' type="checkbox" />' +
        '  <span>'+label+'</span>' +
        '</label>';
      target.replaceWith(checkboxWrap);
    },
    tree:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const wrapId = target.attr('id') == undefined || false ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined ? '' : `class='${target.attr('class')}'`;
      const disabled = target.attr('data-checkbox-disabled') == undefined || target.attr('data-checkbox-disabled') == false ? '' : 'disabled';
      let treeList = '';
      $.each(options, function(index, item){
        const depth = item.depth;
        const value = !item.value ? 'value="'+item.label+'" ' : 'value="'+item.value+'" ';
        const label = !item.label ? item.value : item.label;
        const itemId = !item.id ? '' : 'id="'+item.id+'" ';
        const itemClass = !item.class ? '' : 'class="'+item.class+'" ';
        const itemDefault = !item.default ? '' : 'checked="checked" '
        const itemDisabled = !item.disabled ? '' : 'disabled';
        const itemName = !item.name ? '' : 'name="'+item.name+'"';
        const treeName = !item.tree ? null : 'data-tree="'+item.tree+'"'
        let childList = '';
        let titleList = '';
        if(depth === 1){
          titleList =
            '<li>'  +
            '  <label class="checkbox-'+theme+' '+itemDisabled+disabled+'">'  +
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
            '  <label class="checkbox-'+theme+' '+itemDisabled+disabled+'">' +
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
  const length = $(`input:checkbox[data-tree="${name}"]`).length;
  const checkLength = $(`input:checkbox[data-tree="${name}"]:checked`).length;
  const parentTarget = $(`input[data-tree-type="${name}-parent"]`);
  const childTarget = $(`input[data-tree-type="${name}-child"]`);
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
    const check = $('#'+id+'').is(":checked");
    const textInput= $('#'+name+'');
    if(check === false){
      textInput.attr('disabled', true);
    }else{
      textInput.attr('disabled', false);
    }
  }else{  // radio
    const textInput= $(`input:text[name="${name}"]`);
    const check = $('#'+id+'').is(":checked");
    if(check === false){
      textInput.attr('disabled', true);
    }else{
      textInput.attr('disabled', false);
    }
  }
}