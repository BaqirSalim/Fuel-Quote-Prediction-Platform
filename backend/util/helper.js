//this code is sourced from https://itnext.io/mastering-session-authentication-aa29096f6e22

export const setSessionUser = (user) => {
  return { userId: user.id, username: user.username };
};
