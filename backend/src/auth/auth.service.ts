import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { admins } from '../database/schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const [admin] = await this.db
      .select()
      .from(admins)
      .where(eq(admins.email, dto.email.toLowerCase()))
      .limit(1);

    if (!admin || !(await bcrypt.compare(dto.password, admin.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        sub: admin.id,
        email: admin.email,
      }),
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async validateAdmin(adminId: string) {
    const [admin] = await this.db
      .select({ id: admins.id, email: admins.email, name: admins.name })
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);

    return admin ?? null;
  }

  async seedDefaultAdmin() {
    const email = this.config.get<string>('ADMIN_EMAIL');
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) return;

    const [existing] = await this.db
      .select({ id: admins.id })
      .from(admins)
      .where(eq(admins.email, email.toLowerCase()))
      .limit(1);

    if (existing) return;

    await this.db.insert(admins).values({
      email: email.toLowerCase(),
      passwordHash: await bcrypt.hash(password, 12),
      name: this.config.get('ADMIN_NAME', 'Shop Admin'),
    });
  }
}
