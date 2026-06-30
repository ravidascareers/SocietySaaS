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

import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import AppPage from "../components/ui/AppPage";
import AppCard from "../components/ui/AppCard";
import AppHeader from "../components/ui/AppHeader";
import AppButton from "../components/ui/AppButton";
import AppDataGrid from "../components/ui/AppDataGrid";
import ActionChip from "../components/ui/ActionChip";
import SummaryCard from "../components/ui/SummaryCard";

import { downloadInvoice } from "../services/pdfService";
import {
  getBills,
  generateBills,
  getBillById
}
  from "../services/billingService";

import {
  collectPayment
}
  from "../services/paymentService";


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
      field: "billNo",
      headerName: "billNo",
      flex: 1,
    },

    {
      field: "towerName",
      headerName: "towerName",
      flex: 1.5,
    },

    {
      field: "flatNo",
      headerName: "flatNo",
      flex: 1,
    },

     {
      field: "residentName",
      headerName: "residentName",
      flex: 1,
    },

     {
      field: "billMonth",
      headerName: "billMonth",
      flex: 1,
    },

     {
      field: "billYear",
      headerName: "billYear",
      flex: 1,
    },

    {
      field: "totalAmount",
      headerName: "totalAmount",
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
      field: "receivedAmount",
      headerName: "receivedAmount",
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
      field: "outstandingAmount",
      headerName: "outstandingAmount",
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



  useEffect(() => {

    loadBills();

  }, []);


  const sendReminder = (bill) => {

    console.log(bill);

    const message =
      `Dear ${bill.residentName},

Your maintenance bill for ${bill.billMonth} is pending.

Amount Due: ₹ ${bill.totalAmount}

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

    try {

      const response =
        await downloadInvoice(
          bill.billId
        );

      const url =
        window.URL.createObjectURL(

          new Blob(
            [response.data],
            {
              type: "application/pdf"
            }
          )
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `Invoice_${bill.billNo ?? bill.billId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    }
    catch (err) {

      console.error(err);

      alert(
        "Unable to download invoice."
      );
    }
  };

  const loadBills = async () => {

    try {

      const response =
        await getBills();

      setBills(response.data);

    }
    catch (err) {

      console.error(err);

      alert("Unable to load bills.");

    }

  };

  const handleGenerateBills = async () => {

    if (!billMonth || !dueDate) {

      alert("Please fill all fields.");

      return;

    }

    try {

      await generateBills({

        billMonth,

        dueDate

      });

      alert("Bills generated successfully.");

      loadBills();

    }
    catch (err) {

      console.error(err);

      alert("Unable to generate bills.");

    }

  };

  const handleCollectPayment = async () => {

    try {

      await collectPayment({

        billId:

          selectedBill.billId,

        paymentAmount,

        paymentMode,

        remarks

      });

      alert(
        "Payment collected successfully."
      );

      setPaymentOpen(false);

      loadBills();

    }
    catch (err) {

      console.error(err);

      alert("Payment failed.");

    }

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

              await handleGenerateBills();

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
            onClick={handleCollectPayment}
          >
            Save Payment
          </AppButton>

        </DialogActions>

      </Dialog>

    </MainLayout >
  );
}

export default BillingPage;