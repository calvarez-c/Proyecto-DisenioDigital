

export const date_formatter = (dateUTC)=>{
    const formatter = new Intl.DateTimeFormat("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });

    const dateStringLocal = formatter.format(dateUTC).replace(" ", " ")

    return dateStringLocal
}



