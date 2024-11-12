export class PasswordChangeDto {
  password: string;
  id: string;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }
}
