import { Schema, model, models, Document } from 'mongoose';

interface IEmail extends Document {
  email: string;
}

const emailSchema = new Schema<IEmail>({
  email: { type: String, required: true, unique: true },
});

const Email = models.Email || model<IEmail>('Email', emailSchema);
export default Email;
