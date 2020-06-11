import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductDataSource } from './ProductDataSource';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit,OnInit {

  @ViewChild(MatPaginator) 
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatTable)
  table: MatTable<Product>;
  dataSource: ProductDataSource;

  products:Product[]

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  this.productService.readProducts().subscribe(products => {
      this.products = products
      console.log(products)
    }) 
    this.dataSource = new ProductDataSource(this.productService)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
