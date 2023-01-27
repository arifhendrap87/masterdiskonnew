/**
 * Color Palette Define
 */

let OrangeColor = {
    primaryColor: "#E5634D",
    darkPrimaryColor: "#C31C0D",
    lightPrimaryColor: "#FF8A65",
    accentColor: "#4A90A4"
};

let BlueColor = {
    primaryColor: "#0070BA",
    secondColor: "#FFCD02",
    thirdColor: "#cf000f",
    fourthColor: "#a8d2ff",
    fifthColor: "#27A844",


    darkPrimaryColor: "#1281ac",
    lightPrimaryColor: "#B4D5F9",
    accentColor: "#FF8A65",
    textWhite: "#fff",
    whiteColor: "#FFF",
    bgColor: "#f5f6fa",
    greyColor: "grey",
    blackColor: "#000",
    redColor: "#dc3545",

    danger: "#DC3545",
    info: "#17A2B8",
    success: "#28A745",
    warning: "#FFC107",
    primary: "#007BFF"




};

let PinkColor = {
    primaryColor: "#A569BD",
    darkPrimaryColor: "#C2185B",
    lightPrimaryColor: "#F8BBD0",
    accentColor: "#8BC34A"
};

let GreenColor = {
    primaryColor: "#58D68D",
    darkPrimaryColor: "#388E3C",
    lightPrimaryColor: "#C8E6C9",
    accentColor: "#607D8B"
};

let YellowColor = {
    primaryColor: "#FDC60A",
    darkPrimaryColor: "#FFA000",
    lightPrimaryColor: "#FFECB3",
    accentColor: "#795548"
};

/**
 * Main color use for whole application
 */
let BaseColor = {
    ...BlueColor,
    ...{
        textPrimaryColor: "#212121",
        textSecondaryColor: "#E0E0E1",
        grayColor: "#9B9B9B",
        darkBlueColor: "#24253D",
        dividerColor: "#BDBDBD",
        whiteColor: "#FFFFFF",
        fieldColor: "#F5F5F5",
        yellowColor: "#FDC60A",
        navyBlue: "#3C5A99",
        kashmir: "#5D6D7E"
    }
};

export {
    BaseColor,
    OrangeColor,
    BlueColor,
    PinkColor,
    GreenColor,
    YellowColor
};
