const block = document.querySelector("#block")
const hole = document.querySelector("#opening")
const player = document.querySelector("#player")
const start = document.querySelector("#startGame")
const end = document.querySelector("#endGame")
const score = document.querySelector("#score")
const level = document.querySelector(".nextLevel")
const instructions = document.querySelector(".instructions")
const instructionExit = document.querySelector(".exitInstructions")

let playerSpeed = 20
let speedBonus = 0
let levelSpeed = 3
let count = 0

const quit = {
  exit: false
}
const keyState = []

start.addEventListener("click", function(){
  block.classList.add("animationStart")
  hole.classList.add("animationStart")
  hole.style.animation = `blockSlide ${levelSpeed}s infinite linear`
  block.style.animation = `blockSlide ${levelSpeed}s infinite linear`
  score.innerHTML = `Score: ${count}`
  quit.exit = false
  player.classList.remove("playerInvisible")
  player.style = "left: 30px", "top: 200px"
  gameStart()
})
end.addEventListener("click", function () {
  count = 0
  quit.exit = true
  player.classList.add("playerInvisible")
  hole.style.animation = `none`
  block.style.animation = `none`
  player.style = "left: 30px", "top: 200px"
  location.reload()
})
instructionExit.addEventListener("click", function(){
  instructions.style = "display: none"
})

hole.addEventListener("animationiteration", function() {
  ++count
  if (quit.exit === true){
    return
  }
  const random = -((Math.random() * 600) + 100) 
  hole.style.top = random + "px"
  score.innerHTML = `Score: ${count}`
})

hole.addEventListener("animationend", function(){
  console.log("ended")
})

window.addEventListener("keydown", function(e) {
  keyState[e.code] = true
}) 
window.addEventListener("keyup", function(e) {
  keyState[e.code] = false
})

function gameStart() {
  hole.style.animation = `blockSlide ${levelSpeed}s infinite linear`
  block.style.animation = `blockSlide ${levelSpeed}s infinite linear`
  if (count === 5){
    level.classList.remove("invisibleMessage")
    hole.style.animation = `none`
    block.style.animation = `none`
    levelSpeed = 1.5
    speedBonus = 20
    setTimeout(function(){
      count = 6
      level.classList.add("invisibleMessage")
      hole.style.animation = `blockSlide ${levelSpeed}s infinite linear`
      block.style.animation = `blockSlide ${levelSpeed}s infinite linear`
    }, 2000)
  }
  if (count === 15) {
    level.classList.remove("invisibleMessage")
    hole.style.animation = `none`
    block.style.animation = `none`
    levelSpeed = 1.1
    speedBonus = 30
    setTimeout(function () {
      count = 16
      level.classList.add("invisibleMessage")
      hole.style.animation = `blockSlide ${levelSpeed}s infinite linear`
      block.style.animation = `blockSlide ${levelSpeed}s infinite linear`
    }, 2000)
  }

  playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
  playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))

  BlockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
  holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"))
  let cTop = -(700 - playerTop)

  if (keyState["ShiftRight"] || keyState["ShiftLeft"]){
    playerSpeed = 30
  } else {
    playerSpeed = 20
  }
  
  if (keyState["ArrowDown"] && playerTop < 660) {
    player.style.top = playerTop + (playerSpeed + speedBonus) + "px"
  } else if (keyState["ArrowUp"] && playerTop > 10) {
    player.style.top = playerTop - (playerSpeed + speedBonus) + "px"
  } else if (keyState["ArrowLeft"] && playerLeft > 15) {
    player.style.left = playerLeft - (playerSpeed + speedBonus) + "px"
  } else if (keyState["ArrowRight"] && playerLeft < 535) {
    player.style.left = playerLeft + (playerSpeed + speedBonus) + "px"
  }


  if ((BlockLeft < (playerLeft + 50)) && (BlockLeft > (playerLeft - 80)) && ((cTop < holeTop || cTop > holeTop + 70))){
    block.style.animationPlayState = "paused"
    hole.style.animationPlayState = "paused"
    alert(`game over, your score is ${count}`)
    count = 0
    quit.exit = true
    player.classList.add("playerInvisible")
    player.style = "left: 30px", "top: 200px"
    block.classList.remove("animationStart")
    hole.classList.remove("animationStart")
    block.style.animationPlayState = "running"
    hole.style.animationPlayState = "running"
    location.reload()
  }
  if (quit.exit === true) {
    return
  }
  setTimeout(gameStart, 5)
}
