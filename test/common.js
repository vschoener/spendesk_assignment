// We should use seed to populate our db but let's keep it simple now with simple test
const user = {
  id: 1,
  companyId: 1,
};

export default {
  user,
  headers: {
    'User-id': user.id,
    'Company-id': user.companyId,
  },
};
