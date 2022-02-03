$(document).on('ready', function() {
    $("nav ul li a").on('click', function() {
        var target = $("#" + $(this).attr("data-id"))
        target.siblings().hide('slow')
        target.show('slow')
    })
    $.getJSON("public/cfa.json", function(data) {
        //setup map
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        //plot markers
        data.forEach(function(d) {
            console.log(d)
            var myLatLng = new google.maps.LatLng(Number(d.lat), Number(d.long));
            var marker = new google.maps.Marker({ // Set the marker
                position: myLatLng, // Position marker to coordinates
                map: map, // assign the market to our map variable
                title: "SYD"
            });
            var contentString = '<div class="infoWindow"><h2>' + d.name + "<br>" + d.code + '</h2>' + '<img class="small-img" src="' + d.image_path + '" />' + '<p>' + d.description + '</p></div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        })
        //quiz code
        var correct; //selected carpet for display
        var list = data;
        clone = list.slice(0); //clone is used to get fillers
        var total = list.length;
        var numCorrect = 0;
        var numIncorrect = 0;
        $("#correct").html(numCorrect);
        $("#incorrect").html(numIncorrect);
        $("#remaining").html(total);
        //at page load, call the generating function to create initial question
        generateOptions();
        //calculate and display input file size
        //listen for the continue click
        $('#continue').on('click', function() {
            //display finished message or call generating function again
            //hide and clear divs
            $("#answer").hide("slow").empty();
            $("#options").hide("slow").empty();
            $("#continue").hide("slow");
            generateOptions();
        });

        function generateOptions() {
            var obj = {};
            //select a random one from list
            rand = Math.floor(Math.random() * list.length);
            var random = list[rand];
            obj[random.code] = random;
            correct = random;
            //remove it from the list
            list.splice(rand, 1);
            while(Object.keys(obj).length < 4) {
                //fill up the remaining options from clone list
                rand = Math.floor(Math.random() * clone.length);
                var random = clone[rand];
                obj[random.code] = random;
            }
            $("#display").fadeOut(400, function() {
                $("#display").html("<img class='img img-rounded carpet' src=" + correct.image_path + " />");
            }).fadeIn(400);
            //transfer objects to array and shuffle
            randomized = [];
            for(var opt in obj) {
                randomized.push(obj[opt]);
            }
            shuffle(randomized);
            //display multiple choice
            $("#options").append("<p class='lead'>This carpet comes from:</p>");
            for(var i = 0; i < randomized.length; i++) {
                $("#options").append('<div class="radio"><input type="radio" id="' + randomized[i].code + '">' + randomized[i].code + " - " + randomized[i].name + '</div>');
            }
            $("#options").show("slow");
            //listen for clicks on the options
            $('input:radio').on('change', function() {
                //check if response is correct
                if($(this).attr('id') == correct.code) {
                    console.log("correct");
                    $("#answer").append('<div class="alert alert-success">Correct!  You selected ' + $(this).attr('id') + '.</div>');
                    numCorrect += 1;
                    $("#correct").html(numCorrect)
                } else {
                    console.log("incorrect");
                    $("#answer").append('<div class="alert alert-danger">Incorrect!  You selected ' + $(this).attr('id') + '.</div>');
                    numIncorrect += 1;
                    $("#incorrect").html(numIncorrect)
                }
                $("#remaining").html(list.length).width(list.length / total * 100 + "%");
                //hide options
                $("#options").hide('slow');
                //show description/answer/continue
                $("#answer").append("<h2>" + correct.code + " <small>" + correct.name + "</small></h2>")
                $("#answer").append(correct.description).show('slow');
                $("#continue").show();
            });
        }

        function shuffle(o) { //v1.0
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
    })
})