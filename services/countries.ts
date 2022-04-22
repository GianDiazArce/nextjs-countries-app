import { countryApi } from "../api"
import { ICountryResp, ICountry } from "../interfaces"


export const getAllCountries = async () => {
    const resp = await countryApi.get<ICountryResp[]>("/all");


    const countries = resp.data;

    return countries
}

export const getCountryByName = async (name: string): Promise<ICountry | null> => {

    const resp = await countryApi.get<ICountry[]>(`/name/${name}`);
    if (!resp.data) return null;


    if (resp.data[0].borders) {
        const borderNames = await getBorderCountryNames(resp.data[0].borders)
        let country: ICountry = {
            ...resp.data[0],
            borders: borderNames
        };
        return country;
    } else {
        return resp.data[0];
    }



}

export const getBorderCountryNames = async (codes: string[]): Promise<string[]> => {
    const resp = await countryApi.get<ICountry[]>(`/alpha?codes=${codes.join(',')}`);
    let names: string[] = []

    names = resp.data.map(country => country.name);

    return names;
}