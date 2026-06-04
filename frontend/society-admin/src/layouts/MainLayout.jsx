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

import {
    getUserName,
    getTenantName,
    clearSession,
    isLoggedIn
}
    from "../utils/session";


import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import AppButton from "../components/ui/AppButton";
import { mapListToCamelCase } from "../utils/objectMapperUtil";


function MainLayout({ children }) {

    const navigate = useNavigate();

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

    useEffect(() => {

        loadMenus();

    }, []);

    const loadMenus = async () => {

        try {

            const data =
            mapListToCamelCase(
                await getMenus()
            );

            const tree =
                buildMenuTree(data);


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

                        <ApartmentIcon />

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

                        backgroundColor: "#0f172a",

                        color: "#fff",

                        borderRight: "none",

                        marginTop: "48px",

                        height: "calc(100vh - 48px)",

                        overflow: "hidden",
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
                                    "#1e293b",

                                borderRadius: 2,
                            }
                        }}
                    />

                </Box>

                <List
                    sx={{
                        pt: 0
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

                                sx={{
                                    mx: 1,
                                    mb: 0.5,
                                    borderRadius: 2,

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.08)"
                                    }
                                }}
                            >

                                <ListItemText
                                    primary={
                                        parent.menuName
                                    }
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
                                    openMenus[
                                    parent.menuId
                                    ]
                                }

                                timeout="auto"

                                unmountOnExit
                            >

                                <List
                                    disablePadding
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

                                                    sx={{
                                                        pl: 4,

                                                        mx: 1,

                                                        mb: 0.5,

                                                        borderRadius: 2,

                                                        "&:hover":
                                                        {
                                                            backgroundColor:
                                                                "rgba(255,255,255,0.08)"
                                                        }
                                                    }}
                                                >

                                                    <ListItemText
                                                        primary={
                                                            child.menuName
                                                        }
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

                    {children}

                </Box>

            </Box>

        </Box>

    );

}

export default MainLayout;