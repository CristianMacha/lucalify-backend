import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './infrastructure/client.schema';
import { TypeDocument } from './infrastructure/type-document.schema';
import { ClientController } from './infrastructure/client.controller';
import { TypeDocumentController } from './infrastructure/type-document.controller';
import { FilteredClientsUseCase } from './aplication/filteredClientsUseCase';
import { RegisterClientUseCase } from './aplication/registerClientUseCase';
import { RegisterTypeDocumentUseCase } from './aplication/registerTypeDocumentUseCase';
import { ClientMysqlRepository } from './infrastructure/client.mysq.repository';
import { TypeDocumentMysqlRepository } from './infrastructure/type-document.mysql.repository';
import { ListTypeDocumentUseCase } from './aplication/listTypeDocumentUseCase';
import { UpdateClientUseCase } from './aplication/updateClientUseCase';
import { UpdateTypeDocumentUseCase } from './aplication/updateTypeDocumentUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([Client, TypeDocument])],
  controllers: [ClientController, TypeDocumentController],
  providers: [
    JwtService,
    FilteredClientsUseCase,
    RegisterClientUseCase,
    RegisterTypeDocumentUseCase,
    ListTypeDocumentUseCase,
    UpdateTypeDocumentUseCase,
    UpdateClientUseCase,
    {
      provide: 'ClientRepository',
      useClass: ClientMysqlRepository,
    },
    {
      provide: 'TypeDocumentRepository',
      useClass: TypeDocumentMysqlRepository,
    },
  ],
})
export class ClientModule {}
