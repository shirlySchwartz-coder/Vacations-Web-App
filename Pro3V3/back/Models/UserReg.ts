export class UserReg {
  public id: number;
  public userFirstName: string;
  public userLastName: string;
  public userEmail: string;
  public userPassword: string;
  public isAdmin?: boolean;

  constructor(
    id: number,
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userPassword: string,
    isAdmin?: boolean
  ) {
    this.id = id;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.isAdmin = isAdmin;
  }
}
