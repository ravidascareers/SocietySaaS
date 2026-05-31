namespace SocietyManagementAPI.Models
{
    public class FlatModel
    {
        public int FlatId { get; set; }

        public int TowerId { get; set; }

        public int TenantId { get; set; }

        public string FlatNo { get; set; }

        public int FloorNo { get; set; }

        public decimal AreaSqFt {get;set;}

        public decimal MaintenanceRate {get;set;}

        public string Status { get; set; }
    }
}