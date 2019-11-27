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
      const detaileClass = !detailText ? '' : 'detail-text';
      const name = target.attr('data-radio-name') ? 'name="'+target.attr("data-radio-name")+'"' : '';
      const disabled = !target.attr('data-radio-disabled') ? '' : 'disabled';
      const wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'" ';
      const wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'"';
      const defaultOption = !target.attr('data-radio-default') ? '' : 'checked="checked"';
      const value = !target.attr('data-radio-value') ? 'value="'+target.attr("data-radio-label")+'"' : 'value="'+target.attr("data-radio-value")+'"';
      const label = !target.attr('data-radio-label') ? target.attr("data-radio-value") : target.attr("data-radio-label");
      const horizontal = !target.attr('data-horizontal') ? '' : 'horizontal';
      const addonInput = target.data('addon-input');
      const addonFunction = addonInput ? 'onChange="addonCheck('+name+')"' : '';
      let radioWrap = '';
      if(detailText){
        radioWrap =
          '<span>'  +
          '  <input '+wrapId+wrapClass+name+value+defaultOption+value+disabled+addonFunction+' type="radio"'  +
          '  <span><span class="dot"></span></span>'  +
          '</span>'  +
          '<div>'  +
          '  <span>'+label+'</span>'  +
          '  <p>'+detailText+'</p>'  +
          '</div>';
      }else {
        radioWrap =
          '<span>'  +
          '  <input '+wrapId+wrapClass+name+defaultOption+value+disabled+addonFunction+' type="radio" />' +
          '  <span><span class="dot"></span></span>'  +
          '</span>'  +
          '<span>'+label+'</span>';
      }
      if(addonInput){
        let addonInputBox = '';
        $.each(addonInput, function(index, item){
          const itemId = !item.id ? '' : 'id="'+item.id+'"';
          const itemClass = !item.class ? '' : 'class="'+item.class+'" ';
          const placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'"';
          const itemTheme = !item.theme ? theme : item.theme;
          const inputType = !item.type ? 'text' : item.inputType;
          addonInputBox =
            '<div class="text-input-'+itemTheme+'">'
            '  <input '+itemId+itemClass+name+placeholder+' type="text" disabled/>'
            '</div>'
        });
        target.replaceWith('<div class="addon clearfix"><label class="radio-'+theme+' '+detaileClass+disabled+'">'+radioWrap+'</label> '+addonInputBox+'</div>')
      }else{
        target.replaceWith('<label class="clearfix radio-'+theme+' '+horizontal+' '+detaileClass+' '+disabled+'">'+radioWrap+'</label>');
      }
    },
    group:function(target, size){
      const options = target.data('options');
      const theme = target.attr('data-theme');
      const name = !target.attr('data-radio-name') ? undefined : target.attr("data-radio-name");
      const nameTag = !name ? '' : 'name="'+name+'"';
      const disabled = !target.attr('data-radio-disabled') ? '' : 'disabled';
      const detailText = target.attr('data-radio-detaile');
      const detaileClass = detailText ? 'detail-text' : '';
      const wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'"';
      const wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'"';
      const dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : false;
      const horizontal = !target.attr('data-horizontal') ? '' : 'horizontal';
      const dataAddonEvent = !dataAddOn ? '' : 'onChange="addonCheck(\'radio\',\''+name+'\',\''+dataAddOn+'\')"';
      
      let groupradio = '';
      $.each(options, function(index, item){
        const value = !item.value ? 'value="'+item.label+'"' : 'value="'+item.value+'"';
        const label = !item.label ? item.value : item.label;
        const itemId = !item.id ? '' : 'id="'+item.id+'"';
        const itemClass = !item.class? '' : 'class="'+item.class+'"';
        const itemDefault = !item.default ? '' : 'checked="checked"';
        const itemDetaile = item.detail;
        const itemDetaileClass = item.detail ? 'detail-text' : '';
        const itemDisabled = !item.disabled ? '' : 'disabled';
        let radioWrap = '';
        if(item.addonType){
          const addonId = !item.addonId ? '' : 'id="'+item.addonId+'"';
          const addonClass = !item.addonClass ? '' : 'id="'+item.addonClass+'"';
          const placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'"';
          radioWrap =
            '<div class="'+horizontal+'">'  +
            ' <div class="addon">'  +
            '   <label class="radio-'+theme+' '+disabled+' '+itemDisabled+'">'  +
            '     <span>' +
            '       <input id="'+dataAddOn+'" '+itemClass+' '+value+' '+nameTag+' '+disabled+' '+itemDisabled+' '+itemDefault+' onChange="addonCheck(\'radio\',\''+name+'\',\''+dataAddOn+'\')" type="radio" />'  +
            '       <span><span class="dot"></span></span>' +
            '     </span>'  +
            '     <span style="display:none;"></span>' +
            '   </label>' +
            '   <div class="text-input-'+theme+'">' +
            '     <input '+addonId+' '+addonClass+' '+nameTag+' '+placeholder+' disabled type="text" />'  +
            '   </div>' +
            ' </div>' +
            '</div>';
          groupradio += radioWrap;
        }else{
          if(itemDetaile){
            radioWrap =
              '<div>' +
              '<label class="radio-'+theme+' '+horizontal+' '+itemDetaileClass+' '+disabled+' '+itemDisabled+'">' +
              ' <span>' +
              '   <input '+itemId+' '+itemClass+' '+value+' '+nameTag+' '+disabled+' '+itemDisabled+' '+itemDefault+' '+dataAddonEvent+' type="radio" />' +
              '   <span><span class="dot"></span></span>' +
              ' </span>'  +
              ' <div>'  +
              '   <span>'+label+'</span>' +
              '   <p>'+itemDetaile+'</p>' +
              ' </div>' +
              '</label>' +
              '</div>';
          }else {
            radioWrap =
              '<div>' +
              ' <label class="radio-'+theme+' '+horizontal+' '+disabled+' '+itemDisabled+'">'  +
              '   <span>' +
              '     <input '+itemId+' '+itemClass+' '+value+' '+nameTag+' '+disabled+' '+itemDisabled+' '+itemDefault+' '+itemDetaileClass+' '+dataAddonEvent+' type="radio" />'  +
              '     <span><span class="dot"></span></span>' +
              '   </span>'  +
              '   <span>'+label+'</span>' +
              ' </label>' +
              '</div>';
          }
          groupradio += radioWrap;
        }
      });
      target.replaceWith('<div '+wrapId+' class="clearfix '+wrapClass+'">'+groupradio+'</div>')
    },
    getSize:function(size){
      if(size === 's'){
        return 'input-small'
      }else if(size === 'l'){
        return 'input-large'
      }else if(size === 'xl'){
        return 'input-xlarge'
      }else{
        return '';
      }
    },
  }
})( jQuery, window, document );
