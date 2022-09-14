import { getOrders, getMetals, getSizes, getStyles, Multiply } from "./dataAccess.js"


const buildOrderListItem = (order) => {
    const metals = getMetals()
    const sizes = getSizes()
    const styles = getStyles()

    const foundMetal = metals.find(metal => {
        return metal.id === order.metalId
    })

    const foundStyle = styles.find(style => {
        return style.id === order.styleId
    })

    const foundSize = sizes.find(size => {
        return size.id === order.sizeId
    })

    const baseCost = foundMetal.price + foundStyle.price + foundSize.price
    const totalCost = Multiply(baseCost, order.typeId)

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

