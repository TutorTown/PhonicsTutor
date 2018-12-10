var sound_dict = {};
var sounds_loaded = false;
var phones_dict = null;
var phonetics_dict = null;
var grapheme_dict = null;
var default_phones_dict = null;
var default_letters_dict = null;
// var global_sounds = [];

console.log("THIS HREF:", window.location.href);


var AssetsDir = window.location.href.split("HTML/")[0] + "HTML/Assets";

var audioDir = "./Assets/sounds";

// function filesFromDir(dir,fileextension, callback){
//     $.ajax({
//         //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//         url: dir,
//         success: function (data) {
//             //List all .png file names in the page
//             // console.log("THESE SOUNDS");
// // 
//             $(data).find("a:contains(" + fileextension + ")").each(function () {
//                 var filename = dir + "/" + this.href.split("/").slice(-1)[0];
//                 callback(filename);
//                 // console.log(this.href);
//                 // console.log(filename);
//             });
//             sd_count++;
//             signalLoad();
//         }
//     });
// }

function addToSoundDict(sound_path){
    var name = sound_path.split("/").slice(-1)[0].replace(".mp3", "");
    console.log(name, sound_path);
    sound_dict[name] = new Audio(sound_path);
}

function loadSounds(){
    jQuery.get('./Assets/sounds/soundslist', function(data){
        data.split("\n").forEach(function(x){
            console.log("ASSSET", x);
            var sf = './Assets/sounds' + x.slice(1);
            console.log("ASSSET", sf);
            // jQuery.get(sf, function(data){
            addToSoundDict(sf);
            // });
        });
        sounds_loaded = true;
        signalLoad();
        // console.log(phones_dict);
        // handleAudio(["G","R","EH","G", 50, "AY", 50, "AE", "M", 50, "EY", 50, "K", "AH", "M", "P" ,"Y", "UW", "T", "ER"]);
    });
    // var dir = "Assets/sounds/words";
    // var fileextension = ".mp3";

    // var sounds = [];
    // filesFromDir(AssetsDir+"/sounds/words/", ".mp3", addToSoundDict);
    // filesFromDir(AssetsDir+"/sounds/prompts/", ".mp3",addToSoundDict);
    // filesFromDir(AssetsDir+"/sounds/letters/", ".mp3",addToSoundDict);
    // console.log(sounds);
    // for (var i = 0; i < sounds.length; i++) {
    //     var sound_path = sounds[i];
    //     console.log(sound_path);
        
    // }

    
}

function loadPhones(){
    jQuery.get(AssetsDir + '/data_dicts/cmudict-0.7b.phones', function(data){
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
    jQuery.get(AssetsDir + '/data_dicts/cmudict-0.7b', function(data){
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
    jQuery.get(AssetsDir + '/data_dicts/grapheme_dict', function(data){
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
    jQuery.get(AssetsDir + '/data_dicts/default_phones', function(data){
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

function loadDefaultLetters(){
    jQuery.get(AssetsDir + '/data_dicts/default_letters', function(data){
        default_letters_dict = {};
        data.split("\n").forEach(function(x){
            //console.log(x);
            var lr = x.split(":"); 
            console.log(lr);
            var left = lr[0].split(/[\t ,]+/).filter(Boolean);
            left = left.map(function(x){ return x.toUpperCase() });
            var right = lr[1].split(/[\t ,]+/).filter(Boolean); //filter(Boolbean)
            right = right.map(function(x){ return x.toUpperCase() });
            // console.log(left, right);
            default_letters_dict[left] = right;
        });
        console.log("SICK MEEMMEES",default_letters_dict);
        signalLoad();
    });
}

function signalLoad(){
    console.log("SIGNAL LOAD");
    if(sounds_loaded && phones_dict && phonetics_dict && grapheme_dict && default_phones_dict && default_letters_dict){
        var event = new Event("PHONICS_ASSETS_LOADED");
        document.dispatchEvent(event);
        // playAudioFromText("~table");// ~it ~is ~danny 300 ~I ~am ~a ~computer 500 ~do ~not ~worry ~I ~am ~still ~here 500 ~goodbye");
    }
}

function toNext(){
    var urlParams = new URLSearchParams(window.location.search);
    var move_num = urlParams.get('mov_num');
    var next_num = parseInt(move_num) + 1;
    var url = '../movie' + next_num + ".html";

    $.get(url)
    .done(function() { 
        // exists code
        setTimeout(function(){
            window.location=url;
        }, 100); 
    }).fail(function() { 
        url = '../end.html';
        setTimeout(function(){
            window.location=url;
        }, 100); 
    });
}



$( document ).ready(function() {
    // loadDefaultPhones();
    // document.addEventListener("PHONICS_ASSETS_LOADED", function(e) {
        
    // });
    // loadPhones();    
    // loadPhonetics();
    // loadGraphemes();

});

