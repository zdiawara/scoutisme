import { Link, Outlet, ScrollRestoration } from "react-router-dom";

export const Root = () => {
    return (
        <>
            <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/personnes">Scouts</Link>
                        </li>
                        <li>
                            <Link to="/organisations">Organisations</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};
