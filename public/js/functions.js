// VARIABLE USED TO STORE APP DATA
var filterOptions = ["", "", "", ""];
var successrateFloat = 0;
var successrateLost = 0;
var successrateWon = 0;

var salesrepArr = [];
var dealOwnerName = [];

var globalGraphArray = ['', '', '', '', '', '', '', '', '', '', '', ''];

var graphArrayOmsatt = {
	    "Januar": Math.round(Math.random() * 1000),
	    "Februar": Math.round(Math.random() * 1000),
	    "Mars": Math.round(Math.random() * 1000),
	    "April": Math.round(Math.random() * 1000),
	    "Mai": Math.round(Math.random() * 1000),
	    "Juni": Math.round(Math.random() * 1000),
	    "Juli": Math.round(Math.random() * 1000),
	    "August": Math.round(Math.random() * 1000),
	    "September": Math.round(Math.random() * 1000),
	    "Okotober": Math.round(Math.random() * 1000),
	    "November": Math.round(Math.random() * 1000),
	    "Desember":Math.round(Math.random() * 1000),
	    "Januar 2018": Math.round(Math.random() * 1000),
	    "Februar 2018": Math.round(Math.random() * 1000),
	    "Mars 2018": Math.round(Math.random() * 1000),
	    "April 2018": Math.round(Math.random() * 1000),
	    "Mai 2018": Math.round(Math.random() * 1000),
	    "Juni 2018": Math.round(Math.random() * 1000),
	    "Juli 2018": Math.round(Math.random() * 1000),
	    "August 2018": Math.round(Math.random() * 1000),
	    "September 2018": Math.round(Math.random() * 1000),
	    "Okotober 2018": Math.round(Math.random() * 1000),
	    "November 2018": Math.round(Math.random() * 1000),
	    "Desember 2018":Math.round(Math.random() * 1000)
	};

$(document).ready(function() { 	
	var accountApiKeys = ['43ac5280-fddd-454f-afb4-f6bca6347734', '763188a5-eb8c-4f45-b915-0c64e9ac3114'];
	// $("#resetbtn").hide();
	$('body').bootstrapMaterialDesign(); 
	$(".sticky-header").floatThead({top:50});
	$("#dropdownMenuButtonPeriode").text(new Date().getFullYear());
	// loadData();
	
	$('#sales-persons').append('<a class="dropdown-item" href="#" onclick="selectSalesPersonBeta(0)">Alle selgere</a>');
	for (iii in accountApiKeys) {
		console.log('int count: '+iii);
		
		$.get( "/api/owners/"+accountApiKeys[iii], function( data ) {
		  console.log(data);
		  
		  for (i in data) {
		  	salesrepArr.push([data[i][2], data[i][0]]);
		  	
		  	dealOwnerName.push({ ID: data[i][2], name: data[i][0] });
		  	console.log("owner json: "+dealOwnerName);

		  	$('#th-pipeline'+data[i][0]).append(data[i][1]);
		  	var ownerCountry = "";
		  	if (data[i][0] !== " ") {

			  	if (data[i][1].includes('.no')) {
			  		$('#sales-persons').append('<a class="dropdown-item selectNorge" href="#" id="no-salesrep-'+i+'" onclick="selectSalesPersonBeta('+"'"+data[i][2]+"',"+"'"+data[i][0]+"'"+', '+"'"+'no-salesrep-'+i+"'"+')">'+data[i][0]+'<small style="float: right; width: 100%; color: #ccc;">Norge</small></a>');
			  	} else {
			  		$('#sales-persons').append('<a class="dropdown-item selectSverige" href="#" id="se-salesrep-'+i+'"onclick="selectSalesPersonBeta('+"'"+data[i][2]+"',"+"'"+data[i][0]+"', "+"'"+'se-salesrep-'+i+"'"+')">'+data[i][0]+'<small style="float: right; width: 100%; color: #ccc;">Sverige</small></a>');
			  	}
			  }
		  }
		});
	}
	
	$("#table-filter-input").on("input", function() {
	    var value = $(this).val().toLowerCase();
	    $("#tbl-customers tr").filter(function() {
	      $(this).toggle(checkInput($(this), value))
	    });
	  });


	function checkInput(element, value) {
	  value = value.split(' ');
	  for (var i = 0; i < value.length; i++) {
	    if (value[i] && element.text().toLowerCase().indexOf(value[i]) == -1) return false;
	  }
	  return true;
	}
	
	$("#search-persons").keyup(function() {
	    var filter = $(this).val();
	    count = 0;
	    $('#sales-persons a').each(function() {
	        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
	        	$(this).hide();
	        } else {
	        	$(this).show();
	        	count++;
	        }
	    });
    });
});

