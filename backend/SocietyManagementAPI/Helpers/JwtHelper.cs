using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SocietyManagementAPI.Helpers
{
    public class JwtHelper
    {
        private readonly IConfiguration _configuration;

        public JwtHelper(
            IConfiguration configuration)
        {
            _configuration =
                configuration;
        }

        public string GenerateToken(

            int userId,

            int tenantId,

            string userName,

            string loginId)

        {
            var claims =
                new[]
                {
                    new Claim(
                        "UserId",
                        userId.ToString()),

                    new Claim(
                        "TenantId",
                        tenantId.ToString()),

                    new Claim(
                        "UserName",
                        userName),

                    new Claim(
                        "LoginId",
                        loginId)
                };

            var key =
                new SymmetricSecurityKey(

                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!)

                );

            var credentials =
                new SigningCredentials(

                    key,

                    SecurityAlgorithms.HmacSha256

                );

            var token =
                new JwtSecurityToken(

                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims:
                        claims,

                    expires:
                        DateTime.Now.AddHours(8),

                    signingCredentials:
                        credentials
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}