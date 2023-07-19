import {Schema, model} from "mongoose";
import { PasswordResetType } from "types";

const { String, Date } = Schema.Types;

const passwordResetSchema = new Schema<PasswordResetType>({
    hash: { type: String, required: true },
    email: { type: String, required: true },
    expireIn: {type: Date, required: true }
});

const PasswordRecovery = model("PasswordRecovery", passwordResetSchema);

export default PasswordRecovery;