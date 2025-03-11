import { Component, OnInit } from '@angular/core';
import { GraphQLService } from '../../services/graphql.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private graphqlService: GraphQLService) {}

  ngOnInit(): void {
    this.graphqlService.getItems().subscribe((data) => {
      this.items = data;
    });
  }
}