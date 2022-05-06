package com.plantwebshop.plantshop.service;

import com.plantwebshop.plantshop.dao.RoleDao;
import com.plantwebshop.plantshop.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role){
        return roleDao.save(role);
    }
}
