import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

type CovidDataType = {
    country: string;
    flagUrl: string;
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
};

const Country = () => {
    const [covData, setCovData] = useState<CovidDataType[]>([]);
    const [tableData, setTableData] = useState<CovidDataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetch(
                "https://corona.lmao.ninja/v2/countries"
            ).then((res) => res.json());
            const countyWiseData: CovidDataType[] = fetchedData.map(
                (data: any) => {
                    return {
                        country: data.country,
                        flagUrl: data.countryInfo.flag,
                        cases: data.cases,
                        deaths: data.deaths,
                        recovered: data.recovered,
                        active: data.active,
                    };
                }
            );
            setCovData(countyWiseData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setTableData(covData);
    }, [covData]);

    return (
        <>
            <Container maxWidth="lg">
                <h1>Country wise data table</h1>
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="Country wise covid data table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Flag</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Cases</TableCell>
                                <TableCell>Deaths</TableCell>
                                <TableCell>Recovered</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow
                                    key={row.country}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <img
                                            src={row.flagUrl}
                                            alt={row.country}
                                            width="50"
                                            height="50"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.country}
                                    </TableCell>
                                    <TableCell>{row.cases}</TableCell>
                                    <TableCell>{row.deaths}</TableCell>
                                    <TableCell>{row.recovered}</TableCell>
                                    <TableCell>{row.active}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default Country;
