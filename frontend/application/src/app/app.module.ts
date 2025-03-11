import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { GraphQLService } from './services/graphql.service';

@NgModule({
  declarations: [AppComponent, ItemListComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GraphQLService,
    Apollo, // Provide Apollo directly
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: 'http://localhost:4000/graphql' }),
      }),
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}