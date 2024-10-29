import { Router, RequestHandler } from 'express';
import Detection from '../models/Detection';

const router = Router();

const getRiskLevel = (orbitHeight: number): string => {
    if (orbitHeight < 400) return "LOW";
    if (orbitHeight <= 800) return "MEDIUM";
    return "HIGH";
};

const debrisStatusHandler: RequestHandler = async (req, res) => {
    const orbitHeight = parseInt(req.params.orbit_height);

    if (isNaN(orbitHeight)) {
        res.status(400).json({ error: 'Invalid orbit height' });
        return;
    }

    const riskLevel = getRiskLevel(orbitHeight);

    // Save the detection in the database
    try {
        const detection = new Detection({ orbitHeight, riskLevel });
        await detection.save();
    } catch (error) {
        console.error('Error saving detection:', error);
        res.status(500).json({ error: 'Failed to save detection' });
    }


    res.json({
        message: `Space debris is detected at ${orbitHeight} kilometers. Current risk level: ${riskLevel}`
    });
};




router.get('/status/:orbit_height', debrisStatusHandler);

router.get('/history', async (req, res) => {
    try {
        const history = await Detection.find().sort({ timestamp: -1 }); // Sort by most recent
        res.json(history);
    } catch (error) {
        console.error('Error retrieving history:', error);
        res.status(500).json({ error: 'Failed to retrieve history' });
    }
});


export default router;
