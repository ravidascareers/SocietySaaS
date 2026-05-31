import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

function LoginPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card style={{ width: 400, padding: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Society SaaS
          </Typography>

          <Typography variant="body1" gutterBottom>
            Admin Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;