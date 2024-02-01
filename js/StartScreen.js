export class StartScreen {
  /**  @param { 'object' } props  */
  constructor(props) {
    this.visiblity = false;

    this.screen = document.createElement("div");
    this.screen.setAttribute("class", "startScreen");

    this.title = document.createElement("h2");
    this.title.innerText = props.title;

    this.button = document.createElement("button");
    this.button.setAttribute("class", "play_btn");
    this.button.innerText = "Play";

    this.button.onclick = () => {
      props.action[0]();
    };

    this.screen.append(this.title, this.button);
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
}
