import User from "../models/user.model.js";

export const createUserService = async (data) => {
  const { email, username } = data;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    throw new Error("User with email or username already exists");
  }

  const user = await User.create(data);
  return user;
};

export const getAllUsersService = async () => {
  return await User.find();
};

export const updateUserService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUserService = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};