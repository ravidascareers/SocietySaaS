import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";

function AppDataGrid({

    rows = [],

    columns = [],

    loading = false,

    pageSize = 10,

    getRowId,

}) {

    return (

        <DataGrid



            rows={rows}

            columns={columns}

            loading={loading}

            getRowId={getRowId}

            disableRowSelectionOnClick

            density="compact"
            rowHeight={44}
            columnHeaderHeight={36}

            slots={{
                toolbar: GridToolbar,
            }}

            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}

            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize,
                    },
                },
            }}

            pageSizeOptions={[
                5,
                10,
                20,
                50,
            ]}

            sx={{
                width: "100%",
                height:"100%",

                border: "none",

                minWidth: 0,

                backgroundColor:
                    "#ffffff",

                "& .MuiDataGrid-main":
                {
                    overflow: "hidden",
                },

                "& .MuiDataGrid-columnHeaders":
                {
                    backgroundColor:
                        "#f8fafc",

                    borderBottom:
                        "1px solid #e5e7eb",

                    fontWeight: 700,
                },

                "& .MuiDataGrid-cell":
                {
                    borderBottom:
                        "1px solid #f1f5f9",

                    display: "flex",
                    alignItems: "center",
                    fontSize: "13px",
                    py: 0.5,
                },

                "& .MuiDataGrid-row:hover":
                {
                    backgroundColor:
                        "#f9fbff",
                },

                "& .MuiDataGrid-toolbarContainer":
                {
                    padding: 1,

                    borderBottom:
                        "1px solid #e5e7eb",
                },

                "& .MuiDataGrid-footerContainer": {

                    minHeight: 36,

                    maxHeight: 36,

                    borderTop:
                        "1px solid #e5e7eb",

                    justifyContent:
                        "flex-start",

                    px: 1,
                },

                "& .MuiDataGrid-virtualScroller":
                {
                    overflowX: "auto",
                },

                "& .MuiTablePagination-root": {

                    minHeight: 36,

                    maxHeight: 36,

                    overflow: "hidden",

                    fontSize: "12px",
                },

                "& .MuiDataGrid-toolbarContainer": {
                    minHeight: 42,
                    padding: "4px 8px",
                },

                "& .MuiTablePagination-toolbar": {

                    minHeight: 36,

                    paddingLeft: 0,

                    paddingRight: 0,
                },

                "& .MuiTablePagination-spacer": {

                    display: "none",
                },
            }}
        />

    );

}

export default AppDataGrid;