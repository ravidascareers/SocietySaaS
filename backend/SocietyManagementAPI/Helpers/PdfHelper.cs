using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using SocietyManagementAPI.Models;

namespace SocietyManagementAPI.Helpers
{
    public class PdfHelper
    {
        private readonly PdfFont _normalFont;
        private readonly PdfFont _boldFont;

        public PdfHelper()
        {
            _normalFont =
                PdfFontFactory.CreateFont(
                    StandardFonts.HELVETICA);

            _boldFont =
                PdfFontFactory.CreateFont(
                    StandardFonts.HELVETICA_BOLD);
        }

        public byte[] GenerateInvoice(
            InvoicePdfModel invoice)
        {
            using MemoryStream ms =
                new MemoryStream();

            PdfWriter writer =
                new PdfWriter(ms);

            PdfDocument pdf =
                new PdfDocument(writer);

            Document document =
                new Document(
                    pdf,
                    PageSize.A4);

            document.SetMargins(
                30,
                30,
                30,
                30);

            AddHeader(
                document,
                invoice);

            AddInvoiceInfo(
                document,
                invoice);

            AddChargeTable(
                document,
                invoice);

            AddSummary(
                document,
                invoice);

            AddFooter(
                document);

            document.Close();

            return ms.ToArray();
        }

                private Cell GetHeaderCell(
            string text)
        {
            return new Cell()

                .Add(
                    new Paragraph(text)
                        .SetFont(_boldFont)
                        .SetFontSize(10)
                        .SetFontColor(ColorConstants.WHITE))

                .SetBackgroundColor(
                    new DeviceRgb(
                        44,
                        62,
                        80))

                .SetTextAlignment(
                    TextAlignment.CENTER)

                .SetPadding(6);
        }

        private Cell GetLabelCell(
            string text)
        {
            return new Cell()

                .Add(
                    new Paragraph(text)
                        .SetFont(_boldFont)
                        .SetFontSize(10))

                .SetBorder(Border.NO_BORDER)

                .SetPadding(3);
        }

        private Cell GetValueCell(
            string text)
        {
            return new Cell()

                .Add(
                    new Paragraph(text)
                        .SetFont(_normalFont)
                        .SetFontSize(10))

                .SetBorder(Border.NO_BORDER)

                .SetPadding(3);
        }

        private Cell GetAmountCell(
            decimal amount)
        {
            return new Cell()

                .Add(
                    new Paragraph(
                        amount.ToString("N2"))

                        .SetFont(_normalFont)

                        .SetFontSize(10))

                .SetTextAlignment(
                    TextAlignment.RIGHT)

                .SetPadding(4);
        }

                private void AddHeader(
            Document document,
            InvoicePdfModel invoice)
        {
            Table table =
                new Table(1)
                .UseAllAvailableWidth();

            table.AddCell(

                new Cell()

                .SetBorder(Border.NO_BORDER)

                .Add(

                    new Paragraph(invoice.Header.SocietyName)

                    .SetFont(_boldFont)

                    .SetFontSize(18)

                    .SetTextAlignment(TextAlignment.CENTER)
                )
            );

            table.AddCell(

                new Cell()

                .SetBorder(Border.NO_BORDER)

                .Add(

                    new Paragraph(

                        $"{invoice.Header.SocietyAddress}\n" +
                        $"{invoice.Header.SocietyCity}, {invoice.Header.SocietyState} - {invoice.Header.SocietyPinCode}")

                    .SetFont(_normalFont)

                    .SetFontSize(10)

                    .SetTextAlignment(TextAlignment.CENTER)
                )
            );

            table.AddCell(

                new Cell()

                .SetBorder(Border.NO_BORDER)

                .Add(

                    new Paragraph("MAINTENANCE INVOICE")

                    .SetFont(_boldFont)

                    .SetFontSize(16)

                    .SetTextAlignment(TextAlignment.CENTER)
                )
            );

            document.Add(table);

            document.Add(new Paragraph("\n"));
        }

