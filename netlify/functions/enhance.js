// Netlify Function - proxies requests to Replicate to avoid CORS issues

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { token, image, scale, face_enhance } = body;

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing Replicate API token' })
      };
    }

    if (!image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing image data' })
      };
    }

    // Create prediction on Replicate
    const createRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'b3ef194191d13140337468c916c2c5b96dd0cb06dffc032a022a31807f6a5ea8',
        input: {
          image: image,
          scale: scale || 4,
          face_enhance: face_enhance !== false
        }
      })
    });

    const createData = await createRes.json();

    if (!createRes.ok) {
      return {
        statusCode: createRes.status,
        headers,
        body: JSON.stringify({
          error: createData.detail || createData.error || 'Failed to create prediction'
        })
      };
    }

    // Return the prediction object so the frontend can poll
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(createData)
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal server error' })
    };
  }
};
