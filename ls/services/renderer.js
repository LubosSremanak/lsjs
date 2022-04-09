/**
 * Class for work with Component DOM
 */
import Logger from "./logger";


export default class Renderer {
    constructor(component, selector, dom) {
        this.component = component;
        this.selector = selector;
        this.dom = dom;
    }

    /**
     * Get html element
     *
     * @return {HTMLElement} id - element
     *
     * @example
     *
     *    getSelector(SectionComponent);
     * @param id
     */
    get(id) {
        Logger.checkInitializedDom(this.dom);
        const element = this.dom.getElementById(id);
        Logger.checkElementExists(id, element);
        return element;
    }

    /**
     * Get component html selector with prefix
     *
     * @param {any} component - Component
     * @return {string} - Selector
     *
     * @example
     *
     *    getSelector(SectionComponent);
     */
    getSelector(component) {
        return `app-${component.selector}`
    }

    /**
     * Create component
     *
     * @param {any} component - Component
     * @return {HTMLElement} - Created component as HtmlElement
     *
     * @example
     *
     *    createComponent(UserComponent);
     */
    createComponent(component) {
        const selector = this.getSelector(component);
        return document.createElement(selector);
    }

    /**
     * Change (clear and append) Component to container with parentId
     *
     * @param parentId
     * @param {any} component - Component
     * @return {HTMLElement} - Created component as HtmlElement
     *
     * @example
     *
     *    change('container',UserComponent);
     */
    change(parentId, component) {
        const container = this.dom.getElementById(parentId);
        Logger.checkElementExists(parentId, container);
        container.innerHTML = "";
        return this.append(parentId, component);
    }

    /**
     * Append Component to container with parentId
     *
     * @param parentId
     * @param {any} component - Component
     * @return {HTMLElement} - Created component as HtmlElement
     *
     * @example
     *
     *    append(UserComponent);
     */
    append(parentId, component) {
        const dynamicComponent = this.createComponent(component);
        const container = this.dom.getElementById(parentId);
        Logger.checkElementExists(parentId, container);
        container.append(dynamicComponent);
        return dynamicComponent;
    }

    /**
     * Prepend Component to container with parentId
     *
     * @param parentId
     * @param {any} component - Component
     * @return {HTMLElement} - Created component as HtmlElement
     *
     * @example
     *
     *    prepend(UserComponent);
     */
    prepend(parentId, component) {
        const dynamicComponent = this.createComponent(component);
        const container = this.dom.getElementById(parentId);
        Logger.checkElementExists(parentId, container);
        container.prepend(dynamicComponent);
        return dynamicComponent;
    }


    /**
     * Remove Element
     *
     * @param {HTMLElement} element - Component
     *
     * @example
     *
     *    remove(sectionComponentElement);
     */
    remove(element) {
        const parent = element.parentNode;
        parent.removeChild(element);
    }

    /**
     * Remove Element by ID
     *
     * @param {string} id - Element ID
     *
     * @example
     *
     *    removeById(sectionComponentId);
     */
    removeById(id) {
        const element = this.dom.getElementById(id);
        Logger.checkElementExists(id, element);
        const parent = element.parentNode;
        parent.removeChild(element);
    }


    /**
     * Remove all elements by class name
     *
     * @param {string} type
     */
    removeAllByClass(type) {
        const content = this.dom.querySelectorAll("*");
        for (let studentContentElement of content) {
            if (studentContentElement.classList.contains(type)) {
                studentContentElement.remove();
            }
        }
    }

    /**
     * Get prop passed from parent by setProp()
     *
     * @param {string} name - Prop name
     * @return {any} - Returns prop passed from parent by setProp()
     *
     * @example
     *
     *      const name=getProp('name');
     */
    getProp(name) {
        const attribute = this.component.attributes.getNamedItem(name);
        const componentName = this.selector;
        Logger.checkAttribute(attribute, name, componentName);
        return JSON.parse(attribute.value);

    }

    /**
     * Bind prop to all 'set' attributes by name
     *
     * @param {string} name - Prop & 'set', names must be same
     * @return {any} - Returns prop passed
     *
     * @example
     *      //parent
     *      <app-element someVariable="Lubos"></app-element>
     *      //this
     *      <span set="someVariable"></span>
     *      // app-element model
     *      bindProp('someVariable');
     */
    bindProp(name) {
        const allValues = this.dom.querySelectorAll(`[set=${name}]`);
        const attribute = this.getProp(name);
        allValues.forEach((value) => {
            value.innerText = attribute;
        })
        return attribute;
    }

    /**
     * Bind value to all set attributes in template
     *
     * @param {string} name - Set name
     * @param value - Value to set
     *
     * @example
     *      //template
     *      <span set="variableName"></span>
     *      // component
     *      bindValue('value','variableName');
     */
    bindValue(name, value) {
        const sets = this.dom.querySelectorAll(`[set=${name}]`);
        sets.forEach((set) => {
            set.innerText = value;
        })
    }

    /**
     * Set prop
     *
     * @param {any} component - Component
     * @param {string} variableName -Variable name
     * @param {any} variable -Any variable/object
     *
     * @example
     *     const component=this.this.dom.getElementById("id");
     *     setAttribute(myComponent, 'name', 'section1');
     */
    setProp(component, variableName, variable) {
        const variableCheck = typeof variable === "string" ? variable : JSON.stringify(variable);
        component.setAttribute(variableName, variableCheck);
    }

    /**
     * Create event and pass data variable
     *
     * @param {string} name - A string param
     * @param {any} data - Data in event
     * @return {Event} - Returns event with data in detail
     *
     */
    createEmitter(name, data) {
        return new CustomEvent(name, {
            detail: data
        });
    }

    /**
     * Emit external event
     *
     * @param {Event} event - Data in event
     *
     * @param isGlobal
     */
    emit(event, isGlobal = false) {
        if (isGlobal) {
            document.dispatchEvent(event);
        } else {
            this.component.dispatchEvent(event);
        }

    }

    /**
     * Create event, pass data and emit created event
     *
     * @param {string} name - A string param
     * @param {any} data - Data in event
     *
     * @param isGlobal
     */
    createEmitterAndEmit(name, data, isGlobal = false) {
        const emitter = this.createEmitter(name, data);
        this.emit(emitter, isGlobal);
    }


    /**
     * Subscribe event
     *
     *
     * @param component
     * @param type
     * @param handler
     */
    subscribe(component, type, handler) {
        component.addEventListener(type, (e) => Renderer.#changeEvent(e, handler));
    }

    /**
     * Subscribe event
     *
     *
     * @param id
     * @param type
     * @param handler
     */
    subscribeById(id, type, handler) {
        const element = this.get(id)
        element.addEventListener(type, (e) => Renderer.#changeEvent(e, handler));
    }

    static #changeEvent(event, handler) {
        handler(event.detail);
    }
}



