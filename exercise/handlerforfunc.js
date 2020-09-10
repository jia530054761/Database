function prac (req, res) {
	// raw style
	
		//1st Function
		
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
		
		//2nd Function
		
		function checkPalindrome(str) {
			//result = true;>>>>>this way means result is not local var
			//var result = true;//right way 
			const newstr = str.replace(/[\W_]/g, '').toLowerCase()

			if (newstr == newstr.split('').reverse().join('')) {
				return true;
			}
				//result = false;
				return false;
		}
		
		//3rd Function
		
		function contains(array, element) {
	
			for (var i = 0; i < array.length; i++) {
				if (array[i] == element) {
					return true;
					break;
				}
			}
			return false;
		}
			
		//4th Function
		
		function rollDice() {
			return Math.floor(6 * Math.random()) + 1;
	
		}
		
		//5th Function 
		
		//var resultIs = "";
		
		function numberToString(number) {
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
			
			for (let i = num; i > 0; i = Math.floor(i / 10)) {
					digit = digit + 1
				  }
				  for (let i = num; i > 0; i = Math.floor(i / 10)) {
					eachDigit = i % 10
					check = check + Math.pow(eachDigit, digit)
				  }
				  if (check == num) {
					return true; 
				  } else {
					return false;
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
			if (i > 1000){
				return `input not in the range`
			}
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
		var myStr0 = "welcome";
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'>For example, input string:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: green;'>" + myStr0 + "</div></div>");
		res.write("</br>")
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'></br>Output string:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: red;'>" + "</br>"+ capitalizeFirstLetter(myStr0) + "</div></div>");
		
		
		//2nd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Georgia, serif; font-weight: bold; font-size: 20pt;'>2. This function is for checking if input string is palindrome.</br></div>");
		var myStr = "aabbad";
		var myStr1 = "cdc";
		res.write("</br>");
		res.write("<div style= 'text-align:justify;'>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff8080; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + myStr + '&nbsp&nbsp' +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + checkPalindrome(myStr).toString() + '&nbsp&nbsp' + "</div></div>");
		res.write("</br>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: #5cb8ff; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + myStr1 + '&nbsp&nbsp' + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Georgia, serif;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #2e73ff; border: 4px double #1C6EA4;'>" + '&nbsp&nbsp' + checkPalindrome(myStr1).toString() +  '&nbsp&nbsp' + "</div></div>");
		res.write("</div>");
	
		//3rd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Candara; font-weight: bold; font-size: 20pt;'>3. This function is for checking if element exists in array.</br></div>");
		res.write("</br>");
		var myArr = [1, 2, 4, 6, 10, 25];
		var e = 4;
		var e1 = 3;
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + '[' + myArr + ']' + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> ,&nbsp and element is :&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + e +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF;  text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + contains(myArr, e) + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> if element is:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF; text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + e1 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #FFFFFF;  text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;'>" + contains(myArr, e1) + "</div></div>");

		//4th output
		res.write("<div style = 'margin: 20px 0 0 0; font: small-caps 24px/1 sans-serif;font-weight: bold; font-size: 20pt;'>4. This function can generate random dice numbers.</br></div>");
		res.write("</br>");
		rollDice();	
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font: small-caps 24px/1 sans-serif;'> random number:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 5px outset #1C6EA4;'>" + '&nbsp&nbsp' + rollDice().toString() + '&nbsp&nbsp' + "</div></div>");

		//5th output 
		res.write("<div style = 'margin: 20px 0 0 0; font-style: oblique;font-weight: bold; font-size: 20pt;'>5. This function turns numbers into strings.</br></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + 55 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + numberToString(55) + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + 2 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: oblique;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; text-decoration:underline; color: transparent; background: #666666; -webkit-background-clip: text; -moz-background-clip: text; background-clip: text; text-shadow: 0px 3px 3px rgba(255,255,255,0.5);'>" + numberToString(2) + "</div></div>");
		
		//6th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Comic Sans MS, Comic Sans, cursive; font-weight: bold; font-size: 20pt;'>6. This function sums fibonacci sequence.</br></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Comic Sans MS, Comic Sans, cursive;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: red; border: 2px dotted #1C6EA4;'>" + '&nbsp&nbsp' + 5 + '&nbsp&nbsp' + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Comic Sans MS, Comic Sans, cursive;'> Output:&nbsp</div><div style = 'font-family: Times New Roman; color: blue; border: 2px dotted #1C6EA4;'>" + '&nbsp&nbsp' + fibonacciSum(5) + '&nbsp&nbsp' + "</div></div>");
		
		//7th output
		res.write("<div style = 'margin: 20px 0 0 0; font-style: Arial;font-weight: bold; font-size: 20pt;'>7. This function checks if number is armstrong number.</br></div>");	
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'> 154 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'>" + armstrong(154) + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'> 407 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Arial;'> &nbsp&nbsp Output String:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff6659; text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;'>" + armstrong(407) + "</div></div>");

		//8th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Perpetua; font-weight: bold; font-size: 20pt;'>8. This function turns snake case to camel case.</br></div>");
		res.write("</br>");
		var myStr8 = "snake_case";//declare here, closer to function
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Input snake-case string:&nbsp</div><div style = 'font-family: Times New Roman; color: black; text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;'>" + myStr8 + "</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> &nbsp&nbsp Output camel-case string:&nbsp</div><div style = 'font-family: Times New Roman; color: black; text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;'>" + snakeToCamel(myStr8) + "</div></div>");

		//9th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Garamond; font-weight: bold; font-size: 20pt;'>9. This function is to find median of array.</br></div>");
		res.write("</br>");
		var myArr9 = [1, 2, 3, 5, 8];
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Garamond;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #333333; text-shadow: 2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15);  '>" + '[' + myArr9 + ']' +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Garamond;'> &nbsp&nbsp Median:&nbsp</div><div style = 'font-family: Times New Roman; color: #333333; text-shadow: 2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15);'>" + median(myArr9) + "</div></div>");

		//10th output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Candara; font-weight: bold; font-size: 20pt;'>10. This function is to add suffix to number.</br></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman;color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'> 123 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'>" + getOrdinalSuffix(123) + "</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> Input num:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'> 541 </div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Candara;'> &nbsp&nbsp Output:&nbsp</div><div style = 'font-family: Times New Roman; color: #000000; text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;'>" + getOrdinalSuffix(541) + "</div></div>");

		//11st output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Perpetua; font-weight: bold; font-size: 20pt;'>11. This function reverses array in place.</br></div>");
		res.write("</br>");
		var myArr11 = [2, 3, 5, 8, 33, 100];
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Input array:&nbsp</div><div style = 'font-family: Times New Roman; color: #ff669c; text-shadow: 0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);'>" + '[2,3,5,8,33,100]' +"</div></div>");
		res.write("</br>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Perpetua;'> Output array:&nbsp</div><div style = 'font-family: Times New Roman;  color: #ff669c; text-shadow: 0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);'>" + '[' + reverseArrayInPlace(myArr11) + ']' +"</div></div>");

		//12nd output
		res.write("<div style = 'margin: 20px 0 0 0; font-family: Times New Roman; font-style: italic; font-weight: bold; font-size: 20pt;'>12. This function reverses string.</br></div>");	
		res.write("</br>");
		var myStr12 = "HelloWorld"
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'> Input string:&nbsp</div><div style = 'font-family: Times New Roman; color: brown; text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC;'>" + myStr12 +"</div></div>");
		res.write("<div style='display: inline-flex; font-size: 14pt';><div style = 'font-family: Times New Roman;'> &nbsp&nbsp Output string:&nbsp</div><div style = 'font-family: Times New Roman; color: brown; text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC;'>" + reverse(myStr12) + "</div></div>");
		res.write("</div>")
		res.write("</div>")
		res.end();
}

var uriAndHandles = [{handle:"/prac", func:prac}];

module.exports = function(app) {
	uriAndHandles.forEach(function(handle){
		app.get(handle.handle, async(req, res) => handle.func(req, res))
	});
}