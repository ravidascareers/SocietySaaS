using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PdfController : ControllerBase
    {
        private readonly DbHelper _db;
        private readonly PdfHelper _pdf;

        public PdfController(
            DbHelper db,
            PdfHelper pdf)
        {
            _db = db;
            _pdf = pdf;
        }

        [HttpGet("invoice/{billId}")]
        public IActionResult DownloadInvoice(
            int billId)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                DataSet ds =
                    _db.ExecuteDataSet(

                        "USP_GET_PDF_DATA",

                        new SqlParameter(
                            "@ACTION",
                            "GET_BILL"),

                        new SqlParameter(
                            "@TENANT_ID",
                            tenantId),

                        new SqlParameter(
                            "@REFERENCE_ID",
                            billId)
                    );

                if (ds.Tables.Count == 0 ||
                    ds.Tables[0].Rows.Count == 0)
                {
                    return NotFound(
                        "Invoice not found.");
                }

                DataRow row =
                    ds.Tables[0].Rows[0];

                InvoiceHeaderModel header =
                    new InvoiceHeaderModel
                    {
                        BillId = Convert.ToInt32(row["BILL_ID"]),
                        BillNo = row["BILL_NO"]?.ToString() ?? "",

                        BillMonth = Convert.ToInt32(row["BILL_MONTH"]),
                        BillYear = Convert.ToInt32(row["BILL_YEAR"]),

                        BillDate = Convert.ToDateTime(row["BILL_DATE"]),
                        DueDate = Convert.ToDateTime(row["DUE_DATE"]),

                        Status = row["STATUS"]?.ToString() ?? "",

                        SocietyName = row["SOCIETY_NAME"]?.ToString() ?? "",
                        SocietyAddress = row["ADDRESS"]?.ToString(),
                        SocietyCity = row["CITY"]?.ToString(),
                        SocietyState = row["STATE"]?.ToString(),
                        SocietyPinCode = row["PIN_CODE"]?.ToString(),
                        SocietyContactNo = row["CONTACT_NO"]?.ToString(),
                        SocietyEmail = row["EMAIL"]?.ToString(),
                        SocietyGSTNo = row["GST_NO"]?.ToString(),
                        SocietyLogoPath = row["LOGO_PATH"]?.ToString(),

                        TowerName = row["TOWER_NAME"]?.ToString() ?? "",
                        FlatNo = row["FLAT_NO"]?.ToString() ?? "",

                        AreaSqft =
                            Convert.ToDecimal(row["AREA_SQFT"]),

                        ResidentName =
                            row["RESIDENT_NAME"]?.ToString() ?? "",

                        RuleName =
                            row["RULE_NAME"]?.ToString() ?? "",

                        CalculationMethod =
                            row["CALCULATION_METHOD"]?.ToString() ?? "",

                        RatePerSqft =
                            row["RATE_PER_SQFT"] == DBNull.Value
                                ? null
                                : Convert.ToDecimal(row["RATE_PER_SQFT"]),

                        FixedAmount =
                            row["FIXED_AMOUNT"] == DBNull.Value
                                ? null
                                : Convert.ToDecimal(row["FIXED_AMOUNT"]),

                        MaintenanceAmount =
                            Convert.ToDecimal(row["MAINTENANCE_AMOUNT"]),

                        PenaltyAmount =
                            Convert.ToDecimal(row["PENALTY_AMOUNT"]),

                        InterestAmount =
                            Convert.ToDecimal(row["INTEREST_AMOUNT"]),

                        DiscountAmount =
                            Convert.ToDecimal(row["DISCOUNT_AMOUNT"]),

                        OtherAmount =
                            Convert.ToDecimal(row["OTHER_AMOUNT"]),

                        TotalAmount =
                            Convert.ToDecimal(row["TOTAL_AMOUNT"]),

                        ReceivedAmount =
                            Convert.ToDecimal(row["RECEIVED_AMOUNT"]),

                        OutstandingAmount =
                            Convert.ToDecimal(row["OUTSTANDING_AMOUNT"])
                    };

                List<InvoiceDetailModel> details =
                    new List<InvoiceDetailModel>();

                foreach (DataRow item in ds.Tables[1].Rows)
                {
                    details.Add(
                        new InvoiceDetailModel
                        {
                            ChargeName =
                                item["CHARGE_NAME"]?.ToString() ?? "",

                            Description =
                                item["DESCRIPTION"]?.ToString(),

                            Quantity =
                                Convert.ToDecimal(item["QUANTITY"]),

                            Rate =
                                Convert.ToDecimal(item["RATE"]),

                            Amount =
                                Convert.ToDecimal(item["AMOUNT"])
                        });
                }

                InvoicePdfModel invoice =
                    new InvoicePdfModel
                    {
                        Header = header,
                        Details = details
                    };

                byte[] pdf =
                    _pdf.GenerateInvoice(invoice);

                return File(

                    pdf,

                    "application/pdf",

                    $"Invoice_{header.BillNo}.pdf"
                );
            }
            catch (Exception ex)
            {
                return StatusCode(

                    500,

                    new
                    {
                        error = ex.Message,
                        stack = ex.StackTrace
                    });
            }
        }
    }
}