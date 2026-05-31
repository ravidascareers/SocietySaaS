namespace SocietyManagementAPI.Models
{
    public class GenerateBillRequest
    {
        public int TenantId { get; set; }

        public string BillMonth { get; set; }

        public DateTime DueDate { get; set; }
    }
}