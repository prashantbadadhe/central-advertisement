package com.radixile.bank.advertisement.persistence.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.radixile.bank.advertisement.persistence.entities.ContentDetails;

@Repository
public interface ContentDetailsRepository extends PagingAndSortingRepository<ContentDetails, Long> {
 
}