const TOKENNAME = process.env.TOKEN_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // use 

const CONSTANTS = {
    TOKENNAME,
    JWT_SECRET
}
export {
    TOKENNAME,
    JWT_SECRET
};
