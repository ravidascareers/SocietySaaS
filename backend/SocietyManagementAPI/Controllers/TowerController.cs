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

        [HttpPost]
        public IActionResult AddTower(TowerModel model)
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
                    model.Status)
            );

            return Ok(
                new
                {
                    message =
                        "Tower Created"
                });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTower(int id, TowerModel model)
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
                    model.Status)
            );

            return Ok(new
            {
                Success = true,
                Message = "Tower Updated"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTower(
            int id)
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
    }  
}