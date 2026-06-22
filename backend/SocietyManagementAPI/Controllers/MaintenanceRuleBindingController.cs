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
    public class MaintenanceRuleBindingController : ControllerBase
    {
        private readonly DbHelper _db;

        public MaintenanceRuleBindingController(
            DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetBindings()
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                var result =
                    _db.ExecuteList(

                        "USP_MAINTENANCE_RULE_BINDING",

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
                        error = ex.Message
                    });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBindingById(
            int id)
        {
            try
            {
                var result =
                    _db.ExecuteList(

                        "USP_MAINTENANCE_RULE_BINDING",

                        new SqlParameter(
                            "@ACTION",
                            "GETBYID"),

                        new SqlParameter(
                            "@BINDING_ID",
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
                        error = ex.Message
                    });
            }
        }

        [HttpGet("entities/{entityType}")]
        public IActionResult GetEntities(
            string entityType)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                var result =
                    _db.ExecuteList(

                        "USP_MAINTENANCE_RULE_BINDING",

                        new SqlParameter(
                            "@ACTION",
                            "GET_ENTITIES_BY_TYPE"),

                        new SqlParameter(
                            "@TENANT_ID",
                            tenantId),

                        new SqlParameter(
                            "@ENTITY_TYPE",
                            entityType)
                    );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message
                    });
            }
        }

        [HttpPost]
        public IActionResult AddBinding(
            MaintenanceRuleBindingModel model)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE_BINDING",

                    new SqlParameter("@ACTION", "INSERT"),
                    new SqlParameter("@TENANT_ID", tenantId),

                    new SqlParameter("@ENTITY_TYPE", model.EntityType),
                    new SqlParameter("@ENTITY_ID", model.EntityId),

                    new SqlParameter("@RULE_ID", model.RuleId),

                    new SqlParameter("@EFFECTIVE_FROM", model.EffectiveFrom),

                    new SqlParameter(
                        "@EFFECTIVE_TO",
                        (object?)model.EffectiveTo ?? DBNull.Value),

                    new SqlParameter("@IS_ACTIVE", model.IsActive),

                    new SqlParameter(
                        "@REMARKS",
                        model.Remarks ?? (object)DBNull.Value),

                    new SqlParameter("@CREATED_BY", model.CreatedBy)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Binding Created"
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message
                    });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBinding(
            int id,
            MaintenanceRuleBindingModel model)
        {
            try
            {
                int tenantId =
                    Convert.ToInt32(
                        User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE_BINDING",

                    new SqlParameter("@ACTION", "UPDATE"),
                    new SqlParameter("@BINDING_ID", id),
                    new SqlParameter("@TENANT_ID", tenantId),

                    new SqlParameter("@ENTITY_TYPE", model.EntityType),
                    new SqlParameter("@ENTITY_ID", model.EntityId),

                    new SqlParameter("@RULE_ID", model.RuleId),

                    new SqlParameter("@EFFECTIVE_FROM", model.EffectiveFrom),

                    new SqlParameter(
                        "@EFFECTIVE_TO",
                        (object?)model.EffectiveTo ?? DBNull.Value),

                    new SqlParameter("@IS_ACTIVE", model.IsActive),

                    new SqlParameter(
                        "@REMARKS",
                        model.Remarks ?? (object)DBNull.Value),

                    new SqlParameter("@MODIFIED_BY", model.ModifiedBy)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Binding Updated"
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message
                    });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBinding(
            int id)
        {
            try
            {
                int userId =
                    Convert.ToInt32(
                        User.FindFirst("UserId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_MAINTENANCE_RULE_BINDING",

                    new SqlParameter("@ACTION", "DELETE"),

                    new SqlParameter(
                        "@BINDING_ID",
                        id),

                    new SqlParameter(
                        "@MODIFIED_BY",
                        userId)
                );

                return Ok(
                    new
                    {
                        Success = true,
                        Message = "Binding Deleted"
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message
                    });
            }
        }
    }
}