using Microsoft.Data.SqlClient;
using System.Data;

namespace SocietyManagementAPI.Helpers
{
    public class DbHelper
    {
        private readonly IConfiguration _configuration;

        public DbHelper(
            IConfiguration configuration)
        {
            _configuration =
                configuration;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(
                _configuration.GetConnectionString(
                    "DefaultConnection"));
        }

        public DataTable ExecuteDataTable(
            string procedureName,

            params SqlParameter[] parameters)
        {
            DataTable dt =
                new DataTable();

            using SqlConnection con =
                GetConnection();

            using SqlCommand cmd =
                new SqlCommand(
                    procedureName,
                    con);

            cmd.CommandType =
                CommandType.StoredProcedure;

            if (parameters != null)
            {
                cmd.Parameters.AddRange(
                    parameters);
            }

            con.Open();

            using SqlDataAdapter da =
                new SqlDataAdapter(cmd);

            da.Fill(dt);

            return dt;
        }

        public int ExecuteNonQuery(
            string procedureName,

            params SqlParameter[] parameters)
        {
            using SqlConnection con =
                GetConnection();

            using SqlCommand cmd =
                new SqlCommand(
                    procedureName,
                    con);

            cmd.CommandType =
                CommandType.StoredProcedure;

            if (parameters != null)
            {
                cmd.Parameters.AddRange(
                    parameters);
            }

            con.Open();

            return cmd.ExecuteNonQuery();
        }

        public object ExecuteScalar(
            string procedureName,

            params SqlParameter[] parameters)
        {
            using SqlConnection con =
                GetConnection();

            using SqlCommand cmd =
                new SqlCommand(
                    procedureName,
                    con);

            cmd.CommandType =
                CommandType.StoredProcedure;

            if (parameters != null)
            {
                cmd.Parameters.AddRange(
                    parameters);
            }

            con.Open();

            return cmd.ExecuteScalar();
        }

        public List<Dictionary<string, object>> ExecuteList(
                string procedureName,
                params SqlParameter[] parameters)
        {
            DataTable dt =
                ExecuteDataTable(
                    procedureName,
                    parameters);

            List<Dictionary<string, object>> list =
                new List<Dictionary<string, object>>();

            foreach (DataRow row in dt.Rows)
            {
                Dictionary<string, object> item =
                    new Dictionary<string, object>();

                foreach (DataColumn col in dt.Columns)
                {
                    item.Add(

                        col.ColumnName,

                        row[col] == DBNull.Value
                            ? null
                            : row[col]

                    );
                }

                list.Add(item);
            }

            return list;
        }
    }
}