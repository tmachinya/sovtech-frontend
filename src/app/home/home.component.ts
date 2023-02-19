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
  public selectedPage: number = 1;
  public totalPages: number = 9;
  public searchKey: any;
  public totalItems: number=0;
  public isLoading: boolean = false;
  public pageEvent: PageEvent | undefined;
  public dataSource: MatTableDataSource<Person> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  public displayedColumns: string[] = ['name', 'height', 'mass', 'gender', 'homeworld'];
  public page: number = 1; // current page number
 public people: Person[] | undefined ;

  constructor(
    private peopleService: PeopleService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.loadPeopleBasedOnPage(this.page)
  }

  goToPage(page: number): void {
    this.page = page;
    this.loadPeople();
  }
  onPageSelect(): void {
    this.isLoading = true;
    this.loadPeopleBasedOnPage(this.selectedPage)
  }

  loadPeopleBasedOnPage(page: number): void{
    this.peopleService.getPeopleByPage(page).subscribe(
      people => {
        this.dataSource = new MatTableDataSource<Person>(people);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error => {
        console.log(error)
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
