package com.example.anphuc.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseQueryRequest {
    int page = 0;
    int pageSize = 16;
    String orderBy = "asc";
    String sortFiled = "id";
}
