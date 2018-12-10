function applicableGraphemes(sp_copy, phonetic_spelling, i, k, l){
	var grapheme_key = phonetic_spelling.slice(i, i+(l-1) == phonetic_spelling.length ? i+(l-1) : i+l);
	if(grapheme_key.length != l) return [];
	var graphemes = []
	if(grapheme_key in grapheme_dict){
		graphemes = grapheme_dict[grapheme_key];
		graphemes = [...new Set(graphemes)]; 
		graphemes = graphemes.filter(function (g){
			return sp_copy.indexOf(g,k) == k;
		});
	}
	//sort descending
	graphemes = graphemes.sort(function(a, b){
	  	return b.length - a.length;
	});
	return graphemes;
}

function checkInteriorVowel(phonetic_spelling,i){
	if(i === 0) return false;
	if(phones_dict[phonetic_spelling[i]]["type"] === "vowel"){
		for (var j = i+1; j < phonetic_spelling.length; j++) {
			if(phones_dict[phonetic_spelling[j]]["type"] !== "vowel"){
				return true;
			}
		}
	}
	return false;
}



function firstError(word,spelling, allowSkipInteriorVowels=false){
	//Outut [correct, letter_first_error, phone_first_error, pronunciation_whole_spelling]
	sp_copy = spelling.slice(0).toUpperCase(); 
	word_copy = word.slice(0).toUpperCase(); 
	// while(sp_copy !== ""){
	k = 0;
	phonetic_spelling = phonetics_dict[word_copy];
	phonetic_spelling = phonetic_spelling.map((x) => x.replace(/[0-9]/g, "").trim());

	var phones_sofar = new Array();
	for (var i = 0; i < phonetic_spelling.length; ) {
		// var grapheme_key1 = phonetic_spelling[i];
		// var grapheme_key2 = phonetic_spelling.slice(i, i+1 == phonetic_spelling.length ? i+1 : i+2);
		// console.log(grapheme_key2);
		// var graphemes = grapheme_dict[grapheme_key1];
		// if(grapheme_key2 in grapheme_dict){
		// 	graphemes.concat(grapheme_dict[grapheme_key2]);
		// }
		// graphemes = [...new Set(graphemes)]; 
		// graphemes = graphemes.filter(function (g){
		// 	return sp_copy.indexOf(g,k) == k;
		// });
		var g2 = applicableGraphemes(sp_copy,phonetic_spelling,i,k,2);
		if(g2.length != 0){
			console.log(g2);
			phones_sofar.push(phonetic_spelling[i]);
			phones_sofar.push(phonetic_spelling[i+1]);
			// if(phones_sofar.slice(-1)[0]){
			// 	alert("NOOOOP");
			// }
			k += g2[0].length;
			i += 2;
		}else{
			var g1 = applicableGraphemes(sp_copy,phonetic_spelling,i,k,1);
			if(g1.length != 0){
				
				phones_sofar.push(phonetic_spelling[i]);
				// console.log(phonetic_spelling[i], i, phonetic_spelling.length);
				// if(isNaN(phones_sofar.slice(-1)[0])){
				// 	alert("NOOOOP2");
				// }

				k += g1[0].length;
				i += 1;	
			}else if(allowSkipInteriorVowels && k != sp_copy.length && checkInteriorVowel(phonetic_spelling,i)){
				console.log("THEE", k, sp_copy.length);
				i +=1;
			}else{
				var output_phones = phones_sofar.slice(0);
				// console.log("PRELOG1", output_phones);
				for (var j = k; j < spelling.length; j++) {
					// console.log(spelling[j]);
					var pns = default_phones_dict[spelling[j].toUpperCase()];
					// console.log("LOG1", pns);
					pns.forEach(function (x){output_phones.push(x);});
					// console.log(output_phones);
				}
				return [false,k,i,output_phones];		
			}		
		}
		// console.log("G", graphemes);
	}
	if(k < sp_copy.length){
		var output_phones = phonetic_spelling.slice(0);
		// console.log("PRELOG2", output_phones);
		for (var j = k; j < spelling.length; j++) {
			var pns = default_phones_dict[spelling[j].toUpperCase()];
			// console.log("LOG2", spelling[j],pns);
			pns.forEach(function (x){output_phones.push(x);});
			// console.log(output_phones);
		}

		return [false, k ,phonetic_spelling.length, output_phones];
	}

	return [true,k,i,phones_sofar];
}


function start(){
	console.log("start");
	// firstE = firstError("sheets", "sheets",true);
	// firstE = firstError("TROUBLE", "TRUBOL");
	// firstE = firstError("TROUBLE", "TRBL", true);
	// console.log("DONE", firstE);
}

$( document ).ready(function() {
	document.addEventListener("PHONICS_ASSETS_LOADED", start);
});
