import WorkIcon from "../../images/icon-work.svg";
import PlayIcon from "../../images/icon-play.svg";
import StudyIcon from "../../images/icon-study.svg";
import ExerciseIcon from "../../images/icon-exercise.svg";
import SocialIcon from "../../images/icon-social.svg";
import SelfCareIcon from "../../images/icon-self-care.svg";

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
    this.activeTimeframe = "weekly";
    this.stylesText = "";
  }

  connectedCallback() {
    this.render();
    this.handleCardContentFocus();
    this.handleEllipsisIconFocus();
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
        ${this.getStyleContent()}
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
          <p class="card__title">${this.title}</p>
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
          <h2 class="card__current-time">${this.getCurrentTime()}hrs</h2>
          <p class="card__previous-time">${this.getPreviousTime()}hrs</p>
        </section>
      </div>`;
  }

  getCurrentTime() {
    return this.timeframes[this.activeTimeframe].current;
  }

  getPreviousTime() {
    if (this.activeTimeframe === "daily") {
      return `Yesterday - ${this.timeframes[this.activeTimeframe].previous}`;
    } else if (this.activeTimeframe === "weekly") {
      return `Last Week - ${this.timeframes[this.activeTimeframe].previous}`;
    } else if (this.activeTimeframe === "monthly") {
      return `Last Month - ${this.timeframes[this.activeTimeframe].previous}`;
    }
  }

  getStyleContent() {
    return `
      host,
        :host *,*::before,*::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        :host {
          display: block;
        }
        .card {
          position: relative;
          width: 327px;
          height: 160px;
          margin: 0 auto;
        }
        .card__img-wrapper {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: end;
          background-color: var(--light-red-work);
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
          padding-right: 15px;
          z-index: 0;
        }
        .card__img-wrapper .card__img {
          object-fit: cover;
        }
        .card__img-wrapper .card__img-work {
          object-position: 0 -11px;
        }
        .card__img-wrapper .card__img-play {
          object-position: 0 -5px;
        }
        .card__img-wrapper .card__img-study {
          object-position: 0 -7px;
        }
        .card__img-wrapper .card__img-exercise {
          object-position: center center;
        }
        .card__img-wrapper .card__img-social {
          object-position: 0 -14px;
        }
        .card__img-wrapper .card__img-self-care {
          object-position: 0 -12px;
        }
        .card .card__content {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 1;
          width: 100%;
          height: 122px;
          background-color: var(--dark-blue);
          border-radius: 15px;
          display: grid;
          grid-template-areas:
            "title icon"
            "current-time previous-time";
          gap: 7px;
          align-items: center;
          padding: 28px 24px;
          cursor: pointer;
        }

        .card__content.active {
          background-color: #33397a;
        }

        .card__content .card__title {
          grid-area: title;
          font-size: 18px;
          font-weight: var(--fw-medium);
        }
        .card__content .card__icon {
          grid-area: icon;
          justify-self: end;
        }
        .card__icon path {
          fill: var(--desaturated-blue);
        }
        .card__icon.active path {
          fill: var(--white);
        }
        .card__content .card__current-time {
          grid-area: current-time;
          font-size: 32px;
          font-weight: var(--fw-light);
        }
        .card__content .card__previous-time {
          grid-area: previous-time;
          justify-self: end;
          font-size: 15px;
          color: var(--desaturated-blue);
        }
        .card.card-work .card__img-wrapper {
          background-color: var(--light-red-work);
        }
        .card.card-play .card__img-wrapper {
          background-color: var(--soft-blue-play);
        }
        .card.card-study .card__img-wrapper {
          background-color: var(--light-red-study);
        }
        .card.card-exercise .card__img-wrapper {
          background-color: var(--lime-green-exercise);
        }
        .card.card-social .card__img-wrapper {
          background-color: var(--violet-social);
        }
        .card.card-self-care .card__img-wrapper {
          background-color: var(--soft-orange-self-care);
        }
    `;
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

  disconnectedCallback() {
    console.log("TimeTrackingCard element removed from page.");
  }

  adoptedCallback() {
    console.log("TimeTrackingCard element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("TimeTrackingCard element attributes changed.");
  }
}
