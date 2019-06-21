var http = require("http");
var url = require("url");
var fs = require("fs");

var gestionPage = require("./gestionPage");

const PORT = "8080";

var serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(requete, reponse){
    var monObj = url.parse(requete.url);

    if(monObj.pathname === "/"){
        monObj.pathname = "/index.html";
    }
    
    if(monObj.pathname !== "/favicon.ico"){
        var dataPreparation = gestionPage.preparerLesDonnees(monObj);
        var data = {};
        data.contentType = dataPreparation.contentType;
        data.pageHtml = fs.readFileSync(dataPreparation.dossier + dataPreparation.fichier, dataPreparation.encodage);
        gestionPage.envoyerLesDonnees(reponse,data)
    }
}