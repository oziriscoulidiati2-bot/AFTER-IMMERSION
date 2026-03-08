

// ce qui permet de differencier les roles a la connexion 

import { loginRequest } from "./api.js";
import { setUser } from "./state.js";
import { navigate } from "./app.js";

export async function login(phone, password) {
  try {
    const { user, token } = await loginRequest({ phone, password });

    setUser(user, token);

    if (user.role === "soldat") {
      navigate("dashboard-soldat");
    }

    if (user.role === "admin") {
      navigate("dashboard-admin");
    }

  } catch (error) {
    alert(error.message);
  }
}