function actionToggleTable () {
	var $element = $('#tbl-customers');

	if (!$element.is(':visible')) {
		console.log("fade in");
	    $element.fadeIn();
	    $('#table-icon').empty();
	    $('#table-icon').append('keyboard_arrow_up');
	} else {
		$element.fadeOut();
		console.log("fade out");
		$('#table-icon').empty();
		$('#table-icon').append('keyboard_arrow_down');
	}
}

function loadData() {
	$('#dealModal').modal('hide');
	$('#tbl-customers').empty();

	$.get( "/test", function( data ) {
	  console.log(data);
	  var stageArray1 = [];
	  var stageArray2 = [];
	  var stageArray3 = [];
	  var stageArray4 = [];
	  var stageArray5 = [];
	  var stageArray6 = [];
	  
	  var arrlength = data.length;

	  var amountOmsatt = 0;
	  var amountEstimert = 0;
	  var amountLost = 0;
	  var amountPotensial = 0;


	  var completionPercentage = 0;
	  for (i in data) {

	  	console.log("name: "+data[i][0]);
	  	console.log("stage: "+data[i][1]);
	  	var stageCounter = 0;
	  	var stagePrecentage = 0;

	  	var datePeriode = new Date(parseInt(data[i][5])).toLocaleDateString("nb-NO");
	  	var dates = datePeriode.toString().split('.');
	  	var closedate = new Date(parseInt(data[i][6])).toLocaleDateString("nb-NO");
	  	var dates2 = closedate.toString().split('.');
	  	
  		$('#tbl-customers').append('<tr style="cursor: pointer;" onclick="selectDeal('+data[i][4]+','+data[i][7]+')" class="'+data[i][3]+'" id="row'+i+'"><th scope="row">'+data[i][0]+'</th>');

	  	$("#stages-stage1").text(stageArray1.length);
	  	$("#stages-stage2").text(stageArray2.length);
	  	$("#stages-stage3").text(stageArray3.length);
	  	$("#stages-stage4").text(stageArray4.length);
	  	$("#stages-stage5").text(stageArray5.length);
	  	$("#stages-stage6").text(stageArray6.length);
  	
		  	
	  	switch(data[i][1]) {
	  		case 'appointmentscheduled':
	  			completionPercentage += 10;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">10%</td>');
	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

		  		for (let step = 0; step < 5; step++) {
		  			$('#row'+i).append('<td></td>');
		  		}

	  		break;

	  		case 'qualifiedtobuy':
	  			completionPercentage += 20;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">20%</td>');
	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

		  		for (let step = 0; step < 4; step++) {
		  			$('#row'+i).append('<td></td>');
		  		}
		  		
		  	break;

	  		case 'presentationscheduled':
	  			completionPercentage += 40;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">40%</td>');
	  			for (let step = 0; step < 2; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');
		  		}

	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

		  		for (let step = 0; step < 3; step++) {
		  			$('#row'+i).append('<td></td>');
		  		}
		  		
	  		break;

	  		case 'decisionmakerboughtin':
	  			completionPercentage += 60;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">60%</td>');
	  			for (let step = 0; step < 3; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');
		  		}

	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

		  		for (let step = 0; step < 2; step++) {
		  			$('#row'+i).append('<td></td>');
		  		}
		  		
	  		break;

	  		case 'contractsent':
	  			completionPercentage += 80;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">80%</td>');
	  			for (let step = 0; step < 4; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');
		  		}

	  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');

		  		for (let step = 0; step < 1; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style="display: none;"> <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div> </div></td>');
		  		}
		  		
	  		break;

	  		case 'closedwon':
	  			successrateWon += 1;
	  			completionPercentage += 100;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">100%</td>');
	  			for (let step = 0; step < 6; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');
		  		}
		  		
	  		break;

	  		case 'closedlost':
	  			successrateLost += 1;
	  			completionPercentage += 0;
	  			$('#row'+i).append('<td style="color: #FAFAFA !important;">0%</td>');
	  			for (let step = 0; step < 6; step++) {
		  			$('#row'+i).append('<td><div class="progress progress-stages" style=""> <div class="progress-bar  bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div> </div></td>');
		  		}
		  	break;

		  	default:
		  		// console.log("not in pipeline");
	  		break;

	  	}


	  	var pos = dealOwnerName.map(function(e) { 
            return e.ID; 
        }).indexOf(data[i][3]);

        console.log(i + " row id: "+data[i][3]); 
        var dateCreated = new Date(parseInt(data[i][5]));
	  	var dateClosed = new Date(parseInt(data[i][6]));

	  	$('#row'+i).append('<td style="display: none;">'+data[i][3]+'</td>');
	  	$('#row'+i).append('<td style="display: none;">'+data[i][2]+'</td>');

	  	$('#row'+i).append('<td style="display: none;">'+("0" + (dateCreated.getMonth() + 1)).slice(-2)+'.'+dateCreated.getFullYear()+'</td>');
	  	$('#row'+i).append('<td style="display: none;">'+("0" + (dateClosed.getMonth() + 1)).slice(-2)+'.'+dateClosed.getFullYear()+'</td>');

	  	$('#row'+i).append('<td style="display: none;">'+data[i][7]+'</td>');

	  	switch (data[i][8]) {
	  		case '318096':
	  			$('#row'+i).append('<td style="display: none;">Ledelsen</td>');
	  		break;

	  		case '331863':
	  			$('#row'+i).append('<td style="display: none;">Bergen</td>');
	  		break;

	  		case '331862':
	  			$('#row'+i).append('<td style="display: none;">Oslo</td>');
	  		break;

	  		case '33133862':
	  			$('#row'+i).append('<td style="display: none;">Trondheim</td>');
	  		break;

	  		default:
	  			$('#row'+i).append('<td style="display: none;">Malmø</td>');
	  		break;
	  	}

	  	$('#tbl-customers').append('</tr>');
	  }
	  	successrateFloat = Math.abs(successrateLost/successrateWon).toFixed(2);
	  	console.log("successrate: "+successrateFloat);
	  	console.log("successWON: "+successrateWon);
	  	console.log("successLOST: "+successrateLost);

	  	
	  	getStats();
	  	var countCustomers = $("#tbl-customers tr").length;
		$("#stages-customers").text(countCustomers);
		$(".overlay").fadeOut();

	});
	
	$.get( "/api/pipelines", function( data ) {
	  console.log(data);
	  for (i in data) {
	  	$('#th-pipeline'+data[i][0]).text(data[i][1]);
	  }
	});

	var $element = $('#tbl-customers');
	if (!$element.is(':visible')) {
		console.log("fade in");
	    $element.fadeIn();
	} else {
		
	}
	selectSalesPeriode(new Date().getFullYear(), '');
}

