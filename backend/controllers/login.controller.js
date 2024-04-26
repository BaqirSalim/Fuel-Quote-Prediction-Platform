import ClientProfile from "../models/client-profile.model.js";
import User from "../models/user.model.js";
import { setSessionUser } from "../util/helper.js";

//part of this code is sourced from https://itnext.io/mastering-session-authentication-aa29096f6e22
class LoginController {
  static async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!username || !password) {
      res.status(402).json({ error: "Username or Password is empty" });
    } else if (user && user.comparePasswords(password)) {
      const session = setSessionUser(user);
      res.send(session);
    } else {
      res.status(401).json({ error: "Incorrect username or password" });
    }
  }

  static async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(402).json({ error: "Username or Password is empty" });
    } else {
      try {
        // create a new user
        const user = await User.create({ username, password });

        console.log(user._id);
        
        // create a blank ClientProfile associated with the new user
        const clientProfile = await ClientProfile.create({
          user: user._id,
          fullName: "placeholder-name",
          address1: "placeholder-address",
          address2: "",
          city: "placeholder-city",
          state: "XX",
          zipcode: "XXXXX",
          orders: [],
        });

        // update the user's clientProfile field with the newly created clientProfile _id
        user.clientProfile = clientProfile._id;
        await user.save();

        // generate session token and send it back to the client
        const session = setSessionUser(user);
        res.send(session);
      } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Username not available" });
      }
    }
  }

  // static delete(req, res) {
  //   try {
  //     const { session } = req.body;
  //     const user = session.user;
  //     if (user) {
  //       session.destroy((err) => {
  //         if (err) throw err;
  //         res.clearCookie(SESS_NAME);
  //         res.send(user);
  //       });
  //     } else {
  //       throw new Error("Unexpected Error occurred");
  //     }
  //   } catch (err) {
  //     res
  //       .status(422)
  //       .send(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  //   }
  // }

  //   static isLoggedIn({ session: { user } }, res) {
  //     res.send({ user });
  //   }
}

export default LoginController;
