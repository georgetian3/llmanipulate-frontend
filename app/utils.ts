export async function apiRequest(endpoint: string, method: string, data?: any) {
  /**
   * Usage: `const response = apiRequest("/users", "POST", {...})
   */
  return await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}