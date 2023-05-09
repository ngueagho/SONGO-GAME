class songo {
    constructor(coteJoueur1, coteJoueur2, pointJoueur1, pointJoueur2) {
        this.coteJoueur1 = coteJoueur1;
        this.coteJoueur2 = coteJoueur2;
        this.pointJoueur1 = pointJoueur1;
        this.pointJoueur2 = pointJoueur2;
    }
}
let status_joueur1 = true
let status_joueur2 = false
let coteJoueur1 = new Array(5, 5, 5, 5, 5, 5, 5);
let coteJoueur2 = new Array(5, 5, 5, 5, 5, 5, 5);
let pointJoueur1 = 0;
let pointJoueur2 = 0;
let game = new songo(coteJoueur1, coteJoueur2, pointJoueur1, pointJoueur2);
//the next function named reemplissage will be use to start the game by overwritting the value by the startings values

function remplissage() {
    let i = 0;
    for (i = 0; i < 7; i++) {
        document.getElementById(i).value = game.coteJoueur1[i]
    }
    for (i = 7; i < 14; i++) {
        document.getElementById(i).value = game.coteJoueur2[i - 7]
    }
    document.getElementById("score1").value = game.pointJoueur1;
    document.getElementById("score2").value = game.pointJoueur2;
}
//remplissage du plateau du jeu
remplissage();


// //(a) Une méthode qui retourne le nombre de pions du joueur idJ.

function nbPoints(idj) {
    let points = document.getElementById(idj).value;
    if (idj == "score1") {
        document.write("le nombre de points du joueur " + 1 + " est " + points + "<br/>");
    } else {
        document.write("le nombre de points du joueur " + 2 + " est " + points);
    }
}


function total_de_pions(id) {
    let total_pions
    if (id < 7) {
        for (i = 0; i < 7; i++) {
            total_pions = total_pions + songo.coteJoueur1[i];
        }
        return total_pions;
    } else {
        for (i = 0; i < 7; i++) {
            total_pions = total_pions + songo.coteJoueur2[i];
        }
        return total_pions;
    }
}

// //(b) Une fonction qui dit si le joueur idJ est bloqué en retournant 0 ou 1.
function estBloque(id) {
    if (id < 7 && status_joueur1 == true) {
        status_joueur1 = false
        status_joueur2 = true
        return 0
    }
    if (id < 7 && status_joueur1 == false) {
        return 1
    }
    if (id >= 7 && status_joueur2 == true) {
        status_joueur1 = true
        status_joueur2 = false
        return 0
    }
    if (id >= 7 && status_joueur2 == false) {
        return 1
    }
}




function distribution(id) {
    let nombredepion = document.getElementById(id).value;
    let k = id;
    for (i = 0; i < nombredepion; i++) {
        k = (k + 1) % 14;
        document.getElementById(k).value = eval(document.getElementById(k).value) + 1
        document.getElementById(id).value = eval(document.getElementById(id).value) - 1;
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur1[i] = document.getElementById(i).value;
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur2[i] = document.getElementById(13 - i).value;
    }
    return k;
}




//(e) Proposer une méthode qui dit si le jeu se poursuit (0 comme retour) ou bien si le jeu s’arrête (i comme retour si le joueur i gagne).
function poursuiteJeu() {
    if (document.getElementById("score1").value >= 35) {
        alert("victoire joueur 1 :)")
        alert(" FIN DU JEUX, MERCI D'Y AVOIR PARTICIPE :)")
        status_joueur1 = false
        status_joueur2 = false
        nbPoints("score1");
        nbPoints("score2");
        return 1;

    } else if (document.getElementById("score2").value >= 35) {
        alert("victoire joueur 2 :)")
        alert(" FIN DU JEUX, MERCI D'Y AVOIR PARTICIPE :)")
        nbPoints("score1");
        nbPoints("score2");
        status_joueur1 = false
        status_joueur2 = false
        return 1;
    } else if (document.getElementById("score1").value + document.getElementById("score2").value < 10) {
        if (document.getElementById("score1").value + document.getElementById("a1").value + document.getElementById("a2").value + document.getElementById("a3").value + document.getElementById("a4").value + document.getElementById("a5").value + document.getElementById("a6").value + document.getElementById("a7").value > 35) {
            alert("victoire joueur 1 :)")
            alert(" FIN DU JEUX, MERCI D'Y AVOIR PARTICIPE :)")
            nbPoints("score1");
            nbPoints("score2");
            status_joueur1 = false
            status_joueur2 = false
            return 1;

        } else if (document.getElementById("score2").value + document.getElementById("b1").value + document.getElementById("b2").value + document.getElementById("b3").value + document.getElementById("b4").value + document.getElementById("b5").value + document.getElementById("b6").value + document.getElementById("b7").value > 35) {
            alert("victoire joueur 2 :)")
            alert(" FIN DU JEUX, MERCI D'Y AVOIR PARTICIPE :)")
            nbPoints("score1");
            nbPoints("score2");
            status_joueur1 = false
            status_joueur2 = false
            return 1;
        }
    } else {
        return 0;
    }
}


