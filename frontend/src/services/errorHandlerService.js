export const handleErrors = response => {
    if (response.status > 300) {
        throw response;
    }
    return response;
}