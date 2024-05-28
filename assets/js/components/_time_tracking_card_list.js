import data from "../../data.json" assert { type: "json" };
import { TimeTrackingComponent } from "./_time_tracking_card.js";

export default class TimeTrackingCardList extends HTMLElement {
  constructor() {
    super();
    this.data = data;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      </style>
      ${this.data
        .map((item) => new TimeTrackingComponent(item).render())
        .join("")}
    `;
  }

  disconnectedCallback() {
    console.log("TimeTrackingCardList element removed from page.");
  }

  adoptedCallback() {
    console.log("TimeTrackingCardList element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("TimeTrackingCardList element attributes changed.");
  }
}
