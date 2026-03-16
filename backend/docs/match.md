# Match Endpoint

## Overview

The match endpoint finds compatible passengers for a driver based on geographic and schedule criteria. The system applies sequential filters: role (passengers only), matching shift, location within driver's route area (bounding box), and distance less than 1 km from the driver's route.

## Endpoint

```
GET /api/drivers/matches
```

## Headers

| Header             | Required | Description                          |
|--------------------|----------|--------------------------------------|
| Authorization      | Yes      | Bearer token (JWT)                   |

## Example Requests

### cURL
```bash
curl -X GET http://localhost:3000/api/drivers/matches \
  -H "Authorization: Bearer <token>"
```

### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/drivers/matches', {
  headers: {
    'Authorization': 'Bearer <token>'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

## Successful Response - 200 OK

### Matches Found
```json
{
  "driverId": 1,
   "driverRoute": "{\"type\":\"LineString\",\"coordinates\":[[-75.567438,6.208171],[-75.567283,6.208565],[-75.567163,6.208847],[-75.566826,6.208716],[-75.566672,6.209064],[-75.566649,6.209127],[-75.566625,6.209196],[-75.566377,6.209841],[-75.566358,6.20989],[-75.56714,6.210185],[-75.567718,6.210403],[-75.568218,6.210594],[-75.568431,6.210675],[-75.568492,6.210698],[-75.568901,6.210841],[-75.569105,6.210922],[-75.569456,6.211055],[-75.569607,6.211104],[-75.569778,6.211145],[-75.57007,6.211188],[-75.570194,6.211227],[-75.570351,6.21129],[-75.570453,6.211365],[-75.570564,6.211477],[-75.570687,6.211616],[-75.570792,6.211721],[-75.570823,6.211749],[-75.570931,6.211836],[-75.571561,6.212081],[-75.571617,6.212103],[-75.571672,6.212125],[-75.571861,6.2122],[-75.572056,6.212276],[-75.572136,6.212307],[-75.572195,6.212333],[-75.572342,6.212396],[-75.572466,6.212455],[-75.572576,6.212517],[-75.572757,6.212637],[-75.572884,6.212712],[-75.573007,6.212774],[-75.57313,6.212818],[-75.57327,6.212843],[-75.573368,6.212852],[-75.573739,6.212859],[-75.573777,6.212865],[-75.5739,6.212881],[-75.574105,6.212917],[-75.574197,6.212935],[-75.574534,6.213011],[-75.574729,6.213058],[-75.574848,6.213073],[-75.575113,6.213085],[-75.575305,6.21311],[-75.575503,6.213154],[-75.575813,6.21323],[-75.576302,6.213344],[-75.576978,6.213482],[-75.577505,6.2136],[-75.578711,6.213822],[-75.578724,6.213825],[-75.579107,6.213896],[-75.579277,6.213944],[-75.579689,6.214105],[-75.580036,6.214224],[-75.580095,6.214245],[-75.580358,6.214341],[-75.581001,6.214569],[-75.581077,6.2146],[-75.581124,6.214618],[-75.581227,6.214666],[-75.581299,6.214711],[-75.581307,6.214719],[-75.581425,6.214835],[-75.581432,6.214912],[-75.581465,6.215001],[-75.581522,6.215078],[-75.581599,6.215135],[-75.581689,6.215168],[-75.581785,6.215174],[-75.58188,6.215152],[-75.58203,6.215147],[-75.582051,6.215147],[-75.582195,6.215184],[-75.582413,6.215298],[-75.582657,6.215427],[-75.584072,6.216174],[-75.584694,6.216484],[-75.585031,6.216646],[-75.585499,6.216878],[-75.58568,6.217],[-75.585786,6.217205],[-75.585766,6.21742],[-75.585752,6.217519],[-75.585684,6.217893],[-75.585625,6.218167],[-75.585606,6.218214],[-75.585576,6.218279],[-75.585476,6.218422],[-75.585405,6.21847],[-75.585349,6.218536],[-75.585324,6.218583],[-75.585308,6.218634],[-75.5853,6.218687],[-75.585301,6.218741],[-75.58531,6.218786],[-75.585325,6.218829],[-75.585341,6.218985],[-75.585351,6.21917],[-75.585337,6.219349],[-75.585281,6.219481],[-75.585185,6.219668],[-75.585167,6.219696],[-75.585046,6.219891],[-75.584919,6.220101],[-75.584888,6.220155],[-75.584859,6.220147],[-75.584587,6.22008],[-75.584194,6.219993],[-75.583872,6.21992],[-75.583538,6.219842],[-75.583476,6.219828]]}",
  "total": 3,
  "matches": [
    {
      "user_id": 5,
      "full_name": "Maria Gonzalez",
      "email": "maria@example.com",
      "phone": "+1234567891",
      "shift": "morning",
      "location": "{\"type\":\"Point\",\"coordinates\":[-75.583,6.219]}"
    }
  ]
}
```

### No Matches Found
```json
{
  "driverId": 1,
  "total": 0,
  "matches": []
}
```

## Error Responses

### No Token - 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### Invalid Token - 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### Access Denied (Not a Driver) - 403 Forbidden
```json
{
  "error": "Access denied. Drivers only."
}
```

### Invalid Driver - 400 Bad Request
```json
{
  "error": "Invalid driver id"
}
```

## Matching Algorithm

The algorithm applies 4 sequential filters:

1. **Role Filter**: Only users with role = 'passenger'
2. **Shift Filter**: Only passengers with the same shift as the driver (morning/evening)
3. **Area Filter**: Only passengers within the route's bounding box
4. **Distance Filter**: Only passengers less than 1 km from the driver's route

## Location Data Format

The `location` field is a GeoJSON string that needs to be parsed:

```javascript
const locationData = JSON.parse(match.location);
const [longitude, latitude] = locationData.coordinates;
```

## Security Notes

1. The driver ID is extracted from the JWT token, not from the URL
2. Only users with role = 'driver' can access this endpoint
3. Tokens expire after the configured time (JWT_EXPIRES_IN)

