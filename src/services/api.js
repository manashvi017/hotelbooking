const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

export const getHotels = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }

  const data = await response.json();

  console.log("API DATA:", data);

  return data;
};