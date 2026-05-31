using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            var result =
                _db.ExecuteList(

                    "USP_FLAT",

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
        public IActionResult AddFlat(FlatModel model)
        {
            _db.ExecuteNonQuery(

                "USP_FLAT",

                new SqlParameter(
                    "@ACTION",
                    "INSERT"),

                new SqlParameter(
                    "@TENANT_ID",
                    model.TenantId),

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
                    model.Status)
            );

            return Ok(
                new
                {
                    message =
                        "Flat Created"
                });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFlat(int id, FlatModel model)
        {
            _db.ExecuteNonQuery(

                "USP_FLAT",

                new SqlParameter(
                    "@ACTION",
                    "UPDATE"),

                new SqlParameter(
                    "@TENANT_ID",
                    model.TenantId),

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
                    model.Status)
            );

            return Ok(new
            {
                Success = true,
                Message = "Flat Updated"
            });
        }
    }


}
