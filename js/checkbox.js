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
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText ? 'detail-text' : '';
      const name = target.attr('data-checkbox-name') ? `name='${target.attr('data-checkbox-name')}'` : '';
      const disabled = target.attr('data-checkbox-disabled') == undefined || false ? '' : 'disabled';
      const id = target.attr('id') == undefined || false ? '' : `id='${target.attr('id')}'`;
      let checkboxWrap = '';
      if(detailText){
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${id} ${name} type='checkbox' ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<div>`;
        checkboxWrap += `  <span>${options}</span>`;
        checkboxWrap += `  <p>${detailText}</p>`;
        checkboxWrap += `</div>`;
      }else {
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${id} ${name} type='checkbox' ${disabled}/>`;
        checkboxWrap += ` <span class="arrow"></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<span>${options}</span>`;
      }
      target.replaceWith(`<label class='checkbox-${theme} ${detaileClass} ${disabled}'>${checkboxWrap}</label>`);
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name') == undefined || false ? '' : `name='${target.attr('data-checkbox-name')}'`;
      const disabled = target.attr('data-checkbox-disabled') == undefined || false ? '' : 'disabled';
      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText ? 'detail-text' : '';
      const wrapId = target.attr('id') == undefined || false ? '' : `id='${target.attr('id')}'`;
      let groupCheckbox = '';
      $.each(options, function(index, item){
        const value = item.value ? `value = '${item.value}'` : '';
        const itemId = item.id == undefined || false ? '' : `id='${item.id}'`;
        let checkboxWrap = '';
        if(detailText){
          checkboxWrap = ``;
          checkboxWrap += `<label class='checkbox-${theme} ${detaileClass} ${disabled}'>`;
          checkboxWrap += ` <span>`;
          checkboxWrap += `   <input ${itemId} ${value} ${name} type='checkbox' ${disabled} />`;
          checkboxWrap += `   <span class='arrow'></span>`;
          checkboxWrap += ` </span>`;
          checkboxWrap += ` <div>`;
          checkboxWrap += `   <span>${item.label}</span>`;
          checkboxWrap += `    <p>${detailText}</p>`;
          checkboxWrap += ` </div>`;
          checkboxWrap += `</label>`;
        }else {
          checkboxWrap = ``;
          checkboxWrap += `<label class='checkbox-${theme} ${detaileClass} ${disabled}'>`;
          checkboxWrap += ` <span>`;
          checkboxWrap += `   <input ${itemId} ${value} ${name} type='checkbox' ${disabled}/>`;
          checkboxWrap += `   <span class='arrow'></span>`;
          checkboxWrap += ` </span>`;
          checkboxWrap += ` <span>${item.label}</span>`;
          checkboxWrap += `</label>`;
        }
        groupCheckbox += checkboxWrap;
      });
      target.replaceWith(`<div ${wrapId} class='checkbox-group'>${groupCheckbox}</div>`);
    },
    tree:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name');
      const nameTag = name == undefined || false ? '' : `name='${name}'`;
      const disabled = target.attr('data-checkbox-disabled') == undefined || false ? '' : 'disabled';
      const wrapId = target.attr('id') == undefined || false ? '' : `id='${target.attr('id')}'`;
      let childList = '';
      let titleList = '';
      $.each(options, function(index, item){
        const depth = item.depth;
        const value = item.value ? `value = '${item.value}'` : '';
        const itemId = item.id == undefined || false ? '' : `id='${item.id}'`;
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
        return false
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
    console.log(theme);
    let box;
    box += '<input data-input-theme="wishket" type="text" placeholder="플레이스 홀더"  />';
    $(this).after(box);
    $(this).click(function() {
      const check = $(this).is(":checked");
      console.log(check);
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