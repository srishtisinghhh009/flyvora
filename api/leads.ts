const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function submitLead(payload: Record<string, unknown>): Promise<{ id?: string }> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error('Could not reach the server. Please check your internet and try again.');
  }

  let body: { ok?: boolean; id?: string; error?: string } = {};
  try {
    body = await response.json();
  } catch {
    // The server sent no JSON; fall through to the generic message below.
  }

  if (response.status === 429) {
    throw new Error('Too many requests. Please try again in a few minutes.');
  }
  if (!response.ok || body.ok === false) {
    throw new Error(body.error ?? 'Something went wrong. Please try again.');
  }
  return { id: body.id };
}