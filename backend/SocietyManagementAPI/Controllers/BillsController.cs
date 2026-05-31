using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Models;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BillsController(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

     [HttpPost("generate")]
public IActionResult GenerateBills(
    [FromBody] GenerateBillRequest request)
{
    string connectionString =
        _configuration.GetConnectionString(
            "DefaultConnection");

            int insertedCount = 0;

    using (SqlConnection connection =
           new SqlConnection(connectionString))
    {
        connection.Open();

        

        // FETCH RESIDENTS
        string residentQuery = @"
            SELECT
                RESIDENT_ID,
                TENANT_ID,
                MAINTENANCE_AMOUNT
            FROM TB_RESIDENTS
            WHERE TENANT_ID = @TENANT_ID
            AND IS_ACTIVE = 1
        ";

        using (SqlCommand residentCommand =
               new SqlCommand(
                   residentQuery,
                   connection))
        {
            residentCommand.Parameters.AddWithValue(
                "@TENANT_ID",
                request.TenantId);

            using (SqlDataReader reader =
                   residentCommand.ExecuteReader())
            {
                List<dynamic> residents =
                    new List<dynamic>();

                while (reader.Read())
                {
                    residents.Add(new
                    {
                        ResidentId =
                            Convert.ToInt32(
                                reader["RESIDENT_ID"]
                            ),

                        TenantId =
                            Convert.ToInt32(
                                reader["TENANT_ID"]
                            ),

                        Amount =
                            Convert.ToDecimal(
                                reader["MAINTENANCE_AMOUNT"]
                            )
                    });
                }

                reader.Close();

               

                foreach (var resident in residents)
                {
                    

                    // CHECK DUPLICATE BILL
                    string checkQuery = @"
                        SELECT COUNT(*)
                        FROM TB_BILLS
                        WHERE RESIDENT_ID =
                            @RESIDENT_ID
                        AND BILL_MONTH =
                            @BILL_MONTH
                    ";

                    using (SqlCommand checkCommand =
                           new SqlCommand(
                               checkQuery,
                               connection))
                    {
                        checkCommand.Parameters.AddWithValue(
                            "@RESIDENT_ID",
                            resident.ResidentId);

                        checkCommand.Parameters.AddWithValue(
                            "@BILL_MONTH",
                            request.BillMonth);

                        int existingCount =
                            (int)checkCommand.ExecuteScalar();

                        if (existingCount > 0)
                        {
                            continue;
                        }
                    }

                    // INSERT BILL
                    string insertQuery = @"
                        INSERT INTO TB_BILLS
                        (
                            TENANT_ID,
                            RESIDENT_ID,
                            BILL_MONTH,
                            BILL_AMOUNT,
                            DUE_DATE,
                            PAYMENT_STATUS
                        )
                        VALUES
                        (
                            @TENANT_ID,
                            @RESIDENT_ID,
                            @BILL_MONTH,
                            @BILL_AMOUNT,
                            @DUE_DATE,
                            'Pending'
                        )
                    ";

                    using (SqlCommand insertCommand =
                           new SqlCommand(
                               insertQuery,
                               connection))
                    {
                        insertCommand.Parameters.AddWithValue(
                            "@TENANT_ID",
                            resident.TenantId);

                        insertCommand.Parameters.AddWithValue(
                            "@RESIDENT_ID",
                            resident.ResidentId);

                        insertCommand.Parameters.AddWithValue(
                            "@BILL_MONTH",
                            request.BillMonth);

                        insertCommand.Parameters.AddWithValue(
                            "@BILL_AMOUNT",
                            resident.Amount);

                        insertCommand.Parameters.AddWithValue(
                            "@DUE_DATE",
                            request.DueDate);

                        insertCommand.ExecuteNonQuery();
                        insertedCount++;
                    }
                }
            }
        }
    }

    if (insertedCount == 0)
    {
    return Ok(new
    {
        message =
            "Bills already exist for this month"
    });
    }

        return Ok(new
        {
            message =
                "Bills generated successfully"
        });

}
        
        [HttpGet]
        public IActionResult GetBills(int tenantId = 1)
        {
            var bills = new List<object>();

            string connectionString =
                _configuration.GetConnectionString(
                    "DefaultConnection");

            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                connection.Open();

                string query = @"
                    SELECT
                        B.BILL_ID,
                        R.FLAT_NO,
                        R.OWNER_NAME,
                        B.BILL_MONTH,
                        B.BILL_AMOUNT,
                        B.DUE_DATE,
                        B.PAYMENT_STATUS,
                        R.MOBILE_NO
                    FROM TB_BILLS B
                    INNER JOIN TB_RESIDENTS R
                        ON B.RESIDENT_ID = R.RESIDENT_ID
                    WHERE B.TENANT_ID = @TENANT_ID
                    ORDER BY B.BILL_ID DESC
                ";

                using (SqlCommand command =
                    new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue(
                        "@TENANT_ID",
                        tenantId);

                    using (SqlDataReader reader =
                        command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            bills.Add(new
                            {
                                BillId =
                                    reader["BILL_ID"],

                                Flat =
                                    reader["FLAT_NO"].ToString(),

                                Owner =
                                    reader["OWNER_NAME"].ToString(),

                                Month =
                                    reader["BILL_MONTH"].ToString(),

                                Amount =
                                    reader["BILL_AMOUNT"],

                                DueDate =
                                    reader["DUE_DATE"],

                                Status =
                                    reader["PAYMENT_STATUS"].ToString(),

                                Mobile =
                                    reader["MOBILE_NO"].ToString(),
                            });
                        }
                    }
                }
            }

            return Ok(bills);
        }
    }
}