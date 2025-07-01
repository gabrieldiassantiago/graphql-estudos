import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  

  async register(name: string, email: string, password: string): Promise<User> {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new BadRequestException('Email já cadastrado');

    const hash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { name, email, password: hash },
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Senha inválida');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validate(email, password);
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

async getProfile(userId: string): Promise<User | null> {
  return this.prisma.user.findUnique({
    where: { id: userId },
  });
}

}
