import ky from "ky";

const httpAgent = ky.create({});

export default httpAgent;
