
//--------------
    // Audio Object
    //--------------
    var audio = {
        buffer: {},
        compatibility: {},
        files: [
            'beat1.wav',
            'beat2.wav',
            'beat3.wav',
            'high1.wav',
            'high2.wav',
            'high3.wav',
            'low1.wav',
            'low2.wav'
            
        ],
        proceed: true,
        source_loop: {},
        source_once: {},
    };

    
 var volumeNode;
 var volumeNode;
    //-----------------
    // Audio Functions
    //-----------------
    audio.findSync = function(n) {
        var first = 0,
            current = 0,
            offset = 0;
 
        // Find the audio source with the earliest startTime to sync all others to
        for (var i in audio.source_loop) {
            current = audio.source_loop[i]._startTime;
            if (current > 0) {
                if (current < first || first === 0) {
                    first = current;
                }
            }
        }
 
        if (audio.context.currentTime > first) {
            offset = (audio.context.currentTime - first) % audio.buffer[n].duration;
        }
 
        return offset;
    };


     
 
    audio.play = function(n) {
        if (audio.source_loop[n]._playing) {
           
        } else {
            audio.source_loop[n] = audio.context.createBufferSource();
            audio.source_loop[n].buffer = audio.buffer[n];
            audio.source_loop[n].loop = true;
             audio.source_loop[n].connect(volumeNode);
            volumeNode.connect(audio.context.destination);
            
 
            var offset = audio.findSync(n);
            audio.source_loop[n]._startTime = audio.context.currentTime;
 
            if (audio.compatibility.start === 'noteOn') {
                /*
                The depreciated noteOn() function does not support offsets.
                Compensate by using noteGrainOn() with an offset to play once and then schedule a noteOn() call to loop after that.
                */
                audio.source_once[n] = audio.context.createBufferSource();
                audio.source_once[n].buffer = audio.buffer[n];
                audio.source_once[n].connect(audio.context.destination);
                audio.source_once[n].noteGrainOn(0, offset, audio.buffer[n].duration - offset); // currentTime, offset, duration
                /*
                Note about the third parameter of noteGrainOn().
                If your sound is 10 seconds long, your offset 5 and duration 5 then you'll get what you expect.
                If your sound is 10 seconds long, your offset 5 and duration 10 then the sound will play from the start instead of the offset.
                */
 
                // Now queue up our looping sound to start immediatly after the source_once audio plays.
                audio.source_loop[n][audio.compatibility.start](audio.context.currentTime + (audio.buffer[n].duration - offset));
            } else {
                audio.source_loop[n][audio.compatibility.start](0, offset);
            }
 
            audio.source_loop[n]._playing = true;
        }
    };
 
    audio.stop = function(n) {
        if (audio.source_loop[n]._playing) {
            audio.source_loop[n][audio.compatibility.stop](0);
            audio.source_loop[n]._playing = false;
            audio.source_loop[n]._startTime = 0;
            if (audio.compatibility.start === 'noteOn') {
                audio.source_once[n][audio.compatibility.stop](0);
            }
        }
    };
 
    //-----------------------------
    // Check Web Audio API Support
    //-----------------------------
    try {
        // More info at http://caniuse.com/#feat=audio-api
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audio.context = new window.AudioContext();
         volumeNode = audio.context.createGainNode();
            volumeNode.gain.value = 1;
    } catch(e) {
        audio.proceed = false;
        alert('Web Audio API not supported in this browser.');
    }
 
    if (audio.proceed) {
        //---------------
        // Compatibility
        //---------------
        (function() {
            var start = 'start',
                stop = 'stop',
                buffer = audio.context.createBufferSource();
 
            if (typeof buffer.start !== 'function') {
                start = 'noteOn';
            }
            audio.compatibility.start = start;
 
            if (typeof buffer.stop !== 'function') {
                stop = 'noteOff';
            }
            audio.compatibility.stop = stop;
        })();
 
        //-------------------------------
        // Setup Audio Files and Buttons
        //-------------------------------
        for (var a in audio.files) {
            (function() {
                var i = parseInt(a) + 1;
                var req = new XMLHttpRequest();
                req.open('GET', audio.files[i - 1], true); // array starts with 0 hence the -1
                req.responseType = 'arraybuffer';
                req.onload = function() {
                    audio.context.decodeAudioData(
                        req.response,
                        function(buffer) {
                            audio.buffer[i] = buffer;
                            audio.source_loop[i] = {};
                            
                           
                        },
                        function() {
                            console.log('Error decoding audio "' + audio.files[i - 1] + '".');
                        }
                    );
                };
                req.send();
            })();
        }
    }
$(document).ready(function() {
    
    
});

function StartLoop() {
  /*  var beatNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (beatNum==1) {
     audio.play(1);
     audio.stop(2);
    } else if (beatNum==2) {
     audio.play(2);
     audio.stop(1);
    } else if (beatNum==0) {
         audio.stop(2);
     audio.stop(1);
        audio.play(0);
    }
      
      var leadNum =  Math.floor(Math.random() * (8 - 4 + 1)) + 4;
      for (var i=4;i<8;i++) {
       if (i==leadNum) {
        audio.play(i);
       } else {
        audio.stop(i);   
       }
          
          var luck = Math.random();
          console.log(luck);
         
          
      
          
      }
     var lead2 = leadNum;
          if (luck<.75) {
              while (lead2==leadNum) {
                lead2 =  Math.floor(Math.random() * (8 - 4 + 1)) + 4;  
              }
              for (var i=4;i<8;i++) {
       if (i==lead2) {
        audio.play(i);
       } else {
        audio.stop(i);   
       }
              
          }
          }
    */
    audio.play(2);
}
function Looping() {
   
  var loopTimer = setInterval(function() {
    var beatNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (beatNum==1) {
     audio.play(1);
     audio.stop(2);
 audio.stop(3);
    } else if (beatNum==2) {
     audio.play(2);
     audio.stop(1);
        audio.stop(3);
    } else if (beatNum==0) {
         audio.stop(2);
     audio.stop(1);
        audio.play(3);
    }
      
      var leadNum =  Math.floor(Math.random() * (8 - 4 + 1)) + 4;
      for (var i=4;i<8;i++) {
       if (i==leadNum) {
        audio.play(i);
       } else {
        audio.stop(i);   
       }
          
          var luck = Math.random();
           console.log(luck);
         
          
      
          
      }
       var lead2 = leadNum;
          if (luck<.75) {
              while (lead2==leadNum) {
                lead2 =  Math.floor(Math.random() * (8 - 4 + 1)) + 4;  
              }
              for (var i=4;i<8;i++) {
       if (i==lead2) {
        audio.play(i);
       } else if (i==lead2) {
           //donothing
       } else {
        audio.stop(i);   
       }
              
          }
          }
  
},37500);    
}


function setVolume() {
     volumeNode.gain.value = volume;   
}


     $(function() {
   
             
              $( "#slider" ).slider({
      range: "max",
      min: 0,
      max: 100,
      value: 90,
      slide: function( event, ui ) {
       
          volume=ui.value/100;
          setVolume();
      }
    });
  });