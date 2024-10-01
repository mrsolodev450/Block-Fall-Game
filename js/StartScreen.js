export class StartScreen {
  /**  @param { 'object' } props  */
  constructor(props) {
    this.visiblity = false;

    this.authorInfo = document.createElement("div")
    this.authorInfo.setAttribute("class", "author-info");

    this.authorInfoText = document.createElement("p")
    this.authorInfoText.innerHTML = "Created By KnightWor"

    this.links = document.createElement("div")
    this.links.setAttribute("class", "author-links")

    this.screen = document.createElement("div");
    this.screen.setAttribute("class", "startScreen");

    this.title = document.createElement("h2");
    this.title.innerText = props.title;

    this.button = document.createElement("button");
    this.button.setAttribute("class", "play_btn");

    this.icon = new Image(32, 32)
    this.icon.src = "./icons/play.svg"

    this.instaIcon = document.createElement("a")
    this.instaIcon.href = "https://www.instagram.com/knightwor_/"
    this.instaIcon.target = "_blank"
    this.instaIcon.innerHTML = '<i class="fa-brands fa-instagram"></i>'
    
    this.ytIcon = document.createElement("a")
    this.ytIcon.href = "https://www.youtube.com/@mr.solodev"
    this.ytIcon.target = "_blank"
    this.ytIcon.innerHTML = '<i class="fa-brands fa-youtube"></i>'

    this.githubIcon = document.createElement("a")
    this.githubIcon.href = "https://github.com/mrsolodev450"
    this.githubIcon.target = "_blank"
    this.githubIcon.innerHTML = '<i class="fa-brands fa-github"></i>'

    this.button.onclick = () => {
      props.action[0]();
    };

    this.links.append(this.instaIcon, this.ytIcon, this.githubIcon)
    this.authorInfo.append(this.authorInfoText, this.links)
    this.button.append(this.icon, "Play")
    this.screen.append(this.title, this.button, this.authorInfo);
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
