
export const extractCustomerID = (string) => {
    const getCustId = string.match(/(?:customer_id:)([\d-\w]+)/g)
    return getCustId[0].replace(/(?:customer_id:)([\d-\w]+)/g, '$1')
}
