;(function ( $, window, document, undefined ) {
  $.uiInput = {
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
      const value = target.val();
      let iconPosition = target.attr('data-icon-position');
      iconPosition = $.uiInput.getIconPosition(iconPosition);
      console.log(icon);
      target.wrap(`<div class='label-input-${theme} ${iconPosition}'></div>`)
      target.after(`<label for='${forName}'>${labelText}</label>`);
      target.bind('foucs',function(){
        target.parent().addClass('label-effect');
      });
      if(icon != undefined && iconPosition){
        target.after(icon);
      }
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