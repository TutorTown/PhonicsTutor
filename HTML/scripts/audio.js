// var x = new Audio("horse.mp3");//document.getElementById("myAudio"); 
// var y = new Audio("horse.mp3");//document.getElementById("myAudio");

var playing = false;

var errorSound = new Audio(audioDir+"/error.mp3");

function handleAudio(arr,init=false){
	console.log("HANDLE", arr);
    if(init && playing) return;
	if(arr.length === 0){
        playing = false;
        return;  
    }
    playing = true;

    // console.log(arr);
	var sound = arr.shift();

    
    // if(typeof sound == "object"){
    //     console.log(sound);
    //     alert("SOUND NOT STRING");
    // }

    if(isNaN(parseInt(sound))){
        if(typeof sound === 'string'){
            //Split up sentences
            var splitup = sound.split(/[\t ,]+/)
            if(splitup.length > 1){
                sound = splitup.shift();
                arr = splitup.concat(arr);
            }

            if(sound in phones_dict){
                sound = phones_dict[sound]["audio"];  
            }else if(sound[0] === "~"){
                sound = sound.substring(1).toUpperCase();
                // console.log(sound);
                if(sound in phonetics_dict){
                    var phonetic_spelling = phonetics_dict[sound];
                    phonetic_spelling = phonetic_spelling.map((x) => x.replace(/[0-9]/g, "").trim());
                    handleAudio(phonetic_spelling.concat(arr));
                    // console.log("THIS HAPPENED");
                }else{
                    alert("WORD NOT IN DICT: ", sound);
                }
                return;
            }else if(sound[0] === "!"){
                sound = sound_dict[sound.slice(1)];
            }else if(sound in sound_dict){
                // alert("NOT IMPLEMENETED");
                sound = sound_dict[sound];
            }else{
                // console.log("G".length, sound.length);
                // console.log("G".charCodeAt(0), sound.charCodeAt(0));
                // console.log(sound, "G" in phones_dict, sound.toString() in phones_dict, typeof sound, phones_dict[sound]);
                alert("NO SOUND: ", sound);
                return;
            }
        } 
        if(typeof sound === 'string'){
            console.log("PROMBLEM");
        }

        if(isNaN(sound.duration)){
            //The sound hasn't loaded so try again in a second
            setTimeout(function (){handleAudio([sound].concat(arr))} ,100); 
        }else{
            //The sound is a sound so play it
            sound.play();     
            // console.log(sound.duration);
            setTimeout(function (){handleAudio(arr)}  ,(1000*sound.duration));
        }
    }else{
        //The sound is a pause
        setTimeout(function (){handleAudio(arr)}  ,(sound));
    }
}

function playAudioFromText(x) {
    console.log("PLAY",x);

    if(typeof x === "string"){
        handleAudio(x.split(/[\t ,]+/), true);    
    }else if(typeof x === "object"){
        handleAudio(x.slice(0), true);    
    }else{
        throw("Incompatable type " + typeof x);
    }
    
} 

function pauseAudio() { 
    x.pause(); 
} 










