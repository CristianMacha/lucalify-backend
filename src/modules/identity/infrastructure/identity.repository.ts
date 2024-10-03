import { Injectable, NotFoundException } from '@nestjs/common';
import { IdentityRepository } from '../domain/identity.repository';
import { IdentityDni } from '../domain/identity-dni.entity';
import { IdentityRuc } from '../domain/identity-ruc.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityApisPeruRepository implements IdentityRepository {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getByDni(dni: string): Promise<IdentityDni> {
    return new Promise((resolve, reject) => {
      const query = this.httpService.get(
        `${this.configService.get<IdentityDni>('IDENTITY_URL')}/dni/${dni}?token=${this.configService.get('IDENTITY_TOKEN')}`,
      );
      query.subscribe({
        next: (response) => {
          if (response.data.success) {
            resolve(response.data);
          } else {
            reject(new NotFoundException(response.data.message));
          }
        },
        error: (error) => {
          reject(new NotFoundException(error.message));
        },
      });
    });
  }

  async getByRuc(ruc: string): Promise<IdentityRuc> {
    return new Promise((resolve, reject) => {
      const query = this.httpService.get(
        `${this.configService.get<IdentityRuc>('IDENTITY_URL')}/ruc/${ruc}?token=${this.configService.get('IDENTITY_TOKEN')}`,
      );

      query.subscribe({
        next: (response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(new NotFoundException(response.data.message));
          }
        },
        error: (error) => {
          reject(new NotFoundException(error.message));
        },
      });
    });
  }
}
