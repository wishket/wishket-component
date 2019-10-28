;(function ( $, window, document, undefined ) {
  $.uiInput = {
    //인풋 셋팅 type label-input, text-input
    setting:function(){
      const target = $('[data-input-type]');
      target.each(function(){
        const type   = $(this).attr('data-input-type');
        let size = target.attr('data-input-size');
        size = $.uiInput.getSize(size);
        if(type === 'text-input'){
          $.uiInput.textInput($(this), size);
        }else if(type === 'label-input'){
          $.uiInput.labelInput($(this), size);
        }else{
          $.uiInput.textInput($(this), size);
        }
      });
    },
    textInput:function(target, size){
      const helperText = target.attr('data-input-helper');
      const theme = target.attr('data-input-theme');
      const maxlength = target.attr('maxlength');
      target.wrap(`<div class='text-input-${theme} ${size}'></div>`);
      target.after(`<span class='helper-text'>${helperText}</span>`);
      target.after(`<span class='word-length'>0/${maxlength}</span>`);
      target.bind('change keydown keyup',function(){
        const count = target.val().length;
        target.next().html(`${count}/${maxlength}`);
     });
    },
    labelInput:function(target, size){
      const labelText = target.attr('data-input-label');
      const theme = target.attr('data-input-theme');
      const forName = target.attr('id');
      const icon = target.attr('data-input-icon');
      let iconPosition = target.attr('data-icon-position');
      if(icon && iconPosition != undefined){
        iconPosition = $.uiInput.getIconPosition(iconPosition);
      }
      target.wrap(`<div class='label-input-${theme} ${iconPosition}'></div>`)
      target.after(`<label for='${forName}'>${labelText}</label>`);
      target.bind('focus',function(){
        target.parent().addClass('label-effect');
      });
      target.bind('blur', function(){
        const value = target.val();
        if(!value){
          target.parent().removeClass('label-effect');
        }
      });
      if(icon != undefined && iconPosition){
        target.after(icon);
      }
    },
    //input size
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
    getIconPosition:function(position){
      if(position === 'right'){
        return 'icon-right'
      }else if(position === 'left'){
        return 'icon-left'
      }else{
        return false
      }
    }
  }
})( jQuery, window, document );

(function($){
  $.fn.getValueChk = function(type){
    const value = $(this).val() ? true : false;
    return value;
  }
})(jQuery);