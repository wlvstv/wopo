// // active li select
$('li.command').on('click', function() {
    // add 'active' class to the clicked li    
    if($('.active')[0]) {
       $('li.active').toggleClass('active')
       $(this).toggleClass('active')
    }
    var filler = $('li.active').text()
    $('#command').val(filler)
});

