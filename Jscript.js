var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
function monito(){
pincel.fillStyle ="black"
pincel.beginPath();
pincel.arc(100,40,15,0,2*Math.PI);
pincel.fill();
pincel.fillRect(98,45,5,55);
pincel.fillRect(98,10,5,35);
pincel.fillRect(20,10,98,5);
pincel.fillRect(20,10,5,200);
pincel.fillRect(10,147,120,4);
pincel.fillRect(80,60,40,4);
}monito();
var palabras = ["ALURA","AHORCADO","ORACLE","HTML","CSS","JAVASCRIPT"];
var tablero =  document.getElementById("ahorcado");
var pincel2 = tablero.getContext("2d");
var letras = [];
var palabraCorrecta= "";
var aciertos = 0;
var errores = 6;

function iniciarjuego(){
    document.getElementById("botones-principales").style.display ="none";
    document.getElementById("iniciarjuego").style.display ="block";
    hacerlinea(escojePalabraSecreta());
}
function desistir(){
    document.getElementById("botones-principales").style.display ="block";
    document.getElementById("iniciarjuego").style.display ="none";
    borrarCanvas();
}
function ingresarPalabra(){
    document.getElementById("botones-principales").style.display ="none";
    document.getElementById("agregarPalabra").style.display ="block";
    aciertos= 0;
    errores = false;
}
function Cancelar(){
    document.getElementById("botones-principales").style.display ="block";
    document.getElementById("agregarPalabra").style.display ="none";
}
function guardarEmpezar(){
    borrarCanvas();
    var TextTarea = document.getElementById("Ing-palabra").value;
    palabraSecreta = TextTarea;
    hacerlinea();
    monito();
    document.getElementById("agregarPalabra").style.display ="none";
    document.getElementById("iniciarjuego").style.display ="block";
    errores = 6;
    document.getElementById("Ing-palabra").value = "";
    aciertos = 0;
    if(TextTarea == 0){
        alert("palabra faltante..");
        document.getElementById("iniciarjuego").style.display ="none";
        document.getElementById("agregarPalabra").style.display ="block";
        aciertos= 0;
    }

}
function borrarCanvas(){
    letras = [];
    palabraCorrecta= "";
    errores = 6;
    pincel2.clearRect(0, 0, tablero.width, tablero.height);
}
function nuevojuego(){  
    borrarCanvas();
    hacerlinea(escojePalabraSecreta());
    mono();
}
function escojePalabraSecreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra;
   console.log(palabra);
    return palabraSecreta;
}

function hacerlinea(){
    var ancho = 600/palabraSecreta.length;
    for(var i = 0; i <palabraSecreta.length;i++){
    pincel2.fillStyle = "green";
    pincel2.beginPath();
    pincel2.fill();    
    pincel2.fillRect(50+(ancho*i),300,50+(ancho/palabraSecreta.length),6);
    } 
}
function escribirletraCorrecta(index){
    pincel2.font="bold 52px Arial";
    pincel2.lineWidth = 6;
    pincel2.lineCap ="round";
    pincel2.lineJoin ="round";
    pincel2.fillStyle="#0A3871";
    var ancho = 600/palabraSecreta.length;
    pincel2.fillText(palabraSecreta[index],66+(ancho*index),280);
}
function escribirLetraIncorrecta(letra,erroresleft){
    pincel2.font="bold 40px Arial";
    pincel2.lineWidth = 6;
    pincel2.lineCap ="round";
    pincel2.lineJoin ="round";
    pincel2.fillStyle="#0A3871"; 
    pincel2.fillText(letra,5+(40*(10-erroresleft)),360,40);
    adiccionarLetraIncorrecta();
    
}

function verificarLetrasClicada(key){
    if (letras.length<1||letras.indexOf(key)<0) {
        letras.push(key);
        return false;
    }else{
        letras.push(key);
        return true;
    }
}
function adiccionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i];
}
function adiccionarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores-=1 ;
        mono();
    }
}
document.onkeydown =(e) =>{
    let letra =e.key.toUpperCase()
    if(!verificarLetrasClicada(e.key)){
        console.log(letra);
        if (palabraSecreta.includes(letra)) {
        adiccionarLetraCorrecta(palabraSecreta.indexOf(letra));
        for(let i = 0; i<palabraSecreta.length;i++){
            if (palabraSecreta[i]==letra) {
                escribirletraCorrecta(i);
                aciertos++;
                if(aciertos== palabraSecreta.length){
                   setTimeout(juegoGanado,500);
                   pincel2.fillStyle ="black"
                   pincel2.fillText("GANASTE",100,100,200)
                   pincel2.fillText("¡¡FELICIDADES!!",100,150,200);
                }
                }
            }
        }
        else{
            if (!verificarLetrasClicada(e.key))
            return
            adiccionarLetraCorrecta(letra)
            escribirLetraIncorrecta(letra,errores)
        }
    }
}
function mono(){
    if(errores<= 5){
    pincel2.fillStyle ="black"
    pincel2.fillRect(650,245,100,5);
    pincel2.fillRect(700,0,5,250);
    
}
    if(errores <= 4){
    pincel2.fillRect(700,0,150,5);
    pincel2.fillRect(850,0,5,20);
    pincel2.beginPath();
    pincel2.fill();
}if(errores <=3){
    pincel2.arc(850,50,30,0,8*Math.PI);
    pincel2.fillRect(846,80,8,80);
    pincel2.fill();
}if(errores<=2){
    pincel2.fillRect(800,105,100,5);
    pincel2.beginPath();
}if(errores<=1){
    pincel2.moveTo(850,160);
    pincel2.lineTo(887,180);
    pincel2.lineTo(895,175);
    pincel2.lineTo(855,155);
    pincel2.fill();
}if(errores<=0){   
    pincel2.beginPath();
    pincel2.moveTo(847,160);
    pincel2.lineTo(815,180);
    pincel2.lineTo(807,175);
    pincel2.lineTo(845,155);
    pincel2.fill(); 
 }if( errores == 1){
     alert("ULTIMA OPORTUNIDAD...");
 }if(errores== 0){
    setTimeout(juegoPerdido,500);
    pincel2.fillText("PERDISTE...",100,100,200)
    pincel2.fillText(`LA PALABRA ERA  ${palabraSecreta}`,100,150,450);
 }
}
function juegoGanado(){
    alert("A VER SI CORRES CON LA MISMA SUERTE DA UN CLICK AQUI")
    errores=6;
    aciertos = 0;
    mono();
    nuevojuego();
}
function juegoPerdido(){
    alert("SUERTE PARA LA PROXIMA SIGUE INTENDOLO DANDO UN CLICK AQUI")
    errores=6;
    mono();
    nuevojuego();
}



