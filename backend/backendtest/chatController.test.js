const chatController = require('../controllers/chatController');
const chatModel = require('../models/chatModel');

describe('createChat', () => {
    it('should create a new chat', async () => {
        const req = { body: { firstId: 'user1', secondId: 'user2' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        chatModel.findOne = jest.fn().mockResolvedValue(null);
        chatModel.prototype.save = jest.fn().mockResolvedValue({ _id: 'chatId', members: ['user1', 'user2'] });

        await chatController.createChat(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ _id: 'chatId', members: ['user1', 'user2'] });
    });

    describe('findUserChats', () => {
        it('should return all chats for a user', async () => {
            const req = { params: { userId: 'user1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            chatModel.find = jest.fn().mockResolvedValue([
                { _id: 'chatId1', members: ['user1', 'user2'] },
                { _id: 'chatId2', members: ['user1', 'user3'] },
            ]);

            await chatController.findUserChats(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { _id: 'chatId1', members: ['user1', 'user2'] },
                { _id: 'chatId2', members: ['user1', 'user3'] },
            ]);
        });

        it('should return an empty array if user has no chats', async () => {
            const req = { params: { userId: 'user1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            chatModel.find = jest.fn().mockResolvedValue([]);

            await chatController.findUserChats(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });
    describe('findChat', () => {
        it('should find a chat by ID', async () => {
            const req = { params: { firstId: 'user1', secondId: 'user2' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            chatModel.findOne = jest.fn().mockImplementation((filter) => {
            if (filter.members.$all[0] === 'user1' && filter.members.$all[1] === 'user2') {
                return Promise.resolve({ _id: 'chatId', members: ['user1', 'user2'] });
            } else {
                return Promise.resolve(null);
            }
        });

    await chatController.findChat(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: 'chatId', members: ['user1', 'user2'] });
});
        it('should return 404 if chat is not found', async () => {
            const req = { params: { chatId: 'nonExistentChatId' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            chatModel.findById = jest.fn().mockResolvedValue(null);

            await chatController.findChat(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Chat not found' });
        });
    });
});
