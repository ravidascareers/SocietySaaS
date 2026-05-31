using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Models;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PaymentsController(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult SavePayment(
            [FromBody] PaymentRequest request)
        {
            string connectionString =
                _configuration.GetConnectionString(
                    "DefaultConnection");

            using (SqlConnection connection =
                   new SqlConnection(connectionString))
            {
                connection.Open();

                SqlTransaction transaction =
                    connection.BeginTransaction();

                try
                {

// CHECK IF BILL ALREADY PAID
string checkQuery = @"
    SELECT PAYMENT_STATUS
    FROM TB_BILLS
    WHERE BILL_ID = @BILL_ID
";

using (SqlCommand checkCommand =
       new SqlCommand(
           checkQuery,
           connection))
{
    checkCommand.Parameters.AddWithValue(
        "@BILL_ID",
        request.BillId);

    string status =
        checkCommand.ExecuteScalar()
            ?.ToString();

    if (status == "Paid")
    {
        return BadRequest(new
        {
            message =
                "Bill already paid"
        });
    }
}

                    string paymentQuery = @"
                        INSERT INTO TB_PAYMENTS
                        (
                            TENANT_ID,
                            BILL_ID,
                            PAYMENT_AMOUNT,
                            PAYMENT_DATE,
                            PAYMENT_MODE,
                            REMARKS
                        )
                        VALUES
                        (
                            @TENANT_ID,
                            @BILL_ID,
                            @PAYMENT_AMOUNT,
                            @PAYMENT_DATE,
                            @PAYMENT_MODE,
                            @REMARKS
                        )
                    ";

                    using (SqlCommand command =
                           new SqlCommand(
                               paymentQuery,
                               connection,
                               transaction))
                    {
                        command.Parameters.AddWithValue(
                            "@TENANT_ID",
                            request.TenantId);

                        command.Parameters.AddWithValue(
                            "@BILL_ID",
                            request.BillId);

                        command.Parameters.AddWithValue(
                            "@PAYMENT_AMOUNT",
                            request.PaymentAmount);

                        command.Parameters.AddWithValue(
                            "@PAYMENT_DATE",
                            request.PaymentDate);

                        command.Parameters.AddWithValue(
                            "@PAYMENT_MODE",
                            request.PaymentMode);

                        command.Parameters.AddWithValue(
                            "@REMARKS",
                            request.Remarks);

                        command.ExecuteNonQuery();
                    }

                    string updateBillQuery = @"
                        UPDATE TB_BILLS
                        SET PAYMENT_STATUS = 'Paid'
                        WHERE BILL_ID = @BILL_ID
                    ";

                    using (SqlCommand command =
                           new SqlCommand(
                               updateBillQuery,
                               connection,
                               transaction))
                    {
                        command.Parameters.AddWithValue(
                            "@BILL_ID",
                            request.BillId);

                        command.ExecuteNonQuery();
                    }

                    transaction.Commit();

                    return Ok(new
                    {
                        message =
                            "Payment collected successfully"
                    });
                }
                catch
                {
                    transaction.Rollback();

                    return BadRequest(new
                    {
                        message =
                            "Payment failed"
                    });
                }
            }
        }
    }
}