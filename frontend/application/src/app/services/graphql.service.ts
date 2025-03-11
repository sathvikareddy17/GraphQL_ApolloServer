import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_ITEMS = gql`
  query {
    items {
      id
      name
      description
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class GraphQLService {
  constructor(private apollo: Apollo) {} // ✅ Correct Dependency Injection

  getItems(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_ITEMS }).valueChanges.pipe(
      map((result: any) => result.data.items)
    );
  }
}
