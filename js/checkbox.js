;(function ( $, window, document, undefined ) {
  $.uiCheckbox = {
    //인풋 셋팅 type label-input, text-input
    setting:function(){
      const target = $('[data-checkbox-type]');
      target.each(function(){
        const type   = $(this).attr('data-checkbox-type');
        let size = target.attr('data-checkobx-size');
        size = $.uiInput.getSize(size);
        if(type === 'group'){
          $.uiCheckbox.group($(this), size);
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
      const name = target.attr('data-checkbox-name') ? `name='${target.attr('data-checkbox-name')}` : '';
      let disabled = target.attr('data-checkbox-disabled') == undefined || false ? '' : 'disabled';
      let id = target.attr('id') ? `id='${target.attr('id')}'` : '';
      let checkboxWrap = '';
      if(detailText){
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${id} ${name} type='checkbox' ${disabled}/>`;
        checkboxWrap += ` <span></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<div>`;
        checkboxWrap += `  <span>${options}</span>`;
        checkboxWrap += `  <p>${detailText}</p>`;
        checkboxWrap += `</div>`;
      }else {
        checkboxWrap = ``;
        checkboxWrap += `<span>`;
        checkboxWrap += ` <input ${id} type='checkbox' ${disabled}/>`;
        checkboxWrap += ` <span></span>`;
        checkboxWrap += `</span>`;
        checkboxWrap += `<span>${options}</span>`;
      }
      target.replaceWith(`<label class='checkbox-${theme} ${detaileClass} ${disabled}'>${checkboxWrap}</label>`);
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-checkbox-theme');
      const name = target.attr('data-checkbox-name') ? `name='${target.attr('data-checkbox-name')}` : '';
      let disabled = target.attr('data-checkbox-disabled') == undefined || false ? '' : 'disabled';

      const detailText = target.attr('data-checkbox-detaile');
      const detaileClass = detailText ? 'detail-text' : '';

      let groupCheckbox = '';
      $.each(options, function(index, item){
        let value = item.value ? `value = '${item.value}'` : '';
        let checkboxWrap = '';
        if(detailText){
          checkboxWrap = ``;
          checkboxWrap += `<label class='checkbox-${theme} ${detaileClass} ${disabled}'>`;
          checkboxWrap += ` <span>`;
          checkboxWrap += `   <input ${item.id} ${name} ${value} type='checkbox' ${disabled}/>`;
          checkboxWrap += `   <span></span>`;
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
          checkboxWrap += `   <input ${item.id} ${value} type='checkbox' ${disabled}/>`;
          checkboxWrap += `   <span></span>`;
          checkboxWrap += ` </span>`;
          checkboxWrap += ` <span>${item.label}</span>`;
          checkboxWrap += `</label>`;
        }
        groupCheckbox += checkboxWrap;
      });
      target.replaceWith(`<div class='checkbox-group'>${groupCheckbox}</div>`);
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
