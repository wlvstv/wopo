$(document).ready(() => {
  //#region update click
  $('#btnUpdate').on('click', () => {
    // get command to update
    var command = $('li.command.active')
      .text()
      .trim();

    // build update URL
    var updateURL = '/wopo/api/commands/update/' + command;

    // build updated Comamnd Object
    var updatedCommand = {
      newCommand: $('#command')
        .val()
        .toString()
        .trim(),
      newResponse: $('#response')
        .val()
        .toString()
        .trim()
    };

    // Log info in console
    console.log('=========================================');
    console.log(`Command: ${command}`);
    console.log(`API Update Route: ${updateURL}`);
    console.log(
      `the updated command contains: ${JSON.stringify(updatedCommand)}`
    );
    console.log('=========================================');

    // Make update request
    $.ajax({
      type: 'POST',
      url: updateURL,
      data: updatedCommand,
      success: () => {
        location.reload();
        console.log(`Command ${command} was updated succesfully`);
      }
    });
  });
  //#endregion

  //#region delete click
  $('#btnDelete').on('click', () => {
    // command to be deleted
    var command = $('li.command.active')
      .text()
      .trim();
    console.log(`The command to be deleted: ${command}`);

    // Build delete URL
    var deleteURL = '/wopo/api/delete/' + command;
    console.log(`the delete url is  ${deleteURL}`);

    // Make delete request
    $.ajax({
      type: 'DELETE',
      url: deleteURL,
      success: () => {
        location.reload();
        console.log(`the command ${command} was deleted succesfully!`);
      },
      fail: () => {
        location.reload();
      }
    });
  });
  //#endregion
});