                private void AddInvoiceInfo(
            Document document,
            InvoicePdfModel invoice)
        {
            Table table =
                new Table(4)
                .UseAllAvailableWidth();

            table.AddCell(GetLabelCell("Invoice No"));
            table.AddCell(GetValueCell(invoice.Header.BillNo));

            table.AddCell(GetLabelCell("Invoice Date"));
            table.AddCell(
                GetValueCell(
                    invoice.Header.BillDate.ToString("dd-MMM-yyyy")));

            table.AddCell(GetLabelCell("Due Date"));
            table.AddCell(
                GetValueCell(
                    invoice.Header.DueDate.ToString("dd-MMM-yyyy")));

            table.AddCell(GetLabelCell("Status"));
            table.AddCell(
                GetValueCell(invoice.Header.Status));

            table.AddCell(GetLabelCell("Resident"));
            table.AddCell(
                GetValueCell(invoice.Header.ResidentName));

            table.AddCell(GetLabelCell("Tower"));
            table.AddCell(
                GetValueCell(invoice.Header.TowerName));

            table.AddCell(GetLabelCell("Flat"));
            table.AddCell(
                GetValueCell(invoice.Header.FlatNo));

            table.AddCell(GetLabelCell("Area"));
            table.AddCell(
                GetValueCell(
                    invoice.Header.AreaSqft.ToString("N2") + " Sq.Ft"));

            table.AddCell(GetLabelCell("Rule"));
            table.AddCell(
                GetValueCell(invoice.Header.RuleName));

            table.AddCell(GetLabelCell("Billing Period"));
            table.AddCell(
                GetValueCell(
                    $"{invoice.Header.BillMonth}/{invoice.Header.BillYear}"));

            document.Add(table);

            document.Add(new Paragraph("\n"));
        }

                private void AddChargeTable(
            Document document,
            InvoicePdfModel invoice)
        {
            Table table =
                new Table(new float[]
                {
                    3,
                    4,
                    1.5f,
                    2,
                    2
                });

            table.UseAllAvailableWidth();

            table.AddHeaderCell(
                GetHeaderCell("Charge"));

            table.AddHeaderCell(
                GetHeaderCell("Description"));

            table.AddHeaderCell(
                GetHeaderCell("Qty"));

            table.AddHeaderCell(
                GetHeaderCell("Rate"));

            table.AddHeaderCell(
                GetHeaderCell("Amount"));

            foreach (var item in invoice.Details)
            {
                table.AddCell(

                    new Cell()

                    .Add(
                        new Paragraph(item.ChargeName)
                        .SetFont(_normalFont)
                        .SetFontSize(10))
                );

                table.AddCell(

                    new Cell()

                    .Add(
                        new Paragraph(item.Description ?? "")
                        .SetFont(_normalFont)
                        .SetFontSize(10))
                );

                table.AddCell(

                    new Cell()

                    .Add(
                        new Paragraph(item.Quantity.ToString("N2"))
                        .SetFont(_normalFont)
                        .SetFontSize(10))

                    .SetTextAlignment(TextAlignment.RIGHT)
                );

                table.AddCell(

                    new Cell()

                    .Add(
                        new Paragraph(item.Rate.ToString("N2"))
                        .SetFont(_normalFont)
                        .SetFontSize(10))

                    .SetTextAlignment(TextAlignment.RIGHT)
                );

                table.AddCell(

                    new Cell()

                    .Add(
                        new Paragraph(item.Amount.ToString("N2"))
                        .SetFont(_normalFont)
                        .SetFontSize(10))

                    .SetTextAlignment(TextAlignment.RIGHT)
                );
            }

            document.Add(table);

            document.Add(new Paragraph("\n"));
        }

                private void AddSummary(
            Document document,
            InvoicePdfModel invoice)
        {
            document.Add(new Paragraph("\n"));

            Table table =
                new Table(2);

            table.SetWidth(250);

            table.SetHorizontalAlignment(
                HorizontalAlignment.RIGHT);

            table.AddCell(GetLabelCell("Total Amount"));

            table.AddCell(
                GetAmountCell(
                    invoice.Header.TotalAmount));

            table.AddCell(GetLabelCell("Received"));

            table.AddCell(
                GetAmountCell(
                    invoice.Header.ReceivedAmount));

            table.AddCell(GetLabelCell("Outstanding"));

            table.AddCell(
                GetAmountCell(
                    invoice.Header.OutstandingAmount));

            document.Add(table);
        }

        private void AddFooter(
            Document document)
        {
            document.Add(new Paragraph("\n"));

            document.Add(

                new Paragraph(
                    "--------------------------------------------------------------")

                .SetTextAlignment(
                    TextAlignment.CENTER)

                .SetFontSize(9)
            );

            document.Add(

                new Paragraph(
                    "This is a computer generated invoice and does not require a signature.")

                .SetTextAlignment(
                    TextAlignment.CENTER)

                .SetFont(_normalFont)

                .SetFontSize(9)
            );

            document.Add(

                new Paragraph(
                    "Thank you for your timely payment.")

                .SetTextAlignment(
                    TextAlignment.CENTER)

                .SetFont(_boldFont)

                .SetFontSize(10)
            );
        }

    }
}