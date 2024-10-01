export class EndScreen {
  /** @param { object } props  */
  constructor(props) {
    this.visiblity = false;

    this.screen = document.createElement("div");
    this.screen.setAttribute("class", "endScreen");

    this.title = document.createElement("h2");
    this.title.innerText = props.title;

    this.score = document.createElement("pre");
    this.score.setAttribute("class", "totl_score");

    this.buttons = document.createElement("div");
    this.buttons.setAttribute("class", "buttons");

    this.backButton = document.createElement("button");
    this.backButton.setAttribute("class", "back_btn");

    this.retryButton = document.createElement("button");
    this.retryButton.setAttribute("class", "retry_btn");

    this.exitIcon = new Image(32, 32)
    this.exitIcon.src = "./icons/exit.svg"

    this.restartIcon = new Image(32, 32)
    this.restartIcon.src = "./icons/replay.svg"

    this.backButton.onclick = () => {
      props.action[0]();
    };
    this.retryButton.onclick = () => {
      props.action[1]();
    };

    this.retryButton.append(this.restartIcon, "Retry")
    this.backButton.append(this.exitIcon, "Exit")
    this.buttons.append(this.backButton, this.retryButton);
    this.screen.append(this.title, this.score, this.buttons);
  }

  show() {
    document.body.append(this.screen);
    this.visiblity = true;
  }

  hide() {
    if (this.visiblity) {
      document.body.removeChild(this.screen);
      this.visiblity = false;
    } else return;
  }

  /** @param { number } score  */
  setScore(score) {
    console.log(score);
    this.score.textContent = `Your Total Score :  ${score}`;
  }
}
