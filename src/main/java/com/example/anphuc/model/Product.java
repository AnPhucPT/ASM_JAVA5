package com.example.anphuc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
@NamedEntityGraph(name = "graph.product", attributeNodes = {
        @NamedAttributeNode("category")
})
public class Product {
    public Product(String name, String image, Integer price, Category category) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.category = category;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String image;
    private Integer price;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private ZonedDateTime createDate = ZonedDateTime.now(ZoneOffset.UTC);

    private Boolean available = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @Fetch(value = FetchMode.JOIN)
    private Category category;

}
