import * as Radioactive from '../../radioactive/radioactive';

export class Main extends Radioactive.Element {
    static url = `/src/app/main/main`;
    data = {
        test: 'yeah',
    };
}

customElements.define('r-main', Main);