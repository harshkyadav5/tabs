import { createUser, findUserByEmail, findUserByUsername } from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const signup = async (req, res) => {
    const { username, email, password, profilePicture } = req.body;

    if(!username || !email || !password || !profilePicture)
        return res.status(400).json({ error: "All fields are required." });

    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();

    const regex = /^[a-z0-9_.]+$/;
    const isValidUsername = regex.test(lowerCaseUsername);

    if(!isValidUsername)
        return res.status(400).json({ error: "Username format is not valid" });

    try {
        const usernameCheck = await findUserByUsername(lowerCaseUsername);

        if(usernameCheck)
            return res.status(400).json({ error: "Username already in use." });

        const emailCheck = await findUserByEmail(lowerCaseEmail);

        if(emailCheck)
            return res.status(400).json({ error: "Email already in use." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdAt = new Date();

        const user = await createUser({
            username: lowerCaseUsername,
            email: lowerCaseEmail,
            passwordHash: hashedPassword,
            profilePicture,
            createdAt
        });

        const { password_hash, ...userWithoutPassword } = user;

        return res.status(201).json({ user: userWithoutPassword });
    } catch(err) {
        console.error("Signup error", err);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
}

const signin = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if(!emailOrUsername || !password)
        return res.status(400).json({ error: "Both fields are required." });

    const containsAt = emailOrUsername.includes("@");

    try {
        const userRes = (containsAt ? await findUserByEmail(emailOrUsername) : await findUserByUsername(emailOrUsername));

        if(!userRes)
            return res.status(400).json({ error: "Invalid credentials." });

        const user = userRes;

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch)
            return res.status(400).json({ error: "Invalid credentials." });

        return res.status(200).json("Sign in successful");
    } catch(err) {
        console.error("Sign in error", err);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
}

export { signup, signin }


// to validate the username to only contain 'a-z', '0-9', '_' and '.'

// function isValidUsername(username) {
//     const regex = /^[a-z0-9_.]+$/;
//     return regex.test(username);
// }