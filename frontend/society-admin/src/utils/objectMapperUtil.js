export const toCamelCase = (text) => {

    return text
        .toLowerCase()
        .replace(
            /_([a-z])/g,
            (_, letter) =>
                letter.toUpperCase()
        );
};

export const mapKeysToCamelCase = (obj) => {

    const result = {};

    Object.keys(obj).forEach(key => {

        result[
            toCamelCase(key)
        ] = obj[key];

    });

    return result;
};

export const mapListToCamelCase = (data) => {

    return data.map(
        x =>
            mapKeysToCamelCase(x)
    );
};