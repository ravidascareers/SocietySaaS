using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public HistoryController(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{residentId}")]
        public IActionResult GetHistory(
            int residentId)
        {
            string connectionString =
                _configuration.GetConnectionString(
                    "DefaultConnection");

            List<object> history =
                new List<object>();

            using (SqlConnection connection =
                   new SqlConnection(connectionString))
            {
                connection.Open();

                string query = @"

                    SELECT
                        BILL_ID AS ID,
                        'Bill' AS TYPE,
                        BILL_AMOUNT AS AMOUNT,
                        BILL_MONTH AS DESCRIPTION,
                        DUE_DATE AS ENTRY_DATE,
                        PAYMENT_STATUS AS STATUS
                    FROM TB_BILLS
                    WHERE RESIDENT_ID =
                        @RESIDENT_ID

                    UNION ALL

                    SELECT
                        PAYMENT_ID AS ID,
                        'Payment' AS TYPE,
                        PAYMENT_AMOUNT AS AMOUNT,
                        PAYMENT_MODE AS DESCRIPTION,
                        PAYMENT_DATE AS ENTRY_DATE,
                        'Paid' AS STATUS
                    FROM TB_PAYMENTS P
                    INNER JOIN TB_BILLS B
                        ON P.BILL_ID = B.BILL_ID
                    WHERE B.RESIDENT_ID =
                        @RESIDENT_ID

                    ORDER BY ENTRY_DATE DESC
                ";

                using (SqlCommand command =
                       new SqlCommand(
                           query,
                           connection))
                {
                    command.Parameters.AddWithValue(
                        "@RESIDENT_ID",
                        residentId);

                    using (SqlDataReader reader =
                           command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            history.Add(new
                            {
                                Id = 
                                  reader["ID"],

                                Type =
                                    reader["TYPE"]
                                        .ToString(),

                                Amount =
                                    reader["AMOUNT"],

                                Description =
                                    reader["DESCRIPTION"]
                                        .ToString(),

                                EntryDate =
                                    reader["ENTRY_DATE"],

                                Status =
                                    reader["STATUS"]
                                        .ToString()
                            });
                        }
                    }
                }
            }

            return Ok(history);
        }
    }
}