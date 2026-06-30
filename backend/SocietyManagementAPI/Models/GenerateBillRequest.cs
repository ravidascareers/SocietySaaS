namespace SocietyManagementAPI.Models
{
    public class GenerateBillRequest
    {
       public byte BillMonth { get; set; }

    public short BillYear { get; set; }

    public DateTime BillDate { get; set; }

    public DateTime DueDate { get; set; }
    }
}