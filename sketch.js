//switch case

// var diaSemana = "domingo"

// if(diaSemana == "segunda"){
//     console.warn("começou essa budega");
// } else if(diaSemana == "terça"){
//   console.warn("terminei o download da alma");
// } else if(diaSemana == "quarta"){
//   console.warn("no meio da semana, começa contagem regressiva");
// } else if(diaSemana == "quinta"){
//   console.warn("opa! to com energia! bora jogar um truco");
// } else if(diaSemana == "sexta"){
//   console.warn("aeeeee sextouuuu");
// } else if(diaSemana == "sabado"){
//   console.warn("cassinãããããoooooo");
// } else {
//   console.warn("amanhã ja é segunda =(");
// }

// switch (diaSemana) {
//   case "segunda":
//     console.warn("começou essa budega");
//     break
//   case "terça":
//     console.warn("terminei o download da alma");
//     break
//   case "quarta":
//     console.warn("no meio da semana, começa contagem regressiva");
//     break
//   case "quinta":
//     console.warn("opa! to com energia! bora jogar um truco");
//     break
//   case "sexta":
//     console.warn("aeeeee sextouuuu");
//     break
//   case "sabado":
//     console.warn("cassinãããããoooooo");
//     break
//   default:
//     console.warn("amanhã ja é segunda =(");
    
// }



// var numerosinhos = [40,78,92,32,100]


// function media(){
//     var soma = numerosinhos[0] + numerosinhos[1] + numerosinhos[2]+ numerosinhos[3] + numerosinhos[4]
//     var calculito = soma/numerosinhos.length
//     console.log(calculito);
// }


// media()

// media()

// function media(){

//   var soma = 0
//   for(var i = 0; i< numerosinhos.length; i++){

//     soma = soma + numerosinhos[i]

//   }
//   var calculito = soma/numerosinhos.length
//   console.log(calculito);
// }

// var estudante = {
//   nome: "Pinto no Lixo",
//   idade: 0.15,
//   comidaFavorita: ["lixo", "pipoca", "quiabo frito"],
//   notas: [10, 1, 0.5, 3],
//   materiaFavorita: true
// }

// function contagem(){
//   var numeros = [1, 2, 3, 4, 5, 6, 7, 8,9]
//   var tamanho = numeros.length

//   for(var i = 1; i <= tamanho; i++){
//     console.log(numeros[i]);
//   }
// }

// contagem()



var PLAY = 1
var END = 0
var gameState = PLAY

var trex ,trexCorrendo, bordas, chao, chaoAndante, ninguemSeImporta, ale, alibaba,alibabaVoante, kakitus, pontos, morrido, perdeuOtario,perdeuOtarioImg, platinarImg, pulando, morrendo, checkPoint;
function preload(){
  trexCorrendo = loadAnimation("1.png", "2.png", "3.png");
  chaoAndante = loadAnimation("ground2.png")
  alibabaVoante = loadAnimation("cloud.png")
  kakitu1 = loadAnimation("obstacle1.png")
  kakitu2 = loadAnimation("obstacle2.png")
  kakitu3 = loadAnimation("obstacle3.png")
  kakitu4 = loadAnimation("obstacle4.png")
  kakitu5 = loadAnimation("obstacle5.png")
  kakitu6 = loadAnimation("obstacle6.png")
  morrido = loadAnimation("trex_collided.png")
  perdeuOtarioImg = loadImage("restart.png")
  platinarImg = loadImage("gameOver.png")
  pulando = loadSound("jump.mp3")
  morrendo = loadSound("die.mp3")
  checkPoint = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("morteMorrida", morrido)
  //criando bordas - aqui teremos a criação das 4 bordas da telas
  bordas = createEdgeSprites();

    //ajustando posição e tamanho do t-rex
    trex.scale = 0.5
    trex.x = 50

  //criando o fundo
  chao = createSprite(200,180,400,20)
  chao.addAnimation("chao", chaoAndante)
  perdeuOtario = createSprite(300,100);
  	perdeuOtario.addImage(perdeuOtarioImg);
  
  	platinar = createSprite(300,140);
  	platinar.addImage(platinarImg);
  
  	perdeuOtario.scale = 0.5;
  	platinar.scale = 0.5;
  ninguemSeImporta = createSprite(200,190,400,10)
  ninguemSeImporta.visible = false

  pontos = 0
  // console.log(estudante.nome);
  // console.log(estudante.comidaFavorita);
  // console.log(estudante.materiaFavorita);
  // gameState = END
  obstaculosG = new Group();
  nuvenzitasG = new Group();
  trex.debug = true;
  trex.setCollider("circle",0,0,40);


}

function draw(){
  background("white")

  
  
  if(gameState == PLAY){
    perdeuOtario.visible = 0
    platinar.visible = 0
    //chao
    chao.velocityX = -2
    if(chao.x < 0){
      chao.x = chao.width/2
    }
    //pontos
    text("Pontuação: " + pontos, 500, 50)
    pontos = Math.round(frameCount/6)
    //mecânica de pulo
    if(keyDown("SPACE")&& trex.y >= 160){
    trex.velocityY =-10
    pulando.play()
     }

    trex.depth = 2
    //funções
    nuvenzitas()
    obstaculos() 
    if(pontos>0 && pontos%10 == 0){
      checkPoint.play() 
   }
    if(obstaculosG.isTouching(trex)){
      gameState = END
      morrendo.play()
    }
  }else if(gameState == END){
    chao.velocityX = 0
    obstaculosG.setVelocityXEach(0)
    nuvenzitasG.setVelocityXEach(0)
    obstaculosG.setLifetimeEach(-1)
    nuvenzitasG.setLifetimeEach(-1)
    trex.velocityY = 0
    trex.changeAnimation("morteMorrida", morrido)
    perdeuOtario.visible = 1
    platinar.visible = 1

  }


      //mecanica da gravidade
      trex.velocityY = trex.velocityY + 0.5 
          //colisão no chão
    trex.collide(ninguemSeImporta)
    if(mousePressedOver(platinar)){
      console.log("deu certo");
    }
    drawSprites();
}

function nuvenzitas(){
  if(frameCount % 60 == 0){
    ale = Math.round(random(30,140))
    alibaba = createSprite(600, ale, 40, 10);
    alibaba.addAnimation("razante", alibabaVoante)
    alibaba.scale = 0.4
    alibaba.velocityX = -3
    alibaba.depth = 1

    alibaba.lifetime = 200

    console.log(trex.depth);
    console.log(alibaba.depth);
    obstaculosG.add(alibaba)
}

}

function obstaculos(){
  if(frameCount % 60 == 0){
  kakitus = createSprite(600, 165, 40, 10);
  kakitus.velocityX = -6
  kakitus.scale = 0.5
  kakitus.lifetime = 300
  ale2 = Math.round(random(1, 6))
  switch (ale2) {
    case 1:
      kakitus.addAnimation("kakitu", kakitu1)
      break;
    case 2:
      kakitus.addAnimation("kakitu", kakitu2)
      break;
    case 3:
      kakitus.addAnimation("kakitu", kakitu3)
      break;
    case 4:
      kakitus.addAnimation("kakitu", kakitu4)
      break;
    case 5:
      kakitus.addAnimation("kakitu", kakitu5)
      break;
    default:
      kakitus.addAnimation("kakitu", kakitu6)
  }
  obstaculosG.add(kakitus)
}
}