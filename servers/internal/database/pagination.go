package database

import (
	"api.hackcation.dev/internal/api"
	"api.hackcation.dev/internal/validator"
	"net/url"
)

type Pagination struct {
	Page     int
	PageSize int
}

type PaginationMetadata struct {
	CurrentPage  int `json:"currentPage"`
	PageSize     int `json:"pageSize"`
	FirstPage    int `json:"firstPage"`
	LastPage     int `json:"lastPage"`
	TotalRecords int `json:"totalRecords"`
}

func (p Pagination) Validate(v *validator.Validator) {
	v.Check(p.Page > 0, "page", "must be greater than zero")
	v.Check(p.Page <= 10_000_000, "page", "must be a maximum of 10 million")
	v.Check(p.PageSize > 0, "page_size", "must be greater than zero")
	v.Check(p.PageSize <= 100, "page_size", "must be a maximum of 100")
}

func (p Pagination) Limit() int {
	return p.PageSize
}

func (p Pagination) Offset() int {
	return (p.Page - 1) * p.PageSize
}

func (p Pagination) CalculateMetadata(totalRecords int) *PaginationMetadata {
	if totalRecords == 0 {
		return &PaginationMetadata{}
	}

	return &PaginationMetadata{
		CurrentPage:  p.Page,
		PageSize:     p.PageSize,
		FirstPage:    1,
		LastPage:     (totalRecords + p.PageSize - 1) / p.PageSize,
		TotalRecords: totalRecords,
	}
}

func ReadPaginationQuery(values url.Values, v *validator.Validator, defaultPage, defaultSize int) *Pagination {
	page, _ := api.ReadIntQuery(values, "page", defaultPage, v)
	pageSize, _ := api.ReadIntQuery(values, "pageSize", defaultSize, v)

	pagination := Pagination{
		Page:     page,
		PageSize: pageSize,
	}
	pagination.Validate(v)

	return &pagination
}
