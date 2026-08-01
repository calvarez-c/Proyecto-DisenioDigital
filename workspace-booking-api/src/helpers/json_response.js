export const jsonResponse = (status = 200, messageOrData = "Informacion no encontrada", data = null) => {
    let finalStatus = status
    let finalMessage = "Informacion no encontrada"
    let finalData = data

    if (typeof status === 'object' && status !== null) {
        finalStatus = status.status ?? 200
        finalMessage = status.message ?? "Informacion no encontrada"
        finalData = status.data ?? null
    } else {
        if (typeof messageOrData === 'string') {
            finalMessage = messageOrData
        } else {
            finalMessage = status >= 200 && status < 300 ? "Operación exitosa" : "Error en la solicitud"
            finalData = messageOrData
        }
    }

    return {
        succes: finalStatus >= 200 && finalStatus < 300,
        success: finalStatus >= 200 && finalStatus < 300,
        message: finalMessage,
        data: finalData
    }
}