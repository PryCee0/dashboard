import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email adresi gereklidir')
        .email('Geçerli bir email adresi giriniz'),
    password: z
        .string()
        .min(1, 'Şifre gereklidir')
        .min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Ad Soyad gereklidir')
            .min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
        email: z
            .string()
            .min(1, 'Email adresi gereklidir')
            .email('Geçerli bir email adresi giriniz'),
        password: z
            .string()
            .min(1, 'Şifre gereklidir')
            .min(8, 'Şifre en az 8 karakter olmalıdır'),
        confirmPassword: z.string().min(1, 'Şifre tekrarı gereklidir'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Şifreler eşleşmiyor',
        path: ['confirmPassword'],
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
