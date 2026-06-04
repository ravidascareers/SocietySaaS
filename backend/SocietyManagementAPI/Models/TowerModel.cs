namespace SocietyManagementAPI.Models
{
    public class TowerModel
    {
        public int TowerId { get; set; }

        public int TenantId { get; set; }

        public string? TowerName { get; set; }

        public int TotalFloors { get; set; }

        public string? Status { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }
}