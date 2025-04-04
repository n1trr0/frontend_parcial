import { PageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export default function Layout({ Component }: PageProps) {
    return (
        <div class="layout">
            <Header/>
        <Component/>
            <Footer/>       
        </div>
    );
}