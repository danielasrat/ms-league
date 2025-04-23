import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationController } from './event-registration.controller';

describe('EventRegistrationController', () => {
  let controller: EventRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRegistrationController],
    }).compile();

    controller = module.get<EventRegistrationController>(EventRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
