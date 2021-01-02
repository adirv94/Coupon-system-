package jbc.com.service;

import jbc.com.model.User;

import java.util.Optional;

public interface UserService {
    public User findByEmail(String email);
    public User addUser(User user);
    public User updateUser(User user);
    public void deleteUserById(int userId);
    public void deleteByEmail(String email);
}
