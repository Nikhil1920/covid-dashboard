import type { NextPage } from "next";
import Head from "next/head";
import Copyright from "../components/Copyright";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Covid Data Dashboard</title>
                <meta
                    name="description"
                    content="Next App with mui and pwa configured"
                />
            </Head>

            <footer>
                <Copyright />
            </footer>
        </>
    );
};

export default Home;
