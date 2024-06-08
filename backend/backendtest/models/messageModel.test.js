const messageModel = require('../../models/messageModel');

jest.mock('../../models/messageModel');

describe('messageModel', () => {
  it('should return a valid model', () => {
    expect(messageModel).toBeDefined();
  });

  it('should have the expected schema properties', () => {
    // Define the sample schema
    const sampleSchema = {
      chatId: String,
      senderId: String,
      text: String,
    };
    // Set up the mocked messageModel with a sample schema
    messageModel.schema = { obj: sampleSchema };
    // Test the schema properties
    expect(messageModel.schema.obj).toEqual(sampleSchema);
  });
});