//////////////// CALCULATE SALES REP STATS ////////////////
function getStats() {
	$('#amountOmsatt').empty();
	$('#amountEstimert').empty();
	$('#amountLost').empty();
	$('#amountPotensial').empty();

	$('#amountOmsatt').append('<div class="loader" style="margin-top: -10px;"> <svg class="circular"> <circle class="path" fill="none" r="20" cx="50" cy="50" stroke-width="3" stroke-miterlimit="10"></circle> </svg> </div>');

	$('#amountEstimert').append('<div class="loader" style="margin-top: -10px;"> <svg class="circular"> <circle class="path" fill="none" r="20" cx="50" cy="50" stroke-width="3" stroke-miterlimit="10"></circle> </svg> </div>');

	$('#amountLost').append('<div class="loader" style="margin-top: -10px;"> <svg class="circular"> <circle class="path" fill="none" r="20" cx="50" cy="50" stroke-width="3" stroke-miterlimit="10"></circle> </svg> </div>');

	$('#amountPotensial').append('<div class="loader" style="margin-top: -10px;"> <svg class="circular"> <circle class="path" fill="none" r="20" cx="50" cy="50" stroke-width="3" stroke-miterlimit="10"></circle> </svg> </div>');


	var amount = 0;
	var potentialamount = 0;
	var potentiallostamount = 0;

	var $element = $('#tbl-customers');
	if (!$element.is(':visible')) {
		console.log("fade in");
	    $element.fadeIn();
	} else {
		
	}
	
	$('#tbl-customers').find('tr:visible').each(function (i, el) {
        var $tds = $(this).find('td'), dealstage = $tds.eq(0).text(), dealvalue = $tds.eq(8).text();

        if (dealstage == '100%') {
        	amount += parseInt(dealvalue);
        } else if (dealstage >= '40%') {
        	potentialamount += parseInt(dealvalue);
        } else if (dealstage == '0%') {
        	potentiallostamount += parseInt(dealvalue);
        } else {
        	
        }
    });

	$("#amountOmsatt").text(parseInt(amount).toLocaleString().replace(/,/g, ' '));

	$("#amountLost").text(parseInt(potentiallostamount).toLocaleString().replace(/,/g, ' '));
	$("#amountPotensial").text(parseInt(potentialamount).toLocaleString().replace(/,/g, ' '));
	$("#amountEstimert").text(Math.round(parseInt(potentialamount+amount)).toLocaleString().replace(/,/g, ' '));
	// $("#amountEstimert").append('<button class="btn-scoreboard" onclick="showScoreBoard()"><span class="oi oi-vertical-align-bottom"></span></button>');
}
//////////////// END ////////////////

