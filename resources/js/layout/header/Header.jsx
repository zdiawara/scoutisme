export const Header = () => {
    return (
        <>
            <div className="header navbar">
                <div className="header-container">
                    <ul className="nav-right">
                        <li className="dropdown">
                            <a
                                href=""
                                className="dropdown-toggle no-after peers fxw-nw ai-c lh-1"
                                data-bs-toggle="dropdown"
                            >
                                <div className="peer mR-10">
                                    <img
                                        className="w-2r bdrs-50p"
                                        src="https://randomuser.me/api/portraits/men/10.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="peer">
                                    <span className="fsz-sm c-grey-900">
                                        John Doe
                                    </span>
                                </div>
                            </a>
                            <ul className="dropdown-menu fsz-sm">
                                <li>
                                    <a
                                        href=""
                                        className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
                                    >
                                        <i className="ti-settings mR-10"></i>
                                        <span>Setting</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
                                    >
                                        <i className="ti-user mR-10"></i>
                                        <span>Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="email.html"
                                        className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
                                    >
                                        <i className="ti-email mR-10"></i>
                                        <span>Messages</span>
                                    </a>
                                </li>
                                <li role="separator" className="divider"></li>
                                <li>
                                    <a
                                        href=""
                                        className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"
                                    >
                                        <i className="ti-power-off mR-10"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
