import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Avatar
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { getMenus } from "../services/menuService";
import { buildMenuTree } from "../utils/menuUtils";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Collapse from "@mui/material/Collapse";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { iconMap } from "../utils/menuIcons";

import {
    getUserName,
    getTenantName,
    clearSession,
    isLoggedIn
}
    from "../utils/session";


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import AppButton from "../components/ui/AppButton";
import { mapListToCamelCase } from "../utils/objectMapperUtil";

import BusinessIcon from "@mui/icons-material/Business";



function MainLayout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    if (!isLoggedIn()) {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    const handleLogout = () => {
        clearSession();
        navigate("/");
    }

    const loadMenus = async () => {

        try {

            const data =
                mapListToCamelCase(
                    await getMenus()
                );

            console.log(
                "MENU API",
                data
            );


            const tree =
                buildMenuTree(data);


            console.log(
                "MENU TREE",
                tree
            );

            setMenus(tree);

        }
        catch (error) {

            console.error(error);

        }
    };

    const [menus, setMenus] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [openMenus, setOpenMenus] = useState({});

    const handleMenuToggle =
        (menuId) => {

            setOpenMenus(prev => ({

                ...prev,

                [menuId]:
                    !prev[menuId]

            }));

        };

    const filteredMenus =
        menus.filter(parent => {

            if (!searchText)
                return true;

            const search =
                searchText.toLowerCase();

            return (

                parent.menuName
                    ?.toLowerCase()
                    .includes(search)

                ||

                parent.children?.some(
                    child =>
                        child.menuName
                            ?.toLowerCase()
                            .includes(search)
                )

            );

        });

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleAvatarClick = (event) => {
        setAnchorEl(
            event.currentTarget
        );
    };

    const handleClose = () => {

        setAnchorEl(null);
    };

    useEffect(() => {

        loadMenus();

    }, []);


    useEffect(() => {

        if (!menus.length)
            return;

        const expanded = {};

        menus.forEach(parent => {

            const selectedChild =
                parent.children?.some(
                    child =>
                        child.menuPath ===
                        location.pathname
                );

            if (selectedChild) {

                expanded[
                    parent.menuId
                ] = true;

            }

        });

        setOpenMenus(expanded);

    },
        [
            menus,
            location.pathname
        ]);

    return (

        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#f4f7fe",
            }}
        >

            {/* TOP NAVBAR */}
            <AppBar
                position="fixed"
                elevation={0}

                sx={{
                    backgroundColor: "#ffffff",
                    color: "#111",
                    borderBottom: "1px solid #e5e7eb",
                    zIndex: 1300,
                }}
            >

                <Toolbar
                    variant="dense"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >

                        <ListItemIcon
                            sx={{
                                minWidth: 32,
                                color: "#2563eb"
                            }}
                        >
                            <BusinessIcon />
                        </ListItemIcon>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Society SaaS
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >

                        <Avatar
                            onClick={handleAvatarClick}
                            sx={{
                                width: 36,
                                height: 36,
                                cursor: "pointer",
                                bgcolor: "primary.main",
                                fontWeight: 600,
                                fontSize: "0.95rem"
                            }}
                        >
                            {getUserName()?.charAt(0)}
                        </Avatar>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 8,
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 3,
                                    overflow: "hidden"
                                }
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                        >

                            <Box
                                sx={{
                                    width: 180,
                                    p: 2,
                                    textAlign: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        mx: "auto",
                                        mb: 1,
                                        bgcolor: "primary.main"
                                    }}
                                >
                                    {getUserName()?.charAt(0)}
                                </Avatar>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        lineHeight: 1.3
                                    }}
                                >
                                    {getUserName()}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {getTenantName()}
                                </Typography>

                            </Box>

                            <Divider />

                            <MenuItem
                                onClick={() => {

                                    clearSession();

                                    navigate("/");
                                }}
                                sx={{
                                    color: "error.main",
                                    fontWeight: 600,
                                    justifyContent: "center"
                                }}
                            >
                                Logout
                            </MenuItem>

                        </Menu>

                    </Box>

                </Toolbar>

            </AppBar>

            {/* SIDEBAR */}
            <Drawer
                variant="permanent"

                sx={{
                    width: 240,
                    flexShrink: 0,

                    [`& .MuiDrawer-paper`]: {

                        width: 240,

                        boxSizing: "border-box",

                        // backgroundColor: "#0f172a",

                        // backgroundColor: "#7f1d1d",

                        backgroundColor: "#111827",



                        color: "#fff",

                        borderRight: "none",

                        marginTop: "48px",

                        height: "calc(100vh - 48px)",

                        overflowY: "auto",
                        overflowX: "hidden",
                    },
                }}
            >

                <Box
                    sx={{
                        p: 1.5
                    }}
                >

                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search Menu"
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(
                                e.target.value
                            )
                        }
                        sx={{
                            mb: 1,

                            "& .MuiOutlinedInput-root":
                            {
                                color: "#fff",

                                backgroundColor:
                                    "#1f2937",


                                borderRadius: 3,

                                "& fieldset": {

                                    borderColor:
                                        "#374151"
                                }
                            }
                        }}
                    />

                </Box>

                <List
                    sx={{
                        pt: 0,
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",

                        "&::-webkit-scrollbar": {
                            width: "3px"
                        },

                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                                "rgba(255,255,255,0.12)"
                        }

                    }}
                >

                    {filteredMenus.map(parent => (

                        <Box
                            key={parent.menuId}
                        >

                            {/* Parent */}

                            <ListItemButton

                                onClick={() => {

                                    if (
                                        parent.children
                                            ?.length > 0
                                    ) {

                                        handleMenuToggle(
                                            parent.menuId
                                        );

                                    }
                                    else if (
                                        parent.menuPath
                                    ) {

                                        navigate(
                                            parent.menuPath
                                        );

                                    }

                                }}

                                selected={
                                    location.pathname ===
                                    parent.menuPath
                                }

                                sx={{
                                    pl: 4,
                                    mx: 1,
                                    mb: 0.75,
                                    py: 0.5,
                                    borderRadius: 2,

                                    backgroundColor:

                                        location.pathname ===
                                            parent.menuPath

                                            ?

                                            "#dc2626"

                                            :

                                            "transparent",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.15)"
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "#fff",
                                        minWidth: 36
                                    }}
                                >
                                    {
                                        iconMap[
                                        parent.menuIcon
                                        ]
                                    }
                                </ListItemIcon>

                                <ListItemText
                                    primary={parent.menuName}

                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 600
                                    }}
                                />

                                {

                                    parent.children
                                        ?.length > 0

                                        ?

                                        (
                                            openMenus[
                                                parent.menuId
                                            ]

                                                ?

                                                <ExpandLess />

                                                :

                                                <ExpandMore />
                                        )

                                        :

                                        null
                                }

                            </ListItemButton>

                            {/* Child */}

                            <Collapse

                                in={
                                    searchText
                                        ?
                                        parent.children?.some(
                                            child =>

                                                child.menuName
                                                    ?.toLowerCase()
                                                    .includes(
                                                        searchText
                                                            .toLowerCase()
                                                    )
                                        )
                                        :
                                        openMenus[
                                        parent.menuId
                                        ]
                                }

                                timeout="auto"


                            >

                                <List
                                    disablePadding

                                    sx={{
                                        ml: 3.5,

                                        borderLeft:
                                            "1px solid rgba(255,255,255,0.12)"
                                    }}
                                >

                                    {
                                        parent.children
                                            ?.filter(
                                                child =>

                                                    !searchText

                                                    ||

                                                    child
                                                        .menuName
                                                        ?.toLowerCase()
                                                        .includes(
                                                            searchText
                                                                .toLowerCase()
                                                        )
                                            )
                                            .map(child => (

                                                <ListItemButton

                                                    key={
                                                        child.menuId
                                                    }

                                                    onClick={() =>
                                                        navigate(
                                                            child.menuPath
                                                        )
                                                    }

                                                    selected={
                                                        location.pathname ===
                                                        child.menuPath
                                                    }

                                                    sx={{
                                                        pl: 2.5,
                                                        pr: 1,
                                                        mx: 1,
                                                        mb: 0.5,
                                                        borderRadius: 2,
                                                        transition:
                                                            "background-color 0.15s ease",

                                                        backgroundColor:

                                                            location.pathname ===
                                                                child.menuPath

                                                                ?

                                                                "#2563eb"

                                                                :

                                                                "transparent",

                                                        "&:hover": {

                                                            backgroundColor:

                                                                location.pathname ===
                                                                    child.menuPath

                                                                    ?

                                                                    "#2563eb"

                                                                    :

                                                                    "rgba(255,255,255,0.08)"
                                                        }
                                                    }}
                                                >

                                                    <ListItemIcon
                                                        sx={{
                                                            color: "rgba(255,255,255,0.85)",
                                                            minWidth: 30
                                                        }}
                                                    >
                                                        {
                                                            child.menuIcon

                                                                ?

                                                                iconMap[
                                                                child.menuIcon
                                                                ]

                                                                :

                                                                null
                                                        }
                                                    </ListItemIcon>

                                                    <ListItemText
                                                        primary={child.menuName}

                                                        primaryTypographyProps={{
                                                            fontSize: 14,
                                                            fontWeight: 400
                                                        }}
                                                    />

                                                </ListItemButton>

                                            ))
                                    }

                                </List>



                            </Collapse>

                        </Box>

                    ))}

                </List>



            </Drawer>

            {/* MAIN CONTENT AREA */}
            {/* MAIN CONTENT AREA */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "48px",
                    overflow: "hidden",
                    minWidth: 0,
                }}
            >

                {/* PAGE CONTENT */}
                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                        minWidth: 0,
                    }}
                >

                    <Outlet />

                </Box>

                {/* FOOTER */}
                <Box
                    sx={{
                        height: "24px",

                        borderTop:
                            "1px solid #e5e7eb",

                        backgroundColor:
                            "#ffffff",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        color:
                            "#6b7280",

                        fontSize: "11px",

                        userSelect: "none"
                    }}
                >
                    Powered by Genie Box
                </Box>

            </Box>



        </Box>

    );

}

export default MainLayout;