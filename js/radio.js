;(function ( $, window, document, undefined ) {
  "use strict";
  $.uiRadio = {
    setting:function(){
      var target = $('[data-radio-type]');
      target.each(function(){
        var type   = $(this).attr('data-radio-type');
        var size = target.attr('data-radio-size');
        size = $.uiInput.getSize(size);
        if(type === 'group'){
          $.uiRadio.group($(this), size);
        }else{
          $.uiRadio.single($(this), size);
        }
      });
    },
    single:function(target, size){
      var theme = target.attr('data-theme');
      var detailText = target.attr('data-radio-detaile');
      var detaileClass = !detailText ? '' : 'detail-text';
      var name = target.attr('data-radio-name') ? 'name="'+target.attr("data-radio-name")+'"' : '';
      var disabled = !target.attr('data-radio-disabled') ? '' : 'disabled';
      var wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'" ';
      var wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'"';
      var defaultOption = !target.attr('data-radio-default') ? '' : 'checked="checked"';
      var value = !target.attr('data-radio-value') ? 'value="'+target.attr("data-radio-label")+'"' : 'value="'+target.attr("data-radio-value")+'"';
      var label = !target.attr('data-radio-label') ? target.attr("data-radio-value") : target.attr("data-radio-label");
      var horizontal = !target.attr('data-horizontal') ? '' : 'horizontal';
      var addonInput = target.data('addon-input');
      var addonFunction = addonInput ? 'onChange="addonCheck('+name+')"' : '';
      var radioWrap = '';
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
        var addonInputBox = '';
        $.each(addonInput, function(index, item){
          var itemId = !item.id ? '' : 'id="'+item.id+'"';
          var itemClass = !item.class ? '' : 'class="'+item.class+'" ';
          var placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'"';
          var itemTheme = !item.theme ? theme : item.theme;
          var inputType = !item.type ? 'text' : item.inputType;
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
      var options = target.data('options');
      var theme = target.attr('data-theme');
      var name = !target.attr('data-radio-name') ? undefined : target.attr("data-radio-name");
      var nameTag = !name ? '' : 'name="'+name+'"';
      var disabled = !target.attr('data-radio-disabled') ? '' : 'disabled';
      var detailText = target.attr('data-radio-detaile');
      var detaileClass = detailText ? 'detail-text' : '';
      var wrapId = !target.attr('id') ? '' : 'id="'+target.attr("id")+'"';
      var wrapClass = !target.attr('class') ? '' : 'class="'+target.attr("class")+'"';
      var dataAddOn = target.attr('data-addon-id') ? target.attr('data-addon-id') : false;
      var horizontal = !target.attr('data-horizontal') ? '' : 'horizontal';
      var dataAddonEvent = !dataAddOn ? '' : 'onChange="addonCheck(\'radio\',\''+name+'\',\''+dataAddOn+'\')"';
      
      var groupradio = '';
      $.each(options, function(index, item){
        var value = !item.value ? 'value="'+item.label+'"' : 'value="'+item.value+'"';
        var label = !item.label ? item.value : item.label;
        var itemId = !item.id ? '' : 'id="'+item.id+'"';
        var itemClass = !item.class? '' : 'class="'+item.class+'"';
        var itemDefault = !item.default ? '' : 'checked="checked"';
        var itemDetaile = item.detail;
        var itemDetaileClass = item.detail ? 'detail-text' : '';
        var itemDisabled = !item.disabled ? '' : 'disabled';
        var radioWrap = '';
        if(item.addonType){
          var addonId = !item.addonId ? '' : 'id="'+item.addonId+'"';
          var addonClass = !item.addonClass ? '' : 'id="'+item.addonClass+'"';
          var placeholder = !item.placeholder ? '' : 'placeholder="'+item.placeholder+'"';
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
