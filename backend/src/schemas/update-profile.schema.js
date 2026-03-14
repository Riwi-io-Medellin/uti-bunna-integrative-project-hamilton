// update-profile.schema.js
// AJV JSON Schema for the PATCH /api/users/me endpoint.
// Only phone_number, currentPassword and newPassword are accepted.
// additionalProperties: false ensures no other field (e.g. address) can pass validation.

export const updateProfileSchema = {
  type: "object",
  // At least one of the allowed fields must be present
  minProperties: 1,
  // Strictly reject any field that is not in the whitelist
  additionalProperties: false,
  properties: {
    // New phone number — digits only, optional leading "+"
    phone_number: {
      type: "string",
      minLength: 7,
      maxLength: 15,
      pattern: "^\\+?[0-9]{7,15}$"
    },
    // Current password required when the user wants to change the password
    currentPassword: {
      type: "string",
      minLength: 6
    },
    // New desired password
    newPassword: {
      type: "string",
      minLength: 6
    }
  }
}
