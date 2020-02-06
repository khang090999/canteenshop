package com.spring2020.staffwebapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StaffWebAppApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(StaffWebAppApplication.class, args);
    }

}
