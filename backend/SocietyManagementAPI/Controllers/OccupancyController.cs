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
public class OccupancyController : ControllerBase
{
private readonly DbHelper _db;

    public OccupancyController(DbHelper db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetCurrentOccupancy()
    {
        try
        {
            int tenantId =
                Convert.ToInt32(
                    User.FindFirst("TenantId")?.Value);

            var result =
                _db.ExecuteList(

                    "USP_OCCUPANCY",

                    new SqlParameter(
                        "@ACTION",
                        "GET_CURRENT"),

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

    [HttpGet("history/{flatId}")]
    public IActionResult GetOccupancyHistory(int flatId)
    {
        try
        {
            int tenantId =
                Convert.ToInt32(
                    User.FindFirst("TenantId")?.Value);

            var result =
                _db.ExecuteList(

                    "USP_OCCUPANCY",

                    new SqlParameter(
                        "@ACTION",
                        "GET_HISTORY"),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId),

                    new SqlParameter(
                        "@FLAT_ID",
                        flatId)
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
    public IActionResult AddOccupancy(OccupancyModel model)
    {
        try
        {
            int tenantId =
                Convert.ToInt32(
                    User.FindFirst("TenantId")?.Value);

            _db.ExecuteNonQuery(

                "USP_OCCUPANCY",

                new SqlParameter(
                    "@ACTION",
                    "INSERT"),

                new SqlParameter(
                    "@TENANT_ID",
                    tenantId),

                new SqlParameter(
                    "@FLAT_ID",
                    model.FlatId),

                new SqlParameter(
                    "@RESIDENT_ID",
                    model.ResidentId),

                new SqlParameter(
                    "@OCCUPANCY_TYPE",
                    model.OccupancyType),

                new SqlParameter(
                    "@START_DATE",
                    model.StartDate),

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
                    message =
                        "Occupancy Created"
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
    public IActionResult UpdateOccupancy(
        int id,
        OccupancyModel model)
    {
        try
        {
            int tenantId =
                Convert.ToInt32(
                    User.FindFirst("TenantId")?.Value);

            _db.ExecuteNonQuery(

                "USP_OCCUPANCY",

                new SqlParameter(
                    "@ACTION",
                    "UPDATE"),

                new SqlParameter(
                    "@TENANT_ID",
                    tenantId),

                new SqlParameter(
                    "@OCCUPANCY_ID",
                    id),

                new SqlParameter(
                    "@OCCUPANCY_TYPE",
                    model.OccupancyType),

                new SqlParameter(
                    "@START_DATE",
                    model.StartDate),

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
                    Message = "Occupancy Updated"
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

    [HttpPut("vacate/{id}")]
    public IActionResult VacateOccupancy(
        int id,
        OccupancyModel model)
    {
        try
        {
            int tenantId =
                Convert.ToInt32(
                    User.FindFirst("TenantId")?.Value);

            _db.ExecuteNonQuery(

                "USP_OCCUPANCY",

                new SqlParameter(
                    "@ACTION",
                    "VACATE"),

                new SqlParameter(
                    "@TENANT_ID",
                    tenantId),

                new SqlParameter(
                    "@OCCUPANCY_ID",
                    id),

                new SqlParameter(
                    "@MODIFIED_BY",
                    model.ModifiedBy)
            );

            return Ok(
                new
                {
                    Success = true,
                    Message = "Occupancy Vacated"
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
