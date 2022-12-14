import { getMetals, setMetal, checkOrderBuilder } from "./dataAccess.js"

const metals = getMetals()

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        html += `<li>
            <input type="radio" name="metal" value="${metal.id}" ${checkOrderBuilder("metal", metal.id)}> ${metal.metal}
        </li>`
    }

    html += "</ul>"
    return html
}

document.addEventListener(
    "change",
    e => {
        if (e.target.name === "metal") {
            setMetal(parseInt(e.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)