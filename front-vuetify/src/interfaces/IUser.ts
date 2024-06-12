export interface IUser {
  _id: string,
  name: string,
  surname: string, 
  email: string, 
  patronymic: string,
  arrayFriends: [IUser],
}