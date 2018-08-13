$(document).ready(function() {
    // create the loading window and set autoOpen to false
    $("#loadingScreen").dialog({
        autoOpen: false,    // set this to false so we can manually open it
        dialogClass: "loadingScreenWindow",
        closeOnEscape: false,
        draggable: false,
        width: 460,
        minHeight: 50,
        modal: true,
        buttons: {},
        resizable: false,
        open: function() {
            // scrollbar fix for IE
            $('body').css('overflow','hidden');
        },
        close: function() {
            // reset overflow
            $('body').css('overflow','auto');
        }
    }); // end of dialog
});
function waitingDialog(waiting) { // I choose to allow my loading screen dialog to be customizable, you don't have to
   
	$("#loadingScreen").html('wait till loading data');
    $("#loadingScreen").dialog('option', 'title', "Loading data" );
    $("#loadingScreen").dialog("open");

}
function closeWaitingDialog() {
    $("#loadingScreen").dialog('close');
}