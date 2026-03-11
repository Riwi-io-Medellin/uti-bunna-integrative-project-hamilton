export const registerSchema = {
  type: "object",
  required: ["fullName", "email", "password", "role", "shift", "phone", "address", "location"],
  properties: {
    fullName: {
      type: "string",
      minLength: 2
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      minLength: 6
    },
    role: {
      type: "string",
      enum: ["driver", "passenger"]
    },
    shift: {
      type: "string",
      enum: ["morning", "evening"]
    },
    phone: {
      type: "string",
      minLength: 1
    },
    address: {
      type: "string",
      minLength: 1
    },
    location: {
      type: "object",
      required: ["type", "coordinates"],
      properties: {
        type: {
          type: "string",
          enum: ["Point"]
        },
        coordinates: {
          type: "array",
          minItems: 2,
          maxItems: 2,
          items: [
            {
              type: "number",
              minimum: -75.68319749575764,
              maximum: -75.51145782249795
            },
            {
              type: "number",
              minimum: 6.121219829039681,
              maximum: 6.393028475741706
            }
          ]
        }
      }
    }
  }
}

