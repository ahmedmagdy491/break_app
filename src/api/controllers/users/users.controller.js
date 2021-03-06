const UserDAO = require('../../../dao/users/users.dao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
    constructor({ name, age, avatar, email, password, gender, id } = {}) {
        this.name = name;
        this.age = age;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.id = id;
    }
    toJson() {
        return {
            name: `${this.first_name} ${this.last_name}`,
            age: this.age,
            avatar: this.avatar,
            email: this.email,
            gender: this.gender,
            id: this.id,
        };
    }
    async comparePassword(plainText) {
        console.log(this.password);
        return bcrypt.compare(plainText, this.password);
    }
    encoded() {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                ...this.toJson(),
            },
            process.env.SECRET_KEY
        );
    }
    static async decoded(userJwt) {
        return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
            if (error) {
                return { error };
            }
            return new User(res);
        });
    }
}

class UserController {
    static async register(req, res, next) {
        try {
            let userFromBody = req.body;

            const registerResult = await UserDAO.addUser(userFromBody);
            const token = new User(registerResult);
            console.log(registerResult);
            res.status(201).json({
                auth_token: token.encoded(),
                info: {
                    _id: registerResult._id,
                    name: `${registerResult.first_name} ${registerResult.last_name}`,
                    email: registerResult.email,
                    avatar: registerResult.avatar,
                    golds: registerResult.wallet.golds,
                    role: registerResult.role,
                    age: registerResult.age,
                    gender: registerResult.gender,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || typeof email !== 'string') {
                res.status(400).json({
                    error: 'Bad email format, expected string.',
                });
                return;
            }
            if (!password || typeof password !== 'string') {
                res.status(400).json({
                    error: 'Bad email format, expected string.',
                });
                return;
            }
            console.log(email);
            let userData = await UserDAO.getUser(email);
            console.log(userData);
            if (!userData) {
                res.status(401).json({
                    error: 'Make sure your email is correct.',
                });
                return;
            }
            const user = new User(userData);
            console.log(password);

            if (!(await user.comparePassword(password))) {
                res.status(401).json({
                    error: 'Make sure your password is correct.',
                });
                return;
            }
            const loginResponse = await UserDAO.loginUser(
                user.id,
                user.encoded()
            );
            if (!loginResponse.success) {
                res.status(500).json({ error: loginResponse.error });
                return;
            }
            console.log(loginResponse);
            res.json({
                auth_token: user.encoded(),
                info: {
                    _id: userData._id,
                    name: userData.first_name + ' ' + userData.last_name,
                    email: userData.email,
                    avatar: userData.avatar,
                    role: userData.role,
                    age: userData.age,
                    gender: userData.gender,
                    golds: userData.wallet.golds,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const role = req.query.role;
            const result = await UserDAO.getUsers({ page, limit, role });
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
    static async getUser(req, res, next) {
        try {
            const result = await UserDAO.getUser(req.params.key);
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
    static async getUserById(req, res, next) {
        try {
            const result = await UserDAO.getUserById(req.params.id);
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
    static async getUserProfile(req, res, next) {
        try {
            const profileResult = await UserDAO.getUserProfile({
                visitor: req.user.id,
                userId: req.body.userId,
            });

            res.json(profileResult);
        } catch (error) {
            next(error);
        }
    }

    static async getMyProfile(req, res, next) {
        try {
            const profileResult = await UserDAO.getMyProfile(req.user.id);
            res.json(profileResult);
        } catch (error) {
            next(error);
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const profileResult = await UserDAO.updateProfile(
                req.user.id,
                req.body
            );

            res.json(profileResult);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const profileResult = await UserDAO.updateProfile(
                req.params.key,
                req.body
            );

            res.json(profileResult);
        } catch (error) {
            next(error);
        }
    }
    static async logout(req, res) {
        try {
            const userObj = req.user;
            const logoutResult = await UserDAO.logoutUser(userObj.email);

            if (logoutResult.error) {
                res.status(500).json({ error: logoutResult.error });
                return;
            }
            res.json(logoutResult);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await UserDAO.deleteUser(id);
            if (!deleteResult.success) {
                res.status(500).json({ error: deleteResult.error });
                return;
            }
            res.json(deleteResult);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async FollowSomeOne(req, res, next) {
        try {
            const { id } = req.user;
            const { id_to_follow } = req.body;
            const followResult = await UserDAO.Follow(id, id_to_follow);

            res.json(followResult);
        } catch (error) {
            next(error);
        }
    }

    static async UnfollowSomeOne(req, res, next) {
        try {
            const { id } = req.user;
            const { id_to_unfollow } = req.body;
            const followResult = await UserDAO.Unfollow(id, id_to_unfollow);
            res.json(followResult);
        } catch (error) {
            next(error);
        }
    }

    static async getFollowers(req, res, next) {
        try {
            const { id } = req.user;
            const followersResult = await UserDAO.getFollowers(id);
            res.json(followersResult);
        } catch (error) {
            next(error);
        }
    }
    // static async addVisitor(req, res, next) {
    // 	try {
    // 		const { id } = req.user; // id of visitor user
    // 		const { user_to_visit } = req.body; //  id of user to visit
    // 		const Result = await UserDAO.addVisitor(id, user_to_visit);

    // 		res.json(Result);
    // 	} catch (error) {
    // 		next(error);
    // 	}
    // }

    static async buyProduct(req, res, next) {
        try {
            const { id } = req.user;

            /**
             * 	@constant { string } product | the id of the product to buy
             *  @constant { number } quantity | the number of of product's quantity
             **/
            const { product, quantity } = req.body;
            const info = {
                buyer: id,
                product,
                quantity,
            };

            const buyResult = await UserDAO.buyProduct(info);

            res.status(200).json(buyResult);
        } catch (error) {
            next(error);
        }
    }

    static sendGift(req, res, next) {
        new Promise(async (resolve, reject) => {
            try {
                const sendResult = await UserDAO.sendGifts({
                    ...req.body,
                    sender: req.user.id,
                });
                if (!sendResult.modifiedCount) {
                    reject(
                        res.status(400).json({
                            success: false,
                            msg: 'something went wrong, please try again later',
                        })
                    );
                    return;
                }
                resolve(
                    res.status(200).json({
                        success: true,
                        msg: 'your gift has been sent successfully',
                    })
                );
            } catch (error) {
                reject(next(error));
            }
        });
    }

    static async convertCurrence(req, res, next) {
        try {
            const { id } = req.user;
            const { quantity } = req.body;
            const convertResult = await UserDAO.convertCurrence({
                user_id: id,
                quantity,
            });
            res.json(convertResult);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { UserController, User };
