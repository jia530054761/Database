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
	app.get("/", async (req, res) => {
	res.render('index.ejs');
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

	app.get("/hello", async(req, res) => {
		// raw style
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<html>");
		res.write("<head><title>Hello World</title></head>");
		res.write("<body><p>Hello world.</p></body>")
		res.write("</html>");
		res.end();
	});

	app.get("/help", async(req, res) => {
		res.type("html");
		res.set({
			'ETag': '12345',
			'meta': 'charset="utf-8"',
		 });
		res.send("<p>Hello world.</p>")
		res.status(200).end();
	});
	
	
	app.get('/test', async (req, res) => {
	    //res.send('This page is for test')	
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<div style='display: inline-flex;'><div style='font-weight:bold;'>Number of Vistors: </div><div style='margin: 0 0 0 20px; color: red;'>" + (++globalcount) + "</div></div>");
		res.end();
		
	});
	
	app.get('/array', async (req, res) => {
	    //res.send('This page is for test')	
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		res.writeHead(200, {'Content-Type': 'text/html'});

		res.write("<div style='margin: 20px 0 0 0;'>The Origin Array:</div>")
		res.write("<div>")
		res.write(arr.toString());
		res.write("</div>")

		delete arr[4]; // This change variable 'arr'
		res.write("<div style='margin: 20px 0 0 0;'>After delete fourth element:</div>")
		res.write("<div>")
		res.write(arr.toString());
		res.write("</div>")

		res.write("<div style='margin: 20px 0 0 0; display:flex;'><div style='color: red;'>Slice</div>&nbsp;from 1 to end:</div>")
		res.write("<div>")
		res.write(arr.slice(1).toString());
		res.write("</div>")

		// the Array splice function is different from slice
		res.write("<div style='margin: 20px 0 0 0; display:flex;'><div style='color: red;'>Splice</div>&nbsp;from 1 to 2 and insert new element 'World':</div>")
		res.write("<div>")
		// NOTE: splice returning the deleted elements
		arr.splice(1,  2, "World");
		res.write(arr.toString());
		res.write("</div>")

		//result = arr.toString();
		res.write("<div style='margin: 20px 0 0 0;'>Output array with forEach function:</div>")
		res.write("<div style='display: inline-flex;'>")
		arr.forEach(function(element){
			res.write("<div style=' margin: 0 0 0 20px;'>" + element + "</div>");
		})
		res.write("</div>")
		//res.write(arr.toString());

		//res.write(arr.push("hello").toString());

		res.end();
	});

	app.get('/node', async (req, res) => {
		var myArr = [0, 1, 2, 3];
		let result = []; // variable result is declared as Array.
		var depth = 3;
	    function flattenWithDepth (array, result, depth) {
			for (var i = 0; i < array.length; i++) {
			  var value = array[i]
		  
			  if (depth > 0 && Array.isArray(value)) {
				flattenWithDepth(value, result, depth - 1)
			  } else {
				result.push(value)
			  }
			}
			return result
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		// invoke function 'flattenWithDepth' 
		flattenWithDepth(myArr, result, depth);
		// Output array 'result' as HTML Table.
		res.write("<table><tr>")
		result.forEach(function(element){
			res.write("<td>" + element + "</td>")
		})
		res.write("</tr></table>");
		res.end();
	});
	
	app.get('/prac', async (req, res) => {
		//1st Function
		var myStr0 = "welcome";
		
		function capitalizeFirstLetter(string) {
			newStr = string.charAt(0).toUpperCase() + string.slice(1)
			return newStr;
		}
		
		//2nd Function
		var myStr = "aabbad"
		var myStr1 = "cdc"
		function checkPalindrome(str) {
			//result = true;>>>>>this way means result is not local var
			var result = true;//right way 
			const newstr = str.replace(/[\W_]/g, '').toLowerCase()

			if (newstr == newstr.split('').reverse().join('')) {
				return result;
			}
				result = false;
				return result;
		}
		
		//3rd Function
		var myArr = [1, 2, 4, 6, 10, 25];
		var e = 4;
		var e1 = 3;
		function contains(array, element) {
			var result = false;
			for (var i = 0; i < array.length; i++) {
				if (array[i] == element) {
					result = true;
					break;
				}
			}
			return result;
		}
			
		//4th Function
		
		function rollDice() {
			return Math.floor(6 * Math.random()) + 1;
	
		}
		
		//5th Function 
		const stringLookup = [
		  {key: 1000000000000000, value: 'quadrillion'},
		  {key: 1000000000000, value: 'trillion'},
		  {key: 1000000000, value: 'billion'},
		  {key: 1000000, value: 'million'},
		  {key: 1000, value: 'thousand'},
		  {key: 100, value: 'hundred'},
		  {key: 90, value: 'ninety'},
		  {key: 80, value: 'eighty'},
		  {key: 70, value: 'seventy'},
		  {key: 60, value: 'sixty'},
		  {key: 50, value: 'fifty'},
		  {key: 40, value: 'forty'},
		  {key: 30, value: 'thirty'},
		  {key: 20, value: 'twenty'},
		  {key: 19, value: 'nineteen'},
		  {key: 18, value: 'eighteen'},
		  {key: 17, value: 'seventeen'},
		  {key: 16, value: 'sixteen'},
		  {key: 15, value: 'fifteen'},
		  {key: 14, value: 'fourteen'},
		  {key: 13, value: 'thirteen'},
		  {key: 12, value: 'twelve'},
		  {key: 11, value: 'eleven'},
		  {key: 10, value: 'ten'},
		  {key: 9, value: 'nine'},
		  {key: 8, value: 'eight'},
		  {key: 7, value: 'seven'},
		  {key: 6, value: 'six'},
		  {key: 5, value: 'five'},
		  {key: 4, value: 'four'},
		  {key: 3, value: 'three'},
		  {key: 2, value: 'two'},
		  {key: 1, value: 'one'},
		]
		//var resultIs = "";
		var input1 = 55;
		

		function numberToString(number) {
			
		if (number <= 0 || number > Number.MAX_SAFE_INTEGER) {
			return 'Number needs to be grater than 0 or less than 2^53-1.'
		}
		
		let result5 = ''; 

		for (const n of stringLookup) {
			if (number >= n.key) {
			  if (number < 100) {
				result5 += n.value
				number -= n.key
				number > 0 ? result5 += ' ' : result5
			  } else {
				const t = Math.floor(number / n.key)
				const d = number % n.key
				return d > 0 ? `${numberToString(t)} ${n.value} ${numberToString(d)}` : `${numberToString(t)} ${n.value}`
			  }
			}
		  }
		  return result5

		}
		
		//6th Function
		
		var myNum6 = 5;
		function fibonacciSum(num) {//0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
			if (num <= 0) {
				return 0
			}
			const fib = []
			fib[0] = 0
			fib[1] = 1
			sum = fib[0] + fib[1]
				// remaining numbers
			for (var i = 2; i <= num; i++) {
				fib[i] = fib[i - 1] + fib[i - 2]
				sum += fib[i]
			}
			
			return sum;
		}
		
		//7th Function
		function armstrong(num) {
			let eachDigit = 0
			let check = 0
			let digit = 0
			var result7 = true
			for (let i = num; i > 0; i = Math.floor(i / 10)) {
					digit = digit + 1
				  }
				  for (let i = num; i > 0; i = Math.floor(i / 10)) {
					eachDigit = i % 10
					check = check + Math.pow(eachDigit, digit)
				  }
				  if (check == num) {
					return result7 
				  } else {
					result7 = false;
					return result7;
				  }
				}
				
		//8th Function
		//snake_case to camelCase
		const regex = /([\-_]\w)/g;
	
		function snakeToCamel(s) {
			return s.replace(regex, function snakeToCamelReplacer(m) {
				return m[1].toUpperCase()
			})
		}
		
		//9th Function
		var myArr9 = [1, 2, 3, 5, 8]
		
		function median(array) {
			if (!Array.isArray(array)) {
				return `${array} is not an array.`
			}
			if (array.some(isNaN)) {
				return `${array} contains non-numeric items.`
			}
			if (array.length == 0) {
				return `${array} has no items.`
			}

			let medianValue = 0
			const sortedArray = array.sort((curr, next) => (curr - next))
			const index = Math.floor(sortedArray.length / 2)

			if (sortedArray.length % 2 === 0) {
				medianValue = (sortedArray[index - 1] + sortedArray[index]) / 2
			} else {
				medianValue = sortedArray[index]
			}

			  return medianValue
		}
		//10th Funciton
		
		function getOrdinalSuffix(i) {
			const j = i % 10
			const k = i % 100
			if (j === 1 && k !== 11) {
				 return `${i}st`
			}
			if (j === 2 && k !== 12) {
				return `${i}nd`
			}
			if (j === 3 && k !== 13) {
				return `${i}rd`
			}
				return `${i}th`	
		}
		
		//11st Function
		var myArr11 = [2, 3, 5, 8, 33, 100];
		
		function reverseArrayInPlace(array) {
			for (let i = 0; i < Math.floor(array.length / 2); i++) {
				const old = array[i]
				array[i] = array[array.length - 1 - i]
				array[array.length - 1 - i] = old
			}
			return array
		}
		
		//12nd Function
		
		function reverse(str) {
			if (str == '') {
				return str
			} else {
				return reverse(str.substr(1)) + str.charAt(0)
				
			}
		}
		
		
		//Head	
		res.write("<div style = 'background-color: #FFE6EE;'>")
		res.write("<div id = 'header'; style = 'text-align:center; font-family: Comic Sans MS, Comic Sans, cursive; font-weight: bold; font-size: 28pt; color: #FFFFFF; text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px;color: #FFFFFF;'>&lt Practice functions &gt</br></div>");
		
		//divide blocks
		//res.write("<div style = '-webkit-column-count: 2;-moz-column-count: 2;column-count: 2;-webkit-column-gap: 30px;-moz-column-gap: 30px;column-gap: 30px;-webkit-column-rule: 1px solid transparent; -moz-column-rule: 1px solid transparent;column-rule: 1px solid transparent;'>")
		
		//1st output 
		//res.write("<div style = 'vertical-align : top'>")
		res.write("<div style = 'margin: 30px 0 0 0; font-family: Times New Roman; font-style: italic; font-weight: bold; font-size: 20pt;'> 1. This function is for capitalizing first letter of string.</br></div>");
		res.write("</br>")
		capitalizeFirstLetter(myStr0);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'>For example, input string:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: green;'>" + myStr0 + "</div></div>");
		res.write("</br>")
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'></br>Output string:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: red;'>" + "</br>"+ newStr + "</div></div>");
		
		
		//2nd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Georgia, serif; font-weight: bold; font-size: 20pt;'>2. This function is for checking if input string is palindrome.</br></div>");
		checkPalindrome(myStr);
		res.write("</br>");
		res.write("<div style= 'text-align:justify;'>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff8080; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + myStr + '&nbsp&nbsp' +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + checkPalindrome(myStr).toString() + '&nbsp&nbsp' + "</div></div>");
		res.write("</br>");
		checkPalindrome(myStr1);
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: #5cb8ff; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + myStr1 + '&nbsp&nbsp' + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #2e73ff; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + checkPalindrome(myStr1).toString() +  '&nbsp&nbsp' + "</div></div>");
		res.write("</div>");
	
		//3rd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Candara; font-weight: bold; font-size: 20pt;'>3. This function is for checking if element exists in array.</br></div>");
		res.write("</br>");
		contains(myArr, e);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + '[' + myArr + ']' + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> ,&nbsp and element is :&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + e +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF;  text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + contains(myArr, e).toString() + "</div></div>");
		res.write("</br>");
		contains(myArr, e1);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> if element is:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + e1 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF;  text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + contains(myArr, e1).toString() + "</div></div>");

		//4th output
		res.write("<div style = 'margin: 20px 0 0 0; font: small-caps 24px/1 sans-serif;font-weight: bold; font-size: 20pt;'>4. This function can generate random dice numbers.</br></div>");
		res.write("</br>");
		rollDice();	
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font: small-caps 24px/1 sans-serif;'> random number:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 5px outset #1C6EA4;'>" + '&nbsp&nbsp' + rollDice().toString() + '&nbsp&nbsp' + "</div></div>");

		//5th output 
		res.write("<div style = 'margin: 20px 0 0 0; font-style: oblique;font-weight: bold; font-size: 20pt;'>5. This function turns numbers into strings.</br></div>");
		res.write("</br>");
		numberToString(input1);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + input1 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + numberToString(input1) + "</div></div>");
		numberToString(2);
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + 2+ "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + numberToString(2) + "</div></div>");
		
		//6th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Comic Sans MS, Comic Sans, cursive; font-weight: bold; font-size: 20pt;'>6. This function sums fibonacci sequence.</br></div>");
		res.write("</br>");
		fibonacciSum(myNum6);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Comic Sans MS, Comic Sans, cursive;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 2px dotted #1C6EA4;'>" + '&nbsp&nbsp' + myNum6 + '&nbsp&nbsp' + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Comic Sans MS, Comic Sans, cursive;'> Output:&nbsp</div><div style = 'font-family: Times New Roman; color: blue; border: 2px dotted #1C6EA4;'>" + '&nbsp&nbsp' + fibonacciSum(myNum6).toString() + '&nbsp&nbsp' + "</div></div>");
		
		//7th output
		res.write("<div style = 'margin: 20px 0 0 0; font-style: Arial;font-weight: bold; font-size: 20pt;'>7. This function checks if number is armstrong number.</br></div>");	
		res.write("</br>");
		armstrong(154);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'> 154 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'>" + armstrong(154).toString() + "</div></div>");
		armstrong(407);
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'> 407 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'>" + armstrong(407).toString() + "</div></div>");

		//8th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Perpetua; font-weight: bold; font-size: 20pt;'>8. This function turns snake case to camel case.</br></div>");
		res.write("</br>");
		var myStr8 = "snake_case";//declare here, closer to function
		snakeToCamel(myStr8);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Input snake-case string:&nbsp</div><div style = 'font-family: Times New Roman; color: black; text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;'>" + myStr8 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> &nbsp&nbsp Output camel-case string:&nbsp</div><div style = 'font-family: Times New Roman; color: black; text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;'>" + snakeToCamel(myStr8) + "</div></div>");

		//9th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Garamond; font-weight: bold; font-size: 20pt;'>9. This function is to find median of array.</br></div>");
		res.write("</br>");
		median(myArr9);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Garamond;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #333333; text-shadow: 2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15);  '>" + '[' + myArr9 + ']' +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Garamond;'> &nbsp&nbsp Median:&nbsp</div><div style = 'font-family: Times New Roman; color: #333333; text-shadow: 2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15);'>" + median(myArr9).toString() + "</div></div>");

		//10th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Candara; font-weight: bold; font-size: 20pt;'>10. This function is to add suffix to number.</br></div>");
		res.write("</br>");
		getOrdinalSuffix(123);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman;color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'> 123 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'>" + getOrdinalSuffix(123).toString() + "</div></div>");
		res.write("</br>");
		getOrdinalSuffix(541);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'> 541 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'>" + getOrdinalSuffix(541).toString() + "</div></div>");

		//11st output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Perpetua; font-weight: bold; font-size: 20pt;'>11. This function reverses array in place.</br></div>");
		res.write("</br>");
		reverseArrayInPlace(myArr11);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff669c; text-shadow: 0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);'>" + '[2,3,5,8,33,100]' +"</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Output array:&nbsp</div><div style = 'font-family: Times New Roman;  color: #ff669c; text-shadow: 0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);'>" + '[' + myArr11.toString() + ']' +"</div></div>");

		//12nd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Times New Roman; font-style: italic; font-weight: bold; font-size: 20pt;'>12. This function reverses string.</br></div>");	
		res.write("</br>");
		var myStr12 = "HelloWorld"
		reverse(myStr12);
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: brown; text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC;'>" + myStr12 +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'> &nbsp&nbsp Output string:&nbsp</div><div style = 'font-family: Times New Roman; color: brown; text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC;'>" + reverse(myStr12) + "</div></div>");
		
		res.write("</div>")
		res.write("</div>")
		res.end();
		
	});
	
	
	httpServer.listen(webServerConfig.port)
	.on('listening', () => {
		console.log('Web server listening on localhost');
		console.log(webServerConfig.port);
	});

}

module.exports.initialize = initialize;
