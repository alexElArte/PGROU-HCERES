/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.centrale.hceres.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.centrale.hceres.items.PhdStudent;


/**
 *
 * @author Max
 */
@Repository
public interface PhdStudentRepository extends JpaRepository<PhdStudent, Integer>{

}
