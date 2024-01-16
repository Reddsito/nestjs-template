import { createZodDto } from "nestjs-zod"
import { z } from "nestjs-zod/z"

const CreateUserDtoSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(100).toLowerCase().trim(),
  fullName: z.string().min(3).toLowerCase().trim()
})

export class CreateUserDto extends createZodDto(CreateUserDtoSchema) {
  
  email: string
  password: string
  fullName: string

}
