import { createZodDto } from "nestjs-zod"
import { z } from "nestjs-zod/z"

const LoginUserDtoSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().toLowerCase().trim(),
})

export class LoginUserDto extends createZodDto(LoginUserDtoSchema) {  
  email: string
  password: string
}
