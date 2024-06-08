import { postRequest, getRequest, deleteRequest } from '../../src/utils/services'; 

// Mock the fetch function
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('postRequest', () => {
  test('should return data on successful POST request', async () => {
    const mockData = { success: true };
    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await postRequest('http://localhost:5000/api/test', JSON.stringify({ key: 'value' }));

    expect(response).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/test', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' }),
    }));
  });

  test('should return error on failed POST request', async () => {
    const mockError = { message: 'Failed to post' };
    fetch.mockResponseOnce(JSON.stringify(mockError), { status: 400 });

    const response = await postRequest('http://localhost:5000/api/test', JSON.stringify({ key: 'value' }));

    expect(response).toEqual({ error: true, message: mockError.message });
  });
});

describe('getRequest', () => {
  test('should return data on successful GET request', async () => {
    const mockData = { success: true };
    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getRequest('http://localhost:5000/api/test');

    expect(response).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/test');
  });

  test('should return error on failed GET request', async () => {
    const mockError = { message: 'Failed to fetch' };
    fetch.mockResponseOnce(JSON.stringify(mockError), { status: 400 });

    const response = await getRequest('http://localhost:5000/api/test');

    expect(response).toEqual({ error: true, message: mockError.message });
  });
});

describe('deleteRequest', () => {
  test('should return data on successful DELETE request', async () => {
    const mockData = { success: true };
    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await deleteRequest('http://localhost:5000/api/test');

    expect(response).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/test', expect.objectContaining({
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }));
  });

  test('should return error on failed DELETE request', async () => {
    const mockError = { message: 'Failed to delete' };
    fetch.mockResponseOnce(JSON.stringify(mockError), { status: 400 });

    const response = await deleteRequest('http://localhost:5000/api/test');

    expect(response).toEqual({ error: true, message: mockError.message });
  });
});
