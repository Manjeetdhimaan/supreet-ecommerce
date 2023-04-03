import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  rootTitle: string = "Supreet Indian Goods";


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
        }
        return ' ';
      })
    ).subscribe((data: any) => {
      if (data && data.trim() != '') {
        this.titleService.setTitle(data + ` - ${this.rootTitle}`);
        // this.metaService.updateTag({ property: 'title', content: data });
            // this.metaService.updateTag({ property: 'description', content: data });
      }
      else {
        this.titleService.setTitle(`${this.rootTitle}`);
      }
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
       const name = data?.state?.root?.firstChild?.data?.['title'];
      }
    });
  }

  capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
