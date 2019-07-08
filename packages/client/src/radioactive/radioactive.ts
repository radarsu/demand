import { html, render, TemplateResult } from 'lit-html';

function evalInContext(js: string) {
    return eval(js);
}

export interface Cache {
    [className: string]: {
        template: () => TemplateResult;
        html: string;
    }
}

export class Element extends HTMLElement {

    static cache: Cache = {};
    __html = html;

    constructor() {
        super();
        this.init();
    }

    // lifecycle
    async init() {
        const mainClass = this.constructor;
        const className = mainClass.name.toLowerCase();
        const url = (mainClass as any).url;

        // if first instance of that custom element
        if (!Element.cache[className]) {
            Element.cache[className] = {} as any;
            const thisCache = Element.cache[className];

            // get the template
            const res = await fetch(`${url}.template.html`);
            thisCache.html = `<link rel="stylesheet" href="${url}.style.css">`;
            thisCache.html += await res.text();
            thisCache.template = () => {
                const js = `
                    this.__html\`
                        ${thisCache.html}
                    \`
                `;
                const templateResult = evalInContext.call(this, js);
                return templateResult;
            };
        }

        this.render();
    }

    // methods
    render() {
        const className = this.constructor.name.toLowerCase();
        render(Element.cache[className].template(), this);
    }

}
