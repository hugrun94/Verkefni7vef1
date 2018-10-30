/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;
var right;
var wrong;
var timi1;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
	var game = confirm("Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.")
	if (game) {
	    play()
	}
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
	right=0;
	wrong=0;
	timi1=Date.now()/1000;

	for(var i=0;i<GAMES_TO_PLAY;i++){
		ask();
	}
	anothergame();
}


function anothergame(){
	var timi2 = Date.now()/1000;
	var time = (timi2-timi1).toFixed(2)
	var gamesplayed = right+wrong
	var median = (right/time).toFixed(2);
	
	var finish = window.confirm("Þú svaraðir " + right + " af " + gamesplayed + " á " + time + " sekúndum " + "Meðalrétt svör á sekúndu er " + median)
	if(finish){
		var another = window.confirm("Viltu spila annan leik? ")
		if(another){
			play();
		}else{
			window.prompt("Hætt í leik")
			exit();
		}
	}	
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda prompt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {

	var result = question();
	var spurning = result.spurning;
	var svar = result.svar;

	var answer = window.prompt("Hvað er " + spurning + "?")

	if(answer){
		if(answer === svar){
			right++;
		}else{
			wrong++;
		}
	}else if(answer === null){
		alert("Hætt í leik");
		anothergame()
	}

	
}

function question(){

	var x = randomNumber(1,100)
	var y = randomNumber(1,100)

	var xmult = randomNumber(1,10)
	var ymult = randomNumber(1,10)

	var xdiv = randomNumber(2,10)
	var ydiv = xdiv*randomNumber(2,10)

	var randomquestion = randomNumber(1,4)
	var spurning='';
	var svar=0;

	switch(randomquestion) {
	    case 1:
	    	svar = x+y;
	    	spurning = x+"+"+y
	    	return {spurning,svar}

	    case 2:
	        svar = x-y;
	    	spurning = x+"-"+y
	    	return {spurning,svar}

	    case 3:
	        svar = xmult*ymult;
	    	spurning = xmult + "*" + ymult
	    	return {spurning,svar}

	    case 4:
	        svar = ydiv/xdiv;
	    	spurning = ydiv + "/" + xdiv
	    	return {spurning,svar}

	    default:
	        svar = x+y;
	    	spurning = x+"+"+y
	    	return {spurning,svar}

}

}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
