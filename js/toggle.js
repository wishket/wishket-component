;(function ( $, window, document, undefined ) {
  $.uiToggle = {
    setting:function(){
      const target = $('[data-toggle-type]');
      target.each(function(){
        let size = target.attr('data-toggle-size');
        size = $.uiToggle.getSize(size);
        $.uiToggle.toggle($(this), size);
      });
    },
    toggle:function(target, size){
      const theme = target.attr('data-theme');
      const role = target.attr('role');
      const toggleText = target.attr('data-toggle-text');
      const id = !target.attr('id') ? '' : 'for="'+target.attr('id')+'"';
      if(!role){target.attr('role', 'switch')};
      let toggleWrap = '';
      if(target.attr('aria-checked') === 'true'){
        toggleWrap += ' <span>off</span>';
        toggleWrap += ' <span class="active">on</span>';
      }else{
        toggleWrap += ' <span class="active">off</span>';
        toggleWrap += ' <span>on</span>';
      }

      target.prepend(toggleWrap);
      target.wrap('<div class="toggle-'+theme+'"></div>');
      target.before('<label '+id+'>'+toggleText+'</label>');
      target.bind('click', function(){
        const check = $(this).attr('aria-checked');
        if(check === 'true'){
          $(this).children(":first").addClass('active');
          $(this).children(":last").removeClass('active');
          $(this).attr('aria-checked', false);
        }else{
          $(this).children(":first").removeClass('active');
          $(this).children(":last").addClass('active');
          $(this).attr('aria-checked', true);
        }
      });
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

(function($){
  $.fn.getToggleChk = function(type){
    const value = $(this).attr('aria-checked') === 'true' ? true : false;
    return value;
  }
})(jQuery);