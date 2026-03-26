export function createPages(content, title) {
    let html=""
    html+=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        ${content}
    </body>
    </html>`
    return html
}
export function createProductList(products) {
    let html = "<ul>";
    products.forEach(product => {
        html += `<li>${product.name} - $${product.price.toFixed(2)}</li>`;
    });
    html += "</ul>";
    return html;
}
export default { createPages, createProductList }