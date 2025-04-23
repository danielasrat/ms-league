import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { EventRegistrationService } from './event-registration.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('event-registrations')
export class EventRegistrationController {
  constructor(private readonly registrationService: EventRegistrationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async register(@Body() dto: CreateEventRegistrationDto, @Req() req) {
    return this.registrationService.registerForEvent({
      ...dto,
      userId: req.user.userId
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateRegistration(
    @Param('id') id: string,
    @Body() dto: UpdateEventRegistrationDto
  ) {
    return this.registrationService.updateRegistration(id, dto);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard)
  async getByEvent(@Param('eventId') eventId: string) {
    return this.registrationService.getRegistrationsByEvent(eventId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getByUser(@Req() req) {
    return this.registrationService.getUserRegistrations(req.user.userId);
  }

  @Get('status/:status')
  @UseGuards(JwtAuthGuard)
  async getByStatus(@Param('status') status: string) {
    return this.registrationService.getRegistrationsByStatus(status);
  }

  @Get('categorized')
  @UseGuards(JwtAuthGuard)
  async getCategorized() {
    return this.registrationService.categorizeRegistrations();
  }
}
