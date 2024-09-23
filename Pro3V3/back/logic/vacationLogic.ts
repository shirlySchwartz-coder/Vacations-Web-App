import { Vacation } from './../Models/Vacation';
import dal_mysql from '../DAL/dal_mysql';
import { UserCred } from '../Models/UserCred';

const getAllVacations = async () => {
  const sql = `
    SELECT vacationId ,destination, vacInfo , 
    DATE_FORMAT(startDate, "%d-%m-%Y") As startDate , DATE_FORMAT(endDate, "%d-%m-%Y") As endDate  , price, pictureUrl 
    FROM tagging_vacation.vacations
    `;

  return await dal_mysql.execute(sql);
};

const getVacationById = async (vacationId: number) => {
  const sql = `
    SELECT *
    FROM tagging_vacation.vacations
    WHERE (vacationId = ${vacationId})
    `;

  return await dal_mysql.execute(sql);
};

const followVacation = async (userId: number, vacationId: number) => {
  const sql = `
    INSERT INTO  tagging_vacation.followers(idFollower,idVacation) 
    VALUES (${userId},${vacationId}) ;
    `;

  return await dal_mysql.execute(sql);
};
const unFollowVacation = async (userId: number, vacationId: number) => {
  const sql = `
    DELETE FROM  tagging_vacation.followers WHERE idFollower=${userId} 
    AND idVacation=${vacationId} ;
    `;

  return await dal_mysql.execute(sql);
};

const getFavoritesByUser = async (userId: number) => {
  const sql = `
  SELECT idVacation FROM tagging_vacation.followers where idFollower=${userId} 
    `;
  const favorites = await dal_mysql.execute(sql)
    console.log(favorites)
  return favorites ;
};

export { 
  getAllVacations, getVacationById, followVacation, 
  unFollowVacation, getFavoritesByUser
 };
