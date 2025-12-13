export type CreateUserData = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
};

export async function registerUser(data: CreateUserData) {
  const response = await fetch(`${process.env.API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log("Failed to register user", data);
  }

  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${process.env.API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao logar");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
