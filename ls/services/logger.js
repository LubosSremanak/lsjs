export default class Logger {
    static checkConstructor(filename) {
        if (!filename) {
            console.error(`You need to input __dirname constant in super constructor in ${this.constructor.name}`)
        }
    }

    static checkInitializedDom(dom) {
        if (!dom) {
            console.error('Component isn\'t initialized')
        }
    }

    static checkAttribute(attribute, name, componentName) {
        if (!attribute) {
            console.warn(`Attribute "${name}" is not set in component "${componentName}"`);
        }
    }

    static checkElementExists(id,element) {
        if(!element){
            console.warn(`Element with specified id:"${name}" does not exist`)
        }
    }
}
