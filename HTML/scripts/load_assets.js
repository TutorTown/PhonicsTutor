var sound_dict = {};
var phones_dict = null;
var phonetics_dict = null;
var grapheme_dict = null;
var default_phones_dict = null;

var audioDir = "Assets/sounds";


function loadPhones(){
    jQuery.get('Assets/data_dicts/cmudict-0.7b.phones', function(data){
        phones_dict = {};
        data.split("\n").forEach(function(x){
            //console.log(x);
            args = x.split(/[\t ,]+/);
            if(args.length == 2){
                phones_dict[args[0]] =  {"type":args[1], "audio":new Audio(audioDir+"/phones/" + args[0] + ".mp3")};    
            }
        });
        signalLoad();
        // console.log(phones_dict);
        // handleAudio(["G","R","EH","G", 50, "AY", 50, "AE", "M", 50, "EY", 50, "K", "AH", "M", "P" ,"Y", "UW", "T", "ER"]);
    });
};

function loadPhonetics(){
    jQuery.get('Assets/data_dicts/cmudict-0.7b', function(data){
        phonetics_dict = {};
        data.split("\n").forEach(function(x){
            //console.log(x);
            args = x.split(/[\t ,]+/);
            if(args.length > 1 && args[0] != ";;;"){
                var word = args.shift();
                phonetics_dict[word] = args;
            }
        });
        // console.log("MEHH",phonetics_dict["GREG"]);
        signalLoad();
        // handleAudio(["G","R","EH","G", 50, "AY", 50, "AE", "M", 50, "EY", 50, "K", "AH", "M", "P" ,"Y", "UW", "T", "ER"]);
    });
}

function loadGraphemes(){
    jQuery.get('Assets/data_dicts/grapheme_dict', function(data){
        grapheme_dict = {};
        data.split("\n").forEach(function(x){
            //console.log(x);
            var lr = x.split(":"); 
            var left = lr[0].split(/[\t ,]+/).filter(Boolean);
            left = left.map(function(x){ return x.toUpperCase() });
            var right = lr[1].split(/[\t ,]+/).filter(Boolean); //filter(Boolbean)
            right = right.map(function(x){ return x.toUpperCase() });
            // console.log(left, right);
            grapheme_dict[left] = right;
        });
        // console.log("MEHH",grapheme_dict);
        signalLoad();
    });
}

function loadDefaultPhones(){
    jQuery.get('Assets/data_dicts/default_phones', function(data){
        default_phones_dict = {};
        data.split("\n").forEach(function(x){
            //console.log(x);
            var lr = x.split(":"); 
            var left = lr[0].split(/[\t ,]+/).filter(Boolean);
            left = left.map(function(x){ return x.toUpperCase() });
            var right = lr[1].split(/[\t ,]+/).filter(Boolean); //filter(Boolbean)
            right = right.map(function(x){ return x.toUpperCase() });
            // console.log(left, right);
            default_phones_dict[left] = right;
        });
        console.log("SICK MEEMMEES",default_phones_dict);
        signalLoad();
    });
}

function signalLoad(){
    console.log("SIGNAL LOAD");
    if(phones_dict && phonetics_dict && grapheme_dict && default_phones_dict){
        var event = new Event("PHONICS_ASSETS_LOADED");
        document.dispatchEvent(event);
        // playAudioFromText("~table");// ~it ~is ~danny 300 ~I ~am ~a ~computer 500 ~do ~not ~worry ~I ~am ~still ~here 500 ~goodbye");
    }
}



$( document ).ready(function() {
    // loadDefaultPhones();
    // document.addEventListener("PHONICS_ASSETS_LOADED", function(e) {
        
    // });
    // loadPhones();    
    // loadPhonetics();
    // loadGraphemes();

});

