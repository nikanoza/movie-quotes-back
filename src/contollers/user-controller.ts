import { Request, Response } from "express";
import { PasswordRecovery, User } from "models";
import crypto from "crypto"
import { generateExpireDate } from "helpers";
import { sendPasswordRecovery } from "mail";

export const passwordRecovery = async (req:Request, res: Response) => {
    const { email, backLink } = req.body;

    const user = await User.findOne({ "emails.email": email });

    if(!user){
        return res.status(400).json({message: "user with this email did'not find"});
    }

    const primary = user.emails.find(email => email.primary);

    if(primary !== email){
        return res.status(400).json({message: "Looks like this is not your primary email"});
    }

    const hash = crypto.randomBytes(48).toString("hex");
    const date = generateExpireDate();

    await PasswordRecovery.create({ email, hash, expireIn: date});
    await sendPasswordRecovery(email, hash, user.name, backLink);

    return res.status(200).json({message: "Check your email for instractions!"})
}