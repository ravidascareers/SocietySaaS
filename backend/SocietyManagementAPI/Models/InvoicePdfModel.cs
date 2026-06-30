namespace SocietyManagementAPI.Models
{
    public class InvoicePdfModel
    {
        public InvoiceHeaderModel Header { get; set; }
            = new InvoiceHeaderModel();

        public List<InvoiceDetailModel> Details { get; set; }
            = new List<InvoiceDetailModel>();
    }
}