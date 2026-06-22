namespace SocietyManagementAPI.Models
{
    public class PaymentRequest
    {
        public int TenantId { get; set; }

        public int BillId { get; set; }

        public decimal PaymentAmount { get; set; }

        public DateTime PaymentDate { get; set; }

        public string? PaymentMode { get; set; }

        public string? Remarks { get; set; }
    }
}