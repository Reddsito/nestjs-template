import { Role } from "src/users/dto/enums/role.enum"


export interface JwtPayload {
  sub: string
  email: string
  role: string[]
}