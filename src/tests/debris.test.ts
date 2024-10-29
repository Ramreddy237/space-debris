import request from 'supertest';
import app from '../index';

describe('GET /debris/status/:orbit_height', () => {
    it('should return LOW risk for orbit height < 400', async () => {
        const response = await request(app).get('/debris/status/300');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Space debris detected at 300 kilometers. Current risk level: LOW');
    });

    it('should return MEDIUM risk for orbit height between 400 and 800', async () => {
        const response = await request(app).get('/debris/status/500');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Space debris detected at 500 kilometers. Current risk level: MEDIUM');
    });

    it('should return HIGH risk for orbit height > 800', async () => {
        const response = await request(app).get('/debris/status/900');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Space debris detected at 900 kilometers. Current risk level: HIGH');
    });

    it('should return 400 for invalid orbit height', async () => {
        const response = await request(app).get('/debris/status/abc');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid orbit height');
    });
});
