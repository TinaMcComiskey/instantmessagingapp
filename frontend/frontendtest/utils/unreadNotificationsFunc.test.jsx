// unreadNotificationsFunc.test.js

import { unreadNotificationsFunc } from '../../src/utils/unreadNotifications'; 

describe('unreadNotificationsFunc', () => {
  test('returns only unread notifications', () => {
    const notifications = [
      { id: 1, isRead: false },
      { id: 2, isRead: true },
      { id: 3, isRead: false },
    ];

    const result = unreadNotificationsFunc(notifications);

    expect(result).toEqual([
      { id: 1, isRead: false },
      { id: 3, isRead: false },
    ]);
  });

  test('returns an empty array when all notifications are read', () => {
    const notifications = [
      { id: 1, isRead: true },
      { id: 2, isRead: true },
    ];

    const result = unreadNotificationsFunc(notifications);

    expect(result).toEqual([]);
  });

  test('returns all notifications when none are read', () => {
    const notifications = [
      { id: 1, isRead: false },
      { id: 2, isRead: false },
    ];

    const result = unreadNotificationsFunc(notifications);

    expect(result).toEqual(notifications);
  });

  test('returns an empty array when given an empty array', () => {
    const notifications = [];

    const result = unreadNotificationsFunc(notifications);

    expect(result).toEqual([]);
  });

  test('returns an empty array when notifications is undefined', () => {
    const result = unreadNotificationsFunc(undefined);

    expect(result).toEqual([]);
  });

  test('returns an empty array when notifications is null', () => {
    const result = unreadNotificationsFunc(null);

    expect(result).toEqual([]);
  });
});
