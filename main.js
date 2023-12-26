const play_btn = document.getElementById("play_btn");
const retry_btn = document.getElementById("retry_btn");
const back_btn = document.getElementById("back_btn");
const start_screen = document.getElementById("startScreen");
const end_screen = document.getElementById("endScreen");
const bg_cover = document.getElementById("bg_cover");
const gameplay = document.getElementById("gameplay");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");
const character = document.getElementById("character");
const right_btn = document.getElementById("right_btn");
const left_btn = document.getElementById("left_btn");
const all_btn = document.querySelectorAll("button");
const score_board = document.getElementById("score");
const totl_score = document.getElementById("totl_score");

let VIEW_PADDING = 50
let TWO_OBJ_GAP = 50
let OBJ_WIDTH = 100
const ENEMY_OBJ = [block1, block2, block3]
const GAME_SPEED = 10

if (window.innerWidth < 350) {
  VIEW_PADDING = 25
  TWO_OBJ_GAP = 25
  OBJ_WIDTH = 80
  console.log('tyhfytt');
}

let score = 0;
let i = 1;
let count = 0
let isGameOver = true
let n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
let n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))

let bg_colors = ["yellow", "blue", "magenta", "red", "white"];

back_btn.addEventListener("click", backToStart);
play_btn.addEventListener("click", startGame);
retry_btn.addEventListener("click", startGame);
right_btn.addEventListener("click", moveCharacterRight)
left_btn.addEventListener("click", moveCharacterLeft);

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
  bg_cover.classList.add("hide");
  start_screen.classList.add("hide");
  end_screen.classList.add("hide");
  gameplay.classList.remove("hide");

  n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
  n2 = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))

  ENEMY_OBJ.forEach((obj) => {
    obj.style.top = `-${obj.getBoundingClientRect().height}px`
  })

  i = 1
  character.style.left = `${(OBJ_WIDTH + TWO_OBJ_GAP) * i + VIEW_PADDING}px`

  isGameOver = false
}

function backToStart() {
  bg_cover.classList.remove("hide");
  start_screen.classList.remove("hide");
  end_screen.classList.add("hide");
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

    bg_cover.classList.remove("hide");
    end_screen.classList.remove("hide");

    totl_score.textContent = `Total Score: ${score}`
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
    n = Math.floor(Math.random() * (ENEMY_OBJ.length * 100))
  } else obj[j].style.top = `${by + (GAME_SPEED * (j + 2))}px`

  if (by2 > window.innerHeight + bh2) {
    obj[j2].style.top = `-${bh2}px`
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


