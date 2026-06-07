using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DbHelper _db;
        private readonly JwtHelper _jwtHelper;

        public AuthController(DbHelper db, JwtHelper jwtHelper)
        {
            _db = db;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginModel model)
        {
            try
            {
                DataTable dt = _db.ExecuteDataTable(
                    "USP_LOGIN",
                    new SqlParameter("@ACTION", "LOGIN"),
                    new SqlParameter("@LOGIN_ID", model.LoginId)
                    );

                if (dt.Rows.Count == 0)
                {
                    return Unauthorized(
                        new
                        {
                            message = "Invalid Login"
                        });
                }

                DataRow row = dt.Rows[0];

                bool validPassword = PasswordHelper.VerifyPassword(model.Password,row["PASSWORD_HASH"]?.ToString());

                if (!validPassword)
                {
                    return Unauthorized(
                        new
                        {
                            message =
                                "Invalid Login"
                        });
                }

                string token =
                        _jwtHelper.GenerateToken(

                            Convert.ToInt32(
                                row["USER_ID"]),

                            Convert.ToInt32(
                                row["TENANT_ID"]),

                            row["USER_NAME"]
                                ?.ToString() ?? "",

                            row["LOGIN_ID"]
                                ?.ToString() ?? ""

                        );

                

                return Ok(
                    new
                    {
                        token = token,
                        userId = Convert.ToInt32(row["USER_ID"]),
                        tenantId = Convert.ToInt32(row["TENANT_ID"]),
                        userName = row["USER_NAME"]?.ToString(),
                        loginId = row["LOGIN_ID"]?.ToString(),
                        tenantName = row["TENANT_NAME"]?.ToString()
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
    
    [HttpGet("crypt")]
    public IActionResult Crypt()
        {
            var crypt = PasswordHelper.HashPassword("admin123");
            return Ok(crypt);
        }
    
    }

}