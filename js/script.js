$(document).ready(function(){

    
    // && localStorage.getItem("multiplier") && localStorage.getItem("clickValue") && localStorage.getItem("multiplierCost") && localStorage.getItem("autoclicCost") && localStorage.getItem("bonusCost")
    // localStorage.setItem("multiplier", multiplier);
    // localStorage.setItem("clickValue", clickValue);
    // localStorage.setItem("multiplierCost", multiplierCost);
    // localStorage.setItem("autoclicCost", autoclicCost);
    // localStorage.setItem("bonusCost", bonusCost);
    

    var display = $("#display"), clic = $("#clic"), multiply = $("#multiply"), autoclic = $("#autoclic"), bonus = $("#bonus"), image = $("#image"), player = $("#player"), fox = $("#foxBox"), imgBut1 = $(".imgBut1"), imgBut2 = $(".imgBut2"), renne = $("#renneBox"), cochon = $("#cochonBox"), dora = $("#doraBox"), sasuke = $("#sasukeBox"), sound = $(".sound");
    var score = 0;
    score = parseInt(localStorage.getItem("score"),10);
    $(display).text(score);
    var multiplier = 1; 
    var clickValue = 1;
    var multiplierCost = 10;
    var autoclicCost = 20;
    var bonusCost = 10;
    var cd = 30;
    var intervalBonus;
    var ticBonus = 0;
    var animateTour = 0;

    var position = 164, position2 = 22,positionForet = 22, positionChateau = 20 ,positionVolcan = 20, positionNuage = 20, positionFire = 20, position3 = 0,position4= 0,positionRenne = 40,positionCochon1 = 265,positionCochon2 = 43, positionDora1 = 0,positionDora2 = 0,positionSasuke1 = 9, positionSasuke2 = 8;
    
    var scoreClicInterval = 50;    
    var x = 0;
    var test = 0;
    var list = document.getElementsByClassName("something");
    var listX;

    var pos = 0,posRenne = 0, posCochon = 0; posDora = 0,posSasuke = 0;

    var oneAnime = 0,oneRenne = 0,oneCochon = 0,oneDora = 0,oneSasuke = 0;

    var upForet = 0, upChateau = 0, upVolcan = 0;

    const usNumberFormat = new Intl.NumberFormat('en-US');

    var clientTop, clientLeft, clientXPlus = 24;
    // var scoreString;
    // var longScoreStr;
    var hitClientX = 0;

    var carotte = 1, pomme = 0, banane = 0, luffy = 0, pikachu = 0, trump = 0, sonic = 0, lee = 0, goku = 0, allmight = 0, saitama = 0;

    var achatPomme = 0,  achatBanane = 0,  achatLuffy = 0,  achatPikachu = 0,  achatTrump = 0,  achatSonic = 0,  achatLee = 0,  achatGoku = 0, achatAllmight = 0,  achatSaitama = 0;


    $(clic).on("click",clicker);
    $(autoclic).on("click",autoclicker);
    $(multiply).on("click", augmenterMultiplicateur);
    $(bonus).on("click", activeBonus);

    $(multiply).attr("disabled",true);
    $(autoclic).attr("disabled",true);
    $(bonus).attr("disabled",true);
    
    blurElement("#iconPommeBox",2.6);
    blurElement("#iconBananeBox",2.6);
    blurElement("#iconLuffyBox",2.6);
    blurElement("#iconPikaBox",2.6);
    blurElement("#iconTrumpBox",2.6);
    blurElement("#iconSonicBox",2.6);
    blurElement("#iconLeeBox",2.6);
    blurElement("#iconGokuBox",2.6);
    blurElement("#iconAllmightBox",2.6);
    blurElement("#iconSaitamaBox",2.6);



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

    function pair(chiffre){
        chiffre=parseInt(chiffre);
        return ((chiffre & 1)=='0')?true:false;
    }

    function bruit(son){
            var bruit = new Audio();
            bruit.src = "sound/" + son;
            bruit.play();
    }

    function removeList(elem){
        setTimeout(function(){
            $(elem).remove();
        },3000);
    }

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
    
    function blurElement(element, size) {
        var filterVal = 'blur(' + size + 'px)';
         $(element).css({
           'filter':filterVal,
           'transition':'all 0.5s ease-out'
       });
    }

    function clicker(e){
        $(multiply).attr("disabled",true);
        score += clickValue;
        attrDisabledBool();
        $(this).css("cursor","pointer");
        clientTop = e.clientY;
        clientLeft = e.clientX;
        localStorage.score = score;
        $(display).text(score);
        completeUpdateScore();
        if(score >= 10){
            $("#foxImg").css("filter","brightness(1)");
            $("#renneImg").css("filter","brightness(1)");
            $("#cochonImg").css("filter","brightness(1)");
            $("#doraImg").css("filter","brightness(1)")
            $("#sasukeImg").css("filter","brightness(1)")
            $(fox).off("mouseover", avatarStyle("#foxBox",".text1"));
            $(fox).off("mouseleave", cancelAvatarStyle(".text1"));
            $(renne).off("mouseover", avatarStyle("#renneBox",".text2"));
            $(renne).off("mouseleave", cancelAvatarStyle(".text2"));
            $(cochon).off("mouseover", avatarStyle("#cochonBox",".text3"));
            $(cochon).off("mouseleave", cancelAvatarStyle(".text3"));
            $(dora).off("mouseover", avatarStyle("#doraBox",".text4"));
            $(dora).off("mouseleave", cancelAvatarStyle(".text4"));
            $(sasuke).off("mouseover", avatarStyle("#sasukeBox",".text5"));
            $(sasuke).off("mouseleave", cancelAvatarStyle(".text5"));
            $("#darkLand").off("mouseover", landStyle("#darkLand",".text"));
            $("#darkLand").off("mouseleave", cancelLandStyle("#darkLand",".text"));
            $("#chateauLand").off("mouseover", landStyle("#chateauLand",".text2psg"));
            $("#chateauLand").off("mouseleave", cancelLandStyle("#chateauLand",".text2psg"));
            $("#volcanLand").off("mouseover", landStyle("#volcanLand",".text3psg"));
            $("#volcanLand").off("mouseleave", cancelLandStyle("#volcanLand",".text3psg"));
            $("#nuageLand").off("mouseover", landStyle("#nuageLand",".text4psg"));
            $("#nuageLand").off("mouseleave", cancelLandStyle("#nuageLand",".text4psg"));
            $("#fireLand").off("mouseover", landStyle("#fireLand",".text5psg"));
            $("#fireLand").off("mouseleave", cancelLandStyle("#fireLand",".text5psg"));
        }

        clientUpScore();

        if(pair(score)){
            clientXPlus +=1;
            bruit("bruit1.mp3");
        } else{
            clientXPlus -=1;
            bruit("bruit2.mp3");
        };
    }


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

    function stopIntervalBonus(){
        $(bonus).html("bonus / coût: 5000");
        clickValue /= 2;
        clearInterval(intervalBonus);
    }

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

    function updateScore(name){
        $(display).html(usNumberFormat.format(score) + " " + name);    
    }

    function upIteButton(){
        multiply.html("x" + clickValue + " multiplier / coût: " + multiplierCost);
    }


    // image

    function animateScript(){
        $(imgBut1).css("backgroundPosition", "-"+position+"px 0px");

        if(position < 780){
            position = position + 154;
        } else {
            position = 164;
        }
    }
    
 
    function animateScript3(){
        $(".imgBut2").css("backgroundPosition","-"+position3+"px -" +position4+"px");
        $(".imgBut2").css("width","16em");
        position3 = 0;
        position4 = 0;
        if(pos == 0){         
            $(".imgBut2").css("background-position", "0px 0px");
            pos++
        } else {
            $(".imgBut2").css("backgroundPosition", "-"+ position3 +"px"+ position4 +"px");
            pos++
        }
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
            $(".imgBut2").css("width","16em");
        } 
    }

    function animeRenne(){
        if(posRenne == 0){         
            $(".imgBut3").css("background-position", "-40px 0px");
            posRenne++
        } else {
            $(".imgBut3").css("backgroundPosition", "-"+ positionRenne +"px 0px");
            posRenne++
        }
        $(".imgBut3").css("width","20em");
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
        $(".imgBut4").css("backgroundPosition", "-"+positionCochon1+"px -"+positionCochon2+"px");
        $(".imgBut4").css("width","9em");

        if(posCochon == 0){         
            $(".imgBut4").css("background-position", "-265px -43px");
            posCochon++
        } else {
            $(".imgBut4").css("backgroundPosition", "-"+ positionCochon1 +"px -"+ positionCochon2 +"px");
            posCochon++
        }
        if(posCochon == 1){
            positionCochon1 = 10;
            positionCochon2= 248;
        }
        else if(posCochon == 2){
            positionCochon1 = 129;
            positionCochon2= 248;
        }
        else if(posCochon == 3){
            positionCochon1 =241;
            positionCochon2= 248;
        }
        else if(posCochon == 4){
            positionCochon1 = 356;
            positionCochon2= 248;
        }
        else if(posCochon == 5){
            positionCochon1 = 471;
            positionCochon2= 248;
        }
        else if(posCochon == 6){
            positionCochon1 =582;
            positionCochon2= 248;
        }
        else if(posCochon == 7){
            positionCochon1 = 43;
            positionCochon2= 439;
        }
        else if(posCochon == 8){
            positionCochon1 = 169;
            positionCochon2= 439;
        }
        else if(posCochon == 9){
            positionCochon1 = 296;
            positionCochon2= 439;
            posCochon = 1;
        }
        else{
            positionCochon1 = 265;
            positionCochon2= 43;
            $(".imgBut4").css("width","9em");
        }
    }

    function animeDora(){
        $(".imgBut5").css("backgroundPosition","-"+positionDora1+"px -" +positionDora2+"px");
        positionDora1 = 0;
        positionDora2 = 0;
        $(".imgBut5").css("width","10em");
        if(posDora == 0){         
            $(".imgBut5").css("background-position", "0px 0px");
            posDora++
        } else {
            $(".imgBut5").css("backgroundPosition", "-"+ positionDora1 +"px"+ positionDora2 +"px");
            posDora++
        }
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
            $(".imgBut5").css("width","10em");
        } 
    }
    
    function animeSasuke(){
        $(".imgBut6").css("backgroundPosition","-"+positionSasuke1+"px -" +positionSasuke2+"px");
        $(".imgBut6").css("width","11.5em");
        if(posSasuke == 0){         
            $(".imgBut6").css("background-position", "-9px -8px");
            posSasuke++
        } else {
            $(".imgBut6").css("backgroundPosition", "-"+ positionSasuke1 +"px"+ positionSasuke2 +"px");
            posSasuke++
        }
        if(posSasuke == 1){
            positionSasuke1 = 161;
            positionSasuke2 = 30;
        }
        else if(posSasuke == 2){
            positionSasuke1 = 314;
            positionSasuke2 = 30;
        }
        else if(posSasuke == 3){
            positionSasuke1 = 485;
            positionSasuke2 = 30;
        }
        else if(posSasuke == 4){
            positionSasuke1 = 638;
            positionSasuke2 = 30;
        }
        else if(posSasuke == 5){
            positionSasuke1 = 6;
            positionSasuke2 = 224;
        }
        else if(posSasuke == 6){
            positionSasuke1 = 158;
            positionSasuke2 = 224;
        }
        else if(posSasuke == 7){
            positionSasuke1 = 317;
            positionSasuke2 = 224;
        }
        else if(posSasuke == 8){
            positionSasuke1 = 470;
            positionSasuke2 = 224;
        }
        else if(posSasuke == 9){
            positionSasuke1 = 639;
            positionSasuke2 = 224;
        }
        else{
            $(".imgBut6").css("width","11.5em");
            positionSasuke1 = 9;
            positionSasuke2 = 8;
            posSasuke = 0;
        } 
    }

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

    function avatarStyle(box,text){
        $(box).css("backgroundColor","black");
        $(text).html("10");
        $(text).css("color","white");
        $(text).css("display","block");
    }

    function cancelAvatarStyle(text){
        $(text).css("color", "black");
        $(text).css("display","none");
    }

    function landStyle(box,text){
        $(box).css("backgroundColor","black");
        $(text).html("10");
        $(text).css("color","white"); 
        $(text).css("display","block");
    }

    function cancelLandStyle(box,text){
        $(box).css("backgroundColor","black");
        $(text).html("???");
        $(text).css("color", "white");
    }


    function avatarBonus(){
        if(score >= 10){
            oneAnime++;
            $(image).removeClass();
            $(image).addClass("imgBut2");
            pos = 0;
            $(clic).off("click",animateScript);
            animateScript3();
            $(renne).bind("click",avatarBonusRenne);
            $(cochon).bind("click",avatarBonusCochon);
            $(dora).bind("click",avatarBonusDora);
            $(sasuke).bind("click",avatarBonusSasuke);
            $("#image").hasClass("imgBut2") ? $(fox).unbind("click") : "";
            if(oneAnime == 1){ 
                $("#image").hasClass("imgBut2") ? $(fox).unbind("click") : "";
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
            $(fox).bind("click",avatarBonus);
            $(cochon).bind("click",avatarBonusCochon);
            $(dora).bind("click",avatarBonusDora);
            $(sasuke).bind("click",avatarBonusSasuke);
            $("#image").hasClass("imgBut3") ? $(renne).unbind("click") : "";
            animeRenne();
            if(oneRenne == 1){
                $("#image").hasClass("imgBut3") ? $(renne).unbind("click") : "";
                positionRenne = 40;
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
            $(fox).bind("click",avatarBonus);
            $(renne).bind("click",avatarBonusRenne);
            $(dora).bind("click",avatarBonusDora);
            $(sasuke).bind("click",avatarBonusSasuke);
            $("#image").hasClass("imgBut4") ? $(cochon).unbind("click") : "";
            animeCochon();
            if(oneCochon == 1){
                $("#image").hasClass("imgBut4") ? $(cochon).unbind("click") : "";
                positionCochon1 = 265;
                positionCochon2 = 43;
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
            $(fox).bind("click",avatarBonus);
            $(renne).bind("click",avatarBonusRenne);
            $(cochon).bind("click",avatarBonusCochon);
            $(sasuke).bind("click",avatarBonusSasuke);
            $(clic).off("click",animateScript);
            $("#image").hasClass("imgBut5") ? $(dora).unbind("click") : "";
            animeDora();
            if(oneDora == 1){
                $("#image").hasClass("imgBut5") ? $(dora).unbind("click") : "";
                positionDora = 0;
                animeDora();
            }
        }
    }

    
    function avatarBonusSasuke(){
        if(score >= 10){
            oneSasuke++;
            $(image).removeClass();
            $(image).addClass("imgBut6");
            posSasuke = 0;
            $(fox).bind("click",avatarBonus);
            $(renne).bind("click",avatarBonusRenne);
            $(cochon).bind("click",avatarBonusCochon);
            $(dora).bind("click",avatarBonusDora);
            $(clic).off("click",animateScript);
            $("#image").hasClass("imgBut6") ? $(sasuke).unbind("click") : "";
            animeSasuke();
            if(oneSasuke == 1){
                $("#image").hasClass("imgBut6") ? $(sasuke).unbind("click") : "";
                positionSasuke1 = 9;
                positionSasuke2 = 8;
                animeSasuke();
            }
        }
    }

    function foretBonus(){
        if(score >= 10){
            $("#main").css("background","linear-gradient(rgb(0 0 0), rgb(14 40 29)) rgba(0, 2, 0, 0.9)");
            $('.iconBox').css("border","3px solid rgb(157 203 95)");
            $("#titleShop").css("border","3px inset #99bd64").css("background","linear-gradient(to top, black, rgb(14 40 29)) rgba(0, 2, 0, 0.9)");
            $("#display").css("backgroundColor","rgb(0 0 0 / 59%)");
            $("#multiply, #autoclic, #bonus").css("background","linear-gradient(217deg, rgb(21 27 17), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgb(15 42 36), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgb(153 194 100), rgba(0,0,255,0) 70.71%)").css("borderImage","repeating-linear-gradient(#255046, #dd9a10, #aabc5e) 1");
            $("#secPersPaysBox").css("border","3px inset rgb(21 27 17)").css("background","linear-gradient(217deg, rgb(148 186 108), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgb(29 61 48), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgb(0 0 0 / 80%), rgba(0,0,255,0) 70.71%)");
            $(".land").css("background", "url('img/fondSombre.jpg') 0px 0px");
            $(".land").css("backgroundRepeat", "no-repeat");
            $(".land").css("backgroundSize", "cover");
            $(clic).on("click",animatePaysageForet);
            $(clic).off("click",animatePaysageCarottes);
            $(clic).off("click",animatePaysageChateau);
            $(clic).off("click",animatePaysageVolcan);
            $(clic).off("click",animatePaysageNuage);
            $(clic).off("click",animatePaysageFire);
            positionForet = 22;
            $("#darkLand").prop("disabled","true");
            $("#chateauLand").removeAttr("disabled");
            $("#volcanLand").removeAttr("disabled");
            $("#nuageLand").removeAttr("disabled");
            $("#fireLand").removeAttr("disabled");
        }
    }

    function chateauBonus(){
        if(score >= 10){
            $("#main").css("background","linear-gradient(#171719, rgb(85 34 156)");
            $('.iconBox').css("border","3px inset black");
            $("#titleShop").css("border","3px inset rgb(77 65 103)").css("background","conic-gradient(rgb(0 0 0), black");
            $("#display").css("backgroundColor","rgb(43 41 62 / 59%)");
            $("#multiply, #autoclic, #bonus").css("background","linear-gradient(217deg, rgb(12 3 31), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(43 24 79), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(104 75 203), rgba(0, 0, 255, 0) 70.71%").css("borderImage","repeating-linear-gradient(rgb(0 0 0), rgb(254 254 254), rgb(96 58 179)) 1 / 1 / 0 stretch");
            $("#secPersPaysBox").css("border","3px inset rgb(21 27 17)").css("background","linear-gradient(217deg, rgb(0 0 0), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(86 35 153), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(105 109 200), rgba(0, 0, 255, 0) 70.71%)");
            $(".landBox").css("border","3px inset black");
            $(".avatarBox").css("border","3px inset black");
            $(".land").css("background", "url('img/chateau.jpg') 0px 0px");
            $(".land").css("backgroundRepeat", "no-repeat");
            $(".land").css("backgroundSize", "cover");
            $(clic).on("click",animatePaysageChateau);
            $(clic).off("click",animatePaysageCarottes);
            $(clic).off("click",animatePaysageForet);
            $(clic).off("click",animatePaysageVolcan);
            $(clic).off("click",animatePaysageNuage);
            $(clic).off("click",animatePaysageFire);
            positionChateau = 20;
            $("#chateauLand").prop("disabled","true");
            $("#darkLand").removeAttr("disabled");
            $("#volcanLand").removeAttr("disabled");
            $("#nuageLand").removeAttr("disabled");
            $("#fireLand").removeAttr("disabled");
        }
    }

    function volcanBonus(){
        if(score >= 10){
            $("#main").css("background","linear-gradient(#171719, #3f8ad3)");
            $('.iconBox').css("border","3px dotted rgb(252 247 183)");
            $("#titleShop").css("border","3px inset rgb(45 9 26)").css("background","linear-gradient(#171719, #3f8ad3)");
            $("#display").css("backgroundColor","rgb(43 41 62 / 59%)");
            $("#multiply, #autoclic, #bonus").css("background"," linear-gradient(217deg, rgb(251 168 118), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(20 0 6), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(211 121 120), rgba(0, 0, 255, 0) 70.71%").css("borderImage","repeating-linear-gradient(rgb(26 6 11), rgb(129 55 58),rgb(246 221 144) ) 1 / 1 / 0 stretch");
            $("#secPersPaysBox").css("border","3px inset rgb(32 32 65)").css("background","linear-gradient(217deg, rgb(24 12 22), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(236 155 120), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(49 45 46), rgba(0, 0, 255, 0) 70.71%)");
            $(".landBox").css("border","3px ridge #190c2a");
            $(".avatarBox").css("border","3px ridge rgb(47, 78, 140)").css("backgroundColor","#b7d3eb");
            $(".land").css("background", "url('img/volcan.jpg') 0px 0px");
            $(".land").css("backgroundRepeat", "no-repeat");
            $(".land").css("backgroundSize", "cover");
            $(clic).on("click",animatePaysageVolcan);
            $(clic).off("click",animatePaysageCarottes);
            $(clic).off("click",animatePaysageChateau);
            $(clic).off("click",animatePaysageForet);
            $(clic).off("click",animatePaysageNuage);
            $(clic).off("click",animatePaysageFire);
            positionVolcan = 20;
            $("#volcanLand").prop("disabled","true");
            $("#darkLand").removeAttr("disabled");
            $("#chateauLand").removeAttr("disabled");
            $("#nuageLand").removeAttr("disabled");
            $("#fireLand").removeAttr("disabled");
        }
    }

    function nuageBonus(){
        if(score >= 10){
            $("#main").css("background","linear-gradient(rgb(45 117 176), rgb(59 125 103)");
            $('.iconBox').css("border","3px solid #b8ffed");
            $("#titleShop").css("border","none").css("background","linear-gradient(#36a4d2, #dae1f7, #4789bf, #24564a)");
            $("#display").css("backgroundColor","rgb(39 110 170 / 52%)");
            $("#multiply, #autoclic, #bonus").css("background","linear-gradient(217deg, rgb(43 117 178), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(120 207 175), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(184 255 237), rgba(0, 0, 255, 0) 70.71%)").css("borderImage","repeating-linear-gradient(rgb(26 42 31), rgb(85 150 165), rgb(151 234 223)) 1 / 1 / 0 stretch");
            $("#secPersPaysBox").css("border","3px inset rgb(70 124 200)").css("background","linear-gradient(217deg, rgb(72 188 229), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(95 186 164), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(208 226 238), rgba(0, 0, 255, 0) 70.71%)");
            $(".landBox").css("border","3px solid rgb(184, 255, 237)");
            $(".avatarBox").css("border","3px solid rgb(184, 255, 237)");
            $(".land").css("background", "url('img/nuage.jpg') 0px 0px");
            $(".land").css("backgroundRepeat", "no-repeat");
            $(".land").css("backgroundSize", "cover");
            $(clic).on("click",animatePaysageNuage);
            $(clic).off("click",animatePaysageFire);
            $(clic).off("click",animatePaysageVolcan);
            $(clic).off("click",animatePaysageCarottes);
            $(clic).off("click",animatePaysageChateau);
            $(clic).off("click",animatePaysageForet);
            positionNuage = 20;
            $("#nuageLand").prop("disabled","true");
            $("#volcanLand").removeAttr("disabled");
            $("#darkLand").removeAttr("disabled");
            $("#chateauLand").removeAttr("disabled");
            $("#fireLand").removeAttr("disabled");
        }
    }

    function fireBonus(){
        if(score >= 10){
            $("#main").css("background","linear-gradient(rgb(134 60 109), rgb(235 29 81))");
            $('.iconBox').css("border","3px solid rgb(255 227 162)").css("box-shadow","0px 0px 9px #520f0f");
            $("#titleShop").css("border","none").css("background","linear-gradient(rgb(117 47 95), rgb(167 86 133), rgb(244 123 93), rgb(217 26 83))");
            $("#display").css("backgroundColor","rgb(159 82 135 / 46%)");
            $("#multiply, #autoclic, #bonus").css("background","linear-gradient(217deg, rgb(255 255 250), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(254 49 97), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(249 137 27), rgba(0, 0, 255, 0) 70.71%)").css("border-image","repeating-linear-gradient(rgb(116 46 93), rgb(250 71 109), rgb(250 181 116)) 1 / 1 / 0 stretch");
            $("#secPersPaysBox").css("border","3px inset rgb(205 97 132)").css("background","linear-gradient(217deg, rgb(118 77 131), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgb(250 142 122), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgb(249 113 95), rgba(0, 0, 255, 0) 70.71%)");
            $(".landBox").css("border","3px solid rgb(250 172 127)");
            $(".avatarBox").css("border","3px solid rgb(247 51 106)");
            $(".land").css("background", "url('img/fire.png') 0px 0px");
            $(".land").css("backgroundRepeat", "no-repeat");
            $(".land").css("backgroundSize", "cover");
            $(clic).on("click",animatePaysageFire);
            $(clic).off("click",animatePaysageNuage);
            $(clic).off("click",animatePaysageVolcan);
            $(clic).off("click",animatePaysageCarottes);
            $(clic).off("click",animatePaysageChateau);
            $(clic).off("click",animatePaysageForet);
            positionFire = 20;
            $("#fireLand").prop("disabled","true");
            $("#nuageLand").removeAttr("disabled");
            $("#volcanLand").removeAttr("disabled");
            $("#darkLand").removeAttr("disabled");
            $("#chateauLand").removeAttr("disabled");
        }
    }

    function animatePaysageCarottes(){
        $(clic).css("backgroundPosition", "-"+position2+"px 0px");
        if(position2 < 610){
            position2 = position2 + 22;
        } else {
            position2 = 0;
        }
    }

    function animatePaysageForet(){
        $(clic).css("backgroundPosition", "-"+positionForet+"px 0px");
        if(positionForet < 550){
            positionForet = positionForet + 22;
        } else {
            positionForet = 0;
        }
    }

    function animatePaysageChateau(){
        $(clic).css("backgroundPosition", "-"+positionChateau+"px 0px");
        if(positionChateau < 1050){
            positionChateau = positionChateau + 20;
        } else {
            positionChateau = 0;
        }
    }

    function animatePaysageVolcan(){
        $(clic).css("backgroundPosition", "-"+positionVolcan+"px 0px");
        if(positionVolcan < 1050){
            positionVolcan = positionVolcan + 20;
        } else {
            positionVolcan = 0;
        }
    }

    function animatePaysageNuage(){
        $(clic).css("backgroundPosition", "-"+positionNuage+"px 0px");
        if(positionNuage < 750){
            positionNuage = positionNuage + 20;
        } else {
            positionNuage = 0;
        }
    }

    function animatePaysageFire(){
        $(clic).css("backgroundPosition", "-"+positionFire+"px 0px");
        if(positionFire < 620){
            positionFire = positionFire + 20;
        } else {
            positionFire = 0;
        }
    }
    
    // let z;
    // function coucou(){
    //     for(z = 50; z <= 450; z+=100){
    //         $(".imgBut4").css("background-position","-"+z+"px -43px");
    //     }
    // }

    // function animeGirl(){
    //     setInterval(coucou,2000);
    // }

    // $(cochon).on("click",animeGirl);

 


    $(clic).on("click",animateScript);
    $(clic).on("click",animatePaysageCarottes);
    $(image).on("mouseover",function(){
        $(this).css("cursor","pointer");
    });
    $(fox).on("click",avatarBonus);
    $(renne).on("click",avatarBonusRenne);
    $(cochon).on("click",avatarBonusCochon);
    $(dora).on("click",avatarBonusDora);
    $(sasuke).on("click",avatarBonusSasuke);
    $(clic).on("click",animateScript3);
    $(clic).on("click",animeRenne);
    $(clic).on("click",animeCochon);
    $(clic).on("click",animeDora);
    $(clic).on("click",animeSasuke);

    // Les hovers pour les icones de personnages

    $(fox).on("mouseover", function(){
        avatarStyle("#foxBox",".text1")});
    $(fox).on("mouseleave", function(){
        cancelAvatarStyle(".text1");
    });
    $(renne).on("mouseover", function(){
        avatarStyle("#renneBox",".text2");
    });
    $(renne).on("mouseleave", function(){
        cancelAvatarStyle(".text2");
    });
    $(cochon).on("mouseover", function(){
        avatarStyle("#cochonBox",".text3");
    });
    $(cochon).on("mouseleave", function(){
        cancelAvatarStyle(".text3");
    });
    $(dora).on("mouseover", function(){
        avatarStyle("#doraBox",".text4");
    });
    $(dora).on("mouseleave", function(){
        cancelAvatarStyle(".text4");
    });;
    $(sasuke).on("mouseover", function(){
        avatarStyle("#sasukeBox",".text5");
    });
    $(sasuke).on("mouseleave", function(){
        cancelAvatarStyle(".text5");
    });

    // pour les paysages


    $("#darkLand").on("click", foretBonus);
    $("#chateauLand").on("click", chateauBonus);
    $("#volcanLand").on("click",volcanBonus);
    $("#nuageLand").on("click", nuageBonus);
    $("#fireLand").on("click", fireBonus);

    $("#darkLand").on("mouseover", function(){
        landStyle("#darkLand",".text")});
    $("#darkLand").on("mouseleave", function(){
        cancelLandStyle("#darkLand",".text");
    });

    $("#chateauLand").on("mouseover", function(){
        landStyle("#chateauLand",".text2psg")});
    $("#chateauLand").on("mouseleave", function(){
        cancelLandStyle("#chateauLand",".text2psg");
    });

    $("#volcanLand").on("mouseover", function(){
        landStyle("#volcanLand",".text3psg")
    });
    $("#volcanLand").on("mouseleave", function(){
        cancelLandStyle("#volcanLand",".text3psg");
    });

    $("#nuageLand").on("mouseover", function(){
        landStyle("#nuageLand",".text4psg")
    });
    $("#nuageLand").on("mouseleave", function(){
        cancelLandStyle("#nuageLand",".text4psg");
    });

    $("#fireLand").on("mouseover", function(){
        landStyle("#fireLand",".text5psg")
    });
    $("#fireLand").on("mouseleave", function(){
        cancelLandStyle("#fireLand",".text5psg");
    });




    // Fonctions icones gauche

    // function onlyOne(fruityOne, fruityZero1,  fruityZero2,  fruityZero3,  fruityZero4,  fruityZero5,  fruityZero6,  fruityZero7,  fruityZero8,  fruityZero9, fruityZero10){
    //     return fruityOne = 1, fruityZero1 = 0,  fruityZero2 = 0,  fruityZero3 = 0,  fruityZero4 = 0,  fruityZero5 = 0,  fruityZero6 = 0,  fruityZero7 = 0,  fruityZero8 = 0,  fruityZero9 = 0, fruityZero10 = 0;
    // }

    // function fruitySwitch(num, achat, fruityOne, fruityZero1,  fruityZero2,  fruityZero3,  fruityZero4,  fruityZero5,  fruityZero6,  fruityZero7,  fruityZero8,  fruityZero9, fruityZero10, box, fruit){
    //     if(score >= num && achat == 0){
    //         onlyOne(fruityOne, fruityZero1,  fruityZero2,  fruityZero3,  fruityZero4,  fruityZero5,  fruityZero6,  fruityZero7,  fruityZero8,  fruityZero9, fruityZero10);
    //         if(achat == 0){
    //             score -= num;
    //         }
    //         achat = 1;
    //         $(box).css("background","url('img/paillette.jpg')").css("backgroundRepeat","no-repeat").css("backgroundSize","cover").css("border","2px inset black");
    //         blurElement(box,0);
    //         $(box).css("filter","drop-shadow(2px 4px 6px black)");
    //         attrDisabledBool()
    //         updateScore(fruit);
    //     }
    //     if(score >= 0 && achat == 1){
    //         onlyOne(fruityOne, fruityZero1,  fruityZero2,  fruityZero3,  fruityZero4,  fruityZero5,  fruityZero6,  fruityZero7,  fruityZero8,  fruityZero9, fruityZero10);
    //         updateScore(fruit);
    //         $(box).css("filter","drop-shadow(2px 4px 6px black)");
    //     }
    // }

    // fruitySwitch(10, achatPomme, pomme, banane, carotte, luffy, pikachu, goku, trump, sonic, lee, allmight, saitama, "#iconPommeBox", "pommes")

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
            updateScore("pikachus");
        }
        if(score >= 0 && achatPikachu == 1){
            pikachu = 1, luffy = 0, banane = 0, pomme = 0, carotte = 0;
            bruit("saitama.mp3");
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
            updateScore("saitamas");
            $("#iconSaitamaBox").css("filter","drop-shadow(2px 4px 6px black)");
        }
    }
    // Les cliques pour les icones a gauche

    $("#iconPommeBox").on("click",switchPomme);

    $("#iconBananeBox").on("click",switchBanane);

    $("#iconLuffyBox").on("click",switchLuffy);

    $("#iconPikaBox").on("click",switchPika);

    $("#iconTrumpBox").on("click",switchTrump);
    
    $("#iconSonicBox").on("click",switchSonic);

    $("#iconLeeBox").on("click",switchLee);

    $("#iconGokuBox").on("click",switchGoku);

    $("#iconAllmightBox").on("click",switchAllmight);

    $("#iconSaitamaBox").on("click",switchSaitama);

});
