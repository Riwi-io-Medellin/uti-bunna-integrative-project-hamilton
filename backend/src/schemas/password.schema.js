export const passwordSchema = {
  type: "object",
  required: ["password"],
  properties: {
    password: {
      type: "string",
      minLength: 6
    }
  }
}