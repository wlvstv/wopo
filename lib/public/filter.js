// filter ul based on search term
$(document).ready(function() {
    $('#listFilter').keyup(function() {
        var val = $(this).val().toLowerCase();
        var valSearch = '!' + val;
        $('.commandList > li').each(function() {
            if($(this).text().toLowerCase().indexOf(valSearch) > -1) {
                $(this).removeClass('displayNone')
            } else {
                $(this).addClass('displayNone')
            }
        })
    });
})

