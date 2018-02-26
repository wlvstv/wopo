$(document).ready(() => {
  // click the command create button
  $("#btnCreateCommand").on("click", () => {
    // build object to add
    var newCommand = {
      command:
        "!" +
        $("#newCommand")
          .val()
          .toString()
          .trim(),
      isMod: $("#isMod").is(":checked"),
      response: $("#newResponse")
        .val()
        .toString()
        .trim(),
      creator: "wopo",
      channel: "wolvesatmydoor"
    };
    console.log(`The new command contains: ${JSON.stringify(newCommand)}`);

    // build post URL
    var newURL = "wopo/api/commands/new";

    // make ajax request
    $.ajax({
      type: "POST",
      url: newURL,
      data: newCommand,
      success: () => {
        location.reload();
        console.log(
          `The command ${newCommand.command} was created succesfully!`
        );
      }
    });
  });
});
