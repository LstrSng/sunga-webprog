import userData from '../data/user.json';

const LOCAL_USERS_KEY = 'localUsers';
const DELETED_USERS_KEY = 'deletedUsers';

const getUserKey = (user) => user.email?.trim().toLowerCase() || user._id;

export const getUserRole = (user) => (user?.role || user?.type || 'viewer').toLowerCase();

export const normalizeUser = (user, index = 0) => {
  const role = getUserRole(user);
  const emailUsername = user.email?.split('@')[0] || `user${index + 1}`;

  return {
    _id: user._id || `user-${index + 1}`,
    displayId: index + 1,
    firstName: user.firstName || emailUsername,
    lastName: user.lastName || '',
    age: user.age || '',
    gender: user.gender || '',
    contactNumber: user.contactNumber || '',
    email: user.email?.trim().toLowerCase() || '',
    role,
    type: role,
    username: user.username || emailUsername,
    password: user.password || '',
    address: user.address || '',
    isActive: user.isActive ?? true,
    name: `${user.firstName || emailUsername} ${user.lastName || ''}`.trim(),
  };
};

export const getStoredUsers = () => {
  try {
    const savedUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    return Array.isArray(savedUsers) ? savedUsers : [];
  } catch {
    return [];
  }
};

export const getDeletedUsers = () => {
  try {
    const deletedUsers = JSON.parse(localStorage.getItem(DELETED_USERS_KEY) || '[]');
    return Array.isArray(deletedUsers) ? deletedUsers : [];
  } catch {
    return [];
  }
};

export const saveStoredUsers = (users) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const saveDeletedUsers = (users) => {
  localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(users));
};

export const getAllUsers = () => {
  const userMap = new Map();
  const deletedUsers = new Set(getDeletedUsers());

  userData.map(normalizeUser).forEach((user) => {
    const key = getUserKey(user);
    if (!deletedUsers.has(key) && !deletedUsers.has(user._id)) {
      userMap.set(key, user);
    }
  });

  getStoredUsers().map(normalizeUser).forEach((user) => {
    const key = getUserKey(user);
    if (!deletedUsers.has(key) && !deletedUsers.has(user._id)) {
      userMap.set(key, user);
    }
  });

  return Array.from(userMap.values()).map((user, index) => ({
    ...user,
    displayId: index + 1,
  }));
};

export const addStoredUser = (user) => {
  const storedUsers = getStoredUsers();
  const normalizedUser = normalizeUser({
    ...user,
    _id: user._id || `local-user-${Date.now()}`,
  });
  const userKey = getUserKey(normalizedUser);
  const nextDeletedUsers = getDeletedUsers().filter(
    (deletedUser) => deletedUser !== userKey && deletedUser !== normalizedUser._id
  );

  saveStoredUsers([...storedUsers, normalizedUser]);
  saveDeletedUsers(nextDeletedUsers);
  return normalizedUser;
};

export const updateStoredUser = (userId, user) => {
  const storedUsers = getStoredUsers();
  const existingUserIndex = storedUsers.findIndex((storedUser) => storedUser._id === userId);
  const normalizedUser = normalizeUser({ ...user, _id: userId });
  const nextUsers =
    existingUserIndex >= 0
      ? storedUsers.map((storedUser, index) =>
          index === existingUserIndex ? normalizeUser({ ...storedUser, ...user, _id: userId }) : storedUser
        )
      : [...storedUsers, normalizedUser];

  saveStoredUsers(nextUsers);
};

export const deleteStoredUser = (user) => {
  const normalizedUser = normalizeUser(user);
  const userKey = getUserKey(normalizedUser);
  const deletedUsers = new Set(getDeletedUsers());

  deletedUsers.add(userKey);
  deletedUsers.add(normalizedUser._id);
  saveDeletedUsers(Array.from(deletedUsers));
  saveStoredUsers(
    getStoredUsers().filter((storedUser) => {
      const storedNormalizedUser = normalizeUser(storedUser);
      return storedNormalizedUser._id !== normalizedUser._id && getUserKey(storedNormalizedUser) !== userKey;
    })
  );
};
