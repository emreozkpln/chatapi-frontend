
export async function getText(value) {
  try {
    const response = await fetch('http://localhost:3001/text/', {
      method: 'POST',
      body: JSON.stringify({ text: value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json()
    return data

  } catch (error) {
    return error
  }
}