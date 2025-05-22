import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptPassword = async (password) => {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (encryptedPassword) => {
    return CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};
