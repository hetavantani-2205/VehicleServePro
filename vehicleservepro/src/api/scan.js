export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    
    if (!process.env.CLARIFAI_API_KEY) {
      return res.status(500).json({
        error: "Clarifai API key not configured in environment variables"
      });
    }

    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: "Image base64 data missing"
      });
    }

    const response = await fetch(
      "https://api.clarifai.com/v2/models/general-image-detection/outputs",
      {
        method: "POST",
        headers: {
         
          "Authorization": `Key ${process.env.CLARIFAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: [
            {
              data: {
                image: {
                  base64: imageBase64
                }
              }
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "Clarifai API Error",
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}