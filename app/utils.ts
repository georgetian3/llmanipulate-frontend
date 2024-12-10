export async function apiRequest(endpoint: string, method: string, data?: any) {
  /**
   * Usage: `const response = apiRequest("/users", "POST", {...})
   */
  const url = process.env.NEXT_PUBLIC_API_URL + endpoint
  // console.log('Fetching URL:', url)
  return await fetch(url, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}