package com.spring2020.staffwebapp.repository;

import com.spring2020.staffwebapp.domain.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long>
{
    Optional<AppUser> findAppUserByUsername(String username);
}
