package com.plantwebshop.plantshop.dao;

import com.plantwebshop.plantshop.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User,String> {
}
