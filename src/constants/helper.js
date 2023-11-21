function getRevenue(type) {

    switch (type) {
        case "Starter (Monthly)":
            return 49

        case "Starter (Yearly)":
            return 468

        case "Pro (Monthly)":
            return 99

        case "Pro (Yearly)":
            return 1056

        default:

            return 0;
    }
}

export { getRevenue };