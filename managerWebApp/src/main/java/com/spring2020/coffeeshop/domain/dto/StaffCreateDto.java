package com.spring2020.coffeeshop.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

import static com.spring2020.coffeeshop.util.ConstantUtil.DATE_TIME_PATTERN;
import static com.spring2020.coffeeshop.util.ConstantUtil.SOCIAL_ID_REX;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaffCreateDto {

    private Long id;

    @NotNull(message = "{staff.dob.notNull}")
    @Past(message = "{staff.dob.past}")
    private LocalDate dob;

    @NotNull(message = "{staff.address.notNull}")
    @Length(min = 1, max = 500, message = "{staff.address.length}")
    private String address;

    @NotNull(message = "{staff.socialId.notNull}")
    @Pattern(regexp = SOCIAL_ID_REX, message = "{staff.socialId.pattern}")
    private String socialId;

    @DateTimeFormat(pattern = DATE_TIME_PATTERN)
    private LocalDate hireDate;

    @DateTimeFormat(pattern = DATE_TIME_PATTERN)
    private LocalDate terminateDate;

    @Valid
    @NotNull
    private AppUserCreateDto appUser;
}
