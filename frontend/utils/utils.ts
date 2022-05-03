import configData from "./configData";

const addCommas = (inp: number) => {
    return inp.toLocaleString(configData.locale);
};

export default addCommas;
