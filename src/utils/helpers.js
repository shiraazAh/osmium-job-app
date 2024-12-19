// Function that helps to get and add the parameters properly for api call
export const getParameters = (jobCategory, jobLocation, jobLevel) => {
    const params = [];
    if (jobCategory) {
        params.push(`category=${jobCategory}`);
    }
    if (jobLocation) {
        params.push(`location=${jobLocation}`);
    }
    if (jobLevel) {
        params.push(`level=${jobLevel}`);
    }
    return params.join("&");
};