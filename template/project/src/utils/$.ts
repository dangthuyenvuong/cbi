export const $ = (selector: string, callback: Parameters<NodeListOf<Element>['forEach']>[0]) => {
    document.querySelectorAll(selector).forEach(callback)
}