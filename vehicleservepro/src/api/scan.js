export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { imageBase64 } = req.body;

   
    const response = await fetch("https://api.clarifai.com/v2/models/general-image-detection/outputs", {
      method: "POST",
      headers: {
        "Authorization": `Key YOUR_CLARIFAI_API_KEY`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [{ data: { image: { base64: imageBase64 } } }]
      })
    });

    const data = await response.json();
    
 
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}