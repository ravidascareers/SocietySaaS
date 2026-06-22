public class MaintenanceRuleBindingModel
{
    public int BindingId { get; set; }

    public int TenantId { get; set; }

    public string? EntityType { get; set; }

    public int EntityId { get; set; }

    public int RuleId { get; set; }

    public DateTime EffectiveFrom { get; set; }

    public DateTime? EffectiveTo { get; set; }

    public bool IsActive { get; set; }

    public string? Remarks { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }
}