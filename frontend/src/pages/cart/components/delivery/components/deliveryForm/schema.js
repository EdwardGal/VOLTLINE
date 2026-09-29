import * as yup from 'yup';

export const schema = yup.object({
  city: yup.string().trim().required('Please enter your city'),

  street: yup.string().trim().required('Please enter your street'),

  building: yup.string().trim().required('Please enter building/house number'),

  apartment: yup.string().trim().required('Please enter apartment or office number'),

  entrance: yup.string().trim().notRequired(),

  intercom: yup.string().trim().notRequired(),

  deliveryDate: yup.string().required('Please select a delivery date'),

  timeSlot: yup.string().required('Please select a preferred time slot'),

  note: yup.string().trim().max(500, 'Note must be under 500 characters').notRequired(),
});
