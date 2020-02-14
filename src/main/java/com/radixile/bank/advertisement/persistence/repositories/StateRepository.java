package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.State;

@Repository
public interface StateRepository extends PagingAndSortingRepository<State, Long> {
 
}