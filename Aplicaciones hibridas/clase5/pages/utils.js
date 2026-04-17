export function createPage(content, title) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>'+ title +'</title></head><body>'
    html += content
    html += '</body></html>'
    return html
}

export function createProductList(cafes) {
    let html = ""
    html += "<ul>"
    cafes.forEach(cafe => html += "<li>" + cafe.nombre + "</li>")
    html += "</ul>"
    return html
}

// module.exports = {createPage, createProductList}
export default {createPage, createProductList}