var statusatual=false
var objects=[]

function preload(){
 video=createVideo("video.mp4")
 video.hide()
}

function setup(){
canvas=createCanvas(700,500)
canvas.center()


}

function gotResults(error,results){
    if(error){
        console.log("deu erro")
    }else{
        objects=results
}
}


function draw(){
image(video,0,0,700,500)
if(statusatual){
    objectDetector.detect(video,gotResults)
    for(var i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: objetos detectados"
        document.getElementById("numerodeobjetos").innerHTML="quantidade de objetos:"+objects.length
        porcentagem=floor(objects[i].confidence*100)
        nome=objects[i].label
        x=objects[i].x
        y=objects[i].y
        height=objects[i].height
        width=objects[i].width
        stroke("blue")
        noFill()
        textSize(25)
        text(nome+" "+porcentagem+"%",x,y)
        rect(x,y,width,height)
        



    }
}  

}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status: detectando objeto"
}

function modelLoaded(){
    console.log("modelo carregado")
    statusatual=true
    video.loop()
    video.speed(1)
    video.volume(0)
}

