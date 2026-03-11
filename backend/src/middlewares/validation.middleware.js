import Ajv from "ajv"
import addFormats from "ajv-formats"
import {registerSchema} from "../schemas/register.schema.js"

const ajv = new Ajv()
addFormats(ajv)

export const validate = (schema) => {
  const validate = ajv.compile(schema)
  return (req,res,next) => {
    const valid = validate(req.body)
    if(!valid){
      return res.status(400).json({
        errors: validate.errors
      })
    }
    next()
  }
}

