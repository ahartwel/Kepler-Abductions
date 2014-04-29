 var planets = new Array();
var numOfSketches=0;
var justStarted=true;
 var planetSize = 400; 
   $(document).ready(function(){
function loadPlanetsUp() {      
var proImage;
var theStory;

    
    

    
    
      $.jsonp({
    url: 'http://www.asterank.com/api/kepler?query={%22TPLANET%22:{%22$lt%22:4000,%22$gt%22:200},%22RPLANET%22:{%22$lt%22:1.8,%22$gt%22:0.4},%22RSTAR%22:{%22$lt%22:1.8,%22$gt%22:0.4}}&limit=14', // any JSON endpoint
   
    success: function(data){
     
       
        var high = data.length;
        var rP = Math.floor(Math.random() * (high - 0 + 1)) + 0;
          var theDiv = 0;
          var currentDiv = 0;
        for (var i = 0; i<data.length; i++) {
            planets[i] = data[i];
            currentDiv=0;
           
            $(".planetsNav").each(function() {
                if (currentDiv==i) {
        
            $(this).addClass("keep");
            var canvasRef = document.createElement('canvas');
            var p = Processing.loadSketchFromSources(canvasRef, ['planet.pjs']);
                   
  $('#loader').append(canvasRef);
                    $(canvasRef).attr("id","planet"+i);
            $(this).append(canvasRef)
                   
            }
                currentDiv++;
               
            });
          
        }
       
        
         $(".planetsNav").each(function() {
            if ($(this).hasClass("keep")) {
                           
            } else {
                $(this).remove();
                
            }
        
            setPlanetText(0);
             
    });
        Processing.reload()
        
    }
    // error, etc.
  });
}
       
       loadPlanetsUp();
       
       
    });


function processingLoader() {
    
    
       numOfSketches++;
       
    

        if (numOfSketches==planets.length) {
             var widthOfSketch = document.getElementById('sideNavContent').offsetWidth;
            console.log(widthOfSketch);
          for (var i = 0; i<planets.length-1; i++) {
            
                 var id="planet"+i;
                 
              
             var pjs = Processing.getInstanceById(id);
              
            
                 
              pjs.resizer(widthOfSketch, i);
              
             }
            console.log("success!");
            $(".planetsNav").last().remove();
            $(".planetsNav").first().addClass("selected");
            $(".loadingIcon").each(function() {
                
               $(this).remove(); 
                
            });
           var pjs = Processing.getInstanceById("thePlanet");
              
              console.log(pjs);
                 
              pjs.resizer(planetSize, 0);
            $("#thePlanetDiv").addClass("planetSpin");
            
          
        var theTimer=setInterval(function() {
            if (audio.buffer[6]!=null) {
                 clearInterval(theTimer);
                StartLoop();
                Looping();
    /* var beatNum =  Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    if (beatNum==1) {
     audio.play(1);
     audio.stop(2);
    audio.stop(0);
    } else if (beatNum==2) {
     audio.play(2);
     audio.stop(1);
        audio.stop(0);
    } else if (beatNum==0) {
         audio.stop(2);
     audio.stop(1);
        audio.play(0);
    }
      
      var leadNum =  Math.floor(Math.random() * (7 - 3 + 1)) + 3;
      for (var i=3;i<5;i++) {
       if (i==leadNum) {
        audio.play(i);
       } else {
        audio.stop(i);   
       }
          
      }
   */
            }
        },1000);
    }
             
}




function changePlanet(planNum) {
   
   var pjs = Processing.getInstanceById("thePlanet");
              
     console.log(pjs);
                 
       pjs.resizer(planetSize, planNum);
    
  
}




$(".planetsNav").click(function(){
 var plantNum = $(this).attr("Number");
 changePlanet(plantNum);
    $(".planetsNav").each(function() {
     if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");   
     }
    });
    $(this).addClass("selected");
       setPlanetText(plantNum);
    
      setStory(plantNum);
    
});

function setStory(plantNum) {
        for (var i = 0; i < xmlDoc.feed.entries.length; i++) {
        if (i==plantNum) {
          $(".story"+i).show();  
        } else {
            $(".story"+i).hide();
            
        }
        } 
    
}
function setPlanetText(plantNum) {
      $( "#name" ).html("Kepler ID: " + planets[plantNum].KOI);
         $( "#radius" ).html("Radius(Earth Radii): " + planets[plantNum].RPLANET);
         $( "#sRadius" ).html("Stellar Radius(Sol Radii): " + planets[plantNum].RSTAR);
         $( "#temp" ).html("Equilibrium Temperature: " + planets[plantNum].TPLANET + "K");
         $( "#sTemp" ).html("Equilibrium Temperature of Host Star: " + planets[plantNum].TSTAR + "K");
    
    
    
}
