using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SocietyManagementAPI.Helpers;
using SocietyManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace SocietyManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ResidentsController : ControllerBase
    {
        private readonly DbHelper _db;

        public ResidentsController(DbHelper db)
        {
            _db = db;
        }


        [HttpGet]
        public IActionResult GetResidents()
        {
            try
            {
                int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);

            var result =
                _db.ExecuteList(

                    "USP_RESIDENT",

                    new SqlParameter(
                        "@ACTION",
                        "GET"),

                    new SqlParameter(
                        "@TENANT_ID",
                        tenantId)
                );

            return Ok(result);
            }
            catch(Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message,
                        stack = ex.StackTrace
                    });
            }
        }
    
        [HttpGet("{id}")]
        public IActionResult GetResidentById(int id)
        {
            try
            {
            var result =
                _db.ExecuteList(

                    "USP_RESIDENT",

                    new SqlParameter(
                        "@ACTION",
                        "GETBYID"),

                    new SqlParameter(
                        "@RESIDENT_ID",
                        id)
                );

            return Ok(result);
            }
            catch(Exception ex)
            {
                return StatusCode(
                    500,
                    new
                    {
                        error = ex.Message,
                        stack = ex.StackTrace
                    });
            }
        }
    
        [HttpPost]
        public IActionResult AddResident(ResidentModel model)
        {
            int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);

            _db.ExecuteNonQuery(

                "USP_RESIDENT",

                new SqlParameter(
                    "@ACTION",
                    "INSERT"),

                new SqlParameter(
                    "@TENANT_ID",
                    tenantId),

                    new SqlParameter(
                    "@FLAT_ID",
                    model.FlatId),

                new SqlParameter(
                    "@RESIDENT_NAME",
                    model.ResidentName),

                new SqlParameter(
                    "@RESIDENT_TYPE",
                    model.ResidentType),

                new SqlParameter(
                    "@MOBILE_NO",
                    model.MobileNo),

                new SqlParameter(
                    "@EMAIL_ID",
                    model.EmailId),

                new SqlParameter(
                    "@DOB",
                    model.Dob),
                
                new SqlParameter(
                    "@GENDER",
                    model.Gender),

                new SqlParameter(
                    "@MOVE_IN_DATE",
                    model.MoveInDate),

                new SqlParameter(
                    "@MOVE_OUT_DATE",
                    model.MoveOutDate),

                new SqlParameter(
                    "@IS_ACTIVE",
                    model.IsActive),

                new SqlParameter(
                    "@ALTERNATE_MOBILE",
                    model.AlternateMobile),

                new SqlParameter(
                    "@BLOOD_GROUP",
                    model.BloodGroup),

                 new SqlParameter(
                    "@OCCUPATION",
                    model.Occupation),

                 new SqlParameter(
                    "@MAINTENANCE_AMOUNT",
                    model.MaintenanceAmount),

                 new SqlParameter(
                    "@STATUS",
                    model.Status),


                /*Address Tab*/
                new SqlParameter(
                    "@ADDRESS_LINE1",
                    model.AddressLine1),

                new SqlParameter(
                    "@ADDRESS_LINE2",
                    model.AddressLine2),

                new SqlParameter(
                    "@CITY",
                    model.City),

                new SqlParameter(
                    "@STATE_NAME",
                    model.StateName),

                new SqlParameter(
                    "@PINCODE",
                    model.Pincode),

                new SqlParameter(
                    "@COUNTRY",
                    model.Country),

                /*Family Tab*/
                new SqlParameter(
                    "@SPOUSE_NAME",
                    model.SpouseName),

                new SqlParameter(
                    "@SPOUSE_MOBILE",
                    model.SpouseMobile),

                new SqlParameter(
                    "@FAMILY_MEMBERS",
                    model.FamilyMembers),

                new SqlParameter(
                    "@CHILDREN_COUNT",
                    model.ChildrenCount),

                new SqlParameter(
                    "@EMERGENCY_CONTACT",
                    model.EmergencyContact),

                new SqlParameter(
                    "@EMERGENCY_MOBILE",
                    model.EmergencyMobile),

                /*Parking Tab*/
                new SqlParameter(
                    "@PARKING_SLOT",
                    model.ParkingSlot),

                new SqlParameter(
                    "@VEHICLE_NUMBER",
                    model.VehicleNumber),

                new SqlParameter(
                    "@VEHICLE_TYPE",
                    model.VehicleType),

                new SqlParameter(
                    "@TWO_WHEELER_COUNT",
                    model.TwoWheelerCount),

                new SqlParameter(
                    "@FOUR_WHEELER_COUNT",
                    model.FourWheelerCount),

                /*Document Tab*/
                new SqlParameter(
                    "@AADHAAR_NUMBER",
                    model.AadhaarNumber),

                new SqlParameter(
                    "@PAN_NUMBER",
                    model.PanNumber),

                new SqlParameter(
                    "@AGREEMENT_NUMBER",
                    model.AgreementNumber),

                new SqlParameter(
                    "@VOTER_ID",
                    model.VoterId),

                new SqlParameter(
                    "@REMARKS",
                    model.Remarks),

                new SqlParameter(
                    "@CREATED_BY",
                    model.CreatedBy)
            );

            return Ok(
                new
                {
                    message =
                        "Resident Created"
                });
        }
    
        [HttpPut("{id}")]
        public IActionResult UpdateResident(int id, ResidentModel model)
        {
            int tenantId = Convert.ToInt32(User.FindFirst("TenantId")?.Value);

            _db.ExecuteNonQuery(

                "USP_RESIDENT",

                new SqlParameter(
                    "@ACTION",
                    "UPDATE"),

                new SqlParameter(
                    "@RESIDENT_ID",
                    id),

                new SqlParameter(
                    "@TENANT_ID",
                    tenantId),

                    new SqlParameter(
                    "@FLAT_ID",
                    model.FlatId),

                new SqlParameter(
                    "@RESIDENT_NAME",
                    model.ResidentName),

                new SqlParameter(
                    "@RESIDENT_TYPE",
                    model.ResidentType),

                new SqlParameter(
                    "@MOBILE_NO",
                    model.MobileNo),

                new SqlParameter(
                    "@EMAIL_ID",
                    model.EmailId),

                new SqlParameter(
                    "@DOB",
                    model.Dob),
                
                new SqlParameter(
                    "@GENDER",
                    model.Gender),

                new SqlParameter(
                    "@MOVE_IN_DATE",
                    model.MoveInDate),

                new SqlParameter(
                    "@MOVE_OUT_DATE",
                    model.MoveOutDate),

                new SqlParameter(
                    "@IS_ACTIVE",
                    model.IsActive),

                new SqlParameter(
                    "@ALTERNATE_MOBILE",
                    model.AlternateMobile),

                new SqlParameter(
                    "@BLOOD_GROUP",
                    model.BloodGroup),

                 new SqlParameter(
                    "@OCCUPATION",
                    model.Occupation),

                 new SqlParameter(
                    "@MAINTENANCE_AMOUNT",
                    model.MaintenanceAmount),

                 new SqlParameter(
                    "@STATUS",
                    model.Status),

                /*Address Tab*/
                new SqlParameter(
                    "@ADDRESS_LINE1",
                    model.AddressLine1),

                new SqlParameter(
                    "@ADDRESS_LINE2",
                    model.AddressLine2),

                new SqlParameter(
                    "@CITY",
                    model.City),

                new SqlParameter(
                    "@STATE_NAME",
                    model.StateName),

                new SqlParameter(
                    "@PINCODE",
                    model.Pincode),

                new SqlParameter(
                    "@COUNTRY",
                    model.Country),

                /*Family Tab*/
                new SqlParameter(
                    "@SPOUSE_NAME",
                    model.SpouseName),

                new SqlParameter(
                    "@SPOUSE_MOBILE",
                    model.SpouseMobile),

                new SqlParameter(
                    "@FAMILY_MEMBERS",
                    model.FamilyMembers),

                new SqlParameter(
                    "@CHILDREN_COUNT",
                    model.ChildrenCount),

                new SqlParameter(
                    "@EMERGENCY_CONTACT",
                    model.EmergencyContact),

                new SqlParameter(
                    "@EMERGENCY_MOBILE",
                    model.EmergencyMobile),

                /*Parking Tab*/
                new SqlParameter(
                    "@PARKING_SLOT",
                    model.ParkingSlot),

                new SqlParameter(
                    "@VEHICLE_NUMBER",
                    model.VehicleNumber),

                new SqlParameter(
                    "@VEHICLE_TYPE",
                    model.VehicleType),

                new SqlParameter(
                    "@TWO_WHEELER_COUNT",
                    model.TwoWheelerCount),

                new SqlParameter(
                    "@FOUR_WHEELER_COUNT",
                    model.FourWheelerCount),

                /*Document Tab*/
                new SqlParameter(
                    "@AADHAAR_NUMBER",
                    model.AadhaarNumber),

                new SqlParameter(
                    "@PAN_NUMBER",
                    model.PanNumber),

                new SqlParameter(
                    "@AGREEMENT_NUMBER",
                    model.AgreementNumber),

                new SqlParameter(
                    "@VOTER_ID",
                    model.VoterId),

                new SqlParameter(
                    "@REMARKS",
                    model.Remarks),

                new SqlParameter(
                    "@MODIFIED_BY",
                    model.ModifiedBy)
            );

            return Ok(
                new
                {
                    message =
                        "Resident Updated"
                });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteResident(int id)
        {

            _db.ExecuteNonQuery(

                "USP_RESIDENT",

                new SqlParameter(
                    "@ACTION",
                    "DELETE"),

                new SqlParameter(
                    "@RESIDENT_ID",
                    id),

                new SqlParameter(
                    "@TENANT_ID",
                    1)
            );

            return Ok(new
            {
                Success = true,
                Message = "Resident Deleted"
            });
        }
    
    }



}