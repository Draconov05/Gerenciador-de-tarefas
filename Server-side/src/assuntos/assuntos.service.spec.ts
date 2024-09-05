import { Test, TestingModule } from '@nestjs/testing';
import { AssuntosService } from './assuntos.service';

describe('AssuntosService', () => {
  let service: AssuntosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssuntosService],
    }).compile();

    service = module.get<AssuntosService>(AssuntosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
