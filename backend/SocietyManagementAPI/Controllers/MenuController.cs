using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly DbHelper _db;

        public MenuController(DbHelper db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetMenu()
        {
            try
            {
            var result =
                _db.ExecuteList(
                    "USP_MENU",
                    new SqlParameter(
                        "@ACTION",
                        "GET"));

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
    }
}