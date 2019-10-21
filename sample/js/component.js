$(document).ready(function () {
  $('.select-card, .select-card-wide').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $input = $($(this).children('input')[0]),
        $this = $(this),
        is_radio = $this.children('input[type="radio"]').length > 0;
    if (is_radio) {
      $this.parent().find('input[type="radio"]').prop('checked', false);
      $this.parent().find('.select-card').removeClass('checked');
      $this.parent().find('.select-card-wide').removeClass('checked');
    }
    if ($this.hasClass('checked')) {
      $this.removeClass('checked');
      $input.prop('checked', false);
    } else {
      $this.addClass('checked');
      $input.prop('checked', true);
    }
    $input.change();
  });
});