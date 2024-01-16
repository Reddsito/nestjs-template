import { User as UserDB } from '@prisma/client'

export class User {
  
  id: UserDB['id']
  email: UserDB['email']
  password?: UserDB['password']
  fullName: UserDB['fullName']
  isActive: UserDB['isActive']
  roles: UserDB['roles']

}
