function ajaxGet (url, callback) {
    var req = new XMLHttpRequest();

    req.open("GET", url, true);

    req.addEventListener("load", function() {
        if (req.status >=200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.log(req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'url " + url);
    });

    req.send(null);
}