//////////////// SELECT COUNTRY ////////////////
function selectSalesCountry(country, name) { //39774936
	$("#dropdownMenuButtonLand").text(name);
	

	switch (country) {
		case '6463683':
			$(".selectSverige").hide();
			$(".selectNorge").show();
			$("#search-persons").val(name);
		break;

		case '4190527':
			$(".selectSverige").show();
			$(".selectNorge").hide();
			$("#search-persons").val(name);
		break;

		default:
			$(".selectSverige").show();
			$(".selectNorge").show();
			$("#search-persons").val('');
		break;
	} 

	var inputFilter = document.getElementById('table-filter-input');
	inputFilter.addEventListener('input', function() {

	})

	if (country == 0) {
		$("#dropdownMenuButtonLand").text("Alle");
		$("#resetbtn").fadeOut();
		filterOptions[2] = "";
	} else {
		filterOptions[2] = country;
		$("#resetbtn").fadeIn();
	}

	$('#table-filter-input').val(filterOptions[0] + " " + filterOptions[1] + " " + filterOptions[2] + " " + filterOptions[3]);
	inputFilter.dispatchEvent(new Event('input'));
	
	getStats();
}
//////////////// END ////////////////

//////////////// SELECT SALES REP ////////////////
function selectSalesPersonBeta(owner, name, elemid) { //39774936

	// $(".dropdown-item").removeClass("active");
	// $("#"+elemid).addClass("active");

	$("#dropdownMenuButtonSales").text(name);
	$('#scoreboardModal').modal('hide');
	$('#dealModal').modal('hide');
		var inputFilter = document.getElementById('table-filter-input');
		inputFilter.addEventListener('input', function() {

	})

	if (owner == 0) {
		$("#dropdownMenuButtonSales").text("Alle selgere");
		filterOptions[0] = "";
		$("#scoreboardbtn").fadeIn();
		$("#resetbtn").fadeOut();
	} else {
		filterOptions[0] = owner;
		$("#scoreboardbtn").fadeOut();
		$("#resetbtn").fadeIn();
	}
	
	$('#table-filter-input').val(filterOptions[0] + " " + filterOptions[1] + " " + filterOptions[2] + " " + filterOptions[3]);
	inputFilter.dispatchEvent(new Event('input'));
	
	getStats();
}
//////////////// END ////////////////

