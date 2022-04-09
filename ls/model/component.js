import Logger from "../services/logger";
import Renderer from "../services/renderer";


export class Component extends HTMLElement {
    static props;
    static selector;

    constructor(filename) {
        super();
        Logger.checkConstructor(filename);
        this.#initializeComponent(filename).then();
    }


    async #initializeComponent(filename) {
        this.firstChange = true;
        const props = this.constructor.props;
        Component.props = props ? props : [];
        Component.selector = Component.getSelector(this.constructor.name);
        this.dom = this.attachShadow({mode: 'open'});
        this.renderer = new Renderer(this, Component.selector, this.dom);
        await this.#renderComponent(filename.normalize());
        await this.onInit();
    }

    async #renderComponent(path) {
        const pathAttributes = path.split('/');
        pathAttributes.shift()
        pathAttributes.shift();
        const dir = pathAttributes.join('/');
        const shared = await import  (`/src/styles.css`);
        this.#addStyle(shared.default);
        const css = await import  (`/src/app/${dir}/${Component.selector}.component.css`);
        const display = `:host{display:block;}`
        this.#addStyle(css.default, display);
        const html = await import  (`/src/app/${dir}/${Component.selector}.component.html`);
        this.#addTemplate(html.default);
    }

    static getSelector(name) {
        const selector = name.replace('Component', '');
        return selector.at(0).toLowerCase() + selector.slice(1);
    }

    #addTemplate(html) {
        this.dom.innerHTML += html;
    }

    #addStyle(style, addonStyle) {
        let css = document.createElement("style");
        css.textContent = style + addonStyle;
        this.dom.appendChild(css);
    }

    get(id) {
        return this.renderer.get(id);
    }

    create(tagName) {
        return document.createElement(tagName);
    }


    static get observedAttributes() {
        return this.props;
    }

    onInit = async () => {
    };

    onDestroy = async () => {
    };

    onChange = async change => {
    };


    async connectedCallback() {
    }

    async disconnectedCallback() {
        await this.onDestroy();
    }

    async adoptedCallback() {

    }

    async attributeChangedCallback(name, oldValue, newValue) {
        const change = {
            name, oldValue, newValue, isFirst: this.firstChange
        }
        await this.onChange(change);
        this.firstChange = false;
    }

}


