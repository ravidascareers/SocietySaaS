namespace SocietyManagementAPI.Models
{
    public class InvoiceDetailModel
    {
        public string ChargeName { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal Quantity { get; set; }

        public decimal Rate { get; set; }

        public decimal Amount { get; set; }
    }
}