import { getTypes, setType, checkOrderBuilder } from "./dataAccess.js"

const types = getTypes()

export const JewelryTypes = () => {
    let html = `<div id="jewelryTypes">`

    html += types.map(type => {
        return `
        <input type="radio" name="type" value="${type.id}" ${checkOrderBuilder("type", type.id)}>
        <label for="type">${type.name}</label>
        `
    }).join("")

    html += `</div>`
    return html
}

document.addEventListener(
    "change",
    event => {
        if (event.target.name === "type") {
            setType(parseInt(event.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)