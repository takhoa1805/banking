export class UserUpdateDto {
  id: string;
  name: string;
  username: string;
  email?: string;

  constructor(id: string, name: string, username: string, email?: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.id = id;
  }
}
