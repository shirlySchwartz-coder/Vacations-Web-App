import { UserCred } from '../Models/UserCred';
import { createJWT } from '../Utils/jwt';
import { ResultSetHeader } from 'mysql2';
import dal_mysql from '../DAL/dal_mysql';
import { UserReg } from '../Models/UserReg';

//register
const registerUser = async (user: UserReg) => {
  let userInfo;
  try {
    const sql = `
        INSERT INTO users
        Values 
        (0, '${user.userFirstName}', '${user.userLastName}',
        '${user.userEmail}','${user.userPassword}',
         '${user.isAdmin}')
    `;
    const result: ResultSetHeader = await dal_mysql.execute(sql);
    //console.log(`Created user with id:${result.insertId}`);
    user.id = +result.insertId;
  } catch (err) {
    return err;
  }

  return 'User was created';
};

//login from file
const loginUser = async (user:any) => {
  try {
    const sql = `
    SELECT  userId, CONCAT_WS(" ", userFirstName , userLastName) As userName, userEmail, isAdmin  
    FROM tagging_vacation.users
    WHERE userEmail='${user.email}' and userPassword=${user.password};
    `;
    //console.log(sql)
    const [result] = await dal_mysql.execute(sql);
    console.log('result in logic:', result);
    
    if (result) {
      const userInfo={
        userId: result.userId,
        userName: result.userName,
        userEmail: result.userEmail,
        isAdmin: result.isAdmin,
        jwt: createJWT(result)
      };
      return userInfo;
     
    } else {
      console.log(result)
      return ('user dose not exist')
    }
  } catch (err) {
    //userInfo = [];
    return err;
  }
  
};

//delete user
const deleteUser = async (userId: number) => {
  try {
    const sql = `DELETE FROM users WHERE id=${userId}`;
    console.log(sql);
    await dal_mysql.execute(sql);
    return true;
  } catch (err) {
    console.log(err);
  }
};
const forgotPassword = async(userName: string) => {
  try {
    const sql = `SELECT userPassword FROM users WHERE userName='${userName}'`; // שינוי כאן
    const [result] = await dal_mysql.execute(sql); // שינוי כאן
    if (result.length > 0) {
      return result[0].userPassword; // שינוי כאן
    } else {
      return 'User not found'; // שינוי כאן
    }
  } catch (error) {
    console.log(error);
    return 'Error retrieving password'; // שינוי כאן
  }
};
export { registerUser, loginUser, deleteUser, forgotPassword };

/*
//forgot password
const forgotPassword = (userName: string) => {
  let userInfo;
  try {
    userInfo = JSON.parse(fs.readFileSync('users.data'));
  } catch (err) {
    userInfo = [];
  }
  //find the user...
  let singleUser = userInfo.find(
    (item: { userName: string }) => item.userName === userName
  );
  console.log(singleUser);
  if (singleUser === undefined) {
    return '';
  }
  let myJWT = createJWT(singleUser);

  return myJWT;
  //send back the password....
};
*/
