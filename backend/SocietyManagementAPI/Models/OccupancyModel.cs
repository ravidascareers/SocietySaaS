namespace SocietyManagementAPI.Models
{
    public class OccupancyModel
    {
        public int OccupancyId { get; set; }

        public int TenantId { get; set; }

        public int FlatId { get; set; }

        public string? FlatNo { get; set; }

        public int ResidentId { get; set; }

        public string? ResidentName { get; set; }

        public int TowerId { get; set; }

        public string? TowerName { get; set; }

        public string? OccupancyType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool IsActive { get; set; }

        public string? Remarks { get; set; }

        public DateTime? CreatedOn { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }
    }
}