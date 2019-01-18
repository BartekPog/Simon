var tab=[];
var i=0;

function inicjalizacja(){
  $(".level-title").text("You Lost! Your Score Is "+(tab.length)+" Press Any Key To Start");
  tab=[];
  var aud= new Audio("sounds/wrong.mp3");
  aud.play();
  $("body").toggleClass("game-over");
  setTimeout(function(){
    $("body").toggleClass("game-over");
  },200);
}

function nazwaButona(numer){
  switch (numer) {
    case 0: return "green";
    case 1: return "red";
    case 2: return "yellow";
    case 3: return "blue";
    default: return "btn";
  }
}

function grajDzwiek(numer){
  var audio = new Audio("sounds/"+ nazwaButona(numer) +".mp3");
  var playPromise = audio.play();
  audio.play();
}

function nowyPoziom(){
  var nowy=Math.floor(Math.random()*4);
  tab.push(nowy);
  $(".level-title").text("Score: "+(tab.length-1));
  grajDzwiek(nowy);
  $("."+nazwaButona(nowy)).animate({opacity: 0.2},300).animate({opacity:1},500);
  i=0;
}

$(".btn").on("click",function(){
  if(tab.length>0){
    $(this).addClass('pressed');

    setTimeout(function(){
      $(this).removeClass('pressed');
    }.bind(this),120);

    if(nazwaButona(tab[i])==this.id){
      grajDzwiek(tab[i]);
      if(i==tab.length-1){
        setTimeout(function(){
          nowyPoziom();
        },500);
      }
      else{
        i++;
      }
    }
    else{
      inicjalizacja();
    }
  }
});

$(".level-title").on("click", function(){
  if(tab.length<1){
    nowyPoziom();
  }
});

$(document).on("keypress",function(){
  if(tab.length<1){
    nowyPoziom();
  }
});
