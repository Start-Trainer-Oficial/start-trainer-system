export type Event = {
  id: number;
  name: string;
  status: "Disponível" | "Esgotado" | "Em breve" | "Finalizado";
  price: number;
  location: string;
  time: string;
  type: string;
  slots: number;
  about: string;
  urlLink: string;
  urlLinkAbout: string;
};

export type CreateEventData = {
  name: string;
  status: "Disponível" | "Esgotado" | "Em breve" | "Finalizado";
  price: number;
  location: string;
  time: string;
  type: string;
  about: string;
  urlLink: string;
  urlLinkAbout: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
