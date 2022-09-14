import { getStyles, setStyle, checkOrderBuilder } from "./dataAccess.js"

const styles = getStyles()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "style") {
            setStyle(parseInt(event.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const JewelryStyles = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItemsArray = styles.map(style => {
        return `<li>
        <input type="radio" name="style" value="${style.id}" ${checkOrderBuilder("style", style.id)}>${style.style}
        </li>`
    })


    // Join all of the strings in the array into a single string
    html += listItemsArray.join("")

    html += "</ul>"
    return html
}

