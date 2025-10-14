// Retorna o usuário logado do localStorage
export function getLoggedUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Retorna o token JWT
export function getToken() {
  return localStorage.getItem('token');
}

// Remove usuário e token (logout)
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Função para fazer requisições autenticadas
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    throw new Error('Erro na requisição autenticada');
  }

  return res.json();
}
