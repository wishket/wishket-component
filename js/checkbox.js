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
        }else{
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
      const wrapId = target.attr('id') == undefined || target.attr('id') == false ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined || target.attr('class') == false ? '' : `class='${target.attr('class')}'`;
      const defaultOption = target.attr('data-checkbox-default') == undefined || target.attr('data-checkbox-default') == false ? '' : 'checked="checked"';
      const value = target.attr('data-checkbox-value') == undefined ? `value = '${target.attr('data-checkbox-label')}'` : `value = '${target.attr('data-checkbox-value')}'`;
      const label = target.attr('data-checkbox-label') == undefined ? `${target.attr('data-checkbox-value')}` : `${target.attr('data-checkbox-label')}`;
      const addonInput = target.data('addon-input');
      console.log('a');
      console.log(addonInput);
      let checkboxWrap = '';
      if(detailText){
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${wrapId} ${wrapClass} ${name} type='checkbox' ${value} ${defaultOption} ${value} ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<div>`;
        checkboxWrap += `  <span>${label}</span>`;
        checkboxWrap += `  <p>${detailText}</p>`;
        checkboxWrap += `</div>`;
      }else {
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${wrapId} ${wrapClass} ${name} type='checkbox' ${defaultOption} ${value} ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<span>${label}</span>`;
      }
      console.log('A point');
      console.log($(this));
      target.replaceWith(`<label class='checkbox-${theme} ${detaileClass} ${disabled}'>${checkboxWrap}</label>`);
      console.log('C point');
      console.log($(this));
{/* <div class="text-input-wishket undefined"><input id="hoho" data-input-type="text-input" class="value01" data-input-theme="wishket" type="text" placeholder="플레이스 홀더"></div> */}

      if(addonInput){
        let addonInputBox = ``;
        $.each(addonInput, function(index, item){
          const itemId = item.id == undefined ? '' : `id='${item.id}'`;
          const itemClass = item.class == undefined ? '' : `class=${item.class}`;
          const placeholder = item.placeholder == undefined ? '' : `placeholder='${item.placeholder}'`;
          const position = item.position == undefined ? '' : item.position;
          const itemTheme = item.theme == undefined ? theme : item.theme;
          const inputType = item.type == undefined ? 'text' : item.inputType;
  
          addonInputBox += `<div class='text-input-${itemTheme}'>`;
          addonInputBox += ` <input ${itemId} ${itemClass} type='${inputType}' ${placeholder} />`;
          addonInputBox += `</div>`;
        });
        console.log(addonInputBox);
        console.log('B point');
        console.log($(this));

        target.after(addonInputBox)  
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
        let checkboxWrap = '';
        if(itemDetaile){
          checkboxWrap = ``;
          checkboxWrap += `<label class='checkbox-${theme} ${itemDetaileClass} ${disabled} ${itemDisabled}'>`;
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
          checkboxWrap += `<label class='checkbox-${theme} ${disabled} ${itemDisabled}'>`;
          checkboxWrap += ` <span>`;
          checkboxWrap += `   <input ${itemId} ${itemClass} ${value} ${name} type='checkbox' ${disabled} ${itemDisabled} ${itemDefault}/>`;
          checkboxWrap += `   <span class='arrow'></span>`;
          checkboxWrap += ` </span>`;
          checkboxWrap += ` <span>${label}</span>`;
          checkboxWrap += `</label>`;
        }
        groupCheckbox += checkboxWrap;
      });
      target.replaceWith(`<div ${wrapId} ${wrapClass}>${groupCheckbox}</div>`);
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
        let childList = '';
        let titleList = '';
        console.log('check');
        console.log(itemName);
        if(depth === 1){
          titleList += `<div>`;
          titleList += `  <label class='checkbox-${theme} ${itemDisabled} ${disabled}'>`;
          titleList += `    <span>`;
          titleList += `      <input ${itemId} ${value} ${itemClass} type='checkbox' data-tree-type='${item.name}-parent' ${itemDefault} ${disabled} ${itemDisabled} onChange="treeCheck('${item.name}', 'parent')" />`;
          titleList += `      <span class='arrow'></span>`;
          titleList += `    </span>`;
          titleList += `    <span>${label}</span>`;
          titleList += `  </label>`;
          titleList += `</div>`;
        }else{
          childList += `<li>`;
          childList += `  <label class='checkbox-${theme} ${itemDisabled} ${disabled}'>`;
          childList += `    <span>`;
          childList += `      <input ${itemId} ${value} ${itemClass} ${itemName} type='checkbox' data-tree-type='${item.name}-child' ${itemDefault} ${disabled} ${itemDisabled} onChange="treeCheck('${item.name}', 'child')" />`;
          childList += `      <span class='arrow'></span>`;
          childList += `    </span>`;
          childList += `    <span>${label}</span>`;
          childList += `  </label>`;
          childList += `</li>`;
        }
        treeList += `${titleList}`;
        treeList += `<ul class='child-list'>${childList}</ul>`
      });
      target.replaceWith(`<div ${wrapId} class='tree-checkbox'>${treeList}</div>`);
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
  const length = $(`input:checkbox[name="${name}"]`).length;
  const checkLength = $(`input:checkbox[name="${name}"]:checked`).length;
  const parentTarget = $(`input[data-tree-type="${name}-parent"]`);
  const childTarget = $(`input[data-tree-type="${name}-child"]`);
  // const childTarget = $(`input:checkbox[name="${name}"]`);
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

(function($){
  $.fn.getCheckVal = function(type){
    let value;
    if(type === 'group'){
      $.each($(this), function(index, item){
        const check = $(this).prop('checked') ? true : false;
      });
    }else{
    }
    return value;
  },
  $.fn.checkInput = function(){
    const theme = $(this).attr('data-checkbox-theme');
    let box;
    box += '<input data-input-theme="wishket" type="text" placeholder="플레이스 홀더"  />';
    $(this).after(box);
    $(this).click(function() {
      const check = $(this).is(":checked");
      if(check === true){
        box ='';
        box += ``;
        box += ``;
        box += ``;
        box += ``;
      }else{
        box ='';
        box += '<input data-input-theme="wishket" type="text" placeholder="플레이스 홀더" disabled/>';
      }
    });
  }

  
})(jQuery);