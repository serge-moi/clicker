$(document).ready(function(){

// Fonction qui me permet de régler le décalage du score en fonction des décimales

function clientUpScore(){
    if(score > 0){
        clientXPlus = 24;
    }
    if(score >= 9){
        clientXPlus = 29;
    }
    if(score >= 99){
        clientXPlus = 34;
    }
    if(score >= 999){
        clientXPlus = 39;
    }
    if(score >= 9999){
        clientXPlus = 44;
    }
    if(score >= 99999){
        clientXPlus = 49;
    }
    if(score >= 999999){
        clientXPlus = 54;
    }
    if(score >= 9999999){
        clientXPlus = 59;
    }
}


// Fonction pour déterminer si une chiffre est pair ou impair

function pair(chiffre){
    chiffre=parseInt(chiffre);
    return ((chiffre & 1)=='0')?true:false;
}


// Fonction qui me permet d'intégrer et de lire des fichiers audios

function bruit(son){
    var bruit = new Audio();
    bruit.src = "sound/" + son;
    bruit.play();
}


// Fonction qui me permet de supprimer les divs contenant le score apres un temps voulu

function removeList(elem){
    setTimeout(function(){
        $(elem).remove();
    },3000);
}


// Fonction qui me permet d'afficher le score au niveau du curseur

function flyClic(top, left, img){
    $(clic).append("<div id='x' class='something' hidden>+ "+usNumberFormat.format(score)+"<img id='carotteImg' src="+ img +"></div>");
    for (var i = 0; i < list.length; i++) {
        list[i].setAttribute("id", "x" + i);
        listX = "#x" + i;
        removeList(list[i]);
    }
    $(listX).css("top", top - 26);
    $(listX).css("left", left - clientXPlus);
    $(listX).css("position", "absolute");
    $(listX).css("height", "25px");
    $(listX).css("color", "#ffb958");
    $(listX).css("fontSize", "20px");
    $(listX).css("textShadow", "1px 1px 1px black");
    $(listX).css("font-weight", "bold");
    $(listX).css("display", "flex");
    $(listX).css("alignItems", "center");
    $(listX).css("animation", "GoUp 4s ease-in-out forwards");
    $(listX).show();
}


// Fonction utilisant le filtre blur, blur permet de fluter une image

function blurElement(element, size) {
    var filterVal = 'blur(' + size + 'px)';
     $(element).css({
       'filter':filterVal,
       'transition':'all 0.5s ease-out'
   });
}


// La fonction principal, pour le click de la souris

function clicker(e){
    $(multiply).attr("disabled",true)
    score += clickValue;
    attrDisabledBool();
    $(this).css("cursor","pointer");
    clientTop = e.clientY;
    clientLeft = e.clientX;
    console.log(achatPomme);
    completeUpdateScore();
    if(score >= 10){
        $("#foxImg").css("filter","brightness(1)");
        $("#renneImg").css("filter","brightness(1)");
        $("#cochonImg").css("filter","brightness(1)");
        $("#doraImg").css("filter","brightness(1)")
        $("#sasukeImg").css("filter","brightness(1)")
        $(fox).off("mouseover", avatarStyle("#foxBox",".text1"));
        $(fox).off("mouseleave", cancelAvatarStyle("#foxBox",".text1"));
        $(renne).off("mouseover", avatarStyle("#renneBox",".text2"));
        $(renne).off("mouseleave", cancelAvatarStyle("#renneBox",".text2"));
        $(cochon).off("mouseover", avatarStyle("#cochonBox",".text3"));
        $(cochon).off("mouseleave", cancelAvatarStyle("#cochonBox",".text3"));
        $(dora).off("mouseover", avatarStyle("#doraBox",".text4"));
        $(dora).off("mouseleave", cancelAvatarStyle("#doraBox",".text4"));
        $(sasuke).off("mouseover", avatarStyle("#sasukeBox",".text5"));
        $(sasuke).off("mouseleave", cancelAvatarStyle("#sasukeBox",".text5"));
    }
    if(score < 10){ 
        $("#darkLand").on("mouseover", landStyle);
        $("#darkLand").on("mouseleave", cancelLandStyle);
    } else {
        $("#darkLand").off("mouseover", landStyle);
        $("#darkLand").off("mouseleave", cancelLandStyle);
        $("#foxNumberBox").css("display","none");
    }
    // switch(score){
    //     case 10 : 
    //         blurElement("#iconPommeBox",0);
    //     break;
    //     case 20 :
    //         blurElement("#iconBananeBox",0);
    //     break;
    //     case 30 :
    //         blurElement("#iconLuffyBox",0);
    //     break;
    //     case 40:
    //         blurElement("#iconPikaBox",0);
    //     break;
    //     case 50:
    //         blurElement("#iconTrumpBox", 0);
    //     break;
    //     case 60:
    //         blurElement("#iconSonicBox", 0);
    //     break;
    //     case 70:
    //         blurElement("#iconLeeBox", 0);
    //     break;
    //     case 80:
    //         blurElement("#iconGokuBox", 0);
    //     break;
    //     case 90:
    //         blurElement("#iconAllmightBox", 0);
    //     break;
    //     case 100:
    //         blurElement("#iconSaitamaBox", 0);
    //     break;
    // }
    // scoreString = score.toString();
    // longScoreStr = scoreString.length;
    clientUpScore();


    if(pair(score)){
        clientXPlus +=1;
        bruit("bruit1.mp3");
    } else{
        clientXPlus -=1;
        bruit("bruit2.mp3");
    };
}


// permet d'augmenter le multiplicateur par deux

function augmenterMultiplicateur(){
    if(score >= multiplierCost){
        score -= multiplierCost;   
        multiplier++
        clickValue = multiplier;
        multiplierCost *= 2;
        attrDisabledBool();
        if(carotte == 1){
            updateScore("cawottes");
        } else if (carotte == 0 && pomme == 1){
            updateScore("pommes");
        } else if(carotte == 0 && pomme == 0 && banane == 1){
            updateScore("bananes");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
            updateScore("luffys");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
            updateScore("pikachus");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
            updateScore("trumps");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
            updateScore("sonics");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
            updateScore("lees");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
            updateScore("gokus");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
            updateScore("all mights");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
            updateScore("saitamas");
        }
        upIteButton();
        bruit("up.wav");
    } else {
        $("body").append("<div>crédit insuffisant</div>")
    }
    attrDisabledBool();
    if(carotte == 1){
        updateScore("cawottes");
    } else if (carotte == 0 && pomme == 1){
        updateScore("pommes");
    } else if(carotte == 0 && pomme == 0 && banane == 1){
        updateScore("bananes");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
        updateScore("luffys");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
        updateScore("pikachus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
        updateScore("trumps");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
        updateScore("sonics");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
        updateScore("lees");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
        updateScore("gokus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
        updateScore("all mights");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
        updateScore("saitamas");
    }
    clientUpScore();
}


// crée un click automatique

function autoclicker(){
    if(score >= autoclicCost){
        setInterval(function(){
            score++;
            if(carotte == 1){
                updateScore("cawottes");
            } else if (carotte == 0 && pomme == 1){
                updateScore("pommes");
            } else if(carotte == 0 && pomme == 0 && banane == 1){
                updateScore("bananes");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
                updateScore("luffys");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
                updateScore("pikachus");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
                updateScore("trumps");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
                updateScore("sonics");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
                updateScore("lees");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
                updateScore("gokus");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
                updateScore("all mights");
            } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
                updateScore("saitamas");
            }
            
            attrDisabledBool();
        }, 1000);
        score -= autoclicCost;
    } else {
        $("body").append("<div>crédit insuffisant</div>")
    }
    attrDisabledBool();
    if(carotte == 1){
        updateScore("cawottes");
    } else if (carotte == 0 && pomme == 1){
        updateScore("pommes");
    } else if(carotte == 0 && pomme == 0 && banane == 1){
        updateScore("bananes");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
        updateScore("luffys");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
        updateScore("pikachus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
        updateScore("trumps");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
        updateScore("sonics");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
        updateScore("lees");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
        updateScore("gokus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
        updateScore("all mights");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
        updateScore("saitamas");
    }
    clientUpScore();
    bruit("hurry-up.wav");
}


// Permet d'activer un bonus offrant plusieurs avantages pendant 30 secondes.

function activeBonus(){
    $(bonus).attr("disabled",true);
    $(bonus).html("bonus / durée: 30");
    if(score >= bonusCost){
        ticBonus++;
        clickValue *= 2;
        score-=bonusCost;
        intervalBonus = setInterval(function(){
            cd--;
            // console.log(clickValue);
            // console.log(cd);
            $(bonus).html("bonus / durée: " + cd);
        }, 1000);
        if(carotte == 1){
            updateScore("cawottes");
        } else if (carotte == 0 && pomme == 1){
            updateScore("pommes");
        } else if(carotte == 0 && pomme == 0 && banane == 1){
            updateScore("bananes");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
            updateScore("luffys");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
            updateScore("pikachus");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
            updateScore("trumps");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
            updateScore("sonics");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
            updateScore("lees");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
            updateScore("gokus");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
            updateScore("all mights");
        } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
            updateScore("saitamas");
        }
        clientUpScore();
        bruit("credits1.wav");
        setTimeout(stopIntervalBonus,30000);
    } else{
        console.log("coucou");
    }
    attrDisabledBool();
    if(carotte == 1){
        updateScore("cawottes");
    } else if (carotte == 0 && pomme == 1){
        updateScore("pommes");
    } else if(carotte == 0 && pomme == 0 && banane == 1){
        updateScore("bananes");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
        updateScore("luffys");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
        updateScore("pikachus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
        updateScore("trumps");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
        updateScore("sonics");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
        updateScore("lees");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
        updateScore("gokus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
        updateScore("all mights");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
        updateScore("saitamas");
    }
}


// Cette fonction permet d'arreter le bonus après un temps imparti

function stopIntervalBonus(){
    $(bonus).html("bonus / coût: 5000");
    clickValue /= 2;
    clearInterval(intervalBonus);
}


// Permet de modifier l'image et le texte du score

function completeUpdateScore(){
    if(carotte == 1){
        flyClic(clientTop, clientLeft,"img/carrot.png");
        updateScore("cawottes");
    } else if (carotte == 0 && pomme == 1){
        flyClic(clientTop, clientLeft,"img/pomme.png");
        updateScore("pommes");
    } else if(carotte == 0 && pomme == 0 && banane == 1){
        flyClic(clientTop, clientLeft,"img/banane.png");
        updateScore("bananes");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 1){
        flyClic(clientTop, clientLeft,"img/luffy.png");
        updateScore("luffys");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 1){
        flyClic(clientTop, clientLeft,"img/pikachu.png");
        updateScore("pikachus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 1){
        flyClic(clientTop, clientLeft,"img/trump.png");
        updateScore("trumps");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 1){
        flyClic(clientTop, clientLeft,"img/sonic.png");
        updateScore("sonics");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 1){
        flyClic(clientTop, clientLeft,"img/lee.png");
        updateScore("lees");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 1){
        flyClic(clientTop, clientLeft,"img/goku.png");
        updateScore("gokus");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 1){
        flyClic(clientTop, clientLeft,"img/allmight.png");
        updateScore("all mights");
    } else if(carotte == 0 && pomme == 0 && banane == 0 && luffy == 0 && pikachu == 0 && trump == 0 && sonic == 0 && lee == 0 && goku == 0 && allmight == 0 && saitama == 1){
        flyClic(clientTop, clientLeft,"img/saitama.png");
        updateScore("saitamas");
    }
}


// actualise l'affichage du score

function updateScore(name){
    $(display).html(usNumberFormat.format(score) + " " + name);
}


// actualise l'affichage du multiplicateur

function upIteButton(){
    multiply.html("x" + clickValue + " multiplier / coût: " + multiplierCost);
}



// Fonction pour les personnages, permettant de régler la position des personnages

function animateScript(){
    $(imgBut1).css("backgroundPosition", "-"+position+"px 0px");

    if(position < 780){
        position = position + 154;
    } else {
        position = 164;
    }
}

function animateScript2(){
    $(clic).css("backgroundPosition", "-"+position2+"px 0px");
    if(position2 < 500){
        position2 = position2 + 90;
    } else {
        position2 = 0;
    }
}

function animateScript3(){
    $(".imgBut2").css("backgroundPosition","-"+position3+"px -" +position4+"px");
    pos++
    if(pos == 1){
        position3 = 0;
        position4 = 184;
    }
    else if(pos == 2){
        position3 = 218;
        position4 = 184;
    }
    else if(pos == 3){
        position3 = 0;
        position4 = 368;
    }
    else if(pos == 4){
        position3 = 218;
        position4 = 368;
    }
    else if(pos == 5){
        position3 = 218;
        position4 = 560;
    }
    else{
        position3 = 0;
        position4 = 0;
        pos = 0;
    } 
}

function animeRenne(){
    $(".imgBut3").css("backgroundPosition", "-"+ positionRenne +"px 0px");
    posRenne++
    // console.log(posRenne);
    if(posRenne == 1){
        positionRenne = 312;
    }
    else if(posRenne == 2){
        $(".imgBut3").css("width","19em");
        positionRenne = 537;
    }
    else if(posRenne == 3){
        $(".imgBut3").css("width","19em");
        positionRenne = 757;
    }
    else if(posRenne == 4){
        $(".imgBut3").css("width","20em");
        positionRenne = 1028;
    }
    else{
        positionRenne = 40;
        posRenne = 0;
        $(".imgBut3").css("width","20em");
    } 
}

function animeCochon(){
    $(".imgBut4").css("backgroundPosition", "-"+positionCochon+"px 0px");
    if(positionCochon < 485){
        positionCochon = positionCochon + 97;
    } else {
        positionCochon = 0;
    }
}

function animeDora(){
    $(".imgBut5").css("backgroundPosition","-"+positionDora1+"px -" +positionDora2+"px");
    posDora++
    if(posDora == 1){
        positionDora1 = 126;
        positionDora2 = 0;
    }
    else if(posDora == 2){
        positionDora1 = 259;
        positionDora2 = 0;
    }
    else if(posDora == 3){
        positionDora1 = 401;
        positionDora2 = 0;
    }
    else if(posDora == 4){
        positionDora1 = 0;
        positionDora2 = 173;
    }
    else if(posDora == 5){
        positionDora1 = 126;
        positionDora2 = 173;
    }
    else{
        positionDora1 = 0;
        positionDora2 = 0;
        posDora = 0;
    } 
}

function animeSasuke(){
    $(".imgBut6").css("backgroundPosition","-"+positionSasuke1+"px -" +positionSasuke2+"px");
    posSasuke++
    if(posDora == 1){
        positionDora1 = 126;
        positionDora2 = 0;
    }
    else if(posDora == 2){
        positionDora1 = 259;
        positionDora2 = 0;
    }
    else if(posDora == 3){
        positionDora1 = 401;
        positionDora2 = 0;
    }
    else if(posDora == 4){
        positionDora1 = 0;
        positionDora2 = 173;
    }
    else if(posDora == 5){
        positionDora1 = 126;
        positionDora2 = 173;
    }
    else{
        positionDora1 = 0;
        positionDora2 = 0;
        posDora = 0;
    } 
}



// Cette fonction permet de déduire le cout d'un élément acheté sur l'ensemble des autres élément.

function attrDisabledBool(){
    score < autoclicCost ? $(autoclic).attr("disabled",true) : $(autoclic).attr("disabled", false);
    score < multiplierCost ? $(multiply).attr("disabled",true) : $(multiply).attr("disabled", false);
    score >= bonusCost && ticBonus == 0 ? $(bonus).attr("disabled",false) : $(bonus).attr("disabled",true);
    score < 10 && achatPomme == 0 ? blurElement("#iconPommeBox",2.6) : blurElement("#iconPommeBox",0);
    if(score >= 0 && achatPomme == 1){
        blurElement("#iconPommeBox",0);
        $("#iconPommeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 20 && achatBanane == 0 ? blurElement("#iconBananeBox",2.6) : blurElement("#iconBananeBox",0);
    if(score >= 0 && achatBanane == 1){
        blurElement("#iconBananeBox",0);
        $("#iconBananeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 30 && achatLuffy == 0 ? blurElement("#iconLuffyBox",2.6) : blurElement("#iconLuffyBox",0);
    if(score >= 0 && achatLuffy == 1){
        blurElement("#iconLuffyBox",0);
        $("#iconLuffyBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 40 && achatPikachu == 0 ? blurElement("#iconPikaBox",2.6) : blurElement("#iconPikaBox",0);
    if(score >= 0 && achatPikachu == 1){
        blurElement("#iconPikaBox",0);
        $("#iconPikaBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 50 && achatTrump == 0  ? blurElement("#iconTrumpBox",2.6) : blurElement("#iconTrumpBox",0);
    if(score >= 0 && achatTrump == 1){
        blurElement("#iconTrumpBox",0);
        $("#iconTrumpBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 60 && achatSonic == 0 ? blurElement("#iconSonicBox",2.6) : blurElement("#iconSonicBox",0);
    if(score >= 0 && achatSonic == 1){
        blurElement("#iconSonicBox",0);
        $("#iconSonicBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 70 && achatLee == 0 ? blurElement("#iconLeeBox",2.6) : blurElement("#iconLeeBox",0);
    if(score >= 0 && achatLee == 1){
        blurElement("#iconLeeBox",0);
        $("#iconLeeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 80 && achatGoku == 0 ? blurElement("#iconGokuBox",2.6) : blurElement("#iconGokuBox",0);
    if(score >= 0 && achatGoku == 1){
        blurElement("#iconGokuBox",0);
        $("#iconGokuBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 90 && achatAllmight == 0 ? blurElement("#iconAllmightBox",2.6) : blurElement("#iconAllmightBox",0);
    if(score >= 0 && achatAllmight == 1){
        blurElement("#iconAllmightBox",0);
        $("#iconAllmightBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
    score < 100 && achatSaitama == 0 ? blurElement("#iconSaitamaBox",2.6) : blurElement("#iconSaitamaBox",0);
    if(score >= 0 && achatSaitama == 1){
        blurElement("#iconSaitamaBox",0);
        $("#iconSaitamaBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}


// modifie css hover cadre personnage

function avatarStyle(box,text){
    $(box).css("backgroundColor","black");
    $(text).html("10");
    $(text).css("color","white");
    $(text).css("display","block");
}

// modifie css hover cadre personnage

function cancelAvatarStyle(box,text){
    $(box).css("backgroundColor","wheat");
    $(text).css("color", "black");
    $(text).css("display","none");
}



// modifie css hover cadre paysage

function landStyle(){
    $(this).css("backgroundColor","black");
    $(this).css("color","white"); 
}

function cancelLandStyle(){
    $(this).css("backgroundColor","wheat").css("color", "black");
}


// gère principalement le changement de class pour l'image des personnages cliquable

function avatarBonus(){
    if(score >= 10){
        oneAnime++;
        $(image).removeClass("imgBut1");
        $(image).addClass("imgBut2");
        $(clic).off("click",animateScript);
        if(oneAnime == 1){ 
            position3 = 0;
            position4 = 0;
            animateScript3();
        }
    }
}

function avatarBonusRenne(){
    if(score >= 10){
        oneRenne++;
        $(image).removeClass();
        $(image).addClass("imgBut3");
        posRenne = 0;
        $(clic).off("click",animateScript);
        if(oneRenne == 1){
            posiitonRenne = 40;
            animeRenne();
        }
    }
}

function avatarBonusCochon(){
    if(score >= 10){
        oneCochon++;
        $(image).removeClass();
        $(image).addClass("imgBut4");
        posCochon = 0;
        $(clic).off("click",animateScript);
        if(oneCochon == 1){
            positionCochon = 0;
            animeCochon();
        }
    }
}

function avatarBonusDora(){
    if(score >= 10){
        oneDora++;
        $(image).removeClass();
        $(image).addClass("imgBut5");
        posDora = 0;
        $(clic).off("click",animateScript);
        if(oneDora == 1){
            positionDora = 0;
            animeDora();
        }
    }
}


// permet de changer le paysage en arrière plan

function landBonus(){
    if(score >= 10){
        $(".land").css("background", "url('img/fondSombre.jpg') 0px 0px");
        $(".land").css("backgroundRepeat", "no-repeat");
        $(".land").css("backgroundSize", "cover");
    }
}



// fonctions qui permettent de gérer les icones bonus de gauche, changer le nom de l'élément que l'on récolte, annule le flou, modifie l'apparence de l'icone a gauche.

function switchPomme(){
    if(score >= 10 && achatPomme == 0){
        pomme = 1, carotte = 0;
        if(achatPomme == 0){
            score -= 10;
        }
        achatPomme = 1;
        $("#iconPommeBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconPommeBox",0);
        $("#iconPommeBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("pommes");
    }
    if(score >= 0 && achatPomme == 1){
        pomme = 1, carotte = 0;
        updateScore("pommes");
        $("#iconPommeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchBanane(){
    if(score >= 20 && achatBanane == 0){
        banane = 1, pomme = 0, carotte = 0;
        if(achatBanane == 0){
            score -= 20;
        }
        achatBanane = 1;
        $("#iconBananeBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconBananeBox",0);
        $("#iconBananeBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("pommes");
    }
    if(score >= 0 && achatBanane == 1){
        banane = 1, pomme = 0, carotte = 0;
        updateScore("bananes");
        $("#iconBananeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchLuffy(){
    if(score >= 30 && achatLuffy == 0){
        luffy = 1, banane = 0, pomme = 0, carotte = 0;
        if(achatLuffy == 0){
            score -= 30;
        }
        achatLuffy = 1;
        $("#iconLuffyBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconLuffyBox",0);
        $("#iconLuffyBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("luffys");
    }
    if(score >= 0 && achatLuffy == 1){
        luffy = 1, banane = 0, pomme = 0, carotte = 0;
        updateScore("luffys");
        $("#iconLuffyBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchPika(){
    if(score >= 40 && achatPikachu == 0){
        pikachu = 1, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatPikachu == 0){
            score -= 40;
        }
        achatPikachu = 1;
        $("#iconPikaBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconPikaBox",0);
        $("#iconPikaBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        // bruit("Pikachu.mp3");
        updateScore("pikachus");
    }
    if(score >= 0 && achatPikachu == 1){
        pikachu = 1, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        bruit("Pikachu.mp3");
        updateScore("pikachus");
        $("#iconPikaBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchTrump(){
    if(score >= 50 && achatTrump == 0){
        trump = 1, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatTrump == 0){
            score -= 50;
        }
        achatTrump = 1;
        $("#iconTrumpBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconTrumpBox",0);
        $("#iconTrumpBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("trumps");
    }
    if(score >= 0 && achatTrump == 1){
        trump = 1, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        updateScore("trumps");
        $("#iconTrumpBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchSonic(){
    if(score >= 60 && achatSonic == 0){
        sonic = 1, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatSonic == 0){
            score -= 60;
        }
        achatSonic = 1;
        $("#iconSonicBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconSonicBox",0);
        $("#iconSonicBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("sonics");
    }
    if(score >= 0 && achatSonic == 1){
        sonic = 1, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        updateScore("sonics");
        $("#iconSonicBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchLee(){
    if(score >= 70 && achatLee == 0){
        lee = 1, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatLee == 0){
            score -= 70;
        }
        achatLee = 1;
        $("#iconLeeBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconLeeBox",0);
        $("#iconLeeBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        updateScore("lees");
    }
    if(score >= 0 && achatLee == 1){
        lee = 1, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        updateScore("lees");
        $("#iconLeeBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchGoku(){
    if(score >= 80 && achatGoku == 0){
        goku = 1, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatGoku == 0){
            score -= 80;
        }
        achatGoku = 1;
        $("#iconGokuBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconGokuBox",0);
        $("#iconGokuBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        // bruit("goku.mp3");
        updateScore("gokus");
    }
    if(score >= 0 && achatGoku == 1){
        goku = 1, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        bruit("goku.mp3");
        updateScore("gokus");
        $("#iconGokuBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchAllmight(){
    if(score >= 90 && achatAllmight == 0){
        allmight = 1, goku = 0, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatAllmight == 0){
            score -= 90;
        }
        achatAllmight = 1;
        $("#iconAllmightBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconAllmightBox",0);
        $("#iconAllmightBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        // bruit("allmight.mp3");
        updateScore("all mights");
    }
    if(score >= 0 && achatAllmight == 1){
        allmight = 1, goku = 0, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        bruit("allmight.mp3");
        updateScore("all mights");
        $("#iconAllmightBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

function switchSaitama(){
    if(score >= 100 && achatSaitama == 0){
        sataima = 1, allmight = 0, goku = 0, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        if(achatSaitama == 0){
            score -= 100;
        }
        achatSaitama = 1;
        $("#iconSaitamaBox").css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset #ffb327");
        blurElement("#iconSaitamaBox",0);
        $("#iconSaitamaBox").css("filter","drop-shadow(2px 4px 6px black)");
        attrDisabledBool()
        // bruit("saitama.mp3");
        updateScore("saitamas");
    }
    if(score >= 0 && achatSaitama == 1){
        saitama = 1, allmight = 0, goku = 0, lee = 0, sonic = 0, trump = 0, pikachu = 0, luffy = 0, banane = 0, pomme = 0, carotte = 0;
        bruit("saitama.mp3");
        updateScore("saitamas");
        $("#iconSaitamaBox").css("filter","drop-shadow(2px 4px 6px black)");
    }
}

});