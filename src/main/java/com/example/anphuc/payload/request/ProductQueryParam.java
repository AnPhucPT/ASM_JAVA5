package com.example.anphuc.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductQueryParam extends BaseQueryRequest {
    Integer minPrice;
    Integer maxPrice;
    Integer categoryId;
    String keyword;
    Boolean available;
}
