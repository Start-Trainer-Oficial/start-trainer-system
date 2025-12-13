export type Event = {
  id: number;
  name: string;
  status: "Disponível" | "Esgotado" | "Em Breve" | "Finalizado";
  price: number;
  location: string;
  time: string;
  type: string;
  slots: number;
  title: string;
  imageUrl: string;
  imagekitUrl: string;
  urlLinkAbout: string;
  about: string;
};

export type CreateEventData = {
  name: string;
  status: "Disponível" | "Esgotado" | "Em Breve" | "Finalizado";
  price: number;
  location: string;
  time: string;
  type: string;
  title: string;
  imageUrl: string;
  imagekitUrl: string;
  urlLinkAbout: string;
  about: string;
};

export type EventRegistration = {
  registrationId: number;
  distance: string;
  shirtSize: string;
  createdAt: string;
  event: Event;
};

export type CreateEventRegistrationData = {
  email: string;
  fullName: string;
  phone: string;
  cpf: string;
  birthDate: string;
  distance: string;
  shirtSize: string;
};

const API_URL = process.env.API_URL;

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error("Erro ao buscar eventos");
  return res.json();
}

export async function createEvent(data: CreateEventData): Promise<Event> {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}

// Inscrição em evento
export async function registerInEvent(
  eventId: number,
  data: CreateEventRegistrationData
): Promise<{ message: string; registrationId: number }> {
  const res = await fetch(`${API_URL}/events/${eventId}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao registrar no evento");
  }

  return res.json();
}

// Buscar eventos de um usuário
export async function getMyEvents(email: string): Promise<EventRegistration[]> {
  const res = await fetch(
    `${API_URL}/events/my?email=${encodeURIComponent(email)}`
  );
  if (!res.ok) throw new Error("Erro ao buscar meus eventos");
  return res.json();
}
