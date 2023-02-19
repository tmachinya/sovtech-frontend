import {Component, OnInit, ViewChild} from '@angular/core';
import {PeopleService} from "../services/peopleservice";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Person} from "../Model/Person";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {PersonDetailComponent} from "../person-detail/person-detail.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  selectedPage = 1;
  totalPages: any;
  searchKey: any;
  totalItems: number | undefined;
  isLoading = false;
  pageEvent: PageEvent | undefined;
  dataSource: MatTableDataSource<Person> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = ['name', 'height', 'mass', 'gender', 'homeworld'];
  page = 1; // current page number
  people: Person[] | undefined ;

  constructor(
    private peopleService: PeopleService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.peopleService.getPeopleByPage(this.page).subscribe(
      people => {
        this.dataSource = new MatTableDataSource<Person>(people);
        this.isLoading = false;
      }
    );
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadPeople();
  }
  onPageSelect() {
    this.isLoading = true;
    this.peopleService.getPeopleByPage(this.selectedPage).subscribe(
      people => {
        this.dataSource = new MatTableDataSource<Person>(people);
        this.totalPages = Math.ceil(people.length/ 10);
        this.isLoading = false;
      },
      error => {
        // console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  showDetails(row: any) {
    this.dialog.open(PersonDetailComponent, {
      data: { item: row },
      disableClose: true,
      autoFocus:true,
      width:'50%',
    });
  }
}
