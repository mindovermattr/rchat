import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import type { components } from '@rchat/contracts';
import { AuthService } from './auth.service';
import { OpenApiValidationPipe } from '../openapi/openapi-validation.pipe';

type RegisterBody = components['schemas']['RegisterBody'];
type LoginBody = components['schemas']['LoginBody'];
type RegisterResponse = components['schemas']['RegisterResponse'];
type LoginResponse = components['schemas']['LoginResponse'];

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body(new OpenApiValidationPipe('RegisterBody')) body: RegisterBody,
  ): Promise<RegisterResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new OpenApiValidationPipe('LoginBody')) body: LoginBody,
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.getAccessToken(user);
  }
}
