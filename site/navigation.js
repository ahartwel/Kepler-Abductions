$('#sideNavButton').click(function() {
        
        if ($("#sideNav").hasClass("sideNavCollapsed")) {
             $("#sideNav").removeClass("sideNavCollapsed");
            $("#planetInfo").removeClass("moveToTheLeft2");
            $("#menuToggler").addClass("flipped");
            $(".moveToTheLeft").removeClass("moveToTheLeft");
           
        } else {
      $("#sideNav").addClass("sideNavCollapsed");
              $("#planetInfo").addClass("moveToTheLeft2");
              $("#menuToggler").removeClass("flipped");
            $("#thePlanetDiv").addClass("moveToTheLeft");
        }
    });
        
        
    $("#bottomNav span").click(function() {
         $(".selected").each(function() {
             $(this).removeClass("selected");
         });
        
        $(this).addClass("selected");
       
        if (this.id=="whatisthis") {
         if ($(this).hasClass("aboutFull")) {
            $("#about").removeClass("aboutFull"); 
             $(this).removeClass("selected");
             $("#keplerNav").addClass("selected");
         } else {
             $("#about").addClass("aboutFull"); 
         }
        } else {
            $("#about").removeClass("aboutFull"); 
            if (this.id=="randomNav") {
                
                 var planetNum = Math.floor(Math.random() * (planets.length-1 - 0)) + 0;
                changePlanet(planetNum);
                setPlanetText(planetNum);
                setStory(planetNum);
                var numm = 0;
                $(".planetsNav").each(function() {
                  
                    if (numm==planetNum) {
                        $(this).addClass("selected");
                        setTimeout(function() {
                        $("#randomNav").removeClass("selected");
                        $("#keplerNav").addClass("selected");
                    },700);
                                   
                                   }
                    numm++;
                });
            }
            
        }
       
       
        
        
        
    
    });
    
        //TweenMax.to($(".backimg"),2000,{rotation:360, repeat:-1, ease: Linear.easeNone});