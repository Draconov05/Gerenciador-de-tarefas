import { Test, TestingModule } from '@nestjs/testing';
import { AssuntosController } from './assuntos.controller';

describe('AssuntosController', () => {
  let controller: AssuntosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssuntosController],
    }).compile();

    controller = module.get<AssuntosController>(AssuntosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
