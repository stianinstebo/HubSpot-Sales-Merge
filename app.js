/** node js server points **/
const express = require('express');
const request = require("request");
const path = require('path');
const EJS = require('ejs');

const app = express();
const appPortal = express();
const PORT = 8080;
const PORTPORTAL = 9090;


// var dir = path.join(__dirname, 'public');

// app.engine('html', EJS.renderFile);
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { title: 'HubSpot Sales Merge (Lite)'});
});

appPortal.use(express.static(__dirname + '/public'));
appPortal.set('view engine', 'ejs');


appPortal.get('/full',function(req,res){
	res.render('index', { title: 'HubSpot Sales Merge'});
});

app.get('/full',function(req,res){
	res.render('index', { title: 'HubSpot Sales Merge'});
});

app.get('/api/pipelines/', (req, res) => {
	var options = { method: 'GET', 
	  url: 'https://api.hubapi.com/crm-pipelines/v1/pipelines/deals?hapikey=&order_by=displayorder'
	  }

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		var obj = JSON.parse(body);
		//var obj2 = JSON.parse(obj.companies);
		console.log("...... starting");
		console.log("body: "+body);

		var pipelineArr = [];
		var obj = JSON.parse(body);
		
		console.log(obj['results'][0]['stages']);

		obj['results'][0]['stages'].forEach(function(entry) {
			console.log(entry.label);
			pipelineArr.push([entry.displayOrder, entry.label]);
		});
		res.send(pipelineArr);
	});

});

app.get('/api/owners/:apikey', (req, res) => {
	var accountArray = ['', ''];
	var apikey = req.params.apikey;
	//for (i in accountArray) {
		//console.log(accountArray[i]);

		var options = { method: 'GET', originalHostHeaderName: 'Host', 
		url: 'https://api.hubapi.com/owners/v2/owners?hapikey='+apikey }

		var ownerArr = [];

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			var obj = JSON.parse(body);

			console.log("...... starting");

			for (i in obj) {
				console.log(obj[i]['firstName'])
				console.log(obj[i]['email'])
				var fullname = obj[i]['firstName'] + " " + obj[i]['lastName'];
				ownerArr.push([fullname, obj[i]['email'], obj[i]['ownerId']]);
			}
			res.send(ownerArr);
		});
	//}
});
app.get('/api/deal/:dealid/:country', (req, res) => {
	// console.log("sent deal param: "+);
	var hapikeytemp = "";
	switch(req.params.country) {
		case '6463683':
			hapikeytemp = '';
		break;

		case '4190527':
			hapikeytemp = '';
		break;
	}
	var options = { method: 'GET', 
	  url: 'https://api.hubapi.com/deals/v1/deal/'+req.params.dealid+'?hapikey='+hapikeytemp
	}

	var dealArr = [];
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  var obj = JSON.parse(body);
	  console.log("amount: "+obj['properties']['amount_in_home_currency']['value']);//['hs_createdate']);

	  dealArr.push(obj['properties']['dealname']['value']);
	  dealArr.push(obj['properties']['hs_createdate']['value']);
	  dealArr.push(obj['properties']['amount_in_home_currency']['value']);
	  dealArr.push(obj['properties']['dealstage']['value']);
	  dealArr.push(obj['properties']['hs_deal_stage_probability']['value']);
	  dealArr.push(obj['properties']['closedate']['value']);
	  dealArr.push(obj['properties']['hubspot_owner_id']['value']);

	  //
	  res.send(dealArr);
	});
});
app.get('/test', (req, res) => {
	//arr[0] = NO
	//arr[1] = SWE
	var accountArray = ['', ''];
	var options = { method: 'GET', originalHostHeaderName: 'Host', 
	  url: 'https://api.hubapi.com/deals/v1/deal/paged?hapikey='+accountArray[0]+'&includeAssociations=true&limit=99&properties=dealname&properties=dealstage&properties=amount&properties=hubspot_owner_id&properties=closedate&properties=hubspot_team_id'
		       var companyArr = [];
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  var obj = JSON.parse(body);
	  //var obj2 = JSON.parse(obj.companies);
	  console.log("...... starting");
	  console.log(obj);

	  obj['deals'].forEach(function(entry) {
	  	try {
	  		companyArr.push([entry.properties.dealname.value, entry.properties.dealstage.value, entry.properties.amount.value, entry.properties.hubspot_owner_id.value, entry.dealId, entry.properties.dealname.timestamp, entry.properties.closedate.value, entry.portalId, entry.properties.hubspot_team_id.value]);
	  		//companyArr.push([entry.properties.name.value, entry.properties.lifecyclestage.value]);
	  		console.log(entry.dealId);
	  		console.log("______________________________");
	  		console.log(entry.properties.dealname.value);
	  		console.log("timestamp: "+entry.properties.dealname.timestamp);
			console.log("______________________________");
			console.log(entry.properties.dealstage.value);
			console.log(entry.properties.amount.value);
			console.log(entry.properties.hubspot_owner_id.sourceId);
			//console.log(entry.properties.lifecyclestage.value);
	  	} catch(e) {
	  		console.log("missing company data");
	  	}
		  
		  //Lead status
		});

	  var options2 = { method: 'GET', 
	  url: 'https://api.hubapi.com/deals/v1/deal/paged?hapikey='+accountArray[1]+'&includeAssociations=true&limit=99&properties=dealname&properties=dealstage&properties=amount&properties=hubspot_owner_id&properties=closedate'
	  
		request(options2, function (error, response, body) {
		  if (error) throw new Error(error);
		  var obj = JSON.parse(body);
		  //var obj2 = JSON.parse(obj.companies);
		  console.log("...... starting");
		  console.log(obj);

		  obj['deals'].forEach(function(entry) {
		  	try {
		  		companyArr.push([entry.properties.dealname.value, entry.properties.dealstage.value, entry.properties.amount.value, entry.properties.hubspot_owner_id.value, entry.dealId, entry.properties.dealname.timestamp, entry.properties.closedate.value, entry.portalId]);
		  		//companyArr.push([entry.properties.name.value, entry.properties.lifecyclestage.value]);
		  		console.log(entry.dealId);
		  		console.log("______________________________");
		  		console.log(entry.properties.dealname.value);
		  		console.log("timestamp: "+entry.properties.dealname.timestamp);
				console.log("______________________________");
				console.log(entry.properties.dealstage.value);
				console.log(entry.properties.amount.value);
				console.log(entry.properties.hubspot_owner_id.sourceId);
				//console.log(entry.properties.lifecyclestage.value);
		  	} catch(e) {
		  		console.log("missing company data");
		  	}
			  
			  //Lead status
			});

		  // for (i in obj.length) {
		  // 	console.log("i: "+i);
		  // 	//console.log(body[i]["properties"]);
		  // }

		  //console.log(obj.companies[1].properties);
		res.send(companyArr);
		});

	  // for (i in obj.length) {
	  // 	console.log("i: "+i);
	  // 	//console.log(body[i]["properties"]);
	  // }

	  //console.log(obj.companies[1].properties);
	// res.send(companyArr);
	});


});

app.listen(PORT, () => {
	console.log(`HubSpot Server running at: http://localhost:${PORT}/`);
});

appPortal.listen(PORTPORTAL, () => {
	console.log(`Portal Server running at: http://localhost:${PORTPORTAL}/`);
});
