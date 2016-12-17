var text ="";
var date = new Date();
var day = date.getDay();
var weekDays = ["DOMENICA","LUNEDI","MARTEDI","MERCOLEDI","GIOVEDI","VENERDI","SABATO"];
//var ourDays = ["IERI, OGGI, DOMANI"];


// funzione inizializzazione mappa di Google
function initMap() {
        var uluru = {lat:45.447794, lng:9.198952};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
    	});
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
    }





function uploadProgram (date, day){

	$(".o-wrapper__guide__showContainer").empty();

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var urlGuida = "";
	var hS = "";
	var minS = "";

	if (date.getDay()!=day){
		hours = 0;
	}

	for (var i =1+day; i <= 20+day; i=i+2) {

		// 16 Nov ore 18:35 modificato url api con MOVIE invece di TV
		urlGuida = "https://api.themoviedb.org/3/movie/"+ i +"?api_key=5161f242dc03bc9b9fd17280edc9945f&language=it";

		$.get(urlGuida, function(data){

			// controllo HOURS per aggiungere lo 0 nel caso avessero solo un numero
			if (hours<10){
				hS = hours.toString();
				hS= "0"+hS;
			} else {
				hS = hours.toString();
			}

			// controllo MINUTES per aggiungere lo 0 nel caso avessero solo un numero
			if (minutes<10){
				minS = minutes.toString();
				minS= "0"+minS;
			}
			else {
				minS = minutes.toString();
			}

			// riduco a 140 caratteri la lunghezza della descrizione
			if ((data.overview).length > 140){
				description = (data.overview).substring(0, 140);
			} else if (data.overview ==""){
				description = "Descrizione non disponibile";
			}

			else {
				description = data.overview;
			}

			// Esco dal ciclo se le ore superano le 23
			if (hours>23){
				//hours= hours%24;
				return;
			}

			var title = (data.original_title).toUpperCase();

			$(".o-wrapper__guide__showContainer").append('<section class="guide__item styleGuide-program"><section class="guide__item__hour styleGuide-hour"><h3 class="guide__item__hour__txt">'+ hS +':'+ minS +'</h3></section><section class="guide__item__title"><h4><a href="program/'+ data.id +'" class="guide__item__title__text">'+ title +'</a></h4><h5>'+ description +'</h5></section></section></section>');

			console.log('HO APPESO IL TESTO');

			// implemento la durata del programma alla guida per definire l'orario dìinizio del programam successivo
			// con TV nell'API minutes = minutes + data.episode_run_time[0]%60;

			if (data.runtime!=""){
				minutes = minutes + data.runtime%60;
				hours = hours + parseInt(data.runtime/60);

				// Normalizzo MINUTES
				if (minutes>59){
					hours = hours + parseInt(minutes/60);
					minutes = minutes%60;
				}
			} else {
				hours++;
			}

		});
	}
}


function setDay(){
	/*if ((date.getDay())==day){

	}*/

	if ((date.getDay())==day){
		$(".daySlider__day").html("<h2>OGGI</h2>");
	}
	else {
		$(".daySlider__day").html("<h2>"+ weekDays[day]+ "</h2>");
	}
	uploadProgram (date, day);
}


