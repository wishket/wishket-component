;(function ( $, window, document, undefined ) {
  "use strict";
  $.uiInput = {
    //인풋 셋팅 type label-input, text-input
    setting:function(){
      var target = $("input[data-input-type]");
      target.each(function(){
        var type   = $(this).attr('data-input-type');
        var size = target.attr('data-input-size');
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
      var helperText = target.attr('data-input-helper');
      var theme = target.attr('data-input-theme');
      var maxlength = target.attr('maxlength');
      target.wrap('<div class="text-input-'+theme+' '+size+'"></div>');
      target.after('<span class="word-length">0/'+maxlength+'</span>');
      target.after('<span class="helper-text">'+helperText+'</span>');
      target.on('change keydown keyup',function(){
        var count = target.val().length;
        target.siblings(".word-length").html(''+count+'/'+maxlength+'');
      });
      target.siblings(".helper-text").width(target.width() - (target.siblings(".word-length").width()*2));
    },
    labelInput:function(target, size){
      var labelText = target.attr('data-input-label');
      var theme = target.attr('data-input-theme');
      var forName = target.attr('id');
      var icon = target.attr('data-input-icon');
      var iconPosition = target.attr('data-icon-position');
      if(icon && iconPosition){
        iconPosition = $.uiInput.getIconPosition(iconPosition);
      }
      target.wrap('<div class="label-input-'+theme+' '+iconPosition+'"></div>');
      target.after('<label for="'+forName+'">'+labelText+'</label>');
      target.bind('focus',function(){
        target.parent().addClass('label-effect');
      });
      target.bind('blur', function(){
        var value = target.val();
        if(!value){
          target.parent().removeClass('label-effect');
        }
      });
      if(icon && iconPosition){
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
        return ''
      }
    },
    getIconPosition:function(position){
      if(position === 'right'){
        return 'icon-right'
      }else if(position === 'left'){
        return 'icon-left'
      }else{
        return ''
      }
    }
  }
})( jQuery, window, document );

(function($){
  $.fn.getValueChk = function(type){
    var value = $(this).val() ? true : false;
    return value;
  }
})(jQuery);