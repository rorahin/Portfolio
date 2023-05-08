class ButtonCount extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `<button class="ButtonCount">Times Clicked:  </button>`;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        let clicks = 0;
        let button = this.shadowRoot.firstElementChild;
        button.addEventListener('click', () => {
            clicks++;
            button.textContent = `Times Clicked: ${clicks}`;
        });
    }
}

customElements.define("button-count", ButtonCount)