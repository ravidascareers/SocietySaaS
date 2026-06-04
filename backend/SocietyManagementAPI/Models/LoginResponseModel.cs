namespace SocietyManagementAPI.Models
{
    public class LoginResponseModel
    {
        public int UserId { get; set; }

        public int TenantId { get; set; }

        public string? UserName { get; set; }

        public string? LoginId { get; set; }

        public string? TenantName { get; set; }

        public string? EmailId { get; set; }

        public string? MobileNo { get; set; }
    }
}