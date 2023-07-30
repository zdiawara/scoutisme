import { Outlet, ScrollRestoration } from "react-router-dom";
import { Sidebar } from "./sidbar";
import { Header } from "./header";

export const Layout = () => {
    return (
        <>
            <Sidebar />
            <div className="page-container">
                <Header />
                <main class="main-content bgc-grey-100">
                    <div id="mainContent">
                        <Outlet />
                    </div>
                </main>
            </div>
            <ScrollRestoration />
        </>
    );
};
