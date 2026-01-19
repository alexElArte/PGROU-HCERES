/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.centrale.hceres.items.ThesisType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


/**
 *
 * @author Max
 */
@Repository
public interface ThesisTypeRepository extends JpaRepository<ThesisType, Integer>{
    
    @Modifying
    @Transactional
    @Query(value = "ALTER SEQUENCE  seq_thesis_type RESTART WITH 1", nativeQuery = true)
    void resetSequence();
}
