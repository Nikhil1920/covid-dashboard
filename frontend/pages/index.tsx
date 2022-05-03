import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Copyright from "../components/Copyright";
import WorldDataResponseType from "../types/WorldDataResponseType";
import configData from "../utils/configData";

import {
    Chart as ChartJS,
    CategoryScale,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    TimeScale,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    TimeScale,
    Tooltip,
    Legend
);
import "chartjs-adapter-moment";

import { Line } from "react-chartjs-2";
import {
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
} from "@mui/material";

const Home: NextPage = () => {
    const [data, setData] = useState<WorldDataResponseType[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        startDate: "2021-06-01",
        endDate: "2021-06-30",
    });

    useEffect(() => {
        async function fetchData() {
            const fetched = await fetch(
                configData.API_URL + "/all-world-daily-data"
            );
            const data: WorldDataResponseType[] = await fetched.json();
            // sort by date
            data.sort((a, b) => {
                return new Date(a.Date).getTime() - new Date(b.Date).getTime();
            });
            setData(data);
        }
        fetchData();
    }, []);

    useEffect(() => {}, [filters]);

    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [],
    });

    const options: any = {
        scales: {
            x: {
                type: "time",
                time: {
                    minUnit: "month",
                },
            },
            y: {
                type: "linear",
                display: true,
                position: "left",
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    useEffect(() => {
        if (data.length) {
            setChartData({
                labels: data.map((item) => {
                    return item.Date + "";
                }),
                datasets: [
                    {
                        label: "Confirmed",
                        data: data.map((item) => item.TotalConfirmed),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                        yAxisID: "y",
                    },
                    {
                        label: "Deaths",
                        data: data.map((item) => item.TotalDeaths),
                        fill: false,
                        borderColor: "rgb(255, 99, 132, 1)",
                        tension: 0.1,
                        yAxisID: "y1",
                    },
                    {
                        label: "Recovered",
                        data: data.map((item) => item.TotalRecovered),
                        fill: false,
                        borderColor: "rgb(54, 162, 235, 1)",
                    },
                ],
            });
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>Covid Data Dashboard</title>
                <meta
                    name="description"
                    content="Next App with mui and pwa configured"
                />
            </Head>
            <Container maxWidth="lg">
                <Box my={4}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showFilters}
                                onChange={(e) => {
                                    setShowFilters(e.target.checked);
                                }}
                            />
                        }
                        label="Filter"
                    />
                    {showFilters && (
                        <Box>
                            <p>Start : </p>
                            <TextField
                                variant="outlined"
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        startDate: e.target.value,
                                    });
                                }}
                            />

                            <p>End : </p>
                            <TextField
                                variant="outlined"
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        endDate: e.target.value,
                                    });
                                }}
                            />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        marginTop: "2rem",
                    }}
                >
                    {chartData.labels && (
                        <>
                            <Line data={chartData} options={options} />
                        </>
                    )}
                </Box>
            </Container>

            <footer>
                <Copyright />
            </footer>
        </>
    );
};

export default Home;
