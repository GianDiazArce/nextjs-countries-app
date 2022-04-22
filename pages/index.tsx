import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../components/layout";
import { Box, Grid, Pagination, Typography } from "@mui/material";

import { countryApi } from "../api";
import { CustomLabel, CustomSelect } from "../components/custom";
import { CountryCard } from "../components/country";
import { ICountryResp } from "../interfaces";
import { CustomSearch } from "../components/search";
import { usePagination } from "../hooks";

interface Props {
    countries: ICountryResp[];
}

const Regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Home: NextPage<Props> = ({ countries }) => {
    const router = useRouter();
    const [regionSelected, setRegionSelected] = useState("all");
    const [filteredCountries, setFilteredCountries] =
        useState<ICountryResp[]>(countries);

    const { currentData, currentPage, jump, maxPage } = usePagination(
        filteredCountries,
        16
    );

    useEffect(() => {
        if (regionSelected === "all") {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter(
                (country) => country.region.toLowerCase() === regionSelected
            );
            setFilteredCountries(filtered);
        }
    }, [regionSelected, countries]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegionSelected(event.target.value);
    };

    const onSearchInputChange = (
        e: React.SyntheticEvent,
        value: ICountryResp | null
    ) => {
        router.push("/country/" + value?.label.split(" (")[0].toLowerCase());
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, p: number) => {
        jump(p);
    };

    return (
        <Layout
            title={"Country App"}
            description={
                "Challenge of frontendmentor using next.js with material-ui"
            }
        >
            <Box sx={{ padding: "1em" }}>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                >
                    <CustomSearch
                        countries={countries}
                        onChange={onSearchInputChange}
                    />

                    <CustomSelect
                        placeholder="Filter by region"
                        onChange={handleChange}
                    >
                        {Regions.map((movie, i) => (
                            <option key={i + movie} value={movie.toLowerCase()}>
                                {movie}
                            </option>
                        ))}
                    </CustomSelect>
                </Box>

                <Grid
                    container
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(auto-fit, minmax(250px, 1fr))",
                            md: "repeat(4, 1fr)",
                        },
                        gridAutoRows: "400px",
                        mt: ".5em",
                    }}
                    spacing={6}
                >
                    {currentData().map((country, i) => (
                        <Grid item key={country.name + i}>
                            <CountryCard
                                src={country.flag}
                                alt={`${country.name} flag`}
                                onClick={() =>
                                    router.push(
                                        "/country/" +
                                            country.name
                                                .split(" (")[0]
                                                .toLowerCase()
                                    )
                                }
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    letterSpacing={0.3}
                                    sx={{ my: "6px" }}
                                >
                                    {country.name}
                                </Typography>
                                <CustomLabel
                                    label1="Population"
                                    label2={country.population.toString()}
                                />
                                <CustomLabel
                                    label1="Ragion"
                                    label2={country.region}
                                />
                                <CustomLabel
                                    label1="Capital"
                                    label2={country.capital || "none"}
                                />
                            </CountryCard>
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent="center" marginY={4}>
                    <Pagination
                        count={maxPage}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await countryApi.get<ICountryResp[]>("/all");

    const countries = data.map((country) => ({
        ...country,
        label: country.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        name: country.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    }));

    return {
        props: {
            countries,
        },
    };
};

export default Home;
