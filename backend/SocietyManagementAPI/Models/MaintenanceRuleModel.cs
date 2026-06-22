public class MaintenanceRuleModel
{
    public int RuleId { get; set; }

    public int TenantId { get; set; }

    public string? RuleName { get; set; }

    public string? CalculationMethod { get; set; }

    public decimal? RatePerSqft { get; set; }

    public decimal? FixedAmount { get; set; }

    public int GraceDays { get; set; }

    public decimal PenaltyPercent { get; set; }

    public decimal InterestPercent { get; set; }

    public string? InterestMode { get; set; }

    public bool IsActive { get; set; }
    
    public bool IsLocked { get; set; }

    public DateTime? LockedOn { get; set; }

    public string? Remarks { get; set; }
    public int? CreatedBy { get; set; }

    public int? ModifiedBy { get; set; }
  
}