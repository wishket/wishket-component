;(function ( $, window, document, undefined ) {
  $.uiRadio = {
    setting:function(){
      const target = $('[data-radio-type]');
      target.each(function(){
        const type   = $(this).attr('data-radio-type');
        let size = target.attr('data-radio-size');
        size = $.uiInput.getSize(size);
        if(type === 'group'){
          $.uiRadio.group($(this), size);
        }else{
          $.uiRadio.single($(this), size);
        }
      });
    },
    single:function(target, size){
      const theme = target.attr('data-theme');
      const detailText = target.attr('data-radio-detaile');
      const detaileClass = detailText == undefined || detailText == false ? '' : 'detail-text';
      const name = target.attr('data-radio-name') ? `name='${target.attr('data-radio-name')}'` : '';
      const disabled = target.attr('data-radio-disabled') == undefined || target.attr('data-radio-disabled') == false ? '' : 'disabled';
      const wrapId = target.attr('id') == undefined || target.attr('id') == false ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined || target.attr('class') == false ? '' : `class='${target.attr('class')}'`;
      const defaultOption = target.attr('data-radio-default') == undefined || target.attr('data-radio-default') == false ? '' : 'checked="checked"';
      const value = target.attr('data-radio-value') == undefined ? `value = '${target.attr('data-radio-label')}'` : `value = '${target.attr('data-radio-value')}'`;
      const label = target.attr('data-radio-label') == undefined ? `${target.attr('data-radio-value')}` : `${target.attr('data-radio-label')}`;
      const horizontal = target.attr('data-horizontal') == undefined || target.attr('data-horizontal') == false ? '' : 'horizontal';
      const addonInput = target.data('addon-input');
      const addonFunction = addonInput ? `onChange="addonCheck(${name})"` : '';
      let radioWrap = '';
      if(detailText){
        radioWrap = ``;
        radioWrap += `<span>`;
        radioWrap += ` <input ${wrapId} ${wrapClass} ${name} type='radio' ${value} ${defaultOption} ${value} ${disabled} ${addonFunction}/>`;
        radioWrap += ` <span></span>`;
        radioWrap += `</span>`;
        radioWrap += `<div>`;
        radioWrap += `  <span>${label}</span>`;
        radioWrap += `  <p>${detailText}</p>`;
        radioWrap += `</div>`;
      }else {
        radioWrap = ``;
        radioWrap += `<span>`;
        radioWrap += ` <input ${wrapId} ${wrapClass} ${name} type='radio' ${defaultOption} ${value} ${disabled} ${addonFunction}/>`;
        radioWrap += ` <span></span>`;
        radioWrap += `</span>`;
        radioWrap += `<span>${label}</span>`;
      }
      if(addonInput){
        let addonInputBox = ``;
        $.each(addonInput, function(index, item){
          const itemId = item.id == undefined ? '' : `id='${item.id}'`;
          const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
          const placeholder = item.placeholder == undefined ? '' : `placeholder='${item.placeholder}'`;
          const itemTheme = item.theme == undefined ? theme : item.theme;
          const inputType = item.type == undefined ? 'text' : item.inputType;
          addonInputBox += `<div class='text-input-${itemTheme}'>`;
          addonInputBox += ` <input ${itemId} ${itemClass} ${name} type='text' ${placeholder} disabled/>`;
          addonInputBox += `</div>`;
        });
        target.replaceWith(`<div class='addon'><label class='radio-${theme} ${detaileClass} ${disabled}'>${radioWrap}</label> ${addonInputBox}</div>`);
      }else{
        target.replaceWith(`<label class='radio-${theme} ${horizontal} ${detaileClass} ${disabled}'>${radioWrap}</label>`);
      }
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-theme');
      const name = target.attr('data-radio-name') == undefined ? '' : `name='${target.attr('data-radio-name')}'`;
      const disabled = target.attr('data-radio-disabled') == undefined || target.attr('data-radio-disabled') == false ? '' : 'disabled';
      const detailText = target.attr('data-radio-detaile');
      const detaileClass = detailText ? 'detail-text' : '';
      const wrapId = target.attr('id') == undefined ? '' : `id='${target.attr('id')}'`;
      const wrapClass = target.attr('class') == undefined ? '' : `class='${target.attr('class')}'`;
      const dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : '';
      const horizontal = target.attr('data-horizontal') == undefined || target.attr('data-horizontal') == false ? '' : 'horizontal';
      console.log('bbb');
      console.log(dataAddOn);
      let groupradio = '';
      $.each(options, function(index, item){
        const value = item.value == undefined ? `value = '${item.label}'` : `value = '${item.value}'`;
        const label = item.label == undefined ? item.value : item.label;
        const itemId = item.id == undefined ? '' : `id='${item.id}'`;
        const itemClass = item.class == undefined ? '' : `class='${item.class}'`;
        const itemDefault = item.default == undefined || item.default == false ? '' : 'checked="checked"';
        const itemDetaile = item.detail;
        const itemDetaileClass = item.detail ? 'detail-text' : '';
        const itemDisabled = item.disabled == undefined || item.disabled == false ? '' : 'disabled';
        let radioWrap = '';
        //애드온 타입
        if(item.addonType){
          const addonId = item.addonId == undefined ? '' : `id='${item.addonId}'`;
          const addonClass = item.addonClass == undefined ? '' : `id='${item.addonClass}'`;
          const placeholder = item.placeholder == undefined ? '' : `placeholder='${item.placeholder}'`;
          radioWrap = ``;
          radioWrap += `<div class='${horizontal}'>`;
          radioWrap += `<div class='addon'>`;
          radioWrap += `  <label class='radio-${theme} ${disabled} ${itemDisabled}'>`;
          radioWrap += `    <span>`;
          radioWrap += `      <input id='${dataAddOn}' ${itemClass} ${value} ${name} type='radio' ${disabled} ${itemDisabled} ${itemDefault} onChange="addonCheck('radio', ${name}, ${dataAddOn})" />`;
          radioWrap += `    <span class='arrow'></span>`;
          radioWrap += `    </span>`;
          radioWrap += `      <span>${label}</span>`;
          radioWrap += `  </label>`;
          radioWrap += `  <div class='text-input-${theme}'>`;
          radioWrap += `    <input ${addonId} ${addonClass} ${name} type='text' ${placeholder} disabled/>`;
          radioWrap += `  </div>`;
          radioWrap += `</div>`;
          radioWrap += `</div>`;
          groupradio += radioWrap;
        }else{
          if(itemDetaile){
            radioWrap = ``;
            radioWrap += `<label class='radio-${theme} ${horizontal} ${itemDetaileClass} ${disabled} ${itemDisabled}'>`;
            radioWrap += ` <span>`;
            radioWrap += `   <input ${itemId} ${itemClass} ${value} ${name} type='radio' ${disabled} ${itemDisabled} ${itemDefault} onChange="addonCheck('radio', ${name}, ${dataAddOn})" />`;
            radioWrap += `   <span class='arrow'></span>`;
            radioWrap += ` </span>`;
            radioWrap += ` <div>`;
            radioWrap += `   <span>${label}</span>`;
            radioWrap += `    <p>${itemDetaile}</p>`;
            radioWrap += ` </div>`;
            radioWrap += `</label>`;
          }else {
            radioWrap = ``;
            radioWrap += `<label class='radio-${theme} ${horizontal} ${disabled} ${itemDisabled}'>`;
            radioWrap += ` <span>`;
            radioWrap += `   <input ${itemId} ${itemClass} ${value} ${name} type='radio' ${disabled} ${itemDisabled} ${itemDefault} onChange="addonCheck('radio', ${name}, ${dataAddOn})" />`;
            radioWrap += `   <span class='arrow'></span>`;
            radioWrap += ` </span>`;
            radioWrap += ` <span>${label}</span>`;
            radioWrap += `</label>`;
          }
          groupradio += radioWrap;
        }
      });
      target.replaceWith(`<div ${wrapId} ${wrapClass}>${groupradio}</div>`);
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
