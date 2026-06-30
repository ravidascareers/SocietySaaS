using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BillsController : ControllerBase
    {
        private readonly DbHelper _db;

        public BillsController(
            DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetBills()
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                var result =
                    _db.ExecuteList(

                        "USP_BILL",

                        new SqlParameter(
                            "@ACTION",
                            "GET"),

                        new SqlParameter(
                            "@TENANT_ID",
                            tenantId)
                    );

                return Ok(result);
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

        [HttpGet("{id}")]
        public IActionResult GetBillById(
            int id)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                var result =
                    _db.ExecuteList(

                        "USP_BILL",

                        new SqlParameter(
                            "@ACTION",
                            "GETBYID"),

                        new SqlParameter(
                            "@TENANT_ID",
                            tenantId),

                        new SqlParameter(
                            "@BILL_ID",
                            id)
                    );

                return Ok(result);
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

        [HttpPost("generate")]
        public IActionResult GenerateBills(
            GenerateBillRequest model)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                int generatedBy =
                    Convert.ToInt32(
                        User.FindFirst("UserId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_BILL",

                    new SqlParameter(
                        "@ACTION",
                        "GENERATE"),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId),

                    new SqlParameter(
                        "@BILL_MONTH",
                        model.BillMonth),

                    new SqlParameter(
                        "@BILL_YEAR",
                        model.BillYear),

                    new SqlParameter(
                        "@BILL_DATE",
                        model.BillDate),

                    new SqlParameter(
                        "@DUE_DATE",
                        model.DueDate),

                    new SqlParameter(
                        "@GENERATED_BY",
                        generatedBy)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Bills generated successfully."
                    });
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