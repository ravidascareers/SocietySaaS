using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;
using Microsoft.AspNetCore.Authorization;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FlatController : ControllerBase
    {
        private readonly DbHelper _db;

        public FlatController(DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetFlats()
        {
            try
            {
                int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);


                var result =
                    _db.ExecuteList(

                        "USP_FLAT",

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

        [HttpPost]
        public IActionResult AddFlat(FlatModel model)
        {
            try
            {
                int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_FLAT",

                    new SqlParameter(
                        "@ACTION",
                        "INSERT"),

                    new SqlParameter(
                        "@TENANT_ID",
                         tenantId),

                        new SqlParameter(
                        "@TOWER_ID",
                        model.TowerId),

                    new SqlParameter(
                        "@FLAT_NO",
                        model.FlatNo),

                    new SqlParameter(
                        "@FLOOR_NO",
                        model.FloorNo),

                    new SqlParameter(
                        "@AREA_SQFT",
                        model.AreaSqFt),

                    new SqlParameter(
                        "@MAINTENANCE_RATE",
                        model.MaintenanceRate),

                    new SqlParameter(
                        "@STATUS",
                        model.Status),

                    new SqlParameter(
                        "@CREATED_BY",
                        model.CreatedBy),

                    new SqlParameter(
                            "@FLAT_TYPE_ID",
                            model.FlatTypeId
                        )
                );

                return Ok(
                    new
                    {
                        message =
                            "Flat Created"
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
        public IActionResult UpdateFlat(int id, FlatModel model)
        {
            try
            {
                int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);

                _db.ExecuteNonQuery(

                    "USP_FLAT",

                    new SqlParameter(
                        "@ACTION",
                        "UPDATE"),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId),

                    new SqlParameter(
                        "@TOWER_ID",
                        model.TowerId),

                    new SqlParameter(
                        "@FLAT_ID",
                        id),

                    new SqlParameter(
                        "@FLAT_NO",
                        model.FlatNo),

                    new SqlParameter(
                        "@FLOOR_NO",
                        model.FloorNo),

                    new SqlParameter(
                        "@AREA_SQFT",
                        model.AreaSqFt),

                    new SqlParameter(
                        "@MAINTENANCE_RATE",
                        model.MaintenanceRate),

                    new SqlParameter(
                        "@STATUS",
                        model.Status),

                    new SqlParameter(
                        "@MODIFIED_BY",
                        model.ModifiedBy),

                    new SqlParameter(
                            "@FLAT_TYPE_ID",
                            model.FlatTypeId
                        )
                );

                return Ok(new
                {
                    Success = true,
                    Message = "Flat Updated"
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
