export const handleErrors = response => {
    if (response !== undefined && response.status > 300) {
        throw response;
    }
    return response;
}

export const parseErrors = err => {
    err instanceof Error ?
    console.error(err)
    :
    err.text().then( errorMessage => {
        console.error(errorMessage);
    });
}