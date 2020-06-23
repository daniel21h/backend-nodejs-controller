import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    // Create service with fake repository
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    // Create new appoinment
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    // Verify expect result
    expect(appointment).toHaveProperty('id');
    // expect(appointment.provider_id).toHaveProperty('123123123');
  });

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});