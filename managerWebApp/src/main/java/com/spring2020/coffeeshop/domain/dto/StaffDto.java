package com.spring2020.coffeeshop.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaffDto {

    private Long id;

    @NotNull(message = "{staff.dob.notNull}")
    @Past(message = "{staff.dob.past}")
    private LocalDate dob;

    @NotNull(message = "{staff.address.notNull}")
    @Length(min = 1, max = 500, message = "{staff.address.length}")
    private String address;

    @NotNull(message = "{staff.socialId.notNull}")
    @Length(min = 12, max = 12, message = "{staff.socialId.length}")
    private String socialId;

    private LocalDate hireDate;

    private LocalDate terminateDate;

    @Valid
    @NotNull
    private StaffAppUserDto appUser;
}
