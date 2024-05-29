import data from "../../data.json" assert { type: "json" };
import { TimeTrackingComponent } from "./_time_tracking_card.js";
import css from "./_time_tracking_card_list.css?inline";

export default class TimeTrackingCardList extends HTMLElement {
  constructor() {
    super();
    this.data = data;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `
      <style>
        ${css}        
      </style>
      ${this.data
        .map((item) => new TimeTrackingComponent(item).render())
        .join("")}
    `;
  }
}
