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
    public class FlatTypeController : ControllerBase
    {
        private readonly DbHelper _db;

        public FlatTypeController(DbHelper db)
        {
            _db = db;
        }

       /* [HttpGet]
        public IActionResult Get()
        {
            return Ok("FlatType Working");
        }*/


        [HttpGet]
        public IActionResult GetFlatTypes()
        {
            try
            {
                int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);


                var result =
                    _db.ExecuteList(

                        "USP_FLAT",

                        new SqlParameter(
                            "@ACTION",
                            "GETFLATTYPE"),

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
    }
}