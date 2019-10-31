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
      // const labelText = target.attr('data-checkbox-label') == undefined || target.attr('data-checkbox-label') == false ? 'data-checkbox-title속성 추가 필요' : target.attr('data-checkbox-title');
      const theme = target.attr('data-checkbox-theme');
      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText == undefined || detailText == false ? '' : 'detail-text';
      const name = target.attr('data-checkbox-name') ? `name='${target.attr('data-checkbox-name')}'` : '';
      const disabled = target.attr('data-checkbox-disabled') == undefined || target.attr('data-checkbox-disabled') == false ? '' : 'disabled';
      const idTag = target.attr('id') == undefined || target.attr('id') == false ? '' : `id='${target.attr('id')}'`;
      const classTag = target.attr('class') == undefined || target.attr('class') == false ? '' : `class='${target.attr('class')}'`;
      const defaultOption = target.attr('data-checkbox-default') == undefined || target.attr('data-checkbox-default') == false ? '' : 'checked="checked"';
      const value = target.attr('data-checkbox-value') == undefined ? `value = '${target.attr('data-checkbox-label')}'` : `value = '${target.attr('data-checkbox-value')}'`;
      const label = target.attr('data-checkbox-label') == undefined ? `${target.attr('data-checkbox-value')}` : `${target.attr('data-checkbox-label')}`;
      // const functionData = targrt.data('function-data');
      // if(functionData == undefined || false){
      //   console.log('undefined 여야지 제발');
      // }else{
      //   console.log('값이 있음');
      //   target.bind('click',function(e){
      //     const functionTarget = eval(functionData)
      //     if (typeof functionTarget == 'function') {
      //       functionTarget();
      //     }
      //   });
      // }
      let checkboxWrap = '';
      if(detailText){
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${idTag} ${classTag} ${name} type='checkbox' ${value} ${defaultOption} ${value} ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<div>`;
        checkboxWrap += `  <span>${label}</span>`;
        checkboxWrap += `  <p>${detailText}</p>`;
        checkboxWrap += `</div>`;
      }else {
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${idTag} ${classTag} ${name} type='checkbox' ${defaultOption} ${value} ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<span>${label}</span>`;
      }
      target.replaceWith(`<label class='checkbox-${theme} ${detaileClass} ${disabled}'>${checkboxWrap}</label>`);
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
      const name = target.attr('data-checkbox-name');
      const nameTag = name == undefined || false ? '' : `name='${name}'`;
      const wrapId = target.attr('id') == undefined || false ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined ? '' : `class='${target.attr('class')}'`;
      const disabled = target.attr('data-checkbox-disabled') == undefined || target.attr('data-checkbox-disabled') == false ? '' : 'disabled';
      let childList = '';
      let titleList = '';
      $.each(options, function(index, item){
        const depth = item.depth;
        const value = item.value == undefined ? `value = '${item.label}'` : `value = '${item.value}'`;
        const itemId = item.id == undefined ? '' : `id='${item.id}'`;

        const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
        const itemDefault = item.default == undefined || item.default == false ? '' : 'checked="checked"'
        const itemDetaile = item.detail;
        const itemDetaileClass = item.detail ? 'detail-text' : '';
        const itemDisabled = item.disabled == undefined || item.disabled == false ? '' : 'disabled';

        if(depth === 1){
          titleList += `<label class='checkbox-${theme} ${disabled}'>`;
          titleList += `  <span>`;
          titleList += `    <input ${value} type='checkbox' data-tree-type='${name}-parent' ${disabled} onChange="treeCheck('${name}', 'parent')" />`;
          titleList += `    <span class='arrow'></span>`;
          titleList += `  </span>`;
          titleList += `  <span>${item.label}</span>`;
          titleList += `</label>`;
        }else{
          childList += `<li>`;
          childList += `  <label class='checkbox-${theme} ${disabled}'>`;
          childList += `    <span>`;
          childList += `      <input ${value} ${nameTag} type='checkbox' data-tree-type='${name}-child' ${disabled} onChange="treeCheck('${name}', 'child')" />`;
          childList += `      <span class='arrow'></span>`;
          childList += `    </span>`;
          childList += `    <span>${item.label}</span>`;
          childList += `  </label>`;
          childList += `</li>`;
        }
      });
      target.replaceWith(`<div ${wrapId} class='tree-checkbox'>${titleList}<ul class='child-list'>${childList}</ul></div>`);
      // $(`input[${nameTag}]`).bind('click',function(){
      //   $(`input[${nameTag}]`).each(function(index, item){
      //     const cheeck = $(this).is(':checked');
      //   });
      // });
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
  const childTarget = $(`input:checkbox[name="${name}"]`);
  if(type === 'parent'){
    if(length > checkLength){
      parentTarget.next().removeClass('minus-icon');
      parentTarget.next().addClass('arrow');
      parentTarget.prop('checked', true);
      childTarget.each(function(){
        $(this).prop('checked', true);
      });
    }else{
      parentTarget.next().removeClass('minus-icon');
      parentTarget.next().addClass('arrow');
      parentTarget.prop('checked', false);
      childTarget.each(function(){
        $(this).prop('checked', false);
      });
    }
  }else{
    if(length > checkLength){
      parentTarget.next().removeClass('arrow');
      parentTarget.next().addClass('minus-icon');
      parentTarget.prop('checked', true);
    }else{
      parentTarget.next().removeClass('minus-icon');
      parentTarget.next().addClass('arrow');
    }
  }
  // if(treeType == `${name}-parent`){
  //   console.log('bdddafdasdf');
  // }else{
  //   console.log('ttt');
  // }
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