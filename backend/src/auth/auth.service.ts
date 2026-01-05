import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // AQUÍ NORMALMENTE BUSCARÍAS EN LA BASE DE DATOS
    // Para el test, usamos un usuario fijo:
    const user = { userId: 1, email: 'admin@test.com', password: '123456' };

    if (email === user.email && pass === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email } // Devolvemos el email para mostrarlo en el frontend
    };
  }
}