//////////////// SELECT DEPARTMENT ////////////////
function selectSalesDepartment (id, name) {
	$("#dropdownMenuButtonDepartment").text(name);
	
	if (name == '') {
		$("#dropdownMenuButtonDepartment").text('Alle avdelinger');
		$("#resetbtn").fadeOut();
	} else {
		$("#resetbtn").fadeIn();
	}
	console.log(filterOptions[2]);

	if (filterOptions[2] == '4190527') {
		filterOptions[3] = 'Malmø';
		$("#dropdownMenuButtonDepartment").text('Malmø');
	} else {
		filterOptions[3] = name;
	}
	
	$('#table-filter-input').val(filterOptions[0] + " " + filterOptions[1] + " " + filterOptions[2] + " " + filterOptions[3]);
	
	var inputFilter = document.getElementById('table-filter-input');
		inputFilter.addEventListener('input', function() {

	})
	inputFilter.dispatchEvent(new Event('input'));
	
	getStats();
}
//////////////// END ////////////////

//////////////// SELECT PERIODE ////////////////
function selectSalesPeriode(year, month, name, elemid) {	
	$(".dropdown-item").removeClass("active");
	$("#"+elemid).addClass("active");
	if (year == '0') {
		$("#dropdownMenuButtonPeriode").text("Alle perioder");
		filterOptions[1] = "";
		$("#resetbtn").fadeOut();
	} else if (month != '') {
		$("#dropdownMenuButtonPeriode").text(month+"."+year);
		filterOptions[1] = month+"."+year;
		$("#resetbtn").fadeIn();
	} else {
		$("#dropdownMenuButtonPeriode").text(year);
		filterOptions[1] = year;
		$("#resetbtn").fadeIn();
	}
	
	$('#table-filter-input').val(filterOptions[0] + " " + filterOptions[1] + " " + filterOptions[2] + " " + filterOptions[3]);
	
	var inputFilter = document.getElementById('table-filter-input');
		inputFilter.addEventListener('input', function() {

	})
	
	inputFilter.dispatchEvent(new Event('input'));
	
	getStats();
}
//////////////// END ////////////////

