import axios from "axios";


export const countryApi = axios.create({
    baseURL: 'https://restcountries.com/v2'
})