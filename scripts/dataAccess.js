import { database } from "./database.js"

export const getMetals = () => {
    return database.metals.map(metal => ({ ...metal }))
}

export const getSizes = () => {
    return database.sizes.map(size => ({ ...size }))
}

export const getStyles = () => {
    return database.styles.map(style => ({ ...style }))
}

export const getOrders = () => {
    return database.customOrders.map(order => ({ ...order }))
}

export const getTypes = () => {
    return database.types.map(type => ({ ...type }))
}

export const checkOrderBuilder = (attribute, id) => {
    let idType

    switch (attribute) {
        case "metal":
            idType = `metalId`
            break
        case "style":
            idType = `styleId`
            break
        case "size":
            idType = `sizeId`
            break
        case "type":
            idType = `typeId`
            break
        default:
            console.log(`Error with switch statement.`)
            break
    }

    if (database.orderBuilder[idType] === id) {
        return `checked="checked" /`
    } else {
        return `/`
    }
}

export const setMetal = (id) => {
    database.orderBuilder.metalId = id
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}

export const setType = (id) => {
    database.orderBuilder.typeId = id
}

export const Multiply = (price, typeId) => {
    switch (typeId) {
        case 1:
            price *= 1
            break
        case 2:
            price *= 2
            break
        case 3:
            price *= 4
            break
        default:
            console.log(`Error with switch statement.`)
    }
    return price
}

export const addCustomOrder = () => {
    //Copy of current user's choices
    const newOrder = { ...database.orderBuilder }

    //Creates a unique ID for every order
    const lastIndex = database.customOrders.length - 1
    newOrder.id = database.customOrders[lastIndex].id + 1

    // Creates a timestamp at the time of ordering
    newOrder.timestamp = Date.now()

    //Pushes the new order into the database
    database.customOrders.push(newOrder)

    //Resets the temporary local state object
    database.orderBuilder = {}

    //Broadcasts a notification that permanent state has been changed.
    document.dispatchEvent(new CustomEvent("stateChanged"))
}