export default class Module {
    constructor(components) {
        window.onload = () => this.onLoad(components);
    }

    onLoad = async (components) => {
        for (const component of components) {
            await this.createComponents(component);
        }
    };

    createComponents = async component => {
        {
            return new Promise(async resolve => {
                const selector = `app-${component.getSelector(component.name)}`;
                customElements.define(selector, component);
                resolve();
            })
        }
    };
}
