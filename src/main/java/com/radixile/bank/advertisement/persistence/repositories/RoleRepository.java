package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Role;

@Repository
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {
 }