export class User {
  public userId:number;
  public userName: string;
  public userEmail?: string;
  public userPass?: string; //if forgat password
  public isAdmin?: boolean;
  public jwt?: string;

  constructor(
    userId:number,
    userName: string,
    userEmail?: string,
    userPass?: string,
    isAdmin?: boolean,
    jwt?: string
  ) {
    this.userId=userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPass = userPass;
    this.isAdmin = isAdmin;
    this.jwt = jwt;
  }
}
