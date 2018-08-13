 emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	  


window.onload=function(){
	 
	
	 $('#starttime').datetimepicker({
	        //language:  'fr',
	        format:"dd.mm.yyyy hh:ii",
	        
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
	        showMeridian: 1
	        
	    });
	 $('#endtime').datetimepicker({
	        //language:  'fr',
	        format:"dd.mm.yyyy hh:ii",
	        
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
	        showMeridian: 1
	        
	    });
	// $("#starttime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
	// $("#endtime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
	  $("#search").button().click(function()
			  { 
		
		   $("#loadingScreen").dialog('close');
		  allFields.removeClass( "ui-state-error" );
		  tips = $( ".validateTips1" );
var srcmail= $("#inptmail").val();
if( !checkRegexp($("#inptmail") , emailRegex, "enter valid mailid ui@jquery.com" ))
{

}else { loadrecords(srcmail);}


		    });

			  		 

		 
	 
email = $( "#email" );
starttime=$("#starttime");
endtime=$("#endtime");
searchbox=$("#inptmail");
allFields = $( [] ).add(email).add(starttime).add(endtime).add(searchbox);

tips = $( ".validateTips" );
function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
    setTimeout(function() {
      tips.removeClass( "ui-state-highlight");
      tips
      .text("");
    }, 2000 );
  }
function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of " + n + " must be between " +
        min + " and " + max + "." );
      return false;
    } else {
      return true;
    }
  }
function checkRequired(o,n)
{
	 if ( o.val().length<=0)
		 {
		 o.addClass( "ui-state-error" );
		 updateTips(n+" is required" );
		 return false;
		 }
	 return true;
}
function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
      o.addClass( "ui-state-error" );
      updateTips( n );
      return false;
    } else {
      return true;
    }
  }

  function RecordTime()
  {

allFields.removeClass( "ui-state-error" );
	  var valid = true;
	

	  valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
	  valid = valid && checkRequired(starttime ,"startTime" );
	  valid = valid && checkRequired(endtime ,"endTime" );
	console.log(  email.val(), starttime.val(),  endtime.val());
	  if ( valid ) {

		  saverecord(email.val(), starttime.val(),  endtime.val());

		  }
	  else
		  {
		  alert("error");
		  }
	  return valid;
 }
  
  dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "RecordTime": RecordTime,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
  
  form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      RecordTime();
    });
  $( "#create-user" ).button().on( "click", function() {
	  tips = $( ".validateTips" );
      dialog.dialog( "open" );
    });
}
function notify(issuccess,message)
 { $("#notify").text(message);
	 if(issuccess)
		 {
		
		 $("#notify").addClass("successmessage");
		 }
	 else
		 $("#notify").addClass("errormessage"); 
	 setTimeout(function() {
	      $("#notify").removeClass( "successmessage");
	      $("#notify").removeClass( "errormessage");
	    }, 2000 );
 }

 function saverecord(email,start,end)
 {
	 xhradd=new XMLHttpRequest();
	 xhradd.onreadystatechange=function(){
		 
		 if(this.readyState==4 && this.status==200)
		 {
		notify(true,"Record Saved succeesfully");
		 dialog.dialog( "close" );
		 }
		 else
			 {
			 notify(false,"Problem Saving record");
			 }
		 
	 }
	 xhradd.open("post","./record");
	 var record= {email:email,start:start,end:end}
	 xhradd.setRequestHeader("content-type","application/json");
	 console.log(JSON.stringify(record));
	 xhradd.send(JSON.stringify(record));
 }
 
var xhr;
function loadrecords(email)
{
if(xhr!=undefined)
	{
xhr.abort();
	}
waitingDialog({})
 xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
console.log(this);
	if(this.readyState==4 && this.status==200)
		{
		 console.log(this.response);
var response_record_arr= JSON.parse(this.response);
var table= buildtable(response_record_arr);
$("#table").html(table);
		}
	if(this.readyState==4)
		{
		closeWaitingDialog();
		}

	  }
  xhr.open("get","./record?email="+email);
  xhr.send();
}
function buildtable(data)
{

	var table="";
var tableparthead=" <div style='text-align:center'><table id='records'   class='ui-widget ui-widget-content'> <thead><tr class='ui-widget-header'><th>Email</th><th>Start Time</th><th>End Time</th></tr> </thead><tbody>"
table =table+ tableparthead; 

	for(i=0;i<data.length;i++)
	{ 
if(data[i]==null)
	continue;
		var tr="<tr>";	
 tr=tr + "<td>" + data[i].email + "</td><td>" + data[i].start + "</td><td>" + data[i].end +"</td>"  
tr=tr+ "</tr>"
table = table + tr;
	}
table=table + "</tbody></table></div>";	
console.log(table);
return table;
}