import { _createNoteObject } from "../functions";

describe('Create note object function', () => {
  // test stuff
  test('it should create a note object', () => {
    const input = {
      title: 'La primera nota de prueba',
      body: 'La primera nota de prueba'
    }

    const output = {
      title: 'La primera nota de prueba',
      body: 'La primera nota de prueba',
      position: 1,
      createdAt: new Date().toDateString(),
      brief: String(input.body).substring(0, input.body.length / 2),
    }
    expect(_createNoteObject(input.title, input.body)).toEqual(output);
  })
});
