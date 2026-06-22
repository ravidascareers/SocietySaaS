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
    public class MaintenanceRuleController : ControllerBase
    {
        private readonly DbHelper _db;

        public MaintenanceRuleController(DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetRules()
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                var result =
                    _db.ExecuteList(

                        "USP_MAINTENANCE_RULE",

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
        public IActionResult GetRuleById(int id)
        {
            try
            {
                var result =
                    _db.ExecuteList(

                        "USP_MAINTENANCE_RULE",

                        new SqlParameter(
                            "@ACTION",
                            "GETBYID"),

                        new SqlParameter(
                            "@RULE_ID",
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

        [HttpPost]
        public IActionResult AddRule(
            MaintenanceRuleModel model)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE",

                    new SqlParameter(
                        "@ACTION",
                        "INSERT"),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId),

                    new SqlParameter(
                        "@RULE_NAME",
                        model.RuleName),

                    new SqlParameter(
                        "@CALCULATION_METHOD",
                        model.CalculationMethod),

                    new SqlParameter(
                        "@RATE_PER_SQFT",
                        (object?)model.RatePerSqft ?? DBNull.Value),

                    new SqlParameter(
                        "@FIXED_AMOUNT",
                        (object?)model.FixedAmount ?? DBNull.Value),

                    new SqlParameter(
                        "@GRACE_DAYS",
                        model.GraceDays),

                    new SqlParameter(
                        "@PENALTY_PERCENT",
                        model.PenaltyPercent),

                    new SqlParameter(
                        "@INTEREST_PERCENT",
                        model.InterestPercent),

                    new SqlParameter(
                        "@INTEREST_MODE",
                        model.InterestMode),

                    new SqlParameter(
                        "@REMARKS",
                        model.Remarks ?? (object)DBNull.Value),

                    new SqlParameter(
                        "@CREATED_BY",
                        model.CreatedBy)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Rule Created"
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

        [HttpPut("{id}")]
        public IActionResult UpdateRule(
            int id,
            MaintenanceRuleModel model)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE",

                    new SqlParameter(
                        "@ACTION",
                        "UPDATE"),

                    new SqlParameter(
                        "@RULE_ID",
                        id),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId),

                    new SqlParameter(
                        "@RULE_NAME",
                        model.RuleName),

                    new SqlParameter(
                        "@CALCULATION_METHOD",
                        model.CalculationMethod),

                    new SqlParameter(
                        "@RATE_PER_SQFT",
                        (object?)model.RatePerSqft ?? DBNull.Value),

                    new SqlParameter(
                        "@FIXED_AMOUNT",
                        (object?)model.FixedAmount ?? DBNull.Value),

                    new SqlParameter(
                        "@GRACE_DAYS",
                        model.GraceDays),

                    new SqlParameter(
                        "@PENALTY_PERCENT",
                        model.PenaltyPercent),

                    new SqlParameter(
                        "@INTEREST_PERCENT",
                        model.InterestPercent),

                    new SqlParameter(
                        "@INTEREST_MODE",
                        model.InterestMode),

                    new SqlParameter(
                        "@REMARKS",
                        model.Remarks ?? (object)DBNull.Value),

                    new SqlParameter(
                        "@MODIFIED_BY",
                        model.ModifiedBy)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Rule Updated"
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

        [HttpDelete("{id}")]
        public IActionResult DeleteRule(
            int id)
        {
            try
            {
                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE",

                    new SqlParameter(
                        "@ACTION",
                        "DELETE"),

                    new SqlParameter(
                        "@RULE_ID",
                        id),

                    new SqlParameter(
                        "@MODIFIED_BY",
                        User.Identity?.Name ?? "SYSTEM")
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Rule Deleted"
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