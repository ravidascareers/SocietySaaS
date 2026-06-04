import {
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppButton from "../components/ui/AppButton";

import { login as loginService } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const auth = useAuth();

  const [loginId, setLoginId] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response =
        await loginService({

          loginId,

          password
        });

      auth.login(
        response.data
      );

      navigate("/dashboard");

    }
    catch (error) {

      alert(
        "Invalid Login Credentials"
      );
    }
  };

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
            label="Login Id"
            margin="normal"
            value={loginId}
            onChange={(e) =>
              setLoginId(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <AppButton
            onClick={handleLogin}
          >
            Login
          </AppButton>

        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;