using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TowerController : ControllerBase
    {
        private readonly DbHelper _db;

        public TowerController(DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetTowers()
        {
            try
            {
            var result =
                _db.ExecuteList(

                    "USP_TOWER",

                    new SqlParameter(
                        "@ACTION",
                        "GET"),

                    new SqlParameter(
                        "@TENANT_ID",
                        1)
                );

            return Ok(result);
            }
            catch(Exception ex)
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
        public IActionResult AddTower(TowerModel model)
        {
            try
            {
            _db.ExecuteNonQuery(

                "USP_TOWER",

                new SqlParameter(
                    "@ACTION",
                    "INSERT"),

                new SqlParameter(
                    "@TENANT_ID",
                    model.TenantId),

                new SqlParameter(
                    "@TOWER_NAME",
                    model.TowerName),

                new SqlParameter(
                    "@TOTAL_FLOORS",
                    model.TotalFloors),

                new SqlParameter(
                    "@STATUS",
                    model.Status),

                new SqlParameter(
                    "@CREATED_BY",
                    model.CreatedBy)
            );

            return Ok(
                new
                {
                    message =
                        "Tower Created"
                });
            }
            catch(Exception ex)
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
        public IActionResult UpdateTower(int id, TowerModel model)
        {
            try
            {
            _db.ExecuteNonQuery(

                "USP_TOWER",

                new SqlParameter(
                    "@ACTION",
                    "UPDATE"),

                new SqlParameter(
                    "@TOWER_ID",
                    id),

                new SqlParameter(
                    "@TENANT_ID",
                    model.TenantId),

                new SqlParameter(
                    "@TOWER_NAME",
                    model.TowerName),

                new SqlParameter(
                    "@TOTAL_FLOORS",
                    model.TotalFloors),

                new SqlParameter(
                    "@STATUS",
                    model.Status),

                new SqlParameter(
                    "@MODIFIED_BY",
                    model.ModifiedBy)
            );

                return Ok(new
                {
                    Success = true,
                    Message = "Tower Updated"
                });
            }
            catch(Exception ex)
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
        public IActionResult DeleteTower(int id)
        {
            try
            {
            _db.ExecuteNonQuery(

                "USP_TOWER",

                new SqlParameter(
                    "@ACTION",
                    "DELETE"),

                new SqlParameter(
                    "@TOWER_ID",
                    id),

                new SqlParameter(
                    "@TENANT_ID",
                    1)
            );

            return Ok(new
            {
                Success = true,
                Message = "Tower Deleted"
            });
            }
            catch(Exception ex)
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