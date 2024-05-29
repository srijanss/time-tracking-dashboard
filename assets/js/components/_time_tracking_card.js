import WorkIcon from "../../images/icon-work.svg";
import PlayIcon from "../../images/icon-play.svg";
import StudyIcon from "../../images/icon-study.svg";
import ExerciseIcon from "../../images/icon-exercise.svg";
import SocialIcon from "../../images/icon-social.svg";
import SelfCareIcon from "../../images/icon-self-care.svg";
import { defaultTimeFrame } from "./_time_frame_item";
import css from "./_time_tracking_card.css?inline";

export class TimeTrackingComponent {
  constructor(data) {
    this.data = data;
    this.title = this.data.title;
    this.timeframes = this.data.timeframes;
  }

  render() {
    return `
      <time-tracking-card
        data-theme="${this.getTheme(this.title)}"
        data-title="${this.title}"
        data-img-src="${this.getImgSrc(this.title)}"
        data-img-alt="${this.title} Icon"
        data-img-width="${this.getImgWidth(this.title)}"
        data-img-height="${this.getImgHeight(this.title)}"
        data-daily-current="${this.timeframes.daily.current}"
        data-daily-previous="${this.timeframes.daily.previous}"
        data-weekly-current="${this.timeframes.weekly.current}"
        data-weekly-previous="${this.timeframes.weekly.previous}"
        data-monthly-current="${this.timeframes.monthly.current}"
        data-monthly-previous="${this.timeframes.monthly.previous}"
      ></time-tracking-card>
    `;
  }

  getTheme(title) {
    return title.toLowerCase().replace(" ", "-");
  }

  getImgSrc(title) {
    switch (title) {
      case "Work":
        return WorkIcon;
      case "Play":
        return PlayIcon;
      case "Study":
        return StudyIcon;
      case "Exercise":
        return ExerciseIcon;
      case "Social":
        return SocialIcon;
      case "Self Care":
        return SelfCareIcon;
      default:
        return WorkIcon;
    }
  }

  getImgWidth(title) {
    switch (title) {
      case "Work":
        return "79";
      case "Play":
        return "76";
      case "Study":
        return "79";
      case "Exercise":
        return "81";
      case "Social":
        return "75";
      case "Self Care":
        return "67";
      default:
        return "48";
    }
  }

  getImgHeight(title) {
    switch (title) {
      case "Work":
        return "79";
      case "Play":
        return "77";
      case "Study":
        return "79";
      case "Exercise":
        return "55";
      case "Social":
        return "100";
      case "Self Care":
        return "67";
      default:
        return "48";
    }
  }
}

export default class TimeTrackingCard extends HTMLElement {
  constructor() {
    super();
    this.title = "";
    this.timeframes = {};
    this.activeTimeframe = defaultTimeFrame.value;
    this.stylesText = "";
  }

  connectedCallback() {
    this.render();
    this.handleCardContentFocus();
    this.handleEllipsisIconFocus();
    this.handleTimeframeChange();
  }

  render() {
    this.title = this.dataset.title;
    this.timeframes = {
      daily: {
        current: this.dataset.dailyCurrent,
        previous: this.dataset.dailyPrevious,
      },
      weekly: {
        current: this.dataset.weeklyCurrent,
        previous: this.dataset.weeklyPrevious,
      },
      monthly: {
        current: this.dataset.monthlyCurrent,
        previous: this.dataset.monthlyPrevious,
      },
    };
    this.imgSrc = this.dataset.imgSrc;
    this.imgAlt = this.dataset.imgAlt;
    this.imageWidth = this.dataset.imgWidth;
    this.imageHeight = this.dataset.imgHeight;
    this.theme = this.dataset.theme;
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        ${css}
      </style>
      <div class="card card-${this.theme}">
        <div class="card__img-wrapper">
          <img
            class="card__img card__img-${this.theme}"
            src="${this.imgSrc}"
            alt="${this.imgAlt}"
            width="${this.imageWidth}"
            height="${this.imageHeight}"
          />
        </div>
        <section class="card__content">
          <h2 class="card__title">${this.title}</h2>
          <svg
            width="21"
            height="5"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="ellipsis-svg-title"
            focusable="false"
            class="card__icon"
          >
            <title id="ellipsis-svg-title">Ellipsis Icon</title>
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
            />
          </svg>
          <p class="card__current-time">${this.getCurrentTime()}</p>
          <p class="card__previous-time">${this.getPreviousTime()}</p>
        </section>
      </div>`;
  }

  getCurrentTime() {
    return `${this.timeframes[this.activeTimeframe].current}hrs`;
  }

  getPreviousTime() {
    if (this.activeTimeframe === "daily") {
      return `Yesterday - ${this.timeframes[this.activeTimeframe].previous}hrs`;
    } else if (this.activeTimeframe === "weekly") {
      return `Last Week - ${this.timeframes[this.activeTimeframe].previous}hrs`;
    } else if (this.activeTimeframe === "monthly") {
      return `Last Month - ${
        this.timeframes[this.activeTimeframe].previous
      }hrs`;
    }
  }

  handleCardContentFocus() {
    const cardContent = this.shadowRoot.querySelector(".card__content");
    cardContent.addEventListener("mouseover", () => {
      cardContent.classList.add("active");
    });
    cardContent.addEventListener("mouseout", () => {
      cardContent.classList.remove("active");
    });
  }

  handleEllipsisIconFocus() {
    const ellipsisIcon = this.shadowRoot.querySelector(".card__icon");
    ellipsisIcon.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      e.currentTarget.classList.add("active");
    });
    ellipsisIcon.addEventListener("mouseout", (e) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("active");
    });
  }

  handleTimeframeChange() {
    document.addEventListener("timeframeChange", (e) => {
      this.activeTimeframe = e.detail;
      const currentTime = this.shadowRoot.querySelector(".card__current-time");
      const previousTime = this.shadowRoot.querySelector(
        ".card__previous-time"
      );
      currentTime.textContent = this.getCurrentTime();
      previousTime.textContent = this.getPreviousTime();
    });
  }
}
