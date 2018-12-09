function applicableGraphemes(sp_copy, phonetic_spelling, i, k, l){
	var grapheme_key = phonetic_spelling.slice(i, i+(l-1) == phonetic_spelling.length ? i+(l-1) : i+l);
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
	sp_copy = spelling.slice(0).toUpperCase(); 
	word_copy = word.slice(0).toUpperCase(); 
	// while(sp_copy !== ""){
	k = 0;
	phonetic_spelling = phonetics_dict[word_copy];
	phonetic_spelling = phonetic_spelling.map((x) => x.replace(/[0-9]/g, "").trim());
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
			k += g2[0].length;
			i += 2;
		}else{
			var g1 = applicableGraphemes(sp_copy,phonetic_spelling,i,k,1);
			if(g1.length != 0){
				console.log(g1);
				k += g1[0].length;
				i += 1;	
			}else if(allowSkipInteriorVowels && checkInteriorVowel(phonetic_spelling,i)){
				console.log("THEE");
				i +=1;
			}else{
				return [k,i];		
			}		
		}
		// console.log("G", graphemes);
	}
	if(k < sp_copy.length){
		return [k + 1,i];
	}

	return -1;
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
