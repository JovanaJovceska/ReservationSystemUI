function dateFormat(lectureDate) {
    const date = new Date(lectureDate);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    
    return new Intl.DateTimeFormat(undefined, options).format(date);
}

export default dateFormat;