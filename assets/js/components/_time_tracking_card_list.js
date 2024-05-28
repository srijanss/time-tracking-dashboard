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
}
