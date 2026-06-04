namespace SocietyManagementAPI.Models
{
    public class MenuModel
    {
        public int MenuId { get; set; }

        public int? ParentMenuId { get; set; }

        public string? MenuName { get; set; }

        public string? MenuTitle { get; set; }

        public string? MenuPath { get; set; }

        public string? MenuIcon { get; set; }

        public int DisplayOrder { get; set; }
    }
}