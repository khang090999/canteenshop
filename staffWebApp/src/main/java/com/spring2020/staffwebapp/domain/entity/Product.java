package com.spring2020.staffwebapp.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Product")
public class Product extends Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private boolean isAvailable;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            orphanRemoval = true,
            mappedBy = "product"
    )
    @JsonManagedReference(value = "productImages")
    private List<ProductImage> productImages;


}
