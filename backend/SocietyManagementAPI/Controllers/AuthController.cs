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

        public AuthController(DbHelper db)
        {
            _db = db;
        }

/*
    [HttpPost("login")]
    public IActionResult Login(LoginModel model)
    {
        DataTable dt = _db.ExecuteDataTable("USP_LOGIN",
            new SqlParameter("@ACTION", "LOGIN"),
            new SqlParameter("@LOGIN_ID",model.LoginId),
            new SqlParameter("@PASSWORD_HASH",model.Password));

        if (dt.Rows.Count == 0)
        {
            return Unauthorized(
                new
                {
                    message = "Invalid Login"
                });
        }

        DataRow row = dt.Rows[0];

        return Ok(
            new
            {
                userId =Convert.ToInt32(row["USER_ID"]),
                tenantId =Convert.ToInt32(row["TENANT_ID"]),
                userName =row["USER_NAME"]?.ToString(),
                loginId =row["LOGIN_ID"]?.ToString(),
                tenantName =row["TENANT_NAME"]?.ToString()
            });
        }*/


        [HttpPost("login")]
        public IActionResult Login(LoginModel model)
        {
            try
            {
                DataTable dt = _db.ExecuteDataTable(
                    "USP_LOGIN",
                    new SqlParameter("@ACTION", "LOGIN"),
                    new SqlParameter("@LOGIN_ID", model.LoginId),
                    new SqlParameter("@PASSWORD_HASH", model.Password));

                if (dt.Rows.Count == 0)
                {
                    return Unauthorized(
                        new
                        {
                            message = "Invalid Login"
                        });
                }

                DataRow row = dt.Rows[0];

                return Ok(
                    new
                    {
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
    }

}   