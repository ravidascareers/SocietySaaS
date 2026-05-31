namespace SocietyManagementAPI.Models
{
    public class ResidentModel
    {
        public int ResidentId { get; set; }
        public int TenantId { get; set; }
        public int FlatId { get; set; }

        public string? ResidentName { get; set; }
        public string? ResidentType { get; set; }

        public string? MobileNo { get; set; }
        public string? EmailId { get; set; }

        public DateTime? Dob { get; set; }

        public string? Gender { get; set; }

        public DateTime? MoveInDate { get; set; }
        public DateTime? MoveOutDate { get; set; }

        public bool IsActive { get; set; }

        public string? AlternateMobile { get; set; }

        public string? BloodGroup { get; set; }

        public string? Occupation { get; set; }

        public decimal? MaintenanceAmount { get; set; }

        public string? Status { get; set; }

        // Address
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? StateName { get; set; }
        public string? Pincode { get; set; }
        public string? Country { get; set; }

        // Family
        public string? SpouseName { get; set; }
        public string? SpouseMobile { get; set; }
        public string? FamilyMembers { get; set; }
        public int? ChildrenCount { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyMobile { get; set; }

        // Parking
        public string? ParkingSlot { get; set; }
        public string? VehicleNumber { get; set; }
        public string? VehicleType { get; set; }
        public int? TwoWheelerCount { get; set; }
        public int? FourWheelerCount { get; set; }

        // Documents
        public string? AadhaarNumber { get; set; }
        public string? PanNumber { get; set; }
        public string? AgreementNumber { get; set; }
        public string? VoterId { get; set; }
        public string? Remarks { get; set; }
    }
}