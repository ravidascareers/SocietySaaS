namespace SocietyManagementAPI.Models
{
    public class ResidentRequest
    {
        public int TenantId { get; set; }

        public string FlatNo { get; set; }

        public string OwnerName { get; set; }

        public string MobileNo { get; set; }

        public string TowerName { get; set; }

        public decimal MaintenanceAmount { get; set; }

        public string PaymentStatus { get; set; }
    }
}