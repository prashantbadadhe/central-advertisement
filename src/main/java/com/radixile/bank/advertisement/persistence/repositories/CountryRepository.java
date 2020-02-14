package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.Country;

@Repository
public interface CountryRepository extends PagingAndSortingRepository<Country, Long> {
 
}