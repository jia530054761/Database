var http = require('http');
var express = require('express');

var app = express();
var httpServer = http.createServer(app);
var webServerConfig = require('../config/web-server.js');
var database = require('./database.js');
var oracledb = require("oracledb");
var router = require('./router.js');
var globalcount = 0;

function initialize(){
	app.use(express.static('views'));
	app.use(express.static('button'));
	app.get("/", async (req, res) => {
		/*practice using res.write instead of res.render
		res.write("");*/
		res.write("<html>");
		res.write("<head><title>Crime Analysis Website</title>");
		res.write("<meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0'/>");
		res.write("<link rel='stylesheet' type='text/css' href='css/reset.css'>");
		res.write("<link rel='stylesheet' type='text/css' href='css/main.css'>");
		res.write("<script type='text/javascript' src='js/jquery.js'></script>");
		res.write("<script type='text/javascript' src='js/main.js'></script>");
		res.write("</head>");
		
		res.write("<body><header><div class='logo'><a href='/'><h2>Crime Analysis</h2></a></div>");//end of logo
		res.write("<div id='menu_icon'></div><nav><ul><li><a href='/' class='selected'>Home</a></li><li><a href='/search'>Search</a></li><li><a href='/view_trend'>View Trend</a></li><li><a href='/view_pie'>View Pie</a></li><li><a href='/summary'>Summary</a></li>");
		res.write("<div style='display: inline-flex; font-size: 0.95em;'><div style='font-weight:bold;'>Number of Vistors: </div><div style='margin: 0 0 0 20px; color: red; font-size: 1em;'>" + (++globalcount) + "</div></div>");//add counter
		res.write("</ul><br></nav></header>");
		res.write("<section class='main clearfix'>");
		res.write("<div class='work'><a href='/Hollywood'><img src='img/Hollywood.jpg' height = '300' width = '300' class='media' alt=''/><div class='caption'><div class='work_title'><h1>Hollywood</h1></div></div></a></div>");//1st pic
		res.write('<div class="work"><a href="/Harbor"><img src="img/harbor.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Harbor</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/Southeast"><img src="img/southeast.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Southeast</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/Central"><img src="img/central.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Central</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/Southwest"><img src="img/Southwest.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Southwest</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/N_Hollywood"><img src="img/N hollywood.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>N Hollywood</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/Mission"><img src="img/Mission.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Mission</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/Topanga"><img src="img/Topanga.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>Topanga</h1></div></div></a></div>');
		res.write('<div class="work"><a href="/77th_Street"><img src="img/77thstreet.jpg" height = "300" width = "300" class="media" alt=""/><div class="caption"><div class="work_title"><h1>77th Street</h1></div></div></a></div>');
		
		res.write("</section>");//end of main
		res.write("/body");
		res.write("/html");
		res.end();
	
		//res.render('index.ejs');
    	});

	app.get("/chart", async (req, res) => {
	var query = 'SELECT AREA_NAME, CNT, ROUND(perc, 3) as percent from (SELECT AREA_ID, COUNT(*) AS CNT, COUNT(*)/(SELECT COUNT(DRNUMBER) AS per FROM CRIME WHERE to_char(DATA_OCCURRED,\'yyyy\') = :year ) * 100 as perc from crime where to_char(DATA_OCCURRED,\'yyyy\') = :year GROUP BY AREA_ID) a,AREA where a.AREA_ID = AREA.AREA_ID';
	var binds = {};
	var year = req.query.year;
	binds.year = year;
	var re = await database.simpleExecute(query, binds);
	var names = [];
	var nums = new Array();
	var percents = new Array();
	var pie_points = new Array();
	for(var i = 0; i < re.rows.length; i++){
		var pie_point = new Array();
		pie_point[0] = re.rows[i].AREA_NAME;
		pie_point[1] = re.rows[i].PERCENT;
		pie_points[i] = pie_point;
		names[i] = re.rows[i].AREA_NAME;
		nums[i] = re.rows[i].CNT;
		percents[i] = re.rows[i].PERCENT;
	}
	var data = {};
	data.year = year;
	data.names = names;
	data.nums = nums;
	data.percents = percents;
	data.pie_points = pie_points;
	re.year = year;
	//res.send(re);
	
	res.render('test_chart.ejs', {data: data});
	//res.send(re);	
      	//res.render('test_chart.ejs');
    	});
	
	app.get("/search", async (req, res) => {
	res.render('search.ejs');
    	});

	app.get("/view_trend", async (req, res) => {
	res.render('view_trend.ejs');
    	});

	app.get("/view_pie", async (req, res) => {
	res.render('pie.ejs');
    	});

	app.get("/Hollywood", async (req, res) => {
	res.render('Hollywood.ejs');
    	});

	app.get("/Harbor", async (req, res) => {
	res.render('Harbor.ejs');
    	});

	app.get("/Southeast", async (req, res) => {
	res.render('Southeast.ejs');
    	});

	app.get("/Central", async (req, res) => {
	res.render('Central.ejs');
    	});

	app.get("/Southwest", async (req, res) => {
	res.render('Southwest.ejs');
    	});

	app.get("/N_Hollywood", async (req, res) => {
	res.render('N_Hollywood.ejs');
    	});

	app.get("/Mission", async (req, res) => {
	res.render('Mission.ejs');
    	});

	app.get("/Topanga", async (req, res) => {
	res.render('Topanga.ejs');
    	});

	app.get("/77th_Street", async (req, res) => {
	res.render('77th_Street.ejs');
    	});
	

	app.get("/summary", async (req, res) => {
	var query = 'SELECT AREA_NAME, CNT, ROUND(perc, 3) as percent from (SELECT AREA_ID, COUNT(*) AS CNT, COUNT(*)/(SELECT COUNT(DRNUMBER) AS per FROM CRIME WHERE to_char(DATA_OCCURRED,\'yyyy\') = :year ) * 100 as perc from crime where to_char(DATA_OCCURRED,\'yyyy\') = :year GROUP BY AREA_ID) a,AREA where a.AREA_ID = AREA.AREA_ID';
	var binds = {};
	var year = 2018;
	binds.year = year;
	var re = await database.simpleExecute(query, binds);
	var names = [];
	var nums = new Array();
	var percents = new Array();
	var pie_points = new Array();
	for(var i = 0; i < re.rows.length; i++){
		var pie_point = new Array();
		pie_point[0] = re.rows[i].AREA_NAME;
		pie_point[1] = re.rows[i].PERCENT;
		pie_points[i] = pie_point;
		names[i] = re.rows[i].AREA_NAME;
		nums[i] = re.rows[i].CNT;
		percents[i] = re.rows[i].PERCENT;
	}
	var data = {};
	data.year = year;
	data.names = names;
	data.nums = nums;
	data.percents = percents;
	data.pie_points = pie_points;
	re.year = year;
	//res.send(re);
	
	res.render('test_chart.ejs', {data: data});
	//res.send(re);	
      	//res.render('test_chart.ejs');
    	});

	app.get("/pie", async (req, res) => {
	//res.send(req.query);
	var query = 'select A.race as race, A.count as count, (A.count / B.count) * 100 as percentage from( select victim_descent.nationality as race, count(drnumber) as count from crime, victim_descent, area where crime.victim_descent = victim_descent.descent_code and crime.area_id = area.area_id and extract(year from crime.data_occurred) = :year and crime.victim_sex = :sex and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage group by victim_descent.nationality) A, (select count(drnumber) as count from crime, victim_descent, area where crime.victim_descent = victim_descent.descent_code and crime.area_id = area.area_id and extract(year from crime.data_occurred) = :year and crime.victim_sex = :sex and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage) B';

	var binds = {};
	binds.year = req.query.year;
	binds.area = req.query.area;
	binds.minage = req.query.minage;
	binds.maxage = binds.minage + 25;
	binds.sex = req.query.sex;

	var re = await database.simpleExecute(query, binds);


	var piepoints = [];	
	for(var i = 0; i < re.rows.length; i++){
		var pie_point = new Array();
		pie_point[0] = re.rows[i].RACE;
		pie_point[1] = re.rows[i].PERCENTAGE;
		piepoints[i] = pie_point;
	}

	//res.send(piepoints);
	res.render('result4.ejs', {piepoints : piepoints});
	
	
    	});

	app.get("/race", async (req, res) => {
	var query1 = 'select victim_descent.nationality as race, count(drnumber) as count from crime, victim_descent where crime.victim_descent = victim_descent.descent_code and extract(year from crime.data_occurred) = :year and crime.time_occurred > 600 and crime.time_occurred <= 1100 and (victim_descent.nationality = :r1 or victim_descent.nationality = :r2 or victim_descent.nationality = :r3 or victim_descent.nationality = :r4 or victim_descent.nationality = :r5) group by victim_descent.nationality';

	var query2 = 'select victim_descent.nationality as race, count(drnumber) as count from crime, victim_descent where crime.victim_descent = victim_descent.descent_code and extract(year from crime.data_occurred) = :year and crime.time_occurred > 1100 and crime.time_occurred <= 1800 and (victim_descent.nationality = :r1 or victim_descent.nationality = :r2 or victim_descent.nationality = :r3 or victim_descent.nationality = :r4 or victim_descent.nationality = :r5) group by victim_descent.nationality';

	var query3 = 'select victim_descent.nationality as race, count(drnumber) as count from crime, victim_descent where crime.victim_descent = victim_descent.descent_code and extract(year from crime.data_occurred) = :year and crime.time_occurred > 1800 and crime.time_occurred <= 2400 and (victim_descent.nationality = :r1 or victim_descent.nationality = :r2 or victim_descent.nationality = :r3 or victim_descent.nationality = :r4 or victim_descent.nationality = :r5) group by victim_descent.nationality';

	var query4 = 'select victim_descent.nationality as race, count(drnumber) as count from crime, victim_descent where crime.victim_descent = victim_descent.descent_code and extract(year from crime.data_occurred) = :year and crime.time_occurred > 0 and crime.time_occurred <= 600 and (victim_descent.nationality = :r1 or victim_descent.nationality = :r2 or victim_descent.nationality = :r3 or victim_descent.nationality = :r4 or victim_descent.nationality = :r5) group by victim_descent.nationality';

	var binds = {};
	
	binds.year = req.query.year;
	binds.r1 = req.query.race[0];
	binds.r2 = req.query.race[1];
	binds.r3 = req.query.race[2];
	binds.r4 = req.query.race[3];
	binds.r5 = req.query.race[4];

	var a1 = await database.simpleExecute(query1, binds);
	var a2 = await database.simpleExecute(query2, binds);
	var a3 = await database.simpleExecute(query3, binds);
	var a4 = await database.simpleExecute(query4, binds);

	var series = [{},{},{},{}];
	var races = [];
	series[0].name = 'morning';
	series[1].name = 'afternoon';
	series[2].name = 'night';
	series[3].name = 'midnight';
	series[0].data = [];
	series[1].data = [];
	series[2].data = [];
	series[3].data = [];

	for(var i = 0; i < 5; i++){
		races[i] = a1.rows[i].RACE;
	}

	for(var i = 0; i < a1.rows.length; i++){
		series[0].data[i] = a1.rows[i].COUNT;
	}

	for(var i = 0; i < a2.rows.length; i++){
		series[1].data[i] = a2.rows[i].COUNT;
	}

	for(var i = 0; i < a3.rows.length; i++){
		series[2].data[i] = a3.rows[i].COUNT;
	}

	for(var i = 0; i < a4.rows.length; i++){
		series[3].data[i] = a4.rows[i].COUNT;
	}

	var data3 = {};
	data3.races = races;
	data3.series = series;

	//res.send(data3);
	res.render('result3.ejs', {data3 : data3});
	
    	});

	app.get("/crime", async (req, res) => {
	var query1 = 'select crime_type.crime_description as cType, count(drnumber) as count from crime, area, crime_type where crime.time_occurred > 600 and crime.time_occurred <= 1100 and crime.area_id = area.area_id and crime.crime_code = crime_type.crime_code and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage and (crime_type.crime_description = :c1 or crime_type.crime_description = :c2 or crime_type.crime_description = :c3 or crime_type.crime_description = :c4 or crime_type.crime_description = :c5) group by crime_type.crime_description';

	var query2 = 'select crime_type.crime_description as cType, count(drnumber) as count from crime, area, crime_type where crime.time_occurred > 1100 and crime.time_occurred <= 1800 and crime.area_id = area.area_id and crime.crime_code = crime_type.crime_code and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage and (crime_type.crime_description = :c1 or crime_type.crime_description = :c2 or crime_type.crime_description = :c3 or crime_type.crime_description = :c4 or crime_type.crime_description = :c5) group by crime_type.crime_description';

	var query3 = 'select crime_type.crime_description as cType, count(drnumber) as count from crime, area, crime_type where crime.time_occurred > 1800 and crime.time_occurred <= 2400 and crime.area_id = area.area_id and crime.crime_code = crime_type.crime_code and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage and (crime_type.crime_description = :c1 or crime_type.crime_description = :c2 or crime_type.crime_description = :c3 or crime_type.crime_description = :c4 or crime_type.crime_description = :c5) group by crime_type.crime_description';

	var query4 = 'select crime_type.crime_description as cType, count(drnumber) as count from crime, area, crime_type where crime.time_occurred > 0 and crime.time_occurred <= 600 and crime.area_id = area.area_id and crime.crime_code = crime_type.crime_code and area.area_name = :area and crime.victim_age >= :minage and crime.victim_age < :maxage and (crime_type.crime_description = :c1 or crime_type.crime_description = :c2 or crime_type.crime_description = :c3 or crime_type.crime_description = :c4 or crime_type.crime_description = :c5) group by crime_type.crime_description';

	var binds = {};
	binds.area = req.query.area;
	binds.minage = req.query.minage;
	binds.maxage = binds.minage + 25;
	binds.c1 = req.query.crime[0];
	binds.c2 = req.query.crime[1];
	binds.c3 = req.query.crime[2];
	binds.c4 = req.query.crime[3];
	binds.c5 = req.query.crime[4];

	var a1 = await database.simpleExecute(query1, binds);
	var a2 = await database.simpleExecute(query2, binds);
	var a3 = await database.simpleExecute(query3, binds);
	var a4 = await database.simpleExecute(query4, binds);

	var series = [{},{},{},{}];
	var crimes = [];
	series[0].name = 'morning';
	series[1].name = 'afternoon';
	series[2].name = 'night';
	series[3].name = 'midnight';
	series[0].data = [];
	series[1].data = [];
	series[2].data = [];
	series[3].data = [];

	for(var i = 0; i < a1.rows.length ; i++){
		crimes[i] = a1.rows[i].CTYPE;
	}

	for(var i = 0; i < a1.rows.length; i++){
		series[0].data[i] = a1.rows[i].COUNT;
	}

	for(var i = 0; i < a2.rows.length; i++){
		series[1].data[i] = a2.rows[i].COUNT;
	}

	for(var i = 0; i < a3.rows.length; i++){
		series[2].data[i] = a3.rows[i].COUNT;
	}

	for(var i = 0; i < a4.rows.length; i++){
		series[3].data[i] = a4.rows[i].COUNT;
	}

	var data2 = {};
	data2.series = series;
	data2.crimes = crimes;
	//res.send(data2);
	res.render('result2.ejs', {data2 : data2});
	
	
	
    	});

	

	app.get("/month",async (req, res) => {
	var query1 = 'Select extract(month from data_occurred) as month,count(drnumber) as count from crime, area,victim_descent where extract(year from data_occurred) = 2016 and crime.area_id = area.area_id and crime.victim_descent = victim_descent.descent_code and area.area_name = :area and victim_descent.nationality = :nation group by extract(month from data_occurred) order by extract(month from data_occurred) asc';
	var query2 = 'Select extract(month from data_occurred) as month,count(drnumber) as count from crime, area,victim_descent where extract(year from data_occurred) = 2017 and crime.area_id = area.area_id and crime.victim_descent = victim_descent.descent_code and area.area_name = :area and victim_descent.nationality = :nation group by extract(month from data_occurred) order by extract(month from data_occurred) asc';
        var query3 = 'Select extract(month from data_occurred) as month,count(drnumber) as count from crime, area,victim_descent where extract(year from data_occurred) = 2018 and crime.area_id = area.area_id and crime.victim_descent = victim_descent.descent_code and area.area_name = :area and victim_descent.nationality = :nation group by extract(month from data_occurred) order by extract(month from data_occurred) asc';

	binds = {};
	binds.area = req.query.area;
	binds.nation = req.query.nation;


	var a1 = await database.simpleExecute(query1, binds);
	var a2 = await database.simpleExecute(query2, binds);
	var a3 = await database.simpleExecute(query3, binds);

	var series = [{},{},{}];
	series[0].name = '2016';
	series[1].name = '2017';
	series[2].name = '2018';
	series[0].data = [];
	series[1].data = [];
	series[2].data = [];

	for(var i = 0; i < a1.rows.length; i++){
		series[0].data[i] = a1.rows[i].COUNT;
	}

	for(var i = 0; i < a2.rows.length; i++){
		series[1].data[i] = a2.rows[i].COUNT;
	}

	for(var i = 0; i < a3.rows.length; i++){
		series[2].data[i] = a3.rows[i].COUNT;
	}

	res.render('result1.ejs', {data1 : series});

	
    	});
		
	app.get('/login', (req, res) => {
	console.log(req.query);
	res.send('success');
	})
		

	require('../exercise/urihandler')(app);
	require('../exercise/handlerforhello')(app);
	require('../exercise/handlerforhelp')(app);
	require('../exercise/handlerfortest')(app);
	require('../exercise/handlerforarray')(app);
	require('../exercise/handlerfornode')(app);
	require('../exercise/handlerforfunc')(app);	
		
	httpServer.listen(webServerConfig.port)
	.on('listening', () => {
		console.log('Web server listening on localhost');
		console.log(webServerConfig.port);
	});

}

module.exports.initialize = initialize;
