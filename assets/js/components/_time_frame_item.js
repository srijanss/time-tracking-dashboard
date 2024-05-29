import css from "./_time_frame_item.css?inline";

export const defaultTimeFrame = {
  index: 1,
  value: "weekly",
  label: "Weekly",
};

export default class TimeFrameItem extends HTMLElement {
  constructor() {
    super();
    this.defaultTimeFrame = defaultTimeFrame;
  }

  connectedCallback() {
    this.render();
    this.handleTimeframeChange();
  }

  render() {
    const timeframes = this.dataset.timeframes.split(":");
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        ${css} 
      </style>
      <fieldset>
        <legend class="hidden">Select a timeframe:</legend>
        <ul>
          ${timeframes
            .map(
              (timeframe, index) =>
                `<li>
                  <input
                    type="radio"
                    name="timeframe"
                    id="id_${timeframe}"
                    value="${timeframe}"
                    ${index === this.defaultTimeFrame.index ? "checked" : ""}
                  />
                  <label for="id_${timeframe}">${timeframe}</label>
                </li>
                `
            )
            .join("")} 
        </ul>
      </fieldset>
    `;
  }

  handleTimeframeChange() {
    const radioButtons = this.shadowRoot.querySelectorAll(
      "input[type='radio']"
    );
    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", (event) => {
        this.dispatchTimeFrameChangeEvent(event.target.value);
      });
    });
  }

  dispatchTimeFrameChangeEvent(timeframe) {
    const timeFrameChangeEvent = new CustomEvent("timeframeChange", {
      detail: timeframe,
    });
    document.dispatchEvent(timeFrameChangeEvent);
  }
}
