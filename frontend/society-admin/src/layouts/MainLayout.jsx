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
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import ApartmentIcon from "@mui/icons-material/Apartment";

import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {

    const navigate = useNavigate();

    const menuItems = [

        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard",
        },

        {
            text: "Towers",
            icon: <ApartmentIcon />,
            path: "/towers",
        },

        {
            text: "Flats",
            icon: <ApartmentIcon />,
            path: "/flats",
        },

        {
            text: "Residents",
            icon: <PeopleIcon />,
            path: "/residents",
        },

        {
            text: "Billing",
            icon: <ReceiptLongIcon />,
            path: "/billing",
        },

        {
            text: "Payments",
            icon: <PaymentsIcon />,
            path: "/payments",
        },

    ];

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

                <Toolbar>

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

                        marginTop: "64px",

                        height: "calc(100vh - 64px)",

                        overflow: "hidden",
                    },
                }}
            >

                <List
                    sx={{
                        paddingTop: 2,
                    }}
                >

                    {menuItems.map((item) => (

                        <ListItemButton
                            key={item.text}

                            onClick={() =>
                                navigate(item.path)
                            }

                            sx={{
                                mx: 1,
                                mb: 0.5,
                                borderRadius: 2,

                                "&:hover": {
                                    backgroundColor:
                                        "rgba(255,255,255,0.08)",
                                },
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    color: "#fff",
                                    minWidth: "40px",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    ))}

                </List>

            </Drawer>

            {/* MAIN CONTENT AREA */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "64px",
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