// CARICAMENTO DELLA PAGINA
$(function(){

	$(".o-popUp").fadeOut(1000, function(){
		$(".o-popUp").css("display", "none");
		$(".o-popUp__inside").css("display", "block");
	});

	setDay();


	$(".btnDaySlider-right").click(function(){
		if (day==6){
			day = 0;
		}
		else {
			day++;
		}
		setDay ();

	});

	$(".btnDaySlider-left").click(function(){
		if (day==0){
			day = 6;
		}
		else {
			day--;
		}
		setDay ();
	});


	// TOGGLE DELLE FORM - AREA CLIENTI
	$(".o-wrapper__form-accedi").click(function(){
		//$(".hidden__form-accedi").toggle('slow');
		$(".hidden__form-accedi").show('slow');
	});
	$("#btnAccess").click(function(){
		//$(".hidden__form-accedi").toggle('slow');
		$(".hidden__form-accedi").hide('slow');
	});

	$(".o-wrapper__form-registra").click(function(){
		//$(".hidden__form-registra").toggle('slow');
		$(".hidden__form-registra").show('slow');
	});
	$("#btnRegister").click(function(){
		//$(".hidden__form-accedi").toggle('slow');
		$(".hidden__form-accedi").hide('slow');
	});



	$(".logoG").click(function(){

		if ($(".onlyMobile").css("display")!="block"){
			if ($(".linkHome").attr("href")=="#"){
				$(".linkHome").attr("href", "/");

				console.log('CAMBIO LINK IN /');
			}
		}

		if ($(".onlyMobile").css("display")!="none"){
			if ($(".linkHome").attr("href")=="/"){
				$(".linkHome").attr("href", "#");

				console.log('CAMBIO LINK IN #');
			}

			$("#mainNav").toggleClass("o-blockBar__Nav__mobileNav");
			$(".o-blockBar__Nav__link ").toggleClass("o-blockBar__Nav__mobileNav__link");
		}
		return true;
	});


	$(".small__guide").empty();

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var urlGuida = "";
	var hS = "";
	var minS = "";

	for (var i = 1; i<4; i++) {

		urlGuida = "https://api.themoviedb.org/3/tv/"+ i +"?api_key=5161f242dc03bc9b9fd17280edc9945f";

		//carico i programmi sulla guida
		$.get(urlGuida, function(data){

			if (hours<10){
				hS = hours.toString();
				hS= "0"+hS;
			} else {
				hS = hours.toString();
			}

			if (minutes<10){
				minS = minutes.toString();
				minS= "0"+minS;
			}
			else {
				minS = minutes.toString();
			}

			if ((data.overview).length > 140){
				description = (data.overview).substring(0, 140);
			} else {
				description = data.overview;
			}

			var title = (data.original_name).toUpperCase();

			$(".small__guide").append('<section class="guide__item"><section class="guide__item__hour"><h3 class="guide__item__hour__txt">'+ hS +':'+ minS +'</h3></section><section class="guide__item__title"><h4 class="guide__item__title__header"><strong>'+ title +'</strong></h4><h5 class="small__guide--text">'+ description +'</h5></section>');

			minutes = minutes + data.episode_run_time[0]%60;
			hours = hours + parseInt(data.episode_run_time[0]/60);

			if (minutes>59){
				hours = hours + parseInt(minutes/60);
				minutes = minutes%60;
			}

			if (hours>23){
				hours= hours%24;
			}
		});
	}


	/* ============ s:GUALBERTO SLIDER =========== */
	$("#slider").owlCarousel({

	      navigation : true, // Show next and prev buttons
	      slideSpeed : 200,
	      paginationSpeed : 400,
	      singleItem:true,
	      pagination: false,
	      navigationText: ["<",">"]
	  });
	/* ============ e:GUALBERTO SLIDER =========== */

	$("#mapView").click(function(){
		initMap();
		$(".o-popUp, .o-popUp__inside-content").fadeIn('slow');
	});
	$(".o-popUp__inside-close").click(function(){
		$(".o-popUp, .o-popUp__inside-content").fadeOut('slow');
	});


	// chiamo dal database i film con i caratteri inseriti dall'utente
	$("#search").keydown(function(e){

		// CANCELLAZIONE DEI CARATTERI
		// non funziona propriamente
		if (e.which==8){
			text = text.substring(0, text.length-1);
			test ++;

			$(".tableResult").empty();
		}
		else {
			text = text + String.fromCharCode(e.which);
		}
	    if (text.length >= 2) {
	    	$(".tableResult").css("display", "block");
	   		var url = "https://api.themoviedb.org/3/search/movie?api_key=5161f242dc03bc9b9fd17280edc9945f&language=it&query="+text;

	        $.get(url, function(data){
				var sugg = [];

				$(".tableResult").empty();

				// recupero dal JSON che mi arriva i primi 5 nomi dei film
				for (var i = 0; i<=4; i++){
					sugg[i] = data.results[i].original_title;
					test = 0;
					$(".tableResult").append('<a href="program/'+ data.results[i].id +'">'+sugg[i] +'</a><br>');
				}
			})
	    }
	});

})
