var express = require('express');
var router = express.Router();
var request = require ('request');


router.get('/', function(req, res, next) {
  res.render('pages/home', { title: 'Home | Giove TV' });
});

router.get('/programmi', function(req, res, next) {
  res.render('pages/programmi', { title: 'Programmi | Giove TV' });
});

router.get('/areaClienti', function(req, res, next) {
  res.render('pages/areaClienti', { title: 'Accedi | Giove TV' });
});

router.get('/guidatv', function(req, res, next) {
  res.render('pages/guidatv', { title: 'Guida TV | Giove TV' });
});


router.get('/faq', function(req, res, next) {
  res.render('pages/faq', { title: 'FAQ | Giove TV' });
});

router.get('/contatti', function(req, res, next) {
  res.render('pages/contatti', { title: 'Contatti | Giove TV' });
});

router.get('/notelegali', function(req, res, next) {
  res.render('pages/notelegali', { title: 'Note Legali | Giove TV' });
});


router.get('/schedaProgrammi', function(req, res, next) {
  res.render('pages/schedaProgrammi', { title: 'Accedi | Giove TV' });
});


// ===========================================================
// (regular expression)

router.get('/program/:idMovie', function(req, res, next) {
  var id = req.params.idMovie;
  var url = 'https://api.themoviedb.org/3/movie/'+ id +'?api_key=5161f242dc03bc9b9fd17280edc9945f&language=it&append_to_response=credits';
  var urlReqImg = 'https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=5161f242dc03bc9b9fd17280edc9945f';
  var actors = [];

  request.get (urlReqImg, function(e, r, b){

    var bParsed = JSON.parse(b);
    var urlImg;

    console.log(bParsed.backdrops);

    // verifica della presenza di immagini da stamapre nel template
    if (bParsed.backdrops==[]){

      urlImg = "https://image.tmdb.org/t/p/w600"+(JSON.parse(b)).backdrops[0].file_path;

    } else {
      urlImg= "images/rettGrigio.png";
    }

    request.get (url, function (err, resp, body){


      var data = JSON.parse(body);
      var title = (data.title).toUpperCase();
      var director ="";

      var lengthCast = (data.credits.cast).length;
      var lengthCrew = (data.credits.crew).length;

      if (lengthCast>4){
        lengthCast = 4;
      }

      for(i=0; i<lengthCast; i++){

        if (data.credits.cast[i].name!= ""){
          actors [i]= '  '+data.credits.cast[i].name;
        }
      }

      for (i=0; i<lengthCrew; i++){
        if (data.credits.crew[i].job=="Director"){
          director ='  '+data.credits.crew[i].name;
        }
      }

      res.render('pages/schedaFilm', { dataPass: data, img: urlImg, actors: actors, tittlePass: title, directorPass: director});

    });

  });

});

// ===========================================================



module.exports = router;
