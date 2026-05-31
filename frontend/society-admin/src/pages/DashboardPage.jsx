import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function DashboardPage() {

  const cards = [
    {
      title: "Total Flats",
      value: "500",
      icon: <ApartmentIcon sx={{ fontSize: 34 }} />,
    },
    {
      title: "Paid",
      value: "320",
      icon: <CheckCircleIcon sx={{ fontSize: 34 }} />,
    },
    {
      title: "Pending",
      value: "180",
      icon: <PendingActionsIcon sx={{ fontSize: 34 }} />,
    },
    {
      title: "Collection",
      value: "₹8.2L",
      icon: <CurrencyRupeeIcon sx={{ fontSize: 34 }} />,
    },
  ];

  return (
    <MainLayout>

      {/* PAGE TITLE */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 4,
        }}
      >
        <DashboardIcon sx={{ fontSize: 34 }} />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Dashboard
        </Typography>
      </Box>

      {/* KPI CARDS */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (

          <Card
            key={index}
            elevation={0}
            sx={{
              width: 240,
              borderRadius: 4,
              border: "1px solid #e5e7eb",

              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
              },
            }}
          >
            <CardContent>

              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: 3,
                  backgroundColor: "#eef4ff",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  color: "#1976d2",

                  mb: 3,
                }}
              >
                {card.icon}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "#6b7280",
                  mb: 1,
                }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {card.value}
              </Typography>

            </CardContent>
          </Card>

        ))}
      </Box>

    </MainLayout>
  );
}

export default DashboardPage;