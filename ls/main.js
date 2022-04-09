import styles from '/src/styles.css';
import '/src/app/app.module'
export default class Main {
    constructor() {
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.appendChild(style);
    }
}
new Main()

