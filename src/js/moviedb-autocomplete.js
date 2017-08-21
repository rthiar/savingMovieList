
var checkAve = document.getElementById('checkAve'),
    checkPop = document.getElementById('checkPop'),
    checkPar = document.getElementById('checkPar'),
    checkDateRec = document.getElementById('checkDateRec'),
    checkDateAnc = document.getElementById('checkDateAnc'), 
    Rgenres = document.getElementsByClassName('checkGenre');





function stringToDate(date, format, delimiter)
{
            var formatLowerCase = format.toLowerCase();
            var formatItems = formatLowerCase.split(delimiter);
            var dateItems = date.split(delimiter);
            var monthIndex = formatItems.indexOf("mm");
            var dayIndex = formatItems.indexOf("dd");
            var yearIndex = formatItems.indexOf("yyyy");
            var month = parseInt(dateItems[monthIndex]);
            month -= 1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}



function genreCheckVerify() {
    var check = false;
    for (var i = 0; i < Rgenres.length; i++) {
        if (Rgenres[i].checked) {
            check = true;
        } 
    }
    return check; 
}








var cpteurId = 0,
        idGenre = [];


/*function sortBy (condition,obj) { 

    if (condition) { 

                    console.log('condition verifiee');
        obj = obj.sort(function (a, b) {
            return b.popularity - a.popularity;
        });
    }  else {
        console.log('condition non verifiee');
    }           
}               |
                |
*/ // PAS REUSSI A PASSER LE PARAMETRE A COMPARER (POPULARITE ICI) EN ARGUMENT -----
//                                                                                  |                                               
//                                                                                  |
//                                                                                  |
//                                                                                  |
function callbackJSON(reponse) {//                                                  |
 //                                                                                 |   
    var films = JSON.parse(reponse),//                                              |   
        search = document.getElementById('search'),//                                   |
        searchVal = search.value;                                           //          |                       |
    var listeHTML = document.getElementById("listeHTML");//                         |
//                                                                                  |
    listeHTML.textContent = " ";//  Remise à zéro à chaque appel, pour éviter les superpositions
//                                                                                  |   
    var imgUrl = "https://image.tmdb.org/t/p/", //                                  |
        imgSize = "w500";//                                                         |
        //                                                                          |
        //                                                                          |                                   
    console.log(searchVal.length);      //                                                                          |
        //                                                                          |
        //                                                                          |
        //                                                                          |
        //                                                                          |
//          ORGANISATION DES RESULTATS                                              |   
//                                                                                  |
    if (checkPop.checked) {   // <--------------------------------------------------| Je vérifie donc "manuellement" si l'utilisateur a trié et recommence à chaque critère
        films.results = films.results.sort( function(a, b) {
            return b.popularity - a.popularity;
        });
    }

    if (checkAve.checked) {
        films.results = films.results.sort( function(a, b) {
            return b.vote_average - a.vote_average;
        });
    }

    if (checkPar.checked) {
        films.results = films.results.sort( function(a, b) {
            return b.vote_count - a.vote_count;
        });
    }

    if (checkDateRec.checked) {  
        films.results = films.results.sort( function(a, b) {
            var date1 = stringToDate(a.release_date, "yyyy-mm-dd", "-");
            var date2 = stringToDate(b.release_date, "yyyy-mm-dd", "-");

                return date2 - date1;
             });
    }

    if (checkDateAnc.checked) {
        films.results = films.results.sort( function(a, b) {
            var date1 = stringToDate(a.release_date, "yyyy-mm-dd", "-");
            var date2 = stringToDate(b.release_date, "yyyy-mm-dd", "-");

                return date1 - date2;
             });
    }


    function filterbyGenre(genres) {
        return films.results.genre_ids.indexOf(genres);
        console.log(films.results);
    }


        
if (genreCheckVerify() && searchVal.length > 1) {
    

    films.results = films.results.genre_ids.filter(filterbyGenre(idGenre[0]));
}


























    for (var i=0; i < films.results.length; i++) {


     var ulFilm = document.createElement("ul"),

//CREATION DE LA LISTE
         liImg = document.createElement("li"),
         img = document.createElement("img"),
         imgPath = films.results[i].poster_path;

         lititre = document.createElement("li"),
         liStrTi = document.createElement("strong"),
         liTxTi = document.createElement("p"),

         liSyn = document.createElement("li"),
         liStrSyn = document.createElement("strong"),
         liTxSyn = document.createElement("p"),

         liPop = document.createElement("li"),
         liStrPop = document.createElement("strong"),
         liTxPop = document.createElement("p");



        img.setAttribute('src', imgUrl + imgSize + imgPath);

        liStrTi.textContent = "Titre : ";
        liStrSyn.textContent = "Synopsis : ";
        liStrPop.textContent = "Popularité : ";


        liTxTi.textContent = " " + films.results[i].title;
        liTxSyn.textContent = " " + films.results[i].overview;
        liTxPop.textContent = " " + films.results[i].popularity;

        console.log(films.results);




        liImg.appendChild(img);

        lititre.appendChild(liStrTi);
        lititre.appendChild(liTxTi);

        liSyn.appendChild(liStrSyn);
        liSyn.appendChild(liTxSyn);

        liPop.appendChild(liStrPop);
        liPop.appendChild(liTxPop);

        ulFilm.appendChild(liImg);
        ulFilm.appendChild(lititre);
        ulFilm.appendChild(liSyn);
        ulFilm.appendChild(liPop);

        listeHTML.appendChild(ulFilm);

        


}



    console.log(films);

}




