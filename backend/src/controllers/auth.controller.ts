
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import config from '../config';
import { logAdminAction } from '../services/audit.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // --- Input Validation ---
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }
    // --- End Validation ---

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Simplified: Directly issue JWT for both users and admins
        const tokenPayload = { id: user.id, role: user.role };
        const token = jwt.sign(tokenPayload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        } as jwt.SignOptions);
        
        req.user = { id: user.id, role: user.role };

        if(user.role === 'ADMIN') {
            await logAdminAction(req, 'Admin Logged In');
        }

        const { password: _, ...userResponse } = user;
        res.json({
            token,
            user: userResponse,
        });
    } catch (error) {
        next(error);
    }
};