namespace SocietyManagementAPI.Models
{
    public class UserModel
    {
        public int UserId { get; set; }

        public int TenantId { get; set; }

        public string? UserName { get; set; }

        public string? LoginId { get; set; }

        public string? PasswordHash { get; set; }

        public string? EmailId { get; set; }

        public string? MobileNo { get; set; }

        public bool IsActive { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }
}