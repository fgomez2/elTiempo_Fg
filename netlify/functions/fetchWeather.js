exports.handler = async (event, context) => {
    const { city } = event.queryStringParameters;
    const API_KEY = process.env.API_KEY; // Configurada en Netlify
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      const data = await response.json();
      
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" }, // Permite CORS
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch weather data" }),
      };
    }
};