function interdit(id) {
    if (id == 6 || id == 13) {
        if (document.getElementById(id).value == 1) {
            if (total_de_pions(id) == 0) {
                distribution(id);
            } else {
                alert("deplacement impossible , veillez choisir une autre case")
            }
        }
    }
}


function manger1(id) {
    if (id < 7) {
        game.pointJoueur1 += 1;
        document.getElementById("score1").value = game.pointJoueur1;
        document.getElementById(id).value = eval(document.getElementById(id).value) - 1
    } else {
        game.pointJoueur2 += 1;
        document.getElementById("score2").value = game.pointJoueur2;
        document.getElementById(id).value = eval(document.getElementById(id).value) - 1
    }

    for (i = id + 1; i <= id + 13; i++) {
        document.getElementById(i % 14).value = eval(document.getElementById(i % 14).value) + 1
        document.getElementById(id).value = eval(document.getElementById(id).value) - 1
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur1[i] = document.getElementById(i).value;
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur2[i] = document.getElementById(13 - i).value;
    }
}




function manger_j1(idfin) {
    let possibilite = true
    for (i = idfin; i >= 7; i--) {
        if ((document.getElementById(i).value >= 2) && (document.getElementById(i).value <= 4) && (possibilite == true)) {
            alert("joueur1 mange :)")
            game.pointJoueur1 = game.pointJoueur1 + eval(document.getElementById(i).value)
            document.getElementById(i).value = 0;
        } else {
            possibilite = false;
        }
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur2[i] = document.getElementById(13 - i).value;
    }
    document.getElementById("score1").value = game.pointJoueur1;
}

function manger_j2(idfin) {
    let possibilite = true;
    for (i = idfin; i >= 0; i--) {
        if ((document.getElementById(i).value >= 2) && (document.getElementById(i).value <= 4) && (possibilite == true)) {
            alert("joueur2 mange :)")
            game.pointJoueur2 = game.pointJoueur2 + eval(document.getElementById(i).value)
            document.getElementById(i).value = 0;
        } else {
            possibilite = false;
        }
    }
    for (i = 0; i <= 6; i++) {
        game.coteJoueur1[i] = document.getElementById(i).value;
    }
    document.getElementById("score2").value = game.pointJoueur2;
}




function prise1(id) {
    if (document.getElementById(id).value < 14) {
        fin = distribution(id);
        if (id < 7 && fin >= 7) {
            manger_j1(fin);
        }
        if (id >= 7 && fin < 7) {

            manger_j2(fin);
        }
    } else if (document.getElementById(id).value == 14) {
        if (id < 7) {
            alert("joueur1 mange :)")
        } else {
            alert("joueur2 mange :)")
        }
        manger1(id);
    } else {
        total = document.getElementById(id).value;
        for (i = id + 1; i <= id + 13; i++) {
            document.getElementById(i % 14).value = eval(document.getElementById(i % 14).value) + 1
            document.getElementById(id).value = eval(document.getElementById(id).value) - 1
        }
        total = total - 13;
        for (i = 0; i <= 6; i++) {
            game.coteJoueur1[i] = document.getElementById(i).value;
        }
        for (i = 0; i <= 6; i++) {
            game.coteJoueur2[i] = document.getElementById(13 - i).value;
        }

        if (id >= 7) {
            for (i = 0; i < total; i++) {
                document.getElementById(i % 7).value = eval(document.getElementById(i % 7).value) + 1
                document.getElementById(id).value = eval(document.getElementById(id).value) - 1
            }
            fin = i;
            manger_j2(fin);
            for (i = 0; i <= 6; i++) {
                game.coteJoueur1[i] = document.getElementById(i).value;
            }
            for (i = 0; i <= 6; i++) {
                game.coteJoueur2[i] = document.getElementById(13 - i).value;
            }
        } else {
            //id<7
            for (i = 0; i < total; i++) {
                game.coteJoueur2[i % 7] = game.coteJoueur2[i % 7] + 1
                document.getElementById(id).value = eval(document.getElementById(id).value) - 1
            }
            fin = i;
            for (i = 0; i <= 6; i++) {
                document.getElementById(13 - i).value = game.coteJoueur2[i];
            }
            manger_j1(fin);
            for (i = 0; i <= 6; i++) {
                game.coteJoueur1[i] = document.getElementById(i).value;
            }
            for (i = 0; i <= 6; i++) {
                game.coteJoueur2[i] = document.getElementById(13 - i).value;
            }
        }
    }
}

function prise(id) {
    if (estBloque(id) == 0) {
        prise1(id)
    } else if (estBloque(id) == 1) {
        alert("attention :( ce n'est pas votre tour")
    }
    poursuiteJeu();
}