// // active li select
$(document).ready(function() {
  $("li.command").on("click", function() {
    // add 'active' class to the clicked li
    if ($(".active")[0]) {
      $("li.active").toggleClass("active");
      $(this).toggleClass("active");
    }

    getUrl =
      "wopo/api/commands/update/" +
      $(this)
        .text()
        .trim();

    // console.log(getUrl);

    $.ajax({
      type: "GET",
      url: getUrl,
      dataType: "json",
      success: function(data) {
        $("#command").val(data.command);
        $("#response").val(data.response);
      }
    });
  });
});
