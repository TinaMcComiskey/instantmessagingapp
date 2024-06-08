const messageController = require("../../controllers/messageController");
const messageModel = require("../../models/messageModel");

describe('createMessage', () => {
    it('should create a new message', async () => {
        const req = { body: { chatId: 'chatId', senderId: 'senderId', text: 'Hello' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        messageModel.prototype.save = jest.fn().mockResolvedValue({ _id: 'messageId', chatId: 'chatId', senderId: 'senderId', text: 'Hello' });

        await messageController.createMessage(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ _id: 'messageId', chatId: 'chatId', senderId: 'senderId', text: 'Hello' });
    });

    it('should handle error when failing to create a message', async () => {
        const req = { body: { chatId: 'chatId', senderId: 'senderId', text: 'Hello' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        messageModel.prototype.save = jest.fn().mockRejectedValue(new Error('Failed to create message'));

        await messageController.createMessage(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create message. Please try again later.' });
    });
});

describe('getMessages', () => {
    it('should get messages for a chat', async () => {
        const req = { params: { chatId: 'chatId' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const messages = [
            { _id: 'messageId1', chatId: 'chatId', senderId: 'senderId1', text: 'Hello' },
            { _id: 'messageId2', chatId: 'chatId', senderId: 'senderId2', text: 'Hi' }
        ];

        messageModel.find = jest.fn().mockResolvedValue(messages);

        await messageController.getMessages(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(messages);
    });

    it('should handle error when failing to get messages', async () => {
        const req = { params: { chatId: 'chatId' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        messageModel.find = jest.fn().mockRejectedValue(new Error('Failed to get messages'));

        await messageController.getMessages(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new Error('Failed to get messages'));
    });
});
