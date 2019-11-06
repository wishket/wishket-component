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
      const theme = target.attr('data-checkbox-theme');
      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText == undefined || detailText == false ? '' : 'detail-text';
      const name = target.attr('data-checkbox-name') ? `name='${target.attr('data-checkbox-name')}'` : '';
      const disabled = target.attr('data-checkbox-disabled') == undefined || target.attr('data-checkbox-disabled') == false ? '' : 'disabled';
      const id = target.attr('id');
      const wrapId = target.attr('id') == undefined || target.attr('id') == false ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined || target.attr('class') == false ? '' : `class='${target.attr('class')}'`;
      const defaultOption = target.attr('data-checkbox-default') == undefined || target.attr('data-checkbox-default') == false ? '' : 'checked="checked"';
      const value = target.attr('data-checkbox-value') == undefined ? `value = '${target.attr('data-checkbox-label')}'` : `value = '${target.attr('data-checkbox-value')}'`;
      const label = target.attr('data-checkbox-label') == undefined ? `${target.attr('data-checkbox-value')}` : `${target.attr('data-checkbox-label')}`;
      const horizontal = target.attr('data-horizontal') == undefined || target.attr('data-horizontal') == false ? '' : 'horizontal';
      const addonInput = target.data('addon-input');
      const dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : '';
      const addonFunction = !addonInput ? '' : `onChange="addonCheck('checkbox', '${dataAddOn}', '${id}')"`;
      let checkboxWrap = '';
      if(detailText){
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${wrapId} ${wrapClass} ${name} type='checkbox' ${value} ${defaultOption} ${value} ${disabled} ${addonFunction}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<div>`;
        checkboxWrap += `  <span>${label}</span>`;
        checkboxWrap += `  <p>${detailText}</p>`;
        checkboxWrap += `</div>`;
      }else {
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${wrapId} ${wrapClass} ${name} type='checkbox' ${defaultOption} ${value} ${disabled} ${addonFunction}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<span>${label}</span>`;
      }
      if(addonInput){
        let addonInputBox = ``;
        $.each(addonInput, function(index, item){
          const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
          const placeholder = item.placeholder == undefined ? '' : `placeholder='${item.placeholder}'`;
          const itemTheme = item.theme == undefined ? theme : item.theme;
          addonInputBox += `<div class='text-input-${itemTheme}'>`;
          addonInputBox += ` <input id=${dataAddOn} ${itemClass} ${name} type='text' ${placeholder} disabled/>`;
          addonInputBox += `</div>`;
        });
        target.replaceWith(`<div class='addon'><label class='checkbox-${theme} ${horizontal} ${detaileClass} ${disabled}'>${checkboxWrap}</label> ${addonInputBox}</div>`);
      }else{
        target.replaceWith(`<label class='checkbox-${theme} ${detaileClass} ${horizontal} ${disabled}'>${checkboxWrap}</label>`);
      }
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name') == undefined ? '' : `name='${target.attr('data-checkbox-name')}'`;
      const disabled = target.attr('data-checkbox-disabled') == undefined || target.attr('data-checkbox-disabled') == false ? '' : 'disabled';
      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText ? 'detail-text' : '';
      const wrapId = target.attr('id') == undefined ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined ? '' : `class='${target.attr('class')}'`;
      const horizontal = target.attr('data-horizontal') == undefined || target.attr('data-horizontal') == false ? '' : 'horizontal';
      let groupCheckbox = '';
      $.each(options, function(index, item){
        const value = item.value == undefined ? `value = '${item.label}'` : `value = '${item.value}'`;
        const label = item.label == undefined ? item.value : item.label;
        const itemId = item.id == undefined ? '' : `id='${item.id}'`;
        const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
        const itemDefault = item.default == undefined || item.default == false ? '' : 'checked="checked"'
        const itemDetaile = item.detail;
        const itemDetaileClass = item.detail ? 'detail-text' : '';
        const itemDisabled = item.disabled == undefined || item.disabled == false ? '' : 'disabled'
        const itemAddon = !item.addonId ? '' : item.addonId;
        let checkboxWrap = '';
        if(itemAddon){
          const placeholder = item.placeholder == undefined ? '' : `placeholder='${item.placeholder}'`;
          checkboxWrap = '';
          checkboxWrap += '<div class="addon">';
          checkboxWrap += ' <label class="checkbox-'+theme+' '+horizontal+disabled+itemDisabled+'">';
          checkboxWrap += '   <span>';
          checkboxWrap += `     <input ${itemId} ${itemClass} ${value} ${name} ${disabled} ${itemDisabled} ${itemDefault} type="checkbox" onChange="addonCheck('checkbox', '${item.addonId}', '${item.id}')" />`;
          checkboxWrap += '     <span class="arrow"></span>';
          checkboxWrap += '   </span>';
          checkboxWrap += '   <span>'+label+'</span>';
          checkboxWrap += ' </label>';
          checkboxWrap += ' <div class="text-input-'+theme+'">';
          checkboxWrap += '   <input id="'+item.addonId+'" '+itemClass+name+placeholder+'type="text" disabled/>';
          checkboxWrap += ' </div>';
          checkboxWrap += '</div>';
          groupCheckbox += checkboxWrap;
        }else{
          if(itemDetaile){
            checkboxWrap = ``;
            checkboxWrap += `<label class='checkbox-${theme} ${horizontal} ${itemDetaileClass} ${disabled} ${itemDisabled}'>`;
            checkboxWrap += ` <span>`;
            checkboxWrap += `   <input ${itemId} ${itemClass} ${value} ${name} type='checkbox' ${disabled} ${itemDisabled} ${itemDefault}/>`;
            checkboxWrap += `   <span class='arrow'></span>`;
            checkboxWrap += ` </span>`;
            checkboxWrap += ` <div>`;
            checkboxWrap += `   <span>${label}</span>`;
            checkboxWrap += `    <p>${itemDetaile}</p>`;
            checkboxWrap += ` </div>`;
            checkboxWrap += `</label>`;
          }else {
            checkboxWrap = ``;
            checkboxWrap += `<label class='checkbox-${theme} ${horizontal} ${disabled} ${itemDisabled}'>`;
            checkboxWrap += ` <span>`;
            checkboxWrap += `   <input ${itemId} ${itemClass} ${value} ${name} type='checkbox' ${disabled} ${itemDisabled} ${itemDefault}/>`;
            checkboxWrap += `   <span class='arrow'></span>`;
            checkboxWrap += ` </span>`;
            checkboxWrap += ` <span>${label}</span>`;
            checkboxWrap += `</label>`;
          }
          groupCheckbox += checkboxWrap;
        }
      });
      target.replaceWith(`<div ${wrapId} ${wrapClass}>${groupCheckbox}</div>`);
    },
    chip:function(target, size){
      console.log('ttt');
      console.log(target.attr('data-checkbox-value'));
      console.log(target.attr('data-checkbox-label'));
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name') ? 'name="'+target.attr('data-checkbox-name')+'"' : '';
      const disabled = !target.attr('data-checkbox-disabled') ? '' : 'disabled';
      const id = target.attr('id');
      const wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'"';
      const wrapClass = !target.attr("class") ? '' : 'class="'+target.attr("class")+'"';
      const defaultOption = !target.attr('data-checkbox-default') ? '' : 'checked="checked"';
      const value = !target.attr('data-checkbox-value') ? '' : 'value="'+target.attr('data-checkbox-value')+'"';
      const label = !target.attr('data-checkbox-label') ? target.attr('data-checkbox-value') : target.attr('data-checkbox-label');
      const checkboxWrap =
        '<label class="chip-choice-'+theme+' '+disabled+'">' +
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
        const value = item.value == undefined ? `value = '${item.label}'` : `value = '${item.value}'`;
        const label = item.label == undefined ? item.value : item.label;
        const itemId = item.id == undefined ? '' : `id='${item.id}'`;
        const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
        const itemDefault = item.default == undefined || item.default == false ? '' : 'checked="checked"'
        const itemDisabled = item.disabled == undefined || item.disabled == false ? '' : 'disabled';
        const itemName = item.name == undefined ? '' : `name='${item.name}'`;
        const treeName = !item.tree ? null : 'data-tree="'+item.tree+'"'
        let childList = '';
        let titleList = '';
        if(depth === 1){
          titleList += `<li>`;
          titleList += `  <label class='checkbox-${theme} ${itemDisabled} ${disabled}'>`;
          titleList += `    <span>`;
          titleList += `      <input ${itemId} ${value} ${itemClass} ${itemName} type='checkbox' data-tree-type='${item.tree}-parent' ${itemDefault} ${disabled} ${itemDisabled} onChange="treeCheck('${item.tree}', 'parent')" />`;
          titleList += `      <span class='arrow'></span>`;
          titleList += `    </span>`;
          titleList += `    <span>${label}</span>`;
          titleList += `  </label>`;
          titleList += `</li>`;
        }else{
          childList += `<li class='child-list'>`;
          childList += `  <label class='checkbox-${theme} ${itemDisabled} ${disabled}'>`;
          childList += `    <span>`;
          childList += `      <input ${itemId} ${value} ${itemClass} ${itemName} ${treeName} type='checkbox' data-tree-type='${item.tree}-child' ${itemDefault} ${disabled} ${itemDisabled} onChange="treeCheck('${item.tree}', 'child')" />`;
          childList += `      <span class='arrow'></span>`;
          childList += `    </span>`;
          childList += `    <span>${label}</span>`;
          childList += `  </label>`;
          childList += `</li>`;
        }
        treeList += `${titleList}`;
        treeList += `${childList}`;
      });
      target.replaceWith(`<div ${wrapId} class='tree-checkbox'><ul>${treeList}</ul></div>`);
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
    const targetId = id.getAttribute('id');
    const check = $('#'+targetId+'').is(":checked");
    if(check === false){
      textInput.attr('disabled', true);
    }else{
      textInput.attr('disabled', false);
    }
  }
}