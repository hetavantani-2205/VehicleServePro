export default async function handler(req, res) {
 
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64 } = req.body;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": process.env.CLARIFAI_USER_ID,
        "app_id": process.env.CLARIFAI_APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": { "base64": imageBase64 }
          }
        }
      ]
    });

    const clarifaiResponse = await fetch(
      "https://api.clarifai.com/v2/models/vehicle-detection/outputs",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + process.env.CLARIFAI_API_KEY
        },
        body: raw
      }
    );

    const data = await clarifaiResponse.json();

    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}