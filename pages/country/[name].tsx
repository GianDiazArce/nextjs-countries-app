import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { Layout } from "../../components/layout";

import { CustomButton, CustomLabel } from "../../components/custom";
import { ICountry } from "../../interfaces";
import { servCountry } from "../../services";
// import Image from "next/image";

interface Props {
    country: ICountry;
}

const CountryPage: NextPage<Props> = ({ country }) => {
    const router = useRouter();

    if (!country) {
        return <div>...</div>;
    }

    return (
        <Layout title={country.name} description={`${country.name}`}>
            <Box paddingY="2em" paddingX="1em">
                <CustomButton
                    onClick={() => router.push("/")}
                    text="Back"
                    arrowIcon
                />

                {/* Info Container */}
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-evenly"
                    alignItems={{ xs: "center", md: "start" }}
                    marginTop={5}
                    gap={3}
                >
                    {/* Image */}
                    <Box
                        component="figure"
                        width={{ xs: "100%", md: "50%" }}
                        margin="0"
                        sx={{
                            overflow: "hidden",
                            maxWidth: "440px",
                            maxHeight: { xs: "270px", md: "300px" },
                        }}
                    >
                        <img
                            src={country.flag}
                            width="100%"
                            height="100%"
                            alt={`${country.name} Flag`}
                            style={{ objectFit: "cover", display: "block" }}
                        />
                    </Box>

                    {/* Texts */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap=".5em"
                        width={{ xs: "100%", md: "50%" }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={800}
                            component="h1"
                            mb="1em"
                        >
                            {country.name}
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            gap=".5em"
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap=".5em"
                            >
                                <CustomLabel
                                    label1={"Native name"}
                                    label2={country.nativeName}
                                />
                                <CustomLabel
                                    label1={"Population"}
                                    label2={country.population}
                                />
                                <CustomLabel
                                    label1={"Region"}
                                    label2={country.region}
                                />
                                <CustomLabel
                                    label1={"Sub region"}
                                    label2={country.subregion}
                                />
                                <CustomLabel
                                    label1={"Capital"}
                                    label2={country.capital}
                                />
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap=".5em"
                                sx={{ my: { xs: "1em", md: 0 } }}
                            >
                                <CustomLabel
                                    label1={"Top level domain"}
                                    label2={country.topLevelDomain[0] || "-"}
                                />
                                <CustomLabel
                                    label1={"Currencies"}
                                    label2={country.currencies}
                                />
                                <CustomLabel
                                    label1={"Languages"}
                                    label2={country.languages}
                                />
                            </Box>
                        </Box>
                        {country.borders && (
                            <Box
                                marginTop={3}
                                display="flex"
                                flexDirection="column"
                                gap={2}
                            >
                                <Typography
                                    textTransform="capitalize"
                                    fontWeight={600}
                                >
                                    Border contries:
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={2}>
                                    {country.borders.map((border, i) => (
                                        <CustomButton
                                            key={border + i}
                                            text={border}
                                            onClick={() =>
                                                router.push(
                                                    `/country/${border
                                                        .split(" (")[0]
                                                        .normalize("NFD")
                                                        .replace(
                                                            /[\u0300-\u036f]/g,
                                                            ""
                                                        )
                                                        .toLowerCase()}`
                                                )
                                            }
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const countries = await servCountry.getAllCountries();

    return {
        paths: countries.map((country) => ({
            params: {
                name: country.name
                    .split(" (")[0]
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase(),
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name = "" } = params as { name: string };

    const country = await servCountry.getCountryByName(name.toLowerCase());

    if (!country) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            country: {
                ...country,
                country: country.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                languages: country.languages
                    ? Object.entries(country.languages)
                          .map((value: any) => value[1].name)
                          .join(", ")
                    : "No Languages",
                currencies: country.currencies
                    ? Object.entries(country.currencies)
                          .map((value: any) => value[1].name)
                          .join(", ")
                    : "No Currencies",
            },
        },
        revalidate: 86400,
    };
};

export default CountryPage;
