import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const payload = JSON.stringify({
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "passenger",
    "shift": "morning",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "location": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(
    'https://uti-bunna-integrative-project-hamilton-qrqj.onrender.com/#/register',
    payload,
    params
  );

  check(res, {
    'login exitoso': (r) => r.status === 200,
  });
}