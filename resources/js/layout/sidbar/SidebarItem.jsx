import { Link } from "react-router-dom";

export const SidebarItem = ({ title, link }) => {
    return (
        <li className="nav-item mT-30 actived">
            <Link className="sidebar-link" to={link}>
                {/*<span className="icon-holder">
                    <i className="c-blue-500 ti-home"></i>
                </span>*/}
                <span className="title">{title}</span>
            </Link>
        </li>
    );
};
