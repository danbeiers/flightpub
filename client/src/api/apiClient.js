import axios from "axios";
const ApiClient = axios.create({ baseURL: "http://localhost:8800"})
    export default ApiClient;

