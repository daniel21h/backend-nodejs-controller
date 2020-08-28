"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    // Create service with fake repository
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    }); // Create new appoinment

    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      user_id: 'user_id',
      provider_id: 'provider_id'
    }); // Verify expect result

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  }); // it('should not be able to create two appointments on the same time', async () => {
  //   const appointmentDate = new Date(2020, 5, 29, 11);
  //   // Create new appoinment
  //   await createAppointment.execute({
  //     date: appointmentDate,
  //     user_id: 'user_id',
  //     provider_id: 'provider_id',
  //   });
  //   await expect(
  //     createAppointment.execute({
  //       date: appointmentDate,
  //       user_id: 'user_id',
  //       provider_id: 'provider_id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 11),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 8pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 11, 7),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 11, 21),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});