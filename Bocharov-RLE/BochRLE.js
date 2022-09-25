let fs = require("fs");
let [,,operation, esc_symbol, input, output] = [...process.argv];
if (operation == "encode"){
	let count = 1;
	let result = "";
	inText = fs.readFileSync(input, "utf8");
	inText = inText.toString();
	
	for(let i = 0; i < inText.length; i++){
		if(inText[i] == inText[i+1] && count < 255) count++;
		
		else if (count > 3 || inText[i] == esc_symbol){
				result += esc_symbol + String.fromCharCode(count) + inText[i];
				count = 1;
			}
			else{
				result += inText[i].repeat(count);
				count = 1;
			}
		
	}
	fs.writeFileSync(output, result);
	

}

else{
	let i = 0;
	let result = "";
	inCode = fs.readFileSync(input, "utf8");
	inCode = inCode.toString();
	
	while (i != inCode.length){
		if(inCode[i] == esc_symbol){
			result += inCode[i + 2].repeat(inCode[i + 1].charCodeAt(0));
			i += 3;
		}
		else{
			result += inCode[i];
			i++;
		}
	}
	fs.writeFileSync(output, result);
	
}
