namespace SocietyManagementAPI.Models
{
    public class InvoiceHeaderModel
    {
        public int BillId { get; set; }

        public string BillNo { get; set; } = string.Empty;

        public int BillMonth { get; set; }

        public int BillYear { get; set; }

        public DateTime BillDate { get; set; }

        public DateTime DueDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public string SocietyName { get; set; } = string.Empty;

        public string? SocietyAddress { get; set; }

        public string? SocietyCity { get; set; }

        public string? SocietyState { get; set; }

        public string? SocietyPinCode { get; set; }

        public string? SocietyContactNo { get; set; }

        public string? SocietyEmail { get; set; }

        public string? SocietyGSTNo { get; set; }

        public string? SocietyLogoPath { get; set; }

        public string TowerName { get; set; } = string.Empty;

        public string FlatNo { get; set; } = string.Empty;

        public decimal AreaSqft { get; set; }

        public string ResidentName { get; set; } = string.Empty;

        public string RuleName { get; set; } = string.Empty;

        public string CalculationMethod { get; set; } = string.Empty;

        public decimal? RatePerSqft { get; set; }

        public decimal? FixedAmount { get; set; }

        public decimal MaintenanceAmount { get; set; }

        public decimal PenaltyAmount { get; set; }

        public decimal InterestAmount { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal OtherAmount { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal ReceivedAmount { get; set; }

        public decimal OutstandingAmount { get; set; }
    }
}