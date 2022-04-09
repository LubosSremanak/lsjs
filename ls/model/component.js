import {Renderer} from "../services/renderer.service.js";


export class Component extends HTMLElement {
    static props;
    static selector;

    constructor(filename) {
        super();
        if (!filename) {
            console.error(`You need to input __dirname constant in super constructor in ${this.constructor.name}`)
        }
        this.firstChange = true;
        const props = this.constructor.props;
        Component.props = props ? props : [];
        Component.selector = Component.getSelector(this.constructor.name);
        this.dom = this.attachShadow({mode: 'open'});
        this.renderer = new Renderer(this, Component.selector, this.dom);
        this.renderComponent(filename.normalize()).then();
    }


    get(id) {
        return this.renderer.get(id);
    }

    create(tagName) {
        return document.createElement(tagName);
    }

    renderComponent = async (path) => {
        const pathAttributes = path.split('/');
        pathAttributes.shift()
        pathAttributes.shift();
        const dir = pathAttributes.join('/');
        const shared = await import  (`/src/styles.css`);
        this.setCSS(shared.default);
        const css = await import  (`/src/app/${dir}/${Component.selector}.component.css`);
        const display = `:host{display:block;}`
        this.setCSS(css.default, display);
        const html = await import  (`/src/app/${dir}/${Component.selector}.component.html`);
        this.setHTML(html.default);
        await this.onInit();
    };

    static getSelector(name) {
        const selector = name.replace('Component', '');
        return selector.at(0).toLowerCase() + selector.slice(1);
    }

    getComponentFilePath(path, format) {
        return `${path}/${Component.selector}.component.${format}`;
    }

    setHTML(html) {
        this.dom.innerHTML += html;
    }

    setCSS(style,addonStyle) {
        let css = document.createElement("style");
        css.textContent = style+addonStyle;
        this.dom.appendChild(css);
    }

    static get observedAttributes() {
        return this.props;
    }

    async onInit() {
    };

    async onDestroy() {
    };

    async onChange(change) {
    };


    async connectedCallback() {
    }

    async disconnectedCallback() {
        await this.onDestroy();
    }

    async adoptedCallback() {
        console.log('Element moved to new page.');
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        const change = {
            name, oldValue, newValue, isFirst: this.firstChange
        }
        await this.onChange(change);
        this.firstChange = false;
    }

}


