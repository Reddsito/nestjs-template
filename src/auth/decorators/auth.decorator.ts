import { UseGuards, applyDecorators } from "@nestjs/common";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/get-user.guard";
import { Role } from "src/users/dto/enums/role.enum";
import { AccessTokenGuard } from "../guards/accessToken.guard";


export function Auth(...roles : Role[]) {
  
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards( AccessTokenGuard, UserRoleGuard )
  )

}