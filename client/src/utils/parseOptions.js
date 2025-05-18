const parseOptions = (options) => {
    try {
        let parsed = JSON.parse(options);
        if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        if (Array.isArray(parsed)) {
            return parsed.join(', ');
        }
        return 'Invalid options';
    } catch (e) {
        return 'Error parsing options';
    }
};
export default parseOptions;
