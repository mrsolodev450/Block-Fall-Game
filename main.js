import { EndScreen } from "./js/EndScreen.js";
import { StartScreen } from "./js/StartScreen.js";

const gameplay = document.getElementById("gameplay");
const block1 = document.getElementById("block-1");
const block2 = document.getElementById("block-2");
const block3 = document.getElementById("block-3");
const character = document.getElementById("character");
const score_board = document.getElementById("score");
const left_btn = document.getElementById("left_btn")
const right_btn = document.getElementById("right_btn")

const VIEW_PADDING = window.innerWidth < 500 ? (window.innerWidth / 7) : 50
const TWO_OBJ_GAP = VIEW_PADDING
const OBJ_WIDTH = window.innerWidth < 500 ? (window.innerWidth / 9) : 100
const ENEMY_OBJ = [block1, block2, block3]
const GAME_SPEED = 7

const START_SCREEN_CONFIG = {
  title: 'Block Fall',
  action: [startGame]
}

const END_SCREEN_CONFIG = {
  title: 'Game Over',
  action: [backToStart, startGame]
}

const startScreen = new StartScreen(START_SCREEN_CONFIG)
const endScreen = new EndScreen(END_SCREEN_CONFIG)


let score = 0;
let i = 1;
let count = 0
let isGameOver = true
let n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
let n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
let bg_colors = ["slateblue", "cornflowerblue", "royalblue", "#0090ff"];

startScreen.show()

function main() {
 
  if (!isGameOver) {
    score_board.textContent = `Score: ${score}`;
    countScore()
    checkCollision(character, block1)
    checkCollision(character, block2)
    checkCollision(character, block3)
    moveObj(ENEMY_OBJ)
  }
  
  requestAnimationFrame(main)
}

main()

function startGame() {
  startScreen.hide()
  endScreen.hide()
  
  gameplay.classList.remove("hide");

  n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
  n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))

  ENEMY_OBJ.forEach((obj) => {
    obj.style.top = `-${obj.getBoundingClientRect().height}px`
  })

  i = 1
  character.style.left = `${(OBJ_WIDTH + TWO_OBJ_GAP) * i + VIEW_PADDING}px`
  block1.style.left = `${VIEW_PADDING}px`
  block3.style.right = `${VIEW_PADDING}px`

  isGameOver = false
  console.log(gameplay.getBoundingClientRect().width);
}

function backToStart() {
  startScreen.show()
  endScreen.hide()
  gameplay.classList.add("hide");
}

function countScore() {
  count++
  score = Math.floor(count / 10)
}

function checkCollision(obj1, obj2) {

  const x = obj1.getBoundingClientRect().left
  const y = obj1.getBoundingClientRect().top
  const bx = obj2.getBoundingClientRect().left
  const by = obj2.getBoundingClientRect().top
  const bh = obj2.getBoundingClientRect().height
  const bw = obj2.getBoundingClientRect().width
  const xh = obj1.getBoundingClientRect().height
  const xw = obj1.getBoundingClientRect().width
  

  if (x + xw  >= bx && x <= bx + bw && y + xh >= by && y <= by + bh) {

    endScreen.setScore(score)
    endScreen.show()
    count = 0
    
    isGameOver = true
    
  }

}

function moveObj(obj) {

  let j = Math.floor(n / 100)
  let j2 = Math.floor(n2 / 100)

  if (j2 === j) n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))

  let by = obj[j].getBoundingClientRect().top
  let bh = obj[j].getBoundingClientRect().height 
  let by2 = obj[j2].getBoundingClientRect().top
  let bh2 = obj[j2].getBoundingClientRect().height 

  if (by > window.innerHeight + bh) {
    obj[j].style.top = `-${bh}px`
    obj[j].style.backgroundColor = bg_colors[Math.floor(Math.random() * bg_colors.length)]
    n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
  } else obj[j].style.top = `${by + (GAME_SPEED * (j + 2))}px`

  if (by2 > window.innerHeight + bh2) {
    obj[j2].style.top = `-${bh2}px`
    obj[j2].style.backgroundColor = bg_colors[Math.floor(Math.random() * bg_colors.length)]
    n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
  } else obj[j2].style.top = `${by2 + (GAME_SPEED * (j2 + 1))}px`
  
}

function moveCharacterLeft() {
  if (i > 0 && !isGameOver) {
    i -= 1
    character.style.left = `${(OBJ_WIDTH + TWO_OBJ_GAP) * i + VIEW_PADDING}px`;
    
  } else return
}

function moveCharacterRight() {
  if (i < 2 && !isGameOver) {
    i += 1
    character.style.left = `${(OBJ_WIDTH + TWO_OBJ_GAP) * i + VIEW_PADDING}px`;
    
  } else return
}

document.addEventListener('keydown', (e)=>{
  if (e.key == 'ArrowLeft') {
    moveCharacterLeft()
  } else if (e.key === 'ArrowRight') {
    moveCharacterRight()
  }
})

left_btn.addEventListener('click', moveCharacterLeft)
right_btn.addEventListener('click', moveCharacterRight)
