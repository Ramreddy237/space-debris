import mongoose, { Document, Schema } from 'mongoose';

interface DetectionDocument extends Document {
    orbitHeight: number;
    riskLevel: string;
    timestamp: Date;
}

const DetectionSchema = new Schema<DetectionDocument>({
    orbitHeight: { type: Number, required: true },
    riskLevel: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Detection = mongoose.model<DetectionDocument>('Detection', DetectionSchema);

export default Detection;