function filmSearch() { 

var key = "?api_key=6d483dc6ba18c8450e5d7a0a597b9024",
    url = "https://api.themoviedb.org/3/",
    genre = "&with_genres=",
    search = document.getElementById('search'),//                                   |
    searchVal = search.value,
    query = "&query=";


    console.log(searchVal.length);
    
//PREPARATION DES VARIABLES POUR STOCKER L'ID DES GENRES SELECTIONNES
    


// VERIFICATION : L'USER A-T-IL SELECTIONNE UN GENRE 
        if(genreCheckVerify()) {

            for (var i = 0; i < Rgenres.length; i++) {
//SI OUI, ON STOCK L'ID DES GENRE POUR LES PASSER À AJAX
                if (Rgenres[i].checked) {
                    idGenre[cpteurId] = Rgenres[i].getAttribute("data");
                    cpteurId++;
                }   
            }
        }
    


            console.log( idGenre[0] + " + " + idGenre[1] + " + " + idGenre[2] + " + " + idGenre[3]);

            console.log(idGenre.length);
    

//DETERMINATION DU MODE : EST CE QUE L'UTILISATEUR A SAISI DANS LA RECHERCHE
    if(checkPop.checked || checkAve.checked || checkPar.checked || checkDateAnc.checked || checkDateRec.checked || genreCheckVerify() && search.value == "") {
        var mode = "discover/movie";

//SINON, A-T-IL SELECTIONNE UN GENRE
        if(genreCheckVerify()) {
            var finalUrl = url + mode + key + genre + idGenre[0]; console.log(idGenre);

            // SI OUI, UN OU PLUSIEURS ?
            if (idGenre.length > 1) {

                for (var i = 1; i < idGenre.length; i++) {

             finalUrl += "," + idGenre[i];

            }
        } 
    }
}
// L'UTILISATEUR A SAISI 
    if (searchVal.length > 1) {
        var mode = "search/movie",
            finalUrl = url + mode + key + query + searchVal;
         }



         console.log( "URL finale =" + finalUrl);
    ajaxGet(finalUrl, callbackJSON);

    
}




window.onload = function() {
//  alert("DOM chargé");
    var button = document.getElementById('ok');
    button.addEventListener("click", function() {
        filmSearch();
    });


};


//ajaxGet('https://api.themoviedb.org/3/search/movie?api_key=6d483dc6ba18c8450e5d7a0a597b9024&query=fight&sort_by=popularity.desc', callbackJSON);


















//ajaxGet("http://localhost:8888/JSwebSrv/data/langages.txt", callback);

//ajaxGet("https://api.themoviedb.org/3/search/movie?api_key=6d483dc6ba18c8450e5d7a0a597b9024&query=Fight club", callbackJSON);