//////////////// SELECT DEAL ////////////////
function selectDeal(deal, country) {
	$.get( "/api/deal/"+deal+'/'+country, function( data ) {
	  console.log(data);

	  $('#dealId').text(deal);
	  $('#dealname').text(data[0]);
	  $('#dealcreated').text(new Date(parseInt(data[1])).toLocaleDateString("nb-NO"));
	  $('#dealamount').text((parseInt(data[2])).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').slice(0, -3));
	  $('#dealamount').append('<small> NOK</small>');
	  $('#dealstage').text(data[3]);

	  for (i in salesrepArr) {
	  	// console.log("i loop: "+salesrepArr[i][0]);

	  	if ( data[6] == salesrepArr[i][0]) {
	  		console.log("salesid: "+salesrepArr[i][0]);
	  		console.log("salesrep: "+salesrepArr[i][1]);
	  		
	  		$('#dealkam').empty();
	  		$('#dealkam').append('<button type="button" class="btn btn-secondary pulse-button" style="text-align: left; color: #fff;" onclick="selectSalesPersonBeta('+"'"+salesrepArr[i][0]+"',"+"'"+salesrepArr[i][1]+"'"+')">'+salesrepArr[i][1]+'</button>');
	  	
	  	} else {

	  	}
	  }

	  if (data[3] == "closedwon") {
	  	$('#dealstage').text("Vunnet");
	  } else if (data[3] == "closedlost") {
	  	$('#dealstage').text("Tapt");
	  } else {
	  	$('#dealstage').text("Pågående");
	  }

	  $('#dealclosed').text(new Date(parseInt(data[5])).toLocaleDateString("nb-NO"));


	  $('#modalStageStatus').removeClass('bg-success');
	  $('#modalStageStatus').removeClass('bg-info');
	  $('#modalStageStatus').removeClass('bg-warning');

	  if (data[3] == "closedwon") {
	  	$('#modalStageStatus').addClass('bg-success');
	  	$('#dealclosedtitle').text("Lukket: ");
	  	$('#rowDealProbability').hide();
	  } else if (data[3] == "closedlost") {
	  	$('#modalStageStatus').addClass('bg-warning');
	  	$('#dealclosedtitle').text("Lukket: ");
	  	$('#rowDealProbability').hide();
	  } else {
	  	$('#modalStageStatus').addClass('bg-info');
	  	$('#dealclosedtitle').text("Forventet lukket: ");
	  }

	  $('#dealprobability').text(roundToTwo(data[4]) + "");

	});

	$('#dealModal').modal('toggle');
}
//////////////// END ////////////////

//////////////// HELPER FUNCTION ////////////////
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
//////////////// END ////////////////

//////////////// SHOW SCOREBOARD ////////////////
function showScoreBoard() {
	$("#scoreboardspinner").show();
	$('#scoreboardModal').modal('show');
}
//////////////// END ////////////////

//////////////// SHOW AND CALCULATE SCOREBOARD ////////////////
$(document).on('show.bs.modal', '#scoreboardModal', function (event) {
	$("#scoreboardspinner").fadeIn();
	// $("#scoreboardtable tbody").empty();
});
$(document).on('shown.bs.modal', '#scoreboardModal', function (event) {
	// $("#scoreboardcontent").empty();
	calcScore();
});


function calcScore() {
	var leaderBoard = [];
	$("#scorecontent").empty();
	$("#scoreboardspinner").fadeIn();
	for (i in dealOwnerName) {
		var dealOwnerId = dealOwnerName[i];
		var ownerSaleAmount = 0;
		var ownerSaleDepartment = "";
		$('#tbl-customers').find('tr:visible').each(function (i, el) {
	        var $tds = $(this).find('td'), dealstage = $tds.eq(0).text(), dealvalue = $tds.eq(8).text(), ownerid = $tds.eq(7).text(), department = $tds.eq(12).text();
	        console.log("dealstage: "+dealstage);

	        if (dealOwnerId.ID == ownerid) {
	        	console.log("match");

	        	if (dealstage == "100%") {
	        		ownerSaleAmount += parseInt(dealvalue);
	        		ownerSaleDepartment = department;
	        	} else {
	        		// TODO: Nothing
	        	}        	
	        } else {
	        	console.log("not a match");
	        }

	    });
	    leaderBoard.push([dealOwnerId.name, ownerSaleAmount, ownerSaleDepartment, dealOwnerId.ID]);
	    console.log(leaderBoard);
	}

	leaderBoard.sort(function(a,b) {
	    return b[1]-a[1]
	});

	for (i in leaderBoard) {
		if (leaderBoard[i][1] == 0) {

		} else {
			$("#scorecontent").append('<tr style="cursor: pointer;" onclick="selectSalesPersonBeta('+"'"+leaderBoard[i][3]+"','"+leaderBoard[i][0]+"'"+')"><td></td><td>'+leaderBoard[i][0]+'</td><td>'+parseInt(leaderBoard[i][1]).toLocaleString().replace(/,/g, ' ')+'</td><td>'+leaderBoard[i][2]+'</td></tr>');
		}
	}

	$("#scoreboardtable tbody tr").each(function(i) {
		$(this).find('td:eq(0)').text(i+1 +". plass: ");
		$(this).find('td:eq(2)').append(' <span style="font-size: 8px;">NOK</span>');
	});

	var tableCount = 0;
	$("#scoreboardtable tr").each(function() { 
		tableCount++;
		if (tableCount < 11) {

		} else {
			$(this).hide();
		}
	});
	$("#scoreboardspinner").fadeOut();
}
//////////////// END ////////////////

//////////////// FUNCTION REST FILTERS ////////////////
function resetFilters() {
	filterOptions[0] = "";
	filterOptions[1] = "";
	filterOptions[2] = "";
	filterOptions[3] = "";

	var inputFilter = document.getElementById('table-filter-input');
	inputFilter.addEventListener('input', function() {

	})

	$('#table-filter-input').val(filterOptions[0] + " " + filterOptions[1] + " " + filterOptions[2] + " " + filterOptions[3]);
	inputFilter.dispatchEvent(new Event('input'));
	
	selectSalesPersonBeta(0);
	// selectSalesPeriode(0);
	// selectSalesDepartment(0);
	// selectSalesCountry(0, 'Alle land');

	// getStats();

}
//////////////// END ////////////////

