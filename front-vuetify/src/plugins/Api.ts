import { BASE_URL } from "@/utils/constants";

export default class Api {

    static async getAllUsers() {
        try {
            const users = await fetch(`${BASE_URL}/users`);
            return users.json();
        } catch (err) {
            console.error(err);
        }
    }

    static async getUser(_id: string) {
        try {
            const user = await fetch(`${BASE_URL}/users/${_id}`);
            return user.json();
        } catch (err) {
            console.error(err);
        }
    }

    static async createUser(name: string, surname: string, email: string, patronymic: string, password: string) {
        try {
            const user = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    patronymic,
                    password
                })
            });
            return user.json();
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteUser(id: string) {
        try {
            const user = await fetch(`${BASE_URL}/users/${id}`, {
                method: "DELETE"
            });
        } catch(err) {
            console.error(err);
        }
    }

    static async updateUser(_id: string, name: string, surname: string, email: string, patronymic: string) {
        try {
            const user = await fetch(`${BASE_URL}/users/${_id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    patronymic
                })
            });
            return user.json();
        } catch (err) {
            console.error(err);
        }
    }
    // router.post('/users/:user_id/:friend_id', addFriendToUser);

    static async deleteFriend(user_id: string, friend_id: string) {
        try {
            const responce = await fetch(`${BASE_URL}/users/add/${user_id}/${friend_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            console.log(responce);
            return responce.json();
        } catch(err) {
            console.error(err);
        }
    }

    static async addFriend(user_id: string, friend_id: string) {
        try {
            const responce = await fetch(`${BASE_URL}/users/add/${user_id}/${friend_id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            console.log(responce);
            return responce.json();
        } catch(err) {
            console.error(err);
        }
    }
}
