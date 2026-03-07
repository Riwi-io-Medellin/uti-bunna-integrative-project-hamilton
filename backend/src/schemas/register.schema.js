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
          items: { type: "number" },
          minItems: 2,
          maxItems: 2
        }
      }
    }
  }
}

