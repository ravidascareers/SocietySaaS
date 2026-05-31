import {
  Box,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, } from "@mui/x-data-grid";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import MainLayout from "../layouts/MainLayout";
import buildingLogo from "../assets/building-logo.png";

import AppPage from "../components/ui/AppPage";
import AppCard from "../components/ui/AppCard";
import AppHeader from "../components/ui/AppHeader";
import AppButton from "../components/ui/AppButton";
import AppDataGrid from "../components/ui/AppDataGrid";
import ActionChip from "../components/ui/ActionChip";
import SummaryCard from "../components/ui/SummaryCard";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function BillingPage() {

  const [billMonth, setBillMonth] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [bills, setBills] = useState([]);

  const [open, setOpen] = useState(false);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [selectedBill, setSelectedBill] =
    useState(null);

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const [paymentMode, setPaymentMode] =
    useState("UPI");

  const [remarks, setRemarks] =
    useState("");

  const columns = [

    {
      field: "flat",
      headerName: "Flat",
      flex: 1,
    },

    {
      field: "owner",
      headerName: "Owner",
      flex: 1.5,
    },

    {
      field: "month",
      headerName: "Month",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,

      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          ₹ {params.value}
        </Typography>
      ),
    },

    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,

      renderCell: (params) =>
        params.value?.split("T")[0],
    },

    {
      field: "status",

      headerName: "Status",

      flex: 1,

      renderCell: (params) => (

        <ActionChip

          label={params.value}

          type={
            params.value === "Paid"
              ? "success"
              : "warning"
          }
        />

      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,

      renderCell: (params) => {

        if (
          params.row.status === "Pending"
        ) {

          return (

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >

              <ActionChip

                label={<PaymentsIcon sx={{ fontSize: 16 }} />}

                type="primary"

                onClick={() => {

                  setSelectedBill(
                    params.row
                  );

                  setPaymentAmount(
                    params.row.amount
                  );

                  setPaymentOpen(true);

                }}
              />

              <ActionChip

                label={<PictureAsPdfIcon sx={{ fontSize: 16 }} />}

                onClick={() =>
                  generatePDF(
                    params.row
                  )
                }
              />


              <ActionChip

                label={<NotificationsActiveIcon sx={{ fontSize: 16 }} />}

                type="warning"

                onClick={() =>
                  sendReminder(
                    params.row
                  )
                }
              />



            </Box>

          );

        }

        return (

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "nowrap",
              overflowX: "auto",
              alignItems: "center",
            }}
          >

            <ActionChip

              label={<CheckCircleIcon sx={{ fontSize: 16 }} />}

              type="success"
            />

            <ActionChip

              label={<PictureAsPdfIcon sx={{ fontSize: 16 }} />}

              onClick={() =>
                generatePDF(
                  params.row
                )
              }
            />

          </Box>

        );

      },
    },

  ];

  const totalBills = bills.length;

  const pendingBills =
    bills.filter(
      (x) => x.status === "Pending"
    ).length;

  const totalPendingAmount =
    bills
      .filter(
        (x) => x.status === "Pending"
      )
      .reduce(
        (sum, x) =>
          sum + Number(x.amount),
        0
      );

  const totalCollection =
    bills
      .filter(
        (x) => x.status === "Paid"
      )
      .reduce(
        (sum, x) =>
          sum + Number(x.amount),
        0
      );

  const generateBills = async () => {

    if (!billMonth || !dueDate) {

      alert("Please fill all fields");

      return;
    }

    try {

      await axios.post(
        "http://localhost:5008/api/bills/generate",
        {
          tenantId: 1,
          billMonth: billMonth,
          dueDate: dueDate,
        }
      );

      alert("Bills generated successfully");
      loadBills();

    } catch (error) {

      console.error(error);

      alert("Error generating bills");

    }

  };

  const loadBills = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5008/api/bills"
      );

      setBills(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadBills();

  }, []);

  const collectPayment = async () => {

    try {

      await axios.post(
        "http://localhost:5008/api/payments",
        {
          tenantId: 1,

          billId:
            selectedBill.billId,

          paymentAmount:
            paymentAmount,

          paymentDate:
            new Date(),

          paymentMode:
            paymentMode,

          remarks:
            remarks,
        }
      );

      alert(
        "Payment collected successfully"
      );

      setPaymentOpen(false);

      loadBills();

    } catch (error) {

      console.error(error);

      alert("Payment failed");

    }

  };

  const sendReminder = (bill) => {

    console.log(bill);

    const message =
      `Dear ${bill.owner},

Your maintenance bill for ${bill.month} is pending.

Amount Due: ₹ ${bill.amount}

Please make the payment at the earliest.

Thank you.`;

    const url =
      `https://wa.me/91${bill.mobile}?text=${encodeURIComponent(message)}`;

    window.open(
      url,
      "_blank"
    );

  };

  const generatePDF = async (bill) => {

    const doc = new jsPDF();

    // QR GENERATION
    const qrData =
      `PAY|${bill.flat}|${bill.amount}`;

    const qrImage =
      await QRCode.toDataURL(qrData);

    // PAGE BORDER
    doc.setDrawColor(180);

    doc.rect(
      8,
      8,
      194,
      280
    );

    // LOGO IMAGE
    doc.addImage(
      buildingLogo,
      "PNG",
      20,
      12,
      24,
      24
    );

    // CENTER HEADER
    doc.setTextColor(0);

    doc.setFontSize(22);

    doc.text(
      "DELHI TOWER",
      105,
      22,
      {
        align: "center",
      }
    );

    doc.setFontSize(11);

    doc.text(
      "Society Maintenance Management",
      105,
      30,
      {
        align: "center",
      }
    );

    // QR CODE
    doc.addImage(
      qrImage,
      "PNG",
      160,
      12,
      28,
      28
    );

    // QR LABEL
    doc.setFontSize(8);

    doc.setTextColor(90);

    doc.text(
      "Scan To Pay",
      164,
      44
    );

    // DIVIDER
    doc.setDrawColor(150);

    doc.line(
      20,
      50,
      190,
      50
    );

    // TITLE
    doc.setFontSize(18);

    doc.setTextColor(0);

    doc.text(
      "MAINTENANCE BILL",
      105,
      65,
      {
        align: "center",
      }
    );

    // INFO BOX
    doc.roundedRect(
      20,
      78,
      170,
      45,
      2,
      2
    );

    doc.setFontSize(11);

    doc.text(
      `Flat No : ${bill.flat}`,
      28,
      94
    );

    doc.text(
      `Owner Name : ${bill.owner}`,
      28,
      106
    );

    doc.text(
      `Bill Month : ${bill.month}`,
      110,
      94
    );

    doc.text(
      `Due Date : ${bill.dueDate?.split("T")[0]
      }`,
      110,
      106
    );

    // AMOUNT SECTION
    doc.setFillColor(245, 245, 245);

    doc.roundedRect(
      20,
      138,
      170,
      42,
      2,
      2,
      "F"
    );

    doc.setFontSize(13);

    doc.setTextColor(90);

    doc.text(
      "TOTAL AMOUNT DUE",
      30,
      156
    );

    doc.setTextColor(0);

    doc.setFontSize(26);

    doc.text(
      `Rs. ${bill.amount}`,
      122,
      160
    );

    // STATUS
    doc.setFontSize(11);

    doc.setTextColor(0);

    doc.text(
      `Status : ${bill.status}`,
      20,
      202
    );

    // PAYMENT INSTRUCTIONS
    doc.setFontSize(13);

    doc.text(
      "Payment Instructions",
      20,
      222
    );

    doc.setFontSize(10);

    doc.setTextColor(80);

    doc.text(
      "UPI / Bank Transfer / Cash Accepted",
      20,
      235
    );

    doc.text(
      "UPI ID : payments@delhitower",
      20,
      244
    );

    doc.text(
      "Late fee applicable after due date.",
      20,
      253
    );

    // FOOTER
    doc.setDrawColor(180);

    doc.line(
      20,
      265,
      190,
      265
    );

    doc.setTextColor(120);

    doc.setFontSize(9);

    doc.text(
      "This is a system generated maintenance invoice.",
      20,
      275
    );

    doc.text(
      "Authorized Signatory",
      145,
      275
    );

    // SAVE PDF
    doc.save(
      `Maintenance_Bill_${bill.flat}.pdf`
    );

  };

  return (
    <MainLayout>

      <AppPage>

        {/* PAGE HEADER */}
        <AppHeader

          title="Billing"
          subtitle="Green Valley Society"
          actions={

            <AppButton
              onClick={() =>
                setOpen(true)
              }
            >
              Generate Bills
            </AppButton>

          }
        />

        {/* SUMMARY CARDS */}
        <Grid container spacing={1.5}>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <SummaryCard
              title="Total Bills"
              value={totalBills}
            />

          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <SummaryCard
              title="Pending Bills"
              value={pendingBills}
              bgColor="#fff8e1"
            />

          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <SummaryCard
              title="Pending Amount"
              value={`₹ ${totalPendingAmount}`}
              bgColor="#ffebee"
            />

          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >

            <SummaryCard
              title="Collection"
              value={`₹ ${totalCollection}`}
              bgColor="#e8f5e9"
            />

          </Grid>

        </Grid>

        {/* GRID SECTION */}
        <AppCard
          elevation={0}

          sx={{
            flex: 1,

            minHeight: 0,

            display: "flex",
            flexDirection: "column",

            overflow: "hidden",
          }}
        >

          <Box
            sx={{
              flex: 1,

              minHeight: 0,

              height: "100%",

              display: "flex",
            }}
          >

            <AppDataGrid

              rows={bills}

              columns={columns}

              getRowId={(row) =>
                row.billId
              }
            />

          </Box>

        </AppCard>

      </AppPage>

      {/* GENERATE BILL DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          Generate Monthly Bills
        </DialogTitle>

        <DialogContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 1,
            }}
          >

            <TextField
              type="month"
              label="Bill Month"
              value={billMonth}
              onChange={(e) =>
                setBillMonth(
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Box>

        </DialogContent>

        <DialogActions>

          <AppButton
            onClick={() => setOpen(false)}
          >
            Cancel
          </AppButton>

          <AppButton
            variant="contained"

            onClick={async () => {

              await generateBills();

              setOpen(false);

            }}
          >
            Generate
          </AppButton>

        </DialogActions>

      </Dialog>

      {/* PAYMENT DIALOG */}
      <Dialog
        open={paymentOpen}
        onClose={() =>
          setPaymentOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          Collect Payment
        </DialogTitle>

        <DialogContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 1,
            }}
          >

            <TextField
              label="Payment Amount"
              value={paymentAmount}
              onChange={(e) =>
                setPaymentAmount(
                  e.target.value
                )
              }
            />

            <TextField
              select
              label="Payment Mode"
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(
                  e.target.value
                )
              }
            >

              <MenuItem value="UPI">
                UPI
              </MenuItem>

              <MenuItem value="Cash">
                Cash
              </MenuItem>

              <MenuItem value="Bank Transfer">
                Bank Transfer
              </MenuItem>

            </TextField>

            <TextField
              label="Remarks"
              multiline
              rows={3}
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
            />

          </Box>

        </DialogContent>

        <DialogActions>

          <AppButton
            onClick={() =>
              setPaymentOpen(false)
            }
          >
            Cancel
          </AppButton>

          <AppButton
            variant="contained"
            onClick={collectPayment}
          >
            Save Payment
          </AppButton>

        </DialogActions>

      </Dialog>

    </MainLayout >
  );
}

export default BillingPage;