package com.example.crudwithreact.Repository;

import com.example.crudwithreact.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepo extends JpaRepository<User,Integer> {
    User findTopByOrderByIdDesc();
}
