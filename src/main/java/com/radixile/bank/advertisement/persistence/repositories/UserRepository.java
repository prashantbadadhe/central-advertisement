package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    public User findByUsername(String username);

}