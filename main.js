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

const VIEW_PADDING = 50
const TWO_OBJ_GAP = 50
const OBJ_WIDTH = 100

let score = 0;
let i = 1;
let count = 0
let isGameOver = true
let n = Math.floor(Math.random() * 300)

let bg_colors = ["yellow", "blue", "magenta", "red", "white"];

back_btn.addEventListener("click", () => {
  bg_cover.classList.remove("hide");
  start_screen.classList.remove("hide");
  end_screen.classList.add("hide");
  gameplay.classList.add("hide");
});

play_btn.addEventListener("click", () => {
  bg_cover.classList.add("hide");
  start_screen.classList.add("hide");
  end_screen.classList.add("hide");
  gameplay.classList.remove("hide");
  isGameOver = false
});

retry_btn.addEventListener("click", () => {
  bg_cover.classList.add("hide");
  start_screen.classList.add("hide");
  end_screen.classList.add("hide");
  gameplay.classList.remove("hide");
  isGameOver = false
});

function main() {
 
  if (!isGameOver) {

    score_board.textContent = `Score: ${score}`;
    countScore()

    checkCollision(character, block1)
    checkCollision(character, block2)
    checkCollision(character, block3)

    moveObj([block1, block2, block3])
  }
  requestAnimationFrame(main)
}

main()

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
    gameplay.classList.add("hide");

    totl_score.textContent = `Total Score: ${score}`
    count = 0
    
    isGameOver = true
    
  }

}

function moveObj(obj) {

  let j = Math.floor(n / 100)

  let by = obj[j].getBoundingClientRect().top
  let bh = obj[j].getBoundingClientRect().height 

  if (by > window.innerHeight + bh) {
    obj[j].style.top = `-${bh}px`
    n = Math.floor(Math.random() * 300)
  } else obj[j].style.top = `${by + 10}px`
  
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

right_btn.addEventListener("click", moveCharacterRight)

document.addEventListener('keydown', (e)=>{
  if (e.key == 'ArrowLeft') {
    moveCharacterLeft()
  } else if (e.key === 'ArrowRight') {
    moveCharacterRight()
  }
})

left_btn.addEventListener("click", moveCharacterLeft);

