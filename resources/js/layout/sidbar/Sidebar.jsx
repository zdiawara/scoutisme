import { LINKS } from "../../utils";
import { SidebarItem } from "./SidebarItem";

const MENU = [
    {
        title: "Personnes",
        link: LINKS.personnes.base,
    },
    {
        title: "Organisations",
        link: LINKS.organisations.base,
    },
    {
        title: "Roles",
        link: LINKS.roles.base,
    },
];

export const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-logo">
                        <div className="peers ai-c fxw-nw">
                            <div className="peer peer-greed">
                                <a
                                    className="sidebar-link td-n"
                                    href="index.html"
                                >
                                    <div className="peers ai-c fxw-nw">
                                        <div className="peer">
                                            <div className="logo">
                                                <img
                                                    src="assets/static/images/logo.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="peer peer-greed">
                                            <h5 className="lh-1 mB-0 logo-text">
                                                Adminator
                                            </h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="peer">
                                <div className="mobile-toggle sidebar-toggle">
                                    <a href="" className="td-n">
                                        <i className="ti-arrow-circle-left"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="sidebar-menu scrollable pos-r">
                        {MENU.map((item) => (
                            <SidebarItem key={item.link} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
