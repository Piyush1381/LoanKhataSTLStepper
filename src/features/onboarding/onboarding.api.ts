export async function savePersonal(data: unknown) {
  const response = await fetch("/api/onboarding/personal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save personal information");
  }

  return response.json();
}

export async function saveAddress(data: unknown) {
  const response = await fetch("/api/onboarding/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save address");
  }

  return response.json();
}
